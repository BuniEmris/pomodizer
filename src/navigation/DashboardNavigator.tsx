import React from 'react'
// Screens
import HomeMainScreen from 'screens/Dashboard/Home/MainScreen'
import HomeTaskScreen from 'screens/Dashboard/Home/TaskDetails'
import BacklogScreen from 'screens/Dashboard/Home/Backlog'
import ProfileScreen from 'screens/Dashboard/Profile/ProfileScreen'
import PersonalSettingScreen from 'screens/Dashboard/Profile/PersonalSettingScreen'
import ChangePasswordScreen from 'screens/Dashboard/Profile/ChangePasswordScreen'
import AppSettingScreen from 'screens/Dashboard/Profile/AppSettingScreen'
import StatisticsScreen from 'screens/Dashboard/Profile/StatisticsScreen'
import NotesListScreen from 'screens/Dashboard/Notes/NotesList'
import NoteCreateScreen from 'screens/Dashboard/Notes/NoteCreateScreen'
import NoteDetailScreen from 'screens/Dashboard/Notes/NoteDetailScreen'
import GoalsListScreen from 'screens/Dashboard/Goals/GoalsList'
import GoalCreateScreen from 'screens/Dashboard/Goals/GoalCreateScreen'
import GoalDetailsScreen from 'screens/Dashboard/Goals/GoalDetails'
import ProjectsListScreen from 'screens/Dashboard/Projects/ProjectsList'
import CreateProjectScreen from 'screens/Dashboard/Projects/CreateProject'
import ProjectDetailsScreen from 'screens/Dashboard/Projects/ProjectDetails'
import CreateTaskScreen from 'screens/Dashboard/Home/CreateTask'
import CreateBacklogScreen from 'screens/Dashboard/Home/CreateBacklog'
import TaskDetailScreen from 'screens/Dashboard/Home/TaskDetails'
import TimerSettingScreen from 'screens/Dashboard/Profile/TimerSettingScreen'
import PremiumScreen from 'screens/Dashboard/Profile/PremiumScreen'
import InboxScreen from 'screens/InboxScreen'
import FeaturesScreen from 'screens/Onboarding/FeaturesScreen'

// Components
import HomeTabBar from 'components/HomeTabBar'

// Libs & Utils
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Types
import {
  DASHBOARD_ROOT_ROUTES,
  HOME_ROUTES,
  NOTE_ROUTES,
  GOAL_ROUTES,
  PROJECT_ROUTES,
  PROFILE_ROUTES,
  INBOX_ROUTES,
} from './routes'
import { RouteProp } from '@react-navigation/native'
import { BackRoutes, Goal, Note, Tag } from 'types'

type HomeStackParamsList = {
  [HOME_ROUTES.HOME_TASK]: {
    taskId: string
    back: BackRoutes
    isEdit: boolean
    dueDate: Date | undefined
    fromInbox: boolean
    project: Tag
    isHome?: boolean
    description?: string
    userId?: string
    notificationTime?: string
    dueTime?: string
    name?: string
    isShare?: boolean
  }
}

export interface HomeRouteProps {
  route: RouteProp<HomeStackParamsList, 'Home_Task'>
}

type NoteStackParamsList = {
  [NOTE_ROUTES.NOTE_CREATE]: {
    back: BackRoutes
    note: Note
    isEdit: boolean
    noteId: string
  }
}

export interface NoteRouteProps {
  route: RouteProp<NoteStackParamsList, 'Note_Create'>
}

type GoalStackParamsList = {
  [GOAL_ROUTES.GOAL_DETAILS]: {
    goal: Goal
    back: BackRoutes
    isEdit: boolean
    goalId: string
  }
}

export interface GoalRouteProps {
  route: RouteProp<GoalStackParamsList, 'Goal_Details'>
}

type ProjectStackParamsList = {
  [PROJECT_ROUTES.PROJECT_CREATE]: {
    back: BackRoutes
    project: Tag
    isEdit: boolean
    taskNew?: boolean
  }
}

export interface ProjectRouteProps {
  route: RouteProp<ProjectStackParamsList, 'Project_Create'>
}

const HomeStack = createStackNavigator()
const NoteStack = createStackNavigator()
const InboxStack = createStackNavigator()
const GoalStack = createStackNavigator()
const ProjectStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const DashboardTabs = createBottomTabNavigator()
const PremiumStack = createStackNavigator()

const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={HOME_ROUTES.HOME_MAIN}
  >
    <HomeStack.Screen name={HOME_ROUTES.HOME_MAIN} component={HomeMainScreen} />
    <HomeStack.Screen name={HOME_ROUTES.HOME_TASK} component={HomeTaskScreen} />
    <HomeStack.Screen
      name={HOME_ROUTES.HOME_BACKLOG}
      component={BacklogScreen}
    />
    <HomeStack.Screen
      name={HOME_ROUTES.TASK_CREATE}
      component={CreateTaskScreen}
    />
    <HomeStack.Screen
      name={HOME_ROUTES.BACKLOG_CREATE}
      component={CreateBacklogScreen}
    />
    <HomeStack.Screen
      name={NOTE_ROUTES.NOTE_CREATE}
      component={NoteCreateScreen}
    />
  </HomeStack.Navigator>
)

