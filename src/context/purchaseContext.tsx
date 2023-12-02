import config from 'config'
import i18n from 'locales/i18n'
import React, { useEffect, useState } from 'react'
import { Platform, Alert } from 'react-native'
import Purchases, {
  PACKAGE_TYPE,
  PurchasesOffering,
  PurchasesPackage,
} from 'react-native-purchases'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store'
import { updateUser } from 'store/auth'
import { patchUser } from 'store/auth/thunkActions'
import logger from 'utils/logger'

type PurchaseContextValues = {
  products: PurchasesOffering | null
  isLoading: boolean
  selectedPurchaseId?: string | null
  getPeriodName: (period: PACKAGE_TYPE) => void
  makePurchase: (pPackage: PurchasesPackage) => void
  getPackagePriceStr: (pPackage: PurchasesPackage) => string
  restoreSubscription: () => void
}

type PurchaseProviderProps = { children: React.ReactNode }

const PurchaseContext = React.createContext<PurchaseContextValues | undefined>(
  undefined
)

const PurchaseProvider = ({ children }: PurchaseProviderProps) => {
  const userId = useTypedSelector((store) => store.auth?.user?._id)
  const dispatch = useDispatch()

  const [products, setProducts] = useState<PurchasesOffering | null>(null)
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<string | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  const initRevenueCat = async () => {
    if (__DEV__) {
      Purchases.setDebugLogsEnabled(true)
    }

    if (Platform.OS === 'ios') {
      await Purchases.setup(config.REVENUE_IOS, userId)
    } else if (Platform.OS === 'android') {
      await Purchases.setup(config.REVENUE_ANDROID, userId)
    }

    getAvailableProducts()

    checkSubscription()
  }

  const getAvailableProducts = async () => {
    try {
      const offerings = await Purchases.getOfferings()
      logger.log('offerings', offerings.current)

      if (offerings.current !== null) {
        setProducts(offerings.current)
      }
    } catch (e) {
      logger.error('getAvailableProducts', e)
    }
  }

  const makePurchase = async (pPackage: PurchasesPackage) => {
    setSelectedPurchaseId(pPackage.identifier)
    setIsLoading(true)
    try {
      const { purchaserInfo, productIdentifier } =
        await Purchases.purchasePackage(pPackage)
      logger.log('purchaserInfo', purchaserInfo)
      logger.log('productIdentifier', productIdentifier) // "premium_yearly"

      if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
        logger.log('success')
        dispatch(
          patchUser({
            isPremium: true,
            purchaseInfo: purchaserInfo.entitlements.active.pro,
          })
        )
      }
      setSelectedPurchaseId(null)
      setIsLoading(false)
    } catch (e: any) {
      setSelectedPurchaseId(null)
      setIsLoading(false)
      if (!e.userCancelled) {
        Alert.alert(e?.message || 'Something when wrong')
      }
    }
  }

  const checkSubscription = async () => {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo()
      logger.log('Current purchaserInfo', purchaserInfo)

      if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
        dispatch(
          patchUser({
            isPremium: true,
            purchaseInfo: purchaserInfo.entitlements.active.pro,
          })
        )
      }
    } catch (e) {
      // Error fetching purchaser info
    }
  }

  const restoreSubscription = async () => {
    try {
      const purchaserInfo = await Purchases.restoreTransactions()
      if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
        dispatch(
          patchUser({
            isPremium: true,
            purchaseInfo: purchaserInfo.entitlements.active.pro,
          })
        )
        Alert.alert(i18n.t('restore_success'))
      }
      Alert.alert(i18n.t('restore_error'))
    } catch (e) {
      Alert.alert(i18n.t('restore_error'))
    }
  }

  useEffect(() => {
    if (userId && userId !== '') {
      initRevenueCat()
    }
  }, [userId])

  const getPeriodName = (period: PACKAGE_TYPE) => {
    switch (period) {
      case PACKAGE_TYPE.UNKNOWN:
        return ''
      case PACKAGE_TYPE.CUSTOM:
        return ''
      case PACKAGE_TYPE.LIFETIME:
        return i18n.t('purchase_period_LIFETIME')
      case PACKAGE_TYPE.ANNUAL:
        return i18n.t('purchase_period_ANNUAL')
      case PACKAGE_TYPE.SIX_MONTH:
        return i18n.t('purchase_period_SIX_MONTH')
      case PACKAGE_TYPE.THREE_MONTH:
        return i18n.t('purchase_period_THREE_MONTH')
      case PACKAGE_TYPE.TWO_MONTH:
        return i18n.t('purchase_period_TWO_MONTH')
      case PACKAGE_TYPE.MONTHLY:
        return i18n.t('purchase_period_MONTHLY')
      case PACKAGE_TYPE.WEEKLY:
        return i18n.t('purchase_period_WEEKLY')
    }
  }

  const getPackagePriceStr = (pkg: PurchasesPackage) => {
    return `${pkg.product.price_string} / ${getPeriodName(pkg.packageType)}`
  }

  return (
    <PurchaseContext.Provider
      value={{
        isLoading,
        products,
        selectedPurchaseId,
        makePurchase,
        getPeriodName,
        getPackagePriceStr,
        restoreSubscription,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  )
}

function usePurchase() {
  const context = React.useContext(PurchaseContext)

  if (context === undefined) {
    throw new Error('usePurchase must be used within a PurchaseProvider')
  }
  return context
}

export { PurchaseProvider, usePurchase }
