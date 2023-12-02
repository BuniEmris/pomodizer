import { Task } from '../index'

export type TasksState = {
  allTasks: Task[]
  holdedTasks: Task[]
}

export type ChangeTasksPositionArgs = {
  taskId: string
  isHolded: boolean
  destinationColumnDate: string
  destinationIndex: number
  sourceIndex: number
  type: 'move' | 'reorder'
  extraValuesForChange: Partial<Task>
}

export type ChangeHoldedTasksPositionArgs = {
  taskId: string
  destinationIndex: number
  sourceIndex: number
}
