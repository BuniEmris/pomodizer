import { AllRoutes, ChildrenRoutes, RootRoutes } from 'navigation/routes'
import { PurchasesEntitlementInfo } from 'react-native-purchases'

export type ErrorState = string | null

export type Loading = boolean

export type UploadImage = {
  path: string
  _id: string
}

export type BackRoutes = {
  rootRoutes: RootRoutes
  screen?: ChildrenRoutes
  params?: Record<string, any>
}

export type User = {
  _id: string
  email: string
  firstName: string
  lastName: string
  isVerified?: boolean
  logo?: UploadImage
  deviceOS?: string
  appVersion?: string
  isNotificationEnabled?: boolean
  deviceToken?: string
  timeZoneOffset?: number
  isPremium?: boolean
  phone?: string
  isNeedUpdate?: boolean
  language?: string
  lastUpdateShow?: string
  lastInAppReviewShow?: string
  lastPremiumShow?: string
  // purchaseInfo?: {
  //   latestPurchaseDate: string
  //   latestPurchaseDateMillis: number
  //   isSandbox: boolean
  //   originalPurchaseDate: string
  //   expirationDate: string
  //   expirationDateMillis: number
  //   billingIssueDetectedAt: string
  //   unsubscribeDetectedAtMillis: number | null
  //   identifier: string
  //   periodType: string
  //   unsubscribeDetectedAt: string | null
  //   store: string
  //   isActive: boolean
  //   willRenew: boolean
  //   ownershipType: string
  //   originalPurchaseDateMillis: number
  //   productIdentifier: string
  //   billingIssueDetectedAtMillis: number | null
  // }
  purchaseInfo?: PurchasesEntitlementInfo
  settings?: {
    testTimer: boolean
  }
  createdAt?: string | Date
}

export type SignInForm = {
  email: string
  password: string
}

export type SignUpForm = {
  name: string
  email: string
}

export type Note = {
  _id: string
  title: string
  dueDate: string
  dueTime: string
  isReminded: boolean
  doneAt?: Date
  checklist: Partial<Checklist>
  checkListId: string
  userId: string
  // uploadsIds: string[];
  status: 'active' | 'done'
  createdAt: string | Date
  updatedAt: string | Date
  description?: string
}

export type Task = {
  _id: string
  name: string
  description: string
  dueDate?: string | null
  dueDateHistory: string[]
  dueTime: string
  doneAt?: string
  notificationTime?: string
  tomatoFact: number
  tomatoPlan: number
  position: number
  userId: string
  tags: Tag[]
  tagsIds: string[]
  tasksHistory: TaskHistoryItem[]
  uploadsIds?: string[]
  commentsIds?: string[]
  uploads: any
  checkListId?: string
  checklist: Partial<Checklist>
  status: 'wait' | 'done' | 'inProcess' | 'hold'
  type?: 'tutorial' | ''
  createdAt: string | Date
  updatedAt: string | Date
  isLocalCreated?: boolean
  isLocalEdited?: boolean
  localId?: string
}

export type Checklist = {
  _id: string
  name: string
  items: ChecklistItem[]
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
  localId?: string
}

export type ChecklistItem = {
  _id?: string
  title: string
  isChecked: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type TaskHistoryItem = {
  _id: string
  taskId: string
  type: 'created' | 'rescheduled' | 'changed'
  rescheduled: { from: string; to: string }
  changed: any
  createdAt: string | Date
  updatedAt: string | Date
}

export interface Goal {
  _id: string
  title: string
  description: string
  emoji: { icon: string; name: string }
  status: 'active' | 'done'
  doneAt?: Date
  dueDate: string
  isMonthly: boolean
  position: number
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
  isLocalCreated?: boolean
  isLocalEdited?: boolean
  localId?: string
}

export type CheckList = {
  name: string
  items: {
    _id: string
    title: string
    isChecked: boolean
  }[]
  localId?: string
}

export type Tag = {
  _id: string
  name: string
  description: string
  color: string
  isArchived?: boolean
  isLocalCreated?: boolean
  isLocalEdited?: boolean
  localId?: string
}
