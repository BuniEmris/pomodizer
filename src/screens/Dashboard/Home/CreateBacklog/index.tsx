/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
// Components
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormHeader from 'components/Header'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'
import Picker from 'components/UI/PickerModal'

// Libs & Utils
import navigationService from 'navigation/navigationService'
import logger from 'utils/logger'

// Types
import { HomeRouteProps } from 'navigation/DashboardNavigator'

// Hooks
import { useRemoveRequest } from 'hooks/apiClientHooks'

// Assets & Styles
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import { colors, positionStyles, spacingStyles } from 'styles'
import i18n from 'locales/i18n'

type Props = HomeRouteProps

const CreateBacklogScreen: React.FC<Props> = ({ route }) => {
  const back = route.params?.back
  const task = route.params?.task
  const isEdit = route.params?.isEdit

  const [project, setProject] = useState(null)
  const projectSet = [
    { label: 'Project 1', value: 'Project 1' },
    { label: 'Project 2', value: 'Project 2' },
  ]
  const { removeEntity, isPending: isDeletePending } = useRemoveRequest('tasks')

  const onBack = () => {
    if (back?.rootRoutes) {
      return navigationService.navigate(back?.rootRoutes, {
        screen: back?.screen,
      })
    }

    navigationService.goBack()
  }

  const onCancelPress = () => {
    onBack()
  }

  const onCreatePress = () => {
    onBack()
  }

  const onDeletePress = async () => {
    try {
      await removeEntity(task._id, {})
    } catch (e) {
      logger.log('Note delete error', e)
    } finally {
      onBack()
    }
  }

  const onEditPress = () => {
    onBack()
  }

  return (
    <>
      <SafeAreaView style={[layoutStyles.safeAreaView]}>
        <FormHeader
          text={`${isEdit ? i18n.t('edit') : i18n.t('create')} ${i18n.t(
            'backlogsmall'
          )}`}
          onBack={() => onBack()}
        />
        <View style={[styles.contentContainer, spacingStyles.pH20]}>
          <View>
            <Input placeholder={i18n.t('title')} style={spacingStyles.mT30} />
            <Picker
              name={i18n.t('project')}
              title={i18n.t('selectProject')}
              renderLabel={() => null}
              value={project}
              items={projectSet}
              onValueChange={(item) => setProject(item.value)}
              style={spacingStyles.mT30}
            />
            <Input
              placeholder={i18n.t('description')}
              style={spacingStyles.mT30}
              isMultiline={true}
            />
          </View>
          <View style={[positionStyles.rowFill, spacingStyles.mB25]}>
            <Button
              text={isEdit ? i18n.t('delete') : i18n.t('cancel')}
              style={styles.flexHalf}
              isLoading={isDeletePending}
              textStyle={{ color: colors.WHITE, fontSize: 14 }}
              backgroundColor={colors.LIGHT_RED}
              onPress={() => (isEdit ? onDeletePress() : onCancelPress())}
            />
            <View style={{ width: 25 }} />
            <Button
              text={isEdit ? i18n.t('edit') : i18n.t('create')}
              style={styles.flexHalf}
              textStyle={{ color: colors.WHITE, fontSize: 14 }}
              backgroundColor={colors.LIME}
              onPress={() => (isEdit ? onEditPress() : onCreatePress())}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default CreateBacklogScreen
