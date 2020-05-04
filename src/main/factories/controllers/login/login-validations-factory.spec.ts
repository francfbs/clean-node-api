import { makeLoginValidations } from './login-validations-factory'
import { ValidationComposite, EmailFieldValidation, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/interfaces/validation'
import { EmailValidator } from '../../../../validation/interfaces/email-validator'

jest.mock('../../../../validation/validators/validation-composite')

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
