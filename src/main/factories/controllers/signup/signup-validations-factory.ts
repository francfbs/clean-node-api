import { ValidationComposite, EmailFieldValidation, RequiredFieldValidation, CompareFieldsValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/interfaces/validation'
import { EmailValidatorAdapter } from '../../../../infra/validator/email-validator-adapter'

export const makeSignupValidations = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
