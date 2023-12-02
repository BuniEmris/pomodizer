import React, { useEffect, useRef, useState } from 'react'

// Components
import { Linking, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModalMenuItem from 'components/ModalMenuItem'
import { DmView, DmText } from 'components/UI'
import Icon from 'react-native-vector-icons/Feather'
import Dash from 'react-native-dash'
import DeleteModalDetails from 'components/UI/DeleteModalDetails'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import SignOutModalDetails from 'components/UI/SignOutModalDetails'
import FollowUs from 'components/FollowUs'

// Hooks
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import navigationService from 'navigation/navigationService'
import Header from 'components/Header'
import usePremium from 'hooks/usePremium'

// Helpers
import { isAndroid } from 'styles/helpers'

// Types & Redax
import { deleteAccount, signOut } from 'store/auth/thunkActions'
import { useTypedSelector } from 'store'
import config from 'config'

// Utils
import { openUrl } from 'utils/linking'
import logger from 'utils/logger'
import i18n from 'locales/i18n'
import {
  getVersion,
  getBrand,
  getSystemVersion,
} from 'react-native-device-info'

// Styles & Assets
import { colors, positionStyles, spacingStyles, typo } from 'styles'
import styles from './styles'
import Logout from 'assets/images/icons/logout.svg'
import * as S from './styled.components'

const ProfileScreen = () => {
  const [isDeleteModalsVisible, setIsDeleteModalsVisible] = useState(false)
  const [signOutModal, setSignOutModal] = useState(false)

  const menuModalRef = useRef<BottomSheetModal>(null)
  const dispatch = useDispatch()
  const { _id } = useTypedSelector((store) => store.auth.user)
  const { isPremium } = usePremium()

  const handleSignOut = async () => {
    try {
      await dispatch(signOut())
    } catch (e) {
      logger.error('Sign out', e)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteAccount())
    } catch (e) {
      //
    }
  }
  const handleDelete = () => {
    menuModalRef.current?.close()
    setIsDeleteModalsVisible(true)
  }
  const handleSignOutModal = () => {
    menuModalRef.current?.close()
    setSignOutModal(true)
  }

  const handleContactUs = () => {
    const subject = `Pomodizer ${getVersion()} ${getBrand()}-${
      Platform.OS
    } ${getSystemVersion()}, ${_id}`

    openUrl(`mailto:${config.EMAIL}?subject=${subject}`)
  }

  return (
    <SafeAreaView
      style={styles.safeAreaHeader}
      edges={['left', 'top', 'right']}
    >
      <Header isSettings isBackHiden={true} text={i18n.t('settings')} />
      <S.Container
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <DmView
          onPress={() =>
            navigationService.navigate('Profile', {
              screen: 'Personal_Settings',
            })
          }
        >
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="user" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('profileSettings')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView
          onPress={() =>
            navigationService.navigate('Profile', {
              screen: 'App_Details',
            })
          }
        >
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="settings" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('appSettings')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView
          onPress={() =>
            navigationService.navigate('Profile', {
              screen: 'Timer_Details',
            })
          }
        >
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="clock" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('timerSettings')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView
          onPress={() =>
            navigationService.navigate('Profile', {
              screen: 'Statistics',
              params: {},
            })
          }
        >
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="pie-chart" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('statistics')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView onPress={() => navigationService.navigate('Premium')}>
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon
              name="star"
              size={24}
              color={isPremium ? colors.LIGHT_GREY : colors.YELLOW}
            />
            <DmText
              style={isPremium ? typo.bodyM16 : typo.bodyB16}
              marginLeft={20}
              color={isPremium ? colors.DARK_GREY : colors.YELLOW}
            >
              {isPremium ? i18n.t('manage_subscription') : i18n.t('buyPremium')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView
          onPress={() =>
            Linking.openURL(
              'https://pomodizer.com/Privacy_Policy_pomodizer.pdf'
            )
          }
        >
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="key" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('privacyPolicy')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView
          onPress={() =>
            Linking.openURL(
              'https://pomodizer.com/Terms_of_Service_pomodizer.pdf'
            )
          }
        >
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="book" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('temrsOfUse')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView onPress={handleDelete}>
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="user-x" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('deleteAccount')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView onPress={handleContactUs}>
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="message-square" size={24} color={colors.LIGHT_GREY} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.DARK_GREY}
            >
              {i18n.t('contact_us')}
            </DmText>
          </DmView>
          <Dash
            style={styles.dash}
            dashGap={5}
            dashLength={5}
            dashThickness={1}
            dashColor={colors.LIGHT_GREY}
          />
        </DmView>
        <DmView onPress={handleSignOutModal} marginBottom={50}>
          <DmView alignItems="center" height={55} flexDirection="row">
            <Icon name="log-out" size={24} color={colors.LIGHT_RED} />
            <DmText
              style={{ ...typo.bodyM16 }}
              marginLeft={20}
              color={colors.LIGHT_RED}
            >
              {i18n.t('signOut')}
            </DmText>
          </DmView>
        </DmView>
        <DeleteModalDetails
          title=""
          isAccount
          onCancel={() => setIsDeleteModalsVisible(false)}
          onDelete={handleDeleteAccount}
          isDeleteModalsVisible={isDeleteModalsVisible}
        />
        <SignOutModalDetails
          title={i18n.t('deleteAccountAlert')}
          onCancel={() => setSignOutModal(false)}
          onDelete={handleSignOut}
          isDeleteModalsVisible={signOutModal}
        />
        <FollowUs />
      </S.Container>
    </SafeAreaView>
  )
}

export default ProfileScreen
