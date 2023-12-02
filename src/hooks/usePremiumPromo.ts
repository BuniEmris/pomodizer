import moment from 'moment'
import navigationService from 'navigation/navigationService'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store'
import { patchUser } from 'store/auth/thunkActions'

const usePremiumPromo = () => {
  const { lastPremiumShow, isPremium } = useTypedSelector(
    (store) => store.auth.user
  )
  const allTasks = useTypedSelector((store) => store.tasks.allTasks)

  const dispatch = useDispatch()

  const checkShowPremium = () => {
    if (isPremium) {
      return false
    }

    if (lastPremiumShow && moment().diff(lastPremiumShow, 'days') < 10) {
      return false
    }

    const userTasks = allTasks.filter((el) => el.type !== 'tutorial')

    if (userTasks.length <= 3) {
      return false
    }

    dispatch(
      patchUser({
        lastPremiumShow: new Date().toISOString(),
      })
    )

    navigationService.navigate('Premium')

    return true
  }

  return { checkShowPremium }
}

export default usePremiumPromo
