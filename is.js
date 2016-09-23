function is(value, type) {
	if (type) {
		if (typeof type !== 'string') {
			type = typeOf(type)
		}
		if (is[type]) { // custom-types
			return is[type](value)
		}
		return isType(value, type)
	}
	return typeOf(value)
}

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
	if (validator == null) {
		throw new Error('is.register(): `validator` must be defined.')
	}

	// functional validator
	if (typeof validator === 'function') {
		return is[type] = validator
	}

	// type match
	if (typeof validator === 'string') {
		return is[type] = function (value) {
			return isType(value, validator)
		}
	}

	// regexp
	if (validator instanceof RegExp) {
		return is[type] = function (value) {
			if (typeof value !== 'string') return false
			return value.match(validator) !== null
		}
	}

	// instanceof
	return is[type] = function (value) {
		return value instanceof validator
	}
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

global.Galactic || (global.Galactic = {})
global.Galactic.is = is