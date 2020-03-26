import { HttpRequest } from '../../interfaces'
import { LoginController } from './login'
/* import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors' */
import { Validation, ok } from './interfaces/login-interfaces'

interface SutType {
  sut: LoginController
  validationStub: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

/* const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const sut = new LoginController(validationStub)
  return {
    sut,
    validationStub
  }
} */

const makeFakeRequest = (): HttpRequest => ({
  body: { email: 'any_email@mail.com', password: 'any_password' }
})

describe('Login Controller', () => {
  /* test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  }) */
  /* test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: { password: 'any_password' }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: { email: 'any_email@mail.com' }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  }) */
})
