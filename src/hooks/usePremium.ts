import navigationService from 'navigation/navigationService'
import { useTypedSelector } from 'store'

const usePremium = () => {
  const { isPremium, purchaseInfo } = useTypedSelector(
    (store) => store.auth.user
  )

  const checkPremium = (premiumCallBack: () => void) => {
    if (!isPremium) {
      navigationService.navigate('Premium')
      return
    }

    premiumCallBack()
  }

  return { checkPremium, isPremium, purchaseInfo }
}

export default usePremium
