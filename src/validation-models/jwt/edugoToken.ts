import { JSONSchema4 } from 'json-schema'
import { IWebTokenBaseValidation } from './webTokenBase'

export const IEdugoTokenValidation: JSONSchema4 = {
  ...IWebTokenBaseValidation,
  properties: {
    ...IWebTokenBaseValidation.properties!,
    version: { type: 'string' },
    type: { enum: ['Authentication'] },
  },
  required: [...(IWebTokenBaseValidation.required as string[]), 'type'],
}
