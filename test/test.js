import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import querys from './config.js';


chai.use(chaiAsPromised);

import SparqlConstraint from '../dist/SparqlConstraint.js'
import SparqlAskResolver from '../dist/SparqlAskResolver.js'
import CubeValidator from '../dist'

it('should read query config JSON and create correct constraint and resolver type class', function() {
    assert.isNotNull(querys);
    assert.isArray(querys)

    const test = (res) => {

      assert.isArray(res)
      assert.instanceOf(res[0], SparqlConstraint)

      const r = res[0]
      const q = querys[0]

      assert.property(r, 'resolver')
      assert.instanceOf(r.resolver, SparqlAskResolver)

      assert.property(r, 'endpointUrl')
      assert.strictEqual(r.endpointUrl, q.constraintParameter.endpointUrl)

      assert.property(r, 'sparqlQuery')
      assert.strictEqual(r.sparqlQuery, q.constraintParameter.sparqlQuery)

    }

    const validator = new CubeValidator();
    const res = validator.createConstraints(querys);
    test(res)

    const validator2 = new CubeValidator(querys)
    test(validator2.constraints)

});

it("should fulfill all constraints: one valid and one error", function () {
    const validator = new CubeValidator(querys);
    return assert.isFulfilled(validator.validate().then(res => {
        assert.strictEqual(res[0].type, 0)
        assert.strictEqual(res[1].type, 2)
    }))
});
