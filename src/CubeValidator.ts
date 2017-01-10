import IValidation from './IValidation'
import IConstraint, {IConstraintResult} from './IConstraint'
import SparqlConstraint from './SparqlConstraint'
import queries from './assets/datacubeConstraintQueries'

export default class CubeValidator implements IValidation {

  readonly endpointURL: string
  readonly constraints: IConstraint[]

  constructor(endpointURL: string, constraints?: IConstraint[]) {
    this.endpointURL = endpointURL

    if (constraints) {
      this.constraints = constraints
    } else {
      this.constraints = this.defaultConstraints()
    }
  }

  validate(): Promise<IConstraintResult[]> {
    const checkPromises = this.constraints.map(constrain => constrain.check())
    return Promise.all(checkPromises)
  }

  defaultConstraints(): IConstraint[] {
      return queries.map(q => new SparqlConstraint(this.endpointURL, q.query))
  }
}
