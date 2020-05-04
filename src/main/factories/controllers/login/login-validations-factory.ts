import { ValidationComposite, EmailFieldValidation, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/interfaces/validation'
import { EmailValidatorAdapter } from '../../../../infra/validator/email-validator-adapter'

export const makeLoginValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
