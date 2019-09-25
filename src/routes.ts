import { Router } from 'express'
import { authRoutes } from './auth/authRoutes'
import { roomRoutes } from './room/roomRoutes'

export const routes = Router()

routes.use('/', authRoutes)
routes.use('/', roomRoutes)
