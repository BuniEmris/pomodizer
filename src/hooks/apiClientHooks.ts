import { useEffect, useReducer, useState } from 'react'
import apiClient from 'utils/apiClient'
import logger from 'utils/logger'

import isEmpty from 'lodash.isempty'

interface InitialState {
  isPending: boolean
  dataRespons: any
  error: any | undefined
}

const initialQueryState: InitialState = {
  isPending: false,
  dataRespons: {},
  error: undefined,
}

interface QueryAction {
  type: 'UPDATE_STATE'
  payload: Partial<InitialState>
}

const queryReducer = (
  state: InitialState,
  action: QueryAction
): InitialState => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const useCreateRequest = (serviceName: string) => {
  const [state, dispatch] = useReducer(queryReducer, initialQueryState)

  const updateStateAction = (payload: Partial<InitialState>) =>
    dispatch({
      type: 'UPDATE_STATE',
      payload,
    })

  const createEntity = async <T>(payload: T, query: object = {}) => {
    if (state.error) {
      updateStateAction({ error: undefined })
    }

    updateStateAction({ isPending: true })
    try {
      const resp = await apiClient.service(serviceName).create(payload, query)
      logger.log(`Create ${serviceName}`, resp)

      updateStateAction({ dataRespons: resp })
      return Promise.resolve(resp)
    } catch (e: any) {
      logger.error(`Create ${serviceName}`, e)
      updateStateAction({ error: e?.message })
      return Promise.reject(e)
    } finally {
      updateStateAction({ isPending: false })
    }
  }

  return {
    createEntity,
    ...state,
  }
}

export const usePatchRequest = (serviceName: string) => {
  const [state, dispatch] = useReducer(queryReducer, initialQueryState)

  const updateStateAction = (payload: Partial<InitialState>) =>
    dispatch({
      type: 'UPDATE_STATE',
      payload,
    })

  const patchEntity = async <T>(
    entityId: number | string | null,
    payload: T
  ) => {
    if (state.error) {
      updateStateAction({ error: undefined })
    }

    updateStateAction({ isPending: true })
    try {
      const resp = await apiClient.service(serviceName).patch(entityId, payload)
      logger.log(`Patch ${serviceName}`, resp)

      updateStateAction({ dataRespons: resp })
      return Promise.resolve(resp)
    } catch (e) {
      logger.error(`Patch ${serviceName}`, e)
      return Promise.reject(e)
    } finally {
      updateStateAction({ isPending: false })
    }
  }

  return {
    patchEntity,
    ...state,
  }
}

export const useRemoveRequest = (serviceName: string) => {
  const [state, dispatch] = useReducer(queryReducer, initialQueryState)

  const updateStateAction = (payload: Partial<InitialState>) =>
    dispatch({
      type: 'UPDATE_STATE',
      payload,
    })

  const removeEntity = async <T>(
    entityId: number | string | null,
    payload: T
  ) => {
    if (state.error) {
      updateStateAction({ error: undefined })
    }

    updateStateAction({ isPending: true })
    try {
      const resp = await apiClient
        .service(serviceName)
        .remove(entityId, payload)
      logger.log(`Remove ${serviceName}`, resp)

      updateStateAction({ dataRespons: resp })
      return Promise.resolve(resp)
    } catch (e: any) {
      logger.error(`Remove ${serviceName}`, e)
      updateStateAction({ error: e.message || e })
      return Promise.reject(e)
    } finally {
      updateStateAction({ isPending: false })
    }
  }

  return {
    removeEntity,
    ...state,
  }
}

