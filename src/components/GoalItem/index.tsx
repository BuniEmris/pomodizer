import React from 'react'
// Components
import { ViewStyle, Text, View, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { DmText, DmView } from 'components/UI'

// Styles & Assets
import styles from './styles'
import { colors, spacingStyles } from 'styles'
import DeleteIcon from 'assets/images/icons/deleteRed.svg'
import EditGreenIcon from 'assets/images/icons/editGreen.svg'
import CalendarIcon from 'assets/images/Dashboard/calendar.svg'
import { Goal } from 'types'
import Dash from 'react-native-dash'

interface Props {
  style?: ViewStyle | ViewStyle[]
  goalItem: Goal
  onGoalPress?: () => void
  onEditPress?: () => void
  onDeletePress?: () => void
  isHasBorderBottom?: boolean
  isDone?: boolean
}

const GoalItem: React.FC<Props> = ({
  style,
  goalItem,
  onGoalPress,
  onEditPress,
  onDeletePress,
  isDone,
  isHasBorderBottom = true,
}) => {
  const rightSwipe = () => {
    return (
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.editContainer} onPress={onEditPress}>
          <EditGreenIcon />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.deleteContainer}>
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={onDeletePress}
          >
            <DeleteIcon />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.9}
      onPress={onGoalPress}
    >
      <View style={styles.background} />
      <Swipeable renderRightActions={rightSwipe}>
        <View style={[styles.contentContainer, style]}>
          <Text style={styles.icon}>{goalItem?.emoji?.icon}</Text>
          <Text
            style={[styles.goalNameText, isDone && styles.goalNameTextDone]}
            numberOfLines={2}
          >
            {goalItem.title}
          </Text>
          {!!goalItem.dueDate && (
            <DmView style={styles.dueDateWr}>
              <DmText style={styles.dateText}>{goalItem.dueDate}</DmText>
            </DmView>
          )}
        </View>
      </Swipeable>
    </TouchableOpacity>
  )
}

export default GoalItem
