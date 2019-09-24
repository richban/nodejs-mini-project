import { JSONSchema4 } from 'json-schema'

export const IWebTokenBaseValidation: JSONSchema4 = {
  type: 'object',
  properties: {
    iat: { type: 'number' },
    exp: { type: 'number' },
  },
  required: ['iat', 'exp'],
}
