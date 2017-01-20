import IResolve from './IResolve'

export default class SparqlAskResolver implements IResolve {
  resolve(response: IResponse): Promise<boolean> {
    return response.json()
      .then(json => {
        // is satisfied when false
        return json.boolean === false
      })
  }
}
