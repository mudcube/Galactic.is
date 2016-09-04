function is(value, type) {
	if (type) {
		if (typeof type !== 'string') {
			type = typeOf(type)
		}
		if (types[type]) { // custom-types
			return types[type](value)
		}
		return isType(value, type)
	}
	return typeOf(value)
}

var types = {}

/** primitive-types **/
is.boolean = function (value) {
	return typeof value === 'boolean'
}

is.number = function (value) {
	return typeof value === 'number'
}

is.string = function (value) {
	return typeof value === 'string'
}

/** number-types **/
is.int =
is.integer = function (value) {
	return value % 1 === 0
}

is.float =
is.finite = function (value) {
	return Number.isFinite(value)
}

/** object-types **/
is.date = function (value) {
	return value && typeOf(value) === 'Date'
}

is.function = function (value) {
	return value && typeof value === 'function'
}

is.array = function (value) {
	return value && isFinite(value.length) && Array.isArray(value)
}

is.object = function (value) {
	return typeof value === 'object'
}

is.element = function (value) {
	return value && value.nodeType === 1 && typeOf(value).indexOf('Element') > -1
}

/* custom type */
is.register = function (type, validator) {
	// functional validator
	if (typeof validator === 'function') {
		types[type] = validator
		return
	}

	// type match
	if (typeof validator === 'string') {
		types[type] = (value) => isType(value, validator)
		return
	}

	// instanceof
	types[type] = (value) => value instanceof validator
}

is.register('arraylike', (value) => {
	var n = value.length
	if (typeof n === 'number' && n > -1 && n % 1 === 0) {
		var t = typeOf(value)
		return t === 'Arguments' || t === 'Array' || t === 'NodeList'
	}
	return false
})

/* determine type of argument */
function typeOf(value) {
	var type = Object.prototype.toString.call(value)
	return type.slice(type.indexOf(' ') + 1, -1)
}

/* determine whether argument is of a specific type */
function isType(value, type) {
	var validator = is[type]
	if (validator) {
		return validator(value)
	}

	/** strict-types **/
	var t = typeOf(value)
	return t === type || t.toLowerCase() === type
}

self.Galactic || (self.Galactic = {})
self.Galactic.is = is
