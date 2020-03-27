import { makeSignupValidations } from './signup-validations'
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field-validation'
import { Validation } from '../../../presentation/interfaces/validation'
import { CompareFieldsValidation } from '../../../presentation/helpers/validations/compare-fields-validation'
import { EmailFieldValidation } from '../../../presentation/helpers/validations/email-field-validation'
import { EmailValidator } from '../../../presentation/interfaces/email-validator'

jest.mock('../../../presentation/helpers/validations/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Signup Validations', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidations()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
