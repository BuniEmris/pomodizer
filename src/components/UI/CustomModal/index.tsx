import React from 'react'
// Components
import { View } from 'react-native'
import Modal from 'react-native-modal'

// Assets & Styles
import styles from './styles'

interface Props {
  visible: boolean
  onClose: () => void
}

const CustomModal: React.FC<Props> = ({ visible, onClose, children }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.alertContainer}>{children}</View>
    </Modal>
  )
}

export default CustomModal
