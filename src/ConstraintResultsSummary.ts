import IConstraintResultsSummary from './IConstraintResultsSummary'
import IConstraintResult from './IConstraintResult'

class ConstraintResultsSummary implements IConstraintResultsSummary {
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

export default ConstraintResultsSummary
