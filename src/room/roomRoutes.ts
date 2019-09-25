import { JWTType } from './../token/tokenTypes'
import { Router } from 'express'
import { verifyToken } from '../expressApp'
import { createRoom, updateRoom } from './roomMiddleware'

export const roomRoutes = Router()

/**
 * Creates new meeting Room
 * @todo: add validation of the body request
 */
roomRoutes.post('/room', verifyToken([JWTType.LoginToken], ['Authentication'], ['admin']), createRoom)

/**
 * Allow Admins to update meeting Room information
 */
roomRoutes.patch('/room', verifyToken([JWTType.LoginToken], ['Authentication'], ['admin']), updateRoom)
