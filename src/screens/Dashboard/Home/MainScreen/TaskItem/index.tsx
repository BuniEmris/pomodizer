/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef } from 'react'
// Components
import { ViewStyle, Text, View, TouchableOpacity } from 'react-native'
import Dash from 'react-native-dash'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import ProjectList from 'components/ProjectList'
import IconBtn from 'components/UI/IconBtn'
import Swipeable from 'react-native-gesture-handler/Swipeable'

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

interface Props {
  style?: ViewStyle | ViewStyle[]
  onStartTask?: () => void
  onLongPress?: () => void
  onPausePress?: () => void
  onTaskPress?: () => void
  onFinishTask?: () => void
  onEditPress?: () => void
  onDeletePress: () => void
  setEditing?: (val: boolean) => void
  isBacklog?: boolean
  isActive?: boolean
  isPaused?: boolean
  isHasBorderBottom?: boolean
  item: Task
}

const TaskItem: React.FC<Props> = ({
  style,
  item,
  isActive,
  isBacklog,
  isPaused,
  onStartTask,
  onTaskPress,
  onPausePress,
  onFinishTask,
  onEditPress,
  onDeletePress,
  onLongPress,
  setEditing = () => {},
  isHasBorderBottom = true,
}) => {
  const swipeableRef = useRef<any>(null)

  const renderTomatoText = () => {
    let text = String(item.tomatoFact)
    if (item.tomatoPlan) {
      text = text + '/' + item.tomatoPlan
    } else {
      text = text + '/' + 1
    }

    return text
  }

  const rightSwipe = () => {
    return (
      <View style={[styles.rightContainer]}>
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
  return (
    <>
      <View style={[styles.shadow]}>
        <TouchableOpacity
          style={[styles.container]}
          activeOpacity={0.9}
          onPress={onTaskPress}
          onLongPress={onLongPress}
        >
          <View style={styles.background} />
          <Swipeable ref={swipeableRef} renderRightActions={rightSwipe}>
            <View style={[styles.contentContainer, style]}>
              <DmView paddingBottom={10} paddingTop={10}>
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
                  {!!item.description && (
                    <Text
                      style={[styles.taskNameDescription]}
                      numberOfLines={1}
                    >
                      {item.description}
                    </Text>
                  )}

                  {!isBacklog && (
                    <DmView flexDirection="row" marginTop={1}>
                      {!!item.tags.length && (
                        <ProjectList projects={item.tags} />
                      )}

                      {isActive && (
                        <DmView
                          flexGrow={1}
                          justifyContent="flex-end"
                          flexDirection="row"
                        >
                          <IconBtn
                            Icon={
                              isPaused
                                ? () => <PlayButton width={25} height={25} />
                                : () => <PauseButton width={25} height={25} />
                            }
                            label={
                              isPaused ? i18n.t('continue') : i18n.t('pause')
                            }
                            reverse
                            onPress={onPausePress}
                          />
                        </DmView>
                      )}
                      {!isActive && (
                        <>
                          <DmView flexDirection="row" alignItems="center">
                            {!!item.dueTime && (
                              <DmView
                                flexDirection="row"
                                marginRight={10}
                                alignItems="center"
                              >
                                <ClockIcon width={15} height={15} />
                                <Text
                                  style={[
                                    styles.taskStatsText,
                                    spacingStyles.mL3,
                                  ]}
                                >
                                  {item.dueTime}
                                </Text>
                              </DmView>
                            )}
                            {/* <DmView flexDirection="row" alignItems="center">
                              <TomatoIcon width={15} height={15} />
                              <Text
                                style={[
                                  styles.taskStatsText,
                                  spacingStyles.mL2,
                                ]}
                              >
                                {renderTomatoText()}
                              </Text>
                            </DmView> */}
                          </DmView>
                          {item.status !== 'done' && (
                            <DmView
                              flexDirection="row"
                              flexGrow={1}
                              justifyContent="flex-end"
                            >
                              <IconBtn
                                Icon={() => (
                                  <CheckButton width={25} height={25} />
                                )}
                                onPress={onFinishTask}
                              />

                              <DmView marginLeft={10}>
                                <IconBtn
                                  onPress={onStartTask}
                                  Icon={() => (
                                    <PlayButton width={25} height={25} />
                                  )}
                                />
                              </DmView>
                            </DmView>
                          )}
                        </>
                      )}
                    </DmView>
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
      </View>
    </>
  )
}

export default TaskItem
