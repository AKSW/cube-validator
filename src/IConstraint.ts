interface IConstraint {
  check(): Promise<IConstraintResult>
}

export default IConstraint

export enum ConstraintResultType {Valid, Warning, Error};

export interface IConstraintResult {
  readonly type: ConstraintResultType
  readonly message: string
  readonly payload?: any
}

export class ConstraintResult implements IConstraintResult {
    readonly type: ConstraintResultType
    readonly message: string
    readonly payload?: any
    constructor(type: ConstraintResultType, message: string, payload?: any) {
      this.type = type
      this.message = message
      if (payload) {
        this.payload = payload
      }
    }
}
