import { UserRole } from './entity/User'
import { JWTType, TokenTypeKey, IEDUGOToken, ILoginToken } from './token/tokenTypes'
import { NextFunction, Request, Response } from 'express'
import { User } from './entity'
import { verifyTokenOfType } from './security'
import { getUserById } from './user/userQueries'
import { dbo } from './orm'

export const ACCESS_TOKEN_FIELD = 'access-token'
export type GenericResponseErrors =
  | 'GENERIC_ERROR'
  | 'GENERIC_INVALID_TOKEN'
  | 'GENERIC_USER_NOT_FOUND'
  | 'GENERIC_ROOM_NOT_FOUND'
export type ResponseErrors = GenericResponseErrors

export interface IBaseRequest<T = any> extends Request {
  body: T
}

/**
 * T is the the expected body type
 * R is the type used in the json response
 */
export interface IBaseResponse<LocalsData = any, Res = any> extends Response {
  locals: {
    jwt?: IEDUGOToken
    user?: User
    data: LocalsData
  }
  json: (body: Res) => IBaseResponse<LocalsData, Res>
  status(code: number): IBaseResponse<LocalsData, Res>
}

export function errorResponse(response: Response, message: ResponseErrors | null, statusCode: number, error?: any) {
  return response
    .status(statusCode)
    .json({ message, error })
    .end()
}

// Looks for a JWT access-token in the request headers and query parameters.
export function lookForAccessToken(req: Request): string | undefined {
  return req.headers[ACCESS_TOKEN_FIELD] || req.query[ACCESS_TOKEN_FIELD]
}

/**
 * Middleware function that verifies that the user has a valid authentication token
 */
export function verifyToken(types: JWTType[], keys: TokenTypeKey[], allowedRoles: UserRole[]) {
  return async (req: Request, res: IBaseResponse, next: NextFunction) => {
    const token = lookForAccessToken(req)
    if (!token) {
      return errorResponse(res, 'GENERIC_INVALID_TOKEN', 403)
    }
    const jwt = verifyTokenOfType(token, keys, types)
    if (jwt && (await verifyTokenRole(jwt, allowedRoles))) {
      res.locals.jwt = jwt
      return next()
    } else {
      // User disabled or invalid role.
      return errorResponse(res, 'GENERIC_INVALID_TOKEN', 403) // @TODO We might add a custom error type for this.
    }
  }
}

/**
 * If the @token is of the type 'Authentication' it checks whether any of the @allowedRoles
 * matches the User from the token's role
 * If the role matches, this function will add the User to res.locals.user
 */
async function verifyTokenRole(token: IEDUGOToken, allowedRoles: UserRole[]): Promise<boolean> {
  if (token.type === 'Authentication') {
    const loginToken = token as ILoginToken
    let { role } = loginToken

    const user = await getUserById((token as ILoginToken).userId)
    if (!user) {
      // tslint:disable-next-line:no-console
      console.log(`Unable to find user for token of type: ${token.type}, or user disabled`)
      return false
    }
    if (!role) {
      role = user.getRole()
    }
    return allowedRoles.find((aRole: UserRole) => aRole === role) !== undefined
  }
  return true
}

/**
 * Hack-ish middleware to initialise res.locals.data which is used in other middleware to pass on data
 */
export function initLocals(req: Request, res: Response, next: NextFunction) {
  res.locals.data = {}
  return next()
}

export async function ensureDbConnection(req: Request, res: Response, next: NextFunction) {
  await dbo()
  return next()
}

export async function attachUserFromToken(req: Request, res: IBaseResponse, next: NextFunction) {
  const token = res.locals.jwt as ILoginToken
  const user = await getUserById(token.userId)
  if (!user) {
    return errorResponse(res, 'GENERIC_USER_NOT_FOUND', 404)
  }
  res.locals.user = user
  return next()
}
