import IConstraint, {ConstraintResult, ConstraintResultType} from './IConstraint'
import * as fetch from 'isomorphic-fetch'

export default class SparqlConstaint implements IConstraint {

  readonly endpointUrl: string
  readonly sparqlQuery: string

  constructor(endpointUrl: string, sparqlQuery: string) {
    this.endpointUrl = endpointUrl
    this.sparqlQuery = sparqlQuery
  }

  check(): Promise<ConstraintResult> {
    return fetch(this.endpointUrl)
      .then(response => {
          // TODO process response
          return Promise.resolve(new ConstraintResult(ConstraintResultType.Valid, 'test'))
      })
  }
}
