import { VerifyOptions, SignOptions } from 'jsonwebtoken'
import * as jwt from 'jsonwebtoken'
import { IEDUGOToken, TokenTypeKey, JWTType } from './token/tokenTypes'
import { Config } from './config'
import { JSONSchema4 } from 'json-schema'
import { validateSchema } from './input-validation/input-validation'
import { ILoginTokenValidation } from './validation-models/jwt/loginToken'

export const signOptions: SignOptions = {
  algorithm: 'HS384',
}

export const verifyOptions: VerifyOptions = {
  algorithms: [signOptions.algorithm!],
  ignoreExpiration: false,
}

export function signJwt(payload: object): string {
  return jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000), // default issued-at date
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7 /*days*/), // default expiration date 7 days
      ...payload, // the above may be overwritten
    },
    Config.jwtSecret,
    signOptions,
  )
}

export function verify(token: string): IEDUGOToken {
  return jwt.verify(token, Config.jwtSecret, verifyOptions) as IEDUGOToken
}

function verifyWithSchema(token: IEDUGOToken, keys: TokenTypeKey[], schema: JSONSchema4): boolean {
  // Perform schema validation to ensure all info is available.
  return validateSchema(schema, token).valid
}

export function verifyTokenOfType(token: string, keys: TokenTypeKey[], types: JWTType[]): IEDUGOToken | false {
  let validation = false
  let edugoToken: IEDUGOToken | undefined
  // First verify the token.
  try {
    edugoToken = verify(token)
    // Verify key type.
    if (keys.indexOf(edugoToken.type) === -1) {
      // tslint:disable-next-line:no-console
      console.log(
        `Token with type: ${edugoToken.type} does not match any of the provided types: ${JSON.stringify(types)}`,
      )
      return false
    }
  } catch (error) {
    return false
  }
  // Now verify that the contents of the token matches what we expected.
  let i = 0
  while (validation === false && i < types.length) {
    const type = types[i]
    switch (type) {
      case JWTType.LoginToken:
        validation = verifyWithSchema(edugoToken, keys, ILoginTokenValidation)
        break
    }
    i++
  }
  return edugoToken
}
