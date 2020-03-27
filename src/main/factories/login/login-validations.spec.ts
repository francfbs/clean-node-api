import { makeLoginValidations } from './login-validations'
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field-validation'
import { Validation } from '../../../presentation/interfaces/validation'
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

describe('Login Validations', () => {
  test('Login call ValidationComposite with all validations', () => {
    makeLoginValidations()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
