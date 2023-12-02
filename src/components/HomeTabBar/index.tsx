import React, { ReactElement, useState } from 'react'
// Components
import { TouchableOpacity, View } from 'react-native'

// Libs & Utils
import { AllRoutes, ChildrenRoutes, RootRoutes } from 'navigation/routes'
import navigationService from 'navigation/navigationService'

// Types
import { SvgProps } from 'react-native-svg'

// Assets & Styles
import NotesIcon from 'assets/images/TabbarIcons/notes.svg'
import StarIcon from 'assets/images/TabbarIcons/star.svg'
import PlusIcon from 'assets/images/TabbarIcons/plus.svg'
import ProjectsIcon from 'assets/images/TabbarIcons/projects.svg'
import ProfileIcon from 'assets/images/TabbarIcons/profile.svg'
import HomeIcon from 'assets/images/TabbarIcons/home.svg'
import NotesActiveIcon from 'assets/images/TabbarIcons/notesActive.svg'
import StarActiveIcon from 'assets/images/TabbarIcons/starActive.svg'
import ProjectsActiveIcon from 'assets/images/TabbarIcons/projectsActive.svg'
import ProfileActiveIcon from 'assets/images/TabbarIcons/profileActive.svg'
import Icon from 'react-native-vector-icons/Feather'

import styles from './styles'
import Timer from 'components/Timer'
import { HIT_SLOT_DEFAULT, isAndroid, isIOs } from 'styles/helpers'
import { useTypedSelector } from 'store'
import { apiDateToCalendar } from 'utils/date'
import { colors } from 'styles'
import useKeyboardHeight from 'hooks/useKeyboardHeight'

type TabBarItem = {
  icon: ReactElement<SvgProps>
  iconActive: ReactElement<SvgProps>
  route: {
    root: RootRoutes
    child: ChildrenRoutes
  }
  activeRoutes: AllRoutes[]
}

const tabBarItems: TabBarItem[] = [
  {
    icon: <NotesIcon />,
    iconActive: <NotesActiveIcon />,
    route: { root: 'Inbox', child: 'Inbox_Tasks' },
    activeRoutes: [
      'Inbox',
      'Inbox_Tasks',
      'Inbox_Task_Create',
      'Inbox_task_detail',
    ],
  },
  {
    icon: <Icon name="zap" size={22} color={colors.LIGHT_GREY} />,
    iconActive: <Icon name="zap" size={22} color={colors.LIME} />,
    route: { root: 'Goals', child: 'Goals_List' },
    activeRoutes: ['Goals', 'Goals_List', 'Goal_Create'],
  },
  {
    icon: <Icon name="home" size={22} color={colors.WHITE} />,
    iconActive: <Icon name="home" size={22} color={colors.WHITE} />,
    route: { root: 'Home', child: 'Home_Main' },
    activeRoutes: ['Home', 'Home_Main', 'Home_Task', 'Task_Create'],
  },
  {
    icon: <ProjectsIcon />,
    iconActive: <ProjectsActiveIcon />,
    route: { root: 'Projects', child: 'Projects_List' },
    activeRoutes: ['Projects', 'Projects_List', 'Project_Details'],
  },
  {
    icon: <ProfileIcon />,
    iconActive: <ProfileActiveIcon />,
    route: { root: 'Profile', child: 'Setting_List' },
    activeRoutes: [
      'Profile',
      'Setting_List',
      'Personal_Settings',
      'App_Details',
      'Timer_Details',
      'Statistics',
    ],
  },
]

const HomeTabBar = () => {
  // const [isVisible, setIsVisible] = useState(true)
  const { keyboardHeight, isHidden } = useKeyboardHeight()
  const { calendarDay } = useTypedSelector(
    (store) => store.tasks.calendarDayTask
  )
  const activeRouteName =
    navigationService.getActiveRouteNameWithDefaultRoute('Home_Main')

  const renderTimer = () => <Timer />

  // if (
  //   !isVisible ||
  //   activeRouteName == 'Home_Task' ||
  //   activeRouteName == 'Home_Backlog' ||
  //   activeRouteName == 'Note_Create' ||
  //   activeRouteName == 'Goal_Create' ||
  //   activeRouteName == 'Goal_Details' ||
  //   activeRouteName == 'Project_Create' ||
  //   activeRouteName == 'Project_Details' ||
  //   activeRouteName == 'Task_Create' ||
  //   activeRouteName == 'Backlog_Create'
  // ) {
  //   return renderTimer()
  // }

  // if (!isHidden && isAndroid) {
  //   return renderTimer()
  // }

  if (activeRouteName === 'Features') {
    return null
  }

  return (
    <View style={styles.container}>
      {renderTimer()}
      {tabBarItems.map((item, index) => {
        const isActive = item?.activeRoutes?.includes(
          activeRouteName as AllRoutes
        )
        const ItemIcon = isActive ? item.iconActive : item.icon

        if (index === 2) {
          return (
            <View style={styles.greyCircle} key={item.route.child}>
              <View style={styles.greyHalfCircle} />
              <TouchableOpacity
                style={[
                  styles.greenCircle,
                  isActive && styles.greenCircleActive,
                ]}
                // disabled={isActive}
                onPress={() => {
                  navigationService.navigate(item.route.root, {
                    screen: item.route.child,
                  })
                }}
              >
                {ItemIcon}
              </TouchableOpacity>
            </View>
          )
        }
        return (
          <TouchableOpacity
            key={item.route.child}
            onPress={() =>
              navigationService.navigate(item.route.root, {
                screen: item.route.child,
              })
            }
            hitSlop={HIT_SLOT_DEFAULT}
          >
            {ItemIcon}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default HomeTabBar
