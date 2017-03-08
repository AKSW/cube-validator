import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import testConstraints, {constraintNewClass} from './config.js';
chai.use(chaiAsPromised);

import SparqlConstraint from '../dist/SparqlConstraint.js'
import SparqlAskResolver from '../dist/SparqlAskResolver.js'
import CubeValidator from '../dist'

class NoResolver extends SparqlAskResolver {
  resolve(response) {
    return response.json()
      .then(json => {
        return Promise.resolve(false)
      })
  }
}

it('should read query config JSON and create correct constraint and resolver type class', function() {
    assert.isNotNull(testConstraints);
    assert.isArray(testConstraints)

    const test = (res) => {

      assert.isArray(res)
      assert.instanceOf(res[0], SparqlConstraint)

      const r = res[0]
      const q = testConstraints[0]

      assert.property(r, 'resolver')
      assert.instanceOf(r.resolver, SparqlAskResolver)

      assert.property(r, 'endpointUrl')
      assert.strictEqual(r.endpointUrl, q.constraintParameter.endpointUrl)

      assert.property(r, 'sparqlQuery')
      assert.strictEqual(r.sparqlQuery, q.constraintParameter.sparqlQuery)

    }

    const validator = new CubeValidator();
    const res = validator.createConstraints(testConstraints);
    test(res)

    const validator2 = new CubeValidator(testConstraints)
    test(validator2.constraints)

});

it("should fulfill error constraint", function () {
    const validator = new CubeValidator([testConstraints[1]]);
    return assert.isFulfilled(validator.validate().then(res => {

        // assert.property(res, 'valid');
        // assert.property(res, 'warning');
        assert.property(res, 'error');


        // assert.strictEqual(res.valid.length, 1)
        assert.strictEqual(res.error.length, 1)
        // assert.strictEqual(res.warning.length, 1)

        console.log(res);
    }))
});

it("should load resolver class during runtime", function() {
    const validator = new CubeValidator();
    validator.addClasses([NoResolver])
    const constraints = validator.createConstraints(constraintNewClass)

    assert.strictEqual(constraints[0].resolver.constructor.name, new NoResolver().constructor.name)

    validator.setConstraints(constraints)
    return assert.isFulfilled(validator.validate().then(res => {
      assert.strictEqual(res.error.length, 1)
    }))
})
