import { Controller } from '../../../../presentation/interfaces'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-repository'

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator => {
  return new LogControllerDecorator(controller, new LogMongoRepository())
}
