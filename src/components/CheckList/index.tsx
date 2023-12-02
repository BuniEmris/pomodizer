import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
} from 'react'
// Components
import {
  ViewStyle,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TextInput,
} from 'react-native'
import CheckBox from 'react-native-check-box'
import ProgressBar from 'components/ProgressBar'
import Input from 'components/UI/Input'

// Styles & Assets
import CloseIcon from 'assets/images/icons/close.svg'
import { colors, positionStyles, spacingStyles } from 'styles'
import styles from './styles'
import { ChecklistItem } from 'types'
import i18n from 'locales/i18n'
import { backgroundColor, paddingBottom } from 'styled-system'

interface Props {
  style?: ViewStyle | ViewStyle[]
  checklistItems: ChecklistItem[]
  onListChange: (items: any[]) => void
  onRemoveChecklist?: () => void
  setTaskTitleValue: (i: any) => void
  taskTitleValue: string
}

interface Methods {
  onDonePress: () => void
}

export type TaskCheckbox = {
  value: string
  isChecked: false
}

const Checklist: React.ForwardRefRenderFunction<Methods, Props> = (
  props,
  ref
) => {
  const {
    style,
    onRemoveChecklist,
    checklistItems,
    onListChange,
    setTaskTitleValue,
    taskTitleValue,
  } = props

  const [isAddCheckList, setIsAddCheckList] = useState(!checklistItems.length)
  const checklistRef = useRef<TextInput>()

  const handleCheckboxChange = (itemIndex: number) => {
    const newChecklistItems = [...checklistItems]
    newChecklistItems[itemIndex] = {
      isChecked: !newChecklistItems[itemIndex].isChecked,
      title: newChecklistItems[itemIndex].title,
    }
    onListChange(newChecklistItems)
  }

  const handleTaskDelete = (itemIndex: number) => {
    const newChecklistItems = [...checklistItems]
    newChecklistItems.splice(itemIndex, 1)
    onListChange(newChecklistItems)
    if (newChecklistItems.length === 0) {
      handleRemoveCheckList()
    }
  }

  const percent = useMemo(() => {
    const numberOfTask = checklistItems.length
    if (!numberOfTask) {
      return 0
    }
    let numberOfCheckedTasks = 0
    checklistItems.map((task) =>
      task.isChecked === true ? numberOfCheckedTasks++ : null
    )
    // eslint-disable-next-line prettier/prettier
    return Math.floor(100 / numberOfTask * numberOfCheckedTasks)
  }, [checklistItems])

  const handleRemoveCheckList = () => {
    onListChange([])
    setIsAddCheckList(true)

    if (onRemoveChecklist) {
      onRemoveChecklist()
    }
  }

  const handleSubmitEditing = () => {
    if (!taskTitleValue) {
      checklistRef.current?.blur()
      return
    }
    onListChange([
      ...checklistItems,
      { title: taskTitleValue, isChecked: false },
    ])
    setTaskTitleValue('')
  }

  useImperativeHandle(ref, () => ({
    onDonePress: () => {
      if (taskTitleValue) {
        handleSubmitEditing()
      }
      checklistRef.current?.blur()
    },
  }))

  useEffect(() => {
    if (checklistItems.length && isAddCheckList) {
      setIsAddCheckList(false)
    }
  }, [checklistItems.length])

  const _renderTaskItem = ({
    item,
    index,
  }: {
    item: ChecklistItem
    index: number
  }) => {
    return (
      <View
        style={[positionStyles.rowFill, spacingStyles.mT10]}
        key={`${index}_${item._id}`}
      >
        <CheckBox
          style={styles.checkBoxStyle}
          checkedCheckBoxColor={colors.LIME}
          checkBoxColor={colors.LIGHT_GREY}
          isChecked={item.isChecked}
          onClick={() => {
            handleCheckboxChange(index)
          }}
        />
        <Text style={styles.taskText}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleTaskDelete(index)}>
          <CloseIcon style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={style}>
      {isAddCheckList && (
        <TouchableOpacity
          onPress={() => setIsAddCheckList(false)}
          style={styles.addChecklistWr}
        >
          <Text style={styles.addChecklistText}>{i18n.t('addchecklist')}</Text>
        </TouchableOpacity>
      )}
      {!isAddCheckList && (
        <>
          <View style={positionStyles.rowFill}>
            <View style={[positionStyles.rowStart, spacingStyles.mB10]}>
              <Text style={styles.planningText}>{i18n.t('checklist')}</Text>
              <TouchableOpacity onPress={handleRemoveCheckList}>
                <CloseIcon style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.percentText,
                percent === 100 && { color: colors.LIME },
              ]}
            >{`${percent}%`}</Text>
          </View>
          <ProgressBar style={spacingStyles.pB10} percent={percent} />
          {checklistItems.map((item, index) =>
            _renderTaskItem({ item, index })
          )}
          {/* <FlatList
            data={checklistItems}
            contentContainerStyle={spacingStyles.mT10}
            keyExtractor={(item, index) => `${index}_${item._id}`}
            renderItem={_renderTaskItem}
          /> */}
          <Input
            ref={checklistRef}
            placeholder={i18n.t('addItem')}
            style={spacingStyles.mT15}
            value={taskTitleValue}
            onChangeText={(value) => setTaskTitleValue(value)}
            onSubmitEditing={handleSubmitEditing}
            autoFocus={checklistItems.length === 0}
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
          />
        </>
      )}
    </View>
  )
}

export default React.forwardRef(Checklist)
