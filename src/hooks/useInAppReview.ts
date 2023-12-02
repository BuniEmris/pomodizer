import moment from 'moment'
import InAppReview from 'react-native-in-app-review'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store'
import { patchUser } from 'store/auth/thunkActions'
import logger from 'utils/logger'

export const useInAppReview = () => {
  const { lastInAppReviewShow } = useTypedSelector((store) => store.auth.user)
  const allTasks = useTypedSelector((store) => store.tasks.allTasks)

  const dispatch = useDispatch()

  const checkReview = async () => {
    // if (
    //   lastInAppReviewShow &&
    //   moment().diff(lastInAppReviewShow, 'days') < 15
    // ) {
    //   return
    // }

    if (lastInAppReviewShow || allTasks.length < 25) {
      return
    }

    InAppReview.RequestInAppReview()
      .then((hasFlowFinishedSuccessfully) => {
        // when return true in android it means user finished or close review flow
        logger.log('RequestInAppReview', hasFlowFinishedSuccessfully)

        // 1- you have option to do something ex: (navigate Home page) (in android).
        // 2- you have option to do something,
        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

        // 3- another option:
        if (hasFlowFinishedSuccessfully) {
          dispatch(
            patchUser({
              lastInAppReviewShow: new Date().toISOString(),
            })
          )
        } else {
          // @TODO add logic for check review
          dispatch(
            patchUser({
              lastInAppReviewShow: new Date().toISOString(),
            })
          )
        }

        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.

        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch((error) => {
        // we continue our app flow.
        // we have some error could happen while lanuching InAppReview,
        // Check table for errors and code number that can return in catch.
        logger.error('useInAppReview', error)
      })
  }

  return { checkReview }
}
