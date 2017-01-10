import chai, {assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

import CubeValidator from '../dist'

const validator = new CubeValidator('http://localhost:8890/sparql');

it("should all be well", function () {
    return assert.isFulfilled(validator.validate())
});
