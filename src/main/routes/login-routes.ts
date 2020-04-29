import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeSignupController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}