import React, { useMemo, useRef, useState } from 'react'

// Components
import { FlatList, Text } from 'react-native'
import PickerModal from 'components/UI/PickerModal'
import ProjectItem from 'components/ProjectItem'
import Modal from 'react-native-modal'

// Hooks
import usePremium from 'hooks/usePremium'

// Styles
import * as S from './styled.components'
import { useTypedSelector } from 'store'
import { Tag } from 'types'
import { DmText, DmView } from 'components/UI'
import styles from './styles'
import navigationService from 'navigation/navigationService'
import i18n from 'locales/i18n'
import { colors, positionStyles } from 'styles'
import ProjectItemInbox from 'components/ProjectItemInbox'
import Dash from 'react-native-dash'

interface Props {
  isVisible: boolean
  isInbox?: boolean
  onSelect: (item: any) => void
  onClose: () => void
}

const TagsPicker: React.FC<Props> = ({
  isInbox,
  isVisible,
  onSelect,
  onClose,
}) => {
  const { isPremium } = usePremium()
  const tags = useTypedSelector((store) => store.tags)
  const all = {
    _id: 'all',
    name: i18n.t('all'),
    description: '',
    color: 'black',
    isArchived: false,
  }
  const activeTags = useMemo(() => {
    return tags.filter((el) => !el.isArchived)
  }, [tags])

  const renderTagItemInbox = ({ item }: { item: Tag }) => {
    return (
      <DmView paddingX={20}>
        <ProjectItemInbox
          projectItem={item}
          onProjectPress={() => {
            onSelect(item)
          }}
          isSimple
        />
        <Dash
          dashLength={5}
          dashThickness={1}
          dashColor={colors.LIGHT_GREY}
          dashGap={5}
        />
      </DmView>
    )
  }

  return (
    <Modal isVisible={isVisible} style={S.ModalStyle} onBackdropPress={onClose}>
      <S.Container>
        {isInbox && (
          <DmView paddingX={20}>
            <DmView
              paddingTop={15}
              paddingBottom={10}
              onPress={() => onSelect(all)}
              style={styles.allContainer}
            >
              <DmView style={[styles.circleStyle, styles.allCircle]} />
              <DmText marginLeft={5} style={styles.all}>
                {i18n.t('all')}
              </DmText>
            </DmView>
            <Dash
              dashLength={5}
              dashThickness={1}
              dashColor={colors.LIGHT_GREY}
              dashGap={5}
            />
          </DmView>
        )}
        <FlatList data={activeTags} renderItem={renderTagItemInbox} />
        {!isInbox && (
          <DmView
            paddingTop={15}
            paddingLeft={25}
            onPress={() => {
              if (activeTags?.length == 3 && !isPremium) {
                navigationService.navigate('Premium')
                return
              }

              navigationService.navigate('Projects', {
                screen: 'Project_Create',
                params: { taskNew: true },
              })
              if (onClose) {
                onClose()
              }
            }}
          >
            <DmText style={styles.addNew}>{i18n.t('addNew')}</DmText>
          </DmView>
        )}
      </S.Container>
    </Modal>
  )
}

export default TagsPicker
