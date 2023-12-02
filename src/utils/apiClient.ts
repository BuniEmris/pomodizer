import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from 'config'

// const socket = io(config.API_URL, {
//   transports: ['polling', 'websocket'],
//   path: '/api/v1/socket.io',
//   forceNew: true,
// })

// const feathersClient = feathers()
//   .configure(
//     socketio(socket, {
//       timeout: 5000,
//     })
//   )
//   .configure(
//     auth({
//       storage: AsyncStorage,
//     })
//   )

const socket = io(config.API_URL, {
  transports: ['polling', 'websocket'],
  path: '/api/v1/socket.io',
  forceNew: true,
  upgrade: false,
})

const feathersClient = feathers()

feathersClient.configure(
  socketio(socket, {
    timeout: 30000,
  })
)

feathersClient.configure(
  auth({
    storage: AsyncStorage,
  })
)

export const authService = feathersClient.service('authentication')
export const userInfoService = feathersClient.service('user/info')
export const usersService = feathersClient.service('users')
export const resetPasswordService = feathersClient.service('reset-password')
export const newPasswordService = feathersClient.service('new-password')

export default feathersClient
