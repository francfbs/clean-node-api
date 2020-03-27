import { AddAccountModel, AccountModel } from '../../usecases/add-account/db-add-account-interfaces'

export interface AddAccountRepository {
  add (account: AddAccountModel): Promise<AccountModel>
}
