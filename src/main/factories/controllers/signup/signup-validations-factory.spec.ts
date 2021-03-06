import { makeSignupValidations } from './signup-validations-factory'
import { ValidationComposite, EmailFieldValidation, RequiredFieldValidation, CompareFieldsValidation } from '../../../../validation/validators'
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
