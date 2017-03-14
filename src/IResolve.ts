import IConstraint from './IConstraint'

interface IResolve {
  resolve(response: any): Promise<boolean>
}

export default IResolve
