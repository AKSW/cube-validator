import IConstraint, {IConstraintResult} from './IConstraint'
import IResolve from './IResolve'

abstract class Constraint implements IConstraint {

  readonly resolver: IResolve

  constructor(resolver: IResolve) {
    if (!resolver) {
      throw new Error('No resolver')
    }

    this.resolver = resolver
  }

  abstract setParameter(parameter: any): void
  abstract check(): Promise<IConstraintResult>
}

export default Constraint
