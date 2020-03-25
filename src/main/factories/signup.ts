import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account-repository'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/interfaces'
import { LogMongoRepository } from '../../infra/db/mongodb/log/log-repository'
import { makeSignupValidations } from './signup-validations'

export const makeSignupController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const signupController = new SignUpController(dbAddAccount, makeSignupValidations())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
