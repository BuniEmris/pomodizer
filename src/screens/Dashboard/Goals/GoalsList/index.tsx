/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from 'react'
// Components
import { Text, View, FlatList, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from 'components/Header'
import CreateYourArrow from 'components/CreateYourArrow'
import GoalItem from 'components/GoalItem'
import { DmText, DmView } from 'components/UI'
import Icon from 'react-native-vector-icons/Feather'

// Libs $ Utils
import navigationService from 'navigation/navigationService'

// Hooks
import { useIsFocused } from '@react-navigation/native'
import { useFindRequest, useRemoveRequest } from 'hooks/apiClientHooks'

// Types & Redux
import { Goal } from 'types'

// Helpers
import { isAndroid } from 'styles/helpers'
import { SCREEN_WIDTH } from 'styles/helpers'

// Styles & Assets
import styles from './styles'
import { spacingStyles, colors } from 'styles'
import PlusIcon from 'assets/images/icons/plusPlist.svg'
import logger from 'utils/logger'
import { useTypedSelector } from 'store'
import i18n from 'locales/i18n'
import { patchGoal, removeGoal } from 'store/goals/thunkActions'
import { useDispatch } from 'react-redux'

const GoalsListScreen = () => {
  const isFocused = useIsFocused()
  const goalsList = useTypedSelector((store) => store.goals)

  const [isShowAchieved, setIsShowAchieved] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isFocused) {
      isAndroid && StatusBar.setBackgroundColor('white')
      StatusBar.setBarStyle('dark-content')
    }
  }, [isFocused])

  const handleOnStop = () => {
    navigationService.navigate('Projects', {
      screen: 'Projects_List',
    })
  }

  const onCreateGoalPress = () => {
    navigationService.navigate('Goals', {
      screen: 'Goal_Create',
      params: {
        back: { rootRoutes: 'Goals', screen: 'Goals_List' },
      },
    })
  }

  const onEditGoalPress = (goal: Goal) => {
    navigationService.navigate('Goals', {
      screen: 'Goal_Details',
      params: {
        goalId: goal._id,
        isEdit: true,
      },
    })
  }

  const handleDeleteGoalPress = async (goal: Goal) => {
    dispatch(removeGoal(goal._id))
  }

  const onEndReached = () => {
    // if (!isAllFetched) {
    //   loadMoreEntities()
    // }
  }

  const onBack = () => {
    navigationService.goBack()
  }

  const renderItem = ({ item, index }: { item: Goal; index: number }) => (
    <GoalItem
      goalItem={item}
      onGoalPress={() => {
        navigationService.navigate('Goals', {
          screen: 'Goal_Details',
          params: {
            goalId: item._id,
          },
        })
      }}
      onDeletePress={() => handleDeleteGoalPress(item)}
      onEditPress={() => onEditGoalPress(item)}
      isHasBorderBottom={index !== goalsList.length - 1}
      isDone={item.status === 'done'}
    />
  )
  const filteredGoals = useMemo(() => {
    if (isShowAchieved) {
      const sortedTags = [...goalsList].sort((a, b) => a.doneAt ? 1 : -1)
      return sortedTags
    }
    return goalsList.filter((item) => !item.doneAt)
  }, [goalsList, isShowAchieved])

  const isHasArchived = useMemo(() => {
    return !!goalsList.filter((item) => item.doneAt).length
  }, [goalsList])
  return (
    <>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Header
          text={i18n.t('goals')}
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
          onRightPress={onCreateGoalPress}
        />
        <View
          style={[
            spacingStyles.mT17,
            // spacingStyles.pB100,
            styles.goalsContainer,
          ]}
        >
          <FlatList
            data={filteredGoals}
            keyExtractor={(item, index) => `${item.title}_${index}`}
            ListHeaderComponent={() => <DmView marginTop={20} />}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            contentContainerStyle={spacingStyles.mT5}
            ListEmptyComponent={() => (
              <DmView marginTop={20}>
                <CreateYourArrow
                  text={`${i18n.t('firstGoal')}\n${i18n.t('goalnow')}`}
                  style={styles.greenArrow}
                />
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{i18n.t('notGoal')}</Text>
                </View>
              </DmView>
            )}
            ListFooterComponent={() => {
              if (!isHasArchived) return null

              return (
                <DmView
                  onPress={() => setIsShowAchieved((state) => !state)}
                  marginY={20}
                  style={styles.archiveContainer}
                >
                  <DmText style={styles.archiveText}>
                    {isShowAchieved
                      ? i18n.t('hideArchive')
                      : i18n.t('showArchive')}
                  </DmText>
                </DmView>
              )
            }}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

export default GoalsListScreen
