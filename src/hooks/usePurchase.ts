import { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
  PACKAGE_TYPE,
} from 'react-native-purchases'
import config from 'config'
import logger from 'utils/logger'
import { useTypedSelector } from 'store'
import { updateUser } from 'store/auth'
import { useDispatch } from 'react-redux'
import i18n from 'locales/i18n'

const usePurchase = ({ autoInit = false, getProducts = false }) => {
  const userId = useTypedSelector((store) => store.auth?.user?._id)
  const dispatch = useDispatch()

  const [products, setProducts] = useState<PurchasesOffering>()
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
          updateUser({
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
      logger.log('purchaserInfo', purchaserInfo)

      if (typeof purchaserInfo.entitlements.active.pro !== 'undefined') {
        dispatch(
          updateUser({
            isPremium: true,
            purchaseInfo: purchaserInfo.entitlements.active.pro,
          })
        )
      }
    } catch (e) {
      // Error fetching purchaser info
    }
  }

  useEffect(() => {
    if (autoInit && userId && userId !== '') {
      initRevenueCat()
    }

    if (getProducts && userId && userId !== '') {
      getAvailableProducts()
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

  return {
    getAvailableProducts,
    initRevenueCat,
    products,
    makePurchase,
    isLoading,
    selectedPurchaseId,
    getPeriodName,
  }
}

export default usePurchase
