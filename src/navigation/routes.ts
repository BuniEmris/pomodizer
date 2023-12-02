export const ONBOARDING_ROUTES = {
  WELCOME: 'Onboarding_Welcome',
  SIGN_IN: 'Onboarding_SignIn',
  SIGN_UP: 'Onboarding_SignUp',
  FEATURES: 'Onboarding_Features',
  FORGOT_PASSWORD: 'Onboarding_ForgotPassword',
} as const

export const DASHBOARD_ROOT_ROUTES = {
  NOTES: 'Notes',
  GOALS: 'Goals',
  HOME: 'Home',
  PROJECTS: 'Projects',
  PROFILE: 'Profile',
  INBOX: 'Inbox',
  PREMIUM: 'Premium',
  FEATURES: 'Features',
} as const

export const HOME_ROUTES = {
  HOME_MAIN: 'Home_Main',
  HOME_TASK: 'Home_Task',
  HOME_BACKLOG: 'Home_Backlog',
  TASK_CREATE: 'Task_Create',
  BACKLOG_CREATE: 'Backlog_Create',
} as const

export const INBOX_ROUTES = {
  INBOX: 'Inbox_Tasks',
  INBOX_TASK_CREATE: 'Inbox_Task_Create',
  INBOX_TASK_DETAIL: 'Inbox_task_detail',
} as const

export const NOTE_ROUTES = {
  NOTES_LIST: 'Notes_List',
  NOTE_CREATE: 'Note_Create',
  NOTE_DETAIL: 'Note_Detail',
} as const

export const GOAL_ROUTES = {
  GOALS_LIST: 'Goals_List',
  GOAL_CREATE: 'Goal_Create',
  GOAL_DETAILS: 'Goal_Details',
} as const

export const PROJECT_ROUTES = {
  PROJECTS_LIST: 'Projects_List',
  PROJECT_CREATE: 'Project_Create',
  PROJECT_DETAILS: 'Project_Details',
} as const

export const PROFILE_ROUTES = {
  SETTINGS_LIST: 'Setting_List',
  PERSONAL_SETTING: 'Personal_Settings',
  CHANGE_PASSWORD: 'Change_password',
  APP_SETTINGS: 'App_Details',
  TIMER_SETTINGS: 'Timer_Details',
  BUY_PREMIUM: 'Buy_Premium',
  STATISTICS: 'Statistics',
} as const

type valueof<T> = T[keyof T]

export type OnboardingRoutes = valueof<typeof ONBOARDING_ROUTES>
export type DashboardRootRoutes = valueof<typeof DASHBOARD_ROOT_ROUTES>
export type HomeRoutes = valueof<typeof HOME_ROUTES>
export type NoteRoutes = valueof<typeof NOTE_ROUTES>
export type GoalRoutes = valueof<typeof GOAL_ROUTES>
export type ProjectRoutes = valueof<typeof PROJECT_ROUTES>
export type ProfileRoutes = valueof<typeof PROFILE_ROUTES>
export type InboxRoutes = valueof<typeof INBOX_ROUTES>

export type RootRoutes = OnboardingRoutes | DashboardRootRoutes
export type ChildrenRoutes =
  | HomeRoutes
  | NoteRoutes
  | GoalRoutes
  | ProjectRoutes
  | ProfileRoutes
  | InboxRoutes

export type AllRoutes = RootRoutes | ChildrenRoutes
