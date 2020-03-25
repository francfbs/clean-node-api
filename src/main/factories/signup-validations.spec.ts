import { makeSignupValidations } from './signup-validations'
import { ValidationComposite } from '../../presentation/helpers/validations/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validations/required-field-validation'
import { Validation } from '../../presentation/helpers/validations/validation'

jest.mock('../../presentation/helpers/validations/validation-composite')

describe('Signup Validations', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignupValidations()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
