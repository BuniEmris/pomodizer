import { useReducer } from 'react'

const getErorrsObj = (obj: object) => {
  const objErr: any = {}
  Object.keys(obj).forEach((item) => {
    objErr[item] = undefined
  })

  return objErr
}
const useForm = <T extends object>(
  initialState: T,
  onUpdateValue?: () => void,
  onResetErrors?: () => void
) => {
  const [formState, formDispatch] = useReducer(
    (
      state: T & { errors: T },
      action: {
        type:
          | 'UPDATE_STATE_VALUES'
          | 'UPDATE_ERRORS'
          | 'RESET_ERRORS'
          | 'RESET_FORM'
        payload?: Partial<T>
      }
    ): T & { errors: T } => {
      switch (action.type) {
        case 'UPDATE_STATE_VALUES':
          return {
            ...state,
            errors: getErorrsObj(initialState),
            ...action.payload,
          }
        case 'UPDATE_ERRORS':
          return {
            ...state,
            errors: {
              ...state.errors,
              ...action.payload,
            },
          }
        case 'RESET_ERRORS':
          return {
            ...state,
            errors: getErorrsObj(initialState),
            ...action.payload,
          }
        case 'RESET_FORM':
          return {
            ...initialState,
            errors: getErorrsObj(initialState),
          }
        default:
          return state
      }
    },
    { ...initialState, errors: getErorrsObj(initialState) }
  )

  const updateFormValuesAction = (payload: Partial<T>) => {
    if (onUpdateValue) {
      onUpdateValue()
    }
    formDispatch({
      type: 'UPDATE_STATE_VALUES',
      payload,
    })
  }

  const updateFormErrors = (payload: Partial<T>) => {
    if (onResetErrors) {
      onResetErrors()
    }

    formDispatch({
      type: 'UPDATE_ERRORS',
      payload,
    })
  }

  const resetForm = () => {
    formDispatch({
      type: 'RESET_FORM',
    })
  }
  return { formState, updateFormValuesAction, updateFormErrors, resetForm }
}

export default useForm
