
var INFINITY = 1 / 0
var isArray = Array.isArray
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
var reEscapeChar = /\\(\\)?/g
var symbolTag = '[object Symbol]'
var MAX_MEMOIZE_SIZE = 500
var symbolProto = Symbol ? Symbol.prototype : undefined,
  symbolToString = symbolProto ? symbolProto.toString : undefined

/** `Object#toString` result references. */
var nullTag = '[object Null]',
  undefinedTag = '[object Undefined]'

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function'


/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')()


/** Built-in value references. */
var Symbol = root.Symbol


/** Used for built-in method references. */
var objectProto = Object.prototype

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined


function isKeyable (value) {
  var type = typeof value
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null)
}

function getMapData (map, key) {
  var data = map.__data__
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map
}

function mapCacheSet (key, value) {
  var data = getMapData(this, key),
    size = data.size

  data.set(key, value)
  this.size += data.size == size ? 0 : 1
  return this
}

function mapCacheHas (key) {
  return getMapData(this, key).has(key)
}

function mapCacheGet (key) {
  return getMapData(this, key).get(key)
}



function mapCacheDelete (key) {
  var result = getMapData(this, key)['delete'](key)
  this.size -= result ? 1 : 0
  return result
}


function isObject (value) {
  var type = typeof value
  return value != null && (type == 'object' || type == 'function')
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  proxyTag = '[object Proxy]'


function isFunction (value) {
  if (!isObject(value)) {
    return false
  }
  var tag = baseGetTag(value)
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
}



/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__']

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '')
  return uid ? ('Symbol(src)_1.' + uid) : ''
}())

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked (func) {
  return !!maskSrcKey && (maskSrcKey in func)
}


/** Used for built-in method references. */
var funcProto = Function.prototype

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource (func) {
  if (func != null) {
    try {
      return funcToString.call(func)
    } catch (e) { }
    try {
      return (func + '')
    } catch (e) { }
  }
  return ''
}



/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/

/** Used for built-in method references. */
var funcProto = Function.prototype,
  objectProto = Object.prototype

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
)


