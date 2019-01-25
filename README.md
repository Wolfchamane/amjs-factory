# am-factory

> Provides a unique registry engine for singletons

[![NPM](https://nodei.co/npm/am-factory.png)](https://www.npmjs.com/package/am-factory)

## Installation

```bash
$ npm i --save am-factory
```

## Extending

```javascript
// ES6
import AmFactory from 'am-factory/src/Factory';

class MyClass extends AmFactory
{
    constructor(values)
    {
        super();
        
        // do something with values
    }    
}
```

## Using static methods

```javascript
// Register constructor
AmFactory.register('MyClass', MyClass);

// Get constructor
AmFactory.get('MyClass');

// Create instance
AmFactory.create('MyClass', values);
```
