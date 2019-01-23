const assert = require('assert');
const factory = require('../../src/Factory');

const sut = factory.i();
const ref = factory.AmFactory;

class MockConstructor
{
    constructor(is = 'MockConstructor')
    {
        this.is = is;
    }
}

assert.equal(sut instanceof factory.AmFactory, true, 'Runtime instance is an instanceof "AmFactory"');
assert.equal(ref.get('$factory') !== undefined, true, '"AmFactory" is already registered as "$factory"');
assert.equal(ref.get('foo'), undefined, 'AmFactory.get() -> By default returns "undefined"');

ref.register();
assert.equal(ref.get(), undefined, 'AmFactory.register() -> Registering by default does nothing');
ref.register('MockConstructor', MockConstructor);
assert.equal(ref.get('MockConstructor') !== undefined, true, 'AmFactory.register() -> Registers a new constructor');

assert.equal(ref.create(), null, 'AmFactory.create() -> By default default returns "null"');
assert.equal(ref.create('MockConstructor') instanceof MockConstructor, true, 'AmFactory.create() -> Returns an instanceof constructor');
const result = ref.create('MockConstructor', 'foo');
assert.equal(result.is, 'foo', 'AmFactory.register() -> Applies value over constructor');
