import { View, Text, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { DmView } from 'components/UI'
import StatsItem from 'components/StatsItem'
import i18n from 'locales/i18n'
import styles from './styles'
import StatsItemHorizontal from 'components/StatsItemHorizontal'
import { BarChart } from 'react-native-chart-kit'
import { colors } from 'styles'
import * as FONTS from '../../styles/fontFamily'

export default function MonthlyStatisticsGraph({
  sumAll,
  sumCompleted,
  sumTomato,
  dataAll,
  allData,
  dataCompleted,
  completedData,
  dataTomato,
  tomatoData,
}: any) {
  const chartConfig = {
    backgroundColor: colors.WHITE,
    backgroundGradientFrom: colors.WHITE,
    backgroundGradientTo: colors.WHITE,
    fillShadowGradient: '#38C188',
    fillShadowGradientOpacity: 1,
    height: 5000,
    barPercentage: 0.3,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => colors.LIGHT_GREY,
    labelColor: (opacity = 1) => colors.DARK_GREY,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 11,
      fontFamily: FONTS.IBMPlexSans_Medium,
    },
    propsForBackgroundLines: {
      translateX: 20,
    },
    propsForDots: {},
  }
  return (
    <DmView paddingBottom={25} marginTop={28} paddingX={20}>
      <View style={styles.headerStats}>
        <StatsItem label={i18n.t('alltasks')} value={sumAll} />
        <StatsItem label={i18n.t('completedtask')} value={sumCompleted} />
        <StatsItem label={i18n.t('tomatoes')} value={sumTomato} />
      </View>

      <StatsItemHorizontal label={i18n.t('alltasks')} value={sumAll} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
          yAxisLabel=""
          yAxisSuffix=""
          data={dataAll}
          width={Dimensions.get('window').width + 300}
          height={170}
          showBarTops={false}
          chartConfig={chartConfig}
          fromNumber={
            Math.max(...allData) % 4 > 0
              ? 4 * (Math.floor(Math.max(...allData) / 4) + 1)
              : 4 * (Math.floor(Math.max(...allData) / 4) + 0)
          }
          fromZero={true}
          style={{
            paddingRight: 25,
          }}
        />
      </ScrollView>

      <StatsItemHorizontal
        label={i18n.t('completedtask')}
        value={sumCompleted}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
          yAxisLabel=""
          yAxisSuffix=""
          data={dataCompleted}
          width={Dimensions.get('window').width + 300}
          height={170}
          showBarTops={false}
          chartConfig={chartConfig}
          fromNumber={
            Math.max(...completedData) % 4 > 0
              ? 4 * (Math.floor(Math.max(...completedData) / 4) + 1)
              : 4 * (Math.floor(Math.max(...completedData) / 4) + 0)
          }
          fromZero={true}
          style={{
            paddingRight: 25,
          }}
        />
      </ScrollView>

      <StatsItemHorizontal label={i18n.t('tomatoes')} value={sumTomato} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
          yAxisLabel=""
          yAxisSuffix=""
          data={dataTomato}
          width={Dimensions.get('window').width + 300}
          height={170}
          showBarTops={false}
          chartConfig={chartConfig}
          fromNumber={
            Math.max(...tomatoData) % 4 > 0
              ? 4 * (Math.floor(Math.max(...tomatoData) / 4) + 1)
              : 4 * (Math.floor(Math.max(...tomatoData) / 4) + 0)
          }
          fromZero={true}
          style={{
            paddingRight: 25,
          }}
        />
      </ScrollView>
    </DmView>
  )
}
