import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from '../Button'
import styles from './styles'
import { colors, positionStyles, spacingStyles } from 'styles'
import CustomModal from '../CustomModal'
import i18n from 'locales/i18n'
interface Props {
  isDeleteModalsVisible: boolean
  onCancel: () => void
  onDelete: () => void
  isProjectLimit?: boolean
  isTimer?: boolean
  title: string
}
const SignOutModalDetails: React.FC<Props> = ({
  isDeleteModalsVisible,
  onCancel,
  onDelete,
  isTimer,
  title,
  isProjectLimit,
}) => {
  return (
    <CustomModal visible={isDeleteModalsVisible} onClose={onCancel}>
       <Text style={styles.modalHeaderTextDelete}>{title}</Text>
    <View style={[positionStyles.rowFill, spacingStyles.mT30]}>
    <Button
    text={isProjectLimit ? i18n.t('cancel2'): i18n.t('cancel')}
    style={styles.flexHalf}
    textStyle={{ color: colors.WHITE, fontSize: 14, }}
    backgroundColor={colors.LIME}
    onPress={onCancel}
    />
   <View style={{ width: 25 }} />
    <Button
    text={isTimer ? i18n.t('stop'):i18n.t('ok')}
    style={styles.flexHalf}
    textStyle={{ color: colors.WHITE, fontSize: 14 }}
    backgroundColor={colors.LIGHT_RED}
    onPress={onDelete}
     />
   </View>
  </CustomModal>
  )
}
export default SignOutModalDetails
