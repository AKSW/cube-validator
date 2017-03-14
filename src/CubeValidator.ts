import IValidation from './IValidation'
import * as constraintClasses from './constraintClasses'
import IConstraint from './IConstraint'
import IResolve from './IResolve'
import IConstraintResult, {ConstraintResultType} from './IConstraintResult'
import IConstraintResultsSummary from './IConstraintResultsSummary'
import ConstraintResultsSummary from './ConstraintResultsSummary'
import Constraint from './Constraint'

import * as _ from 'underscore'

export default class CubeValidator implements IValidation {

  private constraints: IConstraint[]

  constructor(config?: any[]) {
    if (config) {
      this.constraints = this.createConstraints(config)
    }
  }

  public validate(): Promise<IConstraintResultsSummary> {
    const checkPromises = this.constraints.map(constrain => constrain.check())
    return Promise.all(checkPromises)
      .then(constraintResults => {

        return this.mapResults(constraintResults)
      })
  }

  public createConstraints(config: any[]): IConstraint[] {
    return config.map(constraintConfig => {
      const resolveClass: IResolve =
        new (constraintClasses as any)[constraintConfig.constraintResolver]()
      const constraintClass: Constraint = new (constraintClasses as any)[constraintConfig.constraintClass](resolveClass)
      constraintClass.setParameter(constraintConfig.constraintParameter)
      return constraintClass
    })
  }

  public setConstraints(constraints: IConstraint[]) {
    this.constraints = constraints
  }

  public addClasses(classes: any[]) {
    classes.forEach(cls => {
      (constraintClasses as any)[new cls().constructor.name] = cls
    })
  }

  private mapResults(constraintResults: IConstraintResult[]): IConstraintResultsSummary {
    const mapped: any = _.groupBy(constraintResults, res => {
      if (res.type === ConstraintResultType.Valid) {
        return 'valid'
      } else if (res.type === ConstraintResultType.Warning) {
        return 'warning'
      } else {
        return 'error'
      }
    })
    // fill results up,
    // TODO it is better to use reduce for the whole mapping
    // but there were problems with underscore.js typings

    const result: ConstraintResultsSummary = new ConstraintResultsSummary(
      mapped.valid,
      mapped.warning,
      mapped.error
    )

    return result
  }
}
