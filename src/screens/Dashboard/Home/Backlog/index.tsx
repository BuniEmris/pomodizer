/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
// Components
import { Text, View, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from 'components/Header'
import CreateYourArrow from 'components/CreateYourArrow'
import TaskItem from 'components/TaskItem'

// Libs $ Utils
import navigationService from 'navigation/navigationService'
import { mockTasks } from './mockBacklogs'

// Types & Redux
import { Task } from 'types'

// Hooks
import { useFindRequest, useGetRequest } from 'hooks/apiClientHooks'
import { useIsFocused } from '@react-navigation/native'

// Styles & Assets
import styles from './styles'
import { spacingStyles } from 'styles'
import PlusIcon from 'assets/images/icons/plusPlist.svg'

const BacklogScreen = () => {
  const isFocused = useIsFocused()
  const [backlogsNumber, setBacklogsNumber] = useState(mockTasks.length)
  const {
    fetchEntities,
    isPending: isTasksPending,
    dataRespons,
    isRefreshing,
    loadMoreEntities,
    isAllFetched,
  } = useFindRequest('tasks', { status: 'hold' }, { isPending: true })

  const Tasks: Task[] = dataRespons.data

  useEffect(() => {
    if (isFocused) {
      fetchEntities()
    }
  }, [isFocused])

  useEffect(() => {
    if (isFocused) {
      fetchEntities()
    }
  }, [isFocused])

  const onCreateBacklogPress = () => {
    navigationService.navigate('Home', {
      screen: 'Backlog_Create',
      params: {
        isEdit: false,
        back: { rootRoutes: 'Home', screen: 'Home_Backlog' },
      },
    })
  }

  const onBacklogPress = (item: any) => {
    navigationService.navigate('Home', {
      screen: 'Backlog_Create',
      params: {
        task: item,
        isEdit: true,
        back: { rootRoutes: 'Home', screen: 'Home_Backlog' },
      },
    })
  }

  const onBack = () => {
    navigationService.goBack()
  }

  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Header
            text="Backlog"
            rightIcon={<PlusIcon />}
            onBack={onBack}
            onRightPress={onCreateBacklogPress}
          />
          <View
            style={[
              spacingStyles.mT17,
              spacingStyles.pT10,
              spacingStyles.pB50,
              styles.tasksContainer,
            ]}
          >
            <FlatList
              data={Tasks}
              keyExtractor={(item, index) => `${item.name}_${index}`}
              renderItem={({ item }) => (
                <TaskItem
                  item={item}
                  isBacklog={true}
                  onTaskPress={() => onBacklogPress(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={spacingStyles.mT5}
              ItemSeparatorComponent={() => <View style={spacingStyles.mT15} />}
              ListEmptyComponent={() => (
                <>
                  {!isTasksPending && (
                    <>
                      <CreateYourArrow
                        text="backlog now"
                        style={styles.greenArrow}
                      />
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                          You don't have any backlogs yet
                        </Text>
                      </View>
                    </>
                  )}
                  {isTasksPending && (
                    <View style={[styles.emptyContainer]}>
                      <ActivityIndicator />
                    </View>
                  )}
                </>
              )}
              ListFooterComponent={() =>
                isRefreshing ? <ActivityIndicator color="black" /> : null
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default BacklogScreen
