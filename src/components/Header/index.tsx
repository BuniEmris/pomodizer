/* eslint-disable react-native/no-inline-styles */
import React from 'react'
// Components
import { ViewStyle, View, Text, TouchableOpacity } from 'react-native'

// Helpers
import { HIT_SLOT_DEFAULT } from 'styles/helpers'
import PlusIcon from 'assets/images/icons/plusPlist.svg'
// Styles & Assets
import { colors, positionStyles, spacingStyles, typo } from 'styles'
import styles from './styles'
import BackArrow from 'assets/images/icons/backArrow.svg'
import { DmText, DmView } from 'components/UI'

interface Props {
  style?: ViewStyle | ViewStyle[]
  text?: string
  rightIconLabel?: string
  isBackHiden?: boolean
  rightIcon?: any
  emoji?: any
  onBack?: () => void
  onRightPress?: () => void
  onCreateTaskPress?: () => void
  isStatistics?: boolean
  isProject?: boolean
  isSettings?: boolean
  isDone?: boolean
  isOnboarding?: boolean
}

const Header: React.FC<Props> = ({
  style,
  text,
  isBackHiden,
  rightIcon,
  emoji,
  onBack,
  onRightPress,
  rightIconLabel,
  onCreateTaskPress,
  isProject,
  isSettings,
  isDone,
  isStatistics,
  isOnboarding,
}) => {
  return (
    <View
      style={[
        isBackHiden ? spacingStyles.pH20 : spacingStyles.pH30,
        isSettings && { paddingLeft: 15 },
        spacingStyles.mT10,
        styles.container,
        isProject && spacingStyles.mB20,
        isOnboarding && styles.onboarding,
        style,
      ]}
    >
      <View style={styles.leftSideContainer}>
        {!isBackHiden && (
          <TouchableOpacity onPress={onBack} hitSlop={HIT_SLOT_DEFAULT}>
            <BackArrow />
          </TouchableOpacity>
        )}
        {!!emoji && (
          <View
            style={[
              positionStyles.rowStart,
              !isBackHiden && spacingStyles.mL20,
            ]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text
              style={[
                styles.centerText,
                spacingStyles.mL15,
                isDone && styles.finishedText,
                isBackHiden && { fontSize: 30 },
              ]}
            >
              {text}
            </Text>
          </View>
        )}
        {!emoji && (
          <Text
            numberOfLines={1}
            style={[
              !isBackHiden && spacingStyles.mL25,
              isStatistics && spacingStyles.mL10,
              isProject && spacingStyles.mL10,
              isProject && { width: 200 },
              isDone && styles.finishedText,
              styles.centerText,
              isBackHiden && { fontSize: 30 },
            ]}
          >
            {text}
          </Text>
        )}
      </View>
      <DmView flexDirection="row">
        {rightIcon && (
          <TouchableOpacity
            style={
              isStatistics
                ? styles.statisticsContainer
                : isProject
                ? styles.projectContainer
                : styles.rightIcon
            }
            hitSlop={HIT_SLOT_DEFAULT}
            onPress={onRightPress}
            disabled={!onRightPress}
          >
            {isStatistics && (
              <DmText
                marginRight={5}
                color={colors.DARK_GREY}
                style={{ ...typo.bodyM12 }}
              >
                {rightIconLabel}
              </DmText>
            )}
            {rightIcon}
          </TouchableOpacity>
        )}
        {isProject && (
          <TouchableOpacity
            onPress={onCreateTaskPress}
            style={styles.addTask}
            hitSlop={HIT_SLOT_DEFAULT}
          >
            <PlusIcon />
          </TouchableOpacity>
        )}
      </DmView>
    </View>
  )
}

export default Header
