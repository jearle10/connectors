(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.lambda = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})

},{"../../is-buffer/index.js":3}],2:[function(require,module,exports){
module.exports = require('util').inherits

},{"util":undefined}],3:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],4:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],5:[function(require,module,exports){
//! moment.js
//! version : 2.12.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return Object.keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this > +localInput;
        } else {
            return +localInput < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this < +localInput;
        } else {
            return +this.clone().endOf(units) < +localInput;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return +this === +localInput;
        } else {
            inputMs = +localInput;
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = local__createLocal([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.12.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],6:[function(require,module,exports){
var Classes = Object.create(null);

/**
 * Create a new Connection instance.
 * @param {object|string} config Configuration or connection string for new MySQL connection
 * @return {Connection} A new MySQL connection
 * @public
 */
exports.createConnection = function createConnection(config) {
  var Connection       = loadClass('Connection');
  var ConnectionConfig = loadClass('ConnectionConfig');

  return new Connection({config: new ConnectionConfig(config)});
};

/**
 * Create a new Pool instance.
 * @param {object|string} config Configuration or connection string for new MySQL connections
 * @return {Pool} A new MySQL pool
 * @public
 */
exports.createPool = function createPool(config) {
  var Pool       = loadClass('Pool');
  var PoolConfig = loadClass('PoolConfig');

  return new Pool({config: new PoolConfig(config)});
};

/**
 * Create a new PoolCluster instance.
 * @param {object} [config] Configuration for pool cluster
 * @return {PoolCluster} New MySQL pool cluster
 * @public
 */
exports.createPoolCluster = function createPoolCluster(config) {
  var PoolCluster = loadClass('PoolCluster');

  return new PoolCluster(config);
};

/**
 * Create a new Query instance.
 * @param {string} sql The SQL for the query
 * @param {array} [values] Any values to insert into placeholders in sql
 * @param {function} [callback] The callback to use when query is complete
 * @return {Query} New query object
 * @public
 */
exports.createQuery = function createQuery(sql, values, callback) {
  var Connection = loadClass('Connection');

  return Connection.createQuery(sql, values, callback);
};

/**
 * Escape a value for SQL.
 * @param {*} value The value to escape
 * @param {boolean} [stringifyObjects=false] Setting if objects should be stringified
 * @param {string} [timeZone=local] Setting for time zone to use for Date conversion
 * @return {string} Escaped string value
 * @public
 */
exports.escape = function escape(value, stringifyObjects, timeZone) {
  var SqlString = loadClass('SqlString');

  return SqlString.escape(value, stringifyObjects, timeZone);
};

/**
 * Escape an identifier for SQL.
 * @param {*} value The value to escape
 * @param {boolean} [forbidQualified=false] Setting to treat '.' as part of identifier
 * @return {string} Escaped string value
 * @public
 */
exports.escapeId = function escapeId(value, forbidQualified) {
  var SqlString = loadClass('SqlString');

  return SqlString.escapeId(value, forbidQualified);
};

/**
 * Format SQL and replacement values into a SQL string.
 * @param {string} sql The SQL for the query
 * @param {array} [values] Any values to insert into placeholders in sql
 * @param {boolean} [stringifyObjects=false] Setting if objects should be stringified
 * @param {string} [timeZone=local] Setting for time zone to use for Date conversion
 * @return {string} Formatted SQL string
 * @public
 */
exports.format = function format(sql, values, stringifyObjects, timeZone) {
  var SqlString = loadClass('SqlString');

  return SqlString.format(sql, values, stringifyObjects, timeZone);
};

/**
 * The type constants.
 * @public
 */
Object.defineProperty(exports, 'Types', {
  get: loadClass.bind(null, 'Types')
});

/**
 * Load the given class.
 * @param {string} className Name of class to default
 * @return {function|object} Class constructor or exports
 * @private
 */
function loadClass(className) {
  var Class = Classes[className];

  if (Class !== undefined) {
    return Class;
  }

  // This uses a switch for static require analysis
  switch (className) {
    case 'Connection':
      Class = require('./lib/Connection');
      break;
    case 'ConnectionConfig':
      Class = require('./lib/ConnectionConfig');
      break;
    case 'Pool':
      Class = require('./lib/Pool');
      break;
    case 'PoolCluster':
      Class = require('./lib/PoolCluster');
      break;
    case 'PoolConfig':
      Class = require('./lib/PoolConfig');
      break;
    case 'SqlString':
      Class = require('./lib/protocol/SqlString');
      break;
    case 'Types':
      Class = require('./lib/protocol/constants/types');
      break;
    default:
      throw new Error('Cannot find class \'' + className + '\'');
  }

  // Store to prevent invoking require()
  Classes[className] = Class;

  return Class;
}

},{"./lib/Connection":7,"./lib/ConnectionConfig":8,"./lib/Pool":9,"./lib/PoolCluster":10,"./lib/PoolConfig":11,"./lib/protocol/SqlString":22,"./lib/protocol/constants/types":28}],7:[function(require,module,exports){
var Crypto           = require('crypto');
var Events           = require('events');
var Net              = require('net');
var tls              = require('tls');
var ConnectionConfig = require('./ConnectionConfig');
var Protocol         = require('./protocol/Protocol');
var SqlString        = require('./protocol/SqlString');
var Query            = require('./protocol/sequences/Query');
var Util             = require('util');

module.exports = Connection;
Util.inherits(Connection, Events.EventEmitter);
function Connection(options) {
  Events.EventEmitter.call(this);

  this.config = options.config;

  this._socket        = options.socket;
  this._protocol      = new Protocol({config: this.config, connection: this});
  this._connectCalled = false;
  this.state          = 'disconnected';
  this.threadId       = null;
}

function bindToCurrentDomain(callback) {
  if (!callback) {
    return undefined;
  }

  var domain = process.domain;

  return domain
    ? domain.bind(callback)
    : callback;
}

Connection.createQuery = function createQuery(sql, values, callback) {
  if (sql instanceof Query) {
    return sql;
  }

  var cb      = bindToCurrentDomain(callback);
  var options = {};

  if (typeof sql === 'function') {
    cb = bindToCurrentDomain(sql);
    return new Query(options, cb);
  }

  if (typeof sql === 'object') {
    for (var prop in sql) {
      options[prop] = sql[prop];
    }

    if (typeof values === 'function') {
      cb = bindToCurrentDomain(values);
    } else if (values !== undefined) {
      options.values = values;
    }

    return new Query(options, cb);
  }

  options.sql    = sql;
  options.values = values;

  if (typeof values === 'function') {
    cb = bindToCurrentDomain(values);
    options.values = undefined;
  }

  if (cb === undefined && callback !== undefined) {
    throw new TypeError('argument callback must be a function when provided');
  }

  return new Query(options, cb);
};

Connection.prototype.connect = function connect(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (!this._connectCalled) {
    this._connectCalled = true;

    // Connect either via a UNIX domain socket or a TCP socket.
    this._socket = (this.config.socketPath)
      ? Net.createConnection(this.config.socketPath)
      : Net.createConnection(this.config.port, this.config.host);

    // Connect socket to connection domain
    if (Events.usingDomains) {
      this._socket.domain = this.domain;
    }

    var connection = this;
    this._protocol.on('data', function(data) {
      connection._socket.write(data);
    });
    this._socket.on('data', function(data) {
      connection._protocol.write(data);
    });
    this._protocol.on('end', function() {
      connection._socket.end();
    });
    this._socket.on('end', function() {
      connection._protocol.end();
    });

    this._socket.on('error', this._handleNetworkError.bind(this));
    this._socket.on('connect', this._handleProtocolConnect.bind(this));
    this._protocol.on('handshake', this._handleProtocolHandshake.bind(this));
    this._protocol.on('unhandledError', this._handleProtocolError.bind(this));
    this._protocol.on('drain', this._handleProtocolDrain.bind(this));
    this._protocol.on('end', this._handleProtocolEnd.bind(this));
    this._protocol.on('enqueue', this._handleProtocolEnqueue.bind(this));

    if (this.config.connectTimeout) {
      var handleConnectTimeout = this._handleConnectTimeout.bind(this);

      this._socket.setTimeout(this.config.connectTimeout, handleConnectTimeout);
      this._socket.once('connect', function() {
        this.setTimeout(0, handleConnectTimeout);
      });
    }
  }

  this._protocol.handshake(options, bindToCurrentDomain(callback));
};

Connection.prototype.changeUser = function changeUser(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  this._implyConnect();

  var charsetNumber = (options.charset)
    ? ConnectionConfig.getCharsetNumber(options.charset)
    : this.config.charsetNumber;

  return this._protocol.changeUser({
    user          : options.user || this.config.user,
    password      : options.password || this.config.password,
    database      : options.database || this.config.database,
    timeout       : options.timeout,
    charsetNumber : charsetNumber,
    currentConfig : this.config
  }, bindToCurrentDomain(callback));
};

Connection.prototype.beginTransaction = function beginTransaction(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};
  options.sql = 'START TRANSACTION';
  options.values = null;

  return this.query(options, callback);
};

Connection.prototype.commit = function commit(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};
  options.sql = 'COMMIT';
  options.values = null;

  return this.query(options, callback);
};

Connection.prototype.rollback = function rollback(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};
  options.sql = 'ROLLBACK';
  options.values = null;

  return this.query(options, callback);
};

Connection.prototype.query = function query(sql, values, cb) {
  var query = Connection.createQuery(sql, values, cb);
  query._connection = this;

  if (!(typeof sql === 'object' && 'typeCast' in sql)) {
    query.typeCast = this.config.typeCast;
  }

  if (query.sql) {
    query.sql = this.format(query.sql, query.values);
  }

  this._implyConnect();

  return this._protocol._enqueue(query);
};

Connection.prototype.ping = function ping(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  this._implyConnect();
  this._protocol.ping(options, bindToCurrentDomain(callback));
};

Connection.prototype.statistics = function statistics(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  this._implyConnect();
  this._protocol.stats(options, bindToCurrentDomain(callback));
};

Connection.prototype.end = function end(options, callback) {
  var cb   = callback;
  var opts = options;

  if (!callback && typeof options === 'function') {
    cb   = options;
    opts = null;
  }

  // create custom options reference
  opts = Object.create(opts || null);

  if (opts.timeout === undefined) {
    // default timeout of 30 seconds
    opts.timeout = 30000;
  }

  this._implyConnect();
  this._protocol.quit(opts, bindToCurrentDomain(cb));
};

Connection.prototype.destroy = function() {
  this.state = 'disconnected';
  this._implyConnect();
  this._socket.destroy();
  this._protocol.destroy();
};

Connection.prototype.pause = function() {
  this._socket.pause();
  this._protocol.pause();
};

Connection.prototype.resume = function() {
  this._socket.resume();
  this._protocol.resume();
};

Connection.prototype.escape = function(value) {
  return SqlString.escape(value, false, this.config.timezone);
};

Connection.prototype.escapeId = function escapeId(value) {
  return SqlString.escapeId(value, false);
};

Connection.prototype.format = function(sql, values) {
  if (typeof this.config.queryFormat === 'function') {
    return this.config.queryFormat.call(this, sql, values, this.config.timezone);
  }
  return SqlString.format(sql, values, this.config.stringifyObjects, this.config.timezone);
};

if (tls.TLSSocket) {
  // 0.11+ environment
  Connection.prototype._startTLS = function _startTLS(onSecure) {
    var connection    = this;
    var secureContext = tls.createSecureContext({
      ca         : this.config.ssl.ca,
      cert       : this.config.ssl.cert,
      ciphers    : this.config.ssl.ciphers,
      key        : this.config.ssl.key,
      passphrase : this.config.ssl.passphrase
    });

    // "unpipe"
    this._socket.removeAllListeners('data');
    this._protocol.removeAllListeners('data');

    // socket <-> encrypted
    var rejectUnauthorized = this.config.ssl.rejectUnauthorized;
    var secureEstablished  = false;
    var secureSocket       = new tls.TLSSocket(this._socket, {
      rejectUnauthorized : rejectUnauthorized,
      requestCert        : true,
      secureContext      : secureContext,
      isServer           : false
    });

    // error handler for secure socket
    secureSocket.on('_tlsError', function(err) {
      if (secureEstablished) {
        connection._handleNetworkError(err);
      } else {
        onSecure(err);
      }
    });

    // cleartext <-> protocol
    secureSocket.pipe(this._protocol);
    this._protocol.on('data', function(data) {
      secureSocket.write(data);
    });

    secureSocket.on('secure', function() {
      secureEstablished = true;

      onSecure(rejectUnauthorized ? this.ssl.verifyError() : null);
    });

    // start TLS communications
    secureSocket._start();
  };
} else {
  // pre-0.11 environment
  Connection.prototype._startTLS = function _startTLS(onSecure) {
    // before TLS:
    //  _socket <-> _protocol
    // after:
    //  _socket <-> securePair.encrypted <-> securePair.cleartext <-> _protocol

    var connection  = this;
    var credentials = Crypto.createCredentials({
      ca         : this.config.ssl.ca,
      cert       : this.config.ssl.cert,
      ciphers    : this.config.ssl.ciphers,
      key        : this.config.ssl.key,
      passphrase : this.config.ssl.passphrase
    });

    var rejectUnauthorized = this.config.ssl.rejectUnauthorized;
    var secureEstablished  = false;
    var securePair         = tls.createSecurePair(credentials, false, true, rejectUnauthorized);

    // error handler for secure pair
    securePair.on('error', function(err) {
      if (secureEstablished) {
        connection._handleNetworkError(err);
      } else {
        onSecure(err);
      }
    });

    // "unpipe"
    this._socket.removeAllListeners('data');
    this._protocol.removeAllListeners('data');

    // socket <-> encrypted
    securePair.encrypted.pipe(this._socket);
    this._socket.on('data', function(data) {
      securePair.encrypted.write(data);
    });

    // cleartext <-> protocol
    securePair.cleartext.pipe(this._protocol);
    this._protocol.on('data', function(data) {
      securePair.cleartext.write(data);
    });

    // secure established
    securePair.on('secure', function() {
      secureEstablished = true;

      if (!rejectUnauthorized) {
        onSecure();
        return;
      }

      var verifyError = this.ssl.verifyError();
      var err = verifyError;

      // node.js 0.6 support
      if (typeof err === 'string') {
        err = new Error(verifyError);
        err.code = verifyError;
      }

      onSecure(err);
    });

    // node.js 0.8 bug
    securePair._cycle = securePair.cycle;
    securePair.cycle  = function cycle() {
      if (this.ssl && this.ssl.error) {
        this.error();
      }

      return this._cycle.apply(this, arguments);
    };
  };
}

Connection.prototype._handleConnectTimeout = function() {
  if (this._socket) {
    this._socket.setTimeout(0);
    this._socket.destroy();
  }

  var err = new Error('connect ETIMEDOUT');
  err.errorno = 'ETIMEDOUT';
  err.code = 'ETIMEDOUT';
  err.syscall = 'connect';

  this._handleNetworkError(err);
};

Connection.prototype._handleNetworkError = function(err) {
  this._protocol.handleNetworkError(err);
};

Connection.prototype._handleProtocolError = function(err) {
  this.state = 'protocol_error';
  this.emit('error', err);
};

Connection.prototype._handleProtocolDrain = function() {
  this.emit('drain');
};

Connection.prototype._handleProtocolConnect = function() {
  this.state = 'connected';
  this.emit('connect');
};

Connection.prototype._handleProtocolHandshake = function _handleProtocolHandshake(packet) {
  this.state    = 'authenticated';
  this.threadId = packet.threadId;
};

Connection.prototype._handleProtocolEnd = function(err) {
  this.state = 'disconnected';
  this.emit('end', err);
};

Connection.prototype._handleProtocolEnqueue = function _handleProtocolEnqueue(sequence) {
  this.emit('enqueue', sequence);
};

Connection.prototype._implyConnect = function() {
  if (!this._connectCalled) {
    this.connect();
  }
};

},{"./ConnectionConfig":8,"./protocol/Protocol":20,"./protocol/SqlString":22,"./protocol/sequences/Query":53,"crypto":undefined,"events":undefined,"net":undefined,"tls":undefined,"util":undefined}],8:[function(require,module,exports){
var urlParse        = require('url').parse;
var ClientConstants = require('./protocol/constants/client');
var Charsets        = require('./protocol/constants/charsets');
var SSLProfiles     = null;

module.exports = ConnectionConfig;
function ConnectionConfig(options) {
  if (typeof options === 'string') {
    options = ConnectionConfig.parseUrl(options);
  }

  this.host               = options.host || 'localhost';
  this.port               = options.port || 3306;
  this.localAddress       = options.localAddress;
  this.socketPath         = options.socketPath;
  this.user               = options.user || undefined;
  this.password           = options.password || undefined;
  this.database           = options.database;
  this.connectTimeout     = (options.connectTimeout === undefined)
    ? (10 * 1000)
    : options.connectTimeout;
  this.insecureAuth       = options.insecureAuth || false;
  this.supportBigNumbers  = options.supportBigNumbers || false;
  this.bigNumberStrings   = options.bigNumberStrings || false;
  this.dateStrings        = options.dateStrings || false;
  this.debug              = options.debug;
  this.trace              = options.trace !== false;
  this.stringifyObjects   = options.stringifyObjects || false;
  this.timezone           = options.timezone || 'local';
  this.flags              = options.flags || '';
  this.queryFormat        = options.queryFormat;
  this.pool               = options.pool || undefined;
  this.ssl                = (typeof options.ssl === 'string')
    ? ConnectionConfig.getSSLProfile(options.ssl)
    : (options.ssl || false);
  this.multipleStatements = options.multipleStatements || false;
  this.typeCast           = (options.typeCast === undefined)
    ? true
    : options.typeCast;

  if (this.timezone[0] === ' ') {
    // "+" is a url encoded char for space so it
    // gets translated to space when giving a
    // connection string..
    this.timezone = '+' + this.timezone.substr(1);
  }

  if (this.ssl) {
    // Default rejectUnauthorized to true
    this.ssl.rejectUnauthorized = this.ssl.rejectUnauthorized !== false;
  }

  this.maxPacketSize = 0;
  this.charsetNumber = (options.charset)
    ? ConnectionConfig.getCharsetNumber(options.charset)
    : options.charsetNumber || Charsets.UTF8_GENERAL_CI;

  // Set the client flags
  var defaultFlags = ConnectionConfig.getDefaultFlags(options);
  this.clientFlags = ConnectionConfig.mergeFlags(defaultFlags, options.flags);
}

ConnectionConfig.mergeFlags = function mergeFlags(defaultFlags, userFlags) {
  var allFlags = ConnectionConfig.parseFlagList(defaultFlags);
  var newFlags = ConnectionConfig.parseFlagList(userFlags);

  // Merge the new flags
  for (var flag in newFlags) {
    if (allFlags[flag] !== false) {
      allFlags[flag] = newFlags[flag];
    }
  }

  // Build flags
  var flags = 0x0;
  for (var flag in allFlags) {
    if (allFlags[flag]) {
      // TODO: Throw here on some future release
      flags |= ClientConstants['CLIENT_' + flag] || 0x0;
    }
  }

  return flags;
};

ConnectionConfig.getCharsetNumber = function getCharsetNumber(charset) {
  var num = Charsets[charset.toUpperCase()];

  if (num === undefined) {
    throw new TypeError('Unknown charset \'' + charset + '\'');
  }

  return num;
};

ConnectionConfig.getDefaultFlags = function getDefaultFlags(options) {
  var defaultFlags = [
    '-COMPRESS',          // Compression protocol *NOT* supported
    '-CONNECT_ATTRS',     // Does *NOT* send connection attributes in Protocol::HandshakeResponse41
    '+CONNECT_WITH_DB',   // One can specify db on connect in Handshake Response Packet
    '+FOUND_ROWS',        // Send found rows instead of affected rows
    '+IGNORE_SIGPIPE',    // Don't issue SIGPIPE if network failures
    '+IGNORE_SPACE',      // Let the parser ignore spaces before '('
    '+LOCAL_FILES',       // Can use LOAD DATA LOCAL
    '+LONG_FLAG',         // Longer flags in Protocol::ColumnDefinition320
    '+LONG_PASSWORD',     // Use the improved version of Old Password Authentication
    '+MULTI_RESULTS',     // Can handle multiple resultsets for COM_QUERY
    '+ODBC',              // Special handling of ODBC behaviour
    '-PLUGIN_AUTH',       // Does *NOT* support auth plugins
    '+PROTOCOL_41',       // Uses the 4.1 protocol
    '+PS_MULTI_RESULTS',  // Can handle multiple resultsets for COM_STMT_EXECUTE
    '+RESERVED',          // Unused
    '+SECURE_CONNECTION', // Supports Authentication::Native41
    '+TRANSACTIONS'       // Expects status flags
  ];

  if (options && options.multipleStatements) {
    // May send multiple statements per COM_QUERY and COM_STMT_PREPARE
    defaultFlags.push('+MULTI_STATEMENTS');
  }

  return defaultFlags;
};

ConnectionConfig.getSSLProfile = function getSSLProfile(name) {
  if (!SSLProfiles) {
    SSLProfiles = require('./protocol/constants/ssl_profiles');
  }

  var ssl = SSLProfiles[name];

  if (ssl === undefined) {
    throw new TypeError('Unknown SSL profile \'' + name + '\'');
  }

  return ssl;
};

ConnectionConfig.parseFlagList = function parseFlagList(flagList) {
  var allFlags = Object.create(null);

  if (!flagList) {
    return allFlags;
  }

  var flags = !Array.isArray(flagList)
    ? String(flagList || '').toUpperCase().split(/\s*,+\s*/)
    : flagList;

  for (var i = 0; i < flags.length; i++) {
    var flag   = flags[i];
    var offset = 1;
    var state  = flag[0];

    if (state === undefined) {
      // TODO: throw here on some future release
      continue;
    }

    if (state !== '-' && state !== '+') {
      offset = 0;
      state  = '+';
    }

    allFlags[flag.substr(offset)] = state === '+';
  }

  return allFlags;
};

ConnectionConfig.parseUrl = function(url) {
  url = urlParse(url, true);

  var options = {
    host     : url.hostname,
    port     : url.port,
    database : url.pathname.substr(1)
  };

  if (url.auth) {
    var auth = url.auth.split(':');
    options.user     = auth.shift();
    options.password = auth.join(':');
  }

  if (url.query) {
    for (var key in url.query) {
      var value = url.query[key];

      try {
        // Try to parse this as a JSON expression first
        options[key] = JSON.parse(value);
      } catch (err) {
        // Otherwise assume it is a plain string
        options[key] = value;
      }
    }
  }

  return options;
};

},{"./protocol/constants/charsets":23,"./protocol/constants/client":24,"./protocol/constants/ssl_profiles":27,"url":undefined}],9:[function(require,module,exports){
var mysql          = require('../');
var Connection     = require('./Connection');
var EventEmitter   = require('events').EventEmitter;
var Util           = require('util');
var PoolConnection = require('./PoolConnection');

module.exports = Pool;

Util.inherits(Pool, EventEmitter);
function Pool(options) {
  EventEmitter.call(this);
  this.config = options.config;
  this.config.connectionConfig.pool = this;

  this._acquiringConnections = [];
  this._allConnections       = [];
  this._freeConnections      = [];
  this._connectionQueue      = [];
  this._closed               = false;
}

Pool.prototype.getConnection = function (cb) {

  if (this._closed) {
    var err = new Error('Pool is closed.');
    err.code = 'POOL_CLOSED';
    process.nextTick(function () {
      cb(err);
    });
    return;
  }

  var connection;
  var pool = this;

  if (this._freeConnections.length > 0) {
    connection = this._freeConnections.shift();
    this.acquireConnection(connection, cb);
    return;
  }

  if (this.config.connectionLimit === 0 || this._allConnections.length < this.config.connectionLimit) {
    connection = new PoolConnection(this, { config: this.config.newConnectionConfig() });

    this._acquiringConnections.push(connection);
    this._allConnections.push(connection);

    connection.connect({timeout: this.config.acquireTimeout}, function onConnect(err) {
      spliceConnection(pool._acquiringConnections, connection);

      if (pool._closed) {
        err = new Error('Pool is closed.');
        err.code = 'POOL_CLOSED';
      }

      if (err) {
        pool._purgeConnection(connection);
        cb(err);
        return;
      }

      pool.emit('connection', connection);
      pool.emit('acquire', connection);
      cb(null, connection);
    });
    return;
  }

  if (!this.config.waitForConnections) {
    process.nextTick(function(){
      var err = new Error('No connections available.');
      err.code = 'POOL_CONNLIMIT';
      cb(err);
    });
    return;
  }

  this._enqueueCallback(cb);
};

Pool.prototype.acquireConnection = function acquireConnection(connection, cb) {
  if (connection._pool !== this) {
    throw new Error('Connection acquired from wrong pool.');
  }

  var changeUser = this._needsChangeUser(connection);
  var pool       = this;

  this._acquiringConnections.push(connection);

  function onOperationComplete(err) {
    spliceConnection(pool._acquiringConnections, connection);

    if (pool._closed) {
      err = new Error('Pool is closed.');
      err.code = 'POOL_CLOSED';
    }

    if (err) {
      pool._connectionQueue.unshift(cb);
      pool._purgeConnection(connection);
      return;
    }

    if (changeUser) {
      pool.emit('connection', connection);
    }

    pool.emit('acquire', connection);
    cb(null, connection);
  }

  if (changeUser) {
    // restore user back to pool configuration
    connection.config = this.config.newConnectionConfig();
    connection.changeUser({timeout: this.config.acquireTimeout}, onOperationComplete);
  } else {
    // ping connection
    connection.ping({timeout: this.config.acquireTimeout}, onOperationComplete);
  }
};

Pool.prototype.releaseConnection = function releaseConnection(connection) {

  if (this._acquiringConnections.indexOf(connection) !== -1) {
    // connection is being acquired
    return;
  }

  if (connection._pool) {
    if (connection._pool !== this) {
      throw new Error('Connection released to wrong pool');
    }

    if (this._freeConnections.indexOf(connection) !== -1) {
      // connection already in free connection pool
      // this won't catch all double-release cases
      throw new Error('Connection already released');
    } else {
      // add connection to end of free queue
      this._freeConnections.push(connection);
      this.emit('release', connection);
    }
  }

  if (this._closed) {
    // empty the connection queue
    this._connectionQueue.splice(0).forEach(function (cb) {
      var err = new Error('Pool is closed.');
      err.code = 'POOL_CLOSED';
      process.nextTick(function () {
        cb(err);
      });
    });
  } else if (this._connectionQueue.length) {
    // get connection with next waiting callback
    this.getConnection(this._connectionQueue.shift());
  }
};

Pool.prototype.end = function (cb) {
  this._closed = true;

  if (typeof cb !== 'function') {
    cb = function (err) {
      if (err) throw err;
    };
  }

  var calledBack   = false;
  var waitingClose = 0;

  function onEnd(err) {
    if (!calledBack && (err || --waitingClose <= 0)) {
      calledBack = true;
      cb(err);
    }
  }

  while (this._allConnections.length !== 0) {
    waitingClose++;
    this._purgeConnection(this._allConnections[0], onEnd);
  }

  if (waitingClose === 0) {
    process.nextTick(onEnd);
  }
};

Pool.prototype.query = function (sql, values, cb) {
  var query = Connection.createQuery(sql, values, cb);

  if (!(typeof sql === 'object' && 'typeCast' in sql)) {
    query.typeCast = this.config.connectionConfig.typeCast;
  }

  if (this.config.connectionConfig.trace) {
    // Long stack trace support
    query._callSite = new Error();
  }

  this.getConnection(function (err, conn) {
    if (err) {
      query.on('error', function () {});
      query.end(err);
      return;
    }

    // Release connection based off event
    query.once('end', function() {
      conn.release();
    });

    conn.query(query);
  });

  return query;
};

Pool.prototype._enqueueCallback = function _enqueueCallback(callback) {

  if (this.config.queueLimit && this._connectionQueue.length >= this.config.queueLimit) {
    process.nextTick(function () {
      var err = new Error('Queue limit reached.');
      err.code = 'POOL_ENQUEUELIMIT';
      callback(err);
    });
    return;
  }

  // Bind to domain, as dequeue will likely occur in a different domain
  var cb = process.domain
    ? process.domain.bind(callback)
    : callback;

  this._connectionQueue.push(cb);
  this.emit('enqueue');
};

Pool.prototype._needsChangeUser = function _needsChangeUser(connection) {
  var connConfig = connection.config;
  var poolConfig = this.config.connectionConfig;

  // check if changeUser values are different
  return connConfig.user !== poolConfig.user
    || connConfig.database !== poolConfig.database
    || connConfig.password !== poolConfig.password
    || connConfig.charsetNumber !== poolConfig.charsetNumber;
};

Pool.prototype._purgeConnection = function _purgeConnection(connection, callback) {
  var cb = callback || function () {};

  if (connection.state === 'disconnected') {
    connection.destroy();
  }

  this._removeConnection(connection);

  if (connection.state !== 'disconnected' && !connection._protocol._quitSequence) {
    connection._realEnd(cb);
    return;
  }

  process.nextTick(cb);
};

Pool.prototype._removeConnection = function(connection) {
  connection._pool = null;

  // Remove connection from all connections
  spliceConnection(this._allConnections, connection);

  // Remove connection from free connections
  spliceConnection(this._freeConnections, connection);

  this.releaseConnection(connection);
};

Pool.prototype.escape = function(value) {
  return mysql.escape(value, this.config.connectionConfig.stringifyObjects, this.config.connectionConfig.timezone);
};

Pool.prototype.escapeId = function escapeId(value) {
  return mysql.escapeId(value, false);
};

function spliceConnection(array, connection) {
  var index;
  if ((index = array.indexOf(connection)) !== -1) {
    // Remove connection from all connections
    array.splice(index, 1);
  }
}

},{"../":6,"./Connection":7,"./PoolConnection":12,"events":undefined,"util":undefined}],10:[function(require,module,exports){
var Pool          = require('./Pool');
var PoolConfig    = require('./PoolConfig');
var PoolNamespace = require('./PoolNamespace');
var PoolSelector  = require('./PoolSelector');
var Util          = require('util');
var EventEmitter  = require('events').EventEmitter;

module.exports = PoolCluster;

/**
 * PoolCluster
 * @constructor
 * @param {object} [config] The pool cluster configuration
 * @public
 */
function PoolCluster(config) {
  EventEmitter.call(this);

  config = config || {};
  this._canRetry = typeof config.canRetry === 'undefined' ? true : config.canRetry;
  this._defaultSelector = config.defaultSelector || 'RR';
  this._removeNodeErrorCount = config.removeNodeErrorCount || 5;
  this._restoreNodeTimeout = config.restoreNodeTimeout || 0;

  this._closed = false;
  this._findCaches = Object.create(null);
  this._lastId = 0;
  this._namespaces = Object.create(null);
  this._nodes = Object.create(null);
}

Util.inherits(PoolCluster, EventEmitter);

PoolCluster.prototype.add = function add(id, config) {
  if (this._closed) {
    throw new Error('PoolCluster is closed.');
  }

  var nodeId = typeof id === 'object'
    ? 'CLUSTER::' + (++this._lastId)
    : String(id);

  if (this._nodes[nodeId] !== undefined) {
    throw new Error('Node ID "' + nodeId + '" is already defined in PoolCluster.');
  }

  var poolConfig = typeof id !== 'object'
    ? new PoolConfig(config)
    : new PoolConfig(id);

  this._nodes[nodeId] = {
    id            : nodeId,
    errorCount    : 0,
    pool          : new Pool({config: poolConfig}),
    _offlineUntil : 0
  };

  this._clearFindCaches();
};

PoolCluster.prototype.end = function end(callback) {
  var cb = callback !== undefined
    ? callback
    : _cb;

  if (typeof cb !== 'function') {
    throw TypeError('callback argument must be a function');
  }

  if (this._closed) {
    process.nextTick(cb);
    return;
  }

  this._closed = true;

  var calledBack   = false;
  var nodeIds      = Object.keys(this._nodes);
  var waitingClose = 0;

  function onEnd(err) {
    if (!calledBack && (err || --waitingClose <= 0)) {
      calledBack = true;
      cb(err);
    }
  }

  for (var i = 0; i < nodeIds.length; i++) {
    var nodeId = nodeIds[i];
    var node = this._nodes[nodeId];

    waitingClose++;
    node.pool.end(onEnd);
  }

  if (waitingClose === 0) {
    process.nextTick(onEnd);
  }
};

PoolCluster.prototype.of = function(pattern, selector) {
  pattern = pattern || '*';

  selector = selector || this._defaultSelector;
  selector = selector.toUpperCase();
  if (typeof PoolSelector[selector] === 'undefined') {
    selector = this._defaultSelector;
  }

  var key = pattern + selector;

  if (typeof this._namespaces[key] === 'undefined') {
    this._namespaces[key] = new PoolNamespace(this, pattern, selector);
  }

  return this._namespaces[key];
};

PoolCluster.prototype.remove = function remove(pattern) {
  var foundNodeIds = this._findNodeIds(pattern, true);

  for (var i = 0; i < foundNodeIds.length; i++) {
    var node = this._getNode(foundNodeIds[i]);

    if (node) {
      this._removeNode(node);
    }
  }
};

PoolCluster.prototype.getConnection = function(pattern, selector, cb) {
  var namespace;
  if (typeof pattern === 'function') {
    cb = pattern;
    namespace = this.of();
  } else {
    if (typeof selector === 'function') {
      cb = selector;
      selector = this._defaultSelector;
    }

    namespace = this.of(pattern, selector);
  }

  namespace.getConnection(cb);
};

PoolCluster.prototype._clearFindCaches = function _clearFindCaches() {
  this._findCaches = Object.create(null);
};

PoolCluster.prototype._decreaseErrorCount = function _decreaseErrorCount(node) {
  var errorCount = node.errorCount;

  if (errorCount > this._removeNodeErrorCount) {
    errorCount = this._removeNodeErrorCount;
  }

  if (errorCount < 1) {
    errorCount = 1;
  }

  node.errorCount = errorCount - 1;

  if (node._offlineUntil) {
    node._offlineUntil = 0;
    this.emit('online', node.id);
  }
};

PoolCluster.prototype._findNodeIds = function _findNodeIds(pattern, includeOffline) {
  var currentTime  = 0;
  var foundNodeIds = this._findCaches[pattern];

  if (foundNodeIds === undefined) {
    var expression = patternRegExp(pattern);
    var nodeIds    = Object.keys(this._nodes);

    foundNodeIds = nodeIds.filter(function (id) {
      return id.match(expression);
    });

    this._findCaches[pattern] = foundNodeIds;
  }

  if (includeOffline) {
    return foundNodeIds;
  }

  return foundNodeIds.filter(function (nodeId) {
    var node = this._getNode(nodeId);

    if (!node._offlineUntil) {
      return true;
    }

    if (!currentTime) {
      currentTime = getMonotonicMilliseconds();
    }

    return node._offlineUntil <= currentTime;
  }, this);
};

PoolCluster.prototype._getNode = function _getNode(id) {
  return this._nodes[id] || null;
};

PoolCluster.prototype._increaseErrorCount = function _increaseErrorCount(node) {
  var errorCount = ++node.errorCount;

  if (this._removeNodeErrorCount > errorCount) {
    return;
  }

  if (this._restoreNodeTimeout > 0) {
    node._offlineUntil = getMonotonicMilliseconds() + this._restoreNodeTimeout;
    this.emit('offline', node.id);
    return;
  }

  this._removeNode(node);
  this.emit('remove', node.id);
};

PoolCluster.prototype._getConnection = function(node, cb) {
  var self = this;

  node.pool.getConnection(function (err, connection) {
    if (err) {
      self._increaseErrorCount(node);
      cb(err);
      return;
    } else {
      self._decreaseErrorCount(node);
    }

    connection._clusterId = node.id;

    cb(null, connection);
  });
};

PoolCluster.prototype._removeNode = function _removeNode(node) {
  delete this._nodes[node.id];

  this._clearFindCaches();

  node.pool.end(_noop);
};

function getMonotonicMilliseconds() {
  var ms;

  if (typeof process.hrtime === 'function') {
    ms = process.hrtime();
    ms = ms[0] * 1e3 + ms[1] * 1e-6;
  } else {
    ms = process.uptime() * 1000;
  }

  return Math.floor(ms);
}

function isRegExp(val) {
  return typeof val === 'object'
    && Object.prototype.toString.call(val) === '[object RegExp]';
}

function patternRegExp(pattern) {
  if (isRegExp(pattern)) {
    return pattern;
  }

  var source = pattern
    .replace(/([.+?^=!:${}()|\[\]\/\\])/g, '\\$1')
    .replace(/\*/g, '.*');

  return new RegExp('^' + source + '$');
}

function _cb(err) {
  if (err) {
    throw err;
  }
}

function _noop() {}

},{"./Pool":9,"./PoolConfig":11,"./PoolNamespace":13,"./PoolSelector":14,"events":undefined,"util":undefined}],11:[function(require,module,exports){

var ConnectionConfig = require('./ConnectionConfig');

module.exports = PoolConfig;
function PoolConfig(options) {
  if (typeof options === 'string') {
    options = ConnectionConfig.parseUrl(options);
  }

  this.acquireTimeout     = (options.acquireTimeout === undefined)
    ? 10 * 1000
    : Number(options.acquireTimeout);
  this.connectionConfig   = new ConnectionConfig(options);
  this.waitForConnections = (options.waitForConnections === undefined)
    ? true
    : Boolean(options.waitForConnections);
  this.connectionLimit    = (options.connectionLimit === undefined)
    ? 10
    : Number(options.connectionLimit);
  this.queueLimit         = (options.queueLimit === undefined)
    ? 0
    : Number(options.queueLimit);
}

PoolConfig.prototype.newConnectionConfig = function newConnectionConfig() {
  var connectionConfig = new ConnectionConfig(this.connectionConfig);

  connectionConfig.clientFlags   = this.connectionConfig.clientFlags;
  connectionConfig.maxPacketSize = this.connectionConfig.maxPacketSize;

  return connectionConfig;
};

},{"./ConnectionConfig":8}],12:[function(require,module,exports){
var inherits   = require('util').inherits;
var Connection = require('./Connection');
var Events     = require('events');

module.exports = PoolConnection;
inherits(PoolConnection, Connection);

function PoolConnection(pool, options) {
  Connection.call(this, options);
  this._pool  = pool;

  // Bind connection to pool domain
  if (Events.usingDomains) {
    this.domain = pool.domain;
  }

  // When a fatal error occurs the connection's protocol ends, which will cause
  // the connection to end as well, thus we only need to watch for the end event
  // and we will be notified of disconnects.
  this.on('end', this._removeFromPool);
  this.on('error', function (err) {
    if (err.fatal) {
      this._removeFromPool();
    }
  });
}

PoolConnection.prototype.release = function release() {
  var pool = this._pool;

  if (!pool || pool._closed) {
    return undefined;
  }

  return pool.releaseConnection(this);
};

// TODO: Remove this when we are removing PoolConnection#end
PoolConnection.prototype._realEnd = Connection.prototype.end;

PoolConnection.prototype.end = function () {
  console.warn( 'Calling conn.end() to release a pooled connection is '
              + 'deprecated. In next version calling conn.end() will be '
              + 'restored to default conn.end() behavior. Use '
              + 'conn.release() instead.'
              );
  this.release();
};

PoolConnection.prototype.destroy = function () {
  Connection.prototype.destroy.apply(this, arguments);
  this._removeFromPool(this);
};

PoolConnection.prototype._removeFromPool = function _removeFromPool() {
  if (!this._pool || this._pool._closed) {
    return;
  }

  var pool = this._pool;
  this._pool = null;

  pool._purgeConnection(this);
};

},{"./Connection":7,"events":undefined,"util":undefined}],13:[function(require,module,exports){
var Connection   = require('./Connection');
var PoolSelector = require('./PoolSelector');

module.exports = PoolNamespace;

/**
 * PoolNamespace
 * @constructor
 * @param {PoolCluster} cluster The parent cluster for the namespace
 * @param {string} pattern The selection pattern to use
 * @param {string} selector The selector name to use
 * @public
 */
function PoolNamespace(cluster, pattern, selector) {
  this._cluster = cluster;
  this._pattern = pattern;
  this._selector = new PoolSelector[selector]();
}

PoolNamespace.prototype.getConnection = function(cb) {
  var clusterNode = this._getClusterNode();
  var cluster     = this._cluster;
  var namespace   = this;

  if (clusterNode === null) {
    var err = null;

    if (this._cluster._findNodeIds(this._pattern, true).length !== 0) {
      err = new Error('Pool does not have online node.');
      err.code = 'POOL_NONEONLINE';
    } else {
      err = new Error('Pool does not exist.');
      err.code = 'POOL_NOEXIST';
    }

    cb(err);
    return;
  }

  cluster._getConnection(clusterNode, function(err, connection) {
    var retry = err && cluster._canRetry
      && cluster._findNodeIds(namespace._pattern).length !== 0;

    if (retry) {
      namespace.getConnection(cb);
      return;
    }

    if (err) {
      cb(err);
      return;
    }

    cb(null, connection);
  });
};

PoolNamespace.prototype.query = function (sql, values, cb) {
  var cluster     = this._cluster;
  var clusterNode = this._getClusterNode();
  var query       = Connection.createQuery(sql, values, cb);
  var namespace   = this;

  if (clusterNode === null) {
    var err = null;

    if (this._cluster._findNodeIds(this._pattern, true).length !== 0) {
      err = new Error('Pool does not have online node.');
      err.code = 'POOL_NONEONLINE';
    } else {
      err = new Error('Pool does not exist.');
      err.code = 'POOL_NOEXIST';
    }

    process.nextTick(function () {
      query.on('error', function () {});
      query.end(err);
    });
    return query;
  }

  if (!(typeof sql === 'object' && 'typeCast' in sql)) {
    query.typeCast = clusterNode.pool.config.connectionConfig.typeCast;
  }

  if (clusterNode.pool.config.connectionConfig.trace) {
    // Long stack trace support
    query._callSite = new Error();
  }

  cluster._getConnection(clusterNode, function (err, conn) {
    var retry = err && cluster._canRetry
      && cluster._findNodeIds(namespace._pattern).length !== 0;

    if (retry) {
      namespace.query(query);
      return;
    }

    if (err) {
      query.on('error', function () {});
      query.end(err);
      return;
    }

    // Release connection based off event
    query.once('end', function() {
      conn.release();
    });

    conn.query(query);
  });

  return query;
};

PoolNamespace.prototype._getClusterNode = function _getClusterNode() {
  var foundNodeIds = this._cluster._findNodeIds(this._pattern);
  var nodeId;

  switch (foundNodeIds.length) {
    case 0:
      nodeId = null;
      break;
    case 1:
      nodeId = foundNodeIds[0];
      break;
    default:
      nodeId = this._selector(foundNodeIds);
      break;
  }

  return nodeId !== null
    ? this._cluster._getNode(nodeId)
    : null;
};

},{"./Connection":7,"./PoolSelector":14}],14:[function(require,module,exports){

/**
 * PoolSelector
 */
var PoolSelector = module.exports = {};

PoolSelector.RR = function PoolSelectorRoundRobin() {
  var index = 0;

  return function(clusterIds) {
    if (index >= clusterIds.length) {
      index = 0;
    }

    var clusterId = clusterIds[index++];

    return clusterId;
  };
};

PoolSelector.RANDOM = function PoolSelectorRandom() {
  return function(clusterIds) {
    return clusterIds[Math.floor(Math.random() * clusterIds.length)];
  };
};

PoolSelector.ORDER = function PoolSelectorOrder() {
  return function(clusterIds) {
    return clusterIds[0];
  };
};

},{}],15:[function(require,module,exports){
var Buffer = require('buffer').Buffer;
var Crypto = require('crypto');
var Auth   = exports;

function sha1(msg) {
  var hash = Crypto.createHash('sha1');
  hash.update(msg, 'binary');
  return hash.digest('binary');
}
Auth.sha1 = sha1;

function xor(a, b) {
  a = new Buffer(a, 'binary');
  b = new Buffer(b, 'binary');
  var result = new Buffer(a.length);
  for (var i = 0; i < a.length; i++) {
    result[i] = (a[i] ^ b[i]);
  }
  return result;
}
Auth.xor = xor;

Auth.token = function(password, scramble) {
  if (!password) {
    return new Buffer(0);
  }

  // password must be in binary format, not utf8
  var stage1 = sha1((new Buffer(password, 'utf8')).toString('binary'));
  var stage2 = sha1(stage1);
  var stage3 = sha1(scramble.toString('binary') + stage2);
  return xor(stage3, stage1);
};

// This is a port of sql/password.c:hash_password which needs to be used for
// pre-4.1 passwords.
Auth.hashPassword = function(password) {
  var nr = [0x5030, 0x5735],
      add = 7,
      nr2 = [0x1234, 0x5671],
      result = new Buffer(8);

  if (typeof password === 'string'){
    password = new Buffer(password);
  }

  for (var i = 0; i < password.length; i++) {
    var c = password[i];
    if (c === 32 || c === 9) {
      // skip space in password
      continue;
    }

    // nr^= (((nr & 63)+add)*c)+ (nr << 8);
    // nr = xor(nr, add(mul(add(and(nr, 63), add), c), shl(nr, 8)))
    nr = this.xor32(nr, this.add32(this.mul32(this.add32(this.and32(nr, [0,63]), [0,add]), [0,c]), this.shl32(nr, 8)));

    // nr2+=(nr2 << 8) ^ nr;
    // nr2 = add(nr2, xor(shl(nr2, 8), nr))
    nr2 = this.add32(nr2, this.xor32(this.shl32(nr2, 8), nr));

    // add+=tmp;
    add += c;
  }

  this.int31Write(result, nr, 0);
  this.int31Write(result, nr2, 4);

  return result;
};

Auth.randomInit = function(seed1, seed2) {
  return {
    max_value     : 0x3FFFFFFF,
    max_value_dbl : 0x3FFFFFFF,
    seed1         : seed1 % 0x3FFFFFFF,
    seed2         : seed2 % 0x3FFFFFFF
  };
};

Auth.myRnd = function(r){
  r.seed1 = (r.seed1 * 3 + r.seed2) % r.max_value;
  r.seed2 = (r.seed1 + r.seed2 + 33) % r.max_value;

  return r.seed1 / r.max_value_dbl;
};

Auth.scramble323 = function(message, password) {
  var to = new Buffer(8),
      hashPass = this.hashPassword(password),
      hashMessage = this.hashPassword(message.slice(0, 8)),
      seed1 = this.int32Read(hashPass, 0) ^ this.int32Read(hashMessage, 0),
      seed2 = this.int32Read(hashPass, 4) ^ this.int32Read(hashMessage, 4),
      r = this.randomInit(seed1, seed2);

  for (var i = 0; i < 8; i++){
    to[i] = Math.floor(this.myRnd(r) * 31) + 64;
  }
  var extra = (Math.floor(this.myRnd(r) * 31));

  for (var i = 0; i < 8; i++){
    to[i] ^= extra;
  }

  return to;
};

Auth.xor32 = function(a,b){
  return [a[0] ^ b[0], a[1] ^ b[1]];
};

Auth.add32 = function(a,b){
  var w1 = a[1] + b[1],
      w2 = a[0] + b[0] + ((w1 & 0xFFFF0000) >> 16);

  return [w2 & 0xFFFF, w1 & 0xFFFF];
};

Auth.mul32 = function(a,b){
  // based on this example of multiplying 32b ints using 16b
  // http://www.dsprelated.com/showmessage/89790/1.php
  var w1 = a[1] * b[1],
      w2 = (((a[1] * b[1]) >> 16) & 0xFFFF) + ((a[0] * b[1]) & 0xFFFF) + (a[1] * b[0] & 0xFFFF);

  return [w2 & 0xFFFF, w1 & 0xFFFF];
};

Auth.and32 = function(a,b){
  return [a[0] & b[0], a[1] & b[1]];
};

Auth.shl32 = function(a,b){
  // assume b is 16 or less
  var w1 = a[1] << b,
      w2 = (a[0] << b) | ((w1 & 0xFFFF0000) >> 16);

  return [w2 & 0xFFFF, w1 & 0xFFFF];
};

Auth.int31Write = function(buffer, number, offset) {
  buffer[offset] = (number[0] >> 8) & 0x7F;
  buffer[offset + 1] = (number[0]) & 0xFF;
  buffer[offset + 2] = (number[1] >> 8) & 0xFF;
  buffer[offset + 3] = (number[1]) & 0xFF;
};

Auth.int32Read = function(buffer, offset){
  return (buffer[offset] << 24)
       + (buffer[offset + 1] << 16)
       + (buffer[offset + 2] << 8)
       + (buffer[offset + 3]);
};

},{"buffer":undefined,"crypto":undefined}],16:[function(require,module,exports){

module.exports = BufferList;
function BufferList() {
  this.bufs = [];
  this.size = 0;
}

BufferList.prototype.shift = function shift() {
  var buf = this.bufs.shift();

  if (buf) {
    this.size -= buf.length;
  }

  return buf;
};

BufferList.prototype.push = function push(buf) {
  if (!buf || !buf.length) {
    return;
  }

  this.bufs.push(buf);
  this.size += buf.length;
};

},{}],17:[function(require,module,exports){
module.exports = PacketHeader;
function PacketHeader(length, number) {
  this.length = length;
  this.number = number;
}

},{}],18:[function(require,module,exports){
(function (Buffer){
var BIT_16            = Math.pow(2, 16);
var BIT_24            = Math.pow(2, 24);
var BUFFER_ALLOC_SIZE = Math.pow(2, 8);
// The maximum precision JS Numbers can hold precisely
// Don't panic: Good enough to represent byte values up to 8192 TB
var IEEE_754_BINARY_64_PRECISION = Math.pow(2, 53);
var MAX_PACKET_LENGTH            = Math.pow(2, 24) - 1;

module.exports = PacketWriter;
function PacketWriter() {
  this._buffer = null;
  this._offset = 0;
}

PacketWriter.prototype.toBuffer = function toBuffer(parser) {
  if (!this._buffer) {
    this._buffer = new Buffer(0);
    this._offset = 0;
  }

  var buffer  = this._buffer;
  var length  = this._offset;
  var packets = Math.floor(length / MAX_PACKET_LENGTH) + 1;

  this._buffer = new Buffer(length + packets * 4);
  this._offset = 0;

  for (var packet = 0; packet < packets; packet++) {
    var isLast = (packet + 1 === packets);
    var packetLength = (isLast)
      ? length % MAX_PACKET_LENGTH
      : MAX_PACKET_LENGTH;

    var packetNumber = parser.incrementPacketNumber();

    this.writeUnsignedNumber(3, packetLength);
    this.writeUnsignedNumber(1, packetNumber);

    var start = packet * MAX_PACKET_LENGTH;
    var end   = start + packetLength;

    this.writeBuffer(buffer.slice(start, end));
  }

  return this._buffer;
};

PacketWriter.prototype.writeUnsignedNumber = function(bytes, value) {
  this._allocate(bytes);

  for (var i = 0; i < bytes; i++) {
    this._buffer[this._offset++] = (value >> (i * 8)) & 0xff;
  }
};

PacketWriter.prototype.writeFiller = function(bytes) {
  this._allocate(bytes);

  for (var i = 0; i < bytes; i++) {
    this._buffer[this._offset++] = 0x00;
  }
};

PacketWriter.prototype.writeNullTerminatedString = function(value, encoding) {
  // Typecast undefined into '' and numbers into strings
  value = value || '';
  value = value + '';

  var bytes = Buffer.byteLength(value, encoding || 'utf-8') + 1;
  this._allocate(bytes);

  this._buffer.write(value, this._offset, encoding);
  this._buffer[this._offset + bytes - 1] = 0x00;

  this._offset += bytes;
};

PacketWriter.prototype.writeString = function(value) {
  // Typecast undefined into '' and numbers into strings
  value = value || '';
  value = value + '';

  var bytes = Buffer.byteLength(value, 'utf-8');
  this._allocate(bytes);

  this._buffer.write(value, this._offset, 'utf-8');

  this._offset += bytes;
};

PacketWriter.prototype.writeBuffer = function(value) {
  var bytes = value.length;

  this._allocate(bytes);
  value.copy(this._buffer, this._offset);
  this._offset += bytes;
};

PacketWriter.prototype.writeLengthCodedNumber = function(value) {
  if (value === null) {
    this._allocate(1);
    this._buffer[this._offset++] = 251;
    return;
  }

  if (value <= 250) {
    this._allocate(1);
    this._buffer[this._offset++] = value;
    return;
  }

  if (value > IEEE_754_BINARY_64_PRECISION) {
    throw new Error(
      'writeLengthCodedNumber: JS precision range exceeded, your ' +
      'number is > 53 bit: "' + value + '"'
    );
  }

  if (value < BIT_16) {
    this._allocate(3);
    this._buffer[this._offset++] = 252;
  } else if (value < BIT_24) {
    this._allocate(4);
    this._buffer[this._offset++] = 253;
  } else {
    this._allocate(9);
    this._buffer[this._offset++] = 254;
  }

  // 16 Bit
  this._buffer[this._offset++] = value & 0xff;
  this._buffer[this._offset++] = (value >> 8) & 0xff;

  if (value < BIT_16) {
    return;
  }

  // 24 Bit
  this._buffer[this._offset++] = (value >> 16) & 0xff;

  if (value < BIT_24) {
    return;
  }

  this._buffer[this._offset++] = (value >> 24) & 0xff;

  // Hack: Get the most significant 32 bit (JS bitwise operators are 32 bit)
  value = value.toString(2);
  value = value.substr(0, value.length - 32);
  value = parseInt(value, 2);

  this._buffer[this._offset++] = value & 0xff;
  this._buffer[this._offset++] = (value >> 8) & 0xff;
  this._buffer[this._offset++] = (value >> 16) & 0xff;

  // Set last byte to 0, as we can only support 53 bits in JS (see above)
  this._buffer[this._offset++] = 0;
};

PacketWriter.prototype.writeLengthCodedBuffer = function(value) {
  var bytes = value.length;
  this.writeLengthCodedNumber(bytes);
  this.writeBuffer(value);
};

PacketWriter.prototype.writeNullTerminatedBuffer = function(value) {
  this.writeBuffer(value);
  this.writeFiller(1); // 0x00 terminator
};

PacketWriter.prototype.writeLengthCodedString = function(value) {
  if (value === null) {
    this.writeLengthCodedNumber(null);
    return;
  }

  value = (value === undefined)
    ? ''
    : String(value);

  var bytes = Buffer.byteLength(value, 'utf-8');
  this.writeLengthCodedNumber(bytes);

  if (!bytes) {
    return;
  }

  this._allocate(bytes);
  this._buffer.write(value, this._offset, 'utf-8');
  this._offset += bytes;
};

PacketWriter.prototype._allocate = function _allocate(bytes) {
  if (!this._buffer) {
    this._buffer = new Buffer(Math.max(BUFFER_ALLOC_SIZE, bytes));
    this._offset = 0;
    return;
  }

  var bytesRemaining = this._buffer.length - this._offset;
  if (bytesRemaining >= bytes) {
    return;
  }

  var newSize   = this._buffer.length + Math.max(BUFFER_ALLOC_SIZE, bytes);
  var oldBuffer = this._buffer;

  this._buffer = new Buffer(newSize);
  oldBuffer.copy(this._buffer);
};

}).call(this,require("buffer").Buffer)

},{"buffer":undefined}],19:[function(require,module,exports){
(function (Buffer){
var MAX_PACKET_LENGTH = Math.pow(2, 24) - 1;
var MUL_32BIT         = Math.pow(2, 32);
var PacketHeader      = require('./PacketHeader');
var BigNumber         = require('bignumber.js');
var BufferList        = require('./BufferList');

module.exports = Parser;
function Parser(options) {
  options = options || {};

  this._supportBigNumbers = options.config && options.config.supportBigNumbers;
  this._buffer            = new Buffer(0);
  this._nextBuffers       = new BufferList();
  this._longPacketBuffers = new BufferList();
  this._offset            = 0;
  this._packetEnd         = null;
  this._packetHeader      = null;
  this._packetOffset      = null;
  this._onError           = options.onError || function(err) { throw err; };
  this._onPacket          = options.onPacket || function() {};
  this._nextPacketNumber  = 0;
  this._encoding          = 'utf-8';
  this._paused            = false;
}

Parser.prototype.write = function write(chunk) {
  this._nextBuffers.push(chunk);

  while (!this._paused) {
    if (!this._packetHeader) {
      if (!this._combineNextBuffers(4)) {
        break;
      }

      this._packetHeader = new PacketHeader(
        this.parseUnsignedNumber(3),
        this.parseUnsignedNumber(1)
      );

      if (this._packetHeader.number !== this._nextPacketNumber) {
        var err = new Error(
          'Packets out of order. Got: ' + this._packetHeader.number + ' ' +
          'Expected: ' + this._nextPacketNumber
        );

        err.code  = 'PROTOCOL_PACKETS_OUT_OF_ORDER';
        err.fatal = true;

        this._onError(err);
      }

      this.incrementPacketNumber();
    }

    if (!this._combineNextBuffers(this._packetHeader.length)) {
      break;
    }

    this._packetEnd    = this._offset + this._packetHeader.length;
    this._packetOffset = this._offset;

    if (this._packetHeader.length === MAX_PACKET_LENGTH) {
      this._longPacketBuffers.push(this._buffer.slice(this._packetOffset, this._packetEnd));

      this._advanceToNextPacket();
      continue;
    }

    this._combineLongPacketBuffers();

    // Try...finally to ensure exception safety. Unfortunately this is costing
    // us up to ~10% performance in some benchmarks.
    var hadException = true;
    try {
      this._onPacket(this._packetHeader);
      hadException = false;
    } catch (err) {
      if (!err || typeof err.code !== 'string' || err.code.substr(0, 7) !== 'PARSER_') {
        throw err; // Rethrow non-MySQL errors
      }

      // Pass down parser errors
      this._onError(err);
      hadException = false;
    } finally {
      this._advanceToNextPacket();

      // If we had an exception, the parser while loop will be broken out
      // of after the finally block. So we need to make sure to re-enter it
      // to continue parsing any bytes that may already have been received.
      if (hadException) {
        process.nextTick(this.write.bind(this));
      }
    }
  }
};

Parser.prototype.append = function append(chunk) {
  if (!chunk || chunk.length === 0) {
    return;
  }

  // Calculate slice ranges
  var sliceEnd    = this._buffer.length;
  var sliceStart  = this._packetOffset === null
    ? this._offset
    : this._packetOffset;
  var sliceLength = sliceEnd - sliceStart;

  // Get chunk data
  var buffer = null;
  var chunks = !(chunk instanceof Array || Array.isArray(chunk)) ? [chunk] : chunk;
  var length = 0;
  var offset = 0;

  for (var i = 0; i < chunks.length; i++) {
    length += chunks[i].length;
  }

  if (sliceLength !== 0) {
    // Create a new Buffer
    buffer = new Buffer(sliceLength + length);
    offset = 0;

    // Copy data slice
    offset += this._buffer.copy(buffer, 0, sliceStart, sliceEnd);

    // Copy chunks
    for (var i = 0; i < chunks.length; i++) {
      offset += chunks[i].copy(buffer, offset);
    }
  } else if (chunks.length > 1) {
    // Create a new Buffer
    buffer = new Buffer(length);
    offset = 0;

    // Copy chunks
    for (var i = 0; i < chunks.length; i++) {
      offset += chunks[i].copy(buffer, offset);
    }
  } else {
    // Buffer is the only chunk
    buffer = chunks[0];
  }

  // Adjust data-tracking pointers
  this._buffer       = buffer;
  this._offset       = this._offset - sliceStart;
  this._packetEnd    = this._packetEnd !== null
    ? this._packetEnd - sliceStart
    : null;
  this._packetOffset = this._packetOffset !== null
    ? this._packetOffset - sliceStart
    : null;
};

Parser.prototype.pause = function() {
  this._paused = true;
};

Parser.prototype.resume = function() {
  this._paused = false;

  // nextTick() to avoid entering write() multiple times within the same stack
  // which would cause problems as write manipulates the state of the object.
  process.nextTick(this.write.bind(this));
};

Parser.prototype.peak = function() {
  return this._buffer[this._offset];
};

Parser.prototype.parseUnsignedNumber = function parseUnsignedNumber(bytes) {
  if (bytes === 1) {
    return this._buffer[this._offset++];
  }

  var buffer = this._buffer;
  var offset = this._offset + bytes - 1;
  var value  = 0;

  if (bytes > 4) {
    var err    = new Error('parseUnsignedNumber: Supports only up to 4 bytes');
    err.offset = (this._offset - this._packetOffset - 1);
    err.code   = 'PARSER_UNSIGNED_TOO_LONG';
    throw err;
  }

  while (offset >= this._offset) {
    value = ((value << 8) | buffer[offset]) >>> 0;
    offset--;
  }

  this._offset += bytes;

  return value;
};

Parser.prototype.parseLengthCodedString = function() {
  var length = this.parseLengthCodedNumber();

  if (length === null) {
    return null;
  }

  return this.parseString(length);
};

Parser.prototype.parseLengthCodedBuffer = function() {
  var length = this.parseLengthCodedNumber();

  if (length === null) {
    return null;
  }

  return this.parseBuffer(length);
};

Parser.prototype.parseLengthCodedNumber = function parseLengthCodedNumber() {
  if (this._offset >= this._buffer.length) {
    var err    = new Error('Parser: read past end');
    err.offset = (this._offset - this._packetOffset);
    err.code   = 'PARSER_READ_PAST_END';
    throw err;
  }

  var bits = this._buffer[this._offset++];

  if (bits <= 250) {
    return bits;
  }

  switch (bits) {
    case 251:
      return null;
    case 252:
      return this.parseUnsignedNumber(2);
    case 253:
      return this.parseUnsignedNumber(3);
    case 254:
      break;
    default:
      var err    = new Error('Unexpected first byte' + (bits ? ': 0x' + bits.toString(16) : ''));
      err.offset = (this._offset - this._packetOffset - 1);
      err.code   = 'PARSER_BAD_LENGTH_BYTE';
      throw err;
  }

  var low = this.parseUnsignedNumber(4);
  var high = this.parseUnsignedNumber(4);
  var value;

  if (high >>> 21) {
    value = (new BigNumber(low)).plus((new BigNumber(MUL_32BIT)).times(high)).toString();

    if (this._supportBigNumbers) {
      return value;
    }

    var err    = new Error(
      'parseLengthCodedNumber: JS precision range exceeded, ' +
      'number is >= 53 bit: "' + value + '"'
    );
    err.offset = (this._offset - this._packetOffset - 8);
    err.code   = 'PARSER_JS_PRECISION_RANGE_EXCEEDED';
    throw err;
  }

  value = low + (MUL_32BIT * high);

  return value;
};

Parser.prototype.parseFiller = function(length) {
  return this.parseBuffer(length);
};

Parser.prototype.parseNullTerminatedBuffer = function() {
  var end      = this._nullByteOffset();
  var value    = this._buffer.slice(this._offset, end);
  this._offset = end + 1;

  return value;
};

Parser.prototype.parseNullTerminatedString = function() {
  var end      = this._nullByteOffset();
  var value    = this._buffer.toString(this._encoding, this._offset, end);
  this._offset = end + 1;

  return value;
};

Parser.prototype._nullByteOffset = function() {
  var offset = this._offset;

  while (this._buffer[offset] !== 0x00) {
    offset++;

    if (offset >= this._buffer.length) {
      var err    = new Error('Offset of null terminated string not found.');
      err.offset = (this._offset - this._packetOffset);
      err.code   = 'PARSER_MISSING_NULL_BYTE';
      throw err;
    }
  }

  return offset;
};

Parser.prototype.parsePacketTerminatedString = function() {
  var length = this._packetEnd - this._offset;
  return this.parseString(length);
};

Parser.prototype.parseBuffer = function(length) {
  var response = new Buffer(length);
  this._buffer.copy(response, 0, this._offset, this._offset + length);

  this._offset += length;
  return response;
};

Parser.prototype.parseString = function(length) {
  var offset = this._offset;
  var end = offset + length;
  var value = this._buffer.toString(this._encoding, offset, end);

  this._offset = end;
  return value;
};

Parser.prototype.parseGeometryValue = function() {
  var buffer = this.parseLengthCodedBuffer();
  var offset = 4;

  if (buffer === null || !buffer.length) {
    return null;
  }

  function parseGeometry() {
    var result = null;
    var byteOrder = buffer.readUInt8(offset); offset += 1;
    var wkbType = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset); offset += 4;
    switch(wkbType) {
      case 1: // WKBPoint
        var x = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset); offset += 8;
        var y = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset); offset += 8;
        result = {x: x, y: y};
        break;
      case 2: // WKBLineString
        var numPoints = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset); offset += 4;
        result = [];
        for(var i = numPoints; i > 0; i--) {
          var x = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset); offset += 8;
          var y = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset); offset += 8;
          result.push({x: x, y: y});
        }
        break;
      case 3: // WKBPolygon
        var numRings = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset); offset += 4;
        result = [];
        for(var i = numRings; i > 0; i--) {
          var numPoints = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset); offset += 4;
          var line = [];
          for(var j = numPoints; j > 0; j--) {
            var x = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset); offset += 8;
            var y = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset); offset += 8;
            line.push({x: x, y: y});
          }
          result.push(line);
        }
        break;
      case 4: // WKBMultiPoint
      case 5: // WKBMultiLineString
      case 6: // WKBMultiPolygon
      case 7: // WKBGeometryCollection
        var num = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset); offset += 4;
        var result = [];
        for(var i = num; i > 0; i--) {
          result.push(parseGeometry());
        }
        break;
    }
    return result;
  }
  return parseGeometry();
};

Parser.prototype.reachedPacketEnd = function() {
  return this._offset === this._packetEnd;
};

Parser.prototype.incrementPacketNumber = function() {
  var currentPacketNumber = this._nextPacketNumber;
  this._nextPacketNumber = (this._nextPacketNumber + 1) % 256;

  return currentPacketNumber;
};

Parser.prototype.resetPacketNumber = function() {
  this._nextPacketNumber = 0;
};

Parser.prototype.packetLength = function packetLength() {
  if (!this._packetHeader) {
    return null;
  }

  return this._packetHeader.length + this._longPacketBuffers.size;
};

Parser.prototype._combineNextBuffers = function _combineNextBuffers(bytes) {
  var length = this._buffer.length - this._offset;

  if (length >= bytes) {
    return true;
  }

  if ((length + this._nextBuffers.size) < bytes) {
    return false;
  }

  var buffers     = [];
  var bytesNeeded = bytes - length;

  while (bytesNeeded > 0) {
    var buffer = this._nextBuffers.shift();
    buffers.push(buffer);
    bytesNeeded -= buffer.length;
  }

  this.append(buffers);
  return true;
};

Parser.prototype._combineLongPacketBuffers = function _combineLongPacketBuffers() {
  if (!this._longPacketBuffers.size) {
    return;
  }

  // Calculate bytes
  var remainingBytes      = this._buffer.length - this._offset;
  var trailingPacketBytes = this._buffer.length - this._packetEnd;

  // Create buffer
  var buf    = null;
  var buffer = new Buffer(remainingBytes + this._longPacketBuffers.size);
  var offset = 0;

  // Copy long buffers
  while ((buf = this._longPacketBuffers.shift())) {
    offset += buf.copy(buffer, offset);
  }

  // Copy remaining bytes
  this._buffer.copy(buffer, offset, this._offset);

  this._buffer       = buffer;
  this._offset       = 0;
  this._packetEnd    = this._buffer.length - trailingPacketBytes;
  this._packetOffset = 0;
};

Parser.prototype._advanceToNextPacket = function() {
  this._offset       = this._packetEnd;
  this._packetHeader = null;
  this._packetEnd    = null;
  this._packetOffset = null;
};

}).call(this,require("buffer").Buffer)

},{"./BufferList":16,"./PacketHeader":17,"bignumber.js":58,"buffer":undefined}],20:[function(require,module,exports){
var Parser       = require('./Parser');
var Sequences    = require('./sequences');
var Packets      = require('./packets');
var Timers       = require('timers');
var Stream       = require('stream').Stream;
var Util         = require('util');
var PacketWriter = require('./PacketWriter');

module.exports = Protocol;
Util.inherits(Protocol, Stream);
function Protocol(options) {
  Stream.call(this);

  options = options || {};

  this.readable = true;
  this.writable = true;

  this._config                        = options.config || {};
  this._connection                    = options.connection;
  this._callback                      = null;
  this._fatalError                    = null;
  this._quitSequence                  = null;
  this._handshakeSequence             = null;
  this._handshaked                    = false;
  this._ended                         = false;
  this._destroyed                     = false;
  this._queue                         = [];
  this._handshakeInitializationPacket = null;

  this._parser = new Parser({
    onError  : this.handleParserError.bind(this),
    onPacket : this._parsePacket.bind(this),
    config   : this._config
  });
}

Protocol.prototype.write = function(buffer) {
  this._parser.write(buffer);
  return true;
};

Protocol.prototype.handshake = function handshake(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = options || {};
  options.config = this._config;

  return this._handshakeSequence = this._enqueue(new Sequences.Handshake(options, callback));
};

Protocol.prototype.query = function query(options, callback) {
  return this._enqueue(new Sequences.Query(options, callback));
};

Protocol.prototype.changeUser = function changeUser(options, callback) {
  return this._enqueue(new Sequences.ChangeUser(options, callback));
};

Protocol.prototype.ping = function ping(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  return this._enqueue(new Sequences.Ping(options, callback));
};

Protocol.prototype.stats = function stats(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  return this._enqueue(new Sequences.Statistics(options, callback));
};

Protocol.prototype.quit = function quit(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var self     = this;
  var sequence = this._enqueue(new Sequences.Quit(options, callback));

  sequence.on('end', function () {
    self.end();
  });

  return this._quitSequence = sequence;
};

Protocol.prototype.end = function() {
  if(this._ended) {
    return;
  }
  this._ended = true;

  if (this._quitSequence && (this._quitSequence._ended || this._queue[0] === this._quitSequence)) {
    this._quitSequence.end();
    this.emit('end');
    return;
  }

  var err = new Error('Connection lost: The server closed the connection.');
  err.fatal = true;
  err.code = 'PROTOCOL_CONNECTION_LOST';

  this._delegateError(err);
};

Protocol.prototype.pause = function() {
  this._parser.pause();
  // Since there is a file stream in query, we must transmit pause/resume event to current sequence.
  var seq = this._queue[0];
  if (seq && seq.emit) {
    seq.emit('pause');
  }
};

Protocol.prototype.resume = function() {
  this._parser.resume();
  // Since there is a file stream in query, we must transmit pause/resume event to current sequence.
  var seq = this._queue[0];
  if (seq && seq.emit) {
    seq.emit('resume');
  }
};

Protocol.prototype._enqueue = function(sequence) {
  if (!this._validateEnqueue(sequence)) {
    return sequence;
  }

  if (this._config.trace) {
    // Long stack trace support
    sequence._callSite = sequence._callSite || new Error();
  }

  this._queue.push(sequence);
  this.emit('enqueue', sequence);

  var self = this;
  sequence
    .on('error', function(err) {
      self._delegateError(err, sequence);
    })
    .on('packet', function(packet) {
      Timers.active(sequence);
      self._emitPacket(packet);
    })
    .on('end', function() {
      self._dequeue(sequence);
    })
    .on('timeout', function() {
      var err = new Error(sequence.constructor.name + ' inactivity timeout');

      err.code    = 'PROTOCOL_SEQUENCE_TIMEOUT';
      err.fatal   = true;
      err.timeout = sequence._timeout;

      self._delegateError(err, sequence);
    })
    .on('start-tls', function() {
      Timers.active(sequence);
      self._connection._startTLS(function(err) {
        if (err) {
          // SSL negotiation error are fatal
          err.code  = 'HANDSHAKE_SSL_ERROR';
          err.fatal = true;
          sequence.end(err);
          return;
        }

        Timers.active(sequence);
        sequence._tlsUpgradeCompleteHandler();
      });
    });

  if (this._queue.length === 1) {
    this._parser.resetPacketNumber();
    this._startSequence(sequence);
  }

  return sequence;
};

Protocol.prototype._validateEnqueue = function _validateEnqueue(sequence) {
  var err;
  var prefix = 'Cannot enqueue ' + sequence.constructor.name;
  var prefixBefore = prefix + ' before ';
  var prefixAfter = prefix + ' after ';

  if (this._fatalError) {
    err      = new Error(prefixAfter + 'fatal error.');
    err.code = 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR';
  } else if (this._quitSequence) {
    err      = new Error(prefixAfter + 'invoking quit.');
    err.code = 'PROTOCOL_ENQUEUE_AFTER_QUIT';
  } else if (this._destroyed) {
    err      = new Error(prefixAfter + 'being destroyed.');
    err.code = 'PROTOCOL_ENQUEUE_AFTER_DESTROY';
  } else if (this._handshakeSequence && sequence.constructor === Sequences.Handshake) {
    err      = new Error(prefixAfter + 'already enqueuing a Handshake.');
    err.code = 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE';
  } else if (!this._handshakeSequence && sequence.constructor === Sequences.ChangeUser) {
    err      = new Error(prefixBefore + 'a Handshake.');
    err.code = 'PROTOCOL_ENQUEUE_BEFORE_HANDSHAKE';
  } else {
    return true;
  }

  var self  = this;
  err.fatal = false;

  // add error handler
  sequence.on('error', function (err) {
    self._delegateError(err, sequence);
  });

  process.nextTick(function () {
    sequence.end(err);
  });

  return false;
};

Protocol.prototype._parsePacket = function() {
  var sequence = this._queue[0];

  if (!sequence) {
    var err   = new Error('Received packet with no active sequence.');
    err.code  = 'PROTOCOL_STRAY_PACKET';
    err.fatal = true;

    this._delegateError(err);
    return;
  }

  var Packet     = this._determinePacket(sequence);
  var packet     = new Packet({protocol41: this._config.protocol41});
  var packetName = Packet.name;

  // Special case: Faster dispatch, and parsing done inside sequence
  if (Packet === Packets.RowDataPacket) {
    sequence.RowDataPacket(packet, this._parser, this._connection);

    if (this._config.debug) {
      this._debugPacket(true, packet);
    }

    return;
  }

  if (this._config.debug) {
    this._parsePacketDebug(packet);
  } else {
    packet.parse(this._parser);
  }

  if (Packet === Packets.HandshakeInitializationPacket) {
    this._handshakeInitializationPacket = packet;
  }

  Timers.active(sequence);

  if (!sequence[packetName]) {
    var err   = new Error('Received packet in the wrong sequence.');
    err.code  = 'PROTOCOL_INCORRECT_PACKET_SEQUENCE';
    err.fatal = true;

    this._delegateError(err);
    return;
  }

  sequence[packetName](packet);
};

Protocol.prototype._parsePacketDebug = function _parsePacketDebug(packet) {
  try {
    packet.parse(this._parser);
  } finally {
    this._debugPacket(true, packet);
  }
};

Protocol.prototype._emitPacket = function(packet) {
  var packetWriter = new PacketWriter();
  packet.write(packetWriter);
  this.emit('data', packetWriter.toBuffer(this._parser));

  if (this._config.debug) {
    this._debugPacket(false, packet);
  }
};

Protocol.prototype._determinePacket = function(sequence) {
  var firstByte = this._parser.peak();

  if (sequence.determinePacket) {
    var Packet = sequence.determinePacket(firstByte, this._parser);
    if (Packet) {
      return Packet;
    }
  }

  switch (firstByte) {
    case 0x00:
      if (!this._handshaked) {
        this._handshaked = true;
        this.emit('handshake', this._handshakeInitializationPacket);
      }
      return Packets.OkPacket;
    case 0xfe: return Packets.EofPacket;
    case 0xff: return Packets.ErrorPacket;
  }

  throw new Error('Could not determine packet, firstByte = ' + firstByte);
};

Protocol.prototype._dequeue = function(sequence) {
  Timers.unenroll(sequence);

  // No point in advancing the queue, we are dead
  if (this._fatalError) {
    return;
  }

  this._queue.shift();

  var sequence = this._queue[0];
  if (!sequence) {
    this.emit('drain');
    return;
  }

  this._parser.resetPacketNumber();

  this._startSequence(sequence);
};

Protocol.prototype._startSequence = function(sequence) {
  if (sequence._timeout > 0 && isFinite(sequence._timeout)) {
    Timers.enroll(sequence, sequence._timeout);
    Timers.active(sequence);
  }

  if (sequence.constructor === Sequences.ChangeUser) {
    sequence.start(this._handshakeInitializationPacket);
  } else {
    sequence.start();
  }
};

Protocol.prototype.handleNetworkError = function(err) {
  err.fatal = true;

  var sequence = this._queue[0];
  if (sequence) {
    sequence.end(err);
  } else {
    this._delegateError(err);
  }
};

Protocol.prototype.handleParserError = function handleParserError(err) {
  var sequence = this._queue[0];
  if (sequence) {
    sequence.end(err);
  } else {
    this._delegateError(err);
  }
};

Protocol.prototype._delegateError = function(err, sequence) {
  // Stop delegating errors after the first fatal error
  if (this._fatalError) {
    return;
  }

  if (err.fatal) {
    this._fatalError = err;
  }

  if (this._shouldErrorBubbleUp(err, sequence)) {
    // Can't use regular 'error' event here as that always destroys the pipe
    // between socket and protocol which is not what we want (unless the
    // exception was fatal).
    this.emit('unhandledError', err);
  } else if (err.fatal) {
    // Send fatal error to all sequences in the queue
    var queue = this._queue;
    process.nextTick(function () {
      queue.forEach(function (sequence) {
        sequence.end(err);
      });
      queue.length = 0;
    });
  }

  // Make sure the stream we are piping to is getting closed
  if (err.fatal) {
    this.emit('end', err);
  }
};

Protocol.prototype._shouldErrorBubbleUp = function(err, sequence) {
  if (sequence) {
    if (sequence.hasErrorHandler()) {
      return false;
    } else if (!err.fatal) {
      return true;
    }
  }

  return (err.fatal && !this._hasPendingErrorHandlers());
};

Protocol.prototype._hasPendingErrorHandlers = function() {
  return this._queue.some(function(sequence) {
    return sequence.hasErrorHandler();
  });
};

Protocol.prototype.destroy = function() {
  this._destroyed = true;
  this._parser.pause();

  if (this._connection.state !== 'disconnected') {
    if(!this._ended) {
      this.end();
    }
  }
};

Protocol.prototype._debugPacket = function(incoming, packet) {
  var headline = (incoming)
    ? '<-- '
    : '--> ';

  headline = headline + packet.constructor.name;

  // check for debug packet restriction
  if (Array.isArray(this._config.debug) && this._config.debug.indexOf(packet.constructor.name) === -1) {
    return;
  }

  console.log(headline);
  console.log(packet);
  console.log('');
};

},{"./PacketWriter":18,"./Parser":19,"./packets":49,"./sequences":57,"stream":undefined,"timers":undefined,"util":undefined}],21:[function(require,module,exports){
module.exports = ResultSet;
function ResultSet(resultSetHeaderPacket) {
  this.resultSetHeaderPacket = resultSetHeaderPacket;
  this.fieldPackets          = [];
  this.eofPackets            = [];
  this.rows                  = [];
}

},{}],22:[function(require,module,exports){
module.exports = require('sqlstring');

},{"sqlstring":65}],23:[function(require,module,exports){
exports.BIG5_CHINESE_CI              = 1;
exports.LATIN2_CZECH_CS              = 2;
exports.DEC8_SWEDISH_CI              = 3;
exports.CP850_GENERAL_CI             = 4;
exports.LATIN1_GERMAN1_CI            = 5;
exports.HP8_ENGLISH_CI               = 6;
exports.KOI8R_GENERAL_CI             = 7;
exports.LATIN1_SWEDISH_CI            = 8;
exports.LATIN2_GENERAL_CI            = 9;
exports.SWE7_SWEDISH_CI              = 10;
exports.ASCII_GENERAL_CI             = 11;
exports.UJIS_JAPANESE_CI             = 12;
exports.SJIS_JAPANESE_CI             = 13;
exports.CP1251_BULGARIAN_CI          = 14;
exports.LATIN1_DANISH_CI             = 15;
exports.HEBREW_GENERAL_CI            = 16;
exports.TIS620_THAI_CI               = 18;
exports.EUCKR_KOREAN_CI              = 19;
exports.LATIN7_ESTONIAN_CS           = 20;
exports.LATIN2_HUNGARIAN_CI          = 21;
exports.KOI8U_GENERAL_CI             = 22;
exports.CP1251_UKRAINIAN_CI          = 23;
exports.GB2312_CHINESE_CI            = 24;
exports.GREEK_GENERAL_CI             = 25;
exports.CP1250_GENERAL_CI            = 26;
exports.LATIN2_CROATIAN_CI           = 27;
exports.GBK_CHINESE_CI               = 28;
exports.CP1257_LITHUANIAN_CI         = 29;
exports.LATIN5_TURKISH_CI            = 30;
exports.LATIN1_GERMAN2_CI            = 31;
exports.ARMSCII8_GENERAL_CI          = 32;
exports.UTF8_GENERAL_CI              = 33;
exports.CP1250_CZECH_CS              = 34;
exports.UCS2_GENERAL_CI              = 35;
exports.CP866_GENERAL_CI             = 36;
exports.KEYBCS2_GENERAL_CI           = 37;
exports.MACCE_GENERAL_CI             = 38;
exports.MACROMAN_GENERAL_CI          = 39;
exports.CP852_GENERAL_CI             = 40;
exports.LATIN7_GENERAL_CI            = 41;
exports.LATIN7_GENERAL_CS            = 42;
exports.MACCE_BIN                    = 43;
exports.CP1250_CROATIAN_CI           = 44;
exports.UTF8MB4_GENERAL_CI           = 45;
exports.UTF8MB4_BIN                  = 46;
exports.LATIN1_BIN                   = 47;
exports.LATIN1_GENERAL_CI            = 48;
exports.LATIN1_GENERAL_CS            = 49;
exports.CP1251_BIN                   = 50;
exports.CP1251_GENERAL_CI            = 51;
exports.CP1251_GENERAL_CS            = 52;
exports.MACROMAN_BIN                 = 53;
exports.UTF16_GENERAL_CI             = 54;
exports.UTF16_BIN                    = 55;
exports.UTF16LE_GENERAL_CI           = 56;
exports.CP1256_GENERAL_CI            = 57;
exports.CP1257_BIN                   = 58;
exports.CP1257_GENERAL_CI            = 59;
exports.UTF32_GENERAL_CI             = 60;
exports.UTF32_BIN                    = 61;
exports.UTF16LE_BIN                  = 62;
exports.BINARY                       = 63;
exports.ARMSCII8_BIN                 = 64;
exports.ASCII_BIN                    = 65;
exports.CP1250_BIN                   = 66;
exports.CP1256_BIN                   = 67;
exports.CP866_BIN                    = 68;
exports.DEC8_BIN                     = 69;
exports.GREEK_BIN                    = 70;
exports.HEBREW_BIN                   = 71;
exports.HP8_BIN                      = 72;
exports.KEYBCS2_BIN                  = 73;
exports.KOI8R_BIN                    = 74;
exports.KOI8U_BIN                    = 75;
exports.LATIN2_BIN                   = 77;
exports.LATIN5_BIN                   = 78;
exports.LATIN7_BIN                   = 79;
exports.CP850_BIN                    = 80;
exports.CP852_BIN                    = 81;
exports.SWE7_BIN                     = 82;
exports.UTF8_BIN                     = 83;
exports.BIG5_BIN                     = 84;
exports.EUCKR_BIN                    = 85;
exports.GB2312_BIN                   = 86;
exports.GBK_BIN                      = 87;
exports.SJIS_BIN                     = 88;
exports.TIS620_BIN                   = 89;
exports.UCS2_BIN                     = 90;
exports.UJIS_BIN                     = 91;
exports.GEOSTD8_GENERAL_CI           = 92;
exports.GEOSTD8_BIN                  = 93;
exports.LATIN1_SPANISH_CI            = 94;
exports.CP932_JAPANESE_CI            = 95;
exports.CP932_BIN                    = 96;
exports.EUCJPMS_JAPANESE_CI          = 97;
exports.EUCJPMS_BIN                  = 98;
exports.CP1250_POLISH_CI             = 99;
exports.UTF16_UNICODE_CI             = 101;
exports.UTF16_ICELANDIC_CI           = 102;
exports.UTF16_LATVIAN_CI             = 103;
exports.UTF16_ROMANIAN_CI            = 104;
exports.UTF16_SLOVENIAN_CI           = 105;
exports.UTF16_POLISH_CI              = 106;
exports.UTF16_ESTONIAN_CI            = 107;
exports.UTF16_SPANISH_CI             = 108;
exports.UTF16_SWEDISH_CI             = 109;
exports.UTF16_TURKISH_CI             = 110;
exports.UTF16_CZECH_CI               = 111;
exports.UTF16_DANISH_CI              = 112;
exports.UTF16_LITHUANIAN_CI          = 113;
exports.UTF16_SLOVAK_CI              = 114;
exports.UTF16_SPANISH2_CI            = 115;
exports.UTF16_ROMAN_CI               = 116;
exports.UTF16_PERSIAN_CI             = 117;
exports.UTF16_ESPERANTO_CI           = 118;
exports.UTF16_HUNGARIAN_CI           = 119;
exports.UTF16_SINHALA_CI             = 120;
exports.UTF16_GERMAN2_CI             = 121;
exports.UTF16_CROATIAN_MYSQL561_CI   = 122;
exports.UTF16_UNICODE_520_CI         = 123;
exports.UTF16_VIETNAMESE_CI          = 124;
exports.UCS2_UNICODE_CI              = 128;
exports.UCS2_ICELANDIC_CI            = 129;
exports.UCS2_LATVIAN_CI              = 130;
exports.UCS2_ROMANIAN_CI             = 131;
exports.UCS2_SLOVENIAN_CI            = 132;
exports.UCS2_POLISH_CI               = 133;
exports.UCS2_ESTONIAN_CI             = 134;
exports.UCS2_SPANISH_CI              = 135;
exports.UCS2_SWEDISH_CI              = 136;
exports.UCS2_TURKISH_CI              = 137;
exports.UCS2_CZECH_CI                = 138;
exports.UCS2_DANISH_CI               = 139;
exports.UCS2_LITHUANIAN_CI           = 140;
exports.UCS2_SLOVAK_CI               = 141;
exports.UCS2_SPANISH2_CI             = 142;
exports.UCS2_ROMAN_CI                = 143;
exports.UCS2_PERSIAN_CI              = 144;
exports.UCS2_ESPERANTO_CI            = 145;
exports.UCS2_HUNGARIAN_CI            = 146;
exports.UCS2_SINHALA_CI              = 147;
exports.UCS2_GERMAN2_CI              = 148;
exports.UCS2_CROATIAN_MYSQL561_CI    = 149;
exports.UCS2_UNICODE_520_CI          = 150;
exports.UCS2_VIETNAMESE_CI           = 151;
exports.UCS2_GENERAL_MYSQL500_CI     = 159;
exports.UTF32_UNICODE_CI             = 160;
exports.UTF32_ICELANDIC_CI           = 161;
exports.UTF32_LATVIAN_CI             = 162;
exports.UTF32_ROMANIAN_CI            = 163;
exports.UTF32_SLOVENIAN_CI           = 164;
exports.UTF32_POLISH_CI              = 165;
exports.UTF32_ESTONIAN_CI            = 166;
exports.UTF32_SPANISH_CI             = 167;
exports.UTF32_SWEDISH_CI             = 168;
exports.UTF32_TURKISH_CI             = 169;
exports.UTF32_CZECH_CI               = 170;
exports.UTF32_DANISH_CI              = 171;
exports.UTF32_LITHUANIAN_CI          = 172;
exports.UTF32_SLOVAK_CI              = 173;
exports.UTF32_SPANISH2_CI            = 174;
exports.UTF32_ROMAN_CI               = 175;
exports.UTF32_PERSIAN_CI             = 176;
exports.UTF32_ESPERANTO_CI           = 177;
exports.UTF32_HUNGARIAN_CI           = 178;
exports.UTF32_SINHALA_CI             = 179;
exports.UTF32_GERMAN2_CI             = 180;
exports.UTF32_CROATIAN_MYSQL561_CI   = 181;
exports.UTF32_UNICODE_520_CI         = 182;
exports.UTF32_VIETNAMESE_CI          = 183;
exports.UTF8_UNICODE_CI              = 192;
exports.UTF8_ICELANDIC_CI            = 193;
exports.UTF8_LATVIAN_CI              = 194;
exports.UTF8_ROMANIAN_CI             = 195;
exports.UTF8_SLOVENIAN_CI            = 196;
exports.UTF8_POLISH_CI               = 197;
exports.UTF8_ESTONIAN_CI             = 198;
exports.UTF8_SPANISH_CI              = 199;
exports.UTF8_SWEDISH_CI              = 200;
exports.UTF8_TURKISH_CI              = 201;
exports.UTF8_CZECH_CI                = 202;
exports.UTF8_DANISH_CI               = 203;
exports.UTF8_LITHUANIAN_CI           = 204;
exports.UTF8_SLOVAK_CI               = 205;
exports.UTF8_SPANISH2_CI             = 206;
exports.UTF8_ROMAN_CI                = 207;
exports.UTF8_PERSIAN_CI              = 208;
exports.UTF8_ESPERANTO_CI            = 209;
exports.UTF8_HUNGARIAN_CI            = 210;
exports.UTF8_SINHALA_CI              = 211;
exports.UTF8_GERMAN2_CI              = 212;
exports.UTF8_CROATIAN_MYSQL561_CI    = 213;
exports.UTF8_UNICODE_520_CI          = 214;
exports.UTF8_VIETNAMESE_CI           = 215;
exports.UTF8_GENERAL_MYSQL500_CI     = 223;
exports.UTF8MB4_UNICODE_CI           = 224;
exports.UTF8MB4_ICELANDIC_CI         = 225;
exports.UTF8MB4_LATVIAN_CI           = 226;
exports.UTF8MB4_ROMANIAN_CI          = 227;
exports.UTF8MB4_SLOVENIAN_CI         = 228;
exports.UTF8MB4_POLISH_CI            = 229;
exports.UTF8MB4_ESTONIAN_CI          = 230;
exports.UTF8MB4_SPANISH_CI           = 231;
exports.UTF8MB4_SWEDISH_CI           = 232;
exports.UTF8MB4_TURKISH_CI           = 233;
exports.UTF8MB4_CZECH_CI             = 234;
exports.UTF8MB4_DANISH_CI            = 235;
exports.UTF8MB4_LITHUANIAN_CI        = 236;
exports.UTF8MB4_SLOVAK_CI            = 237;
exports.UTF8MB4_SPANISH2_CI          = 238;
exports.UTF8MB4_ROMAN_CI             = 239;
exports.UTF8MB4_PERSIAN_CI           = 240;
exports.UTF8MB4_ESPERANTO_CI         = 241;
exports.UTF8MB4_HUNGARIAN_CI         = 242;
exports.UTF8MB4_SINHALA_CI           = 243;
exports.UTF8MB4_GERMAN2_CI           = 244;
exports.UTF8MB4_CROATIAN_MYSQL561_CI = 245;
exports.UTF8MB4_UNICODE_520_CI       = 246;
exports.UTF8MB4_VIETNAMESE_CI        = 247;
exports.UTF8_GENERAL50_CI            = 253;

// short aliases
exports.ARMSCII8 = exports.ARMSCII8_GENERAL_CI;
exports.ASCII    = exports.ASCII_GENERAL_CI;
exports.BIG5     = exports.BIG5_CHINESE_CI;
exports.BINARY   = exports.BINARY;
exports.CP1250   = exports.CP1250_GENERAL_CI;
exports.CP1251   = exports.CP1251_GENERAL_CI;
exports.CP1256   = exports.CP1256_GENERAL_CI;
exports.CP1257   = exports.CP1257_GENERAL_CI;
exports.CP866    = exports.CP866_GENERAL_CI;
exports.CP850    = exports.CP850_GENERAL_CI;
exports.CP852    = exports.CP852_GENERAL_CI;
exports.CP932    = exports.CP932_JAPANESE_CI;
exports.DEC8     = exports.DEC8_SWEDISH_CI;
exports.EUCJPMS  = exports.EUCJPMS_JAPANESE_CI;
exports.EUCKR    = exports.EUCKR_KOREAN_CI;
exports.GB2312   = exports.GB2312_CHINESE_CI;
exports.GBK      = exports.GBK_CHINESE_CI;
exports.GEOSTD8  = exports.GEOSTD8_GENERAL_CI;
exports.GREEK    = exports.GREEK_GENERAL_CI;
exports.HEBREW   = exports.HEBREW_GENERAL_CI;
exports.HP8      = exports.HP8_ENGLISH_CI;
exports.KEYBCS2  = exports.KEYBCS2_GENERAL_CI;
exports.KOI8R    = exports.KOI8R_GENERAL_CI;
exports.KOI8U    = exports.KOI8U_GENERAL_CI;
exports.LATIN1   = exports.LATIN1_SWEDISH_CI;
exports.LATIN2   = exports.LATIN2_GENERAL_CI;
exports.LATIN5   = exports.LATIN5_TURKISH_CI;
exports.LATIN7   = exports.LATIN7_GENERAL_CI;
exports.MACCE    = exports.MACCE_GENERAL_CI;
exports.MACROMAN = exports.MACROMAN_GENERAL_CI;
exports.SJIS     = exports.SJIS_JAPANESE_CI;
exports.SWE7     = exports.SWE7_SWEDISH_CI;
exports.TIS620   = exports.TIS620_THAI_CI;
exports.UCS2     = exports.UCS2_GENERAL_CI;
exports.UJIS     = exports.UJIS_JAPANESE_CI;
exports.UTF16    = exports.UTF16_GENERAL_CI;
exports.UTF16LE  = exports.UTF16LE_GENERAL_CI;
exports.UTF8     = exports.UTF8_GENERAL_CI;
exports.UTF8MB4  = exports.UTF8MB4_GENERAL_CI;
exports.UTF32    = exports.UTF32_GENERAL_CI;

},{}],24:[function(require,module,exports){
// Manually extracted from mysql-5.5.23/include/mysql_com.h
exports.CLIENT_LONG_PASSWORD     = 1; /* new more secure passwords */
exports.CLIENT_FOUND_ROWS        = 2; /* Found instead of affected rows */
exports.CLIENT_LONG_FLAG         = 4; /* Get all column flags */
exports.CLIENT_CONNECT_WITH_DB   = 8; /* One can specify db on connect */
exports.CLIENT_NO_SCHEMA         = 16; /* Don't allow database.table.column */
exports.CLIENT_COMPRESS          = 32; /* Can use compression protocol */
exports.CLIENT_ODBC              = 64; /* Odbc client */
exports.CLIENT_LOCAL_FILES       = 128; /* Can use LOAD DATA LOCAL */
exports.CLIENT_IGNORE_SPACE      = 256; /* Ignore spaces before '(' */
exports.CLIENT_PROTOCOL_41       = 512; /* New 4.1 protocol */
exports.CLIENT_INTERACTIVE       = 1024; /* This is an interactive client */
exports.CLIENT_SSL               = 2048; /* Switch to SSL after handshake */
exports.CLIENT_IGNORE_SIGPIPE    = 4096;    /* IGNORE sigpipes */
exports.CLIENT_TRANSACTIONS      = 8192; /* Client knows about transactions */
exports.CLIENT_RESERVED          = 16384;   /* Old flag for 4.1 protocol  */
exports.CLIENT_SECURE_CONNECTION = 32768;  /* New 4.1 authentication */

exports.CLIENT_MULTI_STATEMENTS = 65536; /* Enable/disable multi-stmt support */
exports.CLIENT_MULTI_RESULTS    = 131072; /* Enable/disable multi-results */
exports.CLIENT_PS_MULTI_RESULTS = 262144; /* Multi-results in PS-protocol */

exports.CLIENT_PLUGIN_AUTH = 524288; /* Client supports plugin authentication */

exports.CLIENT_SSL_VERIFY_SERVER_CERT = 1073741824;
exports.CLIENT_REMEMBER_OPTIONS       = 2147483648;

},{}],25:[function(require,module,exports){
/**
 * MySQL error constants
 *
 * Extracted from version 5.7.17
 *
 * !! Generated by generate-error-constants.js, do not modify by hand !!
 */

exports.EE_CANTCREATEFILE                                                                = 1;
exports.EE_READ                                                                          = 2;
exports.EE_WRITE                                                                         = 3;
exports.EE_BADCLOSE                                                                      = 4;
exports.EE_OUTOFMEMORY                                                                   = 5;
exports.EE_DELETE                                                                        = 6;
exports.EE_LINK                                                                          = 7;
exports.EE_EOFERR                                                                        = 9;
exports.EE_CANTLOCK                                                                      = 10;
exports.EE_CANTUNLOCK                                                                    = 11;
exports.EE_DIR                                                                           = 12;
exports.EE_STAT                                                                          = 13;
exports.EE_CANT_CHSIZE                                                                   = 14;
exports.EE_CANT_OPEN_STREAM                                                              = 15;
exports.EE_GETWD                                                                         = 16;
exports.EE_SETWD                                                                         = 17;
exports.EE_LINK_WARNING                                                                  = 18;
exports.EE_OPEN_WARNING                                                                  = 19;
exports.EE_DISK_FULL                                                                     = 20;
exports.EE_CANT_MKDIR                                                                    = 21;
exports.EE_UNKNOWN_CHARSET                                                               = 22;
exports.EE_OUT_OF_FILERESOURCES                                                          = 23;
exports.EE_CANT_READLINK                                                                 = 24;
exports.EE_CANT_SYMLINK                                                                  = 25;
exports.EE_REALPATH                                                                      = 26;
exports.EE_SYNC                                                                          = 27;
exports.EE_UNKNOWN_COLLATION                                                             = 28;
exports.EE_FILENOTFOUND                                                                  = 29;
exports.EE_FILE_NOT_CLOSED                                                               = 30;
exports.EE_CHANGE_OWNERSHIP                                                              = 31;
exports.EE_CHANGE_PERMISSIONS                                                            = 32;
exports.EE_CANT_SEEK                                                                     = 33;
exports.EE_CAPACITY_EXCEEDED                                                             = 34;
exports.HA_ERR_KEY_NOT_FOUND                                                             = 120;
exports.HA_ERR_FOUND_DUPP_KEY                                                            = 121;
exports.HA_ERR_INTERNAL_ERROR                                                            = 122;
exports.HA_ERR_RECORD_CHANGED                                                            = 123;
exports.HA_ERR_WRONG_INDEX                                                               = 124;
exports.HA_ERR_CRASHED                                                                   = 126;
exports.HA_ERR_WRONG_IN_RECORD                                                           = 127;
exports.HA_ERR_OUT_OF_MEM                                                                = 128;
exports.HA_ERR_NOT_A_TABLE                                                               = 130;
exports.HA_ERR_WRONG_COMMAND                                                             = 131;
exports.HA_ERR_OLD_FILE                                                                  = 132;
exports.HA_ERR_NO_ACTIVE_RECORD                                                          = 133;
exports.HA_ERR_RECORD_DELETED                                                            = 134;
exports.HA_ERR_RECORD_FILE_FULL                                                          = 135;
exports.HA_ERR_INDEX_FILE_FULL                                                           = 136;
exports.HA_ERR_END_OF_FILE                                                               = 137;
exports.HA_ERR_UNSUPPORTED                                                               = 138;
exports.HA_ERR_TOO_BIG_ROW                                                               = 139;
exports.HA_WRONG_CREATE_OPTION                                                           = 140;
exports.HA_ERR_FOUND_DUPP_UNIQUE                                                         = 141;
exports.HA_ERR_UNKNOWN_CHARSET                                                           = 142;
exports.HA_ERR_WRONG_MRG_TABLE_DEF                                                       = 143;
exports.HA_ERR_CRASHED_ON_REPAIR                                                         = 144;
exports.HA_ERR_CRASHED_ON_USAGE                                                          = 145;
exports.HA_ERR_LOCK_WAIT_TIMEOUT                                                         = 146;
exports.HA_ERR_LOCK_TABLE_FULL                                                           = 147;
exports.HA_ERR_READ_ONLY_TRANSACTION                                                     = 148;
exports.HA_ERR_LOCK_DEADLOCK                                                             = 149;
exports.HA_ERR_CANNOT_ADD_FOREIGN                                                        = 150;
exports.HA_ERR_NO_REFERENCED_ROW                                                         = 151;
exports.HA_ERR_ROW_IS_REFERENCED                                                         = 152;
exports.HA_ERR_NO_SAVEPOINT                                                              = 153;
exports.HA_ERR_NON_UNIQUE_BLOCK_SIZE                                                     = 154;
exports.HA_ERR_NO_SUCH_TABLE                                                             = 155;
exports.HA_ERR_TABLE_EXIST                                                               = 156;
exports.HA_ERR_NO_CONNECTION                                                             = 157;
exports.HA_ERR_NULL_IN_SPATIAL                                                           = 158;
exports.HA_ERR_TABLE_DEF_CHANGED                                                         = 159;
exports.HA_ERR_NO_PARTITION_FOUND                                                        = 160;
exports.HA_ERR_RBR_LOGGING_FAILED                                                        = 161;
exports.HA_ERR_DROP_INDEX_FK                                                             = 162;
exports.HA_ERR_FOREIGN_DUPLICATE_KEY                                                     = 163;
exports.HA_ERR_TABLE_NEEDS_UPGRADE                                                       = 164;
exports.HA_ERR_TABLE_READONLY                                                            = 165;
exports.HA_ERR_AUTOINC_READ_FAILED                                                       = 166;
exports.HA_ERR_AUTOINC_ERANGE                                                            = 167;
exports.HA_ERR_GENERIC                                                                   = 168;
exports.HA_ERR_RECORD_IS_THE_SAME                                                        = 169;
exports.HA_ERR_LOGGING_IMPOSSIBLE                                                        = 170;
exports.HA_ERR_CORRUPT_EVENT                                                             = 171;
exports.HA_ERR_NEW_FILE                                                                  = 172;
exports.HA_ERR_ROWS_EVENT_APPLY                                                          = 173;
exports.HA_ERR_INITIALIZATION                                                            = 174;
exports.HA_ERR_FILE_TOO_SHORT                                                            = 175;
exports.HA_ERR_WRONG_CRC                                                                 = 176;
exports.HA_ERR_TOO_MANY_CONCURRENT_TRXS                                                  = 177;
exports.HA_ERR_NOT_IN_LOCK_PARTITIONS                                                    = 178;
exports.HA_ERR_INDEX_COL_TOO_LONG                                                        = 179;
exports.HA_ERR_INDEX_CORRUPT                                                             = 180;
exports.HA_ERR_UNDO_REC_TOO_BIG                                                          = 181;
exports.HA_FTS_INVALID_DOCID                                                             = 182;
exports.HA_ERR_TABLE_IN_FK_CHECK                                                         = 183;
exports.HA_ERR_TABLESPACE_EXISTS                                                         = 184;
exports.HA_ERR_TOO_MANY_FIELDS                                                           = 185;
exports.HA_ERR_ROW_IN_WRONG_PARTITION                                                    = 186;
exports.HA_ERR_INNODB_READ_ONLY                                                          = 187;
exports.HA_ERR_FTS_EXCEED_RESULT_CACHE_LIMIT                                             = 188;
exports.HA_ERR_TEMP_FILE_WRITE_FAILURE                                                   = 189;
exports.HA_ERR_INNODB_FORCED_RECOVERY                                                    = 190;
exports.HA_ERR_FTS_TOO_MANY_WORDS_IN_PHRASE                                              = 191;
exports.HA_ERR_FK_DEPTH_EXCEEDED                                                         = 192;
exports.HA_MISSING_CREATE_OPTION                                                         = 193;
exports.HA_ERR_SE_OUT_OF_MEMORY                                                          = 194;
exports.HA_ERR_TABLE_CORRUPT                                                             = 195;
exports.HA_ERR_QUERY_INTERRUPTED                                                         = 196;
exports.HA_ERR_TABLESPACE_MISSING                                                        = 197;
exports.HA_ERR_TABLESPACE_IS_NOT_EMPTY                                                   = 198;
exports.HA_ERR_WRONG_FILE_NAME                                                           = 199;
exports.HA_ERR_NOT_ALLOWED_COMMAND                                                       = 200;
exports.HA_ERR_COMPUTE_FAILED                                                            = 201;
exports.ER_HASHCHK                                                                       = 1000;
exports.ER_NISAMCHK                                                                      = 1001;
exports.ER_NO                                                                            = 1002;
exports.ER_YES                                                                           = 1003;
exports.ER_CANT_CREATE_FILE                                                              = 1004;
exports.ER_CANT_CREATE_TABLE                                                             = 1005;
exports.ER_CANT_CREATE_DB                                                                = 1006;
exports.ER_DB_CREATE_EXISTS                                                              = 1007;
exports.ER_DB_DROP_EXISTS                                                                = 1008;
exports.ER_DB_DROP_DELETE                                                                = 1009;
exports.ER_DB_DROP_RMDIR                                                                 = 1010;
exports.ER_CANT_DELETE_FILE                                                              = 1011;
exports.ER_CANT_FIND_SYSTEM_REC                                                          = 1012;
exports.ER_CANT_GET_STAT                                                                 = 1013;
exports.ER_CANT_GET_WD                                                                   = 1014;
exports.ER_CANT_LOCK                                                                     = 1015;
exports.ER_CANT_OPEN_FILE                                                                = 1016;
exports.ER_FILE_NOT_FOUND                                                                = 1017;
exports.ER_CANT_READ_DIR                                                                 = 1018;
exports.ER_CANT_SET_WD                                                                   = 1019;
exports.ER_CHECKREAD                                                                     = 1020;
exports.ER_DISK_FULL                                                                     = 1021;
exports.ER_DUP_KEY                                                                       = 1022;
exports.ER_ERROR_ON_CLOSE                                                                = 1023;
exports.ER_ERROR_ON_READ                                                                 = 1024;
exports.ER_ERROR_ON_RENAME                                                               = 1025;
exports.ER_ERROR_ON_WRITE                                                                = 1026;
exports.ER_FILE_USED                                                                     = 1027;
exports.ER_FILSORT_ABORT                                                                 = 1028;
exports.ER_FORM_NOT_FOUND                                                                = 1029;
exports.ER_GET_ERRNO                                                                     = 1030;
exports.ER_ILLEGAL_HA                                                                    = 1031;
exports.ER_KEY_NOT_FOUND                                                                 = 1032;
exports.ER_NOT_FORM_FILE                                                                 = 1033;
exports.ER_NOT_KEYFILE                                                                   = 1034;
exports.ER_OLD_KEYFILE                                                                   = 1035;
exports.ER_OPEN_AS_READONLY                                                              = 1036;
exports.ER_OUTOFMEMORY                                                                   = 1037;
exports.ER_OUT_OF_SORTMEMORY                                                             = 1038;
exports.ER_UNEXPECTED_EOF                                                                = 1039;
exports.ER_CON_COUNT_ERROR                                                               = 1040;
exports.ER_OUT_OF_RESOURCES                                                              = 1041;
exports.ER_BAD_HOST_ERROR                                                                = 1042;
exports.ER_HANDSHAKE_ERROR                                                               = 1043;
exports.ER_DBACCESS_DENIED_ERROR                                                         = 1044;
exports.ER_ACCESS_DENIED_ERROR                                                           = 1045;
exports.ER_NO_DB_ERROR                                                                   = 1046;
exports.ER_UNKNOWN_COM_ERROR                                                             = 1047;
exports.ER_BAD_NULL_ERROR                                                                = 1048;
exports.ER_BAD_DB_ERROR                                                                  = 1049;
exports.ER_TABLE_EXISTS_ERROR                                                            = 1050;
exports.ER_BAD_TABLE_ERROR                                                               = 1051;
exports.ER_NON_UNIQ_ERROR                                                                = 1052;
exports.ER_SERVER_SHUTDOWN                                                               = 1053;
exports.ER_BAD_FIELD_ERROR                                                               = 1054;
exports.ER_WRONG_FIELD_WITH_GROUP                                                        = 1055;
exports.ER_WRONG_GROUP_FIELD                                                             = 1056;
exports.ER_WRONG_SUM_SELECT                                                              = 1057;
exports.ER_WRONG_VALUE_COUNT                                                             = 1058;
exports.ER_TOO_LONG_IDENT                                                                = 1059;
exports.ER_DUP_FIELDNAME                                                                 = 1060;
exports.ER_DUP_KEYNAME                                                                   = 1061;
exports.ER_DUP_ENTRY                                                                     = 1062;
exports.ER_WRONG_FIELD_SPEC                                                              = 1063;
exports.ER_PARSE_ERROR                                                                   = 1064;
exports.ER_EMPTY_QUERY                                                                   = 1065;
exports.ER_NONUNIQ_TABLE                                                                 = 1066;
exports.ER_INVALID_DEFAULT                                                               = 1067;
exports.ER_MULTIPLE_PRI_KEY                                                              = 1068;
exports.ER_TOO_MANY_KEYS                                                                 = 1069;
exports.ER_TOO_MANY_KEY_PARTS                                                            = 1070;
exports.ER_TOO_LONG_KEY                                                                  = 1071;
exports.ER_KEY_COLUMN_DOES_NOT_EXITS                                                     = 1072;
exports.ER_BLOB_USED_AS_KEY                                                              = 1073;
exports.ER_TOO_BIG_FIELDLENGTH                                                           = 1074;
exports.ER_WRONG_AUTO_KEY                                                                = 1075;
exports.ER_READY                                                                         = 1076;
exports.ER_NORMAL_SHUTDOWN                                                               = 1077;
exports.ER_GOT_SIGNAL                                                                    = 1078;
exports.ER_SHUTDOWN_COMPLETE                                                             = 1079;
exports.ER_FORCING_CLOSE                                                                 = 1080;
exports.ER_IPSOCK_ERROR                                                                  = 1081;
exports.ER_NO_SUCH_INDEX                                                                 = 1082;
exports.ER_WRONG_FIELD_TERMINATORS                                                       = 1083;
exports.ER_BLOBS_AND_NO_TERMINATED                                                       = 1084;
exports.ER_TEXTFILE_NOT_READABLE                                                         = 1085;
exports.ER_FILE_EXISTS_ERROR                                                             = 1086;
exports.ER_LOAD_INFO                                                                     = 1087;
exports.ER_ALTER_INFO                                                                    = 1088;
exports.ER_WRONG_SUB_KEY                                                                 = 1089;
exports.ER_CANT_REMOVE_ALL_FIELDS                                                        = 1090;
exports.ER_CANT_DROP_FIELD_OR_KEY                                                        = 1091;
exports.ER_INSERT_INFO                                                                   = 1092;
exports.ER_UPDATE_TABLE_USED                                                             = 1093;
exports.ER_NO_SUCH_THREAD                                                                = 1094;
exports.ER_KILL_DENIED_ERROR                                                             = 1095;
exports.ER_NO_TABLES_USED                                                                = 1096;
exports.ER_TOO_BIG_SET                                                                   = 1097;
exports.ER_NO_UNIQUE_LOGFILE                                                             = 1098;
exports.ER_TABLE_NOT_LOCKED_FOR_WRITE                                                    = 1099;
exports.ER_TABLE_NOT_LOCKED                                                              = 1100;
exports.ER_BLOB_CANT_HAVE_DEFAULT                                                        = 1101;
exports.ER_WRONG_DB_NAME                                                                 = 1102;
exports.ER_WRONG_TABLE_NAME                                                              = 1103;
exports.ER_TOO_BIG_SELECT                                                                = 1104;
exports.ER_UNKNOWN_ERROR                                                                 = 1105;
exports.ER_UNKNOWN_PROCEDURE                                                             = 1106;
exports.ER_WRONG_PARAMCOUNT_TO_PROCEDURE                                                 = 1107;
exports.ER_WRONG_PARAMETERS_TO_PROCEDURE                                                 = 1108;
exports.ER_UNKNOWN_TABLE                                                                 = 1109;
exports.ER_FIELD_SPECIFIED_TWICE                                                         = 1110;
exports.ER_INVALID_GROUP_FUNC_USE                                                        = 1111;
exports.ER_UNSUPPORTED_EXTENSION                                                         = 1112;
exports.ER_TABLE_MUST_HAVE_COLUMNS                                                       = 1113;
exports.ER_RECORD_FILE_FULL                                                              = 1114;
exports.ER_UNKNOWN_CHARACTER_SET                                                         = 1115;
exports.ER_TOO_MANY_TABLES                                                               = 1116;
exports.ER_TOO_MANY_FIELDS                                                               = 1117;
exports.ER_TOO_BIG_ROWSIZE                                                               = 1118;
exports.ER_STACK_OVERRUN                                                                 = 1119;
exports.ER_WRONG_OUTER_JOIN                                                              = 1120;
exports.ER_NULL_COLUMN_IN_INDEX                                                          = 1121;
exports.ER_CANT_FIND_UDF                                                                 = 1122;
exports.ER_CANT_INITIALIZE_UDF                                                           = 1123;
exports.ER_UDF_NO_PATHS                                                                  = 1124;
exports.ER_UDF_EXISTS                                                                    = 1125;
exports.ER_CANT_OPEN_LIBRARY                                                             = 1126;
exports.ER_CANT_FIND_DL_ENTRY                                                            = 1127;
exports.ER_FUNCTION_NOT_DEFINED                                                          = 1128;
exports.ER_HOST_IS_BLOCKED                                                               = 1129;
exports.ER_HOST_NOT_PRIVILEGED                                                           = 1130;
exports.ER_PASSWORD_ANONYMOUS_USER                                                       = 1131;
exports.ER_PASSWORD_NOT_ALLOWED                                                          = 1132;
exports.ER_PASSWORD_NO_MATCH                                                             = 1133;
exports.ER_UPDATE_INFO                                                                   = 1134;
exports.ER_CANT_CREATE_THREAD                                                            = 1135;
exports.ER_WRONG_VALUE_COUNT_ON_ROW                                                      = 1136;
exports.ER_CANT_REOPEN_TABLE                                                             = 1137;
exports.ER_INVALID_USE_OF_NULL                                                           = 1138;
exports.ER_REGEXP_ERROR                                                                  = 1139;
exports.ER_MIX_OF_GROUP_FUNC_AND_FIELDS                                                  = 1140;
exports.ER_NONEXISTING_GRANT                                                             = 1141;
exports.ER_TABLEACCESS_DENIED_ERROR                                                      = 1142;
exports.ER_COLUMNACCESS_DENIED_ERROR                                                     = 1143;
exports.ER_ILLEGAL_GRANT_FOR_TABLE                                                       = 1144;
exports.ER_GRANT_WRONG_HOST_OR_USER                                                      = 1145;
exports.ER_NO_SUCH_TABLE                                                                 = 1146;
exports.ER_NONEXISTING_TABLE_GRANT                                                       = 1147;
exports.ER_NOT_ALLOWED_COMMAND                                                           = 1148;
exports.ER_SYNTAX_ERROR                                                                  = 1149;
exports.ER_DELAYED_CANT_CHANGE_LOCK                                                      = 1150;
exports.ER_TOO_MANY_DELAYED_THREADS                                                      = 1151;
exports.ER_ABORTING_CONNECTION                                                           = 1152;
exports.ER_NET_PACKET_TOO_LARGE                                                          = 1153;
exports.ER_NET_READ_ERROR_FROM_PIPE                                                      = 1154;
exports.ER_NET_FCNTL_ERROR                                                               = 1155;
exports.ER_NET_PACKETS_OUT_OF_ORDER                                                      = 1156;
exports.ER_NET_UNCOMPRESS_ERROR                                                          = 1157;
exports.ER_NET_READ_ERROR                                                                = 1158;
exports.ER_NET_READ_INTERRUPTED                                                          = 1159;
exports.ER_NET_ERROR_ON_WRITE                                                            = 1160;
exports.ER_NET_WRITE_INTERRUPTED                                                         = 1161;
exports.ER_TOO_LONG_STRING                                                               = 1162;
exports.ER_TABLE_CANT_HANDLE_BLOB                                                        = 1163;
exports.ER_TABLE_CANT_HANDLE_AUTO_INCREMENT                                              = 1164;
exports.ER_DELAYED_INSERT_TABLE_LOCKED                                                   = 1165;
exports.ER_WRONG_COLUMN_NAME                                                             = 1166;
exports.ER_WRONG_KEY_COLUMN                                                              = 1167;
exports.ER_WRONG_MRG_TABLE                                                               = 1168;
exports.ER_DUP_UNIQUE                                                                    = 1169;
exports.ER_BLOB_KEY_WITHOUT_LENGTH                                                       = 1170;
exports.ER_PRIMARY_CANT_HAVE_NULL                                                        = 1171;
exports.ER_TOO_MANY_ROWS                                                                 = 1172;
exports.ER_REQUIRES_PRIMARY_KEY                                                          = 1173;
exports.ER_NO_RAID_COMPILED                                                              = 1174;
exports.ER_UPDATE_WITHOUT_KEY_IN_SAFE_MODE                                               = 1175;
exports.ER_KEY_DOES_NOT_EXITS                                                            = 1176;
exports.ER_CHECK_NO_SUCH_TABLE                                                           = 1177;
exports.ER_CHECK_NOT_IMPLEMENTED                                                         = 1178;
exports.ER_CANT_DO_THIS_DURING_AN_TRANSACTION                                            = 1179;
exports.ER_ERROR_DURING_COMMIT                                                           = 1180;
exports.ER_ERROR_DURING_ROLLBACK                                                         = 1181;
exports.ER_ERROR_DURING_FLUSH_LOGS                                                       = 1182;
exports.ER_ERROR_DURING_CHECKPOINT                                                       = 1183;
exports.ER_NEW_ABORTING_CONNECTION                                                       = 1184;
exports.ER_DUMP_NOT_IMPLEMENTED                                                          = 1185;
exports.ER_FLUSH_MASTER_BINLOG_CLOSED                                                    = 1186;
exports.ER_INDEX_REBUILD                                                                 = 1187;
exports.ER_MASTER                                                                        = 1188;
exports.ER_MASTER_NET_READ                                                               = 1189;
exports.ER_MASTER_NET_WRITE                                                              = 1190;
exports.ER_FT_MATCHING_KEY_NOT_FOUND                                                     = 1191;
exports.ER_LOCK_OR_ACTIVE_TRANSACTION                                                    = 1192;
exports.ER_UNKNOWN_SYSTEM_VARIABLE                                                       = 1193;
exports.ER_CRASHED_ON_USAGE                                                              = 1194;
exports.ER_CRASHED_ON_REPAIR                                                             = 1195;
exports.ER_WARNING_NOT_COMPLETE_ROLLBACK                                                 = 1196;
exports.ER_TRANS_CACHE_FULL                                                              = 1197;
exports.ER_SLAVE_MUST_STOP                                                               = 1198;
exports.ER_SLAVE_NOT_RUNNING                                                             = 1199;
exports.ER_BAD_SLAVE                                                                     = 1200;
exports.ER_MASTER_INFO                                                                   = 1201;
exports.ER_SLAVE_THREAD                                                                  = 1202;
exports.ER_TOO_MANY_USER_CONNECTIONS                                                     = 1203;
exports.ER_SET_CONSTANTS_ONLY                                                            = 1204;
exports.ER_LOCK_WAIT_TIMEOUT                                                             = 1205;
exports.ER_LOCK_TABLE_FULL                                                               = 1206;
exports.ER_READ_ONLY_TRANSACTION                                                         = 1207;
exports.ER_DROP_DB_WITH_READ_LOCK                                                        = 1208;
exports.ER_CREATE_DB_WITH_READ_LOCK                                                      = 1209;
exports.ER_WRONG_ARGUMENTS                                                               = 1210;
exports.ER_NO_PERMISSION_TO_CREATE_USER                                                  = 1211;
exports.ER_UNION_TABLES_IN_DIFFERENT_DIR                                                 = 1212;
exports.ER_LOCK_DEADLOCK                                                                 = 1213;
exports.ER_TABLE_CANT_HANDLE_FT                                                          = 1214;
exports.ER_CANNOT_ADD_FOREIGN                                                            = 1215;
exports.ER_NO_REFERENCED_ROW                                                             = 1216;
exports.ER_ROW_IS_REFERENCED                                                             = 1217;
exports.ER_CONNECT_TO_MASTER                                                             = 1218;
exports.ER_QUERY_ON_MASTER                                                               = 1219;
exports.ER_ERROR_WHEN_EXECUTING_COMMAND                                                  = 1220;
exports.ER_WRONG_USAGE                                                                   = 1221;
exports.ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT                                             = 1222;
exports.ER_CANT_UPDATE_WITH_READLOCK                                                     = 1223;
exports.ER_MIXING_NOT_ALLOWED                                                            = 1224;
exports.ER_DUP_ARGUMENT                                                                  = 1225;
exports.ER_USER_LIMIT_REACHED                                                            = 1226;
exports.ER_SPECIFIC_ACCESS_DENIED_ERROR                                                  = 1227;
exports.ER_LOCAL_VARIABLE                                                                = 1228;
exports.ER_GLOBAL_VARIABLE                                                               = 1229;
exports.ER_NO_DEFAULT                                                                    = 1230;
exports.ER_WRONG_VALUE_FOR_VAR                                                           = 1231;
exports.ER_WRONG_TYPE_FOR_VAR                                                            = 1232;
exports.ER_VAR_CANT_BE_READ                                                              = 1233;
exports.ER_CANT_USE_OPTION_HERE                                                          = 1234;
exports.ER_NOT_SUPPORTED_YET                                                             = 1235;
exports.ER_MASTER_FATAL_ERROR_READING_BINLOG                                             = 1236;
exports.ER_SLAVE_IGNORED_TABLE                                                           = 1237;
exports.ER_INCORRECT_GLOBAL_LOCAL_VAR                                                    = 1238;
exports.ER_WRONG_FK_DEF                                                                  = 1239;
exports.ER_KEY_REF_DO_NOT_MATCH_TABLE_REF                                                = 1240;
exports.ER_OPERAND_COLUMNS                                                               = 1241;
exports.ER_SUBQUERY_NO_1_ROW                                                             = 1242;
exports.ER_UNKNOWN_STMT_HANDLER                                                          = 1243;
exports.ER_CORRUPT_HELP_DB                                                               = 1244;
exports.ER_CYCLIC_REFERENCE                                                              = 1245;
exports.ER_AUTO_CONVERT                                                                  = 1246;
exports.ER_ILLEGAL_REFERENCE                                                             = 1247;
exports.ER_DERIVED_MUST_HAVE_ALIAS                                                       = 1248;
exports.ER_SELECT_REDUCED                                                                = 1249;
exports.ER_TABLENAME_NOT_ALLOWED_HERE                                                    = 1250;
exports.ER_NOT_SUPPORTED_AUTH_MODE                                                       = 1251;
exports.ER_SPATIAL_CANT_HAVE_NULL                                                        = 1252;
exports.ER_COLLATION_CHARSET_MISMATCH                                                    = 1253;
exports.ER_SLAVE_WAS_RUNNING                                                             = 1254;
exports.ER_SLAVE_WAS_NOT_RUNNING                                                         = 1255;
exports.ER_TOO_BIG_FOR_UNCOMPRESS                                                        = 1256;
exports.ER_ZLIB_Z_MEM_ERROR                                                              = 1257;
exports.ER_ZLIB_Z_BUF_ERROR                                                              = 1258;
exports.ER_ZLIB_Z_DATA_ERROR                                                             = 1259;
exports.ER_CUT_VALUE_GROUP_CONCAT                                                        = 1260;
exports.ER_WARN_TOO_FEW_RECORDS                                                          = 1261;
exports.ER_WARN_TOO_MANY_RECORDS                                                         = 1262;
exports.ER_WARN_NULL_TO_NOTNULL                                                          = 1263;
exports.ER_WARN_DATA_OUT_OF_RANGE                                                        = 1264;
exports.WARN_DATA_TRUNCATED                                                              = 1265;
exports.ER_WARN_USING_OTHER_HANDLER                                                      = 1266;
exports.ER_CANT_AGGREGATE_2COLLATIONS                                                    = 1267;
exports.ER_DROP_USER                                                                     = 1268;
exports.ER_REVOKE_GRANTS                                                                 = 1269;
exports.ER_CANT_AGGREGATE_3COLLATIONS                                                    = 1270;
exports.ER_CANT_AGGREGATE_NCOLLATIONS                                                    = 1271;
exports.ER_VARIABLE_IS_NOT_STRUCT                                                        = 1272;
exports.ER_UNKNOWN_COLLATION                                                             = 1273;
exports.ER_SLAVE_IGNORED_SSL_PARAMS                                                      = 1274;
exports.ER_SERVER_IS_IN_SECURE_AUTH_MODE                                                 = 1275;
exports.ER_WARN_FIELD_RESOLVED                                                           = 1276;
exports.ER_BAD_SLAVE_UNTIL_COND                                                          = 1277;
exports.ER_MISSING_SKIP_SLAVE                                                            = 1278;
exports.ER_UNTIL_COND_IGNORED                                                            = 1279;
exports.ER_WRONG_NAME_FOR_INDEX                                                          = 1280;
exports.ER_WRONG_NAME_FOR_CATALOG                                                        = 1281;
exports.ER_WARN_QC_RESIZE                                                                = 1282;
exports.ER_BAD_FT_COLUMN                                                                 = 1283;
exports.ER_UNKNOWN_KEY_CACHE                                                             = 1284;
exports.ER_WARN_HOSTNAME_WONT_WORK                                                       = 1285;
exports.ER_UNKNOWN_STORAGE_ENGINE                                                        = 1286;
exports.ER_WARN_DEPRECATED_SYNTAX                                                        = 1287;
exports.ER_NON_UPDATABLE_TABLE                                                           = 1288;
exports.ER_FEATURE_DISABLED                                                              = 1289;
exports.ER_OPTION_PREVENTS_STATEMENT                                                     = 1290;
exports.ER_DUPLICATED_VALUE_IN_TYPE                                                      = 1291;
exports.ER_TRUNCATED_WRONG_VALUE                                                         = 1292;
exports.ER_TOO_MUCH_AUTO_TIMESTAMP_COLS                                                  = 1293;
exports.ER_INVALID_ON_UPDATE                                                             = 1294;
exports.ER_UNSUPPORTED_PS                                                                = 1295;
exports.ER_GET_ERRMSG                                                                    = 1296;
exports.ER_GET_TEMPORARY_ERRMSG                                                          = 1297;
exports.ER_UNKNOWN_TIME_ZONE                                                             = 1298;
exports.ER_WARN_INVALID_TIMESTAMP                                                        = 1299;
exports.ER_INVALID_CHARACTER_STRING                                                      = 1300;
exports.ER_WARN_ALLOWED_PACKET_OVERFLOWED                                                = 1301;
exports.ER_CONFLICTING_DECLARATIONS                                                      = 1302;
exports.ER_SP_NO_RECURSIVE_CREATE                                                        = 1303;
exports.ER_SP_ALREADY_EXISTS                                                             = 1304;
exports.ER_SP_DOES_NOT_EXIST                                                             = 1305;
exports.ER_SP_DROP_FAILED                                                                = 1306;
exports.ER_SP_STORE_FAILED                                                               = 1307;
exports.ER_SP_LILABEL_MISMATCH                                                           = 1308;
exports.ER_SP_LABEL_REDEFINE                                                             = 1309;
exports.ER_SP_LABEL_MISMATCH                                                             = 1310;
exports.ER_SP_UNINIT_VAR                                                                 = 1311;
exports.ER_SP_BADSELECT                                                                  = 1312;
exports.ER_SP_BADRETURN                                                                  = 1313;
exports.ER_SP_BADSTATEMENT                                                               = 1314;
exports.ER_UPDATE_LOG_DEPRECATED_IGNORED                                                 = 1315;
exports.ER_UPDATE_LOG_DEPRECATED_TRANSLATED                                              = 1316;
exports.ER_QUERY_INTERRUPTED                                                             = 1317;
exports.ER_SP_WRONG_NO_OF_ARGS                                                           = 1318;
exports.ER_SP_COND_MISMATCH                                                              = 1319;
exports.ER_SP_NORETURN                                                                   = 1320;
exports.ER_SP_NORETURNEND                                                                = 1321;
exports.ER_SP_BAD_CURSOR_QUERY                                                           = 1322;
exports.ER_SP_BAD_CURSOR_SELECT                                                          = 1323;
exports.ER_SP_CURSOR_MISMATCH                                                            = 1324;
exports.ER_SP_CURSOR_ALREADY_OPEN                                                        = 1325;
exports.ER_SP_CURSOR_NOT_OPEN                                                            = 1326;
exports.ER_SP_UNDECLARED_VAR                                                             = 1327;
exports.ER_SP_WRONG_NO_OF_FETCH_ARGS                                                     = 1328;
exports.ER_SP_FETCH_NO_DATA                                                              = 1329;
exports.ER_SP_DUP_PARAM                                                                  = 1330;
exports.ER_SP_DUP_VAR                                                                    = 1331;
exports.ER_SP_DUP_COND                                                                   = 1332;
exports.ER_SP_DUP_CURS                                                                   = 1333;
exports.ER_SP_CANT_ALTER                                                                 = 1334;
exports.ER_SP_SUBSELECT_NYI                                                              = 1335;
exports.ER_STMT_NOT_ALLOWED_IN_SF_OR_TRG                                                 = 1336;
exports.ER_SP_VARCOND_AFTER_CURSHNDLR                                                    = 1337;
exports.ER_SP_CURSOR_AFTER_HANDLER                                                       = 1338;
exports.ER_SP_CASE_NOT_FOUND                                                             = 1339;
exports.ER_FPARSER_TOO_BIG_FILE                                                          = 1340;
exports.ER_FPARSER_BAD_HEADER                                                            = 1341;
exports.ER_FPARSER_EOF_IN_COMMENT                                                        = 1342;
exports.ER_FPARSER_ERROR_IN_PARAMETER                                                    = 1343;
exports.ER_FPARSER_EOF_IN_UNKNOWN_PARAMETER                                              = 1344;
exports.ER_VIEW_NO_EXPLAIN                                                               = 1345;
exports.ER_FRM_UNKNOWN_TYPE                                                              = 1346;
exports.ER_WRONG_OBJECT                                                                  = 1347;
exports.ER_NONUPDATEABLE_COLUMN                                                          = 1348;
exports.ER_VIEW_SELECT_DERIVED                                                           = 1349;
exports.ER_VIEW_SELECT_CLAUSE                                                            = 1350;
exports.ER_VIEW_SELECT_VARIABLE                                                          = 1351;
exports.ER_VIEW_SELECT_TMPTABLE                                                          = 1352;
exports.ER_VIEW_WRONG_LIST                                                               = 1353;
exports.ER_WARN_VIEW_MERGE                                                               = 1354;
exports.ER_WARN_VIEW_WITHOUT_KEY                                                         = 1355;
exports.ER_VIEW_INVALID                                                                  = 1356;
exports.ER_SP_NO_DROP_SP                                                                 = 1357;
exports.ER_SP_GOTO_IN_HNDLR                                                              = 1358;
exports.ER_TRG_ALREADY_EXISTS                                                            = 1359;
exports.ER_TRG_DOES_NOT_EXIST                                                            = 1360;
exports.ER_TRG_ON_VIEW_OR_TEMP_TABLE                                                     = 1361;
exports.ER_TRG_CANT_CHANGE_ROW                                                           = 1362;
exports.ER_TRG_NO_SUCH_ROW_IN_TRG                                                        = 1363;
exports.ER_NO_DEFAULT_FOR_FIELD                                                          = 1364;
exports.ER_DIVISION_BY_ZERO                                                              = 1365;
exports.ER_TRUNCATED_WRONG_VALUE_FOR_FIELD                                               = 1366;
exports.ER_ILLEGAL_VALUE_FOR_TYPE                                                        = 1367;
exports.ER_VIEW_NONUPD_CHECK                                                             = 1368;
exports.ER_VIEW_CHECK_FAILED                                                             = 1369;
exports.ER_PROCACCESS_DENIED_ERROR                                                       = 1370;
exports.ER_RELAY_LOG_FAIL                                                                = 1371;
exports.ER_PASSWD_LENGTH                                                                 = 1372;
exports.ER_UNKNOWN_TARGET_BINLOG                                                         = 1373;
exports.ER_IO_ERR_LOG_INDEX_READ                                                         = 1374;
exports.ER_BINLOG_PURGE_PROHIBITED                                                       = 1375;
exports.ER_FSEEK_FAIL                                                                    = 1376;
exports.ER_BINLOG_PURGE_FATAL_ERR                                                        = 1377;
exports.ER_LOG_IN_USE                                                                    = 1378;
exports.ER_LOG_PURGE_UNKNOWN_ERR                                                         = 1379;
exports.ER_RELAY_LOG_INIT                                                                = 1380;
exports.ER_NO_BINARY_LOGGING                                                             = 1381;
exports.ER_RESERVED_SYNTAX                                                               = 1382;
exports.ER_WSAS_FAILED                                                                   = 1383;
exports.ER_DIFF_GROUPS_PROC                                                              = 1384;
exports.ER_NO_GROUP_FOR_PROC                                                             = 1385;
exports.ER_ORDER_WITH_PROC                                                               = 1386;
exports.ER_LOGGING_PROHIBIT_CHANGING_OF                                                  = 1387;
exports.ER_NO_FILE_MAPPING                                                               = 1388;
exports.ER_WRONG_MAGIC                                                                   = 1389;
exports.ER_PS_MANY_PARAM                                                                 = 1390;
exports.ER_KEY_PART_0                                                                    = 1391;
exports.ER_VIEW_CHECKSUM                                                                 = 1392;
exports.ER_VIEW_MULTIUPDATE                                                              = 1393;
exports.ER_VIEW_NO_INSERT_FIELD_LIST                                                     = 1394;
exports.ER_VIEW_DELETE_MERGE_VIEW                                                        = 1395;
exports.ER_CANNOT_USER                                                                   = 1396;
exports.ER_XAER_NOTA                                                                     = 1397;
exports.ER_XAER_INVAL                                                                    = 1398;
exports.ER_XAER_RMFAIL                                                                   = 1399;
exports.ER_XAER_OUTSIDE                                                                  = 1400;
exports.ER_XAER_RMERR                                                                    = 1401;
exports.ER_XA_RBROLLBACK                                                                 = 1402;
exports.ER_NONEXISTING_PROC_GRANT                                                        = 1403;
exports.ER_PROC_AUTO_GRANT_FAIL                                                          = 1404;
exports.ER_PROC_AUTO_REVOKE_FAIL                                                         = 1405;
exports.ER_DATA_TOO_LONG                                                                 = 1406;
exports.ER_SP_BAD_SQLSTATE                                                               = 1407;
exports.ER_STARTUP                                                                       = 1408;
exports.ER_LOAD_FROM_FIXED_SIZE_ROWS_TO_VAR                                              = 1409;
exports.ER_CANT_CREATE_USER_WITH_GRANT                                                   = 1410;
exports.ER_WRONG_VALUE_FOR_TYPE                                                          = 1411;
exports.ER_TABLE_DEF_CHANGED                                                             = 1412;
exports.ER_SP_DUP_HANDLER                                                                = 1413;
exports.ER_SP_NOT_VAR_ARG                                                                = 1414;
exports.ER_SP_NO_RETSET                                                                  = 1415;
exports.ER_CANT_CREATE_GEOMETRY_OBJECT                                                   = 1416;
exports.ER_FAILED_ROUTINE_BREAK_BINLOG                                                   = 1417;
exports.ER_BINLOG_UNSAFE_ROUTINE                                                         = 1418;
exports.ER_BINLOG_CREATE_ROUTINE_NEED_SUPER                                              = 1419;
exports.ER_EXEC_STMT_WITH_OPEN_CURSOR                                                    = 1420;
exports.ER_STMT_HAS_NO_OPEN_CURSOR                                                       = 1421;
exports.ER_COMMIT_NOT_ALLOWED_IN_SF_OR_TRG                                               = 1422;
exports.ER_NO_DEFAULT_FOR_VIEW_FIELD                                                     = 1423;
exports.ER_SP_NO_RECURSION                                                               = 1424;
exports.ER_TOO_BIG_SCALE                                                                 = 1425;
exports.ER_TOO_BIG_PRECISION                                                             = 1426;
exports.ER_M_BIGGER_THAN_D                                                               = 1427;
exports.ER_WRONG_LOCK_OF_SYSTEM_TABLE                                                    = 1428;
exports.ER_CONNECT_TO_FOREIGN_DATA_SOURCE                                                = 1429;
exports.ER_QUERY_ON_FOREIGN_DATA_SOURCE                                                  = 1430;
exports.ER_FOREIGN_DATA_SOURCE_DOESNT_EXIST                                              = 1431;
exports.ER_FOREIGN_DATA_STRING_INVALID_CANT_CREATE                                       = 1432;
exports.ER_FOREIGN_DATA_STRING_INVALID                                                   = 1433;
exports.ER_CANT_CREATE_FEDERATED_TABLE                                                   = 1434;
exports.ER_TRG_IN_WRONG_SCHEMA                                                           = 1435;
exports.ER_STACK_OVERRUN_NEED_MORE                                                       = 1436;
exports.ER_TOO_LONG_BODY                                                                 = 1437;
exports.ER_WARN_CANT_DROP_DEFAULT_KEYCACHE                                               = 1438;
exports.ER_TOO_BIG_DISPLAYWIDTH                                                          = 1439;
exports.ER_XAER_DUPID                                                                    = 1440;
exports.ER_DATETIME_FUNCTION_OVERFLOW                                                    = 1441;
exports.ER_CANT_UPDATE_USED_TABLE_IN_SF_OR_TRG                                           = 1442;
exports.ER_VIEW_PREVENT_UPDATE                                                           = 1443;
exports.ER_PS_NO_RECURSION                                                               = 1444;
exports.ER_SP_CANT_SET_AUTOCOMMIT                                                        = 1445;
exports.ER_MALFORMED_DEFINER                                                             = 1446;
exports.ER_VIEW_FRM_NO_USER                                                              = 1447;
exports.ER_VIEW_OTHER_USER                                                               = 1448;
exports.ER_NO_SUCH_USER                                                                  = 1449;
exports.ER_FORBID_SCHEMA_CHANGE                                                          = 1450;
exports.ER_ROW_IS_REFERENCED_2                                                           = 1451;
exports.ER_NO_REFERENCED_ROW_2                                                           = 1452;
exports.ER_SP_BAD_VAR_SHADOW                                                             = 1453;
exports.ER_TRG_NO_DEFINER                                                                = 1454;
exports.ER_OLD_FILE_FORMAT                                                               = 1455;
exports.ER_SP_RECURSION_LIMIT                                                            = 1456;
exports.ER_SP_PROC_TABLE_CORRUPT                                                         = 1457;
exports.ER_SP_WRONG_NAME                                                                 = 1458;
exports.ER_TABLE_NEEDS_UPGRADE                                                           = 1459;
exports.ER_SP_NO_AGGREGATE                                                               = 1460;
exports.ER_MAX_PREPARED_STMT_COUNT_REACHED                                               = 1461;
exports.ER_VIEW_RECURSIVE                                                                = 1462;
exports.ER_NON_GROUPING_FIELD_USED                                                       = 1463;
exports.ER_TABLE_CANT_HANDLE_SPKEYS                                                      = 1464;
exports.ER_NO_TRIGGERS_ON_SYSTEM_SCHEMA                                                  = 1465;
exports.ER_REMOVED_SPACES                                                                = 1466;
exports.ER_AUTOINC_READ_FAILED                                                           = 1467;
exports.ER_USERNAME                                                                      = 1468;
exports.ER_HOSTNAME                                                                      = 1469;
exports.ER_WRONG_STRING_LENGTH                                                           = 1470;
exports.ER_NON_INSERTABLE_TABLE                                                          = 1471;
exports.ER_ADMIN_WRONG_MRG_TABLE                                                         = 1472;
exports.ER_TOO_HIGH_LEVEL_OF_NESTING_FOR_SELECT                                          = 1473;
exports.ER_NAME_BECOMES_EMPTY                                                            = 1474;
exports.ER_AMBIGUOUS_FIELD_TERM                                                          = 1475;
exports.ER_FOREIGN_SERVER_EXISTS                                                         = 1476;
exports.ER_FOREIGN_SERVER_DOESNT_EXIST                                                   = 1477;
exports.ER_ILLEGAL_HA_CREATE_OPTION                                                      = 1478;
exports.ER_PARTITION_REQUIRES_VALUES_ERROR                                               = 1479;
exports.ER_PARTITION_WRONG_VALUES_ERROR                                                  = 1480;
exports.ER_PARTITION_MAXVALUE_ERROR                                                      = 1481;
exports.ER_PARTITION_SUBPARTITION_ERROR                                                  = 1482;
exports.ER_PARTITION_SUBPART_MIX_ERROR                                                   = 1483;
exports.ER_PARTITION_WRONG_NO_PART_ERROR                                                 = 1484;
exports.ER_PARTITION_WRONG_NO_SUBPART_ERROR                                              = 1485;
exports.ER_WRONG_EXPR_IN_PARTITION_FUNC_ERROR                                            = 1486;
exports.ER_NO_CONST_EXPR_IN_RANGE_OR_LIST_ERROR                                          = 1487;
exports.ER_FIELD_NOT_FOUND_PART_ERROR                                                    = 1488;
exports.ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR                                             = 1489;
exports.ER_INCONSISTENT_PARTITION_INFO_ERROR                                             = 1490;
exports.ER_PARTITION_FUNC_NOT_ALLOWED_ERROR                                              = 1491;
exports.ER_PARTITIONS_MUST_BE_DEFINED_ERROR                                              = 1492;
exports.ER_RANGE_NOT_INCREASING_ERROR                                                    = 1493;
exports.ER_INCONSISTENT_TYPE_OF_FUNCTIONS_ERROR                                          = 1494;
exports.ER_MULTIPLE_DEF_CONST_IN_LIST_PART_ERROR                                         = 1495;
exports.ER_PARTITION_ENTRY_ERROR                                                         = 1496;
exports.ER_MIX_HANDLER_ERROR                                                             = 1497;
exports.ER_PARTITION_NOT_DEFINED_ERROR                                                   = 1498;
exports.ER_TOO_MANY_PARTITIONS_ERROR                                                     = 1499;
exports.ER_SUBPARTITION_ERROR                                                            = 1500;
exports.ER_CANT_CREATE_HANDLER_FILE                                                      = 1501;
exports.ER_BLOB_FIELD_IN_PART_FUNC_ERROR                                                 = 1502;
exports.ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF                                              = 1503;
exports.ER_NO_PARTS_ERROR                                                                = 1504;
exports.ER_PARTITION_MGMT_ON_NONPARTITIONED                                              = 1505;
exports.ER_FOREIGN_KEY_ON_PARTITIONED                                                    = 1506;
exports.ER_DROP_PARTITION_NON_EXISTENT                                                   = 1507;
exports.ER_DROP_LAST_PARTITION                                                           = 1508;
exports.ER_COALESCE_ONLY_ON_HASH_PARTITION                                               = 1509;
exports.ER_REORG_HASH_ONLY_ON_SAME_NO                                                    = 1510;
exports.ER_REORG_NO_PARAM_ERROR                                                          = 1511;
exports.ER_ONLY_ON_RANGE_LIST_PARTITION                                                  = 1512;
exports.ER_ADD_PARTITION_SUBPART_ERROR                                                   = 1513;
exports.ER_ADD_PARTITION_NO_NEW_PARTITION                                                = 1514;
exports.ER_COALESCE_PARTITION_NO_PARTITION                                               = 1515;
exports.ER_REORG_PARTITION_NOT_EXIST                                                     = 1516;
exports.ER_SAME_NAME_PARTITION                                                           = 1517;
exports.ER_NO_BINLOG_ERROR                                                               = 1518;
exports.ER_CONSECUTIVE_REORG_PARTITIONS                                                  = 1519;
exports.ER_REORG_OUTSIDE_RANGE                                                           = 1520;
exports.ER_PARTITION_FUNCTION_FAILURE                                                    = 1521;
exports.ER_PART_STATE_ERROR                                                              = 1522;
exports.ER_LIMITED_PART_RANGE                                                            = 1523;
exports.ER_PLUGIN_IS_NOT_LOADED                                                          = 1524;
exports.ER_WRONG_VALUE                                                                   = 1525;
exports.ER_NO_PARTITION_FOR_GIVEN_VALUE                                                  = 1526;
exports.ER_FILEGROUP_OPTION_ONLY_ONCE                                                    = 1527;
exports.ER_CREATE_FILEGROUP_FAILED                                                       = 1528;
exports.ER_DROP_FILEGROUP_FAILED                                                         = 1529;
exports.ER_TABLESPACE_AUTO_EXTEND_ERROR                                                  = 1530;
exports.ER_WRONG_SIZE_NUMBER                                                             = 1531;
exports.ER_SIZE_OVERFLOW_ERROR                                                           = 1532;
exports.ER_ALTER_FILEGROUP_FAILED                                                        = 1533;
exports.ER_BINLOG_ROW_LOGGING_FAILED                                                     = 1534;
exports.ER_BINLOG_ROW_WRONG_TABLE_DEF                                                    = 1535;
exports.ER_BINLOG_ROW_RBR_TO_SBR                                                         = 1536;
exports.ER_EVENT_ALREADY_EXISTS                                                          = 1537;
exports.ER_EVENT_STORE_FAILED                                                            = 1538;
exports.ER_EVENT_DOES_NOT_EXIST                                                          = 1539;
exports.ER_EVENT_CANT_ALTER                                                              = 1540;
exports.ER_EVENT_DROP_FAILED                                                             = 1541;
exports.ER_EVENT_INTERVAL_NOT_POSITIVE_OR_TOO_BIG                                        = 1542;
exports.ER_EVENT_ENDS_BEFORE_STARTS                                                      = 1543;
exports.ER_EVENT_EXEC_TIME_IN_THE_PAST                                                   = 1544;
exports.ER_EVENT_OPEN_TABLE_FAILED                                                       = 1545;
exports.ER_EVENT_NEITHER_M_EXPR_NOR_M_AT                                                 = 1546;
exports.ER_COL_COUNT_DOESNT_MATCH_CORRUPTED                                              = 1547;
exports.ER_CANNOT_LOAD_FROM_TABLE                                                        = 1548;
exports.ER_EVENT_CANNOT_DELETE                                                           = 1549;
exports.ER_EVENT_COMPILE_ERROR                                                           = 1550;
exports.ER_EVENT_SAME_NAME                                                               = 1551;
exports.ER_EVENT_DATA_TOO_LONG                                                           = 1552;
exports.ER_DROP_INDEX_FK                                                                 = 1553;
exports.ER_WARN_DEPRECATED_SYNTAX_WITH_VER                                               = 1554;
exports.ER_CANT_WRITE_LOCK_LOG_TABLE                                                     = 1555;
exports.ER_CANT_LOCK_LOG_TABLE                                                           = 1556;
exports.ER_FOREIGN_DUPLICATE_KEY                                                         = 1557;
exports.ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE                                          = 1558;
exports.ER_TEMP_TABLE_PREVENTS_SWITCH_OUT_OF_RBR                                         = 1559;
exports.ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_FORMAT                                 = 1560;
exports.ER_NDB_CANT_SWITCH_BINLOG_FORMAT                                                 = 1561;
exports.ER_PARTITION_NO_TEMPORARY                                                        = 1562;
exports.ER_PARTITION_CONST_DOMAIN_ERROR                                                  = 1563;
exports.ER_PARTITION_FUNCTION_IS_NOT_ALLOWED                                             = 1564;
exports.ER_DDL_LOG_ERROR                                                                 = 1565;
exports.ER_NULL_IN_VALUES_LESS_THAN                                                      = 1566;
exports.ER_WRONG_PARTITION_NAME                                                          = 1567;
exports.ER_CANT_CHANGE_TX_CHARACTERISTICS                                                = 1568;
exports.ER_DUP_ENTRY_AUTOINCREMENT_CASE                                                  = 1569;
exports.ER_EVENT_MODIFY_QUEUE_ERROR                                                      = 1570;
exports.ER_EVENT_SET_VAR_ERROR                                                           = 1571;
exports.ER_PARTITION_MERGE_ERROR                                                         = 1572;
exports.ER_CANT_ACTIVATE_LOG                                                             = 1573;
exports.ER_RBR_NOT_AVAILABLE                                                             = 1574;
exports.ER_BASE64_DECODE_ERROR                                                           = 1575;
exports.ER_EVENT_RECURSION_FORBIDDEN                                                     = 1576;
exports.ER_EVENTS_DB_ERROR                                                               = 1577;
exports.ER_ONLY_INTEGERS_ALLOWED                                                         = 1578;
exports.ER_UNSUPORTED_LOG_ENGINE                                                         = 1579;
exports.ER_BAD_LOG_STATEMENT                                                             = 1580;
exports.ER_CANT_RENAME_LOG_TABLE                                                         = 1581;
exports.ER_WRONG_PARAMCOUNT_TO_NATIVE_FCT                                                = 1582;
exports.ER_WRONG_PARAMETERS_TO_NATIVE_FCT                                                = 1583;
exports.ER_WRONG_PARAMETERS_TO_STORED_FCT                                                = 1584;
exports.ER_NATIVE_FCT_NAME_COLLISION                                                     = 1585;
exports.ER_DUP_ENTRY_WITH_KEY_NAME                                                       = 1586;
exports.ER_BINLOG_PURGE_EMFILE                                                           = 1587;
exports.ER_EVENT_CANNOT_CREATE_IN_THE_PAST                                               = 1588;
exports.ER_EVENT_CANNOT_ALTER_IN_THE_PAST                                                = 1589;
exports.ER_SLAVE_INCIDENT                                                                = 1590;
exports.ER_NO_PARTITION_FOR_GIVEN_VALUE_SILENT                                           = 1591;
exports.ER_BINLOG_UNSAFE_STATEMENT                                                       = 1592;
exports.ER_SLAVE_FATAL_ERROR                                                             = 1593;
exports.ER_SLAVE_RELAY_LOG_READ_FAILURE                                                  = 1594;
exports.ER_SLAVE_RELAY_LOG_WRITE_FAILURE                                                 = 1595;
exports.ER_SLAVE_CREATE_EVENT_FAILURE                                                    = 1596;
exports.ER_SLAVE_MASTER_COM_FAILURE                                                      = 1597;
exports.ER_BINLOG_LOGGING_IMPOSSIBLE                                                     = 1598;
exports.ER_VIEW_NO_CREATION_CTX                                                          = 1599;
exports.ER_VIEW_INVALID_CREATION_CTX                                                     = 1600;
exports.ER_SR_INVALID_CREATION_CTX                                                       = 1601;
exports.ER_TRG_CORRUPTED_FILE                                                            = 1602;
exports.ER_TRG_NO_CREATION_CTX                                                           = 1603;
exports.ER_TRG_INVALID_CREATION_CTX                                                      = 1604;
exports.ER_EVENT_INVALID_CREATION_CTX                                                    = 1605;
exports.ER_TRG_CANT_OPEN_TABLE                                                           = 1606;
exports.ER_CANT_CREATE_SROUTINE                                                          = 1607;
exports.ER_NEVER_USED                                                                    = 1608;
exports.ER_NO_FORMAT_DESCRIPTION_EVENT_BEFORE_BINLOG_STATEMENT                           = 1609;
exports.ER_SLAVE_CORRUPT_EVENT                                                           = 1610;
exports.ER_LOAD_DATA_INVALID_COLUMN                                                      = 1611;
exports.ER_LOG_PURGE_NO_FILE                                                             = 1612;
exports.ER_XA_RBTIMEOUT                                                                  = 1613;
exports.ER_XA_RBDEADLOCK                                                                 = 1614;
exports.ER_NEED_REPREPARE                                                                = 1615;
exports.ER_DELAYED_NOT_SUPPORTED                                                         = 1616;
exports.WARN_NO_MASTER_INFO                                                              = 1617;
exports.WARN_OPTION_IGNORED                                                              = 1618;
exports.ER_PLUGIN_DELETE_BUILTIN                                                         = 1619;
exports.WARN_PLUGIN_BUSY                                                                 = 1620;
exports.ER_VARIABLE_IS_READONLY                                                          = 1621;
exports.ER_WARN_ENGINE_TRANSACTION_ROLLBACK                                              = 1622;
exports.ER_SLAVE_HEARTBEAT_FAILURE                                                       = 1623;
exports.ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE                                            = 1624;
exports.ER_NDB_REPLICATION_SCHEMA_ERROR                                                  = 1625;
exports.ER_CONFLICT_FN_PARSE_ERROR                                                       = 1626;
exports.ER_EXCEPTIONS_WRITE_ERROR                                                        = 1627;
exports.ER_TOO_LONG_TABLE_COMMENT                                                        = 1628;
exports.ER_TOO_LONG_FIELD_COMMENT                                                        = 1629;
exports.ER_FUNC_INEXISTENT_NAME_COLLISION                                                = 1630;
exports.ER_DATABASE_NAME                                                                 = 1631;
exports.ER_TABLE_NAME                                                                    = 1632;
exports.ER_PARTITION_NAME                                                                = 1633;
exports.ER_SUBPARTITION_NAME                                                             = 1634;
exports.ER_TEMPORARY_NAME                                                                = 1635;
exports.ER_RENAMED_NAME                                                                  = 1636;
exports.ER_TOO_MANY_CONCURRENT_TRXS                                                      = 1637;
exports.WARN_NON_ASCII_SEPARATOR_NOT_IMPLEMENTED                                         = 1638;
exports.ER_DEBUG_SYNC_TIMEOUT                                                            = 1639;
exports.ER_DEBUG_SYNC_HIT_LIMIT                                                          = 1640;
exports.ER_DUP_SIGNAL_SET                                                                = 1641;
exports.ER_SIGNAL_WARN                                                                   = 1642;
exports.ER_SIGNAL_NOT_FOUND                                                              = 1643;
exports.ER_SIGNAL_EXCEPTION                                                              = 1644;
exports.ER_RESIGNAL_WITHOUT_ACTIVE_HANDLER                                               = 1645;
exports.ER_SIGNAL_BAD_CONDITION_TYPE                                                     = 1646;
exports.WARN_COND_ITEM_TRUNCATED                                                         = 1647;
exports.ER_COND_ITEM_TOO_LONG                                                            = 1648;
exports.ER_UNKNOWN_LOCALE                                                                = 1649;
exports.ER_SLAVE_IGNORE_SERVER_IDS                                                       = 1650;
exports.ER_QUERY_CACHE_DISABLED                                                          = 1651;
exports.ER_SAME_NAME_PARTITION_FIELD                                                     = 1652;
exports.ER_PARTITION_COLUMN_LIST_ERROR                                                   = 1653;
exports.ER_WRONG_TYPE_COLUMN_VALUE_ERROR                                                 = 1654;
exports.ER_TOO_MANY_PARTITION_FUNC_FIELDS_ERROR                                          = 1655;
exports.ER_MAXVALUE_IN_VALUES_IN                                                         = 1656;
exports.ER_TOO_MANY_VALUES_ERROR                                                         = 1657;
exports.ER_ROW_SINGLE_PARTITION_FIELD_ERROR                                              = 1658;
exports.ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD                                     = 1659;
exports.ER_PARTITION_FIELDS_TOO_LONG                                                     = 1660;
exports.ER_BINLOG_ROW_ENGINE_AND_STMT_ENGINE                                             = 1661;
exports.ER_BINLOG_ROW_MODE_AND_STMT_ENGINE                                               = 1662;
exports.ER_BINLOG_UNSAFE_AND_STMT_ENGINE                                                 = 1663;
exports.ER_BINLOG_ROW_INJECTION_AND_STMT_ENGINE                                          = 1664;
exports.ER_BINLOG_STMT_MODE_AND_ROW_ENGINE                                               = 1665;
exports.ER_BINLOG_ROW_INJECTION_AND_STMT_MODE                                            = 1666;
exports.ER_BINLOG_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE                               = 1667;
exports.ER_BINLOG_UNSAFE_LIMIT                                                           = 1668;
exports.ER_BINLOG_UNSAFE_INSERT_DELAYED                                                  = 1669;
exports.ER_BINLOG_UNSAFE_SYSTEM_TABLE                                                    = 1670;
exports.ER_BINLOG_UNSAFE_AUTOINC_COLUMNS                                                 = 1671;
exports.ER_BINLOG_UNSAFE_UDF                                                             = 1672;
exports.ER_BINLOG_UNSAFE_SYSTEM_VARIABLE                                                 = 1673;
exports.ER_BINLOG_UNSAFE_SYSTEM_FUNCTION                                                 = 1674;
exports.ER_BINLOG_UNSAFE_NONTRANS_AFTER_TRANS                                            = 1675;
exports.ER_MESSAGE_AND_STATEMENT                                                         = 1676;
exports.ER_SLAVE_CONVERSION_FAILED                                                       = 1677;
exports.ER_SLAVE_CANT_CREATE_CONVERSION                                                  = 1678;
exports.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_FORMAT                              = 1679;
exports.ER_PATH_LENGTH                                                                   = 1680;
exports.ER_WARN_DEPRECATED_SYNTAX_NO_REPLACEMENT                                         = 1681;
exports.ER_WRONG_NATIVE_TABLE_STRUCTURE                                                  = 1682;
exports.ER_WRONG_PERFSCHEMA_USAGE                                                        = 1683;
exports.ER_WARN_I_S_SKIPPED_TABLE                                                        = 1684;
exports.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_DIRECT                              = 1685;
exports.ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_DIRECT                                 = 1686;
exports.ER_SPATIAL_MUST_HAVE_GEOM_COL                                                    = 1687;
exports.ER_TOO_LONG_INDEX_COMMENT                                                        = 1688;
exports.ER_LOCK_ABORTED                                                                  = 1689;
exports.ER_DATA_OUT_OF_RANGE                                                             = 1690;
exports.ER_WRONG_SPVAR_TYPE_IN_LIMIT                                                     = 1691;
exports.ER_BINLOG_UNSAFE_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE                        = 1692;
exports.ER_BINLOG_UNSAFE_MIXED_STATEMENT                                                 = 1693;
exports.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SQL_LOG_BIN                                = 1694;
exports.ER_STORED_FUNCTION_PREVENTS_SWITCH_SQL_LOG_BIN                                   = 1695;
exports.ER_FAILED_READ_FROM_PAR_FILE                                                     = 1696;
exports.ER_VALUES_IS_NOT_INT_TYPE_ERROR                                                  = 1697;
exports.ER_ACCESS_DENIED_NO_PASSWORD_ERROR                                               = 1698;
exports.ER_SET_PASSWORD_AUTH_PLUGIN                                                      = 1699;
exports.ER_GRANT_PLUGIN_USER_EXISTS                                                      = 1700;
exports.ER_TRUNCATE_ILLEGAL_FK                                                           = 1701;
exports.ER_PLUGIN_IS_PERMANENT                                                           = 1702;
exports.ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MIN                                        = 1703;
exports.ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MAX                                        = 1704;
exports.ER_STMT_CACHE_FULL                                                               = 1705;
exports.ER_MULTI_UPDATE_KEY_CONFLICT                                                     = 1706;
exports.ER_TABLE_NEEDS_REBUILD                                                           = 1707;
exports.WARN_OPTION_BELOW_LIMIT                                                          = 1708;
exports.ER_INDEX_COLUMN_TOO_LONG                                                         = 1709;
exports.ER_ERROR_IN_TRIGGER_BODY                                                         = 1710;
exports.ER_ERROR_IN_UNKNOWN_TRIGGER_BODY                                                 = 1711;
exports.ER_INDEX_CORRUPT                                                                 = 1712;
exports.ER_UNDO_RECORD_TOO_BIG                                                           = 1713;
exports.ER_BINLOG_UNSAFE_INSERT_IGNORE_SELECT                                            = 1714;
exports.ER_BINLOG_UNSAFE_INSERT_SELECT_UPDATE                                            = 1715;
exports.ER_BINLOG_UNSAFE_REPLACE_SELECT                                                  = 1716;
exports.ER_BINLOG_UNSAFE_CREATE_IGNORE_SELECT                                            = 1717;
exports.ER_BINLOG_UNSAFE_CREATE_REPLACE_SELECT                                           = 1718;
exports.ER_BINLOG_UNSAFE_UPDATE_IGNORE                                                   = 1719;
exports.ER_PLUGIN_NO_UNINSTALL                                                           = 1720;
exports.ER_PLUGIN_NO_INSTALL                                                             = 1721;
exports.ER_BINLOG_UNSAFE_WRITE_AUTOINC_SELECT                                            = 1722;
exports.ER_BINLOG_UNSAFE_CREATE_SELECT_AUTOINC                                           = 1723;
exports.ER_BINLOG_UNSAFE_INSERT_TWO_KEYS                                                 = 1724;
exports.ER_TABLE_IN_FK_CHECK                                                             = 1725;
exports.ER_UNSUPPORTED_ENGINE                                                            = 1726;
exports.ER_BINLOG_UNSAFE_AUTOINC_NOT_FIRST                                               = 1727;
exports.ER_CANNOT_LOAD_FROM_TABLE_V2                                                     = 1728;
exports.ER_MASTER_DELAY_VALUE_OUT_OF_RANGE                                               = 1729;
exports.ER_ONLY_FD_AND_RBR_EVENTS_ALLOWED_IN_BINLOG_STATEMENT                            = 1730;
exports.ER_PARTITION_EXCHANGE_DIFFERENT_OPTION                                           = 1731;
exports.ER_PARTITION_EXCHANGE_PART_TABLE                                                 = 1732;
exports.ER_PARTITION_EXCHANGE_TEMP_TABLE                                                 = 1733;
exports.ER_PARTITION_INSTEAD_OF_SUBPARTITION                                             = 1734;
exports.ER_UNKNOWN_PARTITION                                                             = 1735;
exports.ER_TABLES_DIFFERENT_METADATA                                                     = 1736;
exports.ER_ROW_DOES_NOT_MATCH_PARTITION                                                  = 1737;
exports.ER_BINLOG_CACHE_SIZE_GREATER_THAN_MAX                                            = 1738;
exports.ER_WARN_INDEX_NOT_APPLICABLE                                                     = 1739;
exports.ER_PARTITION_EXCHANGE_FOREIGN_KEY                                                = 1740;
exports.ER_NO_SUCH_KEY_VALUE                                                             = 1741;
exports.ER_RPL_INFO_DATA_TOO_LONG                                                        = 1742;
exports.ER_NETWORK_READ_EVENT_CHECKSUM_FAILURE                                           = 1743;
exports.ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE                                            = 1744;
exports.ER_BINLOG_STMT_CACHE_SIZE_GREATER_THAN_MAX                                       = 1745;
exports.ER_CANT_UPDATE_TABLE_IN_CREATE_TABLE_SELECT                                      = 1746;
exports.ER_PARTITION_CLAUSE_ON_NONPARTITIONED                                            = 1747;
exports.ER_ROW_DOES_NOT_MATCH_GIVEN_PARTITION_SET                                        = 1748;
exports.ER_NO_SUCH_PARTITION                                                             = 1749;
exports.ER_CHANGE_RPL_INFO_REPOSITORY_FAILURE                                            = 1750;
exports.ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_CREATED_TEMP_TABLE                         = 1751;
exports.ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_DROPPED_TEMP_TABLE                         = 1752;
exports.ER_MTS_FEATURE_IS_NOT_SUPPORTED                                                  = 1753;
exports.ER_MTS_UPDATED_DBS_GREATER_MAX                                                   = 1754;
exports.ER_MTS_CANT_PARALLEL                                                             = 1755;
exports.ER_MTS_INCONSISTENT_DATA                                                         = 1756;
exports.ER_FULLTEXT_NOT_SUPPORTED_WITH_PARTITIONING                                      = 1757;
exports.ER_DA_INVALID_CONDITION_NUMBER                                                   = 1758;
exports.ER_INSECURE_PLAIN_TEXT                                                           = 1759;
exports.ER_INSECURE_CHANGE_MASTER                                                        = 1760;
exports.ER_FOREIGN_DUPLICATE_KEY_WITH_CHILD_INFO                                         = 1761;
exports.ER_FOREIGN_DUPLICATE_KEY_WITHOUT_CHILD_INFO                                      = 1762;
exports.ER_SQLTHREAD_WITH_SECURE_SLAVE                                                   = 1763;
exports.ER_TABLE_HAS_NO_FT                                                               = 1764;
exports.ER_VARIABLE_NOT_SETTABLE_IN_SF_OR_TRIGGER                                        = 1765;
exports.ER_VARIABLE_NOT_SETTABLE_IN_TRANSACTION                                          = 1766;
exports.ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST                                            = 1767;
exports.ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION                                          = 1768;
exports.ER_SET_STATEMENT_CANNOT_INVOKE_FUNCTION                                          = 1769;
exports.ER_GTID_NEXT_CANT_BE_AUTOMATIC_IF_GTID_NEXT_LIST_IS_NON_NULL                     = 1770;
exports.ER_SKIPPING_LOGGED_TRANSACTION                                                   = 1771;
exports.ER_MALFORMED_GTID_SET_SPECIFICATION                                              = 1772;
exports.ER_MALFORMED_GTID_SET_ENCODING                                                   = 1773;
exports.ER_MALFORMED_GTID_SPECIFICATION                                                  = 1774;
exports.ER_GNO_EXHAUSTED                                                                 = 1775;
exports.ER_BAD_SLAVE_AUTO_POSITION                                                       = 1776;
exports.ER_AUTO_POSITION_REQUIRES_GTID_MODE_NOT_OFF                                      = 1777;
exports.ER_CANT_DO_IMPLICIT_COMMIT_IN_TRX_WHEN_GTID_NEXT_IS_SET                          = 1778;
exports.ER_GTID_MODE_ON_REQUIRES_ENFORCE_GTID_CONSISTENCY_ON                             = 1779;
exports.ER_GTID_MODE_REQUIRES_BINLOG                                                     = 1780;
exports.ER_CANT_SET_GTID_NEXT_TO_GTID_WHEN_GTID_MODE_IS_OFF                              = 1781;
exports.ER_CANT_SET_GTID_NEXT_TO_ANONYMOUS_WHEN_GTID_MODE_IS_ON                          = 1782;
exports.ER_CANT_SET_GTID_NEXT_LIST_TO_NON_NULL_WHEN_GTID_MODE_IS_OFF                     = 1783;
exports.ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF                                        = 1784;
exports.ER_GTID_UNSAFE_NON_TRANSACTIONAL_TABLE                                           = 1785;
exports.ER_GTID_UNSAFE_CREATE_SELECT                                                     = 1786;
exports.ER_GTID_UNSAFE_CREATE_DROP_TEMPORARY_TABLE_IN_TRANSACTION                        = 1787;
exports.ER_GTID_MODE_CAN_ONLY_CHANGE_ONE_STEP_AT_A_TIME                                  = 1788;
exports.ER_MASTER_HAS_PURGED_REQUIRED_GTIDS                                              = 1789;
exports.ER_CANT_SET_GTID_NEXT_WHEN_OWNING_GTID                                           = 1790;
exports.ER_UNKNOWN_EXPLAIN_FORMAT                                                        = 1791;
exports.ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION                                         = 1792;
exports.ER_TOO_LONG_TABLE_PARTITION_COMMENT                                              = 1793;
exports.ER_SLAVE_CONFIGURATION                                                           = 1794;
exports.ER_INNODB_FT_LIMIT                                                               = 1795;
exports.ER_INNODB_NO_FT_TEMP_TABLE                                                       = 1796;
exports.ER_INNODB_FT_WRONG_DOCID_COLUMN                                                  = 1797;
exports.ER_INNODB_FT_WRONG_DOCID_INDEX                                                   = 1798;
exports.ER_INNODB_ONLINE_LOG_TOO_BIG                                                     = 1799;
exports.ER_UNKNOWN_ALTER_ALGORITHM                                                       = 1800;
exports.ER_UNKNOWN_ALTER_LOCK                                                            = 1801;
exports.ER_MTS_CHANGE_MASTER_CANT_RUN_WITH_GAPS                                          = 1802;
exports.ER_MTS_RECOVERY_FAILURE                                                          = 1803;
exports.ER_MTS_RESET_WORKERS                                                             = 1804;
exports.ER_COL_COUNT_DOESNT_MATCH_CORRUPTED_V2                                           = 1805;
exports.ER_SLAVE_SILENT_RETRY_TRANSACTION                                                = 1806;
exports.ER_DISCARD_FK_CHECKS_RUNNING                                                     = 1807;
exports.ER_TABLE_SCHEMA_MISMATCH                                                         = 1808;
exports.ER_TABLE_IN_SYSTEM_TABLESPACE                                                    = 1809;
exports.ER_IO_READ_ERROR                                                                 = 1810;
exports.ER_IO_WRITE_ERROR                                                                = 1811;
exports.ER_TABLESPACE_MISSING                                                            = 1812;
exports.ER_TABLESPACE_EXISTS                                                             = 1813;
exports.ER_TABLESPACE_DISCARDED                                                          = 1814;
exports.ER_INTERNAL_ERROR                                                                = 1815;
exports.ER_INNODB_IMPORT_ERROR                                                           = 1816;
exports.ER_INNODB_INDEX_CORRUPT                                                          = 1817;
exports.ER_INVALID_YEAR_COLUMN_LENGTH                                                    = 1818;
exports.ER_NOT_VALID_PASSWORD                                                            = 1819;
exports.ER_MUST_CHANGE_PASSWORD                                                          = 1820;
exports.ER_FK_NO_INDEX_CHILD                                                             = 1821;
exports.ER_FK_NO_INDEX_PARENT                                                            = 1822;
exports.ER_FK_FAIL_ADD_SYSTEM                                                            = 1823;
exports.ER_FK_CANNOT_OPEN_PARENT                                                         = 1824;
exports.ER_FK_INCORRECT_OPTION                                                           = 1825;
exports.ER_FK_DUP_NAME                                                                   = 1826;
exports.ER_PASSWORD_FORMAT                                                               = 1827;
exports.ER_FK_COLUMN_CANNOT_DROP                                                         = 1828;
exports.ER_FK_COLUMN_CANNOT_DROP_CHILD                                                   = 1829;
exports.ER_FK_COLUMN_NOT_NULL                                                            = 1830;
exports.ER_DUP_INDEX                                                                     = 1831;
exports.ER_FK_COLUMN_CANNOT_CHANGE                                                       = 1832;
exports.ER_FK_COLUMN_CANNOT_CHANGE_CHILD                                                 = 1833;
exports.ER_FK_CANNOT_DELETE_PARENT                                                       = 1834;
exports.ER_MALFORMED_PACKET                                                              = 1835;
exports.ER_READ_ONLY_MODE                                                                = 1836;
exports.ER_GTID_NEXT_TYPE_UNDEFINED_GROUP                                                = 1837;
exports.ER_VARIABLE_NOT_SETTABLE_IN_SP                                                   = 1838;
exports.ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF                                    = 1839;
exports.ER_CANT_SET_GTID_PURGED_WHEN_GTID_EXECUTED_IS_NOT_EMPTY                          = 1840;
exports.ER_CANT_SET_GTID_PURGED_WHEN_OWNED_GTIDS_IS_NOT_EMPTY                            = 1841;
exports.ER_GTID_PURGED_WAS_CHANGED                                                       = 1842;
exports.ER_GTID_EXECUTED_WAS_CHANGED                                                     = 1843;
exports.ER_BINLOG_STMT_MODE_AND_NO_REPL_TABLES                                           = 1844;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED                                                 = 1845;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON                                          = 1846;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COPY                                     = 1847;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_PARTITION                                = 1848;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_RENAME                                = 1849;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE                              = 1850;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_CHECK                                 = 1851;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_IGNORE                                   = 1852;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOPK                                     = 1853;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_AUTOINC                                  = 1854;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_HIDDEN_FTS                               = 1855;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_CHANGE_FTS                               = 1856;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FTS                                      = 1857;
exports.ER_SQL_SLAVE_SKIP_COUNTER_NOT_SETTABLE_IN_GTID_MODE                              = 1858;
exports.ER_DUP_UNKNOWN_IN_INDEX                                                          = 1859;
exports.ER_IDENT_CAUSES_TOO_LONG_PATH                                                    = 1860;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOT_NULL                                 = 1861;
exports.ER_MUST_CHANGE_PASSWORD_LOGIN                                                    = 1862;
exports.ER_ROW_IN_WRONG_PARTITION                                                        = 1863;
exports.ER_MTS_EVENT_BIGGER_PENDING_JOBS_SIZE_MAX                                        = 1864;
exports.ER_INNODB_NO_FT_USES_PARSER                                                      = 1865;
exports.ER_BINLOG_LOGICAL_CORRUPTION                                                     = 1866;
exports.ER_WARN_PURGE_LOG_IN_USE                                                         = 1867;
exports.ER_WARN_PURGE_LOG_IS_ACTIVE                                                      = 1868;
exports.ER_AUTO_INCREMENT_CONFLICT                                                       = 1869;
exports.WARN_ON_BLOCKHOLE_IN_RBR                                                         = 1870;
exports.ER_SLAVE_MI_INIT_REPOSITORY                                                      = 1871;
exports.ER_SLAVE_RLI_INIT_REPOSITORY                                                     = 1872;
exports.ER_ACCESS_DENIED_CHANGE_USER_ERROR                                               = 1873;
exports.ER_INNODB_READ_ONLY                                                              = 1874;
exports.ER_STOP_SLAVE_SQL_THREAD_TIMEOUT                                                 = 1875;
exports.ER_STOP_SLAVE_IO_THREAD_TIMEOUT                                                  = 1876;
exports.ER_TABLE_CORRUPT                                                                 = 1877;
exports.ER_TEMP_FILE_WRITE_FAILURE                                                       = 1878;
exports.ER_INNODB_FT_AUX_NOT_HEX_ID                                                      = 1879;
exports.ER_OLD_TEMPORALS_UPGRADED                                                        = 1880;
exports.ER_INNODB_FORCED_RECOVERY                                                        = 1881;
exports.ER_AES_INVALID_IV                                                                = 1882;
exports.ER_PLUGIN_CANNOT_BE_UNINSTALLED                                                  = 1883;
exports.ER_GTID_UNSAFE_BINLOG_SPLITTABLE_STATEMENT_AND_GTID_GROUP                        = 1884;
exports.ER_SLAVE_HAS_MORE_GTIDS_THAN_MASTER                                              = 1885;
exports.ER_FILE_CORRUPT                                                                  = 1886;
exports.ER_ERROR_ON_MASTER                                                               = 1887;
exports.ER_INCONSISTENT_ERROR                                                            = 1888;
exports.ER_STORAGE_ENGINE_NOT_LOADED                                                     = 1889;
exports.ER_GET_STACKED_DA_WITHOUT_ACTIVE_HANDLER                                         = 1890;
exports.ER_WARN_LEGACY_SYNTAX_CONVERTED                                                  = 1891;
exports.ER_BINLOG_UNSAFE_FULLTEXT_PLUGIN                                                 = 1892;
exports.ER_CANNOT_DISCARD_TEMPORARY_TABLE                                                = 1893;
exports.ER_FK_DEPTH_EXCEEDED                                                             = 1894;
exports.ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE_V2                                       = 1895;
exports.ER_WARN_TRIGGER_DOESNT_HAVE_CREATED                                              = 1896;
exports.ER_REFERENCED_TRG_DOES_NOT_EXIST                                                 = 1897;
exports.ER_EXPLAIN_NOT_SUPPORTED                                                         = 1898;
exports.ER_INVALID_FIELD_SIZE                                                            = 1899;
exports.ER_MISSING_HA_CREATE_OPTION                                                      = 1900;
exports.ER_ENGINE_OUT_OF_MEMORY                                                          = 1901;
exports.ER_PASSWORD_EXPIRE_ANONYMOUS_USER                                                = 1902;
exports.ER_SLAVE_SQL_THREAD_MUST_STOP                                                    = 1903;
exports.ER_NO_FT_MATERIALIZED_SUBQUERY                                                   = 1904;
exports.ER_INNODB_UNDO_LOG_FULL                                                          = 1905;
exports.ER_INVALID_ARGUMENT_FOR_LOGARITHM                                                = 1906;
exports.ER_SLAVE_CHANNEL_IO_THREAD_MUST_STOP                                             = 1907;
exports.ER_WARN_OPEN_TEMP_TABLES_MUST_BE_ZERO                                            = 1908;
exports.ER_WARN_ONLY_MASTER_LOG_FILE_NO_POS                                              = 1909;
exports.ER_QUERY_TIMEOUT                                                                 = 1910;
exports.ER_NON_RO_SELECT_DISABLE_TIMER                                                   = 1911;
exports.ER_DUP_LIST_ENTRY                                                                = 1912;
exports.ER_SQL_MODE_NO_EFFECT                                                            = 1913;
exports.ER_AGGREGATE_ORDER_FOR_UNION                                                     = 1914;
exports.ER_AGGREGATE_ORDER_NON_AGG_QUERY                                                 = 1915;
exports.ER_SLAVE_WORKER_STOPPED_PREVIOUS_THD_ERROR                                       = 1916;
exports.ER_DONT_SUPPORT_SLAVE_PRESERVE_COMMIT_ORDER                                      = 1917;
exports.ER_SERVER_OFFLINE_MODE                                                           = 1918;
exports.ER_GIS_DIFFERENT_SRIDS                                                           = 1919;
exports.ER_GIS_UNSUPPORTED_ARGUMENT                                                      = 1920;
exports.ER_GIS_UNKNOWN_ERROR                                                             = 1921;
exports.ER_GIS_UNKNOWN_EXCEPTION                                                         = 1922;
exports.ER_GIS_INVALID_DATA                                                              = 1923;
exports.ER_BOOST_GEOMETRY_EMPTY_INPUT_EXCEPTION                                          = 1924;
exports.ER_BOOST_GEOMETRY_CENTROID_EXCEPTION                                             = 1925;
exports.ER_BOOST_GEOMETRY_OVERLAY_INVALID_INPUT_EXCEPTION                                = 1926;
exports.ER_BOOST_GEOMETRY_TURN_INFO_EXCEPTION                                            = 1927;
exports.ER_BOOST_GEOMETRY_SELF_INTERSECTION_POINT_EXCEPTION                              = 1928;
exports.ER_BOOST_GEOMETRY_UNKNOWN_EXCEPTION                                              = 1929;
exports.ER_STD_BAD_ALLOC_ERROR                                                           = 1930;
exports.ER_STD_DOMAIN_ERROR                                                              = 1931;
exports.ER_STD_LENGTH_ERROR                                                              = 1932;
exports.ER_STD_INVALID_ARGUMENT                                                          = 1933;
exports.ER_STD_OUT_OF_RANGE_ERROR                                                        = 1934;
exports.ER_STD_OVERFLOW_ERROR                                                            = 1935;
exports.ER_STD_RANGE_ERROR                                                               = 1936;
exports.ER_STD_UNDERFLOW_ERROR                                                           = 1937;
exports.ER_STD_LOGIC_ERROR                                                               = 1938;
exports.ER_STD_RUNTIME_ERROR                                                             = 1939;
exports.ER_STD_UNKNOWN_EXCEPTION                                                         = 1940;
exports.ER_GIS_DATA_WRONG_ENDIANESS                                                      = 1941;
exports.ER_CHANGE_MASTER_PASSWORD_LENGTH                                                 = 1942;
exports.ER_USER_LOCK_WRONG_NAME                                                          = 1943;
exports.ER_USER_LOCK_DEADLOCK                                                            = 1944;
exports.ER_REPLACE_INACCESSIBLE_ROWS                                                     = 1945;
exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_GIS                                      = 1946;
exports.ER_ILLEGAL_USER_VAR                                                              = 1947;
exports.ER_GTID_MODE_OFF                                                                 = 1948;
exports.ER_UNSUPPORTED_BY_REPLICATION_THREAD                                             = 1949;
exports.ER_INCORRECT_TYPE                                                                = 1950;
exports.ER_FIELD_IN_ORDER_NOT_SELECT                                                     = 1951;
exports.ER_AGGREGATE_IN_ORDER_NOT_SELECT                                                 = 1952;
exports.ER_INVALID_RPL_WILD_TABLE_FILTER_PATTERN                                         = 1953;
exports.ER_NET_OK_PACKET_TOO_LARGE                                                       = 1954;
exports.ER_INVALID_JSON_DATA                                                             = 1955;
exports.ER_INVALID_GEOJSON_MISSING_MEMBER                                                = 1956;
exports.ER_INVALID_GEOJSON_WRONG_TYPE                                                    = 1957;
exports.ER_INVALID_GEOJSON_UNSPECIFIED                                                   = 1958;
exports.ER_DIMENSION_UNSUPPORTED                                                         = 1959;
exports.ER_SLAVE_CHANNEL_DOES_NOT_EXIST                                                  = 1960;
exports.ER_SLAVE_MULTIPLE_CHANNELS_HOST_PORT                                             = 1961;
exports.ER_SLAVE_CHANNEL_NAME_INVALID_OR_TOO_LONG                                        = 1962;
exports.ER_SLAVE_NEW_CHANNEL_WRONG_REPOSITORY                                            = 1963;
exports.ER_SLAVE_CHANNEL_DELETE                                                          = 1964;
exports.ER_SLAVE_MULTIPLE_CHANNELS_CMD                                                   = 1965;
exports.ER_SLAVE_MAX_CHANNELS_EXCEEDED                                                   = 1966;
exports.ER_SLAVE_CHANNEL_MUST_STOP                                                       = 1967;
exports.ER_SLAVE_CHANNEL_NOT_RUNNING                                                     = 1968;
exports.ER_SLAVE_CHANNEL_WAS_RUNNING                                                     = 1969;
exports.ER_SLAVE_CHANNEL_WAS_NOT_RUNNING                                                 = 1970;
exports.ER_SLAVE_CHANNEL_SQL_THREAD_MUST_STOP                                            = 1971;
exports.ER_SLAVE_CHANNEL_SQL_SKIP_COUNTER                                                = 1972;
exports.ER_WRONG_FIELD_WITH_GROUP_V2                                                     = 1973;
exports.ER_MIX_OF_GROUP_FUNC_AND_FIELDS_V2                                               = 1974;
exports.ER_WARN_DEPRECATED_SYSVAR_UPDATE                                                 = 1975;
exports.ER_WARN_DEPRECATED_SQLMODE                                                       = 1976;
exports.ER_CANNOT_LOG_PARTIAL_DROP_DATABASE_WITH_GTID                                    = 1977;
exports.ER_GROUP_REPLICATION_CONFIGURATION                                               = 1978;
exports.ER_GROUP_REPLICATION_RUNNING                                                     = 1979;
exports.ER_GROUP_REPLICATION_APPLIER_INIT_ERROR                                          = 1980;
exports.ER_GROUP_REPLICATION_STOP_APPLIER_THREAD_TIMEOUT                                 = 1981;
exports.ER_GROUP_REPLICATION_COMMUNICATION_LAYER_SESSION_ERROR                           = 1982;
exports.ER_GROUP_REPLICATION_COMMUNICATION_LAYER_JOIN_ERROR                              = 1983;
exports.ER_BEFORE_DML_VALIDATION_ERROR                                                   = 1984;
exports.ER_PREVENTS_VARIABLE_WITHOUT_RBR                                                 = 1985;
exports.ER_RUN_HOOK_ERROR                                                                = 1986;
exports.ER_TRANSACTION_ROLLBACK_DURING_COMMIT                                            = 1987;
exports.ER_GENERATED_COLUMN_FUNCTION_IS_NOT_ALLOWED                                      = 1988;
exports.ER_UNSUPPORTED_ALTER_INPLACE_ON_VIRTUAL_COLUMN                                   = 1989;
exports.ER_WRONG_FK_OPTION_FOR_GENERATED_COLUMN                                          = 1990;
exports.ER_NON_DEFAULT_VALUE_FOR_GENERATED_COLUMN                                        = 1991;
exports.ER_UNSUPPORTED_ACTION_ON_GENERATED_COLUMN                                        = 1992;
exports.ER_GENERATED_COLUMN_NON_PRIOR                                                    = 1993;
exports.ER_DEPENDENT_BY_GENERATED_COLUMN                                                 = 1994;
exports.ER_GENERATED_COLUMN_REF_AUTO_INC                                                 = 1995;
exports.ER_FEATURE_NOT_AVAILABLE                                                         = 1996;
exports.ER_CANT_SET_GTID_MODE                                                            = 1997;
exports.ER_CANT_USE_AUTO_POSITION_WITH_GTID_MODE_OFF                                     = 1998;
exports.ER_CANT_REPLICATE_ANONYMOUS_WITH_AUTO_POSITION                                   = 1999;
exports.ER_CANT_REPLICATE_ANONYMOUS_WITH_GTID_MODE_ON                                    = 2000;
exports.ER_CANT_REPLICATE_GTID_WITH_GTID_MODE_OFF                                        = 2001;
exports.ER_CANT_SET_ENFORCE_GTID_CONSISTENCY_ON_WITH_ONGOING_GTID_VIOLATING_TRANSACTIONS = 2002;
exports.ER_SET_ENFORCE_GTID_CONSISTENCY_WARN_WITH_ONGOING_GTID_VIOLATING_TRANSACTIONS    = 2003;
exports.ER_ACCOUNT_HAS_BEEN_LOCKED                                                       = 2004;
exports.ER_WRONG_TABLESPACE_NAME                                                         = 2005;
exports.ER_TABLESPACE_IS_NOT_EMPTY                                                       = 2006;
exports.ER_WRONG_FILE_NAME                                                               = 2007;
exports.ER_BOOST_GEOMETRY_INCONSISTENT_TURNS_EXCEPTION                                   = 2008;
exports.ER_WARN_OPTIMIZER_HINT_SYNTAX_ERROR                                              = 2009;
exports.ER_WARN_BAD_MAX_EXECUTION_TIME                                                   = 2010;
exports.ER_WARN_UNSUPPORTED_MAX_EXECUTION_TIME                                           = 2011;
exports.ER_WARN_CONFLICTING_HINT                                                         = 2012;
exports.ER_WARN_UNKNOWN_QB_NAME                                                          = 2013;
exports.ER_UNRESOLVED_HINT_NAME                                                          = 2014;
exports.ER_WARN_ON_MODIFYING_GTID_EXECUTED_TABLE                                         = 2015;
exports.ER_PLUGGABLE_PROTOCOL_COMMAND_NOT_SUPPORTED                                      = 2016;
exports.ER_LOCKING_SERVICE_WRONG_NAME                                                    = 2017;
exports.ER_LOCKING_SERVICE_DEADLOCK                                                      = 2018;
exports.ER_LOCKING_SERVICE_TIMEOUT                                                       = 2019;
exports.ER_GIS_MAX_POINTS_IN_GEOMETRY_OVERFLOWED                                         = 2020;
exports.ER_SQL_MODE_MERGED                                                               = 2021;
exports.ER_VTOKEN_PLUGIN_TOKEN_MISMATCH                                                  = 2022;
exports.ER_VTOKEN_PLUGIN_TOKEN_NOT_FOUND                                                 = 2023;
exports.ER_CANT_SET_VARIABLE_WHEN_OWNING_GTID                                            = 2024;
exports.ER_SLAVE_CHANNEL_OPERATION_NOT_ALLOWED                                           = 2025;
exports.ER_INVALID_JSON_TEXT                                                             = 2026;
exports.ER_INVALID_JSON_TEXT_IN_PARAM                                                    = 2027;
exports.ER_INVALID_JSON_BINARY_DATA                                                      = 2028;
exports.ER_INVALID_JSON_PATH                                                             = 2029;
exports.ER_INVALID_JSON_CHARSET                                                          = 2030;
exports.ER_INVALID_JSON_CHARSET_IN_FUNCTION                                              = 2031;
exports.ER_INVALID_TYPE_FOR_JSON                                                         = 2032;
exports.ER_INVALID_CAST_TO_JSON                                                          = 2033;
exports.ER_INVALID_JSON_PATH_CHARSET                                                     = 2034;
exports.ER_INVALID_JSON_PATH_WILDCARD                                                    = 2035;
exports.ER_JSON_VALUE_TOO_BIG                                                            = 2036;
exports.ER_JSON_KEY_TOO_BIG                                                              = 2037;
exports.ER_JSON_USED_AS_KEY                                                              = 2038;
exports.ER_JSON_VACUOUS_PATH                                                             = 2039;
exports.ER_JSON_BAD_ONE_OR_ALL_ARG                                                       = 2040;
exports.ER_NUMERIC_JSON_VALUE_OUT_OF_RANGE                                               = 2041;
exports.ER_INVALID_JSON_VALUE_FOR_CAST                                                   = 2042;
exports.ER_JSON_DOCUMENT_TOO_DEEP                                                        = 2043;
exports.ER_JSON_DOCUMENT_NULL_KEY                                                        = 2044;
exports.ER_SECURE_TRANSPORT_REQUIRED                                                     = 2045;
exports.ER_NO_SECURE_TRANSPORTS_CONFIGURED                                               = 2046;
exports.ER_DISABLED_STORAGE_ENGINE                                                       = 2047;
exports.ER_USER_DOES_NOT_EXIST                                                           = 2048;
exports.ER_USER_ALREADY_EXISTS                                                           = 2049;
exports.ER_AUDIT_API_ABORT                                                               = 2050;
exports.ER_INVALID_JSON_PATH_ARRAY_CELL                                                  = 2051;
exports.ER_BUFPOOL_RESIZE_INPROGRESS                                                     = 2052;
exports.ER_FEATURE_DISABLED_SEE_DOC                                                      = 2053;
exports.ER_SERVER_ISNT_AVAILABLE                                                         = 2054;
exports.ER_SESSION_WAS_KILLED                                                            = 2055;
exports.ER_CAPACITY_EXCEEDED                                                             = 2056;
exports.ER_CAPACITY_EXCEEDED_IN_RANGE_OPTIMIZER                                          = 2057;
exports.ER_TABLE_NEEDS_UPG_PART                                                          = 2058;
exports.ER_CANT_WAIT_FOR_EXECUTED_GTID_SET_WHILE_OWNING_A_GTID                           = 2059;
exports.ER_CANNOT_ADD_FOREIGN_BASE_COL_VIRTUAL                                           = 2060;
exports.ER_CANNOT_CREATE_VIRTUAL_INDEX_CONSTRAINT                                        = 2061;
exports.ER_ERROR_ON_MODIFYING_GTID_EXECUTED_TABLE                                        = 2062;
exports.ER_LOCK_REFUSED_BY_ENGINE                                                        = 2063;
exports.ER_UNSUPPORTED_ALTER_ONLINE_ON_VIRTUAL_COLUMN                                    = 2064;
exports.ER_MASTER_KEY_ROTATION_NOT_SUPPORTED_BY_SE                                       = 2065;
exports.ER_MASTER_KEY_ROTATION_ERROR_BY_SE                                               = 2066;
exports.ER_MASTER_KEY_ROTATION_BINLOG_FAILED                                             = 2067;
exports.ER_MASTER_KEY_ROTATION_SE_UNAVAILABLE                                            = 2068;
exports.ER_TABLESPACE_CANNOT_ENCRYPT                                                     = 2069;
exports.ER_INVALID_ENCRYPTION_OPTION                                                     = 2070;
exports.ER_CANNOT_FIND_KEY_IN_KEYRING                                                    = 2071;
exports.ER_CAPACITY_EXCEEDED_IN_PARSER                                                   = 2072;
exports.ER_UNSUPPORTED_ALTER_ENCRYPTION_INPLACE                                          = 2073;
exports.ER_KEYRING_UDF_KEYRING_SERVICE_ERROR                                             = 2074;
exports.ER_USER_COLUMN_OLD_LENGTH                                                        = 2075;
exports.ER_CANT_RESET_MASTER                                                             = 2076;
exports.ER_GROUP_REPLICATION_MAX_GROUP_SIZE                                              = 2077;
exports.ER_CANNOT_ADD_FOREIGN_BASE_COL_STORED                                            = 2078;
exports.ER_TABLE_REFERENCED                                                              = 2079;
exports.ER_PARTITION_ENGINE_DEPRECATED_FOR_TABLE                                         = 2080;

// Lookup-by-number table
exports[1]    = 'EE_CANTCREATEFILE';
exports[2]    = 'EE_READ';
exports[3]    = 'EE_WRITE';
exports[4]    = 'EE_BADCLOSE';
exports[5]    = 'EE_OUTOFMEMORY';
exports[6]    = 'EE_DELETE';
exports[7]    = 'EE_LINK';
exports[9]    = 'EE_EOFERR';
exports[10]   = 'EE_CANTLOCK';
exports[11]   = 'EE_CANTUNLOCK';
exports[12]   = 'EE_DIR';
exports[13]   = 'EE_STAT';
exports[14]   = 'EE_CANT_CHSIZE';
exports[15]   = 'EE_CANT_OPEN_STREAM';
exports[16]   = 'EE_GETWD';
exports[17]   = 'EE_SETWD';
exports[18]   = 'EE_LINK_WARNING';
exports[19]   = 'EE_OPEN_WARNING';
exports[20]   = 'EE_DISK_FULL';
exports[21]   = 'EE_CANT_MKDIR';
exports[22]   = 'EE_UNKNOWN_CHARSET';
exports[23]   = 'EE_OUT_OF_FILERESOURCES';
exports[24]   = 'EE_CANT_READLINK';
exports[25]   = 'EE_CANT_SYMLINK';
exports[26]   = 'EE_REALPATH';
exports[27]   = 'EE_SYNC';
exports[28]   = 'EE_UNKNOWN_COLLATION';
exports[29]   = 'EE_FILENOTFOUND';
exports[30]   = 'EE_FILE_NOT_CLOSED';
exports[31]   = 'EE_CHANGE_OWNERSHIP';
exports[32]   = 'EE_CHANGE_PERMISSIONS';
exports[33]   = 'EE_CANT_SEEK';
exports[34]   = 'EE_CAPACITY_EXCEEDED';
exports[120]  = 'HA_ERR_KEY_NOT_FOUND';
exports[121]  = 'HA_ERR_FOUND_DUPP_KEY';
exports[122]  = 'HA_ERR_INTERNAL_ERROR';
exports[123]  = 'HA_ERR_RECORD_CHANGED';
exports[124]  = 'HA_ERR_WRONG_INDEX';
exports[126]  = 'HA_ERR_CRASHED';
exports[127]  = 'HA_ERR_WRONG_IN_RECORD';
exports[128]  = 'HA_ERR_OUT_OF_MEM';
exports[130]  = 'HA_ERR_NOT_A_TABLE';
exports[131]  = 'HA_ERR_WRONG_COMMAND';
exports[132]  = 'HA_ERR_OLD_FILE';
exports[133]  = 'HA_ERR_NO_ACTIVE_RECORD';
exports[134]  = 'HA_ERR_RECORD_DELETED';
exports[135]  = 'HA_ERR_RECORD_FILE_FULL';
exports[136]  = 'HA_ERR_INDEX_FILE_FULL';
exports[137]  = 'HA_ERR_END_OF_FILE';
exports[138]  = 'HA_ERR_UNSUPPORTED';
exports[139]  = 'HA_ERR_TOO_BIG_ROW';
exports[140]  = 'HA_WRONG_CREATE_OPTION';
exports[141]  = 'HA_ERR_FOUND_DUPP_UNIQUE';
exports[142]  = 'HA_ERR_UNKNOWN_CHARSET';
exports[143]  = 'HA_ERR_WRONG_MRG_TABLE_DEF';
exports[144]  = 'HA_ERR_CRASHED_ON_REPAIR';
exports[145]  = 'HA_ERR_CRASHED_ON_USAGE';
exports[146]  = 'HA_ERR_LOCK_WAIT_TIMEOUT';
exports[147]  = 'HA_ERR_LOCK_TABLE_FULL';
exports[148]  = 'HA_ERR_READ_ONLY_TRANSACTION';
exports[149]  = 'HA_ERR_LOCK_DEADLOCK';
exports[150]  = 'HA_ERR_CANNOT_ADD_FOREIGN';
exports[151]  = 'HA_ERR_NO_REFERENCED_ROW';
exports[152]  = 'HA_ERR_ROW_IS_REFERENCED';
exports[153]  = 'HA_ERR_NO_SAVEPOINT';
exports[154]  = 'HA_ERR_NON_UNIQUE_BLOCK_SIZE';
exports[155]  = 'HA_ERR_NO_SUCH_TABLE';
exports[156]  = 'HA_ERR_TABLE_EXIST';
exports[157]  = 'HA_ERR_NO_CONNECTION';
exports[158]  = 'HA_ERR_NULL_IN_SPATIAL';
exports[159]  = 'HA_ERR_TABLE_DEF_CHANGED';
exports[160]  = 'HA_ERR_NO_PARTITION_FOUND';
exports[161]  = 'HA_ERR_RBR_LOGGING_FAILED';
exports[162]  = 'HA_ERR_DROP_INDEX_FK';
exports[163]  = 'HA_ERR_FOREIGN_DUPLICATE_KEY';
exports[164]  = 'HA_ERR_TABLE_NEEDS_UPGRADE';
exports[165]  = 'HA_ERR_TABLE_READONLY';
exports[166]  = 'HA_ERR_AUTOINC_READ_FAILED';
exports[167]  = 'HA_ERR_AUTOINC_ERANGE';
exports[168]  = 'HA_ERR_GENERIC';
exports[169]  = 'HA_ERR_RECORD_IS_THE_SAME';
exports[170]  = 'HA_ERR_LOGGING_IMPOSSIBLE';
exports[171]  = 'HA_ERR_CORRUPT_EVENT';
exports[172]  = 'HA_ERR_NEW_FILE';
exports[173]  = 'HA_ERR_ROWS_EVENT_APPLY';
exports[174]  = 'HA_ERR_INITIALIZATION';
exports[175]  = 'HA_ERR_FILE_TOO_SHORT';
exports[176]  = 'HA_ERR_WRONG_CRC';
exports[177]  = 'HA_ERR_TOO_MANY_CONCURRENT_TRXS';
exports[178]  = 'HA_ERR_NOT_IN_LOCK_PARTITIONS';
exports[179]  = 'HA_ERR_INDEX_COL_TOO_LONG';
exports[180]  = 'HA_ERR_INDEX_CORRUPT';
exports[181]  = 'HA_ERR_UNDO_REC_TOO_BIG';
exports[182]  = 'HA_FTS_INVALID_DOCID';
exports[183]  = 'HA_ERR_TABLE_IN_FK_CHECK';
exports[184]  = 'HA_ERR_TABLESPACE_EXISTS';
exports[185]  = 'HA_ERR_TOO_MANY_FIELDS';
exports[186]  = 'HA_ERR_ROW_IN_WRONG_PARTITION';
exports[187]  = 'HA_ERR_INNODB_READ_ONLY';
exports[188]  = 'HA_ERR_FTS_EXCEED_RESULT_CACHE_LIMIT';
exports[189]  = 'HA_ERR_TEMP_FILE_WRITE_FAILURE';
exports[190]  = 'HA_ERR_INNODB_FORCED_RECOVERY';
exports[191]  = 'HA_ERR_FTS_TOO_MANY_WORDS_IN_PHRASE';
exports[192]  = 'HA_ERR_FK_DEPTH_EXCEEDED';
exports[193]  = 'HA_MISSING_CREATE_OPTION';
exports[194]  = 'HA_ERR_SE_OUT_OF_MEMORY';
exports[195]  = 'HA_ERR_TABLE_CORRUPT';
exports[196]  = 'HA_ERR_QUERY_INTERRUPTED';
exports[197]  = 'HA_ERR_TABLESPACE_MISSING';
exports[198]  = 'HA_ERR_TABLESPACE_IS_NOT_EMPTY';
exports[199]  = 'HA_ERR_WRONG_FILE_NAME';
exports[200]  = 'HA_ERR_NOT_ALLOWED_COMMAND';
exports[201]  = 'HA_ERR_COMPUTE_FAILED';
exports[1000] = 'ER_HASHCHK';
exports[1001] = 'ER_NISAMCHK';
exports[1002] = 'ER_NO';
exports[1003] = 'ER_YES';
exports[1004] = 'ER_CANT_CREATE_FILE';
exports[1005] = 'ER_CANT_CREATE_TABLE';
exports[1006] = 'ER_CANT_CREATE_DB';
exports[1007] = 'ER_DB_CREATE_EXISTS';
exports[1008] = 'ER_DB_DROP_EXISTS';
exports[1009] = 'ER_DB_DROP_DELETE';
exports[1010] = 'ER_DB_DROP_RMDIR';
exports[1011] = 'ER_CANT_DELETE_FILE';
exports[1012] = 'ER_CANT_FIND_SYSTEM_REC';
exports[1013] = 'ER_CANT_GET_STAT';
exports[1014] = 'ER_CANT_GET_WD';
exports[1015] = 'ER_CANT_LOCK';
exports[1016] = 'ER_CANT_OPEN_FILE';
exports[1017] = 'ER_FILE_NOT_FOUND';
exports[1018] = 'ER_CANT_READ_DIR';
exports[1019] = 'ER_CANT_SET_WD';
exports[1020] = 'ER_CHECKREAD';
exports[1021] = 'ER_DISK_FULL';
exports[1022] = 'ER_DUP_KEY';
exports[1023] = 'ER_ERROR_ON_CLOSE';
exports[1024] = 'ER_ERROR_ON_READ';
exports[1025] = 'ER_ERROR_ON_RENAME';
exports[1026] = 'ER_ERROR_ON_WRITE';
exports[1027] = 'ER_FILE_USED';
exports[1028] = 'ER_FILSORT_ABORT';
exports[1029] = 'ER_FORM_NOT_FOUND';
exports[1030] = 'ER_GET_ERRNO';
exports[1031] = 'ER_ILLEGAL_HA';
exports[1032] = 'ER_KEY_NOT_FOUND';
exports[1033] = 'ER_NOT_FORM_FILE';
exports[1034] = 'ER_NOT_KEYFILE';
exports[1035] = 'ER_OLD_KEYFILE';
exports[1036] = 'ER_OPEN_AS_READONLY';
exports[1037] = 'ER_OUTOFMEMORY';
exports[1038] = 'ER_OUT_OF_SORTMEMORY';
exports[1039] = 'ER_UNEXPECTED_EOF';
exports[1040] = 'ER_CON_COUNT_ERROR';
exports[1041] = 'ER_OUT_OF_RESOURCES';
exports[1042] = 'ER_BAD_HOST_ERROR';
exports[1043] = 'ER_HANDSHAKE_ERROR';
exports[1044] = 'ER_DBACCESS_DENIED_ERROR';
exports[1045] = 'ER_ACCESS_DENIED_ERROR';
exports[1046] = 'ER_NO_DB_ERROR';
exports[1047] = 'ER_UNKNOWN_COM_ERROR';
exports[1048] = 'ER_BAD_NULL_ERROR';
exports[1049] = 'ER_BAD_DB_ERROR';
exports[1050] = 'ER_TABLE_EXISTS_ERROR';
exports[1051] = 'ER_BAD_TABLE_ERROR';
exports[1052] = 'ER_NON_UNIQ_ERROR';
exports[1053] = 'ER_SERVER_SHUTDOWN';
exports[1054] = 'ER_BAD_FIELD_ERROR';
exports[1055] = 'ER_WRONG_FIELD_WITH_GROUP';
exports[1056] = 'ER_WRONG_GROUP_FIELD';
exports[1057] = 'ER_WRONG_SUM_SELECT';
exports[1058] = 'ER_WRONG_VALUE_COUNT';
exports[1059] = 'ER_TOO_LONG_IDENT';
exports[1060] = 'ER_DUP_FIELDNAME';
exports[1061] = 'ER_DUP_KEYNAME';
exports[1062] = 'ER_DUP_ENTRY';
exports[1063] = 'ER_WRONG_FIELD_SPEC';
exports[1064] = 'ER_PARSE_ERROR';
exports[1065] = 'ER_EMPTY_QUERY';
exports[1066] = 'ER_NONUNIQ_TABLE';
exports[1067] = 'ER_INVALID_DEFAULT';
exports[1068] = 'ER_MULTIPLE_PRI_KEY';
exports[1069] = 'ER_TOO_MANY_KEYS';
exports[1070] = 'ER_TOO_MANY_KEY_PARTS';
exports[1071] = 'ER_TOO_LONG_KEY';
exports[1072] = 'ER_KEY_COLUMN_DOES_NOT_EXITS';
exports[1073] = 'ER_BLOB_USED_AS_KEY';
exports[1074] = 'ER_TOO_BIG_FIELDLENGTH';
exports[1075] = 'ER_WRONG_AUTO_KEY';
exports[1076] = 'ER_READY';
exports[1077] = 'ER_NORMAL_SHUTDOWN';
exports[1078] = 'ER_GOT_SIGNAL';
exports[1079] = 'ER_SHUTDOWN_COMPLETE';
exports[1080] = 'ER_FORCING_CLOSE';
exports[1081] = 'ER_IPSOCK_ERROR';
exports[1082] = 'ER_NO_SUCH_INDEX';
exports[1083] = 'ER_WRONG_FIELD_TERMINATORS';
exports[1084] = 'ER_BLOBS_AND_NO_TERMINATED';
exports[1085] = 'ER_TEXTFILE_NOT_READABLE';
exports[1086] = 'ER_FILE_EXISTS_ERROR';
exports[1087] = 'ER_LOAD_INFO';
exports[1088] = 'ER_ALTER_INFO';
exports[1089] = 'ER_WRONG_SUB_KEY';
exports[1090] = 'ER_CANT_REMOVE_ALL_FIELDS';
exports[1091] = 'ER_CANT_DROP_FIELD_OR_KEY';
exports[1092] = 'ER_INSERT_INFO';
exports[1093] = 'ER_UPDATE_TABLE_USED';
exports[1094] = 'ER_NO_SUCH_THREAD';
exports[1095] = 'ER_KILL_DENIED_ERROR';
exports[1096] = 'ER_NO_TABLES_USED';
exports[1097] = 'ER_TOO_BIG_SET';
exports[1098] = 'ER_NO_UNIQUE_LOGFILE';
exports[1099] = 'ER_TABLE_NOT_LOCKED_FOR_WRITE';
exports[1100] = 'ER_TABLE_NOT_LOCKED';
exports[1101] = 'ER_BLOB_CANT_HAVE_DEFAULT';
exports[1102] = 'ER_WRONG_DB_NAME';
exports[1103] = 'ER_WRONG_TABLE_NAME';
exports[1104] = 'ER_TOO_BIG_SELECT';
exports[1105] = 'ER_UNKNOWN_ERROR';
exports[1106] = 'ER_UNKNOWN_PROCEDURE';
exports[1107] = 'ER_WRONG_PARAMCOUNT_TO_PROCEDURE';
exports[1108] = 'ER_WRONG_PARAMETERS_TO_PROCEDURE';
exports[1109] = 'ER_UNKNOWN_TABLE';
exports[1110] = 'ER_FIELD_SPECIFIED_TWICE';
exports[1111] = 'ER_INVALID_GROUP_FUNC_USE';
exports[1112] = 'ER_UNSUPPORTED_EXTENSION';
exports[1113] = 'ER_TABLE_MUST_HAVE_COLUMNS';
exports[1114] = 'ER_RECORD_FILE_FULL';
exports[1115] = 'ER_UNKNOWN_CHARACTER_SET';
exports[1116] = 'ER_TOO_MANY_TABLES';
exports[1117] = 'ER_TOO_MANY_FIELDS';
exports[1118] = 'ER_TOO_BIG_ROWSIZE';
exports[1119] = 'ER_STACK_OVERRUN';
exports[1120] = 'ER_WRONG_OUTER_JOIN';
exports[1121] = 'ER_NULL_COLUMN_IN_INDEX';
exports[1122] = 'ER_CANT_FIND_UDF';
exports[1123] = 'ER_CANT_INITIALIZE_UDF';
exports[1124] = 'ER_UDF_NO_PATHS';
exports[1125] = 'ER_UDF_EXISTS';
exports[1126] = 'ER_CANT_OPEN_LIBRARY';
exports[1127] = 'ER_CANT_FIND_DL_ENTRY';
exports[1128] = 'ER_FUNCTION_NOT_DEFINED';
exports[1129] = 'ER_HOST_IS_BLOCKED';
exports[1130] = 'ER_HOST_NOT_PRIVILEGED';
exports[1131] = 'ER_PASSWORD_ANONYMOUS_USER';
exports[1132] = 'ER_PASSWORD_NOT_ALLOWED';
exports[1133] = 'ER_PASSWORD_NO_MATCH';
exports[1134] = 'ER_UPDATE_INFO';
exports[1135] = 'ER_CANT_CREATE_THREAD';
exports[1136] = 'ER_WRONG_VALUE_COUNT_ON_ROW';
exports[1137] = 'ER_CANT_REOPEN_TABLE';
exports[1138] = 'ER_INVALID_USE_OF_NULL';
exports[1139] = 'ER_REGEXP_ERROR';
exports[1140] = 'ER_MIX_OF_GROUP_FUNC_AND_FIELDS';
exports[1141] = 'ER_NONEXISTING_GRANT';
exports[1142] = 'ER_TABLEACCESS_DENIED_ERROR';
exports[1143] = 'ER_COLUMNACCESS_DENIED_ERROR';
exports[1144] = 'ER_ILLEGAL_GRANT_FOR_TABLE';
exports[1145] = 'ER_GRANT_WRONG_HOST_OR_USER';
exports[1146] = 'ER_NO_SUCH_TABLE';
exports[1147] = 'ER_NONEXISTING_TABLE_GRANT';
exports[1148] = 'ER_NOT_ALLOWED_COMMAND';
exports[1149] = 'ER_SYNTAX_ERROR';
exports[1150] = 'ER_DELAYED_CANT_CHANGE_LOCK';
exports[1151] = 'ER_TOO_MANY_DELAYED_THREADS';
exports[1152] = 'ER_ABORTING_CONNECTION';
exports[1153] = 'ER_NET_PACKET_TOO_LARGE';
exports[1154] = 'ER_NET_READ_ERROR_FROM_PIPE';
exports[1155] = 'ER_NET_FCNTL_ERROR';
exports[1156] = 'ER_NET_PACKETS_OUT_OF_ORDER';
exports[1157] = 'ER_NET_UNCOMPRESS_ERROR';
exports[1158] = 'ER_NET_READ_ERROR';
exports[1159] = 'ER_NET_READ_INTERRUPTED';
exports[1160] = 'ER_NET_ERROR_ON_WRITE';
exports[1161] = 'ER_NET_WRITE_INTERRUPTED';
exports[1162] = 'ER_TOO_LONG_STRING';
exports[1163] = 'ER_TABLE_CANT_HANDLE_BLOB';
exports[1164] = 'ER_TABLE_CANT_HANDLE_AUTO_INCREMENT';
exports[1165] = 'ER_DELAYED_INSERT_TABLE_LOCKED';
exports[1166] = 'ER_WRONG_COLUMN_NAME';
exports[1167] = 'ER_WRONG_KEY_COLUMN';
exports[1168] = 'ER_WRONG_MRG_TABLE';
exports[1169] = 'ER_DUP_UNIQUE';
exports[1170] = 'ER_BLOB_KEY_WITHOUT_LENGTH';
exports[1171] = 'ER_PRIMARY_CANT_HAVE_NULL';
exports[1172] = 'ER_TOO_MANY_ROWS';
exports[1173] = 'ER_REQUIRES_PRIMARY_KEY';
exports[1174] = 'ER_NO_RAID_COMPILED';
exports[1175] = 'ER_UPDATE_WITHOUT_KEY_IN_SAFE_MODE';
exports[1176] = 'ER_KEY_DOES_NOT_EXITS';
exports[1177] = 'ER_CHECK_NO_SUCH_TABLE';
exports[1178] = 'ER_CHECK_NOT_IMPLEMENTED';
exports[1179] = 'ER_CANT_DO_THIS_DURING_AN_TRANSACTION';
exports[1180] = 'ER_ERROR_DURING_COMMIT';
exports[1181] = 'ER_ERROR_DURING_ROLLBACK';
exports[1182] = 'ER_ERROR_DURING_FLUSH_LOGS';
exports[1183] = 'ER_ERROR_DURING_CHECKPOINT';
exports[1184] = 'ER_NEW_ABORTING_CONNECTION';
exports[1185] = 'ER_DUMP_NOT_IMPLEMENTED';
exports[1186] = 'ER_FLUSH_MASTER_BINLOG_CLOSED';
exports[1187] = 'ER_INDEX_REBUILD';
exports[1188] = 'ER_MASTER';
exports[1189] = 'ER_MASTER_NET_READ';
exports[1190] = 'ER_MASTER_NET_WRITE';
exports[1191] = 'ER_FT_MATCHING_KEY_NOT_FOUND';
exports[1192] = 'ER_LOCK_OR_ACTIVE_TRANSACTION';
exports[1193] = 'ER_UNKNOWN_SYSTEM_VARIABLE';
exports[1194] = 'ER_CRASHED_ON_USAGE';
exports[1195] = 'ER_CRASHED_ON_REPAIR';
exports[1196] = 'ER_WARNING_NOT_COMPLETE_ROLLBACK';
exports[1197] = 'ER_TRANS_CACHE_FULL';
exports[1198] = 'ER_SLAVE_MUST_STOP';
exports[1199] = 'ER_SLAVE_NOT_RUNNING';
exports[1200] = 'ER_BAD_SLAVE';
exports[1201] = 'ER_MASTER_INFO';
exports[1202] = 'ER_SLAVE_THREAD';
exports[1203] = 'ER_TOO_MANY_USER_CONNECTIONS';
exports[1204] = 'ER_SET_CONSTANTS_ONLY';
exports[1205] = 'ER_LOCK_WAIT_TIMEOUT';
exports[1206] = 'ER_LOCK_TABLE_FULL';
exports[1207] = 'ER_READ_ONLY_TRANSACTION';
exports[1208] = 'ER_DROP_DB_WITH_READ_LOCK';
exports[1209] = 'ER_CREATE_DB_WITH_READ_LOCK';
exports[1210] = 'ER_WRONG_ARGUMENTS';
exports[1211] = 'ER_NO_PERMISSION_TO_CREATE_USER';
exports[1212] = 'ER_UNION_TABLES_IN_DIFFERENT_DIR';
exports[1213] = 'ER_LOCK_DEADLOCK';
exports[1214] = 'ER_TABLE_CANT_HANDLE_FT';
exports[1215] = 'ER_CANNOT_ADD_FOREIGN';
exports[1216] = 'ER_NO_REFERENCED_ROW';
exports[1217] = 'ER_ROW_IS_REFERENCED';
exports[1218] = 'ER_CONNECT_TO_MASTER';
exports[1219] = 'ER_QUERY_ON_MASTER';
exports[1220] = 'ER_ERROR_WHEN_EXECUTING_COMMAND';
exports[1221] = 'ER_WRONG_USAGE';
exports[1222] = 'ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT';
exports[1223] = 'ER_CANT_UPDATE_WITH_READLOCK';
exports[1224] = 'ER_MIXING_NOT_ALLOWED';
exports[1225] = 'ER_DUP_ARGUMENT';
exports[1226] = 'ER_USER_LIMIT_REACHED';
exports[1227] = 'ER_SPECIFIC_ACCESS_DENIED_ERROR';
exports[1228] = 'ER_LOCAL_VARIABLE';
exports[1229] = 'ER_GLOBAL_VARIABLE';
exports[1230] = 'ER_NO_DEFAULT';
exports[1231] = 'ER_WRONG_VALUE_FOR_VAR';
exports[1232] = 'ER_WRONG_TYPE_FOR_VAR';
exports[1233] = 'ER_VAR_CANT_BE_READ';
exports[1234] = 'ER_CANT_USE_OPTION_HERE';
exports[1235] = 'ER_NOT_SUPPORTED_YET';
exports[1236] = 'ER_MASTER_FATAL_ERROR_READING_BINLOG';
exports[1237] = 'ER_SLAVE_IGNORED_TABLE';
exports[1238] = 'ER_INCORRECT_GLOBAL_LOCAL_VAR';
exports[1239] = 'ER_WRONG_FK_DEF';
exports[1240] = 'ER_KEY_REF_DO_NOT_MATCH_TABLE_REF';
exports[1241] = 'ER_OPERAND_COLUMNS';
exports[1242] = 'ER_SUBQUERY_NO_1_ROW';
exports[1243] = 'ER_UNKNOWN_STMT_HANDLER';
exports[1244] = 'ER_CORRUPT_HELP_DB';
exports[1245] = 'ER_CYCLIC_REFERENCE';
exports[1246] = 'ER_AUTO_CONVERT';
exports[1247] = 'ER_ILLEGAL_REFERENCE';
exports[1248] = 'ER_DERIVED_MUST_HAVE_ALIAS';
exports[1249] = 'ER_SELECT_REDUCED';
exports[1250] = 'ER_TABLENAME_NOT_ALLOWED_HERE';
exports[1251] = 'ER_NOT_SUPPORTED_AUTH_MODE';
exports[1252] = 'ER_SPATIAL_CANT_HAVE_NULL';
exports[1253] = 'ER_COLLATION_CHARSET_MISMATCH';
exports[1254] = 'ER_SLAVE_WAS_RUNNING';
exports[1255] = 'ER_SLAVE_WAS_NOT_RUNNING';
exports[1256] = 'ER_TOO_BIG_FOR_UNCOMPRESS';
exports[1257] = 'ER_ZLIB_Z_MEM_ERROR';
exports[1258] = 'ER_ZLIB_Z_BUF_ERROR';
exports[1259] = 'ER_ZLIB_Z_DATA_ERROR';
exports[1260] = 'ER_CUT_VALUE_GROUP_CONCAT';
exports[1261] = 'ER_WARN_TOO_FEW_RECORDS';
exports[1262] = 'ER_WARN_TOO_MANY_RECORDS';
exports[1263] = 'ER_WARN_NULL_TO_NOTNULL';
exports[1264] = 'ER_WARN_DATA_OUT_OF_RANGE';
exports[1265] = 'WARN_DATA_TRUNCATED';
exports[1266] = 'ER_WARN_USING_OTHER_HANDLER';
exports[1267] = 'ER_CANT_AGGREGATE_2COLLATIONS';
exports[1268] = 'ER_DROP_USER';
exports[1269] = 'ER_REVOKE_GRANTS';
exports[1270] = 'ER_CANT_AGGREGATE_3COLLATIONS';
exports[1271] = 'ER_CANT_AGGREGATE_NCOLLATIONS';
exports[1272] = 'ER_VARIABLE_IS_NOT_STRUCT';
exports[1273] = 'ER_UNKNOWN_COLLATION';
exports[1274] = 'ER_SLAVE_IGNORED_SSL_PARAMS';
exports[1275] = 'ER_SERVER_IS_IN_SECURE_AUTH_MODE';
exports[1276] = 'ER_WARN_FIELD_RESOLVED';
exports[1277] = 'ER_BAD_SLAVE_UNTIL_COND';
exports[1278] = 'ER_MISSING_SKIP_SLAVE';
exports[1279] = 'ER_UNTIL_COND_IGNORED';
exports[1280] = 'ER_WRONG_NAME_FOR_INDEX';
exports[1281] = 'ER_WRONG_NAME_FOR_CATALOG';
exports[1282] = 'ER_WARN_QC_RESIZE';
exports[1283] = 'ER_BAD_FT_COLUMN';
exports[1284] = 'ER_UNKNOWN_KEY_CACHE';
exports[1285] = 'ER_WARN_HOSTNAME_WONT_WORK';
exports[1286] = 'ER_UNKNOWN_STORAGE_ENGINE';
exports[1287] = 'ER_WARN_DEPRECATED_SYNTAX';
exports[1288] = 'ER_NON_UPDATABLE_TABLE';
exports[1289] = 'ER_FEATURE_DISABLED';
exports[1290] = 'ER_OPTION_PREVENTS_STATEMENT';
exports[1291] = 'ER_DUPLICATED_VALUE_IN_TYPE';
exports[1292] = 'ER_TRUNCATED_WRONG_VALUE';
exports[1293] = 'ER_TOO_MUCH_AUTO_TIMESTAMP_COLS';
exports[1294] = 'ER_INVALID_ON_UPDATE';
exports[1295] = 'ER_UNSUPPORTED_PS';
exports[1296] = 'ER_GET_ERRMSG';
exports[1297] = 'ER_GET_TEMPORARY_ERRMSG';
exports[1298] = 'ER_UNKNOWN_TIME_ZONE';
exports[1299] = 'ER_WARN_INVALID_TIMESTAMP';
exports[1300] = 'ER_INVALID_CHARACTER_STRING';
exports[1301] = 'ER_WARN_ALLOWED_PACKET_OVERFLOWED';
exports[1302] = 'ER_CONFLICTING_DECLARATIONS';
exports[1303] = 'ER_SP_NO_RECURSIVE_CREATE';
exports[1304] = 'ER_SP_ALREADY_EXISTS';
exports[1305] = 'ER_SP_DOES_NOT_EXIST';
exports[1306] = 'ER_SP_DROP_FAILED';
exports[1307] = 'ER_SP_STORE_FAILED';
exports[1308] = 'ER_SP_LILABEL_MISMATCH';
exports[1309] = 'ER_SP_LABEL_REDEFINE';
exports[1310] = 'ER_SP_LABEL_MISMATCH';
exports[1311] = 'ER_SP_UNINIT_VAR';
exports[1312] = 'ER_SP_BADSELECT';
exports[1313] = 'ER_SP_BADRETURN';
exports[1314] = 'ER_SP_BADSTATEMENT';
exports[1315] = 'ER_UPDATE_LOG_DEPRECATED_IGNORED';
exports[1316] = 'ER_UPDATE_LOG_DEPRECATED_TRANSLATED';
exports[1317] = 'ER_QUERY_INTERRUPTED';
exports[1318] = 'ER_SP_WRONG_NO_OF_ARGS';
exports[1319] = 'ER_SP_COND_MISMATCH';
exports[1320] = 'ER_SP_NORETURN';
exports[1321] = 'ER_SP_NORETURNEND';
exports[1322] = 'ER_SP_BAD_CURSOR_QUERY';
exports[1323] = 'ER_SP_BAD_CURSOR_SELECT';
exports[1324] = 'ER_SP_CURSOR_MISMATCH';
exports[1325] = 'ER_SP_CURSOR_ALREADY_OPEN';
exports[1326] = 'ER_SP_CURSOR_NOT_OPEN';
exports[1327] = 'ER_SP_UNDECLARED_VAR';
exports[1328] = 'ER_SP_WRONG_NO_OF_FETCH_ARGS';
exports[1329] = 'ER_SP_FETCH_NO_DATA';
exports[1330] = 'ER_SP_DUP_PARAM';
exports[1331] = 'ER_SP_DUP_VAR';
exports[1332] = 'ER_SP_DUP_COND';
exports[1333] = 'ER_SP_DUP_CURS';
exports[1334] = 'ER_SP_CANT_ALTER';
exports[1335] = 'ER_SP_SUBSELECT_NYI';
exports[1336] = 'ER_STMT_NOT_ALLOWED_IN_SF_OR_TRG';
exports[1337] = 'ER_SP_VARCOND_AFTER_CURSHNDLR';
exports[1338] = 'ER_SP_CURSOR_AFTER_HANDLER';
exports[1339] = 'ER_SP_CASE_NOT_FOUND';
exports[1340] = 'ER_FPARSER_TOO_BIG_FILE';
exports[1341] = 'ER_FPARSER_BAD_HEADER';
exports[1342] = 'ER_FPARSER_EOF_IN_COMMENT';
exports[1343] = 'ER_FPARSER_ERROR_IN_PARAMETER';
exports[1344] = 'ER_FPARSER_EOF_IN_UNKNOWN_PARAMETER';
exports[1345] = 'ER_VIEW_NO_EXPLAIN';
exports[1346] = 'ER_FRM_UNKNOWN_TYPE';
exports[1347] = 'ER_WRONG_OBJECT';
exports[1348] = 'ER_NONUPDATEABLE_COLUMN';
exports[1349] = 'ER_VIEW_SELECT_DERIVED';
exports[1350] = 'ER_VIEW_SELECT_CLAUSE';
exports[1351] = 'ER_VIEW_SELECT_VARIABLE';
exports[1352] = 'ER_VIEW_SELECT_TMPTABLE';
exports[1353] = 'ER_VIEW_WRONG_LIST';
exports[1354] = 'ER_WARN_VIEW_MERGE';
exports[1355] = 'ER_WARN_VIEW_WITHOUT_KEY';
exports[1356] = 'ER_VIEW_INVALID';
exports[1357] = 'ER_SP_NO_DROP_SP';
exports[1358] = 'ER_SP_GOTO_IN_HNDLR';
exports[1359] = 'ER_TRG_ALREADY_EXISTS';
exports[1360] = 'ER_TRG_DOES_NOT_EXIST';
exports[1361] = 'ER_TRG_ON_VIEW_OR_TEMP_TABLE';
exports[1362] = 'ER_TRG_CANT_CHANGE_ROW';
exports[1363] = 'ER_TRG_NO_SUCH_ROW_IN_TRG';
exports[1364] = 'ER_NO_DEFAULT_FOR_FIELD';
exports[1365] = 'ER_DIVISION_BY_ZERO';
exports[1366] = 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD';
exports[1367] = 'ER_ILLEGAL_VALUE_FOR_TYPE';
exports[1368] = 'ER_VIEW_NONUPD_CHECK';
exports[1369] = 'ER_VIEW_CHECK_FAILED';
exports[1370] = 'ER_PROCACCESS_DENIED_ERROR';
exports[1371] = 'ER_RELAY_LOG_FAIL';
exports[1372] = 'ER_PASSWD_LENGTH';
exports[1373] = 'ER_UNKNOWN_TARGET_BINLOG';
exports[1374] = 'ER_IO_ERR_LOG_INDEX_READ';
exports[1375] = 'ER_BINLOG_PURGE_PROHIBITED';
exports[1376] = 'ER_FSEEK_FAIL';
exports[1377] = 'ER_BINLOG_PURGE_FATAL_ERR';
exports[1378] = 'ER_LOG_IN_USE';
exports[1379] = 'ER_LOG_PURGE_UNKNOWN_ERR';
exports[1380] = 'ER_RELAY_LOG_INIT';
exports[1381] = 'ER_NO_BINARY_LOGGING';
exports[1382] = 'ER_RESERVED_SYNTAX';
exports[1383] = 'ER_WSAS_FAILED';
exports[1384] = 'ER_DIFF_GROUPS_PROC';
exports[1385] = 'ER_NO_GROUP_FOR_PROC';
exports[1386] = 'ER_ORDER_WITH_PROC';
exports[1387] = 'ER_LOGGING_PROHIBIT_CHANGING_OF';
exports[1388] = 'ER_NO_FILE_MAPPING';
exports[1389] = 'ER_WRONG_MAGIC';
exports[1390] = 'ER_PS_MANY_PARAM';
exports[1391] = 'ER_KEY_PART_0';
exports[1392] = 'ER_VIEW_CHECKSUM';
exports[1393] = 'ER_VIEW_MULTIUPDATE';
exports[1394] = 'ER_VIEW_NO_INSERT_FIELD_LIST';
exports[1395] = 'ER_VIEW_DELETE_MERGE_VIEW';
exports[1396] = 'ER_CANNOT_USER';
exports[1397] = 'ER_XAER_NOTA';
exports[1398] = 'ER_XAER_INVAL';
exports[1399] = 'ER_XAER_RMFAIL';
exports[1400] = 'ER_XAER_OUTSIDE';
exports[1401] = 'ER_XAER_RMERR';
exports[1402] = 'ER_XA_RBROLLBACK';
exports[1403] = 'ER_NONEXISTING_PROC_GRANT';
exports[1404] = 'ER_PROC_AUTO_GRANT_FAIL';
exports[1405] = 'ER_PROC_AUTO_REVOKE_FAIL';
exports[1406] = 'ER_DATA_TOO_LONG';
exports[1407] = 'ER_SP_BAD_SQLSTATE';
exports[1408] = 'ER_STARTUP';
exports[1409] = 'ER_LOAD_FROM_FIXED_SIZE_ROWS_TO_VAR';
exports[1410] = 'ER_CANT_CREATE_USER_WITH_GRANT';
exports[1411] = 'ER_WRONG_VALUE_FOR_TYPE';
exports[1412] = 'ER_TABLE_DEF_CHANGED';
exports[1413] = 'ER_SP_DUP_HANDLER';
exports[1414] = 'ER_SP_NOT_VAR_ARG';
exports[1415] = 'ER_SP_NO_RETSET';
exports[1416] = 'ER_CANT_CREATE_GEOMETRY_OBJECT';
exports[1417] = 'ER_FAILED_ROUTINE_BREAK_BINLOG';
exports[1418] = 'ER_BINLOG_UNSAFE_ROUTINE';
exports[1419] = 'ER_BINLOG_CREATE_ROUTINE_NEED_SUPER';
exports[1420] = 'ER_EXEC_STMT_WITH_OPEN_CURSOR';
exports[1421] = 'ER_STMT_HAS_NO_OPEN_CURSOR';
exports[1422] = 'ER_COMMIT_NOT_ALLOWED_IN_SF_OR_TRG';
exports[1423] = 'ER_NO_DEFAULT_FOR_VIEW_FIELD';
exports[1424] = 'ER_SP_NO_RECURSION';
exports[1425] = 'ER_TOO_BIG_SCALE';
exports[1426] = 'ER_TOO_BIG_PRECISION';
exports[1427] = 'ER_M_BIGGER_THAN_D';
exports[1428] = 'ER_WRONG_LOCK_OF_SYSTEM_TABLE';
exports[1429] = 'ER_CONNECT_TO_FOREIGN_DATA_SOURCE';
exports[1430] = 'ER_QUERY_ON_FOREIGN_DATA_SOURCE';
exports[1431] = 'ER_FOREIGN_DATA_SOURCE_DOESNT_EXIST';
exports[1432] = 'ER_FOREIGN_DATA_STRING_INVALID_CANT_CREATE';
exports[1433] = 'ER_FOREIGN_DATA_STRING_INVALID';
exports[1434] = 'ER_CANT_CREATE_FEDERATED_TABLE';
exports[1435] = 'ER_TRG_IN_WRONG_SCHEMA';
exports[1436] = 'ER_STACK_OVERRUN_NEED_MORE';
exports[1437] = 'ER_TOO_LONG_BODY';
exports[1438] = 'ER_WARN_CANT_DROP_DEFAULT_KEYCACHE';
exports[1439] = 'ER_TOO_BIG_DISPLAYWIDTH';
exports[1440] = 'ER_XAER_DUPID';
exports[1441] = 'ER_DATETIME_FUNCTION_OVERFLOW';
exports[1442] = 'ER_CANT_UPDATE_USED_TABLE_IN_SF_OR_TRG';
exports[1443] = 'ER_VIEW_PREVENT_UPDATE';
exports[1444] = 'ER_PS_NO_RECURSION';
exports[1445] = 'ER_SP_CANT_SET_AUTOCOMMIT';
exports[1446] = 'ER_MALFORMED_DEFINER';
exports[1447] = 'ER_VIEW_FRM_NO_USER';
exports[1448] = 'ER_VIEW_OTHER_USER';
exports[1449] = 'ER_NO_SUCH_USER';
exports[1450] = 'ER_FORBID_SCHEMA_CHANGE';
exports[1451] = 'ER_ROW_IS_REFERENCED_2';
exports[1452] = 'ER_NO_REFERENCED_ROW_2';
exports[1453] = 'ER_SP_BAD_VAR_SHADOW';
exports[1454] = 'ER_TRG_NO_DEFINER';
exports[1455] = 'ER_OLD_FILE_FORMAT';
exports[1456] = 'ER_SP_RECURSION_LIMIT';
exports[1457] = 'ER_SP_PROC_TABLE_CORRUPT';
exports[1458] = 'ER_SP_WRONG_NAME';
exports[1459] = 'ER_TABLE_NEEDS_UPGRADE';
exports[1460] = 'ER_SP_NO_AGGREGATE';
exports[1461] = 'ER_MAX_PREPARED_STMT_COUNT_REACHED';
exports[1462] = 'ER_VIEW_RECURSIVE';
exports[1463] = 'ER_NON_GROUPING_FIELD_USED';
exports[1464] = 'ER_TABLE_CANT_HANDLE_SPKEYS';
exports[1465] = 'ER_NO_TRIGGERS_ON_SYSTEM_SCHEMA';
exports[1466] = 'ER_REMOVED_SPACES';
exports[1467] = 'ER_AUTOINC_READ_FAILED';
exports[1468] = 'ER_USERNAME';
exports[1469] = 'ER_HOSTNAME';
exports[1470] = 'ER_WRONG_STRING_LENGTH';
exports[1471] = 'ER_NON_INSERTABLE_TABLE';
exports[1472] = 'ER_ADMIN_WRONG_MRG_TABLE';
exports[1473] = 'ER_TOO_HIGH_LEVEL_OF_NESTING_FOR_SELECT';
exports[1474] = 'ER_NAME_BECOMES_EMPTY';
exports[1475] = 'ER_AMBIGUOUS_FIELD_TERM';
exports[1476] = 'ER_FOREIGN_SERVER_EXISTS';
exports[1477] = 'ER_FOREIGN_SERVER_DOESNT_EXIST';
exports[1478] = 'ER_ILLEGAL_HA_CREATE_OPTION';
exports[1479] = 'ER_PARTITION_REQUIRES_VALUES_ERROR';
exports[1480] = 'ER_PARTITION_WRONG_VALUES_ERROR';
exports[1481] = 'ER_PARTITION_MAXVALUE_ERROR';
exports[1482] = 'ER_PARTITION_SUBPARTITION_ERROR';
exports[1483] = 'ER_PARTITION_SUBPART_MIX_ERROR';
exports[1484] = 'ER_PARTITION_WRONG_NO_PART_ERROR';
exports[1485] = 'ER_PARTITION_WRONG_NO_SUBPART_ERROR';
exports[1486] = 'ER_WRONG_EXPR_IN_PARTITION_FUNC_ERROR';
exports[1487] = 'ER_NO_CONST_EXPR_IN_RANGE_OR_LIST_ERROR';
exports[1488] = 'ER_FIELD_NOT_FOUND_PART_ERROR';
exports[1489] = 'ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR';
exports[1490] = 'ER_INCONSISTENT_PARTITION_INFO_ERROR';
exports[1491] = 'ER_PARTITION_FUNC_NOT_ALLOWED_ERROR';
exports[1492] = 'ER_PARTITIONS_MUST_BE_DEFINED_ERROR';
exports[1493] = 'ER_RANGE_NOT_INCREASING_ERROR';
exports[1494] = 'ER_INCONSISTENT_TYPE_OF_FUNCTIONS_ERROR';
exports[1495] = 'ER_MULTIPLE_DEF_CONST_IN_LIST_PART_ERROR';
exports[1496] = 'ER_PARTITION_ENTRY_ERROR';
exports[1497] = 'ER_MIX_HANDLER_ERROR';
exports[1498] = 'ER_PARTITION_NOT_DEFINED_ERROR';
exports[1499] = 'ER_TOO_MANY_PARTITIONS_ERROR';
exports[1500] = 'ER_SUBPARTITION_ERROR';
exports[1501] = 'ER_CANT_CREATE_HANDLER_FILE';
exports[1502] = 'ER_BLOB_FIELD_IN_PART_FUNC_ERROR';
exports[1503] = 'ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF';
exports[1504] = 'ER_NO_PARTS_ERROR';
exports[1505] = 'ER_PARTITION_MGMT_ON_NONPARTITIONED';
exports[1506] = 'ER_FOREIGN_KEY_ON_PARTITIONED';
exports[1507] = 'ER_DROP_PARTITION_NON_EXISTENT';
exports[1508] = 'ER_DROP_LAST_PARTITION';
exports[1509] = 'ER_COALESCE_ONLY_ON_HASH_PARTITION';
exports[1510] = 'ER_REORG_HASH_ONLY_ON_SAME_NO';
exports[1511] = 'ER_REORG_NO_PARAM_ERROR';
exports[1512] = 'ER_ONLY_ON_RANGE_LIST_PARTITION';
exports[1513] = 'ER_ADD_PARTITION_SUBPART_ERROR';
exports[1514] = 'ER_ADD_PARTITION_NO_NEW_PARTITION';
exports[1515] = 'ER_COALESCE_PARTITION_NO_PARTITION';
exports[1516] = 'ER_REORG_PARTITION_NOT_EXIST';
exports[1517] = 'ER_SAME_NAME_PARTITION';
exports[1518] = 'ER_NO_BINLOG_ERROR';
exports[1519] = 'ER_CONSECUTIVE_REORG_PARTITIONS';
exports[1520] = 'ER_REORG_OUTSIDE_RANGE';
exports[1521] = 'ER_PARTITION_FUNCTION_FAILURE';
exports[1522] = 'ER_PART_STATE_ERROR';
exports[1523] = 'ER_LIMITED_PART_RANGE';
exports[1524] = 'ER_PLUGIN_IS_NOT_LOADED';
exports[1525] = 'ER_WRONG_VALUE';
exports[1526] = 'ER_NO_PARTITION_FOR_GIVEN_VALUE';
exports[1527] = 'ER_FILEGROUP_OPTION_ONLY_ONCE';
exports[1528] = 'ER_CREATE_FILEGROUP_FAILED';
exports[1529] = 'ER_DROP_FILEGROUP_FAILED';
exports[1530] = 'ER_TABLESPACE_AUTO_EXTEND_ERROR';
exports[1531] = 'ER_WRONG_SIZE_NUMBER';
exports[1532] = 'ER_SIZE_OVERFLOW_ERROR';
exports[1533] = 'ER_ALTER_FILEGROUP_FAILED';
exports[1534] = 'ER_BINLOG_ROW_LOGGING_FAILED';
exports[1535] = 'ER_BINLOG_ROW_WRONG_TABLE_DEF';
exports[1536] = 'ER_BINLOG_ROW_RBR_TO_SBR';
exports[1537] = 'ER_EVENT_ALREADY_EXISTS';
exports[1538] = 'ER_EVENT_STORE_FAILED';
exports[1539] = 'ER_EVENT_DOES_NOT_EXIST';
exports[1540] = 'ER_EVENT_CANT_ALTER';
exports[1541] = 'ER_EVENT_DROP_FAILED';
exports[1542] = 'ER_EVENT_INTERVAL_NOT_POSITIVE_OR_TOO_BIG';
exports[1543] = 'ER_EVENT_ENDS_BEFORE_STARTS';
exports[1544] = 'ER_EVENT_EXEC_TIME_IN_THE_PAST';
exports[1545] = 'ER_EVENT_OPEN_TABLE_FAILED';
exports[1546] = 'ER_EVENT_NEITHER_M_EXPR_NOR_M_AT';
exports[1547] = 'ER_COL_COUNT_DOESNT_MATCH_CORRUPTED';
exports[1548] = 'ER_CANNOT_LOAD_FROM_TABLE';
exports[1549] = 'ER_EVENT_CANNOT_DELETE';
exports[1550] = 'ER_EVENT_COMPILE_ERROR';
exports[1551] = 'ER_EVENT_SAME_NAME';
exports[1552] = 'ER_EVENT_DATA_TOO_LONG';
exports[1553] = 'ER_DROP_INDEX_FK';
exports[1554] = 'ER_WARN_DEPRECATED_SYNTAX_WITH_VER';
exports[1555] = 'ER_CANT_WRITE_LOCK_LOG_TABLE';
exports[1556] = 'ER_CANT_LOCK_LOG_TABLE';
exports[1557] = 'ER_FOREIGN_DUPLICATE_KEY';
exports[1558] = 'ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE';
exports[1559] = 'ER_TEMP_TABLE_PREVENTS_SWITCH_OUT_OF_RBR';
exports[1560] = 'ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_FORMAT';
exports[1561] = 'ER_NDB_CANT_SWITCH_BINLOG_FORMAT';
exports[1562] = 'ER_PARTITION_NO_TEMPORARY';
exports[1563] = 'ER_PARTITION_CONST_DOMAIN_ERROR';
exports[1564] = 'ER_PARTITION_FUNCTION_IS_NOT_ALLOWED';
exports[1565] = 'ER_DDL_LOG_ERROR';
exports[1566] = 'ER_NULL_IN_VALUES_LESS_THAN';
exports[1567] = 'ER_WRONG_PARTITION_NAME';
exports[1568] = 'ER_CANT_CHANGE_TX_CHARACTERISTICS';
exports[1569] = 'ER_DUP_ENTRY_AUTOINCREMENT_CASE';
exports[1570] = 'ER_EVENT_MODIFY_QUEUE_ERROR';
exports[1571] = 'ER_EVENT_SET_VAR_ERROR';
exports[1572] = 'ER_PARTITION_MERGE_ERROR';
exports[1573] = 'ER_CANT_ACTIVATE_LOG';
exports[1574] = 'ER_RBR_NOT_AVAILABLE';
exports[1575] = 'ER_BASE64_DECODE_ERROR';
exports[1576] = 'ER_EVENT_RECURSION_FORBIDDEN';
exports[1577] = 'ER_EVENTS_DB_ERROR';
exports[1578] = 'ER_ONLY_INTEGERS_ALLOWED';
exports[1579] = 'ER_UNSUPORTED_LOG_ENGINE';
exports[1580] = 'ER_BAD_LOG_STATEMENT';
exports[1581] = 'ER_CANT_RENAME_LOG_TABLE';
exports[1582] = 'ER_WRONG_PARAMCOUNT_TO_NATIVE_FCT';
exports[1583] = 'ER_WRONG_PARAMETERS_TO_NATIVE_FCT';
exports[1584] = 'ER_WRONG_PARAMETERS_TO_STORED_FCT';
exports[1585] = 'ER_NATIVE_FCT_NAME_COLLISION';
exports[1586] = 'ER_DUP_ENTRY_WITH_KEY_NAME';
exports[1587] = 'ER_BINLOG_PURGE_EMFILE';
exports[1588] = 'ER_EVENT_CANNOT_CREATE_IN_THE_PAST';
exports[1589] = 'ER_EVENT_CANNOT_ALTER_IN_THE_PAST';
exports[1590] = 'ER_SLAVE_INCIDENT';
exports[1591] = 'ER_NO_PARTITION_FOR_GIVEN_VALUE_SILENT';
exports[1592] = 'ER_BINLOG_UNSAFE_STATEMENT';
exports[1593] = 'ER_SLAVE_FATAL_ERROR';
exports[1594] = 'ER_SLAVE_RELAY_LOG_READ_FAILURE';
exports[1595] = 'ER_SLAVE_RELAY_LOG_WRITE_FAILURE';
exports[1596] = 'ER_SLAVE_CREATE_EVENT_FAILURE';
exports[1597] = 'ER_SLAVE_MASTER_COM_FAILURE';
exports[1598] = 'ER_BINLOG_LOGGING_IMPOSSIBLE';
exports[1599] = 'ER_VIEW_NO_CREATION_CTX';
exports[1600] = 'ER_VIEW_INVALID_CREATION_CTX';
exports[1601] = 'ER_SR_INVALID_CREATION_CTX';
exports[1602] = 'ER_TRG_CORRUPTED_FILE';
exports[1603] = 'ER_TRG_NO_CREATION_CTX';
exports[1604] = 'ER_TRG_INVALID_CREATION_CTX';
exports[1605] = 'ER_EVENT_INVALID_CREATION_CTX';
exports[1606] = 'ER_TRG_CANT_OPEN_TABLE';
exports[1607] = 'ER_CANT_CREATE_SROUTINE';
exports[1608] = 'ER_NEVER_USED';
exports[1609] = 'ER_NO_FORMAT_DESCRIPTION_EVENT_BEFORE_BINLOG_STATEMENT';
exports[1610] = 'ER_SLAVE_CORRUPT_EVENT';
exports[1611] = 'ER_LOAD_DATA_INVALID_COLUMN';
exports[1612] = 'ER_LOG_PURGE_NO_FILE';
exports[1613] = 'ER_XA_RBTIMEOUT';
exports[1614] = 'ER_XA_RBDEADLOCK';
exports[1615] = 'ER_NEED_REPREPARE';
exports[1616] = 'ER_DELAYED_NOT_SUPPORTED';
exports[1617] = 'WARN_NO_MASTER_INFO';
exports[1618] = 'WARN_OPTION_IGNORED';
exports[1619] = 'ER_PLUGIN_DELETE_BUILTIN';
exports[1620] = 'WARN_PLUGIN_BUSY';
exports[1621] = 'ER_VARIABLE_IS_READONLY';
exports[1622] = 'ER_WARN_ENGINE_TRANSACTION_ROLLBACK';
exports[1623] = 'ER_SLAVE_HEARTBEAT_FAILURE';
exports[1624] = 'ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE';
exports[1625] = 'ER_NDB_REPLICATION_SCHEMA_ERROR';
exports[1626] = 'ER_CONFLICT_FN_PARSE_ERROR';
exports[1627] = 'ER_EXCEPTIONS_WRITE_ERROR';
exports[1628] = 'ER_TOO_LONG_TABLE_COMMENT';
exports[1629] = 'ER_TOO_LONG_FIELD_COMMENT';
exports[1630] = 'ER_FUNC_INEXISTENT_NAME_COLLISION';
exports[1631] = 'ER_DATABASE_NAME';
exports[1632] = 'ER_TABLE_NAME';
exports[1633] = 'ER_PARTITION_NAME';
exports[1634] = 'ER_SUBPARTITION_NAME';
exports[1635] = 'ER_TEMPORARY_NAME';
exports[1636] = 'ER_RENAMED_NAME';
exports[1637] = 'ER_TOO_MANY_CONCURRENT_TRXS';
exports[1638] = 'WARN_NON_ASCII_SEPARATOR_NOT_IMPLEMENTED';
exports[1639] = 'ER_DEBUG_SYNC_TIMEOUT';
exports[1640] = 'ER_DEBUG_SYNC_HIT_LIMIT';
exports[1641] = 'ER_DUP_SIGNAL_SET';
exports[1642] = 'ER_SIGNAL_WARN';
exports[1643] = 'ER_SIGNAL_NOT_FOUND';
exports[1644] = 'ER_SIGNAL_EXCEPTION';
exports[1645] = 'ER_RESIGNAL_WITHOUT_ACTIVE_HANDLER';
exports[1646] = 'ER_SIGNAL_BAD_CONDITION_TYPE';
exports[1647] = 'WARN_COND_ITEM_TRUNCATED';
exports[1648] = 'ER_COND_ITEM_TOO_LONG';
exports[1649] = 'ER_UNKNOWN_LOCALE';
exports[1650] = 'ER_SLAVE_IGNORE_SERVER_IDS';
exports[1651] = 'ER_QUERY_CACHE_DISABLED';
exports[1652] = 'ER_SAME_NAME_PARTITION_FIELD';
exports[1653] = 'ER_PARTITION_COLUMN_LIST_ERROR';
exports[1654] = 'ER_WRONG_TYPE_COLUMN_VALUE_ERROR';
exports[1655] = 'ER_TOO_MANY_PARTITION_FUNC_FIELDS_ERROR';
exports[1656] = 'ER_MAXVALUE_IN_VALUES_IN';
exports[1657] = 'ER_TOO_MANY_VALUES_ERROR';
exports[1658] = 'ER_ROW_SINGLE_PARTITION_FIELD_ERROR';
exports[1659] = 'ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD';
exports[1660] = 'ER_PARTITION_FIELDS_TOO_LONG';
exports[1661] = 'ER_BINLOG_ROW_ENGINE_AND_STMT_ENGINE';
exports[1662] = 'ER_BINLOG_ROW_MODE_AND_STMT_ENGINE';
exports[1663] = 'ER_BINLOG_UNSAFE_AND_STMT_ENGINE';
exports[1664] = 'ER_BINLOG_ROW_INJECTION_AND_STMT_ENGINE';
exports[1665] = 'ER_BINLOG_STMT_MODE_AND_ROW_ENGINE';
exports[1666] = 'ER_BINLOG_ROW_INJECTION_AND_STMT_MODE';
exports[1667] = 'ER_BINLOG_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE';
exports[1668] = 'ER_BINLOG_UNSAFE_LIMIT';
exports[1669] = 'ER_BINLOG_UNSAFE_INSERT_DELAYED';
exports[1670] = 'ER_BINLOG_UNSAFE_SYSTEM_TABLE';
exports[1671] = 'ER_BINLOG_UNSAFE_AUTOINC_COLUMNS';
exports[1672] = 'ER_BINLOG_UNSAFE_UDF';
exports[1673] = 'ER_BINLOG_UNSAFE_SYSTEM_VARIABLE';
exports[1674] = 'ER_BINLOG_UNSAFE_SYSTEM_FUNCTION';
exports[1675] = 'ER_BINLOG_UNSAFE_NONTRANS_AFTER_TRANS';
exports[1676] = 'ER_MESSAGE_AND_STATEMENT';
exports[1677] = 'ER_SLAVE_CONVERSION_FAILED';
exports[1678] = 'ER_SLAVE_CANT_CREATE_CONVERSION';
exports[1679] = 'ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_FORMAT';
exports[1680] = 'ER_PATH_LENGTH';
exports[1681] = 'ER_WARN_DEPRECATED_SYNTAX_NO_REPLACEMENT';
exports[1682] = 'ER_WRONG_NATIVE_TABLE_STRUCTURE';
exports[1683] = 'ER_WRONG_PERFSCHEMA_USAGE';
exports[1684] = 'ER_WARN_I_S_SKIPPED_TABLE';
exports[1685] = 'ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_DIRECT';
exports[1686] = 'ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_DIRECT';
exports[1687] = 'ER_SPATIAL_MUST_HAVE_GEOM_COL';
exports[1688] = 'ER_TOO_LONG_INDEX_COMMENT';
exports[1689] = 'ER_LOCK_ABORTED';
exports[1690] = 'ER_DATA_OUT_OF_RANGE';
exports[1691] = 'ER_WRONG_SPVAR_TYPE_IN_LIMIT';
exports[1692] = 'ER_BINLOG_UNSAFE_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE';
exports[1693] = 'ER_BINLOG_UNSAFE_MIXED_STATEMENT';
exports[1694] = 'ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SQL_LOG_BIN';
exports[1695] = 'ER_STORED_FUNCTION_PREVENTS_SWITCH_SQL_LOG_BIN';
exports[1696] = 'ER_FAILED_READ_FROM_PAR_FILE';
exports[1697] = 'ER_VALUES_IS_NOT_INT_TYPE_ERROR';
exports[1698] = 'ER_ACCESS_DENIED_NO_PASSWORD_ERROR';
exports[1699] = 'ER_SET_PASSWORD_AUTH_PLUGIN';
exports[1700] = 'ER_GRANT_PLUGIN_USER_EXISTS';
exports[1701] = 'ER_TRUNCATE_ILLEGAL_FK';
exports[1702] = 'ER_PLUGIN_IS_PERMANENT';
exports[1703] = 'ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MIN';
exports[1704] = 'ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MAX';
exports[1705] = 'ER_STMT_CACHE_FULL';
exports[1706] = 'ER_MULTI_UPDATE_KEY_CONFLICT';
exports[1707] = 'ER_TABLE_NEEDS_REBUILD';
exports[1708] = 'WARN_OPTION_BELOW_LIMIT';
exports[1709] = 'ER_INDEX_COLUMN_TOO_LONG';
exports[1710] = 'ER_ERROR_IN_TRIGGER_BODY';
exports[1711] = 'ER_ERROR_IN_UNKNOWN_TRIGGER_BODY';
exports[1712] = 'ER_INDEX_CORRUPT';
exports[1713] = 'ER_UNDO_RECORD_TOO_BIG';
exports[1714] = 'ER_BINLOG_UNSAFE_INSERT_IGNORE_SELECT';
exports[1715] = 'ER_BINLOG_UNSAFE_INSERT_SELECT_UPDATE';
exports[1716] = 'ER_BINLOG_UNSAFE_REPLACE_SELECT';
exports[1717] = 'ER_BINLOG_UNSAFE_CREATE_IGNORE_SELECT';
exports[1718] = 'ER_BINLOG_UNSAFE_CREATE_REPLACE_SELECT';
exports[1719] = 'ER_BINLOG_UNSAFE_UPDATE_IGNORE';
exports[1720] = 'ER_PLUGIN_NO_UNINSTALL';
exports[1721] = 'ER_PLUGIN_NO_INSTALL';
exports[1722] = 'ER_BINLOG_UNSAFE_WRITE_AUTOINC_SELECT';
exports[1723] = 'ER_BINLOG_UNSAFE_CREATE_SELECT_AUTOINC';
exports[1724] = 'ER_BINLOG_UNSAFE_INSERT_TWO_KEYS';
exports[1725] = 'ER_TABLE_IN_FK_CHECK';
exports[1726] = 'ER_UNSUPPORTED_ENGINE';
exports[1727] = 'ER_BINLOG_UNSAFE_AUTOINC_NOT_FIRST';
exports[1728] = 'ER_CANNOT_LOAD_FROM_TABLE_V2';
exports[1729] = 'ER_MASTER_DELAY_VALUE_OUT_OF_RANGE';
exports[1730] = 'ER_ONLY_FD_AND_RBR_EVENTS_ALLOWED_IN_BINLOG_STATEMENT';
exports[1731] = 'ER_PARTITION_EXCHANGE_DIFFERENT_OPTION';
exports[1732] = 'ER_PARTITION_EXCHANGE_PART_TABLE';
exports[1733] = 'ER_PARTITION_EXCHANGE_TEMP_TABLE';
exports[1734] = 'ER_PARTITION_INSTEAD_OF_SUBPARTITION';
exports[1735] = 'ER_UNKNOWN_PARTITION';
exports[1736] = 'ER_TABLES_DIFFERENT_METADATA';
exports[1737] = 'ER_ROW_DOES_NOT_MATCH_PARTITION';
exports[1738] = 'ER_BINLOG_CACHE_SIZE_GREATER_THAN_MAX';
exports[1739] = 'ER_WARN_INDEX_NOT_APPLICABLE';
exports[1740] = 'ER_PARTITION_EXCHANGE_FOREIGN_KEY';
exports[1741] = 'ER_NO_SUCH_KEY_VALUE';
exports[1742] = 'ER_RPL_INFO_DATA_TOO_LONG';
exports[1743] = 'ER_NETWORK_READ_EVENT_CHECKSUM_FAILURE';
exports[1744] = 'ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE';
exports[1745] = 'ER_BINLOG_STMT_CACHE_SIZE_GREATER_THAN_MAX';
exports[1746] = 'ER_CANT_UPDATE_TABLE_IN_CREATE_TABLE_SELECT';
exports[1747] = 'ER_PARTITION_CLAUSE_ON_NONPARTITIONED';
exports[1748] = 'ER_ROW_DOES_NOT_MATCH_GIVEN_PARTITION_SET';
exports[1749] = 'ER_NO_SUCH_PARTITION';
exports[1750] = 'ER_CHANGE_RPL_INFO_REPOSITORY_FAILURE';
exports[1751] = 'ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_CREATED_TEMP_TABLE';
exports[1752] = 'ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_DROPPED_TEMP_TABLE';
exports[1753] = 'ER_MTS_FEATURE_IS_NOT_SUPPORTED';
exports[1754] = 'ER_MTS_UPDATED_DBS_GREATER_MAX';
exports[1755] = 'ER_MTS_CANT_PARALLEL';
exports[1756] = 'ER_MTS_INCONSISTENT_DATA';
exports[1757] = 'ER_FULLTEXT_NOT_SUPPORTED_WITH_PARTITIONING';
exports[1758] = 'ER_DA_INVALID_CONDITION_NUMBER';
exports[1759] = 'ER_INSECURE_PLAIN_TEXT';
exports[1760] = 'ER_INSECURE_CHANGE_MASTER';
exports[1761] = 'ER_FOREIGN_DUPLICATE_KEY_WITH_CHILD_INFO';
exports[1762] = 'ER_FOREIGN_DUPLICATE_KEY_WITHOUT_CHILD_INFO';
exports[1763] = 'ER_SQLTHREAD_WITH_SECURE_SLAVE';
exports[1764] = 'ER_TABLE_HAS_NO_FT';
exports[1765] = 'ER_VARIABLE_NOT_SETTABLE_IN_SF_OR_TRIGGER';
exports[1766] = 'ER_VARIABLE_NOT_SETTABLE_IN_TRANSACTION';
exports[1767] = 'ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST';
exports[1768] = 'ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION';
exports[1769] = 'ER_SET_STATEMENT_CANNOT_INVOKE_FUNCTION';
exports[1770] = 'ER_GTID_NEXT_CANT_BE_AUTOMATIC_IF_GTID_NEXT_LIST_IS_NON_NULL';
exports[1771] = 'ER_SKIPPING_LOGGED_TRANSACTION';
exports[1772] = 'ER_MALFORMED_GTID_SET_SPECIFICATION';
exports[1773] = 'ER_MALFORMED_GTID_SET_ENCODING';
exports[1774] = 'ER_MALFORMED_GTID_SPECIFICATION';
exports[1775] = 'ER_GNO_EXHAUSTED';
exports[1776] = 'ER_BAD_SLAVE_AUTO_POSITION';
exports[1777] = 'ER_AUTO_POSITION_REQUIRES_GTID_MODE_NOT_OFF';
exports[1778] = 'ER_CANT_DO_IMPLICIT_COMMIT_IN_TRX_WHEN_GTID_NEXT_IS_SET';
exports[1779] = 'ER_GTID_MODE_ON_REQUIRES_ENFORCE_GTID_CONSISTENCY_ON';
exports[1780] = 'ER_GTID_MODE_REQUIRES_BINLOG';
exports[1781] = 'ER_CANT_SET_GTID_NEXT_TO_GTID_WHEN_GTID_MODE_IS_OFF';
exports[1782] = 'ER_CANT_SET_GTID_NEXT_TO_ANONYMOUS_WHEN_GTID_MODE_IS_ON';
exports[1783] = 'ER_CANT_SET_GTID_NEXT_LIST_TO_NON_NULL_WHEN_GTID_MODE_IS_OFF';
exports[1784] = 'ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF';
exports[1785] = 'ER_GTID_UNSAFE_NON_TRANSACTIONAL_TABLE';
exports[1786] = 'ER_GTID_UNSAFE_CREATE_SELECT';
exports[1787] = 'ER_GTID_UNSAFE_CREATE_DROP_TEMPORARY_TABLE_IN_TRANSACTION';
exports[1788] = 'ER_GTID_MODE_CAN_ONLY_CHANGE_ONE_STEP_AT_A_TIME';
exports[1789] = 'ER_MASTER_HAS_PURGED_REQUIRED_GTIDS';
exports[1790] = 'ER_CANT_SET_GTID_NEXT_WHEN_OWNING_GTID';
exports[1791] = 'ER_UNKNOWN_EXPLAIN_FORMAT';
exports[1792] = 'ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION';
exports[1793] = 'ER_TOO_LONG_TABLE_PARTITION_COMMENT';
exports[1794] = 'ER_SLAVE_CONFIGURATION';
exports[1795] = 'ER_INNODB_FT_LIMIT';
exports[1796] = 'ER_INNODB_NO_FT_TEMP_TABLE';
exports[1797] = 'ER_INNODB_FT_WRONG_DOCID_COLUMN';
exports[1798] = 'ER_INNODB_FT_WRONG_DOCID_INDEX';
exports[1799] = 'ER_INNODB_ONLINE_LOG_TOO_BIG';
exports[1800] = 'ER_UNKNOWN_ALTER_ALGORITHM';
exports[1801] = 'ER_UNKNOWN_ALTER_LOCK';
exports[1802] = 'ER_MTS_CHANGE_MASTER_CANT_RUN_WITH_GAPS';
exports[1803] = 'ER_MTS_RECOVERY_FAILURE';
exports[1804] = 'ER_MTS_RESET_WORKERS';
exports[1805] = 'ER_COL_COUNT_DOESNT_MATCH_CORRUPTED_V2';
exports[1806] = 'ER_SLAVE_SILENT_RETRY_TRANSACTION';
exports[1807] = 'ER_DISCARD_FK_CHECKS_RUNNING';
exports[1808] = 'ER_TABLE_SCHEMA_MISMATCH';
exports[1809] = 'ER_TABLE_IN_SYSTEM_TABLESPACE';
exports[1810] = 'ER_IO_READ_ERROR';
exports[1811] = 'ER_IO_WRITE_ERROR';
exports[1812] = 'ER_TABLESPACE_MISSING';
exports[1813] = 'ER_TABLESPACE_EXISTS';
exports[1814] = 'ER_TABLESPACE_DISCARDED';
exports[1815] = 'ER_INTERNAL_ERROR';
exports[1816] = 'ER_INNODB_IMPORT_ERROR';
exports[1817] = 'ER_INNODB_INDEX_CORRUPT';
exports[1818] = 'ER_INVALID_YEAR_COLUMN_LENGTH';
exports[1819] = 'ER_NOT_VALID_PASSWORD';
exports[1820] = 'ER_MUST_CHANGE_PASSWORD';
exports[1821] = 'ER_FK_NO_INDEX_CHILD';
exports[1822] = 'ER_FK_NO_INDEX_PARENT';
exports[1823] = 'ER_FK_FAIL_ADD_SYSTEM';
exports[1824] = 'ER_FK_CANNOT_OPEN_PARENT';
exports[1825] = 'ER_FK_INCORRECT_OPTION';
exports[1826] = 'ER_FK_DUP_NAME';
exports[1827] = 'ER_PASSWORD_FORMAT';
exports[1828] = 'ER_FK_COLUMN_CANNOT_DROP';
exports[1829] = 'ER_FK_COLUMN_CANNOT_DROP_CHILD';
exports[1830] = 'ER_FK_COLUMN_NOT_NULL';
exports[1831] = 'ER_DUP_INDEX';
exports[1832] = 'ER_FK_COLUMN_CANNOT_CHANGE';
exports[1833] = 'ER_FK_COLUMN_CANNOT_CHANGE_CHILD';
exports[1834] = 'ER_FK_CANNOT_DELETE_PARENT';
exports[1835] = 'ER_MALFORMED_PACKET';
exports[1836] = 'ER_READ_ONLY_MODE';
exports[1837] = 'ER_GTID_NEXT_TYPE_UNDEFINED_GROUP';
exports[1838] = 'ER_VARIABLE_NOT_SETTABLE_IN_SP';
exports[1839] = 'ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF';
exports[1840] = 'ER_CANT_SET_GTID_PURGED_WHEN_GTID_EXECUTED_IS_NOT_EMPTY';
exports[1841] = 'ER_CANT_SET_GTID_PURGED_WHEN_OWNED_GTIDS_IS_NOT_EMPTY';
exports[1842] = 'ER_GTID_PURGED_WAS_CHANGED';
exports[1843] = 'ER_GTID_EXECUTED_WAS_CHANGED';
exports[1844] = 'ER_BINLOG_STMT_MODE_AND_NO_REPL_TABLES';
exports[1845] = 'ER_ALTER_OPERATION_NOT_SUPPORTED';
exports[1846] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON';
exports[1847] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COPY';
exports[1848] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_PARTITION';
exports[1849] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_RENAME';
exports[1850] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE';
exports[1851] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_CHECK';
exports[1852] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_IGNORE';
exports[1853] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOPK';
exports[1854] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_AUTOINC';
exports[1855] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_HIDDEN_FTS';
exports[1856] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_CHANGE_FTS';
exports[1857] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FTS';
exports[1858] = 'ER_SQL_SLAVE_SKIP_COUNTER_NOT_SETTABLE_IN_GTID_MODE';
exports[1859] = 'ER_DUP_UNKNOWN_IN_INDEX';
exports[1860] = 'ER_IDENT_CAUSES_TOO_LONG_PATH';
exports[1861] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOT_NULL';
exports[1862] = 'ER_MUST_CHANGE_PASSWORD_LOGIN';
exports[1863] = 'ER_ROW_IN_WRONG_PARTITION';
exports[1864] = 'ER_MTS_EVENT_BIGGER_PENDING_JOBS_SIZE_MAX';
exports[1865] = 'ER_INNODB_NO_FT_USES_PARSER';
exports[1866] = 'ER_BINLOG_LOGICAL_CORRUPTION';
exports[1867] = 'ER_WARN_PURGE_LOG_IN_USE';
exports[1868] = 'ER_WARN_PURGE_LOG_IS_ACTIVE';
exports[1869] = 'ER_AUTO_INCREMENT_CONFLICT';
exports[1870] = 'WARN_ON_BLOCKHOLE_IN_RBR';
exports[1871] = 'ER_SLAVE_MI_INIT_REPOSITORY';
exports[1872] = 'ER_SLAVE_RLI_INIT_REPOSITORY';
exports[1873] = 'ER_ACCESS_DENIED_CHANGE_USER_ERROR';
exports[1874] = 'ER_INNODB_READ_ONLY';
exports[1875] = 'ER_STOP_SLAVE_SQL_THREAD_TIMEOUT';
exports[1876] = 'ER_STOP_SLAVE_IO_THREAD_TIMEOUT';
exports[1877] = 'ER_TABLE_CORRUPT';
exports[1878] = 'ER_TEMP_FILE_WRITE_FAILURE';
exports[1879] = 'ER_INNODB_FT_AUX_NOT_HEX_ID';
exports[1880] = 'ER_OLD_TEMPORALS_UPGRADED';
exports[1881] = 'ER_INNODB_FORCED_RECOVERY';
exports[1882] = 'ER_AES_INVALID_IV';
exports[1883] = 'ER_PLUGIN_CANNOT_BE_UNINSTALLED';
exports[1884] = 'ER_GTID_UNSAFE_BINLOG_SPLITTABLE_STATEMENT_AND_GTID_GROUP';
exports[1885] = 'ER_SLAVE_HAS_MORE_GTIDS_THAN_MASTER';
exports[1886] = 'ER_FILE_CORRUPT';
exports[1887] = 'ER_ERROR_ON_MASTER';
exports[1888] = 'ER_INCONSISTENT_ERROR';
exports[1889] = 'ER_STORAGE_ENGINE_NOT_LOADED';
exports[1890] = 'ER_GET_STACKED_DA_WITHOUT_ACTIVE_HANDLER';
exports[1891] = 'ER_WARN_LEGACY_SYNTAX_CONVERTED';
exports[1892] = 'ER_BINLOG_UNSAFE_FULLTEXT_PLUGIN';
exports[1893] = 'ER_CANNOT_DISCARD_TEMPORARY_TABLE';
exports[1894] = 'ER_FK_DEPTH_EXCEEDED';
exports[1895] = 'ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE_V2';
exports[1896] = 'ER_WARN_TRIGGER_DOESNT_HAVE_CREATED';
exports[1897] = 'ER_REFERENCED_TRG_DOES_NOT_EXIST';
exports[1898] = 'ER_EXPLAIN_NOT_SUPPORTED';
exports[1899] = 'ER_INVALID_FIELD_SIZE';
exports[1900] = 'ER_MISSING_HA_CREATE_OPTION';
exports[1901] = 'ER_ENGINE_OUT_OF_MEMORY';
exports[1902] = 'ER_PASSWORD_EXPIRE_ANONYMOUS_USER';
exports[1903] = 'ER_SLAVE_SQL_THREAD_MUST_STOP';
exports[1904] = 'ER_NO_FT_MATERIALIZED_SUBQUERY';
exports[1905] = 'ER_INNODB_UNDO_LOG_FULL';
exports[1906] = 'ER_INVALID_ARGUMENT_FOR_LOGARITHM';
exports[1907] = 'ER_SLAVE_CHANNEL_IO_THREAD_MUST_STOP';
exports[1908] = 'ER_WARN_OPEN_TEMP_TABLES_MUST_BE_ZERO';
exports[1909] = 'ER_WARN_ONLY_MASTER_LOG_FILE_NO_POS';
exports[1910] = 'ER_QUERY_TIMEOUT';
exports[1911] = 'ER_NON_RO_SELECT_DISABLE_TIMER';
exports[1912] = 'ER_DUP_LIST_ENTRY';
exports[1913] = 'ER_SQL_MODE_NO_EFFECT';
exports[1914] = 'ER_AGGREGATE_ORDER_FOR_UNION';
exports[1915] = 'ER_AGGREGATE_ORDER_NON_AGG_QUERY';
exports[1916] = 'ER_SLAVE_WORKER_STOPPED_PREVIOUS_THD_ERROR';
exports[1917] = 'ER_DONT_SUPPORT_SLAVE_PRESERVE_COMMIT_ORDER';
exports[1918] = 'ER_SERVER_OFFLINE_MODE';
exports[1919] = 'ER_GIS_DIFFERENT_SRIDS';
exports[1920] = 'ER_GIS_UNSUPPORTED_ARGUMENT';
exports[1921] = 'ER_GIS_UNKNOWN_ERROR';
exports[1922] = 'ER_GIS_UNKNOWN_EXCEPTION';
exports[1923] = 'ER_GIS_INVALID_DATA';
exports[1924] = 'ER_BOOST_GEOMETRY_EMPTY_INPUT_EXCEPTION';
exports[1925] = 'ER_BOOST_GEOMETRY_CENTROID_EXCEPTION';
exports[1926] = 'ER_BOOST_GEOMETRY_OVERLAY_INVALID_INPUT_EXCEPTION';
exports[1927] = 'ER_BOOST_GEOMETRY_TURN_INFO_EXCEPTION';
exports[1928] = 'ER_BOOST_GEOMETRY_SELF_INTERSECTION_POINT_EXCEPTION';
exports[1929] = 'ER_BOOST_GEOMETRY_UNKNOWN_EXCEPTION';
exports[1930] = 'ER_STD_BAD_ALLOC_ERROR';
exports[1931] = 'ER_STD_DOMAIN_ERROR';
exports[1932] = 'ER_STD_LENGTH_ERROR';
exports[1933] = 'ER_STD_INVALID_ARGUMENT';
exports[1934] = 'ER_STD_OUT_OF_RANGE_ERROR';
exports[1935] = 'ER_STD_OVERFLOW_ERROR';
exports[1936] = 'ER_STD_RANGE_ERROR';
exports[1937] = 'ER_STD_UNDERFLOW_ERROR';
exports[1938] = 'ER_STD_LOGIC_ERROR';
exports[1939] = 'ER_STD_RUNTIME_ERROR';
exports[1940] = 'ER_STD_UNKNOWN_EXCEPTION';
exports[1941] = 'ER_GIS_DATA_WRONG_ENDIANESS';
exports[1942] = 'ER_CHANGE_MASTER_PASSWORD_LENGTH';
exports[1943] = 'ER_USER_LOCK_WRONG_NAME';
exports[1944] = 'ER_USER_LOCK_DEADLOCK';
exports[1945] = 'ER_REPLACE_INACCESSIBLE_ROWS';
exports[1946] = 'ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_GIS';
exports[1947] = 'ER_ILLEGAL_USER_VAR';
exports[1948] = 'ER_GTID_MODE_OFF';
exports[1949] = 'ER_UNSUPPORTED_BY_REPLICATION_THREAD';
exports[1950] = 'ER_INCORRECT_TYPE';
exports[1951] = 'ER_FIELD_IN_ORDER_NOT_SELECT';
exports[1952] = 'ER_AGGREGATE_IN_ORDER_NOT_SELECT';
exports[1953] = 'ER_INVALID_RPL_WILD_TABLE_FILTER_PATTERN';
exports[1954] = 'ER_NET_OK_PACKET_TOO_LARGE';
exports[1955] = 'ER_INVALID_JSON_DATA';
exports[1956] = 'ER_INVALID_GEOJSON_MISSING_MEMBER';
exports[1957] = 'ER_INVALID_GEOJSON_WRONG_TYPE';
exports[1958] = 'ER_INVALID_GEOJSON_UNSPECIFIED';
exports[1959] = 'ER_DIMENSION_UNSUPPORTED';
exports[1960] = 'ER_SLAVE_CHANNEL_DOES_NOT_EXIST';
exports[1961] = 'ER_SLAVE_MULTIPLE_CHANNELS_HOST_PORT';
exports[1962] = 'ER_SLAVE_CHANNEL_NAME_INVALID_OR_TOO_LONG';
exports[1963] = 'ER_SLAVE_NEW_CHANNEL_WRONG_REPOSITORY';
exports[1964] = 'ER_SLAVE_CHANNEL_DELETE';
exports[1965] = 'ER_SLAVE_MULTIPLE_CHANNELS_CMD';
exports[1966] = 'ER_SLAVE_MAX_CHANNELS_EXCEEDED';
exports[1967] = 'ER_SLAVE_CHANNEL_MUST_STOP';
exports[1968] = 'ER_SLAVE_CHANNEL_NOT_RUNNING';
exports[1969] = 'ER_SLAVE_CHANNEL_WAS_RUNNING';
exports[1970] = 'ER_SLAVE_CHANNEL_WAS_NOT_RUNNING';
exports[1971] = 'ER_SLAVE_CHANNEL_SQL_THREAD_MUST_STOP';
exports[1972] = 'ER_SLAVE_CHANNEL_SQL_SKIP_COUNTER';
exports[1973] = 'ER_WRONG_FIELD_WITH_GROUP_V2';
exports[1974] = 'ER_MIX_OF_GROUP_FUNC_AND_FIELDS_V2';
exports[1975] = 'ER_WARN_DEPRECATED_SYSVAR_UPDATE';
exports[1976] = 'ER_WARN_DEPRECATED_SQLMODE';
exports[1977] = 'ER_CANNOT_LOG_PARTIAL_DROP_DATABASE_WITH_GTID';
exports[1978] = 'ER_GROUP_REPLICATION_CONFIGURATION';
exports[1979] = 'ER_GROUP_REPLICATION_RUNNING';
exports[1980] = 'ER_GROUP_REPLICATION_APPLIER_INIT_ERROR';
exports[1981] = 'ER_GROUP_REPLICATION_STOP_APPLIER_THREAD_TIMEOUT';
exports[1982] = 'ER_GROUP_REPLICATION_COMMUNICATION_LAYER_SESSION_ERROR';
exports[1983] = 'ER_GROUP_REPLICATION_COMMUNICATION_LAYER_JOIN_ERROR';
exports[1984] = 'ER_BEFORE_DML_VALIDATION_ERROR';
exports[1985] = 'ER_PREVENTS_VARIABLE_WITHOUT_RBR';
exports[1986] = 'ER_RUN_HOOK_ERROR';
exports[1987] = 'ER_TRANSACTION_ROLLBACK_DURING_COMMIT';
exports[1988] = 'ER_GENERATED_COLUMN_FUNCTION_IS_NOT_ALLOWED';
exports[1989] = 'ER_UNSUPPORTED_ALTER_INPLACE_ON_VIRTUAL_COLUMN';
exports[1990] = 'ER_WRONG_FK_OPTION_FOR_GENERATED_COLUMN';
exports[1991] = 'ER_NON_DEFAULT_VALUE_FOR_GENERATED_COLUMN';
exports[1992] = 'ER_UNSUPPORTED_ACTION_ON_GENERATED_COLUMN';
exports[1993] = 'ER_GENERATED_COLUMN_NON_PRIOR';
exports[1994] = 'ER_DEPENDENT_BY_GENERATED_COLUMN';
exports[1995] = 'ER_GENERATED_COLUMN_REF_AUTO_INC';
exports[1996] = 'ER_FEATURE_NOT_AVAILABLE';
exports[1997] = 'ER_CANT_SET_GTID_MODE';
exports[1998] = 'ER_CANT_USE_AUTO_POSITION_WITH_GTID_MODE_OFF';
exports[1999] = 'ER_CANT_REPLICATE_ANONYMOUS_WITH_AUTO_POSITION';
exports[2000] = 'ER_CANT_REPLICATE_ANONYMOUS_WITH_GTID_MODE_ON';
exports[2001] = 'ER_CANT_REPLICATE_GTID_WITH_GTID_MODE_OFF';
exports[2002] = 'ER_CANT_SET_ENFORCE_GTID_CONSISTENCY_ON_WITH_ONGOING_GTID_VIOLATING_TRANSACTIONS';
exports[2003] = 'ER_SET_ENFORCE_GTID_CONSISTENCY_WARN_WITH_ONGOING_GTID_VIOLATING_TRANSACTIONS';
exports[2004] = 'ER_ACCOUNT_HAS_BEEN_LOCKED';
exports[2005] = 'ER_WRONG_TABLESPACE_NAME';
exports[2006] = 'ER_TABLESPACE_IS_NOT_EMPTY';
exports[2007] = 'ER_WRONG_FILE_NAME';
exports[2008] = 'ER_BOOST_GEOMETRY_INCONSISTENT_TURNS_EXCEPTION';
exports[2009] = 'ER_WARN_OPTIMIZER_HINT_SYNTAX_ERROR';
exports[2010] = 'ER_WARN_BAD_MAX_EXECUTION_TIME';
exports[2011] = 'ER_WARN_UNSUPPORTED_MAX_EXECUTION_TIME';
exports[2012] = 'ER_WARN_CONFLICTING_HINT';
exports[2013] = 'ER_WARN_UNKNOWN_QB_NAME';
exports[2014] = 'ER_UNRESOLVED_HINT_NAME';
exports[2015] = 'ER_WARN_ON_MODIFYING_GTID_EXECUTED_TABLE';
exports[2016] = 'ER_PLUGGABLE_PROTOCOL_COMMAND_NOT_SUPPORTED';
exports[2017] = 'ER_LOCKING_SERVICE_WRONG_NAME';
exports[2018] = 'ER_LOCKING_SERVICE_DEADLOCK';
exports[2019] = 'ER_LOCKING_SERVICE_TIMEOUT';
exports[2020] = 'ER_GIS_MAX_POINTS_IN_GEOMETRY_OVERFLOWED';
exports[2021] = 'ER_SQL_MODE_MERGED';
exports[2022] = 'ER_VTOKEN_PLUGIN_TOKEN_MISMATCH';
exports[2023] = 'ER_VTOKEN_PLUGIN_TOKEN_NOT_FOUND';
exports[2024] = 'ER_CANT_SET_VARIABLE_WHEN_OWNING_GTID';
exports[2025] = 'ER_SLAVE_CHANNEL_OPERATION_NOT_ALLOWED';
exports[2026] = 'ER_INVALID_JSON_TEXT';
exports[2027] = 'ER_INVALID_JSON_TEXT_IN_PARAM';
exports[2028] = 'ER_INVALID_JSON_BINARY_DATA';
exports[2029] = 'ER_INVALID_JSON_PATH';
exports[2030] = 'ER_INVALID_JSON_CHARSET';
exports[2031] = 'ER_INVALID_JSON_CHARSET_IN_FUNCTION';
exports[2032] = 'ER_INVALID_TYPE_FOR_JSON';
exports[2033] = 'ER_INVALID_CAST_TO_JSON';
exports[2034] = 'ER_INVALID_JSON_PATH_CHARSET';
exports[2035] = 'ER_INVALID_JSON_PATH_WILDCARD';
exports[2036] = 'ER_JSON_VALUE_TOO_BIG';
exports[2037] = 'ER_JSON_KEY_TOO_BIG';
exports[2038] = 'ER_JSON_USED_AS_KEY';
exports[2039] = 'ER_JSON_VACUOUS_PATH';
exports[2040] = 'ER_JSON_BAD_ONE_OR_ALL_ARG';
exports[2041] = 'ER_NUMERIC_JSON_VALUE_OUT_OF_RANGE';
exports[2042] = 'ER_INVALID_JSON_VALUE_FOR_CAST';
exports[2043] = 'ER_JSON_DOCUMENT_TOO_DEEP';
exports[2044] = 'ER_JSON_DOCUMENT_NULL_KEY';
exports[2045] = 'ER_SECURE_TRANSPORT_REQUIRED';
exports[2046] = 'ER_NO_SECURE_TRANSPORTS_CONFIGURED';
exports[2047] = 'ER_DISABLED_STORAGE_ENGINE';
exports[2048] = 'ER_USER_DOES_NOT_EXIST';
exports[2049] = 'ER_USER_ALREADY_EXISTS';
exports[2050] = 'ER_AUDIT_API_ABORT';
exports[2051] = 'ER_INVALID_JSON_PATH_ARRAY_CELL';
exports[2052] = 'ER_BUFPOOL_RESIZE_INPROGRESS';
exports[2053] = 'ER_FEATURE_DISABLED_SEE_DOC';
exports[2054] = 'ER_SERVER_ISNT_AVAILABLE';
exports[2055] = 'ER_SESSION_WAS_KILLED';
exports[2056] = 'ER_CAPACITY_EXCEEDED';
exports[2057] = 'ER_CAPACITY_EXCEEDED_IN_RANGE_OPTIMIZER';
exports[2058] = 'ER_TABLE_NEEDS_UPG_PART';
exports[2059] = 'ER_CANT_WAIT_FOR_EXECUTED_GTID_SET_WHILE_OWNING_A_GTID';
exports[2060] = 'ER_CANNOT_ADD_FOREIGN_BASE_COL_VIRTUAL';
exports[2061] = 'ER_CANNOT_CREATE_VIRTUAL_INDEX_CONSTRAINT';
exports[2062] = 'ER_ERROR_ON_MODIFYING_GTID_EXECUTED_TABLE';
exports[2063] = 'ER_LOCK_REFUSED_BY_ENGINE';
exports[2064] = 'ER_UNSUPPORTED_ALTER_ONLINE_ON_VIRTUAL_COLUMN';
exports[2065] = 'ER_MASTER_KEY_ROTATION_NOT_SUPPORTED_BY_SE';
exports[2066] = 'ER_MASTER_KEY_ROTATION_ERROR_BY_SE';
exports[2067] = 'ER_MASTER_KEY_ROTATION_BINLOG_FAILED';
exports[2068] = 'ER_MASTER_KEY_ROTATION_SE_UNAVAILABLE';
exports[2069] = 'ER_TABLESPACE_CANNOT_ENCRYPT';
exports[2070] = 'ER_INVALID_ENCRYPTION_OPTION';
exports[2071] = 'ER_CANNOT_FIND_KEY_IN_KEYRING';
exports[2072] = 'ER_CAPACITY_EXCEEDED_IN_PARSER';
exports[2073] = 'ER_UNSUPPORTED_ALTER_ENCRYPTION_INPLACE';
exports[2074] = 'ER_KEYRING_UDF_KEYRING_SERVICE_ERROR';
exports[2075] = 'ER_USER_COLUMN_OLD_LENGTH';
exports[2076] = 'ER_CANT_RESET_MASTER';
exports[2077] = 'ER_GROUP_REPLICATION_MAX_GROUP_SIZE';
exports[2078] = 'ER_CANNOT_ADD_FOREIGN_BASE_COL_STORED';
exports[2079] = 'ER_TABLE_REFERENCED';
exports[2080] = 'ER_PARTITION_ENGINE_DEPRECATED_FOR_TABLE';

},{}],26:[function(require,module,exports){
// Manually extracted from mysql-5.5.23/include/mysql_com.h

/**
  Is raised when a multi-statement transaction
  has been started, either explicitly, by means
  of BEGIN or COMMIT AND CHAIN, or
  implicitly, by the first transactional
  statement, when autocommit=off.
*/
exports.SERVER_STATUS_IN_TRANS          = 1;
exports.SERVER_STATUS_AUTOCOMMIT        = 2;  /* Server in auto_commit mode */
exports.SERVER_MORE_RESULTS_EXISTS      = 8;    /* Multi query - next query exists */
exports.SERVER_QUERY_NO_GOOD_INDEX_USED = 16;
exports.SERVER_QUERY_NO_INDEX_USED      = 32;
/**
  The server was able to fulfill the clients request and opened a
  read-only non-scrollable cursor for a query. This flag comes
  in reply to COM_STMT_EXECUTE and COM_STMT_FETCH commands.
*/
exports.SERVER_STATUS_CURSOR_EXISTS = 64;
/**
  This flag is sent when a read-only cursor is exhausted, in reply to
  COM_STMT_FETCH command.
*/
exports.SERVER_STATUS_LAST_ROW_SENT        = 128;
exports.SERVER_STATUS_DB_DROPPED           = 256; /* A database was dropped */
exports.SERVER_STATUS_NO_BACKSLASH_ESCAPES = 512;
/**
  Sent to the client if after a prepared statement reprepare
  we discovered that the new statement returns a different
  number of result set columns.
*/
exports.SERVER_STATUS_METADATA_CHANGED = 1024;
exports.SERVER_QUERY_WAS_SLOW          = 2048;

/**
  To mark ResultSet containing output parameter values.
*/
exports.SERVER_PS_OUT_PARAMS = 4096;

},{}],27:[function(require,module,exports){
// Certificates for Amazon RDS
exports['Amazon RDS'] = {
  ca: [
    /**
     * Amazon RDS global certificate 2010 to 2015
     *
     *   CN = aws.amazon.com/rds/
     *   OU = RDS
     *   O = Amazon.com
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2010-04-05T22:44:31Z/2015-04-04T22:41:31Z
     *   F = 7F:09:8D:A5:7D:BB:A6:EF:7C:70:D8:CA:4E:49:11:55:7E:89:A7:D3
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIIDQzCCAqygAwIBAgIJAOd1tlfiGoEoMA0GCSqGSIb3DQEBBQUAMHUxCzAJBgNV\n'
    + 'BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdTZWF0dGxlMRMw\n'
    + 'EQYDVQQKEwpBbWF6b24uY29tMQwwCgYDVQQLEwNSRFMxHDAaBgNVBAMTE2F3cy5h\n'
    + 'bWF6b24uY29tL3Jkcy8wHhcNMTAwNDA1MjI0NDMxWhcNMTUwNDA0MjI0NDMxWjB1\n'
    + 'MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHU2Vh\n'
    + 'dHRsZTETMBEGA1UEChMKQW1hem9uLmNvbTEMMAoGA1UECxMDUkRTMRwwGgYDVQQD\n'
    + 'ExNhd3MuYW1hem9uLmNvbS9yZHMvMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKB\n'
    + 'gQDKhXGU7tizxUR5WaFoMTFcxNxa05PEjZaIOEN5ctkWrqYSRov0/nOMoZjqk8bC\n'
    + 'med9vPFoQGD0OTakPs0jVe3wwmR735hyVwmKIPPsGlaBYj1O6llIpZeQVyupNx56\n'
    + 'UzqtiLaDzh1KcmfqP3qP2dInzBfJQKjiRudo1FWnpPt33QIDAQABo4HaMIHXMB0G\n'
    + 'A1UdDgQWBBT/H3x+cqSkR/ePSIinPtc4yWKe3DCBpwYDVR0jBIGfMIGcgBT/H3x+\n'
    + 'cqSkR/ePSIinPtc4yWKe3KF5pHcwdTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh\n'
    + 'c2hpbmd0b24xEDAOBgNVBAcTB1NlYXR0bGUxEzARBgNVBAoTCkFtYXpvbi5jb20x\n'
    + 'DDAKBgNVBAsTA1JEUzEcMBoGA1UEAxMTYXdzLmFtYXpvbi5jb20vcmRzL4IJAOd1\n'
    + 'tlfiGoEoMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAvguZy/BDT66x\n'
    + 'GfgnJlyQwnFSeVLQm9u/FIvz4huGjbq9dqnD6h/Gm56QPFdyMEyDiZWaqY6V08lY\n'
    + 'LTBNb4kcIc9/6pc0/ojKciP5QJRm6OiZ4vgG05nF4fYjhU7WClUx7cxq1fKjNc2J\n'
    + 'UCmmYqgiVkAGWRETVo+byOSDZ4swb10=\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS global root CA 2015 to 2020
     *
     *   CN = Amazon RDS Root CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T09:11:31Z/2020-03-05T09:11:31Z
     *   F = E8:11:88:56:E7:A7:CE:3E:5E:DC:9A:31:25:1B:93:AC:DC:43:CE:B0
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIID9DCCAtygAwIBAgIBQjANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUwOTExMzFaFw0y\n'
    + 'MDAzMDUwOTExMzFaMIGKMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEbMBkGA1UEAwwSQW1hem9uIFJE\n'
    + 'UyBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuD8nrZ8V\n'
    + 'u+VA8yVlUipCZIKPTDcOILYpUe8Tct0YeQQr0uyl018StdBsa3CjBgvwpDRq1HgF\n'
    + 'Ji2N3+39+shCNspQeE6aYU+BHXhKhIIStt3r7gl/4NqYiDDMWKHxHq0nsGDFfArf\n'
    + 'AOcjZdJagOMqb3fF46flc8k2E7THTm9Sz4L7RY1WdABMuurpICLFE3oHcGdapOb9\n'
    + 'T53pQR+xpHW9atkcf3pf7gbO0rlKVSIoUenBlZipUlp1VZl/OD/E+TtRhDDNdI2J\n'
    + 'P/DSMM3aEsq6ZQkfbz/Ilml+Lx3tJYXUDmp+ZjzMPLk/+3beT8EhrwtcG3VPpvwp\n'
    + 'BIOqsqVVTvw/CwIDAQABo2MwYTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUw\n'
    + 'AwEB/zAdBgNVHQ4EFgQUTgLurD72FchM7Sz1BcGPnIQISYMwHwYDVR0jBBgwFoAU\n'
    + 'TgLurD72FchM7Sz1BcGPnIQISYMwDQYJKoZIhvcNAQEFBQADggEBAHZcgIio8pAm\n'
    + 'MjHD5cl6wKjXxScXKtXygWH2BoDMYBJF9yfyKO2jEFxYKbHePpnXB1R04zJSWAw5\n'
    + '2EUuDI1pSBh9BA82/5PkuNlNeSTB3dXDD2PEPdzVWbSKvUB8ZdooV+2vngL0Zm4r\n'
    + '47QPyd18yPHrRIbtBtHR/6CwKevLZ394zgExqhnekYKIqqEX41xsUV0Gm6x4vpjf\n'
    + '2u6O/+YE2U+qyyxHE5Wd5oqde0oo9UUpFETJPVb6Q2cEeQib8PBAyi0i6KnF+kIV\n'
    + 'A9dY7IHSubtCK/i8wxMVqfd5GtbA8mmpeJFwnDvm9rBEsHybl08qlax9syEwsUYr\n'
    + '/40NawZfTUU=\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS ap-northeast-1 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS ap-northeast-1 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:06Z/2020-03-05T22:03:06Z
     *   F = 4B:2D:8A:E0:C1:A3:A9:AF:A7:BB:65:0C:5A:16:8A:39:3C:03:F2:C5
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIIEATCCAumgAwIBAgIBRDANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMDZaFw0y\n'
    + 'MDAzMDUyMjAzMDZaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJE\n'
    + 'UyBhcC1ub3J0aGVhc3QtMSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n'
    + 'ggEBAMmM2B4PfTXCZjbZMWiDPyxvk/eeNwIRJAhfzesiGUiLozX6CRy3rwC1ZOPV\n'
    + 'AcQf0LB+O8wY88C/cV+d4Q2nBDmnk+Vx7o2MyMh343r5rR3Na+4izd89tkQVt0WW\n'
    + 'vO21KRH5i8EuBjinboOwAwu6IJ+HyiQiM0VjgjrmEr/YzFPL8MgHD/YUHehqjACn\n'
    + 'C0+B7/gu7W4qJzBL2DOf7ub2qszGtwPE+qQzkCRDwE1A4AJmVE++/FLH2Zx78Egg\n'
    + 'fV1sUxPtYgjGH76VyyO6GNKM6rAUMD/q5mnPASQVIXgKbupr618bnH+SWHFjBqZq\n'
    + 'HvDGPMtiiWII41EmGUypyt5AbysCAwEAAaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIG\n'
    + 'A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFIiKM0Q6n1K4EmLxs3ZXxINbwEwR\n'
    + 'MB8GA1UdIwQYMBaAFE4C7qw+9hXITO0s9QXBj5yECEmDMA0GCSqGSIb3DQEBBQUA\n'
    + 'A4IBAQBezGbE9Rw/k2e25iGjj5n8r+M3dlye8ORfCE/dijHtxqAKasXHgKX8I9Tw\n'
    + 'JkBiGWiuzqn7gO5MJ0nMMro1+gq29qjZnYX1pDHPgsRjUX8R+juRhgJ3JSHijRbf\n'
    + '4qNJrnwga7pj94MhcLq9u0f6dxH6dXbyMv21T4TZMTmcFduf1KgaiVx1PEyJjC6r\n'
    + 'M+Ru+A0eM+jJ7uCjUoZKcpX8xkj4nmSnz9NMPog3wdOSB9cAW7XIc5mHa656wr7I\n'
    + 'WJxVcYNHTXIjCcng2zMKd1aCcl2KSFfy56sRfT7J5Wp69QSr+jq8KM55gw8uqAwi\n'
    + 'VPrXn2899T1rcTtFYFP16WXjGuc0\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS ap-northeast-2 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS ap-northeast-2 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-11-06T00:05:46Z/2020-03-05T00:05:46Z
     *   F = 77:D9:33:4E:CE:56:FC:42:7B:29:57:8D:67:59:ED:29:4E:18:CB:6B
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIIEATCCAumgAwIBAgIBTDANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTExMDYwMDA1NDZaFw0y\n'
    + 'MDAzMDUwMDA1NDZaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJE\n'
    + 'UyBhcC1ub3J0aGVhc3QtMiBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n'
    + 'ggEBAKSwd+RVUzTRH0FgnbwoTK8TMm/zMT4+2BvALpAUe6YXbkisg2goycWuuWLg\n'
    + 'jOpFBB3GtyvXZnkqi7MkDWUmj1a2kf8l2oLyoaZ+Hm9x/sV+IJzOqPvj1XVUGjP6\n'
    + 'yYYnPJmUYqvZeI7fEkIGdFkP2m4/sgsSGsFvpD9FK1bL1Kx2UDpYX0kHTtr18Zm/\n'
    + '1oN6irqWALSmXMDydb8hE0FB2A1VFyeKE6PnoDj/Y5cPHwPPdEi6/3gkDkSaOG30\n'
    + 'rWeQfL3pOcKqzbHaWTxMphd0DSL/quZ64Nr+Ly65Q5PRcTrtr55ekOUziuqXwk+o\n'
    + '9QpACMwcJ7ROqOznZTqTzSFVXFECAwEAAaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIG\n'
    + 'A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFM6Nox/QWbhzWVvzoJ/y0kGpNPK+\n'
    + 'MB8GA1UdIwQYMBaAFE4C7qw+9hXITO0s9QXBj5yECEmDMA0GCSqGSIb3DQEBBQUA\n'
    + 'A4IBAQCTkWBqNvyRf3Y/W21DwFx3oT/AIWrHt0BdGZO34tavummXemTH9LZ/mqv9\n'
    + 'aljt6ZuDtf5DEQjdsAwXMsyo03ffnP7doWm8iaF1+Mui77ot0TmTsP/deyGwukvJ\n'
    + 'tkxX8bZjDh+EaNauWKr+CYnniNxCQLfFtXYJsfOdVBzK3xNL+Z3ucOQRhr2helWc\n'
    + 'CDQgwfhP1+3pRVKqHvWCPC4R3fT7RZHuRmZ38kndv476GxRntejh+ePffif78bFI\n'
    + '3rIZCPBGobrrUMycafSbyXteoGca/kA+/IqrAPlk0pWQ4aEL0yTWN2h2dnjoD7oX\n'
    + 'byIuL/g9AGRh97+ssn7D6bDRPTbW\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS ap-southeast-1 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS ap-southeast-1 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:19Z/2020-03-05T22:03:19Z
     *   F = 0E:EC:5D:BD:F9:80:EE:A9:A0:8D:81:AC:37:D9:8D:34:1C:CD:27:D1
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIIEATCCAumgAwIBAgIBRTANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMTlaFw0y\n'
    + 'MDAzMDUyMjAzMTlaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJE\n'
    + 'UyBhcC1zb3V0aGVhc3QtMSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n'
    + 'ggEBANaXElmSEYt/UtxHFsARFhSUahTf1KNJzR0Dmay6hqOXQuRVbKRwPd19u5vx\n'
    + 'DdF1sLT7D69IK3VDnUiQScaCv2Dpu9foZt+rLx+cpx1qiQd1UHrvqq8xPzQOqCdC\n'
    + 'RFStq6yVYZ69yfpfoI67AjclMOjl2Vph3ftVnqP0IgVKZdzeC7fd+umGgR9xY0Qr\n'
    + 'Ubhd/lWdsbNvzK3f1TPWcfIKQnpvSt85PIEDJir6/nuJUKMtmJRwTymJf0i+JZ4x\n'
    + '7dJa341p2kHKcHMgOPW7nJQklGBA70ytjUV6/qebS3yIugr/28mwReflg3TJzVDl\n'
    + 'EOvi6pqbqNbkMuEwGDCmEQIVqgkCAwEAAaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIG\n'
    + 'A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFAu93/4k5xbWOsgdCdn+/KdiRuit\n'
    + 'MB8GA1UdIwQYMBaAFE4C7qw+9hXITO0s9QXBj5yECEmDMA0GCSqGSIb3DQEBBQUA\n'
    + 'A4IBAQBlcjSyscpPjf5+MgzMuAsCxByqUt+WFspwcMCpwdaBeHOPSQrXNqX2Sk6P\n'
    + 'kth6oCivA64trWo8tFMvPYlUA1FYVD5WpN0kCK+P5pD4KHlaDsXhuhClJzp/OP8t\n'
    + 'pOyUr5109RHLxqoKB5J5m1XA7rgcFjnMxwBSWFe3/4uMk/+4T53YfCVXuc6QV3i7\n'
    + 'I/2LAJwFf//pTtt6fZenYfCsahnr2nvrNRNyAxcfvGZ/4Opn/mJtR6R/AjvQZHiR\n'
    + 'bkRNKF2GW0ueK5W4FkZVZVhhX9xh1Aj2Ollb+lbOqADaVj+AT3PoJPZ3MPQHKCXm\n'
    + 'xwG0LOLlRr/TfD6li1AfOVTAJXv9\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS ap-southeast-2 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS ap-southeast-2 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:24Z/2020-03-05T22:03:24Z
     *   F = 20:D9:A8:82:23:AB:B9:E5:C5:24:10:D3:4D:0F:3D:B1:31:DF:E5:14
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIIEATCCAumgAwIBAgIBRjANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMjRaFw0y\n'
    + 'MDAzMDUyMjAzMjRaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJE\n'
    + 'UyBhcC1zb3V0aGVhc3QtMiBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n'
    + 'ggEBAJqBAJutz69hFOh3BtLHZTbwE8eejGGKayn9hu98YMDPzWzGXWCmW+ZYWELA\n'
    + 'cY3cNWNF8K4FqKXFr2ssorBYim1UtYFX8yhydT2hMD5zgQ2sCGUpuidijuPA6zaq\n'
    + 'Z3tdhVR94f0q8mpwpv2zqR9PcqaGDx2VR1x773FupRPRo7mEW1vC3IptHCQlP/zE\n'
    + '7jQiLl28bDIH2567xg7e7E9WnZToRnhlYdTaDaJsHTzi5mwILi4cihSok7Shv/ME\n'
    + 'hnukvxeSPUpaVtFaBhfBqq055ePq9I+Ns4KGreTKMhU0O9fkkaBaBmPaFgmeX/XO\n'
    + 'n2AX7gMouo3mtv34iDTZ0h6YCGkCAwEAAaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIG\n'
    + 'A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFIlQnY0KHYWn1jYumSdJYfwj/Nfw\n'
    + 'MB8GA1UdIwQYMBaAFE4C7qw+9hXITO0s9QXBj5yECEmDMA0GCSqGSIb3DQEBBQUA\n'
    + 'A4IBAQA0wVU6/l41cTzHc4azc4CDYY2Wd90DFWiH9C/mw0SgToYfCJ/5Cfi0NT/Y\n'
    + 'PRnk3GchychCJgoPA/k9d0//IhYEAIiIDjyFVgjbTkKV3sh4RbdldKVOUB9kumz/\n'
    + 'ZpShplsGt3z4QQiVnKfrAgqxWDjR0I0pQKkxXa6Sjkicos9LQxVtJ0XA4ieG1E7z\n'
    + 'zJr+6t80wmzxvkInSaWP3xNJK9azVRTrgQZQlvkbpDbExl4mNTG66VD3bAp6t3Wa\n'
    + 'B49//uDdfZmPkqqbX+hsxp160OH0rxJppwO3Bh869PkDnaPEd/Pxw7PawC+li0gi\n'
    + 'NRV8iCEx85aFxcyOhqn0WZOasxee\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS eu-central-1 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS eu-central-1 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:31Z/2020-03-05T22:03:31Z
     *   F = 94:B4:DF:B9:6D:7E:F7:C3:B7:BF:51:E9:A6:B7:44:A0:D0:82:11:84
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIID/zCCAuegAwIBAgIBRzANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMzFaFw0y\n'
    + 'MDAzMDUyMjAzMzFaMIGSMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEjMCEGA1UEAwwaQW1hem9uIFJE\n'
    + 'UyBldS1jZW50cmFsLTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB\n'
    + 'AQDFtP2dhSLuaPOI4ZrrPWsK4OY9ocQBp3yApH1KJYmI9wpQKZG/KCH2E6Oo7JAw\n'
    + 'QORU519r033T+FO2Z7pFPlmz1yrxGXyHpJs8ySx3Yo5S8ncDCdZJCLmtPiq/hahg\n'
    + '5/0ffexMFUCQaYicFZsrJ/cStdxUV+tSw2JQLD7UxS9J97LQWUPyyG+ZrjYVTVq+\n'
    + 'zudnFmNSe4QoecXMhAFTGJFQXxP7nhSL9Ao5FGgdXy7/JWeWdQIAj8ku6cBDKPa6\n'
    + 'Y6kP+ak+In+Lye8z9qsCD/afUozfWjPR2aA4JoIZVF8dNRShIMo8l0XfgfM2q0+n\n'
    + 'ApZWZ+BjhIO5XuoUgHS3D2YFAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNV\n'
    + 'HRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBRm4GsWIA/M6q+tK8WGHWDGh2gcyTAf\n'
    + 'BgNVHSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOC\n'
    + 'AQEAHpMmeVQNqcxgfQdbDIi5UIy+E7zZykmtAygN1XQrvga9nXTis4kOTN6g5/+g\n'
    + 'HCx7jIXeNJzAbvg8XFqBN84Quqgpl/tQkbpco9Jh1HDs558D5NnZQxNqH5qXQ3Mm\n'
    + 'uPgCw0pYcPOa7bhs07i+MdVwPBsX27CFDtsgAIru8HvKxY1oTZrWnyIRo93tt/pk\n'
    + 'WuItVMVHjaQZVfTCow0aDUbte6Vlw82KjUFq+n2NMSCJDiDKsDDHT6BJc4AJHIq3\n'
    + '/4Z52MSC9KMr0yAaaoWfW/yMEj9LliQauAgwVjArF4q78rxpfKTG9Rfd8U1BZANP\n'
    + '7FrFMN0ThjfA1IvmOYcgskY5bQ==\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS eu-west-1 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS eu-west-1 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:35Z/2020-03-05T22:03:35Z
     *   F = 1A:95:F0:43:82:D2:5D:A6:AD:F5:13:27:0B:40:8A:72:D9:92:F3:E0
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIID/DCCAuSgAwIBAgIBSDANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMzVaFw0y\n'
    + 'MDAzMDUyMjAzMzVaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n'
    + 'UyBldS13ZXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCx\n'
    + 'PdbqQ0HKRj79Pmocxvjc+P6i4Ux24kgFIl+ckiir1vzkmesc3a58gjrMlCksEObt\n'
    + 'Yihs5IhzEq1ePT0gbfS9GYFp34Uj/MtPwlrfCBWG4d2TcrsKRHr1/EXUYhWqmdrb\n'
    + 'RhX8XqoRhVkbF/auzFSBhTzcGGvZpQ2KIaxRcQfcXlMVhj/pxxAjh8U4F350Fb0h\n'
    + 'nX1jw4/KvEreBL0Xb2lnlGTkwVxaKGSgXEnOgIyOFdOQc61vdome0+eeZsP4jqeR\n'
    + 'TGYJA9izJsRbe2YJxHuazD+548hsPlM3vFzKKEVURCha466rAaYAHy3rKur3HYQx\n'
    + 'Yt+SoKcEz9PXuSGj96ejAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n'
    + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBTebg//h2oeXbZjQ4uuoiuLYzuiPDAfBgNV\n'
    + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n'
    + 'TikPaGeZasTPw+4RBemlsyPAjtFFQLo7ddaFdORLgdEysVf8aBqndvbA6MT/v4lj\n'
    + 'GtEtUdF59ZcbWOrVm+fBZ2h/jYJ59dYF/xzb09nyRbdMSzB9+mkSsnOMqluq5y8o\n'
    + 'DY/PfP2vGhEg/2ZncRC7nlQU1Dm8F4lFWEiQ2fi7O1cW852Vmbq61RIfcYsH/9Ma\n'
    + 'kpgk10VZ75b8m3UhmpZ/2uRY+JEHImH5WpcTJ7wNiPNJsciZMznGtrgOnPzYco8L\n'
    + 'cDleOASIZifNMQi9PKOJKvi0ITz0B/imr8KBsW0YjZVJ54HMa7W1lwugSM7aMAs+\n'
    + 'E3Sd5lS+SHwWaOCHwhOEVA==\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS sa-east-1 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS sa-east-1 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:40Z/2020-03-05T22:03:40Z
     *   F = 32:10:3D:FA:6D:42:F5:35:98:40:15:F4:4C:74:74:27:CB:CE:D4:B5
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIID/DCCAuSgAwIBAgIBSTANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzNDBaFw0y\n'
    + 'MDAzMDUyMjAzNDBaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n'
    + 'UyBzYS1lYXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCU\n'
    + 'X4OBnQ5xA6TLJAiFEI6l7bUWjoVJBa/VbMdCCSs2i2dOKmqUaXu2ix2zcPILj3lZ\n'
    + 'GMk3d/2zvTK/cKhcFrewHUBamTeVHdEmynhMQamqNmkM4ptYzFcvEUw1TGxHT4pV\n'
    + 'Q6gSN7+/AJewQvyHexHo8D0+LDN0/Wa9mRm4ixCYH2CyYYJNKaZt9+EZfNu+PPS4\n'
    + '8iB0TWH0DgQkbWMBfCRgolLLitAZklZ4dvdlEBS7evN1/7ttBxUK6SvkeeSx3zBl\n'
    + 'ww3BlXqc3bvTQL0A+RRysaVyFbvtp9domFaDKZCpMmDFAN/ntx215xmQdrSt+K3F\n'
    + 'cXdGQYHx5q410CAclGnbAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n'
    + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBT6iVWnm/uakS+tEX2mzIfw+8JL0zAfBgNV\n'
    + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n'
    + 'FmDD+QuDklXn2EgShwQxV13+txPRuVdOSrutHhoCgMwFWCMtPPtBAKs6KPY7Guvw\n'
    + 'DpJoZSehDiOfsgMirjOWjvfkeWSNvKfjWTVneX7pZD9W5WPnsDBvTbCGezm+v87z\n'
    + 'b+ZM2ZMo98m/wkMcIEAgdSKilR2fuw8rLkAjhYFfs0A7tDgZ9noKwgHvoE4dsrI0\n'
    + 'KZYco6DlP/brASfHTPa2puBLN9McK3v+h0JaSqqm5Ro2Bh56tZkQh8AWy/miuDuK\n'
    + '3+hNEVdxosxlkM1TPa1DGj0EzzK0yoeerXuH2HX7LlCrrxf6/wdKnjR12PMrLQ4A\n'
    + 'pCqkcWw894z6bV9MAvKe6A==\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS us-east-1 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS us-east-1 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T21:54:04Z/2020-03-05T21:54:04Z
     *   F = 34:47:8A:90:8A:83:AE:45:DC:B6:16:76:D2:35:EC:E9:75:C6:2C:63
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIID/DCCAuSgAwIBAgIBQzANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMTU0MDRaFw0y\n'
    + 'MDAzMDUyMTU0MDRaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n'
    + 'UyB1cy1lYXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDI\n'
    + 'UIuwh8NusKHk1SqPXcP7OqxY3S/M2ZyQWD3w7Bfihpyyy/fc1w0/suIpX3kbMhAV\n'
    + '2ESwged2/2zSx4pVnjp/493r4luhSqQYzru78TuPt9bhJIJ51WXunZW2SWkisSaf\n'
    + 'USYUzVN9ezR/bjXTumSUQaLIouJt3OHLX49s+3NAbUyOI8EdvgBQWD68H1epsC0n\n'
    + 'CI5s+pIktyOZ59c4DCDLQcXErQ+tNbDC++oct1ANd/q8p9URonYwGCGOBy7sbCYq\n'
    + '9eVHh1Iy2M+SNXddVOGw5EuruvHoCIQyOz5Lz4zSuZA9dRbrfztNOpezCNYu6NKM\n'
    + 'n+hzcvdiyxv77uNm8EaxAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n'
    + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBQSQG3TmMe6Sa3KufaPBa72v4QFDzAfBgNV\n'
    + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n'
    + 'L/mOZfB3187xTmjOHMqN2G2oSKHBKiQLM9uv8+97qT+XR+TVsBT6b3yoPpMAGhHA\n'
    + 'Pc7nxAF5gPpuzatx0OTLPcmYucFmfqT/1qA5WlgCnMNtczyNMH97lKFTNV7Njtek\n'
    + 'jWEzAEQSyEWrkNpNlC4j6kMYyPzVXQeXUeZTgJ9FNnVZqmvfjip2N22tawMjrCn5\n'
    + '7KN/zN65EwY2oO9XsaTwwWmBu3NrDdMbzJnbxoWcFWj4RBwanR1XjQOVNhDwmCOl\n'
    + '/1Et13b8CPyj69PC8BOVU6cfTSx8WUVy0qvYOKHNY9Bqa5BDnIL3IVmUkeTlM1mt\n'
    + 'enRpyBj+Bk9rh/ICdiRKmA==\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS us-west-1 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS us-west-1 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:45Z/2020-03-05T22:03:45Z
     *   F = EF:94:2F:E3:58:0E:09:D6:79:C2:16:97:91:FB:37:EA:D7:70:A8:4B
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIID/DCCAuSgAwIBAgIBSjANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzNDVaFw0y\n'
    + 'MDAzMDUyMjAzNDVaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n'
    + 'UyB1cy13ZXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDE\n'
    + 'Dhw+uw/ycaiIhhyu2pXFRimq0DlB8cNtIe8hdqndH8TV/TFrljNgR8QdzOgZtZ9C\n'
    + 'zzQ2GRpInN/qJF6slEd6wO+6TaDBQkPY+07TXNt52POFUhdVkhJXHpE2BS7Xn6J7\n'
    + '7RFAOeG1IZmc2DDt+sR1BgXzUqHslQGfFYNS0/MBO4P+ya6W7IhruB1qfa4HiYQS\n'
    + 'dbe4MvGWnv0UzwAqdR7OF8+8/5c58YXZIXCO9riYF2ql6KNSL5cyDPcYK5VK0+Q9\n'
    + 'VI6vuJHSMYcF7wLePw8jtBktqAFE/wbdZiIHhZvNyiNWPPNTGUmQbaJ+TzQEHDs5\n'
    + '8en+/W7JKnPyBOkxxENbAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n'
    + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBS0nw/tFR9bCjgqWTPJkyy4oOD8bzAfBgNV\n'
    + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n'
    + 'CXGAY3feAak6lHdqj6+YWjy6yyUnLK37bRxZDsyDVXrPRQaXRzPTzx79jvDwEb/H\n'
    + 'Q/bdQ7zQRWqJcbivQlwhuPJ4kWPUZgSt3JUUuqkMsDzsvj/bwIjlrEFDOdHGh0mi\n'
    + 'eVIngFEjUXjMh+5aHPEF9BlQnB8LfVtKj18e15UDTXFa+xJPFxUR7wDzCfo4WI1m\n'
    + 'sUMG4q1FkGAZgsoyFPZfF8IVvgCuGdR8z30VWKklFxttlK0eGLlPAyIO0CQxPQlo\n'
    + 'saNJrHf4tLOgZIWk+LpDhNd9Et5EzvJ3aURUsKY4pISPPF5WdvM9OE59bERwUErd\n'
    + 'nuOuQWQeeadMceZnauRzJQ==\n'
    + '-----END CERTIFICATE-----\n',

    /**
     * Amazon RDS us-west-2 certificate CA 2015 to 2020
     *
     *   CN = Amazon RDS us-west-2 CA
     *   OU = Amazon RDS
     *   O = Amazon Web Services, Inc.
     *   L = Seattle
     *   ST = Washington
     *   C = US
     *   P = 2015-02-05T22:03:50Z/2020-03-05T22:03:50Z
     *   F = 94:2C:A8:B0:23:48:17:F0:CD:2F:19:7F:C1:E0:21:7C:65:79:13:3A
     */
    '-----BEGIN CERTIFICATE-----\n'
    + 'MIID/DCCAuSgAwIBAgIBSzANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n'
    + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n'
    + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n'
    + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzNTBaFw0y\n'
    + 'MDAzMDUyMjAzNTBaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n'
    + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n'
    + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n'
    + 'UyB1cy13ZXN0LTIgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDM\n'
    + 'H58SR48U6jyERC1vYTnub34smf5EQVXyzaTmspWGWGzT31NLNZGSDFaa7yef9kdO\n'
    + 'mzJsgebR5tXq6LdwlIoWkKYQ7ycUaadtVKVYdI40QcI3cHn0qLFlg2iBXmWp/B+i\n'
    + 'Z34VuVlCh31Uj5WmhaBoz8t/GRqh1V/aCsf3Wc6jCezH3QfuCjBpzxdOOHN6Ie2v\n'
    + 'xX09O5qmZTvMoRBAvPkxdaPg/Mi7fxueWTbEVk78kuFbF1jHYw8U1BLILIAhcqlq\n'
    + 'x4u8nl73t3O3l/soNUcIwUDK0/S+Kfqhwn9yQyPlhb4Wy3pfnZLJdkyHldktnQav\n'
    + '9TB9u7KH5Lk0aAYslMLxAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n'
    + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBT8roM4lRnlFHWMPWRz0zkwFZog1jAfBgNV\n'
    + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n'
    + 'JwrxwgwmPtcdaU7O7WDdYa4hprpOMamI49NDzmE0s10oGrqmLwZygcWU0jT+fJ+Y\n'
    + 'pJe1w0CVfKaeLYNsOBVW3X4ZPmffYfWBheZiaiEflq/P6t7/Eg81gaKYnZ/x1Dfa\n'
    + 'sUYkzPvCkXe9wEz5zdUTOCptDt89rBR9CstL9vE7WYUgiVVmBJffWbHQLtfjv6OF\n'
    + 'NMb0QME981kGRzc2WhgP71YS2hHd1kXtsoYP1yTu4vThSKsoN4bkiHsaC1cRkLoy\n'
    + '0fFA4wpB3WloMEvCDaUvvH1LZlBXTNlwi9KtcwD4tDxkkBt4tQczKLGpQ/nF/W9n\n'
    + '8YDWk3IIc1sd0bkZqoau2Q==\n'
    + '-----END CERTIFICATE-----\n'
  ]
};

},{}],28:[function(require,module,exports){
// Manually extracted from mysql-5.7.9/include/mysql.h.pp
// some more info here: http://dev.mysql.com/doc/refman/5.5/en/c-api-prepared-statement-type-codes.html
exports.DECIMAL     = 0x00; // aka DECIMAL (http://dev.mysql.com/doc/refman/5.0/en/precision-math-decimal-changes.html)
exports.TINY        = 0x01; // aka TINYINT, 1 byte
exports.SHORT       = 0x02; // aka SMALLINT, 2 bytes
exports.LONG        = 0x03; // aka INT, 4 bytes
exports.FLOAT       = 0x04; // aka FLOAT, 4-8 bytes
exports.DOUBLE      = 0x05; // aka DOUBLE, 8 bytes
exports.NULL        = 0x06; // NULL (used for prepared statements, I think)
exports.TIMESTAMP   = 0x07; // aka TIMESTAMP
exports.LONGLONG    = 0x08; // aka BIGINT, 8 bytes
exports.INT24       = 0x09; // aka MEDIUMINT, 3 bytes
exports.DATE        = 0x0a; // aka DATE
exports.TIME        = 0x0b; // aka TIME
exports.DATETIME    = 0x0c; // aka DATETIME
exports.YEAR        = 0x0d; // aka YEAR, 1 byte (don't ask)
exports.NEWDATE     = 0x0e; // aka ?
exports.VARCHAR     = 0x0f; // aka VARCHAR (?)
exports.BIT         = 0x10; // aka BIT, 1-8 byte
exports.TIMESTAMP2  = 0x11; // aka TIMESTAMP with fractional seconds
exports.DATETIME2   = 0x12; // aka DATETIME with fractional seconds
exports.TIME2       = 0x13; // aka TIME with fractional seconds
exports.JSON        = 0xf5; // aka JSON
exports.NEWDECIMAL  = 0xf6; // aka DECIMAL
exports.ENUM        = 0xf7; // aka ENUM
exports.SET         = 0xf8; // aka SET
exports.TINY_BLOB   = 0xf9; // aka TINYBLOB, TINYTEXT
exports.MEDIUM_BLOB = 0xfa; // aka MEDIUMBLOB, MEDIUMTEXT
exports.LONG_BLOB   = 0xfb; // aka LONGBLOG, LONGTEXT
exports.BLOB        = 0xfc; // aka BLOB, TEXT
exports.VAR_STRING  = 0xfd; // aka VARCHAR, VARBINARY
exports.STRING      = 0xfe; // aka CHAR, BINARY
exports.GEOMETRY    = 0xff; // aka GEOMETRY

},{}],29:[function(require,module,exports){
(function (Buffer){
module.exports = ClientAuthenticationPacket;
function ClientAuthenticationPacket(options) {
  options = options || {};

  this.clientFlags   = options.clientFlags;
  this.maxPacketSize = options.maxPacketSize;
  this.charsetNumber = options.charsetNumber;
  this.filler        = undefined;
  this.user          = options.user;
  this.scrambleBuff  = options.scrambleBuff;
  this.database      = options.database;
  this.protocol41    = options.protocol41;
}

ClientAuthenticationPacket.prototype.parse = function(parser) {
  if (this.protocol41) {
    this.clientFlags   = parser.parseUnsignedNumber(4);
    this.maxPacketSize = parser.parseUnsignedNumber(4);
    this.charsetNumber = parser.parseUnsignedNumber(1);
    this.filler        = parser.parseFiller(23);
    this.user          = parser.parseNullTerminatedString();
    this.scrambleBuff  = parser.parseLengthCodedBuffer();
    this.database      = parser.parseNullTerminatedString();
  } else {
    this.clientFlags   = parser.parseUnsignedNumber(2);
    this.maxPacketSize = parser.parseUnsignedNumber(3);
    this.user          = parser.parseNullTerminatedString();
    this.scrambleBuff  = parser.parseBuffer(8);
    this.database      = parser.parseLengthCodedBuffer();
  }
};

ClientAuthenticationPacket.prototype.write = function(writer) {
  if (this.protocol41) {
    writer.writeUnsignedNumber(4, this.clientFlags);
    writer.writeUnsignedNumber(4, this.maxPacketSize);
    writer.writeUnsignedNumber(1, this.charsetNumber);
    writer.writeFiller(23);
    writer.writeNullTerminatedString(this.user);
    writer.writeLengthCodedBuffer(this.scrambleBuff);
    writer.writeNullTerminatedString(this.database);
  } else {
    writer.writeUnsignedNumber(2, this.clientFlags);
    writer.writeUnsignedNumber(3, this.maxPacketSize);
    writer.writeNullTerminatedString(this.user);
    writer.writeBuffer(this.scrambleBuff);
    if (this.database && this.database.length) {
      writer.writeFiller(1);
      writer.writeBuffer(new Buffer(this.database));
    }
  }
};

}).call(this,require("buffer").Buffer)

},{"buffer":undefined}],30:[function(require,module,exports){
module.exports = ComChangeUserPacket;
function ComChangeUserPacket(options) {
  options = options || {};

  this.command       = 0x11;
  this.user          = options.user;
  this.scrambleBuff  = options.scrambleBuff;
  this.database      = options.database;
  this.charsetNumber = options.charsetNumber;
}

ComChangeUserPacket.prototype.parse = function(parser) {
  this.command       = parser.parseUnsignedNumber(1);
  this.user          = parser.parseNullTerminatedString();
  this.scrambleBuff  = parser.parseLengthCodedBuffer();
  this.database      = parser.parseNullTerminatedString();
  this.charsetNumber = parser.parseUnsignedNumber(1);
};

ComChangeUserPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.command);
  writer.writeNullTerminatedString(this.user);
  writer.writeLengthCodedBuffer(this.scrambleBuff);
  writer.writeNullTerminatedString(this.database);
  writer.writeUnsignedNumber(2, this.charsetNumber);
};

},{}],31:[function(require,module,exports){
module.exports = ComPingPacket;
function ComPingPacket() {
  this.command = 0x0e;
}

ComPingPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.command);
};

ComPingPacket.prototype.parse = function(parser) {
  this.command = parser.parseUnsignedNumber(1);
};

},{}],32:[function(require,module,exports){
module.exports = ComQueryPacket;
function ComQueryPacket(sql) {
  this.command = 0x03;
  this.sql     = sql;
}

ComQueryPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.command);
  writer.writeString(this.sql);
};

ComQueryPacket.prototype.parse = function(parser) {
  this.command = parser.parseUnsignedNumber(1);
  this.sql     = parser.parsePacketTerminatedString();
};

},{}],33:[function(require,module,exports){
module.exports = ComQuitPacket;
function ComQuitPacket() {
  this.command = 0x01;
}

ComQuitPacket.prototype.parse = function parse(parser) {
  this.command = parser.parseUnsignedNumber(1);
};

ComQuitPacket.prototype.write = function write(writer) {
  writer.writeUnsignedNumber(1, this.command);
};

},{}],34:[function(require,module,exports){
module.exports = ComStatisticsPacket;
function ComStatisticsPacket() {
  this.command = 0x09;
}

ComStatisticsPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.command);
};

ComStatisticsPacket.prototype.parse = function(parser) {
  this.command = parser.parseUnsignedNumber(1);
};

},{}],35:[function(require,module,exports){
module.exports = EmptyPacket;
function EmptyPacket() {
}

EmptyPacket.prototype.write = function write() {
};

},{}],36:[function(require,module,exports){
module.exports = EofPacket;
function EofPacket(options) {
  options = options || {};

  this.fieldCount   = undefined;
  this.warningCount = options.warningCount;
  this.serverStatus = options.serverStatus;
  this.protocol41   = options.protocol41;
}

EofPacket.prototype.parse = function(parser) {
  this.fieldCount   = parser.parseUnsignedNumber(1);
  if (this.protocol41) {
    this.warningCount = parser.parseUnsignedNumber(2);
    this.serverStatus = parser.parseUnsignedNumber(2);
  }
};

EofPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, 0xfe);
  if (this.protocol41) {
    writer.writeUnsignedNumber(2, this.warningCount);
    writer.writeUnsignedNumber(2, this.serverStatus);
  }
};

},{}],37:[function(require,module,exports){
module.exports = ErrorPacket;
function ErrorPacket(options) {
  options = options || {};

  this.fieldCount     = options.fieldCount;
  this.errno          = options.errno;
  this.sqlStateMarker = options.sqlStateMarker;
  this.sqlState       = options.sqlState;
  this.message        = options.message;
}

ErrorPacket.prototype.parse = function(parser) {
  this.fieldCount = parser.parseUnsignedNumber(1);
  this.errno      = parser.parseUnsignedNumber(2);

  // sqlStateMarker ('#' = 0x23) indicates error packet format
  if (parser.peak() === 0x23) {
    this.sqlStateMarker = parser.parseString(1);
    this.sqlState       = parser.parseString(5);
  }

  this.message = parser.parsePacketTerminatedString();
};

ErrorPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, 0xff);
  writer.writeUnsignedNumber(2, this.errno);

  if (this.sqlStateMarker) {
    writer.writeString(this.sqlStateMarker);
    writer.writeString(this.sqlState);
  }

  writer.writeString(this.message);
};

},{}],38:[function(require,module,exports){
var Types = require('../constants/types');

module.exports = Field;
function Field(options) {
  options = options || {};

  this.parser = options.parser;
  this.packet = options.packet;
  this.db     = options.packet.db;
  this.table  = options.packet.table;
  this.name   = options.packet.name;
  this.type   = typeToString(options.packet.type);
  this.length = options.packet.length;
}

Field.prototype.string = function () {
  return this.parser.parseLengthCodedString();
};

Field.prototype.buffer = function () {
  return this.parser.parseLengthCodedBuffer();
};

Field.prototype.geometry = function () {
  return this.parser.parseGeometryValue();
};

function typeToString(t) {
  for (var k in Types) {
    if (Types[k] === t) return k;
  }

  return undefined;
}

},{"../constants/types":28}],39:[function(require,module,exports){
module.exports = FieldPacket;
function FieldPacket(options) {
  options = options || {};

  this.catalog    = options.catalog;
  this.db         = options.db;
  this.table      = options.table;
  this.orgTable   = options.orgTable;
  this.name       = options.name;
  this.orgName    = options.orgName;
  this.charsetNr  = options.charsetNr;
  this.length     = options.length;
  this.type       = options.type;
  this.flags      = options.flags;
  this.decimals   = options.decimals;
  this.default    = options.default;
  this.zeroFill   = options.zeroFill;
  this.protocol41 = options.protocol41;
}

FieldPacket.prototype.parse = function(parser) {
  if (this.protocol41) {
    this.catalog     = parser.parseLengthCodedString();
    this.db          = parser.parseLengthCodedString();
    this.table       = parser.parseLengthCodedString();
    this.orgTable    = parser.parseLengthCodedString();
    this.name        = parser.parseLengthCodedString();
    this.orgName     = parser.parseLengthCodedString();

    if (parser.parseLengthCodedNumber() !== 0x0c) {
      var err  = new TypeError('Received invalid field length');
      err.code = 'PARSER_INVALID_FIELD_LENGTH';
      throw err;
    }

    this.charsetNr   = parser.parseUnsignedNumber(2);
    this.length      = parser.parseUnsignedNumber(4);
    this.type        = parser.parseUnsignedNumber(1);
    this.flags       = parser.parseUnsignedNumber(2);
    this.decimals    = parser.parseUnsignedNumber(1);

    var filler       = parser.parseBuffer(2);
    if (filler[0] !== 0x0 || filler[1] !== 0x0) {
      var err  = new TypeError('Received invalid filler');
      err.code = 'PARSER_INVALID_FILLER';
      throw err;
    }

    // parsed flags
    this.zeroFill    = (this.flags & 0x0040 ? true : false);

    if (parser.reachedPacketEnd()) {
      return;
    }

    this.default     = parser.parseLengthCodedString();
  } else {
    this.table       = parser.parseLengthCodedString();
    this.name        = parser.parseLengthCodedString();
    this.length      = parser.parseUnsignedNumber(parser.parseUnsignedNumber(1));
    this.type        = parser.parseUnsignedNumber(parser.parseUnsignedNumber(1));
  }
};

FieldPacket.prototype.write = function(writer) {
  if (this.protocol41) {
    writer.writeLengthCodedString(this.catalog);
    writer.writeLengthCodedString(this.db);
    writer.writeLengthCodedString(this.table);
    writer.writeLengthCodedString(this.orgTable);
    writer.writeLengthCodedString(this.name);
    writer.writeLengthCodedString(this.orgName);

    writer.writeLengthCodedNumber(0x0c);
    writer.writeUnsignedNumber(2, this.charsetNr || 0);
    writer.writeUnsignedNumber(4, this.length || 0);
    writer.writeUnsignedNumber(1, this.type || 0);
    writer.writeUnsignedNumber(2, this.flags || 0);
    writer.writeUnsignedNumber(1, this.decimals || 0);
    writer.writeFiller(2);

    if (this.default !== undefined) {
      writer.writeLengthCodedString(this.default);
    }
  } else {
    writer.writeLengthCodedString(this.table);
    writer.writeLengthCodedString(this.name);
    writer.writeUnsignedNumber(1, 0x01);
    writer.writeUnsignedNumber(1, this.length);
    writer.writeUnsignedNumber(1, 0x01);
    writer.writeUnsignedNumber(1, this.type);
  }
};

},{}],40:[function(require,module,exports){
(function (Buffer){
var Client = require('../constants/client');

module.exports = HandshakeInitializationPacket;
function HandshakeInitializationPacket(options) {
  options = options || {};

  this.protocolVersion     = options.protocolVersion;
  this.serverVersion       = options.serverVersion;
  this.threadId            = options.threadId;
  this.scrambleBuff1       = options.scrambleBuff1;
  this.filler1             = options.filler1;
  this.serverCapabilities1 = options.serverCapabilities1;
  this.serverLanguage      = options.serverLanguage;
  this.serverStatus        = options.serverStatus;
  this.serverCapabilities2 = options.serverCapabilities2;
  this.scrambleLength      = options.scrambleLength;
  this.filler2             = options.filler2;
  this.scrambleBuff2       = options.scrambleBuff2;
  this.filler3             = options.filler3;
  this.pluginData          = options.pluginData;
  this.protocol41          = options.protocol41;

  if (this.protocol41) {
    // force set the bit in serverCapabilities1
    this.serverCapabilities1 |= Client.CLIENT_PROTOCOL_41;
  }
}

HandshakeInitializationPacket.prototype.parse = function(parser) {
  this.protocolVersion     = parser.parseUnsignedNumber(1);
  this.serverVersion       = parser.parseNullTerminatedString();
  this.threadId            = parser.parseUnsignedNumber(4);
  this.scrambleBuff1       = parser.parseBuffer(8);
  this.filler1             = parser.parseFiller(1);
  this.serverCapabilities1 = parser.parseUnsignedNumber(2);
  this.serverLanguage      = parser.parseUnsignedNumber(1);
  this.serverStatus        = parser.parseUnsignedNumber(2);

  this.protocol41          = (this.serverCapabilities1 & (1 << 9)) > 0;

  if (this.protocol41) {
    this.serverCapabilities2 = parser.parseUnsignedNumber(2);
    this.scrambleLength      = parser.parseUnsignedNumber(1);
    this.filler2             = parser.parseFiller(10);
    // scrambleBuff2 should be 0x00 terminated, but sphinx does not do this
    // so we assume scrambleBuff2 to be 12 byte and treat the next byte as a
    // filler byte.
    this.scrambleBuff2       = parser.parseBuffer(12);
    this.filler3             = parser.parseFiller(1);
  } else {
    this.filler2             = parser.parseFiller(13);
  }

  if (parser.reachedPacketEnd()) {
    return;
  }

  // According to the docs this should be 0x00 terminated, but MariaDB does
  // not do this, so we assume this string to be packet terminated.
  this.pluginData = parser.parsePacketTerminatedString();

  // However, if there is a trailing '\0', strip it
  var lastChar = this.pluginData.length - 1;
  if (this.pluginData[lastChar] === '\0') {
    this.pluginData = this.pluginData.substr(0, lastChar);
  }
};

HandshakeInitializationPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.protocolVersion);
  writer.writeNullTerminatedString(this.serverVersion);
  writer.writeUnsignedNumber(4, this.threadId);
  writer.writeBuffer(this.scrambleBuff1);
  writer.writeFiller(1);
  writer.writeUnsignedNumber(2, this.serverCapabilities1);
  writer.writeUnsignedNumber(1, this.serverLanguage);
  writer.writeUnsignedNumber(2, this.serverStatus);
  if (this.protocol41) {
    writer.writeUnsignedNumber(2, this.serverCapabilities2);
    writer.writeUnsignedNumber(1, this.scrambleLength);
    writer.writeFiller(10);
  }
  writer.writeNullTerminatedBuffer(this.scrambleBuff2);

  if (this.pluginData !== undefined) {
    writer.writeNullTerminatedString(this.pluginData);
  }
};

HandshakeInitializationPacket.prototype.scrambleBuff = function() {
  var buffer = new Buffer(this.scrambleBuff1.length +
                          (typeof this.scrambleBuff2 !== 'undefined' ? this.scrambleBuff2.length : 0));

  this.scrambleBuff1.copy(buffer);
  if (typeof this.scrambleBuff2 !== 'undefined') {
    this.scrambleBuff2.copy(buffer, this.scrambleBuff1.length);
  }

  return buffer;
};

}).call(this,require("buffer").Buffer)

},{"../constants/client":24,"buffer":undefined}],41:[function(require,module,exports){
module.exports = LocalDataFilePacket;

/**
 * Create a new LocalDataFilePacket
 * @constructor
 * @param {Buffer} data The data contents of the packet
 * @public
 */
function LocalDataFilePacket(data) {
  this.data = data;
}

LocalDataFilePacket.prototype.write = function(writer) {
  writer.writeBuffer(this.data);
};

},{}],42:[function(require,module,exports){
module.exports = OkPacket;
function OkPacket(options) {
  options = options || {};

  this.fieldCount   = undefined;
  this.affectedRows = undefined;
  this.insertId     = undefined;
  this.serverStatus = undefined;
  this.warningCount = undefined;
  this.message      = undefined;
  this.protocol41   = options.protocol41;
}

OkPacket.prototype.parse = function(parser) {
  this.fieldCount   = parser.parseUnsignedNumber(1);
  this.affectedRows = parser.parseLengthCodedNumber();
  this.insertId     = parser.parseLengthCodedNumber();
  if (this.protocol41) {
    this.serverStatus = parser.parseUnsignedNumber(2);
    this.warningCount = parser.parseUnsignedNumber(2);
  }
  this.message      = parser.parsePacketTerminatedString();
  this.changedRows  = 0;

  var m = this.message.match(/\schanged:\s*(\d+)/i);

  if (m !== null) {
    this.changedRows = parseInt(m[1], 10);
  }
};

OkPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, 0x00);
  writer.writeLengthCodedNumber(this.affectedRows || 0);
  writer.writeLengthCodedNumber(this.insertId || 0);
  if (this.protocol41) {
    writer.writeUnsignedNumber(2, this.serverStatus || 0);
    writer.writeUnsignedNumber(2, this.warningCount || 0);
  }
  writer.writeString(this.message);
};

},{}],43:[function(require,module,exports){
module.exports = OldPasswordPacket;
function OldPasswordPacket(options) {
  options = options || {};

  this.scrambleBuff = options.scrambleBuff;
}

OldPasswordPacket.prototype.parse = function(parser) {
  this.scrambleBuff = parser.parseNullTerminatedBuffer();
};

OldPasswordPacket.prototype.write = function(writer) {
  writer.writeBuffer(this.scrambleBuff);
  writer.writeFiller(1);
};

},{}],44:[function(require,module,exports){
module.exports = ResultSetHeaderPacket;
function ResultSetHeaderPacket(options) {
  options = options || {};

  this.fieldCount = options.fieldCount;
  this.extra      = options.extra;
}

ResultSetHeaderPacket.prototype.parse = function(parser) {
  this.fieldCount = parser.parseLengthCodedNumber();

  if (parser.reachedPacketEnd()) return;

  this.extra = (this.fieldCount === null)
    ? parser.parsePacketTerminatedString()
    : parser.parseLengthCodedNumber();
};

ResultSetHeaderPacket.prototype.write = function(writer) {
  writer.writeLengthCodedNumber(this.fieldCount);

  if (this.extra !== undefined) {
    writer.writeLengthCodedNumber(this.extra);
  }
};

},{}],45:[function(require,module,exports){
var Types                        = require('../constants/types');
var Charsets                     = require('../constants/charsets');
var Field                        = require('./Field');
var IEEE_754_BINARY_64_PRECISION = Math.pow(2, 53);

module.exports = RowDataPacket;
function RowDataPacket() {
}

Object.defineProperty(RowDataPacket.prototype, 'parse', {
  configurable : true,
  enumerable   : false,
  value        : parse
});

Object.defineProperty(RowDataPacket.prototype, '_typeCast', {
  configurable : true,
  enumerable   : false,
  value        : typeCast
});

function parse(parser, fieldPackets, typeCast, nestTables, connection) {
  var self = this;
  var next = function () {
    return self._typeCast(fieldPacket, parser, connection.config.timezone, connection.config.supportBigNumbers, connection.config.bigNumberStrings, connection.config.dateStrings);
  };

  for (var i = 0; i < fieldPackets.length; i++) {
    var fieldPacket = fieldPackets[i];
    var value;

    if (typeof typeCast === 'function') {
      value = typeCast.apply(connection, [ new Field({ packet: fieldPacket, parser: parser }), next ]);
    } else {
      value = (typeCast)
        ? this._typeCast(fieldPacket, parser, connection.config.timezone, connection.config.supportBigNumbers, connection.config.bigNumberStrings, connection.config.dateStrings)
        : ( (fieldPacket.charsetNr === Charsets.BINARY)
          ? parser.parseLengthCodedBuffer()
          : parser.parseLengthCodedString() );
    }

    if (typeof nestTables === 'string' && nestTables.length) {
      this[fieldPacket.table + nestTables + fieldPacket.name] = value;
    } else if (nestTables) {
      this[fieldPacket.table] = this[fieldPacket.table] || {};
      this[fieldPacket.table][fieldPacket.name] = value;
    } else {
      this[fieldPacket.name] = value;
    }
  }
}

function typeCast(field, parser, timeZone, supportBigNumbers, bigNumberStrings, dateStrings) {
  var numberString;

  switch (field.type) {
    case Types.TIMESTAMP:
    case Types.TIMESTAMP2:
    case Types.DATE:
    case Types.DATETIME:
    case Types.DATETIME2:
    case Types.NEWDATE:
      var dateString = parser.parseLengthCodedString();

      if (typeMatch(field.type, dateStrings)) {
        return dateString;
      }

      if (dateString === null) {
        return null;
      }

      var originalString = dateString;
      if (field.type === Types.DATE) {
        dateString += ' 00:00:00';
      }

      if (timeZone !== 'local') {
        dateString += ' ' + timeZone;
      }

      var dt = new Date(dateString);
      if (isNaN(dt.getTime())) {
        return originalString;
      }

      return dt;
    case Types.TINY:
    case Types.SHORT:
    case Types.LONG:
    case Types.INT24:
    case Types.YEAR:
    case Types.FLOAT:
    case Types.DOUBLE:
      numberString = parser.parseLengthCodedString();
      return (numberString === null || (field.zeroFill && numberString[0] === '0'))
        ? numberString : Number(numberString);
    case Types.NEWDECIMAL:
    case Types.LONGLONG:
      numberString = parser.parseLengthCodedString();
      return (numberString === null || (field.zeroFill && numberString[0] === '0'))
        ? numberString
        : ((supportBigNumbers && (bigNumberStrings || (Number(numberString) >= IEEE_754_BINARY_64_PRECISION) || Number(numberString) <= -IEEE_754_BINARY_64_PRECISION))
          ? numberString
          : Number(numberString));
    case Types.BIT:
      return parser.parseLengthCodedBuffer();
    case Types.STRING:
    case Types.VAR_STRING:
    case Types.TINY_BLOB:
    case Types.MEDIUM_BLOB:
    case Types.LONG_BLOB:
    case Types.BLOB:
      return (field.charsetNr === Charsets.BINARY)
        ? parser.parseLengthCodedBuffer()
        : parser.parseLengthCodedString();
    case Types.GEOMETRY:
      return parser.parseGeometryValue();
    default:
      return parser.parseLengthCodedString();
  }
}

function typeMatch(type, list) {
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      if (Types[list[i]] === type) return true;
    }
    return false;
  } else {
    return Boolean(list);
  }
}

},{"../constants/charsets":23,"../constants/types":28,"./Field":38}],46:[function(require,module,exports){
// http://dev.mysql.com/doc/internals/en/ssl.html
// http://dev.mysql.com/doc/internals/en/connection-phase-packets.html#packet-Protocol::SSLRequest

var ClientConstants = require('../constants/client');

module.exports = SSLRequestPacket;

function SSLRequestPacket(options) {
  options = options || {};
  this.clientFlags   = options.clientFlags | ClientConstants.CLIENT_SSL;
  this.maxPacketSize = options.maxPacketSize;
  this.charsetNumber = options.charsetNumber;
}

SSLRequestPacket.prototype.parse = function(parser) {
  // TODO: check SSLRequest packet v41 vs pre v41
  this.clientFlags   = parser.parseUnsignedNumber(4);
  this.maxPacketSize = parser.parseUnsignedNumber(4);
  this.charsetNumber = parser.parseUnsignedNumber(1);
};

SSLRequestPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(4, this.clientFlags);
  writer.writeUnsignedNumber(4, this.maxPacketSize);
  writer.writeUnsignedNumber(1, this.charsetNumber);
  writer.writeFiller(23);
};

},{"../constants/client":24}],47:[function(require,module,exports){
module.exports = StatisticsPacket;
function StatisticsPacket() {
  this.message      = undefined;
}

StatisticsPacket.prototype.parse = function(parser) {
  this.message      = parser.parsePacketTerminatedString();

  var items = this.message.split(/\s\s/);
  for (var i = 0; i < items.length; i++) {
    var m = items[i].match(/^(.+)\:\s+(.+)$/);
    if (m !== null) {
      this[m[1].toLowerCase().replace(/\s/g, '_')] = Number(m[2]);
    }
  }
};

StatisticsPacket.prototype.write = function(writer) {
  writer.writeString(this.message);
};

},{}],48:[function(require,module,exports){
module.exports = UseOldPasswordPacket;
function UseOldPasswordPacket(options) {
  options = options || {};

  this.firstByte = options.firstByte || 0xfe;
}

UseOldPasswordPacket.prototype.parse = function(parser) {
  this.firstByte = parser.parseUnsignedNumber(1);
};

UseOldPasswordPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.firstByte);
};

},{}],49:[function(require,module,exports){
exports.ClientAuthenticationPacket = require('./ClientAuthenticationPacket');
exports.ComChangeUserPacket = require('./ComChangeUserPacket');
exports.ComPingPacket = require('./ComPingPacket');
exports.ComQueryPacket = require('./ComQueryPacket');
exports.ComQuitPacket = require('./ComQuitPacket');
exports.ComStatisticsPacket = require('./ComStatisticsPacket');
exports.EmptyPacket = require('./EmptyPacket');
exports.EofPacket = require('./EofPacket');
exports.ErrorPacket = require('./ErrorPacket');
exports.Field = require('./Field');
exports.FieldPacket = require('./FieldPacket');
exports.HandshakeInitializationPacket = require('./HandshakeInitializationPacket');
exports.LocalDataFilePacket = require('./LocalDataFilePacket');
exports.OkPacket = require('./OkPacket');
exports.OldPasswordPacket = require('./OldPasswordPacket');
exports.ResultSetHeaderPacket = require('./ResultSetHeaderPacket');
exports.RowDataPacket = require('./RowDataPacket');
exports.SSLRequestPacket = require('./SSLRequestPacket');
exports.StatisticsPacket = require('./StatisticsPacket');
exports.UseOldPasswordPacket = require('./UseOldPasswordPacket');

},{"./ClientAuthenticationPacket":29,"./ComChangeUserPacket":30,"./ComPingPacket":31,"./ComQueryPacket":32,"./ComQuitPacket":33,"./ComStatisticsPacket":34,"./EmptyPacket":35,"./EofPacket":36,"./ErrorPacket":37,"./Field":38,"./FieldPacket":39,"./HandshakeInitializationPacket":40,"./LocalDataFilePacket":41,"./OkPacket":42,"./OldPasswordPacket":43,"./ResultSetHeaderPacket":44,"./RowDataPacket":45,"./SSLRequestPacket":46,"./StatisticsPacket":47,"./UseOldPasswordPacket":48}],50:[function(require,module,exports){
var Sequence = require('./Sequence');
var Util     = require('util');
var Packets  = require('../packets');
var Auth     = require('../Auth');

module.exports = ChangeUser;
Util.inherits(ChangeUser, Sequence);
function ChangeUser(options, callback) {
  Sequence.call(this, options, callback);

  this._user          = options.user;
  this._password      = options.password;
  this._database      = options.database;
  this._charsetNumber = options.charsetNumber;
  this._currentConfig = options.currentConfig;
}

ChangeUser.prototype.start = function(handshakeInitializationPacket) {
  var scrambleBuff = handshakeInitializationPacket.scrambleBuff();
  scrambleBuff     = Auth.token(this._password, scrambleBuff);

  var packet = new Packets.ComChangeUserPacket({
    user          : this._user,
    scrambleBuff  : scrambleBuff,
    database      : this._database,
    charsetNumber : this._charsetNumber
  });

  this._currentConfig.user          = this._user;
  this._currentConfig.password      = this._password;
  this._currentConfig.database      = this._database;
  this._currentConfig.charsetNumber = this._charsetNumber;

  this.emit('packet', packet);
};

ChangeUser.prototype['ErrorPacket'] = function(packet) {
  var err = this._packetToError(packet);
  err.fatal = true;
  this.end(err);
};

},{"../Auth":15,"../packets":49,"./Sequence":55,"util":undefined}],51:[function(require,module,exports){
var Sequence        = require('./Sequence');
var Util            = require('util');
var Packets         = require('../packets');
var Auth            = require('../Auth');
var ClientConstants = require('../constants/client');

module.exports = Handshake;
Util.inherits(Handshake, Sequence);
function Handshake(options, callback) {
  Sequence.call(this, options, callback);

  options = options || {};

  this._config                        = options.config;
  this._handshakeInitializationPacket = null;
}

Handshake.prototype.determinePacket = function(firstByte) {
  if (firstByte === 0xff) {
    return Packets.ErrorPacket;
  }

  if (!this._handshakeInitializationPacket) {
    return Packets.HandshakeInitializationPacket;
  }

  if (firstByte === 0xfe) {
    return Packets.UseOldPasswordPacket;
  }

  return undefined;
};

Handshake.prototype['HandshakeInitializationPacket'] = function(packet) {
  this._handshakeInitializationPacket = packet;

  this._config.protocol41 = packet.protocol41;

  var serverSSLSupport = packet.serverCapabilities1 & ClientConstants.CLIENT_SSL;

  if (this._config.ssl) {
    if (!serverSSLSupport) {
      var err = new Error('Server does not support secure connection');

      err.code = 'HANDSHAKE_NO_SSL_SUPPORT';
      err.fatal = true;

      this.end(err);
      return;
    }

    this._config.clientFlags |= ClientConstants.CLIENT_SSL;
    this.emit('packet', new Packets.SSLRequestPacket({
      clientFlags   : this._config.clientFlags,
      maxPacketSize : this._config.maxPacketSize,
      charsetNumber : this._config.charsetNumber
    }));
    this.emit('start-tls');
  } else {
    this._sendCredentials();
  }
};

Handshake.prototype._tlsUpgradeCompleteHandler = function() {
  this._sendCredentials();
};

Handshake.prototype._sendCredentials = function() {
  var packet = this._handshakeInitializationPacket;
  this.emit('packet', new Packets.ClientAuthenticationPacket({
    clientFlags   : this._config.clientFlags,
    maxPacketSize : this._config.maxPacketSize,
    charsetNumber : this._config.charsetNumber,
    user          : this._config.user,
    database      : this._config.database,
    protocol41    : packet.protocol41,
    scrambleBuff  : (packet.protocol41)
                     ? Auth.token(this._config.password, packet.scrambleBuff())
                     : Auth.scramble323(packet.scrambleBuff(), this._config.password)
  }));
};

Handshake.prototype['UseOldPasswordPacket'] = function() {
  if (!this._config.insecureAuth) {
    var err = new Error(
      'MySQL server is requesting the old and insecure pre-4.1 auth mechanism.' +
      'Upgrade the user password or use the {insecureAuth: true} option.'
    );

    err.code = 'HANDSHAKE_INSECURE_AUTH';
    err.fatal = true;

    this.end(err);
    return;
  }

  this.emit('packet', new Packets.OldPasswordPacket({
    scrambleBuff: Auth.scramble323(this._handshakeInitializationPacket.scrambleBuff(), this._config.password)
  }));
};

Handshake.prototype['ErrorPacket'] = function(packet) {
  var err = this._packetToError(packet, true);
  err.fatal = true;
  this.end(err);
};

},{"../Auth":15,"../constants/client":24,"../packets":49,"./Sequence":55,"util":undefined}],52:[function(require,module,exports){
var Sequence = require('./Sequence');
var Util     = require('util');
var Packets  = require('../packets');

module.exports = Ping;
Util.inherits(Ping, Sequence);

function Ping(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  Sequence.call(this, options, callback);
}

Ping.prototype.start = function() {
  this.emit('packet', new Packets.ComPingPacket());
};

},{"../packets":49,"./Sequence":55,"util":undefined}],53:[function(require,module,exports){
var Sequence     = require('./Sequence');
var Util         = require('util');
var Packets      = require('../packets');
var ResultSet    = require('../ResultSet');
var ServerStatus = require('../constants/server_status');
var fs           = require('fs');
var Readable     = require('readable-stream');

module.exports = Query;
Util.inherits(Query, Sequence);
function Query(options, callback) {
  Sequence.call(this, options, callback);

  this.sql = options.sql;
  this.values = options.values;
  this.typeCast = (options.typeCast === undefined)
    ? true
    : options.typeCast;
  this.nestTables = options.nestTables || false;

  this._resultSet = null;
  this._results   = [];
  this._fields    = [];
  this._index     = 0;
  this._loadError = null;
}

Query.prototype.start = function() {
  this.emit('packet', new Packets.ComQueryPacket(this.sql));
};

Query.prototype.determinePacket = function determinePacket(byte, parser) {
  var resultSet = this._resultSet;

  if (!resultSet) {
    switch (byte) {
      case 0x00: return Packets.OkPacket;
      case 0xff: return Packets.ErrorPacket;
      default:   return Packets.ResultSetHeaderPacket;
    }
  }

  if (resultSet.eofPackets.length === 0) {
    return (resultSet.fieldPackets.length < resultSet.resultSetHeaderPacket.fieldCount)
      ? Packets.FieldPacket
      : Packets.EofPacket;
  }

  if (byte === 0xff) {
    return Packets.ErrorPacket;
  }

  if (byte === 0xfe && parser.packetLength() < 9) {
    return Packets.EofPacket;
  }

  return Packets.RowDataPacket;
};

Query.prototype['OkPacket'] = function(packet) {
  // try...finally for exception safety
  try {
    if (!this._callback) {
      this.emit('result', packet, this._index);
    } else {
      this._results.push(packet);
      this._fields.push(undefined);
    }
  } finally {
    this._index++;
    this._resultSet = null;
    this._handleFinalResultPacket(packet);
  }
};

Query.prototype['ErrorPacket'] = function(packet) {
  var err = this._packetToError(packet);

  var results = (this._results.length > 0)
    ? this._results
    : undefined;

  var fields = (this._fields.length > 0)
    ? this._fields
    : undefined;

  err.index = this._index;
  this.end(err, results, fields);
};

Query.prototype['ResultSetHeaderPacket'] = function(packet) {
  if (packet.fieldCount === null) {
    this._sendLocalDataFile(packet.extra);
  } else {
    this._resultSet = new ResultSet(packet);
  }
};

Query.prototype['FieldPacket'] = function(packet) {
  this._resultSet.fieldPackets.push(packet);
};

Query.prototype['EofPacket'] = function(packet) {
  this._resultSet.eofPackets.push(packet);

  if (this._resultSet.eofPackets.length === 1 && !this._callback) {
    this.emit('fields', this._resultSet.fieldPackets, this._index);
  }

  if (this._resultSet.eofPackets.length !== 2) {
    return;
  }

  if (this._callback) {
    this._results.push(this._resultSet.rows);
    this._fields.push(this._resultSet.fieldPackets);
  }

  this._index++;
  this._resultSet = null;
  this._handleFinalResultPacket(packet);
};

Query.prototype._handleFinalResultPacket = function(packet) {
  if (packet.serverStatus & ServerStatus.SERVER_MORE_RESULTS_EXISTS) {
    return;
  }

  var results = (this._results.length > 1)
    ? this._results
    : this._results[0];

  var fields = (this._fields.length > 1)
    ? this._fields
    : this._fields[0];

  this.end(this._loadError, results, fields);
};

Query.prototype['RowDataPacket'] = function(packet, parser, connection) {
  packet.parse(parser, this._resultSet.fieldPackets, this.typeCast, this.nestTables, connection);

  if (this._callback) {
    this._resultSet.rows.push(packet);
  } else {
    this.emit('result', packet, this._index);
  }
};

Query.prototype._sendLocalDataFile = function(path) {
  var self = this;
  var localStream = fs.createReadStream(path, {
    flag      : 'r',
    encoding  : null,
    autoClose : true
  });

  this.on('pause', function () {
    localStream.pause();
  });

  this.on('resume', function () {
    localStream.resume();
  });

  localStream.on('data', function (data) {
    self.emit('packet', new Packets.LocalDataFilePacket(data));
  });

  localStream.on('error', function (err) {
    self._loadError = err;
    localStream.emit('end');
  });

  localStream.on('end', function () {
    self.emit('packet', new Packets.EmptyPacket());
  });
};

Query.prototype.stream = function(options) {
  var self = this,
      stream;

  options = options || {};
  options.objectMode = true;
  stream = new Readable(options);

  stream._read = function() {
    self._connection && self._connection.resume();
  };

  stream.once('end', function() {
    process.nextTick(function () {
      stream.emit('close');
    });
  });

  this.on('result',function(row,i) {
    if (!stream.push(row)) self._connection.pause();
    stream.emit('result',row,i);  // replicate old emitter
  });

  this.on('error',function(err) {
    stream.emit('error',err);  // Pass on any errors
  });

  this.on('end', function() {
    stream.push(null);  // pushing null, indicating EOF
  });

  this.on('fields',function(fields,i) {
    stream.emit('fields',fields,i);  // replicate old emitter
  });

  return stream;
};

},{"../ResultSet":21,"../constants/server_status":26,"../packets":49,"./Sequence":55,"fs":undefined,"readable-stream":64,"util":undefined}],54:[function(require,module,exports){
var Sequence = require('./Sequence');
var Util     = require('util');
var Packets  = require('../packets');

module.exports = Quit;
Util.inherits(Quit, Sequence);
function Quit(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  Sequence.call(this, options, callback);
}

Quit.prototype.start = function() {
  this.emit('packet', new Packets.ComQuitPacket());
};

},{"../packets":49,"./Sequence":55,"util":undefined}],55:[function(require,module,exports){
var Util           = require('util');
var EventEmitter   = require('events').EventEmitter;
var Packets        = require('../packets');
var ErrorConstants = require('../constants/errors');

// istanbul ignore next: Node.js < 0.10 not covered
var listenerCount = EventEmitter.listenerCount
  || function(emitter, type){ return emitter.listeners(type).length; };

var LONG_STACK_DELIMITER = '\n    --------------------\n';

module.exports = Sequence;
Util.inherits(Sequence, EventEmitter);
function Sequence(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  EventEmitter.call(this);

  options = options || {};

  this._callback = callback;
  this._callSite = null;
  this._ended    = false;
  this._timeout  = options.timeout;

  // For Timers
  this._idleNext    = null;
  this._idlePrev    = null;
  this._idleStart   = null;
  this._idleTimeout = -1;
  this._repeat      = null;
}

Sequence.determinePacket = function(byte) {
  switch (byte) {
    case 0x00: return Packets.OkPacket;
    case 0xfe: return Packets.EofPacket;
    case 0xff: return Packets.ErrorPacket;
    default:   return undefined;
  }
};

Sequence.prototype.hasErrorHandler = function() {
  return Boolean(this._callback) || listenerCount(this, 'error') > 1;
};

Sequence.prototype._packetToError = function(packet) {
  var code = ErrorConstants[packet.errno] || 'UNKNOWN_CODE_PLEASE_REPORT';
  var err  = new Error(code + ': ' + packet.message);
  err.code = code;
  err.errno = packet.errno;
  err.sqlState = packet.sqlState;

  return err;
};

Sequence.prototype.end = function(err) {
  if (this._ended) {
    return;
  }

  this._ended = true;

  if (err) {
    this._addLongStackTrace(err);
  }

  // Without this we are leaking memory. This problem was introduced in
  // 8189925374e7ce3819bbe88b64c7b15abac96b16. I suspect that the error object
  // causes a cyclic reference that the GC does not detect properly, but I was
  // unable to produce a standalone version of this leak. This would be a great
  // challenge for somebody interested in difficult problems : )!
  this._callSite = null;

  // try...finally for exception safety
  try {
    if (err) {
      this.emit('error', err);
    }
  } finally {
    try {
      if (this._callback) {
        this._callback.apply(this, arguments);
      }
    } finally {
      this.emit('end');
    }
  }
};

Sequence.prototype['OkPacket'] = function(packet) {
  this.end(null, packet);
};

Sequence.prototype['ErrorPacket'] = function(packet) {
  this.end(this._packetToError(packet));
};

// Implemented by child classes
Sequence.prototype.start = function() {};

Sequence.prototype._addLongStackTrace = function _addLongStackTrace(err) {
  var callSiteStack = this._callSite && this._callSite.stack;

  if (!callSiteStack || typeof callSiteStack !== 'string') {
    // No recorded call site
    return;
  }

  if (err.stack.indexOf(LONG_STACK_DELIMITER) !== -1) {
    // Error stack already looks long
    return;
  }

  var index = callSiteStack.indexOf('\n');

  if (index !== -1) {
    // Append recorded call site
    err.stack += LONG_STACK_DELIMITER + callSiteStack.substr(index + 1);
  }
};

Sequence.prototype._onTimeout = function _onTimeout() {
  this.emit('timeout');
};

},{"../constants/errors":25,"../packets":49,"events":undefined,"util":undefined}],56:[function(require,module,exports){
var Sequence = require('./Sequence');
var Util     = require('util');
var Packets  = require('../packets');

module.exports = Statistics;
Util.inherits(Statistics, Sequence);
function Statistics(options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  Sequence.call(this, options, callback);
}

Statistics.prototype.start = function() {
  this.emit('packet', new Packets.ComStatisticsPacket());
};

Statistics.prototype['StatisticsPacket'] = function (packet) {
  this.end(null, packet);
};

Statistics.prototype.determinePacket = function determinePacket(firstByte) {
  if (firstByte === 0x55) {
    return Packets.StatisticsPacket;
  }

  return undefined;
};

},{"../packets":49,"./Sequence":55,"util":undefined}],57:[function(require,module,exports){
exports.ChangeUser = require('./ChangeUser');
exports.Handshake = require('./Handshake');
exports.Ping = require('./Ping');
exports.Query = require('./Query');
exports.Quit = require('./Quit');
exports.Sequence = require('./Sequence');
exports.Statistics = require('./Statistics');

},{"./ChangeUser":50,"./Handshake":51,"./Ping":52,"./Query":53,"./Quit":54,"./Sequence":55,"./Statistics":56}],58:[function(require,module,exports){
/*! bignumber.js v3.1.2 https://github.com/MikeMcl/bignumber.js/LICENCE */

;(function (globalObj) {
    'use strict';

    /*
      bignumber.js v3.1.2
      A JavaScript library for arbitrary-precision arithmetic.
      https://github.com/MikeMcl/bignumber.js
      Copyright (c) 2016 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */


    var BigNumber,
        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        mathceil = Math.ceil,
        mathfloor = Math.floor,
        notBool = ' not a boolean or binary digit',
        roundingMode = 'rounding mode',
        tooManyDigits = 'number type has more than 15 significant digits',
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
        BASE = 1e14,
        LOG_BASE = 14,
        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
        SQRT_BASE = 1e7,

        /*
         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
         * exception is thrown (if ERRORS is true).
         */
        MAX = 1E9;                                   // 0 to MAX_INT32


    /*
     * Create and return a BigNumber constructor.
     */
    function constructorFactory(configObj) {
        var div, parseNumeric,

            // id tracks the caller function, so its name can be included in error messages.
            id = 0,
            P = BigNumber.prototype,
            ONE = new BigNumber(1),


            /********************************* EDITABLE DEFAULTS **********************************/


            /*
             * The default values below must be integers within the inclusive ranges stated.
             * The values can also be changed at run-time using BigNumber.config.
             */

            // The maximum number of decimal places for operations involving division.
            DECIMAL_PLACES = 20,                     // 0 to MAX

            /*
             * The rounding mode used when rounding to the above decimal places, and when using
             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
             * UP         0 Away from zero.
             * DOWN       1 Towards zero.
             * CEIL       2 Towards +Infinity.
             * FLOOR      3 Towards -Infinity.
             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
             */
            ROUNDING_MODE = 4,                       // 0 to 8

            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

            // The exponent value at and beneath which toString returns exponential notation.
            // Number type: -7
            TO_EXP_NEG = -7,                         // 0 to -MAX

            // The exponent value at and above which toString returns exponential notation.
            // Number type: 21
            TO_EXP_POS = 21,                         // 0 to MAX

            // RANGE : [MIN_EXP, MAX_EXP]

            // The minimum exponent value, beneath which underflow to zero occurs.
            // Number type: -324  (5e-324)
            MIN_EXP = -1e7,                          // -1 to -MAX

            // The maximum exponent value, above which overflow to Infinity occurs.
            // Number type:  308  (1.7976931348623157e+308)
            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
            MAX_EXP = 1e7,                           // 1 to MAX

            // Whether BigNumber Errors are ever thrown.
            ERRORS = true,                           // true or false

            // Change to intValidatorNoErrors if ERRORS is false.
            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

            // Whether to use cryptographically-secure random number generation, if available.
            CRYPTO = false,                          // true or false

            /*
             * The modulo mode used when calculating the modulus: a mod n.
             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
             * The remainder (r) is calculated as: r = a - n * q.
             *
             * UP        0 The remainder is positive if the dividend is negative, else is negative.
             * DOWN      1 The remainder has the same sign as the dividend.
             *             This modulo mode is commonly known as 'truncated division' and is
             *             equivalent to (a % n) in JavaScript.
             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
             *             The remainder is always positive.
             *
             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
             * modes are commonly used for the modulus operation.
             * Although the other rounding modes can also be used, they may not give useful results.
             */
            MODULO_MODE = 1,                         // 0 to 9

            // The maximum number of significant digits of the result of the toPower operation.
            // If POW_PRECISION is 0, there will be unlimited significant digits.
            POW_PRECISION = 0,                       // 0 to MAX

            // The format specification used by the BigNumber.prototype.toFormat method.
            FORMAT = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: '\xA0',      // non-breaking space
                fractionGroupSize: 0
            };


        /******************************************************************************************/


        // CONSTRUCTOR


        /*
         * The BigNumber constructor and exported function.
         * Create and return a new instance of a BigNumber object.
         *
         * n {number|string|BigNumber} A numeric value.
         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
         */
        function BigNumber( n, b ) {
            var c, e, i, num, len, str,
                x = this;

            // Enable constructor usage without new.
            if ( !( x instanceof BigNumber ) ) {

                // 'BigNumber() constructor call without new: {n}'
                if (ERRORS) raise( 26, 'constructor call without new', n );
                return new BigNumber( n, b );
            }

            // 'new BigNumber() base not an integer: {b}'
            // 'new BigNumber() base out of range: {b}'
            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

                // Duplicate.
                if ( n instanceof BigNumber ) {
                    x.s = n.s;
                    x.e = n.e;
                    x.c = ( n = n.c ) ? n.slice() : n;
                    id = 0;
                    return;
                }

                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

                    // Fast path for integers.
                    if ( n === ~~n ) {
                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
                        x.e = e;
                        x.c = [n];
                        id = 0;
                        return;
                    }

                    str = n + '';
                } else {
                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }
            } else {
                b = b | 0;
                str = n + '';

                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
                // Allow exponential notation to be used with base 10 argument.
                if ( b == 10 ) {
                    x = new BigNumber( n instanceof BigNumber ? n : str );
                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
                }

                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                // Any number in exponential form will fail due to the [Ee][+-].
                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
                    return parseNumeric( x, str, num, b );
                }

                if (num) {
                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
                        raise( id, tooManyDigits, n );
                    }

                    // Prevent later check for length on converted number.
                    num = false;
                } else {
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }

                str = convertBase( str, 10, b, x.s );
            }

            // Decimal point?
            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

            // Exponential form?
            if ( ( i = str.search( /e/i ) ) > 0 ) {

                // Determine exponent.
                if ( e < 0 ) e = i;
                e += +str.slice( i + 1 );
                str = str.substring( 0, i );
            } else if ( e < 0 ) {

                // Integer.
                e = str.length;
            }

            // Determine leading zeros.
            for ( i = 0; str.charCodeAt(i) === 48; i++ );

            // Determine trailing zeros.
            for ( len = str.length; str.charCodeAt(--len) === 48; );
            str = str.slice( i, len + 1 );

            if (str) {
                len = str.length;

                // Disallow numbers with over 15 significant digits if number type.
                // 'new BigNumber() number type has more than 15 significant digits: {n}'
                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
                    raise( id, tooManyDigits, x.s * n );
                }

                e = e - i - 1;

                 // Overflow?
                if ( e > MAX_EXP ) {

                    // Infinity.
                    x.c = x.e = null;

                // Underflow?
                } else if ( e < MIN_EXP ) {

                    // Zero.
                    x.c = [ x.e = 0 ];
                } else {
                    x.e = e;
                    x.c = [];

                    // Transform base

                    // e is the base 10 exponent.
                    // i is where to slice str to get the first element of the coefficient array.
                    i = ( e + 1 ) % LOG_BASE;
                    if ( e < 0 ) i += LOG_BASE;

                    if ( i < len ) {
                        if (i) x.c.push( +str.slice( 0, i ) );

                        for ( len -= LOG_BASE; i < len; ) {
                            x.c.push( +str.slice( i, i += LOG_BASE ) );
                        }

                        str = str.slice(i);
                        i = LOG_BASE - str.length;
                    } else {
                        i -= len;
                    }

                    for ( ; i--; str += '0' );
                    x.c.push( +str );
                }
            } else {

                // Zero.
                x.c = [ x.e = 0 ];
            }

            id = 0;
        }


        // CONSTRUCTOR PROPERTIES


        BigNumber.another = constructorFactory;

        BigNumber.ROUND_UP = 0;
        BigNumber.ROUND_DOWN = 1;
        BigNumber.ROUND_CEIL = 2;
        BigNumber.ROUND_FLOOR = 3;
        BigNumber.ROUND_HALF_UP = 4;
        BigNumber.ROUND_HALF_DOWN = 5;
        BigNumber.ROUND_HALF_EVEN = 6;
        BigNumber.ROUND_HALF_CEIL = 7;
        BigNumber.ROUND_HALF_FLOOR = 8;
        BigNumber.EUCLID = 9;


        /*
         * Configure infrequently-changing library-wide settings.
         *
         * Accept an object or an argument list, with one or many of the following properties or
         * parameters respectively:
         *
         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
         *   ERRORS          {boolean|number}   true, false, 1 or 0
         *   CRYPTO          {boolean|number}   true, false, 1 or 0
         *   MODULO_MODE     {number}           0 to 9 inclusive
         *   POW_PRECISION   {number}           0 to MAX inclusive
         *   FORMAT          {object}           See BigNumber.prototype.toFormat
         *      decimalSeparator       {string}
         *      groupSeparator         {string}
         *      groupSize              {number}
         *      secondaryGroupSize     {number}
         *      fractionGroupSeparator {string}
         *      fractionGroupSize      {number}
         *
         * (The values assigned to the above FORMAT object properties are not checked for validity.)
         *
         * E.g.
         * BigNumber.config(20, 4) is equivalent to
         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
         *
         * Ignore properties/parameters set to null or undefined.
         * Return an object with the properties current values.
         */
        BigNumber.config = BigNumber.set = function () {
            var v, p,
                i = 0,
                r = {},
                a = arguments,
                o = a[0],
                has = o && typeof o == 'object'
                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
            // 'config() DECIMAL_PLACES not an integer: {v}'
            // 'config() DECIMAL_PLACES out of range: {v}'
            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                DECIMAL_PLACES = v | 0;
            }
            r[p] = DECIMAL_PLACES;

            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
            // 'config() ROUNDING_MODE not an integer: {v}'
            // 'config() ROUNDING_MODE out of range: {v}'
            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
                ROUNDING_MODE = v | 0;
            }
            r[p] = ROUNDING_MODE;

            // EXPONENTIAL_AT {number|number[]}
            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
            // 'config() EXPONENTIAL_AT not an integer: {v}'
            // 'config() EXPONENTIAL_AT out of range: {v}'
            if ( has( p = 'EXPONENTIAL_AT' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
                        TO_EXP_NEG = v[0] | 0;
                        TO_EXP_POS = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
                }
            }
            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
            // 'config() RANGE not an integer: {v}'
            // 'config() RANGE cannot be zero: {v}'
            // 'config() RANGE out of range: {v}'
            if ( has( p = 'RANGE' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
                        MIN_EXP = v[0] | 0;
                        MAX_EXP = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
                }
            }
            r[p] = [ MIN_EXP, MAX_EXP ];

            // ERRORS {boolean|number} true, false, 1 or 0.
            // 'config() ERRORS not a boolean or binary digit: {v}'
            if ( has( p = 'ERRORS' ) ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    id = 0;
                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = ERRORS;

            // CRYPTO {boolean|number} true, false, 1 or 0.
            // 'config() CRYPTO not a boolean or binary digit: {v}'
            // 'config() crypto unavailable: {crypto}'
            if ( has( p = 'CRYPTO' ) ) {

                if ( v === true || v === false || v === 1 || v === 0 ) {
                    if (v) {
                        v = typeof crypto == 'undefined';
                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                            CRYPTO = true;
                        } else if (ERRORS) {
                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
                        } else {
                            CRYPTO = false;
                        }
                    } else {
                        CRYPTO = false;
                    }
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = CRYPTO;

            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
            // 'config() MODULO_MODE not an integer: {v}'
            // 'config() MODULO_MODE out of range: {v}'
            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
                MODULO_MODE = v | 0;
            }
            r[p] = MODULO_MODE;

            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
            // 'config() POW_PRECISION not an integer: {v}'
            // 'config() POW_PRECISION out of range: {v}'
            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                POW_PRECISION = v | 0;
            }
            r[p] = POW_PRECISION;

            // FORMAT {object}
            // 'config() FORMAT not an object: {v}'
            if ( has( p = 'FORMAT' ) ) {

                if ( typeof v == 'object' ) {
                    FORMAT = v;
                } else if (ERRORS) {
                    raise( 2, p + ' not an object', v );
                }
            }
            r[p] = FORMAT;

            return r;
        };


        /*
         * Return true if value v is a BigNumber instance, otherwise return false.
         *
         * v {any} A value that may or may not be a BigNumber instance.
         */
        BigNumber.isBigNumber = isBigNumber;


        /*
         * Return a new BigNumber whose value is the maximum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


        /*
         * Return a new BigNumber whose value is the minimum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


        /*
         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
         * zeros are produced).
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         *
         * 'random() decimal places not an integer: {dp}'
         * 'random() decimal places out of range: {dp}'
         * 'random() crypto unavailable: {crypto}'
         */
        BigNumber.random = (function () {
            var pow2_53 = 0x20000000000000;

            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
            // Check if Math.random() produces more than 32 bits of randomness.
            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
              ? function () { return mathfloor( Math.random() * pow2_53 ); }
              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
                  (Math.random() * 0x800000 | 0); };

            return function (dp) {
                var a, b, e, k, v,
                    i = 0,
                    c = [],
                    rand = new BigNumber(ONE);

                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
                k = mathceil( dp / LOG_BASE );

                if (CRYPTO) {

                    // Browsers supporting crypto.getRandomValues.
                    if (crypto.getRandomValues) {

                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

                        for ( ; i < k; ) {

                            // 53 bits:
                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                            //                                     11111 11111111 11111111
                            // 0x20000 is 2^21.
                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                            // Rejection sampling:
                            // 0 <= v < 9007199254740992
                            // Probability that v >= 9e15, is
                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                            if ( v >= 9e15 ) {
                                b = crypto.getRandomValues( new Uint32Array(2) );
                                a[i] = b[0];
                                a[i + 1] = b[1];
                            } else {

                                // 0 <= v <= 8999999999999999
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 2;
                            }
                        }
                        i = k / 2;

                    // Node.js supporting crypto.randomBytes.
                    } else if (crypto.randomBytes) {

                        // buffer
                        a = crypto.randomBytes( k *= 7 );

                        for ( ; i < k; ) {

                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                            // 0x100000000 is 2^32, 0x1000000 is 2^24
                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                            // 0 <= v < 9007199254740992
                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

                            if ( v >= 9e15 ) {
                                crypto.randomBytes(7).copy( a, i );
                            } else {

                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 7;
                            }
                        }
                        i = k / 7;
                    } else {
                        CRYPTO = false;
                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
                    }
                }

                // Use Math.random.
                if (!CRYPTO) {

                    for ( ; i < k; ) {
                        v = random53bitInt();
                        if ( v < 9e15 ) c[i++] = v % 1e14;
                    }
                }

                k = c[--i];
                dp %= LOG_BASE;

                // Convert trailing digits to zeros according to dp.
                if ( k && dp ) {
                    v = POWS_TEN[LOG_BASE - dp];
                    c[i] = mathfloor( k / v ) * v;
                }

                // Remove trailing elements which are zero.
                for ( ; c[i] === 0; c.pop(), i-- );

                // Zero?
                if ( i < 0 ) {
                    c = [ e = 0 ];
                } else {

                    // Remove leading elements which are zero and adjust exponent accordingly.
                    for ( e = -1 ; c[0] === 0; c.shift(), e -= LOG_BASE);

                    // Count the digits of the first element of c to determine leading zeros, and...
                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

                    // adjust the exponent accordingly.
                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
                }

                rand.e = e;
                rand.c = c;
                return rand;
            };
        })();


        // PRIVATE FUNCTIONS


        // Convert a numeric string of baseIn to a numeric string of baseOut.
        function convertBase( str, baseOut, baseIn, sign ) {
            var d, e, k, r, x, xc, y,
                i = str.indexOf( '.' ),
                dp = DECIMAL_PLACES,
                rm = ROUNDING_MODE;

            if ( baseIn < 37 ) str = str.toLowerCase();

            // Non-integer.
            if ( i >= 0 ) {
                k = POW_PRECISION;

                // Unlimited precision.
                POW_PRECISION = 0;
                str = str.replace( '.', '' );
                y = new BigNumber(baseIn);
                x = y.pow( str.length - i );
                POW_PRECISION = k;

                // Convert str as if an integer, then restore the fraction part by dividing the
                // result by its base raised to a power.
                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
                y.e = y.c.length;
            }

            // Convert the number as integer.
            xc = toBaseOut( str, baseIn, baseOut );
            e = k = xc.length;

            // Remove trailing zeros.
            for ( ; xc[--k] == 0; xc.pop() );
            if ( !xc[0] ) return '0';

            if ( i < 0 ) {
                --e;
            } else {
                x.c = xc;
                x.e = e;

                // sign is needed for correct rounding.
                x.s = sign;
                x = div( x, y, dp, rm, baseOut );
                xc = x.c;
                r = x.r;
                e = x.e;
            }

            d = e + dp + 1;

            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;

            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                         rm == ( x.s < 0 ? 8 : 7 ) );

            if ( d < 1 || !xc[0] ) {

                // 1^-dp or 0.
                str = r ? toFixedPoint( '1', -dp ) : '0';
            } else {
                xc.length = d;

                if (r) {

                    // Rounding up may mean the previous digit has to be rounded up and so on.
                    for ( --baseOut; ++xc[--d] > baseOut; ) {
                        xc[d] = 0;

                        if ( !d ) {
                            ++e;
                            xc.unshift(1);
                        }
                    }
                }

                // Determine trailing zeros.
                for ( k = xc.length; !xc[--k]; );

                // E.g. [4, 11, 15] becomes 4bf.
                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
                str = toFixedPoint( str, e );
            }

            // The caller will add the sign.
            return str;
        }


        // Perform division in the specified base. Called by div and convertBase.
        div = (function () {

            // Assume non-zero x and k.
            function multiply( x, k, base ) {
                var m, temp, xlo, xhi,
                    carry = 0,
                    i = x.length,
                    klo = k % SQRT_BASE,
                    khi = k / SQRT_BASE | 0;

                for ( x = x.slice(); i--; ) {
                    xlo = x[i] % SQRT_BASE;
                    xhi = x[i] / SQRT_BASE | 0;
                    m = khi * xlo + xhi * klo;
                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
                    x[i] = temp % base;
                }

                if (carry) x.unshift(carry);

                return x;
            }

            function compare( a, b, aL, bL ) {
                var i, cmp;

                if ( aL != bL ) {
                    cmp = aL > bL ? 1 : -1;
                } else {

                    for ( i = cmp = 0; i < aL; i++ ) {

                        if ( a[i] != b[i] ) {
                            cmp = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return cmp;
            }

            function subtract( a, b, aL, base ) {
                var i = 0;

                // Subtract b from a.
                for ( ; aL--; ) {
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base + a[aL] - b[aL];
                }

                // Remove leading zeros.
                for ( ; !a[0] && a.length > 1; a.shift() );
            }

            // x: dividend, y: divisor.
            return function ( x, y, dp, rm, base ) {
                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
                    yL, yz,
                    s = x.s == y.s ? 1 : -1,
                    xc = x.c,
                    yc = y.c;

                // Either NaN, Infinity or 0?
                if ( !xc || !xc[0] || !yc || !yc[0] ) {

                    return new BigNumber(

                      // Return NaN if either NaN, or both Infinity or 0.
                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                    );
                }

                q = new BigNumber(s);
                qc = q.c = [];
                e = x.e - y.e;
                s = dp + e + 1;

                if ( !base ) {
                    base = BASE;
                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
                    s = s / LOG_BASE | 0;
                }

                // Result exponent may be one less then the current value of e.
                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
                if ( yc[i] > ( xc[i] || 0 ) ) e--;

                if ( s < 0 ) {
                    qc.push(1);
                    more = true;
                } else {
                    xL = xc.length;
                    yL = yc.length;
                    i = 0;
                    s += 2;

                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

                    n = mathfloor( base / ( yc[0] + 1 ) );

                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
                    if ( n > 1 ) {
                        yc = multiply( yc, n, base );
                        xc = multiply( xc, n, base );
                        yL = yc.length;
                        xL = xc.length;
                    }

                    xi = yL;
                    rem = xc.slice( 0, yL );
                    remL = rem.length;

                    // Add zeros to make remainder as long as divisor.
                    for ( ; remL < yL; rem[remL++] = 0 );
                    yz = yc.slice();
                    yz.unshift(0);
                    yc0 = yc[0];
                    if ( yc[1] >= base / 2 ) yc0++;
                    // Not necessary, but to prevent trial digit n > base, when using base 3.
                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

                    do {
                        n = 0;

                        // Compare divisor and remainder.
                        cmp = compare( yc, rem, yL, remL );

                        // If divisor < remainder.
                        if ( cmp < 0 ) {

                            // Calculate trial digit, n.

                            rem0 = rem[0];
                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

                            // n is how many times the divisor goes into the current remainder.
                            n = mathfloor( rem0 / yc0 );

                            //  Algorithm:
                            //  1. product = divisor * trial digit (n)
                            //  2. if product > remainder: product -= divisor, n--
                            //  3. remainder -= product
                            //  4. if product was < remainder at 2:
                            //    5. compare new remainder and divisor
                            //    6. If remainder > divisor: remainder -= divisor, n++

                            if ( n > 1 ) {

                                // n may be > base only when base is 3.
                                if (n >= base) n = base - 1;

                                // product = divisor * trial digit.
                                prod = multiply( yc, n, base );
                                prodL = prod.length;
                                remL = rem.length;

                                // Compare product and remainder.
                                // If product > remainder.
                                // Trial digit n too high.
                                // n is 1 too high about 5% of the time, and is not known to have
                                // ever been more than 1 too high.
                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
                                    n--;

                                    // Subtract divisor from product.
                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
                                    prodL = prod.length;
                                    cmp = 1;
                                }
                            } else {

                                // n is 0 or 1, cmp is -1.
                                // If n is 0, there is no need to compare yc and rem again below,
                                // so change cmp to 1 to avoid it.
                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                if ( n == 0 ) {

                                    // divisor < remainder, so n must be at least 1.
                                    cmp = n = 1;
                                }

                                // product = divisor
                                prod = yc.slice();
                                prodL = prod.length;
                            }

                            if ( prodL < remL ) prod.unshift(0);

                            // Subtract product from remainder.
                            subtract( rem, prod, remL, base );
                            remL = rem.length;

                             // If product was < remainder.
                            if ( cmp == -1 ) {

                                // Compare divisor and new remainder.
                                // If divisor < new remainder, subtract divisor from remainder.
                                // Trial digit n too low.
                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                while ( compare( yc, rem, yL, remL ) < 1 ) {
                                    n++;

                                    // Subtract divisor from remainder.
                                    subtract( rem, yL < remL ? yz : yc, remL, base );
                                    remL = rem.length;
                                }
                            }
                        } else if ( cmp === 0 ) {
                            n++;
                            rem = [0];
                        } // else cmp === 1 and n will be 0

                        // Add the next digit, n, to the result array.
                        qc[i++] = n;

                        // Update the remainder.
                        if ( rem[0] ) {
                            rem[remL++] = xc[xi] || 0;
                        } else {
                            rem = [ xc[xi] ];
                            remL = 1;
                        }
                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

                    more = rem[0] != null;

                    // Leading zero?
                    if ( !qc[0] ) qc.shift();
                }

                if ( base == BASE ) {

                    // To calculate q.e, first get the number of digits of qc[0].
                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

                // Caller is convertBase.
                } else {
                    q.e = e;
                    q.r = +more;
                }

                return q;
            };
        })();


        /*
         * Return a string representing the value of BigNumber n in fixed-point or exponential
         * notation rounded to the specified decimal places or significant digits.
         *
         * n is a BigNumber.
         * i is the index of the last digit required (i.e. the digit that may be rounded up).
         * rm is the rounding mode.
         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
         */
        function format( n, i, rm, caller ) {
            var c0, e, ne, len, str;

            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
              ? rm | 0 : ROUNDING_MODE;

            if ( !n.c ) return n.toString();
            c0 = n.c[0];
            ne = n.e;

            if ( i == null ) {
                str = coeffToString( n.c );
                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
                  ? toExponential( str, ne )
                  : toFixedPoint( str, ne );
            } else {
                n = round( new BigNumber(n), i, rm );

                // n.e may have changed if the value was rounded up.
                e = n.e;

                str = coeffToString( n.c );
                len = str.length;

                // toPrecision returns exponential notation if the number of significant digits
                // specified is less than the number of digits necessary to represent the integer
                // part of the value in fixed-point notation.

                // Exponential notation.
                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

                    // Append zeros?
                    for ( ; len < i; str += '0', len++ );
                    str = toExponential( str, e );

                // Fixed-point notation.
                } else {
                    i -= ne;
                    str = toFixedPoint( str, e );

                    // Append zeros?
                    if ( e + 1 > len ) {
                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
                    } else {
                        i += e - len;
                        if ( i > 0 ) {
                            if ( e + 1 == len ) str += '.';
                            for ( ; i--; str += '0' );
                        }
                    }
                }
            }

            return n.s < 0 && c0 ? '-' + str : str;
        }


        // Handle BigNumber.max and BigNumber.min.
        function maxOrMin( args, method ) {
            var m, n,
                i = 0;

            if ( isArray( args[0] ) ) args = args[0];
            m = new BigNumber( args[0] );

            for ( ; ++i < args.length; ) {
                n = new BigNumber( args[i] );

                // If any number is NaN, return NaN.
                if ( !n.s ) {
                    m = n;
                    break;
                } else if ( method.call( m, n ) ) {
                    m = n;
                }
            }

            return m;
        }


        /*
         * Return true if n is an integer in range, otherwise throw.
         * Use for argument validation when ERRORS is true.
         */
        function intValidatorWithErrors( n, min, max, caller, name ) {
            if ( n < min || n > max || n != truncate(n) ) {
                raise( caller, ( name || 'decimal places' ) +
                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
            }

            return true;
        }


        /*
         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
         * Called by minus, plus and times.
         */
        function normalise( n, c, e ) {
            var i = 1,
                j = c.length;

             // Remove trailing zeros.
            for ( ; !c[--j]; c.pop() );

            // Calculate the base 10 exponent. First get the number of digits of c[0].
            for ( j = c[0]; j >= 10; j /= 10, i++ );

            // Overflow?
            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

                // Infinity.
                n.c = n.e = null;

            // Underflow?
            } else if ( e < MIN_EXP ) {

                // Zero.
                n.c = [ n.e = 0 ];
            } else {
                n.e = e;
                n.c = c;
            }

            return n;
        }


        // Handle values that fail the validity test in BigNumber.
        parseNumeric = (function () {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                dotAfter = /^([^.]+)\.$/,
                dotBefore = /^\.([^.]+)$/,
                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

            return function ( x, str, num, b ) {
                var base,
                    s = num ? str : str.replace( whitespaceOrPlus, '' );

                // No exception on ±Infinity or NaN.
                if ( isInfinityOrNaN.test(s) ) {
                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                } else {
                    if ( !num ) {

                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                            return !b || b == base ? p1 : m;
                        });

                        if (b) {
                            base = b;

                            // E.g. '1.' to '1', '.1' to '0.1'
                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
                        }

                        if ( str != s ) return new BigNumber( s, base );
                    }

                    // 'new BigNumber() not a number: {n}'
                    // 'new BigNumber() not a base {b} number: {n}'
                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
                    x.s = null;
                }

                x.c = x.e = null;
                id = 0;
            }
        })();


        // Throw a BigNumber Error.
        function raise( caller, msg, val ) {
            var error = new Error( [
                'new BigNumber',     // 0
                'cmp',               // 1
                'config',            // 2
                'div',               // 3
                'divToInt',          // 4
                'eq',                // 5
                'gt',                // 6
                'gte',               // 7
                'lt',                // 8
                'lte',               // 9
                'minus',             // 10
                'mod',               // 11
                'plus',              // 12
                'precision',         // 13
                'random',            // 14
                'round',             // 15
                'shift',             // 16
                'times',             // 17
                'toDigits',          // 18
                'toExponential',     // 19
                'toFixed',           // 20
                'toFormat',          // 21
                'toFraction',        // 22
                'pow',               // 23
                'toPrecision',       // 24
                'toString',          // 25
                'BigNumber'          // 26
            ][caller] + '() ' + msg + ': ' + val );

            error.name = 'BigNumber Error';
            id = 0;
            throw error;
        }


        /*
         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
         * If r is truthy, it is known that there are more digits after the rounding digit.
         */
        function round( x, sd, rm, r ) {
            var d, i, j, k, n, ni, rd,
                xc = x.c,
                pows10 = POWS_TEN;

            // if x is not Infinity or NaN...
            if (xc) {

                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                // n is a base 1e14 number, the value of the element of array x.c containing rd.
                // ni is the index of n within x.c.
                // d is the number of digits of n.
                // i is the index of rd within n including leading zeros.
                // j is the actual index of rd within n (if < 0, rd is a leading zero).
                out: {

                    // Get the number of digits of the first element of xc.
                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
                    i = sd - d;

                    // If the rounding digit is in the first element of xc...
                    if ( i < 0 ) {
                        i += LOG_BASE;
                        j = sd;
                        n = xc[ ni = 0 ];

                        // Get the rounding digit at index j of n.
                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
                    } else {
                        ni = mathceil( ( i + 1 ) / LOG_BASE );

                        if ( ni >= xc.length ) {

                            if (r) {

                                // Needed by sqrt.
                                for ( ; xc.length <= ni; xc.push(0) );
                                n = rd = 0;
                                d = 1;
                                i %= LOG_BASE;
                                j = i - LOG_BASE + 1;
                            } else {
                                break out;
                            }
                        } else {
                            n = k = xc[ni];

                            // Get the number of digits of n.
                            for ( d = 1; k >= 10; k /= 10, d++ );

                            // Get the index of rd within n.
                            i %= LOG_BASE;

                            // Get the index of rd within n, adjusted for leading zeros.
                            // The number of leading zeros of n is given by LOG_BASE - d.
                            j = i - LOG_BASE + d;

                            // Get the rounding digit at index j of n.
                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
                        }
                    }

                    r = r || sd < 0 ||

                    // Are there any non-zero digits after the rounding digit?
                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

                    r = rm < 4
                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

                        // Check whether the digit to the left of the rounding digit is odd.
                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
                          rm == ( x.s < 0 ? 8 : 7 ) );

                    if ( sd < 1 || !xc[0] ) {
                        xc.length = 0;

                        if (r) {

                            // Convert sd to decimal places.
                            sd -= x.e + 1;

                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
                            x.e = -sd || 0;
                        } else {

                            // Zero.
                            xc[0] = x.e = 0;
                        }

                        return x;
                    }

                    // Remove excess digits.
                    if ( i == 0 ) {
                        xc.length = ni;
                        k = 1;
                        ni--;
                    } else {
                        xc.length = ni + 1;
                        k = pows10[ LOG_BASE - i ];

                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                        // j > 0 means i > number of leading zeros of n.
                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
                    }

                    // Round up?
                    if (r) {

                        for ( ; ; ) {

                            // If the digit to be rounded up is in the first element of xc...
                            if ( ni == 0 ) {

                                // i will be the length of xc[0] before k is added.
                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
                                j = xc[0] += k;
                                for ( k = 1; j >= 10; j /= 10, k++ );

                                // if i != k the length has increased.
                                if ( i != k ) {
                                    x.e++;
                                    if ( xc[0] == BASE ) xc[0] = 1;
                                }

                                break;
                            } else {
                                xc[ni] += k;
                                if ( xc[ni] != BASE ) break;
                                xc[ni--] = 0;
                                k = 1;
                            }
                        }
                    }

                    // Remove trailing zeros.
                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
                }

                // Overflow? Infinity.
                if ( x.e > MAX_EXP ) {
                    x.c = x.e = null;

                // Underflow? Zero.
                } else if ( x.e < MIN_EXP ) {
                    x.c = [ x.e = 0 ];
                }
            }

            return x;
        }


        // PROTOTYPE/INSTANCE METHODS


        /*
         * Return a new BigNumber whose value is the absolute value of this BigNumber.
         */
        P.absoluteValue = P.abs = function () {
            var x = new BigNumber(this);
            if ( x.s < 0 ) x.s = 1;
            return x;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of Infinity.
         */
        P.ceil = function () {
            return round( new BigNumber(this), this.e + 1, 2 );
        };


        /*
         * Return
         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
         * 0 if they have the same value,
         * or null if the value of either is NaN.
         */
        P.comparedTo = P.cmp = function ( y, b ) {
            id = 1;
            return compare( this, new BigNumber( y, b ) );
        };


        /*
         * Return the number of decimal places of the value of this BigNumber, or null if the value
         * of this BigNumber is ±Infinity or NaN.
         */
        P.decimalPlaces = P.dp = function () {
            var n, v,
                c = this.c;

            if ( !c ) return null;
            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

            // Subtract the number of trailing zeros of the last number.
            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
            if ( n < 0 ) n = 0;

            return n;
        };


        /*
         *  n / 0 = I
         *  n / N = N
         *  n / I = 0
         *  0 / n = 0
         *  0 / 0 = N
         *  0 / N = N
         *  0 / I = 0
         *  N / n = N
         *  N / 0 = N
         *  N / N = N
         *  N / I = N
         *  I / n = I
         *  I / 0 = I
         *  I / N = N
         *  I / I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.dividedBy = P.div = function ( y, b ) {
            id = 3;
            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
        };


        /*
         * Return a new BigNumber whose value is the integer part of dividing the value of this
         * BigNumber by the value of BigNumber(y, b).
         */
        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
            id = 4;
            return div( this, new BigNumber( y, b ), 0, 1 );
        };


        /*
         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.equals = P.eq = function ( y, b ) {
            id = 5;
            return compare( this, new BigNumber( y, b ) ) === 0;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of -Infinity.
         */
        P.floor = function () {
            return round( new BigNumber(this), this.e + 1, 3 );
        };


        /*
         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.greaterThan = P.gt = function ( y, b ) {
            id = 6;
            return compare( this, new BigNumber( y, b ) ) > 0;
        };


        /*
         * Return true if the value of this BigNumber is greater than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
            id = 7;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

        };


        /*
         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
         */
        P.isFinite = function () {
            return !!this.c;
        };


        /*
         * Return true if the value of this BigNumber is an integer, otherwise return false.
         */
        P.isInteger = P.isInt = function () {
            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
        };


        /*
         * Return true if the value of this BigNumber is NaN, otherwise returns false.
         */
        P.isNaN = function () {
            return !this.s;
        };


        /*
         * Return true if the value of this BigNumber is negative, otherwise returns false.
         */
        P.isNegative = P.isNeg = function () {
            return this.s < 0;
        };


        /*
         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
         */
        P.isZero = function () {
            return !!this.c && this.c[0] == 0;
        };


        /*
         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.lessThan = P.lt = function ( y, b ) {
            id = 8;
            return compare( this, new BigNumber( y, b ) ) < 0;
        };


        /*
         * Return true if the value of this BigNumber is less than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
            id = 9;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
        };


        /*
         *  n - 0 = n
         *  n - N = N
         *  n - I = -I
         *  0 - n = -n
         *  0 - 0 = 0
         *  0 - N = N
         *  0 - I = -I
         *  N - n = N
         *  N - 0 = N
         *  N - N = N
         *  N - I = N
         *  I - n = I
         *  I - 0 = I
         *  I - N = N
         *  I - I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
         * BigNumber(y, b).
         */
        P.minus = P.sub = function ( y, b ) {
            var i, j, t, xLTy,
                x = this,
                a = x.s;

            id = 10;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
            if ( a != b ) {
                y.s = -b;
                return x.plus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Either Infinity?
                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

                // Either zero?
                if ( !xc[0] || !yc[0] ) {

                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                      ROUNDING_MODE == 3 ? -0 : 0 );
                }
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Determine which is the bigger number.
            if ( a = xe - ye ) {

                if ( xLTy = a < 0 ) {
                    a = -a;
                    t = xc;
                } else {
                    ye = xe;
                    t = yc;
                }

                t.reverse();

                // Prepend zeros to equalise exponents.
                for ( b = a; b--; t.push(0) );
                t.reverse();
            } else {

                // Exponents equal. Check digit by digit.
                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

                for ( a = b = 0; b < j; b++ ) {

                    if ( xc[b] != yc[b] ) {
                        xLTy = xc[b] < yc[b];
                        break;
                    }
                }
            }

            // x < y? Point xc to the array of the bigger number.
            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

            b = ( j = yc.length ) - ( i = xc.length );

            // Append zeros to xc if shorter.
            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
            b = BASE - 1;

            // Subtract yc from xc.
            for ( ; j > a; ) {

                if ( xc[--j] < yc[j] ) {
                    for ( i = j; i && !xc[--i]; xc[i] = b );
                    --xc[i];
                    xc[j] += BASE;
                }

                xc[j] -= yc[j];
            }

            // Remove leading zeros and adjust exponent accordingly.
            for ( ; xc[0] == 0; xc.shift(), --ye );

            // Zero?
            if ( !xc[0] ) {

                // Following IEEE 754 (2008) 6.3,
                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                y.s = ROUNDING_MODE == 3 ? -1 : 1;
                y.c = [ y.e = 0 ];
                return y;
            }

            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
            // for finite x and y.
            return normalise( y, xc, ye );
        };


        /*
         *   n % 0 =  N
         *   n % N =  N
         *   n % I =  n
         *   0 % n =  0
         *  -0 % n = -0
         *   0 % 0 =  N
         *   0 % N =  N
         *   0 % I =  0
         *   N % n =  N
         *   N % 0 =  N
         *   N % N =  N
         *   N % I =  N
         *   I % n =  N
         *   I % 0 =  N
         *   I % N =  N
         *   I % I =  N
         *
         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
         */
        P.modulo = P.mod = function ( y, b ) {
            var q, s,
                x = this;

            id = 11;
            y = new BigNumber( y, b );

            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
            if ( !x.c || !y.s || y.c && !y.c[0] ) {
                return new BigNumber(NaN);

            // Return x if y is Infinity or x is zero.
            } else if ( !y.c || x.c && !x.c[0] ) {
                return new BigNumber(x);
            }

            if ( MODULO_MODE == 9 ) {

                // Euclidian division: q = sign(y) * floor(x / abs(y))
                // r = x - qy    where  0 <= r < abs(y)
                s = y.s;
                y.s = 1;
                q = div( x, y, 0, 3 );
                y.s = s;
                q.s *= s;
            } else {
                q = div( x, y, 0, MODULO_MODE );
            }

            return x.minus( q.times(y) );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber negated,
         * i.e. multiplied by -1.
         */
        P.negated = P.neg = function () {
            var x = new BigNumber(this);
            x.s = -x.s || null;
            return x;
        };


        /*
         *  n + 0 = n
         *  n + N = N
         *  n + I = I
         *  0 + n = n
         *  0 + 0 = 0
         *  0 + N = N
         *  0 + I = I
         *  N + n = N
         *  N + 0 = N
         *  N + N = N
         *  N + I = N
         *  I + n = I
         *  I + 0 = I
         *  I + N = N
         *  I + I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
         * BigNumber(y, b).
         */
        P.plus = P.add = function ( y, b ) {
            var t,
                x = this,
                a = x.s;

            id = 12;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
             if ( a != b ) {
                y.s = -b;
                return x.minus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Return ±Infinity if either ±Infinity.
                if ( !xc || !yc ) return new BigNumber( a / 0 );

                // Either zero?
                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
            if ( a = xe - ye ) {
                if ( a > 0 ) {
                    ye = xe;
                    t = yc;
                } else {
                    a = -a;
                    t = xc;
                }

                t.reverse();
                for ( ; a--; t.push(0) );
                t.reverse();
            }

            a = xc.length;
            b = yc.length;

            // Point xc to the longer array, and b to the shorter length.
            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
            for ( a = 0; b; ) {
                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }

            if (a) {
                xc.unshift(a);
                ++ye;
            }

            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
            // ye = MAX_EXP + 1 possible
            return normalise( y, xc, ye );
        };


        /*
         * Return the number of significant digits of the value of this BigNumber.
         *
         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
         */
        P.precision = P.sd = function (z) {
            var n, v,
                x = this,
                c = x.c;

            // 'precision() argument not a boolean or binary digit: {z}'
            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
                if (ERRORS) raise( 13, 'argument' + notBool, z );
                if ( z != !!z ) z = null;
            }

            if ( !c ) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;

            if ( v = c[v] ) {

                // Subtract the number of trailing zeros of the last element.
                for ( ; v % 10 == 0; v /= 10, n-- );

                // Add the number of digits of the first element.
                for ( v = c[0]; v >= 10; v /= 10, n++ );
            }

            if ( z && x.e + 1 > n ) n = x.e + 1;

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
         * omitted.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'round() decimal places out of range: {dp}'
         * 'round() decimal places not an integer: {dp}'
         * 'round() rounding mode not an integer: {rm}'
         * 'round() rounding mode out of range: {rm}'
         */
        P.round = function ( dp, rm ) {
            var n = new BigNumber(this);

            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
                round( n, ~~dp + this.e + 1, rm == null ||
                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
            }

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
         *
         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         *
         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
         * otherwise.
         *
         * 'shift() argument not an integer: {k}'
         * 'shift() argument out of range: {k}'
         */
        P.shift = function (k) {
            var n = this;
            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

              // k < 1e+21, or truncate(k) will produce exponential notation.
              ? n.times( '1e' + truncate(k) )
              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
                ? n.s * ( k < 0 ? 0 : 1 / 0 )
                : n );
        };


        /*
         *  sqrt(-n) =  N
         *  sqrt( N) =  N
         *  sqrt(-I) =  N
         *  sqrt( I) =  I
         *  sqrt( 0) =  0
         *  sqrt(-0) = -0
         *
         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.squareRoot = P.sqrt = function () {
            var m, n, r, rep, t,
                x = this,
                c = x.c,
                s = x.s,
                e = x.e,
                dp = DECIMAL_PLACES + 4,
                half = new BigNumber('0.5');

            // Negative/NaN/Infinity/zero?
            if ( s !== 1 || !c || !c[0] ) {
                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
            }

            // Initial estimate.
            s = Math.sqrt( +x );

            // Math.sqrt underflow/overflow?
            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
            if ( s == 0 || s == 1 / 0 ) {
                n = coeffToString(c);
                if ( ( n.length + e ) % 2 == 0 ) n += '0';
                s = Math.sqrt(n);
                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

                if ( s == 1 / 0 ) {
                    n = '1e' + e;
                } else {
                    n = s.toExponential();
                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
                }

                r = new BigNumber(n);
            } else {
                r = new BigNumber( s + '' );
            }

            // Check for zero.
            // r could be zero if MIN_EXP is changed after the this value was created.
            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
            // coeffToString to throw.
            if ( r.c[0] ) {
                e = r.e;
                s = e + dp;
                if ( s < 3 ) s = 0;

                // Newton-Raphson iteration.
                for ( ; ; ) {
                    t = r;
                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
                         coeffToString( r.c ) ).slice( 0, s ) ) {

                        // The exponent of r may here be one less than the final result exponent,
                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                        // are indexed correctly.
                        if ( r.e < e ) --s;
                        n = n.slice( s - 3, s + 1 );

                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                        // iteration.
                        if ( n == '9999' || !rep && n == '4999' ) {

                            // On the first iteration only, check to see if rounding up gives the
                            // exact result as the nines may infinitely repeat.
                            if ( !rep ) {
                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

                                if ( t.times(t).eq(x) ) {
                                    r = t;
                                    break;
                                }
                            }

                            dp += 4;
                            s += 4;
                            rep = 1;
                        } else {

                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                            // result. If not, then there are further digits and m will be truthy.
                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

                                // Truncate to the first rounding digit.
                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
                                m = !r.times(r).eq(x);
                            }

                            break;
                        }
                    }
                }
            }

            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
        };


        /*
         *  n * 0 = 0
         *  n * N = N
         *  n * I = I
         *  0 * n = 0
         *  0 * 0 = 0
         *  0 * N = N
         *  0 * I = N
         *  N * n = N
         *  N * 0 = N
         *  N * N = N
         *  N * I = N
         *  I * n = I
         *  I * 0 = N
         *  I * N = N
         *  I * I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber times the value of
         * BigNumber(y, b).
         */
        P.times = P.mul = function ( y, b ) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
                base, sqrtBase,
                x = this,
                xc = x.c,
                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

            // Either NaN, ±Infinity or ±0?
            if ( !xc || !yc || !xc[0] || !yc[0] ) {

                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
                    y.c = y.e = y.s = null;
                } else {
                    y.s *= x.s;

                    // Return ±Infinity if either is ±Infinity.
                    if ( !xc || !yc ) {
                        y.c = y.e = null;

                    // Return ±0 if either is ±0.
                    } else {
                        y.c = [0];
                        y.e = 0;
                    }
                }

                return y;
            }

            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;

            // Ensure xc points to longer array and xcL to its length.
            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

            // Initialise the result array with zeros.
            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

            base = BASE;
            sqrtBase = SQRT_BASE;

            for ( i = ycL; --i >= 0; ) {
                c = 0;
                ylo = yc[i] % sqrtBase;
                yhi = yc[i] / sqrtBase | 0;

                for ( k = xcL, j = i + k; j > i; ) {
                    xlo = xc[--k] % sqrtBase;
                    xhi = xc[k] / sqrtBase | 0;
                    m = yhi * xlo + xhi * ylo;
                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
                    zc[j--] = xlo % base;
                }

                zc[j] = c;
            }

            if (c) {
                ++e;
            } else {
                zc.shift();
            }

            return normalise( y, zc, e );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toDigits() precision out of range: {sd}'
         * 'toDigits() precision not an integer: {sd}'
         * 'toDigits() rounding mode not an integer: {rm}'
         * 'toDigits() rounding mode out of range: {rm}'
         */
        P.toDigits = function ( sd, rm ) {
            var n = new BigNumber(this);
            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
            return sd ? round( n, sd, rm ) : n;
        };


        /*
         * Return a string representing the value of this BigNumber in exponential notation and
         * rounded using ROUNDING_MODE to dp fixed decimal places.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toExponential() decimal places not an integer: {dp}'
         * 'toExponential() decimal places out of range: {dp}'
         * 'toExponential() rounding mode not an integer: {rm}'
         * 'toExponential() rounding mode out of range: {rm}'
         */
        P.toExponential = function ( dp, rm ) {
            return format( this,
              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounding
         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
         * but e.g. (-0.00001).toFixed(0) is '-0'.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFixed() decimal places not an integer: {dp}'
         * 'toFixed() decimal places out of range: {dp}'
         * 'toFixed() rounding mode not an integer: {rm}'
         * 'toFixed() rounding mode out of range: {rm}'
         */
        P.toFixed = function ( dp, rm ) {
            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
              ? ~~dp + this.e + 1 : null, rm, 20 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounded
         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
         * of the FORMAT object (see BigNumber.config).
         *
         * FORMAT = {
         *      decimalSeparator : '.',
         *      groupSeparator : ',',
         *      groupSize : 3,
         *      secondaryGroupSize : 0,
         *      fractionGroupSeparator : '\xA0',    // non-breaking space
         *      fractionGroupSize : 0
         * };
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFormat() decimal places not an integer: {dp}'
         * 'toFormat() decimal places out of range: {dp}'
         * 'toFormat() rounding mode not an integer: {rm}'
         * 'toFormat() rounding mode out of range: {rm}'
         */
        P.toFormat = function ( dp, rm ) {
            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
              ? ~~dp + this.e + 1 : null, rm, 21 );

            if ( this.c ) {
                var i,
                    arr = str.split('.'),
                    g1 = +FORMAT.groupSize,
                    g2 = +FORMAT.secondaryGroupSize,
                    groupSeparator = FORMAT.groupSeparator,
                    intPart = arr[0],
                    fractionPart = arr[1],
                    isNeg = this.s < 0,
                    intDigits = isNeg ? intPart.slice(1) : intPart,
                    len = intDigits.length;

                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

                if ( g1 > 0 && len > 0 ) {
                    i = len % g1 || g1;
                    intPart = intDigits.substr( 0, i );

                    for ( ; i < len; i += g1 ) {
                        intPart += groupSeparator + intDigits.substr( i, g1 );
                    }

                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
                    if (isNeg) intPart = '-' + intPart;
                }

                str = fractionPart
                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
                      '$&' + FORMAT.fractionGroupSeparator )
                    : fractionPart )
                  : intPart;
            }

            return str;
        };


        /*
         * Return a string array representing the value of this BigNumber as a simple fraction with
         * an integer numerator and an integer denominator. The denominator will be a positive
         * non-zero value less than or equal to the specified maximum denominator. If a maximum
         * denominator is not specified, the denominator will be the lowest value necessary to
         * represent the number exactly.
         *
         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
         *
         * 'toFraction() max denominator not an integer: {md}'
         * 'toFraction() max denominator out of range: {md}'
         */
        P.toFraction = function (md) {
            var arr, d0, d2, e, exp, n, n0, q, s,
                k = ERRORS,
                x = this,
                xc = x.c,
                d = new BigNumber(ONE),
                n1 = d0 = new BigNumber(ONE),
                d1 = n0 = new BigNumber(ONE);

            if ( md != null ) {
                ERRORS = false;
                n = new BigNumber(md);
                ERRORS = k;

                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

                    if (ERRORS) {
                        raise( 22,
                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
                    }

                    // ERRORS is false:
                    // If md is a finite non-integer >= 1, round it to an integer and use it.
                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
                }
            }

            if ( !xc ) return x.toString();
            s = coeffToString(xc);

            // Determine initial denominator.
            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber(s);

            // n0 = d1 = 0
            n0.c[0] = 0;

            for ( ; ; )  {
                q = div( n, d, 0, 1 );
                d2 = d0.plus( q.times(d1) );
                if ( d2.cmp(md) == 1 ) break;
                d0 = d1;
                d1 = d2;
                n1 = n0.plus( q.times( d2 = n1 ) );
                n0 = d2;
                d = n.minus( q.times( d2 = d ) );
                n = d2;
            }

            d2 = div( md.minus(d0), d1, 0, 1 );
            n0 = n0.plus( d2.times(n1) );
            d0 = d0.plus( d2.times(d1) );
            n0.s = n1.s = x.s;
            e *= 2;

            // Determine which fraction is closer to x, n0/d0 or n1/d1
            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
                    ? [ n1.toString(), d1.toString() ]
                    : [ n0.toString(), d0.toString() ];

            MAX_EXP = exp;
            return arr;
        };


        /*
         * Return the value of this BigNumber converted to a number primitive.
         */
        P.toNumber = function () {
            return +this;
        };


        /*
         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
         * If m is present, return the result modulo m.
         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
         * ROUNDING_MODE.
         *
         * The modular power operation works efficiently when x, n, and m are positive integers,
         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
         *
         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         * [m] {number|string|BigNumber} The modulus.
         *
         * 'pow() exponent not an integer: {n}'
         * 'pow() exponent out of range: {n}'
         *
         * Performs 54 loop iterations for n of 9007199254740991.
         */
        P.toPower = P.pow = function ( n, m ) {
            var k, y, z,
                i = mathfloor( n < 0 ? -n : +n ),
                x = this;

            if ( m != null ) {
                id = 23;
                m = new BigNumber(m);
            }

            // Pass ±Infinity to Math.pow if exponent is out of range.
            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
                k = Math.pow( +x, n );
                return new BigNumber( m ? k % m : k );
            }

            if (m) {
                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
                    x = x.mod(m);
                } else {
                    z = m;

                    // Nullify m so only a single mod operation is performed at the end.
                    m = null;
                }
            } else if (POW_PRECISION) {

                // Truncating each coefficient array to a length of k after each multiplication
                // equates to truncating significant digits to POW_PRECISION + [28, 41],
                // i.e. there will be a minimum of 28 guard digits retained.
                // (Using + 1.5 would give [9, 21] guard digits.)
                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
            }

            y = new BigNumber(ONE);

            for ( ; ; ) {
                if ( i % 2 ) {
                    y = y.times(x);
                    if ( !y.c ) break;
                    if (k) {
                        if ( y.c.length > k ) y.c.length = k;
                    } else if (m) {
                        y = y.mod(m);
                    }
                }

                i = mathfloor( i / 2 );
                if ( !i ) break;
                x = x.times(x);
                if (k) {
                    if ( x.c && x.c.length > k ) x.c.length = k;
                } else if (m) {
                    x = x.mod(m);
                }
            }

            if (m) return y;
            if ( n < 0 ) y = ONE.div(y);

            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
        };


        /*
         * Return a string representing the value of this BigNumber rounded to sd significant digits
         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
         * necessary to represent the integer part of the value in fixed-point notation, then use
         * exponential notation.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toPrecision() precision not an integer: {sd}'
         * 'toPrecision() precision out of range: {sd}'
         * 'toPrecision() rounding mode not an integer: {rm}'
         * 'toPrecision() rounding mode out of range: {rm}'
         */
        P.toPrecision = function ( sd, rm ) {
            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
              ? sd | 0 : null, rm, 24 );
        };


        /*
         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
         * TO_EXP_NEG, return exponential notation.
         *
         * [b] {number} Integer, 2 to 64 inclusive.
         *
         * 'toString() base not an integer: {b}'
         * 'toString() base out of range: {b}'
         */
        P.toString = function (b) {
            var str,
                n = this,
                s = n.s,
                e = n.e;

            // Infinity or NaN?
            if ( e === null ) {

                if (s) {
                    str = 'Infinity';
                    if ( s < 0 ) str = '-' + str;
                } else {
                    str = 'NaN';
                }
            } else {
                str = coeffToString( n.c );

                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                      ? toExponential( str, e )
                      : toFixedPoint( str, e );
                } else {
                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
                }

                if ( s < 0 && n.c[0] ) str = '-' + str;
            }

            return str;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
         * number.
         */
        P.truncated = P.trunc = function () {
            return round( new BigNumber(this), this.e + 1, 1 );
        };


        /*
         * Return as toString, but do not accept a base argument, and include the minus sign for
         * negative zero.
         */
        P.valueOf = P.toJSON = function () {
            var str,
                n = this,
                e = n.e;

            if ( e === null ) return n.toString();

            str = coeffToString( n.c );

            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                ? toExponential( str, e )
                : toFixedPoint( str, e );

            return n.s < 0 ? '-' + str : str;
        };


        if ( configObj != null ) BigNumber.config(configObj);

        return BigNumber;
    }


    // PRIVATE HELPER FUNCTIONS


    function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }


    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
        var s, z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for ( ; i < j; ) {
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for ( ; z--; s = '0' + s );
            r += s;
        }

        // Determine trailing zeros.
        for ( j = r.length; r.charCodeAt(--j) === 48; );
        return r.slice( 0, j + 1 || 1 );
    }


    // Compare the value of BigNumbers x and y.
    function compare( x, y ) {
        var a, b,
            xc = x.c,
            yc = y.c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either NaN?
        if ( !i || !j ) return null;

        a = xc && !xc[0];
        b = yc && !yc[0];

        // Either zero?
        if ( a || b ) return a ? b ? 0 : -j : i;

        // Signs differ?
        if ( i != j ) return i;

        a = i < 0;
        b = k == l;

        // Either Infinity?
        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

        // Compare exponents.
        if ( !b ) return k > l ^ a ? 1 : -1;

        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

        // Compare digit by digit.
        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    }


    /*
     * Return true if n is a valid number in range, otherwise false.
     * Use for argument validation when ERRORS is false.
     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
     */
    function intValidatorNoErrors( n, min, max ) {
        return ( n = truncate(n) ) >= min && n <= max;
    }


    function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }


    function isBigNumber(v) {
      return !!( v && v.constructor && v.constructor.isBigNumber === isBigNumber );
    }


    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. convertBase('255', 10, 16) returns [15, 15].
     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut( str, baseIn, baseOut ) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for ( ; i < len; ) {
            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

            for ( ; j < arr.length; j++ ) {

                if ( arr[j] > baseOut - 1 ) {
                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }


    function toExponential( str, e ) {
        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
          ( e < 0 ? 'e' : 'e+' ) + e;
    }


    function toFixedPoint( str, e ) {
        var len, z;

        // Negative exponent?
        if ( e < 0 ) {

            // Prepend zeros.
            for ( z = '0.'; ++e; z += '0' );
            str = z + str;

        // Positive exponent
        } else {
            len = str.length;

            // Append zeros.
            if ( ++e > len ) {
                for ( z = '0', e -= len; --e; z += '0' );
                str += z;
            } else if ( e < len ) {
                str = str.slice( 0, e ) + '.' + str.slice(e);
            }
        }

        return str;
    }


    function truncate(n) {
        n = parseFloat(n);
        return n < 0 ? mathceil(n) : mathfloor(n);
    }


    // EXPORT


    BigNumber = constructorFactory();
    BigNumber.default = BigNumber.BigNumber = BigNumber;


    // AMD.
    if ( typeof define == 'function' && define.amd ) {
        define( function () { return BigNumber; } );

    // Node.js and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = BigNumber;

    // Browser.
    } else {
        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
        globalObj.BigNumber = BigNumber;
    }
})(this);

},{}],59:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
/*</replacement>*/


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

forEach(objectKeys(Writable.prototype), function(method) {
  if (!Duplex.prototype[method])
    Duplex.prototype[method] = Writable.prototype[method];
});

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(this.end.bind(this));
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

},{"./_stream_readable":61,"./_stream_writable":63,"core-util-is":1,"inherits":2}],60:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":62,"core-util-is":1,"inherits":2}],61:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = require('events').EventEmitter;

/*<replacement>*/
if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

var Stream = require('stream');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var StringDecoder;


/*<replacement>*/
var debug = require('util');
if (debug && debug.debuglog) {
  debug = debug.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/


util.inherits(Readable, Stream);

function ReadableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  var Duplex = require('./_stream_duplex');

  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (util.isString(chunk) && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (util.isNullOrUndefined(chunk)) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      if (!addToFront)
        state.reading = false;

      // if we want the data now, just emit it.
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);

        if (state.needReadable)
          emitReadable(stream);
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (isNaN(n) || util.isNull(n)) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  debug('read', n);
  var state = this._readableState;
  var nOrig = n;

  if (!util.isNumber(n) || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  }

  if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read pushed data synchronously, then `reading` will be false,
  // and we need to re-evaluate how much data we can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (util.isNull(ret)) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we tried to read() past the EOF, then emit end on the next tick.
  if (nOrig !== n && state.ended && state.length === 0)
    endReadable(this);

  if (!util.isNull(ret))
    this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync)
      process.nextTick(function() {
        emitReadable_(stream);
      });
    else
      emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    process.nextTick(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }

  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    if (false === ret) {
      debug('false write response, pause',
            src._readableState.awaitDrain);
      src._readableState.awaitDrain++;
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];



  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  // If listening to data, and it has not explicitly been paused,
  // then call resume to start the flow of data on the next tick.
  if (ev === 'data' && false !== this._readableState.flowing) {
    this.resume();
  }

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        var self = this;
        process.nextTick(function() {
          debug('readable nexttick read 0');
          self.read(0);
        });
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    if (!state.reading) {
      debug('resume read 0');
      this.read(0);
    }
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(function() {
      resume_(stream, state);
    });
  }
}

function resume_(stream, state) {
  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}

Readable.prototype.pause = function() {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  if (state.flowing) {
    do {
      var chunk = stream.read();
    } while (null !== chunk && state.flowing);
  }
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    debug('wrapped data');
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

},{"./_stream_duplex":59,"buffer":undefined,"core-util-is":1,"events":undefined,"inherits":2,"isarray":4,"stream":undefined,"string_decoder/":67,"util":undefined}],62:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (!util.isNullOrUndefined(data))
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('prefinish', function() {
    if (util.isFunction(this._flush))
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":59,"core-util-is":1,"inherits":2}],63:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;

/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Writable.WritableState = WritableState;


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Stream = require('stream');

util.inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;
}

function Writable(options) {
  var Duplex = require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  process.nextTick(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    process.nextTick(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (util.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (!util.isFunction(cb))
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function() {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function() {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.buffer.length)
      clearBuffer(this, state);
  }
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      util.isString(chunk)) {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (util.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret)
    state.needDrain = true;

  if (state.writing || state.corked)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, false, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    process.nextTick(function() {
      state.pendingcb--;
      cb(er);
    });
  else {
    state.pendingcb--;
    cb(er);
  }

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.buffer.length) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  if (stream._writev && state.buffer.length > 1) {
    // Fast case, write everything using _writev()
    var cbs = [];
    for (var c = 0; c < state.buffer.length; c++)
      cbs.push(state.buffer[c].callback);

    // count the one we are adding, as well.
    // TODO(isaacs) clean this up
    state.pendingcb++;
    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
      for (var i = 0; i < cbs.length; i++) {
        state.pendingcb--;
        cbs[i](err);
      }
    });

    // Clear buffer
    state.buffer = [];
  } else {
    // Slow case, write chunks one-by-one
    for (var c = 0; c < state.buffer.length; c++) {
      var entry = state.buffer[c];
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);

      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        c++;
        break;
      }
    }

    if (c < state.buffer.length)
      state.buffer = state.buffer.slice(c);
    else
      state.buffer.length = 0;
  }

  state.bufferProcessing = false;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));

};

Writable.prototype._writev = null;

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (util.isFunction(chunk)) {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (!util.isNullOrUndefined(chunk))
    this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else
      prefinish(stream, state);
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      process.nextTick(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

},{"./_stream_duplex":59,"buffer":undefined,"core-util-is":1,"inherits":2,"stream":undefined}],64:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = require('stream');
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');
if (!process.browser && process.env.READABLE_STREAM === 'disable') {
  module.exports = require('stream');
}

},{"./lib/_stream_duplex.js":59,"./lib/_stream_passthrough.js":60,"./lib/_stream_readable.js":61,"./lib/_stream_transform.js":62,"./lib/_stream_writable.js":63,"stream":undefined}],65:[function(require,module,exports){
module.exports = require('./lib/SqlString');

},{"./lib/SqlString":66}],66:[function(require,module,exports){
(function (Buffer){
var SqlString  = exports;
var charsRegex = /[\0\b\t\n\r\x1a\"\'\\]/g; // eslint-disable-line no-control-regex
var charsMap   = {
  '\0': '\\0',
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\r': '\\r',
  '\x1a': '\\Z',
  '"': '\\"',
  '\'': '\\\'',
  '\\': '\\\\'
};

SqlString.escapeId = function escapeId(val, forbidQualified) {
  if (Array.isArray(val)) {
    var sql = '';

    for (var i = 0; i < val.length; i++) {
      sql += (i === 0 ? '' : ', ') + SqlString.escapeId(val[i], forbidQualified);
    }

    return sql;
  }

  if (forbidQualified) {
    return '`' + String(val).replace(/`/g, '``') + '`';
  }

  return '`' + String(val).replace(/`/g, '``').replace(/\./g, '`.`') + '`';
};

SqlString.escape = function escape(val, stringifyObjects, timeZone) {
  if (val === undefined || val === null) {
    return 'NULL';
  }

  switch (typeof val) {
    case 'boolean': return (val) ? 'true' : 'false';
    case 'number': return val+'';
    case 'object':
      if (val instanceof Date) {
        return SqlString.dateToString(val, timeZone || 'local');
      } else if (Array.isArray(val)) {
        return SqlString.arrayToList(val, timeZone);
      } else if (Buffer.isBuffer(val)) {
        return SqlString.bufferToString(val);
      } else if (stringifyObjects) {
        return escapeString(val.toString());
      } else {
        return SqlString.objectToValues(val, timeZone);
      }
    default: return escapeString(val);
  }
};

SqlString.arrayToList = function arrayToList(array, timeZone) {
  var sql = '';

  for (var i = 0; i < array.length; i++) {
    var val = array[i];

    if (Array.isArray(val)) {
      sql += (i === 0 ? '' : ', ') + '(' + SqlString.arrayToList(val, timeZone) + ')';
    } else {
      sql += (i === 0 ? '' : ', ') + SqlString.escape(val, true, timeZone);
    }
  }

  return sql;
};

SqlString.format = function format(sql, values, stringifyObjects, timeZone) {
  if (values == null) {
    return sql;
  }

  if (!(values instanceof Array || Array.isArray(values))) {
    values = [values];
  }

  var chunkIndex        = 0;
  var placeholdersRegex = /\?\??/g;
  var result            = '';
  var valuesIndex       = 0;
  var match;

  while (valuesIndex < values.length && (match = placeholdersRegex.exec(sql))) {
    var value = match[0] === '??'
        ? SqlString.escapeId(values[valuesIndex])
        : SqlString.escape(values[valuesIndex], stringifyObjects, timeZone);

    result += sql.slice(chunkIndex, match.index) + value;
    chunkIndex = placeholdersRegex.lastIndex;
    valuesIndex++;
  }

  if (chunkIndex === 0) {
    // Nothing was replaced
    return sql;
  }

  if (chunkIndex < sql.length) {
    return result + sql.slice(chunkIndex);
  }

  return result;
};

SqlString.dateToString = function dateToString(date, timeZone) {
  var dt = new Date(date);

  if (isNaN(dt.getTime())) {
    return 'NULL';
  }

  var year;
  var month;
  var day;
  var hour;
  var minute;
  var second;
  var millisecond;

  if (timeZone === 'local') {
    year        = dt.getFullYear();
    month       = dt.getMonth() + 1;
    day         = dt.getDate();
    hour        = dt.getHours();
    minute      = dt.getMinutes();
    second      = dt.getSeconds();
    millisecond = dt.getMilliseconds();
  } else {
    var tz = convertTimezone(timeZone);

    if (tz !== false && tz !== 0) {
      dt.setTime(dt.getTime() + (tz * 60000));
    }

    year       = dt.getUTCFullYear();
    month       = dt.getUTCMonth() + 1;
    day         = dt.getUTCDate();
    hour        = dt.getUTCHours();
    minute      = dt.getUTCMinutes();
    second      = dt.getUTCSeconds();
    millisecond = dt.getUTCMilliseconds();
  }

  // YYYY-MM-DD HH:mm:ss.mmm
  var str = zeroPad(year, 4) + '-' + zeroPad(month, 2) + '-' + zeroPad(day, 2) + ' ' +
    zeroPad(hour, 2) + ':' + zeroPad(minute, 2) + ':' + zeroPad(second, 2) + '.' +
    zeroPad(millisecond, 3);

  return escapeString(str);
};

SqlString.bufferToString = function bufferToString(buffer) {
  return "X" + escapeString(buffer.toString('hex'));
};

SqlString.objectToValues = function objectToValues(object, timeZone) {
  var sql = '';

  for (var key in object) {
    var val = object[key];

    if (typeof val === 'function') {
      continue;
    }

    sql += (sql.length === 0 ? '' : ', ') + SqlString.escapeId(key) + ' = ' + SqlString.escape(val, true, timeZone);
  }

  return sql;
};

function escapeString(val) {
  var chunkIndex = charsRegex.lastIndex = 0;
  var escapedVal = '';
  var match;

  while ((match = charsRegex.exec(val))) {
    escapedVal += val.slice(chunkIndex, match.index) + charsMap[match[0]];
    chunkIndex = charsRegex.lastIndex;
  }

  if (chunkIndex === 0) {
    // Nothing was escaped
    return "'" + val + "'";
  }

  if (chunkIndex < val.length) {
    return "'" + escapedVal + val.slice(chunkIndex) + "'";
  }

  return "'" + escapedVal + "'";
}

function zeroPad(number, length) {
  number = number.toString();
  while (number.length < length) {
    number = '0' + number;
  }

  return number;
}

function convertTimezone(tz) {
  if (tz === 'Z') {
    return 0;
  }

  var m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
  if (m) {
    return (m[1] == '-' ? -1 : 1) * (parseInt(m[2], 10) + ((m[3] ? parseInt(m[3], 10) : 0) / 60)) * 60;
  }
  return false;
}

}).call(this,{"isBuffer":require("../../../../is-buffer/index.js")})

},{"../../../../is-buffer/index.js":3}],67:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":undefined}],68:[function(require,module,exports){
var v1 = require('./v1');
var v4 = require('./v4');

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

},{"./v1":71,"./v4":72}],69:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

},{}],70:[function(require,module,exports){
// Unique ID creation requires a high quality random # generator.  In node.js
// this is prett straight-forward - we use the crypto API.

var rb = require('crypto').randomBytes;

function rng() {
  return rb(16);
};

module.exports = rng;

},{"crypto":undefined}],71:[function(require,module,exports){
// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

},{"./lib/bytesToUuid":69,"./lib/rng":70}],72:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":69,"./lib/rng":70}],73:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var aws = require("aws-sdk");
var leoConfig = require("@leo-sdk/core/leoConfigure.js");
var crypto = require('crypto');
var uuid = require("uuid");
var base = require("@leo-sdk/core/lib/checksum/base.js");
var mysql = require('mysql');
var moment = require("moment");

module.exports = base({
	batch: batch,
	individual: individual,
	sample: sample,
	nibble: nibble,
	range: range,
	initialize: initialize,
	destroy: destroy,
	delete: del
});

var fieldTypes = {
	BIT: 16,
	BLOB: 252,
	DATE: 10,
	DATETIME: 12,
	DECIMAL: 0,
	DOUBLE: 5,
	ENUM: 247,
	FLOAT: 4,
	GEOMETRY: 255,
	INT24: 9,
	LONG: 3,
	LONGLONG: 8,
	LONG_BLOB: 251,
	MEDIUM_BLOB: 250,
	NEWDATE: 14,
	NEWDECIMAL: 246,
	NULL: 6,
	SET: 248,
	SHORT: 2,
	STRING: 254,
	TIME: 11,
	TIMESTAMP: 7,
	TINY: 1,
	TINY_BLOB: 249,
	VARCHAR: 15,
	VAR_STRING: 253,
	YEAR: 13
};
var fieldIds = {};
Object.keys(fieldTypes).forEach(function (key) {
	fieldIds[fieldTypes[key]] = key;
});

function batch(event, callback) {
	var startTime = moment.now();

	var data = event.data;
	var settings = event.settings;
	var connection = getConnection(settings);

	getFields(connection, event).then(function (table) {
		var fieldCalcs = table.fieldCalcs;
		var batchQuery = "\n\t\tselect count(*) as count,\n\t\tsum(truncate(conv(substring(hash, 1, 8), 16, 10), 0)) as sum1,\n\t\tsum(truncate(conv(substring(hash, 9, 8), 16, 10), 0)) as sum2,\n\t\tsum(truncate(conv(substring(hash, 17, 8), 16, 10), 0)) as sum3,\n\t\tsum(truncate(conv(substring(hash, 25, 8), 16, 10), 0)) as sum4\n\t\tfrom (\n\t\t\tselect md5(concat(" + fieldCalcs.join(', ') + ")) as hash\n\t\t\tfrom (\n        " + table.sql.replace('__IDCOLUMNLIMIT__', where(data, settings)) + "\n      ) i\n\t\t) as t\n\t\t";
		console.log("Batch Query", batchQuery);
		connection.query(batchQuery, function (err, rows) {
			//connection.end();
			if (err) {
				console.log("Batch Checksum Error", err);
				callback(err);
			} else {
				callback(null, {
					ids: data.ids,
					start: data.start,
					end: data.end,
					duration: moment.now() - startTime,
					qty: rows[0].count,
					hash: [rows[0].sum1, rows[0].sum2, rows[0].sum3, rows[0].sum4]
				});
			}
		});
	}).catch(callback).then(function () {
		return connection.end();
	});
}

function individual(event, callback) {

	//console.log("Calling Individual");
	var startTime = moment.now();
	var tableName = getTable(event);

	var data = event.data;
	var settings = event.settings;
	//var fields = settings.fields;
	var connection = getConnection(settings);

	getFields(connection, event).then(function (table) {
		var fieldCalcs = table.fieldCalcs;
		var individualQuery = "\n      select " + settings.id_column + " as id, md5(concat(" + fieldCalcs.join(', ') + ")) as hash\n      from (\n        " + table.sql.replace('__IDCOLUMNLIMIT__', where(data, settings)) + "\n      ) i\n\t\t";
		console.log("Individual Query", individualQuery);
		connection.query(individualQuery, function (err, rows) {
			//connection.end();
			if (err) {
				console.log("Individual Checksum Error", err);
				callback(err);
			} else {
				var results = {
					ids: data.ids,
					start: data.start,
					end: data.end,
					qty: rows.length,
					checksums: []
				};
				rows.forEach(function (row) {
					results.checksums.push({
						id: row.id,
						hash: row.hash
					});
				});
				callback(null, results);
			}
		});
	}).catch(callback).then(function () {
		return connection.end();
	});
}

function del(event, callback) {

	//console.log("Calling Sample", event);
	var data = event.data;
	var settings = event.settings;
	var tableName = getTable(event);
	var connection = getConnection(settings);

	getFields(connection, event).then(function (table) {
		var fields = table.fields;
		var delQuery = "\n    delete from " + tableName + "\n      where " + settings.id_column + " in (" + data.ids.map(function (f) {
			return escape(f);
		}) + ")";

		console.log("Delete Query", delQuery);
		connection.query(delQuery, function (err, rows) {
			if (err) {
				console.log("Delete Error", err);
				callback(err);
				return;
			}
			var results = {
				ids: data.ids
			};
			callback(null, results);
		});
	}).catch(callback).then(function () {
		return connection.end();
	});
}

function sample(event, callback) {

	//console.log("Calling Sample", event);
	var data = event.data;
	var settings = event.settings;
	var tableName = getTable(event);
	var connection = getConnection(settings);

	getFields(connection, event).then(function (table) {
		var fields = table.fields;
		var sampleQuery = table.sql.replace('__IDCOLUMNLIMIT__', where(data, settings));
		console.log("Sample Query", sampleQuery);
		connection.query(sampleQuery, function (err, rows) {
			if (err) {
				console.log("Sample Error", err);
				callback(err);
				return;
			}
			var results = {
				ids: data.ids,
				start: data.start,
				end: data.end,
				qty: rows.length,
				checksums: rows.map(function (row) {
					return Object.keys(row).map(function (f) {
						return row[f];
					});
				})
			};
			callback(null, results);
		});
	}).catch(callback).then(function () {
		return connection.end();
	});
}

function range(event, callback) {
	//console.log("Calling Range", event);

	var data = event.data;
	var settings = event.settings;
	var tableName = getTable(event);
	var connection = getConnection(settings);

	var where = [];
	var whereStatement = "";
	if (data.min) {
		where.push(settings.id_column + " >= " + escape(data.min));
	}
	if (data.max) {
		where.push(settings.id_column + " <= " + escape(data.max));
	}
	if (where.length) {
		whereStatement = " where " + where.join(" and ") + " ";
	}
	var query = "select MIN(" + settings.id_column + ") as min, MAX(" + settings.id_column + ") as max, count(" + settings.id_column + ") total from " + tableName + whereStatement;
	console.log("Range Query: " + query);
	connection.query(query, function (err, result) {
		connection.end();
		if (err) {
			console.log("Range Error", err);
			callback(err);
		} else {
			callback(null, {
				min: result[0].min,
				max: result[0].max,
				total: result[0].total
			});
		}
	});
}

function nibble(event, callback) {
	//console.log("Calling Nibble", event);

	var data = event.data;
	var settings = event.settings;
	var tableName = getTable(event);
	var connection = getConnection(settings);

	var query = "\n\t\tselect " + settings.id_column + " as id from " + tableName + " force key(" + (settings.key_column || settings.id_column) + ")\n\t\twhere id >= " + escape(data.start) + " and id <= " + escape(data.end) + "\n\t\torder by id " + (!data.reverse ? "asc" : "desc") + "\n\t\tlimit 2\n\t\toffset " + (data.limit - 1) + "\n\t";
	console.log("Nibble Query: " + query);
	connection.query(query, function (err, rows) {
		connection.end();
		if (err) {
			console.log("Nibble Error", err);
			callback(err);
		} else {
			data.current = rows[0] ? rows[0].id : null;
			data.next = rows[1] ? rows[1].id : null;
			callback(null, data);
		}
	});
}

function initialize(event, callback) {
	//console.log("Calling Initialize", event)
	// Generate session data

	var session = {
		id: uuid.v4()
	};
	if (_typeof(event.settings.table) == "object" && event.settings.table.sql) {
		session.table = (event.settings.table.name || 'leo_chk') + "_" + moment.now();
		console.log("Table", session.table);
		var connection = getConnection(event.settings);
		connection.query("create table " + session.table + " (" + event.settings.table.sql + ")", function (err, data) {
			connection.end();
			session.drop = !err;
			console.log(err);
			callback(err, session);
		});
	} else {
		callback(null, session);
	}
}

function destroy(event, callback) {
	//console.log("Calling Destroy", event);
	// if (event.session.drop) {
	// 	var connection = getConnection(event.settings);
	// 	connection.query(`drop table ${event.session.table}`, (err, data) => {
	// 		callback(err);
	// 	});
	// } else {
	callback();
	// }
}

function getConnection(settings) {
	var opts = Object.assign({}, leoConfig.mysql, settings);
	return mysql.createConnection(opts);
}

function escape(value) {
	if (typeof value == "string") {
		return "'" + value + "'";
	}
	return value;
}

function getFields(connection, event) {
	var settings = event.settings;
	if (!event.settings.sql) {
		var tableName = getTable(event);
		event.settings.sql = "\n      SELECT " + settings.fields.map(function (field) {
			if (field.match(/^\*/)) {
				return field.slice(1);
			} else {
				return field;
			}
		}) + "\n      FROM " + tableName + "\n      where " + event.settings.id_column + " __IDCOLUMNLIMIT__\n    ";
	}
	return new Promise(function (resolve, reject) {
		connection.query(event.settings.sql.replace('__IDCOLUMNLIMIT__', " between 1 and 0"), function (err, rows, fields) {
			if (err) {
				reject(err);
				return;
			}
			resolve({
				sql: event.settings.sql,
				fieldCalcs: fields.map(function (f) {
					if (['date', 'timestamp', 'datetime'].indexOf(fieldIds[f.type].toLowerCase()) !== -1) {
						return "coalesce(md5(floor(UNIX_TIMESTAMP(`" + f.name + "`))), \" \")";
					} else {
						return "coalesce(md5(`" + f.name + "`), \" \")";
					}
					return f.name;
				}),
				fields: fields.map(function (f) {
					return f.name;
				})
			});
		});
	});
}

function where(data, settings) {
	var where = "";
	if (data.ids) {
		where = " in (" + data.ids.map(function (f) {
			return escape(f);
		}) + ")";
	} else if (data.start || data.end) {
		var parts = [];
		if (data.start && data.end) {
			parts.push(" between " + escape(data.start) + " and " + escape(data.end) + " ");
		} else if (data.start) {
			parts.push(" >= " + escape(data.start));
		} else if (data.end) {
			parts.push(" <= " + escape(data.end));
		}
		where = parts.join(" and ");
	} else {
		where = "1=1";
	}

	if (settings.where) {
		if (where.trim() != '') {
			where += " and ";
		} else {
			where = "where ";
		}
		where += buildWhere(settings.where);
	}
	return where;
}
function getTable(event) {
	var table = event.settings.table;
	return event.session.table || ((typeof table === "undefined" ? "undefined" : _typeof(table)) === "object" ? table.name : table);
}

function buildWhere(where, combine) {
	combine = combine || "and";
	if (where) {
		var w = [];
		if ((typeof where === "undefined" ? "undefined" : _typeof(where)) == "object" && where.length) {
			where.forEach(function (e) {
				if ((typeof e === "undefined" ? "undefined" : _typeof(e)) != "object") {
					w.push(e);
				} else if ("_" in e) {
					w.push(e._);
				} else if ("or" in e) {
					w.push(buildWhere(e.or, "or"));
				} else if ("and" in e) {
					w.push(buildWhere(e.and));
				} else {
					w.push(e.field + " " + (e.op || "=") + " " + escape(e.value));
				}
			});
		} else if ((typeof where === "undefined" ? "undefined" : _typeof(where)) == "object") {
			for (var k in where) {
				var entry = where[k];
				var val = "";
				var op = "=";

				if ((typeof entry === "undefined" ? "undefined" : _typeof(entry)) != "object") {
					val = entry;
				} else if ("or" in entry) {
					w.push(buildWhere(entry.or, "or"));
				} else if ("and" in entry) {
					w.push(buildWhere(entry.and));
				} else {
					k = entry.field || k;
					val = entry.value;
					op = entry.op || op;
				}

				w.push(k + " " + op + " " + escape(val));
			}
		} else {
			w.push(where);
		}

		var joined = w.join(" " + combine + " ");
		return "(" + joined + ")";
	}
	return "";
}

},{"@leo-sdk/core/leoConfigure.js":75,"@leo-sdk/core/lib/checksum/base.js":76,"aws-sdk":"aws-sdk","crypto":undefined,"moment":5,"mysql":6,"uuid":68}],74:[function(require,module,exports){
"use strict";
var config = require("@leo-sdk/core/leoConfigure");
process.env.TZ = config.timezone;
require('source-map-support').install({
	environment: 'node',
	handleUncaughtExceptions: false
});
require("@leo-sdk/core/lib/watch");
var leolog = require("@leo-sdk/core/lib/leolog");
var file = require("C:\\Steve\\contracting\\younique\\lambda\\leo\\core\\core\\systems\\mysql\\bots\\checksum\\index.js");

function empty(obj) {
	for (let k in obj) {
		delete obj[k];
	}
}

module.exports = {
	handler: function (event, context, callback) {
		for (let x of process.listeners('uncaughtException')) { //remove lambdas default listener
			process.removeListener('uncaughtException', x);
		}
		process.on('uncaughtException', function (err) {
			leolog.finalize(true, false);
			console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
			console.error(err.stack);
			callback(null, {
				statusCode: 500,
				'Content-Type': 'application/json',
				body: JSON.stringify("Application Error")
			});
		});
		//clear out the registry
		empty(config.registry);
		config.registry.context = context;
		if (!config.registry.id) { //If they didn't specify it in their config, then let's get it from the function name
			config.registry.id = process.env.AWS_LAMBDA_FUNCTION_NAME;
		}

		file.handler(event, context, callback);
	}
};
},{"@leo-sdk/core/leoConfigure":75,"@leo-sdk/core/lib/leolog":78,"@leo-sdk/core/lib/watch":79,"C:\\Steve\\contracting\\younique\\lambda\\leo\\core\\core\\systems\\mysql\\bots\\checksum\\index.js":73,"source-map-support":90}],75:[function(require,module,exports){
module.exports = {"variables":{"auth.roles.leoauthrole":"arn:aws:iam::863233664619:role/LeoAuth-LeoAuthRole-1DFGU3XTNLWXW","auth.restapi":"adxoygmvpb","auth.version":0,"botmon.roles.botmonrole":"arn:aws:iam::863233664619:role/LeoBotMon-BotMonRole-1V5H71C7PX9U8","botmon.restapi":"6ss6ozqb3i","botmon.version":6,"core.roles.firehoserole":"arn:aws:iam::863233664619:role/Leo-FirehoseRole-FNC7FELNZFJX","core.roles.leochecksumrole":"arn:aws:iam::863233664619:role/Leo-LeoChecksumRole-B4WBVWUM89UE","core.roles.leocronrole":"arn:aws:iam::863233664619:role/Leo-LeoCronRole-S4JT195LNQUC","core.roles.leoelasticsearchrole":"arn:aws:iam::863233664619:role/Leo-LeoElasticSearchRole-1XA6ABT7JPJNM","core.roles.leohealthcheckrole":"arn:aws:iam::863233664619:role/Leo-LeoHealthCheckRole-AUIDWPG87N43","core.roles.loggingrole":"arn:aws:iam::863233664619:role/Leo-LoggingRole-O7NCBKTDD28E","core.roles.readrole":"arn:aws:iam::863233664619:role/Leo-ReadRole-1116RN8GLXSWT","core.roles.rolelambdakinesis":"arn:aws:iam::863233664619:role/Leo-RoleLambdaKinesis-1ARUN18RUNE36","core.roles.roleleobot":"arn:aws:iam::863233664619:role/Leo-RoleLeoBot-1DI081RKETF3","core.roles.roleleoinstall":"arn:aws:iam::863233664619:role/Leo-RoleLeoInstall-KOIGQS53U6ZR","core.logging":"Leo-Logging-3YK3P229R8XA","core.loggingarn":"arn:aws:kinesis:us-west-2:863233664619:stream/Leo-Logging-3YK3P229R8XA","core.policies.managedbot":"arn:aws:iam::863233664619:policy/Leo-ManagedLeoBotPolicy-1T9LC4IXSRHXA","core.policies.authorizer":"arn:aws:iam::863233664619:policy/Leo-Authorizer-XRM6ABPV183S","core.s3.id":"leo-s3bus-1co2z2juoyxy2","core.firehose.id":"Leo-BusToS3-1067GB8WK5NLQ","core.firehose.v2id":"Leo-FirehoseStream-YC1S7M61VBEZ","core.kinesis.id":"Leo-LeoStream-IPYADPS3ZBXX","core.kinesis.v2id":"Leo-KinesisStream-MQ9ED0CCX55F","core.restapi":"5agdkmg3oh","core.topics.healthchecksns":"arn:aws:sns:us-west-2:863233664619:LeoHealthCheck","core.version":8,"core.mysql.master.password":"KNknBMWuIkkelhWB1TyX","core.mysql.dw.password":"321drowssapleO","dw.roles.dwapirole":"arn:aws:iam::863233664619:role/LeoDW-DWApiRole-1PFKR01LV3ZY4","dw.roles.dwloaderrole":"arn:aws:iam::863233664619:role/LeoDW-DWLoaderRole-3V3XAO0PZIO1","dw.roles.dwprocessrole":"arn:aws:iam::863233664619:role/LeoDW-DWProcessRole-LRTCCD8V7CKL","dw.roles.dwstatemachinerole":"arn:aws:iam::863233664619:role/LeoDW-DWStateMachineRole-HQ4WVJ8KDDUD","dw.restapi":"rg1l88uud2","dw.redshift.id":"leodw-redshift-1lr88irrt90av","dw.statemachine.id":"arn:aws:states:us-west-2:863233664619:stateMachine:DWLoadStateMachine-EGM6VK6G1XCH","dw.version":2,"dw.redshift.user":"root","dw.redshift.dbname":"datawarehouse","dw.redshift.endpoint.address":"leodw-redshift-1lr88irrt90av.calggl6tq6pe.us-west-2.redshift.amazonaws.com","dw.redshift.endpoint.port":5439,"dw.redshift.endpoint.ip":"10.172.1.10","dw.redshift.endpoint.internalurl":"10.172.1.10:5439/leo","dw.redshift.endpoint.externalurl":"leodw-redshift-1lr88irrt90av.calggl6tq6pe.us-west-2.redshift.amazonaws.com:5439/leo","micro.roles.loggingrole":"arn:aws:iam::863233664619:role/LeoMicroservices-LoggingRole-11LLIS37FACAH","micro.roles.micromonrole":"arn:aws:iam::863233664619:role/LeoMicroservices-MicroMonRole-1Q39P1YDT652G","micro.roles.readrole":"arn:aws:iam::863233664619:role/LeoMicroservices-ReadRole-16CU11Q5BDT70","micro.roles.auth":"arn:aws:iam::863233664619:role/LeoMicroservices-auth-1QK4W3H2JBZY5","micro.roles.unauth":"arn:aws:iam::863233664619:role/LeoMicroservices-unauth-YUFF7ALXTE1B","micro.logging":"LeoMicroservices-Logging-1R2M3NJ9PHS5S","micro.loggingarn":"arn:aws:kinesis:us-west-2:863233664619:stream/LeoMicroservices-Logging-1R2M3NJ9PHS5S","micro.restapi":"hz1od1fedj","micro.s3.id":"s3://leomicroservices-leos3bucket-1e6896tplpfxc/","micro.cloudfront.domain":"https://d18aatgdyernbm.cloudfront.net/","micro.version":2,"micro.cognito.id":"us-west-2:795be8f3-071e-4e6f-aa4c-dc8fb6ab0afa","micro.cognito.region":"us-west-2"},"settings":{},"test":{"user":"default","users":{"default":{"identity":{"source-ip":"127.0.0.1"}}},"request":{"policies":true},"port":8081},"ui":{"version":"1.0.0","static":{},"timezone":"UTC"},"registry":{},"auth":{"loadUser":true},"stream":"Leo-LeoStream-IPYADPS3ZBXX","streamV2":"Leo-KinesisStream-MQ9ED0CCX55F","static":{"s3":"s3://leomicroservices-leos3bucket-1e6896tplpfxc/","cloudfront":"https://d18aatgdyernbm.cloudfront.net/"},"aws":{"cognito_region":"us-west-2","cognito_id":"us-west-2:795be8f3-071e-4e6f-aa4c-dc8fb6ab0afa","role":"arn:aws:iam::863233664619:role/Leo-RoleLambdaKinesis-1ARUN18RUNE36","region":"us-west-2","profile":"Administrator"},"bus":{"s3":"leo-s3bus-1co2z2juoyxy2","firehose":"Leo-BusToS3-1067GB8WK5NLQ","firehoseV2":"Leo-FirehoseStream-YC1S7M61VBEZ","default--":"firehose","gzipDisabled--":false,"gzipThreshold--":0},"logging":{"stream":"arn:aws:kinesis:us-west-2:863233664619:stream/Leo-Logging-3YK3P229R8XA","role":"arn:aws:iam::863233664619:role/Leo-LoggingRole-O7NCBKTDD28E"},"type":"bot","name":"Leo_core_mysql_checksum","version":"1.0.0","description":"MySQL Checksum API","restApiId":"5agdkmg3oh","topics":{"health":"arn:aws:sns:us-west-2:863233664619:LeoHealthCheck"},"handler":"handler","memory":128,"timeout":300,"cron":"1 minute","build":{},"cors":"*","domainName":"micro.younique.io","micro":{"version":2},"timezone":"UTC","redshift":{"loaderRole":"arn:aws:iam::863233664619:role/LeoDW-DWLoaderRole-3V3XAO0PZIO1","password":"LeoDataPassword1123","user":"root","endpoint":"10.172.1.10:5439/leo"},"_meta":{"env":"dev","region":"us-west-2","configDir":"C:\\Steve\\contracting\\younique\\lambda\\leo\\config","variablesDir":"C:\\Steve\\contracting\\younique\\lambda\\leo\\config\\variables","microserviceDir":"C:\\Steve\\contracting\\younique\\lambda\\leo\\core\\core","systemDir":"C:\\Steve\\contracting\\younique\\lambda\\leo"}}
},{}],76:[function(require,module,exports){
module.exports = function (checksumlib) {
	return {
		handler: function (event, context, callback) {
			context.callbackWaitsForEmptyEventLoop = false;
			var idColumn = event.id_column;
			var method = event.params.querystring.method;

			if (method == "batch") {
				delete event.body.checksum;
				checksumlib.batch(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else if (method == "individual") {
				delete event.body.individual;
				checksumlib.individual(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else if (method == "delete") {
				delete event.body.delete;
				checksumlib.delete(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else if (method == "sample") {
				delete event.body.sample;
				checksumlib.sample(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else if (method == "nibble") {
				delete event.body.nibble;
				checksumlib.nibble(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else if (method == "range") {
				delete event.body.range;
				checksumlib.range(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else if (method == "initialize") {
				delete event.body.initialize;
				checksumlib.initialize(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else if (method == "destroy") {
				delete event.body.destroy;
				checksumlib.destroy(event.body, (err, data) => {
					callback(err, {
						response: data,
						session: event.body.session
					});
				});
			} else {
				callback("Invalid Method: " + method)
			}
		}
	};
};
},{}],77:[function(require,module,exports){
module.exports = {entries:{}};
},{}],78:[function(require,module,exports){
var cache = require("@leo-sdk/core/lib/leolog-cache.js");
module.exports = {
	globalOptions: undefined,
	add: function (identifier, start, end, units, duration, resource_consumption, isError, options) {
        var id = identifier;
		options = Object.assign({}, this.globalOptions, options);
		if (options && options.key) {
			identifier += "-" + options.key;
		}
		var completions = options.__completions;
		delete options.__completions;

		if (!(identifier in cache.entries)) {
			cache.entries[identifier] = {
				runs: 1,
				completions: completions || 0,
				start: start,
				end: end,
				units: units,
				duration: duration,
				max_duration: duration,
				min_duration: duration,
				consumption: resource_consumption,
				errors: isError ? 1 : 0,
				options: options,
				id: id.replace(/\n/, '')
			};
		} else {
			cache.entries[identifier].runs += 1;
			cache.entries[identifier].completions += (completions || 0);
			cache.entries[identifier].start = Math.max(start, cache.entries[identifier].start);
			cache.entries[identifier].end = Math.max(end, cache.entries[identifier].end);
			cache.entries[identifier].units += units;
			cache.entries[identifier].duration += duration;
			cache.entries[identifier].consumption += resource_consumption;
			cache.entries[identifier].max_duration = Math.max(duration, cache.entries[identifier].max_duration);
			cache.entries[identifier].min_duration = Math.min(duration, cache.entries[identifier].min_duration);
			cache.entries[identifier].errors += isError ? 1 : 0;
		}
	},
	finalize: function (addEnd, isSuccess) {
		for (var key in cache.entries) {
			var entry = cache.entries[key];
			if (!entry.options || Object.keys(entry.options).length == 0) {
				this.loggers.v1(entry);
			} else {
				this.loggers.v2(entry);
			}
		}
		if (addEnd) {
			if (!isSuccess) {
				console.log(`[LEOLOG]:ERROR`);
			}
		}
		cache.entries = {};
	},
	finalizeV2: function (extra, addEnd, isSuccess) {

		for (var key in cache.entries) {
			var entry = cache.entries[key];
			entry.options = extra;
			this.loggers.v2(entry);
		}
		if (addEnd) {
			if (!isSuccess) {
				console.log(`[LEOLOG]:ERROR`);
			}
		}
		cache.entries = {};
	},
	loggers: {
		"v1": function (entry) {
			console.log(`[LEOLOG]:v1:${entry.runs}:${entry.start}:${entry.end}:${entry.units}:${entry.duration}:${entry.min_duration}:${entry.max_duration}:${entry.consumption}:${entry.errors}:${entry.id}`);
		},
		"v2": function (entry) {
			var packed = [
				entry.runs,
				entry.start,
				entry.end,
				entry.units,
				Math.round(entry.duration),
				Math.round(entry.min_duration),
				Math.round(entry.max_duration),
				entry.consumption,
				entry.errors,
				entry.id,
				entry.completions
			]
			var data = JSON.stringify({
				p: packed,
				e: entry.options
			});
			console.log(`[LEOLOG]:v2:${data}`);
		}
	},
	systemRead: function (id, event, recordCount, opts) {
		if (typeof opts == "function") {
			callback = opts;
			opts = {};
		}
		opts = opts || {};
		if (!event.match(/\./)) {
			event = "system." + event;
		}
        var now = Date.now();
		var start = opts.event_source_timestamp || now;
		var end = opts.execution_end_timestamp || now;
		var execStart = opts.execution_start_timestamp || now;
		var duration = opts.duration || (end - execStart);

		var extra = Object.assign({}, opts.extra, {
			key: id
		});
		var packed = [
			opts.runs || 1,
			start,
			end,
			recordCount,
			duration,
			duration,
			duration,
			opts.consumption || 0,
			opts.errors || 0,
			"leo:getEvents:" + event
		];
		var data = JSON.stringify({
			p: packed,
			e: extra
		});
		console.log(`[LEOLOG]:v2:${data}`);
	},
	systemWrite: function (id, event, recordCount, opts) {
		if (typeof opts == "function") {
			callback = opts;
			opts = {};
		}
		opts = opts || {};
		if (!event.match(/\./)) {
			event = "system." + event;
		}

        var now = Date.now();
		var start = opts.event_source_timestamp || now;
		var end = opts.execution_end_timestamp || now;
		var execStart = opts.execution_start_timestamp || now;
		var duration = opts.duration || (end - execStart);

		var extra = Object.assign({}, opts.extra, {
			key: id
		});
		var packed = [
			opts.runs || 1,
			start,
			end,
			recordCount,
			duration,
			duration,
			duration,
			opts.consumption || 0,
			opts.errors || 0,
			"leo:kinesisWriteEvents:" + event
		];
		var data = JSON.stringify({
			p: packed,
			e: extra
		});
		console.log(`[LEOLOG]:v2:${data}`);
	}
};
},{"@leo-sdk/core/lib/leolog-cache.js":77}],79:[function(require,module,exports){
var leolog = require("./leolog");
var url = require("url");
const util = require('util');

var ignoreHosts = {};
//Inject an AWS watcher
function MyAWSRequest(service, operation, params) {
	oldRequest.call(this, service, operation, params);
	var logger = awsLogger.basic;
	var endpoint = service.endpoint.host;

	ignoreHosts[endpoint.toLowerCase()] = true;

	if (endpoint.match(/dynamodb/i)) {
		logger = awsLogger.dynamodb;
	} else if (endpoint.match(/s3/i)) {
		logger = awsLogger.s3;
	}
	var t = Date.now();
	this.on("complete", function (response) {
		logger(service, operation, params, response, t, Date.now());
	});
}
var aws = require('aws-sdk');
if (!aws._leoextended) {
	var oldRequest = aws.Request;

	var awsLogger = {
		dynamodb: function (service, operation, params, response, start, end) {
			var tableName = params.TableName;
			var expression = '';

			if (operation == "batchGetItem") {
				tableName = Object.keys(params.RequestItems).join(',');
			} else if (operation == "query") {
				expression = `where ${params.KeyConditionExpression}`;
			} else if (operation == "update") {
				expression = params.UpdateExpression;
			}
			var indexName = params.IndexName || "";

			var consumedCapacity = null;
			var res = JSON.parse(response.httpResponse.body);
			if ('ConsumedCapacity' in res) {
				if (Array.isArray(res.ConsumedCapacity)) {
					consumedCapacity = 0;
					res.ConsumedCapacity.forEach(function (e) {
						consumedCapacity += e.CapacityUnits;
					});
				} else {
					consumedCapacity = res.ConsumedCapacity.CapacityUnits;
				}
			}
			leolog.add(`${service.endpoint.host.replace(/\.amazonaws\.com$/, '')}:${tableName}:${indexName}:${operation}/${expression}`, start, end, 1, end - start, consumedCapacity, response.error ? 1 : 0);
		},
		s3: function (service, operation, params, response, start, end) {
			var consumedCapacity = null;
			ignoreHosts[params.Bucket.toLowerCase() + ".s3.amazonaws.com"] = true;
			leolog.add(`${service.endpoint.host.replace(/\.amazonaws\.com$/, '')}:${operation}:/${params.Bucket}:`, start, end, 1, end - start, consumedCapacity, response.error ? 1 : 0);
		},
		basic: function (service, operation, params, response, start, end) {
			var consumedCapacity = null;
			leolog.add(`${service.endpoint.host.replace(/\.amazonaws\.com$/, '')}:${operation}`, start, end, 1, end - start, consumedCapacity, response.error ? 1 : 0);
		},
	};

	util.inherits(MyAWSRequest, oldRequest);
	aws.Request = MyAWSRequest;
	aws._leoextended = true;
}

//Inject an HTTP/HTTPS listener
var newRequestFunc = function (protocol, options, callback) {
	var t = Date.now();
	var req = oldRequests[protocol].call(this, options, callback);

	if (typeof options === 'string') {
		options = url.parse(options);
	}
	var host = options.host || options.hostname || "";
	req.on('response', function (res) {
		var end = Date.now();
		res.on('error', function () {
			if (!(host in ignoreHosts) && !host.match(/amazonaws\.com/ig)) {
				leolog.add(`${host}:${options.port||80}:${req.path||'/'}:${req.method||'GET'}`, t, end, 1, end - t, 0, parseInt(res.statusCode));
			}
		});
		res.on('end', function () {
			if (!(host in ignoreHosts) && !host.match(/amazonaws\.com/ig)) {
				leolog.add(`${host}:${options.port||80}:${req.path||'/'}:${req.method||'GET'}`, t, end, 1, end - t, 0, false);
			}
		});
	});
	return req;
};
var http = require("http");
// var https = require("https");
if (!http._leoextended) {
	var oldRequests = {
		// https: https.request,
		http: http.request
	};
	http.request = newRequestFunc.bind(http, 'http');
	// https.request = newRequestFunc.bind(https, 'https');
	http._leoextended = true;
}
},{"./leolog":78,"aws-sdk":"aws-sdk","http":undefined,"url":undefined,"util":undefined}],80:[function(require,module,exports){
(function (__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 1.0.0 Copyright (c) 2011-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                if (callback) {
                    process.nextTick(function () {
                        callback.apply(null, deps);
                    });
                }
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,"/Steve\\contracting\\younique\\lambda\\leo\\core\\core\\node_modules\\amdefine\\amdefine.js")

},{"path":undefined}],81:[function(require,module,exports){
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = require('./source-map/source-map-generator').SourceMapGenerator;
exports.SourceMapConsumer = require('./source-map/source-map-consumer').SourceMapConsumer;
exports.SourceNode = require('./source-map/source-node').SourceNode;

},{"./source-map/source-map-consumer":86,"./source-map/source-map-generator":87,"./source-map/source-node":88}],82:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = {};
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var isDuplicate = this.has(aStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set[util.toSetString(aStr)] = idx;
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    return Object.prototype.hasOwnProperty.call(this._set,
                                                util.toSetString(aStr));
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (this.has(aStr)) {
      return this._set[util.toSetString(aStr)];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  exports.ArraySet = ArraySet;

});

},{"./util":89,"amdefine":80}],83:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64 = require('./base64');

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string.
   */
  exports.decode = function base64VLQ_decode(aStr) {
    var i = 0;
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (i >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = base64.decode(aStr.charAt(i++));
      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    return {
      value: fromVLQSigned(result),
      rest: aStr.slice(i)
    };
  };

});

},{"./base64":84,"amdefine":80}],84:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var charToIntMap = {};
  var intToCharMap = {};

  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    .split('')
    .forEach(function (ch, index) {
      charToIntMap[ch] = index;
      intToCharMap[index] = ch;
    });

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  exports.encode = function base64_encode(aNumber) {
    if (aNumber in intToCharMap) {
      return intToCharMap[aNumber];
    }
    throw new TypeError("Must be between 0 and 63: " + aNumber);
  };

  /**
   * Decode a single base 64 digit to an integer.
   */
  exports.decode = function base64_decode(aChar) {
    if (aChar in charToIntMap) {
      return charToIntMap[aChar];
    }
    throw new TypeError("Not a valid base 64 digit: " + aChar);
  };

});

},{"amdefine":80}],85:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the next
    //      closest element that is less than that element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element which is less than the one we are searching for, so we
    //      return null.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      // Found the element we are looking for.
      return aHaystack[mid];
    }
    else if (cmp > 0) {
      // aHaystack[mid] is greater than our needle.
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
      }
      // We did not find an exact match, return the next closest one
      // (termination case 2).
      return aHaystack[mid];
    }
    else {
      // aHaystack[mid] is less than our needle.
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
      }
      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (2) or (3) and return the appropriate thing.
      return aLow < 0
        ? null
        : aHaystack[aLow];
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the next lowest value checked if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare) {
    return aHaystack.length > 0
      ? recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
      : null;
  };

});

},{"amdefine":80}],86:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');

  /**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }

  /**
   * Create a SourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns SourceMapConsumer
   */
  SourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(SourceMapConsumer.prototype);

      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;

      smc.__generatedMappings = aSourceMap._mappings.slice()
        .sort(util.compareByGeneratedPositions);
      smc.__originalMappings = aSourceMap._mappings.slice()
        .sort(util.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this.sourceRoot ? util.join(this.sourceRoot, s) : s;
      }, this);
    }
  });

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    get: function () {
      if (!this.__generatedMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    get: function () {
      if (!this.__originalMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var mappingSeparator = /^[,;]/;
      var str = aStr;
      var mapping;
      var temp;

      while (str.length > 0) {
        if (str.charAt(0) === ';') {
          generatedLine++;
          str = str.slice(1);
          previousGeneratedColumn = 0;
        }
        else if (str.charAt(0) === ',') {
          str = str.slice(1);
        }
        else {
          mapping = {};
          mapping.generatedLine = generatedLine;

          // Generated column.
          temp = base64VLQ.decode(str);
          mapping.generatedColumn = previousGeneratedColumn + temp.value;
          previousGeneratedColumn = mapping.generatedColumn;
          str = temp.rest;

          if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
            // Original source.
            temp = base64VLQ.decode(str);
            mapping.source = this._sources.at(previousSource + temp.value);
            previousSource += temp.value;
            str = temp.rest;
            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
              throw new Error('Found a source, but no line and column');
            }

            // Original line.
            temp = base64VLQ.decode(str);
            mapping.originalLine = previousOriginalLine + temp.value;
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;
            str = temp.rest;
            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
              throw new Error('Found a source and line, but no column');
            }

            // Original column.
            temp = base64VLQ.decode(str);
            mapping.originalColumn = previousOriginalColumn + temp.value;
            previousOriginalColumn = mapping.originalColumn;
            str = temp.rest;

            if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
              // Original name.
              temp = base64VLQ.decode(str);
              mapping.name = this._names.at(previousName + temp.value);
              previousName += temp.value;
              str = temp.rest;
            }
          }

          this.__generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            this.__originalMappings.push(mapping);
          }
        }
      }

      this.__generatedMappings.sort(util.compareByGeneratedPositions);
      this.__originalMappings.sort(util.compareByOriginalPositions);
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  SourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator);
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  SourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var mapping = this._findMapping(needle,
                                      this._generatedMappings,
                                      "generatedLine",
                                      "generatedColumn",
                                      util.compareByGeneratedPositions);

      if (mapping) {
        var source = util.getArg(mapping, 'source', null);
        if (source && this.sourceRoot) {
          source = util.join(this.sourceRoot, source);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: util.getArg(mapping, 'name', null)
        };
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
  SourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource) {
      if (!this.sourcesContent) {
        return null;
      }

      if (this.sourceRoot) {
        aSource = util.relative(this.sourceRoot, aSource);
      }

      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }

      var url;
      if (this.sourceRoot
          && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }

      throw new Error('"' + aSource + '" is not in the SourceMap.');
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      if (this.sourceRoot) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }

      var mapping = this._findMapping(needle,
                                      this._originalMappings,
                                      "originalLine",
                                      "originalColumn",
                                      util.compareByOriginalPositions);

      if (mapping) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null)
        };
      }

      return {
        line: null,
        column: null
      };
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      mappings.map(function (mapping) {
        var source = mapping.source;
        if (source && sourceRoot) {
          source = util.join(sourceRoot, source);
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name
        };
      }).forEach(aCallback, context);
    };

  exports.SourceMapConsumer = SourceMapConsumer;

});

},{"./array-set":82,"./base64-vlq":83,"./binary-search":85,"./util":89,"amdefine":80}],87:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. To create a new one, you must pass an object
   * with the following properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: An optional root for all URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    this._file = util.getArg(aArgs, 'file');
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = [];
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source) {
          newMapping.source = mapping.source;
          if (sourceRoot) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      this._validateMapping(generated, original, source, name);

      if (source && !this._sources.has(source)) {
        this._sources.add(source);
      }

      if (name && !this._names.has(name)) {
        this._names.add(name);
      }

      this._mappings.push({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot) {
        source = util.relative(this._sourceRoot, source);
      }

      if (aSourceContent !== null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = {};
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   */
  SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile) {
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (!aSourceFile) {
        aSourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "aSourceFile" relative if an absolute Url is passed.
      if (sourceRoot) {
        aSourceFile = util.relative(sourceRoot, aSourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet();
      var newNames = new ArraySet();

      // Find mappings for the "aSourceFile"
      this._mappings.forEach(function (mapping) {
        if (mapping.source === aSourceFile && mapping.originalLine) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source !== null) {
            // Copy mapping
            if (sourceRoot) {
              mapping.source = util.relative(sourceRoot, original.source);
            } else {
              mapping.source = original.source;
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name !== null && mapping.name !== null) {
              // Only use the identifier name if it's an identifier
              // in both SourceMaps
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content) {
          if (sourceRoot) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;

      // The mappings must be guaranteed to be in sorted order before we start
      // serializing them or else the generated line numbers (which are defined
      // via the ';' separators) will be all messed up. Note: it might be more
      // performant to maintain the sorting as we insert them, rather than as we
      // serialize them, but the big O is the same either way.
      this._mappings.sort(util.compareByGeneratedPositions);

      for (var i = 0, len = this._mappings.length; i < len; i++) {
        mapping = this._mappings[i];

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util.compareByGeneratedPositions(mapping, this._mappings[i - 1])) {
              continue;
            }
            result += ',';
          }
        }

        result += base64VLQ.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
                                     - previousSource);
          previousSource = this._sources.indexOf(mapping.source);

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          result += base64VLQ.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name)
                                       - previousName);
            previousName = this._names.indexOf(mapping.name);
          }
        }
      }

      return result;
    };

  SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
                                                    key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        file: this._file,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._sourceRoot) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this);
    };

  exports.SourceMapGenerator = SourceMapGenerator;

});

},{"./array-set":82,"./base64-vlq":83,"./util":89,"amdefine":80}],88:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
  var util = require('./util');

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine === undefined ? null : aLine;
    this.column = aColumn === undefined ? null : aColumn;
    this.source = aSource === undefined ? null : aSource;
    this.name = aName === undefined ? null : aName;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // The generated code
      // Processed fragments are removed from this array.
      var remainingLines = aGeneratedCode.split('\n');

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping === null) {
          // We add the generated code until the first mapping
          // to the SourceNode without any mapping.
          // Each line is added as separate string.
          while (lastGeneratedLine < mapping.generatedLine) {
            node.add(remainingLines.shift() + "\n");
            lastGeneratedLine++;
          }
          if (lastGeneratedColumn < mapping.generatedColumn) {
            var nextLine = remainingLines[0];
            node.add(nextLine.substr(0, mapping.generatedColumn));
            remainingLines[0] = nextLine.substr(mapping.generatedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
          }
        } else {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            var code = "";
            // Associate full lines with "lastMapping"
            do {
              code += remainingLines.shift() + "\n";
              lastGeneratedLine++;
              lastGeneratedColumn = 0;
            } while (lastGeneratedLine < mapping.generatedLine);
            // When we reached the correct line, we add code until we
            // reach the correct column too.
            if (lastGeneratedColumn < mapping.generatedColumn) {
              var nextLine = remainingLines[0];
              code += nextLine.substr(0, mapping.generatedColumn);
              remainingLines[0] = nextLine.substr(mapping.generatedColumn);
              lastGeneratedColumn = mapping.generatedColumn;
            }
            // Create the SourceNode.
            addMappingWithCode(lastMapping, code);
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[0];
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
          }
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      // Associate the remaining code in the current line with "lastMapping"
      // and add the remaining lines without any mapping
      addMappingWithCode(lastMapping, remainingLines.join("\n"));

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content) {
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  mapping.source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk instanceof SourceNode) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild instanceof SourceNode) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i] instanceof SourceNode) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      chunk.split('').forEach(function (ch) {
        if (ch === '\n') {
          generated.line++;
          generated.column = 0;
        } else {
          generated.column++;
        }
      });
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;

});

},{"./source-map-generator":87,"./util":89,"amdefine":80}],89:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  var urlRegexp = /([\w+\-.]+):\/\/((\w+:\w+)@)?([\w.]+)?(:(\d+))?(\S+)?/;
  var dataUrlRegexp = /^data:.+\,.+/;

  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[3],
      host: match[4],
      port: match[6],
      path: match[7]
    };
  }
  exports.urlParse = urlParse;

  function urlGenerate(aParsedUrl) {
    var url = aParsedUrl.scheme + "://";
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + "@"
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;

  function join(aRoot, aPath) {
    var url;

    if (aPath.match(urlRegexp) || aPath.match(dataUrlRegexp)) {
      return aPath;
    }

    if (aPath.charAt(0) === '/' && (url = urlParse(aRoot))) {
      url.path = aPath;
      return urlGenerate(url);
    }

    return aRoot.replace(/\/$/, '') + '/' + aPath;
  }
  exports.join = join;

  /**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  function toSetString(aStr) {
    return '$' + aStr;
  }
  exports.toSetString = toSetString;

  function fromSetString(aStr) {
    return aStr.substr(1);
  }
  exports.fromSetString = fromSetString;

  function relative(aRoot, aPath) {
    aRoot = aRoot.replace(/\/$/, '');

    var url = urlParse(aRoot);
    if (aPath.charAt(0) == "/" && url && url.path == "/") {
      return aPath.slice(1);
    }

    return aPath.indexOf(aRoot + '/') === 0
      ? aPath.substr(aRoot.length + 1)
      : aPath;
  }
  exports.relative = relative;

  function strcmp(aStr1, aStr2) {
    var s1 = aStr1 || "";
    var s2 = aStr2 || "";
    return (s1 > s2) - (s1 < s2);
  }

  /**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp;

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp || onlyCompareOriginal) {
      return cmp;
    }

    cmp = strcmp(mappingA.name, mappingB.name);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    return mappingA.generatedColumn - mappingB.generatedColumn;
  };
  exports.compareByOriginalPositions = compareByOriginalPositions;

  /**
   * Comparator between two mappings where the generated positions are
   * compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
  function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
    var cmp;

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp || onlyCompareGenerated) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  };
  exports.compareByGeneratedPositions = compareByGeneratedPositions;

});

},{"amdefine":80}],90:[function(require,module,exports){
(function (Buffer){
var SourceMapConsumer = require('source-map').SourceMapConsumer;
var path = require('path');
var fs = require('fs');

// Only install once if called multiple times
var errorFormatterInstalled = false;
var uncaughtShimInstalled = false;

// If true, the caches are reset before a stack trace formatting operation
var emptyCacheBetweenOperations = false;

// Supports {browser, node, auto}
var environment = "auto";

// Maps a file path to a string containing the file contents
var fileContentsCache = {};

// Maps a file path to a source map for that file
var sourceMapCache = {};

// Regex for detecting source maps
var reSourceMap = /^data:application\/json[^,]+base64,/;

// Priority list of retrieve handlers
var retrieveFileHandlers = [];
var retrieveMapHandlers = [];

function isInBrowser() {
  if (environment === "browser")
    return true;
  if (environment === "node")
    return false;
  return ((typeof window !== 'undefined') && (typeof XMLHttpRequest === 'function') && !(window.require && window.module && window.process && window.process.type === "renderer"));
}

function hasGlobalProcessEventEmitter() {
  return ((typeof process === 'object') && (process !== null) && (typeof process.on === 'function'));
}

function handlerExec(list) {
  return function(arg) {
    for (var i = 0; i < list.length; i++) {
      var ret = list[i](arg);
      if (ret) {
        return ret;
      }
    }
    return null;
  };
}

var retrieveFile = handlerExec(retrieveFileHandlers);

retrieveFileHandlers.push(function(path) {
  // Trim the path to make sure there is no extra whitespace.
  path = path.trim();
  if (path in fileContentsCache) {
    return fileContentsCache[path];
  }

  try {
    // Use SJAX if we are in the browser
    if (isInBrowser()) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', path, false);
      xhr.send(null);
      var contents = null
      if (xhr.readyState === 4 && xhr.status === 200) {
        contents = xhr.responseText
      }
    }

    // Otherwise, use the filesystem
    else {
      var contents = fs.readFileSync(path, 'utf8');
    }
  } catch (e) {
    var contents = null;
  }

  return fileContentsCache[path] = contents;
});

// Support URLs relative to a directory, but be careful about a protocol prefix
// in case we are in the browser (i.e. directories may start with "http://")
function supportRelativeURL(file, url) {
  if (!file) return url;
  var dir = path.dirname(file);
  var match = /^\w+:\/\/[^\/]*/.exec(dir);
  var protocol = match ? match[0] : '';
  return protocol + path.resolve(dir.slice(protocol.length), url);
}

function retrieveSourceMapURL(source) {
  var fileData;

  if (isInBrowser()) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', source, false);
    xhr.send(null);
    fileData = xhr.readyState === 4 ? xhr.responseText : null;

    // Support providing a sourceMappingURL via the SourceMap header
    var sourceMapHeader = xhr.getResponseHeader("SourceMap") ||
                          xhr.getResponseHeader("X-SourceMap");
    if (sourceMapHeader) {
      return sourceMapHeader;
    }
  }

  // Get the URL of the source map
  fileData = retrieveFile(source);
  //        
  var re = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/)[ \t]*$)/mg;
  // Keep executing the search to find the *last* sourceMappingURL to avoid
  // picking up sourceMappingURLs from comments, strings, etc.
  var lastMatch, match;
  while (match = re.exec(fileData)) lastMatch = match;
  if (!lastMatch) return null;
  return lastMatch[1];
};

// Can be overridden by the retrieveSourceMap option to install. Takes a
// generated source filename; returns a {map, optional url} object, or null if
// there is no source map.  The map field may be either a string or the parsed
// JSON object (ie, it must be a valid argument to the SourceMapConsumer
// constructor).
var retrieveSourceMap = handlerExec(retrieveMapHandlers);
retrieveMapHandlers.push(function(source) {
  var sourceMappingURL = retrieveSourceMapURL(source);
  if (!sourceMappingURL) return null;

  // Read the contents of the source map
  var sourceMapData;
  if (reSourceMap.test(sourceMappingURL)) {
    // Support source map URL as a data url
    var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(',') + 1);
    sourceMapData = new Buffer(rawData, "base64").toString();
    sourceMappingURL = null;
  } else {
    // Support source map URLs relative to the source URL
    sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
    sourceMapData = retrieveFile(sourceMappingURL);
  }

  if (!sourceMapData) {
    return null;
  }

  return {
    url: sourceMappingURL,
    map: sourceMapData
  };
});

function mapSourcePosition(position) {
  var sourceMap = sourceMapCache[position.source];
  if (!sourceMap) {
    // Call the (overrideable) retrieveSourceMap function to get the source map.
    var urlAndMap = retrieveSourceMap(position.source);
    if (urlAndMap) {
      sourceMap = sourceMapCache[position.source] = {
        url: urlAndMap.url,
        map: new SourceMapConsumer(urlAndMap.map)
      };

      // Load all sources stored inline with the source map into the file cache
      // to pretend like they are already loaded. They may not exist on disk.
      if (sourceMap.map.sourcesContent) {
        sourceMap.map.sources.forEach(function(source, i) {
          var contents = sourceMap.map.sourcesContent[i];
          if (contents) {
            var url = supportRelativeURL(sourceMap.url, source);
            fileContentsCache[url] = contents;
          }
        });
      }
    } else {
      sourceMap = sourceMapCache[position.source] = {
        url: null,
        map: null
      };
    }
  }

  // Resolve the source URL relative to the URL of the source map
  if (sourceMap && sourceMap.map) {
    var originalPosition = sourceMap.map.originalPositionFor(position);

    // Only return the original position if a matching line was found. If no
    // matching line is found then we return position instead, which will cause
    // the stack trace to print the path and line for the compiled file. It is
    // better to give a precise location in the compiled file than a vague
    // location in the original file.
    if (originalPosition.source !== null) {
      originalPosition.source = supportRelativeURL(
        sourceMap.url, originalPosition.source);
      return originalPosition;
    }
  }

  return position;
}

// Parses code generated by FormatEvalOrigin(), a function inside V8:
// https://code.google.com/p/v8/source/browse/trunk/src/messages.js
function mapEvalOrigin(origin) {
  // Most eval() calls are in this format
  var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
  if (match) {
    var position = mapSourcePosition({
      source: match[2],
      line: match[3],
      column: match[4] - 1
    });
    return 'eval at ' + match[1] + ' (' + position.source + ':' +
      position.line + ':' + (position.column + 1) + ')';
  }

  // Parse nested eval() calls using recursion
  match = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
  if (match) {
    return 'eval at ' + match[1] + ' (' + mapEvalOrigin(match[2]) + ')';
  }

  // Make sure we still return useful information if we didn't find anything
  return origin;
}

// This is copied almost verbatim from the V8 source code at
// https://code.google.com/p/v8/source/browse/trunk/src/messages.js. The
// implementation of wrapCallSite() used to just forward to the actual source
// code of CallSite.prototype.toString but unfortunately a new release of V8
// did something to the prototype chain and broke the shim. The only fix I
// could find was copy/paste.
function CallSiteToString() {
  var fileName;
  var fileLocation = "";
  if (this.isNative()) {
    fileLocation = "native";
  } else {
    fileName = this.getScriptNameOrSourceURL();
    if (!fileName && this.isEval()) {
      fileLocation = this.getEvalOrigin();
      fileLocation += ", ";  // Expecting source position to follow.
    }

    if (fileName) {
      fileLocation += fileName;
    } else {
      // Source code does not originate from a file and is not native, but we
      // can still get the source position inside the source string, e.g. in
      // an eval string.
      fileLocation += "<anonymous>";
    }
    var lineNumber = this.getLineNumber();
    if (lineNumber != null) {
      fileLocation += ":" + lineNumber;
      var columnNumber = this.getColumnNumber();
      if (columnNumber) {
        fileLocation += ":" + columnNumber;
      }
    }
  }

  var line = "";
  var functionName = this.getFunctionName();
  var addSuffix = true;
  var isConstructor = this.isConstructor();
  var isMethodCall = !(this.isToplevel() || isConstructor);
  if (isMethodCall) {
    var typeName = this.getTypeName();
    var methodName = this.getMethodName();
    if (functionName) {
      if (typeName && functionName.indexOf(typeName) != 0) {
        line += typeName + ".";
      }
      line += functionName;
      if (methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1) {
        line += " [as " + methodName + "]";
      }
    } else {
      line += typeName + "." + (methodName || "<anonymous>");
    }
  } else if (isConstructor) {
    line += "new " + (functionName || "<anonymous>");
  } else if (functionName) {
    line += functionName;
  } else {
    line += fileLocation;
    addSuffix = false;
  }
  if (addSuffix) {
    line += " (" + fileLocation + ")";
  }
  return line;
}

function cloneCallSite(frame) {
  var object = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach(function(name) {
    object[name] = /^(?:is|get)/.test(name) ? function() { return frame[name].call(frame); } : frame[name];
  });
  object.toString = CallSiteToString;
  return object;
}

function wrapCallSite(frame) {
  if(frame.isNative()) {
    return frame;
  }

  // Most call sites will return the source file from getFileName(), but code
  // passed to eval() ending in "//# sourceURL=..." will return the source file
  // from getScriptNameOrSourceURL() instead
  var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
  if (source) {
    var line = frame.getLineNumber();
    var column = frame.getColumnNumber() - 1;

    // Fix position in Node where some (internal) code is prepended.
    // See https://github.com/evanw/node-source-map-support/issues/36
    if (line === 1 && !isInBrowser() && !frame.isEval()) {
      column -= 62;
    }

    var position = mapSourcePosition({
      source: source,
      line: line,
      column: column
    });
    frame = cloneCallSite(frame);
    frame.getFileName = function() { return position.source; };
    frame.getLineNumber = function() { return position.line; };
    frame.getColumnNumber = function() { return position.column + 1; };
    frame.getScriptNameOrSourceURL = function() { return position.source; };
    return frame;
  }

  // Code called using eval() needs special handling
  var origin = frame.isEval() && frame.getEvalOrigin();
  if (origin) {
    origin = mapEvalOrigin(origin);
    frame = cloneCallSite(frame);
    frame.getEvalOrigin = function() { return origin; };
    return frame;
  }

  // If we get here then we were unable to change the source position
  return frame;
}

// This function is part of the V8 stack trace API, for more info see:
// http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
function prepareStackTrace(error, stack) {
  if (emptyCacheBetweenOperations) {
    fileContentsCache = {};
    sourceMapCache = {};
  }

  return error + stack.map(function(frame) {
    return '\n    at ' + wrapCallSite(frame);
  }).join('');
}

// Generate position and snippet of original source with pointer
function getErrorSource(error) {
  var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
  if (match) {
    var source = match[1];
    var line = +match[2];
    var column = +match[3];

    // Support the inline sourceContents inside the source map
    var contents = fileContentsCache[source];

    // Support files on disk
    if (!contents && fs.existsSync(source)) {
      contents = fs.readFileSync(source, 'utf8');
    }

    // Format the line from the original source code like node does
    if (contents) {
      var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
      if (code) {
        return source + ':' + line + '\n' + code + '\n' +
          new Array(column).join(' ') + '^';
      }
    }
  }
  return null;
}

function printErrorAndExit (error) {
  var source = getErrorSource(error);

  if (source) {
    console.error();
    console.error(source);
  }

  console.error(error.stack);
  process.exit(1);
}

function shimEmitUncaughtException () {
  var origEmit = process.emit;

  process.emit = function (type) {
    if (type === 'uncaughtException') {
      var hasStack = (arguments[1] && arguments[1].stack);
      var hasListeners = (this.listeners(type).length > 0);

      if (hasStack && !hasListeners) {
        return printErrorAndExit(arguments[1]);
      }
    }

    return origEmit.apply(this, arguments);
  };
}

exports.wrapCallSite = wrapCallSite;
exports.getErrorSource = getErrorSource;
exports.mapSourcePosition = mapSourcePosition;
exports.retrieveSourceMap = retrieveSourceMap;

exports.install = function(options) {
  options = options || {};

  if (options.environment) {
    environment = options.environment;
    if (["node", "browser", "auto"].indexOf(environment) === -1) {
      throw new Error("environment " + environment + " was unknown. Available options are {auto, browser, node}")
    }
  }

  // Allow sources to be found by methods other than reading the files
  // directly from disk.
  if (options.retrieveFile) {
    if (options.overrideRetrieveFile) {
      retrieveFileHandlers.length = 0;
    }

    retrieveFileHandlers.unshift(options.retrieveFile);
  }

  // Allow source maps to be found by methods other than reading the files
  // directly from disk.
  if (options.retrieveSourceMap) {
    if (options.overrideRetrieveSourceMap) {
      retrieveMapHandlers.length = 0;
    }

    retrieveMapHandlers.unshift(options.retrieveSourceMap);
  }

  // Configure options
  if (!emptyCacheBetweenOperations) {
    emptyCacheBetweenOperations = 'emptyCacheBetweenOperations' in options ?
      options.emptyCacheBetweenOperations : false;
  }

  // Install the error reformatter
  if (!errorFormatterInstalled) {
    errorFormatterInstalled = true;
    Error.prepareStackTrace = prepareStackTrace;
  }

  if (!uncaughtShimInstalled) {
    var installHandler = 'handleUncaughtExceptions' in options ?
      options.handleUncaughtExceptions : true;

    // Provide the option to not install the uncaught exception handler. This is
    // to support other uncaught exception handlers (in test frameworks, for
    // example). If this handler is not installed and there are no other uncaught
    // exception handlers, uncaught exceptions will be caught by node's built-in
    // exception handler and the process will still be terminated. However, the
    // generated JavaScript code will be shown above the stack trace instead of
    // the original source code.
    if (installHandler && hasGlobalProcessEventEmitter()) {
      uncaughtShimInstalled = true;
      shimEmitUncaughtException();
    }
  }
};

}).call(this,require("buffer").Buffer)

},{"buffer":undefined,"fs":undefined,"path":undefined,"source-map":81}]},{},[74])(74)
});