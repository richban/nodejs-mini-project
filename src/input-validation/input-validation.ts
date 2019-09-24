import * as Ajv from 'ajv'
import { JSONSchema4 } from 'json-schema'

const ajv = new Ajv({ allErrors: true, coerceTypes: true })

export interface IValidationResult {
  valid: boolean
  errors: Ajv.ErrorObject[] | undefined | null
}

export function validateSchema(schema: JSONSchema4, element: any, printErrors: boolean = true): IValidationResult {
  const valid = ajv.validate(schema, element) as boolean

  return {
    valid,
    errors: ajv.errors,
  }
}
