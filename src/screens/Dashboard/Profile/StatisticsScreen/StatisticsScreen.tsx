import React, { useEffect, useMemo, useRef, useState } from 'react'

// Components
import { View, Dimensions } from 'react-native'
import DmText from 'components/UI/DmText'
import DmView from 'components/UI/DmView'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from 'components/Header'
import StatsItem from 'components/StatsItem/StatsItem'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'

// Utils & Hooks
import navigationService from 'navigation/navigationService'
import usePremium from 'hooks/usePremium'

// Types
import {} from 'types'

// Styles
import * as S from './styled.components'
import layoutStyles from 'styles/layoutStyles'
import { marginLeft } from 'styled-system'
import i18n from 'locales/i18n'
import { useFindRequest } from 'hooks/apiClientHooks'
import { colors, positionStyles, spacingStyles, typo } from 'styles'
import moment from 'moment'
import ProjectPicker from 'components/ProjectPicker'
import Weekly from 'assets/images/icons/calendarStat.svg'
import { useTypedSelector } from 'store'
import { calendarDateToCalendar } from 'utils/date'
import { getTasksForColumn } from 'store/tasks/selectors'
import styles from './styles'
import StatsItemHorizontal from 'components/StatsItemHorizontal'
import ReactNativePickerModule from 'react-native-picker-module'
import periodData, { emptyMonthData } from 'data/statisticsPeriodData'
import WeeklyStatisticsGraph from 'components/WeeklyStatisticsGraph'
import MonthlyStatisticsGraph from 'components/MonthlyStatisticsGraph'

interface Props {
  //
}
const emptyWeekData = [0, 0, 0, 0, 0, 0, 0]

