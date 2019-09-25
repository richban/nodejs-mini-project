import { Router } from 'express'
import { verifyLogin, loginResponseHandler } from './authMiddleware'

export const authRoutes = Router()

/**
 * GET EDUGO Login Access Token
 * @TODO: add validateBodyWithSchema(ILoginValidation)
 */
authRoutes.post(`/login`, verifyLogin, loginResponseHandler)