const NoteNavigator = () => (
  <NoteStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={NOTE_ROUTES.NOTES_LIST}
  >
    <NoteStack.Screen
      name={NOTE_ROUTES.NOTES_LIST}
      component={NotesListScreen}
    />
    <NoteStack.Screen
      name={NOTE_ROUTES.NOTE_CREATE}
      component={NoteCreateScreen}
    />
    <NoteStack.Screen
      name={NOTE_ROUTES.NOTE_DETAIL}
      component={NoteDetailScreen}
    />
  </NoteStack.Navigator>
)

const InboxNavigator = () => (
  <InboxStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={INBOX_ROUTES.INBOX}
  >
    <InboxStack.Screen
      name={INBOX_ROUTES.INBOX}
      component={InboxScreen as React.FC}
    />
    <InboxStack.Screen
      name={INBOX_ROUTES.INBOX_TASK_CREATE}
      component={CreateTaskScreen}
    />
    <InboxStack.Screen
      name={INBOX_ROUTES.INBOX_TASK_DETAIL}
      component={TaskDetailScreen}
    />
  </InboxStack.Navigator>
)

const GoalNavigator = () => (
  <GoalStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={GOAL_ROUTES.GOALS_LIST}
  >
    <GoalStack.Screen
      name={GOAL_ROUTES.GOALS_LIST}
      component={GoalsListScreen}
    />
    <GoalStack.Screen
      name={GOAL_ROUTES.GOAL_CREATE}
      component={GoalCreateScreen}
    />
    <GoalStack.Screen
      name={GOAL_ROUTES.GOAL_DETAILS}
      component={GoalDetailsScreen}
    />
  </GoalStack.Navigator>
)

const ProjectNavigator = () => (
  <ProjectStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={PROJECT_ROUTES.PROJECTS_LIST}
  >
    <ProjectStack.Screen
      name={PROJECT_ROUTES.PROJECTS_LIST}
      component={ProjectsListScreen}
    />
    <ProjectStack.Screen
      name={PROJECT_ROUTES.PROJECT_CREATE}
      component={CreateProjectScreen}
    />
    <ProjectStack.Screen
      name={PROJECT_ROUTES.PROJECT_DETAILS}
      component={ProjectDetailsScreen}
    />
    <ProjectStack.Screen
      name={HOME_ROUTES.HOME_TASK}
      component={HomeTaskScreen}
    />
  </ProjectStack.Navigator>
)

const ProfileNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={PROFILE_ROUTES.SETTINGS_LIST}
  >
    <ProfileStack.Screen
      name={PROFILE_ROUTES.SETTINGS_LIST}
      component={ProfileScreen}
    />
    <ProfileStack.Screen
      name={PROFILE_ROUTES.APP_SETTINGS}
      component={AppSettingScreen}
    />
    <ProfileStack.Screen
      name={PROFILE_ROUTES.TIMER_SETTINGS}
      component={TimerSettingScreen}
    />
    <ProfileStack.Screen
      name={PROFILE_ROUTES.BUY_PREMIUM}
      component={PremiumScreen}
      options={{}}
    />
    <ProfileStack.Screen
      name={PROFILE_ROUTES.PERSONAL_SETTING}
      component={PersonalSettingScreen}
    />
    <ProfileStack.Screen
      name={PROFILE_ROUTES.CHANGE_PASSWORD}
      component={ChangePasswordScreen}
    />
    <ProfileStack.Screen
      name={PROFILE_ROUTES.STATISTICS}
      component={StatisticsScreen}
    />
  </ProfileStack.Navigator>
)

const PremiumNavigator = () => (
  <PremiumStack.Navigator
    screenOptions={{ headerShown: false, presentation: 'modal' }}
  >
    <PremiumStack.Screen
      name={DASHBOARD_ROOT_ROUTES.PREMIUM}
      component={PremiumScreen}
    />
  </PremiumStack.Navigator>
)

const DashboardNavigator = ({ isNewUser }: { isNewUser: boolean }) => (
  <DashboardTabs.Navigator
    initialRouteName={
      isNewUser ? DASHBOARD_ROOT_ROUTES.FEATURES : DASHBOARD_ROOT_ROUTES.HOME
    }
    tabBar={() => <HomeTabBar />}
    screenOptions={{ headerShown: false }}
  >
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.HOME}
      component={HomeNavigator}
    />
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.INBOX}
      component={InboxNavigator}
    />
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.NOTES}
      component={NoteNavigator}
    />
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.PROFILE}
      component={ProfileNavigator}
    />
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.GOALS}
      component={GoalNavigator}
    />
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.PROJECTS}
      component={ProjectNavigator}
    />
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.PREMIUM}
      component={PremiumNavigator}
    />
    <DashboardTabs.Screen
      name={DASHBOARD_ROOT_ROUTES.FEATURES}
      component={FeaturesScreen}
    />
  </DashboardTabs.Navigator>
)

export default DashboardNavigator
