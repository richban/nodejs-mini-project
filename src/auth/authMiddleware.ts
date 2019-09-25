import { ILoginRequest, ILoginLocals, ILoginResponse } from './authTypes'
import { IBaseRequest, IBaseResponse, errorResponse } from '../expressApp'
import { NextFunction } from 'express'
import { User } from './../entity'
import { fetchUserByEmail } from './../user/userQueries'
import { formatLoginToken } from '../token/tokenFunctions'

export async function verifyLogin(
  req: IBaseRequest<ILoginRequest>,
  res: IBaseResponse<ILoginLocals>,
  next: NextFunction,
) {
  try {
    const email = req.body.username.trim()
    // const password = req.body.password ? req.body.password.trim() : ''

    const user: User | undefined = await fetchUserByEmail(email)

    if (user) {
      // check wheteher user passwords match
      const equalPasswords = true

      if (equalPasswords) {
        const role = user.getRole()
        res.locals.data.user = user
        res.locals.data.role = role
        res.locals.data.token = formatLoginToken(user.user_id, role)
      }
    }
  } catch (error) {
    return errorResponse(res, 'GENERIC_ERROR', 500)
  }
  return next()
}

/**
 * Response for 'POST /login' endpoint
 */
export async function loginResponseHandler(
  req: IBaseRequest,
  res: IBaseResponse<ILoginLocals, ILoginResponse>,
  next: NextFunction,
) {
  const response = {
    token: res.locals.data.token,
    user: res.locals.data.user,
    role: res.locals.data.role,
  } as ILoginResponse

  return res.status(200).json(response)
}
