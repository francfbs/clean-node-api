import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account-repository'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/interfaces'

export const makeSignupController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signupController = new SignUpController(emailValidator, dbAddAccount)
  return new LogControllerDecorator(signupController)
}
