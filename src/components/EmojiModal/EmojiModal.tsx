import React from 'react'

// Components
import { Pressable, TouchableOpacity } from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import EmojiSelector from '@manu_omg/react-native-emoji-selector'
import Modal from 'react-native-modal'

// Styles
import * as S from './styled.components'

interface Props {
  onEmojiSelect: (emoji: string) => void
  isVisible: boolean
  onClose: () => void
}

const EmojiModal: React.FC<Props> = ({isVisible, onEmojiSelect, onClose}) => {
  return (
  <Modal isVisible={isVisible} style={{margin: 0}}>
    <S.Container>
      <DmView flexDirection="row" justifyContent="space-between" pt={10} px={15} pb={20}>
        <DmText fontSize={18} fontWeight="400">Select emoji</DmText>
        <TouchableOpacity onPress={onClose}>
          <DmText fontSize={15} fontWeight="500">Close</DmText>
        </TouchableOpacity>
      </DmView>
      <EmojiSelector onEmojiSelected={onEmojiSelect} />
    </S.Container>
  </Modal>
  )}

  export default EmojiModal
