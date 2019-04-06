# @amjs/factory

> Provides a unique registry engine for singletons

[![NPM](https://nodei.co/npm/@amjs/factory.png)](https://www.npmjs.com/package/@amjs/factory)

## Installation

```bash
$ npm i --save @amjs/factory
```

## Use

```javascript
const AmFactory = require('@amjs/factory');

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
