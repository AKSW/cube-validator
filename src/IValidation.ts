import {IConstraintResultsSummary} from './IConstraint'

interface IValidation {
    validate(): Promise<IConstraintResultsSummary>
}

export default IValidation
