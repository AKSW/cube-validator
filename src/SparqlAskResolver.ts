import IResolve from './IResolve'
import {IConstraintResult} from './IConstraint'

export default class SparqlAskResolver implements IResolve {
  resolve(response: any): IConstraintResult {
    // TODO process response
    console.log(response)
    return null
  }
}
