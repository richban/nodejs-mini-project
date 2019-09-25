import { UserRole } from '../entity/User'
import { signJwt } from '../security'
import { IBaseToken, TokenType, TokenTypeKey, ILoginToken } from './tokenTypes'

function formatBaseToken(durationDays: number = 90): IBaseToken {
  const now = Date.now()
  return {
    iat: Math.floor(now / 1000),
    exp: Math.floor(now / 1000 + 60 * 60 * 24 * durationDays /*days*/),
  }
}

export function formatLoginTokenInfo(
  userId: number,
  userRole: UserRole | undefined,
  type: TokenType = TokenType.Authentication,
): ILoginToken {
  return {
    ...formatBaseToken(),
    type: TokenType[type] as TokenTypeKey,
    userId,
    role: userRole,
  }
}

export function formatLoginToken(
  userId: number,
  userRole: UserRole | undefined,
  type: TokenType = TokenType.Authentication,
): string {
  return signJwt(formatLoginTokenInfo(userId, userRole, type))
}
