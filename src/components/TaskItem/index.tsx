import React, { useMemo, useRef } from 'react'
// Components
import { ViewStyle, Text, View, TouchableOpacity } from 'react-native'
import Dash from 'react-native-dash'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import ProjectList from 'components/ProjectList'
import IconBtn from 'components/UI/IconBtn'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/Feather'

// Libs & Utils
import logger from 'utils/logger'

// Types
import { Task } from 'types'

// Hooks

// Styles & Assets
import styles from './styles'
import { colors, positionStyles, spacingStyles } from 'styles'
import PlayButton from 'assets/images/Dashboard/play.svg'
import CheckButton from 'assets/images/Dashboard/check.svg'
import PauseButton from 'assets/images/Dashboard/pause.svg'
import CancelButton from 'assets/images/Dashboard/cross.svg'
import TomatoIcon from 'assets/images/icons/tomato.svg'
import ClockIcon from 'assets/images/icons/clock.svg'
import DeleteIcon from 'assets/images/icons/deleteRed.svg'
import EditGreenIcon from 'assets/images/icons/editGreen.svg'
import i18n from 'locales/i18n'
import { dueDateToMoment } from 'utils/date'
import moment from 'moment'

interface Props {
  style?: ViewStyle | ViewStyle[]
  onStartTask?: () => void
  onLongPressTask?: () => void
  onPausePress?: () => void
  onTaskPress?: () => void
  onFinishTask?: () => void
  onEditPress?: () => void
  onDeletePress: () => void
  isBacklog?: boolean
  isActive?: boolean
  isPaused?: boolean
  isShowPrev?: boolean
  isHasBorderBottom?: boolean
  item: Task
}

const TaskItem: React.FC<Props> = ({
  style,
  item,
  isActive,
  isBacklog,
  isPaused,
  isShowPrev,
  onStartTask,
  onTaskPress,
  onPausePress,
  onFinishTask,
  onEditPress,
  onDeletePress,
  onLongPressTask,
  isHasBorderBottom = true,
}) => {
  const swipeableRef = useRef<any>(null)

  const renderTomatoText = () => {
    let text = String(item.tomatoFact)
    if (item.tomatoPlan) {
      text = text + ' / ' + item.tomatoPlan
    }

    return text
  }
  const rightSwipe = () => {
    return (
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.editContainer} onPress={onEditPress}>
          <EditGreenIcon />
          <Text style={styles.editText}>{i18n.t('edit')}</Text>
        </TouchableOpacity>
        <View style={styles.deleteContainer}>
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={() => {
              onDeletePress()
              swipeableRef.current.close()
            }}
          >
            <DeleteIcon />
            <Text style={styles.deleteText}>{i18n.t('delete')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const isPrevDate = useMemo(() => {
    return item.dueDate
      ? dueDateToMoment(item.dueDate).isBefore(moment(), 'day')
      : false
  }, [item.dueDate])

  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.9}
      onPress={onTaskPress}
      onLongPress={onLongPressTask}
    >
      <View style={styles.background} />
      <Swipeable ref={swipeableRef} renderRightActions={rightSwipe}>
        <View style={[styles.contentContainer, style]}>
          <DmView paddingBottom={20} paddingTop={25}>
            <View
              style={[
                styles.taskItemContainer,
                {
                  borderLeftColor:
                    item?.tagsIds?.length > 0
                      ? item.tags[0]?.color
                      : colors.WHITE,
                },
              ]}
            >
              <Text
                style={[
                  styles.taskNameText,
                  item.status === 'done' && styles.taskNameFinished,
                ]}
                numberOfLines={2}
              >
                {item.name}
              </Text>

              <ProjectList projects={item.tags} />

              {!isBacklog && (
                <View style={positionStyles.rowFill}>
                  {isActive && (
                    <>
                      <IconBtn
                        Icon={isPaused ? PlayButton : PauseButton}
                        label={isPaused ? i18n.t('continue') : i18n.t('pause')}
                        onPress={onPausePress}
                      />
                    </>
                  )}
                  {!isActive && (
                    <>
                      <View style={[positionStyles.rowStart]}>
                        <TouchableOpacity onPress={onStartTask}>
                          <PlayButton />
                        </TouchableOpacity>
                        <TomatoIcon style={[spacingStyles.mL23]} />
                        <Text style={[styles.taskStatsText, spacingStyles.mL5]}>
                          {renderTomatoText()}
                        </Text>
                        {!!item.dueTime && !isShowPrev && (
                          <>
                            <ClockIcon style={[spacingStyles.mL23]} />
                            <Text
                              style={[styles.taskStatsText, spacingStyles.mL5]}
                            >
                              {item.dueTime}
                            </Text>
                          </>
                        )}
                        {isPrevDate && isShowPrev && (
                          <>
                            <Icon
                              style={[spacingStyles.mL15]}
                              name="calendar"
                              size={18}
                              color={colors.LIGHT_RED}
                            />
                            <Text
                              style={[
                                styles.taskStatsText,
                                styles.dueDateUncompleted,
                                spacingStyles.mL5,
                              ]}
                            >
                              {item.dueDate}
                            </Text>
                          </>
                        )}
                      </View>
                      <IconBtn Icon={CheckButton} onPress={onFinishTask} />
                    </>
                  )}
                </View>
              )}
            </View>
          </DmView>
        </View>
      </Swipeable>
      <Dash
        style={styles.dash}
        dashGap={5}
        dashLength={5}
        dashThickness={1}
        dashColor={colors.LIGHT_GREY}
      />
    </TouchableOpacity>
  )
}

export default TaskItem
