const assert = require('assert');
const factory = require('../../src/Factory');

const sut = factory.i();

assert.equal(sut instanceof factory.AmFactory, true, 'Runtime instance is an instanceof "AmFactory"');
