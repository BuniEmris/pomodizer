import React from 'react'

// Components
import { Tag } from 'types'
import DmText from 'components/UI/DmText'
import Icon from 'react-native-vector-icons/Feather'

// Styles
import * as S from './styled.components'
import DmView from 'components/UI/DmView'
import { colors } from 'styles'
import i18n from 'locales/i18n'

interface Props {
  projects: Tag[]
  onPress?: () => void
  addIfEmpty?: boolean
}

const ProjectList: React.FC<Props> = ({ projects, onPress, addIfEmpty }) => {
  return (
    <DmView
      flexDirection="row"
      onPress={onPress}
      minHeight={25}
      alignItems="center"
    >
      {projects?.map((item) => (
        <DmText
          fontSize={13}
          fontWeight="700"
          key={item._id}
          color={item.color}
          marginRight={5}
        >
          <Icon name="package" size={13} color={item.color} /> {item.name}
        </DmText>
      ))}
      {addIfEmpty && !projects.length && (
        <DmText
          fontSize={13}
          fontWeight="700"
          color={colors.DARK_GREY}
          marginRight={5}
        >
          <Icon name="package" size={13} color={colors.DARK_GREY} />{' '}
          {i18n.t('addProject')}
        </DmText>
      )}
    </DmView>
  )
}

export default ProjectList
