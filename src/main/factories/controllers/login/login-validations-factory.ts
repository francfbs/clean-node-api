import { ValidationComposite, EmailFieldValidation, RequiredFieldValidation } from '../../../../presentation/helpers/validations'
import { Validation } from '../../../../presentation/interfaces/validation'
import { EmailValidatorAdapter } from '../../../../utils/email-validator-adapter'

export const makeLoginValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
