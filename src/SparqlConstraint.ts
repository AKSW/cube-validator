import {ConstraintResult, ConstraintResultType} from './IConstraint'
import Constraint from './Constraint'

import * as fetch from 'isomorphic-fetch'

export default class SparqlConstraint extends Constraint {

  private endpointUrl: string
  private sparqlQuery: string

  check(): Promise<ConstraintResult> {
    return fetch(this.endpointUrl/*, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: this.sparqlQuery,
        format: 'text/plain'
        })
      }*/)
      .then(response => {
          return this.resolver.resolve(response)
      })
  }

  setParameter(parameters: any): void {
    this.endpointUrl = parameters.endpointUrl as string
    this.sparqlQuery = parameters.sparqlQuery as string
  }
}
