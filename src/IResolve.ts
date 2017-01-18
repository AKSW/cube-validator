import IConstraint, {IConstraintResult} from './IConstraint'

interface IResolve {
  resolve(response: any): IConstraintResult
}

export default IResolve
