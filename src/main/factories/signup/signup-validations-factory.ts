import { ValidationComposite, EmailFieldValidation, RequiredFieldValidation, CompareFieldsValidation } from '../../../presentation/helpers/validations'
import { Validation } from '../../../presentation/interfaces/validation'
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
