/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable no-extra-parens */
import React from 'react'

// Components
import {
  ActivityIndicator,
  StatusBar,
  Text,
} from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import { SafeAreaView } from 'react-native-safe-area-context'
import CloseIcon from 'assets/images/icons/close.svg'
import IconBtn from 'components/UI/IconBtn'

// Utils
import navigationService from 'navigation/navigationService'
import { openPrivacyAndTerms } from 'utils/linking'
import { PurchasesPackage } from 'react-native-purchases'
import i18n from 'locales/i18n'

// Types
import {} from 'types'

// Helpers && Hooks
import { usePurchase } from 'context/purchaseContext'
import { isIOs } from 'styles/helpers'
import usePremium from 'hooks/usePremium'

// Styles
import layoutStyles from 'styles/layoutStyles'
import * as S from './styled.components'
import styles from './styles'
import ProIcon from 'assets/images/icons/proIcon.svg'
import ProIncludes from 'assets/images/icons/premiumCheck.svg'

interface Props {
  //
}

const PremiumScreen: React.FC<Props> = (props) => {
  const {
    products,
    makePurchase,
    selectedPurchaseId,
    isLoading,
    getPeriodName,
    getPackagePriceStr,
    restoreSubscription
  } = usePurchase()

  const { isPremium, purchaseInfo } = usePremium()


  const premiumFeatures =
    i18n.t('premium_features', {
      returnObjects: true,
    }) || []


  const renderBuyBtnText = (pkg: PurchasesPackage) => {
      if (isLoading && selectedPurchaseId === pkg.identifier)  {
        return (
                  <DmText style={styles.priceBtnText}>
                    <ActivityIndicator size="small" color="White" />
                  </DmText>
                )
        }

      if ( selectedPurchaseId !== pkg.identifier && pkg.product.identifier !== purchaseInfo?.productIdentifier) {
        return (
          <>
            <DmText style={styles.priceBtnText}>
                {pkg.packageType === 'MONTHLY' && !isPremium ? i18n.t('start_trial') : getPackagePriceStr(pkg)}
            </DmText>
            {pkg.packageType === 'MONTHLY' && !isPremium && (
              <DmText style={styles.priceBtnDesc}>
                  {i18n.t('then') + ' ' +  getPackagePriceStr(pkg)}
              </DmText>
            )}
            {pkg.packageType == 'ANNUAL' && (
              <DmText style={styles.priceBtnDesc}>
                {i18n.t('save')} 33%
              </DmText>
            )}
          </>
        )
      }


      if (pkg.product.identifier === purchaseInfo?.productIdentifier) {
        return  (
            <DmText style={styles.priceBtnText}>
                {i18n.t('current_plan')} {getPackagePriceStr(pkg)}
            </DmText>
        )
      }
  }

  return (
    <SafeAreaView
      style={layoutStyles.safeAreaView}
      edges={['top', 'left', 'left']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <S.Container
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <DmView style={styles.headerTextContainer}>
          <DmView width={40} />
          <DmView flexDirection="row" alignItems="center">
            <Text style={styles.headerText}>{isPremium ? i18n.t('my_premium') : i18n.t('buyPremium') } </Text>
            <ProIcon />
          </DmView>
          <IconBtn
            Icon={CloseIcon}
            onPress={() => navigationService.goBack()}
          />
        </DmView>
        {!isPremium && (
          <DmView style={styles.CarouselContainer}>
            <DmText style={styles.CarouselText}>{i18n.t('premium_text')}</DmText>
          </DmView>
        )}

        <S.ContentWr>
          <DmView style={styles.tarrifHeaderTextContainer}>
            <DmText style={styles.tarrifHeaderText}>
              { isPremium ?  i18n.t('premium_features_label') :  i18n.t('premium_label')}
            </DmText>
          </DmView>
          <DmView style={styles.tarrifDetailsContainer}>
            {Array.isArray(premiumFeatures) &&
              premiumFeatures.map((el, idx) => (
                <DmView style={styles.tarrifDetails} key={'premiumFeatures_' + idx}>
                  <ProIncludes />
                  <DmText style={styles.tarrifDetailText}>{el}</DmText>
                </DmView>
              ))}
          </DmView>

          {products?.availablePackages.length &&
            products?.availablePackages.map((pkg) => (
              <DmView
                style={[styles.priceBtn, pkg.packageType === 'MONTHLY' && styles.priceBtnAccent]}
                onPress={() => makePurchase(pkg)}
                disabled={isLoading || pkg.product.identifier === purchaseInfo?.productIdentifier}
                key={pkg.identifier}
              >

                  {renderBuyBtnText(pkg)}
              </DmView>
            ))}

          <DmView style={styles.buyLink} onPress={restoreSubscription}>
            <DmText style={styles.buyLinkText}>{i18n.t('restore')}</DmText>
          </DmView>
          <DmView style={styles.notes}>
            <DmText style={styles.notesText}>
              {i18n.t('premium_privacy', {os: isIOs ? 'Apple ID' : 'Google ID'})} <DmText onPress={() => openPrivacyAndTerms('privacy')} style={styles.termsText}>{i18n.t('privacyPolicy')}</DmText> {i18n.t('and')} <DmText onPress={() => openPrivacyAndTerms('terms')} style={styles.termsText}>{i18n.t('temrsOfUse')}</DmText>
            </DmText>
          </DmView>
        </S.ContentWr>
      </S.Container>
    </SafeAreaView>
  )
}

export default PremiumScreen
