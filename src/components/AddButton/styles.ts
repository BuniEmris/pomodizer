import { StyleSheet } from 'react-native'
import { LIME, GOLDEN, YELLOW } from 'styles/colors'

export default StyleSheet.create({
  inboxAdd: {
    position: 'absolute',
    bottom: 40,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: LIME,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 3,
  },
})
