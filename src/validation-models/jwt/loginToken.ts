import { JSONSchema4 } from 'json-schema'
import { IEdugoTokenValidation } from './edugoToken'

export const ILoginTokenValidation: JSONSchema4 = {
  ...IEdugoTokenValidation,
  properties: {
    ...IEdugoTokenValidation.properties!,
    userId: { type: 'number' },
  },
  required: [...(IEdugoTokenValidation.required as string[]), 'userId'],
}
