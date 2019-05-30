/**
 * Class registration record
 * @type {Object}
 */
const $REGISTRY = {};

/**
 * Models factory class, allows to register, create and compare class instances.
 * @namespace   amjs
 * @class       amjs.Factory
 */
class AmjsFactory
{
    /**
     * Allows to register an unique class
     * @param   {String}    name    Class identifier name
     * @param   {Function}  value   Class constructor
     */
    static register(name = '', value = null)
    {
        if (name && !$REGISTRY[name])
        {
            $REGISTRY[name] = value;
        }
    }

    /**
     * Allows to create an pre-registered unique class
     * @param   {String}    name    Class identifier
     * @param   {*}         config  Class values to be applied
     * @returns {Object|undefined}  Class instance or undefined
     */
    static create(name = '', config)
    {
        let Clazz = AmjsFactory.find(name);
        if (Clazz instanceof Function)
        {
            Clazz = new Clazz(config);
        }

        return Clazz;
    }

    /**
     * Allows to find a class reference
     * @param   {String}    name    Class identifier
     * @returns {*}         Class constructor or undefined
     */
    static find(name = '')
    {
        return $REGISTRY[name];
    }

    /**
     * Returns if referenced class is an instance of a current value
     * @param   {String}    name    Class identifier
     * @param   {*}         value   To be compare
     * @returns {Boolean}   `true` if are instance of, `false` in any other case
     */
    static is(name = '', value = null)
    {
        const fn = AmjsFactory.find(name);
        return typeof fn === 'function'
            ? value instanceof fn
            : false;
    }
}

// Export as CommonJS module (will work on NodeJS projects & web projects through @babel transpilation)
module.exports = AmjsFactory;
