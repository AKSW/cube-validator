import IValidation from './IValidation'
import * as constraintClasses from './constraintClasses'
import IConstraint, {IConstraintResult} from './IConstraint'
import IResolve from './IResolve'
import Constraint from './Constraint'

export default class CubeValidator implements IValidation {

  private constraints: IConstraint[]

  constructor(config: any[]) {
    if (config) {
      this.constraints = this.createConstraints(config)
    }
  }

  public validate(): Promise<IConstraintResult[]> {
    const checkPromises = this.constraints.map(constrain => constrain.check())
    return Promise.all(checkPromises)
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

}
