import IResolve from './IResolve'
import 'isomorphic-fetch'

export default class SparqlAskResolver implements IResolve {
  resolve(response: Response): Promise<boolean> {
    return response.json()
      .then((json: any) => {
        // is satisfied when false
        return Promise.resolve(json.boolean === false)
      })
  }
}
