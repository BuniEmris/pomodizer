import React, { useState } from 'react'
// Components
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel'

// Libs & Utils
import navigationService from 'navigation/navigationService'
import { mockSlides } from './mockSlideImages'

// Helpers
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'styles/helpers'

// Styles && Assets
import logo from 'assets/images/logo.png'
import styles from './styles'
import { colors, positionStyles, spacingStyles } from 'styles'
import i18n from 'locales/i18n'

const FeatureScreen = (): JSX.Element => {
  const [activeDot, setActiveDot] = useState(0)
  const onSkip = () => {
    navigationService.navigate('Home')
  }

  const _renderItem = ({ item }: any) => {
    return (
      <View style={styles.slideContainer}>
        <Image source={item.image} style={[styles.slideImage]} />
        <Text
          style={[styles.textSlide, spacingStyles.mT60, spacingStyles.pH30]}
        >
          {item.text}
        </Text>
      </View>
    )
  }

  const _onBeforeSnapToItem = (index: number) => {
    if (index === 3) {
      onSkip()
    }
    setActiveDot(index)
  }

  return (
    <SafeAreaView
      style={[positionStyles.fill, { backgroundColor: colors.LIME }]}
    >
      <View
        style={[spacingStyles.mT30, spacingStyles.pH20, positionStyles.rowFill]}
      >
        <Image source={logo} style={styles.logoImage} />
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText} testID="features_skip">
            {i18n.t('skip')}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Carousel
          data={mockSlides}
          renderItem={_renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          sliderHeight={SCREEN_HEIGHT * 0.5}
          itemHeight={SCREEN_HEIGHT * 0.5}
          layout="default"
          activeAnimationType="spring"
          onBeforeSnapToItem={_onBeforeSnapToItem}
        />
      </View>
      <Pagination
        dotsLength={mockSlides.length - 1}
        activeDotIndex={activeDot}
        dotStyle={styles.activeDotStyle}
        containerStyle={styles.paginationContainer}
        inactiveDotStyle={styles.dotStyle}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        dotContainerStyle={[styles.dotContainerStyle]}
      />
    </SafeAreaView>
  )
}

export default FeatureScreen
