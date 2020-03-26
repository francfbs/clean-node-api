import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../errors'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ fakeField: 'fake value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return null if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeUndefined()
  })
})
