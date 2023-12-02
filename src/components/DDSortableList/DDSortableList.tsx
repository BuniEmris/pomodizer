/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

import styles from './styled.components'
import { SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from 'styles/helpers'
import { useMemo } from 'react'
import { StatusBar } from 'react-native'
import { useEffect } from 'react'

interface PropsI {
  data: any[]
  contentPosition: number
  onChange?: (val1: string[], val2?: object) => void
  ListEmptyComponent?: () => ReactJSXElement
  ListFooterComponent?: () => ReactJSXElement | null
  renderItem: (
    item: any,
    index: number,
    setEditing: (val: boolean) => void
  ) => ReactJSXElement
}

const DDSortableList: React.FC<PropsI> = ({
  data,
  renderItem,
  contentPosition,
  onChange,
  ListFooterComponent,
  ListEmptyComponent,
}) => {
  const [editing, setEditing] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const positions = useSharedValue(positionGen(data))
  const sortList = useSharedValue(data.map((item) => item._id))
  const scrollY = useSharedValue(0)
  const shake = useSharedValue(0)
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>()

  const scrollHeight = useMemo(
    () => data.reduce((acc, itm) => acc + itm.height, 0) + footerHeight,
    [data, footerHeight]
  )

  useEffect(() => {
    if (editing) {
      shake.value = withTiming(shake.value + 100, { duration: 1000 })
    } else {
      shake.value = 0
      onChange?.(sortList.value)
    }
  }, [editing])

  useEffect(() => {
    positions.value = positionGen(data)
    sortList.value = data.map((item) => item._id)
  }, [data])

  const handleScroll = useAnimatedScrollHandler((event) => {
    if (!editing) scrollY.value = event.contentOffset.y
  })

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
  )

  return (
    <Animated.ScrollView
      onLayout={(e) => {
        setContentHeight(e.nativeEvent.layout.height)
      }}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: 'white',
      }}
      contentContainerStyle={{
        height: scrollHeight,
      }}
    >
      {data.length || !ListEmptyComponent ? null : <ListEmptyComponent />}
      {data.map((item, index) => {
        return (
          <DragableItem
            contentHeight={contentHeight}
            contentPosition={contentPosition}
            key={item._id}
            index={index}
            shake={shake}
            id={item._id}
            positions={positions}
            sortList={sortList}
            scrollViewRef={scrollViewRef}
            scrollY={scrollY}
            scrollHeight={scrollHeight}
            editing={editing}
            setEditing={setEditing}
          >
            {renderItem(item, index, setEditing)}
          </DragableItem>
        )
      })}
      {ListFooterComponent ? (
        <View
          style={styles.footerStyle}
          onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
        >
          <ListFooterComponent />
        </View>
      ) : null}
    </Animated.ScrollView>
  )
}

export default DDSortableList

const positionGen = (arr: any[]) => {
  return Object.assign(
    {},
    ...((): any[] => {
      const s = []
      let lastY = 0
      for (let i = 0; i < arr.length; i++) {
        const h = arr[i].height
        s.push({
          [arr[i]._id]: {
            sortNum: i,
            y: lastY,
            h,
          },
        })
        lastY += h
      }
      return s
    })()
  )
}

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
}

