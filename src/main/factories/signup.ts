import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account-repository'

export const makeSignupController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  return new SignUpController(emailValidator, dbAddAccount)
}
