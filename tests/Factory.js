const AmjsFactory   = require('../src/Factory');
const assert        = require('assert');

function _buildSuite(name = '')
{
    return class MockSuite
    {
        static get name()
        {
            return name;
        }
    }
}

function testConstructor()
{
    assert.equal(typeof AmjsFactory === 'function', true, 'AmjsFactory is a constructor');
}

function testAPI()
{
    ['register', 'create', 'find', 'is'].forEach(
        method =>
        {
            assert.equal(
                typeof AmjsFactory[method] === 'function',
                true,
                `AmjsFactory static method ${method} is visible`);
        }
    );
}

function testRegister()
{
    const constructor = _buildSuite('testRegister');
    AmjsFactory.register();
    assert.equal(AmjsFactory.find() === undefined, true, 'Empty ref name do not records');
    AmjsFactory.register(constructor.name, constructor);
    assert.equal(AmjsFactory.find(constructor.name) !== undefined, true, 'Registered name is not empty');
    AmjsFactory.register(constructor.name, null);
    assert.equal(AmjsFactory.find(constructor.name) !== null, true, 'Name is unique (cannot override)');
}

function testCreate()
{
    const constructor = _buildSuite('testRegister');
    let result = AmjsFactory.create();
    assert.equal(result === undefined, true, 'By default returns "undefined"');
    result = AmjsFactory.create('foo');
    assert.equal(result === undefined, true, 'Returns "undefined" if registered key is unknown');
    AmjsFactory.register(constructor.name);
    result = AmjsFactory.create(constructor.name);
    assert.equal(AmjsFactory.is(constructor.name, result), true, 'Returns an instanceof registered key');
}

function testFind()
{
    assert.equal(AmjsFactory.find() === undefined, true, 'By default returns "undefined"');
    const constructor = _buildSuite('testFind');
    AmjsFactory.register(constructor.name, constructor);
    assert.equal(typeof AmjsFactory.find(constructor.name) === 'function', true, 'Returns class registered constructor');
}

function testIs()
{
    assert.equal(AmjsFactory.is() === false, true, 'By default, returns "false"');
}

testConstructor();
testAPI();
testRegister();
testCreate();
testFind();
testIs();
