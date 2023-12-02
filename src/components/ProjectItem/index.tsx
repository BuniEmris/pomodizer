import React from 'react'
// Components
import { ViewStyle, Text, View, TouchableOpacity } from 'react-native'
import DmView from 'components/UI/DmView'
import DmText from 'components/UI/DmText'

// Styles & Assets
import BackArrow from 'assets/images/icons/backArrow.svg'
import styles from './styles'
import { positionStyles, spacingStyles } from 'styles'
import * as S from './styled.components'

interface Props {
  style?: ViewStyle | ViewStyle[]
  projectItem?: any
  onProjectPress?: () => void
  isSimple?: boolean
}

const ProjectsItem: React.FC<Props> = ({
  style,
  projectItem,
  onProjectPress,
  isSimple,
}) => {
  return (
    <S.ItemWr onPress={onProjectPress} isSimple={isSimple}>
      <View style={positionStyles.rowStart}>
        <DmView
          height={isSimple ? 30 : 50}
          width={isSimple ? 2 : 3}
          style={{ backgroundColor: projectItem.color }}
        />
        <Text
          style={[
            styles.noteNameText,
            projectItem.isArchived && styles.noteNameTextArcheved,
            isSimple && styles.noteNameTextSimple,
            spacingStyles.mL10,
          ]}
        >
          {projectItem.name}
        </Text>
      </View>
      {!isSimple && (
        <View
          style={[spacingStyles.mR20, { transform: [{ rotateY: '180deg' }] }]}
        />
      )}
    </S.ItemWr>
  )
}

export default ProjectsItem
