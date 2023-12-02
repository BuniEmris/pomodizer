import { useReducer } from 'react'

const useSimpleReducer = <T extends object>(initialState: T) => {
  type Action =
    | {
        type: 'UPDATE_STATE'
        payload: Partial<T>
      }
    | { type: 'RESET_STATE' }

  const reducer = (state: T, action: Action): T => {
    switch (action.type) {
      case 'UPDATE_STATE':
        return { ...state, ...action.payload }
      case 'RESET_STATE':
        return initialState
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const updateState = (payload: Partial<T>) =>
    dispatch({ type: 'UPDATE_STATE', payload })

  const resetState = () => dispatch({ type: 'RESET_STATE' })

  return { state, updateState, resetState }
}

export default useSimpleReducer
