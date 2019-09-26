import { JWTType } from './../token/tokenTypes'
import { Router } from 'express'
import { verifyToken, attachUserFromToken } from '../expressApp'
import { createRoom, updateRoom, bookRoom, getRoomsBookings } from './roomMiddleware'

export const roomRoutes = Router()

/**
 * Creates a new meeting Room
 * @todo: add validation of the body request
 */
roomRoutes.post('/room', verifyToken([JWTType.LoginToken], ['Authentication'], ['admin']), createRoom)

/**
 * Allow Admins to update meeting Room information
 */
roomRoutes.patch('/room', verifyToken([JWTType.LoginToken], ['Authentication'], ['admin']), updateRoom)

/**
 * Book a meeting Room
 */
roomRoutes.post(
  '/room/:id/book',
  verifyToken([JWTType.LoginToken], ['Authentication'], ['admin', 'standard']),
  attachUserFromToken,
  bookRoom,
)

roomRoutes.get(
  '/room/bookings',
  verifyToken([JWTType.LoginToken], ['Authentication'], ['admin', 'standard']),
  getRoomsBookings,
)
