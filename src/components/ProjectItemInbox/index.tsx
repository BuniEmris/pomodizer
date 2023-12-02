import React from 'react'
// Components
import { ViewStyle, Text, View, TouchableOpacity } from 'react-native'
import DmView from 'components/UI/DmView'
import DmText from 'components/UI/DmText'

// Styles & Assets
import BackArrow from 'assets/images/icons/backArrow.svg'
import styles from './styles'
import { colors, positionStyles, spacingStyles } from 'styles'
import * as S from './styled.components'
import Dash from 'react-native-dash'

interface Props {
  style?: ViewStyle | ViewStyle[]
  projectItem?: any
  onProjectPress?: () => void
  isSimple?: boolean
  isInbox?: boolean
}

const ProjectItemInbox: React.FC<Props> = ({
  style,
  projectItem,
  onProjectPress,
  isSimple,
}) => {
  return (
    <S.ItemWr onPress={onProjectPress} isSimple={isSimple}>
      <View style={positionStyles.rowStart}>
        <DmView
          style={[styles.circleStyle, { backgroundColor: projectItem.color }]}
        />
        <Text
          style={[
            styles.noteNameText,
            projectItem.isArchived && styles.noteNameTextArcheved,
            isSimple && styles.noteNameTextSimple,
            spacingStyles.mL5,
          ]}
        >
          {projectItem.name}
        </Text>
      </View>
    </S.ItemWr>
  )
}

export default ProjectItemInbox
