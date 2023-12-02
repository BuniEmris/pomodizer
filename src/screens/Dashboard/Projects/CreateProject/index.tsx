/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from 'react'
// Components
import { Text, View, TouchableOpacity, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormHeader from 'components/Header'
import Button from 'components/UI/Button'
import Input from 'components/UI/Input'
import PickerModal from 'components/UI/PickerModal'
// Libs & Utils
import navigationService from 'navigation/navigationService'
import logger from 'utils/logger'

// Hooks
import { useCreateRequest, usePatchRequest } from 'hooks/apiClientHooks'
import useForm from 'hooks/useFormHooks'

// Types
import { ProjectRouteProps } from 'navigation/DashboardNavigator'

// Helpers
import { CSS_COLOR_NAMES } from 'helpers/constants'

// Assets & Styles
import ArrowDownIcon from 'assets/images/icons/arrowDown.svg'
import styles from './styles'
import layoutStyles from 'styles/layoutStyles'
import { colors, positionStyles, spacingStyles } from 'styles'
import i18n from 'locales/i18n'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import * as S from './styled.components'
import { DmText, DmView, InlineInput } from 'components/UI'
import { Controller } from 'react-hook-form'
import ModalMenuItem from 'components/ModalMenuItem'
import { useDispatch } from 'react-redux'
import { createTag, patchTag } from 'store/tags/thunkActions'
import { isAndroid, isIOs } from 'styles/helpers'
import { useTypedSelector } from 'store'
import useKeyboardHeight from 'hooks/useKeyboardHeight'
import KeyboardDoneBtn from 'components/KeyboardDoneBtn'
import { Tag } from 'types'
// import { updateTag } from 'store/tags'
type Props = ProjectRouteProps

const CreateProjectScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch()
  const { keyboardHeight, isHidden } = useKeyboardHeight()
  const back = route.params?.back
  const project = route.params?.project
  const isEdit = route.params?.isEdit
  const taskNew = route.params?.taskNew

  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
  // const [colorValue, setColorValue] = useState('')
  const [currentColor, setCurrentColor] = useState(project?.color)

  const onColorChange = (selectedColor: string) => {
    setCurrentColor(selectedColor)
  }
  const { createEntity, isPending: isCreatePending } = useCreateRequest('tags')

  const { formState, updateFormValuesAction, updateFormErrors, resetForm } =
    useForm({
      name: project?.name || '',
      description: project?.description || '',
      color: project?.color || '',
    })

  const { name, description, color, errors } = formState

  const validateForm = () => {
    let valid = true
    if (name === '') {
      updateFormErrors({ name: true })
      valid = false
    }

    return valid
  }

  const onCreatePress = async () => {
    if (!validateForm()) {
      return
    }
    dispatch(
      createTag({
        name,
        color: currentColor,
      })
    )
    resetForm()
    setCurrentColor('white')
    onBack()
  }
  const onCreatePressTaskNew = async () => {
    if (!validateForm()) {
      return
    }
    const res = await dispatch(
      createTag({
        name,
        color: currentColor,
      })
    )
    navigationService.navigate('Home', {
      screen: 'Task_Create',
      params: {
        isEdit: true,
        isHome: true,
        project: res,
      },
    })
    resetForm()
    setCurrentColor('white')
  }
  const onUpdatePress = () => {
    dispatch(
      patchTag(project._id, {
        ...project,
        name,
        description,
        color: currentColor,
      })
    )
    navigationService.navigate('Projects', {
      screen: 'Projects_List',
    })
  }

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

  const pickerRenderColor = (item: any) => (
    <TouchableOpacity
      style={positionStyles.rowStart}
      onPress={() => {
        updateFormValuesAction({ color: currentColor })
        setIsColorPickerVisible(false)
      }}
    >
      <Text style={styles.pickerLabelText}>{item}</Text>
      <View
        style={[
          styles.pickerLabel,
          spacingStyles.mL10,
          { backgroundColor: item.toLocaleLowerCase() },
        ]}
      />
    </TouchableOpacity>
  )
  const renderButtons = () => {
    if (!isHidden && isAndroid) {
      return
    }
    return (
      <DmView flexDirection="row" marginBottom={25} px={20}>
        <Button
          text={i18n.t('cancel')}
          style={styles.flexHalf}
          textStyle={{ color: colors.WHITE, fontSize: 14 }}
          backgroundColor={colors.LIGHT_RED}
          onPress={onCancelPress}
        />
        <DmView width={25} />
        {isEdit ? (
          <Button
            text="OK"
            style={styles.flexHalf}
            isLoading={isCreatePending}
            textStyle={{ color: colors.WHITE, fontSize: 14 }}
            backgroundColor={colors.LIME}
            onPress={onUpdatePress}
          />
        ) : (
          <Button
            text={i18n.t('create')}
            style={styles.flexHalf}
            isLoading={isCreatePending}
            textStyle={{ color: colors.WHITE, fontSize: 14 }}
            backgroundColor={colors.LIME}
            onPress={taskNew ? onCreatePressTaskNew : onCreatePress}
          />
        )}
      </DmView>
    )
  }
  return (
    <>
      <SafeAreaView style={[layoutStyles.safeAreaView]}>
        <FormHeader
          text={isEdit ? '' : i18n.t('createProject')}
          onBack={onBack}
        />
        <S.ScrollContainer>
          <S.ContentWr>
            <InlineInput
              placeholder={i18n.t('title')}
              autoFocus={true}
              value={name}
              onChangeText={(text) => updateFormValuesAction({ name: text })}
              multiline
              fontSize={24}
              fontWeight="500"
            />
            <DmView mt={10} />
          </S.ContentWr>
          <S.ContentWr marginTop={20}>
            <ModalMenuItem
              onPress={() => setIsColorPickerVisible(true)}
              label="Select color"
              iconName="droplet"
              withBorder={false}
            >
              <DmView alignItems="flex-end" flexGrow={1}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: currentColor,
                    borderRadius: 50,
                  }}
                />
              </DmView>
            </ModalMenuItem>
          </S.ContentWr>
          <S.ContentWr minHeight={100} marginTop={20}>
            <InlineInput
              placeholder={i18n.t('description')}
              value={description}
              onChangeText={(text) =>
                updateFormValuesAction({ description: text })
              }
              fontSize={16}
              fontWeight="400"
              multiline
              minHeight={100}
            />
          </S.ContentWr>
        </S.ScrollContainer>
        {renderButtons()}

        <PickerModal
          placeholder={i18n.t('selectColor')}
          visible={isColorPickerVisible}
          items={CSS_COLOR_NAMES}
          onColorChange={onColorChange}
          currentColor={currentColor}
          containerStyle={[spacingStyles.pV20, spacingStyles.pH30]}
          onClose={() => setIsColorPickerVisible(false)}
          renderLabel={pickerRenderColor}
        />

        {(!isHidden || isIOs) && (
          <KeyboardDoneBtn onKeyboardDonePress={() => Keyboard.dismiss()} />
        )}
      </SafeAreaView>
    </>
  )
}

export default CreateProjectScreen
