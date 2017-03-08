interface IConstraint {
  check(): Promise<IConstraintResult>
}

export default IConstraint

export interface IConstraintResultsSummary {
  readonly valid: IConstraintResult[]
  readonly warning: IConstraintResult[]
  readonly error: IConstraintResult[]
}

export class ConstraintResultsSummary implements IConstraintResultsSummary {
  readonly valid: IConstraintResult[] = []
  readonly warning: IConstraintResult[] = []
  readonly error: IConstraintResult[] = []

  constructor (valid?: IConstraintResult[], warning?: IConstraintResult[], error?: IConstraintResult[]) {
    if (valid) {
      this.valid = valid
    }

    if (warning) {
      this.warning = warning
    }

    if (error) {
      this.error = error
    }
  }
}

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
