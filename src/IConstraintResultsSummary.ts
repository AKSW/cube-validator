import IConstraintResult from './IConstraintResult'

interface IConstraintResultsSummary {
  readonly valid: IConstraintResult[]
  readonly warning: IConstraintResult[]
  readonly error: IConstraintResult[]
}

export default IConstraintResultsSummary
