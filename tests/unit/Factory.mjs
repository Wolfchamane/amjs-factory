import AmFactory from '@/Factory';

/**
 * MockConstructor for tests
 * @class   MockConstructor
 */
class MockConstructor
{
    /**
     * @constructor
     * @param       {String}    is  Value of property "is"
     */
    constructor(is = 'MockConstructor')
    {
        this.is = is;
    }
}

describe('AmFactory - instanceof', () =>
    it('Is an instanceof "AmFactory"', () =>
    {
        const sut = AmFactory.i();
        expect(sut).toBeInstanceOf(AmFactory);
    }));

describe('AmFactory - methods', () =>
{
    describe('static get', () =>
    {
        it('"$factory" is already registered', () =>
            expect(AmFactory.get('$factory')).not.toBe(undefined));
        it('Returns "undefined" for any not-registered case', () =>
            expect(AmFactory.get('foo')).toBe(undefined));
    });

    describe('static register', () =>
    {
        it('By default, does nothing', () =>
        {
            AmFactory.register();
            expect(AmFactory.getRegisteredKeys()).toEqual(['$factory']);
        });
        it('Cannot override an exiting key', () =>
        {
            AmFactory.register('$factory', null);
            expect(typeof AmFactory.get('$factory')).toEqual('function');
        });
        it('Cannot registers a new invalid constructor', () =>
        {
            AmFactory.register('my-key', 'my-value');
            expect(AmFactory.getRegisteredKeys()).toEqual(['$factory']);
        });
        it('Registers a new valid constructor', () =>
        {
            AmFactory.register('MyConstructor', MockConstructor);
            expect(AmFactory.getRegisteredKeys()).toEqual(['$factory', 'MyConstructor']);
        });
    });

    describe('static create', () =>
    {
        it('By default, returns "null"', () => expect(AmFactory.create()).toBeNull());
        it('Returns an instance of constructor registered by name', () =>
        {
            const result = AmFactory.create('MyConstructor');
            expect(result instanceof MockConstructor).toBe(true);
        });
        it('Applies values to instance', () =>
        {
            const value = 'my-value';
            const result = AmFactory.create('MyConstructor', value);
            expect(result.is).toEqual(value);
        });
    });

    describe('static clear', () =>
        it('Clears all registered keys except "$factory"', () =>
        {
            AmFactory.clear();
            expect(AmFactory.getRegisteredKeys()).toEqual(['$factory']);
        }));
});
