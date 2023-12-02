import React from 'react'
// Components
import {
  ViewStyle,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Dash from 'react-native-dash'

// Types
import { Note } from 'types'

// Styles & Assets
import styles from './styles'
import { colors, spacingStyles } from 'styles'
import DeleteIcon from 'assets/images/icons/deleteRed.svg'
import EditGreen from 'assets/images/icons/editGreen.svg'

interface Props {
  style?: ViewStyle | ViewStyle[]
  noteItem: Note
  isHasBorderBottom?: boolean
  onEditPress?: () => void
  onDeletePress?: () => void
  isDone?: boolean
}

const NoteItem: React.FC<Props> = ({
  style,
  noteItem,
  onEditPress,
  onDeletePress,
  isHasBorderBottom = true,
  isDone,
}) => {
  const rightSwipe = () => {
    return (
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.editContainer} onPress={onEditPress}>
          <EditGreen />
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
    <View style={[styles.container]}>
      <View style={styles.background} />
      <Swipeable renderRightActions={rightSwipe}>
        <TouchableOpacity activeOpacity={1} onPress={onEditPress}>
          <View style={styles.contentContainer}>
            <Text
              style={[styles.noteNameText, isDone && styles.noteNameTextDone]}
            >
              {noteItem.title}
            </Text>
            <View style={styles.datesContainer}>
              {noteItem.dueDate && (
                <Text style={[styles.dateText, spacingStyles.mR10]}>
                  {noteItem.dueDate}
                </Text>
              )}
              <Text style={[styles.dateText]}>{noteItem.dueTime}</Text>
            </View>
          </View>
          {isHasBorderBottom && (
            <Dash
              style={styles.dash}
              dashGap={5}
              dashLength={5}
              dashThickness={1}
              dashColor={colors.LIGHT_GREY}
            />
          )}
        </TouchableOpacity>
      </Swipeable>
    </View>
  )
}

export default NoteItem
