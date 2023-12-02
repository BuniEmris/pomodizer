/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from 'react'
// Components
import {
  Text,
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from 'components/Header'
import CreateYourArrow from 'components/CreateYourArrow'
import NoteItem from 'components/NoteItem'

// Libs $ Utils
import navigationService from 'navigation/navigationService'
import logger from 'utils/logger'

// Hooks
import { useIsFocused } from '@react-navigation/native'
import { useFindRequest, useRemoveRequest } from 'hooks/apiClientHooks'

// Types & redux
import { Note } from 'types'

// Helpers
import { isAndroid } from 'styles/helpers'

// Styles & Assets
import styles from './styles'
import { positionStyles, spacingStyles } from 'styles'
import PlusIcon from 'assets/images/icons/plusPlist.svg'
import { useTypedSelector } from 'store'
import i18n from 'locales/i18n'

const NotesListScreen = () => {
  const isFocused = useIsFocused()

  const notesList = useTypedSelector((store) => store.notes)

  useEffect(() => {
    if (isFocused) {
      isAndroid && StatusBar.setBackgroundColor('white')
      StatusBar.setBarStyle('dark-content')
    }
  }, [isFocused])

  const onCreateNotePress = () => {
    navigationService.navigate('Notes', {
      screen: 'Note_Create',
      params: {
        back: { rootRoutes: 'Notes', screen: 'Notes_List' },
      },
    })
  }

  const onEditNotePress = (note: Note) => {
    navigationService.navigate('Notes', {
      screen: 'Note_Detail',
      params: {
        back: { rootRoutes: 'Notes', screen: 'Notes_List' },
        noteId: note._id,
        isEdit: true,
      },
    })
  }

  const onDeleteNotePress = async (note: Note) => {
    // try {
    //   await removeEntity(note._id, {})
    // } catch (e) {
    //   logger.log('Note delete error', e)
    // } finally {
    //   fetchEntities()
    // }
  }

  const onEndReached = () => {
    // if (!isAllFetched) {
    //   loadMoreEntities()
    // }
  }

  const onBack = () => {
    navigationService.goBack()
  }

  const renderNote = ({ item, index }: { item: Note; index: number }) => (
    <NoteItem
      isHasBorderBottom={notesList.length - 1 !== index}
      noteItem={item}
      onEditPress={() => onEditNotePress(item)}
      onDeletePress={() => onDeleteNotePress(item)}
      isDone={item.status === 'done'}
    />
  )

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          text="Inbox"
          rightIcon={<PlusIcon />}
          onBack={onBack}
          isBackHiden={true}
          onRightPress={onCreateNotePress}
        />
        <View
          style={[
            spacingStyles.mT17,
            spacingStyles.pT20,
            styles.notesContainer,
          ]}
        >
          <FlatList
            data={notesList}
            keyExtractor={(item, index) => `${item.title}_${index}`}
            renderItem={renderNote}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            contentContainerStyle={[spacingStyles.mT5, spacingStyles.pB100]}
            ListEmptyComponent={() => (
              <>
                <CreateYourArrow
                  text={`${i18n.t('first')}\n${i18n.t('notenow')}`}
                  style={styles.greenArrow}
                />
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{i18n.t('notReminder')}</Text>
                </View>
              </>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

export default NotesListScreen
