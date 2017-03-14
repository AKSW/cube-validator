import IConstraintResult, {ConstraintResultType} from './IConstraintResult'

class ConstraintResult implements IConstraintResult {
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

export default ConstraintResult
