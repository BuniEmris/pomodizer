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
  onEdit: () => void
  onDelete: () => void
  onArchive: () => void
}

const ProjectModalControls = React.forwardRef<BottomSheetModal, Props>(
  ({ onEdit, onDelete, onArchive }, ref) => {
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
            {i18n.t('project') + i18n.t('options')}
          </DmText>
          <ModalMenuItem
            label={i18n.t('edit')}
            onPress={onEdit}
            iconName="edit"
          />
          <ModalMenuItem
            label={i18n.t('archive')}
            onPress={onArchive}
            iconName="archive"
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

export default ProjectModalControls
