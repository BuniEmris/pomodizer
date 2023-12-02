import React from 'react'

// Components
import { DmText, DmView } from 'components/UI'
import ActionBtn from 'components/UI/ActionBtn'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native'

import i18n from 'locales/i18n'

// Styles & Assets
import styles from './styles'
import ArrowDown from 'assets/images/icons/arrowDownPremium.svg'
import Icon from 'assets/images/icons/premiumModalImg.svg'

interface Props {
  isVisible: boolean
  onClose?: () => void
}

const PremiumModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const handlePrivacyPolicy = () => {
    return undefined
  }

  const handleTerms = () => {
    return undefined
  }

  const handleBtn = () => {
    return undefined
  }

  return (
    <Modal isVisible={isVisible} style={styles.modalBg}>
      <SafeAreaView>
        <DmView marginTop={27} marginLeft={22} onPress={onClose}>
          <ArrowDown />
        </DmView>
        <DmView paddingX={70}>
          <DmText marginTop={4} style={styles.title}>
            {i18n.t('you_won’t_know_unless_you_try')}
          </DmText>
        </DmView>
        <DmView marginTop={11}>
          <DmText style={styles.subTitle}>
            {i18n.t('limited_offer_3_days_for_free')}
          </DmText>
        </DmView>
        <DmView marginTop={35} alignItems="center">
          <Icon />
        </DmView>
        <DmView paddingX={44}>
          <DmView style={styles.wrapper}>
            <DmView style={styles.divider} />
            <DmText marginTop={25} style={styles.itemTitle}>
              {i18n.t('3_days_free')}
            </DmText>
            <DmText marginTop={5} style={styles.itemSubTitle}>
              {i18n.t('then_2,49_USD_monthly')}
            </DmText>
            <DmView marginTop={12} width="100%" paddingX={23}>
              <ActionBtn
                title={i18n.t('get_3_days_for_free')}
                onPress={handleBtn}
              />
            </DmView>
            <DmText marginTop={10} style={styles.itemDescr}>
              {i18n.t('you_can_cancel_your_subscription_at_any_time')}
            </DmText>
          </DmView>
        </DmView>
        <DmView
          marginTop={22}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <DmView onPress={handleTerms}>
            <DmText style={styles.footerText}>{i18n.t('terms')}</DmText>
          </DmView>
          <DmText style={styles.dot}>•</DmText>
          <DmView onPress={handlePrivacyPolicy}>
            <DmText style={styles.footerText}>
              {i18n.t('privacy_policy')}
            </DmText>
          </DmView>
        </DmView>
      </SafeAreaView>
    </Modal>
  )
}

export default PremiumModal
