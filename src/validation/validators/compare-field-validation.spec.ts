import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field1', 'field2')
}

describe('RequiredField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field1: 'fake value', field2: 'wrong value' })
    expect(error).toEqual(new InvalidParamError('field2'))
  })

  test('Should return null if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field1: 'fake value', field2: 'fake value' })
    expect(error).toBeUndefined()
  })
})