const StatisticsScreen: React.FC<Props> = (props) => {
  const { checkPremium } = usePremium()

  // Request
  const { fetchEntities, dataRespons } = useFindRequest('stats/total', {
    mobile: true,
    week: true,
  })

  // State Params

  // Ref
  const pickerRef = useRef<ReactNativePickerModule>(null)

  const SwitchPeriodSelector = (key: string) => {
    switch (key) {
      case 'thisW':
        return {
          data: dataRespons?.week,
          label: i18n.t('thisWeek'),
          isWeek: true,
        }
      case 'prevW':
        return {
          data: dataRespons?.prev_week,
          label: i18n.t('prevWeek'),
          isWeek: true,
        }
      case 'thisM':
        return {
          data: dataRespons?.month,
          label: i18n.t('thisMonth'),
          isWeek: false,
        }
      case 'prevM':
        return {
          data: dataRespons?.prev_month,
          label: i18n.t('prevMonth'),
          isWeek: false,
        }
    }
  }

  // state

  const [selectedProjectID, setSelectedProjectID] = useState('all')
  const [selectPeriod, setSelectPeriod] = useState('thisW')

  // WEEKLY  DATA
  const dataFromApiAll =
    SwitchPeriodSelector(selectPeriod)?.isWeek &&
    (selectPeriod === 'thisW'
      ? dataRespons?.week?.all
      : dataRespons?.prev_week?.all)
  const dataFromApiCom =
    SwitchPeriodSelector(selectPeriod)?.isWeek &&
    (selectPeriod === 'thisW'
      ? dataRespons?.week?.completed
      : dataRespons?.prev_week?.completed)
  const dataFromApiTomato =
    SwitchPeriodSelector(selectPeriod)?.isWeek &&
    (selectPeriod === 'thisW'
      ? dataRespons?.week?.tomato
      : dataRespons?.prev_week?.tomato)

  // MONTH DATA

  const monthDataFromApiAll =
    !SwitchPeriodSelector(selectPeriod)?.isWeek &&
    (selectPeriod === 'thisM'
      ? dataRespons?.month?.all
      : dataRespons?.prev_month?.all)
  const monthDataFromApiCom =
    !SwitchPeriodSelector(selectPeriod)?.isWeek &&
    (selectPeriod === 'thisM'
      ? dataRespons?.month?.completed
      : dataRespons?.prev_month?.completed)
  const monthDataFromApiTomato =
    !SwitchPeriodSelector(selectPeriod)?.isWeek &&
    (selectPeriod === 'thisM'
      ? dataRespons?.month?.tomato
      : dataRespons?.prev_month?.tomato)

  // Handler
  function fillData(d: any) {
    if (!d?.length) {
      return emptyWeekData
    }

    return d.map((el: any) => el.count).slice(0, 7)
  }

  function fillMonthData(d: any) {
    if (!d?.length) {
      return emptyMonthData
    }

    return d.map((el: any) => el.count)
  }
  // Week
  const allData = fillData(dataFromApiAll)
  const completedData = fillData(dataFromApiCom)
  const tomatoData = fillData(dataFromApiTomato)

  // Month
  const allMonthData = fillMonthData(monthDataFromApiAll)
  const completedMonthData = fillMonthData(monthDataFromApiCom)
  const tomatoMonthData = fillMonthData(monthDataFromApiTomato)

  // const maxValue = Math.max(...allData)
  // const minValue = Math.min(...allData)

  const labelInfo = [
    i18n.t('mon'),
    i18n.t('tue'),
    i18n.t('wed'),
    i18n.t('thu'),
    i18n.t('fri'),
    i18n.t('sat'),
    i18n.t('sun'),
  ]
  const monthInfo = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]
  // WEEKLY GRAPH DATA
  const dataAll = {
    labels: labelInfo,
    datasets: [
      {
        data: fillData(SwitchPeriodSelector(selectPeriod)?.data?.all),
      },
    ],
  }
  const dataCompleted = {
    labels: labelInfo,
    datasets: [
      {
        data: fillData(SwitchPeriodSelector(selectPeriod)?.data?.completed),
      },
    ],
  }
  const dataTomato = {
    labels: labelInfo,
    datasets: [
      {
        data: fillData(SwitchPeriodSelector(selectPeriod)?.data?.tomato),
      },
    ],
  }
  // WEEKLY MONTH DATA
  const dataMonthAll = {
    labels: monthInfo,
    datasets: [
      {
        data: fillMonthData(SwitchPeriodSelector(selectPeriod)?.data?.all),
      },
    ],
  }

  const dataMonthCompleted = {
    labels: monthInfo,
    datasets: [
      {
        data: fillMonthData(
          SwitchPeriodSelector(selectPeriod)?.data?.completed
        ),
      },
    ],
  }

  const dataMonthTomato = {
    labels: monthInfo,
    datasets: [
      {
        data: fillMonthData(SwitchPeriodSelector(selectPeriod)?.data?.tomato),
      },
    ],
  }

  // Sum Weekly

  const sumAll = fillData(dataFromApiAll)?.reduce((accumulator, value) => {
    return accumulator + value
  }, 0)

  const sumCompleted = fillData(dataFromApiCom)?.reduce(
    (accumulator, value) => {
      return accumulator + value
    },
    0
  )
  const sumTomato = fillData(dataFromApiTomato)?.reduce(
    (accumulator, value) => {
      return accumulator + value
    },
    0
  )

  // Sum Monthly

  const sumMonthAll = fillMonthData(monthDataFromApiAll)?.reduce(
    (accumulator, value) => {
      return accumulator + value
    },
    0
  )

  const sumMonthCompleted = fillMonthData(monthDataFromApiCom)?.reduce(
    (accumulator, value) => {
      return accumulator + value
    },
    0
  )

  const sumMonthTomato = fillMonthData(monthDataFromApiTomato)?.reduce(
    (accumulator, value) => {
      return accumulator + value
    },
    0
  )

  useEffect(() => {
    fetchEntities()
  }, [])

  const { calendarDay } = useTypedSelector(
    (store) => store.tasks.calendarDayTask
  )
  const tasks = useTypedSelector((state) =>
    getTasksForColumn(state, calendarDateToCalendar(calendarDay))
  )
  // const statsInfo = useMemo(() => {
  //   const tomatoSpend = tasks.reduce(
  //     (acc, item) => {
  //       acc.tomatoFact += item.tomatoFact
  //       acc.tomatoPlan += item.tomatoPlan || 0
  //       return acc
  //     },
  //     { tomatoFact: 0, tomatoPlan: 0 }
  //   )

  //   const completedTask = tasks.filter((item) => item.status === 'done').length

  //   return {
  //     ...tomatoSpend,
  //     completedTask,
  //     allTasks: tasks.length,
  //   }
  // }, [tasks])

  return (
    <SafeAreaView
      style={layoutStyles.safeAreaView}
      edges={['right', 'top', 'left']}
    >
      <Header
        text={i18n.t('statistics')}
        onBack={() => navigationService.goBack()}
        rightIcon={<Weekly />}
        rightIconLabel={SwitchPeriodSelector(selectPeriod)?.label}
        onRightPress={() => {
          checkPremium(() => pickerRef.current?.show())
        }}
        isStatistics
      />

      <S.Container showsVerticalScrollIndicator={false}>
        {SwitchPeriodSelector(selectPeriod)?.isWeek ? (
          <WeeklyStatisticsGraph
            sumAll={sumAll}
            sumCompleted={sumCompleted}
            sumTomato={sumTomato}
            dataAll={dataAll}
            allData={allData}
            dataCompleted={dataCompleted}
            completedData={completedData}
            dataTomato={dataTomato}
            tomatoData={tomatoData}
          />
        ) : (
          <MonthlyStatisticsGraph
            sumAll={sumMonthAll}
            sumCompleted={sumMonthCompleted}
            sumTomato={sumMonthTomato}
            dataAll={dataMonthAll}
            allData={allMonthData}
            dataCompleted={dataMonthCompleted}
            completedData={completedMonthData}
            dataTomato={dataMonthTomato}
            tomatoData={tomatoMonthData}
          />
        )}
      </S.Container>
      <ReactNativePickerModule
        pickerRef={pickerRef}
        // @ts-ignore
        items={periodData}
        onValueChange={(value) => {
          setSelectPeriod(value)
        }}
      />
    </SafeAreaView>
  )
}

export default StatisticsScreen