function baseIsNative (value) {
  if (!isObject(value) || isMasked(value)) {
    return false
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor
  return pattern.test(toSource(value))
}



function getValue (object, key) {
  return object == null ? undefined : object[key]
}



function getNative (object, key) {
  var value = getValue(object, key)
  return baseIsNative(value) ? value : undefined
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create')


function hashClear () {
  this.__data__ = nativeCreate ? nativeCreate(null) : {}
  this.size = 0
}


function hashDelete (key) {
  var result = this.has(key) && delete this.__data__[key]
  this.size -= result ? 1 : 0
  return result
}


/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__'

/** Used for built-in method references. */
var objectProto = Object.prototype

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet (key) {
  var data = this.__data__
  if (nativeCreate) {
    var result = data[key]
    return result === HASH_UNDEFINED ? undefined : result
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined
}


/** Used for built-in method references. */
var objectProto = Object.prototype

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas (key) {
  var data = this.__data__
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key)
}


/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__'

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet (key, value) {
  var data = this.__data__
  this.size += this.has(key) ? 0 : 1
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value
  return this
}


function Hash (entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length

  this.clear()
  while (++index < length) {
    var entry = entries[index]
    this.set(entry[0], entry[1])
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear
Hash.prototype['delete'] = hashDelete
Hash.prototype.get = hashGet
Hash.prototype.has = hashHas
Hash.prototype.set = hashSet


function listCacheClear () {
  this.__data__ = []
  this.size = 0
}

function eq (value, other) {
  return value === other || (value !== value && other !== other)
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf (array, key) {
  var length = array.length
  while (length--) {
    if (eq(array[length][0], key)) {
      return length
    }
  }
  return -1
}


/** Used for built-in method references. */
var arrayProto = Array.prototype

/** Built-in value references. */
var splice = arrayProto.splice

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete (key) {
  var data = this.__data__,
    index = assocIndexOf(data, key)

  if (index < 0) {
    return false
  }
  var lastIndex = data.length - 1
  if (index == lastIndex) {
    data.pop()
  } else {
    splice.call(data, index, 1)
  }
  --this.size
  return true
}


/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet (key) {
  var data = this.__data__,
    index = assocIndexOf(data, key)

  return index < 0 ? undefined : data[index][1]
}


function listCacheHas (key) {
  return assocIndexOf(this.__data__, key) > -1
}

function listCacheSet (key, value) {
  var data = this.__data__,
    index = assocIndexOf(data, key)

  if (index < 0) {
    ++this.size
    data.push([key, value])
  } else {
    data[index][1] = value
  }
  return this
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache (entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length

  this.clear()
  while (++index < length) {
    var entry = entries[index]
    this.set(entry[0], entry[1])
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear
ListCache.prototype['delete'] = listCacheDelete
ListCache.prototype.get = listCacheGet
ListCache.prototype.has = listCacheHas
ListCache.prototype.set = listCacheSet


/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map')



function mapCacheClear () {
  this.size = 0
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  }
}




function MapCache (entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length

  this.clear()
  while (++index < length) {
    var entry = entries[index]
    this.set(entry[0], entry[1])
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear
MapCache.prototype['delete'] = mapCacheDelete
MapCache.prototype.get = mapCacheGet
MapCache.prototype.has = mapCacheHas
MapCache.prototype.set = mapCacheSet


/** Used for built-in method references. */
var objectProto = Object.prototype

var nativeObjectToString = objectProto.toString

function objectToString (value) {
  return nativeObjectToString.call(value)
}


function getRawTag (value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag]

  try {
    value[symToStringTag] = undefined
    var unmasked = true
  } catch (e) { }

  var result = nativeObjectToString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}


function arrayMap (array, iteratee) {
  var index = -1,
    length = array == null ? 0 : array.length,
    result = Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}


function memoize (func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  var memoized = function () {
    var args = arguments,
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache

    if (cache.has(key)) {
      return cache.get(key)
    }
    var result = func.apply(this, args)
    memoized.cache = cache.set(key, result) || cache
    return result
  }
  memoized.cache = new (memoize.Cache || MapCache)
  return memoized
}

// Expose `MapCache`.
memoize.Cache = MapCache


function isObjectLike (value) {
  return value != null && typeof value == 'object'
}

function baseGetTag (value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value)
}


function baseToString (value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + ''
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  var result = (value + '')
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}



function memoizeCapped (func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear()
    }
    return key
  })

  var cache = result.cache
  return result
}

function isSymbol (value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag)
}

function toString (value) {
  return value == null ? '' : baseToString(value)
}

var stringToPath = memoizeCapped(function (string) {
  var result = []
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('')
  }
  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match))
  })
  return result
})



function isKey (value, object) {
  if (isArray(value)) {
    return false
  }
  var type = typeof value
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
    value == null || isSymbol(value)) {
    return true
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
}

function toKey (value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value
  }
  var result = (value + '')
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}


function castPath (value, object) {
  if (isArray(value)) {
    return value
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value))
}

function baseGet (object, path) {
  path = castPath(path, object)

  var index = 0,
    length = path.length

  while (object != null && index < length) {
    object = object[toKey(path[index++])]
  }
  return (index && index == length) ? object : undefined
}



var defineProperty = (function () {
  try {
    var func = getNative(Object, 'defineProperty')
    func({}, '', {})
    return func
  } catch (e) { }
}())


/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue (object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    object[key] = value
  }
}



/** Used for built-in method references. */
var objectProto = Object.prototype

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue (object, key, value) {
  var objValue = object[key]
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
    (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value)
  }
}


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex (value, length) {
  var type = typeof value
  length = length == null ? MAX_SAFE_INTEGER : length

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
    (value > -1 && value % 1 == 0 && value < length)
}


/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet (object, path, value, customizer) {
  if (!isObject(object)) {
    return object
  }
  path = castPath(path, object)

  var index = -1,
    length = path.length,
    lastIndex = length - 1,
    nested = object

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
      newValue = value

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object
    }

    if (index != lastIndex) {
      var objValue = nested[key]
      newValue = customizer ? customizer(objValue, key, nested) : undefined
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {})
      }
    }
    assignValue(nested, key, newValue)
    nested = nested[key]
  }
  return object
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @see has, hasIn, set, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * get(object, 'a[0].b.c')
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c'])
 * // => 3
 *
 * get(object, 'a.b.c', 'default')
 * // => 'default'
 */
function get (object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}


/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @see has, hasIn, get, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 */
function set (object, path, value) {
  return object == null ? object : baseSet(object, path, value)
}


export  const useGet = get
export  const useSet = set