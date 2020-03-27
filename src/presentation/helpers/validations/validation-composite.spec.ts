import { ValidationComposite } from './validation-composite'
import { Validation } from '../../interfaces/validation'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = makeValidation()
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}

const makeValidation = (): Validation[] => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return [new ValidationStub(), new ValidationStub()]
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({})
    expect(error).toBeDefined()
  })

  test('Should return null if all validations pass', () => {
    const { sut } = makeSut()
    const error = sut.validate({})
    expect(error).toBeUndefined()
  })
})
