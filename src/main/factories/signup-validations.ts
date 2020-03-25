import { ValidationComposite } from '../../presentation/helpers/validations/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validations/required-field-validation'
import { Validation } from '../../presentation/helpers/validations/validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validations/compare-fields-validation'

export const makeSignupValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
