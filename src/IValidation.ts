import IConstraintResultsSummary from './IConstraintResultsSummary'

interface IValidation {
    validate(): Promise<IConstraintResultsSummary>
}

export default IValidation
