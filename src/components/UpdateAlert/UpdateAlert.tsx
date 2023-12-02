import React, { useEffect, useState } from 'react'

// Components
import { Text } from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import Modal from 'react-native-modal'
import Button from 'components/UI/Button'

// Utils & store
import { useTypedSelector } from 'store'
import { goToAppMarket } from 'utils/linking'
import { useDispatch } from 'react-redux'

// Styles
import * as S from './styled.components'

import i18n from 'locales/i18n'
import { colors, spacingStyles } from 'styles'
import CriticalUpdateIcon from 'assets/images/icons/criticalUpdate.svg'
import UpdateIcon from 'assets/images/icons/update.svg'
import { patchUser } from 'store/auth/thunkActions'
import { updateUser } from 'store/auth'

interface Props {
  //
}

const UpdateAlert: React.FC<Props> = (props) => {
  const { isNeedUpdate } = useTypedSelector((store) => store.auth.user)
  const [isShowModal, setIsShowModal] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setIsShowModal(false)
  }

  const handleUpdate = () => {
    setIsShowModal(false)
    dispatch(
      patchUser({
        lastUpdateShow: new Date().toISOString(),
      })
    )
    dispatch(
      updateUser({
        isNeedUpdate: false,
      })
    )
    goToAppMarket()
  }

  useEffect(() => {
    if (isNeedUpdate) {
      setTimeout(() => setIsShowModal(true), 1000 * 30)
    }
  }, [])

  return (
    <Modal
      isVisible={isShowModal}
      style={spacingStyles.m0}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      // onBackdropPress={handleClose}
    >
      <S.Container>
        <DmView flexDirection="row" marginBottom={20}>
          <UpdateIcon />
          <DmView marginLeft={15} flexShrink={1} paddingRight={30}>
            <DmText
              fontWeight="600"
              fontSize={18}
              marginBottom={5}
              color={colors.DARK_GREY}
            >
              {i18n.t('new_update')}
            </DmText>
            <DmText fontWeight="400" fontSize={14} color={colors.DARK_GREY}>
              {i18n.t('new_update_desc')}
            </DmText>
          </DmView>
        </DmView>
        <Button
          text={i18n.t('update')}
          backgroundColor={colors.LIME}
          onPress={handleUpdate}
        />
        <Button
          text={i18n.t('remind_me')}
          textStyle={{ color: colors.LIME, textTransform: 'none' }}
          onPress={handleClose}
        />
      </S.Container>
    </Modal>
  )
}

export default UpdateAlert
