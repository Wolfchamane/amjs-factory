/**
 * Unique register of constructors
 * @protected
 * @type        {Object}
 */
const $REGISTRY = {};
let $i = null;

/**
 * Factory class, provides methods for registration and creation of singletons
 * @namespace   am
 * @class       am.Factory
 */
export default class AmFactory
{
    /**
     * Returns the constructor of a registered type
     * @method  get
     * @param   {String}    name    Registration name
     * @return  {Function|undefined}    Constructor or `undefined` if is not registered.
     */
    static get(name = '')
    {
        return $REGISTRY[name];
    }

    /**
     * Returns all the registered keys within registry.
     * @method  getRegisteredKeys
     * @return  {String[]}  Registered keys
     */
    static getRegisteredKeys()
    {
        return Object.keys($REGISTRY);
    }

    /**
     * Registers an unique constructor of a class or singleton
     * @method  register
     * @param   {String}            name        Identifier of the constructor
     * @param   {Function|null}     constructor To be registered
     */
    static register(name = '', constructor = null)
    {
        if (name && typeof AmFactory.get(name) === 'undefined' && typeof constructor === 'function')
        {
            $REGISTRY[name] = constructor;
        }
    }

    /**
     * Creates an instance of the constructor or singleton registered by `name`
     * @method  create
     * @param   {String}    name    Identifier of the constructor
     * @param   {*}         value   To apply into constructor
     * @return  {Object|null}   Instanceof the constructor or `null` if was not registered
     */
    static create(name, value = null)
    {
        const Clazz = AmFactory.get(name);

        return Clazz ? new Clazz(value) : null;
    }

    /**
     * Removes any registered key except '$factory'
     * @method  clear
     */
    static clear()
    {
        Object.keys($REGISTRY).forEach(
            key =>
            {
                if (key !== '$factory')
                {
                    delete $REGISTRY[key];
                }
            }
        )
    }

    static i()
    {
        $i = $i || new AmFactory();

        return $i;
    }
}

// --- Save "$factory"
$REGISTRY['$factory'] = AmFactory;
