import React, { useEffect, useState } from 'react'

// Components
import {
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DmText from 'components/UI/DmText'
// Libs & Utills

// Helpers
import { HIT_SLOT_DEFAULT } from 'styles/helpers'

// Assets & Styles
import BackArrow from 'assets/images/icons/backArrow.svg'
import { positionStyles, spacingStyles } from 'styles'
import styles from './styles'
import ColorPicker from 'react-native-wheel-color-picker'
import i18n from 'locales/i18n'

interface Props {
  containerStyle?: ViewStyle | ViewStyle[] | TextStyle
  placeholder?: string
  items?: any[]
  value?: any
  visible: boolean
  onColorChange: (selectedColor: string) => void
  currentColor: string
  onClose?: () => void
  renderLabel: ({ item }: { item: any }) => any
}

const PickerModal: React.FC<Props> = ({
  containerStyle,
  placeholder,
  items,
  value,
  onColorChange,
  currentColor,
  visible,
  onClose,
  renderLabel,
}) => {
  const [val, setVal] = useState('')

  const handleBackPress = () => {
    onClose?.()
    // setSearchValue('')
  }

  useEffect(() => {
    // rerender component after mount, for color picker
    setTimeout(() => setVal('s'), 200)
  }, [])

  return (
    <>
      <Modal visible={visible} animationType="fade">
        <SafeAreaView style={styles.safeContainer}>
          <View
            style={[
              positionStyles.rowStart,
              spacingStyles.pH20,
              spacingStyles.pV20,
            ]}
          >
            <TouchableOpacity
              onPress={handleBackPress}
              hitSlop={HIT_SLOT_DEFAULT}
            >
              <BackArrow />
            </TouchableOpacity>
            {/* <TextInput
              placeholder={placeholder}
              value={searchValue}
              autoCapitalize="none"
              onChangeText={(text) => setSearchValue(text)}
              onEndEditing={() => {
                logger.log('filteredColors', filteredItems)
                setFilteredItems(
                  CSS_COLOR_NAMES.filter(
                    (color) =>
                      color
                        .toLocaleLowerCase()
                        .indexOf(searchValue.toLocaleLowerCase()) != -1
                  )
                )
              }}
              style={[spacingStyles.mL15, styles.text]}
            /> */}
            <View style={styles.wrapper}>
              <ColorPicker
                color={currentColor}
                swatchesOnly={false}
                onColorChange={onColorChange}
                thumbSize={40}
                sliderSize={40}
                noSnap={true}
                row={false}
              />
            </View>
            <TouchableOpacity
              onPress={handleBackPress}
              hitSlop={HIT_SLOT_DEFAULT}
            >
              <DmText fontSize={15} fontWeight="500">
                {i18n.t('done')}
              </DmText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  )
}

export default PickerModal
