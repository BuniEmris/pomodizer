/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useRef, useState } from 'react'
// Components
import {
  Text,
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from 'components/Header'
import CreateYourArrow from 'components/CreateYourArrow'
import ProjectItem from 'components/ProjectItem'
import DmView from 'components/UI/DmView'
import DmText from 'components/UI/DmText'
import Icon from 'react-native-vector-icons/Feather'

// Libs $ Utils
import navigationService from 'navigation/navigationService'
import { mockProjects } from './mockProjects'

// Hooks
import { useFindRequest } from 'hooks/apiClientHooks'
import { useIsFocused } from '@react-navigation/native'
import usePremium from 'hooks/usePremium'

// Helpers
import { isAndroid } from 'styles/helpers'
import { SCREEN_WIDTH } from 'styles/helpers'

// Types & Redux
import { Tag } from 'types'

// Styles & Assets
import styles from './styles'
import { colors, spacingStyles, typo } from 'styles'
import PlusIcon from 'assets/images/icons/plusPlist.svg'
import { useTypedSelector } from 'store'
import i18n from 'locales/i18n'
import SignOutModalDetails from 'components/UI/SignOutModalDetails'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { GREEN } from 'styles/colors'

const ProjectsListScreen = () => {
  const isFocused = useIsFocused()
  const tagsList = useTypedSelector((store) => store.tags)
  const { isPremium } = usePremium()

  const [isShowArchived, setIsShowArchived] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const menuModalRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (isFocused) {
      isAndroid && StatusBar.setBackgroundColor('white')
      StatusBar.setBarStyle('dark-content')
    }
  }, [isFocused])

  const handleOnStop = () => {
    navigationService.navigate('Home', {
      screen: 'Home_Main',
    })
  }

  const onCreateProjectPress = () => {
    if (filteredTags?.length == 3 && !isPremium) {
      navigationService.navigate('Premium')
      return
    }
    navigationService.navigate('Projects', {
      screen: 'Project_Create',
      params: {
        back: { rootRoutes: 'Projects', screen: 'Projects_List' },
      },
    })
  }

  const onBack = () => {
    navigationService.goBack()
  }

  const filteredTags = useMemo(() => {
    if (isShowArchived) {
      const sortedTags = [...tagsList].sort((a, b) => a.isArchived ? 1 : -1)
      return sortedTags
    }
    return tagsList.filter((item) => !item.isArchived)
  }, [tagsList, isShowArchived])

  const isHasArchived = useMemo(() => {
    return !!tagsList.filter((item) => item.isArchived).length
  }, [tagsList])

  return (
    <>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Header
          text={i18n.t('projects')}
          rightIcon={
            <DmView
              height={35}
              justifyContent="flex-end"
              flexDirection="row"
              alignItems="flex-end"
            >
              <Icon name="plus-circle" size={28} color={colors.LIME} />
            </DmView>
          }
          onBack={onBack}
          isBackHiden={true}
          onRightPress={onCreateProjectPress}
        />
        <View style={[spacingStyles.mT17, styles.projectsContainer]}>
          <FlatList
            ListHeaderComponent={() => <DmView marginTop={20} />}
            data={filteredTags}
            keyExtractor={(item, index) => `${item.name}_${index}`}
            renderItem={({ item }) => (
              <ProjectItem
                projectItem={item}
                onProjectPress={() => {
                  navigationService.navigate('Projects', {
                    screen: 'Project_Details',
                    params: {
                      project: item,
                    },
                  })
                }}
              />
            )}
            contentContainerStyle={spacingStyles.mT5}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={spacingStyles.mT10} />}
            ListEmptyComponent={() => (
              <DmView marginTop={20}>
                <CreateYourArrow
                  text={`${i18n.t('first')}\n${i18n.t('projectnow')}`}
                  style={styles.greenArrow}
                />
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{i18n.t('notProject')}</Text>
                </View>
              </DmView>
            )}
            ListFooterComponent={() => {
              if (!isHasArchived) return <DmView marginBottom={40} />

              return (
                <DmView
                  onPress={() => setIsShowArchived((state) => !state)}
                  marginY={25}
                  style={styles.archiveContainer}
                >
                  <DmText style={styles.archiveText}>
                    {isShowArchived
                      ? i18n.t('hideArchive')
                      : i18n.t('showArchive')}
                  </DmText>
                </DmView>
              )
            }}
          />
          <SignOutModalDetails
            isProjectLimit
            title={i18n.t('noMoreAddProjects')}
            onCancel={() => setIsShowModal(false)}
            onDelete={() => setIsShowModal(false)}
            isDeleteModalsVisible={isShowModal}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

export default ProjectsListScreen
