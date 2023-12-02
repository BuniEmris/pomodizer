export interface TimerState {
  isStarted?: boolean
  isPaused?: boolean
  timeInSeconds: number
  taskId: string
  mode: 'full' | 'simple'
  timerType: 'task' | 'break' | 'stop'
  isActive?: boolean
  isLongBrakeActive?: boolean
  pomodoroTimeLength: number
  breakLength: number
  longBreakLength: number
  longBreakAfter: number
  autoStartBreak: boolean
  autoSoundPerSeconds: boolean
  notificationId?: string
}
