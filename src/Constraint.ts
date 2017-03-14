import IConstraint from './IConstraint'
import IConstraintResult from './IConstraintResult'
import IResolve from './IResolve'

abstract class Constraint implements IConstraint {

  readonly resolver: IResolve
  protected name: string = ''
  protected description: string = ''

  constructor(resolver: IResolve) {
    if (!resolver) {
      throw new Error('No resolver')
    }

    this.resolver = resolver
  }

  setParameter(parameter: any): void {
    if ('name' in parameter) {
      this.name = parameter.name as string
    }

    if ('description' in parameter) {
      this.description = parameter.description as string
    }
  }

  abstract check(): Promise<IConstraintResult>
}

export default Constraint
