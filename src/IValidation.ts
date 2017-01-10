import {IConstraintResult} from './IConstraint'

interface IValidation {
    validate(): Promise<IConstraintResult[]>
}

export default IValidation
