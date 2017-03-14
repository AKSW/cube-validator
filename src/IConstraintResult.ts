export enum ConstraintResultType {Valid, Warning, Error};

interface IConstraintResult {
  readonly type: ConstraintResultType
  readonly message: string
  readonly payload?: any
}

export default IConstraintResult
