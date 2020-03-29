import { Validation } from '../../interfaces/validation'
import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../interfaces/email-validator'

export class EmailFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
