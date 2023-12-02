import React from 'react'

// Components
import { Text } from 'react-native'
import DmView from 'components/UI/DmView'
import DmText from 'components/UI/DmText'

import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import ModalMenuItem from 'components/ModalMenuItem'

// Styles
import * as S from './styled.components'
import i18n from 'locales/i18n'

interface Props {
  onShare: () => void
  onDelete: () => void
  onFinish: () => void
}

const ModalControls = React.forwardRef<BottomSheetModal, Props>(
  ({ onShare, onDelete, onFinish }, ref) => {
    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    )

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={[220]}
        backdropComponent={renderBackdrop}
      >
        <DmView paddingX={12}>
          <DmText fontSize={14} fontWeight="500" marginBottom={10}>
            {i18n.t('goal') + i18n.t('options')}
          </DmText>
          {/* <ModalMenuItem label="Convert to Task" onPress={handlePlay} iconName="play" /> */}
          {/* <ModalMenuItem label="Mark as done" onPress={onFinish} iconName="check-circle" /> */}
          <ModalMenuItem
            label={i18n.t('share')}
            onPress={onShare}
            iconName="share-2"
          />
          <ModalMenuItem
            label={i18n.t('delete')}
            onPress={onDelete}
            iconName="trash-2"
          />
        </DmView>
      </BottomSheetModal>
    )
  }
)

export default ModalControls
