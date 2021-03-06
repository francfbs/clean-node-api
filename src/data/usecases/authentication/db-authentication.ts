import { AuthenticationModel, LoadAccountByEmailRepository, HashComparer, TokenGenerator, UpdateAccessTokenRepository, Authentication } from './db-authentication-interfaces'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (model: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(model.email)
    if (account) {
      const isValid = await this.hashComparer.compare(model.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.updateToken(account.id, accessToken)
        return (accessToken)
      }
    }
    return null
  }
}
