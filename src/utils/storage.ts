import AsyncStorage from '@react-native-async-storage/async-storage'

export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem('feathers-jwt')
  } catch (e) {
    //
  }
}
