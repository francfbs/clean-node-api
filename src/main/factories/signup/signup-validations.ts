import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field-validation'
import { Validation } from '../../../presentation/helpers/validations/validation'
import { CompareFieldsValidation } from '../../../presentation/helpers/validations/compare-fields-validation'
import { EmailFieldValidation } from '../../../presentation/helpers/validations/email-field-validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeSignupValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
