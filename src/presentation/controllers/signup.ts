import { Controller } from './../interfaces/controller'
import { badRequest } from './../helpers/http-helper'
import { HttpResponse, HttpRequest } from './../interfaces/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
