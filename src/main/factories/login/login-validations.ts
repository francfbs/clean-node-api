import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field-validation'
import { Validation } from '../../../presentation/interfaces/validation'
import { EmailFieldValidation } from '../../../presentation/helpers/validations/email-field-validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
