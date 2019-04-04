# am-factory

> Provides a unique registry engine for singletons

[![NPM](https://nodei.co/npm/@arturomartinezdiaz/factory.png)](https://www.npmjs.com/package/@arturomartinezdiaz/factory)

## Installation

```bash
$ npm i --save @arturomartinezdiaz/factory
```

## Use

```javascript
const AmFactory = require('@arturomartinezdiaz/factory');

class MyClass
{
    constructor()
    {
        this.index = 0;
    }
    
    setProperties(values)
    {
        // do somthing with 'values'
    }  
}

// Registration
AmFactory.register('MyClass', MyClass);

// Creation
const _instance = AmFactory.create('MyClass', { index : 1 });
console.log(_instance.index); // 1
```