const DragableItem: React.FC<any> = ({
  id,
  contentPosition,
  scrollHeight,
  positions,
  index,
  shake,
  scrollY,
  setEditing,
  contentHeight,
  children,
  editing,
  sortList,
}) => {
  const isGestureActive = useSharedValue(false)
  const tY = useSharedValue(positions.value[id]?.y || 0)
  const scrollAmount = useSharedValue(0)

  useAnimatedReaction(
    () => positions.value[id]?.y || 0,
    (val) => {
      if (!isGestureActive.value) {
        tY.value = withTiming(val, animationConfig)
      }
    }
  )

  useAnimatedReaction(
    () => scrollAmount.value,
    (val) => {
      if (
        val !== 0 &&
        editing &&
        isGestureActive.value &&
        (scrollY.value < scrollHeight - contentHeight - 120 || val < 0) &&
        (scrollY.value > 0 || val > 0)
      ) {
        scrollY.value = withTiming(val + scrollY.value, { duration: 10 })
        scrollAmount.value += 0.1
      } else {
        scrollAmount.value = 0
      }
    }
  )

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart() {
      if (editing) {
        isGestureActive.value = true
      }
    },
    onActive({ absoluteY, translationY }, ctx) {
      const topPY = contentPosition + STATUS_BAR_HEIGHT
      const bottomPY = contentPosition + STATUS_BAR_HEIGHT + contentHeight
      if (editing && absoluteY > topPY && absoluteY < bottomPY) {
        const newPositions = JSON.parse(JSON.stringify(positions.value))
        const newSortList = JSON.parse(JSON.stringify(sortList.value))
        const currentItem = newPositions[id]
        const prevY = currentItem.y
        const positionY = absoluteY + scrollY.value - contentPosition

        const lowerBound = topPY + 120
        const upperBound = bottomPY - 120
        if (absoluteY < lowerBound && scrollY.value > 0) {
          scrollAmount.value = -(lowerBound - absoluteY)
        } else if (
          absoluteY > upperBound &&
          scrollY.value < scrollHeight - contentHeight - 120
        ) {
          scrollAmount.value = absoluteY - upperBound
        } else {
          scrollAmount.value = 0
        }

        tY.value = positionY - currentItem.h / 2

        const direction =
          tY.value < Math.max(prevY - currentItem.h / 2, currentItem.h / 2)
            ? -1
            : tY.value > prevY + currentItem.h / 2
            ? 1
            : 0

        if (direction === 1) {
          const { h } = newPositions[newSortList[currentItem.sortNum + 1]]
          if (h) {
            newPositions[newSortList[currentItem.sortNum + 1]] = {
              y: currentItem.y,
              h,
              sortNum: currentItem.sortNum,
            }
            newPositions[id] = {
              y: currentItem.y + h,
              h: currentItem.h,
              sortNum: currentItem.sortNum + 1,
            }
            newSortList[currentItem.sortNum] =
              newSortList[currentItem.sortNum + 1]
            newSortList[currentItem.sortNum + 1] = id

            positions.value = newPositions
            sortList.value = newSortList
          }
        } else if (direction === -1 && currentItem.sortNum) {
          const { h, y } = newPositions[newSortList[currentItem.sortNum - 1]]
          if (h) {
            newPositions[newSortList[currentItem.sortNum - 1]] = {
              y: y + currentItem.h,
              h,
              sortNum: currentItem.sortNum,
            }
            newPositions[id] = {
              y,
              h: currentItem.h,
              sortNum: currentItem.sortNum - 1,
            }
            newSortList[currentItem.sortNum] =
              newSortList[currentItem.sortNum - 1]
            newSortList[currentItem.sortNum - 1] = id

            positions.value = newPositions
            sortList.value = newSortList
          }
        }
      }
    },
    onFinish() {
      const newTY = positions.value[id]?.y

      if (newTY || newTY === 0) {
        tY.value = withTiming(newTY, animationConfig, () => {
          isGestureActive.value = false
        })
      }
      scrollAmount.value = 0
      runOnJS(setEditing)(false)
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: tY.value },
        { scale: isGestureActive.value ? 0.9 : 1 },
        {
          rotate: `${interpolate(
            shake.value,
            [0, 2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101],
            index % 2 === 0
              ? [0, 0, 5, -5, 5, -5, 5, -5, 5, -5, 0, 0]
              : [0, 0, -5, 5, -5, 5, -5, 5, -5, 5, 0, 0]
          )}deg`,
        },
      ],
      zIndex: isGestureActive.value ? 9 : 0,
    }
  })

  return (
    <Animated.View style={[styles.itemStyle, animatedStyle]}>
      <PanGestureHandler enabled={editing} onGestureEvent={gestureHandler}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}
