import { Controller } from '../../../../presentation/interfaces'
import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { makeLoginValidations } from './login-validations-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/logs/log-controller-dacorator-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidations(), makeDbAuthentication())
  return makeLogControllerDecorator(loginController)
}
