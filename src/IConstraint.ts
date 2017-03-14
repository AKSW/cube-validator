import IConstraintResult from './IConstraintResult'

interface IConstraint {
  check(): Promise<IConstraintResult>
}

export default IConstraint
