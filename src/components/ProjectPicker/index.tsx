import React from 'react'

// Components
import { Tag } from 'types'
import DmText from 'components/UI/DmText'
import Icon from 'react-native-vector-icons/Feather'

// Styles
import DmView from 'components/UI/DmView'
import DownArrow from 'assets/images/icons/inboxArrow.svg'
import { colors } from 'styles'
import i18n from 'locales/i18n'
import styles from './styles'

interface Props {
  projects: Tag[]
  onPress?: () => void
}

const ProjectPicker: React.FC<Props> = ({ projects, onPress }) => {
  return (
    <DmView onPress={onPress} minHeight={25} style={styles.container}>
      {projects?.map((item) => (
        <DmView key={item._id} flexDirection="row" alignItems="center">
          <DmView
            style={[styles.circleStyle, { backgroundColor: item.color }]}
          />
          <DmText style={styles.text} numberOfLines={1}>
            {item.name}
          </DmText>
        </DmView>
      ))}
      <DownArrow />
    </DmView>
  )
}

export default ProjectPicker
