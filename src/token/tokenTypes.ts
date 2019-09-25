import { UserRole } from '../entity/User'

export interface IBaseToken {
  iat: number
  exp: number
}

export enum JWTType {
  LoginToken,
}

export type TokenTypeKey = keyof typeof TokenType // `keyof typeof` produces `type`:"enum value 1"|"enum value 2" ... pretty funky, see https://github.com/Microsoft/TypeScript/issues/14106#issuecomment-280253269

export enum TokenType {
  Authentication = 200,
}

export interface IEDUGOToken extends IBaseToken {
  version?: string
  type: TokenTypeKey
}

export interface ILoginToken extends IEDUGOToken {
  userId: number
  role?: UserRole
}
