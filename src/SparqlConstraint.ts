import Constraint from './Constraint'
import ConstraintResult from './ConstraintResult'
import IConstraintResult from './IConstraintResult'
import {ConstraintResultType} from './IConstraintResult'
import 'isomorphic-fetch'

export default class SparqlConstraint extends Constraint {

  private endpointUrl: string
  private sparqlQuery: string

  check(): Promise<IConstraintResult> {
    return fetch(this.endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        // Currently application/sparql-query just works with apache jena fuseki:
        // https://www.mail-archive.com/virtuoso-users@lists.sourceforge.net/msg07983.html
        Accept: 'application/sparql-results+json'
      },
      body: this.sparqlQuery
    })
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject(response.status + ': ' + response.statusText)
      }
      return this.resolver.resolve(response)
    })
    .then(satisfied => {
        let type: ConstraintResultType = ConstraintResultType.Error
        if (satisfied) {
          type = ConstraintResultType.Valid
        }

        return Promise.resolve(new ConstraintResult(type, this.name + ': ' + this.description))
    })
    .catch(err => new ConstraintResult(ConstraintResultType.Error, err))
  }

  setParameter(parameter: any): void {

    super.setParameter(parameter)

    this.endpointUrl = parameter.endpointUrl as string
    this.sparqlQuery = parameter.sparqlQuery as string
  }
}
