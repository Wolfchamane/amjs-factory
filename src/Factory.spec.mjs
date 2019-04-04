const assert    = require('assert');
const AmFactory = require('./Factory.mjs');

// Pre-registration of factory instance
// ------------------------------------------
assert.ok(!!AmFactory.get('$factory'), 'Factory is already registered as "$factory"');

// Registration life-cycle of plain constructor
// ------------------------------------------
class MockConstructor
{}

assert.ok(AmFactory.get('MockConstructor') === undefined, 'MockConstructor is not registered previously');
AmFactory.register('MockConstructor', MockConstructor);
assert.ok(
    typeof AmFactory.get('MockConstructor') === 'function',
    'Factory.get("MockConstructor") returns constructor after refistration'
);
assert.ok(
    AmFactory.create('MockConstructor') instanceof MockConstructor,
    'Factory.create("MockConstructor") returns instanceof of constructor'
);
let current = AmFactory.getRegisteredKeys();
assert.equal(
    current.length,
    2,
    'Factory.getRegisteredKeys() returns current available registered keys'
);
AmFactory.clear();
current = AmFactory.getRegisteredKeys();
assert(current.length, 1, 'Factory.clear() removes all registered keys except $factory');

// Registration of OOP constructor
// ------------------------------------------
class OOPConstructor
{
    constructor()
    {
        this.values = null;
    }

    setProperties(values = {})
    {
        this.values = values;
    }
}

AmFactory.register('OOPConstructor', OOPConstructor);
const _mock = AmFactory.create('OOPConstructor', { bar : 'foo' });
assert.equal(_mock.values.bar, 'foo', 'Factory.create() of model with "setProperties" method is created properly');
