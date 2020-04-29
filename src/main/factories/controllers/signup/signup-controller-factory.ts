import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/interfaces'
import { makeSignupValidations } from './signup-validations-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/add-account/signup-controller-factory'
import { makeLogControllerDecorator } from '../../decorators/logs/log-controller-dacorator-factory'

export const makeSignupController = (): Controller => {
  const signupController = new SignUpController(makeDbAddAccount(), makeSignupValidations(), makeDbAuthentication())
  return makeLogControllerDecorator(signupController)
}