export const useFindRequest = (
  serviceName: string,
  query: any = {},
  initialState: Partial<InitialState> = {},
  saveToStorage = false
) => {
  const [state, dispatch] = useReducer(queryReducer, {
    ...initialQueryState,
    ...initialState,
  })
  const [isAllFetched, setIsAllFetched] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { dataRespons, isPending, error } = state

  const updateStateAction = (payload: Partial<InitialState>) =>
    dispatch({
      type: 'UPDATE_STATE',
      payload,
    })

  const fetchEntities = async (
    extendedQuery?: object,
    resetState = true,
    refresh = false
  ) => {
    updateStateAction({ isPending: true })
    if (resetState) {
      updateStateAction({
        ...initialQueryState,
        ...initialState,
      })
    }
    if (refresh) {
      setIsRefreshing(true)
    }
    try {
      // if (saveToStorage && !netInfoState.isConnected) {
      //   const storageResp = await getStorageResponse(serviceName)
      //   if (!storageResp) {
      //     return
      //   }
      //   updateStateAction({ dataRespons: storageResp, error: false })
      //   return
      // }

      const resp = await apiClient.service(serviceName).find({
        query: {
          ...query,
          ...extendedQuery,
        },
      })
      logger.log('query', {
        ...query,
        ...extendedQuery,
      })
      logger.log(`Find ${serviceName}`, resp)

      // if (saveToStorage) {
      //   await setStorageResponse(serviceName, resp)
      // }

      updateStateAction({ dataRespons: resp, error: false })
      return Promise.resolve(resp)
    } catch (e) {
      updateStateAction({ error: e })
      logger.error(`Find ${serviceName}`, e)
    } finally {
      updateStateAction({ isPending: false })
      if (refresh) {
        setIsRefreshing(false)
      }
    }
  }

  const loadMoreEntities = async (extendedQuery?: object) => {
    if (isAllFetched || isPending) {
      return
    }

    try {
      if (!dataRespons?.data) return

      updateStateAction({ isPending: true })
      const resp = await apiClient.service(serviceName).find({
        query: {
          ...query,
          ...extendedQuery,
          $skip: dataRespons?.data?.length || 0,
        },
      })

      logger.log(`Find load ${serviceName}`, resp)

      logger.log('dataRespons?.data', dataRespons?.data)
      updateStateAction({
        dataRespons: {
          total: resp.total,
          limit: resp.limit,
          skip: resp.skip,
          data: [...dataRespons?.data, ...resp?.data],
        },
      })
      if (resp?.data?.length === 0) {
        setIsAllFetched(true)
      }
    } catch (e) {
      logger.error(`Find ${serviceName}`, e)
    } finally {
      updateStateAction({ isPending: false })
    }
  }

  useEffect(() => {
    if (dataRespons.data && dataRespons?.data?.length >= dataRespons.total) {
      setIsAllFetched(true)
    } else {
      setIsAllFetched(false)
    }
  }, [dataRespons.data, dataRespons.total])

  const refreshEntities = (extendedQuery?: object) => {
    fetchEntities(extendedQuery, false, true)
  }

  const resetEntities = () => {
    updateStateAction({
      dataRespons: {
        total: 0,
        limit: 10,
        skip: 0,
        data: [],
      },
    })
  }

  const updateDataResponse = (data: object) => {
    updateStateAction({
      dataRespons: data,
    })
  }

  const resetState = () => {
    updateStateAction({
      ...initialQueryState,
      ...initialState,
      isPending: false,
    })

    setIsAllFetched(false)
  }

  const isEmptyDataResponse = isEmpty(dataRespons)

  return {
    fetchEntities,
    loadMoreEntities,
    dataRespons,
    isAllFetched,
    isPending,
    error,
    resetEntities,
    resetState,
    isRefreshing,
    isEmptyDataResponse,
    refreshEntities,
    updateDataResponse,
  }
}

export const useGetRequest = (
  serviceName: string,
  initialState: Partial<InitialState> = {}
) => {
  const [state, dispatch] = useReducer(queryReducer, {
    ...initialQueryState,
    ...initialState,
  })

  const updateStateAction = (payload: Partial<InitialState>) =>
    dispatch({
      type: 'UPDATE_STATE',
      payload,
    })

  const getEntity = async (entityId: number | string) => {
    if (state.error) {
      updateStateAction({ error: undefined })
    }

    // const netInfoState = await NetInfo.fetch()
    // if (!netInfoState) {
    //   return
    // }

    updateStateAction({ isPending: true })
    try {
      const resp = await apiClient.service(serviceName).get(entityId)
      logger.log(`Get ${serviceName}`, resp)
      updateStateAction({ dataRespons: resp })

      return Promise.resolve(resp)
    } catch (e) {
      logger.error(`Get ${serviceName}`, e)
      return Promise.reject(e)
    } finally {
      updateStateAction({ isPending: false })
    }
  }

  const updateDataResponse = (data: object) => {
    updateStateAction({
      dataRespons: {
        ...state.dataRespons,
        ...data,
      },
    })
  }

  const resetState = () => {
    updateStateAction({
      ...initialQueryState,
      ...initialState,
    })
  }

  const isEmptyDataResponse = isEmpty(state.dataRespons)
  const isRefreshing = state.isPending && !isEmptyDataResponse
  const isPending = state.isPending && isEmptyDataResponse
  return {
    getEntity,
    resetState,
    updateDataResponse,
    isEmptyDataResponse,
    isRefreshing,
    ...state,
    isPending,
  }
}
