# [Galactic.is(...)](js/is.js)

#### Simple, fast type detection. No dependancies. Vanilla JS.

***

#### Galactic.is(...) has a simple API:

*Galactic.is(variable)*

*Galactic.is(variable, expected)*

***

#### You can detect the type of a variable:
* Galactic.is([]) === 'Array'
* Galactic.is(Date.now()) === 'Date'
* Galactic.is(document.createElement('span')) === 'HTMLSpanElement'
* Galactic.is(new SomeConstructor()) === 'SomeConstructor'

***

#### Or ensure the input variable is of a specific type:
* Galactic.is(new Array, Array) // returns true
* Galactic.is(new Array, 'Array') // returns true
* Galactic.is(new Array, 'array') // returns true

***

#### Galactic.is(...) order of operations:

***

##### Check #1 — 'custom-type'

```js
	Galactic.is.register('MyConstructor', 'MyConstructor') // 'strict-type' validation
	Galactic.is.register('MyConstructor', MyConstructor) // instanceof validation
	Galactic.is.register('MyConstructor', function (arg) { // custom validation
		return doTestThatReturnsBoolean(arg);
	})
```

*There is one preset 'custom' type called 'arrayish':*

```js
	Galactic.is(new Array, 'arrayish') // returns true
	Galactic.is(new Uint16Array, 'arrayish') // returns true
	Galactic.is(document.body.childNodes, 'arrayish') // returns true
```

***

##### Check #2 — 'base-type'

```js
	/* primitive-type */
	'boolean' // matches typeof arg === 'boolean'
	'number' // matches typeof arg === 'number'
	'string' // matches typeof arg === 'string'

	/* number-type */
	'int' // matches integers excluding Infinity & NaN
	'integer' // alias to 'int'
	'finite' // matches numbers excluding Infinity & NaN
	'float' // alias to 'finite'

	/* object-type */
	'date' // matches any arg that inherits Date prototype
	'function' // matches any arg that inherits Function prototype
	'array' // matches Array.isArray(arg);
	'object' // matches typeof arg === 'object' // see 'strict-type' for specific object types
	'element' // matches any arg that inherits *Element prototype
```

***

##### Check #3 — 'strict-type'

*Matches the value of `Object.prototype.toString.call(arg)`*

*CamelCase & lowercase both work!*

*Here's some examples:*

```js
	'ArrayBuffer' // or 'arraybuffer'
	'Blob' // or 'blob'
	'HTMLBodyElement' // or 'htmlbodyelement'
	'Object' // does not have a lowercase equiv... as 'object' is a base-type!
	'RegExp' // or 'regexp'
	'Uint8Array' // or 'uint8array'
```
