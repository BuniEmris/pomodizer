/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Paginated } from '@feathersjs/feathers'
import { setTags, updateTag, addTag, deleteTag } from 'store/tags'
import { Tag } from 'types'
import { PromiseThunk } from '../index'

import apiClient from 'utils/apiClient'
import analytics from '@react-native-firebase/analytics'

import uuid from 'react-native-uuid'
import NetInfo from '@react-native-community/netinfo'
import logger from 'utils/logger'

export const fetchTags = (): PromiseThunk<Tag[]> => async (dispatch) => {
  const { data: tags }: Paginated<Tag> = await apiClient.service('tags').find({
    query: {
      $limit: 50,
    },
  })

  dispatch(setTags(tags))
  return tags
}

export const createTag =
  (values: Partial<Tag>): PromiseThunk<Tag> =>
  async (dispatch) => {
    const localId = uuid.v4() as string
    const localTag = {
      ...values,
      localId,
      isLocalCreated: true,
      _id: localId,
    } as Tag

    dispatch(addTag(localTag))

    const netinfo = await NetInfo.fetch()

    if (netinfo.isConnected) {
      const tag: Tag = await apiClient
        .service('tags')
        .create({ ...localTag, _id: undefined })
      dispatch(addTag({ ...tag, isLocalCreated: false }))
      analytics().logEvent('project_created')

      return tag
    }

    return localTag
  }

export const patchTag =
  (id: string, values: Partial<Tag>): PromiseThunk<Tag> =>
  async (dispatch) => {
    const tagPayload = values as Tag

    if (!tagPayload.localId) {
      tagPayload.localId = uuid.v4() as string
    }

    dispatch(updateTag({ ...tagPayload, isLocalEdited: true }))

    if (tagPayload.isArchived) {
      dispatch(deleteTag(id))
    } else {
      dispatch(updateTag(tagPayload))
    }

    const netinfo = await NetInfo.fetch()
    if (netinfo.isConnected) {
      const tag: Tag = await apiClient.service('tags').patch(id, values)

      if (tag.isArchived) {
        dispatch(deleteTag(tag._id))
      } else {
        dispatch(updateTag(tag))
      }

      return tag
    }

    return tagPayload
  }

export const removeTag =
  (id: string): PromiseThunk<Tag | undefined> =>
  async (dispatch) => {
    try {
      const tag: Tag = await apiClient.service('tags').remove(id)
      dispatch(deleteTag(tag._id))

      return tag
    } catch (e) {
      logger.log('remove tag', e)
    }
  }

export const syncLocalTagWithApi =
  (): PromiseThunk => async (dispatch, getState) => {
    const allTags = getState().tags

    const localCreatedTags = allTags.filter((el) => el.isLocalCreated)

    const localEditedTags = allTags.filter((el) => el.isLocalEdited)

    // Promise.all not working for sync task
    if (localCreatedTags.length) {
      for (const localTag of localCreatedTags) {
        try {
          const createdTag = await apiClient
            .service('tags')
            .create({ ...localTag, _id: undefined })

          dispatch(addTag(createdTag))
        } catch (e) {
          logger.error('sync goal', e)
        }
      }
    }

    // Promise.all not working for sync task
    if (localEditedTags.length) {
      for (const localTag of localEditedTags) {
        try {
          const updatedTag: Tag = await apiClient
            .service('tags')
            .patch(localTag._id, { ...localTag, _id: undefined })

          dispatch(updateTag({ ...updatedTag, isLocalEdited: false }))
        } catch (e) {
          logger.error('sync task', e)
        }
      }
    }
  }
