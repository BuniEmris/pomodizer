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
  isAccount?: boolean
  noBodyText?: boolean
  title: string
}
const DeleteModalDetails: React.FC<Props> = ({
  isDeleteModalsVisible,
  onCancel,
  onDelete,
  title,
  isAccount,
  noBodyText,
}) => {
  const [isdeletAccount, setIsdeletAccount] = useState(false)
  return (
    <CustomModal
      visible={isDeleteModalsVisible}
      onClose={isdeletAccount ? () => {} : onCancel}
    >
      {isdeletAccount ? (
        <Text style={styles.modalHeaderTextDelete}>
          {i18n.t('accountDeleted')}
        </Text>
      ) : isAccount ? (
        <Text style={styles.modalHeaderTextDelete}>
          {i18n.t('deleteAccountAlert')}
        </Text>
      ) : (
        <>
          <Text style={styles.modalHeaderText}>{i18n.t('sure') + title}?</Text>
          {!noBodyText && (
            <Text style={[styles.modalText, spacingStyles.mT15]}>
              {title + i18n.t('bedeleted')}
            </Text>
          )}
        </>
      )}

      {isdeletAccount ? (
        <View style={[positionStyles.rowCenter, spacingStyles.mT30]}>
          <Button
            text={i18n.t('ok')}
            style={styles.flexHalf}
            textStyle={{ color: colors.WHITE, fontSize: 14 }}
            backgroundColor={colors.LIGHT_RED}
            onPress={onDelete}
          />
        </View>
      ) : (
        <View style={[positionStyles.rowFill, spacingStyles.mT30]}>
          <Button
            text={i18n.t('cancel')}
            style={styles.flexHalf}
            textStyle={{ color: colors.WHITE, fontSize: 14 }}
            backgroundColor={colors.LIME}
            onPress={onCancel}
          />
          <View style={{ width: 25 }} />
          <Button
            text={isAccount ? i18n.t('delete') : i18n.t('ok')}
            style={styles.flexHalf}
            textStyle={{ color: colors.WHITE, fontSize: 14 }}
            backgroundColor={colors.LIGHT_RED}
            onPress={isAccount ? () => setIsdeletAccount(true) : onDelete}
          />
        </View>
      )}
    </CustomModal>
  )
}
export default DeleteModalDetails
