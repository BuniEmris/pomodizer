/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-native/no-inline-styles */
import React, { ReactElement } from 'react'
// Components
import { Text, View } from 'react-native'
import DmText from 'components/UI/DmText'

// Types
import { SvgProps } from 'react-native-svg'

// Styles & Assets
import styles from './styles'
import { positionStyles, spacingStyles } from 'styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Goal, Note } from 'types'
import navigationService from 'navigation/navigationService'
import i18n from 'locales/i18n'
import { useTypedSelector } from 'store'
import { selectDashboardInboxTask } from 'store/tasks/selectors'
import { DmView } from 'components/UI'

export interface CarouselContent {
  contentType: 'goals' | 'notes'
  goals?: Goal[]
  notes?: Note[]
}

type Props = CarouselContent

const CarouselItem: React.FC<Props> = ({ contentType, goals, notes }) => {
  const tasks = useTypedSelector(selectDashboardInboxTask)
  const goalsList = useTypedSelector((store) => store.goals)
  const goalLength = goalsList?.filter((item) => !item.doneAt)

  const getContent = () => {
    if (contentType === 'goals') {
      return (
        <View style={[styles.itemGoalsContent]}>
          <View>
            {goalsList
              ?.filter((item) => !item.doneAt)
              .slice(0, 3)
              .map((goal, index) => (
                <TouchableOpacity
                  key={goal._id}
                  style={[positionStyles.rowFill, spacingStyles.mT10]}
                  onPress={() => {
                    navigationService.navigate('Goals', {
                      screen: 'Goal_Details',
                      params: {
                        goalId: goal._id,
                      },
                    })
                  }}
                >
                  <Text style={[styles.nameOfGoalsNotesText]}>
                    {goal.title}
                  </Text>
                </TouchableOpacity>
              ))}
            {!goalLength?.length && (
              <>
                <DmView
                  onPress={() => {
                    navigationService.navigate('Goals', {
                      screen: 'Goal_Create',
                    })
                  }}
                  marginTop={40}
                >
                  <Text style={styles.itemGreenHeaderText}>
                    {i18n.t('addGoal')}
                  </Text>
                </DmView>
              </>
            )}
          </View>
          {/* <CalendarIcon style={spacingStyles.mT10} /> */}
        </View>
      )
    }

    if (contentType === 'notes') {
      return (
        <View>
          <View>
            {tasks?.slice(0, 3).map((task) => (
              <TouchableOpacity
                key={task._id}
                style={[spacingStyles.mT10]}
                onPress={() => {
                  navigationService.navigate('Inbox', {
                    screen: 'Inbox_Tasks',
                    params: {
                      taskId: task._id,
                      isEdit: true,
                    },
                  })
                }}
              >
                <Text style={[styles.nameOfGoalsNotesText]}>{task.name}</Text>
              </TouchableOpacity>
            ))}
            {!tasks?.length && (
              <DmView>
                <DmView
                  onPress={() => {
                    navigationService.navigate('Inbox', {
                      screen: 'Inbox_Task_Create',
                    })
                  }}
                  marginTop={40}
                >
                  <Text style={styles.itemGreenHeaderText}>
                    {i18n.t('addInbox')}
                  </Text>
                </DmView>
              </DmView>
            )}
          </View>
        </View>
      )
    }
    return null
  }

  const handlePress = (type: CarouselContent['contentType']) => {
    navigationService.navigate(type === 'goals' ? 'Goals' : 'Inbox')
  }
  return (
    <View style={[styles.carouselItemContainer]}>
      <View style={positionStyles.rowFill}>
        {contentType === 'goals' ? (
          <Text style={styles.itemHeaderText}>{i18n.t('goals')}</Text>
        ) : (
          <Text style={styles.itemHeaderText}>{i18n.t('inbox')}</Text>
        )}
        <TouchableOpacity onPress={() => handlePress(contentType)}>
          {contentType === 'goals' && !!goalLength?.length && (
            <Text style={styles.itemGreenHeaderText}>{i18n.t('allgoal')}</Text>
          )}
          {contentType === 'notes' && !!tasks.length && (
            <Text style={styles.itemGreenHeaderText}>{i18n.t('allInbox')}</Text>
          )}
        </TouchableOpacity>
      </View>
      {getContent()}
    </View>
  )
}

export default CarouselItem
