/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
	var initializing = false;

	// The base JQClass implementation (does nothing)
	window.JQClass = function(){};

	// Collection of derived classes
	JQClass.classes = {};
 
	// Create a new JQClass that inherits from this class
	JQClass.extend = function extender(prop) {
		var base = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == 'function' &&
				typeof base[name] == 'function' ?
				(function(name, fn){
					return function() {
						var __super = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = function(args) {
							return base[name].apply(this, args);
						};

						var ret = fn.apply(this, arguments);				

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						this._super = __super;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// The dummy class constructor
		function JQClass() {
			// All construction is actually done in the init method
			if (!initializing && this._init) {
				this._init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		JQClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		JQClass.prototype.constructor = JQClass;

		// And make this class extendable
		JQClass.extend = extender;

		return JQClass;
	};
})();

(function($) { // Ensure $, encapsulate

	/** Abstract base class for collection plugins.
		Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
		Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
		@module $.JQPlugin
		@abstract */
	JQClass.classes.JQPlugin = JQClass.extend({

		/** Name to identify this plugin.
			@example name: 'tabs' */
		name: 'plugin',

		/** Default options for instances of this plugin (default: {}).
			@example defaultOptions: {
 	selectedClass: 'selected',
 	triggers: 'click'
 } */
		defaultOptions: {},
		
		/** Options dependent on the locale.
			Indexed by language and (optional) country code, with '' denoting the default language (English/US).
			@example regionalOptions: {
	'': {
		greeting: 'Hi'
	}
 } */
		regionalOptions: {},
		
		/** Names of getter methods - those that can't be chained (default: []).
			@example _getters: ['activeTab'] */
		_getters: [],

		/** Retrieve a marker class for affected elements.
			@private
			@return {string} The marker class. */
		_getMarker: function() {
			return 'is-' + this.name;
		},
		
		/** Initialise the plugin.
			Create the jQuery bridge - plugin name <code>xyz</code>
			produces <code>$.xyz</code> and <code>$.fn.xyz</code>. */
		_init: function() {
			// Apply default localisations
			$.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
			// Camel-case the name
			var jqName = camelCase(this.name);
			// Expose jQuery singleton manager
			$[jqName] = this;
			// Expose jQuery collection plugin
			$.fn[jqName] = function(options) {
				var otherArgs = Array.prototype.slice.call(arguments, 1);
				if ($[jqName]._isNotChained(options, otherArgs)) {
					return $[jqName][options].apply($[jqName], [this[0]].concat(otherArgs));
				}
				return this.each(function() {
					if (typeof options === 'string') {
						if (options[0] === '_' || !$[jqName][options]) {
							throw 'Unknown method: ' + options;
						}
						$[jqName][options].apply($[jqName], [this].concat(otherArgs));
					}
					else {
						$[jqName]._attach(this, options);
					}
				});
			};
		},

		/** Set default values for all subsequent instances.
			@param options {object} The new default options.
			@example $.plugin.setDefauls({name: value}) */
		setDefaults: function(options) {
			$.extend(this.defaultOptions, options || {});
		},
		
		/** Determine whether a method is a getter and doesn't permit chaining.
			@private
			@param name {string} The method name.
			@param otherArgs {any[]} Any other arguments for the method.
			@return {boolean} True if this method is a getter, false otherwise. */
		_isNotChained: function(name, otherArgs) {
			if (name === 'option' && (otherArgs.length === 0 ||
					(otherArgs.length === 1 && typeof otherArgs[0] === 'string'))) {
				return true;
			}
			return $.inArray(name, this._getters) > -1;
		},
		
		/** Initialise an element. Called internally only.
			Adds an instance object as data named for the plugin.
			@param elem {Element} The element to enhance.
			@param options {object} Overriding settings. */
		_attach: function(elem, options) {
			elem = $(elem);
			if (elem.hasClass(this._getMarker())) {
				return;
			}
			elem.addClass(this._getMarker());
			options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
			var inst = $.extend({name: this.name, elem: elem, options: options},
				this._instSettings(elem, options));
			elem.data(this.name, inst); // Save instance against element
			this._postAttach(elem, inst);
			this.option(elem, options);
		},

		/** Retrieve additional instance settings.
			Override this in a sub-class to provide extra settings.
			@param elem {jQuery} The current jQuery element.
			@param options {object} The instance options.
			@return {object} Any extra instance values.
			@example _instSettings: function(elem, options) {
 	return {nav: elem.find(options.navSelector)};
 } */
		_instSettings: function(elem, options) {
			return {};
		},

		/** Plugin specific post initialisation.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _postAttach: function(elem, inst) {
 	elem.on('click.' + this.name, function() {
 		...
 	});
 } */
		_postAttach: function(elem, inst) {
		},

		/** Retrieve metadata configuration from the element.
			Metadata is specified as an attribute:
			<code>data-&lt;plugin name>="&lt;setting name>: '&lt;value>', ..."</code>.
			Dates should be specified as strings in this format: 'new Date(y, m-1, d)'.
			@private
			@param elem {jQuery} The source element.
			@return {object} The inline configuration or {}. */
		_getMetadata: function(elem) {
			try {
				var data = elem.data(this.name.toLowerCase()) || '';
				data = data.replace(/'/g, '"');
				data = data.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) { 
					var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
					return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
				});
				data = $.parseJSON('{' + data + '}');
				for (var name in data) { // Convert dates
					var value = data[name];
					if (typeof value === 'string' && value.match(/^new Date\((.*)\)$/)) {
						data[name] = eval(value);
					}
				}
				return data;
			}
			catch (e) {
				return {};
			}
		},

		/** Retrieve the instance data for element.
			@param elem {Element} The source element.
			@return {object} The instance data or {}. */
		_getInst: function(elem) {
			return $(elem).data(this.name) || {};
		},
		
		/** Retrieve or reconfigure the settings for a plugin.
			@param elem {Element} The source element.
			@param name {object|string} The collection of new option values or the name of a single option.
			@param [value] {any} The value for a single named option.
			@return {any|object} If retrieving a single value or all options.
			@example $(selector).plugin('option', 'name', value)
 $(selector).plugin('option', {name: value, ...})
 var value = $(selector).plugin('option', 'name')
 var options = $(selector).plugin('option') */
		option: function(elem, name, value) {
			elem = $(elem);
			var inst = elem.data(this.name);
			if  (!name || (typeof name === 'string' && value == null)) {
				var options = (inst || {}).options;
				return (options && name ? options[name] : options);
			}
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			var options = name || {};
			if (typeof name === 'string') {
				options = {};
				options[name] = value;
			}
			this._optionsChanged(elem, inst, options);
			$.extend(inst.options, options);
		},
		
		/** Plugin specific options processing.
			Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@param options {object} The new options.
			@example _optionsChanged: function(elem, inst, options) {
 	if (options.name != inst.options.name) {
 		elem.removeClass(inst.options.name).addClass(options.name);
 	}
 } */
		_optionsChanged: function(elem, inst, options) {
		},
		
		/** Remove all trace of the plugin.
			Override <code>_preDestroy</code> for plugin-specific processing.
			@param elem {Element} The source element.
			@example $(selector).plugin('destroy') */
		destroy: function(elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			this._preDestroy(elem, this._getInst(elem));
			elem.removeData(this.name).removeClass(this._getMarker());
		},

		/** Plugin specific pre destruction.
			Override this in a sub-class to perform extra activities and undo everything that was
			done in the <code>_postAttach</code> or <code>_optionsChanged</code> functions.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _preDestroy: function(elem, inst) {
 	elem.off('.' + this.name);
 } */
		_preDestroy: function(elem, inst) {
		}
	});
	
	/** Convert names from hyphenated to camel-case.
		@private
		@param value {string} The original hyphenated name.
		@return {string} The camel-case version. */
	function camelCase(name) {
		return name.replace(/-([a-z])/g, function(match, group) {
			return group.toUpperCase();
		});
	}
	
	/** Expose the plugin base.
		@namespace "$.JQPlugin" */
	$.JQPlugin = {
	
		/** Create a new collection plugin.
			@memberof "$.JQPlugin"
			@param [superClass='JQPlugin'] {string} The name of the parent class to inherit from.
			@param overrides {object} The property/function overrides for the new class.
			@example $.JQPlugin.createPlugin({
 	name: 'tabs',
 	defaultOptions: {selectedClass: 'selected'},
 	_initSettings: function(elem, options) { return {...}; },
 	_postAttach: function(elem, inst) { ... }
 }); */
		createPlugin: function(superClass, overrides) {
			if (typeof superClass === 'object') {
				overrides = superClass;
				superClass = 'JQPlugin';
			}
			superClass = camelCase(superClass);
			var className = camelCase(overrides.name);
			JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
			new JQClass.classes[className]();
		}
	};

})(jQuery);
// Countdown dependency as a manifest


/* http://keith-wood.name/countdown.html
   Countdown for jQuery v2.0.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */


(function($) { // Hide scope, no $ conflict

	var pluginName = 'countdown';

	var Y = 0; // Years
	var O = 1; // Months
	var W = 2; // Weeks
	var D = 3; // Days
	var H = 4; // Hours
	var M = 5; // Minutes
	var S = 6; // Seconds

	/** Create the countdown plugin.
		<p>Sets an element to show the time remaining until a given instant.</p>
		<p>Expects HTML like:</p>
		<pre>&lt;div>&lt;/div></pre>
		<p>Provide inline configuration like:</p>
		<pre>&lt;div data-countdown="name: 'value'">&lt;/div></pre>
	 	@module Countdown
		@augments JQPlugin
		@example $(selector).countdown({until: +300}) */
	$.JQPlugin.createPlugin({
	
		/** The name of the plugin. */
		name: pluginName,

		/** Countdown expiry callback.
			Triggered when the countdown expires.
			@callback expiryCallback */

		/** Countdown server synchronisation callback.
			Triggered when the countdown is initialised.
			@callback serverSyncCallback
			@return {Date} The current date/time on the server as expressed in the local timezone. */
			
		/** Countdown tick callback.
			Triggered on every <code>tickInterval</code> ticks of the countdown.
			@callback tickCallback
			@param periods {number[]} The breakdown by period (years, months, weeks, days,
					hours, minutes, seconds) of the time remaining/passed. */

		/** Countdown which labels callback.
			Triggered when the countdown is being display to determine which set of labels
			(<code>labels</code>, <code>labels1</code>, ...) are to be used for the current period value.
			@callback whichLabelsCallback
			@param num {number} The current period value.
			@return {number} The suffix for the label set to use. */
			
		/** Default settings for the plugin.
			@property until {Date|number|string} The date/time to count down to, or number of seconds
						offset from now, or string of amounts and units for offset(s) from now:
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@example until: new Date(2013, 12-1, 25, 13, 30)
 until: +300
 until: '+1O -2D'
			@property [since] {Date|number|string} The date/time to count up from, or
						number of seconds offset from now, or string for unit offset(s):
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@example since: new Date(2013, 1-1, 1)
 since: -300
 since: '-1O +2D'
			@property [timezone=null] {number} The timezone (hours or minutes from GMT) for the target times,
						or null for client local timezone.
			@example timezone: +10
 timezone: -60
			@property [serverSync=null] {serverSyncCallback} A function to retrieve the current server time
						for synchronisation.
			@property [format='dHMS'] {string} The format for display - upper case for always, lower case only if non-zero,
						'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
			@property [layout=''] {string} Build your own layout for the countdown.
			@example layout: '{d<}{dn} {dl}{d>} {hnn}:{mnn}:{snn}'
			@property [compact=false] {boolean} True to display in a compact format, false for an expanded one.
			@property [padZeroes=false] {boolean} True to add leading zeroes
			@property [significant=0] {number} The number of periods with non-zero values to show, zero for all.
			@property [description=''] {string} The description displayed for the countdown.
			@property [expiryUrl=''] {string} A URL to load upon expiry, replacing the current page.
			@property [expiryText=''] {string} Text to display upon expiry, replacing the countdown. This may be HTML.
			@property [alwaysExpire=false] {boolean} True to trigger <code>onExpiry</code> even if target time has passed.
			@property [onExpiry=null] {expiryCallback} Callback when the countdown expires -
						receives no parameters and <code>this</code> is the containing division.
			@example onExpiry: function() {
	...
 }
			@property [onTick=null] {tickCallback} Callback when the countdown is updated -
						receives <code>number[7]</code> being the breakdown by period
						(years, months, weeks, days, hours, minutes, seconds - based on
						<code>format</code>) and <code>this</code> is the containing division.
			@example onTick: function(periods) {
 	var secs = $.countdown.periodsToSeconds(periods);
 	if (secs < 300) { // Last five minutes
		...
 	}
 }
			@property [tickInterval=1] {number} The interval (seconds) between <code>onTick</code> callbacks. */
		defaultOptions: {
			until: null,
			since: null,
			timezone: null,
			serverSync: null,
			format: 'dHMS',
			layout: '',
			compact: false,
			padZeroes: false,
			significant: 0,
			description: '',
			expiryUrl: '',
			expiryText: '',
			alwaysExpire: false,
			onExpiry: null,
			onTick: null,
			tickInterval: 1
		},

		/** Localisations for the plugin.
			Entries are objects indexed by the language code ('' being the default US/English).
			Each object has the following attributes.
			@property [labels=['Years','Months','Weeks','Days','Hours','Minutes','Seconds']] {string[]}
						The display texts for the counter periods.
			@property [labels1=['Year','Month','Week','Day','Hour','Minute','Second']] {string[]}
						The display texts for the counter periods if they have a value of 1.
						Add other <code>labels<em>n</em></code> attributes as necessary to
						cater for other numeric idiosyncrasies of the localisation.
			@property [compactLabels=['y','m','w','d']] {string[]} The compact texts for the counter periods.
			@property [whichLabels=null] {whichLabelsCallback} A function to determine which
						<code>labels<em>n</em></code> to use.
			@example whichLabels: function(num) {
	return (num > 1 ? 0 : 1);
 }
			@property [digits=['0','1',...,'9']] {number[]} The digits to display (0-9).
			@property [timeSeparator=':'] {string} Separator for time periods in the compact layout.
			@property [isRTL=false] {boolean} True for right-to-left languages, false for left-to-right. */
		regionalOptions: { // Available regional settings, indexed by language/country code
			'': { // Default regional settings - English/US
		labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
		labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
				compactLabels: ['y', 'm', 'w', 'd'],
				whichLabels: null,
				digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
				timeSeparator: ':',
				isRTL: false
			}
		},
		
		/** Names of getter methods - those that can't be chained. */
		_getters: ['getTimes'],

		/* Class name for the right-to-left marker. */
		_rtlClass: pluginName + '-rtl',
		/* Class name for the countdown section marker. */
		_sectionClass: pluginName + '-section',
		/* Class name for the period amount marker. */
		_amountClass: pluginName + '-amount',
		/* Class name for the period name marker. */
		_periodClass: pluginName + '-period',
		/* Class name for the countdown row marker. */
		_rowClass: pluginName + '-row',
		/* Class name for the holding countdown marker. */
		_holdingClass: pluginName + '-holding',
		/* Class name for the showing countdown marker. */
		_showClass: pluginName + '-show',
		/* Class name for the description marker. */
		_descrClass: pluginName + '-descr',

		/* List of currently active countdown elements. */
		_timerElems: [],

		/** Additional setup for the countdown.
			Apply default localisations.
			Create the timer. */
		_init: function() {
			var self = this;
			this._super();
	this._serverSyncs = [];
	var now = (typeof Date.now == 'function' ? Date.now :
		function() { return new Date().getTime(); });
	var perfAvail = (window.performance && typeof window.performance.now == 'function');
	// Shared timer for all countdowns
	function timerCallBack(timestamp) {
		var drawStart = (timestamp < 1e12 ? // New HTML5 high resolution timer
			(perfAvail ? (performance.now() + performance.timing.navigationStart) : now()) :
			// Integer milliseconds since unix epoch
			timestamp || now());
		if (drawStart - animationStartTime >= 1000) {
					self._updateElems();
			animationStartTime = drawStart;
		}
		requestAnimationFrame(timerCallBack);
	}
	var requestAnimationFrame = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
		// This is when we expect a fall-back to setInterval as it's much more fluid
	var animationStartTime = 0;
	if (!requestAnimationFrame || $.noRequestAnimationFrame) {
		$.noRequestAnimationFrame = null;
				setInterval(function() { self._updateElems(); }, 980); // Fall back to good old setInterval
	}
	else {
		animationStartTime = window.animationStartTime ||
			window.webkitAnimationStartTime || window.mozAnimationStartTime ||
			window.oAnimationStartTime || window.msAnimationStartTime || now();
		requestAnimationFrame(timerCallBack);
	}
		},
	
		/** Convert a date/time to UTC.
			@param tz {number} The hour or minute offset from GMT, e.g. +9, -360.
			@param year {Date|number} the date/time in that timezone or the year in that timezone.
			@param [month] {number} The month (0 - 11) (omit if <code>year</code> is a <code>Date</code>).
			@param [day] {number} The day (omit if <code>year</code> is a <code>Date</code>).
			@param [hours] {number} The hour (omit if <code>year</code> is a <code>Date</code>).
			@param [mins] {number} The minute (omit if <code>year</code> is a <code>Date</code>).
			@param [secs] {number} The second (omit if <code>year</code> is a <code>Date</code>).
			@param [ms] {number} The millisecond (omit if <code>year</code> is a <code>Date</code>).
			@return {Date} The equivalent UTC date/time.
			@example $.countdown.UTCDate(+10, 2013, 12-1, 25, 12, 0)
 $.countdown.UTCDate(-7, new Date(2013, 12-1, 25, 12, 0)) */
	UTCDate: function(tz, year, month, day, hours, mins, secs, ms) {
		if (typeof year == 'object' && year.constructor == Date) {
			ms = year.getMilliseconds();
			secs = year.getSeconds();
			mins = year.getMinutes();
			hours = year.getHours();
			day = year.getDate();
			month = year.getMonth();
			year = year.getFullYear();
		}
		var d = new Date();
		d.setUTCFullYear(year);
		d.setUTCDate(1);
		d.setUTCMonth(month || 0);
		d.setUTCDate(day || 1);
		d.setUTCHours(hours || 0);
		d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
		d.setUTCSeconds(secs || 0);
		d.setUTCMilliseconds(ms || 0);
		return d;
	},

		/** Convert a set of periods into seconds.
	   Averaged for months and years.
			@param periods {number[]} The periods per year/month/week/day/hour/minute/second.
			@return {number} The corresponding number of seconds.
			@example var secs = $.countdown.periodsToSeconds(periods) */
	periodsToSeconds: function(periods) {
		return periods[0] * 31557600 + periods[1] * 2629800 + periods[2] * 604800 +
			periods[3] * 86400 + periods[4] * 3600 + periods[5] * 60 + periods[6];
	},

		_instSettings: function(elem, options) {
			return {_periods: [0, 0, 0, 0, 0, 0, 0]};
	},

		/** Add an element to the list of active ones.
			@private
			@param elem {Element} The countdown element. */
		_addElem: function(elem) {
			if (!this._hasElem(elem)) {
				this._timerElems.push(elem);
		}
	},

		/** See if an element is in the list of active ones.
			@private
			@param elem {Element} The countdown element.
			@return {boolean} True if present, false if not. */
		_hasElem: function(elem) {
			return ($.inArray(elem, this._timerElems) > -1);
	},

		/** Remove an element from the list of active ones.
			@private
			@param elem {Element} The countdown element. */
		_removeElem: function(elem) {
			this._timerElems = $.map(this._timerElems,
				function(value) { return (value == elem ? null : value); }); // delete entry
	},

		/** Update each active timer element.
			@private */
		_updateElems: function() {
			for (var i = this._timerElems.length - 1; i >= 0; i--) {
				this._updateCountdown(this._timerElems[i]);
		}
	},

		_optionsChanged: function(elem, inst, options) {
		if (options.layout) {
			options.layout = options.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		}
		this._resetExtraLabels(inst.options, options);
		var timezoneChanged = (inst.options.timezone != options.timezone);
		$.extend(inst.options, options);
			this._adjustSettings(elem, inst,
			options.until != null || options.since != null || timezoneChanged);
		var now = new Date();
		if ((inst._since && inst._since < now) || (inst._until && inst._until > now)) {
				this._addElem(elem[0]);
		}
			this._updateCountdown(elem, inst);
	},

		/** Redisplay the countdown with an updated display.
			@private
			@param elem {Element|jQuery} The containing division.
			@param inst {object} The current settings for this instance. */
		_updateCountdown: function(elem, inst) {
			elem = elem.jquery ? elem : $(elem);
			inst = inst || elem.data(this.name);
		if (!inst) {
			return;
		}
			elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL);
		if ($.isFunction(inst.options.onTick)) {
			var periods = inst._hold != 'lap' ? inst._periods :
				this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
			if (inst.options.tickInterval == 1 ||
					this.periodsToSeconds(periods) % inst.options.tickInterval == 0) {
					inst.options.onTick.apply(elem[0], [periods]);
			}
		}
		var expired = inst._hold != 'pause' &&
			(inst._since ? inst._now.getTime() < inst._since.getTime() :
			inst._now.getTime() >= inst._until.getTime());
		if (expired && !inst._expiring) {
			inst._expiring = true;
				if (this._hasElem(elem[0]) || inst.options.alwaysExpire) {
					this._removeElem(elem[0]);
				if ($.isFunction(inst.options.onExpiry)) {
						inst.options.onExpiry.apply(elem[0], []);
				}
				if (inst.options.expiryText) {
					var layout = inst.options.layout;
					inst.options.layout = inst.options.expiryText;
						this._updateCountdown(elem[0], inst);
					inst.options.layout = layout;
				}
				if (inst.options.expiryUrl) {
					window.location = inst.options.expiryUrl;
				}
			}
			inst._expiring = false;
		}
		else if (inst._hold == 'pause') {
				this._removeElem(elem[0]);
		}
	},

		/** Reset any extra labelsn and compactLabelsn entries if changing labels.
			@private
			@param base {object} The options to be updated.
			@param options {object} The new option values. */
	_resetExtraLabels: function(base, options) {
		var changingLabels = false;
		for (var n in options) {
			if (n != 'whichLabels' && n.match(/[Ll]abels/)) {
				changingLabels = true;
				break;
			}
		}
		if (changingLabels) {
			for (var n in base) { // Remove custom numbered labels
				if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
					base[n] = null;
				}
			}
		}
	},
	
		/** Calculate internal settings for an instance.
			@private
			@param elem {jQuery} The containing division.
			@param inst {object} The current settings for this instance.
			@param recalc {boolean} True if until or since are set. */
		_adjustSettings: function(elem, inst, recalc) {
		var now;
		var serverOffset = 0;
		var serverEntry = null;
		for (var i = 0; i < this._serverSyncs.length; i++) {
			if (this._serverSyncs[i][0] == inst.options.serverSync) {
				serverEntry = this._serverSyncs[i][1];
				break;
			}
		}
		if (serverEntry != null) {
			serverOffset = (inst.options.serverSync ? serverEntry : 0);
			now = new Date();
		}
		else {
			var serverResult = ($.isFunction(inst.options.serverSync) ?
					inst.options.serverSync.apply(elem[0], []) : null);
			now = new Date();
			serverOffset = (serverResult ? now.getTime() - serverResult.getTime() : 0);
			this._serverSyncs.push([inst.options.serverSync, serverOffset]);
		}
		var timezone = inst.options.timezone;
		timezone = (timezone == null ? -now.getTimezoneOffset() : timezone);
		if (recalc || (!recalc && inst._until == null && inst._since == null)) {
			inst._since = inst.options.since;
			if (inst._since != null) {
				inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null));
				if (inst._since && serverOffset) {
					inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset);
				}
			}
			inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now));
			if (serverOffset) {
				inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset);
			}
		}
		inst._show = this._determineShow(inst);
	},

		/** Remove the countdown widget from a div.
			@param elem {jQuery} The containing division.
			@param inst {object} The current instance object. */
		_preDestroy: function(elem, inst) {
			this._removeElem(elem[0]);
			elem.empty();
	},

		/** Pause a countdown widget at the current time.
	   Stop it running but remember and display the current time.
			@param elem {Element} The containing division.
			@example $(selector).countdown('pause') */
		pause: function(elem) {
			this._hold(elem, 'pause');
	},

		/** Pause a countdown widget at the current time.
	   Stop the display but keep the countdown running.
			@param elem {Element} The containing division.
			@example $(selector).countdown('lap') */
		lap: function(elem) {
			this._hold(elem, 'lap');
		},

		/** Resume a paused countdown widget.
			@param elem {Element} The containing division.
			@example $(selector).countdown('resume') */
		resume: function(elem) {
			this._hold(elem, null);
		},

		/** Toggle a paused countdown widget.
			@param elem {Element} The containing division.
			@example $(selector).countdown('toggle') */
		toggle: function(elem) {
			var inst = $.data(elem, this.name) || {};
			this[!inst._hold ? 'pause' : 'resume'](elem);
		},

		/** Toggle a lapped countdown widget.
			@param elem {Element} The containing division.
			@example $(selector).countdown('toggleLap') */
		toggleLap: function(elem) {
			var inst = $.data(elem, this.name) || {};
			this[!inst._hold ? 'lap' : 'resume'](elem);
		},

		/** Pause or resume a countdown widget.
			@private
			@param elem {Element} The containing division.
			@param hold {string} The new hold setting. */
		_hold: function(elem, hold) {
			var inst = $.data(elem, this.name);
		if (inst) {
			if (inst._hold == 'pause' && !hold) {
				inst._periods = inst._savePeriods;
				var sign = (inst._since ? '-' : '+');
				inst[inst._since ? '_since' : '_until'] =
					this._determineTime(sign + inst._periods[0] + 'y' +
						sign + inst._periods[1] + 'o' + sign + inst._periods[2] + 'w' +
						sign + inst._periods[3] + 'd' + sign + inst._periods[4] + 'h' + 
						sign + inst._periods[5] + 'm' + sign + inst._periods[6] + 's');
					this._addElem(elem);
			}
			inst._hold = hold;
			inst._savePeriods = (hold == 'pause' ? inst._periods : null);
				$.data(elem, this.name, inst);
				this._updateCountdown(elem, inst);
		}
	},

		/** Return the current time periods.
			@param elem {Element} The containing division.
			@return {number[]} The current periods for the countdown.
			@example var periods = $(selector).countdown('getTimes') */
		getTimes: function(elem) {
			var inst = $.data(elem, this.name);
		return (!inst ? null : (inst._hold == 'pause' ? inst._savePeriods : (!inst._hold ? inst._periods :
			this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()))));
	},

		/** A time may be specified as an exact value or a relative one.
			@private
			@param setting {string|number|Date} The date/time value as a relative or absolute value.
			@param defaultTime {Date} The date/time to use if no other is supplied.
			@return {Date} The corresponding date/time. */
	_determineTime: function(setting, defaultTime) {
			var self = this;
		var offsetNumeric = function(offset) { // e.g. +300, -2
			var time = new Date();
			time.setTime(time.getTime() + offset * 1000);
			return time;
		};
		var offsetString = function(offset) { // e.g. '+2d', '-4w', '+3h +30m'
			offset = offset.toLowerCase();
			var time = new Date();
			var year = time.getFullYear();
			var month = time.getMonth();
			var day = time.getDate();
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
			var matches = pattern.exec(offset);
			while (matches) {
				switch (matches[2] || 's') {
					case 's': second += parseInt(matches[1], 10); break;
					case 'm': minute += parseInt(matches[1], 10); break;
					case 'h': hour += parseInt(matches[1], 10); break;
					case 'd': day += parseInt(matches[1], 10); break;
					case 'w': day += parseInt(matches[1], 10) * 7; break;
					case 'o':
						month += parseInt(matches[1], 10); 
							day = Math.min(day, self._getDaysInMonth(year, month));
						break;
					case 'y':
						year += parseInt(matches[1], 10);
							day = Math.min(day, self._getDaysInMonth(year, month));
						break;
				}
				matches = pattern.exec(offset);
			}
			return new Date(year, month, day, hour, minute, second, 0);
		};
		var time = (setting == null ? defaultTime :
			(typeof setting == 'string' ? offsetString(setting) :
			(typeof setting == 'number' ? offsetNumeric(setting) : setting)));
		if (time) time.setMilliseconds(0);
		return time;
	},

		/** Determine the number of days in a month.
			@private
			@param year {number} The year.
			@param month {number} The month.
			@return {number} The days in that month. */
	_getDaysInMonth: function(year, month) {
		return 32 - new Date(year, month, 32).getDate();
	},

		/** Default implementation to determine which set of labels should be used for an amount.
			Use the <code>labels</code> attribute with the same numeric suffix (if it exists).
			@private
			@param num {number} The amount to be displayed.
			@return {number} The set of labels to be used for this amount. */
	_normalLabels: function(num) {
		return num;
	},

		/** Generate the HTML to display the countdown widget.
			@private
			@param inst {object} The current settings for this instance.
			@return {string} The new HTML for the countdown display. */
	_generateHTML: function(inst) {
		var self = this;
		// Determine what to show
		inst._periods = (inst._hold ? inst._periods :
			this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()));
		// Show all 'asNeeded' after first non-zero value
		var shownNonZero = false;
		var showCount = 0;
		var sigCount = inst.options.significant;
		var show = $.extend({}, inst._show);
		for (var period = Y; period <= S; period++) {
			shownNonZero |= (inst._show[period] == '?' && inst._periods[period] > 0);
			show[period] = (inst._show[period] == '?' && !shownNonZero ? null : inst._show[period]);
			showCount += (show[period] ? 1 : 0);
			sigCount -= (inst._periods[period] > 0 ? 1 : 0);
		}
		var showSignificant = [false, false, false, false, false, false, false];
		for (var period = S; period >= Y; period--) { // Determine significant periods
			if (inst._show[period]) {
				if (inst._periods[period]) {
					showSignificant[period] = true;
				}
				else {
					showSignificant[period] = sigCount > 0;
					sigCount--;
				}
			}
		}
		var labels = (inst.options.compact ? inst.options.compactLabels : inst.options.labels);
		var whichLabels = inst.options.whichLabels || this._normalLabels;
		var showCompact = function(period) {
			var labelsNum = inst.options['compactLabels' + whichLabels(inst._periods[period])];
			return (show[period] ? self._translateDigits(inst, inst._periods[period]) +
				(labelsNum ? labelsNum[period] : labels[period]) + ' ' : '');
		};
		var minDigits = (inst.options.padZeroes ? 2 : 1);
		var showFull = function(period) {
			var labelsNum = inst.options['labels' + whichLabels(inst._periods[period])];
			return ((!inst.options.significant && show[period]) ||
				(inst.options.significant && showSignificant[period]) ?
					'<span class="' + self._sectionClass + '">' +
					'<span class="' + self._amountClass + '">' +
				self._minDigits(inst, inst._periods[period], minDigits) + '</span>' +
				'<span class="' + self._periodClass + '">' +
				(labelsNum ? labelsNum[period] : labels[period]) + '</span></span>' : '');
		};
		return (inst.options.layout ? this._buildLayout(inst, show, inst.options.layout,
			inst.options.compact, inst.options.significant, showSignificant) :
			((inst.options.compact ? // Compact version
			'<span class="' + this._rowClass + ' ' + this._amountClass +
			(inst._hold ? ' ' + this._holdingClass : '') + '">' + 
			showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + 
			(show[H] ? this._minDigits(inst, inst._periods[H], 2) : '') +
			(show[M] ? (show[H] ? inst.options.timeSeparator : '') +
			this._minDigits(inst, inst._periods[M], 2) : '') +
			(show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : '') +
			this._minDigits(inst, inst._periods[S], 2) : '') :
			// Full version
			'<span class="' + this._rowClass + ' ' + this._showClass + (inst.options.significant || showCount) +
			(inst._hold ? ' ' + this._holdingClass : '') + '">' +
			showFull(Y) + showFull(O) + showFull(W) + showFull(D) +
			showFull(H) + showFull(M) + showFull(S)) + '</span>' +
			(inst.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' +
			inst.options.description + '</span>' : '')));
	},

		/** Construct a custom layout.
			@private
			@param inst {object} The current settings for this instance.
			@param show {boolean[]} Flags indicating which periods are requested.
			@param layout {string} The customised layout.
			@param compact {boolean} True if using compact labels.
			@param significant {number} The number of periods with values to show, zero for all.
			@param showSignificant {boolean[]} Other periods to show for significance.
			@return {string} The custom HTML. */
	_buildLayout: function(inst, show, layout, compact, significant, showSignificant) {
		var labels = inst.options[compact ? 'compactLabels' : 'labels'];
		var whichLabels = inst.options.whichLabels || this._normalLabels;
		var labelFor = function(index) {
			return (inst.options[(compact ? 'compactLabels' : 'labels') +
				whichLabels(inst._periods[index])] || labels)[index];
		};
		var digit = function(value, position) {
			return inst.options.digits[Math.floor(value / position) % 10];
		};
		var subs = {desc: inst.options.description, sep: inst.options.timeSeparator,
			yl: labelFor(Y), yn: this._minDigits(inst, inst._periods[Y], 1),
			ynn: this._minDigits(inst, inst._periods[Y], 2),
			ynnn: this._minDigits(inst, inst._periods[Y], 3), y1: digit(inst._periods[Y], 1),
			y10: digit(inst._periods[Y], 10), y100: digit(inst._periods[Y], 100),
			y1000: digit(inst._periods[Y], 1000),
			ol: labelFor(O), on: this._minDigits(inst, inst._periods[O], 1),
			onn: this._minDigits(inst, inst._periods[O], 2),
			onnn: this._minDigits(inst, inst._periods[O], 3), o1: digit(inst._periods[O], 1),
			o10: digit(inst._periods[O], 10), o100: digit(inst._periods[O], 100),
			o1000: digit(inst._periods[O], 1000),
			wl: labelFor(W), wn: this._minDigits(inst, inst._periods[W], 1),
			wnn: this._minDigits(inst, inst._periods[W], 2),
			wnnn: this._minDigits(inst, inst._periods[W], 3), w1: digit(inst._periods[W], 1),
			w10: digit(inst._periods[W], 10), w100: digit(inst._periods[W], 100),
			w1000: digit(inst._periods[W], 1000),
			dl: labelFor(D), dn: this._minDigits(inst, inst._periods[D], 1),
			dnn: this._minDigits(inst, inst._periods[D], 2),
			dnnn: this._minDigits(inst, inst._periods[D], 3), d1: digit(inst._periods[D], 1),
			d10: digit(inst._periods[D], 10), d100: digit(inst._periods[D], 100),
			d1000: digit(inst._periods[D], 1000),
			hl: labelFor(H), hn: this._minDigits(inst, inst._periods[H], 1),
			hnn: this._minDigits(inst, inst._periods[H], 2),
			hnnn: this._minDigits(inst, inst._periods[H], 3), h1: digit(inst._periods[H], 1),
			h10: digit(inst._periods[H], 10), h100: digit(inst._periods[H], 100),
			h1000: digit(inst._periods[H], 1000),
			ml: labelFor(M), mn: this._minDigits(inst, inst._periods[M], 1),
			mnn: this._minDigits(inst, inst._periods[M], 2),
			mnnn: this._minDigits(inst, inst._periods[M], 3), m1: digit(inst._periods[M], 1),
			m10: digit(inst._periods[M], 10), m100: digit(inst._periods[M], 100),
			m1000: digit(inst._periods[M], 1000),
			sl: labelFor(S), sn: this._minDigits(inst, inst._periods[S], 1),
			snn: this._minDigits(inst, inst._periods[S], 2),
			snnn: this._minDigits(inst, inst._periods[S], 3), s1: digit(inst._periods[S], 1),
			s10: digit(inst._periods[S], 10), s100: digit(inst._periods[S], 100),
			s1000: digit(inst._periods[S], 1000)};
		var html = layout;
		// Replace period containers: {p<}...{p>}
		for (var i = Y; i <= S; i++) {
			var period = 'yowdhms'.charAt(i);
			var re = new RegExp('\\{' + period + '<\\}([\\s\\S]*)\\{' + period + '>\\}', 'g');
			html = html.replace(re, ((!significant && show[i]) ||
				(significant && showSignificant[i]) ? '$1' : ''));
		}
		// Replace period values: {pn}
		$.each(subs, function(n, v) {
			var re = new RegExp('\\{' + n + '\\}', 'g');
			html = html.replace(re, v);
		});
		return html;
	},

		/** Ensure a numeric value has at least n digits for display.
			@private
			@param inst {object} The current settings for this instance.
			@param value {number} The value to display.
			@param len {number} The minimum length.
			@return {string} The display text. */
	_minDigits: function(inst, value, len) {
		value = '' + value;
		if (value.length >= len) {
			return this._translateDigits(inst, value);
		}
		value = '0000000000' + value;
		return this._translateDigits(inst, value.substr(value.length - len));
	},

		/** Translate digits into other representations.
			@private
			@param inst {object} The current settings for this instance.
			@param value {string} The text to translate.
			@return {string} The translated text. */
	_translateDigits: function(inst, value) {
		return ('' + value).replace(/[0-9]/g, function(digit) {
				return inst.options.digits[digit];
			});
	},

		/** Translate the format into flags for each period.
			@private
			@param inst {object} The current settings for this instance.
			@return {string[]} Flags indicating which periods are requested (?) or
					required (!) by year, month, week, day, hour, minute, second. */
	_determineShow: function(inst) {
		var format = inst.options.format;
		var show = [];
		show[Y] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
		show[O] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
		show[W] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
		show[D] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
		show[H] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
		show[M] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
		show[S] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
		return show;
	},
	
		/** Calculate the requested periods between now and the target time.
			@private
			@param inst {object} The current settings for this instance.
			@param show {string[]} Flags indicating which periods are requested/required.
			@param significant {number} The number of periods with values to show, zero for all.
			@param now {Date} The current date and time.
			@return {number[]} The current time periods (always positive)
					by year, month, week, day, hour, minute, second. */
	_calculatePeriods: function(inst, show, significant, now) {
		// Find endpoints
		inst._now = now;
		inst._now.setMilliseconds(0);
		var until = new Date(inst._now.getTime());
		if (inst._since) {
			if (now.getTime() < inst._since.getTime()) {
				inst._now = now = until;
			}
			else {
				now = inst._since;
			}
		}
		else {
			until.setTime(inst._until.getTime());
			if (now.getTime() > inst._until.getTime()) {
				inst._now = now = until;
			}
		}
		// Calculate differences by period
		var periods = [0, 0, 0, 0, 0, 0, 0];
		if (show[Y] || show[O]) {
			// Treat end of months as the same
				var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth());
				var lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth());
			var sameDay = (until.getDate() == now.getDate() ||
				(until.getDate() >= Math.min(lastNow, lastUntil) &&
				now.getDate() >= Math.min(lastNow, lastUntil)));
			var getSecs = function(date) {
				return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
			};
			var months = Math.max(0,
				(until.getFullYear() - now.getFullYear()) * 12 + until.getMonth() - now.getMonth() +
				((until.getDate() < now.getDate() && !sameDay) ||
				(sameDay && getSecs(until) < getSecs(now)) ? -1 : 0));
			periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
			periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
			// Adjust for months difference and end of month if necessary
			now = new Date(now.getTime());
			var wasLastDay = (now.getDate() == lastNow);
				var lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y],
				now.getMonth() + periods[O]);
			if (now.getDate() > lastDay) {
				now.setDate(lastDay);
			}
			now.setFullYear(now.getFullYear() + periods[Y]);
			now.setMonth(now.getMonth() + periods[O]);
			if (wasLastDay) {
				now.setDate(lastDay);
			}
		}
		var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
		var extractPeriod = function(period, numSecs) {
			periods[period] = (show[period] ? Math.floor(diff / numSecs) : 0);
			diff -= periods[period] * numSecs;
		};
		extractPeriod(W, 604800);
		extractPeriod(D, 86400);
		extractPeriod(H, 3600);
		extractPeriod(M, 60);
		extractPeriod(S, 1);
		if (diff > 0 && !inst._since) { // Round up if left overs
			var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
			var lastShown = S;
			var max = 1;
			for (var period = S; period >= Y; period--) {
				if (show[period]) {
					if (periods[lastShown] >= max) {
						periods[lastShown] = 0;
						diff = 1;
					}
					if (diff > 0) {
						periods[period]++;
						diff = 0;
						lastShown = period;
						max = 1;
					}
				}
				max *= multiplier[period];
			}
		}
		if (significant) { // Zero out insignificant periods
			for (var period = Y; period <= S; period++) {
				if (significant && periods[period]) {
					significant--;
				}
				else if (!significant) {
					periods[period] = 0;
				}
			}
		}
		return periods;
	}
	});

})(jQuery);
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ===================================================
 * bootstrap-transition.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-alert.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */



!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);
/* ========================================================
 * bootstrap-tab.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
/* ============================================================
 * bootstrap-button.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-typeahead.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */



!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);













(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = __bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var _ref;
      if ((value > (_ref = this.value) && _ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return "" + this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    return $("a[rel~=tooltip], .has-tooltip").tooltip();
  });

}).call(this);

var CKEDITOR_BASEPATH = '/assets/ckeditor/';
(function() {
  CKEDITOR.editorConfig = function(config) {
    config.filebrowserBrowseUrl = "/ckeditor/attachment_files";
    config.filebrowserFlashBrowseUrl = "/ckeditor/attachment_files";
    config.filebrowserFlashUploadUrl = "/ckeditor/attachment_files";
    config.filebrowserImageBrowseLinkUrl = "/ckeditor/pictures";
    config.filebrowserImageBrowseUrl = "/ckeditor/pictures";
    config.filebrowserImageUploadUrl = "/ckeditor/pictures";
    config.filebrowserUploadUrl = "/ckeditor/attachment_files";
    config.toolbar_Pure = [
      '/', {
        name: 'basicstyles',
        items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
      }, {
        name: 'paragraph',
        items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
      }, {
        name: 'links',
        items: ['Link', 'Unlink']
      }, '/', {
        name: 'styles',
        items: ['Styles', 'Format', 'Font', 'FontSize']
      }, {
        name: 'colors',
        items: ['TextColor', 'BGColor']
      }, {
        name: 'insert',
        items: ['Image', 'Table', 'HorizontalRule', 'PageBreak']
      }
    ];
    config.toolbar = 'Pure';
    return true;
  };

}).call(this);
(function() {
  jQuery(function() {
    var subtopics, topics;
    $('#question_topiccode').parent().hide();
    topics = $('#question_topiccode').html();
    $('#question_subjectcode').change(function() {
      var options, soptions, subject;
      subject = $('#question_subjectcode :selected').text();
      if (subject !== 'All') {
        options = '<option value=1>All topics</option>';
      }
      options += $(topics).filter("optgroup[label='" + subject + "']").html();
      soptions = '<option value=1>All Subtopics</option>';
      $('#question_topiccode').empty();
      $('#question_topiccode').parent().hide();
      $('#question_stopiccode').parent().hide();
      if (options && subject !== 'All') {
        $('#question_topiccode').html(options);
        return $('#question_topiccode').parent().show();
      }
    });
    $('#question_stopiccode').parent().hide();
    subtopics = $('#question_stopiccode').html();
    return $('#question_topiccode').change(function() {
      var soptions, topic;
      topic = $('#question_topiccode :selected').text();
      if (topic !== 'All Topics') {
        soptions = '<option value=1>All Subtopics</option>';
      }
      soptions += $(subtopics).filter("optgroup[label='" + topic + "']").html();
      if (soptions && topic !== 'All Topics') {
        $('#question_stopiccode').html(soptions);
        return $('#question_stopiccode').parent().show();
      } else {
        $('#question_stopiccode').empty();
        return $('#question_stopiccode').parent().hide();
      }
    });
  });

}).call(this);
(function() {
  jQuery(function() {
    var subtopics, topics;
    $('#question_topiccode').parent().hide();
    topics = $('#question_topiccode').html();
    $('#question_subject').change(function() {
      var options, soptions, subject;
      subject = $('#question_subject :selected').text();
      if (subject !== 'All') {
        options = '<option value=1>All topics</option>';
      }
      options += $(topics).filter("optgroup[label='" + subject + "']").html();
      soptions = '<option value=1>All Subtopics</option>';
      $('#question_topiccode').empty();
      $('#question_stopic').empty();
      $('#question_topiccode').parent().hide();
      $('#question_stopic').parent().hide();
      if (options && subject !== 'All') {
        $('#question_topiccode').html(options);
        return $('#question_topiccode').parent().show();
      }
    });
    $('#question_stopic').parent().hide();
    subtopics = $('#question_stopic').html();
    $('#question_topiccode').change(function() {
      var soptions, topic;
      topic = $('#question_topiccode :selected').text();
      if (topic !== 'All Topics') {
        soptions = '<option value=1>All Subtopics</option>';
      }
      soptions += $(subtopics).filter("optgroup[label='" + topic + "']").html();
      if (soptions && topic !== 'All Topics') {
        $('#question_stopic').html(soptions);
        return $('#question_stopic').parent().show();
      } else {
        $('#question_stopic').empty();
        return $('#question_stopic').parent().hide();
      }
    });
    return $('#untilt').countdown({
      until: '+90m',
      format: 'MS',
      compact: true
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);



(function() {
  if (typeof window['CKEDITOR_BASEPATH'] === "undefined" || window['CKEDITOR_BASEPATH'] === null) {
    window['CKEDITOR_BASEPATH'] = "/assets/ckeditor/";
  }
}).call(this);
/*
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/

(function(){if(window.CKEDITOR&&window.CKEDITOR.dom)return;window.CKEDITOR||(window.CKEDITOR=function(){var a=/(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,e={timestamp:"EAPE",version:"4.4.6",revision:"08188c4",rnd:Math.floor(900*Math.random())+100,_:{pending:[],basePathSrcPattern:a},status:"unloaded",basePath:function(){var f=window.CKEDITOR_BASEPATH||"";if(!f)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var b=d[c].src.match(a);if(b){f=b[1];break}}-1==f.indexOf(":/")&&"//"!=f.slice(0,2)&&(f=0===f.indexOf("/")?location.href.match(/^.*?:\/\/[^\/]*/)[0]+
f:location.href.match(/^[^\?]*\/(?:)/)[0]+f);if(!f)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return f}(),getUrl:function(a){-1==a.indexOf(":/")&&0!==a.indexOf("/")&&(a=this.basePath+a);this.timestamp&&("/"!=a.charAt(a.length-1)&&!/[&?]t=/.test(a))&&(a+=(0<=a.indexOf("?")?"&":"?")+"t="+this.timestamp);return a},domReady:function(){function a(){try{document.addEventListener?(document.removeEventListener("DOMContentLoaded",
a,!1),d()):document.attachEvent&&"complete"===document.readyState&&(document.detachEvent("onreadystatechange",a),d())}catch(c){}}function d(){for(var a;a=c.shift();)a()}var c=[];return function(d){function b(){try{document.documentElement.doScroll("left")}catch(m){setTimeout(b,1);return}a()}c.push(d);"complete"===document.readyState&&setTimeout(a,1);if(1==c.length)if(document.addEventListener)document.addEventListener("DOMContentLoaded",a,!1),window.addEventListener("load",a,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",
a);window.attachEvent("onload",a);d=!1;try{d=!window.frameElement}catch(e){}document.documentElement.doScroll&&d&&b()}}}()},b=window.CKEDITOR_GETURL;if(b){var c=e.getUrl;e.getUrl=function(a){return b.call(e,a)||c.call(e,a)}}return e}());
CKEDITOR.event||(CKEDITOR.event=function(){},CKEDITOR.event.implementOn=function(a){var e=CKEDITOR.event.prototype,b;for(b in e)a[b]==null&&(a[b]=e[b])},CKEDITOR.event.prototype=function(){function a(a){var f=e(this);return f[a]||(f[a]=new b(a))}var e=function(a){a=a.getPrivate&&a.getPrivate()||a._||(a._={});return a.events||(a.events={})},b=function(a){this.name=a;this.listeners=[]};b.prototype={getListenerIndex:function(a){for(var f=0,d=this.listeners;f<d.length;f++)if(d[f].fn==a)return f;return-1}};
return{define:function(b,f){var d=a.call(this,b);CKEDITOR.tools.extend(d,f,true)},on:function(b,f,d,e,l){function i(a,m,t,j){a={name:b,sender:this,editor:a,data:m,listenerData:e,stop:t,cancel:j,removeListener:g};return f.call(d,a)===false?false:a.data}function g(){t.removeListener(b,f)}var m=a.call(this,b);if(m.getListenerIndex(f)<0){m=m.listeners;d||(d=this);isNaN(l)&&(l=10);var t=this;i.fn=f;i.priority=l;for(var s=m.length-1;s>=0;s--)if(m[s].priority<=l){m.splice(s+1,0,i);return{removeListener:g}}m.unshift(i)}return{removeListener:g}},
once:function(){var a=Array.prototype.slice.call(arguments),f=a[1];a[1]=function(a){a.removeListener();return f.apply(this,arguments)};return this.on.apply(this,a)},capture:function(){CKEDITOR.event.useCapture=1;var a=this.on.apply(this,arguments);CKEDITOR.event.useCapture=0;return a},fire:function(){var a=0,f=function(){a=1},d=0,b=function(){d=1};return function(l,i,g){var m=e(this)[l],l=a,t=d;a=d=0;if(m){var s=m.listeners;if(s.length)for(var s=s.slice(0),y,p=0;p<s.length;p++){if(m.errorProof)try{y=
s[p].call(this,g,i,f,b)}catch(q){}else y=s[p].call(this,g,i,f,b);y===false?d=1:typeof y!="undefined"&&(i=y);if(a||d)break}}i=d?false:typeof i=="undefined"?true:i;a=l;d=t;return i}}(),fireOnce:function(a,f,d){f=this.fire(a,f,d);delete e(this)[a];return f},removeListener:function(a,f){var d=e(this)[a];if(d){var b=d.getListenerIndex(f);b>=0&&d.listeners.splice(b,1)}},removeAllListeners:function(){var a=e(this),f;for(f in a)delete a[f]},hasListeners:function(a){return(a=e(this)[a])&&a.listeners.length>
0}}}());CKEDITOR.editor||(CKEDITOR.editor=function(){CKEDITOR._.pending.push([this,arguments]);CKEDITOR.event.call(this)},CKEDITOR.editor.prototype.fire=function(a,e){a in{instanceReady:1,loaded:1}&&(this[a]=true);return CKEDITOR.event.prototype.fire.call(this,a,e,this)},CKEDITOR.editor.prototype.fireOnce=function(a,e){a in{instanceReady:1,loaded:1}&&(this[a]=true);return CKEDITOR.event.prototype.fireOnce.call(this,a,e,this)},CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
CKEDITOR.env||(CKEDITOR.env=function(){var a=navigator.userAgent.toLowerCase(),e={ie:a.indexOf("trident/")>-1,webkit:a.indexOf(" applewebkit/")>-1,air:a.indexOf(" adobeair/")>-1,mac:a.indexOf("macintosh")>-1,quirks:document.compatMode=="BackCompat"&&(!document.documentMode||document.documentMode<10),mobile:a.indexOf("mobile")>-1,iOS:/(ipad|iphone|ipod)/.test(a),isCustomDomain:function(){if(!this.ie)return false;var a=document.domain,d=window.location.hostname;return a!=d&&a!="["+d+"]"},secure:location.protocol==
"https:"};e.gecko=navigator.product=="Gecko"&&!e.webkit&&!e.ie;if(e.webkit)a.indexOf("chrome")>-1?e.chrome=true:e.safari=true;var b=0;if(e.ie){b=e.quirks||!document.documentMode?parseFloat(a.match(/msie (\d+)/)[1]):document.documentMode;e.ie9Compat=b==9;e.ie8Compat=b==8;e.ie7Compat=b==7;e.ie6Compat=b<7||e.quirks}if(e.gecko){var c=a.match(/rv:([\d\.]+)/);if(c){c=c[1].split(".");b=c[0]*1E4+(c[1]||0)*100+(c[2]||0)*1}}e.air&&(b=parseFloat(a.match(/ adobeair\/(\d+)/)[1]));e.webkit&&(b=parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
e.version=b;e.isCompatible=e.iOS&&b>=534||!e.mobile&&(e.ie&&b>6||e.gecko&&b>=2E4||e.air&&b>=1||e.webkit&&b>=522||false);e.hidpi=window.devicePixelRatio>=2;e.needsBrFiller=e.gecko||e.webkit||e.ie&&b>10;e.needsNbspFiller=e.ie&&b<11;e.cssClass="cke_browser_"+(e.ie?"ie":e.gecko?"gecko":e.webkit?"webkit":"unknown");if(e.quirks)e.cssClass=e.cssClass+" cke_browser_quirks";if(e.ie)e.cssClass=e.cssClass+(" cke_browser_ie"+(e.quirks?"6 cke_browser_iequirks":e.version));if(e.air)e.cssClass=e.cssClass+" cke_browser_air";
if(e.iOS)e.cssClass=e.cssClass+" cke_browser_ios";if(e.hidpi)e.cssClass=e.cssClass+" cke_hidpi";return e}());
"unloaded"==CKEDITOR.status&&function(){CKEDITOR.event.implementOn(CKEDITOR);CKEDITOR.loadFullCore=function(){if(CKEDITOR.status!="basic_ready")CKEDITOR.loadFullCore._load=1;else{delete CKEDITOR.loadFullCore;var a=document.createElement("script");a.type="text/javascript";a.src=CKEDITOR.basePath+"ckeditor.js";document.getElementsByTagName("head")[0].appendChild(a)}};CKEDITOR.loadFullCoreTimeout=0;CKEDITOR.add=function(a){(this._.pending||(this._.pending=[])).push(a)};(function(){CKEDITOR.domReady(function(){var a=
CKEDITOR.loadFullCore,e=CKEDITOR.loadFullCoreTimeout;if(a){CKEDITOR.status="basic_ready";a&&a._load?a():e&&setTimeout(function(){CKEDITOR.loadFullCore&&CKEDITOR.loadFullCore()},e*1E3)}})})();CKEDITOR.status="basic_loaded"}();CKEDITOR.dom={};
(function(){var a=[],e=CKEDITOR.env.gecko?"-moz-":CKEDITOR.env.webkit?"-webkit-":CKEDITOR.env.ie?"-ms-":"",b=/&/g,c=/>/g,f=/</g,d=/"/g,h=/&amp;/g,l=/&gt;/g,i=/&lt;/g,g=/&quot;/g;CKEDITOR.on("reset",function(){a=[]});CKEDITOR.tools={arrayCompare:function(a,f){if(!a&&!f)return true;if(!a||!f||a.length!=f.length)return false;for(var d=0;d<a.length;d++)if(a[d]!=f[d])return false;return true},clone:function(a){var f;if(a&&a instanceof Array){f=[];for(var d=0;d<a.length;d++)f[d]=CKEDITOR.tools.clone(a[d]);
return f}if(a===null||typeof a!="object"||a instanceof String||a instanceof Number||a instanceof Boolean||a instanceof Date||a instanceof RegExp||a.nodeType||a.window===a)return a;f=new a.constructor;for(d in a)f[d]=CKEDITOR.tools.clone(a[d]);return f},capitalize:function(a,f){return a.charAt(0).toUpperCase()+(f?a.slice(1):a.slice(1).toLowerCase())},extend:function(a){var f=arguments.length,d,b;if(typeof(d=arguments[f-1])=="boolean")f--;else if(typeof(d=arguments[f-2])=="boolean"){b=arguments[f-1];
f=f-2}for(var c=1;c<f;c++){var e=arguments[c],j;for(j in e)if(d===true||a[j]==null)if(!b||j in b)a[j]=e[j]}return a},prototypedCopy:function(a){var f=function(){};f.prototype=a;return new f},copy:function(a){var f={},d;for(d in a)f[d]=a[d];return f},isArray:function(a){return Object.prototype.toString.call(a)=="[object Array]"},isEmpty:function(a){for(var f in a)if(a.hasOwnProperty(f))return false;return true},cssVendorPrefix:function(a,f,d){if(d)return e+a+":"+f+";"+a+":"+f;d={};d[a]=f;d[e+a]=f;
return d},cssStyleToDomStyle:function(){var a=document.createElement("div").style,f=typeof a.cssFloat!="undefined"?"cssFloat":typeof a.styleFloat!="undefined"?"styleFloat":"float";return function(a){return a=="float"?f:a.replace(/-./g,function(a){return a.substr(1).toUpperCase()})}}(),buildStyleHtml:function(a){for(var a=[].concat(a),f,d=[],b=0;b<a.length;b++)if(f=a[b])/@import|[{}]/.test(f)?d.push("<style>"+f+"</style>"):d.push('<link type="text/css" rel=stylesheet href="'+f+'">');return d.join("")},
htmlEncode:function(a){return(""+a).replace(b,"&amp;").replace(c,"&gt;").replace(f,"&lt;")},htmlDecode:function(a){return a.replace(h,"&").replace(l,">").replace(i,"<")},htmlEncodeAttr:function(a){return a.replace(d,"&quot;").replace(f,"&lt;").replace(c,"&gt;")},htmlDecodeAttr:function(a){return a.replace(g,'"').replace(i,"<").replace(l,">")},getNextNumber:function(){var a=0;return function(){return++a}}(),getNextId:function(){return"cke_"+this.getNextNumber()},override:function(a,f){var d=f(a);d.prototype=
a.prototype;return d},setTimeout:function(a,f,d,b,c){c||(c=window);d||(d=c);return c.setTimeout(function(){b?a.apply(d,[].concat(b)):a.apply(d)},f||0)},trim:function(){var a=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;return function(f){return f.replace(a,"")}}(),ltrim:function(){var a=/^[ \t\n\r]+/g;return function(f){return f.replace(a,"")}}(),rtrim:function(){var a=/[ \t\n\r]+$/g;return function(f){return f.replace(a,"")}}(),indexOf:function(a,f){if(typeof f=="function")for(var d=0,b=a.length;d<b;d++){if(f(a[d]))return d}else{if(a.indexOf)return a.indexOf(f);
d=0;for(b=a.length;d<b;d++)if(a[d]===f)return d}return-1},search:function(a,f){var d=CKEDITOR.tools.indexOf(a,f);return d>=0?a[d]:null},bind:function(a,f){return function(){return a.apply(f,arguments)}},createClass:function(a){var f=a.$,d=a.base,b=a.privates||a._,c=a.proto,a=a.statics;!f&&(f=function(){d&&this.base.apply(this,arguments)});if(b)var e=f,f=function(){var a=this._||(this._={}),f;for(f in b){var d=b[f];a[f]=typeof d=="function"?CKEDITOR.tools.bind(d,this):d}e.apply(this,arguments)};if(d){f.prototype=
this.prototypedCopy(d.prototype);f.prototype.constructor=f;f.base=d;f.baseProto=d.prototype;f.prototype.base=function(){this.base=d.prototype.base;d.apply(this,arguments);this.base=arguments.callee}}c&&this.extend(f.prototype,c,true);a&&this.extend(f,a,true);return f},addFunction:function(f,d){return a.push(function(){return f.apply(d||this,arguments)})-1},removeFunction:function(f){a[f]=null},callFunction:function(f){var d=a[f];return d&&d.apply(window,Array.prototype.slice.call(arguments,1))},cssLength:function(){var a=
/^-?\d+\.?\d*px$/,f;return function(d){f=CKEDITOR.tools.trim(d+"")+"px";return a.test(f)?f:d||""}}(),convertToPx:function(){var a;return function(f){if(!a){a=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>',CKEDITOR.document);CKEDITOR.document.getBody().append(a)}if(!/%$/.test(f)){a.setStyle("width",f);return a.$.clientWidth}return f}}(),repeat:function(a,f){return Array(f+1).join(a)},tryThese:function(){for(var a,
f=0,d=arguments.length;f<d;f++){var b=arguments[f];try{a=b();break}catch(c){}}return a},genKey:function(){return Array.prototype.slice.call(arguments).join("-")},defer:function(a){return function(){var f=arguments,d=this;window.setTimeout(function(){a.apply(d,f)},0)}},normalizeCssText:function(a,f){var d=[],b,c=CKEDITOR.tools.parseCssText(a,true,f);for(b in c)d.push(b+":"+c[b]);d.sort();return d.length?d.join(";")+";":""},convertRgbToHex:function(a){return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,
function(a,f,d,b){a=[f,d,b];for(f=0;f<3;f++)a[f]=("0"+parseInt(a[f],10).toString(16)).slice(-2);return"#"+a.join("")})},parseCssText:function(a,f,d){var b={};if(d){d=new CKEDITOR.dom.element("span");d.setAttribute("style",a);a=CKEDITOR.tools.convertRgbToHex(d.getAttribute("style")||"")}if(!a||a==";")return b;a.replace(/&quot;/g,'"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,d,m){if(f){d=d.toLowerCase();d=="font-family"&&(m=m.toLowerCase().replace(/["']/g,"").replace(/\s*,\s*/g,","));
m=CKEDITOR.tools.trim(m)}b[d]=m});return b},writeCssText:function(a,f){var d,b=[];for(d in a)b.push(d+":"+a[d]);f&&b.sort();return b.join("; ")},objectCompare:function(a,f,d){var b;if(!a&&!f)return true;if(!a||!f)return false;for(b in a)if(a[b]!=f[b])return false;if(!d)for(b in f)if(a[b]!=f[b])return false;return true},objectKeys:function(a){var f=[],d;for(d in a)f.push(d);return f},convertArrayToObject:function(a,f){var d={};arguments.length==1&&(f=true);for(var b=0,c=a.length;b<c;++b)d[a[b]]=f;
return d},fixDomain:function(){for(var a;;)try{a=window.parent.document.domain;break}catch(f){a=a?a.replace(/.+?(?:\.|$)/,""):document.domain;if(!a)break;document.domain=a}return!!a},eventsBuffer:function(a,f){function d(){c=(new Date).getTime();b=false;f()}var b,c=0;return{input:function(){if(!b){var f=(new Date).getTime()-c;f<a?b=setTimeout(d,a-f):d()}},reset:function(){b&&clearTimeout(b);b=c=0}}},enableHtml5Elements:function(a,f){for(var d=["abbr","article","aside","audio","bdi","canvas","data",
"datalist","details","figcaption","figure","footer","header","hgroup","mark","meter","nav","output","progress","section","summary","time","video"],b=d.length,c;b--;){c=a.createElement(d[b]);f&&a.appendChild(c)}},checkIfAnyArrayItemMatches:function(a,f){for(var d=0,b=a.length;d<b;++d)if(a[d].match(f))return true;return false},checkIfAnyObjectPropertyMatches:function(a,f){for(var d in a)if(d.match(f))return true;return false},transparentImageData:"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw=="}})();
CKEDITOR.dtd=function(){var a=CKEDITOR.tools.extend,e=function(a,f){for(var d=CKEDITOR.tools.clone(a),b=1;b<arguments.length;b++){var f=arguments[b],c;for(c in f)delete d[c]}return d},b={},c={},f={address:1,article:1,aside:1,blockquote:1,details:1,div:1,dl:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,table:1,ul:1},d={command:1,link:1,meta:1,noscript:1,script:1,style:1},h={},l={"#":1},i={center:1,dir:1,noframes:1};
a(b,{a:1,abbr:1,area:1,audio:1,b:1,bdi:1,bdo:1,br:1,button:1,canvas:1,cite:1,code:1,command:1,datalist:1,del:1,dfn:1,em:1,embed:1,i:1,iframe:1,img:1,input:1,ins:1,kbd:1,keygen:1,label:1,map:1,mark:1,meter:1,noscript:1,object:1,output:1,progress:1,q:1,ruby:1,s:1,samp:1,script:1,select:1,small:1,span:1,strong:1,sub:1,sup:1,textarea:1,time:1,u:1,"var":1,video:1,wbr:1},l,{acronym:1,applet:1,basefont:1,big:1,font:1,isindex:1,strike:1,style:1,tt:1});a(c,f,b,i);e={a:e(b,{a:1,button:1}),abbr:b,address:c,
area:h,article:c,aside:c,audio:a({source:1,track:1},c),b:b,base:h,bdi:b,bdo:b,blockquote:c,body:c,br:h,button:e(b,{a:1,button:1}),canvas:b,caption:c,cite:b,code:b,col:h,colgroup:{col:1},command:h,datalist:a({option:1},b),dd:c,del:b,details:a({summary:1},c),dfn:b,div:c,dl:{dt:1,dd:1},dt:c,em:b,embed:h,fieldset:a({legend:1},c),figcaption:c,figure:a({figcaption:1},c),footer:c,form:c,h1:b,h2:b,h3:b,h4:b,h5:b,h6:b,head:a({title:1,base:1},d),header:c,hgroup:{h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},hr:h,html:a({head:1,
body:1},c,d),i:b,iframe:l,img:h,input:h,ins:b,kbd:b,keygen:h,label:b,legend:b,li:c,link:h,main:c,map:c,mark:b,menu:a({li:1},c),meta:h,meter:e(b,{meter:1}),nav:c,noscript:a({link:1,meta:1,style:1},b),object:a({param:1},b),ol:{li:1},optgroup:{option:1},option:l,output:b,p:b,param:h,pre:b,progress:e(b,{progress:1}),q:b,rp:b,rt:b,ruby:a({rp:1,rt:1},b),s:b,samp:b,script:l,section:c,select:{optgroup:1,option:1},small:b,source:h,span:b,strong:b,style:l,sub:b,summary:b,sup:b,table:{caption:1,colgroup:1,thead:1,
tfoot:1,tbody:1,tr:1},tbody:{tr:1},td:c,textarea:l,tfoot:{tr:1},th:c,thead:{tr:1},time:e(b,{time:1}),title:l,tr:{th:1,td:1},track:h,u:b,ul:{li:1},"var":b,video:a({source:1,track:1},c),wbr:h,acronym:b,applet:a({param:1},c),basefont:h,big:b,center:c,dialog:h,dir:{li:1},font:b,isindex:h,noframes:c,strike:b,tt:b};a(e,{$block:a({audio:1,dd:1,dt:1,figcaption:1,li:1,video:1},f,i),$blockLimit:{article:1,aside:1,audio:1,body:1,caption:1,details:1,dir:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,
form:1,header:1,hgroup:1,main:1,menu:1,nav:1,ol:1,section:1,table:1,td:1,th:1,tr:1,ul:1,video:1},$cdata:{script:1,style:1},$editable:{address:1,article:1,aside:1,blockquote:1,body:1,details:1,div:1,fieldset:1,figcaption:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,main:1,nav:1,p:1,pre:1,section:1},$empty:{area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1},$inline:b,$list:{dl:1,ol:1,
ul:1},$listItem:{dd:1,dt:1,li:1},$nonBodyContent:a({body:1,head:1,html:1},e.head),$nonEditable:{applet:1,audio:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,param:1,script:1,textarea:1,video:1},$object:{applet:1,audio:1,button:1,hr:1,iframe:1,img:1,input:1,object:1,select:1,table:1,textarea:1,video:1},$removeEmpty:{abbr:1,acronym:1,b:1,bdi:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,mark:1,meter:1,output:1,q:1,ruby:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,
sub:1,sup:1,time:1,tt:1,u:1,"var":1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},$transparent:{a:1,audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1},$intermediate:{caption:1,colgroup:1,dd:1,dt:1,figcaption:1,legend:1,li:1,optgroup:1,option:1,rp:1,rt:1,summary:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}});return e}();CKEDITOR.dom.event=function(a){this.$=a};
CKEDITOR.dom.event.prototype={getKey:function(){return this.$.keyCode||this.$.which},getKeystroke:function(){var a=this.getKey();if(this.$.ctrlKey||this.$.metaKey)a=a+CKEDITOR.CTRL;this.$.shiftKey&&(a=a+CKEDITOR.SHIFT);this.$.altKey&&(a=a+CKEDITOR.ALT);return a},preventDefault:function(a){var e=this.$;e.preventDefault?e.preventDefault():e.returnValue=false;a&&this.stopPropagation()},stopPropagation:function(){var a=this.$;a.stopPropagation?a.stopPropagation():a.cancelBubble=true},getTarget:function(){var a=
this.$.target||this.$.srcElement;return a?new CKEDITOR.dom.node(a):null},getPhase:function(){return this.$.eventPhase||2},getPageOffset:function(){var a=this.getTarget().getDocument().$;return{x:this.$.pageX||this.$.clientX+(a.documentElement.scrollLeft||a.body.scrollLeft),y:this.$.pageY||this.$.clientY+(a.documentElement.scrollTop||a.body.scrollTop)}}};CKEDITOR.CTRL=1114112;CKEDITOR.SHIFT=2228224;CKEDITOR.ALT=4456448;CKEDITOR.EVENT_PHASE_CAPTURING=1;CKEDITOR.EVENT_PHASE_AT_TARGET=2;
CKEDITOR.EVENT_PHASE_BUBBLING=3;CKEDITOR.dom.domObject=function(a){if(a)this.$=a};
CKEDITOR.dom.domObject.prototype=function(){var a=function(a,b){return function(c){typeof CKEDITOR!="undefined"&&a.fire(b,new CKEDITOR.dom.event(c))}};return{getPrivate:function(){var a;if(!(a=this.getCustomData("_")))this.setCustomData("_",a={});return a},on:function(e){var b=this.getCustomData("_cke_nativeListeners");if(!b){b={};this.setCustomData("_cke_nativeListeners",b)}if(!b[e]){b=b[e]=a(this,e);this.$.addEventListener?this.$.addEventListener(e,b,!!CKEDITOR.event.useCapture):this.$.attachEvent&&
this.$.attachEvent("on"+e,b)}return CKEDITOR.event.prototype.on.apply(this,arguments)},removeListener:function(a){CKEDITOR.event.prototype.removeListener.apply(this,arguments);if(!this.hasListeners(a)){var b=this.getCustomData("_cke_nativeListeners"),c=b&&b[a];if(c){this.$.removeEventListener?this.$.removeEventListener(a,c,false):this.$.detachEvent&&this.$.detachEvent("on"+a,c);delete b[a]}}},removeAllListeners:function(){var a=this.getCustomData("_cke_nativeListeners"),b;for(b in a){var c=a[b];this.$.detachEvent?
this.$.detachEvent("on"+b,c):this.$.removeEventListener&&this.$.removeEventListener(b,c,false);delete a[b]}CKEDITOR.event.prototype.removeAllListeners.call(this)}}}();
(function(a){var e={};CKEDITOR.on("reset",function(){e={}});a.equals=function(a){try{return a&&a.$===this.$}catch(c){return false}};a.setCustomData=function(a,c){var f=this.getUniqueId();(e[f]||(e[f]={}))[a]=c;return this};a.getCustomData=function(a){var c=this.$["data-cke-expando"];return(c=c&&e[c])&&a in c?c[a]:null};a.removeCustomData=function(a){var c=this.$["data-cke-expando"],c=c&&e[c],f,d;if(c){f=c[a];d=a in c;delete c[a]}return d?f:null};a.clearCustomData=function(){this.removeAllListeners();
var a=this.$["data-cke-expando"];a&&delete e[a]};a.getUniqueId=function(){return this.$["data-cke-expando"]||(this.$["data-cke-expando"]=CKEDITOR.tools.getNextNumber())};CKEDITOR.event.implementOn(a)})(CKEDITOR.dom.domObject.prototype);
CKEDITOR.dom.node=function(a){return a?new CKEDITOR.dom[a.nodeType==CKEDITOR.NODE_DOCUMENT?"document":a.nodeType==CKEDITOR.NODE_ELEMENT?"element":a.nodeType==CKEDITOR.NODE_TEXT?"text":a.nodeType==CKEDITOR.NODE_COMMENT?"comment":a.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?"documentFragment":"domObject"](a):this};CKEDITOR.dom.node.prototype=new CKEDITOR.dom.domObject;CKEDITOR.NODE_ELEMENT=1;CKEDITOR.NODE_DOCUMENT=9;CKEDITOR.NODE_TEXT=3;CKEDITOR.NODE_COMMENT=8;CKEDITOR.NODE_DOCUMENT_FRAGMENT=11;
CKEDITOR.POSITION_IDENTICAL=0;CKEDITOR.POSITION_DISCONNECTED=1;CKEDITOR.POSITION_FOLLOWING=2;CKEDITOR.POSITION_PRECEDING=4;CKEDITOR.POSITION_IS_CONTAINED=8;CKEDITOR.POSITION_CONTAINS=16;
CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,{appendTo:function(a,e){a.append(this,e);return a},clone:function(a,e){var b=this.$.cloneNode(a),c=function(f){f["data-cke-expando"]&&(f["data-cke-expando"]=false);if(f.nodeType==CKEDITOR.NODE_ELEMENT){e||f.removeAttribute("id",false);if(a)for(var f=f.childNodes,d=0;d<f.length;d++)c(f[d])}};c(b);return new CKEDITOR.dom.node(b)},hasPrevious:function(){return!!this.$.previousSibling},hasNext:function(){return!!this.$.nextSibling},insertAfter:function(a){a.$.parentNode.insertBefore(this.$,
a.$.nextSibling);return a},insertBefore:function(a){a.$.parentNode.insertBefore(this.$,a.$);return a},insertBeforeMe:function(a){this.$.parentNode.insertBefore(a.$,this.$);return a},getAddress:function(a){for(var e=[],b=this.getDocument().$.documentElement,c=this.$;c&&c!=b;){var f=c.parentNode;f&&e.unshift(this.getIndex.call({$:c},a));c=f}return e},getDocument:function(){return new CKEDITOR.dom.document(this.$.ownerDocument||this.$.parentNode.ownerDocument)},getIndex:function(a){function e(a,f){var b=
f?a.nextSibling:a.previousSibling;return!b||b.nodeType!=CKEDITOR.NODE_TEXT?null:b.nodeValue?b:e(b,f)}var b=this.$,c=-1,f;if(!this.$.parentNode||a&&b.nodeType==CKEDITOR.NODE_TEXT&&!b.nodeValue&&!e(b)&&!e(b,true))return-1;do if(!a||!(b!=this.$&&b.nodeType==CKEDITOR.NODE_TEXT&&(f||!b.nodeValue))){c++;f=b.nodeType==CKEDITOR.NODE_TEXT}while(b=b.previousSibling);return c},getNextSourceNode:function(a,e,b){if(b&&!b.call)var c=b,b=function(a){return!a.equals(c)};var a=!a&&this.getFirst&&this.getFirst(),f;
if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&b(this,true)===false)return null;a=this.getNext()}for(;!a&&(f=(f||this).getParent());){if(b&&b(f,true)===false)return null;a=f.getNext()}return!a||b&&b(a)===false?null:e&&e!=a.type?a.getNextSourceNode(false,e,b):a},getPreviousSourceNode:function(a,e,b){if(b&&!b.call)var c=b,b=function(a){return!a.equals(c)};var a=!a&&this.getLast&&this.getLast(),f;if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&b(this,true)===false)return null;a=this.getPrevious()}for(;!a&&
(f=(f||this).getParent());){if(b&&b(f,true)===false)return null;a=f.getPrevious()}return!a||b&&b(a)===false?null:e&&a.type!=e?a.getPreviousSourceNode(false,e,b):a},getPrevious:function(a){var e=this.$,b;do b=(e=e.previousSibling)&&e.nodeType!=10&&new CKEDITOR.dom.node(e);while(b&&a&&!a(b));return b},getNext:function(a){var e=this.$,b;do b=(e=e.nextSibling)&&new CKEDITOR.dom.node(e);while(b&&a&&!a(b));return b},getParent:function(a){var e=this.$.parentNode;return e&&(e.nodeType==CKEDITOR.NODE_ELEMENT||
a&&e.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)?new CKEDITOR.dom.node(e):null},getParents:function(a){var e=this,b=[];do b[a?"push":"unshift"](e);while(e=e.getParent());return b},getCommonAncestor:function(a){if(a.equals(this))return this;if(a.contains&&a.contains(this))return a;var e=this.contains?this:this.getParent();do if(e.contains(a))return e;while(e=e.getParent());return null},getPosition:function(a){var e=this.$,b=a.$;if(e.compareDocumentPosition)return e.compareDocumentPosition(b);if(e==
b)return CKEDITOR.POSITION_IDENTICAL;if(this.type==CKEDITOR.NODE_ELEMENT&&a.type==CKEDITOR.NODE_ELEMENT){if(e.contains){if(e.contains(b))return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;if(b.contains(e))return CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING}if("sourceIndex"in e)return e.sourceIndex<0||b.sourceIndex<0?CKEDITOR.POSITION_DISCONNECTED:e.sourceIndex<b.sourceIndex?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING}for(var e=this.getAddress(),a=a.getAddress(),
b=Math.min(e.length,a.length),c=0;c<=b-1;c++)if(e[c]!=a[c]){if(c<b)return e[c]<a[c]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;break}return e.length<a.length?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING},getAscendant:function(a,e){var b=this.$,c,f;if(!e)b=b.parentNode;if(typeof a=="function"){f=true;c=a}else{f=false;c=function(f){f=typeof f.nodeName=="string"?f.nodeName.toLowerCase():"";return typeof a=="string"?f==
a:f in a}}for(;b;){if(c(f?new CKEDITOR.dom.node(b):b))return new CKEDITOR.dom.node(b);try{b=b.parentNode}catch(d){b=null}}return null},hasAscendant:function(a,e){var b=this.$;if(!e)b=b.parentNode;for(;b;){if(b.nodeName&&b.nodeName.toLowerCase()==a)return true;b=b.parentNode}return false},move:function(a,e){a.append(this.remove(),e)},remove:function(a){var e=this.$,b=e.parentNode;if(b){if(a)for(;a=e.firstChild;)b.insertBefore(e.removeChild(a),e);b.removeChild(e)}return this},replace:function(a){this.insertBefore(a);
a.remove()},trim:function(){this.ltrim();this.rtrim()},ltrim:function(){for(var a;this.getFirst&&(a=this.getFirst());){if(a.type==CKEDITOR.NODE_TEXT){var e=CKEDITOR.tools.ltrim(a.getText()),b=a.getLength();if(e){if(e.length<b){a.split(b-e.length);this.$.removeChild(this.$.firstChild)}}else{a.remove();continue}}break}},rtrim:function(){for(var a;this.getLast&&(a=this.getLast());){if(a.type==CKEDITOR.NODE_TEXT){var e=CKEDITOR.tools.rtrim(a.getText()),b=a.getLength();if(e){if(e.length<b){a.split(e.length);
this.$.lastChild.parentNode.removeChild(this.$.lastChild)}}else{a.remove();continue}}break}if(CKEDITOR.env.needsBrFiller)(a=this.$.lastChild)&&(a.type==1&&a.nodeName.toLowerCase()=="br")&&a.parentNode.removeChild(a)},isReadOnly:function(){var a=this;this.type!=CKEDITOR.NODE_ELEMENT&&(a=this.getParent());if(a&&typeof a.$.isContentEditable!="undefined")return!(a.$.isContentEditable||a.data("cke-editable"));for(;a;){if(a.data("cke-editable"))break;if(a.getAttribute("contentEditable")=="false")return true;
if(a.getAttribute("contentEditable")=="true")break;a=a.getParent()}return!a}});CKEDITOR.dom.window=function(a){CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject;
CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype,{focus:function(){this.$.focus()},getViewPaneSize:function(){var a=this.$.document,e=a.compatMode=="CSS1Compat";return{width:(e?a.documentElement.clientWidth:a.body.clientWidth)||0,height:(e?a.documentElement.clientHeight:a.body.clientHeight)||0}},getScrollPosition:function(){var a=this.$;if("pageXOffset"in a)return{x:a.pageXOffset||0,y:a.pageYOffset||0};a=a.document;return{x:a.documentElement.scrollLeft||a.body.scrollLeft||0,y:a.documentElement.scrollTop||
a.body.scrollTop||0}},getFrame:function(){var a=this.$.frameElement;return a?new CKEDITOR.dom.element.get(a):null}});CKEDITOR.dom.document=function(a){CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.document.prototype=new CKEDITOR.dom.domObject;
CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype,{type:CKEDITOR.NODE_DOCUMENT,appendStyleSheet:function(a){if(this.$.createStyleSheet)this.$.createStyleSheet(a);else{var e=new CKEDITOR.dom.element("link");e.setAttributes({rel:"stylesheet",type:"text/css",href:a});this.getHead().append(e)}},appendStyleText:function(a){if(this.$.createStyleSheet){var e=this.$.createStyleSheet("");e.cssText=a}else{var b=new CKEDITOR.dom.element("style",this);b.append(new CKEDITOR.dom.text(a,this));this.getHead().append(b)}return e||
b.$.sheet},createElement:function(a,e){var b=new CKEDITOR.dom.element(a,this);if(e){e.attributes&&b.setAttributes(e.attributes);e.styles&&b.setStyles(e.styles)}return b},createText:function(a){return new CKEDITOR.dom.text(a,this)},focus:function(){this.getWindow().focus()},getActive:function(){var a;try{a=this.$.activeElement}catch(e){return null}return new CKEDITOR.dom.element(a)},getById:function(a){return(a=this.$.getElementById(a))?new CKEDITOR.dom.element(a):null},getByAddress:function(a,e){for(var b=
this.$.documentElement,c=0;b&&c<a.length;c++){var f=a[c];if(e)for(var d=-1,h=0;h<b.childNodes.length;h++){var l=b.childNodes[h];if(!(e===true&&l.nodeType==3&&l.previousSibling&&l.previousSibling.nodeType==3)){d++;if(d==f){b=l;break}}}else b=b.childNodes[f]}return b?new CKEDITOR.dom.node(b):null},getElementsByTag:function(a,e){!(CKEDITOR.env.ie&&document.documentMode<=8)&&e&&(a=e+":"+a);return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))},getHead:function(){var a=this.$.getElementsByTagName("head")[0];
return a=a?new CKEDITOR.dom.element(a):this.getDocumentElement().append(new CKEDITOR.dom.element("head"),true)},getBody:function(){return new CKEDITOR.dom.element(this.$.body)},getDocumentElement:function(){return new CKEDITOR.dom.element(this.$.documentElement)},getWindow:function(){return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView)},write:function(a){this.$.open("text/html","replace");CKEDITOR.env.ie&&(a=a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,'$&\n<script data-cke-temp="1">('+
CKEDITOR.tools.fixDomain+")();<\/script>"));this.$.write(a);this.$.close()},find:function(a){return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))},findOne:function(a){return(a=this.$.querySelector(a))?new CKEDITOR.dom.element(a):null},_getHtml5ShivFrag:function(){var a=this.getCustomData("html5ShivFrag");if(!a){a=this.$.createDocumentFragment();CKEDITOR.tools.enableHtml5Elements(a,true);this.setCustomData("html5ShivFrag",a)}return a}});CKEDITOR.dom.nodeList=function(a){this.$=a};
CKEDITOR.dom.nodeList.prototype={count:function(){return this.$.length},getItem:function(a){if(a<0||a>=this.$.length)return null;return(a=this.$[a])?new CKEDITOR.dom.node(a):null}};CKEDITOR.dom.element=function(a,e){typeof a=="string"&&(a=(e?e.$:document).createElement(a));CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.element.get=function(a){return(a=typeof a=="string"?document.getElementById(a)||document.getElementsByName(a)[0]:a)&&(a.$?a:new CKEDITOR.dom.element(a))};
CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node;CKEDITOR.dom.element.createFromHtml=function(a,e){var b=new CKEDITOR.dom.element("div",e);b.setHtml(a);return b.getFirst().remove()};
CKEDITOR.dom.element.setMarker=function(a,e,b,c){var f=e.getCustomData("list_marker_id")||e.setCustomData("list_marker_id",CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),d=e.getCustomData("list_marker_names")||e.setCustomData("list_marker_names",{}).getCustomData("list_marker_names");a[f]=e;d[b]=1;return e.setCustomData(b,c)};CKEDITOR.dom.element.clearAllMarkers=function(a){for(var e in a)CKEDITOR.dom.element.clearMarkers(a,a[e],1)};
CKEDITOR.dom.element.clearMarkers=function(a,e,b){var c=e.getCustomData("list_marker_names"),f=e.getCustomData("list_marker_id"),d;for(d in c)e.removeCustomData(d);e.removeCustomData("list_marker_names");if(b){e.removeCustomData("list_marker_id");delete a[f]}};
(function(){function a(a){var d=true;if(!a.$.id){a.$.id="cke_tmp_"+CKEDITOR.tools.getNextNumber();d=false}return function(){d||a.removeAttribute("id")}}function e(a,d){return"#"+a.$.id+" "+d.split(/,\s*/).join(", #"+a.$.id+" ")}function b(a){for(var d=0,b=0,e=c[a].length;b<e;b++)d=d+(parseInt(this.getComputedStyle(c[a][b])||0,10)||0);return d}CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_ELEMENT,addClass:function(a){var d=this.$.className;d&&(RegExp("(?:^|\\s)"+a+"(?:\\s|$)",
"").test(d)||(d=d+(" "+a)));this.$.className=d||a;return this},removeClass:function(a){var d=this.getAttribute("class");if(d){a=RegExp("(?:^|\\s+)"+a+"(?=\\s|$)","i");if(a.test(d))(d=d.replace(a,"").replace(/^\s+/,""))?this.setAttribute("class",d):this.removeAttribute("class")}return this},hasClass:function(a){return RegExp("(?:^|\\s+)"+a+"(?=\\s|$)","").test(this.getAttribute("class"))},append:function(a,d){typeof a=="string"&&(a=this.getDocument().createElement(a));d?this.$.insertBefore(a.$,this.$.firstChild):
this.$.appendChild(a.$);return a},appendHtml:function(a){if(this.$.childNodes.length){var d=new CKEDITOR.dom.element("div",this.getDocument());d.setHtml(a);d.moveChildren(this)}else this.setHtml(a)},appendText:function(a){this.$.text!=null?this.$.text=this.$.text+a:this.append(new CKEDITOR.dom.text(a))},appendBogus:function(a){if(a||CKEDITOR.env.needsBrFiller){for(a=this.getLast();a&&a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(a.getText());)a=a.getPrevious();if(!a||!a.is||!a.is("br")){a=this.getDocument().createElement("br");
CKEDITOR.env.gecko&&a.setAttribute("type","_moz");this.append(a)}}},breakParent:function(a){var d=new CKEDITOR.dom.range(this.getDocument());d.setStartAfter(this);d.setEndAfter(a);a=d.extractContents();d.insertNode(this.remove());a.insertAfterNode(this)},contains:CKEDITOR.env.ie||CKEDITOR.env.webkit?function(a){var d=this.$;return a.type!=CKEDITOR.NODE_ELEMENT?d.contains(a.getParent().$):d!=a.$&&d.contains(a.$)}:function(a){return!!(this.$.compareDocumentPosition(a.$)&16)},focus:function(){function a(){try{this.$.focus()}catch(f){}}
return function(d){d?CKEDITOR.tools.setTimeout(a,100,this):a.call(this)}}(),getHtml:function(){var a=this.$.innerHTML;return CKEDITOR.env.ie?a.replace(/<\?[^>]*>/g,""):a},getOuterHtml:function(){if(this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/,"");var a=this.$.ownerDocument.createElement("div");a.appendChild(this.$.cloneNode(true));return a.innerHTML},getClientRect:function(){var a=CKEDITOR.tools.extend({},this.$.getBoundingClientRect());!a.width&&(a.width=a.right-a.left);!a.height&&
(a.height=a.bottom-a.top);return a},setHtml:CKEDITOR.env.ie&&CKEDITOR.env.version<9?function(a){try{var d=this.$;if(this.getParent())return d.innerHTML=a;var b=this.getDocument()._getHtml5ShivFrag();b.appendChild(d);d.innerHTML=a;b.removeChild(d);return a}catch(c){this.$.innerHTML="";d=new CKEDITOR.dom.element("body",this.getDocument());d.$.innerHTML=a;for(d=d.getChildren();d.count();)this.append(d.getItem(0));return a}}:function(a){return this.$.innerHTML=a},setText:function(){var a=document.createElement("p");
a.innerHTML="x";a=a.textContent;return function(d){this.$[a?"textContent":"innerText"]=d}}(),getAttribute:function(){var a=function(a){return this.$.getAttribute(a,2)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){switch(a){case "class":a="className";break;case "http-equiv":a="httpEquiv";break;case "name":return this.$.name;case "tabindex":a=this.$.getAttribute(a,2);a!==0&&this.$.tabIndex===0&&(a=null);return a;case "checked":a=this.$.attributes.getNamedItem(a);
return(a.specified?a.nodeValue:this.$.checked)?"checked":null;case "hspace":case "value":return this.$[a];case "style":return this.$.style.cssText;case "contenteditable":case "contentEditable":return this.$.attributes.getNamedItem("contentEditable").specified?this.$.getAttribute("contentEditable"):null}return this.$.getAttribute(a,2)}:a}(),getChildren:function(){return new CKEDITOR.dom.nodeList(this.$.childNodes)},getComputedStyle:CKEDITOR.env.ie?function(a){return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]}:
function(a){var d=this.getWindow().$.getComputedStyle(this.$,null);return d?d.getPropertyValue(a):""},getDtd:function(){var a=CKEDITOR.dtd[this.getName()];this.getDtd=function(){return a};return a},getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,getTabIndex:CKEDITOR.env.ie?function(){var a=this.$.tabIndex;a===0&&(!CKEDITOR.dtd.$tabIndex[this.getName()]&&parseInt(this.getAttribute("tabindex"),10)!==0)&&(a=-1);return a}:CKEDITOR.env.webkit?function(){var a=this.$.tabIndex;if(a===void 0){a=
parseInt(this.getAttribute("tabindex"),10);isNaN(a)&&(a=-1)}return a}:function(){return this.$.tabIndex},getText:function(){return this.$.textContent||this.$.innerText||""},getWindow:function(){return this.getDocument().getWindow()},getId:function(){return this.$.id||null},getNameAtt:function(){return this.$.name||null},getName:function(){var a=this.$.nodeName.toLowerCase();if(CKEDITOR.env.ie&&document.documentMode<=8){var d=this.$.scopeName;d!="HTML"&&(a=d.toLowerCase()+":"+a)}this.getName=function(){return a};
return this.getName()},getValue:function(){return this.$.value},getFirst:function(a){var d=this.$.firstChild;(d=d&&new CKEDITOR.dom.node(d))&&(a&&!a(d))&&(d=d.getNext(a));return d},getLast:function(a){var d=this.$.lastChild;(d=d&&new CKEDITOR.dom.node(d))&&(a&&!a(d))&&(d=d.getPrevious(a));return d},getStyle:function(a){return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]},is:function(){var a=this.getName();if(typeof arguments[0]=="object")return!!arguments[0][a];for(var d=0;d<arguments.length;d++)if(arguments[d]==
a)return true;return false},isEditable:function(a){var d=this.getName();if(this.isReadOnly()||this.getComputedStyle("display")=="none"||this.getComputedStyle("visibility")=="hidden"||CKEDITOR.dtd.$nonEditable[d]||CKEDITOR.dtd.$empty[d]||this.is("a")&&(this.data("cke-saved-name")||this.hasAttribute("name"))&&!this.getChildCount())return false;if(a!==false){a=CKEDITOR.dtd[d]||CKEDITOR.dtd.span;return!(!a||!a["#"])}return true},isIdentical:function(a){var d=this.clone(0,1),a=a.clone(0,1);d.removeAttributes(["_moz_dirty",
"data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);a.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);if(d.$.isEqualNode){d.$.style.cssText=CKEDITOR.tools.normalizeCssText(d.$.style.cssText);a.$.style.cssText=CKEDITOR.tools.normalizeCssText(a.$.style.cssText);return d.$.isEqualNode(a.$)}d=d.getOuterHtml();a=a.getOuterHtml();if(CKEDITOR.env.ie&&CKEDITOR.env.version<9&&this.is("a")){var b=this.getParent();if(b.type==CKEDITOR.NODE_ELEMENT){b=
b.clone();b.setHtml(d);d=b.getHtml();b.setHtml(a);a=b.getHtml()}}return d==a},isVisible:function(){var a=(this.$.offsetHeight||this.$.offsetWidth)&&this.getComputedStyle("visibility")!="hidden",d,b;if(a&&CKEDITOR.env.webkit){d=this.getWindow();if(!d.equals(CKEDITOR.document.getWindow())&&(b=d.$.frameElement))a=(new CKEDITOR.dom.element(b)).isVisible()}return!!a},isEmptyInlineRemoveable:function(){if(!CKEDITOR.dtd.$removeEmpty[this.getName()])return false;for(var a=this.getChildren(),d=0,b=a.count();d<
b;d++){var c=a.getItem(d);if(!(c.type==CKEDITOR.NODE_ELEMENT&&c.data("cke-bookmark"))&&(c.type==CKEDITOR.NODE_ELEMENT&&!c.isEmptyInlineRemoveable()||c.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(c.getText())))return false}return true},hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(){for(var a=this.$.attributes,d=0;d<a.length;d++){var b=a[d];switch(b.nodeName){case "class":if(this.getAttribute("class"))return true;case "data-cke-expando":continue;default:if(b.specified)return true}}return false}:
function(){var a=this.$.attributes,d=a.length,b={"data-cke-expando":1,_moz_dirty:1};return d>0&&(d>2||!b[a[0].nodeName]||d==2&&!b[a[1].nodeName])},hasAttribute:function(){function a(d){var f=this.$.attributes.getNamedItem(d);if(this.getName()=="input")switch(d){case "class":return this.$.className.length>0;case "checked":return!!this.$.checked;case "value":d=this.getAttribute("type");return d=="checkbox"||d=="radio"?this.$.value!="on":!!this.$.value}return!f?false:f.specified}return CKEDITOR.env.ie?
CKEDITOR.env.version<8?function(d){return d=="name"?!!this.$.name:a.call(this,d)}:a:function(a){return!!this.$.attributes.getNamedItem(a)}}(),hide:function(){this.setStyle("display","none")},moveChildren:function(a,d){var b=this.$,a=a.$;if(b!=a){var c;if(d)for(;c=b.lastChild;)a.insertBefore(b.removeChild(c),a.firstChild);else for(;c=b.firstChild;)a.appendChild(b.removeChild(c))}},mergeSiblings:function(){function a(d,b,f){if(b&&b.type==CKEDITOR.NODE_ELEMENT){for(var c=[];b.data("cke-bookmark")||b.isEmptyInlineRemoveable();){c.push(b);
b=f?b.getNext():b.getPrevious();if(!b||b.type!=CKEDITOR.NODE_ELEMENT)return}if(d.isIdentical(b)){for(var e=f?d.getLast():d.getFirst();c.length;)c.shift().move(d,!f);b.moveChildren(d,!f);b.remove();e&&e.type==CKEDITOR.NODE_ELEMENT&&e.mergeSiblings()}}}return function(d){if(d===false||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is("a")){a(this,this.getNext(),true);a(this,this.getPrevious())}}}(),show:function(){this.setStyles({display:"",visibility:""})},setAttribute:function(){var a=function(a,
b){this.$.setAttribute(a,b);return this};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(d,b){d=="class"?this.$.className=b:d=="style"?this.$.style.cssText=b:d=="tabindex"?this.$.tabIndex=b:d=="checked"?this.$.checked=b:d=="contenteditable"?a.call(this,"contentEditable",b):a.apply(this,arguments);return this}:CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure?function(d,b){if(d=="src"&&b.match(/^http:\/\//))try{a.apply(this,arguments)}catch(c){}else a.apply(this,arguments);
return this}:a}(),setAttributes:function(a){for(var d in a)this.setAttribute(d,a[d]);return this},setValue:function(a){this.$.value=a;return this},removeAttribute:function(){var a=function(a){this.$.removeAttribute(a)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){a=="class"?a="className":a=="tabindex"?a="tabIndex":a=="contenteditable"&&(a="contentEditable");this.$.removeAttribute(a)}:a}(),removeAttributes:function(a){if(CKEDITOR.tools.isArray(a))for(var b=0;b<
a.length;b++)this.removeAttribute(a[b]);else for(b in a)a.hasOwnProperty(b)&&this.removeAttribute(b)},removeStyle:function(a){var b=this.$.style;if(!b.removeProperty&&(a=="border"||a=="margin"||a=="padding")){var c=["top","left","right","bottom"],e;a=="border"&&(e=["color","style","width"]);for(var b=[],i=0;i<c.length;i++)if(e)for(var g=0;g<e.length;g++)b.push([a,c[i],e[g]].join("-"));else b.push([a,c[i]].join("-"));for(a=0;a<b.length;a++)this.removeStyle(b[a])}else{b.removeProperty?b.removeProperty(a):
b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a));this.$.style.cssText||this.removeAttribute("style")}},setStyle:function(a,b){this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]=b;return this},setStyles:function(a){for(var b in a)this.setStyle(b,a[b]);return this},setOpacity:function(a){if(CKEDITOR.env.ie&&CKEDITOR.env.version<9){a=Math.round(a*100);this.setStyle("filter",a>=100?"":"progid:DXImageTransform.Microsoft.Alpha(opacity="+a+")")}else this.setStyle("opacity",a)},unselectable:function(){this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
"none"));if(CKEDITOR.env.ie){this.setAttribute("unselectable","on");for(var a,b=this.getElementsByTag("*"),c=0,e=b.count();c<e;c++){a=b.getItem(c);a.setAttribute("unselectable","on")}}},getPositionedAncestor:function(){for(var a=this;a.getName()!="html";){if(a.getComputedStyle("position")!="static")return a;a=a.getParent()}return null},getDocumentPosition:function(a){var b=0,c=0,e=this.getDocument(),i=e.getBody(),g=e.$.compatMode=="BackCompat";if(document.documentElement.getBoundingClientRect){var m=
this.$.getBoundingClientRect(),t=e.$.documentElement,s=t.clientTop||i.$.clientTop||0,y=t.clientLeft||i.$.clientLeft||0,p=true;if(CKEDITOR.env.ie){p=e.getDocumentElement().contains(this);e=e.getBody().contains(this);p=g&&e||!g&&p}if(p){b=m.left+(!g&&t.scrollLeft||i.$.scrollLeft);b=b-y;c=m.top+(!g&&t.scrollTop||i.$.scrollTop);c=c-s}}else{i=this;for(e=null;i&&!(i.getName()=="body"||i.getName()=="html");){b=b+(i.$.offsetLeft-i.$.scrollLeft);c=c+(i.$.offsetTop-i.$.scrollTop);if(!i.equals(this)){b=b+(i.$.clientLeft||
0);c=c+(i.$.clientTop||0)}for(;e&&!e.equals(i);){b=b-e.$.scrollLeft;c=c-e.$.scrollTop;e=e.getParent()}e=i;i=(m=i.$.offsetParent)?new CKEDITOR.dom.element(m):null}}if(a){i=this.getWindow();e=a.getWindow();if(!i.equals(e)&&i.$.frameElement){a=(new CKEDITOR.dom.element(i.$.frameElement)).getDocumentPosition(a);b=b+a.x;c=c+a.y}}if(!document.documentElement.getBoundingClientRect&&CKEDITOR.env.gecko&&!g){b=b+(this.$.clientLeft?1:0);c=c+(this.$.clientTop?1:0)}return{x:b,y:c}},scrollIntoView:function(a){var b=
this.getParent();if(b){do{(b.$.clientWidth&&b.$.clientWidth<b.$.scrollWidth||b.$.clientHeight&&b.$.clientHeight<b.$.scrollHeight)&&!b.is("body")&&this.scrollIntoParent(b,a,1);if(b.is("html")){var c=b.getWindow();try{var e=c.$.frameElement;e&&(b=new CKEDITOR.dom.element(e))}catch(i){}}}while(b=b.getParent())}},scrollIntoParent:function(a,b,c){var e,i,g,m;function t(b,d){if(/body|html/.test(a.getName()))a.getWindow().$.scrollBy(b,d);else{a.$.scrollLeft=a.$.scrollLeft+b;a.$.scrollTop=a.$.scrollTop+d}}
function s(a,b){var d={x:0,y:0};if(!a.is(p?"body":"html")){var c=a.$.getBoundingClientRect();d.x=c.left;d.y=c.top}c=a.getWindow();if(!c.equals(b)){c=s(CKEDITOR.dom.element.get(c.$.frameElement),b);d.x=d.x+c.x;d.y=d.y+c.y}return d}function y(a,b){return parseInt(a.getComputedStyle("margin-"+b)||0,10)||0}!a&&(a=this.getWindow());g=a.getDocument();var p=g.$.compatMode=="BackCompat";a instanceof CKEDITOR.dom.window&&(a=p?g.getBody():g.getDocumentElement());g=a.getWindow();i=s(this,g);var q=s(a,g),j=this.$.offsetHeight;
e=this.$.offsetWidth;var u=a.$.clientHeight,v=a.$.clientWidth;g=i.x-y(this,"left")-q.x||0;m=i.y-y(this,"top")-q.y||0;e=i.x+e+y(this,"right")-(q.x+v)||0;i=i.y+j+y(this,"bottom")-(q.y+u)||0;if(m<0||i>0)t(0,b===true?m:b===false?i:m<0?m:i);if(c&&(g<0||e>0))t(g<0?g:e,0)},setState:function(a,b,c){b=b||"cke";switch(a){case CKEDITOR.TRISTATE_ON:this.addClass(b+"_on");this.removeClass(b+"_off");this.removeClass(b+"_disabled");c&&this.setAttribute("aria-pressed",true);c&&this.removeAttribute("aria-disabled");
break;case CKEDITOR.TRISTATE_DISABLED:this.addClass(b+"_disabled");this.removeClass(b+"_off");this.removeClass(b+"_on");c&&this.setAttribute("aria-disabled",true);c&&this.removeAttribute("aria-pressed");break;default:this.addClass(b+"_off");this.removeClass(b+"_on");this.removeClass(b+"_disabled");c&&this.removeAttribute("aria-pressed");c&&this.removeAttribute("aria-disabled")}},getFrameDocument:function(){var a=this.$;try{a.contentWindow.document}catch(b){a.src=a.src}return a&&new CKEDITOR.dom.document(a.contentWindow.document)},
copyAttributes:function(a,b){for(var c=this.$.attributes,b=b||{},e=0;e<c.length;e++){var i=c[e],g=i.nodeName.toLowerCase(),m;if(!(g in b))if(g=="checked"&&(m=this.getAttribute(g)))a.setAttribute(g,m);else if(!CKEDITOR.env.ie||this.hasAttribute(g)){m=this.getAttribute(g);if(m===null)m=i.nodeValue;a.setAttribute(g,m)}}if(this.$.style.cssText!=="")a.$.style.cssText=this.$.style.cssText},renameNode:function(a){if(this.getName()!=a){var b=this.getDocument(),a=new CKEDITOR.dom.element(a,b);this.copyAttributes(a);
this.moveChildren(a);this.getParent()&&this.$.parentNode.replaceChild(a.$,this.$);a.$["data-cke-expando"]=this.$["data-cke-expando"];this.$=a.$;delete this.getName}},getChild:function(){function a(b,c){var f=b.childNodes;if(c>=0&&c<f.length)return f[c]}return function(b){var c=this.$;if(b.slice)for(;b.length>0&&c;)c=a(c,b.shift());else c=a(c,b);return c?new CKEDITOR.dom.node(c):null}}(),getChildCount:function(){return this.$.childNodes.length},disableContextMenu:function(){this.on("contextmenu",function(a){a.data.getTarget().hasClass("cke_enable_context_menu")||
a.data.preventDefault()})},getDirection:function(a){return a?this.getComputedStyle("direction")||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||"ltr":this.getStyle("direction")||this.getAttribute("dir")},data:function(a,b){a="data-"+a;if(b===void 0)return this.getAttribute(a);b===false?this.removeAttribute(a):this.setAttribute(a,b);return null},getEditor:function(){var a=CKEDITOR.instances,b,c;for(b in a){c=a[b];if(c.element.equals(this)&&c.elementMode!=
CKEDITOR.ELEMENT_MODE_APPENDTO)return c}return null},find:function(b){var c=a(this),b=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e(this,b)));c();return b},findOne:function(b){var c=a(this),b=this.$.querySelector(e(this,b));c();return b?new CKEDITOR.dom.element(b):null},forEach:function(a,b,c){if(!c&&(!b||this.type==b))var e=a(this);if(e!==false)for(var c=this.getChildren(),i=0;i<c.count();i++){e=c.getItem(i);e.type==CKEDITOR.NODE_ELEMENT?e.forEach(a,b):(!b||e.type==b)&&a(e)}}});var c={width:["border-left-width",
"border-right-width","padding-left","padding-right"],height:["border-top-width","border-bottom-width","padding-top","padding-bottom"]};CKEDITOR.dom.element.prototype.setSize=function(a,c,e){if(typeof c=="number"){if(e&&(!CKEDITOR.env.ie||!CKEDITOR.env.quirks))c=c-b.call(this,a);this.setStyle(a,c+"px")}};CKEDITOR.dom.element.prototype.getSize=function(a,c){var e=Math.max(this.$["offset"+CKEDITOR.tools.capitalize(a)],this.$["client"+CKEDITOR.tools.capitalize(a)])||0;c&&(e=e-b.call(this,a));return e}})();
CKEDITOR.dom.documentFragment=function(a){a=a||CKEDITOR.document;this.$=a.type==CKEDITOR.NODE_DOCUMENT?a.$.createDocumentFragment():a};
CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,insertAfterNode:function(a){a=a.$;a.parentNode.insertBefore(this.$,a.nextSibling)}},!0,{append:1,appendBogus:1,getFirst:1,getLast:1,getParent:1,getNext:1,getPrevious:1,appendTo:1,moveChildren:1,insertBefore:1,insertAfterNode:1,replace:1,trim:1,type:1,ltrim:1,rtrim:1,getDocument:1,getChildCount:1,getChild:1,getChildren:1});
(function(){function a(a,b){var c=this.range;if(this._.end)return null;if(!this._.start){this._.start=1;if(c.collapsed){this.end();return null}c.optimize()}var d,f=c.startContainer;d=c.endContainer;var m=c.startOffset,e=c.endOffset,h,E=this.guard,k=this.type,n=a?"getPreviousSourceNode":"getNextSourceNode";if(!a&&!this._.guardLTR){var r=d.type==CKEDITOR.NODE_ELEMENT?d:d.getParent(),o=d.type==CKEDITOR.NODE_ELEMENT?d.getChild(e):d.getNext();this._.guardLTR=function(a,b){return(!b||!r.equals(a))&&(!o||
!a.equals(o))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(c.root))}}if(a&&!this._.guardRTL){var g=f.type==CKEDITOR.NODE_ELEMENT?f:f.getParent(),D=f.type==CKEDITOR.NODE_ELEMENT?m?f.getChild(m-1):null:f.getPrevious();this._.guardRTL=function(a,b){return(!b||!g.equals(a))&&(!D||!a.equals(D))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(c.root))}}var i=a?this._.guardRTL:this._.guardLTR;h=E?function(a,b){return i(a,b)===false?false:E(a,b)}:i;if(this.current)d=this.current[n](false,k,h);else{if(a)d.type==
CKEDITOR.NODE_ELEMENT&&(d=e>0?d.getChild(e-1):h(d,true)===false?null:d.getPreviousSourceNode(true,k,h));else{d=f;if(d.type==CKEDITOR.NODE_ELEMENT&&!(d=d.getChild(m)))d=h(f,true)===false?null:f.getNextSourceNode(true,k,h)}d&&h(d)===false&&(d=null)}for(;d&&!this._.end;){this.current=d;if(!this.evaluator||this.evaluator(d)!==false){if(!b)return d}else if(b&&this.evaluator)return false;d=d[n](false,k,h)}this.end();return this.current=null}function e(b){for(var c,d=null;c=a.call(this,b);)d=c;return d}
function b(a){if(g(a))return false;if(a.type==CKEDITOR.NODE_TEXT)return true;if(a.type==CKEDITOR.NODE_ELEMENT){if(a.is(CKEDITOR.dtd.$inline)||a.is("hr")||a.getAttribute("contenteditable")=="false")return true;var b;if(b=!CKEDITOR.env.needsBrFiller)if(b=a.is(m))a:{b=0;for(var c=a.getChildCount();b<c;++b)if(!g(a.getChild(b))){b=false;break a}b=true}if(b)return true}return false}CKEDITOR.dom.walker=CKEDITOR.tools.createClass({$:function(a){this.range=a;this._={}},proto:{end:function(){this._.end=1},
next:function(){return a.call(this)},previous:function(){return a.call(this,1)},checkForward:function(){return a.call(this,0,1)!==false},checkBackward:function(){return a.call(this,1,1)!==false},lastForward:function(){return e.call(this)},lastBackward:function(){return e.call(this,1)},reset:function(){delete this.current;this._={}}}});var c={block:1,"list-item":1,table:1,"table-row-group":1,"table-header-group":1,"table-footer-group":1,"table-row":1,"table-column-group":1,"table-column":1,"table-cell":1,
"table-caption":1},f={absolute:1,fixed:1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(a){return this.getComputedStyle("float")=="none"&&!(this.getComputedStyle("position")in f)&&c[this.getComputedStyle("display")]?true:!!(this.is(CKEDITOR.dtd.$block)||a&&this.is(a))};CKEDITOR.dom.walker.blockBoundary=function(a){return function(b){return!(b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary(a))}};CKEDITOR.dom.walker.listItemBoundary=function(){return this.blockBoundary({br:1})};CKEDITOR.dom.walker.bookmark=
function(a,b){function c(a){return a&&a.getName&&a.getName()=="span"&&a.data("cke-bookmark")}return function(d){var f,m;f=d&&d.type!=CKEDITOR.NODE_ELEMENT&&(m=d.getParent())&&c(m);f=a?f:f||c(d);return!!(b^f)}};CKEDITOR.dom.walker.whitespaces=function(a){return function(b){var c;b&&b.type==CKEDITOR.NODE_TEXT&&(c=!CKEDITOR.tools.trim(b.getText())||CKEDITOR.env.webkit&&b.getText()=="​");return!!(a^c)}};CKEDITOR.dom.walker.invisible=function(a){var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.env.webkit?
1:0;return function(d){if(b(d))d=1;else{d.type==CKEDITOR.NODE_TEXT&&(d=d.getParent());d=d.$.offsetWidth<=c}return!!(a^d)}};CKEDITOR.dom.walker.nodeType=function(a,b){return function(c){return!!(b^c.type==a)}};CKEDITOR.dom.walker.bogus=function(a){function b(a){return!h(a)&&!l(a)}return function(c){var f=CKEDITOR.env.needsBrFiller?c.is&&c.is("br"):c.getText&&d.test(c.getText());if(f){f=c.getParent();c=c.getNext(b);f=f.isBlockBoundary()&&(!c||c.type==CKEDITOR.NODE_ELEMENT&&c.isBlockBoundary())}return!!(a^
f)}};CKEDITOR.dom.walker.temp=function(a){return function(b){b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());b=b&&b.hasAttribute("data-cke-temp");return!!(a^b)}};var d=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,h=CKEDITOR.dom.walker.whitespaces(),l=CKEDITOR.dom.walker.bookmark(),i=CKEDITOR.dom.walker.temp();CKEDITOR.dom.walker.ignored=function(a){return function(b){b=h(b)||l(b)||i(b);return!!(a^b)}};var g=CKEDITOR.dom.walker.ignored(),m=function(a){var b={},c;for(c in a)CKEDITOR.dtd[c]["#"]&&(b[c]=1);return b}(CKEDITOR.dtd.$block);
CKEDITOR.dom.walker.editable=function(a){return function(c){return!!(a^b(c))}};CKEDITOR.dom.element.prototype.getBogus=function(){var a=this;do a=a.getPreviousSourceNode();while(l(a)||h(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$inline)&&!a.is(CKEDITOR.dtd.$empty));return a&&(CKEDITOR.env.needsBrFiller?a.is&&a.is("br"):a.getText&&d.test(a.getText()))?a:false}})();
CKEDITOR.dom.range=function(a){this.endOffset=this.endContainer=this.startOffset=this.startContainer=null;this.collapsed=true;var e=a instanceof CKEDITOR.dom.document;this.document=e?a:a.getDocument();this.root=e?a.getBody():a};
(function(){function a(){var a=false,b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(true),f=CKEDITOR.dom.walker.bogus();return function(e){if(c(e)||b(e))return true;if(f(e)&&!a)return a=true;return e.type==CKEDITOR.NODE_TEXT&&(e.hasAscendant("pre")||CKEDITOR.tools.trim(e.getText()).length)||e.type==CKEDITOR.NODE_ELEMENT&&!e.is(d)?false:true}}function e(a){var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(1);return function(d){return c(d)||b(d)?true:!a&&h(d)||
d.type==CKEDITOR.NODE_ELEMENT&&d.is(CKEDITOR.dtd.$removeEmpty)}}function b(a){return function(){var b;return this[a?"getPreviousNode":"getNextNode"](function(a){!b&&g(a)&&(b=a);return i(a)&&!(h(a)&&a.equals(b))})}}var c=function(a){a.collapsed=a.startContainer&&a.endContainer&&a.startContainer.equals(a.endContainer)&&a.startOffset==a.endOffset},f=function(a,b,c,d){a.optimizeBookmark();var f=a.startContainer,e=a.endContainer,j=a.startOffset,u=a.endOffset,h,g;if(e.type==CKEDITOR.NODE_TEXT)e=e.split(u);
else if(e.getChildCount()>0)if(u>=e.getChildCount()){e=e.append(a.document.createText(""));g=true}else e=e.getChild(u);if(f.type==CKEDITOR.NODE_TEXT){f.split(j);f.equals(e)&&(e=f.getNext())}else if(j)if(j>=f.getChildCount()){f=f.append(a.document.createText(""));h=true}else f=f.getChild(j).getPrevious();else{f=f.append(a.document.createText(""),1);h=true}var j=f.getParents(),u=e.getParents(),k,n,r;for(k=0;k<j.length;k++){n=j[k];r=u[k];if(!n.equals(r))break}for(var o=c,i,D,l,z=k;z<j.length;z++){i=
j[z];o&&!i.equals(f)&&(D=o.append(i.clone()));for(i=i.getNext();i;){if(i.equals(u[z])||i.equals(e))break;l=i.getNext();if(b==2)o.append(i.clone(true));else{i.remove();b==1&&o.append(i)}i=l}o&&(o=D)}o=c;for(c=k;c<u.length;c++){i=u[c];b>0&&!i.equals(e)&&(D=o.append(i.clone()));if(!j[c]||i.$.parentNode!=j[c].$.parentNode)for(i=i.getPrevious();i;){if(i.equals(j[c])||i.equals(f))break;l=i.getPrevious();if(b==2)o.$.insertBefore(i.$.cloneNode(true),o.$.firstChild);else{i.remove();b==1&&o.$.insertBefore(i.$,
o.$.firstChild)}i=l}o&&(o=D)}if(b==2){n=a.startContainer;if(n.type==CKEDITOR.NODE_TEXT){n.$.data=n.$.data+n.$.nextSibling.data;n.$.parentNode.removeChild(n.$.nextSibling)}a=a.endContainer;if(a.type==CKEDITOR.NODE_TEXT&&a.$.nextSibling){a.$.data=a.$.data+a.$.nextSibling.data;a.$.parentNode.removeChild(a.$.nextSibling)}}else{if(n&&r&&(f.$.parentNode!=n.$.parentNode||e.$.parentNode!=r.$.parentNode)){b=r.getIndex();h&&r.$.parentNode==f.$.parentNode&&b--;if(d&&n.type==CKEDITOR.NODE_ELEMENT){d=CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>',
a.document);d.insertAfter(n);n.mergeSiblings(false);a.moveToBookmark({startNode:d})}else a.setStart(r.getParent(),b)}a.collapse(true)}h&&f.remove();g&&e.$.parentNode&&e.remove()},d={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1},h=CKEDITOR.dom.walker.bogus(),l=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,i=CKEDITOR.dom.walker.editable(),g=CKEDITOR.dom.walker.ignored(true);CKEDITOR.dom.range.prototype=
{clone:function(){var a=new CKEDITOR.dom.range(this.root);a._setStartContainer(this.startContainer);a.startOffset=this.startOffset;a._setEndContainer(this.endContainer);a.endOffset=this.endOffset;a.collapsed=this.collapsed;return a},collapse:function(a){if(a){this._setEndContainer(this.startContainer);this.endOffset=this.startOffset}else{this._setStartContainer(this.endContainer);this.startOffset=this.endOffset}this.collapsed=true},cloneContents:function(){var a=new CKEDITOR.dom.documentFragment(this.document);
this.collapsed||f(this,2,a);return a},deleteContents:function(a){this.collapsed||f(this,0,null,a)},extractContents:function(a){var b=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||f(this,1,b,a);return b},createBookmark:function(a){var b,c,d,f,e=this.collapsed;b=this.document.createElement("span");b.data("cke-bookmark",1);b.setStyle("display","none");b.setHtml("&nbsp;");if(a){d="cke_bm_"+CKEDITOR.tools.getNextNumber();b.setAttribute("id",d+(e?"C":"S"))}if(!e){c=b.clone();c.setHtml("&nbsp;");
a&&c.setAttribute("id",d+"E");f=this.clone();f.collapse();f.insertNode(c)}f=this.clone();f.collapse(true);f.insertNode(b);if(c){this.setStartAfter(b);this.setEndBefore(c)}else this.moveToPosition(b,CKEDITOR.POSITION_AFTER_END);return{startNode:a?d+(e?"C":"S"):b,endNode:a?d+"E":c,serializable:a,collapsed:e}},createBookmark2:function(){function a(c){var d=c.container,f=c.offset,e;e=d;var m=f;e=e.type!=CKEDITOR.NODE_ELEMENT||m===0||m==e.getChildCount()?0:e.getChild(m-1).type==CKEDITOR.NODE_TEXT&&e.getChild(m).type==
CKEDITOR.NODE_TEXT;if(e){d=d.getChild(f-1);f=d.getLength()}d.type==CKEDITOR.NODE_ELEMENT&&f>1&&(f=d.getChild(f-1).getIndex(true)+1);if(d.type==CKEDITOR.NODE_TEXT){e=d;for(m=0;(e=e.getPrevious())&&e.type==CKEDITOR.NODE_TEXT;)m=m+e.getLength();e=m;if(d.getText())f=f+e;else{m=d.getPrevious(b);if(e){f=e;d=m?m.getNext():d.getParent().getFirst()}else{d=d.getParent();f=m?m.getIndex(true)+1:0}}}c.container=d;c.offset=f}var b=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,true);return function(b){var c=this.collapsed,
d={container:this.startContainer,offset:this.startOffset},f={container:this.endContainer,offset:this.endOffset};if(b){a(d);c||a(f)}return{start:d.container.getAddress(b),end:c?null:f.container.getAddress(b),startOffset:d.offset,endOffset:f.offset,normalized:b,collapsed:c,is2:true}}}(),moveToBookmark:function(a){if(a.is2){var b=this.document.getByAddress(a.start,a.normalized),c=a.startOffset,d=a.end&&this.document.getByAddress(a.end,a.normalized),a=a.endOffset;this.setStart(b,c);d?this.setEnd(d,a):
this.collapse(true)}else{b=(c=a.serializable)?this.document.getById(a.startNode):a.startNode;a=c?this.document.getById(a.endNode):a.endNode;this.setStartBefore(b);b.remove();if(a){this.setEndBefore(a);a.remove()}else this.collapse(true)}},getBoundaryNodes:function(){var a=this.startContainer,b=this.endContainer,c=this.startOffset,d=this.endOffset,f;if(a.type==CKEDITOR.NODE_ELEMENT){f=a.getChildCount();if(f>c)a=a.getChild(c);else if(f<1)a=a.getPreviousSourceNode();else{for(a=a.$;a.lastChild;)a=a.lastChild;
a=new CKEDITOR.dom.node(a);a=a.getNextSourceNode()||a}}if(b.type==CKEDITOR.NODE_ELEMENT){f=b.getChildCount();if(f>d)b=b.getChild(d).getPreviousSourceNode(true);else if(f<1)b=b.getPreviousSourceNode();else{for(b=b.$;b.lastChild;)b=b.lastChild;b=new CKEDITOR.dom.node(b)}}a.getPosition(b)&CKEDITOR.POSITION_FOLLOWING&&(a=b);return{startNode:a,endNode:b}},getCommonAncestor:function(a,b){var c=this.startContainer,d=this.endContainer,c=c.equals(d)?a&&c.type==CKEDITOR.NODE_ELEMENT&&this.startOffset==this.endOffset-
1?c.getChild(this.startOffset):c:c.getCommonAncestor(d);return b&&!c.is?c.getParent():c},optimize:function(){var a=this.startContainer,b=this.startOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setStartAfter(a):this.setStartBefore(a));a=this.endContainer;b=this.endOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setEndAfter(a):this.setEndBefore(a))},optimizeBookmark:function(){var a=this.startContainer,b=this.endContainer;a.is&&(a.is("span")&&a.data("cke-bookmark"))&&
this.setStartAt(a,CKEDITOR.POSITION_BEFORE_START);b&&(b.is&&b.is("span")&&b.data("cke-bookmark"))&&this.setEndAt(b,CKEDITOR.POSITION_AFTER_END)},trim:function(a,b){var c=this.startContainer,d=this.startOffset,f=this.collapsed;if((!a||f)&&c&&c.type==CKEDITOR.NODE_TEXT){if(d)if(d>=c.getLength()){d=c.getIndex()+1;c=c.getParent()}else{var e=c.split(d),d=c.getIndex()+1,c=c.getParent();if(this.startContainer.equals(this.endContainer))this.setEnd(e,this.endOffset-this.startOffset);else if(c.equals(this.endContainer))this.endOffset=
this.endOffset+1}else{d=c.getIndex();c=c.getParent()}this.setStart(c,d);if(f){this.collapse(true);return}}c=this.endContainer;d=this.endOffset;if(!b&&!f&&c&&c.type==CKEDITOR.NODE_TEXT){if(d){d>=c.getLength()||c.split(d);d=c.getIndex()+1}else d=c.getIndex();c=c.getParent();this.setEnd(c,d)}},enlarge:function(a,b){function c(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("contenteditable")?null:a}var d=RegExp(/[^\s\ufeff]/);switch(a){case CKEDITOR.ENLARGE_INLINE:var f=1;case CKEDITOR.ENLARGE_ELEMENT:if(this.collapsed)break;
var e=this.getCommonAncestor(),j=this.root,h,i,g,k,n,r=false,o,l;o=this.startContainer;var D=this.startOffset;if(o.type==CKEDITOR.NODE_TEXT){if(D){o=!CKEDITOR.tools.trim(o.substring(0,D)).length&&o;r=!!o}if(o&&!(k=o.getPrevious()))g=o.getParent()}else{D&&(k=o.getChild(D-1)||o.getLast());k||(g=o)}for(g=c(g);g||k;){if(g&&!k){!n&&g.equals(e)&&(n=true);if(f?g.isBlockBoundary():!j.contains(g))break;if(!r||g.getComputedStyle("display")!="inline"){r=false;n?h=g:this.setStartBefore(g)}k=g.getPrevious()}for(;k;){o=
false;if(k.type==CKEDITOR.NODE_COMMENT)k=k.getPrevious();else{if(k.type==CKEDITOR.NODE_TEXT){l=k.getText();d.test(l)&&(k=null);o=/[\s\ufeff]$/.test(l)}else if((k.$.offsetWidth>(CKEDITOR.env.webkit?1:0)||b&&k.is("br"))&&!k.data("cke-bookmark"))if(r&&CKEDITOR.dtd.$removeEmpty[k.getName()]){l=k.getText();if(d.test(l))k=null;else for(var D=k.$.getElementsByTagName("*"),J=0,z;z=D[J++];)if(!CKEDITOR.dtd.$removeEmpty[z.nodeName.toLowerCase()]){k=null;break}k&&(o=!!l.length)}else k=null;o&&(r?n?h=g:g&&this.setStartBefore(g):
r=true);if(k){o=k.getPrevious();if(!g&&!o){g=k;k=null;break}k=o}else g=null}}g&&(g=c(g.getParent()))}o=this.endContainer;D=this.endOffset;g=k=null;n=r=false;var L=function(a,b){var c=new CKEDITOR.dom.range(j);c.setStart(a,b);c.setEndAt(j,CKEDITOR.POSITION_BEFORE_END);var c=new CKEDITOR.dom.walker(c),f;for(c.guard=function(a){return!(a.type==CKEDITOR.NODE_ELEMENT&&a.isBlockBoundary())};f=c.next();){if(f.type!=CKEDITOR.NODE_TEXT)return false;l=f!=a?f.getText():f.substring(b);if(d.test(l))return false}return true};
if(o.type==CKEDITOR.NODE_TEXT)if(CKEDITOR.tools.trim(o.substring(D)).length)r=true;else{r=!o.getLength();if(D==o.getLength()){if(!(k=o.getNext()))g=o.getParent()}else L(o,D)&&(g=o.getParent())}else(k=o.getChild(D))||(g=o);for(;g||k;){if(g&&!k){!n&&g.equals(e)&&(n=true);if(f?g.isBlockBoundary():!j.contains(g))break;if(!r||g.getComputedStyle("display")!="inline"){r=false;n?i=g:g&&this.setEndAfter(g)}k=g.getNext()}for(;k;){o=false;if(k.type==CKEDITOR.NODE_TEXT){l=k.getText();L(k,0)||(k=null);o=/^[\s\ufeff]/.test(l)}else if(k.type==
CKEDITOR.NODE_ELEMENT){if((k.$.offsetWidth>0||b&&k.is("br"))&&!k.data("cke-bookmark"))if(r&&CKEDITOR.dtd.$removeEmpty[k.getName()]){l=k.getText();if(d.test(l))k=null;else{D=k.$.getElementsByTagName("*");for(J=0;z=D[J++];)if(!CKEDITOR.dtd.$removeEmpty[z.nodeName.toLowerCase()]){k=null;break}}k&&(o=!!l.length)}else k=null}else o=1;o&&r&&(n?i=g:this.setEndAfter(g));if(k){o=k.getNext();if(!g&&!o){g=k;k=null;break}k=o}else g=null}g&&(g=c(g.getParent()))}if(h&&i){e=h.contains(i)?i:h;this.setStartBefore(e);
this.setEndAfter(e)}break;case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:g=new CKEDITOR.dom.range(this.root);j=this.root;g.setStartAt(j,CKEDITOR.POSITION_AFTER_START);g.setEnd(this.startContainer,this.startOffset);g=new CKEDITOR.dom.walker(g);var B,w,H=CKEDITOR.dom.walker.blockBoundary(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null),C=null,A=function(a){if(a.type==CKEDITOR.NODE_ELEMENT&&a.getAttribute("contenteditable")=="false")if(C){if(C.equals(a)){C=null;return}}else C=
a;else if(C)return;var b=H(a);b||(B=a);return b},f=function(a){var b=A(a);!b&&(a.is&&a.is("br"))&&(w=a);return b};g.guard=A;g=g.lastBackward();B=B||j;this.setStartAt(B,!B.is("br")&&(!g&&this.checkStartOfBlock()||g&&B.contains(g))?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END);if(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){g=this.clone();g=new CKEDITOR.dom.walker(g);var x=CKEDITOR.dom.walker.whitespaces(),F=CKEDITOR.dom.walker.bookmark();g.evaluator=function(a){return!x(a)&&!F(a)};if((g=g.previous())&&
g.type==CKEDITOR.NODE_ELEMENT&&g.is("br"))break}g=this.clone();g.collapse();g.setEndAt(j,CKEDITOR.POSITION_BEFORE_END);g=new CKEDITOR.dom.walker(g);g.guard=a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?f:A;B=C=w=null;g=g.lastForward();B=B||j;this.setEndAt(B,!g&&this.checkEndOfBlock()||g&&B.contains(g)?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START);w&&this.setEndAfter(w)}},shrink:function(a,b,c){if(!this.collapsed){var a=a||CKEDITOR.SHRINK_TEXT,d=this.clone(),f=this.startContainer,e=this.endContainer,
j=this.startOffset,g=this.endOffset,h=1,i=1;if(f&&f.type==CKEDITOR.NODE_TEXT)if(j)if(j>=f.getLength())d.setStartAfter(f);else{d.setStartBefore(f);h=0}else d.setStartBefore(f);if(e&&e.type==CKEDITOR.NODE_TEXT)if(g)if(g>=e.getLength())d.setEndAfter(e);else{d.setEndAfter(e);i=0}else d.setEndBefore(e);var d=new CKEDITOR.dom.walker(d),k=CKEDITOR.dom.walker.bookmark();d.evaluator=function(b){return b.type==(a==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT)};var n;d.guard=function(b,d){if(k(b))return true;
if(a==CKEDITOR.SHRINK_ELEMENT&&b.type==CKEDITOR.NODE_TEXT||d&&b.equals(n)||c===false&&b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()||b.type==CKEDITOR.NODE_ELEMENT&&b.hasAttribute("contenteditable"))return false;!d&&b.type==CKEDITOR.NODE_ELEMENT&&(n=b);return true};if(h)(f=d[a==CKEDITOR.SHRINK_ELEMENT?"lastForward":"next"]())&&this.setStartAt(f,b?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_START);if(i){d.reset();(d=d[a==CKEDITOR.SHRINK_ELEMENT?"lastBackward":"previous"]())&&this.setEndAt(d,
b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END)}return!(!h&&!i)}},insertNode:function(a){this.optimizeBookmark();this.trim(false,true);var b=this.startContainer,c=b.getChild(this.startOffset);c?a.insertBefore(c):b.append(a);a.getParent()&&a.getParent().equals(this.endContainer)&&this.endOffset++;this.setStartBefore(a)},moveToPosition:function(a,b){this.setStartAt(a,b);this.collapse(true)},moveToRange:function(a){this.setStart(a.startContainer,a.startOffset);this.setEnd(a.endContainer,
a.endOffset)},selectNodeContents:function(a){this.setStart(a,0);this.setEnd(a,a.type==CKEDITOR.NODE_TEXT?a.getLength():a.getChildCount())},setStart:function(a,b){if(a.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[a.getName()]){b=a.getIndex();a=a.getParent()}this._setStartContainer(a);this.startOffset=b;if(!this.endContainer){this._setEndContainer(a);this.endOffset=b}c(this)},setEnd:function(a,b){if(a.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[a.getName()]){b=a.getIndex()+1;a=a.getParent()}this._setEndContainer(a);
this.endOffset=b;if(!this.startContainer){this._setStartContainer(a);this.startOffset=b}c(this)},setStartAfter:function(a){this.setStart(a.getParent(),a.getIndex()+1)},setStartBefore:function(a){this.setStart(a.getParent(),a.getIndex())},setEndAfter:function(a){this.setEnd(a.getParent(),a.getIndex()+1)},setEndBefore:function(a){this.setEnd(a.getParent(),a.getIndex())},setStartAt:function(a,b){switch(b){case CKEDITOR.POSITION_AFTER_START:this.setStart(a,0);break;case CKEDITOR.POSITION_BEFORE_END:a.type==
CKEDITOR.NODE_TEXT?this.setStart(a,a.getLength()):this.setStart(a,a.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(a);break;case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(a)}c(this)},setEndAt:function(a,b){switch(b){case CKEDITOR.POSITION_AFTER_START:this.setEnd(a,0);break;case CKEDITOR.POSITION_BEFORE_END:a.type==CKEDITOR.NODE_TEXT?this.setEnd(a,a.getLength()):this.setEnd(a,a.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(a);break;
case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(a)}c(this)},fixBlock:function(a,b){var c=this.createBookmark(),d=this.document.createElement(b);this.collapse(a);this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);this.extractContents().appendTo(d);d.trim();d.appendBogus();this.insertNode(d);this.moveToBookmark(c);return d},splitBlock:function(a){var b=new CKEDITOR.dom.elementPath(this.startContainer,this.root),c=new CKEDITOR.dom.elementPath(this.endContainer,this.root),d=b.block,f=c.block,e=null;if(!b.blockLimit.equals(c.blockLimit))return null;
if(a!="br"){if(!d){d=this.fixBlock(true,a);f=(new CKEDITOR.dom.elementPath(this.endContainer,this.root)).block}f||(f=this.fixBlock(false,a))}a=d&&this.checkStartOfBlock();b=f&&this.checkEndOfBlock();this.deleteContents();if(d&&d.equals(f))if(b){e=new CKEDITOR.dom.elementPath(this.startContainer,this.root);this.moveToPosition(f,CKEDITOR.POSITION_AFTER_END);f=null}else if(a){e=new CKEDITOR.dom.elementPath(this.startContainer,this.root);this.moveToPosition(d,CKEDITOR.POSITION_BEFORE_START);d=null}else{f=
this.splitElement(d);d.is("ul","ol")||d.appendBogus()}return{previousBlock:d,nextBlock:f,wasStartOfBlock:a,wasEndOfBlock:b,elementPath:e}},splitElement:function(a){if(!this.collapsed)return null;this.setEndAt(a,CKEDITOR.POSITION_BEFORE_END);var b=this.extractContents(),c=a.clone(false);b.appendTo(c);c.insertAfter(a);this.moveToPosition(a,CKEDITOR.POSITION_AFTER_END);return c},removeEmptyBlocksAtEnd:function(){function a(d){return function(a){return b(a)||(c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.isEmptyInlineRemoveable())||
d.is("table")&&a.is("caption")?false:true}}var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(false);return function(b){for(var c=this.createBookmark(),d=this[b?"endPath":"startPath"](),f=d.block||d.blockLimit,e;f&&!f.equals(d.root)&&!f.getFirst(a(f));){e=f.getParent();this[b?"setEndAt":"setStartAt"](f,CKEDITOR.POSITION_AFTER_END);f.remove(1);f=e}this.moveToBookmark(c)}}(),startPath:function(){return new CKEDITOR.dom.elementPath(this.startContainer,this.root)},endPath:function(){return new CKEDITOR.dom.elementPath(this.endContainer,
this.root)},checkBoundaryOfElement:function(a,b){var c=b==CKEDITOR.START,d=this.clone();d.collapse(c);d[c?"setStartAt":"setEndAt"](a,c?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);d=new CKEDITOR.dom.walker(d);d.evaluator=e(c);return d[c?"checkBackward":"checkForward"]()},checkStartOfBlock:function(){var b=this.startContainer,c=this.startOffset;if(CKEDITOR.env.ie&&c&&b.type==CKEDITOR.NODE_TEXT){b=CKEDITOR.tools.ltrim(b.substring(0,c));l.test(b)&&this.trim(0,1)}this.trim();b=new CKEDITOR.dom.elementPath(this.startContainer,
this.root);c=this.clone();c.collapse(true);c.setStartAt(b.block||b.blockLimit,CKEDITOR.POSITION_AFTER_START);b=new CKEDITOR.dom.walker(c);b.evaluator=a();return b.checkBackward()},checkEndOfBlock:function(){var b=this.endContainer,c=this.endOffset;if(CKEDITOR.env.ie&&b.type==CKEDITOR.NODE_TEXT){b=CKEDITOR.tools.rtrim(b.substring(c));l.test(b)&&this.trim(1,0)}this.trim();b=new CKEDITOR.dom.elementPath(this.endContainer,this.root);c=this.clone();c.collapse(false);c.setEndAt(b.block||b.blockLimit,CKEDITOR.POSITION_BEFORE_END);
b=new CKEDITOR.dom.walker(c);b.evaluator=a();return b.checkForward()},getPreviousNode:function(a,b,c){var d=this.clone();d.collapse(1);d.setStartAt(c||this.root,CKEDITOR.POSITION_AFTER_START);c=new CKEDITOR.dom.walker(d);c.evaluator=a;c.guard=b;return c.previous()},getNextNode:function(a,b,c){var d=this.clone();d.collapse();d.setEndAt(c||this.root,CKEDITOR.POSITION_BEFORE_END);c=new CKEDITOR.dom.walker(d);c.evaluator=a;c.guard=b;return c.next()},checkReadOnly:function(){function a(b,c){for(;b;){if(b.type==
CKEDITOR.NODE_ELEMENT){if(b.getAttribute("contentEditable")=="false"&&!b.data("cke-editable"))return 0;if(b.is("html")||b.getAttribute("contentEditable")=="true"&&(b.contains(c)||b.equals(c)))break}b=b.getParent()}return 1}return function(){var b=this.startContainer,c=this.endContainer;return!(a(b,c)&&a(c,b))}}(),moveToElementEditablePosition:function(a,b){if(a.type==CKEDITOR.NODE_ELEMENT&&!a.isEditable(false)){this.moveToPosition(a,b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);return true}for(var c=
0;a;){if(a.type==CKEDITOR.NODE_TEXT){b&&this.endContainer&&this.checkEndOfBlock()&&l.test(a.getText())?this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START):this.moveToPosition(a,b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);c=1;break}if(a.type==CKEDITOR.NODE_ELEMENT)if(a.isEditable()){this.moveToPosition(a,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START);c=1}else if(b&&a.is("br")&&this.endContainer&&this.checkEndOfBlock())this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START);
else if(a.getAttribute("contenteditable")=="false"&&a.is(CKEDITOR.dtd.$block)){this.setStartBefore(a);this.setEndAfter(a);return true}var d=a,f=c,e=void 0;d.type==CKEDITOR.NODE_ELEMENT&&d.isEditable(false)&&(e=d[b?"getLast":"getFirst"](g));!f&&!e&&(e=d[b?"getPrevious":"getNext"](g));a=e}return!!c},moveToClosestEditablePosition:function(a,b){var c=new CKEDITOR.dom.range(this.root),d=0,f,e=[CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_BEFORE_START];c.moveToPosition(a,e[b?0:1]);if(a.is(CKEDITOR.dtd.$block)){if(f=
c[b?"getNextEditableNode":"getPreviousEditableNode"]()){d=1;if(f.type==CKEDITOR.NODE_ELEMENT&&f.is(CKEDITOR.dtd.$block)&&f.getAttribute("contenteditable")=="false"){c.setStartAt(f,CKEDITOR.POSITION_BEFORE_START);c.setEndAt(f,CKEDITOR.POSITION_AFTER_END)}else c.moveToPosition(f,e[b?1:0])}}else d=1;d&&this.moveToRange(c);return!!d},moveToElementEditStart:function(a){return this.moveToElementEditablePosition(a)},moveToElementEditEnd:function(a){return this.moveToElementEditablePosition(a,true)},getEnclosedNode:function(){var a=
this.clone();a.optimize();if(a.startContainer.type!=CKEDITOR.NODE_ELEMENT||a.endContainer.type!=CKEDITOR.NODE_ELEMENT)return null;var a=new CKEDITOR.dom.walker(a),b=CKEDITOR.dom.walker.bookmark(false,true),c=CKEDITOR.dom.walker.whitespaces(true);a.evaluator=function(a){return c(a)&&b(a)};var d=a.next();a.reset();return d&&d.equals(a.previous())?d:null},getTouchedStartNode:function(){var a=this.startContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.startOffset)||a},getTouchedEndNode:function(){var a=
this.endContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.endOffset-1)||a},getNextEditableNode:b(),getPreviousEditableNode:b(1),scrollIntoView:function(){var a=new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>",this.document),b,c,d,f=this.clone();f.optimize();if(d=f.startContainer.type==CKEDITOR.NODE_TEXT){c=f.startContainer.getText();b=f.startContainer.split(f.startOffset);a.insertAfter(f.startContainer)}else f.insertNode(a);a.scrollIntoView();if(d){f.startContainer.setText(c);
b.remove()}a.remove()},_setStartContainer:function(a){this.startContainer=a},_setEndContainer:function(a){this.endContainer=a}}})();CKEDITOR.POSITION_AFTER_START=1;CKEDITOR.POSITION_BEFORE_END=2;CKEDITOR.POSITION_BEFORE_START=3;CKEDITOR.POSITION_AFTER_END=4;CKEDITOR.ENLARGE_ELEMENT=1;CKEDITOR.ENLARGE_BLOCK_CONTENTS=2;CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3;CKEDITOR.ENLARGE_INLINE=4;CKEDITOR.START=1;CKEDITOR.END=2;CKEDITOR.SHRINK_ELEMENT=1;CKEDITOR.SHRINK_TEXT=2;"use strict";
(function(){function a(a){if(!(arguments.length<1)){this.range=a;this.forceBrBreak=0;this.enlargeBr=1;this.enforceRealBlocks=0;this._||(this._={})}}function e(a){var b=[];a.forEach(function(a){if(a.getAttribute("contenteditable")=="true"){b.push(a);return false}},CKEDITOR.NODE_ELEMENT,true);return b}function b(a,c,d,f){a:{f==null&&(f=e(d));for(var h;h=f.shift();)if(h.getDtd().p){f={element:h,remaining:f};break a}f=null}if(!f)return 0;if((h=CKEDITOR.filter.instances[f.element.data("cke-filter")])&&
!h.check(c))return b(a,c,d,f.remaining);c=new CKEDITOR.dom.range(f.element);c.selectNodeContents(f.element);c=c.createIterator();c.enlargeBr=a.enlargeBr;c.enforceRealBlocks=a.enforceRealBlocks;c.activeFilter=c.filter=h;a._.nestedEditable={element:f.element,container:d,remaining:f.remaining,iterator:c};return 1}function c(a,b,c){if(!b)return false;a=a.clone();a.collapse(!c);return a.checkBoundaryOfElement(b,c?CKEDITOR.START:CKEDITOR.END)}var f=/^[\r\n\t ]+$/,d=CKEDITOR.dom.walker.bookmark(false,true),
h=CKEDITOR.dom.walker.whitespaces(true),l=function(a){return d(a)&&h(a)},i={dd:1,dt:1,li:1};a.prototype={getNextParagraph:function(a){var e,h,s,y,p,a=a||"p";if(this._.nestedEditable){if(e=this._.nestedEditable.iterator.getNextParagraph(a)){this.activeFilter=this._.nestedEditable.iterator.activeFilter;return e}this.activeFilter=this.filter;if(b(this,a,this._.nestedEditable.container,this._.nestedEditable.remaining)){this.activeFilter=this._.nestedEditable.iterator.activeFilter;return this._.nestedEditable.iterator.getNextParagraph(a)}this._.nestedEditable=
null}if(!this.range.root.getDtd()[a])return null;if(!this._.started){var q=this.range.clone();h=q.startPath();var j=q.endPath(),u=!q.collapsed&&c(q,h.block),v=!q.collapsed&&c(q,j.block,1);q.shrink(CKEDITOR.SHRINK_ELEMENT,true);u&&q.setStartAt(h.block,CKEDITOR.POSITION_BEFORE_END);v&&q.setEndAt(j.block,CKEDITOR.POSITION_AFTER_START);h=q.endContainer.hasAscendant("pre",true)||q.startContainer.hasAscendant("pre",true);q.enlarge(this.forceBrBreak&&!h||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
CKEDITOR.ENLARGE_BLOCK_CONTENTS);if(!q.collapsed){h=new CKEDITOR.dom.walker(q.clone());j=CKEDITOR.dom.walker.bookmark(true,true);h.evaluator=j;this._.nextNode=h.next();h=new CKEDITOR.dom.walker(q.clone());h.evaluator=j;h=h.previous();this._.lastNode=h.getNextSourceNode(true,null,q.root);if(this._.lastNode&&this._.lastNode.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()){j=this.range.clone();j.moveToPosition(this._.lastNode,CKEDITOR.POSITION_AFTER_END);
if(j.checkEndOfBlock()){j=new CKEDITOR.dom.elementPath(j.endContainer,j.root);this._.lastNode=(j.block||j.blockLimit).getNextSourceNode(true)}}if(!this._.lastNode||!q.root.contains(this._.lastNode)){this._.lastNode=this._.docEndMarker=q.document.createText("");this._.lastNode.insertAfter(h)}q=null}this._.started=1;h=q}j=this._.nextNode;q=this._.lastNode;for(this._.nextNode=null;j;){var u=0,v=j.hasAscendant("pre"),E=j.type!=CKEDITOR.NODE_ELEMENT,k=0;if(E)j.type==CKEDITOR.NODE_TEXT&&f.test(j.getText())&&
(E=0);else{var n=j.getName();if(CKEDITOR.dtd.$block[n]&&j.getAttribute("contenteditable")=="false"){e=j;b(this,a,e);break}else if(j.isBlockBoundary(this.forceBrBreak&&!v&&{br:1})){if(n=="br")E=1;else if(!h&&!j.getChildCount()&&n!="hr"){e=j;s=j.equals(q);break}if(h){h.setEndAt(j,CKEDITOR.POSITION_BEFORE_START);if(n!="br")this._.nextNode=j}u=1}else{if(j.getFirst()){if(!h){h=this.range.clone();h.setStartAt(j,CKEDITOR.POSITION_BEFORE_START)}j=j.getFirst();continue}E=1}}if(E&&!h){h=this.range.clone();
h.setStartAt(j,CKEDITOR.POSITION_BEFORE_START)}s=(!u||E)&&j.equals(q);if(h&&!u)for(;!j.getNext(l)&&!s;){n=j.getParent();if(n.isBlockBoundary(this.forceBrBreak&&!v&&{br:1})){u=1;E=0;s||n.equals(q);h.setEndAt(n,CKEDITOR.POSITION_BEFORE_END);break}j=n;E=1;s=j.equals(q);k=1}E&&h.setEndAt(j,CKEDITOR.POSITION_AFTER_END);j=this._getNextSourceNode(j,k,q);if((s=!j)||u&&h)break}if(!e){if(!h){this._.docEndMarker&&this._.docEndMarker.remove();return this._.nextNode=null}e=new CKEDITOR.dom.elementPath(h.startContainer,
h.root);j=e.blockLimit;u={div:1,th:1,td:1};e=e.block;if(!e&&j&&!this.enforceRealBlocks&&u[j.getName()]&&h.checkStartOfBlock()&&h.checkEndOfBlock()&&!j.equals(h.root))e=j;else if(!e||this.enforceRealBlocks&&e.is(i)){e=this.range.document.createElement(a);h.extractContents().appendTo(e);e.trim();h.insertNode(e);y=p=true}else if(e.getName()!="li"){if(!h.checkStartOfBlock()||!h.checkEndOfBlock()){e=e.clone(false);h.extractContents().appendTo(e);e.trim();p=h.splitBlock();y=!p.wasStartOfBlock;p=!p.wasEndOfBlock;
h.insertNode(e)}}else if(!s)this._.nextNode=e.equals(q)?null:this._getNextSourceNode(h.getBoundaryNodes().endNode,1,q)}if(y)(y=e.getPrevious())&&y.type==CKEDITOR.NODE_ELEMENT&&(y.getName()=="br"?y.remove():y.getLast()&&y.getLast().$.nodeName.toLowerCase()=="br"&&y.getLast().remove());if(p)(y=e.getLast())&&y.type==CKEDITOR.NODE_ELEMENT&&y.getName()=="br"&&(!CKEDITOR.env.needsBrFiller||y.getPrevious(d)||y.getNext(d))&&y.remove();if(!this._.nextNode)this._.nextNode=s||e.equals(q)||!q?null:this._getNextSourceNode(e,
1,q);return e},_getNextSourceNode:function(a,b,c){function f(a){return!(a.equals(c)||a.equals(e))}for(var e=this.range.root,a=a.getNextSourceNode(b,null,f);!d(a);)a=a.getNextSourceNode(b,null,f);return a}};CKEDITOR.dom.range.prototype.createIterator=function(){return new a(this)}})();
CKEDITOR.command=function(a,e){this.uiItems=[];this.exec=function(b){if(this.state==CKEDITOR.TRISTATE_DISABLED||!this.checkAllowed())return false;this.editorFocus&&a.focus();return this.fire("exec")===false?true:e.exec.call(this,a,b)!==false};this.refresh=function(a,b){if(!this.readOnly&&a.readOnly)return true;if(this.context&&!b.isContextFor(this.context)){this.disable();return true}if(!this.checkAllowed(true)){this.disable();return true}this.startDisabled||this.enable();this.modes&&!this.modes[a.mode]&&
this.disable();return this.fire("refresh",{editor:a,path:b})===false?true:e.refresh&&e.refresh.apply(this,arguments)!==false};var b;this.checkAllowed=function(c){return!c&&typeof b=="boolean"?b:b=a.activeFilter.checkFeature(this)};CKEDITOR.tools.extend(this,e,{modes:{wysiwyg:1},editorFocus:1,contextSensitive:!!e.context,state:CKEDITOR.TRISTATE_DISABLED});CKEDITOR.event.call(this)};
CKEDITOR.command.prototype={enable:function(){this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()&&this.setState(!this.preserveState||typeof this.previousState=="undefined"?CKEDITOR.TRISTATE_OFF:this.previousState)},disable:function(){this.setState(CKEDITOR.TRISTATE_DISABLED)},setState:function(a){if(this.state==a||a!=CKEDITOR.TRISTATE_DISABLED&&!this.checkAllowed())return false;this.previousState=this.state;this.state=a;this.fire("state");return true},toggleState:function(){this.state==CKEDITOR.TRISTATE_OFF?
this.setState(CKEDITOR.TRISTATE_ON):this.state==CKEDITOR.TRISTATE_ON&&this.setState(CKEDITOR.TRISTATE_OFF)}};CKEDITOR.event.implementOn(CKEDITOR.command.prototype);CKEDITOR.ENTER_P=1;CKEDITOR.ENTER_BR=2;CKEDITOR.ENTER_DIV=3;
CKEDITOR.config={customConfig:"config.js",autoUpdateElement:!0,language:"",defaultLanguage:"en",contentsLangDirection:"",enterMode:CKEDITOR.ENTER_P,forceEnterMode:!1,shiftEnterMode:CKEDITOR.ENTER_BR,docType:"<!DOCTYPE html>",bodyId:"",bodyClass:"",fullPage:!1,height:200,extraPlugins:"",removePlugins:"",protectedSource:[],tabIndex:0,width:"",baseFloatZIndex:1E4,blockedKeystrokes:[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85]};
(function(){function a(a,b,c,d,f){var e,n,a=[];for(e in b){n=b[e];n=typeof n=="boolean"?{}:typeof n=="function"?{match:n}:L(n);if(e.charAt(0)!="$")n.elements=e;if(c)n.featureName=c.toLowerCase();var j=n;j.elements=h(j.elements,/\s+/)||null;j.propertiesOnly=j.propertiesOnly||j.elements===true;var k=/\s*,\s*/,r=void 0;for(r in C){j[r]=h(j[r],k)||null;var x=j,o=A[r],w=h(j[A[r]],k),p=j[r],g=[],i=true,F=void 0;w?i=false:w={};for(F in p)if(F.charAt(0)=="!"){F=F.slice(1);g.push(F);w[F]=true;i=false}for(;F=
g.pop();){p[F]=p["!"+F];delete p["!"+F]}x[o]=(i?false:w)||null}j.match=j.match||null;d.push(n);a.push(n)}for(var b=f.elements,f=f.generic,D,c=0,d=a.length;c<d;++c){e=L(a[c]);n=e.classes===true||e.styles===true||e.attributes===true;j=e;r=o=k=void 0;for(k in C)j[k]=u(j[k]);x=true;for(r in A){k=A[r];o=j[k];w=[];p=void 0;for(p in o)p.indexOf("*")>-1?w.push(RegExp("^"+p.replace(/\*/g,".*")+"$")):w.push(p);o=w;if(o.length){j[k]=o;x=false}}j.nothingRequired=x;j.noProperties=!(j.attributes||j.classes||j.styles);
if(e.elements===true||e.elements===null)f[n?"unshift":"push"](e);else{j=e.elements;delete e.elements;for(D in j)if(b[D])b[D][n?"unshift":"push"](e);else b[D]=[e]}}}function e(a,c,d,f){if(!a.match||a.match(c))if(f||l(a,c)){if(!a.propertiesOnly)d.valid=true;if(!d.allAttributes)d.allAttributes=b(a.attributes,c.attributes,d.validAttributes);if(!d.allStyles)d.allStyles=b(a.styles,c.styles,d.validStyles);if(!d.allClasses){a=a.classes;c=c.classes;f=d.validClasses;if(a)if(a===true)a=true;else{for(var e=0,
n=c.length,j;e<n;++e){j=c[e];f[j]||(f[j]=a(j))}a=false}else a=false;d.allClasses=a}}}function b(a,b,c){if(!a)return false;if(a===true)return true;for(var d in b)c[d]||(c[d]=a(d));return false}function c(a,b,c){if(!a.match||a.match(b)){if(a.noProperties)return false;c.hadInvalidAttribute=f(a.attributes,b.attributes)||c.hadInvalidAttribute;c.hadInvalidStyle=f(a.styles,b.styles)||c.hadInvalidStyle;a=a.classes;b=b.classes;if(a){for(var d=false,e=a===true,n=b.length;n--;)if(e||a(b[n])){b.splice(n,1);d=
true}a=d}else a=false;c.hadInvalidClass=a||c.hadInvalidClass}}function f(a,b){if(!a)return false;var c=false,d=a===true,f;for(f in b)if(d||a(f)){delete b[f];c=true}return c}function d(a,b,c){if(a.disabled||a.customConfig&&!c||!b)return false;a._.cachedChecks={};return true}function h(a,b){if(!a)return false;if(a===true)return a;if(typeof a=="string"){a=B(a);return a=="*"?true:CKEDITOR.tools.convertArrayToObject(a.split(b))}if(CKEDITOR.tools.isArray(a))return a.length?CKEDITOR.tools.convertArrayToObject(a):
false;var c={},d=0,f;for(f in a){c[f]=a[f];d++}return d?c:false}function l(a,b){if(a.nothingRequired)return true;var c,d,f,e;if(f=a.requiredClasses){e=b.classes;for(c=0;c<f.length;++c){d=f[c];if(typeof d=="string"){if(CKEDITOR.tools.indexOf(e,d)==-1)return false}else if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(e,d))return false}}return i(b.styles,a.requiredStyles)&&i(b.attributes,a.requiredAttributes)}function i(a,b){if(!b)return true;for(var c=0,d;c<b.length;++c){d=b[c];if(typeof d=="string"){if(!(d in
a))return false}else if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a,d))return false}return true}function g(a){if(!a)return{};for(var a=a.split(/\s*,\s*/).sort(),b={};a.length;)b[a.shift()]=w;return b}function m(a){for(var b,c,d,f,e={},n=1,a=B(a);b=a.match(x);){if(c=b[2]){d=t(c,"styles");f=t(c,"attrs");c=t(c,"classes")}else d=f=c=null;e["$"+n++]={elements:b[1],classes:c,styles:d,attributes:f};a=a.slice(b[0].length)}return e}function t(a,b){var c=a.match(F[b]);return c?B(c[1]):null}function s(a){var b=
a.styleBackup=a.attributes.style,c=a.classBackup=a.attributes["class"];if(!a.styles)a.styles=CKEDITOR.tools.parseCssText(b||"",1);if(!a.classes)a.classes=c?c.split(/\s+/):[]}function y(a,b,d,f){var k=0,r;if(f.toHtml)b.name=b.name.replace(G,"$1");if(f.doCallbacks&&a.elementCallbacks){a:for(var x=a.elementCallbacks,h=0,o=x.length,w;h<o;++h)if(w=x[h](b)){r=w;break a}if(r)return r}if(f.doTransform)if(r=a._.transformations[b.name]){s(b);for(x=0;x<r.length;++x)n(a,b,r[x]);q(b)}if(f.doFilter){a:{x=b.name;
h=a._;a=h.allowedRules.elements[x];r=h.allowedRules.generic;x=h.disallowedRules.elements[x];h=h.disallowedRules.generic;o=f.skipRequired;w={valid:false,validAttributes:{},validClasses:{},validStyles:{},allAttributes:false,allClasses:false,allStyles:false,hadInvalidAttribute:false,hadInvalidClass:false,hadInvalidStyle:false};var p,g;if(!a&&!r)a=null;else{s(b);if(x){p=0;for(g=x.length;p<g;++p)if(c(x[p],b,w)===false){a=null;break a}}if(h){p=0;for(g=h.length;p<g;++p)c(h[p],b,w)}if(a){p=0;for(g=a.length;p<
g;++p)e(a[p],b,w,o)}if(r){p=0;for(g=r.length;p<g;++p)e(r[p],b,w,o)}a=w}}if(!a){d.push(b);return z}if(!a.valid){d.push(b);return z}g=a.validAttributes;var i=a.validStyles;r=a.validClasses;var x=b.attributes,F=b.styles,h=b.classes,o=b.classBackup,C=b.styleBackup,u,A,D=[];w=[];var v=/^data-cke-/;p=false;delete x.style;delete x["class"];delete b.classBackup;delete b.styleBackup;if(!a.allAttributes)for(u in x)if(!g[u])if(v.test(u)){if(u!=(A=u.replace(/^data-cke-saved-/,""))&&!g[A]){delete x[u];p=true}}else{delete x[u];
p=true}if(!a.allStyles||a.hadInvalidStyle){for(u in F)a.allStyles||i[u]?D.push(u+":"+F[u]):p=true;if(D.length)x.style=D.sort().join("; ")}else if(C)x.style=C;if(!a.allClasses||a.hadInvalidClass){for(u=0;u<h.length;++u)(a.allClasses||r[h[u]])&&w.push(h[u]);w.length&&(x["class"]=w.sort().join(" "));o&&w.length<o.split(/\s+/).length&&(p=true)}else o&&(x["class"]=o);p&&(k=z);if(!f.skipFinalValidation&&!j(b)){d.push(b);return z}}if(f.toHtml)b.name=b.name.replace($,"cke:$1");return k}function p(a){var b=
[],c;for(c in a)c.indexOf("*")>-1&&b.push(c.replace(/\*/g,".*"));return b.length?RegExp("^(?:"+b.join("|")+")$"):null}function q(a){var b=a.attributes,c;delete b.style;delete b["class"];if(c=CKEDITOR.tools.writeCssText(a.styles,true))b.style=c;a.classes.length&&(b["class"]=a.classes.sort().join(" "))}function j(a){switch(a.name){case "a":if(!a.children.length&&!a.attributes.name)return false;break;case "img":if(!a.attributes.src)return false}return true}function u(a){if(!a)return false;if(a===true)return true;
var b=p(a);return function(c){return c in a||b&&c.match(b)}}function v(){return new CKEDITOR.htmlParser.element("br")}function E(a){return a.type==CKEDITOR.NODE_ELEMENT&&(a.name=="br"||J.$block[a.name])}function k(a,b,c){var d=a.name;if(J.$empty[d]||!a.children.length)if(d=="hr"&&b=="br")a.replaceWith(v());else{a.parent&&c.push({check:"it",el:a.parent});a.remove()}else if(J.$block[d]||d=="tr")if(b=="br"){if(a.previous&&!E(a.previous)){b=v();b.insertBefore(a)}if(a.next&&!E(a.next)){b=v();b.insertAfter(a)}a.replaceWithChildren()}else{var d=
a.children,f;b:{f=J[b];for(var e=0,n=d.length,j;e<n;++e){j=d[e];if(j.type==CKEDITOR.NODE_ELEMENT&&!f[j.name]){f=false;break b}}f=true}if(f){a.name=b;a.attributes={};c.push({check:"parent-down",el:a})}else{f=a.parent;for(var e=f.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||f.name=="body",k,r,n=d.length;n>0;){j=d[--n];if(e&&(j.type==CKEDITOR.NODE_TEXT||j.type==CKEDITOR.NODE_ELEMENT&&J.$inline[j.name])){if(!k){k=new CKEDITOR.htmlParser.element(b);k.insertAfter(a);c.push({check:"parent-down",el:k})}k.add(j,
0)}else{k=null;r=J[f.name]||J.span;j.insertAfter(a);f.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(j.type==CKEDITOR.NODE_ELEMENT&&!r[j.name])&&c.push({check:"el-up",el:j})}}a.remove()}}else if(d=="style")a.remove();else{a.parent&&c.push({check:"it",el:a.parent});a.replaceWithChildren()}}function n(a,b,c){var d,f;for(d=0;d<c.length;++d){f=c[d];if((!f.check||a.check(f.check,false))&&(!f.left||f.left(b))){f.right(b,aa);break}}}function r(a,b){var c=b.getDefinition(),d=c.attributes,f=c.styles,e,n,j,k;if(a.name!=
c.element)return false;for(e in d)if(e=="class"){c=d[e].split(/\s+/);for(j=a.classes.join("|");k=c.pop();)if(j.indexOf(k)==-1)return false}else if(a.attributes[e]!=d[e])return false;for(n in f)if(a.styles[n]!=f[n])return false;return true}function o(a,b){var c,d;if(typeof a=="string")c=a;else if(a instanceof CKEDITOR.style)d=a;else{c=a[0];d=a[1]}return[{element:c,left:d,right:function(a,c){c.transform(a,b)}}]}function M(a){return function(b){return r(b,a)}}function D(a){return function(b,c){c[a](b)}}
var J=CKEDITOR.dtd,z=1,L=CKEDITOR.tools.copy,B=CKEDITOR.tools.trim,w="cke-test",H=["","p","br","div"];CKEDITOR.FILTER_SKIP_TREE=2;CKEDITOR.filter=function(a){this.allowedContent=[];this.disallowedContent=[];this.elementCallbacks=null;this.disabled=false;this.editor=null;this.id=CKEDITOR.tools.getNextNumber();this._={allowedRules:{elements:{},generic:[]},disallowedRules:{elements:{},generic:[]},transformations:{},cachedTests:{}};CKEDITOR.filter.instances[this.id]=this;if(a instanceof CKEDITOR.editor){a=
this.editor=a;this.customConfig=true;var b=a.config.allowedContent;if(b===true)this.disabled=true;else{if(!b)this.customConfig=false;this.allow(b,"config",1);this.allow(a.config.extraAllowedContent,"extra",1);this.allow(H[a.enterMode]+" "+H[a.shiftEnterMode],"default",1);this.disallow(a.config.disallowedContent)}}else{this.customConfig=false;this.allow(a,"default",1)}};CKEDITOR.filter.instances={};CKEDITOR.filter.prototype={allow:function(b,c,f){if(!d(this,b,f))return false;var e,n;if(typeof b=="string")b=
m(b);else if(b instanceof CKEDITOR.style){if(b.toAllowedContentRules)return this.allow(b.toAllowedContentRules(this.editor),c,f);e=b.getDefinition();b={};f=e.attributes;b[e.element]=e={styles:e.styles,requiredStyles:e.styles&&CKEDITOR.tools.objectKeys(e.styles)};if(f){f=L(f);e.classes=f["class"]?f["class"].split(/\s+/):null;e.requiredClasses=e.classes;delete f["class"];e.attributes=f;e.requiredAttributes=f&&CKEDITOR.tools.objectKeys(f)}}else if(CKEDITOR.tools.isArray(b)){for(e=0;e<b.length;++e)n=
this.allow(b[e],c,f);return n}a(this,b,c,this.allowedContent,this._.allowedRules);return true},applyTo:function(a,b,c,d){if(this.disabled)return false;var f=this,e=[],n=this.editor&&this.editor.config.protectedSource,r,x=false,h={doFilter:!c,doTransform:true,doCallbacks:true,toHtml:b};a.forEach(function(a){if(a.type==CKEDITOR.NODE_ELEMENT){if(a.attributes["data-cke-filter"]=="off")return false;if(!b||!(a.name=="span"&&~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))){r=y(f,
a,e,h);if(r&z)x=true;else if(r&2)return false}}else if(a.type==CKEDITOR.NODE_COMMENT&&a.value.match(/^\{cke_protected\}(?!\{C\})/)){var c;a:{var d=decodeURIComponent(a.value.replace(/^\{cke_protected\}/,""));c=[];var j,k,o;if(n)for(k=0;k<n.length;++k)if((o=d.match(n[k]))&&o[0].length==d.length){c=true;break a}d=CKEDITOR.htmlParser.fragment.fromHtml(d);d.children.length==1&&(j=d.children[0]).type==CKEDITOR.NODE_ELEMENT&&y(f,j,c,h);c=!c.length}c||e.push(a)}},null,true);e.length&&(x=true);for(var o,
a=[],d=H[d||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)],p;c=e.pop();)c.type==CKEDITOR.NODE_ELEMENT?k(c,d,a):c.remove();for(;o=a.pop();){c=o.el;if(c.parent){p=J[c.parent.name]||J.span;switch(o.check){case "it":J.$removeEmpty[c.name]&&!c.children.length?k(c,d,a):j(c)||k(c,d,a);break;case "el-up":c.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT&&!p[c.name]&&k(c,d,a);break;case "parent-down":c.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT&&!p[c.name]&&k(c.parent,d,a)}}}return x},checkFeature:function(a){if(this.disabled||
!a)return true;a.toFeature&&(a=a.toFeature(this.editor));return!a.requiredContent||this.check(a.requiredContent)},disable:function(){this.disabled=true},disallow:function(b){if(!d(this,b,true))return false;typeof b=="string"&&(b=m(b));a(this,b,null,this.disallowedContent,this._.disallowedRules);return true},addContentForms:function(a){if(!this.disabled&&a){var b,c,d=[],f;for(b=0;b<a.length&&!f;++b){c=a[b];if((typeof c=="string"||c instanceof CKEDITOR.style)&&this.check(c))f=c}if(f){for(b=0;b<a.length;++b)d.push(o(a[b],
f));this.addTransformations(d)}}},addElementCallback:function(a){if(!this.elementCallbacks)this.elementCallbacks=[];this.elementCallbacks.push(a)},addFeature:function(a){if(this.disabled||!a)return true;a.toFeature&&(a=a.toFeature(this.editor));this.allow(a.allowedContent,a.name);this.addTransformations(a.contentTransformations);this.addContentForms(a.contentForms);return a.requiredContent&&(this.customConfig||this.disallowedContent.length)?this.check(a.requiredContent):true},addTransformations:function(a){var b,
c;if(!this.disabled&&a){var d=this._.transformations,f;for(f=0;f<a.length;++f){b=a[f];var e=void 0,n=void 0,j=void 0,k=void 0,r=void 0,x=void 0;c=[];for(n=0;n<b.length;++n){j=b[n];if(typeof j=="string"){j=j.split(/\s*:\s*/);k=j[0];r=null;x=j[1]}else{k=j.check;r=j.left;x=j.right}if(!e){e=j;e=e.element?e.element:k?k.match(/^([a-z0-9]+)/i)[0]:e.left.getDefinition().element}r instanceof CKEDITOR.style&&(r=M(r));c.push({check:k==e?null:k,left:r,right:typeof x=="string"?D(x):x})}b=e;d[b]||(d[b]=[]);d[b].push(c)}}},
check:function(a,b,c){if(this.disabled)return true;if(CKEDITOR.tools.isArray(a)){for(var d=a.length;d--;)if(this.check(a[d],b,c))return true;return false}var f,e;if(typeof a=="string"){e=a+"<"+(b===false?"0":"1")+(c?"1":"0")+">";if(e in this._.cachedChecks)return this._.cachedChecks[e];d=m(a).$1;f=d.styles;var j=d.classes;d.name=d.elements;d.classes=j=j?j.split(/\s*,\s*/):[];d.styles=g(f);d.attributes=g(d.attributes);d.children=[];j.length&&(d.attributes["class"]=j.join(" "));if(f)d.attributes.style=
CKEDITOR.tools.writeCssText(d.styles);f=d}else{d=a.getDefinition();f=d.styles;j=d.attributes||{};if(f){f=L(f);j.style=CKEDITOR.tools.writeCssText(f,true)}else f={};f={name:d.element,attributes:j,classes:j["class"]?j["class"].split(/\s+/):[],styles:f,children:[]}}var j=CKEDITOR.tools.clone(f),k=[],r;if(b!==false&&(r=this._.transformations[f.name])){for(d=0;d<r.length;++d)n(this,f,r[d]);q(f)}y(this,j,k,{doFilter:true,doTransform:b!==false,skipRequired:!c,skipFinalValidation:!c});b=k.length>0?false:
CKEDITOR.tools.objectCompare(f.attributes,j.attributes,true)?true:false;typeof a=="string"&&(this._.cachedChecks[e]=b);return b},getAllowedEnterMode:function(){var a=["p","div","br"],b={p:CKEDITOR.ENTER_P,div:CKEDITOR.ENTER_DIV,br:CKEDITOR.ENTER_BR};return function(c,d){var f=a.slice(),e;if(this.check(H[c]))return c;for(d||(f=f.reverse());e=f.pop();)if(this.check(e))return b[e];return CKEDITOR.ENTER_BR}}(),destroy:function(){delete CKEDITOR.filter.instances[this.id];delete this._;delete this.allowedContent;
delete this.disallowedContent}};var C={styles:1,attributes:1,classes:1},A={styles:"requiredStyles",attributes:"requiredAttributes",classes:"requiredClasses"},x=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,F={styles:/{([^}]+)}/,attrs:/\[([^\]]+)\]/,classes:/\(([^\)]+)\)/},G=/^cke:(object|embed|param)$/,$=/^(object|embed|param)$/,aa=CKEDITOR.filter.transformationsTools={sizeToStyle:function(a){this.lengthToStyle(a,"width");this.lengthToStyle(a,
"height")},sizeToAttribute:function(a){this.lengthToAttribute(a,"width");this.lengthToAttribute(a,"height")},lengthToStyle:function(a,b,c){c=c||b;if(!(c in a.styles)){var d=a.attributes[b];if(d){/^\d+$/.test(d)&&(d=d+"px");a.styles[c]=d}}delete a.attributes[b]},lengthToAttribute:function(a,b,c){c=c||b;if(!(c in a.attributes)){var d=a.styles[b],f=d&&d.match(/^(\d+)(?:\.\d*)?px$/);f?a.attributes[c]=f[1]:d==w&&(a.attributes[c]=w)}delete a.styles[b]},alignmentToStyle:function(a){if(!("float"in a.styles)){var b=
a.attributes.align;if(b=="left"||b=="right")a.styles["float"]=b}delete a.attributes.align},alignmentToAttribute:function(a){if(!("align"in a.attributes)){var b=a.styles["float"];if(b=="left"||b=="right")a.attributes.align=b}delete a.styles["float"]},matchesStyle:r,transform:function(a,b){if(typeof b=="string")a.name=b;else{var c=b.getDefinition(),d=c.styles,f=c.attributes,e,j,n,k;a.name=c.element;for(e in f)if(e=="class"){c=a.classes.join("|");for(n=f[e].split(/\s+/);k=n.pop();)c.indexOf(k)==-1&&
a.classes.push(k)}else a.attributes[e]=f[e];for(j in d)a.styles[j]=d[j]}}}})();
(function(){CKEDITOR.focusManager=function(a){if(a.focusManager)return a.focusManager;this.hasFocus=false;this.currentActive=null;this._={editor:a};return this};CKEDITOR.focusManager._={blurDelay:200};CKEDITOR.focusManager.prototype={focus:function(a){this._.timer&&clearTimeout(this._.timer);if(a)this.currentActive=a;if(!this.hasFocus&&!this._.locked){(a=CKEDITOR.currentInstance)&&a.focusManager.blur(1);this.hasFocus=true;(a=this._.editor.container)&&a.addClass("cke_focus");this._.editor.fire("focus")}},
lock:function(){this._.locked=1},unlock:function(){delete this._.locked},blur:function(a){function e(){if(this.hasFocus){this.hasFocus=false;var a=this._.editor.container;a&&a.removeClass("cke_focus");this._.editor.fire("blur")}}if(!this._.locked){this._.timer&&clearTimeout(this._.timer);var b=CKEDITOR.focusManager._.blurDelay;a||!b?e.call(this):this._.timer=CKEDITOR.tools.setTimeout(function(){delete this._.timer;e.call(this)},b,this)}},add:function(a,e){var b=a.getCustomData("focusmanager");if(!b||
b!=this){b&&b.remove(a);var b="focus",c="blur";if(e)if(CKEDITOR.env.ie){b="focusin";c="focusout"}else CKEDITOR.event.useCapture=1;var f={blur:function(){a.equals(this.currentActive)&&this.blur()},focus:function(){this.focus(a)}};a.on(b,f.focus,this);a.on(c,f.blur,this);if(e)CKEDITOR.event.useCapture=0;a.setCustomData("focusmanager",this);a.setCustomData("focusmanager_handlers",f)}},remove:function(a){a.removeCustomData("focusmanager");var e=a.removeCustomData("focusmanager_handlers");a.removeListener("blur",
e.blur);a.removeListener("focus",e.focus)}}})();CKEDITOR.keystrokeHandler=function(a){if(a.keystrokeHandler)return a.keystrokeHandler;this.keystrokes={};this.blockedKeystrokes={};this._={editor:a};return this};
(function(){var a,e=function(b){var b=b.data,f=b.getKeystroke(),d=this.keystrokes[f],e=this._.editor;a=e.fire("key",{keyCode:f,domEvent:b})===false;if(!a){d&&(a=e.execCommand(d,{from:"keystrokeHandler"})!==false);a||(a=!!this.blockedKeystrokes[f])}a&&b.preventDefault(true);return!a},b=function(b){if(a){a=false;b.data.preventDefault(true)}};CKEDITOR.keystrokeHandler.prototype={attach:function(a){a.on("keydown",e,this);if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)a.on("keypress",b,this)}}})();
(function(){CKEDITOR.lang={languages:{af:1,ar:1,bg:1,bn:1,bs:1,ca:1,cs:1,cy:1,da:1,de:1,el:1,"en-au":1,"en-ca":1,"en-gb":1,en:1,eo:1,es:1,et:1,eu:1,fa:1,fi:1,fo:1,"fr-ca":1,fr:1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,ms:1,nb:1,nl:1,no:1,pl:1,"pt-br":1,pt:1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,"sr-latn":1,sr:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,"zh-cn":1,zh:1},rtl:{ar:1,fa:1,he:1,ku:1,ug:1},load:function(a,e,b){if(!a||!CKEDITOR.lang.languages[a])a=this.detect(e,
a);var c=this,e=function(){c[a].dir=c.rtl[a]?"rtl":"ltr";b(a,c[a])};this[a]?e():CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/"+a+".js"),e,this)},detect:function(a,e){var b=this.languages,e=e||navigator.userLanguage||navigator.language||a,c=e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),f=c[1],c=c[2];b[f+"-"+c]?f=f+"-"+c:b[f]||(f=null);CKEDITOR.lang.detect=f?function(){return f}:function(a){return a};return f||a}}})();
CKEDITOR.scriptLoader=function(){var a={},e={};return{load:function(b,c,f,d){var h=typeof b=="string";h&&(b=[b]);f||(f=CKEDITOR);var l=b.length,i=[],g=[],m=function(a){c&&(h?c.call(f,a):c.call(f,i,g))};if(l===0)m(true);else{var t=function(a,b){(b?i:g).push(a);if(--l<=0){d&&CKEDITOR.document.getDocumentElement().removeStyle("cursor");m(b)}},s=function(b,c){a[b]=1;var d=e[b];delete e[b];for(var f=0;f<d.length;f++)d[f](b,c)},y=function(b){if(a[b])t(b,true);else{var d=e[b]||(e[b]=[]);d.push(t);if(!(d.length>
1)){var f=new CKEDITOR.dom.element("script");f.setAttributes({type:"text/javascript",src:b});if(c)if(CKEDITOR.env.ie&&CKEDITOR.env.version<11)f.$.onreadystatechange=function(){if(f.$.readyState=="loaded"||f.$.readyState=="complete"){f.$.onreadystatechange=null;s(b,true)}};else{f.$.onload=function(){setTimeout(function(){s(b,true)},0)};f.$.onerror=function(){s(b,false)}}f.appendTo(CKEDITOR.document.getHead())}}};d&&CKEDITOR.document.getDocumentElement().setStyle("cursor","wait");for(var p=0;p<l;p++)y(b[p])}},
queue:function(){function a(){var b;(b=c[0])&&this.load(b.scriptUrl,b.callback,CKEDITOR,0)}var c=[];return function(f,d){var e=this;c.push({scriptUrl:f,callback:function(){d&&d.apply(this,arguments);c.shift();a.call(e)}});c.length==1&&a.call(this)}}()}}();CKEDITOR.resourceManager=function(a,e){this.basePath=a;this.fileName=e;this.registered={};this.loaded={};this.externals={};this._={waitingList:{}}};
CKEDITOR.resourceManager.prototype={add:function(a,e){if(this.registered[a])throw'[CKEDITOR.resourceManager.add] The resource name "'+a+'" is already registered.';var b=this.registered[a]=e||{};b.name=a;b.path=this.getPath(a);CKEDITOR.fire(a+CKEDITOR.tools.capitalize(this.fileName)+"Ready",b);return this.get(a)},get:function(a){return this.registered[a]||null},getPath:function(a){var e=this.externals[a];return CKEDITOR.getUrl(e&&e.dir||this.basePath+a+"/")},getFilePath:function(a){var e=this.externals[a];
return CKEDITOR.getUrl(this.getPath(a)+(e?e.file:this.fileName+".js"))},addExternal:function(a,e,b){for(var a=a.split(","),c=0;c<a.length;c++){var f=a[c];b||(e=e.replace(/[^\/]+$/,function(a){b=a;return""}));this.externals[f]={dir:e,file:b||this.fileName+".js"}}},load:function(a,e,b){CKEDITOR.tools.isArray(a)||(a=a?[a]:[]);for(var c=this.loaded,f=this.registered,d=[],h={},l={},i=0;i<a.length;i++){var g=a[i];if(g)if(!c[g]&&!f[g]){var m=this.getFilePath(g);d.push(m);m in h||(h[m]=[]);h[m].push(g)}else l[g]=
this.get(g)}CKEDITOR.scriptLoader.load(d,function(a,d){if(d.length)throw'[CKEDITOR.resourceManager.load] Resource name "'+h[d[0]].join(",")+'" was not found at "'+d[0]+'".';for(var f=0;f<a.length;f++)for(var p=h[a[f]],g=0;g<p.length;g++){var j=p[g];l[j]=this.get(j);c[j]=1}e.call(b,l)},this)}};CKEDITOR.plugins=new CKEDITOR.resourceManager("plugins/","plugin");
CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load,function(a){var e={};return function(b,c,f){var d={},h=function(b){a.call(this,b,function(a){CKEDITOR.tools.extend(d,a);var b=[],m;for(m in a){var l=a[m],s=l&&l.requires;if(!e[m]){if(l.icons)for(var y=l.icons.split(","),p=y.length;p--;)CKEDITOR.skin.addIcon(y[p],l.path+"icons/"+(CKEDITOR.env.hidpi&&l.hidpi?"hidpi/":"")+y[p]+".png");e[m]=1}if(s){s.split&&(s=s.split(","));for(l=0;l<s.length;l++)d[s[l]]||b.push(s[l])}}if(b.length)h.call(this,
b);else{for(m in d){l=d[m];if(l.onLoad&&!l.onLoad._called){l.onLoad()===false&&delete d[m];l.onLoad._called=1}}c&&c.call(f||window,d)}},this)};h.call(this,b)}});CKEDITOR.plugins.setLang=function(a,e,b){var c=this.get(a),a=c.langEntries||(c.langEntries={}),c=c.lang||(c.lang=[]);c.split&&(c=c.split(","));CKEDITOR.tools.indexOf(c,e)==-1&&c.push(e);a[e]=b};CKEDITOR.ui=function(a){if(a.ui)return a.ui;this.items={};this.instances={};this.editor=a;this._={handlers:{}};return this};
CKEDITOR.ui.prototype={add:function(a,e,b){b.name=a.toLowerCase();var c=this.items[a]={type:e,command:b.command||null,args:Array.prototype.slice.call(arguments,2)};CKEDITOR.tools.extend(c,b)},get:function(a){return this.instances[a]},create:function(a){var e=this.items[a],b=e&&this._.handlers[e.type],c=e&&e.command&&this.editor.getCommand(e.command),b=b&&b.create.apply(this,e.args);this.instances[a]=b;c&&c.uiItems.push(b);if(b&&!b.type)b.type=e.type;return b},addHandler:function(a,e){this._.handlers[a]=
e},space:function(a){return CKEDITOR.document.getById(this.spaceId(a))},spaceId:function(a){return this.editor.id+"_"+a}};CKEDITOR.event.implementOn(CKEDITOR.ui);
(function(){function a(a,c,d){CKEDITOR.event.call(this);a=a&&CKEDITOR.tools.clone(a);if(c!==void 0){if(c instanceof CKEDITOR.dom.element){if(!d)throw Error("One of the element modes must be specified.");}else throw Error("Expect element of type CKEDITOR.dom.element.");if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&d==CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");if(!(d==CKEDITOR.ELEMENT_MODE_INLINE?c.is(CKEDITOR.dtd.$editable)||c.is("textarea"):d==CKEDITOR.ELEMENT_MODE_REPLACE?
!c.is(CKEDITOR.dtd.$nonBodyContent):1))throw Error('The specified element mode is not supported on element: "'+c.getName()+'".');this.element=c;this.elementMode=d;this.name=this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO&&(c.getId()||c.getNameAtt())}else this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;this._={};this.commands={};this.templates={};this.name=this.name||e();this.id=CKEDITOR.tools.getNextId();this.status="unloaded";this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config);this.ui=new CKEDITOR.ui(this);
this.focusManager=new CKEDITOR.focusManager(this);this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this);this.on("readOnly",b);this.on("selectionChange",function(a){f(this,a.data.path)});this.on("activeFilterChange",function(){f(this,this.elementPath(),true)});this.on("mode",b);this.on("instanceReady",function(){this.config.startupFocus&&this.focus()});CKEDITOR.fire("instanceCreated",null,this);CKEDITOR.add(this);CKEDITOR.tools.setTimeout(function(){h(this,a)},0,this)}function e(){do var a="editor"+
++s;while(CKEDITOR.instances[a]);return a}function b(){var a=this.commands,b;for(b in a)c(this,a[b])}function c(a,b){b[b.startDisabled?"disable":a.readOnly&&!b.readOnly?"disable":b.modes[a.mode]?"enable":"disable"]()}function f(a,b,c){if(b){var d,f,e=a.commands;for(f in e){d=e[f];(c||d.contextSensitive)&&d.refresh(a,b)}}}function d(a){var b=a.config.customConfig;if(!b)return false;var b=CKEDITOR.getUrl(b),c=y[b]||(y[b]={});if(c.fn){c.fn.call(a,a.config);(CKEDITOR.getUrl(a.config.customConfig)==b||
!d(a))&&a.fireOnce("customConfigLoaded")}else CKEDITOR.scriptLoader.queue(b,function(){c.fn=CKEDITOR.editorConfig?CKEDITOR.editorConfig:function(){};d(a)});return true}function h(a,b){a.on("customConfigLoaded",function(){if(b){if(b.on)for(var c in b.on)a.on(c,b.on[c]);CKEDITOR.tools.extend(a.config,b,true);delete a.config.on}c=a.config;a.readOnly=!(!c.readOnly&&!(a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.is("textarea")?a.element.hasAttribute("disabled"):a.element.isReadOnly():a.elementMode==
CKEDITOR.ELEMENT_MODE_REPLACE&&a.element.hasAttribute("disabled")));a.blockless=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(a.element.is("textarea")||CKEDITOR.dtd[a.element.getName()].p):false;a.tabIndex=c.tabIndex||a.element&&a.element.getAttribute("tabindex")||0;a.activeEnterMode=a.enterMode=a.blockless?CKEDITOR.ENTER_BR:c.enterMode;a.activeShiftEnterMode=a.shiftEnterMode=a.blockless?CKEDITOR.ENTER_BR:c.shiftEnterMode;if(c.skin)CKEDITOR.skinName=c.skin;a.fireOnce("configLoaded");a.dataProcessor=
new CKEDITOR.htmlDataProcessor(a);a.filter=a.activeFilter=new CKEDITOR.filter(a);l(a)});if(b&&b.customConfig!=null)a.config.customConfig=b.customConfig;d(a)||a.fireOnce("customConfigLoaded")}function l(a){CKEDITOR.skin.loadPart("editor",function(){i(a)})}function i(a){CKEDITOR.lang.load(a.config.language,a.config.defaultLanguage,function(b,c){var d=a.config.title;a.langCode=b;a.lang=CKEDITOR.tools.prototypedCopy(c);a.title=typeof d=="string"||d===false?d:[a.lang.editor,a.name].join(", ");if(!a.config.contentsLangDirection)a.config.contentsLangDirection=
a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.getDirection(1):a.lang.dir;a.fire("langLoaded");g(a)})}function g(a){a.getStylesSet(function(b){a.once("loaded",function(){a.fire("stylesSet",{styles:b})},null,null,1);m(a)})}function m(a){var b=a.config,c=b.plugins,d=b.extraPlugins,f=b.removePlugins;if(d)var e=RegExp("(?:^|,)(?:"+d.replace(/\s*,\s*/g,"|")+")(?=,|$)","g"),c=c.replace(e,""),c=c+(","+d);if(f)var k=RegExp("(?:^|,)(?:"+f.replace(/\s*,\s*/g,"|")+")(?=,|$)","g"),c=c.replace(k,"");CKEDITOR.env.air&&
(c=c+",adobeair");CKEDITOR.plugins.load(c.split(","),function(c){var d=[],f=[],e=[];a.plugins=c;for(var j in c){var h=c[j],g=h.lang,i=null,u=h.requires,w;CKEDITOR.tools.isArray(u)&&(u=u.join(","));if(u&&(w=u.match(k)))for(;u=w.pop();)CKEDITOR.tools.setTimeout(function(a,b){throw Error('Plugin "'+a.replace(",","")+'" cannot be removed from the plugins list, because it\'s required by "'+b+'" plugin.');},0,null,[u,j]);if(g&&!a.lang[j]){g.split&&(g=g.split(","));if(CKEDITOR.tools.indexOf(g,a.langCode)>=
0)i=a.langCode;else{i=a.langCode.replace(/-.*/,"");i=i!=a.langCode&&CKEDITOR.tools.indexOf(g,i)>=0?i:CKEDITOR.tools.indexOf(g,"en")>=0?"en":g[0]}if(!h.langEntries||!h.langEntries[i])e.push(CKEDITOR.getUrl(h.path+"lang/"+i+".js"));else{a.lang[j]=h.langEntries[i];i=null}}f.push(i);d.push(h)}CKEDITOR.scriptLoader.load(e,function(){for(var c=["beforeInit","init","afterInit"],e=0;e<c.length;e++)for(var n=0;n<d.length;n++){var j=d[n];e===0&&(f[n]&&j.lang&&j.langEntries)&&(a.lang[j.name]=j.langEntries[f[n]]);
if(j[c[e]])j[c[e]](a)}a.fireOnce("pluginsLoaded");b.keystrokes&&a.setKeystroke(a.config.keystrokes);for(n=0;n<a.config.blockedKeystrokes.length;n++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[n]]=1;a.status="loaded";a.fireOnce("loaded");CKEDITOR.fire("instanceLoaded",null,a)})})}function t(){var a=this.element;if(a&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){var b=this.getData();this.config.htmlEncodeOutput&&(b=CKEDITOR.tools.htmlEncode(b));a.is("textarea")?a.setValue(b):
a.setHtml(b);return true}return false}a.prototype=CKEDITOR.editor.prototype;CKEDITOR.editor=a;var s=0,y={};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{addCommand:function(a,b){b.name=a.toLowerCase();var d=new CKEDITOR.command(this,b);this.mode&&c(this,d);return this.commands[a]=d},_attachToForm:function(){function a(d){b.updateElement();b._.required&&(!c.getValue()&&b.fire("required")===false)&&d.data.preventDefault()}var b=this,c=b.element,d=new CKEDITOR.dom.element(c.$.form);if(c.is("textarea")&&
d){d.on("submit",a);if(d.$.submit&&d.$.submit.call&&d.$.submit.apply)d.$.submit=CKEDITOR.tools.override(d.$.submit,function(b){return function(){a();b.apply?b.apply(this):b()}});b.on("destroy",function(){d.removeListener("submit",a)})}},destroy:function(a){this.fire("beforeDestroy");!a&&t.call(this);this.editable(null);this.filter.destroy();delete this.filter;delete this.activeFilter;this.status="destroyed";this.fire("destroy");this.removeAllListeners();CKEDITOR.remove(this);CKEDITOR.fire("instanceDestroyed",
null,this)},elementPath:function(a){if(!a){a=this.getSelection();if(!a)return null;a=a.getStartElement()}return a?new CKEDITOR.dom.elementPath(a,this.editable()):null},createRange:function(){var a=this.editable();return a?new CKEDITOR.dom.range(a):null},execCommand:function(a,b){var c=this.getCommand(a),d={name:a,commandData:b,command:c};if(c&&c.state!=CKEDITOR.TRISTATE_DISABLED&&this.fire("beforeCommandExec",d)!==false){d.returnValue=c.exec(d.commandData);if(!c.async&&this.fire("afterCommandExec",
d)!==false)return d.returnValue}return false},getCommand:function(a){return this.commands[a]},getData:function(a){!a&&this.fire("beforeGetData");var b=this._.data;if(typeof b!="string")b=(b=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?b.is("textarea")?b.getValue():b.getHtml():"";b={dataValue:b};!a&&this.fire("getData",b);return b.dataValue},getSnapshot:function(){var a=this.fire("getSnapshot");if(typeof a!="string"){var b=this.element;b&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&
(a=b.is("textarea")?b.getValue():b.getHtml())}return a},loadSnapshot:function(a){this.fire("loadSnapshot",a)},setData:function(a,b,c){var d=true,f=b;if(b&&typeof b=="object"){c=b.internal;f=b.callback;d=!b.noSnapshot}!c&&d&&this.fire("saveSnapshot");if(f||!c)this.once("dataReady",function(a){!c&&d&&this.fire("saveSnapshot");f&&f.call(a.editor)});a={dataValue:a};!c&&this.fire("setData",a);this._.data=a.dataValue;!c&&this.fire("afterSetData",a)},setReadOnly:function(a){a=a==null||a;if(this.readOnly!=
a){this.readOnly=a;this.keystrokeHandler.blockedKeystrokes[8]=+a;this.editable().setReadOnly(a);this.fire("readOnly")}},insertHtml:function(a,b){this.fire("insertHtml",{dataValue:a,mode:b})},insertText:function(a){this.fire("insertText",a)},insertElement:function(a){this.fire("insertElement",a)},focus:function(){this.fire("beforeFocus")},checkDirty:function(){return this.status=="ready"&&this._.previousValue!==this.getSnapshot()},resetDirty:function(){this._.previousValue=this.getSnapshot()},updateElement:function(){return t.call(this)},
setKeystroke:function(){for(var a=this.keystrokeHandler.keystrokes,b=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments,0)],c,d,f=b.length;f--;){c=b[f];d=0;if(CKEDITOR.tools.isArray(c)){d=c[1];c=c[0]}d?a[c]=d:delete a[c]}},addFeature:function(a){return this.filter.addFeature(a)},setActiveFilter:function(a){if(!a)a=this.filter;if(this.activeFilter!==a){this.activeFilter=a;this.fire("activeFilterChange");a===this.filter?this.setActiveEnterMode(null,null):this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode),
a.getAllowedEnterMode(this.shiftEnterMode,true))}},setActiveEnterMode:function(a,b){a=a?this.blockless?CKEDITOR.ENTER_BR:a:this.enterMode;b=b?this.blockless?CKEDITOR.ENTER_BR:b:this.shiftEnterMode;if(this.activeEnterMode!=a||this.activeShiftEnterMode!=b){this.activeEnterMode=a;this.activeShiftEnterMode=b;this.fire("activeEnterModeChange")}}})})();CKEDITOR.ELEMENT_MODE_NONE=0;CKEDITOR.ELEMENT_MODE_REPLACE=1;CKEDITOR.ELEMENT_MODE_APPENDTO=2;CKEDITOR.ELEMENT_MODE_INLINE=3;
CKEDITOR.htmlParser=function(){this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\>)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}};
(function(){var a=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,e={checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};CKEDITOR.htmlParser.prototype={onTagOpen:function(){},onTagClose:function(){},onText:function(){},onCDATA:function(){},onComment:function(){},parse:function(b){for(var c,f,d=0,h;c=this._.htmlPartsRegex.exec(b);){f=c.index;if(f>d){d=b.substring(d,f);if(h)h.push(d);else this.onText(d)}d=
this._.htmlPartsRegex.lastIndex;if(f=c[1]){f=f.toLowerCase();if(h&&CKEDITOR.dtd.$cdata[f]){this.onCDATA(h.join(""));h=null}if(!h){this.onTagClose(f);continue}}if(h)h.push(c[0]);else if(f=c[3]){f=f.toLowerCase();if(!/="/.test(f)){var l={},i,g=c[4];c=!!c[5];if(g)for(;i=a.exec(g);){var m=i[1].toLowerCase();i=i[2]||i[3]||i[4]||"";l[m]=!i&&e[m]?m:CKEDITOR.tools.htmlDecodeAttr(i)}this.onTagOpen(f,l,c);!h&&CKEDITOR.dtd.$cdata[f]&&(h=[])}}else if(f=c[2])this.onComment(f)}if(b.length>d)this.onText(b.substring(d,
b.length))}}})();
CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){this._={output:[]}},proto:{openTag:function(a){this._.output.push("<",a)},openTagClose:function(a,e){e?this._.output.push(" />"):this._.output.push(">")},attribute:function(a,e){typeof e=="string"&&(e=CKEDITOR.tools.htmlEncodeAttr(e));this._.output.push(" ",a,'="',e,'"')},closeTag:function(a){this._.output.push("</",a,">")},text:function(a){this._.output.push(a)},comment:function(a){this._.output.push("<\!--",a,"--\>")},write:function(a){this._.output.push(a)},
reset:function(){this._.output=[];this._.indent=false},getHtml:function(a){var e=this._.output.join("");a&&this.reset();return e}}});"use strict";
(function(){CKEDITOR.htmlParser.node=function(){};CKEDITOR.htmlParser.node.prototype={remove:function(){var a=this.parent.children,e=CKEDITOR.tools.indexOf(a,this),b=this.previous,c=this.next;b&&(b.next=c);c&&(c.previous=b);a.splice(e,1);this.parent=null},replaceWith:function(a){var e=this.parent.children,b=CKEDITOR.tools.indexOf(e,this),c=a.previous=this.previous,f=a.next=this.next;c&&(c.next=a);f&&(f.previous=a);e[b]=a;a.parent=this.parent;this.parent=null},insertAfter:function(a){var e=a.parent.children,
b=CKEDITOR.tools.indexOf(e,a),c=a.next;e.splice(b+1,0,this);this.next=a.next;this.previous=a;a.next=this;c&&(c.previous=this);this.parent=a.parent},insertBefore:function(a){var e=a.parent.children,b=CKEDITOR.tools.indexOf(e,a);e.splice(b,0,this);this.next=a;(this.previous=a.previous)&&(a.previous.next=this);a.previous=this;this.parent=a.parent},getAscendant:function(a){var e=typeof a=="function"?a:typeof a=="string"?function(b){return b.name==a}:function(b){return b.name in a},b=this.parent;for(;b&&
b.type==CKEDITOR.NODE_ELEMENT;){if(e(b))return b;b=b.parent}return null},wrapWith:function(a){this.replaceWith(a);a.add(this);return a},getIndex:function(){return CKEDITOR.tools.indexOf(this.parent.children,this)},getFilterContext:function(a){return a||{}}}})();"use strict";CKEDITOR.htmlParser.comment=function(a){this.value=a;this._={isBlockLike:false}};
CKEDITOR.htmlParser.comment.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_COMMENT,filter:function(a,e){var b=this.value;if(!(b=a.onComment(e,b,this))){this.remove();return false}if(typeof b!="string"){this.replaceWith(b);return false}this.value=b;return true},writeHtml:function(a,e){e&&this.filter(e);a.comment(this.value)}});"use strict";
(function(){CKEDITOR.htmlParser.text=function(a){this.value=a;this._={isBlockLike:false}};CKEDITOR.htmlParser.text.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(a,e){if(!(this.value=a.onText(e,this.value,this))){this.remove();return false}},writeHtml:function(a,e){e&&this.filter(e);a.text(this.value)}})})();"use strict";
(function(){CKEDITOR.htmlParser.cdata=function(a){this.value=a};CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(){},writeHtml:function(a){a.write(this.value)}})})();"use strict";CKEDITOR.htmlParser.fragment=function(){this.children=[];this.parent=null;this._={isBlockLike:true,hasInlineStarted:false}};
(function(){function a(a){return a.attributes["data-cke-survive"]?false:a.name=="a"&&a.attributes.href||CKEDITOR.dtd.$removeEmpty[a.name]}var e=CKEDITOR.tools.extend({table:1,ul:1,ol:1,dl:1},CKEDITOR.dtd.table,CKEDITOR.dtd.ul,CKEDITOR.dtd.ol,CKEDITOR.dtd.dl),b={ol:1,ul:1},c=CKEDITOR.tools.extend({},{html:1},CKEDITOR.dtd.html,CKEDITOR.dtd.body,CKEDITOR.dtd.head,{style:1,script:1}),f={ul:"li",ol:"li",dl:"dd",table:"tbody",tbody:"tr",thead:"tr",tfoot:"tr",tr:"td"};CKEDITOR.htmlParser.fragment.fromHtml=
function(d,h,l){function i(a){var b;if(j.length>0)for(var c=0;c<j.length;c++){var d=j[c],f=d.name,e=CKEDITOR.dtd[f],k=v.name&&CKEDITOR.dtd[v.name];if((!k||k[f])&&(!a||!e||e[a]||!CKEDITOR.dtd[a])){if(!b){g();b=1}d=d.clone();d.parent=v;v=d;j.splice(c,1);c--}else if(f==v.name){t(v,v.parent,1);c--}}}function g(){for(;u.length;)t(u.shift(),v)}function m(a){if(a._.isBlockLike&&a.name!="pre"&&a.name!="textarea"){var b=a.children.length,c=a.children[b-1],d;if(c&&c.type==CKEDITOR.NODE_TEXT)(d=CKEDITOR.tools.rtrim(c.value))?
c.value=d:a.children.length=b-1}}function t(b,c,d){var c=c||v||q,f=v;if(b.previous===void 0){if(s(c,b)){v=c;p.onTagOpen(l,{});b.returnPoint=c=v}m(b);(!a(b)||b.children.length)&&c.add(b);b.name=="pre"&&(k=false);b.name=="textarea"&&(E=false)}if(b.returnPoint){v=b.returnPoint;delete b.returnPoint}else v=d?c:f}function s(a,b){if((a==q||a.name=="body")&&l&&(!a.name||CKEDITOR.dtd[a.name][l])){var c,d;return(c=b.attributes&&(d=b.attributes["data-cke-real-element-type"])?d:b.name)&&c in CKEDITOR.dtd.$inline&&
!(c in CKEDITOR.dtd.head)&&!b.isOrphan||b.type==CKEDITOR.NODE_TEXT}}function y(a,b){return a in CKEDITOR.dtd.$listItem||a in CKEDITOR.dtd.$tableContent?a==b||a=="dt"&&b=="dd"||a=="dd"&&b=="dt":false}var p=new CKEDITOR.htmlParser,q=h instanceof CKEDITOR.htmlParser.element?h:typeof h=="string"?new CKEDITOR.htmlParser.element(h):new CKEDITOR.htmlParser.fragment,j=[],u=[],v=q,E=q.name=="textarea",k=q.name=="pre";p.onTagOpen=function(d,f,h,l){f=new CKEDITOR.htmlParser.element(d,f);if(f.isUnknown&&h)f.isEmpty=
true;f.isOptionalClose=l;if(a(f))j.push(f);else{if(d=="pre")k=true;else{if(d=="br"&&k){v.add(new CKEDITOR.htmlParser.text("\n"));return}d=="textarea"&&(E=true)}if(d=="br")u.push(f);else{for(;;){l=(h=v.name)?CKEDITOR.dtd[h]||(v._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c;if(!f.isUnknown&&!v.isUnknown&&!l[d])if(v.isOptionalClose)p.onTagClose(h);else if(d in b&&h in b){h=v.children;(h=h[h.length-1])&&h.name=="li"||t(h=new CKEDITOR.htmlParser.element("li"),v);!f.returnPoint&&(f.returnPoint=v);
v=h}else if(d in CKEDITOR.dtd.$listItem&&!y(d,h))p.onTagOpen(d=="li"?"ul":"dl",{},0,1);else if(h in e&&!y(d,h)){!f.returnPoint&&(f.returnPoint=v);v=v.parent}else{h in CKEDITOR.dtd.$inline&&j.unshift(v);if(v.parent)t(v,v.parent,1);else{f.isOrphan=1;break}}else break}i(d);g();f.parent=v;f.isEmpty?t(f):v=f}}};p.onTagClose=function(a){for(var b=j.length-1;b>=0;b--)if(a==j[b].name){j.splice(b,1);return}for(var c=[],d=[],f=v;f!=q&&f.name!=a;){f._.isBlockLike||d.unshift(f);c.push(f);f=f.returnPoint||f.parent}if(f!=
q){for(b=0;b<c.length;b++){var e=c[b];t(e,e.parent)}v=f;f._.isBlockLike&&g();t(f,f.parent);if(f==v)v=v.parent;j=j.concat(d)}a=="body"&&(l=false)};p.onText=function(a){if((!v._.hasInlineStarted||u.length)&&!k&&!E){a=CKEDITOR.tools.ltrim(a);if(a.length===0)return}var b=v.name,d=b?CKEDITOR.dtd[b]||(v._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c;if(!E&&!d["#"]&&b in e){p.onTagOpen(f[b]||"");p.onText(a)}else{g();i();!k&&!E&&(a=a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g," "));a=new CKEDITOR.htmlParser.text(a);
if(s(v,a))this.onTagOpen(l,{},0,1);v.add(a)}};p.onCDATA=function(a){v.add(new CKEDITOR.htmlParser.cdata(a))};p.onComment=function(a){g();i();v.add(new CKEDITOR.htmlParser.comment(a))};p.parse(d);for(g();v!=q;)t(v,v.parent,1);m(q);return q};CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,add:function(a,b){isNaN(b)&&(b=this.children.length);var c=b>0?this.children[b-1]:null;if(c){if(a._.isBlockLike&&c.type==CKEDITOR.NODE_TEXT){c.value=CKEDITOR.tools.rtrim(c.value);if(c.value.length===
0){this.children.pop();this.add(a);return}}c.next=a}a.previous=c;a.parent=this;this.children.splice(b,0,a);if(!this._.hasInlineStarted)this._.hasInlineStarted=a.type==CKEDITOR.NODE_TEXT||a.type==CKEDITOR.NODE_ELEMENT&&!a._.isBlockLike},filter:function(a,b){b=this.getFilterContext(b);a.onRoot(b,this);this.filterChildren(a,false,b)},filterChildren:function(a,b,c){if(this.childrenFilteredBy!=a.id){c=this.getFilterContext(c);if(b&&!this.parent)a.onRoot(c,this);this.childrenFilteredBy=a.id;for(b=0;b<this.children.length;b++)this.children[b].filter(a,
c)===false&&b--}},writeHtml:function(a,b){b&&this.filter(b);this.writeChildrenHtml(a)},writeChildrenHtml:function(a,b,c){var f=this.getFilterContext();if(c&&!this.parent&&b)b.onRoot(f,this);b&&this.filterChildren(b,false,f);b=0;c=this.children;for(f=c.length;b<f;b++)c[b].writeHtml(a)},forEach:function(a,b,c){if(!c&&(!b||this.type==b))var f=a(this);if(f!==false)for(var c=this.children,e=0;e<c.length;e++){f=c[e];f.type==CKEDITOR.NODE_ELEMENT?f.forEach(a,b):(!b||f.type==b)&&a(f)}},getFilterContext:function(a){return a||
{}}}})();"use strict";
(function(){function a(){this.rules=[]}function e(b,c,f,d){var e,l;for(e in c){(l=b[e])||(l=b[e]=new a);l.add(c[e],f,d)}}CKEDITOR.htmlParser.filter=CKEDITOR.tools.createClass({$:function(b){this.id=CKEDITOR.tools.getNextNumber();this.elementNameRules=new a;this.attributeNameRules=new a;this.elementsRules={};this.attributesRules={};this.textRules=new a;this.commentRules=new a;this.rootRules=new a;b&&this.addRules(b,10)},proto:{addRules:function(a,c){var f;if(typeof c=="number")f=c;else if(c&&"priority"in
c)f=c.priority;typeof f!="number"&&(f=10);typeof c!="object"&&(c={});a.elementNames&&this.elementNameRules.addMany(a.elementNames,f,c);a.attributeNames&&this.attributeNameRules.addMany(a.attributeNames,f,c);a.elements&&e(this.elementsRules,a.elements,f,c);a.attributes&&e(this.attributesRules,a.attributes,f,c);a.text&&this.textRules.add(a.text,f,c);a.comment&&this.commentRules.add(a.comment,f,c);a.root&&this.rootRules.add(a.root,f,c)},applyTo:function(a){a.filter(this)},onElementName:function(a,c){return this.elementNameRules.execOnName(a,
c)},onAttributeName:function(a,c){return this.attributeNameRules.execOnName(a,c)},onText:function(a,c,f){return this.textRules.exec(a,c,f)},onComment:function(a,c,f){return this.commentRules.exec(a,c,f)},onRoot:function(a,c){return this.rootRules.exec(a,c)},onElement:function(a,c){for(var f=[this.elementsRules["^"],this.elementsRules[c.name],this.elementsRules.$],d,e=0;e<3;e++)if(d=f[e]){d=d.exec(a,c,this);if(d===false)return null;if(d&&d!=c)return this.onNode(a,d);if(c.parent&&!c.name)break}return c},
onNode:function(a,c){var f=c.type;return f==CKEDITOR.NODE_ELEMENT?this.onElement(a,c):f==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(a,c.value)):f==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(a,c.value)):null},onAttribute:function(a,c,f,d){return(f=this.attributesRules[f])?f.exec(a,d,c,this):d}}});CKEDITOR.htmlParser.filterRulesGroup=a;a.prototype={add:function(a,c,f){this.rules.splice(this.findIndex(c),0,{value:a,priority:c,options:f})},addMany:function(a,
c,f){for(var d=[this.findIndex(c),0],e=0,l=a.length;e<l;e++)d.push({value:a[e],priority:c,options:f});this.rules.splice.apply(this.rules,d)},findIndex:function(a){for(var c=this.rules,f=c.length-1;f>=0&&a<c[f].priority;)f--;return f+1},exec:function(a,c){var f=c instanceof CKEDITOR.htmlParser.node||c instanceof CKEDITOR.htmlParser.fragment,d=Array.prototype.slice.call(arguments,1),e=this.rules,l=e.length,i,g,m,t;for(t=0;t<l;t++){if(f){i=c.type;g=c.name}m=e[t];if(!(a.nonEditable&&!m.options.applyToAll||
a.nestedEditable&&m.options.excludeNestedEditable)){m=m.value.apply(null,d);if(m===false||f&&m&&(m.name!=g||m.type!=i))return m;m!=null&&(d[0]=c=m)}}return c},execOnName:function(a,c){for(var f=0,d=this.rules,e=d.length,l;c&&f<e;f++){l=d[f];!(a.nonEditable&&!l.options.applyToAll||a.nestedEditable&&l.options.excludeNestedEditable)&&(c=c.replace(l.value[0],l.value[1]))}return c}}})();
(function(){function a(a,e){function n(a){return a||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text(" "):new CKEDITOR.htmlParser.element("br",{"data-cke-bogus":1})}function r(a,f){return function(e){if(e.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var j=[],k=b(e),x,r;if(k)for(w(k,1)&&j.push(k);k;){if(d(k)&&(x=c(k))&&w(x))if((r=c(x))&&!d(r))j.push(x);else{n(o).insertAfter(x);x.remove()}k=k.previous}for(k=0;k<j.length;k++)j[k].remove();if(j=(typeof f=="function"?f(e):f)!==false)if(!o&&!CKEDITOR.env.needsBrFiller&&
e.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)j=false;else if(!o&&!CKEDITOR.env.needsBrFiller&&(document.documentMode>7||e.name in CKEDITOR.dtd.tr||e.name in CKEDITOR.dtd.$listItem))j=false;else{j=b(e);j=!j||e.name=="form"&&j.name=="input"}j&&e.add(n(a))}}}function w(a,b){if((!o||CKEDITOR.env.needsBrFiller)&&a.type==CKEDITOR.NODE_ELEMENT&&a.name=="br"&&!a.attributes["data-cke-eol"])return true;var c;if(a.type==CKEDITOR.NODE_TEXT&&(c=a.value.match(j))){if(c.index){(new CKEDITOR.htmlParser.text(a.value.substring(0,
c.index))).insertBefore(a);a.value=c[0]}if(!CKEDITOR.env.needsBrFiller&&o&&(!b||a.parent.name in i))return true;if(!o)if((c=a.previous)&&c.name=="br"||!c||d(c))return true}return false}var g={elements:{}},o=e=="html",i=CKEDITOR.tools.extend({},k),C;for(C in i)"#"in v[C]||delete i[C];for(C in i)g.elements[C]=r(o,a.config.fillEmptyBlocks);g.root=r(o,false);g.elements.br=function(a){return function(b){if(b.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var e=b.attributes;if("data-cke-bogus"in e||"data-cke-eol"in
e)delete e["data-cke-bogus"];else{for(e=b.next;e&&f(e);)e=e.next;var j=c(b);!e&&d(b.parent)?h(b.parent,n(a)):d(e)&&(j&&!d(j))&&n(a).insertBefore(e)}}}}(o);return g}function e(a,b){return a!=CKEDITOR.ENTER_BR&&b!==false?a==CKEDITOR.ENTER_DIV?"div":"p":false}function b(a){for(a=a.children[a.children.length-1];a&&f(a);)a=a.previous;return a}function c(a){for(a=a.previous;a&&f(a);)a=a.previous;return a}function f(a){return a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(a.value)||a.type==CKEDITOR.NODE_ELEMENT&&
a.attributes["data-cke-bookmark"]}function d(a){return a&&(a.type==CKEDITOR.NODE_ELEMENT&&a.name in k||a.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)}function h(a,b){var c=a.children[a.children.length-1];a.children.push(b);b.parent=a;if(c){c.next=b;b.previous=c}}function l(a){a=a.attributes;a.contenteditable!="false"&&(a["data-cke-editable"]=a.contenteditable?"true":1);a.contenteditable="false"}function i(a){a=a.attributes;switch(a["data-cke-editable"]){case "true":a.contenteditable="true";break;case "1":delete a.contenteditable}}
function g(a){return a.replace(D,function(a,b,c){return"<"+b+c.replace(J,function(a,b){return z.test(b)&&c.indexOf("data-cke-saved-"+b)==-1?" data-cke-saved-"+a+" data-cke-"+CKEDITOR.rnd+"-"+a:a})+">"})}function m(a,b){return a.replace(b,function(a,b,c){a.indexOf("<textarea")===0&&(a=b+y(c).replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</textarea>");return"<cke:encoded>"+encodeURIComponent(a)+"</cke:encoded>"})}function t(a){return a.replace(w,function(a,b){return decodeURIComponent(b)})}function s(a){return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g,
function(a){return"<\!--"+u+"{C}"+encodeURIComponent(a).replace(/--/g,"%2D%2D")+"--\>"})}function y(a){return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g,function(a,b){return decodeURIComponent(b)})}function p(a,b){var c=b._.dataStore;return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g,function(a,b){return decodeURIComponent(b)}).replace(/\{cke_protected_(\d+)\}/g,function(a,b){return c&&c[b]||""})}function q(a,b){for(var c=[],d=b.config.protectedSource,f=b._.dataStore||(b._.dataStore=
{id:1}),e=/<\!--\{cke_temp(comment)?\}(\d*?)--\>/g,d=[/<script[\s\S]*?<\/script>/gi,/<noscript[\s\S]*?<\/noscript>/gi,/<meta[\s\S]*?\/?>/gi].concat(d),a=a.replace(/<\!--[\s\S]*?--\>/g,function(a){return"<\!--{cke_tempcomment}"+(c.push(a)-1)+"--\>"}),j=0;j<d.length;j++)a=a.replace(d[j],function(a){a=a.replace(e,function(a,b,d){return c[d]});return/cke_temp(comment)?/.test(a)?a:"<\!--{cke_temp}"+(c.push(a)-1)+"--\>"});a=a.replace(e,function(a,b,d){return"<\!--"+u+(b?"{C}":"")+encodeURIComponent(c[d]).replace(/--/g,
"%2D%2D")+"--\>"});a=a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=>]+))+\s*>/g,function(a){return a.replace(/<\!--\{cke_protected\}([^>]*)--\>/g,function(a,b){f[f.id]=decodeURIComponent(b);return"{cke_protected_"+f.id++ +"}"})});return a=a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g,function(a,c,d,f){return"<"+c+d+">"+p(y(f),b)+"</"+c+">"})}CKEDITOR.htmlDataProcessor=function(b){var c,d,f=this;this.editor=b;this.dataFilter=c=new CKEDITOR.htmlParser.filter;
this.htmlFilter=d=new CKEDITOR.htmlParser.filter;this.writer=new CKEDITOR.htmlParser.basicWriter;c.addRules(n);c.addRules(r,{applyToAll:true});c.addRules(a(b,"data"),{applyToAll:true});d.addRules(o);d.addRules(M,{applyToAll:true});d.addRules(a(b,"html"),{applyToAll:true});b.on("toHtml",function(a){var a=a.data,c=a.dataValue,d,c=q(c,b),c=m(c,B),c=g(c),c=m(c,L),c=c.replace(H,"$1cke:$2"),c=c.replace(A,"<cke:$1$2></cke:$1>"),c=c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g,"$1$2$2"),c=c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi,
"$1data-cke-"+CKEDITOR.rnd+"-$2");d=a.context||b.editable().getName();var f;if(CKEDITOR.env.ie&&CKEDITOR.env.version<9&&d=="pre"){d="div";c="<pre>"+c+"</pre>";f=1}d=b.document.createElement(d);d.setHtml("a"+c);c=d.getHtml().substr(1);c=c.replace(RegExp("data-cke-"+CKEDITOR.rnd+"-","ig"),"");f&&(c=c.replace(/^<pre>|<\/pre>$/gi,""));c=c.replace(C,"$1$2");c=t(c);c=y(c);d=a.fixForBody===false?false:e(a.enterMode,b.config.autoParagraph);c=CKEDITOR.htmlParser.fragment.fromHtml(c,a.context,d);if(d){f=c;
if(!f.children.length&&CKEDITOR.dtd[f.name][d]){d=new CKEDITOR.htmlParser.element(d);f.add(d)}}a.dataValue=c},null,null,5);b.on("toHtml",function(a){a.data.filter.applyTo(a.data.dataValue,true,a.data.dontFilter,a.data.enterMode)&&b.fire("dataFiltered")},null,null,6);b.on("toHtml",function(a){a.data.dataValue.filterChildren(f.dataFilter,true)},null,null,10);b.on("toHtml",function(a){var a=a.data,b=a.dataValue,c=new CKEDITOR.htmlParser.basicWriter;b.writeChildrenHtml(c);b=c.getHtml(true);a.dataValue=
s(b)},null,null,15);b.on("toDataFormat",function(a){var c=a.data.dataValue;a.data.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/^<br *\/?>/i,""));a.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(c,a.data.context,e(a.data.enterMode,b.config.autoParagraph))},null,null,5);b.on("toDataFormat",function(a){a.data.dataValue.filterChildren(f.htmlFilter,true)},null,null,10);b.on("toDataFormat",function(a){a.data.filter.applyTo(a.data.dataValue,false,true)},null,null,11);b.on("toDataFormat",function(a){var c=
a.data.dataValue,d=f.writer;d.reset();c.writeChildrenHtml(d);c=d.getHtml(true);c=y(c);c=p(c,b);a.data.dataValue=c},null,null,15)};CKEDITOR.htmlDataProcessor.prototype={toHtml:function(a,b,c,d){var f=this.editor,e,j,k;if(b&&typeof b=="object"){e=b.context;c=b.fixForBody;d=b.dontFilter;j=b.filter;k=b.enterMode}else e=b;!e&&e!==null&&(e=f.editable().getName());return f.fire("toHtml",{dataValue:a,context:e,fixForBody:c,dontFilter:d,filter:j||f.filter,enterMode:k||f.enterMode}).dataValue},toDataFormat:function(a,
b){var c,d,f;if(b){c=b.context;d=b.filter;f=b.enterMode}!c&&c!==null&&(c=this.editor.editable().getName());return this.editor.fire("toDataFormat",{dataValue:a,filter:d||this.editor.filter,context:c,enterMode:f||this.editor.enterMode}).dataValue}};var j=/(?:&nbsp;|\xa0)$/,u="{cke_protected}",v=CKEDITOR.dtd,E=["caption","colgroup","col","thead","tfoot","tbody"],k=CKEDITOR.tools.extend({},v.$blockLimit,v.$block),n={elements:{input:l,textarea:l}},r={attributeNames:[[/^on/,"data-cke-pa-on"],[/^data-cke-expando$/,
""]]},o={elements:{embed:function(a){var b=a.parent;if(b&&b.name=="object"){var c=b.attributes.width,b=b.attributes.height;if(c)a.attributes.width=c;if(b)a.attributes.height=b}},a:function(a){if(!a.children.length&&!a.attributes.name&&!a.attributes["data-cke-saved-name"])return false}}},M={elementNames:[[/^cke:/,""],[/^\?xml:namespace$/,""]],attributeNames:[[/^data-cke-(saved|pa)-/,""],[/^data-cke-.*/,""],["hidefocus",""]],elements:{$:function(a){var b=a.attributes;if(b){if(b["data-cke-temp"])return false;
for(var c=["name","href","src"],d,f=0;f<c.length;f++){d="data-cke-saved-"+c[f];d in b&&delete b[c[f]]}}return a},table:function(a){a.children.slice(0).sort(function(a,b){var c,d;if(a.type==CKEDITOR.NODE_ELEMENT&&b.type==a.type){c=CKEDITOR.tools.indexOf(E,a.name);d=CKEDITOR.tools.indexOf(E,b.name)}if(!(c>-1&&d>-1&&c!=d)){c=a.parent?a.getIndex():-1;d=b.parent?b.getIndex():-1}return c>d?1:-1})},param:function(a){a.children=[];a.isEmpty=true;return a},span:function(a){a.attributes["class"]=="Apple-style-span"&&
delete a.name},html:function(a){delete a.attributes.contenteditable;delete a.attributes["class"]},body:function(a){delete a.attributes.spellcheck;delete a.attributes.contenteditable},style:function(a){var b=a.children[0];if(b&&b.value)b.value=CKEDITOR.tools.trim(b.value);if(!a.attributes.type)a.attributes.type="text/css"},title:function(a){var b=a.children[0];!b&&h(a,b=new CKEDITOR.htmlParser.text);b.value=a.attributes["data-cke-title"]||""},input:i,textarea:i},attributes:{"class":function(a){return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g,
""))||false}}};if(CKEDITOR.env.ie)M.attributes.style=function(a){return a.replace(/(^|;)([^\:]+)/g,function(a){return a.toLowerCase()})};var D=/<(a|area|img|input|source)\b([^>]*)>/gi,J=/([\w-]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,z=/^(href|src|name)$/i,L=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,B=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,w=/<cke:encoded>([^<]*)<\/cke:encoded>/gi,H=/(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
C=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,A=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi})();"use strict";
CKEDITOR.htmlParser.element=function(a,e){this.name=a;this.attributes=e||{};this.children=[];var b=a||"",c=b.match(/^cke:(.*)/);c&&(b=c[1]);b=!(!CKEDITOR.dtd.$nonBodyContent[b]&&!CKEDITOR.dtd.$block[b]&&!CKEDITOR.dtd.$listItem[b]&&!CKEDITOR.dtd.$tableContent[b]&&!(CKEDITOR.dtd.$nonEditable[b]||b=="br"));this.isEmpty=!!CKEDITOR.dtd.$empty[a];this.isUnknown=!CKEDITOR.dtd[a];this._={isBlockLike:b,hasInlineStarted:this.isEmpty||!b}};
CKEDITOR.htmlParser.cssStyle=function(a){var e={};((a instanceof CKEDITOR.htmlParser.element?a.attributes.style:a)||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,c,f){c=="font-family"&&(f=f.replace(/["']/g,""));e[c.toLowerCase()]=f});return{rules:e,populate:function(a){var c=this.toString();if(c)a instanceof CKEDITOR.dom.element?a.setAttribute("style",c):a instanceof CKEDITOR.htmlParser.element?a.attributes.style=c:a.style=c},toString:function(){var a=[],c;
for(c in e)e[c]&&a.push(c,":",e[c],";");return a.join("")}}};
(function(){function a(a){return function(b){return b.type==CKEDITOR.NODE_ELEMENT&&(typeof a=="string"?b.name==a:b.name in a)}}var e=function(a,b){a=a[0];b=b[0];return a<b?-1:a>b?1:0},b=CKEDITOR.htmlParser.fragment.prototype;CKEDITOR.htmlParser.element.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_ELEMENT,add:b.add,clone:function(){return new CKEDITOR.htmlParser.element(this.name,this.attributes)},filter:function(a,b){var d=this,e,l,b=d.getFilterContext(b);if(b.off)return true;
if(!d.parent)a.onRoot(b,d);for(;;){e=d.name;if(!(l=a.onElementName(b,e))){this.remove();return false}d.name=l;if(!(d=a.onElement(b,d))){this.remove();return false}if(d!==this){this.replaceWith(d);return false}if(d.name==e)break;if(d.type!=CKEDITOR.NODE_ELEMENT){this.replaceWith(d);return false}if(!d.name){this.replaceWithChildren();return false}}e=d.attributes;var i,g;for(i in e){g=i;for(l=e[i];;)if(g=a.onAttributeName(b,i))if(g!=i){delete e[i];i=g}else break;else{delete e[i];break}g&&((l=a.onAttribute(b,
d,g,l))===false?delete e[g]:e[g]=l)}d.isEmpty||this.filterChildren(a,false,b);return true},filterChildren:b.filterChildren,writeHtml:function(a,b){b&&this.filter(b);var d=this.name,h=[],l=this.attributes,i,g;a.openTag(d,l);for(i in l)h.push([i,l[i]]);a.sortAttributes&&h.sort(e);i=0;for(g=h.length;i<g;i++){l=h[i];a.attribute(l[0],l[1])}a.openTagClose(d,this.isEmpty);this.writeChildrenHtml(a);this.isEmpty||a.closeTag(d)},writeChildrenHtml:b.writeChildrenHtml,replaceWithChildren:function(){for(var a=
this.children,b=a.length;b;)a[--b].insertAfter(this);this.remove()},forEach:b.forEach,getFirst:function(b){if(!b)return this.children.length?this.children[0]:null;typeof b!="function"&&(b=a(b));for(var f=0,d=this.children.length;f<d;++f)if(b(this.children[f]))return this.children[f];return null},getHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;this.writeChildrenHtml(a);return a.getHtml()},setHtml:function(a){for(var a=this.children=CKEDITOR.htmlParser.fragment.fromHtml(a).children,b=0,
d=a.length;b<d;++b)a[b].parent=this},getOuterHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;this.writeHtml(a);return a.getHtml()},split:function(a){for(var b=this.children.splice(a,this.children.length-a),d=this.clone(),e=0;e<b.length;++e)b[e].parent=d;d.children=b;if(b[0])b[0].previous=null;if(a>0)this.children[a-1].next=null;this.parent.add(d,this.getIndex()+1);return d},addClass:function(a){if(!this.hasClass(a)){var b=this.attributes["class"]||"";this.attributes["class"]=b+(b?" ":"")+
a}},removeClass:function(a){var b=this.attributes["class"];if(b)(b=CKEDITOR.tools.trim(b.replace(RegExp("(?:\\s+|^)"+a+"(?:\\s+|$)")," ")))?this.attributes["class"]=b:delete this.attributes["class"]},hasClass:function(a){var b=this.attributes["class"];return!b?false:RegExp("(?:^|\\s)"+a+"(?=\\s|$)").test(b)},getFilterContext:function(a){var b=[];a||(a={off:false,nonEditable:false,nestedEditable:false});!a.off&&this.attributes["data-cke-processor"]=="off"&&b.push("off",true);!a.nonEditable&&this.attributes.contenteditable==
"false"?b.push("nonEditable",true):a.nonEditable&&(!a.nestedEditable&&this.attributes.contenteditable=="true")&&b.push("nestedEditable",true);if(b.length)for(var a=CKEDITOR.tools.copy(a),d=0;d<b.length;d=d+2)a[b[d]]=b[d+1];return a}},true)})();
(function(){var a={},e=/{([^}]+)}/g,b=/([\\'])/g,c=/\n/g,f=/\r/g;CKEDITOR.template=function(d){if(a[d])this.output=a[d];else{var h=d.replace(b,"\\$1").replace(c,"\\n").replace(f,"\\r").replace(e,function(a,b){return"',data['"+b+"']==undefined?'{"+b+"}':data['"+b+"'],'"});this.output=a[d]=Function("data","buffer","return buffer?buffer.push('"+h+"'):['"+h+"'].join('');")}}})();delete CKEDITOR.loadFullCore;CKEDITOR.instances={};CKEDITOR.document=new CKEDITOR.dom.document(document);
CKEDITOR.add=function(a){CKEDITOR.instances[a.name]=a;a.on("focus",function(){if(CKEDITOR.currentInstance!=a){CKEDITOR.currentInstance=a;CKEDITOR.fire("currentInstance")}});a.on("blur",function(){if(CKEDITOR.currentInstance==a){CKEDITOR.currentInstance=null;CKEDITOR.fire("currentInstance")}});CKEDITOR.fire("instance",null,a)};CKEDITOR.remove=function(a){delete CKEDITOR.instances[a.name]};
(function(){var a={};CKEDITOR.addTemplate=function(e,b){var c=a[e];if(c)return c;c={name:e,source:b};CKEDITOR.fire("template",c);return a[e]=new CKEDITOR.template(c.source)};CKEDITOR.getTemplate=function(e){return a[e]}})();(function(){var a=[];CKEDITOR.addCss=function(e){a.push(e)};CKEDITOR.getCss=function(){return a.join("\n")}})();CKEDITOR.on("instanceDestroyed",function(){CKEDITOR.tools.isEmpty(this.instances)&&CKEDITOR.fire("reset")});CKEDITOR.TRISTATE_ON=1;CKEDITOR.TRISTATE_OFF=2;
CKEDITOR.TRISTATE_DISABLED=0;
(function(){CKEDITOR.inline=function(a,e){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+a.getEditor().name+'" is already attached to the provided element.';var b=new CKEDITOR.editor(e,a,CKEDITOR.ELEMENT_MODE_INLINE),c=a.is("textarea")?a:null;if(c){b.setData(c.getValue(),null,true);a=CKEDITOR.dom.element.createFromHtml('<div contenteditable="'+!!b.readOnly+'" class="cke_textarea_inline">'+c.getValue()+"</div>",CKEDITOR.document);
a.insertAfter(c);c.hide();c.$.form&&b._attachToForm()}else b.setData(a.getHtml(),null,true);b.on("loaded",function(){b.fire("uiReady");b.editable(a);b.container=a;b.setData(b.getData(1));b.resetDirty();b.fire("contentDom");b.mode="wysiwyg";b.fire("mode");b.status="ready";b.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,b)},null,null,1E4);b.on("destroy",function(){if(c){b.container.clearCustomData();b.container.remove();c.show()}b.element.clearCustomData();delete b.element});return b};
CKEDITOR.inlineAll=function(){var a,e,b;for(b in CKEDITOR.dtd.$editable)for(var c=CKEDITOR.document.getElementsByTag(b),f=0,d=c.count();f<d;f++){a=c.getItem(f);if(a.getAttribute("contenteditable")=="true"){e={element:a,config:{}};CKEDITOR.fire("inline",e)!==false&&CKEDITOR.inline(a,e.config)}}};CKEDITOR.domReady(function(){!CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll()})})();CKEDITOR.replaceClass="ckeditor";
(function(){function a(a,f,d,h){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+a.getEditor().name+'" is already attached to the provided element.';var l=new CKEDITOR.editor(f,a,h);if(h==CKEDITOR.ELEMENT_MODE_REPLACE){a.setStyle("visibility","hidden");l._.required=a.hasAttribute("required");a.removeAttribute("required")}d&&l.setData(d,null,true);l.on("loaded",function(){b(l);h==CKEDITOR.ELEMENT_MODE_REPLACE&&(l.config.autoUpdateElement&&
a.$.form)&&l._attachToForm();l.setMode(l.config.startupMode,function(){l.resetDirty();l.status="ready";l.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,l)})});l.on("destroy",e);return l}function e(){var a=this.container,b=this.element;if(a){a.clearCustomData();a.remove()}if(b){b.clearCustomData();if(this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE){b.show();this._.required&&b.setAttribute("required","required")}delete this.element}}function b(a){var b=a.name,d=a.element,e=a.elementMode,
l=a.fire("uiSpace",{space:"top",html:""}).html,i=a.fire("uiSpace",{space:"bottom",html:""}).html,g=new CKEDITOR.template('<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} '+CKEDITOR.env.cssClass+'"  dir="{langDir}" lang="{langCode}" role="application"'+(a.title?' aria-labelledby="cke_{name}_arialbl"':"")+">"+(a.title?'<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>':"")+'<{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'),
b=CKEDITOR.dom.element.createFromHtml(g.output({id:a.id,name:b,langDir:a.lang.dir,langCode:a.langCode,voiceLabel:a.title,topHtml:l?'<span id="'+a.ui.spaceId("top")+'" class="cke_top cke_reset_all" role="presentation" style="height:auto">'+l+"</span>":"",contentId:a.ui.spaceId("contents"),bottomHtml:i?'<span id="'+a.ui.spaceId("bottom")+'" class="cke_bottom cke_reset_all" role="presentation">'+i+"</span>":"",outerEl:CKEDITOR.env.ie?"span":"div"}));if(e==CKEDITOR.ELEMENT_MODE_REPLACE){d.hide();b.insertAfter(d)}else d.append(b);
a.container=b;l&&a.ui.space("top").unselectable();i&&a.ui.space("bottom").unselectable();d=a.config.width;e=a.config.height;d&&b.setStyle("width",CKEDITOR.tools.cssLength(d));e&&a.ui.space("contents").setStyle("height",CKEDITOR.tools.cssLength(e));b.disableContextMenu();CKEDITOR.env.webkit&&b.on("focus",function(){a.focus()});a.fireOnce("uiReady")}CKEDITOR.replace=function(b,f){return a(b,f,null,CKEDITOR.ELEMENT_MODE_REPLACE)};CKEDITOR.appendTo=function(b,f,d){return a(b,f,d,CKEDITOR.ELEMENT_MODE_APPENDTO)};
CKEDITOR.replaceAll=function(){for(var a=document.getElementsByTagName("textarea"),b=0;b<a.length;b++){var d=null,e=a[b];if(e.name||e.id){if(typeof arguments[0]=="string"){if(!RegExp("(?:^|\\s)"+arguments[0]+"(?:$|\\s)").test(e.className))continue}else if(typeof arguments[0]=="function"){d={};if(arguments[0](e,d)===false)continue}this.replace(e,d)}}};CKEDITOR.editor.prototype.addMode=function(a,b){(this._.modes||(this._.modes={}))[a]=b};CKEDITOR.editor.prototype.setMode=function(a,b){var d=this,e=
this._.modes;if(!(a==d.mode||!e||!e[a])){d.fire("beforeSetMode",a);if(d.mode){var l=d.checkDirty(),e=d._.previousModeData,i,g=0;d.fire("beforeModeUnload");d.editable(0);d._.previousMode=d.mode;d._.previousModeData=i=d.getData(1);if(d.mode=="source"&&e==i){d.fire("lockSnapshot",{forceUpdate:true});g=1}d.ui.space("contents").setHtml("");d.mode=""}else d._.previousModeData=d.getData(1);this._.modes[a](function(){d.mode=a;l!==void 0&&!l&&d.resetDirty();g?d.fire("unlockSnapshot"):a=="wysiwyg"&&d.fire("saveSnapshot");
setTimeout(function(){d.fire("mode");b&&b.call(d)},0)})}};CKEDITOR.editor.prototype.resize=function(a,b,d,e){var l=this.container,i=this.ui.space("contents"),g=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement,e=e?this.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}):l;e.setSize("width",a,true);g&&(g.style.width="1%");i.setStyle("height",Math.max(b-(d?0:(e.$.offsetHeight||0)-(i.$.clientHeight||0)),0)+"px");g&&(g.style.width=
"100%");this.fire("resize")};CKEDITOR.editor.prototype.getResizable=function(a){return a?this.ui.space("contents"):this.container};CKEDITOR.domReady(function(){CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass)})})();CKEDITOR.config.startupMode="wysiwyg";
(function(){function a(a){var b=a.editor,d=a.data.path,f=d.blockLimit,k=a.data.selection,n=k.getRanges()[0],r;if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)if(k=e(k,d)){k.appendBogus();r=CKEDITOR.env.ie}if(h(b,d.block,f)&&n.collapsed&&!n.getCommonAncestor().isReadOnly()){d=n.clone();d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);f=new CKEDITOR.dom.walker(d);f.guard=function(a){return!c(a)||a.type==CKEDITOR.NODE_COMMENT||a.isReadOnly()};if(!f.checkForward()||d.checkStartOfBlock()&&
d.checkEndOfBlock()){b=n.fixBlock(true,b.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p");if(!CKEDITOR.env.needsBrFiller)(b=b.getFirst(c))&&(b.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/))&&b.remove();r=1;a.cancel()}}r&&n.select()}function e(a,b){if(a.isFake)return 0;var d=b.block||b.blockLimit,e=d&&d.getLast(c);if(d&&d.isBlockBoundary()&&(!e||!(e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary()))&&!d.is("pre")&&!d.getBogus())return d}function b(a){var b=a.data.getTarget();
if(b.is("input")){b=b.getAttribute("type");(b=="submit"||b=="reset")&&a.data.preventDefault()}}function c(a){return s(a)&&y(a)}function f(a,b){return function(c){var d=CKEDITOR.dom.element.get(c.data.$.toElement||c.data.$.fromElement||c.data.$.relatedTarget);(!d||!b.equals(d)&&!b.contains(d))&&a.call(this,c)}}function d(a){function b(a){return function(b,e){e&&(b.type==CKEDITOR.NODE_ELEMENT&&b.is(f))&&(d=b);if(!e&&c(b)&&(!a||!m(b)))return false}}var d,e=a.getRanges()[0],a=a.root,f={table:1,ul:1,ol:1,
dl:1};if(e.startPath().contains(f)){var n=e.clone();n.collapse(1);n.setStartAt(a,CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(n);a.guard=b();a.checkBackward();if(d){n=e.clone();n.collapse();n.setEndAt(d,CKEDITOR.POSITION_AFTER_END);a=new CKEDITOR.dom.walker(n);a.guard=b(true);d=false;a.checkForward();return d}}return null}function h(a,b,c){return a.config.autoParagraph!==false&&a.activeEnterMode!=CKEDITOR.ENTER_BR&&a.editable().equals(c)&&!b||b&&b.getAttribute("contenteditable")=="true"}
function l(a){a.editor.focus();a.editor.fire("saveSnapshot")}function i(a){var b=a.editor;b.getSelection().scrollIntoView();setTimeout(function(){b.fire("saveSnapshot")},0)}function g(a,b,c){for(var d=a.getCommonAncestor(b),b=a=c?b:a;(a=a.getParent())&&!d.equals(a)&&a.getChildCount()==1;)b=a;b.remove()}CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,$:function(a,b){this.base(b.$||b);this.editor=a;this.status="unloaded";this.hasFocus=false;this.setup()},proto:{focus:function(){var a;
if(CKEDITOR.env.webkit&&!this.hasFocus){a=this.editor._.previousActive||this.getDocument().getActive();if(this.contains(a)){a.focus();return}}try{this.$[CKEDITOR.env.ie&&this.getDocument().equals(CKEDITOR.document)?"setActive":"focus"]()}catch(b){if(!CKEDITOR.env.ie)throw b;}if(CKEDITOR.env.safari&&!this.isInline()){a=CKEDITOR.document.getActive();a.equals(this.getWindow().getFrame())||this.getWindow().focus()}},on:function(a,b){var c=Array.prototype.slice.call(arguments,0);if(CKEDITOR.env.ie&&/^focus|blur$/.exec(a)){a=
a=="focus"?"focusin":"focusout";b=f(b,this);c[0]=a;c[1]=b}return CKEDITOR.dom.element.prototype.on.apply(this,c)},attachListener:function(a){!this._.listeners&&(this._.listeners=[]);var b=Array.prototype.slice.call(arguments,1),b=a.on.apply(a,b);this._.listeners.push(b);return b},clearListeners:function(){var a=this._.listeners;try{for(;a.length;)a.pop().removeListener()}catch(b){}},restoreAttrs:function(){var a=this._.attrChanges,b,c;for(c in a)if(a.hasOwnProperty(c)){b=a[c];b!==null?this.setAttribute(c,
b):this.removeAttribute(c)}},attachClass:function(a){var b=this.getCustomData("classes");if(!this.hasClass(a)){!b&&(b=[]);b.push(a);this.setCustomData("classes",b);this.addClass(a)}},changeAttr:function(a,b){var c=this.getAttribute(a);if(b!==c){!this._.attrChanges&&(this._.attrChanges={});a in this._.attrChanges||(this._.attrChanges[a]=c);this.setAttribute(a,b)}},insertHtml:function(a,b){l(this);p(this,b||"html",a)},insertText:function(a){l(this);var b=this.editor,c=b.getSelection().getStartElement().hasAscendant("pre",
true)?CKEDITOR.ENTER_BR:b.activeEnterMode,b=c==CKEDITOR.ENTER_BR,d=CKEDITOR.tools,a=d.htmlEncode(a.replace(/\r\n/g,"\n")),a=a.replace(/\t/g,"&nbsp;&nbsp; &nbsp;"),c=c==CKEDITOR.ENTER_P?"p":"div";if(!b){var e=/\n{2}/g;if(e.test(a))var f="<"+c+">",r="</"+c+">",a=f+a.replace(e,function(){return r+f})+r}a=a.replace(/\n/g,"<br>");b||(a=a.replace(RegExp("<br>(?=</"+c+">)"),function(a){return d.repeat(a,2)}));a=a.replace(/^ | $/g,"&nbsp;");a=a.replace(/(>|\s) /g,function(a,b){return b+"&nbsp;"}).replace(/ (?=<)/g,
"&nbsp;");p(this,"text",a)},insertElement:function(a,b){b?this.insertElementIntoRange(a,b):this.insertElementIntoSelection(a)},insertElementIntoRange:function(a,b){var c=this.editor,d=c.config.enterMode,e=a.getName(),f=CKEDITOR.dtd.$block[e];if(b.checkReadOnly())return false;b.deleteContents(1);b.startContainer.type==CKEDITOR.NODE_ELEMENT&&b.startContainer.is({tr:1,table:1,tbody:1,thead:1,tfoot:1})&&q(b);var r,g;if(f)for(;(r=b.getCommonAncestor(0,1))&&(g=CKEDITOR.dtd[r.getName()])&&(!g||!g[e]);)if(r.getName()in
CKEDITOR.dtd.span)b.splitElement(r);else if(b.checkStartOfBlock()&&b.checkEndOfBlock()){b.setStartBefore(r);b.collapse(true);r.remove()}else b.splitBlock(d==CKEDITOR.ENTER_DIV?"div":"p",c.editable());b.insertNode(a);return true},insertElementIntoSelection:function(a){l(this);var b=this.editor,d=b.activeEnterMode,b=b.getSelection(),e=b.getRanges()[0],f=a.getName(),f=CKEDITOR.dtd.$block[f];if(this.insertElementIntoRange(a,e)){e.moveToPosition(a,CKEDITOR.POSITION_AFTER_END);if(f)if((f=a.getNext(function(a){return c(a)&&
!m(a)}))&&f.type==CKEDITOR.NODE_ELEMENT&&f.is(CKEDITOR.dtd.$block))f.getDtd()["#"]?e.moveToElementEditStart(f):e.moveToElementEditEnd(a);else if(!f&&d!=CKEDITOR.ENTER_BR){f=e.fixBlock(true,d==CKEDITOR.ENTER_DIV?"div":"p");e.moveToElementEditStart(f)}}b.selectRanges([e]);i(this)},setData:function(a,b){b||(a=this.editor.dataProcessor.toHtml(a));this.setHtml(a);this.fixInitialSelection();if(this.status=="unloaded")this.status="ready";this.editor.fire("dataReady")},getData:function(a){var b=this.getHtml();
a||(b=this.editor.dataProcessor.toDataFormat(b));return b},setReadOnly:function(a){this.setAttribute("contenteditable",!a)},detach:function(){this.removeClass("cke_editable");this.status="detached";var a=this.editor;this._.detach();delete a.document;delete a.window},isInline:function(){return this.getDocument().equals(CKEDITOR.document)},fixInitialSelection:function(){function a(){var b=c.getDocument().$,d=b.getSelection(),e;if(d.anchorNode&&d.anchorNode==c.$)e=true;else if(CKEDITOR.env.webkit){var f=
c.getDocument().getActive();f&&(f.equals(c)&&!d.anchorNode)&&(e=true)}if(e){e=new CKEDITOR.dom.range(c);e.moveToElementEditStart(c);b=b.createRange();b.setStart(e.startContainer.$,e.startOffset);b.collapse(true);d.removeAllRanges();d.addRange(b)}}function b(){var a=c.getDocument().$,d=a.selection,e=c.getDocument().getActive();if(d.type=="None"&&e.equals(c)){d=new CKEDITOR.dom.range(c);a=a.body.createTextRange();d.moveToElementEditStart(c);d=d.startContainer;d.type!=CKEDITOR.NODE_ELEMENT&&(d=d.getParent());
a.moveToElementText(d.$);a.collapse(true);a.select()}}var c=this;if(CKEDITOR.env.ie&&CKEDITOR.env.version<9){if(this.hasFocus){this.focus();b()}}else if(this.hasFocus){this.focus();a()}else this.once("focus",function(){a()},null,null,-999)},setup:function(){var a=this.editor;this.attachListener(a,"beforeGetData",function(){var b=this.getData();this.is("textarea")||a.config.ignoreEmptyParagraph!==false&&(b=b.replace(t,function(a,b){return b}));a.setData(b,null,1)},this);this.attachListener(a,"getSnapshot",
function(a){a.data=this.getData(1)},this);this.attachListener(a,"afterSetData",function(){this.setData(a.getData(1))},this);this.attachListener(a,"loadSnapshot",function(a){this.setData(a.data,1)},this);this.attachListener(a,"beforeFocus",function(){var b=a.getSelection();(b=b&&b.getNative())&&b.type=="Control"||this.focus()},this);this.attachListener(a,"insertHtml",function(a){this.insertHtml(a.data.dataValue,a.data.mode)},this);this.attachListener(a,"insertElement",function(a){this.insertElement(a.data)},
this);this.attachListener(a,"insertText",function(a){this.insertText(a.data)},this);this.setReadOnly(a.readOnly);this.attachClass("cke_editable");this.attachClass(a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?"cke_editable_inline":a.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE||a.elementMode==CKEDITOR.ELEMENT_MODE_APPENDTO?"cke_editable_themed":"");this.attachClass("cke_contents_"+a.config.contentsLangDirection);a.keystrokeHandler.blockedKeystrokes[8]=+a.readOnly;a.keystrokeHandler.attach(this);this.on("blur",
function(){this.hasFocus=false},null,null,-1);this.on("focus",function(){this.hasFocus=true},null,null,-1);a.focusManager.add(this);if(this.equals(CKEDITOR.document.getActive())){this.hasFocus=true;a.once("contentDom",function(){a.focusManager.focus(this)},this)}this.isInline()&&this.changeAttr("tabindex",a.tabIndex);if(!this.is("textarea")){a.document=this.getDocument();a.window=this.getWindow();var e=a.document;this.changeAttr("spellcheck",!a.config.disableNativeSpellChecker);var f=a.config.contentsLangDirection;
this.getDirection(1)!=f&&this.changeAttr("dir",f);var h=CKEDITOR.getCss();if(h){f=e.getHead();if(!f.getCustomData("stylesheet")){h=e.appendStyleText(h);h=new CKEDITOR.dom.element(h.ownerNode||h.owningElement);f.setCustomData("stylesheet",h);h.data("cke-temp",1)}}f=e.getCustomData("stylesheet_ref")||0;e.setCustomData("stylesheet_ref",f+1);this.setCustomData("cke_includeReadonly",!a.config.disableReadonlyStyling);this.attachListener(this,"click",function(a){var a=a.data,b=(new CKEDITOR.dom.elementPath(a.getTarget(),
this)).contains("a");b&&(a.$.button!=2&&b.isReadOnly())&&a.preventDefault()});var k={8:1,46:1};this.attachListener(a,"key",function(b){if(a.readOnly)return true;var c=b.data.domEvent.getKey(),e;if(c in k){var b=a.getSelection(),f,g=b.getRanges()[0],h=g.startPath(),i,m,l,c=c==8;if(CKEDITOR.env.ie&&CKEDITOR.env.version<11&&(f=b.getSelectedElement())||(f=d(b))){a.fire("saveSnapshot");g.moveToPosition(f,CKEDITOR.POSITION_BEFORE_START);f.remove();g.select();a.fire("saveSnapshot");e=1}else if(g.collapsed)if((i=
h.block)&&(l=i[c?"getPrevious":"getNext"](s))&&l.type==CKEDITOR.NODE_ELEMENT&&l.is("table")&&g[c?"checkStartOfBlock":"checkEndOfBlock"]()){a.fire("saveSnapshot");g[c?"checkEndOfBlock":"checkStartOfBlock"]()&&i.remove();g["moveToElementEdit"+(c?"End":"Start")](l);g.select();a.fire("saveSnapshot");e=1}else if(h.blockLimit&&h.blockLimit.is("td")&&(m=h.blockLimit.getAscendant("table"))&&g.checkBoundaryOfElement(m,c?CKEDITOR.START:CKEDITOR.END)&&(l=m[c?"getPrevious":"getNext"](s))){a.fire("saveSnapshot");
g["moveToElementEdit"+(c?"End":"Start")](l);g.checkStartOfBlock()&&g.checkEndOfBlock()?l.remove():g.select();a.fire("saveSnapshot");e=1}else if((m=h.contains(["td","th","caption"]))&&g.checkBoundaryOfElement(m,c?CKEDITOR.START:CKEDITOR.END))e=1}return!e});a.blockless&&(CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)&&this.attachListener(this,"keyup",function(b){if(b.data.getKeystroke()in k&&!this.getFirst(c)){this.appendBogus();b=a.createRange();b.moveToPosition(this,CKEDITOR.POSITION_AFTER_START);b.select()}});
this.attachListener(this,"dblclick",function(b){if(a.readOnly)return false;b={element:b.data.getTarget()};a.fire("doubleclick",b)});CKEDITOR.env.ie&&this.attachListener(this,"click",b);CKEDITOR.env.ie||this.attachListener(this,"mousedown",function(b){var c=b.data.getTarget();if(c.is("img","hr","input","textarea","select")&&!c.isReadOnly()){a.getSelection().selectElement(c);c.is("input","textarea","select")&&b.data.preventDefault()}});CKEDITOR.env.gecko&&this.attachListener(this,"mouseup",function(b){if(b.data.$.button==
2){b=b.data.getTarget();if(!b.getOuterHtml().replace(t,"")){var c=a.createRange();c.moveToElementEditStart(b);c.select(true)}}});if(CKEDITOR.env.webkit){this.attachListener(this,"click",function(a){a.data.getTarget().is("input","select")&&a.data.preventDefault()});this.attachListener(this,"mouseup",function(a){a.data.getTarget().is("input","textarea")&&a.data.preventDefault()})}CKEDITOR.env.webkit&&this.attachListener(a,"key",function(b){b=b.data.domEvent.getKey();if(b in k){var c=b==8,d=a.getSelection().getRanges()[0],
b=d.startPath();if(d.collapsed){var e;a:{var f=b.block;if(f)if(d[c?"checkStartOfBlock":"checkEndOfBlock"]())if(!d.moveToClosestEditablePosition(f,!c)||!d.collapsed)e=false;else{if(d.startContainer.type==CKEDITOR.NODE_ELEMENT){var h=d.startContainer.getChild(d.startOffset-(c?1:0));if(h&&h.type==CKEDITOR.NODE_ELEMENT&&h.is("hr")){a.fire("saveSnapshot");h.remove();e=true;break a}}if((d=d.startPath().block)&&(!d||!d.contains(f))){a.fire("saveSnapshot");var i;(i=(c?d:f).getBogus())&&i.remove();e=a.getSelection();
i=e.createBookmarks();(c?f:d).moveChildren(c?d:f,false);b.lastElement.mergeSiblings();g(f,d,!c);e.selectBookmarks(i);e=true}}else e=false;else e=false}if(!e)return}else{c=d;e=b.block;i=c.endPath().block;if(!e||!i||e.equals(i))b=false;else{a.fire("saveSnapshot");(f=e.getBogus())&&f.remove();c.deleteContents();if(i.getParent()){i.moveChildren(e,false);b.lastElement.mergeSiblings();g(e,i,true)}c=a.getSelection().getRanges()[0];c.collapse(1);c.select();b=true}if(!b)return}a.getSelection().scrollIntoView();
a.fire("saveSnapshot");return false}},this,null,100)}}},_:{detach:function(){this.editor.setData(this.editor.getData(),0,1);this.clearListeners();this.restoreAttrs();var a;if(a=this.removeCustomData("classes"))for(;a.length;)this.removeClass(a.pop());if(!this.is("textarea")){a=this.getDocument();var b=a.getHead();if(b.getCustomData("stylesheet")){var c=a.getCustomData("stylesheet_ref");if(--c)a.setCustomData("stylesheet_ref",c);else{a.removeCustomData("stylesheet_ref");b.removeCustomData("stylesheet").remove()}}}this.editor.fire("contentDomUnload");
delete this.editor}}});CKEDITOR.editor.prototype.editable=function(a){var b=this._.editable;if(b&&a)return 0;if(arguments.length)b=this._.editable=a?a instanceof CKEDITOR.editable?a:new CKEDITOR.editable(this,a):(b&&b.detach(),null);return b};var m=CKEDITOR.dom.walker.bogus(),t=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,s=CKEDITOR.dom.walker.whitespaces(true),y=CKEDITOR.dom.walker.bookmark(false,true);CKEDITOR.on("instanceLoaded",
function(b){var c=b.editor;c.on("insertElement",function(a){a=a.data;if(a.type==CKEDITOR.NODE_ELEMENT&&(a.is("input")||a.is("textarea"))){a.getAttribute("contentEditable")!="false"&&a.data("cke-editable",a.hasAttribute("contenteditable")?"true":"1");a.setAttribute("contentEditable",false)}});c.on("selectionChange",function(b){if(!c.readOnly){var d=c.getSelection();if(d&&!d.isLocked){d=c.checkDirty();c.fire("lockSnapshot");a(b);c.fire("unlockSnapshot");!d&&c.resetDirty()}}})});CKEDITOR.on("instanceCreated",
function(a){var b=a.editor;b.on("mode",function(){var a=b.editable();if(a&&a.isInline()){var c=b.title;a.changeAttr("role","textbox");a.changeAttr("aria-label",c);c&&a.changeAttr("title",c);var d=b.fire("ariaEditorHelpLabel",{}).label;if(d)if(c=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?"top":"contents")){var e=CKEDITOR.tools.getNextId(),d=CKEDITOR.dom.element.createFromHtml('<span id="'+e+'" class="cke_voice_label">'+d+"</span>");c.append(d);a.changeAttr("aria-describedby",e)}}})});
CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");var p=function(){function a(b){return b.type==CKEDITOR.NODE_ELEMENT}function b(c,d){var e,f,k,n,h=[],i=d.range.startContainer;e=d.range.startPath();for(var i=g[i.getName()],o=0,l=c.getChildren(),m=l.count(),D=-1,p=-1,M=0,s=e.contains(g.$list);o<m;++o){e=l.getItem(o);if(a(e)){k=e.getName();if(s&&k in CKEDITOR.dtd.$list)h=h.concat(b(e,d));else{n=!!i[k];if(k=="br"&&e.data("cke-eol")&&
(!o||o==m-1)){M=(f=o?h[o-1].node:l.getItem(o+1))&&(!a(f)||!f.is("br"));f=f&&a(f)&&g.$block[f.getName()]}D==-1&&!n&&(D=o);n||(p=o);h.push({isElement:1,isLineBreak:M,isBlock:e.isBlockBoundary(),hasBlockSibling:f,node:e,name:k,allowed:n});f=M=0}}else h.push({isElement:0,node:e,allowed:1})}if(D>-1)h[D].firstNotAllowed=1;if(p>-1)h[p].lastNotAllowed=1;return h}function d(b,c){var e=[],f=b.getChildren(),k=f.count(),n,h=0,i=g[c],o=!b.is(g.$inline)||b.is("br");for(o&&e.push(" ");h<k;h++){n=f.getItem(h);a(n)&&
!n.is(i)?e=e.concat(d(n,c)):e.push(n)}o&&e.push(" ");return e}function e(b){return b&&a(b)&&(b.is(g.$removeEmpty)||b.is("a")&&!b.isBlockBoundary())}function f(b,c,d,e){var n=b.clone(),g,h;n.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);if((g=(new CKEDITOR.dom.walker(n)).next())&&a(g)&&o[g.getName()]&&(h=g.getPrevious())&&a(h)&&!h.getParent().equals(b.startContainer)&&d.contains(h)&&e.contains(g)&&g.isIdentical(h)){g.moveChildren(h);g.remove();f(b,c,d,e)}}function n(b,c){function d(b,c){if(c.isBlock&&c.isElement&&
!c.node.is("br")&&a(b)&&b.is("br")){b.remove();return 1}}var e=c.endContainer.getChild(c.endOffset),f=c.endContainer.getChild(c.endOffset-1);e&&d(e,b[b.length-1]);if(f&&d(f,b[0])){c.setEnd(c.endContainer,c.endOffset-1);c.collapse()}}var g=CKEDITOR.dtd,o={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,li:1,pre:1,dl:1,blockquote:1},l={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},m=CKEDITOR.tools.extend({},g.$inline);delete m.br;return function(o,z,p){var B=o.editor,w=B.getSelection().getRanges()[0],
H=false;if(z=="unfiltered_html"){z="html";H=true}if(!w.checkReadOnly()){var C=(new CKEDITOR.dom.elementPath(w.startContainer,w.root)).blockLimit||w.root,z={type:z,dontFilter:H,editable:o,editor:B,range:w,blockLimit:C,mergeCandidates:[],zombies:[]},B=z.range,H=z.mergeCandidates,A,x,F,G;if(z.type=="text"&&B.shrink(CKEDITOR.SHRINK_ELEMENT,true,false)){A=CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>",B.document);B.insertNode(A);B.setStartAfter(A)}x=new CKEDITOR.dom.elementPath(B.startContainer);
z.endPath=F=new CKEDITOR.dom.elementPath(B.endContainer);if(!B.collapsed){var C=F.block||F.blockLimit,s=B.getCommonAncestor();C&&(!C.equals(s)&&!C.contains(s)&&B.checkEndOfBlock())&&z.zombies.push(C);B.deleteContents()}for(;(G=a(B.startContainer)&&B.startContainer.getChild(B.startOffset-1))&&a(G)&&G.isBlockBoundary()&&x.contains(G);)B.moveToPosition(G,CKEDITOR.POSITION_BEFORE_END);f(B,z.blockLimit,x,F);if(A){B.setEndBefore(A);B.collapse();A.remove()}A=B.startPath();if(C=A.contains(e,false,1)){B.splitElement(C);
z.inlineStylesRoot=C;z.inlineStylesPeak=A.lastElement}A=B.createBookmark();(C=A.startNode.getPrevious(c))&&a(C)&&e(C)&&H.push(C);(C=A.startNode.getNext(c))&&a(C)&&e(C)&&H.push(C);for(C=A.startNode;(C=C.getParent())&&e(C);)H.push(C);B.moveToBookmark(A);if(A=p){A=z.range;if(z.type=="text"&&z.inlineStylesRoot){G=z.inlineStylesPeak;B=G.getDocument().createText("{cke-peak}");for(H=z.inlineStylesRoot.getParent();!G.equals(H);){B=B.appendTo(G.clone());G=G.getParent()}p=B.getOuterHtml().split("{cke-peak}").join(p)}G=
z.blockLimit.getName();if(/^\s+|\s+$/.test(p)&&"span"in CKEDITOR.dtd[G])var y='<span data-cke-marker="1">&nbsp;</span>',p=y+p+y;p=z.editor.dataProcessor.toHtml(p,{context:null,fixForBody:false,dontFilter:z.dontFilter,filter:z.editor.activeFilter,enterMode:z.editor.activeEnterMode});G=A.document.createElement("body");G.setHtml(p);if(y){G.getFirst().remove();G.getLast().remove()}if((y=A.startPath().block)&&!(y.getChildCount()==1&&y.getBogus()))a:{var t;if(G.getChildCount()==1&&a(t=G.getFirst())&&t.is(l)){y=
t.getElementsByTag("*");A=0;for(H=y.count();A<H;A++){B=y.getItem(A);if(!B.is(m))break a}t.moveChildren(t.getParent(1));t.remove()}}z.dataWrapper=G;A=p}if(A){t=z.range;var y=t.document,q,p=z.blockLimit;A=0;var K;G=[];var I,Q,H=B=0,N,S;x=t.startContainer;var C=z.endPath.elements[0],T;F=C.getPosition(x);s=!!C.getCommonAncestor(x)&&F!=CKEDITOR.POSITION_IDENTICAL&&!(F&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED);x=b(z.dataWrapper,z);for(n(x,t);A<x.length;A++){F=x[A];if(q=F.isLineBreak){q=
t;N=p;var P=void 0,V=void 0;if(F.hasBlockSibling)q=1;else{P=q.startContainer.getAscendant(g.$block,1);if(!P||!P.is({div:1,p:1}))q=0;else{V=P.getPosition(N);if(V==CKEDITOR.POSITION_IDENTICAL||V==CKEDITOR.POSITION_CONTAINS)q=0;else{N=q.splitElement(P);q.moveToPosition(N,CKEDITOR.POSITION_AFTER_START);q=1}}}}if(q)H=A>0;else{q=t.startPath();if(!F.isBlock&&h(z.editor,q.block,q.blockLimit)&&(Q=z.editor.activeEnterMode!=CKEDITOR.ENTER_BR&&z.editor.config.autoParagraph!==false?z.editor.activeEnterMode==CKEDITOR.ENTER_DIV?
"div":"p":false)){Q=y.createElement(Q);Q.appendBogus();t.insertNode(Q);CKEDITOR.env.needsBrFiller&&(K=Q.getBogus())&&K.remove();t.moveToPosition(Q,CKEDITOR.POSITION_BEFORE_END)}if((q=t.startPath().block)&&!q.equals(I)){if(K=q.getBogus()){K.remove();G.push(q)}I=q}F.firstNotAllowed&&(B=1);if(B&&F.isElement){q=t.startContainer;for(N=null;q&&!g[q.getName()][F.name];){if(q.equals(p)){q=null;break}N=q;q=q.getParent()}if(q){if(N){S=t.splitElement(N);z.zombies.push(S);z.zombies.push(N)}}else{N=p.getName();
T=!A;q=A==x.length-1;N=d(F.node,N);for(var P=[],V=N.length,W=0,Y=void 0,Z=0,U=-1;W<V;W++){Y=N[W];if(Y==" "){if(!Z&&(!T||W)){P.push(new CKEDITOR.dom.text(" "));U=P.length}Z=1}else{P.push(Y);Z=0}}q&&U==P.length&&P.pop();T=P}}if(T){for(;q=T.pop();)t.insertNode(q);T=0}else t.insertNode(F.node);if(F.lastNotAllowed&&A<x.length-1){(S=s?C:S)&&t.setEndAt(S,CKEDITOR.POSITION_AFTER_START);B=0}t.collapse()}}z.dontMoveCaret=H;z.bogusNeededBlocks=G}K=z.range;var O;S=z.bogusNeededBlocks;for(T=K.createBookmark();I=
z.zombies.pop();)if(I.getParent()){Q=K.clone();Q.moveToElementEditStart(I);Q.removeEmptyBlocksAtEnd()}if(S)for(;I=S.pop();)CKEDITOR.env.needsBrFiller?I.appendBogus():I.append(K.document.createText(" "));for(;I=z.mergeCandidates.pop();)I.mergeSiblings();K.moveToBookmark(T);if(!z.dontMoveCaret){for(I=a(K.startContainer)&&K.startContainer.getChild(K.startOffset-1);I&&a(I)&&!I.is(g.$empty);){if(I.isBlockBoundary())K.moveToPosition(I,CKEDITOR.POSITION_BEFORE_END);else{if(e(I)&&I.getHtml().match(/(\s|&nbsp;)$/g)){O=
null;break}O=K.clone();O.moveToPosition(I,CKEDITOR.POSITION_BEFORE_END)}I=I.getLast(c)}O&&K.moveToRange(O)}w.select();i(o)}}}(),q=function(){function a(b){b=new CKEDITOR.dom.walker(b);b.guard=function(a,b){if(b)return false;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$tableContent)};b.evaluator=function(a){return a.type==CKEDITOR.NODE_ELEMENT};return b}function b(a,c,d){c=a.getDocument().createElement(c);a.append(c,d);return c}function c(a){var b=a.count(),d;for(b;b-- >0;){d=a.getItem(b);
if(!CKEDITOR.tools.trim(d.getHtml())){d.appendBogus();CKEDITOR.env.ie&&(CKEDITOR.env.version<9&&d.getChildCount())&&d.getFirst().remove()}}}return function(d){var e=d.startContainer,f=e.getAscendant("table",1),g=false;c(f.getElementsByTag("td"));c(f.getElementsByTag("th"));f=d.clone();f.setStart(e,0);f=a(f).lastBackward();if(!f){f=d.clone();f.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);f=a(f).lastForward();g=true}f||(f=e);if(f.is("table")){d.setStartAt(f,CKEDITOR.POSITION_BEFORE_START);d.collapse(true);
f.remove()}else{f.is({tbody:1,thead:1,tfoot:1})&&(f=b(f,"tr",g));f.is("tr")&&(f=b(f,f.getParent().is("thead")?"th":"td",g));(e=f.getBogus())&&e.remove();d.moveToPosition(f,g?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END)}}}()})();
(function(){function a(){var a=this._.fakeSelection,b;if(a){b=this.getSelection(1);if(!b||!b.isHidden()){a.reset();a=0}}if(!a){a=b||this.getSelection(1);if(!a||a.getType()==CKEDITOR.SELECTION_NONE)return}this.fire("selectionCheck",a);b=this.elementPath();if(!b.compare(this._.selectionPreviousPath)){if(CKEDITOR.env.webkit)this._.previousActive=this.document.getActive();this._.selectionPreviousPath=b;this.fire("selectionChange",{selection:a,path:b})}}function e(){p=true;if(!y){b.call(this);y=CKEDITOR.tools.setTimeout(b,
200,this)}}function b(){y=null;if(p){CKEDITOR.tools.setTimeout(a,0,this);p=false}}function c(a){return q(a)||a.type==CKEDITOR.NODE_ELEMENT&&!a.is(CKEDITOR.dtd.$empty)?true:false}function f(a){function b(c,d){return!c||c.type==CKEDITOR.NODE_TEXT?false:a.clone()["moveToElementEdit"+(d?"End":"Start")](c)}if(!(a.root instanceof CKEDITOR.editable))return false;var d=a.startContainer,e=a.getPreviousNode(c,null,d),f=a.getNextNode(c,null,d);return b(e)||b(f,1)||!e&&!f&&!(d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()&&
d.getBogus())?true:false}function d(a){return a.getCustomData("cke-fillingChar")}function h(a,b){var c=a&&a.removeCustomData("cke-fillingChar");if(c){if(b!==false){var d,e=a.getDocument().getSelection().getNative(),f=e&&e.type!="None"&&e.getRangeAt(0);if(c.getLength()>1&&f&&f.intersectsNode(c.$)){d=i(e);f=e.focusNode==c.$&&e.focusOffset>0;e.anchorNode==c.$&&e.anchorOffset>0&&d[0].offset--;f&&d[1].offset--}}c.setText(l(c.getText()));d&&g(a.getDocument().$,d)}}function l(a){return a.replace(/\u200B( )?/g,
function(a){return a[1]?" ":""})}function i(a){return[{node:a.anchorNode,offset:a.anchorOffset},{node:a.focusNode,offset:a.focusOffset}]}function g(a,b){var c=a.getSelection(),d=a.createRange();d.setStart(b[0].node,b[0].offset);d.collapse(true);c.removeAllRanges();c.addRange(d);c.extend(b[1].node,b[1].offset)}function m(a){var b=CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="'+(CKEDITOR.env.ie?"display:none":"position:fixed;top:0;left:-1000px")+'">&nbsp;</div>',
a.document);a.fire("lockSnapshot");a.editable().append(b);var c=a.getSelection(1),d=a.createRange(),e=c.root.on("selectionchange",function(a){a.cancel()},null,null,0);d.setStartAt(b,CKEDITOR.POSITION_AFTER_START);d.setEndAt(b,CKEDITOR.POSITION_BEFORE_END);c.selectRanges([d]);e.removeListener();a.fire("unlockSnapshot");a._.hiddenSelectionContainer=b}function t(a){var b={37:1,39:1,8:1,46:1};return function(c){var d=c.data.getKeystroke();if(b[d]){var e=a.getSelection().getRanges(),f=e[0];if(e.length==
1&&f.collapsed)if((d=f[d<38?"getPreviousEditableNode":"getNextEditableNode"]())&&d.type==CKEDITOR.NODE_ELEMENT&&d.getAttribute("contenteditable")=="false"){a.getSelection().fake(d);c.data.preventDefault();c.cancel()}}}}function s(a){for(var b=0;b<a.length;b++){var c=a[b];c.getCommonAncestor().isReadOnly()&&a.splice(b,1);if(!c.collapsed){if(c.startContainer.isReadOnly())for(var d=c.startContainer,e;d;){if((e=d.type==CKEDITOR.NODE_ELEMENT)&&d.is("body")||!d.isReadOnly())break;e&&d.getAttribute("contentEditable")==
"false"&&c.setStartAfter(d);d=d.getParent()}d=c.startContainer;e=c.endContainer;var f=c.startOffset,g=c.endOffset,h=c.clone();d&&d.type==CKEDITOR.NODE_TEXT&&(f>=d.getLength()?h.setStartAfter(d):h.setStartBefore(d));e&&e.type==CKEDITOR.NODE_TEXT&&(g?h.setEndAfter(e):h.setEndBefore(e));d=new CKEDITOR.dom.walker(h);d.evaluator=function(d){if(d.type==CKEDITOR.NODE_ELEMENT&&d.isReadOnly()){var e=c.clone();c.setEndBefore(d);c.collapsed&&a.splice(b--,1);if(!(d.getPosition(h.endContainer)&CKEDITOR.POSITION_CONTAINS)){e.setStartAfter(d);
e.collapsed||a.splice(b+1,0,e)}return true}return false};d.next()}}return a}var y,p,q=CKEDITOR.dom.walker.invisible(1),j=function(){function a(b){return function(a){var c=a.editor.createRange();c.moveToClosestEditablePosition(a.selected,b)&&a.editor.getSelection().selectRanges([c]);return false}}function b(a){return function(b){var c=b.editor,d=c.createRange(),e;if(!(e=d.moveToClosestEditablePosition(b.selected,a)))e=d.moveToClosestEditablePosition(b.selected,!a);e&&c.getSelection().selectRanges([d]);
c.fire("saveSnapshot");b.selected.remove();if(!e){d.moveToElementEditablePosition(c.editable());c.getSelection().selectRanges([d])}c.fire("saveSnapshot");return false}}var c=a(),d=a(1);return{37:c,38:c,39:d,40:d,8:b(),46:b(1)}}();CKEDITOR.on("instanceCreated",function(b){function c(){var a=d.getSelection();a&&a.removeAllRanges()}var d=b.editor;d.on("contentDom",function(){function b(){C=new CKEDITOR.dom.selection(d.getSelection());C.lock()}function c(){g.removeListener("mouseup",c);n.removeListener("mouseup",
c);var a=CKEDITOR.document.$.selection,b=a.createRange();a.type!="None"&&b.parentElement().ownerDocument==f.$&&b.select()}var f=d.document,g=CKEDITOR.document,k=d.editable(),i=f.getBody(),n=f.getDocumentElement(),w=k.isInline(),j,C;CKEDITOR.env.gecko&&k.attachListener(k,"focus",function(a){a.removeListener();if(j!==0)if((a=d.getSelection().getNative())&&a.isCollapsed&&a.anchorNode==k.$){a=d.createRange();a.moveToElementEditStart(k);a.select()}},null,null,-2);k.attachListener(k,CKEDITOR.env.webkit?
"DOMFocusIn":"focus",function(){j&&CKEDITOR.env.webkit&&(j=d._.previousActive&&d._.previousActive.equals(f.getActive()));d.unlockSelection(j);j=0},null,null,-1);k.attachListener(k,"mousedown",function(){j=0});if(CKEDITOR.env.ie||w){u?k.attachListener(k,"beforedeactivate",b,null,null,-1):k.attachListener(d,"selectionCheck",b,null,null,-1);k.attachListener(k,CKEDITOR.env.webkit?"DOMFocusOut":"blur",function(){d.lockSelection(C);j=1},null,null,-1);k.attachListener(k,"mousedown",function(){j=0})}if(CKEDITOR.env.ie&&
!w){var A;k.attachListener(k,"mousedown",function(a){if(a.data.$.button==2){a=d.document.getSelection();if(!a||a.getType()==CKEDITOR.SELECTION_NONE)A=d.window.getScrollPosition()}});k.attachListener(k,"mouseup",function(a){if(a.data.$.button==2&&A){d.document.$.documentElement.scrollLeft=A.x;d.document.$.documentElement.scrollTop=A.y}A=null});if(f.$.compatMode!="BackCompat"){if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)n.on("mousedown",function(a){function b(a){a=a.data.$;if(d){var c=i.$.createTextRange();
try{c.moveToPoint(a.clientX,a.clientY)}catch(e){}d.setEndPoint(f.compareEndPoints("StartToStart",c)<0?"EndToEnd":"StartToStart",c);d.select()}}function c(){n.removeListener("mousemove",b);g.removeListener("mouseup",c);n.removeListener("mouseup",c);d.select()}a=a.data;if(a.getTarget().is("html")&&a.$.y<n.$.clientHeight&&a.$.x<n.$.clientWidth){var d=i.$.createTextRange();try{d.moveToPoint(a.$.clientX,a.$.clientY)}catch(e){}var f=d.duplicate();n.on("mousemove",b);g.on("mouseup",c);n.on("mouseup",c)}});
if(CKEDITOR.env.version>7&&CKEDITOR.env.version<11)n.on("mousedown",function(a){if(a.data.getTarget().is("html")){g.on("mouseup",c);n.on("mouseup",c)}})}}k.attachListener(k,"selectionchange",a,d);k.attachListener(k,"keyup",e,d);k.attachListener(k,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){d.forceNextSelectionCheck();d.selectionChange(1)});if(w&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){var x;k.attachListener(k,"mousedown",function(){x=1});k.attachListener(f.getDocumentElement(),"mouseup",
function(){x&&e.call(d);x=0})}else k.attachListener(CKEDITOR.env.ie?k:f.getDocumentElement(),"mouseup",e,d);CKEDITOR.env.webkit&&k.attachListener(f,"keydown",function(a){switch(a.data.getKey()){case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:h(k)}},null,null,-1);k.attachListener(k,"keydown",t(d),null,null,-1)});d.on("setData",function(){d.unlockSelection();CKEDITOR.env.webkit&&c()});d.on("contentDomUnload",function(){d.unlockSelection()});if(CKEDITOR.env.ie9Compat)d.on("beforeDestroy",
c,null,null,9);d.on("dataReady",function(){delete d._.fakeSelection;delete d._.hiddenSelectionContainer;d.selectionChange(1)});d.on("loadSnapshot",function(){var a=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),b=d.editable().getLast(a);if(b&&b.hasAttribute("data-cke-hidden-sel")){b.remove();if(CKEDITOR.env.gecko)(a=d.editable().getFirst(a))&&(a.is("br")&&a.getAttribute("_moz_editor_bogus_node"))&&a.remove()}},null,null,100);d.on("key",function(a){if(d.mode=="wysiwyg"){var b=d.getSelection();
if(b.isFake){var c=j[a.data.keyCode];if(c)return c({editor:d,selected:b.getSelectedElement(),selection:b,keyEvent:a})}}})});CKEDITOR.on("instanceReady",function(a){function b(){var a=e.editable();if(a)if(a=d(a)){var c=e.document.$.getSelection();if(c.type!="None"&&(c.anchorNode==a.$||c.focusNode==a.$))j=i(c);f=a.getText();a.setText(l(f))}}function c(){var a=e.editable();if(a)if(a=d(a)){a.setText(f);if(j){g(e.document.$,j);j=null}}}var e=a.editor,f,j;if(CKEDITOR.env.webkit){e.on("selectionChange",
function(){var a=e.editable(),b=d(a);b&&(b.getCustomData("ready")?h(a):b.setCustomData("ready",1))},null,null,-1);e.on("beforeSetMode",function(){h(e.editable())},null,null,-1);e.on("beforeUndoImage",b);e.on("afterUndoImage",c);e.on("beforeGetData",b,null,null,0);e.on("getData",c)}});CKEDITOR.editor.prototype.selectionChange=function(b){(b?a:e).call(this)};CKEDITOR.editor.prototype.getSelection=function(a){if((this._.savedSelection||this._.fakeSelection)&&!a)return this._.savedSelection||this._.fakeSelection;
return(a=this.editable())&&this.mode=="wysiwyg"?new CKEDITOR.dom.selection(a):null};CKEDITOR.editor.prototype.lockSelection=function(a){a=a||this.getSelection(1);if(a.getType()!=CKEDITOR.SELECTION_NONE){!a.isLocked&&a.lock();this._.savedSelection=a;return true}return false};CKEDITOR.editor.prototype.unlockSelection=function(a){var b=this._.savedSelection;if(b){b.unlock(a);delete this._.savedSelection;return true}return false};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath};
CKEDITOR.dom.document.prototype.getSelection=function(){return new CKEDITOR.dom.selection(this)};CKEDITOR.dom.range.prototype.select=function(){var a=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():new CKEDITOR.dom.selection(this.root);a.selectRanges([this]);return a};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;var u=typeof window.getSelection!="function",v=1;CKEDITOR.dom.selection=function(a){if(a instanceof CKEDITOR.dom.selection)var b=
a,a=a.root;var c=a instanceof CKEDITOR.dom.element;this.rev=b?b.rev:v++;this.document=a instanceof CKEDITOR.dom.document?a:a.getDocument();this.root=c?a:this.document.getBody();this.isLocked=0;this._={cache:{}};if(b){CKEDITOR.tools.extend(this._.cache,b._.cache);this.isFake=b.isFake;this.isLocked=b.isLocked;return this}var a=this.getNative(),d,e;if(a)if(a.getRangeAt)d=(e=a.rangeCount&&a.getRangeAt(0))&&new CKEDITOR.dom.node(e.commonAncestorContainer);else{try{e=a.createRange()}catch(f){}d=e&&CKEDITOR.dom.element.get(e.item&&
e.item(0)||e.parentElement())}if(!d||!(d.type==CKEDITOR.NODE_ELEMENT||d.type==CKEDITOR.NODE_TEXT)||!this.root.equals(d)&&!this.root.contains(d)){this._.cache.type=CKEDITOR.SELECTION_NONE;this._.cache.startElement=null;this._.cache.selectedElement=null;this._.cache.selectedText="";this._.cache.ranges=new CKEDITOR.dom.rangeList}return this};var E={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};CKEDITOR.dom.selection.prototype=
{getNative:function(){return this._.cache.nativeSel!==void 0?this._.cache.nativeSel:this._.cache.nativeSel=u?this.document.$.selection:this.document.getWindow().$.getSelection()},getType:u?function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_NONE;try{var c=this.getNative(),d=c.type;if(d=="Text")b=CKEDITOR.SELECTION_TEXT;if(d=="Control")b=CKEDITOR.SELECTION_ELEMENT;if(c.createRange().parentElement())b=CKEDITOR.SELECTION_TEXT}catch(e){}return a.type=b}:function(){var a=this._.cache;
if(a.type)return a.type;var b=CKEDITOR.SELECTION_TEXT,c=this.getNative();if(!c||!c.rangeCount)b=CKEDITOR.SELECTION_NONE;else if(c.rangeCount==1){var c=c.getRangeAt(0),d=c.startContainer;if(d==c.endContainer&&d.nodeType==1&&c.endOffset-c.startOffset==1&&E[d.childNodes[c.startOffset].nodeName.toLowerCase()])b=CKEDITOR.SELECTION_ELEMENT}return a.type=b},getRanges:function(){var a=u?function(){function a(b){return(new CKEDITOR.dom.node(b)).getIndex()}var b=function(b,c){b=b.duplicate();b.collapse(c);
var d=b.parentElement();if(!d.hasChildNodes())return{container:d,offset:0};for(var e=d.children,f,g,h=b.duplicate(),k=0,i=e.length-1,j=-1,A,x;k<=i;){j=Math.floor((k+i)/2);f=e[j];h.moveToElementText(f);A=h.compareEndPoints("StartToStart",b);if(A>0)i=j-1;else if(A<0)k=j+1;else return{container:d,offset:a(f)}}if(j==-1||j==e.length-1&&A<0){h.moveToElementText(d);h.setEndPoint("StartToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;e=d.childNodes;if(!h){f=e[e.length-1];return f.nodeType!=CKEDITOR.NODE_TEXT?
{container:d,offset:e.length}:{container:f,offset:f.nodeValue.length}}for(d=e.length;h>0&&d>0;){g=e[--d];if(g.nodeType==CKEDITOR.NODE_TEXT){x=g;h=h-g.nodeValue.length}}return{container:x,offset:-h}}h.collapse(A>0?true:false);h.setEndPoint(A>0?"StartToStart":"EndToStart",b);h=h.text.replace(/(\r\n|\r)/g,"\n").length;if(!h)return{container:d,offset:a(f)+(A>0?0:1)};for(;h>0;)try{g=f[A>0?"previousSibling":"nextSibling"];if(g.nodeType==CKEDITOR.NODE_TEXT){h=h-g.nodeValue.length;x=g}f=g}catch(l){return{container:d,
offset:a(f)}}return{container:x,offset:A>0?-h:x.nodeValue.length+h}};return function(){var a=this.getNative(),c=a&&a.createRange(),d=this.getType();if(!a)return[];if(d==CKEDITOR.SELECTION_TEXT){a=new CKEDITOR.dom.range(this.root);d=b(c,true);a.setStart(new CKEDITOR.dom.node(d.container),d.offset);d=b(c);a.setEnd(new CKEDITOR.dom.node(d.container),d.offset);a.endContainer.getPosition(a.startContainer)&CKEDITOR.POSITION_PRECEDING&&a.endOffset<=a.startContainer.getIndex()&&a.collapse();return[a]}if(d==
CKEDITOR.SELECTION_ELEMENT){for(var d=[],e=0;e<c.length;e++){for(var f=c.item(e),g=f.parentNode,h=0,a=new CKEDITOR.dom.range(this.root);h<g.childNodes.length&&g.childNodes[h]!=f;h++);a.setStart(new CKEDITOR.dom.node(g),h);a.setEnd(new CKEDITOR.dom.node(g),h+1);d.push(a)}return d}return[]}}():function(){var a=[],b,c=this.getNative();if(!c)return a;for(var d=0;d<c.rangeCount;d++){var e=c.getRangeAt(d);b=new CKEDITOR.dom.range(this.root);b.setStart(new CKEDITOR.dom.node(e.startContainer),e.startOffset);
b.setEnd(new CKEDITOR.dom.node(e.endContainer),e.endOffset);a.push(b)}return a};return function(b){var c=this._.cache,d=c.ranges;if(!d)c.ranges=d=new CKEDITOR.dom.rangeList(a.call(this));return!b?d:s(new CKEDITOR.dom.rangeList(d.slice()))}}(),getStartElement:function(){var a=this._.cache;if(a.startElement!==void 0)return a.startElement;var b;switch(this.getType()){case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var c=this.getRanges()[0];if(c){if(c.collapsed){b=
c.startContainer;b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent())}else{for(c.optimize();;){b=c.startContainer;if(c.startOffset==(b.getChildCount?b.getChildCount():b.getLength())&&!b.isBlockBoundary())c.setStartAfter(b);else break}b=c.startContainer;if(b.type!=CKEDITOR.NODE_ELEMENT)return b.getParent();b=b.getChild(c.startOffset);if(!b||b.type!=CKEDITOR.NODE_ELEMENT)b=c.startContainer;else for(c=b.getFirst();c&&c.type==CKEDITOR.NODE_ELEMENT;){b=c;c=c.getFirst()}}b=b.$}}return a.startElement=b?new CKEDITOR.dom.element(b):
null},getSelectedElement:function(){var a=this._.cache;if(a.selectedElement!==void 0)return a.selectedElement;var b=this,c=CKEDITOR.tools.tryThese(function(){return b.getNative().createRange().item(0)},function(){for(var a=b.getRanges()[0].clone(),c,d,e=2;e&&(!(c=a.getEnclosedNode())||!(c.type==CKEDITOR.NODE_ELEMENT&&E[c.getName()]&&(d=c)));e--)a.shrink(CKEDITOR.SHRINK_ELEMENT);return d&&d.$});return a.selectedElement=c?new CKEDITOR.dom.element(c):null},getSelectedText:function(){var a=this._.cache;
if(a.selectedText!==void 0)return a.selectedText;var b=this.getNative(),b=u?b.type=="Control"?"":b.createRange().text:b.toString();return a.selectedText=b},lock:function(){this.getRanges();this.getStartElement();this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel=null;this.isLocked=1},unlock:function(a){if(this.isLocked){if(a)var b=this.getSelectedElement(),c=!b&&this.getRanges(),d=this.isFake;this.isLocked=0;this.reset();if(a)(a=b||c[0]&&c[0].getCommonAncestor())&&a.getAscendant("body",
1)&&(d?this.fake(b):b?this.selectElement(b):this.selectRanges(c))}},reset:function(){this._.cache={};this.isFake=0;var a=this.root.editor;if(a&&a._.fakeSelection&&this.rev==a._.fakeSelection.rev){delete a._.fakeSelection;var b=a._.hiddenSelectionContainer;if(b){var c=a.checkDirty();a.fire("lockSnapshot");b.remove();a.fire("unlockSnapshot");!c&&a.resetDirty()}delete a._.hiddenSelectionContainer}this.rev=v++},selectElement:function(a){var b=new CKEDITOR.dom.range(this.root);b.setStartBefore(a);b.setEndAfter(a);
this.selectRanges([b])},selectRanges:function(a){var b=this.root.editor,b=b&&b._.hiddenSelectionContainer;this.reset();if(b)for(var b=this.root,c,d=0;d<a.length;++d){c=a[d];if(c.endContainer.equals(b))c.endOffset=Math.min(c.endOffset,b.getChildCount())}if(a.length)if(this.isLocked){var e=CKEDITOR.document.getActive();this.unlock();this.selectRanges(a);this.lock();e&&!e.equals(this.root)&&e.focus()}else{var g;a:{var i,j;if(a.length==1&&!(j=a[0]).collapsed&&(g=j.getEnclosedNode())&&g.type==CKEDITOR.NODE_ELEMENT){j=
j.clone();j.shrink(CKEDITOR.SHRINK_ELEMENT,true);if((i=j.getEnclosedNode())&&i.type==CKEDITOR.NODE_ELEMENT)g=i;if(g.getAttribute("contenteditable")=="false")break a}g=void 0}if(g)this.fake(g);else{if(u){j=CKEDITOR.dom.walker.whitespaces(true);i=/\ufeff|\u00a0/;b={table:1,tbody:1,tr:1};if(a.length>1){g=a[a.length-1];a[0].setEnd(g.endContainer,g.endOffset)}g=a[0];var a=g.collapsed,l,m,w;if((c=g.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&c.getName()in E&&(!c.is("a")||!c.getText()))try{w=c.$.createControlRange();
w.addElement(c.$);w.select();return}catch(H){}if(g.startContainer.type==CKEDITOR.NODE_ELEMENT&&g.startContainer.getName()in b||g.endContainer.type==CKEDITOR.NODE_ELEMENT&&g.endContainer.getName()in b){g.shrink(CKEDITOR.NODE_ELEMENT,true);a=g.collapsed}w=g.createBookmark();b=w.startNode;if(!a)e=w.endNode;w=g.document.$.body.createTextRange();w.moveToElementText(b.$);w.moveStart("character",1);if(e){i=g.document.$.body.createTextRange();i.moveToElementText(e.$);w.setEndPoint("EndToEnd",i);w.moveEnd("character",
-1)}else{l=b.getNext(j);m=b.hasAscendant("pre");l=!(l&&l.getText&&l.getText().match(i))&&(m||!b.hasPrevious()||b.getPrevious().is&&b.getPrevious().is("br"));m=g.document.createElement("span");m.setHtml("&#65279;");m.insertBefore(b);l&&g.document.createText("﻿").insertBefore(b)}g.setStartBefore(b);b.remove();if(a){if(l){w.moveStart("character",-1);w.select();g.document.$.selection.clear()}else w.select();g.moveToPosition(m,CKEDITOR.POSITION_BEFORE_START);m.remove()}else{g.setEndBefore(e);e.remove();
w.select()}}else{e=this.getNative();if(!e)return;this.removeAllRanges();for(w=0;w<a.length;w++){if(w<a.length-1){l=a[w];m=a[w+1];i=l.clone();i.setStart(l.endContainer,l.endOffset);i.setEnd(m.startContainer,m.startOffset);if(!i.collapsed){i.shrink(CKEDITOR.NODE_ELEMENT,true);g=i.getCommonAncestor();i=i.getEnclosedNode();if(g.isReadOnly()||i&&i.isReadOnly()){m.setStart(l.startContainer,l.startOffset);a.splice(w--,1);continue}}}g=a[w];m=this.document.$.createRange();if(g.collapsed&&CKEDITOR.env.webkit&&
f(g)){l=this.root;h(l,false);i=l.getDocument().createText("​");l.setCustomData("cke-fillingChar",i);g.insertNode(i);if((l=i.getNext())&&!i.getPrevious()&&l.type==CKEDITOR.NODE_ELEMENT&&l.getName()=="br"){h(this.root);g.moveToPosition(l,CKEDITOR.POSITION_BEFORE_START)}else g.moveToPosition(i,CKEDITOR.POSITION_AFTER_END)}m.setStart(g.startContainer.$,g.startOffset);try{m.setEnd(g.endContainer.$,g.endOffset)}catch(C){if(C.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")>=0){g.collapse(1);m.setEnd(g.endContainer.$,
g.endOffset)}else throw C;}e.addRange(m)}}this.reset();this.root.fire("selectionchange")}}},fake:function(a){var b=this.root.editor;this.reset();m(b);var c=this._.cache,d=new CKEDITOR.dom.range(this.root);d.setStartBefore(a);d.setEndAfter(a);c.ranges=new CKEDITOR.dom.rangeList(d);c.selectedElement=c.startElement=a;c.type=CKEDITOR.SELECTION_ELEMENT;c.selectedText=c.nativeSel=null;this.isFake=1;this.rev=v++;b._.fakeSelection=this;this.root.fire("selectionchange")},isHidden:function(){var a=this.getCommonAncestor();
a&&a.type==CKEDITOR.NODE_TEXT&&(a=a.getParent());return!(!a||!a.data("cke-hidden-sel"))},createBookmarks:function(a){a=this.getRanges().createBookmarks(a);this.isFake&&(a.isFake=1);return a},createBookmarks2:function(a){a=this.getRanges().createBookmarks2(a);this.isFake&&(a.isFake=1);return a},selectBookmarks:function(a){for(var b=[],c=0;c<a.length;c++){var d=new CKEDITOR.dom.range(this.root);d.moveToBookmark(a[c]);b.push(d)}a.isFake?this.fake(b[0].getEnclosedNode()):this.selectRanges(b);return this},
getCommonAncestor:function(){var a=this.getRanges();return!a.length?null:a[0].startContainer.getCommonAncestor(a[a.length-1].endContainer)},scrollIntoView:function(){this.type!=CKEDITOR.SELECTION_NONE&&this.getRanges()[0].scrollIntoView()},removeAllRanges:function(){if(this.getType()!=CKEDITOR.SELECTION_NONE){var a=this.getNative();try{a&&a[u?"empty":"removeAllRanges"]()}catch(b){}this.reset()}}}})();"use strict";CKEDITOR.STYLE_BLOCK=1;CKEDITOR.STYLE_INLINE=2;CKEDITOR.STYLE_OBJECT=3;
(function(){function a(a,b){for(var c,d;a=a.getParent();){if(a.equals(b))break;if(a.getAttribute("data-nostyle"))c=a;else if(!d){var e=a.getAttribute("contentEditable");e=="false"?c=a:e=="true"&&(d=1)}}return c}function e(b){var d=b.document;if(b.collapsed){d=j(this,d);b.insertNode(d);b.moveToPosition(d,CKEDITOR.POSITION_BEFORE_END)}else{var f=this.element,g=this._.definition,h,i=g.ignoreReadonly,k=i||g.includeReadonly;k==null&&(k=b.root.getCustomData("cke_includeReadonly"));var l=CKEDITOR.dtd[f];
if(!l){h=true;l=CKEDITOR.dtd.span}b.enlarge(CKEDITOR.ENLARGE_INLINE,1);b.trim();var m=b.createBookmark(),n=m.startNode,p=m.endNode,o=n,q;if(!i){var t=b.getCommonAncestor(),i=a(n,t),t=a(p,t);i&&(o=i.getNextSourceNode(true));t&&(p=t)}for(o.getPosition(p)==CKEDITOR.POSITION_FOLLOWING&&(o=0);o;){i=false;if(o.equals(p)){o=null;i=true}else{var s=o.type==CKEDITOR.NODE_ELEMENT?o.getName():null,t=s&&o.getAttribute("contentEditable")=="false",r=s&&o.getAttribute("data-nostyle");if(s&&o.data("cke-bookmark")){o=
o.getNextSourceNode(true);continue}if(t&&k&&CKEDITOR.dtd.$block[s])for(var v=o,u=c(v),z=void 0,D=u.length,E=0,v=D&&new CKEDITOR.dom.range(v.getDocument());E<D;++E){var z=u[E],M=CKEDITOR.filter.instances[z.data("cke-filter")];if(M?M.check(this):1){v.selectNodeContents(z);e.call(this,v)}}u=s?!l[s]||r?0:t&&!k?0:(o.getPosition(p)|L)==L&&(!g.childRule||g.childRule(o)):1;if(u)if((u=o.getParent())&&((u.getDtd()||CKEDITOR.dtd.span)[f]||h)&&(!g.parentRule||g.parentRule(u))){if(!q&&(!s||!CKEDITOR.dtd.$removeEmpty[s]||
(o.getPosition(p)|L)==L)){q=b.clone();q.setStartBefore(o)}s=o.type;if(s==CKEDITOR.NODE_TEXT||t||s==CKEDITOR.NODE_ELEMENT&&!o.getChildCount()){for(var s=o,U;(i=!s.getNext(J))&&(U=s.getParent(),l[U.getName()])&&(U.getPosition(n)|B)==B&&(!g.childRule||g.childRule(U));)s=U;q.setEndAfter(s)}}else i=true;else i=true;o=o.getNextSourceNode(r||t)}if(i&&q&&!q.collapsed){for(var i=j(this,d),t=i.hasAttributes(),r=q.getCommonAncestor(),s={},u={},z={},D={},O,R,X;i&&r;){if(r.getName()==f){for(O in g.attributes)if(!D[O]&&
(X=r.getAttribute(R)))i.getAttribute(O)==X?u[O]=1:D[O]=1;for(R in g.styles)if(!z[R]&&(X=r.getStyle(R)))i.getStyle(R)==X?s[R]=1:z[R]=1}r=r.getParent()}for(O in u)i.removeAttribute(O);for(R in s)i.removeStyle(R);t&&!i.hasAttributes()&&(i=null);if(i){q.extractContents().appendTo(i);q.insertNode(i);y.call(this,i);i.mergeSiblings();CKEDITOR.env.ie||i.$.normalize()}else{i=new CKEDITOR.dom.element("span");q.extractContents().appendTo(i);q.insertNode(i);y.call(this,i);i.remove(true)}q=null}}b.moveToBookmark(m);
b.shrink(CKEDITOR.SHRINK_TEXT);b.shrink(CKEDITOR.NODE_ELEMENT,true)}}function b(a){function b(){for(var a=new CKEDITOR.dom.elementPath(d.getParent()),c=new CKEDITOR.dom.elementPath(j.getParent()),e=null,f=null,g=0;g<a.elements.length;g++){var h=a.elements[g];if(h==a.block||h==a.blockLimit)break;k.checkElementRemovable(h,true)&&(e=h)}for(g=0;g<c.elements.length;g++){h=c.elements[g];if(h==c.block||h==c.blockLimit)break;k.checkElementRemovable(h,true)&&(f=h)}f&&j.breakParent(f);e&&d.breakParent(e)}a.enlarge(CKEDITOR.ENLARGE_INLINE,
1);var c=a.createBookmark(),d=c.startNode;if(a.collapsed){for(var e=new CKEDITOR.dom.elementPath(d.getParent(),a.root),f,g=0,h;g<e.elements.length&&(h=e.elements[g]);g++){if(h==e.block||h==e.blockLimit)break;if(this.checkElementRemovable(h)){var i;if(a.collapsed&&(a.checkBoundaryOfElement(h,CKEDITOR.END)||(i=a.checkBoundaryOfElement(h,CKEDITOR.START)))){f=h;f.match=i?"start":"end"}else{h.mergeSiblings();h.is(this.element)?s.call(this,h):p(h,E(this)[h.getName()])}}}if(f){h=d;for(g=0;;g++){i=e.elements[g];
if(i.equals(f))break;else if(i.match)continue;else i=i.clone();i.append(h);h=i}h[f.match=="start"?"insertBefore":"insertAfter"](f)}}else{var j=c.endNode,k=this;b();for(e=d;!e.equals(j);){f=e.getNextSourceNode();if(e.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(e)){e.getName()==this.element?s.call(this,e):p(e,E(this)[e.getName()]);if(f.type==CKEDITOR.NODE_ELEMENT&&f.contains(d)){b();f=d.getNext()}}e=f}}a.moveToBookmark(c);a.shrink(CKEDITOR.NODE_ELEMENT,true)}function c(a){var b=[];a.forEach(function(a){if(a.getAttribute("contenteditable")==
"true"){b.push(a);return false}},CKEDITOR.NODE_ELEMENT,true);return b}function f(a){var b=a.getEnclosedNode()||a.getCommonAncestor(false,true);(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1))&&!a.isReadOnly()&&u(a,this)}function d(a){var b=a.getCommonAncestor(true,true);if(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1)){var b=this._.definition,c=b.attributes;if(c)for(var d in c)a.removeAttribute(d,c[d]);if(b.styles)for(var e in b.styles)b.styles.hasOwnProperty(e)&&
a.removeStyle(e)}}function h(a){var b=a.createBookmark(true),c=a.createIterator();c.enforceRealBlocks=true;if(this._.enterMode)c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;for(var d,e=a.document,f;d=c.getNextParagraph();)if(!d.isReadOnly()&&(c.activeFilter?c.activeFilter.check(this):1)){f=j(this,e,d);i(d,f)}a.moveToBookmark(b)}function l(a){var b=a.createBookmark(1),c=a.createIterator();c.enforceRealBlocks=true;c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;for(var d,e;d=c.getNextParagraph();)if(this.checkElementRemovable(d))if(d.is("pre")){(e=
this._.enterMode==CKEDITOR.ENTER_BR?null:a.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))&&d.copyAttributes(e);i(d,e)}else s.call(this,d);a.moveToBookmark(b)}function i(a,b){var c=!b;if(c){b=a.getDocument().createElement("div");a.copyAttributes(b)}var d=b&&b.is("pre"),e=a.is("pre"),f=!d&&e;if(d&&!e){e=b;(f=a.getBogus())&&f.remove();f=a.getHtml();f=m(f,/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,"");f=f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,"$1");f=f.replace(/([ \t\n\r]+|&nbsp;)/g,
" ");f=f.replace(/<br\b[^>]*>/gi,"\n");if(CKEDITOR.env.ie){var h=a.getDocument().createElement("div");h.append(e);e.$.outerHTML="<pre>"+f+"</pre>";e.copyAttributes(h.getFirst());e=h.getFirst().remove()}else e.setHtml(f);b=e}else f?b=t(c?[a.getHtml()]:g(a),b):a.moveChildren(b);b.replace(a);if(d){var c=b,i;if((i=c.getPrevious(z))&&i.type==CKEDITOR.NODE_ELEMENT&&i.is("pre")){d=m(i.getHtml(),/\n$/,"")+"\n\n"+m(c.getHtml(),/^\n/,"");CKEDITOR.env.ie?c.$.outerHTML="<pre>"+d+"</pre>":c.setHtml(d);i.remove()}}else c&&
q(b)}function g(a){var b=[];m(a.getOuterHtml(),/(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,function(a,b,c){return b+"</pre>"+c+"<pre>"}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,function(a,c){b.push(c)});return b}function m(a,b,c){var d="",e="",a=a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,function(a,b,c){b&&(d=b);c&&(e=c);return""});return d+a.replace(b,c)+e}function t(a,b){var c;a.length>1&&(c=new CKEDITOR.dom.documentFragment(b.getDocument()));
for(var d=0;d<a.length;d++){var e=a[d],e=e.replace(/(\r\n|\r)/g,"\n"),e=m(e,/^[ \t]*\n/,""),e=m(e,/\n$/,""),e=m(e,/^[ \t]+|[ \t]+$/g,function(a,b){return a.length==1?"&nbsp;":b?" "+CKEDITOR.tools.repeat("&nbsp;",a.length-1):CKEDITOR.tools.repeat("&nbsp;",a.length-1)+" "}),e=e.replace(/\n/g,"<br>"),e=e.replace(/[ \t]{2,}/g,function(a){return CKEDITOR.tools.repeat("&nbsp;",a.length-1)+" "});if(c){var f=b.clone();f.setHtml(e);c.append(f)}else b.setHtml(e)}return c||b}function s(a,b){var c=this._.definition,
d=c.attributes,c=c.styles,e=E(this)[a.getName()],f=CKEDITOR.tools.isEmpty(d)&&CKEDITOR.tools.isEmpty(c),g;for(g in d)if(!((g=="class"||this._.definition.fullMatch)&&a.getAttribute(g)!=k(g,d[g]))&&!(b&&g.slice(0,5)=="data-")){f=a.hasAttribute(g);a.removeAttribute(g)}for(var h in c)if(!(this._.definition.fullMatch&&a.getStyle(h)!=k(h,c[h],true))){f=f||!!a.getStyle(h);a.removeStyle(h)}p(a,e,r[a.getName()]);f&&(this._.definition.alwaysRemoveElement?q(a,1):!CKEDITOR.dtd.$block[a.getName()]||this._.enterMode==
CKEDITOR.ENTER_BR&&!a.hasAttributes()?q(a):a.renameNode(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))}function y(a){for(var b=E(this),c=a.getElementsByTag(this.element),d,e=c.count();--e>=0;){d=c.getItem(e);d.isReadOnly()||s.call(this,d,true)}for(var f in b)if(f!=this.element){c=a.getElementsByTag(f);for(e=c.count()-1;e>=0;e--){d=c.getItem(e);d.isReadOnly()||p(d,b[f])}}}function p(a,b,c){if(b=b&&b.attributes)for(var d=0;d<b.length;d++){var e=b[d][0],f;if(f=a.getAttribute(e)){var g=b[d][1];(g===null||
g.test&&g.test(f)||typeof g=="string"&&f==g)&&a.removeAttribute(e)}}c||q(a)}function q(a,b){if(!a.hasAttributes()||b)if(CKEDITOR.dtd.$block[a.getName()]){var c=a.getPrevious(z),d=a.getNext(z);c&&(c.type==CKEDITOR.NODE_TEXT||!c.isBlockBoundary({br:1}))&&a.append("br",1);d&&(d.type==CKEDITOR.NODE_TEXT||!d.isBlockBoundary({br:1}))&&a.append("br");a.remove(true)}else{c=a.getFirst();d=a.getLast();a.remove(true);if(c){c.type==CKEDITOR.NODE_ELEMENT&&c.mergeSiblings();d&&(!c.equals(d)&&d.type==CKEDITOR.NODE_ELEMENT)&&
d.mergeSiblings()}}}function j(a,b,c){var d;d=a.element;d=="*"&&(d="span");d=new CKEDITOR.dom.element(d,b);c&&c.copyAttributes(d);d=u(d,a);b.getCustomData("doc_processing_style")&&d.hasAttribute("id")?d.removeAttribute("id"):b.setCustomData("doc_processing_style",1);return d}function u(a,b){var c=b._.definition,d=c.attributes,c=CKEDITOR.style.getStyleText(c);if(d)for(var e in d)a.setAttribute(e,d[e]);c&&a.setAttribute("style",c);return a}function v(a,b){for(var c in a)a[c]=a[c].replace(D,function(a,
c){return b[c]})}function E(a){if(a._.overrides)return a._.overrides;var b=a._.overrides={},c=a._.definition.overrides;if(c){CKEDITOR.tools.isArray(c)||(c=[c]);for(var d=0;d<c.length;d++){var e=c[d],f,g;if(typeof e=="string")f=e.toLowerCase();else{f=e.element?e.element.toLowerCase():a.element;g=e.attributes}e=b[f]||(b[f]={});if(g){var e=e.attributes=e.attributes||[],h;for(h in g)e.push([h.toLowerCase(),g[h]])}}}return b}function k(a,b,c){var d=new CKEDITOR.dom.element("span");d[c?"setStyle":"setAttribute"](a,
b);return d[c?"getStyle":"getAttribute"](a)}function n(a,b,c){for(var d=a.document,e=a.getRanges(),b=b?this.removeFromRange:this.applyToRange,f,g=e.createIterator();f=g.getNextRange();)b.call(this,f,c);a.selectRanges(e);d.removeCustomData("doc_processing_style")}var r={address:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,p:1,pre:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,details:1,datagrid:1,datalist:1},o=
{a:1,blockquote:1,embed:1,hr:1,img:1,li:1,object:1,ol:1,table:1,td:1,tr:1,th:1,ul:1,dl:1,dt:1,dd:1,form:1,audio:1,video:1},M=/\s*(?:;\s*|$)/,D=/#\((.+?)\)/g,J=CKEDITOR.dom.walker.bookmark(0,1),z=CKEDITOR.dom.walker.whitespaces(1);CKEDITOR.style=function(a,b){if(typeof a.type=="string")return new CKEDITOR.style.customHandlers[a.type](a);var c=a.attributes;if(c&&c.style){a.styles=CKEDITOR.tools.extend({},a.styles,CKEDITOR.tools.parseCssText(c.style));delete c.style}if(b){a=CKEDITOR.tools.clone(a);v(a.attributes,
b);v(a.styles,b)}c=this.element=a.element?typeof a.element=="string"?a.element.toLowerCase():a.element:"*";this.type=a.type||(r[c]?CKEDITOR.STYLE_BLOCK:o[c]?CKEDITOR.STYLE_OBJECT:CKEDITOR.STYLE_INLINE);if(typeof this.element=="object")this.type=CKEDITOR.STYLE_OBJECT;this._={definition:a}};CKEDITOR.style.prototype={apply:function(a){if(a instanceof CKEDITOR.dom.document)return n.call(this,a.getSelection());if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;if(!b)this._.enterMode=a.activeEnterMode;
n.call(this,a.getSelection(),0,a);this._.enterMode=b}},remove:function(a){if(a instanceof CKEDITOR.dom.document)return n.call(this,a.getSelection(),1);if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;if(!b)this._.enterMode=a.activeEnterMode;n.call(this,a.getSelection(),1,a);this._.enterMode=b}},applyToRange:function(a){this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?e:this.type==CKEDITOR.STYLE_BLOCK?h:this.type==CKEDITOR.STYLE_OBJECT?f:null;return this.applyToRange(a)},removeFromRange:function(a){this.removeFromRange=
this.type==CKEDITOR.STYLE_INLINE?b:this.type==CKEDITOR.STYLE_BLOCK?l:this.type==CKEDITOR.STYLE_OBJECT?d:null;return this.removeFromRange(a)},applyToObject:function(a){u(a,this)},checkActive:function(a,b){switch(this.type){case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(a.block||a.blockLimit,true,b);case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:for(var c=a.elements,d=0,e;d<c.length;d++){e=c[d];if(!(this.type==CKEDITOR.STYLE_INLINE&&(e==a.block||e==a.blockLimit))){if(this.type==
CKEDITOR.STYLE_OBJECT){var f=e.getName();if(!(typeof this.element=="string"?f==this.element:f in this.element))continue}if(this.checkElementRemovable(e,true,b))return true}}}return false},checkApplicable:function(a,b,c){b&&b instanceof CKEDITOR.filter&&(c=b);if(c&&!c.check(this))return false;switch(this.type){case CKEDITOR.STYLE_OBJECT:return!!a.contains(this.element);case CKEDITOR.STYLE_BLOCK:return!!a.blockLimit.getDtd()[this.element]}return true},checkElementMatch:function(a,b){var c=this._.definition;
if(!a||!c.ignoreReadonly&&a.isReadOnly())return false;var d=a.getName();if(typeof this.element=="string"?d==this.element:d in this.element){if(!b&&!a.hasAttributes())return true;if(d=c._AC)c=d;else{var d={},e=0,f=c.attributes;if(f)for(var g in f){e++;d[g]=f[g]}if(g=CKEDITOR.style.getStyleText(c)){d.style||e++;d.style=g}d._length=e;c=c._AC=d}if(c._length){for(var h in c)if(h!="_length"){e=a.getAttribute(h)||"";if(h=="style")a:{d=c[h];typeof d=="string"&&(d=CKEDITOR.tools.parseCssText(d));typeof e==
"string"&&(e=CKEDITOR.tools.parseCssText(e,true));g=void 0;for(g in d)if(!(g in e&&(e[g]==d[g]||d[g]=="inherit"||e[g]=="inherit"))){d=false;break a}d=true}else d=c[h]==e;if(d){if(!b)return true}else if(b)return false}if(b)return true}else return true}return false},checkElementRemovable:function(a,b,c){if(this.checkElementMatch(a,b,c))return true;if(b=E(this)[a.getName()]){var d;if(!(b=b.attributes))return true;for(c=0;c<b.length;c++){d=b[c][0];if(d=a.getAttribute(d)){var e=b[c][1];if(e===null)return true;
if(typeof e=="string"){if(d==e)return true}else if(e.test(d))return true}}}return false},buildPreview:function(a){var b=this._.definition,c=[],d=b.element;d=="bdo"&&(d="span");var c=["<",d],e=b.attributes;if(e)for(var f in e)c.push(" ",f,'="',e[f],'"');(e=CKEDITOR.style.getStyleText(b))&&c.push(' style="',e,'"');c.push(">",a||b.name,"</",d,">");return c.join("")},getDefinition:function(){return this._.definition}};CKEDITOR.style.getStyleText=function(a){var b=a._ST;if(b)return b;var b=a.styles,c=
a.attributes&&a.attributes.style||"",d="";c.length&&(c=c.replace(M,";"));for(var e in b){var f=b[e],g=(e+":"+f).replace(M,";");f=="inherit"?d=d+g:c=c+g}c.length&&(c=CKEDITOR.tools.normalizeCssText(c,true));return a._ST=c+d};CKEDITOR.style.customHandlers={};CKEDITOR.style.addCustomHandler=function(a){var b=function(a){this._={definition:a};this.setup&&this.setup(a)};b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),{assignedTo:CKEDITOR.STYLE_OBJECT},a,true);
return this.customHandlers[a.type]=b};var L=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED,B=CKEDITOR.POSITION_FOLLOWING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED})();CKEDITOR.styleCommand=function(a,e){this.requiredContent=this.allowedContent=this.style=a;CKEDITOR.tools.extend(this,e,true)};
CKEDITOR.styleCommand.prototype.exec=function(a){a.focus();this.state==CKEDITOR.TRISTATE_OFF?a.applyStyle(this.style):this.state==CKEDITOR.TRISTATE_ON&&a.removeStyle(this.style)};CKEDITOR.stylesSet=new CKEDITOR.resourceManager("","stylesSet");CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add,CKEDITOR.stylesSet);CKEDITOR.loadStylesSet=function(a,e,b){CKEDITOR.stylesSet.addExternal(a,e,"");CKEDITOR.stylesSet.load(a,b)};
CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{attachStyleStateChange:function(a,e){var b=this._.styleStateChangeCallbacks;if(!b){b=this._.styleStateChangeCallbacks=[];this.on("selectionChange",function(a){for(var e=0;e<b.length;e++){var d=b[e],h=d.style.checkActive(a.data.path,this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;d.fn.call(this,h)}})}b.push({style:a,fn:e})},applyStyle:function(a){a.apply(this)},removeStyle:function(a){a.remove(this)},getStylesSet:function(a){if(this._.stylesDefinitions)a(this._.stylesDefinitions);
else{var e=this,b=e.config.stylesCombo_stylesSet||e.config.stylesSet;if(b===false)a(null);else if(b instanceof Array){e._.stylesDefinitions=b;a(b)}else{b||(b="default");var b=b.split(":"),c=b[0];CKEDITOR.stylesSet.addExternal(c,b[1]?b.slice(1).join(":"):CKEDITOR.getUrl("styles.js"),"");CKEDITOR.stylesSet.load(c,function(b){e._.stylesDefinitions=b[c];a(e._.stylesDefinitions)})}}}});
CKEDITOR.dom.comment=function(a,e){typeof a=="string"&&(a=(e?e.$:document).createComment(a));CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node;CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,{type:CKEDITOR.NODE_COMMENT,getOuterHtml:function(){return"<\!--"+this.$.nodeValue+"--\>"}});"use strict";
(function(){var a={},e={},b;for(b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list||(a[b]=1);for(b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit||b in CKEDITOR.dtd.$empty||(e[b]=1);CKEDITOR.dom.elementPath=function(b,f){var d=null,h=null,l=[],i=b,g,f=f||b.getDocument().getBody();do if(i.type==CKEDITOR.NODE_ELEMENT){l.push(i);if(!this.lastElement){this.lastElement=i;if(i.is(CKEDITOR.dtd.$object)||i.getAttribute("contenteditable")=="false")continue}if(i.equals(f))break;if(!h){g=i.getName();
i.getAttribute("contenteditable")=="true"?h=i:!d&&e[g]&&(d=i);if(a[g]){var m;if(m=!d){if(g=g=="div"){a:{g=i.getChildren();m=0;for(var t=g.count();m<t;m++){var s=g.getItem(m);if(s.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[s.getName()]){g=true;break a}}g=false}g=!g}m=g}m?d=i:h=i}}}while(i=i.getParent());h||(h=f);this.block=d;this.blockLimit=h;this.root=f;this.elements=l}})();
CKEDITOR.dom.elementPath.prototype={compare:function(a){var e=this.elements,a=a&&a.elements;if(!a||e.length!=a.length)return false;for(var b=0;b<e.length;b++)if(!e[b].equals(a[b]))return false;return true},contains:function(a,e,b){var c;typeof a=="string"&&(c=function(b){return b.getName()==a});a instanceof CKEDITOR.dom.element?c=function(b){return b.equals(a)}:CKEDITOR.tools.isArray(a)?c=function(b){return CKEDITOR.tools.indexOf(a,b.getName())>-1}:typeof a=="function"?c=a:typeof a=="object"&&(c=
function(b){return b.getName()in a});var f=this.elements,d=f.length;e&&d--;if(b){f=Array.prototype.slice.call(f,0);f.reverse()}for(e=0;e<d;e++)if(c(f[e]))return f[e];return null},isContextFor:function(a){var e;if(a in CKEDITOR.dtd.$block){e=this.contains(CKEDITOR.dtd.$intermediate)||this.root.equals(this.block)&&this.block||this.blockLimit;return!!e.getDtd()[a]}return true},direction:function(){return(this.block||this.blockLimit||this.root).getDirection(1)}};
CKEDITOR.dom.text=function(a,e){typeof a=="string"&&(a=(e?e.$:document).createTextNode(a));this.$=a};CKEDITOR.dom.text.prototype=new CKEDITOR.dom.node;
CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,{type:CKEDITOR.NODE_TEXT,getLength:function(){return this.$.nodeValue.length},getText:function(){return this.$.nodeValue},setText:function(a){this.$.nodeValue=a},split:function(a){var e=this.$.parentNode,b=e.childNodes.length,c=this.getLength(),f=this.getDocument(),d=new CKEDITOR.dom.text(this.$.splitText(a),f);if(e.childNodes.length==b)if(a>=c){d=f.createText("");d.insertAfter(this)}else{a=f.createText("");a.insertAfter(d);a.remove()}return d},substring:function(a,
e){return typeof e!="number"?this.$.nodeValue.substr(a):this.$.nodeValue.substring(a,e)}});
(function(){function a(a,c,e){var d=a.serializable,h=c[e?"endContainer":"startContainer"],l=e?"endOffset":"startOffset",i=d?c.document.getById(a.startNode):a.startNode,a=d?c.document.getById(a.endNode):a.endNode;if(h.equals(i.getPrevious())){c.startOffset=c.startOffset-h.getLength()-a.getPrevious().getLength();h=a.getNext()}else if(h.equals(a.getPrevious())){c.startOffset=c.startOffset-h.getLength();h=a.getNext()}h.equals(i.getParent())&&c[l]++;h.equals(a.getParent())&&c[l]++;c[e?"endContainer":"startContainer"]=
h;return c}CKEDITOR.dom.rangeList=function(a){if(a instanceof CKEDITOR.dom.rangeList)return a;a?a instanceof CKEDITOR.dom.range&&(a=[a]):a=[];return CKEDITOR.tools.extend(a,e)};var e={createIterator:function(){var a=this,c=CKEDITOR.dom.walker.bookmark(),e=[],d;return{getNextRange:function(h){d=d===void 0?0:d+1;var l=a[d];if(l&&a.length>1){if(!d)for(var i=a.length-1;i>=0;i--)e.unshift(a[i].createBookmark(true));if(h)for(var g=0;a[d+g+1];){for(var m=l.document,h=0,i=m.getById(e[g].endNode),m=m.getById(e[g+
1].startNode);;){i=i.getNextSourceNode(false);if(m.equals(i))h=1;else if(c(i)||i.type==CKEDITOR.NODE_ELEMENT&&i.isBlockBoundary())continue;break}if(!h)break;g++}for(l.moveToBookmark(e.shift());g--;){i=a[++d];i.moveToBookmark(e.shift());l.setEnd(i.endContainer,i.endOffset)}}return l}}},createBookmarks:function(b){for(var c=[],e,d=0;d<this.length;d++){c.push(e=this[d].createBookmark(b,true));for(var h=d+1;h<this.length;h++){this[h]=a(e,this[h]);this[h]=a(e,this[h],true)}}return c},createBookmarks2:function(a){for(var c=
[],e=0;e<this.length;e++)c.push(this[e].createBookmark2(a));return c},moveToBookmarks:function(a){for(var c=0;c<this.length;c++)this[c].moveToBookmark(a[c])}}})();
(function(){function a(){return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1]||"skins/"+CKEDITOR.skinName.split(",")[0]+"/")}function e(b){var c=CKEDITOR.skin["ua_"+b],d=CKEDITOR.env;if(c)for(var c=c.split(",").sort(function(a,b){return a>b?-1:1}),e=0,f;e<c.length;e++){f=c[e];if(d.ie&&(f.replace(/^ie/,"")==d.version||d.quirks&&f=="iequirks"))f="ie";if(d[f]){b=b+("_"+c[e]);break}}return CKEDITOR.getUrl(a()+b+".css")}function b(a,b){if(!d[a]){CKEDITOR.document.appendStyleSheet(e(a));d[a]=1}b&&b()}
function c(a){var b=a.getById(h);if(!b){b=a.getHead().append("style");b.setAttribute("id",h);b.setAttribute("type","text/css")}return b}function f(a,b,c){var d,e,f;if(CKEDITOR.env.webkit){b=b.split("}").slice(0,-1);for(e=0;e<b.length;e++)b[e]=b[e].split("{")}for(var h=0;h<a.length;h++)if(CKEDITOR.env.webkit)for(e=0;e<b.length;e++){f=b[e][1];for(d=0;d<c.length;d++)f=f.replace(c[d][0],c[d][1]);a[h].$.sheet.addRule(b[e][0],f)}else{f=b;for(d=0;d<c.length;d++)f=f.replace(c[d][0],c[d][1]);CKEDITOR.env.ie&&
CKEDITOR.env.version<11?a[h].$.styleSheet.cssText=a[h].$.styleSheet.cssText+f:a[h].$.innerHTML=a[h].$.innerHTML+f}}var d={};CKEDITOR.skin={path:a,loadPart:function(c,d){CKEDITOR.skin.name!=CKEDITOR.skinName.split(",")[0]?CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a()+"skin.js"),function(){b(c,d)}):b(c,d)},getPath:function(a){return CKEDITOR.getUrl(e(a))},icons:{},addIcon:function(a,b,c,d){a=a.toLowerCase();this.icons[a]||(this.icons[a]={path:b,offset:c||0,bgsize:d||"16px"})},getIconStyle:function(a,
b,c,d,e){var f;if(a){a=a.toLowerCase();b&&(f=this.icons[a+"-rtl"]);f||(f=this.icons[a])}a=c||f&&f.path||"";d=d||f&&f.offset;e=e||f&&f.bgsize||"16px";return a&&"background-image:url("+CKEDITOR.getUrl(a)+");background-position:0 "+d+"px;background-size:"+e+";"}};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{getUiColor:function(){return this.uiColor},setUiColor:function(a){var b=c(CKEDITOR.document);return(this.setUiColor=function(a){var c=CKEDITOR.skin.chameleon,d=[[i,a]];this.uiColor=a;f([b],c(this,
"editor"),d);f(l,c(this,"panel"),d)}).call(this,a)}});var h="cke_ui_color",l=[],i=/\$color/g;CKEDITOR.on("instanceLoaded",function(a){if(!CKEDITOR.env.ie||!CKEDITOR.env.quirks){var b=a.editor,a=function(a){a=(a.data[0]||a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();if(!a.getById("cke_ui_color")){a=c(a);l.push(a);var d=b.getUiColor();d&&f([a],CKEDITOR.skin.chameleon(b,"panel"),[[i,d]])}};b.on("panelShow",a);b.on("menuShow",a);b.config.uiColor&&b.setUiColor(b.config.uiColor)}})})();
(function(){if(CKEDITOR.env.webkit)CKEDITOR.env.hc=false;else{var a=CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>',CKEDITOR.document);a.appendTo(CKEDITOR.document.getHead());try{var e=a.getComputedStyle("border-top-color"),b=a.getComputedStyle("border-right-color");CKEDITOR.env.hc=!!(e&&e==b)}catch(c){CKEDITOR.env.hc=false}a.remove()}if(CKEDITOR.env.hc)CKEDITOR.env.cssClass=CKEDITOR.env.cssClass+" cke_hc";
CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");CKEDITOR.status="loaded";CKEDITOR.fireOnce("loaded");if(a=CKEDITOR._.pending){delete CKEDITOR._.pending;for(e=0;e<a.length;e++){CKEDITOR.editor.prototype.constructor.apply(a[e][0],a[e][1]);CKEDITOR.add(a[e][0])}}})();/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.skin.name="moono";CKEDITOR.skin.ua_editor="ie,iequirks,ie7,ie8,gecko";CKEDITOR.skin.ua_dialog="ie,iequirks,ie7,ie8";
CKEDITOR.skin.chameleon=function(){var b=function(){return function(b,e){for(var a=b.match(/[^#]./g),c=0;3>c;c++){var f=a,h=c,d;d=parseInt(a[c],16);d=("0"+(0>e?0|d*(1+e):0|d+(255-d)*e).toString(16)).slice(-2);f[h]=d}return"#"+a.join("")}}(),c=function(){var b=new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");return function(c,
a){return b.output({from:c,to:a})}}(),f={editor:new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
panel:new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")};
return function(g,e){var a=g.uiColor,a={id:"."+g.id,defaultBorder:b(a,-0.1),defaultGradient:c(b(a,0.9),a),lightGradient:c(b(a,1),b(a,0.7)),mediumGradient:c(b(a,0.8),b(a,0.5)),ckeButtonOn:c(b(a,0.6),b(a,0.7)),ckeResizer:b(a,-0.4),ckeToolbarSeparator:b(a,0.5),ckeColorauto:b(a,0.8),dialogBody:b(a,0.7),dialogTabSelected:c("#FFFFFF","#FFFFFF"),dialogTabSelectedBorder:"#FFF",elementsPathColor:b(a,-0.6),elementsPathBg:a,menubuttonIcon:b(a,0.5),menubuttonIconHover:b(a,0.3)};return f[e].output(a).replace(/\[/g,
"{").replace(/\]/g,"}")}}();CKEDITOR.plugins.add("dialogui",{onLoad:function(){var h=function(b){this._||(this._={});this._["default"]=this._.initValue=b["default"]||"";this._.required=b.required||!1;for(var a=[this._],d=1;d<arguments.length;d++)a.push(arguments[d]);a.push(!0);CKEDITOR.tools.extend.apply(CKEDITOR.tools,a);return this._},r={build:function(b,a,d){return new CKEDITOR.ui.dialog.textInput(b,a,d)}},l={build:function(b,a,d){return new CKEDITOR.ui.dialog[a.type](b,a,d)}},n={isChanged:function(){return this.getValue()!=
this.getInitValue()},reset:function(b){this.setValue(this.getInitValue(),b)},setInitValue:function(){this._.initValue=this.getValue()},resetInitValue:function(){this._.initValue=this._["default"]},getInitValue:function(){return this._.initValue}},o=CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onChange:function(b,a){this._.domOnChangeRegistered||(b.on("load",function(){this.getInputElement().on("change",function(){b.parts.dialog.isVisible()&&this.fire("change",{value:this.getValue()})},
this)},this),this._.domOnChangeRegistered=!0);this.on("change",a)}},!0),s=/^on([A-Z]\w+)/,p=function(b){for(var a in b)(s.test(a)||"title"==a||"type"==a)&&delete b[a];return b};CKEDITOR.tools.extend(CKEDITOR.ui.dialog,{labeledElement:function(b,a,d,f){if(!(4>arguments.length)){var c=h.call(this,a);c.labelId=CKEDITOR.tools.getNextId()+"_label";this._.children=[];var e={role:a.role||"presentation"};a.includeLabel&&(e["aria-labelledby"]=c.labelId);CKEDITOR.ui.dialog.uiElement.call(this,b,a,d,"div",null,
e,function(){var e=[],g=a.required?" cke_required":"";if(a.labelLayout!="horizontal")e.push('<label class="cke_dialog_ui_labeled_label'+g+'" ',' id="'+c.labelId+'"',c.inputId?' for="'+c.inputId+'"':"",(a.labelStyle?' style="'+a.labelStyle+'"':"")+">",a.label,"</label>",'<div class="cke_dialog_ui_labeled_content"',a.controlStyle?' style="'+a.controlStyle+'"':"",' role="presentation">',f.call(this,b,a),"</div>");else{g={type:"hbox",widths:a.widths,padding:0,children:[{type:"html",html:'<label class="cke_dialog_ui_labeled_label'+
g+'" id="'+c.labelId+'" for="'+c.inputId+'"'+(a.labelStyle?' style="'+a.labelStyle+'"':"")+">"+CKEDITOR.tools.htmlEncode(a.label)+"</span>"},{type:"html",html:'<span class="cke_dialog_ui_labeled_content"'+(a.controlStyle?' style="'+a.controlStyle+'"':"")+">"+f.call(this,b,a)+"</span>"}]};CKEDITOR.dialog._.uiElementBuilders.hbox.build(b,g,e)}return e.join("")})}},textInput:function(b,a,d){if(!(3>arguments.length)){h.call(this,a);var f=this._.inputId=CKEDITOR.tools.getNextId()+"_textInput",c={"class":"cke_dialog_ui_input_"+
a.type,id:f,type:a.type};a.validate&&(this.validate=a.validate);a.maxLength&&(c.maxlength=a.maxLength);a.size&&(c.size=a.size);a.inputStyle&&(c.style=a.inputStyle);var e=this,k=!1;b.on("load",function(){e.getInputElement().on("keydown",function(a){a.data.getKeystroke()==13&&(k=true)});e.getInputElement().on("keyup",function(a){if(a.data.getKeystroke()==13&&k){b.getButton("ok")&&setTimeout(function(){b.getButton("ok").click()},0);k=false}},null,null,1E3)});CKEDITOR.ui.dialog.labeledElement.call(this,
b,a,d,function(){var b=['<div class="cke_dialog_ui_input_',a.type,'" role="presentation"'];a.width&&b.push('style="width:'+a.width+'" ');b.push("><input ");c["aria-labelledby"]=this._.labelId;this._.required&&(c["aria-required"]=this._.required);for(var e in c)b.push(e+'="'+c[e]+'" ');b.push(" /></div>");return b.join("")})}},textarea:function(b,a,d){if(!(3>arguments.length)){h.call(this,a);var f=this,c=this._.inputId=CKEDITOR.tools.getNextId()+"_textarea",e={};a.validate&&(this.validate=a.validate);
e.rows=a.rows||5;e.cols=a.cols||20;e["class"]="cke_dialog_ui_input_textarea "+(a["class"]||"");"undefined"!=typeof a.inputStyle&&(e.style=a.inputStyle);a.dir&&(e.dir=a.dir);CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){e["aria-labelledby"]=this._.labelId;this._.required&&(e["aria-required"]=this._.required);var a=['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="',c,'" '],b;for(b in e)a.push(b+'="'+CKEDITOR.tools.htmlEncode(e[b])+'" ');a.push(">",CKEDITOR.tools.htmlEncode(f._["default"]),
"</textarea></div>");return a.join("")})}},checkbox:function(b,a,d){if(!(3>arguments.length)){var f=h.call(this,a,{"default":!!a["default"]});a.validate&&(this.validate=a.validate);CKEDITOR.ui.dialog.uiElement.call(this,b,a,d,"span",null,null,function(){var c=CKEDITOR.tools.extend({},a,{id:a.id?a.id+"_checkbox":CKEDITOR.tools.getNextId()+"_checkbox"},true),e=[],d=CKEDITOR.tools.getNextId()+"_label",g={"class":"cke_dialog_ui_checkbox_input",type:"checkbox","aria-labelledby":d};p(c);if(a["default"])g.checked=
"checked";if(typeof c.inputStyle!="undefined")c.style=c.inputStyle;f.checkbox=new CKEDITOR.ui.dialog.uiElement(b,c,e,"input",null,g);e.push(' <label id="',d,'" for="',g.id,'"'+(a.labelStyle?' style="'+a.labelStyle+'"':"")+">",CKEDITOR.tools.htmlEncode(a.label),"</label>");return e.join("")})}},radio:function(b,a,d){if(!(3>arguments.length)){h.call(this,a);this._["default"]||(this._["default"]=this._.initValue=a.items[0][1]);a.validate&&(this.validate=a.valdiate);var f=[],c=this;a.role="radiogroup";
a.includeLabel=!0;CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){for(var e=[],d=[],g=(a.id?a.id:CKEDITOR.tools.getNextId())+"_radio",i=0;i<a.items.length;i++){var j=a.items[i],h=j[2]!==void 0?j[2]:j[0],l=j[1]!==void 0?j[1]:j[0],m=CKEDITOR.tools.getNextId()+"_radio_input",n=m+"_label",m=CKEDITOR.tools.extend({},a,{id:m,title:null,type:null},true),h=CKEDITOR.tools.extend({},m,{title:h},true),o={type:"radio","class":"cke_dialog_ui_radio_input",name:g,value:l,"aria-labelledby":n},q=[];if(c._["default"]==
l)o.checked="checked";p(m);p(h);if(typeof m.inputStyle!="undefined")m.style=m.inputStyle;m.keyboardFocusable=true;f.push(new CKEDITOR.ui.dialog.uiElement(b,m,q,"input",null,o));q.push(" ");new CKEDITOR.ui.dialog.uiElement(b,h,q,"label",null,{id:n,"for":o.id},j[0]);e.push(q.join(""))}new CKEDITOR.ui.dialog.hbox(b,f,e,d);return d.join("")});this._.children=f}},button:function(b,a,d){if(arguments.length){"function"==typeof a&&(a=a(b.getParentEditor()));h.call(this,a,{disabled:a.disabled||!1});CKEDITOR.event.implementOn(this);
var f=this;b.on("load",function(){var a=this.getElement();(function(){a.on("click",function(a){f.click();a.data.preventDefault()});a.on("keydown",function(a){a.data.getKeystroke()in{32:1}&&(f.click(),a.data.preventDefault())})})();a.unselectable()},this);var c=CKEDITOR.tools.extend({},a);delete c.style;var e=CKEDITOR.tools.getNextId()+"_label";CKEDITOR.ui.dialog.uiElement.call(this,b,c,d,"a",null,{style:a.style,href:"javascript:void(0)",title:a.label,hidefocus:"true","class":a["class"],role:"button",
"aria-labelledby":e},'<span id="'+e+'" class="cke_dialog_ui_button">'+CKEDITOR.tools.htmlEncode(a.label)+"</span>")}},select:function(b,a,d){if(!(3>arguments.length)){var f=h.call(this,a);a.validate&&(this.validate=a.validate);f.inputId=CKEDITOR.tools.getNextId()+"_select";CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){var c=CKEDITOR.tools.extend({},a,{id:a.id?a.id+"_select":CKEDITOR.tools.getNextId()+"_select"},true),e=[],d=[],g={id:f.inputId,"class":"cke_dialog_ui_input_select","aria-labelledby":this._.labelId};
e.push('<div class="cke_dialog_ui_input_',a.type,'" role="presentation"');a.width&&e.push('style="width:'+a.width+'" ');e.push(">");if(a.size!=void 0)g.size=a.size;if(a.multiple!=void 0)g.multiple=a.multiple;p(c);for(var i=0,j;i<a.items.length&&(j=a.items[i]);i++)d.push('<option value="',CKEDITOR.tools.htmlEncode(j[1]!==void 0?j[1]:j[0]).replace(/"/g,"&quot;"),'" /> ',CKEDITOR.tools.htmlEncode(j[0]));if(typeof c.inputStyle!="undefined")c.style=c.inputStyle;f.select=new CKEDITOR.ui.dialog.uiElement(b,
c,e,"select",null,g,d.join(""));e.push("</div>");return e.join("")})}},file:function(b,a,d){if(!(3>arguments.length)){void 0===a["default"]&&(a["default"]="");var f=CKEDITOR.tools.extend(h.call(this,a),{definition:a,buttons:[]});a.validate&&(this.validate=a.validate);b.on("load",function(){CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file")});CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){f.frameId=CKEDITOR.tools.getNextId()+"_fileInput";var b=['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="',
f.frameId,'" title="',a.label,'" src="javascript:void('];b.push(CKEDITOR.env.ie?"(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"})()":"0");b.push(')"></iframe>');return b.join("")})}},fileButton:function(b,a,d){if(!(3>arguments.length)){h.call(this,a);var f=this;a.validate&&(this.validate=a.validate);var c=CKEDITOR.tools.extend({},a),e=c.onClick;c.className=(c.className?c.className+" ":"")+"cke_dialog_ui_button";c.onClick=function(c){var d=
a["for"];if(!e||e.call(this,c)!==false){b.getContentElement(d[0],d[1]).submit();this.disable()}};b.on("load",function(){b.getContentElement(a["for"][0],a["for"][1])._.buttons.push(f)});CKEDITOR.ui.dialog.button.call(this,b,c,d)}},html:function(){var b=/^\s*<[\w:]+\s+([^>]*)?>/,a=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,d=/\/$/;return function(f,c,e){if(!(3>arguments.length)){var k=[],g=c.html;"<"!=g.charAt(0)&&(g="<span>"+g+"</span>");var i=c.focus;if(i){var j=this.focus;this.focus=function(){("function"==
typeof i?i:j).call(this);this.fire("focus")};c.isFocusable&&(this.isFocusable=this.isFocusable);this.keyboardFocusable=!0}CKEDITOR.ui.dialog.uiElement.call(this,f,c,k,"span",null,null,"");k=k.join("").match(b);g=g.match(a)||["","",""];d.test(g[1])&&(g[1]=g[1].slice(0,-1),g[2]="/"+g[2]);e.push([g[1]," ",k[1]||"",g[2]].join(""))}}}(),fieldset:function(b,a,d,f,c){var e=c.label;this._={children:a};CKEDITOR.ui.dialog.uiElement.call(this,b,c,f,"fieldset",null,null,function(){var a=[];e&&a.push("<legend"+
(c.labelStyle?' style="'+c.labelStyle+'"':"")+">"+e+"</legend>");for(var b=0;b<d.length;b++)a.push(d[b]);return a.join("")})}},!0);CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement;CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setLabel:function(b){var a=CKEDITOR.document.getById(this._.labelId);1>a.getChildCount()?(new CKEDITOR.dom.text(b,CKEDITOR.document)).appendTo(a):a.getChild(0).$.nodeValue=b;return this},getLabel:function(){var b=
CKEDITOR.document.getById(this._.labelId);return!b||1>b.getChildCount()?"":b.getChild(0).getText()},eventProcessors:o},!0);CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{click:function(){return!this._.disabled?this.fire("click",{dialog:this._.dialog}):!1},enable:function(){this._.disabled=!1;var b=this.getElement();b&&b.removeClass("cke_disabled")},disable:function(){this._.disabled=!0;this.getElement().addClass("cke_disabled")},isVisible:function(){return this.getElement().getFirst().isVisible()},
isEnabled:function(){return!this._.disabled},eventProcessors:CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onClick:function(b,a){this.on("click",function(){a.apply(this,arguments)})}},!0),accessKeyUp:function(){this.click()},accessKeyDown:function(){this.focus()},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return CKEDITOR.document.getById(this._.inputId)},
focus:function(){var b=this.selectParentTab();setTimeout(function(){var a=b.getInputElement();a&&a.$.focus()},0)},select:function(){var b=this.selectParentTab();setTimeout(function(){var a=b.getInputElement();a&&(a.$.focus(),a.$.select())},0)},accessKeyUp:function(){this.select()},setValue:function(b){!b&&(b="");return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,arguments)},keyboardFocusable:!0},n,!0);CKEDITOR.ui.dialog.textarea.prototype=new CKEDITOR.ui.dialog.textInput;CKEDITOR.ui.dialog.select.prototype=
CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return this._.select.getElement()},add:function(b,a,d){var f=new CKEDITOR.dom.element("option",this.getDialog().getParentEditor().document),c=this.getInputElement().$;f.$.text=b;f.$.value=void 0===a||null===a?b:a;void 0===d||null===d?CKEDITOR.env.ie?c.add(f.$):c.add(f.$,null):c.add(f.$,d);return this},remove:function(b){this.getInputElement().$.remove(b);return this},clear:function(){for(var b=this.getInputElement().$;0<
b.length;)b.remove(0);return this},keyboardFocusable:!0},n,!0);CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getInputElement:function(){return this._.checkbox.getElement()},setValue:function(b,a){this.getInputElement().$.checked=b;!a&&this.fire("change",{value:b})},getValue:function(){return this.getInputElement().$.checked},accessKeyUp:function(){this.setValue(!this.getValue())},eventProcessors:{onChange:function(b,a){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return o.onChange.apply(this,
arguments);b.on("load",function(){var a=this._.checkbox.getElement();a.on("propertychange",function(b){b=b.data.$;"checked"==b.propertyName&&this.fire("change",{value:a.$.checked})},this)},this);this.on("change",a);return null}},keyboardFocusable:!0},n,!0);CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setValue:function(b,a){for(var d=this._.children,f,c=0;c<d.length&&(f=d[c]);c++)f.getElement().$.checked=f.getValue()==b;!a&&this.fire("change",{value:b})},
getValue:function(){for(var b=this._.children,a=0;a<b.length;a++)if(b[a].getElement().$.checked)return b[a].getValue();return null},accessKeyUp:function(){var b=this._.children,a;for(a=0;a<b.length;a++)if(b[a].getElement().$.checked){b[a].getElement().focus();return}b[0].getElement().focus()},eventProcessors:{onChange:function(b,a){if(CKEDITOR.env.ie)b.on("load",function(){for(var a=this._.children,b=this,c=0;c<a.length;c++)a[c].getElement().on("propertychange",function(a){a=a.data.$;"checked"==a.propertyName&&
this.$.checked&&b.fire("change",{value:this.getAttribute("value")})})},this),this.on("change",a);else return o.onChange.apply(this,arguments);return null}}},n,!0);CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,n,{getInputElement:function(){var b=CKEDITOR.document.getById(this._.frameId).getFrameDocument();return 0<b.$.forms.length?new CKEDITOR.dom.element(b.$.forms[0].elements[0]):this.getElement()},submit:function(){this.getInputElement().getParent().$.submit();
return this},getAction:function(){return this.getInputElement().getParent().$.action},registerEvents:function(b){var a=/^on([A-Z]\w+)/,d,f=function(a,b,c,d){a.on("formLoaded",function(){a.getInputElement().on(c,d,a)})},c;for(c in b)if(d=c.match(a))this.eventProcessors[c]?this.eventProcessors[c].call(this,this._.dialog,b[c]):f(this,this._.dialog,d[1].toLowerCase(),b[c]);return this},reset:function(){function b(){d.$.open();var b="";f.size&&(b=f.size-(CKEDITOR.env.ie?7:0));var h=a.frameId+"_input";
d.$.write(['<html dir="'+g+'" lang="'+i+'"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">','<form enctype="multipart/form-data" method="POST" dir="'+g+'" lang="'+i+'" action="',CKEDITOR.tools.htmlEncode(f.action),'"><label id="',a.labelId,'" for="',h,'" style="display:none">',CKEDITOR.tools.htmlEncode(f.label),'</label><input style="width:100%" id="',h,'" aria-labelledby="',a.labelId,'" type="file" name="',CKEDITOR.tools.htmlEncode(f.id||"cke_upload"),
'" size="',CKEDITOR.tools.htmlEncode(0<b?b:""),'" /></form></body></html><script>',CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"","window.parent.CKEDITOR.tools.callFunction("+e+");","window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction("+k+")}","<\/script>"].join(""));d.$.close();for(b=0;b<c.length;b++)c[b].enable()}var a=this._,d=CKEDITOR.document.getById(a.frameId).getFrameDocument(),f=a.definition,c=a.buttons,e=this.formLoadedNumber,k=this.formUnloadNumber,g=a.dialog._.editor.lang.dir,
i=a.dialog._.editor.langCode;e||(e=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){this.fire("formLoaded")},this),k=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){this.getInputElement().clearCustomData()},this),this.getDialog()._.editor.on("destroy",function(){CKEDITOR.tools.removeFunction(e);CKEDITOR.tools.removeFunction(k)}));CKEDITOR.env.gecko?setTimeout(b,500):b()},getValue:function(){return this.getInputElement().$.value||""},setInitValue:function(){this._.initValue=
""},eventProcessors:{onChange:function(b,a){this._.domOnChangeRegistered||(this.on("formLoaded",function(){this.getInputElement().on("change",function(){this.fire("change",{value:this.getValue()})},this)},this),this._.domOnChangeRegistered=!0);this.on("change",a)}},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.fileButton.prototype=new CKEDITOR.ui.dialog.button;CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);CKEDITOR.dialog.addUIElement("text",r);CKEDITOR.dialog.addUIElement("password",
r);CKEDITOR.dialog.addUIElement("textarea",l);CKEDITOR.dialog.addUIElement("checkbox",l);CKEDITOR.dialog.addUIElement("radio",l);CKEDITOR.dialog.addUIElement("button",l);CKEDITOR.dialog.addUIElement("select",l);CKEDITOR.dialog.addUIElement("file",l);CKEDITOR.dialog.addUIElement("fileButton",l);CKEDITOR.dialog.addUIElement("html",l);CKEDITOR.dialog.addUIElement("fieldset",{build:function(b,a,d){for(var f=a.children,c,e=[],h=[],g=0;g<f.length&&(c=f[g]);g++){var i=[];e.push(i);h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b,
c,i))}return new CKEDITOR.ui.dialog[a.type](b,h,e,d,a)}})}});CKEDITOR.DIALOG_RESIZE_NONE=0;CKEDITOR.DIALOG_RESIZE_WIDTH=1;CKEDITOR.DIALOG_RESIZE_HEIGHT=2;CKEDITOR.DIALOG_RESIZE_BOTH=3;
(function(){function t(){for(var a=this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId)+a,c=b-1;c>b-a;c--)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function u(){for(var a=this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId),c=b+1;c<b+a;c++)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function G(a,b){for(var c=a.$.getElementsByTagName("input"),
e=0,d=c.length;e<d;e++){var g=new CKEDITOR.dom.element(c[e]);"text"==g.getAttribute("type").toLowerCase()&&(b?(g.setAttribute("value",g.getCustomData("fake_value")||""),g.removeCustomData("fake_value")):(g.setCustomData("fake_value",g.getAttribute("value")),g.setAttribute("value","")))}}function P(a,b){var c=this.getInputElement();c&&(a?c.removeAttribute("aria-invalid"):c.setAttribute("aria-invalid",!0));a||(this.select?this.select():this.focus());b&&alert(b);this.fire("validated",{valid:a,msg:b})}
function Q(){var a=this.getInputElement();a&&a.removeAttribute("aria-invalid")}function R(a){var a=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",S).output({id:CKEDITOR.tools.getNextNumber(),editorId:a.id,langDir:a.lang.dir,langCode:a.langCode,editorDialogClass:"cke_editor_"+a.name.replace(/\./g,"\\.")+"_dialog",closeTitle:a.lang.common.close,hidpi:CKEDITOR.env.hidpi?"cke_hidpi":""})),b=a.getChild([0,0,0,0,0]),c=b.getChild(0),e=b.getChild(1);if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks){var d=
"javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())";CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="'+d+'" tabIndex="-1"></iframe>').appendTo(b.getParent())}c.unselectable();e.unselectable();return{element:a,parts:{dialog:a.getChild(0),title:c,close:e,tabs:b.getChild(2),contents:b.getChild([3,0,0,0]),footer:b.getChild([3,0,1,0])}}}function H(a,b,c){this.element=b;this.focusIndex=c;this.tabIndex=
0;this.isFocusable=function(){return!b.getAttribute("disabled")&&b.isVisible()};this.focus=function(){a._.currentFocusIndex=this.focusIndex;this.element.focus()};b.on("keydown",function(a){a.data.getKeystroke()in{32:1,13:1}&&this.fire("click")});b.on("focus",function(){this.fire("mouseover")});b.on("blur",function(){this.fire("mouseout")})}function T(a){function b(){a.layout()}var c=CKEDITOR.document.getWindow();c.on("resize",b);a.on("hide",function(){c.removeListener("resize",b)})}function I(a,b){this._=
{dialog:a};CKEDITOR.tools.extend(this,b)}function U(a){function b(b){var c=a.getSize(),i=CKEDITOR.document.getWindow().getViewPaneSize(),o=b.data.$.screenX,j=b.data.$.screenY,n=o-e.x,l=j-e.y;e={x:o,y:j};d.x+=n;d.y+=l;a.move(d.x+h[3]<f?-h[3]:d.x-h[1]>i.width-c.width-f?i.width-c.width+("rtl"==g.lang.dir?0:h[1]):d.x,d.y+h[0]<f?-h[0]:d.y-h[2]>i.height-c.height-f?i.height-c.height+h[2]:d.y,1);b.data.preventDefault()}function c(){CKEDITOR.document.removeListener("mousemove",b);CKEDITOR.document.removeListener("mouseup",
c);if(CKEDITOR.env.ie6Compat){var a=q.getChild(0).getFrameDocument();a.removeListener("mousemove",b);a.removeListener("mouseup",c)}}var e=null,d=null;a.getElement().getFirst();var g=a.getParentEditor(),f=g.config.dialog_magnetDistance,h=CKEDITOR.skin.margins||[0,0,0,0];"undefined"==typeof f&&(f=20);a.parts.title.on("mousedown",function(f){e={x:f.data.$.screenX,y:f.data.$.screenY};CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",c);d=a.getPosition();if(CKEDITOR.env.ie6Compat){var h=
q.getChild(0).getFrameDocument();h.on("mousemove",b);h.on("mouseup",c)}f.data.preventDefault()},a)}function V(a){var b,c;function e(d){var e="rtl"==h.lang.dir,j=o.width,C=o.height,D=j+(d.data.$.screenX-b)*(e?-1:1)*(a._.moved?1:2),n=C+(d.data.$.screenY-c)*(a._.moved?1:2),x=a._.element.getFirst(),x=e&&x.getComputedStyle("right"),y=a.getPosition();y.y+n>i.height&&(n=i.height-y.y);if((e?x:y.x)+D>i.width)D=i.width-(e?x:y.x);if(f==CKEDITOR.DIALOG_RESIZE_WIDTH||f==CKEDITOR.DIALOG_RESIZE_BOTH)j=Math.max(g.minWidth||
0,D-m);if(f==CKEDITOR.DIALOG_RESIZE_HEIGHT||f==CKEDITOR.DIALOG_RESIZE_BOTH)C=Math.max(g.minHeight||0,n-k);a.resize(j,C);a._.moved||a.layout();d.data.preventDefault()}function d(){CKEDITOR.document.removeListener("mouseup",d);CKEDITOR.document.removeListener("mousemove",e);j&&(j.remove(),j=null);if(CKEDITOR.env.ie6Compat){var a=q.getChild(0).getFrameDocument();a.removeListener("mouseup",d);a.removeListener("mousemove",e)}}var g=a.definition,f=g.resizable;if(f!=CKEDITOR.DIALOG_RESIZE_NONE){var h=a.getParentEditor(),
m,k,i,o,j,n=CKEDITOR.tools.addFunction(function(f){o=a.getSize();var h=a.parts.contents;h.$.getElementsByTagName("iframe").length&&(j=CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'),h.append(j));k=o.height-a.parts.contents.getSize("height",!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks));m=o.width-a.parts.contents.getSize("width",1);b=f.screenX;c=f.screenY;i=CKEDITOR.document.getWindow().getViewPaneSize();
CKEDITOR.document.on("mousemove",e);CKEDITOR.document.on("mouseup",d);CKEDITOR.env.ie6Compat&&(h=q.getChild(0).getFrameDocument(),h.on("mousemove",e),h.on("mouseup",d));f.preventDefault&&f.preventDefault()});a.on("load",function(){var b="";f==CKEDITOR.DIALOG_RESIZE_WIDTH?b=" cke_resizer_horizontal":f==CKEDITOR.DIALOG_RESIZE_HEIGHT&&(b=" cke_resizer_vertical");b=CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer'+b+" cke_resizer_"+h.lang.dir+'" title="'+CKEDITOR.tools.htmlEncode(h.lang.common.resize)+
'" onmousedown="CKEDITOR.tools.callFunction('+n+', event )">'+("ltr"==h.lang.dir?"◢":"◣")+"</div>");a.parts.footer.append(b,1)});h.on("destroy",function(){CKEDITOR.tools.removeFunction(n)})}}function E(a){a.data.preventDefault(1)}function J(a){var b=CKEDITOR.document.getWindow(),c=a.config,e=c.dialog_backgroundCoverColor||"white",d=c.dialog_backgroundCoverOpacity,g=c.baseFloatZIndex,c=CKEDITOR.tools.genKey(e,d,g),f=w[c];f?f.show():(g=['<div tabIndex="-1" style="position: ',CKEDITOR.env.ie6Compat?
"absolute":"fixed","; z-index: ",g,"; top: 0px; left: 0px; ",!CKEDITOR.env.ie6Compat?"background-color: "+e:"",'" class="cke_dialog_background_cover">'],CKEDITOR.env.ie6Compat&&(e="<html><body style=\\'background-color:"+e+";\\'></body></html>",g.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'),g.push("void((function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.write( '"+e+"' );document.close();")+"})())"),g.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')),
g.push("</div>"),f=CKEDITOR.dom.element.createFromHtml(g.join("")),f.setOpacity(void 0!=d?d:0.5),f.on("keydown",E),f.on("keypress",E),f.on("keyup",E),f.appendTo(CKEDITOR.document.getBody()),w[c]=f);a.focusManager.add(f);q=f;var a=function(){var a=b.getViewPaneSize();f.setStyles({width:a.width+"px",height:a.height+"px"})},h=function(){var a=b.getScrollPosition(),c=CKEDITOR.dialog._.currentTop;f.setStyles({left:a.x+"px",top:a.y+"px"});if(c){do{a=c.getPosition();c.move(a.x,a.y)}while(c=c._.parentDialog)
}};F=a;b.on("resize",a);a();(!CKEDITOR.env.mac||!CKEDITOR.env.webkit)&&f.focus();if(CKEDITOR.env.ie6Compat){var m=function(){h();arguments.callee.prevScrollHandler.apply(this,arguments)};b.$.setTimeout(function(){m.prevScrollHandler=window.onscroll||function(){};window.onscroll=m},0);h()}}function K(a){q&&(a.focusManager.remove(q),a=CKEDITOR.document.getWindow(),q.hide(),a.removeListener("resize",F),CKEDITOR.env.ie6Compat&&a.$.setTimeout(function(){window.onscroll=window.onscroll&&window.onscroll.prevScrollHandler||
null},0),F=null)}var r=CKEDITOR.tools.cssLength,S='<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog '+CKEDITOR.env.cssClass+' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
CKEDITOR.dialog=function(a,b){function c(){var a=l._.focusList;a.sort(function(a,b){return a.tabIndex!=b.tabIndex?b.tabIndex-a.tabIndex:a.focusIndex-b.focusIndex});for(var b=a.length,c=0;c<b;c++)a[c].focusIndex=c}function e(a){var b=l._.focusList,a=a||0;if(!(1>b.length)){var c=l._.currentFocusIndex;try{b[c].getInputElement().$.blur()}catch(f){}for(var d=c=(c+a+b.length)%b.length;a&&!b[d].isFocusable()&&!(d=(d+a+b.length)%b.length,d==c););b[d].focus();"text"==b[d].type&&b[d].select()}}function d(b){if(l==
CKEDITOR.dialog._.currentTop){var c=b.data.getKeystroke(),d="rtl"==a.lang.dir;o=j=0;if(9==c||c==CKEDITOR.SHIFT+9)c=c==CKEDITOR.SHIFT+9,l._.tabBarMode?(c=c?t.call(l):u.call(l),l.selectPage(c),l._.tabs[c][0].focus()):e(c?-1:1),o=1;else if(c==CKEDITOR.ALT+121&&!l._.tabBarMode&&1<l.getPageCount())l._.tabBarMode=!0,l._.tabs[l._.currentTabId][0].focus(),o=1;else if((37==c||39==c)&&l._.tabBarMode)c=c==(d?39:37)?t.call(l):u.call(l),l.selectPage(c),l._.tabs[c][0].focus(),o=1;else if((13==c||32==c)&&l._.tabBarMode)this.selectPage(this._.currentTabId),
this._.tabBarMode=!1,this._.currentFocusIndex=-1,e(1),o=1;else if(13==c){c=b.data.getTarget();if(!c.is("a","button","select","textarea")&&(!c.is("input")||"button"!=c.$.type))(c=this.getButton("ok"))&&CKEDITOR.tools.setTimeout(c.click,0,c),o=1;j=1}else if(27==c)(c=this.getButton("cancel"))?CKEDITOR.tools.setTimeout(c.click,0,c):!1!==this.fire("cancel",{hide:!0}).hide&&this.hide(),j=1;else return;g(b)}}function g(a){o?a.data.preventDefault(1):j&&a.data.stopPropagation()}var f=CKEDITOR.dialog._.dialogDefinitions[b],
h=CKEDITOR.tools.clone(W),m=a.config.dialog_buttonsOrder||"OS",k=a.lang.dir,i={},o,j;("OS"==m&&CKEDITOR.env.mac||"rtl"==m&&"ltr"==k||"ltr"==m&&"rtl"==k)&&h.buttons.reverse();f=CKEDITOR.tools.extend(f(a),h);f=CKEDITOR.tools.clone(f);f=new L(this,f);h=R(a);this._={editor:a,element:h.element,name:b,contentSize:{width:0,height:0},size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:!1,focusList:[],
currentFocusIndex:0,hasFocus:!1};this.parts=h.parts;CKEDITOR.tools.setTimeout(function(){a.fire("ariaWidget",this.parts.contents)},0,this);h={position:CKEDITOR.env.ie6Compat?"absolute":"fixed",top:0,visibility:"hidden"};h["rtl"==k?"right":"left"]=0;this.parts.dialog.setStyles(h);CKEDITOR.event.call(this);this.definition=f=CKEDITOR.fire("dialogDefinition",{name:b,definition:f},a).definition;if(!("removeDialogTabs"in a._)&&a.config.removeDialogTabs){h=a.config.removeDialogTabs.split(";");for(k=0;k<
h.length;k++)if(m=h[k].split(":"),2==m.length){var n=m[0];i[n]||(i[n]=[]);i[n].push(m[1])}a._.removeDialogTabs=i}if(a._.removeDialogTabs&&(i=a._.removeDialogTabs[b]))for(k=0;k<i.length;k++)f.removeContents(i[k]);if(f.onLoad)this.on("load",f.onLoad);if(f.onShow)this.on("show",f.onShow);if(f.onHide)this.on("hide",f.onHide);if(f.onOk)this.on("ok",function(b){a.fire("saveSnapshot");setTimeout(function(){a.fire("saveSnapshot")},0);!1===f.onOk.call(this,b)&&(b.data.hide=!1)});if(f.onCancel)this.on("cancel",
function(a){!1===f.onCancel.call(this,a)&&(a.data.hide=!1)});var l=this,p=function(a){var b=l._.contents,c=!1,d;for(d in b)for(var f in b[d])if(c=a.call(this,b[d][f]))return};this.on("ok",function(a){p(function(b){if(b.validate){var c=b.validate(this),d="string"==typeof c||!1===c;d&&(a.data.hide=!1,a.stop());P.call(b,!d,"string"==typeof c?c:void 0);return d}})},this,null,0);this.on("cancel",function(b){p(function(c){if(c.isChanged())return!a.config.dialog_noConfirmCancel&&!confirm(a.lang.common.confirmCancel)&&
(b.data.hide=!1),!0})},this,null,0);this.parts.close.on("click",function(a){!1!==this.fire("cancel",{hide:!0}).hide&&this.hide();a.data.preventDefault()},this);this.changeFocus=e;var v=this._.element;a.focusManager.add(v,1);this.on("show",function(){v.on("keydown",d,this);if(CKEDITOR.env.gecko)v.on("keypress",g,this)});this.on("hide",function(){v.removeListener("keydown",d);CKEDITOR.env.gecko&&v.removeListener("keypress",g);p(function(a){Q.apply(a)})});this.on("iframeAdded",function(a){(new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown",
d,this,null,0)});this.on("show",function(){c();if(a.config.dialog_startupFocusTab&&1<l._.pageCount)l._.tabBarMode=!0,l._.tabs[l._.currentTabId][0].focus();else if(!this._.hasFocus)if(this._.currentFocusIndex=-1,f.onFocus){var b=f.onFocus.call(this);b&&b.focus()}else e(1)},this,null,4294967295);if(CKEDITOR.env.ie6Compat)this.on("load",function(){var a=this.getElement(),b=a.getFirst();b.remove();b.appendTo(a)},this);U(this);V(this);(new CKEDITOR.dom.text(f.title,CKEDITOR.document)).appendTo(this.parts.title);
for(k=0;k<f.contents.length;k++)(i=f.contents[k])&&this.addPage(i);this.parts.tabs.on("click",function(a){var b=a.data.getTarget();b.hasClass("cke_dialog_tab")&&(b=b.$.id,this.selectPage(b.substring(4,b.lastIndexOf("_"))),this._.tabBarMode&&(this._.tabBarMode=!1,this._.currentFocusIndex=-1,e(1)),a.data.preventDefault())},this);k=[];i=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:"hbox",className:"cke_dialog_footer_buttons",widths:[],children:f.buttons},k).getChild();this.parts.footer.setHtml(k.join(""));
for(k=0;k<i.length;k++)this._.buttons[i[k].id]=i[k]};CKEDITOR.dialog.prototype={destroy:function(){this.hide();this._.element.remove()},resize:function(){return function(a,b){if(!this._.contentSize||!(this._.contentSize.width==a&&this._.contentSize.height==b))CKEDITOR.dialog.fire("resize",{dialog:this,width:a,height:b},this._.editor),this.fire("resize",{width:a,height:b},this._.editor),this.parts.contents.setStyles({width:a+"px",height:b+"px"}),"rtl"==this._.editor.lang.dir&&this._.position&&(this._.position.x=
CKEDITOR.document.getWindow().getViewPaneSize().width-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle("right"),10)),this._.contentSize={width:a,height:b}}}(),getSize:function(){var a=this._.element.getFirst();return{width:a.$.offsetWidth||0,height:a.$.offsetHeight||0}},move:function(a,b,c){var e=this._.element.getFirst(),d="rtl"==this._.editor.lang.dir,g="fixed"==e.getComputedStyle("position");CKEDITOR.env.ie&&e.setStyle("zoom","100%");if(!g||!this._.position||!(this._.position.x==
a&&this._.position.y==b))this._.position={x:a,y:b},g||(g=CKEDITOR.document.getWindow().getScrollPosition(),a+=g.x,b+=g.y),d&&(g=this.getSize(),a=CKEDITOR.document.getWindow().getViewPaneSize().width-g.width-a),b={top:(0<b?b:0)+"px"},b[d?"right":"left"]=(0<a?a:0)+"px",e.setStyles(b),c&&(this._.moved=1)},getPosition:function(){return CKEDITOR.tools.extend({},this._.position)},show:function(){var a=this._.element,b=this.definition;!a.getParent()||!a.getParent().equals(CKEDITOR.document.getBody())?a.appendTo(CKEDITOR.document.getBody()):
a.setStyle("display","block");this.resize(this._.contentSize&&this._.contentSize.width||b.width||b.minWidth,this._.contentSize&&this._.contentSize.height||b.height||b.minHeight);this.reset();this.selectPage(this.definition.contents[0].id);null===CKEDITOR.dialog._.currentZIndex&&(CKEDITOR.dialog._.currentZIndex=this._.editor.config.baseFloatZIndex);this._.element.getFirst().setStyle("z-index",CKEDITOR.dialog._.currentZIndex+=10);null===CKEDITOR.dialog._.currentTop?(CKEDITOR.dialog._.currentTop=this,
this._.parentDialog=null,J(this._.editor)):(this._.parentDialog=CKEDITOR.dialog._.currentTop,this._.parentDialog.getElement().getFirst().$.style.zIndex-=Math.floor(this._.editor.config.baseFloatZIndex/2),CKEDITOR.dialog._.currentTop=this);a.on("keydown",M);a.on("keyup",N);this._.hasFocus=!1;for(var c in b.contents)if(b.contents[c]){var a=b.contents[c],e=this._.tabs[a.id],d=a.requiredContent,g=0;if(e){for(var f in this._.contents[a.id]){var h=this._.contents[a.id][f];"hbox"==h.type||("vbox"==h.type||
!h.getInputElement())||(h.requiredContent&&!this._.editor.activeFilter.check(h.requiredContent)?h.disable():(h.enable(),g++))}!g||d&&!this._.editor.activeFilter.check(d)?e[0].addClass("cke_dialog_tab_disabled"):e[0].removeClass("cke_dialog_tab_disabled")}}CKEDITOR.tools.setTimeout(function(){this.layout();T(this);this.parts.dialog.setStyle("visibility","");this.fireOnce("load",{});CKEDITOR.ui.fire("ready",this);this.fire("show",{});this._.editor.fire("dialogShow",this);this._.parentDialog||this._.editor.focusManager.lock();
this.foreach(function(a){a.setInitValue&&a.setInitValue()})},100,this)},layout:function(){var a=this.parts.dialog,b=this.getSize(),c=CKEDITOR.document.getWindow().getViewPaneSize(),e=(c.width-b.width)/2,d=(c.height-b.height)/2;CKEDITOR.env.ie6Compat||(b.height+(0<d?d:0)>c.height||b.width+(0<e?e:0)>c.width?a.setStyle("position","absolute"):a.setStyle("position","fixed"));this.move(this._.moved?this._.position.x:e,this._.moved?this._.position.y:d)},foreach:function(a){for(var b in this._.contents)for(var c in this._.contents[b])a.call(this,
this._.contents[b][c]);return this},reset:function(){var a=function(a){a.reset&&a.reset(1)};return function(){this.foreach(a);return this}}(),setupContent:function(){var a=arguments;this.foreach(function(b){b.setup&&b.setup.apply(b,a)})},commitContent:function(){var a=arguments;this.foreach(function(b){CKEDITOR.env.ie&&this._.currentFocusIndex==b.focusIndex&&b.getInputElement().$.blur();b.commit&&b.commit.apply(b,a)})},hide:function(){if(this.parts.dialog.isVisible()){this.fire("hide",{});this._.editor.fire("dialogHide",
this);this.selectPage(this._.tabIdList[0]);var a=this._.element;a.setStyle("display","none");this.parts.dialog.setStyle("visibility","hidden");for(X(this);CKEDITOR.dialog._.currentTop!=this;)CKEDITOR.dialog._.currentTop.hide();if(this._.parentDialog){var b=this._.parentDialog.getElement().getFirst();b.setStyle("z-index",parseInt(b.$.style.zIndex,10)+Math.floor(this._.editor.config.baseFloatZIndex/2))}else K(this._.editor);if(CKEDITOR.dialog._.currentTop=this._.parentDialog)CKEDITOR.dialog._.currentZIndex-=
10;else{CKEDITOR.dialog._.currentZIndex=null;a.removeListener("keydown",M);a.removeListener("keyup",N);var c=this._.editor;c.focus();setTimeout(function(){c.focusManager.unlock();CKEDITOR.env.iOS&&c.window.focus()},0)}delete this._.parentDialog;this.foreach(function(a){a.resetInitValue&&a.resetInitValue()})}},addPage:function(a){if(!a.requiredContent||this._.editor.filter.check(a.requiredContent)){for(var b=[],c=a.label?' title="'+CKEDITOR.tools.htmlEncode(a.label)+'"':"",e=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this,
{type:"vbox",className:"cke_dialog_page_contents",children:a.elements,expand:!!a.expand,padding:a.padding,style:a.style||"width: 100%;"},b),d=this._.contents[a.id]={},g=e.getChild(),f=0;e=g.shift();)!e.notAllowed&&("hbox"!=e.type&&"vbox"!=e.type)&&f++,d[e.id]=e,"function"==typeof e.getChild&&g.push.apply(g,e.getChild());f||(a.hidden=!0);b=CKEDITOR.dom.element.createFromHtml(b.join(""));b.setAttribute("role","tabpanel");e=CKEDITOR.env;d="cke_"+a.id+"_"+CKEDITOR.tools.getNextNumber();c=CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"',
0<this._.pageCount?" cke_last":"cke_first",c,a.hidden?' style="display:none"':"",' id="',d,'"',e.gecko&&!e.hc?"":' href="javascript:void(0)"',' tabIndex="-1" hidefocus="true" role="tab">',a.label,"</a>"].join(""));b.setAttribute("aria-labelledby",d);this._.tabs[a.id]=[c,b];this._.tabIdList.push(a.id);!a.hidden&&this._.pageCount++;this._.lastTab=c;this.updateStyle();b.setAttribute("name",a.id);b.appendTo(this.parts.contents);c.unselectable();this.parts.tabs.append(c);a.accessKey&&(O(this,this,"CTRL+"+
a.accessKey,Y,Z),this._.accessKeyMap["CTRL+"+a.accessKey]=a.id)}},selectPage:function(a){if(this._.currentTabId!=a&&!this._.tabs[a][0].hasClass("cke_dialog_tab_disabled")&&!1!==this.fire("selectPage",{page:a,currentPage:this._.currentTabId})){for(var b in this._.tabs){var c=this._.tabs[b][0],e=this._.tabs[b][1];b!=a&&(c.removeClass("cke_dialog_tab_selected"),e.hide());e.setAttribute("aria-hidden",b!=a)}var d=this._.tabs[a];d[0].addClass("cke_dialog_tab_selected");CKEDITOR.env.ie6Compat||CKEDITOR.env.ie7Compat?
(G(d[1]),d[1].show(),setTimeout(function(){G(d[1],1)},0)):d[1].show();this._.currentTabId=a;this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,a)}},updateStyle:function(){this.parts.dialog[(1===this._.pageCount?"add":"remove")+"Class"]("cke_single_page")},hidePage:function(a){var b=this._.tabs[a]&&this._.tabs[a][0];b&&(1!=this._.pageCount&&b.isVisible())&&(a==this._.currentTabId&&this.selectPage(t.call(this)),b.hide(),this._.pageCount--,this.updateStyle())},showPage:function(a){if(a=this._.tabs[a]&&
this._.tabs[a][0])a.show(),this._.pageCount++,this.updateStyle()},getElement:function(){return this._.element},getName:function(){return this._.name},getContentElement:function(a,b){var c=this._.contents[a];return c&&c[b]},getValueOf:function(a,b){return this.getContentElement(a,b).getValue()},setValueOf:function(a,b,c){return this.getContentElement(a,b).setValue(c)},getButton:function(a){return this._.buttons[a]},click:function(a){return this._.buttons[a].click()},disableButton:function(a){return this._.buttons[a].disable()},
enableButton:function(a){return this._.buttons[a].enable()},getPageCount:function(){return this._.pageCount},getParentEditor:function(){return this._.editor},getSelectedElement:function(){return this.getParentEditor().getSelection().getSelectedElement()},addFocusable:function(a,b){if("undefined"==typeof b)b=this._.focusList.length,this._.focusList.push(new H(this,a,b));else{this._.focusList.splice(b,0,new H(this,a,b));for(var c=b+1;c<this._.focusList.length;c++)this._.focusList[c].focusIndex++}}};
CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(a,b){if(!this._.dialogDefinitions[a]||"function"==typeof b)this._.dialogDefinitions[a]=b},exists:function(a){return!!this._.dialogDefinitions[a]},getCurrent:function(){return CKEDITOR.dialog._.currentTop},isTabEnabled:function(a,b,c){a=a.config.removeDialogTabs;return!(a&&a.match(RegExp("(?:^|;)"+b+":"+c+"(?:$|;)","i")))},okButton:function(){var a=function(a,c){c=c||{};return CKEDITOR.tools.extend({id:"ok",type:"button",label:a.lang.common.ok,"class":"cke_dialog_ui_button_ok",
onClick:function(a){a=a.data.dialog;!1!==a.fire("ok",{hide:!0}).hide&&a.hide()}},c,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),cancelButton:function(){var a=function(a,c){c=c||{};return CKEDITOR.tools.extend({id:"cancel",type:"button",label:a.lang.common.cancel,"class":"cke_dialog_ui_button_cancel",onClick:function(a){a=a.data.dialog;!1!==a.fire("cancel",{hide:!0}).hide&&a.hide()}},c,!0)};a.type="button";a.override=
function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),addUIElement:function(a,b){this._.uiElementBuilders[a]=b}});CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);var W={resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]},z=function(a,
b,c){for(var e=0,d;d=a[e];e++)if(d.id==b||c&&d[c]&&(d=z(d[c],b,c)))return d;return null},A=function(a,b,c,e,d){if(c){for(var g=0,f;f=a[g];g++){if(f.id==c)return a.splice(g,0,b),b;if(e&&f[e]&&(f=A(f[e],b,c,e,!0)))return f}if(d)return null}a.push(b);return b},B=function(a,b,c){for(var e=0,d;d=a[e];e++){if(d.id==b)return a.splice(e,1);if(c&&d[c]&&(d=B(d[c],b,c)))return d}return null},L=function(a,b){this.dialog=a;for(var c=b.contents,e=0,d;d=c[e];e++)c[e]=d&&new I(a,d);CKEDITOR.tools.extend(this,b)};
L.prototype={getContents:function(a){return z(this.contents,a)},getButton:function(a){return z(this.buttons,a)},addContents:function(a,b){return A(this.contents,a,b)},addButton:function(a,b){return A(this.buttons,a,b)},removeContents:function(a){B(this.contents,a)},removeButton:function(a){B(this.buttons,a)}};I.prototype={get:function(a){return z(this.elements,a,"children")},add:function(a,b){return A(this.elements,a,b,"children")},remove:function(a){B(this.elements,a,"children")}};var F,w={},q,s=
{},M=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,e=a.data.$.shiftKey,d=String.fromCharCode(a.data.$.keyCode);if((b=s[(b?"CTRL+":"")+(c?"ALT+":"")+(e?"SHIFT+":"")+d])&&b.length)b=b[b.length-1],b.keydown&&b.keydown.call(b.uiElement,b.dialog,b.key),a.data.preventDefault()},N=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,e=a.data.$.shiftKey,d=String.fromCharCode(a.data.$.keyCode);if((b=s[(b?"CTRL+":"")+(c?"ALT+":"")+(e?"SHIFT+":"")+d])&&b.length)b=b[b.length-
1],b.keyup&&(b.keyup.call(b.uiElement,b.dialog,b.key),a.data.preventDefault())},O=function(a,b,c,e,d){(s[c]||(s[c]=[])).push({uiElement:a,dialog:b,key:c,keyup:d||a.accessKeyUp,keydown:e||a.accessKeyDown})},X=function(a){for(var b in s){for(var c=s[b],e=c.length-1;0<=e;e--)(c[e].dialog==a||c[e].uiElement==a)&&c.splice(e,1);0===c.length&&delete s[b]}},Z=function(a,b){a._.accessKeyMap[b]&&a.selectPage(a._.accessKeyMap[b])},Y=function(){};(function(){CKEDITOR.ui.dialog={uiElement:function(a,b,c,e,d,g,
f){if(!(4>arguments.length)){var h=(e.call?e(b):e)||"div",m=["<",h," "],k=(d&&d.call?d(b):d)||{},i=(g&&g.call?g(b):g)||{},o=(f&&f.call?f.call(this,a,b):f)||"",j=this.domId=i.id||CKEDITOR.tools.getNextId()+"_uiElement";this.id=b.id;b.requiredContent&&!a.getParentEditor().filter.check(b.requiredContent)&&(k.display="none",this.notAllowed=!0);i.id=j;var n={};b.type&&(n["cke_dialog_ui_"+b.type]=1);b.className&&(n[b.className]=1);b.disabled&&(n.cke_disabled=1);for(var l=i["class"]&&i["class"].split?i["class"].split(" "):
[],j=0;j<l.length;j++)l[j]&&(n[l[j]]=1);l=[];for(j in n)l.push(j);i["class"]=l.join(" ");b.title&&(i.title=b.title);n=(b.style||"").split(";");b.align&&(l=b.align,k["margin-left"]="left"==l?0:"auto",k["margin-right"]="right"==l?0:"auto");for(j in k)n.push(j+":"+k[j]);b.hidden&&n.push("display:none");for(j=n.length-1;0<=j;j--)""===n[j]&&n.splice(j,1);0<n.length&&(i.style=(i.style?i.style+"; ":"")+n.join("; "));for(j in i)m.push(j+'="'+CKEDITOR.tools.htmlEncode(i[j])+'" ');m.push(">",o,"</",h,">");
c.push(m.join(""));(this._||(this._={})).dialog=a;"boolean"==typeof b.isChanged&&(this.isChanged=function(){return b.isChanged});"function"==typeof b.isChanged&&(this.isChanged=b.isChanged);"function"==typeof b.setValue&&(this.setValue=CKEDITOR.tools.override(this.setValue,function(a){return function(c){a.call(this,b.setValue.call(this,c))}}));"function"==typeof b.getValue&&(this.getValue=CKEDITOR.tools.override(this.getValue,function(a){return function(){return b.getValue.call(this,a.call(this))}}));
CKEDITOR.event.implementOn(this);this.registerEvents(b);this.accessKeyUp&&(this.accessKeyDown&&b.accessKey)&&O(this,a,"CTRL+"+b.accessKey);var p=this;a.on("load",function(){var b=p.getInputElement();if(b){var c=p.type in{checkbox:1,ratio:1}&&CKEDITOR.env.ie&&CKEDITOR.env.version<8?"cke_dialog_ui_focused":"";b.on("focus",function(){a._.tabBarMode=false;a._.hasFocus=true;p.fire("focus");c&&this.addClass(c)});b.on("blur",function(){p.fire("blur");c&&this.removeClass(c)})}});CKEDITOR.tools.extend(this,
b);this.keyboardFocusable&&(this.tabIndex=b.tabIndex||0,this.focusIndex=a._.focusList.push(this)-1,this.on("focus",function(){a._.currentFocusIndex=p.focusIndex}))}},hbox:function(a,b,c,e,d){if(!(4>arguments.length)){this._||(this._={});var g=this._.children=b,f=d&&d.widths||null,h=d&&d.height||null,m,k={role:"presentation"};d&&d.align&&(k.align=d.align);CKEDITOR.ui.dialog.uiElement.call(this,a,d||{type:"hbox"},e,"table",{},k,function(){var a=['<tbody><tr class="cke_dialog_ui_hbox">'];for(m=0;m<c.length;m++){var b=
"cke_dialog_ui_hbox_child",e=[];0===m&&(b="cke_dialog_ui_hbox_first");m==c.length-1&&(b="cke_dialog_ui_hbox_last");a.push('<td class="',b,'" role="presentation" ');f?f[m]&&e.push("width:"+r(f[m])):e.push("width:"+Math.floor(100/c.length)+"%");h&&e.push("height:"+r(h));d&&void 0!=d.padding&&e.push("padding:"+r(d.padding));CKEDITOR.env.ie&&(CKEDITOR.env.quirks&&g[m].align)&&e.push("text-align:"+g[m].align);0<e.length&&a.push('style="'+e.join("; ")+'" ');a.push(">",c[m],"</td>")}a.push("</tr></tbody>");
return a.join("")})}},vbox:function(a,b,c,e,d){if(!(3>arguments.length)){this._||(this._={});var g=this._.children=b,f=d&&d.width||null,h=d&&d.heights||null;CKEDITOR.ui.dialog.uiElement.call(this,a,d||{type:"vbox"},e,"div",null,{role:"presentation"},function(){var b=['<table role="presentation" cellspacing="0" border="0" '];b.push('style="');d&&d.expand&&b.push("height:100%;");b.push("width:"+r(f||"100%"),";");CKEDITOR.env.webkit&&b.push("float:none;");b.push('"');b.push('align="',CKEDITOR.tools.htmlEncode(d&&
d.align||("ltr"==a.getParentEditor().lang.dir?"left":"right")),'" ');b.push("><tbody>");for(var e=0;e<c.length;e++){var i=[];b.push('<tr><td role="presentation" ');f&&i.push("width:"+r(f||"100%"));h?i.push("height:"+r(h[e])):d&&d.expand&&i.push("height:"+Math.floor(100/c.length)+"%");d&&void 0!=d.padding&&i.push("padding:"+r(d.padding));CKEDITOR.env.ie&&(CKEDITOR.env.quirks&&g[e].align)&&i.push("text-align:"+g[e].align);0<i.length&&b.push('style="',i.join("; "),'" ');b.push(' class="cke_dialog_ui_vbox_child">',
c[e],"</td></tr>")}b.push("</tbody></table>");return b.join("")})}}}})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){return CKEDITOR.document.getById(this.domId)},getInputElement:function(){return this.getElement()},getDialog:function(){return this._.dialog},setValue:function(a,b){this.getInputElement().setValue(a);!b&&this.fire("change",{value:a});return this},getValue:function(){return this.getInputElement().getValue()},isChanged:function(){return!1},selectParentTab:function(){for(var a=
this.getInputElement();(a=a.getParent())&&-1==a.$.className.search("cke_dialog_page_contents"););if(!a)return this;a=a.getAttribute("name");this._.dialog._.currentTabId!=a&&this._.dialog.selectPage(a);return this},focus:function(){this.selectParentTab().getInputElement().focus();return this},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,e=function(a,b,c,d){b.on("load",function(){a.getInputElement().on(c,d,a)})},d;for(d in a)if(c=d.match(b))this.eventProcessors[d]?this.eventProcessors[d].call(this,
this._.dialog,a[d]):e(this,this._.dialog,c[1].toLowerCase(),a[d]);return this},eventProcessors:{onLoad:function(a,b){a.on("load",b,this)},onShow:function(a,b){a.on("show",b,this)},onHide:function(a,b){a.on("hide",b,this)}},accessKeyDown:function(){this.focus()},accessKeyUp:function(){},disable:function(){var a=this.getElement();this.getInputElement().setAttribute("disabled","true");a.addClass("cke_disabled")},enable:function(){var a=this.getElement();this.getInputElement().removeAttribute("disabled");
a.removeClass("cke_disabled")},isEnabled:function(){return!this.getElement().hasClass("cke_disabled")},isVisible:function(){return this.getInputElement().isVisible()},isFocusable:function(){return!this.isEnabled()||!this.isVisible()?!1:!0}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getChild:function(a){if(1>arguments.length)return this._.children.concat();a.splice||(a=[a]);return 2>a.length?this._.children[a[0]]:this._.children[a[0]]&&this._.children[a[0]].getChild?
this._.children[a[0]].getChild(a.slice(1,a.length)):null}},!0);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox;(function(){var a={build:function(a,c,e){for(var d=c.children,g,f=[],h=[],m=0;m<d.length&&(g=d[m]);m++){var k=[];f.push(k);h.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a,g,k))}return new CKEDITOR.ui.dialog[c.type](a,h,f,e,c)}};CKEDITOR.dialog.addUIElement("hbox",a);CKEDITOR.dialog.addUIElement("vbox",a)})();CKEDITOR.dialogCommand=function(a,b){this.dialogName=a;
CKEDITOR.tools.extend(this,b,!0)};CKEDITOR.dialogCommand.prototype={exec:function(a){a.openDialog(this.dialogName)},canUndo:!1,editorFocus:1};(function(){var a=/^([a]|[^a])+$/,b=/^\d*$/,c=/^\d*(?:\.\d+)?$/,e=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,d=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,g=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){var a=arguments;return function(){var b=this&&this.getValue?this.getValue():
a[0],c=void 0,d=CKEDITOR.VALIDATE_AND,e=[],g;for(g=0;g<a.length;g++)if("function"==typeof a[g])e.push(a[g]);else break;g<a.length&&"string"==typeof a[g]&&(c=a[g],g++);g<a.length&&"number"==typeof a[g]&&(d=a[g]);var j=d==CKEDITOR.VALIDATE_AND?!0:!1;for(g=0;g<e.length;g++)j=d==CKEDITOR.VALIDATE_AND?j&&e[g](b):j||e[g](b);return!j?c:!0}},regex:function(a,b){return function(c){c=this&&this.getValue?this.getValue():c;return!a.test(c)?b:!0}},notEmpty:function(b){return this.regex(a,b)},integer:function(a){return this.regex(b,
a)},number:function(a){return this.regex(c,a)},cssLength:function(a){return this.functions(function(a){return d.test(CKEDITOR.tools.trim(a))},a)},htmlLength:function(a){return this.functions(function(a){return e.test(CKEDITOR.tools.trim(a))},a)},inlineStyle:function(a){return this.functions(function(a){return g.test(CKEDITOR.tools.trim(a))},a)},equals:function(a,b){return this.functions(function(b){return b==a},b)},notEqual:function(a,b){return this.functions(function(b){return b!=a},b)}};CKEDITOR.on("instanceDestroyed",
function(a){if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){for(var b;b=CKEDITOR.dialog._.currentTop;)b.hide();for(var c in w)w[c].remove();w={}}var a=a.editor._.storedDialogs,d;for(d in a)a[d].destroy()})})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(a,b){var c=null,e=CKEDITOR.dialog._.dialogDefinitions[a];null===CKEDITOR.dialog._.currentTop&&J(this);if("function"==typeof e)c=this._.storedDialogs||(this._.storedDialogs={}),c=c[a]||(c[a]=new CKEDITOR.dialog(this,a)),b&&b.call(c,
c),c.show();else{if("failed"==e)throw K(this),Error('[CKEDITOR.dialog.openDialog] Dialog "'+a+'" failed when loading definition.');"string"==typeof e&&CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e),function(){"function"!=typeof CKEDITOR.dialog._.dialogDefinitions[a]&&(CKEDITOR.dialog._.dialogDefinitions[a]="failed");this.openDialog(a,b)},this,0,1)}CKEDITOR.skin.loadPart("dialog");return c}})})();
CKEDITOR.plugins.add("dialog",{requires:"dialogui",init:function(t){t.on("doubleclick",function(u){u.data.dialog&&t.openDialog(u.data.dialog)},null,null,999)}});CKEDITOR.plugins.add("about",{requires:"dialog",init:function(a){var b=a.addCommand("about",new CKEDITOR.dialogCommand("about"));b.modes={wysiwyg:1,source:1};b.canUndo=!1;b.readOnly=1;a.ui.addButton&&a.ui.addButton("About",{label:a.lang.about.title,command:"about",toolbar:"about"});CKEDITOR.dialog.add("about",this.path+"dialogs/about.js")}});(function(){CKEDITOR.plugins.add("a11yhelp",{requires:"dialog",availableLangs:{af:1,ar:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,el:1,en:1,"en-gb":1,eo:1,es:1,et:1,fa:1,fi:1,fr:1,"fr-ca":1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,nb:1,nl:1,no:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,sr:1,"sr-latn":1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},init:function(b){var c=this;b.addCommand("a11yHelp",{exec:function(){var a=b.langCode,a=c.availableLangs[a]?a:
c.availableLangs[a.replace(/-.*/,"")]?a.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path+"dialogs/lang/"+a+".js"),function(){b.lang.a11yhelp=c.langEntries[a];b.openDialog("a11yHelp")})},modes:{wysiwyg:1,source:1},readOnly:1,canUndo:!1});b.setKeystroke(CKEDITOR.ALT+48,"a11yHelp");CKEDITOR.dialog.add("a11yHelp",this.path+"dialogs/a11yhelp.js");b.on("ariaEditorHelpLabel",function(a){a.data.label=b.lang.common.editorHelp})}})})();(function(){function f(c){var a=this.att,c=c&&c.hasAttribute(a)&&c.getAttribute(a)||"";void 0!==c&&this.setValue(c)}function g(){for(var c,a=0;a<arguments.length;a++)if(arguments[a]instanceof CKEDITOR.dom.element){c=arguments[a];break}if(c){var a=this.att,b=this.getValue();b?c.setAttribute(a,b):c.removeAttribute(a,b)}}var i={id:1,dir:1,classes:1,styles:1};CKEDITOR.plugins.add("dialogadvtab",{requires:"dialog",allowedContent:function(c){c||(c=i);var a=[];c.id&&a.push("id");c.dir&&a.push("dir");var b=
"";a.length&&(b+="["+a.join(",")+"]");c.classes&&(b+="(*)");c.styles&&(b+="{*}");return b},createAdvancedTab:function(c,a,b){a||(a=i);var d=c.lang.common,h={id:"advanced",label:d.advancedTab,title:d.advancedTab,elements:[{type:"vbox",padding:1,children:[]}]},e=[];if(a.id||a.dir)a.id&&e.push({id:"advId",att:"id",type:"text",requiredContent:b?b+"[id]":null,label:d.id,setup:f,commit:g}),a.dir&&e.push({id:"advLangDir",att:"dir",type:"select",requiredContent:b?b+"[dir]":null,label:d.langDir,"default":"",
style:"width:100%",items:[[d.notSet,""],[d.langDirLTR,"ltr"],[d.langDirRTL,"rtl"]],setup:f,commit:g}),h.elements[0].children.push({type:"hbox",widths:["50%","50%"],children:[].concat(e)});if(a.styles||a.classes)e=[],a.styles&&e.push({id:"advStyles",att:"style",type:"text",requiredContent:b?b+"{cke-xyz}":null,label:d.styles,"default":"",validate:CKEDITOR.dialog.validate.inlineStyle(d.invalidInlineStyle),onChange:function(){},getStyle:function(a,c){var b=this.getValue().match(RegExp("(?:^|;)\\s*"+a+
"\\s*:\\s*([^;]*)","i"));return b?b[1]:c},updateStyle:function(a,b){var d=this.getValue(),e=c.document.createElement("span");e.setAttribute("style",d);e.setStyle(a,b);d=CKEDITOR.tools.normalizeCssText(e.getAttribute("style"));this.setValue(d,1)},setup:f,commit:g}),a.classes&&e.push({type:"hbox",widths:["45%","55%"],children:[{id:"advCSSClasses",att:"class",type:"text",requiredContent:b?b+"(cke-xyz)":null,label:d.cssClasses,"default":"",setup:f,commit:g}]}),h.elements[0].children.push({type:"hbox",
widths:["50%","50%"],children:[].concat(e)});return h}})})();CKEDITOR.plugins.add("basicstyles",{init:function(c){var e=0,d=function(g,d,b,a){if(a){var a=new CKEDITOR.style(a),f=h[b];f.unshift(a);c.attachStyleStateChange(a,function(a){!c.readOnly&&c.getCommand(b).setState(a)});c.addCommand(b,new CKEDITOR.styleCommand(a,{contentForms:f}));c.ui.addButton&&c.ui.addButton(g,{label:d,command:b,toolbar:"basicstyles,"+(e+=10)})}},h={bold:["strong","b",["span",function(a){a=a.styles["font-weight"];return"bold"==a||700<=+a}]],italic:["em","i",["span",function(a){return"italic"==
a.styles["font-style"]}]],underline:["u",["span",function(a){return"underline"==a.styles["text-decoration"]}]],strike:["s","strike",["span",function(a){return"line-through"==a.styles["text-decoration"]}]],subscript:["sub"],superscript:["sup"]},b=c.config,a=c.lang.basicstyles;d("Bold",a.bold,"bold",b.coreStyles_bold);d("Italic",a.italic,"italic",b.coreStyles_italic);d("Underline",a.underline,"underline",b.coreStyles_underline);d("Strike",a.strike,"strike",b.coreStyles_strike);d("Subscript",a.subscript,
"subscript",b.coreStyles_subscript);d("Superscript",a.superscript,"superscript",b.coreStyles_superscript);c.setKeystroke([[CKEDITOR.CTRL+66,"bold"],[CKEDITOR.CTRL+73,"italic"],[CKEDITOR.CTRL+85,"underline"]])}});CKEDITOR.config.coreStyles_bold={element:"strong",overrides:"b"};CKEDITOR.config.coreStyles_italic={element:"em",overrides:"i"};CKEDITOR.config.coreStyles_underline={element:"u"};CKEDITOR.config.coreStyles_strike={element:"s",overrides:"strike"};CKEDITOR.config.coreStyles_subscript={element:"sub"};
CKEDITOR.config.coreStyles_superscript={element:"sup"};(function(){function n(a,f,d,b){if(!a.isReadOnly()&&!a.equals(d.editable())){CKEDITOR.dom.element.setMarker(b,a,"bidi_processed",1);for(var b=a,c=d.editable();(b=b.getParent())&&!b.equals(c);)if(b.getCustomData("bidi_processed")){a.removeStyle("direction");a.removeAttribute("dir");return}b="useComputedState"in d.config?d.config.useComputedState:1;if((b?a.getComputedStyle("direction"):a.getStyle("direction")||a.hasAttribute("dir"))!=f)a.removeStyle("direction"),b?(a.removeAttribute("dir"),f!=a.getComputedStyle("direction")&&
a.setAttribute("dir",f)):a.setAttribute("dir",f),d.forceNextSelectionCheck()}}function r(a,f,d){var b=a.getCommonAncestor(!1,!0),a=a.clone();a.enlarge(d==CKEDITOR.ENTER_BR?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);if(a.checkBoundaryOfElement(b,CKEDITOR.START)&&a.checkBoundaryOfElement(b,CKEDITOR.END)){for(var c;b&&b.type==CKEDITOR.NODE_ELEMENT&&(c=b.getParent())&&1==c.getChildCount()&&!(b.getName()in f);)b=c;return b.type==CKEDITOR.NODE_ELEMENT&&b.getName()in f&&b}}function m(a){return{context:"p",
allowedContent:{"h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td":{propertiesOnly:!0,attributes:"dir"}},requiredContent:"p[dir]",refresh:function(a,d){var b=a.config.useComputedState,c,b=void 0===b||b;if(!b){c=d.lastElement;for(var h=a.editable();c&&!(c.getName()in q||c.equals(h));){var e=c.getParent();if(!e)break;c=e}}c=c||d.block||d.blockLimit;c.equals(a.editable())&&(h=a.getSelection().getRanges()[0].getEnclosedNode())&&h.type==CKEDITOR.NODE_ELEMENT&&(c=h);c&&(b=b?c.getComputedStyle("direction"):
c.getStyle("direction")||c.getAttribute("dir"),a.getCommand("bidirtl").setState("rtl"==b?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF),a.getCommand("bidiltr").setState("ltr"==b?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF));b=(d.block||d.blockLimit||a.editable()).getDirection(1);if(b!=(a._.selDir||a.lang.dir))a._.selDir=b,a.fire("contentDirChanged",b)},exec:function(f){var d=f.getSelection(),b=f.config.enterMode,c=d.getRanges();if(c&&c.length){for(var h={},e=d.createBookmarks(),c=c.createIterator(),g,
j=0;g=c.getNextRange(1);){var i=g.getEnclosedNode();if(!i||i&&!(i.type==CKEDITOR.NODE_ELEMENT&&i.getName()in o))i=r(g,p,b);i&&n(i,a,f,h);var k=new CKEDITOR.dom.walker(g),l=e[j].startNode,m=e[j++].endNode;k.evaluator=function(a){return!!(a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in p&&!(a.getName()==(b==CKEDITOR.ENTER_P?"p":"div")&&a.getParent().type==CKEDITOR.NODE_ELEMENT&&"blockquote"==a.getParent().getName())&&a.getPosition(l)&CKEDITOR.POSITION_FOLLOWING&&(a.getPosition(m)&CKEDITOR.POSITION_PRECEDING+
CKEDITOR.POSITION_CONTAINS)==CKEDITOR.POSITION_PRECEDING)};for(;i=k.next();)n(i,a,f,h);g=g.createIterator();for(g.enlargeBr=b!=CKEDITOR.ENTER_BR;i=g.getNextParagraph(b==CKEDITOR.ENTER_P?"p":"div");)n(i,a,f,h)}CKEDITOR.dom.element.clearAllMarkers(h);f.forceNextSelectionCheck();d.selectBookmarks(e);f.focus()}}}}function s(a){var f=a==j.setAttribute,d=a==j.removeAttribute,b=/\bdirection\s*:\s*(.*?)\s*(:?$|;)/;return function(c,h){if(!this.isReadOnly()){var e;if(e=c==(f||d?"dir":"direction")||"style"==
c&&(d||b.test(h))){a:{e=this;for(var g=e.getDocument().getBody().getParent();e;){if(e.equals(g)){e=!1;break a}e=e.getParent()}e=!0}e=!e}if(e&&(e=this.getDirection(1),g=a.apply(this,arguments),e!=this.getDirection(1)))return this.getDocument().fire("dirChanged",this),g}return a.apply(this,arguments)}}var p={table:1,ul:1,ol:1,blockquote:1,div:1},o={},q={};CKEDITOR.tools.extend(o,p,{tr:1,p:1,div:1,li:1});CKEDITOR.tools.extend(q,o,{td:1});CKEDITOR.plugins.add("bidi",{init:function(a){function f(b,c,d,
e,f){a.addCommand(d,new CKEDITOR.command(a,e));a.ui.addButton&&a.ui.addButton(b,{label:c,command:d,toolbar:"bidi,"+f})}if(!a.blockless){var d=a.lang.bidi;f("BidiLtr",d.ltr,"bidiltr",m("ltr"),10);f("BidiRtl",d.rtl,"bidirtl",m("rtl"),20);a.on("contentDom",function(){a.document.on("dirChanged",function(b){a.fire("dirChanged",{node:b.data,dir:b.data.getDirection(1)})})});a.on("contentDirChanged",function(b){var b=(a.lang.dir!=b.data?"add":"remove")+"Class",c=a.ui.space(a.config.toolbarLocation);if(c)c[b]("cke_mixed_dir_content")})}}});
for(var j=CKEDITOR.dom.element.prototype,l=["setStyle","removeStyle","setAttribute","removeAttribute"],k=0;k<l.length;k++)j[l[k]]=CKEDITOR.tools.override(j[l[k]],s)})();(function(){var k={exec:function(g){var a=g.getCommand("blockquote").state,i=g.getSelection(),c=i&&i.getRanges()[0];if(c){var h=i.createBookmarks();if(CKEDITOR.env.ie){var e=h[0].startNode,b=h[0].endNode,d;if(e&&"blockquote"==e.getParent().getName())for(d=e;d=d.getNext();)if(d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()){e.move(d,!0);break}if(b&&"blockquote"==b.getParent().getName())for(d=b;d=d.getPrevious();)if(d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()){b.move(d);break}}var f=c.createIterator();
f.enlargeBr=g.config.enterMode!=CKEDITOR.ENTER_BR;if(a==CKEDITOR.TRISTATE_OFF){for(e=[];a=f.getNextParagraph();)e.push(a);1>e.length&&(a=g.document.createElement(g.config.enterMode==CKEDITOR.ENTER_P?"p":"div"),b=h.shift(),c.insertNode(a),a.append(new CKEDITOR.dom.text("﻿",g.document)),c.moveToBookmark(b),c.selectNodeContents(a),c.collapse(!0),b=c.createBookmark(),e.push(a),h.unshift(b));d=e[0].getParent();c=[];for(b=0;b<e.length;b++)a=e[b],d=d.getCommonAncestor(a.getParent());for(a={table:1,tbody:1,
tr:1,ol:1,ul:1};a[d.getName()];)d=d.getParent();for(b=null;0<e.length;){for(a=e.shift();!a.getParent().equals(d);)a=a.getParent();a.equals(b)||c.push(a);b=a}for(;0<c.length;)if(a=c.shift(),"blockquote"==a.getName()){for(b=new CKEDITOR.dom.documentFragment(g.document);a.getFirst();)b.append(a.getFirst().remove()),e.push(b.getLast());b.replace(a)}else e.push(a);c=g.document.createElement("blockquote");for(c.insertBefore(e[0]);0<e.length;)a=e.shift(),c.append(a)}else if(a==CKEDITOR.TRISTATE_ON){b=[];
for(d={};a=f.getNextParagraph();){for(e=c=null;a.getParent();){if("blockquote"==a.getParent().getName()){c=a.getParent();e=a;break}a=a.getParent()}c&&(e&&!e.getCustomData("blockquote_moveout"))&&(b.push(e),CKEDITOR.dom.element.setMarker(d,e,"blockquote_moveout",!0))}CKEDITOR.dom.element.clearAllMarkers(d);a=[];e=[];for(d={};0<b.length;)f=b.shift(),c=f.getParent(),f.getPrevious()?f.getNext()?(f.breakParent(f.getParent()),e.push(f.getNext())):f.remove().insertAfter(c):f.remove().insertBefore(c),c.getCustomData("blockquote_processed")||
(e.push(c),CKEDITOR.dom.element.setMarker(d,c,"blockquote_processed",!0)),a.push(f);CKEDITOR.dom.element.clearAllMarkers(d);for(b=e.length-1;0<=b;b--){c=e[b];a:{d=c;for(var f=0,k=d.getChildCount(),j=void 0;f<k&&(j=d.getChild(f));f++)if(j.type==CKEDITOR.NODE_ELEMENT&&j.isBlockBoundary()){d=!1;break a}d=!0}d&&c.remove()}if(g.config.enterMode==CKEDITOR.ENTER_BR)for(c=!0;a.length;)if(f=a.shift(),"div"==f.getName()){b=new CKEDITOR.dom.documentFragment(g.document);c&&(f.getPrevious()&&!(f.getPrevious().type==
CKEDITOR.NODE_ELEMENT&&f.getPrevious().isBlockBoundary()))&&b.append(g.document.createElement("br"));for(c=f.getNext()&&!(f.getNext().type==CKEDITOR.NODE_ELEMENT&&f.getNext().isBlockBoundary());f.getFirst();)f.getFirst().remove().appendTo(b);c&&b.append(g.document.createElement("br"));b.replace(f);c=!1}}i.selectBookmarks(h);g.focus()}},refresh:function(g,a){this.setState(g.elementPath(a.block||a.blockLimit).contains("blockquote",1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)},context:"blockquote",
allowedContent:"blockquote",requiredContent:"blockquote"};CKEDITOR.plugins.add("blockquote",{init:function(g){g.blockless||(g.addCommand("blockquote",k),g.ui.addButton&&g.ui.addButton("Blockquote",{label:g.lang.blockquote.toolbar,command:"blockquote",toolbar:"blocks,10"}))}})})();(function(){function v(b){function a(){var e=b.editable();e.on(p,function(b){(!CKEDITOR.env.ie||!n)&&u(b)});CKEDITOR.env.ie&&e.on("paste",function(e){q||(g(),e.data.preventDefault(),u(e),h("paste")||b.openDialog("paste"))});CKEDITOR.env.ie&&(e.on("contextmenu",i,null,null,0),e.on("beforepaste",function(b){b.data&&(!b.data.$.ctrlKey&&!b.data.$.shiftKey)&&i()},null,null,0));e.on("beforecut",function(){!n&&j(b)});var a;e.attachListener(CKEDITOR.env.ie?e:b.document.getDocumentElement(),"mouseup",function(){a=
setTimeout(function(){r()},0)});b.on("destroy",function(){clearTimeout(a)});e.on("keyup",r)}function c(e){return{type:e,canUndo:"cut"==e,startDisabled:!0,exec:function(){"cut"==this.type&&j();var e;var a=this.type;if(CKEDITOR.env.ie)e=h(a);else try{e=b.document.$.execCommand(a,!1,null)}catch(d){e=!1}e||alert(b.lang.clipboard[this.type+"Error"]);return e}}}function d(){return{canUndo:!1,async:!0,exec:function(b,a){var d=function(a,d){a&&f(a.type,a.dataValue,!!d);b.fire("afterCommandExec",{name:"paste",
command:c,returnValue:!!a})},c=this;"string"==typeof a?d({type:"auto",dataValue:a},1):b.getClipboardData(d)}}}function g(){q=1;setTimeout(function(){q=0},100)}function i(){n=1;setTimeout(function(){n=0},10)}function h(e){var a=b.document,d=a.getBody(),c=!1,j=function(){c=!0};d.on(e,j);(7<CKEDITOR.env.version?a.$:a.$.selection.createRange()).execCommand(e);d.removeListener(e,j);return c}function f(e,a,d){e={type:e};if(d&&!1===b.fire("beforePaste",e)||!a)return!1;e.dataValue=a;return b.fire("paste",
e)}function j(){if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks){var e=b.getSelection(),a,d,c;if(e.getType()==CKEDITOR.SELECTION_ELEMENT&&(a=e.getSelectedElement()))d=e.getRanges()[0],c=b.document.createText(""),c.insertBefore(a),d.setStartBefore(c),d.setEndAfter(a),e.selectRanges([d]),setTimeout(function(){a.getParent()&&(c.remove(),e.selectElement(a))},0)}}function l(a,d){var c=b.document,j=b.editable(),l=function(b){b.cancel()},g;if(!c.getById("cke_pastebin")){var i=b.getSelection(),s=i.createBookmarks();
CKEDITOR.env.ie&&i.root.fire("selectionchange");var k=new CKEDITOR.dom.element((CKEDITOR.env.webkit||j.is("body"))&&!CKEDITOR.env.ie?"body":"div",c);k.setAttributes({id:"cke_pastebin","data-cke-temp":"1"});var f=0,c=c.getWindow();CKEDITOR.env.webkit?(j.append(k),k.addClass("cke_editable"),j.is("body")||(f="static"!=j.getComputedStyle("position")?j:CKEDITOR.dom.element.get(j.$.offsetParent),f=f.getDocumentPosition().y)):j.getAscendant(CKEDITOR.env.ie?"body":"html",1).append(k);k.setStyles({position:"absolute",
top:c.getScrollPosition().y-f+10+"px",width:"1px",height:Math.max(1,c.getViewPaneSize().height-20)+"px",overflow:"hidden",margin:0,padding:0});CKEDITOR.env.safari&&k.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","text"));(f=k.getParent().isReadOnly())?(k.setOpacity(0),k.setAttribute("contenteditable",!0)):k.setStyle("ltr"==b.config.contentsLangDirection?"left":"right","-1000px");b.on("selectionChange",l,null,null,0);if(CKEDITOR.env.webkit||CKEDITOR.env.gecko)g=j.once("blur",l,null,null,-100);
f&&k.focus();f=new CKEDITOR.dom.range(k);f.selectNodeContents(k);var h=f.select();CKEDITOR.env.ie&&(g=j.once("blur",function(){b.lockSelection(h)}));var m=CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){if(CKEDITOR.env.webkit)CKEDITOR.document.getBody().$.scrollTop=m;g&&g.removeListener();CKEDITOR.env.ie&&j.focus();i.selectBookmarks(s);k.remove();var a;if(CKEDITOR.env.webkit&&(a=k.getFirst())&&a.is&&a.hasClass("Apple-style-span"))k=a;b.removeListener("selectionChange",l);
d(k.getHtml())},0)}}function s(){if(CKEDITOR.env.ie){b.focus();g();var a=b.focusManager;a.lock();if(b.editable().fire(p)&&!h("paste"))return a.unlock(),!1;a.unlock()}else try{if(b.editable().fire(p)&&!b.document.$.execCommand("Paste",!1,null))throw 0;}catch(d){return!1}return!0}function o(a){if("wysiwyg"==b.mode)switch(a.data.keyCode){case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:a=b.editable();g();!CKEDITOR.env.ie&&a.fire("beforepaste");break;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:b.fire("saveSnapshot"),
setTimeout(function(){b.fire("saveSnapshot")},50)}}function u(a){var d={type:"auto"},c=b.fire("beforePaste",d);l(a,function(b){b=b.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,"");c&&f(d.type,b,0,1)})}function r(){if("wysiwyg"==b.mode){var a=m("paste");b.getCommand("cut").setState(m("cut"));b.getCommand("copy").setState(m("copy"));b.getCommand("paste").setState(a);b.fire("pasteState",a)}}function m(a){if(t&&a in{paste:1,cut:1})return CKEDITOR.TRISTATE_DISABLED;if("paste"==a)return CKEDITOR.TRISTATE_OFF;
var a=b.getSelection(),d=a.getRanges();return a.getType()==CKEDITOR.SELECTION_NONE||1==d.length&&d[0].collapsed?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF}var n=0,q=0,t=0,p=CKEDITOR.env.ie?"beforepaste":"paste";(function(){b.on("key",o);b.on("contentDom",a);b.on("selectionChange",function(b){t=b.data.selection.getRanges()[0].checkReadOnly();r()});b.contextMenu&&b.contextMenu.addListener(function(b,a){t=a.getRanges()[0].checkReadOnly();return{cut:m("cut"),copy:m("copy"),paste:m("paste")}})})();
(function(){function a(d,c,j,e,l){var g=b.lang.clipboard[c];b.addCommand(c,j);b.ui.addButton&&b.ui.addButton(d,{label:g,command:c,toolbar:"clipboard,"+e});b.addMenuItems&&b.addMenuItem(c,{label:g,command:c,group:"clipboard",order:l})}a("Cut","cut",c("cut"),10,1);a("Copy","copy",c("copy"),20,4);a("Paste","paste",d(),30,8)})();b.getClipboardData=function(a,d){function c(a){a.removeListener();a.cancel();d(a.data)}function j(a){a.removeListener();a.cancel();i=!0;d({type:f,dataValue:a.data})}function l(){this.customTitle=
a&&a.title}var g=!1,f="auto",i=!1;d||(d=a,a=null);b.on("paste",c,null,null,0);b.on("beforePaste",function(a){a.removeListener();g=true;f=a.data.type},null,null,1E3);!1===s()&&(b.removeListener("paste",c),g&&b.fire("pasteDialog",l)?(b.on("pasteDialogCommit",j),b.on("dialogHide",function(a){a.removeListener();a.data.removeListener("pasteDialogCommit",j);setTimeout(function(){i||d(null)},10)})):d(null))}}function w(b){if(CKEDITOR.env.webkit){if(!b.match(/^[^<]*$/g)&&!b.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return"html"}else if(CKEDITOR.env.ie){if(!b.match(/^([^<]|<br( ?\/)?>)*$/gi)&&
!b.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return"html"}else if(CKEDITOR.env.gecko){if(!b.match(/^([^<]|<br( ?\/)?>)*$/gi))return"html"}else return"html";return"htmlifiedtext"}function x(b,a){function c(a){return CKEDITOR.tools.repeat("</p><p>",~~(a/2))+(1==a%2?"<br>":"")}a=a.replace(/\s+/g," ").replace(/> +</g,"><").replace(/<br ?\/>/gi,"<br>");a=a.replace(/<\/?[A-Z]+>/g,function(a){return a.toLowerCase()});if(a.match(/^[^<]$/))return a;CKEDITOR.env.webkit&&-1<a.indexOf("<div>")&&(a=a.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,
"<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,"<div></div>"),a.match(/<div>(<br>|)<\/div>/)&&(a="<p>"+a.replace(/(<div>(<br>|)<\/div>)+/g,function(a){return c(a.split("</div><div>").length+1)})+"</p>"),a=a.replace(/<\/div><div>/g,"<br>"),a=a.replace(/<\/?div>/g,""));CKEDITOR.env.gecko&&b.enterMode!=CKEDITOR.ENTER_BR&&(CKEDITOR.env.gecko&&(a=a.replace(/^<br><br>$/,"<br>")),-1<a.indexOf("<br><br>")&&(a="<p>"+a.replace(/(<br>){2,}/g,function(a){return c(a.length/4)})+"</p>"));return o(b,a)}function y(){var b=
new CKEDITOR.htmlParser.filter,a={blockquote:1,dl:1,fieldset:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ol:1,p:1,table:1,ul:1},c=CKEDITOR.tools.extend({br:0},CKEDITOR.dtd.$inline),d={p:1,br:1,"cke:br":1},g=CKEDITOR.dtd,i=CKEDITOR.tools.extend({area:1,basefont:1,embed:1,iframe:1,map:1,object:1,param:1},CKEDITOR.dtd.$nonBodyContent,CKEDITOR.dtd.$cdata),h=function(a){delete a.name;a.add(new CKEDITOR.htmlParser.text(" "))},f=function(a){for(var b=a,c;(b=b.next)&&b.name&&b.name.match(/^h\d$/);){c=new CKEDITOR.htmlParser.element("cke:br");
c.isEmpty=!0;for(a.add(c);c=b.children.shift();)a.add(c)}};b.addRules({elements:{h1:f,h2:f,h3:f,h4:f,h5:f,h6:f,img:function(a){var a=CKEDITOR.tools.trim(a.attributes.alt||""),b=" ";a&&!a.match(/(^http|\.(jpe?g|gif|png))/i)&&(b=" ["+a+"] ");return new CKEDITOR.htmlParser.text(b)},td:h,th:h,$:function(b){var f=b.name,h;if(i[f])return!1;b.attributes={};if("br"==f)return b;if(a[f])b.name="p";else if(c[f])delete b.name;else if(g[f]){h=new CKEDITOR.htmlParser.element("cke:br");h.isEmpty=!0;if(CKEDITOR.dtd.$empty[f])return h;
b.add(h,0);h=h.clone();h.isEmpty=!0;b.add(h);delete b.name}d[b.name]||delete b.name;return b}}},{applyToAll:!0});return b}function z(b,a,c){var a=new CKEDITOR.htmlParser.fragment.fromHtml(a),d=new CKEDITOR.htmlParser.basicWriter;a.writeHtml(d,c);var a=d.getHtml(),a=a.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g,"$1").replace(/(<cke:br \/>){2,}/g,"<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g,"$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g,"$1").replace(/<(cke:)?br( \/)?>/g,"<br>").replace(/<p><\/p>/g,
""),g=0,a=a.replace(/<\/?p>/g,function(a){if("<p>"==a){if(1<++g)return"</p><p>"}else if(0<--g)return"</p><p>";return a}).replace(/<p><\/p>/g,"");return o(b,a)}function o(b,a){b.enterMode==CKEDITOR.ENTER_BR?a=a.replace(/(<\/p><p>)+/g,function(a){return CKEDITOR.tools.repeat("<br>",2*(a.length/7))}).replace(/<\/?p>/g,""):b.enterMode==CKEDITOR.ENTER_DIV&&(a=a.replace(/<(\/)?p>/g,"<$1div>"));return a}CKEDITOR.plugins.add("clipboard",{requires:"dialog",init:function(b){var a;v(b);CKEDITOR.dialog.add("paste",
CKEDITOR.getUrl(this.path+"dialogs/paste.js"));b.on("paste",function(a){var b=a.data.dataValue,g=CKEDITOR.dtd.$block;-1<b.indexOf("Apple-")&&(b=b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi," "),"html"!=a.data.type&&(b=b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,function(a,b){return b.replace(/\t/g,"&nbsp;&nbsp; &nbsp;")})),-1<b.indexOf('<br class="Apple-interchange-newline">')&&(a.data.startsWithEOL=1,a.data.preSniffing="html",b=b.replace(/<br class="Apple-interchange-newline">/,
"")),b=b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,"$1"));if(b.match(/^<[^<]+cke_(editable|contents)/i)){var i,h,f=new CKEDITOR.dom.element("div");for(f.setHtml(b);1==f.getChildCount()&&(i=f.getFirst())&&i.type==CKEDITOR.NODE_ELEMENT&&(i.hasClass("cke_editable")||i.hasClass("cke_contents"));)f=h=i;h&&(b=h.getHtml().replace(/<br>$/i,""))}CKEDITOR.env.ie?b=b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(b,d){if(d.toLowerCase()in g){a.data.preSniffing="html";return"<"+d}return b}):CKEDITOR.env.webkit?
b=b.replace(/<\/(\w+)><div><br><\/div>$/,function(b,d){if(d in g){a.data.endsWithEOL=1;return"</"+d+">"}return b}):CKEDITOR.env.gecko&&(b=b.replace(/(\s)<br>$/,"$1"));a.data.dataValue=b},null,null,3);b.on("paste",function(c){var c=c.data,d=c.type,g=c.dataValue,i,h=b.config.clipboard_defaultContentType||"html";i="html"==d||"html"==c.preSniffing?"html":w(g);"htmlifiedtext"==i?g=x(b.config,g):"text"==d&&"html"==i&&(g=z(b.config,g,a||(a=y(b))));c.startsWithEOL&&(g='<br data-cke-eol="1">'+g);c.endsWithEOL&&
(g+='<br data-cke-eol="1">');"auto"==d&&(d="html"==i||"html"==h?"html":"text");c.type=d;c.dataValue=g;delete c.preSniffing;delete c.startsWithEOL;delete c.endsWithEOL},null,null,6);b.on("paste",function(a){a=a.data;b.insertHtml(a.dataValue,a.type);setTimeout(function(){b.fire("afterPaste")},0)},null,null,1E3);b.on("pasteDialog",function(a){setTimeout(function(){b.openDialog("paste",a.data)},0)})}})})();(function(){var c='<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"'+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href=\"javascript:void('{titleJs}')\"")+' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(c+=' onkeypress="return false;"');CKEDITOR.env.gecko&&(c+=' onblur="this.style.cssText = this.style.cssText;"');var c=c+(' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" '+
(CKEDITOR.env.ie?'onclick="return false;" onmouseup':"onclick")+'="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'),c=c+'>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>',m=CKEDITOR.addTemplate("buttonArrow",'<span class="cke_button_arrow">'+(CKEDITOR.env.hc?"&#9660;":"")+"</span>"),n=CKEDITOR.addTemplate("button",c);CKEDITOR.plugins.add("button",
{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_BUTTON,CKEDITOR.ui.button.handler)}});CKEDITOR.UI_BUTTON="button";CKEDITOR.ui.button=function(a){CKEDITOR.tools.extend(this,a,{title:a.label,click:a.click||function(b){b.execCommand(a.command)}});this._={}};CKEDITOR.ui.button.handler={create:function(a){return new CKEDITOR.ui.button(a)}};CKEDITOR.ui.button.prototype={render:function(a,b){var c=CKEDITOR.env,i=this._.id=CKEDITOR.tools.getNextId(),e="",f=this.command,k;this._.editor=a;var d={id:i,button:this,
editor:a,focus:function(){CKEDITOR.document.getById(i).focus()},execute:function(){this.button.click(a)},attach:function(a){this.button.attach(a)}},o=CKEDITOR.tools.addFunction(function(a){if(d.onkey)return a=new CKEDITOR.dom.event(a),!1!==d.onkey(d,a.getKeystroke())}),p=CKEDITOR.tools.addFunction(function(a){var b;d.onfocus&&(b=!1!==d.onfocus(d,new CKEDITOR.dom.event(a)));return b}),l=0;d.clickFn=k=CKEDITOR.tools.addFunction(function(){l&&(a.unlockSelection(1),l=0);d.execute();c.iOS&&a.focus()});
if(this.modes){var j={},g=function(){var b=a.mode;b&&(b=this.modes[b]?void 0!=j[b]?j[b]:CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,b=a.readOnly&&!this.readOnly?CKEDITOR.TRISTATE_DISABLED:b,this.setState(b),this.refresh&&this.refresh())};a.on("beforeModeUnload",function(){a.mode&&this._.state!=CKEDITOR.TRISTATE_DISABLED&&(j[a.mode]=this._.state)},this);a.on("activeFilterChange",g,this);a.on("mode",g,this);!this.readOnly&&a.on("readOnly",g,this)}else if(f&&(f=a.getCommand(f)))f.on("state",function(){this.setState(f.state)},
this),e+=f.state==CKEDITOR.TRISTATE_ON?"on":f.state==CKEDITOR.TRISTATE_DISABLED?"disabled":"off";if(this.directional)a.on("contentDirChanged",function(b){var c=CKEDITOR.document.getById(this._.id),d=c.getFirst(),b=b.data;b!=a.lang.dir?c.addClass("cke_"+b):c.removeClass("cke_ltr").removeClass("cke_rtl");d.setAttribute("style",CKEDITOR.skin.getIconStyle(h,"rtl"==b,this.icon,this.iconOffset))},this);f||(e+="off");var h=g=this.name||this.command;this.icon&&!/\./.test(this.icon)&&(h=this.icon,this.icon=
null);e={id:i,name:g,iconName:h,label:this.label,cls:this.className||"",state:e,ariaDisabled:"disabled"==e?"true":"false",title:this.title,titleJs:c.gecko&&!c.hc?"":(this.title||"").replace("'",""),hasArrow:this.hasArrow?"true":"false",keydownFn:o,focusFn:p,clickFn:k,style:CKEDITOR.skin.getIconStyle(h,"rtl"==a.lang.dir,this.icon,this.iconOffset),arrowHtml:this.hasArrow?m.output():""};n.output(e,b);if(this.onRender)this.onRender();return d},setState:function(a){if(this._.state==a)return!1;this._.state=
a;var b=CKEDITOR.document.getById(this._.id);return b?(b.setState(a,"cke_button"),a==CKEDITOR.TRISTATE_DISABLED?b.setAttribute("aria-disabled",!0):b.removeAttribute("aria-disabled"),this.hasArrow?(a=a==CKEDITOR.TRISTATE_ON?this._.editor.lang.button.selectedLabel.replace(/%1/g,this.label):this.label,CKEDITOR.document.getById(this._.id+"_label").setText(a)):a==CKEDITOR.TRISTATE_ON?b.setAttribute("aria-pressed",!0):b.removeAttribute("aria-pressed"),!0):!1},getState:function(){return this._.state},toFeature:function(a){if(this._.feature)return this._.feature;
var b=this;!this.allowedContent&&(!this.requiredContent&&this.command)&&(b=a.getCommand(this.command)||b);return this._.feature=b}};CKEDITOR.ui.prototype.addButton=function(a,b){this.add(a,CKEDITOR.UI_BUTTON,b)}})();CKEDITOR.plugins.add("panelbutton",{requires:"button",onLoad:function(){function e(c){var a=this._;a.state!=CKEDITOR.TRISTATE_DISABLED&&(this.createPanel(c),a.on?a.panel.hide():a.panel.showBlock(this._.id,this.document.getById(this._.id),4))}CKEDITOR.ui.panelButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(c){var a=c.panel||{};delete c.panel;this.base(c);this.document=a.parent&&a.parent.getDocument()||CKEDITOR.document;a.block={attributes:a.attributes};this.hasArrow=a.toolbarRelated=
!0;this.click=e;this._={panelDefinition:a}},statics:{handler:{create:function(c){return new CKEDITOR.ui.panelButton(c)}}},proto:{createPanel:function(c){var a=this._;if(!a.panel){var f=this._.panelDefinition,e=this._.panelDefinition.block,g=f.parent||CKEDITOR.document.getBody(),d=this._.panel=new CKEDITOR.ui.floatPanel(c,g,f),f=d.addBlock(a.id,e),b=this;d.onShow=function(){b.className&&this.element.addClass(b.className+"_panel");b.setState(CKEDITOR.TRISTATE_ON);a.on=1;b.editorFocus&&c.focus();if(b.onOpen)b.onOpen()};
d.onHide=function(d){b.className&&this.element.getFirst().removeClass(b.className+"_panel");b.setState(b.modes&&b.modes[c.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);a.on=0;if(!d&&b.onClose)b.onClose()};d.onEscape=function(){d.hide(1);b.document.getById(a.id).focus()};if(this.onBlock)this.onBlock(d,f);f.onHide=function(){a.on=0;b.setState(CKEDITOR.TRISTATE_OFF)}}}}})},beforeInit:function(e){e.ui.addHandler(CKEDITOR.UI_PANELBUTTON,CKEDITOR.ui.panelButton.handler)}});
CKEDITOR.UI_PANELBUTTON="panelbutton";(function(){CKEDITOR.plugins.add("panel",{beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_PANEL,CKEDITOR.ui.panel.handler)}});CKEDITOR.UI_PANEL="panel";CKEDITOR.ui.panel=function(a,b){b&&CKEDITOR.tools.extend(this,b);CKEDITOR.tools.extend(this,{className:"",css:[]});this.id=CKEDITOR.tools.getNextId();this.document=a;this.isFramed=this.forceIFrame||this.css.length;this._={blocks:{}}};CKEDITOR.ui.panel.handler={create:function(a){return new CKEDITOR.ui.panel(a)}};var f=CKEDITOR.addTemplate("panel",
'<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),g=CKEDITOR.addTemplate("panel-frame",'<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'),h=CKEDITOR.addTemplate("panel-frame-inner",'<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
CKEDITOR.ui.panel.prototype={render:function(a,b){this.getHolderElement=function(){var a=this._.holder;if(!a){if(this.isFramed){var a=this.document.getById(this.id+"_frame"),b=a.getParent(),a=a.getFrameDocument();CKEDITOR.env.iOS&&b.setStyles({overflow:"scroll","-webkit-overflow-scrolling":"touch"});b=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(){this.isLoaded=!0;if(this.onLoad)this.onLoad()},this));a.write(h.output(CKEDITOR.tools.extend({css:CKEDITOR.tools.buildStyleHtml(this.css),onload:"window.parent.CKEDITOR.tools.callFunction("+
b+");"},d)));a.getWindow().$.CKEDITOR=CKEDITOR;a.on("keydown",function(a){var b=a.data.getKeystroke(),c=this.document.getById(this.id).getAttribute("dir");this._.onKeyDown&&!1===this._.onKeyDown(b)?a.data.preventDefault():(27==b||b==("rtl"==c?39:37))&&this.onEscape&&!1===this.onEscape(b)&&a.data.preventDefault()},this);a=a.getBody();a.unselectable();CKEDITOR.env.air&&CKEDITOR.tools.callFunction(b)}else a=this.document.getById(this.id);this._.holder=a}return a};var d={editorId:a.id,id:this.id,langCode:a.langCode,
dir:a.lang.dir,cls:this.className,frame:"",env:CKEDITOR.env.cssClass,"z-index":a.config.baseFloatZIndex+1};if(this.isFramed){var e=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie?"javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())":"";d.frame=g.output({id:this.id+"_frame",src:e})}e=f.output(d);b&&b.push(e);return e},addBlock:function(a,b){b=this._.blocks[a]=b instanceof CKEDITOR.ui.panel.block?b:new CKEDITOR.ui.panel.block(this.getHolderElement(),
b);this._.currentBlock||this.showBlock(a);return b},getBlock:function(a){return this._.blocks[a]},showBlock:function(a){var a=this._.blocks[a],b=this._.currentBlock,d=!this.forceIFrame||CKEDITOR.env.ie?this._.holder:this.document.getById(this.id+"_frame");b&&b.hide();this._.currentBlock=a;CKEDITOR.fire("ariaWidget",d);a._.focusIndex=-1;this._.onKeyDown=a.onKeyDown&&CKEDITOR.tools.bind(a.onKeyDown,a);a.show();return a},destroy:function(){this.element&&this.element.remove()}};CKEDITOR.ui.panel.block=
CKEDITOR.tools.createClass({$:function(a,b){this.element=a.append(a.getDocument().createElement("div",{attributes:{tabindex:-1,"class":"cke_panel_block"},styles:{display:"none"}}));b&&CKEDITOR.tools.extend(this,b);this.element.setAttributes({role:this.attributes.role||"presentation","aria-label":this.attributes["aria-label"],title:this.attributes.title||this.attributes["aria-label"]});this.keys={};this._.focusIndex=-1;this.element.disableContextMenu()},_:{markItem:function(a){-1!=a&&(a=this.element.getElementsByTag("a").getItem(this._.focusIndex=
a),CKEDITOR.env.webkit&&a.getDocument().getWindow().focus(),a.focus(),this.onMark&&this.onMark(a))}},proto:{show:function(){this.element.setStyle("display","")},hide:function(){(!this.onHide||!0!==this.onHide.call(this))&&this.element.setStyle("display","none")},onKeyDown:function(a,b){var d=this.keys[a];switch(d){case "next":for(var e=this._.focusIndex,d=this.element.getElementsByTag("a"),c;c=d.getItem(++e);)if(c.getAttribute("_cke_focus")&&c.$.offsetWidth){this._.focusIndex=e;c.focus();break}return!c&&
!b?(this._.focusIndex=-1,this.onKeyDown(a,1)):!1;case "prev":e=this._.focusIndex;for(d=this.element.getElementsByTag("a");0<e&&(c=d.getItem(--e));){if(c.getAttribute("_cke_focus")&&c.$.offsetWidth){this._.focusIndex=e;c.focus();break}c=null}return!c&&!b?(this._.focusIndex=d.count(),this.onKeyDown(a,1)):!1;case "click":case "mouseup":return e=this._.focusIndex,(c=0<=e&&this.element.getElementsByTag("a").getItem(e))&&(c.$[d]?c.$[d]():c.$["on"+d]()),!1}return!0}}})})();CKEDITOR.plugins.add("floatpanel",{requires:"panel"});
(function(){function r(a,b,c,i,f){var f=CKEDITOR.tools.genKey(b.getUniqueId(),c.getUniqueId(),a.lang.dir,a.uiColor||"",i.css||"",f||""),h=g[f];h||(h=g[f]=new CKEDITOR.ui.panel(b,i),h.element=c.append(CKEDITOR.dom.element.createFromHtml(h.render(a),b)),h.element.setStyles({display:"none",position:"absolute"}));return h}var g={};CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(a,b,c,i){function f(){d.hide()}c.forceIFrame=1;c.toolbarRelated&&a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&
(b=CKEDITOR.document.getById("cke_"+a.name));var h=b.getDocument(),i=r(a,h,b,c,i||0),j=i.element,l=j.getFirst(),d=this;j.disableContextMenu();this.element=j;this._={editor:a,panel:i,parentElement:b,definition:c,document:h,iframe:l,children:[],dir:a.lang.dir};a.on("mode",f);a.on("resize",f);if(!CKEDITOR.env.iOS)h.getWindow().on("resize",f)},proto:{addBlock:function(a,b){return this._.panel.addBlock(a,b)},addListBlock:function(a,b){return this._.panel.addListBlock(a,b)},getBlock:function(a){return this._.panel.getBlock(a)},
showBlock:function(a,b,c,i,f,h){var j=this._.panel,l=j.showBlock(a);this.allowBlur(!1);a=this._.editor.editable();this._.returnFocus=a.hasFocus?a:new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);this._.hideTimeout=0;var d=this.element,a=this._.iframe,a=CKEDITOR.env.ie?a:new CKEDITOR.dom.window(a.$.contentWindow),g=d.getDocument(),o=this._.parentElement.getPositionedAncestor(),p=b.getDocumentPosition(g),g=o?o.getDocumentPosition(g):{x:0,y:0},m="rtl"==this._.dir,e=p.x+(i||0)-g.x,k=p.y+(f||
0)-g.y;if(m&&(1==c||4==c))e+=b.$.offsetWidth;else if(!m&&(2==c||3==c))e+=b.$.offsetWidth-1;if(3==c||4==c)k+=b.$.offsetHeight-1;this._.panel._.offsetParentId=b.getId();d.setStyles({top:k+"px",left:0,display:""});d.setOpacity(0);d.getFirst().removeStyle("width");this._.editor.focusManager.add(a);this._.blurSet||(CKEDITOR.event.useCapture=!0,a.on("blur",function(a){function q(){delete this._.returnFocus;this.hide()}this.allowBlur()&&a.data.getPhase()==CKEDITOR.EVENT_PHASE_AT_TARGET&&(this.visible&&!this._.activeChild)&&
(CKEDITOR.env.iOS?this._.hideTimeout||(this._.hideTimeout=CKEDITOR.tools.setTimeout(q,0,this)):q.call(this))},this),a.on("focus",function(){this._.focused=!0;this.hideChild();this.allowBlur(!0)},this),CKEDITOR.env.iOS&&(a.on("touchstart",function(){clearTimeout(this._.hideTimeout)},this),a.on("touchend",function(){this._.hideTimeout=0;this.focus()},this)),CKEDITOR.event.useCapture=!1,this._.blurSet=1);j.onEscape=CKEDITOR.tools.bind(function(a){if(this.onEscape&&this.onEscape(a)===false)return false},
this);CKEDITOR.tools.setTimeout(function(){var a=CKEDITOR.tools.bind(function(){d.removeStyle("width");if(l.autoSize){var a=l.element.getDocument(),a=(CKEDITOR.env.webkit?l.element:a.getBody()).$.scrollWidth;CKEDITOR.env.ie&&(CKEDITOR.env.quirks&&a>0)&&(a=a+((d.$.offsetWidth||0)-(d.$.clientWidth||0)+3));d.setStyle("width",a+10+"px");a=l.element.$.scrollHeight;CKEDITOR.env.ie&&(CKEDITOR.env.quirks&&a>0)&&(a=a+((d.$.offsetHeight||0)-(d.$.clientHeight||0)+3));d.setStyle("height",a+"px");j._.currentBlock.element.setStyle("display",
"none").removeStyle("display")}else d.removeStyle("height");m&&(e=e-d.$.offsetWidth);d.setStyle("left",e+"px");var b=j.element.getWindow(),a=d.$.getBoundingClientRect(),b=b.getViewPaneSize(),c=a.width||a.right-a.left,f=a.height||a.bottom-a.top,i=m?a.right:b.width-a.left,g=m?b.width-a.right:a.left;m?i<c&&(e=g>c?e+c:b.width>c?e-a.left:e-a.right+b.width):i<c&&(e=g>c?e-c:b.width>c?e-a.right+b.width:e-a.left);c=a.top;b.height-a.top<f&&(k=c>f?k-f:b.height>f?k-a.bottom+b.height:k-a.top);if(CKEDITOR.env.ie){b=
a=new CKEDITOR.dom.element(d.$.offsetParent);b.getName()=="html"&&(b=b.getDocument().getBody());b.getComputedStyle("direction")=="rtl"&&(e=CKEDITOR.env.ie8Compat?e-d.getDocument().getDocumentElement().$.scrollLeft*2:e-(a.$.scrollWidth-a.$.clientWidth))}var a=d.getFirst(),n;(n=a.getCustomData("activePanel"))&&n.onHide&&n.onHide.call(this,1);a.setCustomData("activePanel",this);d.setStyles({top:k+"px",left:e+"px"});d.setOpacity(1);h&&h()},this);j.isLoaded?a():j.onLoad=a;CKEDITOR.tools.setTimeout(function(){var a=
CKEDITOR.env.webkit&&CKEDITOR.document.getWindow().getScrollPosition().y;this.focus();l.element.focus();if(CKEDITOR.env.webkit)CKEDITOR.document.getBody().$.scrollTop=a;this.allowBlur(true);this._.editor.fire("panelShow",this)},0,this)},CKEDITOR.env.air?200:0,this);this.visible=1;this.onShow&&this.onShow.call(this)},focus:function(){if(CKEDITOR.env.webkit){var a=CKEDITOR.document.getActive();a&&!a.equals(this._.iframe)&&a.$.blur()}(this._.lastFocused||this._.iframe.getFrameDocument().getWindow()).focus()},
blur:function(){var a=this._.iframe.getFrameDocument().getActive();a&&a.is("a")&&(this._.lastFocused=a)},hide:function(a){if(this.visible&&(!this.onHide||!0!==this.onHide.call(this))){this.hideChild();CKEDITOR.env.gecko&&this._.iframe.getFrameDocument().$.activeElement.blur();this.element.setStyle("display","none");this.visible=0;this.element.getFirst().removeCustomData("activePanel");if(a=a&&this._.returnFocus)CKEDITOR.env.webkit&&a.type&&a.getWindow().$.focus(),a.focus();delete this._.lastFocused;
this._.editor.fire("panelHide",this)}},allowBlur:function(a){var b=this._.panel;void 0!=a&&(b.allowBlur=a);return b.allowBlur},showAsChild:function(a,b,c,g,f,h){this._.activeChild==a&&a._.panel._.offsetParentId==c.getId()||(this.hideChild(),a.onHide=CKEDITOR.tools.bind(function(){CKEDITOR.tools.setTimeout(function(){this._.focused||this.hide()},0,this)},this),this._.activeChild=a,this._.focused=!1,a.showBlock(b,c,g,f,h),this.blur(),(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)&&setTimeout(function(){a.element.getChild(0).$.style.cssText+=
""},100))},hideChild:function(a){var b=this._.activeChild;b&&(delete b.onHide,delete this._.activeChild,b.hide(),a&&this.focus())}}});CKEDITOR.on("instanceDestroyed",function(){var a=CKEDITOR.tools.isEmpty(CKEDITOR.instances),b;for(b in g){var c=g[b];a?c.destroy():c.element.hide()}a&&(g={})})})();CKEDITOR.plugins.add("colorbutton",{requires:"panelbutton,floatpanel",init:function(c){function o(m,g,d,h){var i=new CKEDITOR.style(j["colorButton_"+g+"Style"]),k=CKEDITOR.tools.getNextId()+"_colorBox";c.ui.add(m,CKEDITOR.UI_PANELBUTTON,{label:d,title:d,modes:{wysiwyg:1},editorFocus:0,toolbar:"colors,"+h,allowedContent:i,requiredContent:i,panel:{css:CKEDITOR.skin.getPath("editor"),attributes:{role:"listbox","aria-label":f.panelTitle}},onBlock:function(a,b){b.autoSize=!0;b.element.addClass("cke_colorblock");
b.element.setHtml(q(a,g,k));b.element.getDocument().getBody().setStyle("overflow","hidden");CKEDITOR.ui.fire("ready",this);var e=b.keys,d="rtl"==c.lang.dir;e[d?37:39]="next";e[40]="next";e[9]="next";e[d?39:37]="prev";e[38]="prev";e[CKEDITOR.SHIFT+9]="prev";e[32]="click"},refresh:function(){c.activeFilter.check(i)||this.setState(CKEDITOR.TRISTATE_DISABLED)},onOpen:function(){var a=c.getSelection(),a=a&&a.getStartElement(),a=c.elementPath(a),b;if(a){a=a.block||a.blockLimit||c.document.getBody();do b=
a&&a.getComputedStyle("back"==g?"background-color":"color")||"transparent";while("back"==g&&"transparent"==b&&a&&(a=a.getParent()));if(!b||"transparent"==b)b="#ffffff";this._.panel._.iframe.getFrameDocument().getById(k).setStyle("background-color",b);return b}}})}function q(m,g,d){var h=[],i=j.colorButton_colors.split(","),k=c.plugins.colordialog&&!1!==j.colorButton_enableMore,a=i.length+(k?2:1),b=CKEDITOR.tools.addFunction(function(a,b){if("?"==a){var e=arguments.callee,d=function(a){this.removeListener("ok",
d);this.removeListener("cancel",d);"ok"==a.name&&e(this.getContentElement("picker","selectedColor").getValue(),b)};c.openDialog("colordialog",function(){this.on("ok",d);this.on("cancel",d)})}else{c.focus();m.hide();c.fire("saveSnapshot");c.removeStyle(new CKEDITOR.style(j["colorButton_"+b+"Style"],{color:"inherit"}));if(a){var f=j["colorButton_"+b+"Style"];f.childRule="back"==b?function(a){return p(a)}:function(a){return!(a.is("a")||a.getElementsByTag("a").count())||p(a)};c.applyStyle(new CKEDITOR.style(f,
{color:a}))}c.fire("saveSnapshot")}});h.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="',f.auto,'" onclick="CKEDITOR.tools.callFunction(',b,",null,'",g,"');return false;\" href=\"javascript:void('",f.auto,'\')" role="option" aria-posinset="1" aria-setsize="',a,'"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="',d,'"></span></td><td colspan=7 align=center>',f.auto,'</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
for(d=0;d<i.length;d++){0===d%8&&h.push("</tr><tr>");var e=i[d].split("/"),l=e[0],n=e[1]||l;e[1]||(l="#"+l.replace(/^(.)(.)(.)$/,"$1$1$2$2$3$3"));e=c.lang.colorbutton.colors[n]||n;h.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="',e,'" onclick="CKEDITOR.tools.callFunction(',b,",'",l,"','",g,"'); return false;\" href=\"javascript:void('",e,'\')" role="option" aria-posinset="',d+2,'" aria-setsize="',a,'"><span class="cke_colorbox" style="background-color:#',n,'"></span></a></td>')}k&&
h.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="',f.more,'" onclick="CKEDITOR.tools.callFunction(',b,",'?','",g,"');return false;\" href=\"javascript:void('",f.more,"')\"",' role="option" aria-posinset="',a,'" aria-setsize="',a,'">',f.more,"</a></td>");h.push("</tr></table>");return h.join("")}function p(c){return"false"==c.getAttribute("contentEditable")||c.getAttribute("data-nostyle")}var j=c.config,f=c.lang.colorbutton;CKEDITOR.env.hc||(o("TextColor",
"fore",f.textColorTitle,10),o("BGColor","back",f.bgColorTitle,20))}});CKEDITOR.config.colorButton_colors="000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF";CKEDITOR.config.colorButton_foreStyle={element:"span",styles:{color:"#(color)"},overrides:[{element:"font",attributes:{color:null}}]};
CKEDITOR.config.colorButton_backStyle={element:"span",styles:{"background-color":"#(color)"}};CKEDITOR.plugins.colordialog={requires:"dialog",init:function(b){var c=new CKEDITOR.dialogCommand("colordialog");c.editorFocus=!1;b.addCommand("colordialog",c);CKEDITOR.dialog.add("colordialog",this.path+"dialogs/colordialog.js");b.getColorFromDialog=function(c,f){var d=function(a){this.removeListener("ok",d);this.removeListener("cancel",d);a="ok"==a.name?this.getValueOf("picker","selectedColor"):null;c.call(f,a)},e=function(a){a.on("ok",d);a.on("cancel",d)};b.execCommand("colordialog");if(b._.storedDialogs&&
b._.storedDialogs.colordialog)e(b._.storedDialogs.colordialog);else CKEDITOR.on("dialogDefinition",function(a){if("colordialog"==a.data.name){var b=a.data.definition;a.removeListener();b.onLoad=CKEDITOR.tools.override(b.onLoad,function(a){return function(){e(this);b.onLoad=a;"function"==typeof a&&a.call(this)}})}})}}};CKEDITOR.plugins.add("colordialog",CKEDITOR.plugins.colordialog);(function(){CKEDITOR.plugins.add("templates",{requires:"dialog",init:function(a){CKEDITOR.dialog.add("templates",CKEDITOR.getUrl(this.path+"dialogs/templates.js"));a.addCommand("templates",new CKEDITOR.dialogCommand("templates"));a.ui.addButton&&a.ui.addButton("Templates",{label:a.lang.templates.button,command:"templates",toolbar:"doctools,10"})}});var c={},f={};CKEDITOR.addTemplates=function(a,d){c[a]=d};CKEDITOR.getTemplates=function(a){return c[a]};CKEDITOR.loadTemplates=function(a,d){for(var e=
[],b=0,c=a.length;b<c;b++)f[a[b]]||(e.push(a[b]),f[a[b]]=1);e.length?CKEDITOR.scriptLoader.load(e,d):setTimeout(d,0)}})();CKEDITOR.config.templates_files=[CKEDITOR.getUrl("plugins/templates/templates/default.js")];CKEDITOR.config.templates_replaceContent=!0;CKEDITOR.plugins.add("menu",{requires:"floatpanel",beforeInit:function(g){for(var h=g.config.menu_groups.split(","),m=g._.menuGroups={},l=g._.menuItems={},a=0;a<h.length;a++)m[h[a]]=a+1;g.addMenuGroup=function(b,a){m[b]=a||100};g.addMenuItem=function(a,c){m[c.group]&&(l[a]=new CKEDITOR.menuItem(this,a,c))};g.addMenuItems=function(a){for(var c in a)this.addMenuItem(c,a[c])};g.getMenuItem=function(a){return l[a]};g.removeMenuItem=function(a){delete l[a]}}});
(function(){function g(a){a.sort(function(a,c){return a.group<c.group?-1:a.group>c.group?1:a.order<c.order?-1:a.order>c.order?1:0})}var h='<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="{role}" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked}';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(h+=' onkeypress="return false;"');CKEDITOR.env.gecko&&
(h+=' onblur="this.style.cssText = this.style.cssText;"');var h=h+(' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" '+(CKEDITOR.env.ie?'onclick="return false;" onmouseup':"onclick")+'="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'),m=CKEDITOR.addTemplate("menuItem",h+'<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'),
l=CKEDITOR.addTemplate("menuArrow",'<span class="cke_menuarrow"><span>{label}</span></span>');CKEDITOR.menu=CKEDITOR.tools.createClass({$:function(a,b){b=this._.definition=b||{};this.id=CKEDITOR.tools.getNextId();this.editor=a;this.items=[];this._.listeners=[];this._.level=b.level||1;var c=CKEDITOR.tools.extend({},b.panel,{css:[CKEDITOR.skin.getPath("editor")],level:this._.level-1,block:{}}),k=c.block.attributes=c.attributes||{};!k.role&&(k.role="menu");this._.panelDefinition=c},_:{onShow:function(){var a=
this.editor.getSelection(),b=a&&a.getStartElement(),c=this.editor.elementPath(),k=this._.listeners;this.removeAll();for(var e=0;e<k.length;e++){var j=k[e](b,a,c);if(j)for(var i in j){var f=this.editor.getMenuItem(i);if(f&&(!f.command||this.editor.getCommand(f.command).state))f.state=j[i],this.add(f)}}},onClick:function(a){this.hide();if(a.onClick)a.onClick();else a.command&&this.editor.execCommand(a.command)},onEscape:function(a){var b=this.parent;b?b._.panel.hideChild(1):27==a&&this.hide(1);return!1},
onHide:function(){this.onHide&&this.onHide()},showSubMenu:function(a){var b=this._.subMenu,c=this.items[a];if(c=c.getItems&&c.getItems()){b?b.removeAll():(b=this._.subMenu=new CKEDITOR.menu(this.editor,CKEDITOR.tools.extend({},this._.definition,{level:this._.level+1},!0)),b.parent=this,b._.onClick=CKEDITOR.tools.bind(this._.onClick,this));for(var k in c){var e=this.editor.getMenuItem(k);e&&(e.state=c[k],b.add(e))}var j=this._.panel.getBlock(this.id).element.getDocument().getById(this.id+(""+a));setTimeout(function(){b.show(j,
2)},0)}else this._.panel.hideChild(1)}},proto:{add:function(a){a.order||(a.order=this.items.length);this.items.push(a)},removeAll:function(){this.items=[]},show:function(a,b,c,k){if(!this.parent&&(this._.onShow(),!this.items.length))return;var b=b||("rtl"==this.editor.lang.dir?2:1),e=this.items,j=this.editor,i=this._.panel,f=this._.element;if(!i){i=this._.panel=new CKEDITOR.ui.floatPanel(this.editor,CKEDITOR.document.getBody(),this._.panelDefinition,this._.level);i.onEscape=CKEDITOR.tools.bind(function(a){if(!1===
this._.onEscape(a))return!1},this);i.onShow=function(){i._.panel.getHolderElement().getParent().addClass("cke cke_reset_all")};i.onHide=CKEDITOR.tools.bind(function(){this._.onHide&&this._.onHide()},this);f=i.addBlock(this.id,this._.panelDefinition.block);f.autoSize=!0;var d=f.keys;d[40]="next";d[9]="next";d[38]="prev";d[CKEDITOR.SHIFT+9]="prev";d["rtl"==j.lang.dir?37:39]=CKEDITOR.env.ie?"mouseup":"click";d[32]=CKEDITOR.env.ie?"mouseup":"click";CKEDITOR.env.ie&&(d[13]="mouseup");f=this._.element=
f.element;d=f.getDocument();d.getBody().setStyle("overflow","hidden");d.getElementsByTag("html").getItem(0).setStyle("overflow","hidden");this._.itemOverFn=CKEDITOR.tools.addFunction(function(a){clearTimeout(this._.showSubTimeout);this._.showSubTimeout=CKEDITOR.tools.setTimeout(this._.showSubMenu,j.config.menu_subMenuDelay||400,this,[a])},this);this._.itemOutFn=CKEDITOR.tools.addFunction(function(){clearTimeout(this._.showSubTimeout)},this);this._.itemClickFn=CKEDITOR.tools.addFunction(function(a){var b=
this.items[a];if(b.state==CKEDITOR.TRISTATE_DISABLED)this.hide(1);else if(b.getItems)this._.showSubMenu(a);else this._.onClick(b)},this)}g(e);for(var d=j.elementPath(),d=['<div class="cke_menu'+(d&&d.direction()!=j.lang.dir?" cke_mixed_dir_content":"")+'" role="presentation">'],h=e.length,m=h&&e[0].group,l=0;l<h;l++){var n=e[l];m!=n.group&&(d.push('<div class="cke_menuseparator" role="separator"></div>'),m=n.group);n.render(this,l,d)}d.push("</div>");f.setHtml(d.join(""));CKEDITOR.ui.fire("ready",
this);this.parent?this.parent._.panel.showAsChild(i,this.id,a,b,c,k):i.showBlock(this.id,a,b,c,k);j.fire("menuShow",[i])},addListener:function(a){this._.listeners.push(a)},hide:function(a){this._.onHide&&this._.onHide();this._.panel&&this._.panel.hide(a)}}});CKEDITOR.menuItem=CKEDITOR.tools.createClass({$:function(a,b,c){CKEDITOR.tools.extend(this,c,{order:0,className:"cke_menubutton__"+b});this.group=a._.menuGroups[this.group];this.editor=a;this.name=b},proto:{render:function(a,b,c){var h=a.id+(""+
b),e="undefined"==typeof this.state?CKEDITOR.TRISTATE_OFF:this.state,j="",i=e==CKEDITOR.TRISTATE_ON?"on":e==CKEDITOR.TRISTATE_DISABLED?"disabled":"off";this.role in{menuitemcheckbox:1,menuitemradio:1}&&(j=' aria-checked="'+(e==CKEDITOR.TRISTATE_ON?"true":"false")+'"');var f=this.getItems,d="&#"+("rtl"==this.editor.lang.dir?"9668":"9658")+";",g=this.name;this.icon&&!/\./.test(this.icon)&&(g=this.icon);a={id:h,name:this.name,iconName:g,label:this.label,cls:this.className||"",state:i,hasPopup:f?"true":
"false",disabled:e==CKEDITOR.TRISTATE_DISABLED,title:this.label,href:"javascript:void('"+(this.label||"").replace("'")+"')",hoverFn:a._.itemOverFn,moveOutFn:a._.itemOutFn,clickFn:a._.itemClickFn,index:b,iconStyle:CKEDITOR.skin.getIconStyle(g,"rtl"==this.editor.lang.dir,g==this.icon?null:this.icon,this.iconOffset),arrowHtml:f?l.output({label:d}):"",role:this.role?this.role:"menuitem",ariaChecked:j};m.output(a,c)}}})})();CKEDITOR.config.menu_groups="clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div";CKEDITOR.plugins.add("contextmenu",{requires:"menu",onLoad:function(){CKEDITOR.plugins.contextMenu=CKEDITOR.tools.createClass({base:CKEDITOR.menu,$:function(a){this.base.call(this,a,{panel:{className:"cke_menu_panel",attributes:{"aria-label":a.lang.contextmenu.options}}})},proto:{addTarget:function(a,e){a.on("contextmenu",function(a){var a=a.data,c=CKEDITOR.env.webkit?f:CKEDITOR.env.mac?a.$.metaKey:a.$.ctrlKey;if(!e||!c){a.preventDefault();if(CKEDITOR.env.mac&&CKEDITOR.env.webkit){var c=this.editor,
b=(new CKEDITOR.dom.elementPath(a.getTarget(),c.editable())).contains(function(a){return a.hasAttribute("contenteditable")},!0);b&&"false"==b.getAttribute("contenteditable")&&c.getSelection().fake(b)}var b=a.getTarget().getDocument(),d=a.getTarget().getDocument().getDocumentElement(),c=!b.equals(CKEDITOR.document),b=b.getWindow().getScrollPosition(),g=c?a.$.clientX:a.$.pageX||b.x+a.$.clientX,h=c?a.$.clientY:a.$.pageY||b.y+a.$.clientY;CKEDITOR.tools.setTimeout(function(){this.open(d,null,g,h)},CKEDITOR.env.ie?
200:0,this)}},this);if(CKEDITOR.env.webkit){var f,d=function(){f=0};a.on("keydown",function(a){f=CKEDITOR.env.mac?a.data.$.metaKey:a.data.$.ctrlKey});a.on("keyup",d);a.on("contextmenu",d)}},open:function(a,e,f,d){this.editor.focus();a=a||CKEDITOR.document.getDocumentElement();this.editor.selectionChange(1);this.show(a,e,f,d)}}})},beforeInit:function(a){var e=a.contextMenu=new CKEDITOR.plugins.contextMenu(a);a.on("contentDom",function(){e.addTarget(a.editable(),!1!==a.config.browserContextMenuOnCtrl)});
a.addCommand("contextMenu",{exec:function(){a.contextMenu.open(a.document.getBody())}});a.setKeystroke(CKEDITOR.SHIFT+121,"contextMenu");a.setKeystroke(CKEDITOR.CTRL+CKEDITOR.SHIFT+121,"contextMenu")}});(function(){CKEDITOR.plugins.add("div",{requires:"dialog",init:function(a){if(!a.blockless){var c=a.lang.div,b="div(*)";CKEDITOR.dialog.isTabEnabled(a,"editdiv","advanced")&&(b+=";div[dir,id,lang,title]{*}");a.addCommand("creatediv",new CKEDITOR.dialogCommand("creatediv",{allowedContent:b,requiredContent:"div",contextSensitive:!0,refresh:function(a,c){this.setState("div"in(a.config.div_wrapTable?c.root:c.blockLimit).getDtd()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}}));a.addCommand("editdiv",
new CKEDITOR.dialogCommand("editdiv",{requiredContent:"div"}));a.addCommand("removediv",{requiredContent:"div",exec:function(a){function c(b){if((b=CKEDITOR.plugins.div.getSurroundDiv(a,b))&&!b.data("cke-div-added"))f.push(b),b.data("cke-div-added")}for(var b=a.getSelection(),g=b&&b.getRanges(),e,h=b.createBookmarks(),f=[],d=0;d<g.length;d++)e=g[d],e.collapsed?c(b.getStartElement()):(e=new CKEDITOR.dom.walker(e),e.evaluator=c,e.lastForward());for(d=0;d<f.length;d++)f[d].remove(!0);b.selectBookmarks(h)}});
a.ui.addButton&&a.ui.addButton("CreateDiv",{label:c.toolbar,command:"creatediv",toolbar:"blocks,50"});a.addMenuItems&&(a.addMenuItems({editdiv:{label:c.edit,command:"editdiv",group:"div",order:1},removediv:{label:c.remove,command:"removediv",group:"div",order:5}}),a.contextMenu&&a.contextMenu.addListener(function(b){return!b||b.isReadOnly()?null:CKEDITOR.plugins.div.getSurroundDiv(a)?{editdiv:CKEDITOR.TRISTATE_OFF,removediv:CKEDITOR.TRISTATE_OFF}:null}));CKEDITOR.dialog.add("creatediv",this.path+
"dialogs/div.js");CKEDITOR.dialog.add("editdiv",this.path+"dialogs/div.js")}}});CKEDITOR.plugins.div={getSurroundDiv:function(a,c){var b=a.elementPath(c);return a.elementPath(b.blockLimit).contains(function(a){return a.is("div")&&!a.isReadOnly()},1)}}})();CKEDITOR.plugins.add("resize",{init:function(b){var f,g,n,o,a=b.config,q=b.ui.spaceId("resizer"),h=b.element?b.element.getDirection(1):"ltr";!a.resize_dir&&(a.resize_dir="vertical");void 0==a.resize_maxWidth&&(a.resize_maxWidth=3E3);void 0==a.resize_maxHeight&&(a.resize_maxHeight=3E3);void 0==a.resize_minWidth&&(a.resize_minWidth=750);void 0==a.resize_minHeight&&(a.resize_minHeight=250);if(!1!==a.resize_enabled){var c=null,i=("both"==a.resize_dir||"horizontal"==a.resize_dir)&&a.resize_minWidth!=a.resize_maxWidth,
l=("both"==a.resize_dir||"vertical"==a.resize_dir)&&a.resize_minHeight!=a.resize_maxHeight,j=function(d){var e=f,m=g,c=e+(d.data.$.screenX-n)*("rtl"==h?-1:1),d=m+(d.data.$.screenY-o);i&&(e=Math.max(a.resize_minWidth,Math.min(c,a.resize_maxWidth)));l&&(m=Math.max(a.resize_minHeight,Math.min(d,a.resize_maxHeight)));b.resize(i?e:null,m)},k=function(){CKEDITOR.document.removeListener("mousemove",j);CKEDITOR.document.removeListener("mouseup",k);b.document&&(b.document.removeListener("mousemove",j),b.document.removeListener("mouseup",
k))},p=CKEDITOR.tools.addFunction(function(d){c||(c=b.getResizable());f=c.$.offsetWidth||0;g=c.$.offsetHeight||0;n=d.screenX;o=d.screenY;a.resize_minWidth>f&&(a.resize_minWidth=f);a.resize_minHeight>g&&(a.resize_minHeight=g);CKEDITOR.document.on("mousemove",j);CKEDITOR.document.on("mouseup",k);b.document&&(b.document.on("mousemove",j),b.document.on("mouseup",k));d.preventDefault&&d.preventDefault()});b.on("destroy",function(){CKEDITOR.tools.removeFunction(p)});b.on("uiSpace",function(a){if("bottom"==
a.data.space){var e="";i&&!l&&(e=" cke_resizer_horizontal");!i&&l&&(e=" cke_resizer_vertical");var c='<span id="'+q+'" class="cke_resizer'+e+" cke_resizer_"+h+'" title="'+CKEDITOR.tools.htmlEncode(b.lang.common.resize)+'" onmousedown="CKEDITOR.tools.callFunction('+p+', event)">'+("ltr"==h?"◢":"◣")+"</span>";"ltr"==h&&"ltr"==e?a.data.html+=c:a.data.html=c+a.data.html}},b,null,100);b.on("maximize",function(a){b.ui.space("resizer")[a.data==CKEDITOR.TRISTATE_ON?"hide":"show"]()})}}});(function(){function w(a){function d(){for(var b=g(),e=CKEDITOR.tools.clone(a.config.toolbarGroups)||n(a),f=0;f<e.length;f++){var k=e[f];if("/"!=k){"string"==typeof k&&(k=e[f]={name:k});var i,d=k.groups;if(d)for(var h=0;h<d.length;h++)i=d[h],(i=b[i])&&c(k,i);(i=b[k.name])&&c(k,i)}}return e}function g(){var b={},c,f,e;for(c in a.ui.items)f=a.ui.items[c],e=f.toolbar||"others",e=e.split(","),f=e[0],e=parseInt(e[1]||-1,10),b[f]||(b[f]=[]),b[f].push({name:c,order:e});for(f in b)b[f]=b[f].sort(function(b,
a){return b.order==a.order?0:0>a.order?-1:0>b.order?1:b.order<a.order?-1:1});return b}function c(c,e){if(e.length){c.items?c.items.push(a.ui.create("-")):c.items=[];for(var f;f=e.shift();)if(f="string"==typeof f?f:f.name,!b||-1==CKEDITOR.tools.indexOf(b,f))(f=a.ui.create(f))&&a.addFeature(f)&&c.items.push(f)}}function h(b){var a=[],e,d,h;for(e=0;e<b.length;++e)d=b[e],h={},"/"==d?a.push(d):CKEDITOR.tools.isArray(d)?(c(h,CKEDITOR.tools.clone(d)),a.push(h)):d.items&&(c(h,CKEDITOR.tools.clone(d.items)),
h.name=d.name,a.push(h));return a}var b=a.config.removeButtons,b=b&&b.split(","),e=a.config.toolbar;"string"==typeof e&&(e=a.config["toolbar_"+e]);return a.toolbar=e?h(e):d()}function n(a){return a._.toolbarGroups||(a._.toolbarGroups=[{name:"document",groups:["mode","document","doctools"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"editing",groups:["find","selection","spellchecker"]},{name:"forms"},"/",{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list",
"indent","blocks","align","bidi"]},{name:"links"},{name:"insert"},"/",{name:"styles"},{name:"colors"},{name:"tools"},{name:"others"},{name:"about"}])}var u=function(){this.toolbars=[];this.focusCommandExecuted=!1};u.prototype.focus=function(){for(var a=0,d;d=this.toolbars[a++];)for(var g=0,c;c=d.items[g++];)if(c.focus){c.focus();return}};var x={modes:{wysiwyg:1,source:1},readOnly:1,exec:function(a){a.toolbox&&(a.toolbox.focusCommandExecuted=!0,CKEDITOR.env.ie||CKEDITOR.env.air?setTimeout(function(){a.toolbox.focus()},
100):a.toolbox.focus())}};CKEDITOR.plugins.add("toolbar",{requires:"button",init:function(a){var d,g=function(c,h){var b,e="rtl"==a.lang.dir,j=a.config.toolbarGroupCycling,o=e?37:39,e=e?39:37,j=void 0===j||j;switch(h){case 9:case CKEDITOR.SHIFT+9:for(;!b||!b.items.length;)if(b=9==h?(b?b.next:c.toolbar.next)||a.toolbox.toolbars[0]:(b?b.previous:c.toolbar.previous)||a.toolbox.toolbars[a.toolbox.toolbars.length-1],b.items.length)for(c=b.items[d?b.items.length-1:0];c&&!c.focus;)(c=d?c.previous:c.next)||
(b=0);c&&c.focus();return!1;case o:b=c;do b=b.next,!b&&j&&(b=c.toolbar.items[0]);while(b&&!b.focus);b?b.focus():g(c,9);return!1;case 40:return c.button&&c.button.hasArrow?(a.once("panelShow",function(b){b.data._.panel._.currentBlock.onKeyDown(40)}),c.execute()):g(c,40==h?o:e),!1;case e:case 38:b=c;do b=b.previous,!b&&j&&(b=c.toolbar.items[c.toolbar.items.length-1]);while(b&&!b.focus);b?b.focus():(d=1,g(c,CKEDITOR.SHIFT+9),d=0);return!1;case 27:return a.focus(),!1;case 13:case 32:return c.execute(),
!1}return!0};a.on("uiSpace",function(c){if(c.data.space==a.config.toolbarLocation){c.removeListener();a.toolbox=new u;var d=CKEDITOR.tools.getNextId(),b=['<span id="',d,'" class="cke_voice_label">',a.lang.toolbar.toolbars,"</span>",'<span id="'+a.ui.spaceId("toolbox")+'" class="cke_toolbox" role="group" aria-labelledby="',d,'" onmousedown="return false;">'],d=!1!==a.config.toolbarStartupExpanded,e,j;a.config.toolbarCanCollapse&&a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&b.push('<span class="cke_toolbox_main"'+
(d?">":' style="display:none">'));for(var o=a.toolbox.toolbars,f=w(a),k=0;k<f.length;k++){var i,l=0,r,m=f[k],s;if(m)if(e&&(b.push("</span>"),j=e=0),"/"===m)b.push('<span class="cke_toolbar_break"></span>');else{s=m.items||m;for(var t=0;t<s.length;t++){var p=s[t],n;if(p)if(p.type==CKEDITOR.UI_SEPARATOR)j=e&&p;else{n=!1!==p.canGroup;if(!l){i=CKEDITOR.tools.getNextId();l={id:i,items:[]};r=m.name&&(a.lang.toolbar.toolbarGroups[m.name]||m.name);b.push('<span id="',i,'" class="cke_toolbar"',r?' aria-labelledby="'+
i+'_label"':"",' role="toolbar">');r&&b.push('<span id="',i,'_label" class="cke_voice_label">',r,"</span>");b.push('<span class="cke_toolbar_start"></span>');var q=o.push(l)-1;0<q&&(l.previous=o[q-1],l.previous.next=l)}n?e||(b.push('<span class="cke_toolgroup" role="presentation">'),e=1):e&&(b.push("</span>"),e=0);i=function(c){c=c.render(a,b);q=l.items.push(c)-1;if(q>0){c.previous=l.items[q-1];c.previous.next=c}c.toolbar=l;c.onkey=g;c.onfocus=function(){a.toolbox.focusCommandExecuted||a.focus()}};
j&&(i(j),j=0);i(p)}}e&&(b.push("</span>"),j=e=0);l&&b.push('<span class="cke_toolbar_end"></span></span>')}}a.config.toolbarCanCollapse&&b.push("</span>");if(a.config.toolbarCanCollapse&&a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var v=CKEDITOR.tools.addFunction(function(){a.execCommand("toolbarCollapse")});a.on("destroy",function(){CKEDITOR.tools.removeFunction(v)});a.addCommand("toolbarCollapse",{readOnly:1,exec:function(b){var a=b.ui.space("toolbar_collapser"),c=a.getPrevious(),e=b.ui.space("contents"),
d=c.getParent(),f=parseInt(e.$.style.height,10),h=d.$.offsetHeight,g=a.hasClass("cke_toolbox_collapser_min");g?(c.show(),a.removeClass("cke_toolbox_collapser_min"),a.setAttribute("title",b.lang.toolbar.toolbarCollapse)):(c.hide(),a.addClass("cke_toolbox_collapser_min"),a.setAttribute("title",b.lang.toolbar.toolbarExpand));a.getFirst().setText(g?"▲":"◀");e.setStyle("height",f-(d.$.offsetHeight-h)+"px");b.fire("resize")},modes:{wysiwyg:1,source:1}});a.setKeystroke(CKEDITOR.ALT+(CKEDITOR.env.ie||CKEDITOR.env.webkit?
189:109),"toolbarCollapse");b.push('<a title="'+(d?a.lang.toolbar.toolbarCollapse:a.lang.toolbar.toolbarExpand)+'" id="'+a.ui.spaceId("toolbar_collapser")+'" tabIndex="-1" class="cke_toolbox_collapser');d||b.push(" cke_toolbox_collapser_min");b.push('" onclick="CKEDITOR.tools.callFunction('+v+')">','<span class="cke_arrow">&#9650;</span>',"</a>")}b.push("</span>");c.data.html+=b.join("")}});a.on("destroy",function(){if(this.toolbox){var a,d=0,b,e,g;for(a=this.toolbox.toolbars;d<a.length;d++){e=a[d].items;
for(b=0;b<e.length;b++)g=e[b],g.clickFn&&CKEDITOR.tools.removeFunction(g.clickFn),g.keyDownFn&&CKEDITOR.tools.removeFunction(g.keyDownFn)}}});a.on("uiReady",function(){var c=a.ui.space("toolbox");c&&a.focusManager.add(c,1)});a.addCommand("toolbarFocus",x);a.setKeystroke(CKEDITOR.ALT+121,"toolbarFocus");a.ui.add("-",CKEDITOR.UI_SEPARATOR,{});a.ui.addHandler(CKEDITOR.UI_SEPARATOR,{create:function(){return{render:function(a,d){d.push('<span class="cke_toolbar_separator" role="separator"></span>');return{}}}}})}});
CKEDITOR.ui.prototype.addToolbarGroup=function(a,d,g){var c=n(this.editor),h=0===d,b={name:a};if(g){if(g=CKEDITOR.tools.search(c,function(a){return a.name==g})){!g.groups&&(g.groups=[]);if(d&&(d=CKEDITOR.tools.indexOf(g.groups,d),0<=d)){g.groups.splice(d+1,0,a);return}h?g.groups.splice(0,0,a):g.groups.push(a);return}d=null}d&&(d=CKEDITOR.tools.indexOf(c,function(a){return a.name==d}));h?c.splice(0,0,a):"number"==typeof d?c.splice(d+1,0,b):c.push(a)}})();CKEDITOR.UI_SEPARATOR="separator";
CKEDITOR.config.toolbarLocation="top";(function(){var k;function n(a,c){function j(d){d=i.list[d];if(d.equals(a.editable())||"true"==d.getAttribute("contenteditable")){var e=a.createRange();e.selectNodeContents(d);e.select()}else a.getSelection().selectElement(d);a.focus()}function s(){l&&l.setHtml(o);delete i.list}var m=a.ui.spaceId("path"),l,i=a._.elementsPath,n=i.idBase;c.html+='<span id="'+m+'_label" class="cke_voice_label">'+a.lang.elementspath.eleLabel+'</span><span id="'+m+'" class="cke_path" role="group" aria-labelledby="'+m+
'_label">'+o+"</span>";a.on("uiReady",function(){var d=a.ui.space("path");d&&a.focusManager.add(d,1)});i.onClick=j;var t=CKEDITOR.tools.addFunction(j),u=CKEDITOR.tools.addFunction(function(d,e){var g=i.idBase,b,e=new CKEDITOR.dom.event(e);b="rtl"==a.lang.dir;switch(e.getKeystroke()){case b?39:37:case 9:return(b=CKEDITOR.document.getById(g+(d+1)))||(b=CKEDITOR.document.getById(g+"0")),b.focus(),!1;case b?37:39:case CKEDITOR.SHIFT+9:return(b=CKEDITOR.document.getById(g+(d-1)))||(b=CKEDITOR.document.getById(g+
(i.list.length-1))),b.focus(),!1;case 27:return a.focus(),!1;case 13:case 32:return j(d),!1}return!0});a.on("selectionChange",function(){a.editable();for(var d=[],e=i.list=[],g=[],b=i.filters,c=!0,j=a.elementPath().elements,f,k=j.length;k--;){var h=j[k],p=0;f=h.data("cke-display-name")?h.data("cke-display-name"):h.data("cke-real-element-type")?h.data("cke-real-element-type"):h.getName();c=h.hasAttribute("contenteditable")?"true"==h.getAttribute("contenteditable"):c;!c&&!h.hasAttribute("contenteditable")&&
(p=1);for(var q=0;q<b.length;q++){var r=b[q](h,f);if(!1===r){p=1;break}f=r||f}p||(e.unshift(h),g.unshift(f))}e=e.length;for(b=0;b<e;b++)f=g[b],c=a.lang.elementspath.eleTitle.replace(/%1/,f),f=v.output({id:n+b,label:c,text:f,jsTitle:"javascript:void('"+f+"')",index:b,keyDownFn:u,clickFn:t}),d.unshift(f);l||(l=CKEDITOR.document.getById(m));g=l;g.setHtml(d.join("")+o);a.fire("elementsPathUpdate",{space:g})});a.on("readOnly",s);a.on("contentDomUnload",s);a.addCommand("elementsPathFocus",k);a.setKeystroke(CKEDITOR.ALT+
122,"elementsPathFocus")}k={editorFocus:!1,readOnly:1,exec:function(a){(a=CKEDITOR.document.getById(a._.elementsPath.idBase+"0"))&&a.focus(CKEDITOR.env.ie||CKEDITOR.env.air)}};var o='<span class="cke_path_empty">&nbsp;</span>',c="";CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(c+=' onkeypress="return false;"');CKEDITOR.env.gecko&&(c+=' onblur="this.style.cssText = this.style.cssText;"');var v=CKEDITOR.addTemplate("pathItem",'<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"'+
c+' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');CKEDITOR.plugins.add("elementspath",{init:function(a){a._.elementsPath={idBase:"cke_elementspath_"+CKEDITOR.tools.getNextNumber()+"_",filters:[]};a.on("uiSpace",function(c){"bottom"==c.data.space&&n(a,c.data)})}})})();(function(){function m(b,d,a){a=b.config.forceEnterMode||a;"wysiwyg"==b.mode&&(d||(d=b.activeEnterMode),b.elementPath().isContextFor("p")||(d=CKEDITOR.ENTER_BR,a=1),b.fire("saveSnapshot"),d==CKEDITOR.ENTER_BR?p(b,d,null,a):q(b,d,null,a),b.fire("saveSnapshot"))}function r(b){for(var b=b.getSelection().getRanges(!0),d=b.length-1;0<d;d--)b[d].deleteContents();return b[0]}function u(b){var d=b.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"true"==a.getAttribute("contenteditable")},
!0);if(b.root.equals(d))return b;d=new CKEDITOR.dom.range(d);d.moveToRange(b);return d}CKEDITOR.plugins.add("enterkey",{init:function(b){b.addCommand("enter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){m(b)}});b.addCommand("shiftEnter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){m(b,b.activeShiftEnterMode,1)}});b.setKeystroke([[13,"enter"],[CKEDITOR.SHIFT+13,"shiftEnter"]])}});var v=CKEDITOR.dom.walker.whitespaces(),w=CKEDITOR.dom.walker.bookmark();CKEDITOR.plugins.enterkey={enterBlock:function(b,
d,a,h){if(a=a||r(b)){var a=u(a),f=a.document,i=a.checkStartOfBlock(),k=a.checkEndOfBlock(),j=b.elementPath(a.startContainer),c=j.block,l=d==CKEDITOR.ENTER_DIV?"div":"p",e;if(i&&k){if(c&&(c.is("li")||c.getParent().is("li"))){c.is("li")||(c=c.getParent());a=c.getParent();e=a.getParent();var h=!c.hasPrevious(),n=!c.hasNext(),l=b.getSelection(),g=l.createBookmarks(),i=c.getDirection(1),k=c.getAttribute("class"),o=c.getAttribute("style"),m=e.getDirection(1)!=i,b=b.enterMode!=CKEDITOR.ENTER_BR||m||o||k;
if(e.is("li"))if(h||n)c[h?"insertBefore":"insertAfter"](e);else c.breakParent(e);else{if(b)if(j.block.is("li")?(e=f.createElement(d==CKEDITOR.ENTER_P?"p":"div"),m&&e.setAttribute("dir",i),o&&e.setAttribute("style",o),k&&e.setAttribute("class",k),c.moveChildren(e)):e=j.block,h||n)e[h?"insertBefore":"insertAfter"](a);else c.breakParent(a),e.insertAfter(a);else if(c.appendBogus(!0),h||n)for(;f=c[h?"getFirst":"getLast"]();)f[h?"insertBefore":"insertAfter"](a);else for(c.breakParent(a);f=c.getLast();)f.insertAfter(a);
c.remove()}l.selectBookmarks(g);return}if(c&&c.getParent().is("blockquote")){c.breakParent(c.getParent());c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1))||c.getPrevious().remove();c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1))||c.getNext().remove();a.moveToElementEditStart(c);a.select();return}}else if(c&&c.is("pre")&&!k){p(b,d,a,h);return}if(i=a.splitBlock(l)){d=i.previousBlock;c=i.nextBlock;j=i.wasStartOfBlock;b=i.wasEndOfBlock;if(c)g=c.getParent(),g.is("li")&&(c.breakParent(g),
c.move(c.getNext(),1));else if(d&&(g=d.getParent())&&g.is("li"))d.breakParent(g),g=d.getNext(),a.moveToElementEditStart(g),d.move(d.getPrevious());if(!j&&!b)c.is("li")&&(e=a.clone(),e.selectNodeContents(c),e=new CKEDITOR.dom.walker(e),e.evaluator=function(a){return!(w(a)||v(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in CKEDITOR.dtd.$inline&&!(a.getName()in CKEDITOR.dtd.$empty))},(g=e.next())&&(g.type==CKEDITOR.NODE_ELEMENT&&g.is("ul","ol"))&&(CKEDITOR.env.needsBrFiller?f.createElement("br"):f.createText(" ")).insertBefore(g)),
c&&a.moveToElementEditStart(c);else{if(d){if(d.is("li")||!s.test(d.getName())&&!d.is("pre"))e=d.clone()}else c&&(e=c.clone());e?h&&!e.is("li")&&e.renameNode(l):g&&g.is("li")?e=g:(e=f.createElement(l),d&&(n=d.getDirection())&&e.setAttribute("dir",n));if(f=i.elementPath){h=0;for(l=f.elements.length;h<l;h++){g=f.elements[h];if(g.equals(f.block)||g.equals(f.blockLimit))break;CKEDITOR.dtd.$removeEmpty[g.getName()]&&(g=g.clone(),e.moveChildren(g),e.append(g))}}e.appendBogus();e.getParent()||a.insertNode(e);
e.is("li")&&e.removeAttribute("value");if(CKEDITOR.env.ie&&j&&(!b||!d.getChildCount()))a.moveToElementEditStart(b?d:e),a.select();a.moveToElementEditStart(j&&!b?c:e)}a.select();a.scrollIntoView()}}},enterBr:function(b,d,a,h){if(a=a||r(b)){var f=a.document,i=a.checkEndOfBlock(),k=new CKEDITOR.dom.elementPath(b.getSelection().getStartElement()),j=k.block,c=j&&k.block.getName();!h&&"li"==c?q(b,d,a,h):(!h&&i&&s.test(c)?(i=j.getDirection())?(f=f.createElement("div"),f.setAttribute("dir",i),f.insertAfter(j),
a.setStart(f,0)):(f.createElement("br").insertAfter(j),CKEDITOR.env.gecko&&f.createText("").insertAfter(j),a.setStartAt(j.getNext(),CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START)):(b="pre"==c&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?f.createText("\r"):f.createElement("br"),a.deleteContents(),a.insertNode(b),CKEDITOR.env.needsBrFiller?(f.createText("﻿").insertAfter(b),i&&(j||k.blockLimit).appendBogus(),b.getNext().$.nodeValue="",a.setStartAt(b.getNext(),CKEDITOR.POSITION_AFTER_START)):
a.setStartAt(b,CKEDITOR.POSITION_AFTER_END)),a.collapse(!0),a.select(),a.scrollIntoView())}}};var t=CKEDITOR.plugins.enterkey,p=t.enterBr,q=t.enterBlock,s=/^h[1-6]$/})();(function(){function j(a,b){var d={},e=[],f={nbsp:" ",shy:"­",gt:">",lt:"<",amp:"&",apos:"'",quot:'"'},a=a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g,function(a,h){var c=b?"&"+h+";":f[h];d[c]=b?f[h]:"&"+h+";";e.push(c);return""});if(!b&&a){var a=a.split(","),c=document.createElement("div"),g;c.innerHTML="&"+a.join(";&")+";";g=c.innerHTML;c=null;for(c=0;c<g.length;c++){var i=g.charAt(c);d[i]="&"+a[c]+";";e.push(i)}}d.regex=e.join(b?"|":"");return d}CKEDITOR.plugins.add("entities",{afterInit:function(a){var b=
a.config;if(a=(a=a.dataProcessor)&&a.htmlFilter){var d=[];!1!==b.basicEntities&&d.push("nbsp,gt,lt,amp");b.entities&&(d.length&&d.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
b.entities_latin&&d.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"),b.entities_greek&&d.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
b.entities_additional&&d.push(b.entities_additional));var e=j(d.join(",")),f=e.regex?"["+e.regex+"]":"a^";delete e.regex;b.entities&&b.entities_processNumerical&&(f="[^ -~]|"+f);var f=RegExp(f,"g"),c=function(a){return b.entities_processNumerical=="force"||!e[a]?"&#"+a.charCodeAt(0)+";":e[a]},g=j("nbsp,gt,lt,amp,shy",!0),i=RegExp(g.regex,"g"),k=function(a){return g[a]};a.addRules({text:function(a){return a.replace(i,k).replace(f,c)}},{applyToAll:!0,excludeNestedEditable:!0})}}})})();
CKEDITOR.config.basicEntities=!0;CKEDITOR.config.entities=!0;CKEDITOR.config.entities_latin=!0;CKEDITOR.config.entities_greek=!0;CKEDITOR.config.entities_additional="#39";CKEDITOR.plugins.add("popup");
CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{popup:function(e,a,b,d){a=a||"80%";b=b||"70%";"string"==typeof a&&(1<a.length&&"%"==a.substr(a.length-1,1))&&(a=parseInt(window.screen.width*parseInt(a,10)/100,10));"string"==typeof b&&(1<b.length&&"%"==b.substr(b.length-1,1))&&(b=parseInt(window.screen.height*parseInt(b,10)/100,10));640>a&&(a=640);420>b&&(b=420);var f=parseInt((window.screen.height-b)/2,10),g=parseInt((window.screen.width-a)/2,10),d=(d||"location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes")+",width="+
a+",height="+b+",top="+f+",left="+g,c=window.open("",null,d,!0);if(!c)return!1;try{-1==navigator.userAgent.toLowerCase().indexOf(" chrome/")&&(c.moveTo(g,f),c.resizeTo(a,b)),c.focus(),c.location.href=e}catch(h){window.open(e,null,d,!0)}return!0}});(function(){function g(a,c){var d=[];if(c)for(var b in c)d.push(b+"="+encodeURIComponent(c[b]));else return a;return a+(-1!=a.indexOf("?")?"&":"?")+d.join("&")}function i(a){a+="";return a.charAt(0).toUpperCase()+a.substr(1)}function k(){var a=this.getDialog(),c=a.getParentEditor();c._.filebrowserSe=this;var d=c.config["filebrowser"+i(a.getName())+"WindowWidth"]||c.config.filebrowserWindowWidth||"80%",a=c.config["filebrowser"+i(a.getName())+"WindowHeight"]||c.config.filebrowserWindowHeight||"70%",
b=this.filebrowser.params||{};b.CKEditor=c.name;b.CKEditorFuncNum=c._.filebrowserFn;b.langCode||(b.langCode=c.langCode);b=g(this.filebrowser.url,b);c.popup(b,d,a,c.config.filebrowserWindowFeatures||c.config.fileBrowserWindowFeatures)}function l(){var a=this.getDialog();a.getParentEditor()._.filebrowserSe=this;return!a.getContentElement(this["for"][0],this["for"][1]).getInputElement().$.value||!a.getContentElement(this["for"][0],this["for"][1]).getAction()?!1:!0}function m(a,c,d){var b=d.params||{};
b.CKEditor=a.name;b.CKEditorFuncNum=a._.filebrowserFn;b.langCode||(b.langCode=a.langCode);c.action=g(d.url,b);c.filebrowser=d}function j(a,c,d,b){if(b&&b.length)for(var e,g=b.length;g--;)if(e=b[g],("hbox"==e.type||"vbox"==e.type||"fieldset"==e.type)&&j(a,c,d,e.children),e.filebrowser)if("string"==typeof e.filebrowser&&(e.filebrowser={action:"fileButton"==e.type?"QuickUpload":"Browse",target:e.filebrowser}),"Browse"==e.filebrowser.action){var f=e.filebrowser.url;void 0===f&&(f=a.config["filebrowser"+
i(c)+"BrowseUrl"],void 0===f&&(f=a.config.filebrowserBrowseUrl));f&&(e.onClick=k,e.filebrowser.url=f,e.hidden=!1)}else if("QuickUpload"==e.filebrowser.action&&e["for"]&&(f=e.filebrowser.url,void 0===f&&(f=a.config["filebrowser"+i(c)+"UploadUrl"],void 0===f&&(f=a.config.filebrowserUploadUrl)),f)){var h=e.onClick;e.onClick=function(a){var b=a.sender;return h&&h.call(b,a)===false?false:l.call(b,a)};e.filebrowser.url=f;e.hidden=!1;m(a,d.getContents(e["for"][0]).get(e["for"][1]),e.filebrowser)}}function h(a,
c,d){if(-1!==d.indexOf(";")){for(var d=d.split(";"),b=0;b<d.length;b++)if(h(a,c,d[b]))return!0;return!1}return(a=a.getContents(c).get(d).filebrowser)&&a.url}function n(a,c){var d=this._.filebrowserSe.getDialog(),b=this._.filebrowserSe["for"],e=this._.filebrowserSe.filebrowser.onSelect;b&&d.getContentElement(b[0],b[1]).reset();if(!("function"==typeof c&&!1===c.call(this._.filebrowserSe))&&!(e&&!1===e.call(this._.filebrowserSe,a,c))&&("string"==typeof c&&c&&alert(c),a&&(b=this._.filebrowserSe,d=b.getDialog(),
b=b.filebrowser.target||null)))if(b=b.split(":"),e=d.getContentElement(b[0],b[1]))e.setValue(a),d.selectPage(b[0])}CKEDITOR.plugins.add("filebrowser",{requires:"popup",init:function(a){a._.filebrowserFn=CKEDITOR.tools.addFunction(n,a);a.on("destroy",function(){CKEDITOR.tools.removeFunction(this._.filebrowserFn)})}});CKEDITOR.on("dialogDefinition",function(a){if(a.editor.plugins.filebrowser)for(var c=a.data.definition,d,b=0;b<c.contents.length;++b)if(d=c.contents[b])j(a.editor,a.data.name,c,d.elements),
d.hidden&&d.filebrowser&&(d.hidden=!h(c,d.id,d.filebrowser))})})();CKEDITOR.plugins.add("find",{requires:"dialog",init:function(a){var b=a.addCommand("find",new CKEDITOR.dialogCommand("find"));b.canUndo=!1;b.readOnly=1;a.addCommand("replace",new CKEDITOR.dialogCommand("replace")).canUndo=!1;a.ui.addButton&&(a.ui.addButton("Find",{label:a.lang.find.find,command:"find",toolbar:"find,10"}),a.ui.addButton("Replace",{label:a.lang.find.replace,command:"replace",toolbar:"find,20"}));CKEDITOR.dialog.add("find",this.path+"dialogs/find.js");CKEDITOR.dialog.add("replace",this.path+
"dialogs/find.js")}});CKEDITOR.config.find_highlight={element:"span",styles:{"background-color":"#004",color:"#fff"}};(function(){function g(a,b){var c=j.exec(a),d=j.exec(b);if(c){if(!c[2]&&"px"==d[2])return d[1];if("px"==c[2]&&!d[2])return d[1]+"px"}return b}var i=CKEDITOR.htmlParser.cssStyle,h=CKEDITOR.tools.cssLength,j=/^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,k={elements:{$:function(a){var b=a.attributes;if((b=(b=(b=b&&b["data-cke-realelement"])&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b)))&&b.children[0])&&a.attributes["data-cke-resizable"]){var c=(new i(a)).rules,a=b.attributes,d=c.width,c=
c.height;d&&(a.width=g(a.width,d));c&&(a.height=g(a.height,c))}return b}}};CKEDITOR.plugins.add("fakeobjects",{init:function(a){a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}","fakeobjects")},afterInit:function(a){(a=(a=a.dataProcessor)&&a.htmlFilter)&&a.addRules(k,{applyToAll:!0})}});CKEDITOR.editor.prototype.createFakeElement=function(a,b,c,d){var e=this.lang.fakeobjects,e=e[c]||e.unknown,b={"class":b,"data-cke-realelement":encodeURIComponent(a.getOuterHtml()),"data-cke-real-node-type":a.type,
alt:e,title:e,align:a.getAttribute("align")||""};CKEDITOR.env.hc||(b.src=CKEDITOR.tools.transparentImageData);c&&(b["data-cke-real-element-type"]=c);d&&(b["data-cke-resizable"]=d,c=new i,d=a.getAttribute("width"),a=a.getAttribute("height"),d&&(c.rules.width=h(d)),a&&(c.rules.height=h(a)),c.populate(b));return this.document.createElement("img",{attributes:b})};CKEDITOR.editor.prototype.createFakeParserElement=function(a,b,c,d){var e=this.lang.fakeobjects,e=e[c]||e.unknown,f;f=new CKEDITOR.htmlParser.basicWriter;
a.writeHtml(f);f=f.getHtml();b={"class":b,"data-cke-realelement":encodeURIComponent(f),"data-cke-real-node-type":a.type,alt:e,title:e,align:a.attributes.align||""};CKEDITOR.env.hc||(b.src=CKEDITOR.tools.transparentImageData);c&&(b["data-cke-real-element-type"]=c);d&&(b["data-cke-resizable"]=d,d=a.attributes,a=new i,c=d.width,d=d.height,void 0!=c&&(a.rules.width=h(c)),void 0!=d&&(a.rules.height=h(d)),a.populate(b));return new CKEDITOR.htmlParser.element("img",b)};CKEDITOR.editor.prototype.restoreRealElement=
function(a){if(a.data("cke-real-node-type")!=CKEDITOR.NODE_ELEMENT)return null;var b=CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")),this.document);if(a.data("cke-resizable")){var c=a.getStyle("width"),a=a.getStyle("height");c&&b.setAttribute("width",g(b.getAttribute("width"),c));a&&b.setAttribute("height",g(b.getAttribute("height"),a))}return b}})();(function(){function d(a){a=a.attributes;return"application/x-shockwave-flash"==a.type||f.test(a.src||"")}function e(a,b){return a.createFakeParserElement(b,"cke_flash","flash",!0)}var f=/\.swf(?:$|\?)/i;CKEDITOR.plugins.add("flash",{requires:"dialog,fakeobjects",onLoad:function(){CKEDITOR.addCss("img.cke_flash{background-image: url("+CKEDITOR.getUrl(this.path+"images/placeholder.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")},
init:function(a){var b="object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";CKEDITOR.dialog.isTabEnabled(a,"flash","properties")&&(b+=";object[align]; embed[allowscriptaccess,quality,scale,wmode]");CKEDITOR.dialog.isTabEnabled(a,"flash","advanced")&&(b+=";object[id]{*}; embed[bgcolor]{*}(*)");a.addCommand("flash",new CKEDITOR.dialogCommand("flash",{allowedContent:b,requiredContent:"embed"}));a.ui.addButton&&a.ui.addButton("Flash",
{label:a.lang.common.flash,command:"flash",toolbar:"insert,20"});CKEDITOR.dialog.add("flash",this.path+"dialogs/flash.js");a.addMenuItems&&a.addMenuItems({flash:{label:a.lang.flash.properties,command:"flash",group:"flash"}});a.on("doubleclick",function(a){var b=a.data.element;b.is("img")&&"flash"==b.data("cke-real-element-type")&&(a.data.dialog="flash")});a.contextMenu&&a.contextMenu.addListener(function(a){if(a&&a.is("img")&&!a.isReadOnly()&&"flash"==a.data("cke-real-element-type"))return{flash:CKEDITOR.TRISTATE_OFF}})},
afterInit:function(a){var b=a.dataProcessor;(b=b&&b.dataFilter)&&b.addRules({elements:{"cke:object":function(b){var c=b.attributes;if((!c.classid||!(""+c.classid).toLowerCase())&&!d(b)){for(c=0;c<b.children.length;c++)if("cke:embed"==b.children[c].name){if(!d(b.children[c]))break;return e(a,b)}return null}return e(a,b)},"cke:embed":function(b){return!d(b)?null:e(a,b)}}},5)}})})();CKEDITOR.tools.extend(CKEDITOR.config,{flashEmbedTagOnly:!1,flashAddEmbedTag:!0,flashConvertOnEdit:!1});(function(){function i(a){var j=a.config,m=a.fire("uiSpace",{space:"top",html:""}).html,p=function(){function f(a,c,e){b.setStyle(c,s(e));b.setStyle("position",a)}function e(a){var b=i.getDocumentPosition();switch(a){case "top":f("absolute","top",b.y-n-o);break;case "pin":f("fixed","top",t);break;case "bottom":f("absolute","top",b.y+(c.height||c.bottom-c.top)+o)}k=a}var k,i,l,c,h,n,r,m=j.floatSpaceDockedOffsetX||0,o=j.floatSpaceDockedOffsetY||0,q=j.floatSpacePinnedOffsetX||0,t=j.floatSpacePinnedOffsetY||
0;return function(d){if(i=a.editable())if(d&&"focus"==d.name&&b.show(),b.removeStyle("left"),b.removeStyle("right"),l=b.getClientRect(),c=i.getClientRect(),h=g.getViewPaneSize(),n=l.height,r="pageXOffset"in g.$?g.$.pageXOffset:CKEDITOR.document.$.documentElement.scrollLeft,k){n+o<=c.top?e("top"):n+o>h.height-c.bottom?e("pin"):e("bottom");var d=h.width/2,d=0<c.left&&c.right<h.width&&c.width>l.width?"rtl"==a.config.contentsLangDirection?"right":"left":d-c.left>c.right-d?"left":"right",f;l.width>h.width?
(d="left",f=0):(f="left"==d?0<c.left?c.left:0:c.right<h.width?h.width-c.right:0,f+l.width>h.width&&(d="left"==d?"right":"left",f=0));b.setStyle(d,s(("pin"==k?q:m)+f+("pin"==k?0:"left"==d?r:-r)))}else k="pin",e("pin"),p(d)}}();if(m){var i=new CKEDITOR.template('<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} '+CKEDITOR.env.cssClass+'" dir="{langDir}" title="'+(CKEDITOR.env.gecko?" ":"")+'" lang="{langCode}" role="application" style="{style}"'+
(a.title?' aria-labelledby="cke_{name}_arialbl"':" ")+">"+(a.title?'<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>':" ")+'<div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'),b=CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(i.output({content:m,id:a.id,langDir:a.lang.dir,langCode:a.langCode,name:a.name,style:"display:none;z-index:"+(j.baseFloatZIndex-1),topId:a.ui.spaceId("top"),voiceLabel:a.title}))),
q=CKEDITOR.tools.eventsBuffer(500,p),e=CKEDITOR.tools.eventsBuffer(100,p);b.unselectable();b.on("mousedown",function(a){a=a.data;a.getTarget().hasAscendant("a",1)||a.preventDefault()});a.on("focus",function(b){p(b);a.on("change",q.input);g.on("scroll",e.input);g.on("resize",e.input)});a.on("blur",function(){b.hide();a.removeListener("change",q.input);g.removeListener("scroll",e.input);g.removeListener("resize",e.input)});a.on("destroy",function(){g.removeListener("scroll",e.input);g.removeListener("resize",
e.input);b.clearCustomData();b.remove()});a.focusManager.hasFocus&&b.show();a.focusManager.add(b,1)}}var g=CKEDITOR.document.getWindow(),s=CKEDITOR.tools.cssLength;CKEDITOR.plugins.add("floatingspace",{init:function(a){a.on("loaded",function(){i(this)},null,null,20)}})})();CKEDITOR.plugins.add("listblock",{requires:"panel",onLoad:function(){var f=CKEDITOR.addTemplate("panel-list",'<ul role="presentation" class="cke_panel_list">{items}</ul>'),g=CKEDITOR.addTemplate("panel-list-item",'<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'),h=CKEDITOR.addTemplate("panel-list-group",
'<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>'),i=/\'/g;CKEDITOR.ui.panel.prototype.addListBlock=function(a,b){return this.addBlock(a,new CKEDITOR.ui.listBlock(this.getHolderElement(),b))};CKEDITOR.ui.listBlock=CKEDITOR.tools.createClass({base:CKEDITOR.ui.panel.block,$:function(a,b){var b=b||{},c=b.attributes||(b.attributes={});(this.multiSelect=!!b.multiSelect)&&(c["aria-multiselectable"]=!0);!c.role&&(c.role="listbox");this.base.apply(this,arguments);this.element.setAttribute("role",
c.role);c=this.keys;c[40]="next";c[9]="next";c[38]="prev";c[CKEDITOR.SHIFT+9]="prev";c[32]=CKEDITOR.env.ie?"mouseup":"click";CKEDITOR.env.ie&&(c[13]="mouseup");this._.pendingHtml=[];this._.pendingList=[];this._.items={};this._.groups={}},_:{close:function(){if(this._.started){var a=f.output({items:this._.pendingList.join("")});this._.pendingList=[];this._.pendingHtml.push(a);delete this._.started}},getClick:function(){this._.click||(this._.click=CKEDITOR.tools.addFunction(function(a){var b=this.toggle(a);
if(this.onClick)this.onClick(a,b)},this));return this._.click}},proto:{add:function(a,b,c){var d=CKEDITOR.tools.getNextId();this._.started||(this._.started=1,this._.size=this._.size||0);this._.items[a]=d;var e;e=CKEDITOR.tools.htmlEncodeAttr(a).replace(i,"\\'");a={id:d,val:e,onclick:CKEDITOR.env.ie?'onclick="return false;" onmouseup':"onclick",clickFn:this._.getClick(),title:CKEDITOR.tools.htmlEncodeAttr(c||a),text:b||a};this._.pendingList.push(g.output(a))},startGroup:function(a){this._.close();
var b=CKEDITOR.tools.getNextId();this._.groups[a]=b;this._.pendingHtml.push(h.output({id:b,label:a}))},commit:function(){this._.close();this.element.appendHtml(this._.pendingHtml.join(""));delete this._.size;this._.pendingHtml=[]},toggle:function(a){var b=this.isMarked(a);b?this.unmark(a):this.mark(a);return!b},hideGroup:function(a){var b=(a=this.element.getDocument().getById(this._.groups[a]))&&a.getNext();a&&(a.setStyle("display","none"),b&&"ul"==b.getName()&&b.setStyle("display","none"))},hideItem:function(a){this.element.getDocument().getById(this._.items[a]).setStyle("display",
"none")},showAll:function(){var a=this._.items,b=this._.groups,c=this.element.getDocument(),d;for(d in a)c.getById(a[d]).setStyle("display","");for(var e in b)a=c.getById(b[e]),d=a.getNext(),a.setStyle("display",""),d&&"ul"==d.getName()&&d.setStyle("display","")},mark:function(a){this.multiSelect||this.unmarkAll();var a=this._.items[a],b=this.element.getDocument().getById(a);b.addClass("cke_selected");this.element.getDocument().getById(a+"_option").setAttribute("aria-selected",!0);this.onMark&&this.onMark(b)},
unmark:function(a){var b=this.element.getDocument(),a=this._.items[a],c=b.getById(a);c.removeClass("cke_selected");b.getById(a+"_option").removeAttribute("aria-selected");this.onUnmark&&this.onUnmark(c)},unmarkAll:function(){var a=this._.items,b=this.element.getDocument(),c;for(c in a){var d=a[c];b.getById(d).removeClass("cke_selected");b.getById(d+"_option").removeAttribute("aria-selected")}this.onUnmark&&this.onUnmark()},isMarked:function(a){return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")},
focus:function(a){this._.focusIndex=-1;var b=this.element.getElementsByTag("a"),c,d=-1;if(a)for(c=this.element.getDocument().getById(this._.items[a]).getFirst();a=b.getItem(++d);){if(a.equals(c)){this._.focusIndex=d;break}}else this.element.focus();c&&setTimeout(function(){c.focus()},0)}}})}});CKEDITOR.plugins.add("richcombo",{requires:"floatpanel,listblock,button",beforeInit:function(d){d.ui.addHandler(CKEDITOR.UI_RICHCOMBO,CKEDITOR.ui.richCombo.handler)}});
(function(){var d='<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" title="{title}" tabindex="-1"'+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href=\"javascript:void('{titleJs}')\"")+' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(d+=' onkeypress="return false;"');CKEDITOR.env.gecko&&(d+=' onblur="this.style.cssText = this.style.cssText;"');
var d=d+(' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" '+(CKEDITOR.env.ie?'onclick="return false;" onmouseup':"onclick")+'="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">'+(CKEDITOR.env.hc?"&#9660;":CKEDITOR.env.air?"&nbsp;":"")+"</span></span></a></span>"),
i=CKEDITOR.addTemplate("combo",d);CKEDITOR.UI_RICHCOMBO="richcombo";CKEDITOR.ui.richCombo=CKEDITOR.tools.createClass({$:function(a){CKEDITOR.tools.extend(this,a,{canGroup:!1,title:a.label,modes:{wysiwyg:1},editorFocus:1});a=this.panel||{};delete this.panel;this.id=CKEDITOR.tools.getNextNumber();this.document=a.parent&&a.parent.getDocument()||CKEDITOR.document;a.className="cke_combopanel";a.block={multiSelect:a.multiSelect,attributes:a.attributes};a.toolbarRelated=!0;this._={panelDefinition:a,items:{}}},
proto:{renderHtml:function(a){var b=[];this.render(a,b);return b.join("")},render:function(a,b){function g(){if(this.getState()!=CKEDITOR.TRISTATE_ON){var c=this.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;a.readOnly&&!this.readOnly&&(c=CKEDITOR.TRISTATE_DISABLED);this.setState(c);this.setValue("");c!=CKEDITOR.TRISTATE_DISABLED&&this.refresh&&this.refresh()}}var d=CKEDITOR.env,h="cke_"+this.id,e=CKEDITOR.tools.addFunction(function(b){j&&(a.unlockSelection(1),j=0);c.execute(b)},
this),f=this,c={id:h,combo:this,focus:function(){CKEDITOR.document.getById(h).getChild(1).focus()},execute:function(c){var b=f._;if(b.state!=CKEDITOR.TRISTATE_DISABLED)if(f.createPanel(a),b.on)b.panel.hide();else{f.commit();var d=f.getValue();d?b.list.mark(d):b.list.unmarkAll();b.panel.showBlock(f.id,new CKEDITOR.dom.element(c),4)}},clickFn:e};a.on("activeFilterChange",g,this);a.on("mode",g,this);a.on("selectionChange",g,this);!this.readOnly&&a.on("readOnly",g,this);var k=CKEDITOR.tools.addFunction(function(b,
d){var b=new CKEDITOR.dom.event(b),g=b.getKeystroke();if(40==g)a.once("panelShow",function(a){a.data._.panel._.currentBlock.onKeyDown(40)});switch(g){case 13:case 32:case 40:CKEDITOR.tools.callFunction(e,d);break;default:c.onkey(c,g)}b.preventDefault()}),l=CKEDITOR.tools.addFunction(function(){c.onfocus&&c.onfocus()}),j=0;c.keyDownFn=k;d={id:h,name:this.name||this.command,label:this.label,title:this.title,cls:this.className||"",titleJs:d.gecko&&!d.hc?"":(this.title||"").replace("'",""),keydownFn:k,
focusFn:l,clickFn:e};i.output(d,b);if(this.onRender)this.onRender();return c},createPanel:function(a){if(!this._.panel){var b=this._.panelDefinition,d=this._.panelDefinition.block,i=b.parent||CKEDITOR.document.getBody(),h="cke_combopanel__"+this.name,e=new CKEDITOR.ui.floatPanel(a,i,b),f=e.addListBlock(this.id,d),c=this;e.onShow=function(){this.element.addClass(h);c.setState(CKEDITOR.TRISTATE_ON);c._.on=1;c.editorFocus&&!a.focusManager.hasFocus&&a.focus();if(c.onOpen)c.onOpen();a.once("panelShow",
function(){f.focus(!f.multiSelect&&c.getValue())})};e.onHide=function(b){this.element.removeClass(h);c.setState(c.modes&&c.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);c._.on=0;if(!b&&c.onClose)c.onClose()};e.onEscape=function(){e.hide(1)};f.onClick=function(a,b){c.onClick&&c.onClick.call(c,a,b);e.hide()};this._.panel=e;this._.list=f;e.getBlock(this.id).onHide=function(){c._.on=0;c.setState(CKEDITOR.TRISTATE_OFF)};this.init&&this.init()}},setValue:function(a,b){this._.value=a;var d=
this.document.getById("cke_"+this.id+"_text");d&&(!a&&!b?(b=this.label,d.addClass("cke_combo_inlinelabel")):d.removeClass("cke_combo_inlinelabel"),d.setText("undefined"!=typeof b?b:a))},getValue:function(){return this._.value||""},unmarkAll:function(){this._.list.unmarkAll()},mark:function(a){this._.list.mark(a)},hideItem:function(a){this._.list.hideItem(a)},hideGroup:function(a){this._.list.hideGroup(a)},showAll:function(){this._.list.showAll()},add:function(a,b,d){this._.items[a]=d||a;this._.list.add(a,
b,d)},startGroup:function(a){this._.list.startGroup(a)},commit:function(){this._.committed||(this._.list.commit(),this._.committed=1,CKEDITOR.ui.fire("ready",this));this._.committed=1},setState:function(a){if(this._.state!=a){var b=this.document.getById("cke_"+this.id);b.setState(a,"cke_combo");a==CKEDITOR.TRISTATE_DISABLED?b.setAttribute("aria-disabled",!0):b.removeAttribute("aria-disabled");this._.state=a}},getState:function(){return this._.state},enable:function(){this._.state==CKEDITOR.TRISTATE_DISABLED&&
this.setState(this._.lastState)},disable:function(){this._.state!=CKEDITOR.TRISTATE_DISABLED&&(this._.lastState=this._.state,this.setState(CKEDITOR.TRISTATE_DISABLED))}},statics:{handler:{create:function(a){return new CKEDITOR.ui.richCombo(a)}}}});CKEDITOR.ui.prototype.addRichCombo=function(a,b){this.add(a,CKEDITOR.UI_RICHCOMBO,b)}})();(function(){function j(a,b,c,f,m,j,p,r){for(var s=a.config,n=new CKEDITOR.style(p),i=m.split(";"),m=[],k={},d=0;d<i.length;d++){var h=i[d];if(h){var h=h.split("/"),q={},l=i[d]=h[0];q[c]=m[d]=h[1]||l;k[l]=new CKEDITOR.style(p,q);k[l]._.definition.name=l}else i.splice(d--,1)}a.ui.addRichCombo(b,{label:f.label,title:f.panelTitle,toolbar:"styles,"+r,allowedContent:n,requiredContent:n,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(s.contentsCss),multiSelect:!1,attributes:{"aria-label":f.panelTitle}},
init:function(){this.startGroup(f.panelTitle);for(var a=0;a<i.length;a++){var b=i[a];this.add(b,k[b].buildPreview(),b)}},onClick:function(b){a.focus();a.fire("saveSnapshot");var c=this.getValue(),f=k[b];if(c&&b!=c){var i=k[c],e=a.getSelection().getRanges()[0];if(e.collapsed){var d=a.elementPath(),g=d.contains(function(a){return i.checkElementRemovable(a)});if(g){var h=e.checkBoundaryOfElement(g,CKEDITOR.START),j=e.checkBoundaryOfElement(g,CKEDITOR.END);if(h&&j){for(h=e.createBookmark();d=g.getFirst();)d.insertBefore(g);
g.remove();e.moveToBookmark(h)}else h?e.moveToPosition(g,CKEDITOR.POSITION_BEFORE_START):j?e.moveToPosition(g,CKEDITOR.POSITION_AFTER_END):(e.splitElement(g),e.moveToPosition(g,CKEDITOR.POSITION_AFTER_END),o(e,d.elements.slice(),g));a.getSelection().selectRanges([e])}}else a.removeStyle(i)}a[c==b?"removeStyle":"applyStyle"](f);a.fire("saveSnapshot")},onRender:function(){a.on("selectionChange",function(b){for(var c=this.getValue(),b=b.data.path.elements,d=0,f;d<b.length;d++){f=b[d];for(var e in k)if(k[e].checkElementMatch(f,
!0,a)){e!=c&&this.setValue(e);return}}this.setValue("",j)},this)},refresh:function(){a.activeFilter.check(n)||this.setState(CKEDITOR.TRISTATE_DISABLED)}})}function o(a,b,c){var f=b.pop();if(f){if(c)return o(a,b,f.equals(c)?null:c);c=f.clone();a.insertNode(c);a.moveToPosition(c,CKEDITOR.POSITION_AFTER_START);o(a,b)}}CKEDITOR.plugins.add("font",{requires:"richcombo",init:function(a){var b=a.config;j(a,"Font","family",a.lang.font,b.font_names,b.font_defaultLabel,b.font_style,30);j(a,"FontSize","size",
a.lang.font.fontSize,b.fontSize_sizes,b.fontSize_defaultLabel,b.fontSize_style,40)}})})();CKEDITOR.config.font_names="Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif";
CKEDITOR.config.font_defaultLabel="";CKEDITOR.config.font_style={element:"span",styles:{"font-family":"#(family)"},overrides:[{element:"font",attributes:{face:null}}]};CKEDITOR.config.fontSize_sizes="8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px";CKEDITOR.config.fontSize_defaultLabel="";CKEDITOR.config.fontSize_style={element:"span",styles:{"font-size":"#(size)"},overrides:[{element:"font",attributes:{size:null}}]};CKEDITOR.plugins.add("forms",{requires:"dialog,fakeobjects",onLoad:function(){CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");CKEDITOR.addCss("img.cke_hidden{background-image: url("+CKEDITOR.getUrl(this.path+"images/hiddenfield.gif")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}")},init:function(a){var b=a.lang,g=0,h={email:1,password:1,search:1,tel:1,text:1,url:1},j={checkbox:"input[type,name,checked]",
radio:"input[type,name,checked]",textfield:"input[type,name,value,size,maxlength]",textarea:"textarea[cols,rows,name]",select:"select[name,size,multiple]; option[value,selected]",button:"input[type,name,value]",form:"form[action,name,id,enctype,target,method]",hiddenfield:"input[type,name,value]",imagebutton:"input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"},k={checkbox:"input",radio:"input",textfield:"input",textarea:"textarea",select:"select",button:"input",form:"form",
hiddenfield:"input",imagebutton:"input"},e=function(d,c,e){var h={allowedContent:j[c],requiredContent:k[c]};"form"==c&&(h.context="form");a.addCommand(c,new CKEDITOR.dialogCommand(c,h));a.ui.addButton&&a.ui.addButton(d,{label:b.common[d.charAt(0).toLowerCase()+d.slice(1)],command:c,toolbar:"forms,"+(g+=10)});CKEDITOR.dialog.add(c,e)},f=this.path+"dialogs/";!a.blockless&&e("Form","form",f+"form.js");e("Checkbox","checkbox",f+"checkbox.js");e("Radio","radio",f+"radio.js");e("TextField","textfield",
f+"textfield.js");e("Textarea","textarea",f+"textarea.js");e("Select","select",f+"select.js");e("Button","button",f+"button.js");var i=a.plugins.image;i&&!a.plugins.image2&&e("ImageButton","imagebutton",CKEDITOR.plugins.getPath("image")+"dialogs/image.js");e("HiddenField","hiddenfield",f+"hiddenfield.js");a.addMenuItems&&(e={checkbox:{label:b.forms.checkboxAndRadio.checkboxTitle,command:"checkbox",group:"checkbox"},radio:{label:b.forms.checkboxAndRadio.radioTitle,command:"radio",group:"radio"},textfield:{label:b.forms.textfield.title,
command:"textfield",group:"textfield"},hiddenfield:{label:b.forms.hidden.title,command:"hiddenfield",group:"hiddenfield"},button:{label:b.forms.button.title,command:"button",group:"button"},select:{label:b.forms.select.title,command:"select",group:"select"},textarea:{label:b.forms.textarea.title,command:"textarea",group:"textarea"}},i&&(e.imagebutton={label:b.image.titleButton,command:"imagebutton",group:"imagebutton"}),!a.blockless&&(e.form={label:b.forms.form.menu,command:"form",group:"form"}),
a.addMenuItems(e));a.contextMenu&&(!a.blockless&&a.contextMenu.addListener(function(d,c,a){if((d=a.contains("form",1))&&!d.isReadOnly())return{form:CKEDITOR.TRISTATE_OFF}}),a.contextMenu.addListener(function(d){if(d&&!d.isReadOnly()){var c=d.getName();if(c=="select")return{select:CKEDITOR.TRISTATE_OFF};if(c=="textarea")return{textarea:CKEDITOR.TRISTATE_OFF};if(c=="input"){var a=d.getAttribute("type")||"text";switch(a){case "button":case "submit":case "reset":return{button:CKEDITOR.TRISTATE_OFF};case "checkbox":return{checkbox:CKEDITOR.TRISTATE_OFF};
case "radio":return{radio:CKEDITOR.TRISTATE_OFF};case "image":return i?{imagebutton:CKEDITOR.TRISTATE_OFF}:null}if(h[a])return{textfield:CKEDITOR.TRISTATE_OFF}}if(c=="img"&&d.data("cke-real-element-type")=="hiddenfield")return{hiddenfield:CKEDITOR.TRISTATE_OFF}}}));a.on("doubleclick",function(d){var c=d.data.element;if(!a.blockless&&c.is("form"))d.data.dialog="form";else if(c.is("select"))d.data.dialog="select";else if(c.is("textarea"))d.data.dialog="textarea";else if(c.is("img")&&c.data("cke-real-element-type")==
"hiddenfield")d.data.dialog="hiddenfield";else if(c.is("input")){c=c.getAttribute("type")||"text";switch(c){case "button":case "submit":case "reset":d.data.dialog="button";break;case "checkbox":d.data.dialog="checkbox";break;case "radio":d.data.dialog="radio";break;case "image":d.data.dialog="imagebutton"}if(h[c])d.data.dialog="textfield"}})},afterInit:function(a){var b=a.dataProcessor,g=b&&b.htmlFilter,b=b&&b.dataFilter;CKEDITOR.env.ie&&g&&g.addRules({elements:{input:function(a){var a=a.attributes,
b=a.type;b||(a.type="text");("checkbox"==b||"radio"==b)&&"on"==a.value&&delete a.value}}},{applyToAll:!0});b&&b.addRules({elements:{input:function(b){if("hidden"==b.attributes.type)return a.createFakeParserElement(b,"cke_hidden","hiddenfield")}}},{applyToAll:!0})}});CKEDITOR.plugins.add("format",{requires:"richcombo",init:function(a){if(!a.blockless){for(var f=a.config,c=a.lang.format,j=f.format_tags.split(";"),d={},k=0,l=[],g=0;g<j.length;g++){var h=j[g],i=new CKEDITOR.style(f["format_"+h]);if(!a.filter.customConfig||a.filter.check(i))k++,d[h]=i,d[h]._.enterMode=a.config.enterMode,l.push(i)}0!==k&&a.ui.addRichCombo("Format",{label:c.label,title:c.panelTitle,toolbar:"styles,20",allowedContent:l,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),
multiSelect:!1,attributes:{"aria-label":c.panelTitle}},init:function(){this.startGroup(c.panelTitle);for(var a in d){var e=c["tag_"+a];this.add(a,d[a].buildPreview(e),e)}},onClick:function(b){a.focus();a.fire("saveSnapshot");var b=d[b],e=a.elementPath();a[b.checkActive(e,a)?"removeStyle":"applyStyle"](b);setTimeout(function(){a.fire("saveSnapshot")},0)},onRender:function(){a.on("selectionChange",function(b){var e=this.getValue(),b=b.data.path;this.refresh();for(var c in d)if(d[c].checkActive(b,a)){c!=
e&&this.setValue(c,a.lang.format["tag_"+c]);return}this.setValue("")},this)},onOpen:function(){this.showAll();for(var b in d)a.activeFilter.check(d[b])||this.hideItem(b)},refresh:function(){var b=a.elementPath();if(b){if(b.isContextFor("p"))for(var c in d)if(a.activeFilter.check(d[c]))return;this.setState(CKEDITOR.TRISTATE_DISABLED)}}})}}});CKEDITOR.config.format_tags="p;h1;h2;h3;h4;h5;h6;pre;address;div";CKEDITOR.config.format_p={element:"p"};CKEDITOR.config.format_div={element:"div"};
CKEDITOR.config.format_pre={element:"pre"};CKEDITOR.config.format_address={element:"address"};CKEDITOR.config.format_h1={element:"h1"};CKEDITOR.config.format_h2={element:"h2"};CKEDITOR.config.format_h3={element:"h3"};CKEDITOR.config.format_h4={element:"h4"};CKEDITOR.config.format_h5={element:"h5"};CKEDITOR.config.format_h6={element:"h6"};(function(){var b={canUndo:!1,exec:function(a){var b=a.document.createElement("hr");a.insertElement(b)},allowedContent:"hr",requiredContent:"hr"};CKEDITOR.plugins.add("horizontalrule",{init:function(a){a.blockless||(a.addCommand("horizontalrule",b),a.ui.addButton&&a.ui.addButton("HorizontalRule",{label:a.lang.horizontalrule.toolbar,command:"horizontalrule",toolbar:"insert,40"}))}})})();CKEDITOR.plugins.add("htmlwriter",{init:function(b){var a=new CKEDITOR.htmlWriter;a.forceSimpleAmpersand=b.config.forceSimpleAmpersand;a.indentationChars=b.config.dataIndentationChars||"\t";b.dataProcessor.writer=a}});
CKEDITOR.htmlWriter=CKEDITOR.tools.createClass({base:CKEDITOR.htmlParser.basicWriter,$:function(){this.base();this.indentationChars="\t";this.selfClosingEnd=" />";this.lineBreakChars="\n";this.sortAttributes=1;this._.indent=0;this._.indentation="";this._.inPre=0;this._.rules={};var b=CKEDITOR.dtd,a;for(a in CKEDITOR.tools.extend({},b.$nonBodyContent,b.$block,b.$listItem,b.$tableContent))this.setRules(a,{indent:!b[a]["#"],breakBeforeOpen:1,breakBeforeClose:!b[a]["#"],breakAfterClose:1,needsSpace:a in
b.$block&&!(a in{li:1,dt:1,dd:1})});this.setRules("br",{breakAfterOpen:1});this.setRules("title",{indent:0,breakAfterOpen:0});this.setRules("style",{indent:0,breakBeforeClose:1});this.setRules("pre",{breakAfterOpen:1,indent:0})},proto:{openTag:function(b){var a=this._.rules[b];this._.afterCloser&&(a&&a.needsSpace&&this._.needsSpace)&&this._.output.push("\n");this._.indent?this.indentation():a&&a.breakBeforeOpen&&(this.lineBreak(),this.indentation());this._.output.push("<",b);this._.afterCloser=0},
openTagClose:function(b,a){var c=this._.rules[b];a?(this._.output.push(this.selfClosingEnd),c&&c.breakAfterClose&&(this._.needsSpace=c.needsSpace)):(this._.output.push(">"),c&&c.indent&&(this._.indentation+=this.indentationChars));c&&c.breakAfterOpen&&this.lineBreak();"pre"==b&&(this._.inPre=1)},attribute:function(b,a){"string"==typeof a&&(this.forceSimpleAmpersand&&(a=a.replace(/&amp;/g,"&")),a=CKEDITOR.tools.htmlEncodeAttr(a));this._.output.push(" ",b,'="',a,'"')},closeTag:function(b){var a=this._.rules[b];
a&&a.indent&&(this._.indentation=this._.indentation.substr(this.indentationChars.length));this._.indent?this.indentation():a&&a.breakBeforeClose&&(this.lineBreak(),this.indentation());this._.output.push("</",b,">");"pre"==b&&(this._.inPre=0);a&&a.breakAfterClose&&(this.lineBreak(),this._.needsSpace=a.needsSpace);this._.afterCloser=1},text:function(b){this._.indent&&(this.indentation(),!this._.inPre&&(b=CKEDITOR.tools.ltrim(b)));this._.output.push(b)},comment:function(b){this._.indent&&this.indentation();
this._.output.push("<\!--",b,"--\>")},lineBreak:function(){!this._.inPre&&0<this._.output.length&&this._.output.push(this.lineBreakChars);this._.indent=1},indentation:function(){!this._.inPre&&this._.indentation&&this._.output.push(this._.indentation);this._.indent=0},reset:function(){this._.output=[];this._.indent=0;this._.indentation="";this._.afterCloser=0;this._.inPre=0},setRules:function(b,a){var c=this._.rules[b];c?CKEDITOR.tools.extend(c,a,!0):this._.rules[b]=a}}});(function(){CKEDITOR.plugins.add("iframe",{requires:"dialog,fakeobjects",onLoad:function(){CKEDITOR.addCss("img.cke_iframe{background-image: url("+CKEDITOR.getUrl(this.path+"images/placeholder.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")},init:function(a){var b=a.lang.iframe,c="iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";a.plugins.dialogadvtab&&(c+=";iframe"+a.plugins.dialogadvtab.allowedContent({id:1,
classes:1,styles:1}));CKEDITOR.dialog.add("iframe",this.path+"dialogs/iframe.js");a.addCommand("iframe",new CKEDITOR.dialogCommand("iframe",{allowedContent:c,requiredContent:"iframe"}));a.ui.addButton&&a.ui.addButton("Iframe",{label:b.toolbar,command:"iframe",toolbar:"insert,80"});a.on("doubleclick",function(a){var b=a.data.element;b.is("img")&&"iframe"==b.data("cke-real-element-type")&&(a.data.dialog="iframe")});a.addMenuItems&&a.addMenuItems({iframe:{label:b.title,command:"iframe",group:"image"}});
a.contextMenu&&a.contextMenu.addListener(function(a){if(a&&a.is("img")&&"iframe"==a.data("cke-real-element-type"))return{iframe:CKEDITOR.TRISTATE_OFF}})},afterInit:function(a){var b=a.dataProcessor;(b=b&&b.dataFilter)&&b.addRules({elements:{iframe:function(b){return a.createFakeParserElement(b,"cke_iframe","iframe",!0)}}})}})})();(function(){function k(a){var d=this.editor,b=a.document,c=b.body,e=b.getElementById("cke_actscrpt");e&&e.parentNode.removeChild(e);(e=b.getElementById("cke_shimscrpt"))&&e.parentNode.removeChild(e);(e=b.getElementById("cke_basetagscrpt"))&&e.parentNode.removeChild(e);c.contentEditable=!0;CKEDITOR.env.ie&&(c.hideFocus=!0,c.disabled=!0,c.removeAttribute("disabled"));delete this._.isLoadingData;this.$=c;b=new CKEDITOR.dom.document(b);this.setup();this.fixInitialSelection();CKEDITOR.env.ie&&(b.getDocumentElement().addClass(b.$.compatMode),
d.config.enterMode!=CKEDITOR.ENTER_P&&this.attachListener(b,"selectionchange",function(){var a=b.getBody(),c=d.getSelection(),e=c&&c.getRanges()[0];e&&(a.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i)&&e.startContainer.equals(a))&&setTimeout(function(){e=d.getSelection().getRanges()[0];if(!e.startContainer.equals("body")){a.getFirst().remove(1);e.moveToElementEditEnd(a);e.select()}},0)}));if(CKEDITOR.env.webkit||CKEDITOR.env.ie&&10<CKEDITOR.env.version)b.getDocumentElement().on("mousedown",function(a){a.data.getTarget().is("html")&&
setTimeout(function(){d.editable().focus()})});l(d);try{d.document.$.execCommand("2D-position",!1,!0)}catch(g){}(CKEDITOR.env.gecko||CKEDITOR.env.ie&&"CSS1Compat"==d.document.$.compatMode)&&this.attachListener(this,"keydown",function(a){var b=a.data.getKeystroke();if(b==33||b==34)if(CKEDITOR.env.ie)setTimeout(function(){d.getSelection().scrollIntoView()},0);else if(d.window.$.innerHeight>this.$.offsetHeight){var c=d.createRange();c[b==33?"moveToElementEditStart":"moveToElementEditEnd"](this);c.select();
a.data.preventDefault()}});CKEDITOR.env.ie&&this.attachListener(b,"blur",function(){try{b.$.selection.empty()}catch(a){}});CKEDITOR.env.iOS&&this.attachListener(b,"touchend",function(){a.focus()});c=d.document.getElementsByTag("title").getItem(0);c.data("cke-title",c.getText());CKEDITOR.env.ie&&(d.document.$.title=this._.docTitle);CKEDITOR.tools.setTimeout(function(){if(this.status=="unloaded")this.status="ready";d.fire("contentDom");if(this._.isPendingFocus){d.focus();this._.isPendingFocus=false}setTimeout(function(){d.fire("dataReady")},
0);CKEDITOR.env.ie&&setTimeout(function(){if(d.document){var a=d.document.$.body;a.runtimeStyle.marginBottom="0px";a.runtimeStyle.marginBottom=""}},1E3)},0,this)}function l(a){function d(){var c;a.editable().attachListener(a,"selectionChange",function(){var d=a.getSelection().getSelectedElement();d&&(c&&(c.detachEvent("onresizestart",b),c=null),d.$.attachEvent("onresizestart",b),c=d.$)})}function b(a){a.returnValue=!1}if(CKEDITOR.env.gecko)try{var c=a.document.$;c.execCommand("enableObjectResizing",
!1,!a.config.disableObjectResizing);c.execCommand("enableInlineTableEditing",!1,!a.config.disableNativeTableHandles)}catch(e){}else CKEDITOR.env.ie&&(11>CKEDITOR.env.version&&a.config.disableObjectResizing)&&d(a)}function m(){var a=[];if(8<=CKEDITOR.document.$.documentMode){a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");var d=[],b;for(b in CKEDITOR.dtd.$removeEmpty)d.push("html.CSS1Compat "+b+"[contenteditable=false]");a.push(d.join(",")+"{display:inline-block}")}else CKEDITOR.env.gecko&&
(a.push("html{height:100% !important}"),a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));a.push("html{cursor:text;*cursor:auto}");a.push("img,input,textarea{cursor:default}");return a.join("\n")}CKEDITOR.plugins.add("wysiwygarea",{init:function(a){a.config.fullPage&&a.addFeature({allowedContent:"html head title; style [media,type]; body (*)[id]; meta link [*]",requiredContent:"body"});a.addMode("wysiwyg",function(d){function b(b){b&&b.removeListener();a.editable(new j(a,
e.$.contentWindow.document.body));a.setData(a.getData(1),d)}var c="document.open();"+(CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"")+"document.close();",c=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie?"javascript:void(function(){"+encodeURIComponent(c)+"}())":"",e=CKEDITOR.dom.element.createFromHtml('<iframe src="'+c+'" frameBorder="0"></iframe>');e.setStyles({width:"100%",height:"100%"});e.addClass("cke_wysiwyg_frame cke_reset");var g=a.ui.space("contents");g.append(e);if(c=CKEDITOR.env.ie||
CKEDITOR.env.gecko)e.on("load",b);var f=a.title,h=a.fire("ariaEditorHelpLabel",{}).label;f&&(CKEDITOR.env.ie&&h&&(f+=", "+h),e.setAttribute("title",f));if(h){var f=CKEDITOR.tools.getNextId(),i=CKEDITOR.dom.element.createFromHtml('<span id="'+f+'" class="cke_voice_label">'+h+"</span>");g.append(i,1);e.setAttribute("aria-describedby",f)}a.on("beforeModeUnload",function(a){a.removeListener();i&&i.remove()});e.setAttributes({tabIndex:a.tabIndex,allowTransparency:"true"});!c&&b();CKEDITOR.env.webkit&&
(c=function(){g.setStyle("width","100%");e.hide();e.setSize("width",g.getSize("width"));g.removeStyle("width");e.show()},e.setCustomData("onResize",c),CKEDITOR.document.getWindow().on("resize",c));a.fire("ariaWidget",e)})}});CKEDITOR.editor.prototype.addContentsCss=function(a){var d=this.config,b=d.contentsCss;CKEDITOR.tools.isArray(b)||(d.contentsCss=b?[b]:[]);d.contentsCss.push(a)};var j=CKEDITOR.tools.createClass({$:function(a){this.base.apply(this,arguments);this._.frameLoadedHandler=CKEDITOR.tools.addFunction(function(a){CKEDITOR.tools.setTimeout(k,
0,this,a)},this);this._.docTitle=this.getWindow().getFrame().getAttribute("title")},base:CKEDITOR.editable,proto:{setData:function(a,d){var b=this.editor;if(d)this.setHtml(a),this.fixInitialSelection(),b.fire("dataReady");else{this._.isLoadingData=!0;b._.dataStore={id:1};var c=b.config,e=c.fullPage,g=c.docType,f=CKEDITOR.tools.buildStyleHtml(m()).replace(/<style>/,'<style data-cke-temp="1">');e||(f+=CKEDITOR.tools.buildStyleHtml(b.config.contentsCss));var h=c.baseHref?'<base href="'+c.baseHref+'" data-cke-temp="1" />':
"";e&&(a=a.replace(/<!DOCTYPE[^>]*>/i,function(a){b.docType=g=a;return""}).replace(/<\?xml\s[^\?]*\?>/i,function(a){b.xmlDeclaration=a;return""}));a=b.dataProcessor.toHtml(a);e?(/<body[\s|>]/.test(a)||(a="<body>"+a),/<html[\s|>]/.test(a)||(a="<html>"+a+"</html>"),/<head[\s|>]/.test(a)?/<title[\s|>]/.test(a)||(a=a.replace(/<head[^>]*>/,"$&<title></title>")):a=a.replace(/<html[^>]*>/,"$&<head><title></title></head>"),h&&(a=a.replace(/<head[^>]*?>/,"$&"+h)),a=a.replace(/<\/head\s*>/,f+"$&"),a=g+a):a=
c.docType+'<html dir="'+c.contentsLangDirection+'" lang="'+(c.contentsLanguage||b.langCode)+'"><head><title>'+this._.docTitle+"</title>"+h+f+"</head><body"+(c.bodyId?' id="'+c.bodyId+'"':"")+(c.bodyClass?' class="'+c.bodyClass+'"':"")+">"+a+"</body></html>";CKEDITOR.env.gecko&&(a=a.replace(/<body/,'<body contenteditable="true" '),2E4>CKEDITOR.env.version&&(a=a.replace(/<body[^>]*>/,"$&<\!-- cke-content-start --\>")));c='<script id="cke_actscrpt" type="text/javascript"'+(CKEDITOR.env.ie?' defer="defer" ':
"")+">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction("+this._.frameLoadedHandler+",window);wasLoaded=1;}"+(CKEDITOR.env.ie?"onload();":'document.addEventListener("DOMContentLoaded", onload, false );')+"<\/script>";CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(c+='<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)<\/script>');h&&(CKEDITOR.env.ie&&10>CKEDITOR.env.version)&&(c+='<script id="cke_basetagscrpt">var baseTag = document.querySelector( "base" );baseTag.href = baseTag.href;<\/script>');
a=a.replace(/(?=\s*<\/(:?head)>)/,c);this.clearCustomData();this.clearListeners();b.fire("contentDomUnload");var i=this.getDocument();try{i.write(a)}catch(j){setTimeout(function(){i.write(a)},0)}}},getData:function(a){if(a)return this.getHtml();var a=this.editor,d=a.config,b=d.fullPage,c=b&&a.docType,e=b&&a.xmlDeclaration,g=this.getDocument(),b=b?g.getDocumentElement().getOuterHtml():g.getBody().getHtml();CKEDITOR.env.gecko&&d.enterMode!=CKEDITOR.ENTER_BR&&(b=b.replace(/<br>(?=\s*(:?$|<\/body>))/,
""));b=a.dataProcessor.toDataFormat(b);e&&(b=e+"\n"+b);c&&(b=c+"\n"+b);return b},focus:function(){this._.isLoadingData?this._.isPendingFocus=!0:j.baseProto.focus.call(this)},detach:function(){var a=this.editor,d=a.document,a=a.window.getFrame();j.baseProto.detach.call(this);this.clearCustomData();d.getDocumentElement().clearCustomData();a.clearCustomData();CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);(d=a.removeCustomData("onResize"))&&d.removeListener();a.remove()}}})})();
CKEDITOR.config.disableObjectResizing=!1;CKEDITOR.config.disableNativeTableHandles=!0;CKEDITOR.config.disableNativeSpellChecker=!0;CKEDITOR.config.contentsCss=CKEDITOR.getUrl("contents.css");(function(){function e(b,a){a||(a=b.getSelection().getSelectedElement());if(a&&a.is("img")&&!a.data("cke-realelement")&&!a.isReadOnly())return a}function f(b){var a=b.getStyle("float");if("inherit"==a||"none"==a)a=0;a||(a=b.getAttribute("align"));return a}CKEDITOR.plugins.add("image",{requires:"dialog",init:function(b){if(!b.plugins.image2){CKEDITOR.dialog.add("image",this.path+"dialogs/image.js");var a="img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
CKEDITOR.dialog.isTabEnabled(b,"image","advanced")&&(a="img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");b.addCommand("image",new CKEDITOR.dialogCommand("image",{allowedContent:a,requiredContent:"img[alt,src]",contentTransformations:[["img{width}: sizeToStyle","img[width]: sizeToAttribute"],["img{float}: alignmentToStyle","img[align]: alignmentToAttribute"]]}));b.ui.addButton&&b.ui.addButton("Image",{label:b.lang.common.image,command:"image",toolbar:"insert,10"});b.on("doubleclick",function(b){var a=
b.data.element;a.is("img")&&(!a.data("cke-realelement")&&!a.isReadOnly())&&(b.data.dialog="image")});b.addMenuItems&&b.addMenuItems({image:{label:b.lang.image.menu,command:"image",group:"image"}});b.contextMenu&&b.contextMenu.addListener(function(a){if(e(b,a))return{image:CKEDITOR.TRISTATE_OFF}})}},afterInit:function(b){function a(a){var d=b.getCommand("justify"+a);if(d){if("left"==a||"right"==a)d.on("exec",function(d){var c=e(b),g;c&&(g=f(c),g==a?(c.removeStyle("float"),a==f(c)&&c.removeAttribute("align")):
c.setStyle("float",a),d.cancel())});d.on("refresh",function(d){var c=e(b);c&&(c=f(c),this.setState(c==a?CKEDITOR.TRISTATE_ON:"right"==a||"left"==a?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),d.cancel())})}}b.plugins.image2||(a("left"),a("right"),a("center"),a("block"))}})})();CKEDITOR.config.image_removeLinkByEmptyURL=!0;(function(){function k(a,b){var e,f;b.on("refresh",function(a){var b=[i],c;for(c in a.data.states)b.push(a.data.states[c]);this.setState(CKEDITOR.tools.search(b,m)?m:i)},b,null,100);b.on("exec",function(b){e=a.getSelection();f=e.createBookmarks(1);b.data||(b.data={});b.data.done=!1},b,null,0);b.on("exec",function(){a.forceNextSelectionCheck();e.selectBookmarks(f)},b,null,100)}var i=CKEDITOR.TRISTATE_DISABLED,m=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indent",{init:function(a){var b=CKEDITOR.plugins.indent.genericDefinition;
k(a,a.addCommand("indent",new b(!0)));k(a,a.addCommand("outdent",new b));a.ui.addButton&&(a.ui.addButton("Indent",{label:a.lang.indent.indent,command:"indent",directional:!0,toolbar:"indent,20"}),a.ui.addButton("Outdent",{label:a.lang.indent.outdent,command:"outdent",directional:!0,toolbar:"indent,10"}));a.on("dirChanged",function(b){var f=a.createRange(),j=b.data.node;f.setStartBefore(j);f.setEndAfter(j);for(var l=new CKEDITOR.dom.walker(f),c;c=l.next();)if(c.type==CKEDITOR.NODE_ELEMENT)if(!c.equals(j)&&
c.getDirection()){f.setStartAfter(c);l=new CKEDITOR.dom.walker(f)}else{var d=a.config.indentClasses;if(d)for(var g=b.data.dir=="ltr"?["_rtl",""]:["","_rtl"],h=0;h<d.length;h++)if(c.hasClass(d[h]+g[0])){c.removeClass(d[h]+g[0]);c.addClass(d[h]+g[1])}d=c.getStyle("margin-right");g=c.getStyle("margin-left");d?c.setStyle("margin-left",d):c.removeStyle("margin-left");g?c.setStyle("margin-right",g):c.removeStyle("margin-right")}})}});CKEDITOR.plugins.indent={genericDefinition:function(a){this.isIndent=
!!a;this.startDisabled=!this.isIndent},specificDefinition:function(a,b,e){this.name=b;this.editor=a;this.jobs={};this.enterBr=a.config.enterMode==CKEDITOR.ENTER_BR;this.isIndent=!!e;this.relatedGlobal=e?"indent":"outdent";this.indentKey=e?9:CKEDITOR.SHIFT+9;this.database={}},registerCommands:function(a,b){a.on("pluginsLoaded",function(){for(var a in b)(function(a,b){var e=a.getCommand(b.relatedGlobal),c;for(c in b.jobs)e.on("exec",function(d){d.data.done||(a.fire("lockSnapshot"),b.execJob(a,c)&&(d.data.done=
!0),a.fire("unlockSnapshot"),CKEDITOR.dom.element.clearAllMarkers(b.database))},this,null,c),e.on("refresh",function(d){d.data.states||(d.data.states={});d.data.states[b.name+"@"+c]=b.refreshJob(a,c,d.data.path)},this,null,c);a.addFeature(b)})(this,b[a])})}};CKEDITOR.plugins.indent.genericDefinition.prototype={context:"p",exec:function(){}};CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(a,b){var e=this.jobs[b];if(e.state!=i)return e.exec.call(this,a)},refreshJob:function(a,
b,e){b=this.jobs[b];b.state=a.activeFilter.checkFeature(this)?b.refresh.call(this,a,e):i;return b.state},getContext:function(a){return a.contains(this.context)}}})();(function(){function f(b,d,a){if(!b.getCustomData("indent_processed")){var e=this.editor,j=this.isIndent;if(d){e=b.$.className.match(this.classNameRegex);a=0;e&&(e=e[1],a=CKEDITOR.tools.indexOf(d,e)+1);if(0>(a+=j?1:-1))return;a=Math.min(a,d.length);a=Math.max(a,0);b.$.className=CKEDITOR.tools.ltrim(b.$.className.replace(this.classNameRegex,""));0<a&&b.addClass(d[a-1])}else{var d=k(b,a),a=parseInt(b.getStyle(d),10),g=e.config.indentOffset||40;isNaN(a)&&(a=0);a+=(j?1:-1)*g;if(0>a)return;a=Math.max(a,
0);a=Math.ceil(a/g)*g;b.setStyle(d,a?a+(e.config.indentUnit||"px"):"");""===b.getAttribute("style")&&b.removeAttribute("style")}CKEDITOR.dom.element.setMarker(this.database,b,"indent_processed",1)}}function k(b,d){return"ltr"==(d||b.getComputedStyle("direction"))?"margin-left":"margin-right"}var h=CKEDITOR.dtd.$listItem,m=CKEDITOR.dtd.$list,i=CKEDITOR.TRISTATE_DISABLED,l=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indentblock",{requires:"indent",init:function(b){function d(){a.specificDefinition.apply(this,
arguments);this.allowedContent={"div h1 h2 h3 h4 h5 h6 ol p pre ul":{propertiesOnly:!0,styles:!e?"margin-left,margin-right":null,classes:e||null}};this.enterBr&&(this.allowedContent.div=!0);this.requiredContent=(this.enterBr?"div":"p")+(e?"("+e.join(",")+")":"{margin-left}");this.jobs={20:{refresh:function(a,b){var c=b.block||b.blockLimit;c.is(h)||(c=c.getAscendant(h)||c);c.is(h)&&(c=c.getParent());if(!this.enterBr&&!this.getContext(b))return i;if(e){var d;d=e;var c=c.$.className.match(this.classNameRegex),
f=this.isIndent;d=c?f?c[1]!=d.slice(-1):true:f;return d?l:i}return this.isIndent?l:c?CKEDITOR[(parseInt(c.getStyle(k(c)),10)||0)<=0?"TRISTATE_DISABLED":"TRISTATE_OFF"]:i},exec:function(a){var b=a.getSelection(),b=b&&b.getRanges()[0],c;if(c=a.elementPath().contains(m))f.call(this,c,e);else{b=b.createIterator();a=a.config.enterMode;b.enforceRealBlocks=true;for(b.enlargeBr=a!=CKEDITOR.ENTER_BR;c=b.getNextParagraph(a==CKEDITOR.ENTER_P?"p":"div");)c.isReadOnly()||f.call(this,c,e)}return true}}}}var a=
CKEDITOR.plugins.indent,e=b.config.indentClasses;a.registerCommands(b,{indentblock:new d(b,"indentblock",!0),outdentblock:new d(b,"outdentblock")});CKEDITOR.tools.extend(d.prototype,a.specificDefinition.prototype,{context:{div:1,dl:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,p:1,pre:1,table:1},classNameRegex:e?RegExp("(?:^|\\s+)("+e.join("|")+")(?=$|\\s)"):null})}})})();(function(){function s(c){function f(b){for(var e=d.startContainer,a=d.endContainer;e&&!e.getParent().equals(b);)e=e.getParent();for(;a&&!a.getParent().equals(b);)a=a.getParent();if(!e||!a)return!1;for(var g=e,e=[],i=!1;!i;)g.equals(a)&&(i=!0),e.push(g),g=g.getNext();if(1>e.length)return!1;g=b.getParents(!0);for(a=0;a<g.length;a++)if(g[a].getName&&m[g[a].getName()]){b=g[a];break}for(var g=j.isIndent?1:-1,a=e[0],e=e[e.length-1],i=CKEDITOR.plugins.list.listToArray(b,n),l=i[e.getCustomData("listarray_index")].indent,
a=a.getCustomData("listarray_index");a<=e.getCustomData("listarray_index");a++)if(i[a].indent+=g,0<g){var h=i[a].parent;i[a].parent=new CKEDITOR.dom.element(h.getName(),h.getDocument())}for(a=e.getCustomData("listarray_index")+1;a<i.length&&i[a].indent>l;a++)i[a].indent+=g;e=CKEDITOR.plugins.list.arrayToList(i,n,null,c.config.enterMode,b.getDirection());if(!j.isIndent){var f;if((f=b.getParent())&&f.is("li"))for(var g=e.listNode.getChildren(),o=[],k,a=g.count()-1;0<=a;a--)(k=g.getItem(a))&&(k.is&&
k.is("li"))&&o.push(k)}e&&e.listNode.replace(b);if(o&&o.length)for(a=0;a<o.length;a++){for(k=b=o[a];(k=k.getNext())&&k.is&&k.getName()in m;)CKEDITOR.env.needsNbspFiller&&!b.getFirst(t)&&b.append(d.document.createText(" ")),b.append(k);b.insertAfter(f)}e&&c.fire("contentDomInvalidated");return!0}for(var j=this,n=this.database,m=this.context,l=c.getSelection(),l=(l&&l.getRanges()).createIterator(),d;d=l.getNextRange();){for(var b=d.getCommonAncestor();b&&!(b.type==CKEDITOR.NODE_ELEMENT&&m[b.getName()]);)b=
b.getParent();b||(b=d.startPath().contains(m))&&d.setEndAt(b,CKEDITOR.POSITION_BEFORE_END);if(!b){var h=d.getEnclosedNode();h&&(h.type==CKEDITOR.NODE_ELEMENT&&h.getName()in m)&&(d.setStartAt(h,CKEDITOR.POSITION_AFTER_START),d.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),b=h)}b&&(d.startContainer.type==CKEDITOR.NODE_ELEMENT&&d.startContainer.getName()in m)&&(h=new CKEDITOR.dom.walker(d),h.evaluator=p,d.startContainer=h.next());b&&(d.endContainer.type==CKEDITOR.NODE_ELEMENT&&d.endContainer.getName()in m)&&
(h=new CKEDITOR.dom.walker(d),h.evaluator=p,d.endContainer=h.previous());if(b)return f(b)}return 0}function p(c){return c.type==CKEDITOR.NODE_ELEMENT&&c.is("li")}function t(c){return u(c)&&v(c)}var u=CKEDITOR.dom.walker.whitespaces(!0),v=CKEDITOR.dom.walker.bookmark(!1,!0),q=CKEDITOR.TRISTATE_DISABLED,r=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indentlist",{requires:"indent",init:function(c){function f(c){j.specificDefinition.apply(this,arguments);this.requiredContent=["ul","ol"];c.on("key",function(f){if("wysiwyg"==
c.mode&&f.data.keyCode==this.indentKey){var l=this.getContext(c.elementPath());if(l&&(!this.isIndent||!CKEDITOR.plugins.indentList.firstItemInPath(this.context,c.elementPath(),l)))c.execCommand(this.relatedGlobal),f.cancel()}},this);this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(c,f){var d=this.getContext(f),b=CKEDITOR.plugins.indentList.firstItemInPath(this.context,f,d);return!d||!this.isIndent||b?q:r}:function(c,f){return!this.getContext(f)||this.isIndent?q:r},exec:CKEDITOR.tools.bind(s,
this)}}var j=CKEDITOR.plugins.indent;j.registerCommands(c,{indentlist:new f(c,"indentlist",!0),outdentlist:new f(c,"outdentlist")});CKEDITOR.tools.extend(f.prototype,j.specificDefinition.prototype,{context:{ol:1,ul:1}})}});CKEDITOR.plugins.indentList={};CKEDITOR.plugins.indentList.firstItemInPath=function(c,f,j){var n=f.contains(p);j||(j=f.contains(c));return j&&n&&n.equals(j.getFirst(p))}})();CKEDITOR.plugins.add("smiley",{requires:"dialog",init:function(a){a.config.smiley_path=a.config.smiley_path||this.path+"images/";a.addCommand("smiley",new CKEDITOR.dialogCommand("smiley",{allowedContent:"img[alt,height,!src,title,width]",requiredContent:"img"}));a.ui.addButton&&a.ui.addButton("Smiley",{label:a.lang.smiley.toolbar,command:"smiley",toolbar:"insert,50"});CKEDITOR.dialog.add("smiley",this.path+"dialogs/smiley.js")}});CKEDITOR.config.smiley_images="regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" ");
CKEDITOR.config.smiley_descriptions="smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";");(function(){function l(a,c){var c=void 0===c||c,b;if(c)b=a.getComputedStyle("text-align");else{for(;!a.hasAttribute||!a.hasAttribute("align")&&!a.getStyle("text-align");){b=a.getParent();if(!b)break;a=b}b=a.getStyle("text-align")||a.getAttribute("align")||""}b&&(b=b.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i,""));!b&&c&&(b="rtl"==a.getComputedStyle("direction")?"right":"left");return b}function g(a,c,b){this.editor=a;this.name=c;this.value=b;this.context="p";var c=a.config.justifyClasses,h=a.config.enterMode==
CKEDITOR.ENTER_P?"p":"div";if(c){switch(b){case "left":this.cssClassName=c[0];break;case "center":this.cssClassName=c[1];break;case "right":this.cssClassName=c[2];break;case "justify":this.cssClassName=c[3]}this.cssClassRegex=RegExp("(?:^|\\s+)(?:"+c.join("|")+")(?=$|\\s)");this.requiredContent=h+"("+this.cssClassName+")"}else this.requiredContent=h+"{text-align}";this.allowedContent={"caption div h1 h2 h3 h4 h5 h6 p pre td th li":{propertiesOnly:!0,styles:this.cssClassName?null:"text-align",classes:this.cssClassName||
null}};a.config.enterMode==CKEDITOR.ENTER_BR&&(this.allowedContent.div=!0)}function j(a){var c=a.editor,b=c.createRange();b.setStartBefore(a.data.node);b.setEndAfter(a.data.node);for(var h=new CKEDITOR.dom.walker(b),d;d=h.next();)if(d.type==CKEDITOR.NODE_ELEMENT)if(!d.equals(a.data.node)&&d.getDirection())b.setStartAfter(d),h=new CKEDITOR.dom.walker(b);else{var e=c.config.justifyClasses;e&&(d.hasClass(e[0])?(d.removeClass(e[0]),d.addClass(e[2])):d.hasClass(e[2])&&(d.removeClass(e[2]),d.addClass(e[0])));
e=d.getStyle("text-align");"left"==e?d.setStyle("text-align","right"):"right"==e&&d.setStyle("text-align","left")}}g.prototype={exec:function(a){var c=a.getSelection(),b=a.config.enterMode;if(c){for(var h=c.createBookmarks(),d=c.getRanges(),e=this.cssClassName,g,f,i=a.config.useComputedState,i=void 0===i||i,k=d.length-1;0<=k;k--){g=d[k].createIterator();for(g.enlargeBr=b!=CKEDITOR.ENTER_BR;f=g.getNextParagraph(b==CKEDITOR.ENTER_P?"p":"div");)if(!f.isReadOnly()){f.removeAttribute("align");f.removeStyle("text-align");
var j=e&&(f.$.className=CKEDITOR.tools.ltrim(f.$.className.replace(this.cssClassRegex,""))),m=this.state==CKEDITOR.TRISTATE_OFF&&(!i||l(f,!0)!=this.value);e?m?f.addClass(e):j||f.removeAttribute("class"):m&&f.setStyle("text-align",this.value)}}a.focus();a.forceNextSelectionCheck();c.selectBookmarks(h)}},refresh:function(a,c){var b=c.block||c.blockLimit;this.setState("body"!=b.getName()&&l(b,this.editor.config.useComputedState)==this.value?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)}};CKEDITOR.plugins.add("justify",
{init:function(a){if(!a.blockless){var c=new g(a,"justifyleft","left"),b=new g(a,"justifycenter","center"),h=new g(a,"justifyright","right"),d=new g(a,"justifyblock","justify");a.addCommand("justifyleft",c);a.addCommand("justifycenter",b);a.addCommand("justifyright",h);a.addCommand("justifyblock",d);a.ui.addButton&&(a.ui.addButton("JustifyLeft",{label:a.lang.justify.left,command:"justifyleft",toolbar:"align,10"}),a.ui.addButton("JustifyCenter",{label:a.lang.justify.center,command:"justifycenter",
toolbar:"align,20"}),a.ui.addButton("JustifyRight",{label:a.lang.justify.right,command:"justifyright",toolbar:"align,30"}),a.ui.addButton("JustifyBlock",{label:a.lang.justify.block,command:"justifyblock",toolbar:"align,40"}));a.on("dirChanged",j)}}})})();CKEDITOR.plugins.add("menubutton",{requires:"button,menu",onLoad:function(){var d=function(c){var a=this._,b=a.menu;a.state!==CKEDITOR.TRISTATE_DISABLED&&(a.on&&b?b.hide():(a.previousState=a.state,b||(b=a.menu=new CKEDITOR.menu(c,{panel:{className:"cke_menu_panel",attributes:{"aria-label":c.lang.common.options}}}),b.onHide=CKEDITOR.tools.bind(function(){var b=this.command?c.getCommand(this.command).modes:this.modes;this.setState(!b||b[c.mode]?a.previousState:CKEDITOR.TRISTATE_DISABLED);a.on=0},this),
this.onMenu&&b.addListener(this.onMenu)),this.setState(CKEDITOR.TRISTATE_ON),a.on=1,setTimeout(function(){b.show(CKEDITOR.document.getById(a.id),4)},0)))};CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(c){delete c.panel;this.base(c);this.hasArrow=!0;this.click=d},statics:{handler:{create:function(c){return new CKEDITOR.ui.menuButton(c)}}}})},beforeInit:function(d){d.ui.addHandler(CKEDITOR.UI_MENUBUTTON,CKEDITOR.ui.menuButton.handler)}});
CKEDITOR.UI_MENUBUTTON="menubutton";(function(){CKEDITOR.plugins.add("language",{requires:"menubutton",init:function(a){var b=a.config.language_list||["ar:Arabic:rtl","fr:French","es:Spanish"],c=this,d=a.lang.language,e={},g,h,i,f;a.addCommand("language",{allowedContent:"span[!lang,!dir]",requiredContent:"span[lang,dir]",contextSensitive:!0,exec:function(a,b){var c=e["language_"+b];if(c)a[c.style.checkActive(a.elementPath(),a)?"removeStyle":"applyStyle"](c.style)},refresh:function(a){this.setState(c.getCurrentLangElement(a)?CKEDITOR.TRISTATE_ON:
CKEDITOR.TRISTATE_OFF)}});for(f=0;f<b.length;f++)g=b[f].split(":"),h=g[0],i="language_"+h,e[i]={label:g[1],langId:h,group:"language",order:f,ltr:"rtl"!=(""+g[2]).toLowerCase(),onClick:function(){a.execCommand("language",this.langId)},role:"menuitemcheckbox"},e[i].style=new CKEDITOR.style({element:"span",attributes:{lang:h,dir:e[i].ltr?"ltr":"rtl"}});e.language_remove={label:d.remove,group:"language_remove",state:CKEDITOR.TRISTATE_DISABLED,order:e.length,onClick:function(){var b=c.getCurrentLangElement(a);
b&&a.execCommand("language",b.getAttribute("lang"))}};a.addMenuGroup("language",1);a.addMenuGroup("language_remove");a.addMenuItems(e);a.ui.add("Language",CKEDITOR.UI_MENUBUTTON,{label:d.button,allowedContent:"span[!lang,!dir]",requiredContent:"span[lang,dir]",toolbar:"bidi,30",command:"language",onMenu:function(){var b={},d=c.getCurrentLangElement(a),f;for(f in e)b[f]=CKEDITOR.TRISTATE_OFF;b.language_remove=d?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;d&&(b["language_"+d.getAttribute("lang")]=
CKEDITOR.TRISTATE_ON);return b}})},getCurrentLangElement:function(a){var b=a.elementPath(),a=b&&b.elements,c;if(b)for(var d=0;d<a.length;d++)b=a[d],!c&&("span"==b.getName()&&b.hasAttribute("dir")&&b.hasAttribute("lang"))&&(c=b);return c}})})();(function(){function m(c){return c.replace(/'/g,"\\$&")}function n(c){for(var b,a=c.length,f=[],e=0;e<a;e++)b=c.charCodeAt(e),f.push(b);return"String.fromCharCode("+f.join(",")+")"}function o(c,b){var a=c.plugins.link,f=a.compiledProtectionFunction.params,e,d;d=[a.compiledProtectionFunction.name,"("];for(var g=0;g<f.length;g++)a=f[g].toLowerCase(),e=b[a],0<g&&d.push(","),d.push("'",e?m(encodeURIComponent(b[a])):"","'");d.push(")");return d.join("")}function l(c){var c=c.config.emailProtection||"",
b;c&&"encode"!=c&&(b={},c.replace(/^([^(]+)\(([^)]+)\)$/,function(a,c,e){b.name=c;b.params=[];e.replace(/[^,\s]+/g,function(a){b.params.push(a)})}));return b}CKEDITOR.plugins.add("link",{requires:"dialog,fakeobjects",onLoad:function(){function c(b){return a.replace(/%1/g,"rtl"==b?"right":"left").replace(/%2/g,"cke_contents_"+b)}var b="background:url("+CKEDITOR.getUrl(this.path+"images"+(CKEDITOR.env.hidpi?"/hidpi":"")+"/anchor.png")+") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
a=".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{"+b+"padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{"+b+"width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";CKEDITOR.addCss(c("ltr")+c("rtl"))},init:function(c){var b="a[!href]";CKEDITOR.dialog.isTabEnabled(c,"link","advanced")&&(b=b.replace("]",",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)"));CKEDITOR.dialog.isTabEnabled(c,"link","target")&&(b=b.replace("]",
",target,onclick]"));c.addCommand("link",new CKEDITOR.dialogCommand("link",{allowedContent:b,requiredContent:"a[href]"}));c.addCommand("anchor",new CKEDITOR.dialogCommand("anchor",{allowedContent:"a[!name,id]",requiredContent:"a[name]"}));c.addCommand("unlink",new CKEDITOR.unlinkCommand);c.addCommand("removeAnchor",new CKEDITOR.removeAnchorCommand);c.setKeystroke(CKEDITOR.CTRL+76,"link");c.ui.addButton&&(c.ui.addButton("Link",{label:c.lang.link.toolbar,command:"link",toolbar:"links,10"}),c.ui.addButton("Unlink",
{label:c.lang.link.unlink,command:"unlink",toolbar:"links,20"}),c.ui.addButton("Anchor",{label:c.lang.link.anchor.toolbar,command:"anchor",toolbar:"links,30"}));CKEDITOR.dialog.add("link",this.path+"dialogs/link.js");CKEDITOR.dialog.add("anchor",this.path+"dialogs/anchor.js");c.on("doubleclick",function(a){var b=CKEDITOR.plugins.link.getSelectedLink(c)||a.data.element;if(!b.isReadOnly())if(b.is("a")){a.data.dialog=b.getAttribute("name")&&(!b.getAttribute("href")||!b.getChildCount())?"anchor":"link";
a.data.link=b}else if(CKEDITOR.plugins.link.tryRestoreFakeAnchor(c,b))a.data.dialog="anchor"},null,null,0);c.on("doubleclick",function(a){a.data.dialog in{link:1,anchor:1}&&a.data.link&&c.getSelection().selectElement(a.data.link)},null,null,20);c.addMenuItems&&c.addMenuItems({anchor:{label:c.lang.link.anchor.menu,command:"anchor",group:"anchor",order:1},removeAnchor:{label:c.lang.link.anchor.remove,command:"removeAnchor",group:"anchor",order:5},link:{label:c.lang.link.menu,command:"link",group:"link",
order:1},unlink:{label:c.lang.link.unlink,command:"unlink",group:"link",order:5}});c.contextMenu&&c.contextMenu.addListener(function(a){if(!a||a.isReadOnly())return null;a=CKEDITOR.plugins.link.tryRestoreFakeAnchor(c,a);if(!a&&!(a=CKEDITOR.plugins.link.getSelectedLink(c)))return null;var b={};a.getAttribute("href")&&a.getChildCount()&&(b={link:CKEDITOR.TRISTATE_OFF,unlink:CKEDITOR.TRISTATE_OFF});if(a&&a.hasAttribute("name"))b.anchor=b.removeAnchor=CKEDITOR.TRISTATE_OFF;return b});this.compiledProtectionFunction=
l(c)},afterInit:function(c){c.dataProcessor.dataFilter.addRules({elements:{a:function(a){return!a.attributes.name?null:!a.children.length?c.createFakeParserElement(a,"cke_anchor","anchor"):null}}});var b=c._.elementsPath&&c._.elementsPath.filters;b&&b.push(function(a,b){if("a"==b&&(CKEDITOR.plugins.link.tryRestoreFakeAnchor(c,a)||a.getAttribute("name")&&(!a.getAttribute("href")||!a.getChildCount())))return"anchor"})}});var p=/^javascript:/,q=/^mailto:([^?]+)(?:\?(.+))?$/,r=/subject=([^;?:@&=$,\/]*)/,
s=/body=([^;?:@&=$,\/]*)/,t=/^#(.*)$/,u=/^((?:http|https|ftp|news):\/\/)?(.*)$/,v=/^(_(?:self|top|parent|blank))$/,w=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,x=/^javascript:([^(]+)\(([^)]+)\)$/,y=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,z=/(?:^|,)([^=]+)=(\d+|yes|no)/gi,j={id:"advId",dir:"advLangDir",accessKey:"advAccessKey",name:"advName",lang:"advLangCode",tabindex:"advTabIndex",title:"advTitle",
type:"advContentType","class":"advCSSClasses",charset:"advCharset",style:"advStyles",rel:"advRel"};CKEDITOR.plugins.link={getSelectedLink:function(c){var b=c.getSelection(),a=b.getSelectedElement();return a&&a.is("a")?a:(b=b.getRanges()[0])?(b.shrink(CKEDITOR.SHRINK_TEXT),c.elementPath(b.getCommonAncestor()).contains("a",1)):null},getEditorAnchors:function(c){for(var b=c.editable(),a=b.isInline()&&!c.plugins.divarea?c.document:b,b=a.getElementsByTag("a"),a=a.getElementsByTag("img"),f=[],e=0,d;d=b.getItem(e++);)if(d.data("cke-saved-name")||
d.hasAttribute("name"))f.push({name:d.data("cke-saved-name")||d.getAttribute("name"),id:d.getAttribute("id")});for(e=0;d=a.getItem(e++);)(d=this.tryRestoreFakeAnchor(c,d))&&f.push({name:d.getAttribute("name"),id:d.getAttribute("id")});return f},fakeAnchor:!0,tryRestoreFakeAnchor:function(c,b){if(b&&b.data("cke-real-element-type")&&"anchor"==b.data("cke-real-element-type")){var a=c.restoreRealElement(b);if(a.data("cke-saved-name"))return a}},parseLinkAttributes:function(c,b){var a=b&&(b.data("cke-saved-href")||
b.getAttribute("href"))||"",f=c.plugins.link.compiledProtectionFunction,e=c.config.emailProtection,d,g={};a.match(p)&&("encode"==e?a=a.replace(w,function(a,b,c){return"mailto:"+String.fromCharCode.apply(String,b.split(","))+(c&&c.replace(/\\'/g,"'"))}):e&&a.replace(x,function(a,b,c){if(b==f.name){g.type="email";for(var a=g.email={},b=/(^')|('$)/g,c=c.match(/[^,\s]+/g),d=c.length,e,h,i=0;i<d;i++)e=decodeURIComponent,h=c[i].replace(b,"").replace(/\\'/g,"'"),h=e(h),e=f.params[i].toLowerCase(),a[e]=h;
a.address=[a.name,a.domain].join("@")}}));if(!g.type)if(e=a.match(t))g.type="anchor",g.anchor={},g.anchor.name=g.anchor.id=e[1];else if(e=a.match(q)){d=a.match(r);a=a.match(s);g.type="email";var i=g.email={};i.address=e[1];d&&(i.subject=decodeURIComponent(d[1]));a&&(i.body=decodeURIComponent(a[1]))}else if(a&&(d=a.match(u)))g.type="url",g.url={},g.url.protocol=d[1],g.url.url=d[2];if(b){if(a=b.getAttribute("target"))g.target={type:a.match(v)?a:"frame",name:a};else if(a=(a=b.data("cke-pa-onclick")||
b.getAttribute("onclick"))&&a.match(y))for(g.target={type:"popup",name:a[1]};e=z.exec(a[2]);)("yes"==e[2]||"1"==e[2])&&!(e[1]in{height:1,width:1,top:1,left:1})?g.target[e[1]]=!0:isFinite(e[2])&&(g.target[e[1]]=e[2]);var a={},h;for(h in j)(e=b.getAttribute(h))&&(a[j[h]]=e);if(h=b.data("cke-saved-name")||a.advName)a.advName=h;CKEDITOR.tools.isEmpty(a)||(g.advanced=a)}return g},getLinkAttributes:function(c,b){var a=c.config.emailProtection||"",f={};switch(b.type){case "url":var a=b.url&&void 0!=b.url.protocol?
b.url.protocol:"http://",e=b.url&&CKEDITOR.tools.trim(b.url.url)||"";f["data-cke-saved-href"]=0===e.indexOf("/")?e:a+e;break;case "anchor":a=b.anchor&&b.anchor.id;f["data-cke-saved-href"]="#"+(b.anchor&&b.anchor.name||a||"");break;case "email":var d=b.email,e=d.address;switch(a){case "":case "encode":var g=encodeURIComponent(d.subject||""),i=encodeURIComponent(d.body||""),d=[];g&&d.push("subject="+g);i&&d.push("body="+i);d=d.length?"?"+d.join("&"):"";"encode"==a?(a=["javascript:void(location.href='mailto:'+",
n(e)],d&&a.push("+'",m(d),"'"),a.push(")")):a=["mailto:",e,d];break;default:a=e.split("@",2),d.name=a[0],d.domain=a[1],a=["javascript:",o(c,d)]}f["data-cke-saved-href"]=a.join("")}if(b.target)if("popup"==b.target.type){for(var a=["window.open(this.href, '",b.target.name||"","', '"],h="resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "),e=h.length,g=function(a){b.target[a]&&h.push(a+"="+b.target[a])},d=0;d<e;d++)h[d]+=b.target[h[d]]?"=yes":"=no";g("width");g("left");
g("height");g("top");a.push(h.join(","),"'); return false;");f["data-cke-pa-onclick"]=a.join("")}else"notSet"!=b.target.type&&b.target.name&&(f.target=b.target.name);if(b.advanced){for(var k in j)(a=b.advanced[j[k]])&&(f[k]=a);f.name&&(f["data-cke-saved-name"]=f.name)}f["data-cke-saved-href"]&&(f.href=f["data-cke-saved-href"]);k=CKEDITOR.tools.extend({target:1,onclick:1,"data-cke-pa-onclick":1,"data-cke-saved-name":1},j);for(var l in f)delete k[l];return{set:f,removed:CKEDITOR.tools.objectKeys(k)}}};
CKEDITOR.unlinkCommand=function(){};CKEDITOR.unlinkCommand.prototype={exec:function(c){var b=new CKEDITOR.style({element:"a",type:CKEDITOR.STYLE_INLINE,alwaysRemoveElement:1});c.removeStyle(b)},refresh:function(c,b){var a=b.lastElement&&b.lastElement.getAscendant("a",!0);a&&"a"==a.getName()&&a.getAttribute("href")&&a.getChildCount()?this.setState(CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_DISABLED)},contextSensitive:1,startDisabled:1,requiredContent:"a[href]"};CKEDITOR.removeAnchorCommand=
function(){};CKEDITOR.removeAnchorCommand.prototype={exec:function(c){var b=c.getSelection(),a=b.createBookmarks(),f;if(b&&(f=b.getSelectedElement())&&(!f.getChildCount()?CKEDITOR.plugins.link.tryRestoreFakeAnchor(c,f):f.is("a")))f.remove(1);else if(f=CKEDITOR.plugins.link.getSelectedLink(c))f.hasAttribute("href")?(f.removeAttributes({name:1,"data-cke-saved-name":1}),f.removeClass("cke_anchor")):f.remove(1);b.selectBookmarks(a)},requiredContent:"a[name]"};CKEDITOR.tools.extend(CKEDITOR.config,{linkShowAdvancedTab:!0,
linkShowTargetTab:!0})})();(function(){function E(c,j,e){function b(b){if((d=a[b?"getFirst":"getLast"]())&&(!d.is||!d.isBlockBoundary())&&(m=j.root[b?"getPrevious":"getNext"](CKEDITOR.dom.walker.invisible(!0)))&&(!m.is||!m.isBlockBoundary({br:1})))c.document.createElement("br")[b?"insertBefore":"insertAfter"](d)}for(var k=CKEDITOR.plugins.list.listToArray(j.root,e),g=[],h=0;h<j.contents.length;h++){var f=j.contents[h];if((f=f.getAscendant("li",!0))&&!f.getCustomData("list_item_processed"))g.push(f),CKEDITOR.dom.element.setMarker(e,
f,"list_item_processed",!0)}f=null;for(h=0;h<g.length;h++)f=g[h].getCustomData("listarray_index"),k[f].indent=-1;for(h=f+1;h<k.length;h++)if(k[h].indent>k[h-1].indent+1){g=k[h-1].indent+1-k[h].indent;for(f=k[h].indent;k[h]&&k[h].indent>=f;)k[h].indent+=g,h++;h--}var a=CKEDITOR.plugins.list.arrayToList(k,e,null,c.config.enterMode,j.root.getAttribute("dir")).listNode,d,m;b(!0);b();a.replace(j.root);c.fire("contentDomInvalidated")}function x(c,j){this.name=c;this.context=this.type=j;this.allowedContent=
j+" li";this.requiredContent=j}function A(c,j,e,b){for(var k,g;k=c[b?"getLast":"getFirst"](F);)(g=k.getDirection(1))!==j.getDirection(1)&&k.setAttribute("dir",g),k.remove(),e?k[b?"insertBefore":"insertAfter"](e):j.append(k,b)}function B(c){var j;(j=function(e){var b=c[e?"getPrevious":"getNext"](q);b&&(b.type==CKEDITOR.NODE_ELEMENT&&b.is(c.getName()))&&(A(c,b,null,!e),c.remove(),c=b)})();j(1)}function C(c){return c.type==CKEDITOR.NODE_ELEMENT&&(c.getName()in CKEDITOR.dtd.$block||c.getName()in CKEDITOR.dtd.$listItem)&&
CKEDITOR.dtd[c.getName()]["#"]}function y(c,j,e){c.fire("saveSnapshot");e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);var b=e.extractContents();j.trim(!1,!0);var k=j.createBookmark(),g=new CKEDITOR.dom.elementPath(j.startContainer),h=g.block,g=g.lastElement.getAscendant("li",1)||h,f=new CKEDITOR.dom.elementPath(e.startContainer),a=f.contains(CKEDITOR.dtd.$listItem),f=f.contains(CKEDITOR.dtd.$list);h?(h=h.getBogus())&&h.remove():f&&(h=f.getPrevious(q))&&v(h)&&h.remove();(h=b.getLast())&&(h.type==
CKEDITOR.NODE_ELEMENT&&h.is("br"))&&h.remove();(h=j.startContainer.getChild(j.startOffset))?b.insertBefore(h):j.startContainer.append(b);if(a&&(b=w(a)))g.contains(a)?(A(b,a.getParent(),a),b.remove()):g.append(b);for(;e.checkStartOfBlock()&&e.checkEndOfBlock();){f=e.startPath();b=f.block;if(!b)break;b.is("li")&&(g=b.getParent(),b.equals(g.getLast(q))&&b.equals(g.getFirst(q))&&(b=g));e.moveToPosition(b,CKEDITOR.POSITION_BEFORE_START);b.remove()}e=e.clone();b=c.editable();e.setEndAt(b,CKEDITOR.POSITION_BEFORE_END);
e=new CKEDITOR.dom.walker(e);e.evaluator=function(a){return q(a)&&!v(a)};(e=e.next())&&(e.type==CKEDITOR.NODE_ELEMENT&&e.getName()in CKEDITOR.dtd.$list)&&B(e);j.moveToBookmark(k);j.select();c.fire("saveSnapshot")}function w(c){return(c=c.getLast(q))&&c.type==CKEDITOR.NODE_ELEMENT&&c.getName()in r?c:null}var r={ol:1,ul:1},G=CKEDITOR.dom.walker.whitespaces(),D=CKEDITOR.dom.walker.bookmark(),q=function(c){return!(G(c)||D(c))},v=CKEDITOR.dom.walker.bogus();CKEDITOR.plugins.list={listToArray:function(c,
j,e,b,k){if(!r[c.getName()])return[];b||(b=0);e||(e=[]);for(var g=0,h=c.getChildCount();g<h;g++){var f=c.getChild(g);f.type==CKEDITOR.NODE_ELEMENT&&f.getName()in CKEDITOR.dtd.$list&&CKEDITOR.plugins.list.listToArray(f,j,e,b+1);if("li"==f.$.nodeName.toLowerCase()){var a={parent:c,indent:b,element:f,contents:[]};k?a.grandparent=k:(a.grandparent=c.getParent(),a.grandparent&&"li"==a.grandparent.$.nodeName.toLowerCase()&&(a.grandparent=a.grandparent.getParent()));j&&CKEDITOR.dom.element.setMarker(j,f,
"listarray_index",e.length);e.push(a);for(var d=0,m=f.getChildCount(),i;d<m;d++)i=f.getChild(d),i.type==CKEDITOR.NODE_ELEMENT&&r[i.getName()]?CKEDITOR.plugins.list.listToArray(i,j,e,b+1,a.grandparent):a.contents.push(i)}}return e},arrayToList:function(c,j,e,b,k){e||(e=0);if(!c||c.length<e+1)return null;for(var g,h=c[e].parent.getDocument(),f=new CKEDITOR.dom.documentFragment(h),a=null,d=e,m=Math.max(c[e].indent,0),i=null,n,l,p=b==CKEDITOR.ENTER_P?"p":"div";;){var o=c[d];g=o.grandparent;n=o.element.getDirection(1);
if(o.indent==m){if(!a||c[d].parent.getName()!=a.getName())a=c[d].parent.clone(!1,1),k&&a.setAttribute("dir",k),f.append(a);i=a.append(o.element.clone(0,1));n!=a.getDirection(1)&&i.setAttribute("dir",n);for(g=0;g<o.contents.length;g++)i.append(o.contents[g].clone(1,1));d++}else if(o.indent==Math.max(m,0)+1)o=c[d-1].element.getDirection(1),d=CKEDITOR.plugins.list.arrayToList(c,null,d,b,o!=n?n:null),!i.getChildCount()&&(CKEDITOR.env.needsNbspFiller&&!(7<h.$.documentMode))&&i.append(h.createText(" ")),
i.append(d.listNode),d=d.nextIndex;else if(-1==o.indent&&!e&&g){r[g.getName()]?(i=o.element.clone(!1,!0),n!=g.getDirection(1)&&i.setAttribute("dir",n)):i=new CKEDITOR.dom.documentFragment(h);var a=g.getDirection(1)!=n,u=o.element,z=u.getAttribute("class"),v=u.getAttribute("style"),w=i.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(b!=CKEDITOR.ENTER_BR||a||v||z),s,x=o.contents.length,t;for(g=0;g<x;g++)if(s=o.contents[g],D(s)&&1<x)w?t=s.clone(1,1):i.append(s.clone(1,1));else if(s.type==CKEDITOR.NODE_ELEMENT&&
s.isBlockBoundary()){a&&!s.getDirection()&&s.setAttribute("dir",n);l=s;var y=u.getAttribute("style");y&&l.setAttribute("style",y.replace(/([^;])$/,"$1;")+(l.getAttribute("style")||""));z&&s.addClass(z);l=null;t&&(i.append(t),t=null);i.append(s.clone(1,1))}else w?(l||(l=h.createElement(p),i.append(l),a&&l.setAttribute("dir",n)),v&&l.setAttribute("style",v),z&&l.setAttribute("class",z),t&&(l.append(t),t=null),l.append(s.clone(1,1))):i.append(s.clone(1,1));t&&((l||i).append(t),t=null);i.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&
d!=c.length-1&&(CKEDITOR.env.needsBrFiller&&(n=i.getLast())&&(n.type==CKEDITOR.NODE_ELEMENT&&n.is("br"))&&n.remove(),n=i.getLast(q),(!n||!(n.type==CKEDITOR.NODE_ELEMENT&&n.is(CKEDITOR.dtd.$block)))&&i.append(h.createElement("br")));n=i.$.nodeName.toLowerCase();("div"==n||"p"==n)&&i.appendBogus();f.append(i);a=null;d++}else return null;l=null;if(c.length<=d||Math.max(c[d].indent,0)<m)break}if(j)for(c=f.getFirst();c;){if(c.type==CKEDITOR.NODE_ELEMENT&&(CKEDITOR.dom.element.clearMarkers(j,c),c.getName()in
CKEDITOR.dtd.$listItem&&(e=c,h=k=b=void 0,b=e.getDirection()))){for(k=e.getParent();k&&!(h=k.getDirection());)k=k.getParent();b==h&&e.removeAttribute("dir")}c=c.getNextSourceNode()}return{listNode:f,nextIndex:d}}};var H=/^h[1-6]$/,F=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);x.prototype={exec:function(c){this.refresh(c,c.elementPath());var j=c.config,e=c.getSelection(),b=e&&e.getRanges();if(this.state==CKEDITOR.TRISTATE_OFF){var k=c.editable();if(k.getFirst(q)){var g=1==b.length&&b[0];(j=
g&&g.getEnclosedNode())&&(j.is&&this.type==j.getName())&&this.setState(CKEDITOR.TRISTATE_ON)}else j.enterMode==CKEDITOR.ENTER_BR?k.appendBogus():b[0].fixBlock(1,j.enterMode==CKEDITOR.ENTER_P?"p":"div"),e.selectRanges(b)}for(var j=e.createBookmarks(!0),k=[],h={},b=b.createIterator(),f=0;(g=b.getNextRange())&&++f;){var a=g.getBoundaryNodes(),d=a.startNode,m=a.endNode;d.type==CKEDITOR.NODE_ELEMENT&&"td"==d.getName()&&g.setStartAt(a.startNode,CKEDITOR.POSITION_AFTER_START);m.type==CKEDITOR.NODE_ELEMENT&&
"td"==m.getName()&&g.setEndAt(a.endNode,CKEDITOR.POSITION_BEFORE_END);g=g.createIterator();for(g.forceBrBreak=this.state==CKEDITOR.TRISTATE_OFF;a=g.getNextParagraph();)if(!a.getCustomData("list_block")){CKEDITOR.dom.element.setMarker(h,a,"list_block",1);for(var i=c.elementPath(a),d=i.elements,m=0,i=i.blockLimit,n,l=d.length-1;0<=l&&(n=d[l]);l--)if(r[n.getName()]&&i.contains(n)){i.removeCustomData("list_group_object_"+f);(d=n.getCustomData("list_group_object"))?d.contents.push(a):(d={root:n,contents:[a]},
k.push(d),CKEDITOR.dom.element.setMarker(h,n,"list_group_object",d));m=1;break}m||(m=i,m.getCustomData("list_group_object_"+f)?m.getCustomData("list_group_object_"+f).contents.push(a):(d={root:m,contents:[a]},CKEDITOR.dom.element.setMarker(h,m,"list_group_object_"+f,d),k.push(d)))}}for(n=[];0<k.length;)if(d=k.shift(),this.state==CKEDITOR.TRISTATE_OFF)if(r[d.root.getName()]){b=c;f=d;d=h;g=n;m=CKEDITOR.plugins.list.listToArray(f.root,d);i=[];for(a=0;a<f.contents.length;a++)if(l=f.contents[a],(l=l.getAscendant("li",
!0))&&!l.getCustomData("list_item_processed"))i.push(l),CKEDITOR.dom.element.setMarker(d,l,"list_item_processed",!0);for(var l=f.root.getDocument(),p=void 0,o=void 0,a=0;a<i.length;a++){var u=i[a].getCustomData("listarray_index"),p=m[u].parent;p.is(this.type)||(o=l.createElement(this.type),p.copyAttributes(o,{start:1,type:1}),o.removeStyle("list-style-type"),m[u].parent=o)}d=CKEDITOR.plugins.list.arrayToList(m,d,null,b.config.enterMode);m=void 0;i=d.listNode.getChildCount();for(a=0;a<i&&(m=d.listNode.getChild(a));a++)m.getName()==
this.type&&g.push(m);d.listNode.replace(f.root);b.fire("contentDomInvalidated")}else{m=c;a=d;g=n;i=a.contents;b=a.root.getDocument();f=[];1==i.length&&i[0].equals(a.root)&&(d=b.createElement("div"),i[0].moveChildren&&i[0].moveChildren(d),i[0].append(d),i[0]=d);a=a.contents[0].getParent();for(l=0;l<i.length;l++)a=a.getCommonAncestor(i[l].getParent());p=m.config.useComputedState;m=d=void 0;p=void 0===p||p;for(l=0;l<i.length;l++)for(o=i[l];u=o.getParent();){if(u.equals(a)){f.push(o);!m&&o.getDirection()&&
(m=1);o=o.getDirection(p);null!==d&&(d=d&&d!=o?null:o);break}o=u}if(!(1>f.length)){i=f[f.length-1].getNext();l=b.createElement(this.type);g.push(l);for(p=g=void 0;f.length;)g=f.shift(),p=b.createElement("li"),g.is("pre")||H.test(g.getName())||"false"==g.getAttribute("contenteditable")?g.appendTo(p):(g.copyAttributes(p),d&&g.getDirection()&&(p.removeStyle("direction"),p.removeAttribute("dir")),g.moveChildren(p),g.remove()),p.appendTo(l);d&&m&&l.setAttribute("dir",d);i?l.insertBefore(i):l.appendTo(a)}}else this.state==
CKEDITOR.TRISTATE_ON&&r[d.root.getName()]&&E.call(this,c,d,h);for(l=0;l<n.length;l++)B(n[l]);CKEDITOR.dom.element.clearAllMarkers(h);e.selectBookmarks(j);c.focus()},refresh:function(c,j){var e=j.contains(r,1),b=j.blockLimit||j.root;e&&b.contains(e)?this.setState(e.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_OFF)}};CKEDITOR.plugins.add("list",{requires:"indentlist",init:function(c){c.blockless||(c.addCommand("numberedlist",new x("numberedlist","ol")),c.addCommand("bulletedlist",
new x("bulletedlist","ul")),c.ui.addButton&&(c.ui.addButton("NumberedList",{label:c.lang.list.numberedlist,command:"numberedlist",directional:!0,toolbar:"list,10"}),c.ui.addButton("BulletedList",{label:c.lang.list.bulletedlist,command:"bulletedlist",directional:!0,toolbar:"list,20"})),c.on("key",function(j){var e=j.data.domEvent.getKey();if(c.mode=="wysiwyg"&&e in{8:1,46:1}){var b=c.getSelection().getRanges()[0],k=b&&b.startPath();if(b&&b.collapsed){var g=e==8,h=c.editable(),f=new CKEDITOR.dom.walker(b.clone());
f.evaluator=function(a){return q(a)&&!v(a)};f.guard=function(a,b){return!(b&&a.type==CKEDITOR.NODE_ELEMENT&&a.is("table"))};e=b.clone();if(g){var a,d;if((a=k.contains(r))&&b.checkBoundaryOfElement(a,CKEDITOR.START)&&(a=a.getParent())&&a.is("li")&&(a=w(a))){d=a;a=a.getPrevious(q);e.moveToPosition(a&&v(a)?a:d,CKEDITOR.POSITION_BEFORE_START)}else{f.range.setStartAt(h,CKEDITOR.POSITION_AFTER_START);f.range.setEnd(b.startContainer,b.startOffset);if((a=f.previous())&&a.type==CKEDITOR.NODE_ELEMENT&&(a.getName()in
r||a.is("li"))){if(!a.is("li")){f.range.selectNodeContents(a);f.reset();f.evaluator=C;a=f.previous()}d=a;e.moveToElementEditEnd(d)}}if(d){y(c,e,b);j.cancel()}else if((e=k.contains(r))&&b.checkBoundaryOfElement(e,CKEDITOR.START)){d=e.getFirst(q);if(b.checkBoundaryOfElement(d,CKEDITOR.START)){a=e.getPrevious(q);if(w(d)){if(a){b.moveToElementEditEnd(a);b.select()}}else c.execCommand("outdent");j.cancel()}}}else if(d=k.contains("li")){f.range.setEndAt(h,CKEDITOR.POSITION_BEFORE_END);h=(k=d.getLast(q))&&
C(k)?k:d;d=0;if((a=f.next())&&a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in r&&a.equals(k)){d=1;a=f.next()}else b.checkBoundaryOfElement(h,CKEDITOR.END)&&(d=1);if(d&&a){b=b.clone();b.moveToElementEditStart(a);y(c,e,b);j.cancel()}}else{f.range.setEndAt(h,CKEDITOR.POSITION_BEFORE_END);if((a=f.next())&&a.type==CKEDITOR.NODE_ELEMENT&&a.is(r)){a=a.getFirst(q);if(k.block&&b.checkStartOfBlock()&&b.checkEndOfBlock()){k.block.remove();b.moveToElementEditStart(a);b.select()}else if(w(a)){b.moveToElementEditStart(a);
b.select()}else{b=b.clone();b.moveToElementEditStart(a);y(c,e,b)}j.cancel()}}setTimeout(function(){c.selectionChange(1)})}}}))}})})();(function(){CKEDITOR.plugins.liststyle={requires:"dialog,contextmenu",init:function(a){if(!a.blockless){var b;b=new CKEDITOR.dialogCommand("numberedListStyle",{requiredContent:"ol",allowedContent:"ol{list-style-type}[start]"});b=a.addCommand("numberedListStyle",b);a.addFeature(b);CKEDITOR.dialog.add("numberedListStyle",this.path+"dialogs/liststyle.js");b=new CKEDITOR.dialogCommand("bulletedListStyle",{requiredContent:"ul",allowedContent:"ul{list-style-type}"});b=a.addCommand("bulletedListStyle",b);
a.addFeature(b);CKEDITOR.dialog.add("bulletedListStyle",this.path+"dialogs/liststyle.js");a.addMenuGroup("list",108);a.addMenuItems({numberedlist:{label:a.lang.liststyle.numberedTitle,group:"list",command:"numberedListStyle"},bulletedlist:{label:a.lang.liststyle.bulletedTitle,group:"list",command:"bulletedListStyle"}});a.contextMenu.addListener(function(a){if(!a||a.isReadOnly())return null;for(;a;){var b=a.getName();if("ol"==b)return{numberedlist:CKEDITOR.TRISTATE_OFF};if("ul"==b)return{bulletedlist:CKEDITOR.TRISTATE_OFF};
a=a.getParent()}return null})}}};CKEDITOR.plugins.add("liststyle",CKEDITOR.plugins.liststyle)})();(function(){function Q(a,c,d){return m(c)&&m(d)&&d.equals(c.getNext(function(a){return!(z(a)||A(a)||p(a))}))}function u(a){this.upper=a[0];this.lower=a[1];this.set.apply(this,a.slice(2))}function J(a){var c=a.element;if(c&&m(c)&&(c=c.getAscendant(a.triggers,!0))&&a.editable.contains(c)){var d=K(c);if("true"==d.getAttribute("contenteditable"))return c;if(d.is(a.triggers))return d}return null}function ga(a,c,d){o(a,c);o(a,d);a=c.size.bottom;d=d.size.top;return a&&d?0|(a+d)/2:a||d}function r(a,c,d){return c=
c[d?"getPrevious":"getNext"](function(b){return b&&b.type==CKEDITOR.NODE_TEXT&&!z(b)||m(b)&&!p(b)&&!v(a,b)})}function K(a,c){if(a.data("cke-editable"))return null;for(c||(a=a.getParent());a&&!a.data("cke-editable");){if(a.hasAttribute("contenteditable"))return a;a=a.getParent()}return null}function ha(a){var c=a.doc,d=B('<span contenteditable="false" style="'+L+"position:absolute;border-top:1px dashed "+a.boxColor+'"></span>',c),b=CKEDITOR.getUrl(this.path+"images/"+(n.hidpi?"hidpi/":"")+"icon"+(a.rtl?
"-rtl":"")+".png");q(d,{attach:function(){this.wrap.getParent()||this.wrap.appendTo(a.editable,!0);return this},lineChildren:[q(B('<span title="'+a.editor.lang.magicline.title+'" contenteditable="false">&#8629;</span>',c),{base:L+"height:17px;width:17px;"+(a.rtl?"left":"right")+":17px;background:url("+b+") center no-repeat "+a.boxColor+";cursor:pointer;"+(n.hc?"font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;":"")+(n.hidpi?"background-size: 9px 10px;":""),looks:["top:-8px;"+
CKEDITOR.tools.cssVendorPrefix("border-radius","2px",1),"top:-17px;"+CKEDITOR.tools.cssVendorPrefix("border-radius","2px 2px 0px 0px",1),"top:-1px;"+CKEDITOR.tools.cssVendorPrefix("border-radius","0px 0px 2px 2px",1)]}),q(B(R,c),{base:S+"left:0px;border-left-color:"+a.boxColor+";",looks:["border-width:8px 0 8px 8px;top:-8px","border-width:8px 0 0 8px;top:-8px","border-width:0 0 8px 8px;top:0px"]}),q(B(R,c),{base:S+"right:0px;border-right-color:"+a.boxColor+";",looks:["border-width:8px 8px 8px 0;top:-8px",
"border-width:8px 8px 0 0;top:-8px","border-width:0 8px 8px 0;top:0px"]})],detach:function(){this.wrap.getParent()&&this.wrap.remove();return this},mouseNear:function(){o(a,this);var b=a.holdDistance,c=this.size;return c&&a.mouse.y>c.top-b&&a.mouse.y<c.bottom+b&&a.mouse.x>c.left-b&&a.mouse.x<c.right+b?!0:!1},place:function(){var b=a.view,c=a.editable,d=a.trigger,i=d.upper,h=d.lower,j=i||h,l=j.getParent(),k={};this.trigger=d;i&&o(a,i,!0);h&&o(a,h,!0);o(a,l,!0);a.inInlineMode&&C(a,!0);l.equals(c)?(k.left=
b.scroll.x,k.right=-b.scroll.x,k.width=""):(k.left=j.size.left-j.size.margin.left+b.scroll.x-(a.inInlineMode?b.editable.left+b.editable.border.left:0),k.width=j.size.outerWidth+j.size.margin.left+j.size.margin.right+b.scroll.x,k.right="");i&&h?k.top=i.size.margin.bottom===h.size.margin.top?0|i.size.bottom+i.size.margin.bottom/2:i.size.margin.bottom<h.size.margin.top?i.size.bottom+i.size.margin.bottom:i.size.bottom+i.size.margin.bottom-h.size.margin.top:i?h||(k.top=i.size.bottom+i.size.margin.bottom):
k.top=h.size.top-h.size.margin.top;d.is(x)||k.top>b.scroll.y-15&&k.top<b.scroll.y+5?(k.top=a.inInlineMode?0:b.scroll.y,this.look(x)):d.is(y)||k.top>b.pane.bottom-5&&k.top<b.pane.bottom+15?(k.top=a.inInlineMode?b.editable.height+b.editable.padding.top+b.editable.padding.bottom:b.pane.bottom-1,this.look(y)):(a.inInlineMode&&(k.top-=b.editable.top+b.editable.border.top),this.look(s));a.inInlineMode&&(k.top--,k.top+=b.editable.scroll.top,k.left+=b.editable.scroll.left);for(var T in k)k[T]=CKEDITOR.tools.cssLength(k[T]);
this.setStyles(k)},look:function(a){if(this.oldLook!=a){for(var b=this.lineChildren.length,c;b--;)(c=this.lineChildren[b]).setAttribute("style",c.base+c.looks[0|a/2]);this.oldLook=a}},wrap:new M("span",a.doc)});for(c=d.lineChildren.length;c--;)d.lineChildren[c].appendTo(d);d.look(s);d.appendTo(d.wrap);d.unselectable();d.lineChildren[0].on("mouseup",function(b){d.detach();N(a,function(b){var c=a.line.trigger;b[c.is(D)?"insertBefore":"insertAfter"](c.is(D)?c.lower:c.upper)},!0);a.editor.focus();!n.ie&&
a.enterMode!=CKEDITOR.ENTER_BR&&a.hotNode.scrollIntoView();b.data.preventDefault(!0)});d.on("mousedown",function(a){a.data.preventDefault(!0)});a.line=d}function N(a,c,d){var b=new CKEDITOR.dom.range(a.doc),e=a.editor,f;n.ie&&a.enterMode==CKEDITOR.ENTER_BR?f=a.doc.createText(E):(f=(f=K(a.element,!0))&&f.data("cke-enter-mode")||a.enterMode,f=new M(F[f],a.doc),f.is("br")||a.doc.createText(E).appendTo(f));d&&e.fire("saveSnapshot");c(f);b.moveToPosition(f,CKEDITOR.POSITION_AFTER_START);e.getSelection().selectRanges([b]);
a.hotNode=f;d&&e.fire("saveSnapshot")}function U(a,c){return{canUndo:!0,modes:{wysiwyg:1},exec:function(){function d(b){var d=n.ie&&9>n.version?" ":E,f=a.hotNode&&a.hotNode.getText()==d&&a.element.equals(a.hotNode)&&a.lastCmdDirection===!!c;N(a,function(d){f&&a.hotNode&&a.hotNode.remove();d[c?"insertAfter":"insertBefore"](b);d.setAttributes({"data-cke-magicline-hot":1,"data-cke-magicline-dir":!!c});a.lastCmdDirection=!!c});!n.ie&&a.enterMode!=CKEDITOR.ENTER_BR&&a.hotNode.scrollIntoView();a.line.detach()}
return function(b){var b=b.getSelection().getStartElement(),e,b=b.getAscendant(V,1);if(!W(a,b)&&b&&!b.equals(a.editable)&&!b.contains(a.editable)){if((e=K(b))&&"false"==e.getAttribute("contenteditable"))b=e;a.element=b;e=r(a,b,!c);var f;m(e)&&e.is(a.triggers)&&e.is(ia)&&(!r(a,e,!c)||(f=r(a,e,!c))&&m(f)&&f.is(a.triggers))?d(e):(f=J(a,b),m(f)&&(r(a,f,!c)?(b=r(a,f,!c))&&(m(b)&&b.is(a.triggers))&&d(f):d(f)))}}}()}}function v(a,c){if(!c||!(c.type==CKEDITOR.NODE_ELEMENT&&c.$))return!1;var d=a.line;return d.wrap.equals(c)||
d.wrap.contains(c)}function m(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.$}function p(a){if(!m(a))return!1;var c;if(!(c=X(a)))m(a)?(c={left:1,right:1,center:1},c=!(!c[a.getComputedStyle("float")]&&!c[a.getAttribute("align")])):c=!1;return c}function X(a){return!!{absolute:1,fixed:1}[a.getComputedStyle("position")]}function G(a,c){return m(c)?c.is(a.triggers):null}function W(a,c){if(!c)return!1;for(var d=c.getParents(1),b=d.length;b--;)for(var e=a.tabuList.length;e--;)if(d[b].hasAttribute(a.tabuList[e]))return!0;
return!1}function ja(a,c,d){c=c[d?"getLast":"getFirst"](function(b){return a.isRelevant(b)&&!b.is(ka)});if(!c)return!1;o(a,c);return d?c.size.top>a.mouse.y:c.size.bottom<a.mouse.y}function Y(a){var c=a.editable,d=a.mouse,b=a.view,e=a.triggerOffset;C(a);var f=d.y>(a.inInlineMode?b.editable.top+b.editable.height/2:Math.min(b.editable.height,b.pane.height)/2),c=c[f?"getLast":"getFirst"](function(a){return!(z(a)||A(a))});if(!c)return null;v(a,c)&&(c=a.line.wrap[f?"getPrevious":"getNext"](function(a){return!(z(a)||
A(a))}));if(!m(c)||p(c)||!G(a,c))return null;o(a,c);return!f&&0<=c.size.top&&0<d.y&&d.y<c.size.top+e?(a=a.inInlineMode||0===b.scroll.y?x:s,new u([null,c,D,H,a])):f&&c.size.bottom<=b.pane.height&&d.y>c.size.bottom-e&&d.y<b.pane.height?(a=a.inInlineMode||c.size.bottom>b.pane.height-e&&c.size.bottom<b.pane.height?y:s,new u([c,null,Z,H,a])):null}function $(a){var c=a.mouse,d=a.view,b=a.triggerOffset,e=J(a);if(!e)return null;o(a,e);var b=Math.min(b,0|e.size.outerHeight/2),f=[],g,i;if(c.y>e.size.top-1&&
c.y<e.size.top+b)i=!1;else if(c.y>e.size.bottom-b&&c.y<e.size.bottom+1)i=!0;else return null;if(p(e)||ja(a,e,i)||e.getParent().is(aa))return null;var h=r(a,e,!i);if(h){if(h&&h.type==CKEDITOR.NODE_TEXT)return null;if(m(h)){if(p(h)||!G(a,h)||h.getParent().is(aa))return null;f=[h,e][i?"reverse":"concat"]().concat([O,H])}}else e.equals(a.editable[i?"getLast":"getFirst"](a.isRelevant))?(C(a),i&&c.y>e.size.bottom-b&&c.y<d.pane.height&&e.size.bottom>d.pane.height-b&&e.size.bottom<d.pane.height?g=y:0<c.y&&
c.y<e.size.top+b&&(g=x)):g=s,f=[null,e][i?"reverse":"concat"]().concat([i?Z:D,H,g,e.equals(a.editable[i?"getLast":"getFirst"](a.isRelevant))?i?y:x:s]);return 0 in f?new u(f):null}function P(a,c,d,b){for(var e=function(){var b=n.ie?c.$.currentStyle:a.win.$.getComputedStyle(c.$,"");return n.ie?function(a){return b[CKEDITOR.tools.cssStyleToDomStyle(a)]}:function(a){return b.getPropertyValue(a)}}(),f=c.getDocumentPosition(),g={},i={},h={},j={},l=t.length;l--;)g[t[l]]=parseInt(e("border-"+t[l]+"-width"),
10)||0,h[t[l]]=parseInt(e("padding-"+t[l]),10)||0,i[t[l]]=parseInt(e("margin-"+t[l]),10)||0;(!d||b)&&I(a,b);j.top=f.y-(d?0:a.view.scroll.y);j.left=f.x-(d?0:a.view.scroll.x);j.outerWidth=c.$.offsetWidth;j.outerHeight=c.$.offsetHeight;j.height=j.outerHeight-(h.top+h.bottom+g.top+g.bottom);j.width=j.outerWidth-(h.left+h.right+g.left+g.right);j.bottom=j.top+j.outerHeight;j.right=j.left+j.outerWidth;a.inInlineMode&&(j.scroll={top:c.$.scrollTop,left:c.$.scrollLeft});return q({border:g,padding:h,margin:i,
ignoreScroll:d},j,!0)}function o(a,c,d){if(!m(c))return c.size=null;if(c.size){if(c.size.ignoreScroll==d&&c.size.date>new Date-ba)return null}else c.size={};return q(c.size,P(a,c,d),{date:+new Date},!0)}function C(a,c){a.view.editable=P(a,a.editable,c,!0)}function I(a,c){a.view||(a.view={});var d=a.view;if(c||!(d&&d.date>new Date-ba)){var b=a.win,d=b.getScrollPosition(),b=b.getViewPaneSize();q(a.view,{scroll:{x:d.x,y:d.y,width:a.doc.$.documentElement.scrollWidth-b.width,height:a.doc.$.documentElement.scrollHeight-
b.height},pane:{width:b.width,height:b.height,bottom:b.height+d.y},date:+new Date},!0)}}function la(a,c,d,b){for(var e=b,f=b,g=0,i=!1,h=!1,j=a.view.pane.height,l=a.mouse;l.y+g<j&&0<l.y-g;){i||(i=c(e,b));h||(h=c(f,b));!i&&0<l.y-g&&(e=d(a,{x:l.x,y:l.y-g}));!h&&l.y+g<j&&(f=d(a,{x:l.x,y:l.y+g}));if(i&&h)break;g+=2}return new u([e,f,null,null])}CKEDITOR.plugins.add("magicline",{init:function(a){var c=a.config,d=c.magicline_triggerOffset||30,b={editor:a,enterMode:c.enterMode,triggerOffset:d,holdDistance:0|
d*(c.magicline_holdDistance||0.5),boxColor:c.magicline_color||"#ff0000",rtl:"rtl"==c.contentsLangDirection,tabuList:["data-cke-hidden-sel"].concat(c.magicline_tabuList||[]),triggers:c.magicline_everywhere?V:{table:1,hr:1,div:1,ul:1,ol:1,dl:1,form:1,blockquote:1}},e,f,g;b.isRelevant=function(a){return m(a)&&!v(b,a)&&!p(a)};a.on("contentDom",function(){var d=a.editable(),h=a.document,j=a.window;q(b,{editable:d,inInlineMode:d.isInline(),doc:h,win:j,hotNode:null},!0);b.boundary=b.inInlineMode?b.editable:
b.doc.getDocumentElement();d.is(w.$inline)||(b.inInlineMode&&!X(d)&&d.setStyles({position:"relative",top:null,left:null}),ha.call(this,b),I(b),d.attachListener(a,"beforeUndoImage",function(){b.line.detach()}),d.attachListener(a,"beforeGetData",function(){b.line.wrap.getParent()&&(b.line.detach(),a.once("getData",function(){b.line.attach()},null,null,1E3))},null,null,0),d.attachListener(b.inInlineMode?h:h.getWindow().getFrame(),"mouseout",function(c){if("wysiwyg"==a.mode)if(b.inInlineMode){var d=c.data.$.clientX,
c=c.data.$.clientY;I(b);C(b,!0);var e=b.view.editable,f=b.view.scroll;if(!(d>e.left-f.x&&d<e.right-f.x)||!(c>e.top-f.y&&c<e.bottom-f.y))clearTimeout(g),g=null,b.line.detach()}else clearTimeout(g),g=null,b.line.detach()}),d.attachListener(d,"keyup",function(){b.hiddenMode=0}),d.attachListener(d,"keydown",function(c){if("wysiwyg"==a.mode)switch(c=c.data.getKeystroke(),a.getSelection().getStartElement(),c){case 2228240:case 16:b.hiddenMode=1,b.line.detach()}}),d.attachListener(b.inInlineMode?d:h,"mousemove",
function(c){f=!0;if(!("wysiwyg"!=a.mode||a.readOnly||g)){var d={x:c.data.$.clientX,y:c.data.$.clientY};g=setTimeout(function(){b.mouse=d;g=b.trigger=null;I(b);if(f&&!b.hiddenMode&&a.focusManager.hasFocus&&!b.line.mouseNear()&&(b.element=ca(b,!0)))(b.trigger=Y(b)||$(b)||da(b))&&!W(b,b.trigger.upper||b.trigger.lower)?b.line.attach().place():(b.trigger=null,b.line.detach()),f=!1},30)}}),d.attachListener(j,"scroll",function(){"wysiwyg"==a.mode&&(b.line.detach(),n.webkit&&(b.hiddenMode=1,clearTimeout(e),
e=setTimeout(function(){b.mouseDown||(b.hiddenMode=0)},50)))}),d.attachListener(ea?h:j,"mousedown",function(){"wysiwyg"==a.mode&&(b.line.detach(),b.hiddenMode=1,b.mouseDown=1)}),d.attachListener(ea?h:j,"mouseup",function(){b.hiddenMode=0;b.mouseDown=0}),a.addCommand("accessPreviousSpace",U(b)),a.addCommand("accessNextSpace",U(b,!0)),a.setKeystroke([[c.magicline_keystrokePrevious,"accessPreviousSpace"],[c.magicline_keystrokeNext,"accessNextSpace"]]),a.on("loadSnapshot",function(){var c,d,e,f;for(f in{p:1,
br:1,div:1}){c=a.document.getElementsByTag(f);for(e=c.count();e--;)if((d=c.getItem(e)).data("cke-magicline-hot")){b.hotNode=d;b.lastCmdDirection="true"===d.data("cke-magicline-dir")?!0:!1;return}}}),this.backdoor={accessFocusSpace:N,boxTrigger:u,isLine:v,getAscendantTrigger:J,getNonEmptyNeighbour:r,getSize:P,that:b,triggerEdge:$,triggerEditable:Y,triggerExpand:da})},this)}});var q=CKEDITOR.tools.extend,M=CKEDITOR.dom.element,B=M.createFromHtml,n=CKEDITOR.env,ea=CKEDITOR.env.ie&&9>CKEDITOR.env.version,
w=CKEDITOR.dtd,F={},D=128,Z=64,O=32,H=16,fa=8,x=4,y=2,s=1,E=" ",aa=w.$listItem,ka=w.$tableContent,ia=q({},w.$nonEditable,w.$empty),V=w.$block,ba=100,L="width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",S=L+"border-color:transparent;display:block;border-style:solid;",R="<span>"+E+"</span>";F[CKEDITOR.ENTER_BR]="br";F[CKEDITOR.ENTER_P]="p";F[CKEDITOR.ENTER_DIV]="div";u.prototype={set:function(a,c,d){this.properties=a+
c+(d||s);return this},is:function(a){return(this.properties&a)==a}};var ca=function(){function a(a,d){var b=a.$.elementFromPoint(d.x,d.y);return b&&b.nodeType?new CKEDITOR.dom.element(b):null}return function(c,d,b){if(!c.mouse)return null;var e=c.doc,f=c.line.wrap,b=b||c.mouse,g=a(e,b);d&&v(c,g)&&(f.hide(),g=a(e,b),f.show());return!g||!(g.type==CKEDITOR.NODE_ELEMENT&&g.$)||n.ie&&9>n.version&&!c.boundary.equals(g)&&!c.boundary.contains(g)?null:g}}(),z=CKEDITOR.dom.walker.whitespaces(),A=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
da=function(){function a(a){var b=a.element,e,f,g;if(!m(b)||b.contains(a.editable)||b.isReadOnly())return null;g=la(a,function(a,b){return!b.equals(a)},function(a,b){return ca(a,!0,b)},b);e=g.upper;f=g.lower;if(Q(a,e,f))return g.set(O,fa);if(e&&b.contains(e))for(;!e.getParent().equals(b);)e=e.getParent();else e=b.getFirst(function(b){return c(a,b)});if(f&&b.contains(f))for(;!f.getParent().equals(b);)f=f.getParent();else f=b.getLast(function(b){return c(a,b)});if(!e||!f)return null;o(a,e);o(a,f);if(!(a.mouse.y>
e.size.top&&a.mouse.y<f.size.bottom))return null;for(var b=Number.MAX_VALUE,i,h,j,l;f&&!f.equals(e)&&(h=e.getNext(a.isRelevant));)i=Math.abs(ga(a,e,h)-a.mouse.y),i<b&&(b=i,j=e,l=h),e=h,o(a,e);if(!j||!l||!(a.mouse.y>j.size.top&&a.mouse.y<l.size.bottom))return null;g.upper=j;g.lower=l;return g.set(O,fa)}function c(a,b){return!(b&&b.type==CKEDITOR.NODE_TEXT||A(b)||p(b)||v(a,b)||b.type==CKEDITOR.NODE_ELEMENT&&b.$&&b.is("br"))}return function(c){var b=a(c),e;if(e=b){e=b.upper;var f=b.lower;e=!e||!f||p(f)||
p(e)||f.equals(e)||e.equals(f)||f.contains(e)||e.contains(f)?!1:G(c,e)&&G(c,f)&&Q(c,e,f)?!0:!1}return e?b:null}}(),t=["top","left","right","bottom"]})();CKEDITOR.config.magicline_keystrokePrevious=CKEDITOR.CTRL+CKEDITOR.SHIFT+51;CKEDITOR.config.magicline_keystrokeNext=CKEDITOR.CTRL+CKEDITOR.SHIFT+52;(function(){function l(a){if(!a||a.type!=CKEDITOR.NODE_ELEMENT||"form"!=a.getName())return[];for(var e=[],f=["style","className"],b=0;b<f.length;b++){var d=a.$.elements.namedItem(f[b]);d&&(d=new CKEDITOR.dom.element(d),e.push([d,d.nextSibling]),d.remove())}return e}function o(a,e){if(a&&!(a.type!=CKEDITOR.NODE_ELEMENT||"form"!=a.getName())&&0<e.length)for(var f=e.length-1;0<=f;f--){var b=e[f][0],d=e[f][1];d?b.insertBefore(d):b.appendTo(a)}}function n(a,e){var f=l(a),b={},d=a.$;e||(b["class"]=d.className||
"",d.className="");b.inline=d.style.cssText||"";e||(d.style.cssText="position: static; overflow: visible");o(f);return b}function p(a,e){var f=l(a),b=a.$;"class"in e&&(b.className=e["class"]);"inline"in e&&(b.style.cssText=e.inline);o(f)}function q(a){if(!a.editable().isInline()){var e=CKEDITOR.instances,f;for(f in e){var b=e[f];"wysiwyg"==b.mode&&!b.readOnly&&(b=b.document.getBody(),b.setAttribute("contentEditable",!1),b.setAttribute("contentEditable",!0))}a.editable().hasFocus&&(a.toolbox.focus(),
a.focus())}}CKEDITOR.plugins.add("maximize",{init:function(a){function e(){var b=d.getViewPaneSize();a.resize(b.width,b.height,null,!0)}if(a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var f=a.lang,b=CKEDITOR.document,d=b.getWindow(),j,k,m,l=CKEDITOR.TRISTATE_OFF;a.addCommand("maximize",{modes:{wysiwyg:!CKEDITOR.env.iOS,source:!CKEDITOR.env.iOS},readOnly:1,editorFocus:!1,exec:function(){var h=a.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}),g=a.ui.space("contents");
if("wysiwyg"==a.mode){var c=a.getSelection();j=c&&c.getRanges();k=d.getScrollPosition()}else{var i=a.editable().$;j=!CKEDITOR.env.ie&&[i.selectionStart,i.selectionEnd];k=[i.scrollLeft,i.scrollTop]}if(this.state==CKEDITOR.TRISTATE_OFF){d.on("resize",e);m=d.getScrollPosition();for(c=a.container;c=c.getParent();)c.setCustomData("maximize_saved_styles",n(c)),c.setStyle("z-index",a.config.baseFloatZIndex-5);g.setCustomData("maximize_saved_styles",n(g,!0));h.setCustomData("maximize_saved_styles",n(h,!0));
g={overflow:CKEDITOR.env.webkit?"":"hidden",width:0,height:0};b.getDocumentElement().setStyles(g);!CKEDITOR.env.gecko&&b.getDocumentElement().setStyle("position","fixed");(!CKEDITOR.env.gecko||!CKEDITOR.env.quirks)&&b.getBody().setStyles(g);CKEDITOR.env.ie?setTimeout(function(){d.$.scrollTo(0,0)},0):d.$.scrollTo(0,0);h.setStyle("position",CKEDITOR.env.gecko&&CKEDITOR.env.quirks?"fixed":"absolute");h.$.offsetLeft;h.setStyles({"z-index":a.config.baseFloatZIndex-5,left:"0px",top:"0px"});h.addClass("cke_maximized");
e();g=h.getDocumentPosition();h.setStyles({left:-1*g.x+"px",top:-1*g.y+"px"});CKEDITOR.env.gecko&&q(a)}else if(this.state==CKEDITOR.TRISTATE_ON){d.removeListener("resize",e);g=[g,h];for(c=0;c<g.length;c++)p(g[c],g[c].getCustomData("maximize_saved_styles")),g[c].removeCustomData("maximize_saved_styles");for(c=a.container;c=c.getParent();)p(c,c.getCustomData("maximize_saved_styles")),c.removeCustomData("maximize_saved_styles");CKEDITOR.env.ie?setTimeout(function(){d.$.scrollTo(m.x,m.y)},0):d.$.scrollTo(m.x,
m.y);h.removeClass("cke_maximized");CKEDITOR.env.webkit&&(h.setStyle("display","inline"),setTimeout(function(){h.setStyle("display","block")},0));a.fire("resize")}this.toggleState();if(c=this.uiItems[0])g=this.state==CKEDITOR.TRISTATE_OFF?f.maximize.maximize:f.maximize.minimize,c=CKEDITOR.document.getById(c._.id),c.getChild(1).setHtml(g),c.setAttribute("title",g),c.setAttribute("href",'javascript:void("'+g+'");');"wysiwyg"==a.mode?j?(CKEDITOR.env.gecko&&q(a),a.getSelection().selectRanges(j),(i=a.getSelection().getStartElement())&&
i.scrollIntoView(!0)):d.$.scrollTo(k.x,k.y):(j&&(i.selectionStart=j[0],i.selectionEnd=j[1]),i.scrollLeft=k[0],i.scrollTop=k[1]);j=k=null;l=this.state;a.fire("maximize",this.state)},canUndo:!1});a.ui.addButton&&a.ui.addButton("Maximize",{label:f.maximize.maximize,command:"maximize",toolbar:"tools,10"});a.on("mode",function(){var b=a.getCommand("maximize");b.setState(b.state==CKEDITOR.TRISTATE_DISABLED?CKEDITOR.TRISTATE_DISABLED:l)},null,null,100)}}})})();CKEDITOR.plugins.add("newpage",{init:function(a){a.addCommand("newpage",{modes:{wysiwyg:1,source:1},exec:function(b){var a=this;b.setData(b.config.newpage_html||"",function(){b.focus();setTimeout(function(){b.fire("afterCommandExec",{name:"newpage",command:a});b.selectionChange()},200)})},async:!0});a.ui.addButton&&a.ui.addButton("NewPage",{label:a.lang.newpage.toolbar,command:"newpage",toolbar:"document,20"})}});(function(){function e(a){return{"aria-label":a,"class":"cke_pagebreak",contenteditable:"false","data-cke-display-name":"pagebreak","data-cke-pagebreak":1,style:"page-break-after: always",title:a}}CKEDITOR.plugins.add("pagebreak",{requires:"fakeobjects",onLoad:function(){var a=("background:url("+CKEDITOR.getUrl(this.path+"images/pagebreak.gif")+") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:5px;cursor:default;").replace(/;/g,
" !important;");CKEDITOR.addCss("div.cke_pagebreak{"+a+"}")},init:function(a){a.blockless||(a.addCommand("pagebreak",CKEDITOR.plugins.pagebreakCmd),a.ui.addButton&&a.ui.addButton("PageBreak",{label:a.lang.pagebreak.toolbar,command:"pagebreak",toolbar:"insert,70"}),CKEDITOR.env.webkit&&a.on("contentDom",function(){a.document.on("click",function(b){b=b.data.getTarget();b.is("div")&&b.hasClass("cke_pagebreak")&&a.getSelection().selectElement(b)})}))},afterInit:function(a){function b(f){CKEDITOR.tools.extend(f.attributes,
e(a.lang.pagebreak.alt),!0);f.children.length=0}var c=a.dataProcessor,g=c&&c.dataFilter,c=c&&c.htmlFilter,h=/page-break-after\s*:\s*always/i,i=/display\s*:\s*none/i;c&&c.addRules({attributes:{"class":function(a,b){var c=a.replace("cke_pagebreak","");if(c!=a){var d=CKEDITOR.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>').children[0];b.children.length=0;b.add(d);d=b.attributes;delete d["aria-label"];delete d.contenteditable;delete d.title}return c}}},{applyToAll:!0,priority:5});
g&&g.addRules({elements:{div:function(a){if(a.attributes["data-cke-pagebreak"])b(a);else if(h.test(a.attributes.style)){var c=a.children[0];c&&("span"==c.name&&i.test(c.attributes.style))&&b(a)}}}})}});CKEDITOR.plugins.pagebreakCmd={exec:function(a){var b=a.document.createElement("div",{attributes:e(a.lang.pagebreak.alt)});a.insertElement(b)},context:"div",allowedContent:{div:{styles:"!page-break-after"},span:{match:function(a){return(a=a.parent)&&"div"==a.name&&a.styles&&a.styles["page-break-after"]},
styles:"display"}},requiredContent:"div{page-break-after}"}})();(function(){var c={canUndo:!1,async:!0,exec:function(a){a.getClipboardData({title:a.lang.pastetext.title},function(b){b&&a.fire("paste",{type:"text",dataValue:b.dataValue});a.fire("afterCommandExec",{name:"pastetext",command:c,returnValue:!!b})})}};CKEDITOR.plugins.add("pastetext",{requires:"clipboard",init:function(a){a.addCommand("pastetext",c);a.ui.addButton&&a.ui.addButton("PasteText",{label:a.lang.pastetext.button,command:"pastetext",toolbar:"clipboard,40"});if(a.config.forcePasteAsPlainText)a.on("beforePaste",
function(a){"html"!=a.data.type&&(a.data.type="text")});a.on("pasteState",function(b){a.getCommand("pastetext").setState(b.data)})}})})();(function(){function h(a,d,f){var b=CKEDITOR.cleanWord;b?f():(a=CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile||d+"filter/default.js"),CKEDITOR.scriptLoader.load(a,f,null,!0));return!b}function i(a){a.data.type="html"}CKEDITOR.plugins.add("pastefromword",{requires:"clipboard",init:function(a){var d=0,f=this.path;a.addCommand("pastefromword",{canUndo:!1,async:!0,exec:function(a){var e=this;d=1;a.once("beforePaste",i);a.getClipboardData({title:a.lang.pastefromword.title},function(c){c&&a.fire("paste",
{type:"html",dataValue:c.dataValue});a.fire("afterCommandExec",{name:"pastefromword",command:e,returnValue:!!c})})}});a.ui.addButton&&a.ui.addButton("PasteFromWord",{label:a.lang.pastefromword.toolbar,command:"pastefromword",toolbar:"clipboard,50"});a.on("pasteState",function(b){a.getCommand("pastefromword").setState(b.data)});a.on("paste",function(b){var e=b.data,c=e.dataValue;if(c&&(d||/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(c))){var g=h(a,f,function(){if(g)a.fire("paste",e);
else if(!a.config.pasteFromWordPromptCleanup||d||confirm(a.lang.pastefromword.confirmCleanup))e.dataValue=CKEDITOR.cleanWord(c,a)});g&&b.cancel()}},null,null,3)}})})();(function(){var h,i={modes:{wysiwyg:1,source:1},canUndo:!1,readOnly:1,exec:function(a){var g,b=a.config,f=b.baseHref?'<base href="'+b.baseHref+'"/>':"";if(b.fullPage)g=a.getData().replace(/<head>/,"$&"+f).replace(/[^>]*(?=<\/title>)/,"$& &mdash; "+a.lang.preview.preview);else{var b="<body ",d=a.document&&a.document.getBody();d&&(d.getAttribute("id")&&(b+='id="'+d.getAttribute("id")+'" '),d.getAttribute("class")&&(b+='class="'+d.getAttribute("class")+'" '));g=a.config.docType+'<html dir="'+a.config.contentsLangDirection+
'"><head>'+f+"<title>"+a.lang.preview.preview+"</title>"+CKEDITOR.tools.buildStyleHtml(a.config.contentsCss)+"</head>"+(b+">")+a.getData()+"</body></html>"}f=640;b=420;d=80;try{var c=window.screen,f=Math.round(0.8*c.width),b=Math.round(0.7*c.height),d=Math.round(0.1*c.width)}catch(i){}if(!1===a.fire("contentPreview",a={dataValue:g}))return!1;var c="",e;CKEDITOR.env.ie&&(window._cke_htmlToLoad=a.dataValue,e="javascript:void( (function(){document.open();"+("("+CKEDITOR.tools.fixDomain+")();").replace(/\/\/.*?\n/g,
"").replace(/parent\./g,"window.opener.")+"document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )",c="");CKEDITOR.env.gecko&&(window._cke_htmlToLoad=a.dataValue,c=CKEDITOR.getUrl(h+"preview.html"));c=window.open(c,null,"toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width="+f+",height="+b+",left="+d);CKEDITOR.env.ie&&c&&(c.location=e);!CKEDITOR.env.ie&&!CKEDITOR.env.gecko&&(e=c.document,e.open(),e.write(a.dataValue),
e.close());return!0}};CKEDITOR.plugins.add("preview",{init:function(a){a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&(h=this.path,a.addCommand("preview",i),a.ui.addButton&&a.ui.addButton("Preview",{label:a.lang.preview.preview,command:"preview",toolbar:"document,40"}))}})})();CKEDITOR.plugins.add("print",{init:function(a){a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&(a.addCommand("print",CKEDITOR.plugins.print),a.ui.addButton&&a.ui.addButton("Print",{label:a.lang.print.toolbar,command:"print",toolbar:"document,50"}))}});CKEDITOR.plugins.print={exec:function(a){CKEDITOR.env.gecko?a.window.$.print():a.document.$.execCommand("Print")},canUndo:!1,readOnly:1,modes:{wysiwyg:1}};CKEDITOR.plugins.add("removeformat",{init:function(a){a.addCommand("removeFormat",CKEDITOR.plugins.removeformat.commands.removeformat);a.ui.addButton&&a.ui.addButton("RemoveFormat",{label:a.lang.removeformat.toolbar,command:"removeFormat",toolbar:"cleanup,10"})}});
CKEDITOR.plugins.removeformat={commands:{removeformat:{exec:function(a){for(var h=a._.removeFormatRegex||(a._.removeFormatRegex=RegExp("^(?:"+a.config.removeFormatTags.replace(/,/g,"|")+")$","i")),e=a._.removeAttributes||(a._.removeAttributes=a.config.removeFormatAttributes.split(",")),f=CKEDITOR.plugins.removeformat.filter,k=a.getSelection().getRanges(),l=k.createIterator(),m=function(a){return a.type==CKEDITOR.NODE_ELEMENT},c;c=l.getNextRange();){c.collapsed||c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
var j=c.createBookmark(),b=j.startNode,d=j.endNode,i=function(b){for(var c=a.elementPath(b),e=c.elements,d=1,g;(g=e[d])&&!g.equals(c.block)&&!g.equals(c.blockLimit);d++)h.test(g.getName())&&f(a,g)&&b.breakParent(g)};i(b);if(d){i(d);for(b=b.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT);b&&!b.equals(d);)if(b.isReadOnly()){if(b.getPosition(d)&CKEDITOR.POSITION_CONTAINS)break;b=b.getNext(m)}else i=b.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT),!("img"==b.getName()&&b.data("cke-realelement"))&&f(a,b)&&(h.test(b.getName())?
b.remove(1):(b.removeAttributes(e),a.fire("removeFormatCleanup",b))),b=i}c.moveToBookmark(j)}a.forceNextSelectionCheck();a.getSelection().selectRanges(k)}}},filter:function(a,h){for(var e=a._.removeFormatFilters||[],f=0;f<e.length;f++)if(!1===e[f](h))return!1;return!0}};CKEDITOR.editor.prototype.addRemoveFormatFilter=function(a){this._.removeFormatFilters||(this._.removeFormatFilters=[]);this._.removeFormatFilters.push(a)};CKEDITOR.config.removeFormatTags="b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var";
CKEDITOR.config.removeFormatAttributes="class,style,lang,width,height,align,hspace,valign";(function(){var b={readOnly:1,exec:function(a){if(a.fire("save")&&(a=a.element.$.form))try{a.submit()}catch(b){a.submit.click&&a.submit.click()}}};CKEDITOR.plugins.add("save",{init:function(a){a.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(a.addCommand("save",b).modes={wysiwyg:!!a.element.$.form},a.ui.addButton&&a.ui.addButton("Save",{label:a.lang.save.toolbar,command:"save",toolbar:"document,10"}))}})})();(function(){CKEDITOR.plugins.add("selectall",{init:function(b){b.addCommand("selectAll",{modes:{wysiwyg:1,source:1},exec:function(a){var b=a.editable();if(b.is("textarea"))a=b.$,CKEDITOR.env.ie?a.createTextRange().execCommand("SelectAll"):(a.selectionStart=0,a.selectionEnd=a.value.length),a.focus();else{if(b.is("body"))a.document.$.execCommand("SelectAll",!1,null);else{var c=a.createRange();c.selectNodeContents(b);c.select()}a.forceNextSelectionCheck();a.selectionChange()}},canUndo:!1});b.ui.addButton&&
b.ui.addButton("SelectAll",{label:b.lang.selectall.toolbar,command:"selectAll",toolbar:"selection,10"})}})})();(function(){var i={readOnly:1,preserveState:!0,editorFocus:!1,exec:function(a){this.toggleState();this.refresh(a)},refresh:function(a){if(a.document){var c=this.state==CKEDITOR.TRISTATE_ON&&(a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE||a.focusManager.hasFocus)?"attachClass":"removeClass";a.editable()[c]("cke_show_blocks")}}};CKEDITOR.plugins.add("showblocks",{onLoad:function(){var a="p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "),c,b,e,f,i=CKEDITOR.getUrl(this.path),j=!(CKEDITOR.env.ie&&
9>CKEDITOR.env.version),g=j?":not([contenteditable=false]):not(.cke_show_blocks_off)":"",d,h;for(c=b=e=f="";d=a.pop();)h=a.length?",":"",c+=".cke_show_blocks "+d+g+h,e+=".cke_show_blocks.cke_contents_ltr "+d+g+h,f+=".cke_show_blocks.cke_contents_rtl "+d+g+h,b+=".cke_show_blocks "+d+g+"{background-image:url("+CKEDITOR.getUrl(i+"images/block_"+d+".png")+")}";CKEDITOR.addCss((c+"{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(b,e+"{background-position:top left;padding-left:8px}",
f+"{background-position:top right;padding-right:8px}"));j||CKEDITOR.addCss(".cke_show_blocks [contenteditable=false],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable=false],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable=false],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")},init:function(a){function c(){b.refresh(a)}
if(!a.blockless){var b=a.addCommand("showblocks",i);b.canUndo=!1;a.config.startupOutlineBlocks&&b.setState(CKEDITOR.TRISTATE_ON);a.ui.addButton&&a.ui.addButton("ShowBlocks",{label:a.lang.showblocks.toolbar,command:"showblocks",toolbar:"tools,20"});a.on("mode",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(a)});a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(a.on("focus",c),a.on("blur",c));a.on("contentDom",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(a)})}}})})();(function(){var f={preserveState:!0,editorFocus:!1,readOnly:1,exec:function(a){this.toggleState();this.refresh(a)},refresh:function(a){if(a.document){var b=this.state==CKEDITOR.TRISTATE_ON?"attachClass":"removeClass";a.editable()[b]("cke_show_borders")}}};CKEDITOR.plugins.add("showborders",{modes:{wysiwyg:1},onLoad:function(){var a;a=(CKEDITOR.env.ie6Compat?[".%1 table.%2,",".%1 table.%2 td, .%1 table.%2 th","{","border : #d3d3d3 1px dotted","}"]:".%1 table.%2,;.%1 table.%2 > tr > td, .%1 table.%2 > tr > th,;.%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,;.%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,;.%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
"cke_show_border").replace(/%1/g,"cke_show_borders ");CKEDITOR.addCss(a)},init:function(a){var b=a.addCommand("showborders",f);b.canUndo=!1;!1!==a.config.startupShowBorders&&b.setState(CKEDITOR.TRISTATE_ON);a.on("mode",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(a)},null,null,100);a.on("contentDom",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(a)});a.on("removeFormatCleanup",function(d){d=d.data;a.getCommand("showborders").state==CKEDITOR.TRISTATE_ON&&(d.is("table")&&(!d.hasAttribute("border")||
0>=parseInt(d.getAttribute("border"),10)))&&d.addClass("cke_show_border")})},afterInit:function(a){var b=a.dataProcessor,a=b&&b.dataFilter,b=b&&b.htmlFilter;a&&a.addRules({elements:{table:function(a){var a=a.attributes,b=a["class"],c=parseInt(a.border,10);if((!c||0>=c)&&(!b||-1==b.indexOf("cke_show_border")))a["class"]=(b||"")+" cke_show_border"}}});b&&b.addRules({elements:{table:function(a){var a=a.attributes,b=a["class"];b&&(a["class"]=b.replace("cke_show_border","").replace(/\s{2}/," ").replace(/^\s+|\s+$/,
""))}}})}});CKEDITOR.on("dialogDefinition",function(a){var b=a.data.name;if("table"==b||"tableProperties"==b)if(a=a.data.definition,b=a.getContents("info").get("txtBorder"),b.commit=CKEDITOR.tools.override(b.commit,function(a){return function(b,c){a.apply(this,arguments);var e=parseInt(this.getValue(),10);c[!e||0>=e?"addClass":"removeClass"]("cke_show_border")}}),a=(a=a.getContents("advanced"))&&a.get("advCSSClasses"))a.setup=CKEDITOR.tools.override(a.setup,function(a){return function(){a.apply(this,
arguments);this.setValue(this.getValue().replace(/cke_show_border/,""))}}),a.commit=CKEDITOR.tools.override(a.commit,function(a){return function(b,c){a.apply(this,arguments);parseInt(c.getAttribute("border"),10)||c.addClass("cke_show_border")}})})})();(function(){CKEDITOR.plugins.add("sourcearea",{init:function(a){function d(){var a=e&&this.equals(CKEDITOR.document.getActive());this.hide();this.setStyle("height",this.getParent().$.clientHeight+"px");this.setStyle("width",this.getParent().$.clientWidth+"px");this.show();a&&this.focus()}if(a.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var f=CKEDITOR.plugins.sourcearea;a.addMode("source",function(e){var b=a.ui.space("contents").getDocument().createElement("textarea");b.setStyles(CKEDITOR.tools.extend({width:CKEDITOR.env.ie7Compat?
"99%":"100%",height:"100%",resize:"none",outline:"none","text-align":"left"},CKEDITOR.tools.cssVendorPrefix("tab-size",a.config.sourceAreaTabSize||4)));b.setAttribute("dir","ltr");b.addClass("cke_source cke_reset cke_enable_context_menu");a.ui.space("contents").append(b);b=a.editable(new c(a,b));b.setData(a.getData(1));CKEDITOR.env.ie&&(b.attachListener(a,"resize",d,b),b.attachListener(CKEDITOR.document.getWindow(),"resize",d,b),CKEDITOR.tools.setTimeout(d,0,b));a.fire("ariaWidget",this);e()});a.addCommand("source",
f.commands.source);a.ui.addButton&&a.ui.addButton("Source",{label:a.lang.sourcearea.toolbar,command:"source",toolbar:"mode,10"});a.on("mode",function(){a.getCommand("source").setState("source"==a.mode?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)});var e=CKEDITOR.env.ie&&9==CKEDITOR.env.version}}});var c=CKEDITOR.tools.createClass({base:CKEDITOR.editable,proto:{setData:function(a){this.setValue(a);this.status="ready";this.editor.fire("dataReady")},getData:function(){return this.getValue()},insertHtml:function(){},
insertElement:function(){},insertText:function(){},setReadOnly:function(a){this[(a?"set":"remove")+"Attribute"]("readOnly","readonly")},detach:function(){c.baseProto.detach.call(this);this.clearCustomData();this.remove()}}})})();CKEDITOR.plugins.sourcearea={commands:{source:{modes:{wysiwyg:1,source:1},editorFocus:!1,readOnly:1,exec:function(c){"wysiwyg"==c.mode&&c.fire("saveSnapshot");c.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);c.setMode("source"==c.mode?"wysiwyg":"source")},canUndo:!1}}};CKEDITOR.plugins.add("specialchar",{availableLangs:{af:1,ar:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,el:1,en:1,"en-gb":1,eo:1,es:1,et:1,fa:1,fi:1,fr:1,"fr-ca":1,gl:1,he:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ku:1,lt:1,lv:1,nb:1,nl:1,no:1,pl:1,pt:1,"pt-br":1,ru:1,si:1,sk:1,sl:1,sq:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},requires:"dialog",init:function(a){var c=this;CKEDITOR.dialog.add("specialchar",this.path+"dialogs/specialchar.js");a.addCommand("specialchar",{exec:function(){var b=a.langCode,b=c.availableLangs[b]?
b:c.availableLangs[b.replace(/-.*/,"")]?b.replace(/-.*/,""):"en";CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path+"dialogs/lang/"+b+".js"),function(){CKEDITOR.tools.extend(a.lang.specialchar,c.langEntries[b]);a.openDialog("specialchar")})},modes:{wysiwyg:1},canUndo:!1});a.ui.addButton&&a.ui.addButton("SpecialChar",{label:a.lang.specialchar.toolbar,command:"specialchar",toolbar:"insert,50"})}});CKEDITOR.config.specialChars="! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" ");CKEDITOR.plugins.add("scayt",{requires:"menubutton,dialog",tabToOpen:null,dialogName:"scaytDialog",init:function(a){var c=this,d=CKEDITOR.plugins.scayt;this.bindEvents(a);this.parseConfig(a);this.addRule(a);CKEDITOR.dialog.add(this.dialogName,CKEDITOR.getUrl(this.path+"dialogs/options.js"));this.addMenuItems(a);var b=a.lang.scayt,e=CKEDITOR.env;a.ui.add("Scayt",CKEDITOR.UI_MENUBUTTON,{label:b.text_title,title:a.plugins.wsc?a.lang.wsc.title:b.text_title,modes:{wysiwyg:!(e.ie&&(8>e.version||e.quirks))},
toolbar:"spellchecker,20",refresh:function(){var b=a.ui.instances.Scayt.getState();a.scayt&&(b=d.state[a.name]?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);a.fire("scaytButtonState",b)},onRender:function(){var d=this;a.on("scaytButtonState",function(a){void 0!==typeof a.data&&d.setState(a.data)})},onMenu:function(){var b=a.scayt;a.getMenuItem("scaytToggle").label=a.lang.scayt[b&&d.state[a.name]?"btn_disable":"btn_enable"];b={scaytToggle:CKEDITOR.TRISTATE_OFF,scaytOptions:b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,
scaytLangs:b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytDict:b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,scaytAbout:b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,WSC:a.plugins.wsc?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};a.config.scayt_uiTabs[0]||delete b.scaytOptions;a.config.scayt_uiTabs[1]||delete b.scaytLangs;a.config.scayt_uiTabs[2]||delete b.scaytDict;return b}});a.contextMenu&&a.addMenuItems&&(a.contextMenu.addListener(function(){var d=a.scayt,b;if(d){var e=
d.getSelectionNode();if(e=e?e.getAttribute(d.getNodeAttribute()):e)b=c.menuGenerator(a,e,c),d.showBanner("."+a.contextMenu._.definition.panel.className.split(" ").join(" ."))}return b}),a.contextMenu._.onHide=CKEDITOR.tools.override(a.contextMenu._.onHide,function(d){return function(){var b=a.scayt;b&&b.hideBanner();return d.apply(this)}}))},addMenuItems:function(a){var c=this,d=CKEDITOR.plugins.scayt;a.addMenuGroup("scaytButton");var b=a.config.scayt_contextMenuItemsOrder.split("|");if(b&&b.length)for(var e=
0;e<b.length;e++)a.addMenuGroup("scayt_"+b[e],e-10);b={scaytToggle:{label:a.lang.scayt.btn_enable,group:"scaytButton",onClick:function(){var b=a.scayt;d.state[a.name]=!d.state[a.name];!0===d.state[a.name]?b||d.createScayt(a):b&&d.destroy(a)}},scaytAbout:{label:a.lang.scayt.btn_about,group:"scaytButton",onClick:function(){a.scayt.tabToOpen="about";a.lockSelection();a.openDialog(c.dialogName)}},scaytOptions:{label:a.lang.scayt.btn_options,group:"scaytButton",onClick:function(){a.scayt.tabToOpen="options";
a.lockSelection();a.openDialog(c.dialogName)}},scaytLangs:{label:a.lang.scayt.btn_langs,group:"scaytButton",onClick:function(){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(c.dialogName)}},scaytDict:{label:a.lang.scayt.btn_dictionaries,group:"scaytButton",onClick:function(){a.scayt.tabToOpen="dictionaries";a.lockSelection();a.openDialog(c.dialogName)}}};a.plugins.wsc&&(b.WSC={label:a.lang.wsc.toolbar,group:"scaytButton",onClick:function(){var d=CKEDITOR.plugins.scayt,b=a.scayt,c=a.elementMode==
CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():a.document.getBody().getText();(c=c.replace(/\s/g,""))?(b&&(d.state[a.name]&&b.setMarkupPaused)&&b.setMarkupPaused(!0),a.lockSelection(),a.execCommand("checkspell")):alert("Nothing to check!")}});a.addMenuItems(b)},bindEvents:function(a){function c(){var d=a.scayt;d&&(d.removeMarkupInSelectionNode(),d.fire("startSpellCheck"))}var d=CKEDITOR.plugins.scayt,b=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE;CKEDITOR.on("dialogDefinition",function(a){if("scaytDialog"===
a.data.name)a.data.definition.dialog.on("cancel",function(){return!1},this,null,-1)});var e=function(){a.scayt&&d.destroy(a)},g=function(){d.state[a.name]&&!a.readOnly&&d.createScayt(a)},f=function(){var d=a.editable();d.attachListener(d,"focus",function(){var d=CKEDITOR.plugins.scayt&&CKEDITOR.plugins.scayt.state[a.name]&&a.scayt,c,e;if((b||d)&&a._.savedSelection)for(var d=a._.savedSelection.getSelectedElement(),d=!d&&a._.savedSelection.getRanges(),i=0;i<d.length;i++)e=d[i],c=e.startContainer.getText().length,
(c<e.startOffset||c<e.endOffset)&&a.unlockSelection(!1)},this,null,-10)},h=function(){b?(a.on("blur",e),a.on("focus",g),a.focusManager.hasFocus&&g()):g();f()};a.on("contentDom",h);a.on("beforeCommandExec",function(b){var c;if(b.data.name in d.options.disablingCommandExec&&"wysiwyg"==a.mode){if(c=a.scayt)d.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED)}else if("bold"===b.data.name||"italic"===b.data.name||"underline"===b.data.name||"strike"===b.data.name||"subscript"===b.data.name||
"superscript"===b.data.name)if(c=a.scayt)c.removeMarkupInSelectionNode(),setTimeout(function(){c.fire("startSpellCheck")},0)});a.on("beforeSetMode",function(b){if("source"==b.data){if(b=a.scayt)d.destroy(a),a.fire("scaytButtonState",CKEDITOR.TRISTATE_DISABLED);a.document&&(a.document.getBody().removeAttribute("_jquid"),a.document.getBody().removeAttribute("dir"))}});a.on("afterCommandExec",function(d){var b;if("wysiwyg"==a.mode&&("undo"==d.data.name||"redo"==d.data.name))(b=a.scayt)&&setTimeout(function(){b.fire("startSpellCheck")},
250)});a.on("readOnly",function(b){var c;b&&(c=a.scayt,!0===b.editor.readOnly?c&&c.fire("removeMarkupInDocument",{}):c?c.fire("startSpellCheck"):"wysiwyg"==b.editor.mode&&!0===d.state[b.editor.name]&&(d.createScayt(a),b.editor.fire("scaytButtonState",CKEDITOR.TRISTATE_ON)))});a.on("beforeDestroy",e);a.on("setData",function(){e();a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&h()},this,null,50);a.on("insertElement",function(){CKEDITOR.env.ie?setTimeout(function(){c()},50):c()},this,null,50);a.on("insertHtml",
function(){c()},this,null,50);a.on("insertText",function(){c()},this,null,50);a.on("scaytDialogShown",function(d){d.data.selectPage(a.scayt.tabToOpen)})},parseConfig:function(a){var c=CKEDITOR.plugins.scayt;c.replaceOldOptionsNames(a.config);"boolean"!==typeof a.config.scayt_autoStartup&&(a.config.scayt_autoStartup=!1);c.state[a.name]=a.config.scayt_autoStartup;a.config.scayt_contextCommands||(a.config.scayt_contextCommands="ignore|ignoreall|add");a.config.scayt_contextMenuItemsOrder||(a.config.scayt_contextMenuItemsOrder=
"suggest|moresuggest|control");a.config.scayt_sLang||(a.config.scayt_sLang="en_US");if(void 0===a.config.scayt_maxSuggestions||"number"!=typeof a.config.scayt_maxSuggestions||0>a.config.scayt_maxSuggestions)a.config.scayt_maxSuggestions=5;if(void 0===a.config.scayt_customDictionaryIds||"string"!==typeof a.config.scayt_customDictionaryIds)a.config.scayt_customDictionaryIds="";if(void 0===a.config.scayt_userDictionaryName||"string"!==typeof a.config.scayt_userDictionaryName)a.config.scayt_userDictionaryName=
null;if("string"===typeof a.config.scayt_uiTabs&&3===a.config.scayt_uiTabs.split(",").length){var d=[],b=[];a.config.scayt_uiTabs=a.config.scayt_uiTabs.split(",");CKEDITOR.tools.search(a.config.scayt_uiTabs,function(a){if(Number(a)===1||Number(a)===0){b.push(true);d.push(Number(a))}else b.push(false)});a.config.scayt_uiTabs=null===CKEDITOR.tools.search(b,!1)?d:[1,1,1]}else a.config.scayt_uiTabs=[1,1,1];"string"!=typeof a.config.scayt_serviceProtocol&&(a.config.scayt_serviceProtocol=null);"string"!=
typeof a.config.scayt_serviceHost&&(a.config.scayt_serviceHost=null);"string"!=typeof a.config.scayt_servicePort&&(a.config.scayt_servicePort=null);"string"!=typeof a.config.scayt_servicePath&&(a.config.scayt_servicePath=null);a.config.scayt_moreSuggestions||(a.config.scayt_moreSuggestions="on");"string"!==typeof a.config.scayt_customerId&&(a.config.scayt_customerId="1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");"string"!==typeof a.config.scayt_srcUrl&&(c=document.location.protocol,
c=-1!=c.search(/https?:/)?c:"http:",a.config.scayt_srcUrl=c+"//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");"boolean"!==typeof CKEDITOR.config.scayt_handleCheckDirty&&(CKEDITOR.config.scayt_handleCheckDirty=!0);"boolean"!==typeof CKEDITOR.config.scayt_handleUndoRedo&&(CKEDITOR.config.scayt_handleUndoRedo=!0);if(a.config.scayt_disableOptionsStorage){var c=CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage)?a.config.scayt_disableOptionsStorage:"string"===typeof a.config.scayt_disableOptionsStorage?
[a.config.scayt_disableOptionsStorage]:void 0,e="all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),g=["lang","ignore-all-caps-words","ignore-domain-names","ignore-words-with-mixed-cases","ignore-words-with-numbers"],f=CKEDITOR.tools.search,h=CKEDITOR.tools.indexOf;a.config.scayt_disableOptionsStorage=function(a){for(var d=[],b=0;b<a.length;b++){var c=a[b],j=!!f(a,"options");if(!f(e,c)||j&&f(g,function(a){if(a==="lang")return false}))return;
f(g,c)&&g.splice(h(g,c),1);if(c==="all"||j&&f(a,"lang"))return[];c==="options"&&(g=["lang"])}return d=d.concat(g)}(c)}},addRule:function(a){var c=a.dataProcessor,d=c&&c.htmlFilter,b=a._.elementsPath&&a._.elementsPath.filters,c=c&&c.dataFilter,e=a.addRemoveFormatFilter,g=function(d){var b=CKEDITOR.plugins.scayt;if(a.scayt&&d.hasAttribute(b.options.data_attribute_name))return!1},f=function(d){var b=CKEDITOR.plugins.scayt,c=!0;a.scayt&&d.hasAttribute(b.options.data_attribute_name)&&(c=!1);return c};
b&&b.push(g);c&&c.addRules({elements:{span:function(d){var b=CKEDITOR.plugins.scayt;b&&(b.state[a.name]&&d.classes&&CKEDITOR.tools.search(d.classes,b.options.misspelled_word_class))&&(d.classes&&d.parent.type===CKEDITOR.NODE_DOCUMENT_FRAGMENT?(delete d.attributes.style,delete d.name):delete d.classes[CKEDITOR.tools.indexOf(d.classes,b.options.misspelled_word_class)]);return d}}});d&&d.addRules({elements:{span:function(d){var b=CKEDITOR.plugins.scayt;b&&(b.state[a.name]&&d.hasClass(b.options.misspelled_word_class)&&
d.attributes[b.options.data_attribute_name])&&(d.removeClass(b.options.misspelled_word_class),delete d.attributes[b.options.data_attribute_name],delete d.name);return d}}});e&&e.call(a,f)},scaytMenuDefinition:function(a){var c=this,a=a.scayt;return{scayt_ignore:{label:a.getLocal("btn_ignore"),group:"scayt_control",order:1,exec:function(a){a.scayt.ignoreWord()}},scayt_ignoreall:{label:a.getLocal("btn_ignoreAll"),group:"scayt_control",order:2,exec:function(a){a.scayt.ignoreAllWords()}},scayt_add:{label:a.getLocal("btn_addWord"),
group:"scayt_control",order:3,exec:function(a){var b=a.scayt;setTimeout(function(){b.addWordToUserDictionary()},10)}},option:{label:a.getLocal("btn_options"),group:"scayt_control",order:4,exec:function(a){a.scayt.tabToOpen="options";a.lockSelection();a.openDialog(c.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[0]?!0:!1}},language:{label:a.getLocal("btn_langs"),group:"scayt_control",order:5,exec:function(a){a.scayt.tabToOpen="langs";a.lockSelection();a.openDialog(c.dialogName)},
verification:function(a){return 1==a.config.scayt_uiTabs[1]?!0:!1}},dictionary:{label:a.getLocal("btn_dictionaries"),group:"scayt_control",order:6,exec:function(a){a.scayt.tabToOpen="dictionaries";a.lockSelection();a.openDialog(c.dialogName)},verification:function(a){return 1==a.config.scayt_uiTabs[2]?!0:!1}},about:{label:a.getLocal("btn_about"),group:"scayt_control",order:7,exec:function(a){a.scayt.tabToOpen="about";a.lockSelection();a.openDialog(c.dialogName)}}}},buildSuggestionMenuItems:function(a,
c){var d={},b={},e=a.scayt;if(0<c.length&&"no_any_suggestions"!==c[0])for(var g=0;g<c.length;g++){var f="scayt_suggest_"+CKEDITOR.plugins.scayt.suggestions[g].replace(" ","_");a.addCommand(f,this.createCommand(CKEDITOR.plugins.scayt.suggestions[g]));g<a.config.scayt_maxSuggestions?(a.addMenuItem(f,{label:c[g],command:f,group:"scayt_suggest",order:g+1}),d[f]=CKEDITOR.TRISTATE_OFF):(a.addMenuItem(f,{label:c[g],command:f,group:"scayt_moresuggest",order:g+1}),b[f]=CKEDITOR.TRISTATE_OFF,"on"===a.config.scayt_moreSuggestions&&
(a.addMenuItem("scayt_moresuggest",{label:e.getLocal("btn_moreSuggestions"),group:"scayt_moresuggest",order:10,getItems:function(){return b}}),d.scayt_moresuggest=CKEDITOR.TRISTATE_OFF))}else d.no_scayt_suggest=CKEDITOR.TRISTATE_DISABLED,a.addCommand("no_scayt_suggest",{exec:function(){}}),a.addMenuItem("no_scayt_suggest",{label:e.getLocal("btn_noSuggestions")||"no_scayt_suggest",command:"no_scayt_suggest",group:"scayt_suggest",order:0});return d},menuGenerator:function(a,c){var d=a.scayt,b=this.scaytMenuDefinition(a),
e={},g=a.config.scayt_contextCommands.split("|");d.fire("getSuggestionsList",{lang:d.getLang(),word:c});e=this.buildSuggestionMenuItems(a,CKEDITOR.plugins.scayt.suggestions);if("off"==a.config.scayt_contextCommands)return e;for(var f in b)-1==CKEDITOR.tools.indexOf(g,f.replace("scayt_",""))&&"all"!=a.config.scayt_contextCommands||(e[f]=CKEDITOR.TRISTATE_OFF,"function"===typeof b[f].verification&&!b[f].verification(a)&&delete e[f],a.addCommand(f,{exec:b[f].exec}),a.addMenuItem(f,{label:a.lang.scayt[b[f].label]||
b[f].label,command:f,group:b[f].group,order:b[f].order}));return e},createCommand:function(a){return{exec:function(c){c.scayt.replaceSelectionNode({word:a})}}}});
CKEDITOR.plugins.scayt={state:{},suggestions:[],loadingHelper:{loadOrder:[]},isLoading:!1,options:{disablingCommandExec:{source:!0,newpage:!0,templates:!0},data_attribute_name:"data-scayt-word",misspelled_word_class:"scayt-misspell-word"},backCompatibilityMap:{scayt_service_protocol:"scayt_serviceProtocol",scayt_service_host:"scayt_serviceHost",scayt_service_port:"scayt_servicePort",scayt_service_path:"scayt_servicePath",scayt_customerid:"scayt_customerId"},replaceOldOptionsNames:function(a){for(var c in a)c in
this.backCompatibilityMap&&(a[this.backCompatibilityMap[c]]=a[c],delete a[c])},createScayt:function(a){var c=this;this.loadScaytLibrary(a,function(a){var b={lang:a.config.scayt_sLang,container:"BODY"==a.editable().$.nodeName?a.document.getWindow().$.frameElement:a.editable().$,customDictionary:a.config.scayt_customDictionaryIds,userDictionaryName:a.config.scayt_userDictionaryName,localization:a.langCode,customer_id:a.config.scayt_customerId,debug:a.config.scayt_debug,data_attribute_name:c.options.data_attribute_name,
misspelled_word_class:c.options.misspelled_word_class,"options-to-restore":a.config.scayt_disableOptionsStorage,focused:a.editable().hasFocus,ignoreElementsRegex:a.config.scayt_elementsToIgnore};a.config.scayt_serviceProtocol&&(b.service_protocol=a.config.scayt_serviceProtocol);a.config.scayt_serviceHost&&(b.service_host=a.config.scayt_serviceHost);a.config.scayt_servicePort&&(b.service_port=a.config.scayt_servicePort);a.config.scayt_servicePath&&(b.service_path=a.config.scayt_servicePath);b=new SCAYT.CKSCAYT(b,
function(){},function(){});b.subscribe("suggestionListSend",function(a){for(var b={},d=[],c=0;c<a.suggestionList.length;c++)if(!b["word_"+a.suggestionList[c]]){b["word_"+a.suggestionList[c]]=a.suggestionList[c];d.push(a.suggestionList[c])}CKEDITOR.plugins.scayt.suggestions=d});a.scayt=b;a.fire("scaytButtonState",a.readOnly?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_ON)})},destroy:function(a){a.scayt&&a.scayt.destroy();delete a.scayt;a.fire("scaytButtonState",CKEDITOR.TRISTATE_OFF)},loadScaytLibrary:function(a,
c){var d=this;"undefined"===typeof window.SCAYT||"function"!==typeof window.SCAYT.CKSCAYT?(this.loadingHelper[a.name]=c,this.loadingHelper.loadOrder.push(a.name),CKEDITOR.scriptLoader.load(a.config.scayt_srcUrl,function(){var a;CKEDITOR.fireOnce("scaytReady");for(var c=0;c<d.loadingHelper.loadOrder.length;c++){a=d.loadingHelper.loadOrder[c];if("function"===typeof d.loadingHelper[a])d.loadingHelper[a](CKEDITOR.instances[a]);delete d.loadingHelper[a]}d.loadingHelper.loadOrder=[]})):window.SCAYT&&"function"===
typeof window.SCAYT.CKSCAYT&&(CKEDITOR.fireOnce("scaytReady"),a.scayt||"function"===typeof c&&c(a))}};
CKEDITOR.on("scaytReady",function(){if(!0===CKEDITOR.config.scayt_handleCheckDirty){var a=CKEDITOR.editor.prototype;a.checkDirty=CKEDITOR.tools.override(a.checkDirty,function(a){return function(){var b=null,c=this.scayt;if(!CKEDITOR.plugins.scayt||!CKEDITOR.plugins.scayt.state[this.name]||!this.scayt)b=a.call(this);else if(b="ready"==this.status)var g=c.removeMarkupFromString(this.getSnapshot()),c=c.removeMarkupFromString(this._.previousValue),b=b&&c!==g;return b}});a.resetDirty=CKEDITOR.tools.override(a.resetDirty,
function(a){return function(){var b=this.scayt;!CKEDITOR.plugins.scayt||!CKEDITOR.plugins.scayt.state[this.name]||!this.scayt?a.call(this):this._.previousValue=b.removeMarkupFromString(this.getSnapshot())}})}if(!0===CKEDITOR.config.scayt_handleUndoRedo){var a=CKEDITOR.plugins.undo.Image.prototype,c="function"==typeof a.equalsContent?"equalsContent":"equals";a[c]=CKEDITOR.tools.override(a[c],function(a){return function(b){var c=b.editor.scayt,g=this.contents,f=b.contents,h=null;CKEDITOR.plugins.scayt&&
(CKEDITOR.plugins.scayt.state[b.editor.name]&&b.editor.scayt)&&(this.contents=c.removeMarkupFromString(g)||"",b.contents=c.removeMarkupFromString(f)||"");h=a.apply(this,arguments);this.contents=g;b.contents=f;return h}})}});(function(){CKEDITOR.plugins.add("stylescombo",{requires:"richcombo",init:function(c){var j=c.config,g=c.lang.stylescombo,f={},i=[],k=[];c.on("stylesSet",function(b){if(b=b.data.styles){for(var a,h,d,e=0,l=b.length;e<l;e++)if(a=b[e],!(c.blockless&&a.element in CKEDITOR.dtd.$block)&&(h=a.name,a=new CKEDITOR.style(a),!c.filter.customConfig||c.filter.check(a)))a._name=h,a._.enterMode=j.enterMode,a._.type=d=a.assignedTo||a.type,a._.weight=e+1E3*(d==CKEDITOR.STYLE_OBJECT?1:d==CKEDITOR.STYLE_BLOCK?2:3),
f[h]=a,i.push(a),k.push(a);i.sort(function(a,b){return a._.weight-b._.weight})}});c.ui.addRichCombo("Styles",{label:g.label,title:g.panelTitle,toolbar:"styles,10",allowedContent:k,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(j.contentsCss),multiSelect:!0,attributes:{"aria-label":g.panelTitle}},init:function(){var b,a,c,d,e,f;e=0;for(f=i.length;e<f;e++)b=i[e],a=b._name,d=b._.type,d!=c&&(this.startGroup(g["panelTitle"+d]),c=d),this.add(a,b.type==CKEDITOR.STYLE_OBJECT?a:b.buildPreview(),a);this.commit()},
onClick:function(b){c.focus();c.fire("saveSnapshot");var b=f[b],a=c.elementPath();c[b.checkActive(a,c)?"removeStyle":"applyStyle"](b);c.fire("saveSnapshot")},onRender:function(){c.on("selectionChange",function(b){for(var a=this.getValue(),b=b.data.path.elements,h=0,d=b.length,e;h<d;h++){e=b[h];for(var g in f)if(f[g].checkElementRemovable(e,!0,c)){g!=a&&this.setValue(g);return}}this.setValue("")},this)},onOpen:function(){var b=c.getSelection().getSelectedElement(),b=c.elementPath(b),a=[0,0,0,0];this.showAll();
this.unmarkAll();for(var h in f){var d=f[h],e=d._.type;d.checkApplicable(b,c,c.activeFilter)?a[e]++:this.hideItem(h);d.checkActive(b,c)&&this.mark(h)}a[CKEDITOR.STYLE_BLOCK]||this.hideGroup(g["panelTitle"+CKEDITOR.STYLE_BLOCK]);a[CKEDITOR.STYLE_INLINE]||this.hideGroup(g["panelTitle"+CKEDITOR.STYLE_INLINE]);a[CKEDITOR.STYLE_OBJECT]||this.hideGroup(g["panelTitle"+CKEDITOR.STYLE_OBJECT])},refresh:function(){var b=c.elementPath();if(b){for(var a in f)if(f[a].checkApplicable(b,c,c.activeFilter))return;
this.setState(CKEDITOR.TRISTATE_DISABLED)}},reset:function(){f={};i=[]}})}})})();(function(){function i(c){return{editorFocus:!1,canUndo:!1,modes:{wysiwyg:1},exec:function(d){if(d.editable().hasFocus){var e=d.getSelection(),b;if(b=(new CKEDITOR.dom.elementPath(e.getCommonAncestor(),e.root)).contains({td:1,th:1},1)){var e=d.createRange(),a=CKEDITOR.tools.tryThese(function(){var a=b.getParent().$.cells[b.$.cellIndex+(c?-1:1)];a.parentNode.parentNode;return a},function(){var a=b.getParent(),a=a.getAscendant("table").$.rows[a.$.rowIndex+(c?-1:1)];return a.cells[c?a.cells.length-1:
0]});if(!a&&!c){for(var f=b.getAscendant("table").$,a=b.getParent().$.cells,f=new CKEDITOR.dom.element(f.insertRow(-1),d.document),g=0,h=a.length;g<h;g++)f.append((new CKEDITOR.dom.element(a[g],d.document)).clone(!1,!1)).appendBogus();e.moveToElementEditStart(f)}else if(a)a=new CKEDITOR.dom.element(a),e.moveToElementEditStart(a),(!e.checkStartOfBlock()||!e.checkEndOfBlock())&&e.selectNodeContents(a);else return!0;e.select(!0);return!0}}return!1}}}var h={editorFocus:!1,modes:{wysiwyg:1,source:1}},
g={exec:function(c){c.container.focusNext(!0,c.tabIndex)}},f={exec:function(c){c.container.focusPrevious(!0,c.tabIndex)}};CKEDITOR.plugins.add("tab",{init:function(c){for(var d=!1!==c.config.enableTabKeyTools,e=c.config.tabSpaces||0,b="";e--;)b+=" ";if(b)c.on("key",function(a){9==a.data.keyCode&&(c.insertHtml(b),a.cancel())});if(d)c.on("key",function(a){(9==a.data.keyCode&&c.execCommand("selectNextCell")||a.data.keyCode==CKEDITOR.SHIFT+9&&c.execCommand("selectPreviousCell"))&&a.cancel()});c.addCommand("blur",
CKEDITOR.tools.extend(g,h));c.addCommand("blurBack",CKEDITOR.tools.extend(f,h));c.addCommand("selectNextCell",i());c.addCommand("selectPreviousCell",i(!0))}})})();
CKEDITOR.dom.element.prototype.focusNext=function(i,h){var g=void 0===h?this.getTabIndex():h,f,c,d,e,b,a;if(0>=g)for(b=this.getNextSourceNode(i,CKEDITOR.NODE_ELEMENT);b;){if(b.isVisible()&&0===b.getTabIndex()){d=b;break}b=b.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT)}else for(b=this.getDocument().getBody().getFirst();b=b.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!f)if(!c&&b.equals(this)){if(c=!0,i){if(!(b=b.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;f=1}}else c&&!this.contains(b)&&
(f=1);if(b.isVisible()&&!(0>(a=b.getTabIndex()))){if(f&&a==g){d=b;break}a>g&&(!d||!e||a<e)?(d=b,e=a):!d&&0===a&&(d=b,e=a)}}d&&d.focus()};
CKEDITOR.dom.element.prototype.focusPrevious=function(i,h){for(var g=void 0===h?this.getTabIndex():h,f,c,d,e=0,b,a=this.getDocument().getBody().getLast();a=a.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!f)if(!c&&a.equals(this)){if(c=!0,i){if(!(a=a.getPreviousSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;f=1}}else c&&!this.contains(a)&&(f=1);if(a.isVisible()&&!(0>(b=a.getTabIndex())))if(0>=g){if(f&&0===b){d=a;break}b>e&&(d=a,e=b)}else{if(f&&b==g){d=a;break}if(b<g&&(!d||b>e))d=a,e=b}}d&&d.focus()};CKEDITOR.plugins.add("table",{requires:"dialog",init:function(a){function e(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,f){this.setState(f.contains("table",1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}if(!a.blockless){var c=a.lang.table;a.addCommand("table",new CKEDITOR.dialogCommand("table",{context:"table",allowedContent:"table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];"+(a.plugins.dialogadvtab?
"table"+a.plugins.dialogadvtab.allowedContent():""),requiredContent:"table",contentTransformations:[["table{width}: sizeToStyle","table[width]: sizeToAttribute"]]}));a.addCommand("tableProperties",new CKEDITOR.dialogCommand("tableProperties",e()));a.addCommand("tableDelete",e({exec:function(a){var b=a.elementPath().contains("table",1);if(b){var d=b.getParent(),c=a.editable();1==d.getChildCount()&&(!d.is("td","th")&&!d.equals(c))&&(b=d);a=a.createRange();a.moveToPosition(b,CKEDITOR.POSITION_BEFORE_START);
b.remove();a.select()}}}));a.ui.addButton&&a.ui.addButton("Table",{label:c.toolbar,command:"table",toolbar:"insert,30"});CKEDITOR.dialog.add("table",this.path+"dialogs/table.js");CKEDITOR.dialog.add("tableProperties",this.path+"dialogs/table.js");a.addMenuItems&&a.addMenuItems({table:{label:c.menu,command:"tableProperties",group:"table",order:5},tabledelete:{label:c.deleteTable,command:"tableDelete",group:"table",order:1}});a.on("doubleclick",function(a){a.data.element.is("table")&&(a.data.dialog=
"tableProperties")});a.contextMenu&&a.contextMenu.addListener(function(){return{tabledelete:CKEDITOR.TRISTATE_OFF,table:CKEDITOR.TRISTATE_OFF}})}}});(function(){function p(e){function d(a){!(0<b.length)&&(a.type==CKEDITOR.NODE_ELEMENT&&y.test(a.getName())&&!a.getCustomData("selected_cell"))&&(CKEDITOR.dom.element.setMarker(c,a,"selected_cell",!0),b.push(a))}for(var e=e.getRanges(),b=[],c={},a=0;a<e.length;a++){var f=e[a];if(f.collapsed)f=f.getCommonAncestor(),(f=f.getAscendant("td",!0)||f.getAscendant("th",!0))&&b.push(f);else{var f=new CKEDITOR.dom.walker(f),g;for(f.guard=d;g=f.next();)if(g.type!=CKEDITOR.NODE_ELEMENT||!g.is(CKEDITOR.dtd.table))if((g=
g.getAscendant("td",!0)||g.getAscendant("th",!0))&&!g.getCustomData("selected_cell"))CKEDITOR.dom.element.setMarker(c,g,"selected_cell",!0),b.push(g)}}CKEDITOR.dom.element.clearAllMarkers(c);return b}function o(e,d){for(var b=p(e),c=b[0],a=c.getAscendant("table"),c=c.getDocument(),f=b[0].getParent(),g=f.$.rowIndex,b=b[b.length-1],h=b.getParent().$.rowIndex+b.$.rowSpan-1,b=new CKEDITOR.dom.element(a.$.rows[h]),g=d?g:h,f=d?f:b,b=CKEDITOR.tools.buildTableMap(a),a=b[g],g=d?b[g-1]:b[g+1],b=b[0].length,
c=c.createElement("tr"),h=0;a[h]&&h<b;h++){var i;1<a[h].rowSpan&&g&&a[h]==g[h]?(i=a[h],i.rowSpan+=1):(i=(new CKEDITOR.dom.element(a[h])).clone(),i.removeAttribute("rowSpan"),i.appendBogus(),c.append(i),i=i.$);h+=i.colSpan-1}d?c.insertBefore(f):c.insertAfter(f)}function q(e){if(e instanceof CKEDITOR.dom.selection){for(var d=p(e),b=d[0].getAscendant("table"),c=CKEDITOR.tools.buildTableMap(b),e=d[0].getParent().$.rowIndex,d=d[d.length-1],a=d.getParent().$.rowIndex+d.$.rowSpan-1,d=[],f=e;f<=a;f++){for(var g=
c[f],h=new CKEDITOR.dom.element(b.$.rows[f]),i=0;i<g.length;i++){var j=new CKEDITOR.dom.element(g[i]),l=j.getParent().$.rowIndex;1==j.$.rowSpan?j.remove():(j.$.rowSpan-=1,l==f&&(l=c[f+1],l[i-1]?j.insertAfter(new CKEDITOR.dom.element(l[i-1])):(new CKEDITOR.dom.element(b.$.rows[f+1])).append(j,1)));i+=j.$.colSpan-1}d.push(h)}c=b.$.rows;b=new CKEDITOR.dom.element(c[a+1]||(0<e?c[e-1]:null)||b.$.parentNode);for(f=d.length;0<=f;f--)q(d[f]);return b}e instanceof CKEDITOR.dom.element&&(b=e.getAscendant("table"),
1==b.$.rows.length?b.remove():e.remove());return null}function r(e,d){for(var b=d?Infinity:0,c=0;c<e.length;c++){var a;a=e[c];for(var f=d,g=a.getParent().$.cells,h=0,i=0;i<g.length;i++){var j=g[i],h=h+(f?1:j.colSpan);if(j==a.$)break}a=h-1;if(d?a<b:a>b)b=a}return b}function k(e,d){for(var b=p(e),c=b[0].getAscendant("table"),a=r(b,1),b=r(b),a=d?a:b,f=CKEDITOR.tools.buildTableMap(c),c=[],b=[],g=f.length,h=0;h<g;h++)c.push(f[h][a]),b.push(d?f[h][a-1]:f[h][a+1]);for(h=0;h<g;h++)c[h]&&(1<c[h].colSpan&&
b[h]==c[h]?(a=c[h],a.colSpan+=1):(a=(new CKEDITOR.dom.element(c[h])).clone(),a.removeAttribute("colSpan"),a.appendBogus(),a[d?"insertBefore":"insertAfter"].call(a,new CKEDITOR.dom.element(c[h])),a=a.$),h+=a.rowSpan-1)}function u(e,d){var b=e.getStartElement();if(b=b.getAscendant("td",1)||b.getAscendant("th",1)){var c=b.clone();c.appendBogus();d?c.insertBefore(b):c.insertAfter(b)}}function t(e){if(e instanceof CKEDITOR.dom.selection){var e=p(e),d=e[0]&&e[0].getAscendant("table"),b;a:{var c=0;b=e.length-
1;for(var a={},f,g;f=e[c++];)CKEDITOR.dom.element.setMarker(a,f,"delete_cell",!0);for(c=0;f=e[c++];)if((g=f.getPrevious())&&!g.getCustomData("delete_cell")||(g=f.getNext())&&!g.getCustomData("delete_cell")){CKEDITOR.dom.element.clearAllMarkers(a);b=g;break a}CKEDITOR.dom.element.clearAllMarkers(a);g=e[0].getParent();(g=g.getPrevious())?b=g.getLast():(g=e[b].getParent(),b=(g=g.getNext())?g.getChild(0):null)}for(g=e.length-1;0<=g;g--)t(e[g]);b?m(b,!0):d&&d.remove()}else e instanceof CKEDITOR.dom.element&&
(d=e.getParent(),1==d.getChildCount()?d.remove():e.remove())}function m(e,d){var b=e.getDocument(),c=CKEDITOR.document;CKEDITOR.env.ie&&10==CKEDITOR.env.version&&(c.focus(),b.focus());b=new CKEDITOR.dom.range(b);if(!b["moveToElementEdit"+(d?"End":"Start")](e))b.selectNodeContents(e),b.collapse(d?!1:!0);b.select(!0)}function v(e,d,b){e=e[d];if("undefined"==typeof b)return e;for(d=0;e&&d<e.length;d++){if(b.is&&e[d]==b.$)return d;if(d==b)return new CKEDITOR.dom.element(e[d])}return b.is?-1:null}function s(e,
d,b){var c=p(e),a;if((d?1!=c.length:2>c.length)||(a=e.getCommonAncestor())&&a.type==CKEDITOR.NODE_ELEMENT&&a.is("table"))return!1;var f,e=c[0];a=e.getAscendant("table");var g=CKEDITOR.tools.buildTableMap(a),h=g.length,i=g[0].length,j=e.getParent().$.rowIndex,l=v(g,j,e);if(d){var n;try{var m=parseInt(e.getAttribute("rowspan"),10)||1;f=parseInt(e.getAttribute("colspan"),10)||1;n=g["up"==d?j-m:"down"==d?j+m:j]["left"==d?l-f:"right"==d?l+f:l]}catch(z){return!1}if(!n||e.$==n)return!1;c["up"==d||"left"==
d?"unshift":"push"](new CKEDITOR.dom.element(n))}for(var d=e.getDocument(),o=j,m=n=0,q=!b&&new CKEDITOR.dom.documentFragment(d),s=0,d=0;d<c.length;d++){f=c[d];var k=f.getParent(),t=f.getFirst(),r=f.$.colSpan,u=f.$.rowSpan,k=k.$.rowIndex,w=v(g,k,f),s=s+r*u,m=Math.max(m,w-l+r);n=Math.max(n,k-j+u);if(!b){r=f;(u=r.getBogus())&&u.remove();r.trim();if(f.getChildren().count()){if(k!=o&&t&&(!t.isBlockBoundary||!t.isBlockBoundary({br:1})))(o=q.getLast(CKEDITOR.dom.walker.whitespaces(!0)))&&(!o.is||!o.is("br"))&&
q.append("br");f.moveChildren(q)}d?f.remove():f.setHtml("")}o=k}if(b)return n*m==s;q.moveChildren(e);e.appendBogus();m>=i?e.removeAttribute("rowSpan"):e.$.rowSpan=n;n>=h?e.removeAttribute("colSpan"):e.$.colSpan=m;b=new CKEDITOR.dom.nodeList(a.$.rows);c=b.count();for(d=c-1;0<=d;d--)a=b.getItem(d),a.$.cells.length||(a.remove(),c++);return e}function w(e,d){var b=p(e);if(1<b.length)return!1;if(d)return!0;var b=b[0],c=b.getParent(),a=c.getAscendant("table"),f=CKEDITOR.tools.buildTableMap(a),g=c.$.rowIndex,
h=v(f,g,b),i=b.$.rowSpan,j;if(1<i){j=Math.ceil(i/2);for(var i=Math.floor(i/2),c=g+j,a=new CKEDITOR.dom.element(a.$.rows[c]),f=v(f,c),l,c=b.clone(),g=0;g<f.length;g++)if(l=f[g],l.parentNode==a.$&&g>h){c.insertBefore(new CKEDITOR.dom.element(l));break}else l=null;l||a.append(c)}else{i=j=1;a=c.clone();a.insertAfter(c);a.append(c=b.clone());l=v(f,g);for(h=0;h<l.length;h++)l[h].rowSpan++}c.appendBogus();b.$.rowSpan=j;c.$.rowSpan=i;1==j&&b.removeAttribute("rowSpan");1==i&&c.removeAttribute("rowSpan");return c}
function x(e,d){var b=p(e);if(1<b.length)return!1;if(d)return!0;var b=b[0],c=b.getParent(),a=c.getAscendant("table"),a=CKEDITOR.tools.buildTableMap(a),f=v(a,c.$.rowIndex,b),g=b.$.colSpan;if(1<g)c=Math.ceil(g/2),g=Math.floor(g/2);else{for(var g=c=1,h=[],i=0;i<a.length;i++){var j=a[i];h.push(j[f]);1<j[f].rowSpan&&(i+=j[f].rowSpan-1)}for(a=0;a<h.length;a++)h[a].colSpan++}a=b.clone();a.insertAfter(b);a.appendBogus();b.$.colSpan=c;a.$.colSpan=g;1==c&&b.removeAttribute("colSpan");1==g&&a.removeAttribute("colSpan");
return a}var y=/^(?:td|th)$/;CKEDITOR.plugins.tabletools={requires:"table,dialog,contextmenu",init:function(e){function d(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains({td:1,th:1},1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}function b(a,b){var c=e.addCommand(a,b);e.addFeature(c)}var c=e.lang.table;b("cellProperties",new CKEDITOR.dialogCommand("cellProperties",d({allowedContent:"td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
requiredContent:"table"})));CKEDITOR.dialog.add("cellProperties",this.path+"dialogs/tableCell.js");b("rowDelete",d({requiredContent:"table",exec:function(a){a=a.getSelection();m(q(a))}}));b("rowInsertBefore",d({requiredContent:"table",exec:function(a){a=a.getSelection();o(a,!0)}}));b("rowInsertAfter",d({requiredContent:"table",exec:function(a){a=a.getSelection();o(a)}}));b("columnDelete",d({requiredContent:"table",exec:function(a){for(var a=a.getSelection(),a=p(a),b=a[0],c=a[a.length-1],a=b.getAscendant("table"),
d=CKEDITOR.tools.buildTableMap(a),e,j,l=[],n=0,o=d.length;n<o;n++)for(var k=0,q=d[n].length;k<q;k++)d[n][k]==b.$&&(e=k),d[n][k]==c.$&&(j=k);for(n=e;n<=j;n++)for(k=0;k<d.length;k++)c=d[k],b=new CKEDITOR.dom.element(a.$.rows[k]),c=new CKEDITOR.dom.element(c[n]),c.$&&(1==c.$.colSpan?c.remove():c.$.colSpan-=1,k+=c.$.rowSpan-1,b.$.cells.length||l.push(b));j=a.$.rows[0]&&a.$.rows[0].cells;e=new CKEDITOR.dom.element(j[e]||(e?j[e-1]:a.$.parentNode));l.length==o&&a.remove();e&&m(e,!0)}}));b("columnInsertBefore",
d({requiredContent:"table",exec:function(a){a=a.getSelection();k(a,!0)}}));b("columnInsertAfter",d({requiredContent:"table",exec:function(a){a=a.getSelection();k(a)}}));b("cellDelete",d({requiredContent:"table",exec:function(a){a=a.getSelection();t(a)}}));b("cellMerge",d({allowedContent:"td[colspan,rowspan]",requiredContent:"td[colspan,rowspan]",exec:function(a){m(s(a.getSelection()),!0)}}));b("cellMergeRight",d({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a){m(s(a.getSelection(),
"right"),!0)}}));b("cellMergeDown",d({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a){m(s(a.getSelection(),"down"),!0)}}));b("cellVerticalSplit",d({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a){m(w(a.getSelection()))}}));b("cellHorizontalSplit",d({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a){m(x(a.getSelection()))}}));b("cellInsertBefore",d({requiredContent:"table",exec:function(a){a=a.getSelection();u(a,!0)}}));
b("cellInsertAfter",d({requiredContent:"table",exec:function(a){a=a.getSelection();u(a)}}));e.addMenuItems&&e.addMenuItems({tablecell:{label:c.cell.menu,group:"tablecell",order:1,getItems:function(){var a=e.getSelection(),b=p(a);return{tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,tablecell_delete:CKEDITOR.TRISTATE_OFF,tablecell_merge:s(a,null,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_right:s(a,"right",!0)?CKEDITOR.TRISTATE_OFF:
CKEDITOR.TRISTATE_DISABLED,tablecell_merge_down:s(a,"down",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_vertical:w(a,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_horizontal:x(a,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_properties:0<b.length?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED}}},tablecell_insertBefore:{label:c.cell.insertBefore,group:"tablecell",command:"cellInsertBefore",order:5},tablecell_insertAfter:{label:c.cell.insertAfter,
group:"tablecell",command:"cellInsertAfter",order:10},tablecell_delete:{label:c.cell.deleteCell,group:"tablecell",command:"cellDelete",order:15},tablecell_merge:{label:c.cell.merge,group:"tablecell",command:"cellMerge",order:16},tablecell_merge_right:{label:c.cell.mergeRight,group:"tablecell",command:"cellMergeRight",order:17},tablecell_merge_down:{label:c.cell.mergeDown,group:"tablecell",command:"cellMergeDown",order:18},tablecell_split_horizontal:{label:c.cell.splitHorizontal,group:"tablecell",
command:"cellHorizontalSplit",order:19},tablecell_split_vertical:{label:c.cell.splitVertical,group:"tablecell",command:"cellVerticalSplit",order:20},tablecell_properties:{label:c.cell.title,group:"tablecellproperties",command:"cellProperties",order:21},tablerow:{label:c.row.menu,group:"tablerow",order:1,getItems:function(){return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF}}},tablerow_insertBefore:{label:c.row.insertBefore,
group:"tablerow",command:"rowInsertBefore",order:5},tablerow_insertAfter:{label:c.row.insertAfter,group:"tablerow",command:"rowInsertAfter",order:10},tablerow_delete:{label:c.row.deleteRow,group:"tablerow",command:"rowDelete",order:15},tablecolumn:{label:c.column.menu,group:"tablecolumn",order:1,getItems:function(){return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF}}},tablecolumn_insertBefore:{label:c.column.insertBefore,
group:"tablecolumn",command:"columnInsertBefore",order:5},tablecolumn_insertAfter:{label:c.column.insertAfter,group:"tablecolumn",command:"columnInsertAfter",order:10},tablecolumn_delete:{label:c.column.deleteColumn,group:"tablecolumn",command:"columnDelete",order:15}});e.contextMenu&&e.contextMenu.addListener(function(a,b,c){return(a=c.contains({td:1,th:1},1))&&!a.isReadOnly()?{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF}:null})},getSelectedCells:p};
CKEDITOR.plugins.add("tabletools",CKEDITOR.plugins.tabletools)})();CKEDITOR.tools.buildTableMap=function(p){for(var p=p.$.rows,o=-1,q=[],r=0;r<p.length;r++){o++;!q[o]&&(q[o]=[]);for(var k=-1,u=0;u<p[r].cells.length;u++){var t=p[r].cells[u];for(k++;q[o][k];)k++;for(var m=isNaN(t.colSpan)?1:t.colSpan,t=isNaN(t.rowSpan)?1:t.rowSpan,v=0;v<t;v++){q[o+v]||(q[o+v]=[]);for(var s=0;s<m;s++)q[o+v][k+s]=p[r].cells[u]}k+=m-1}}return q};(function(){var g=[CKEDITOR.CTRL+90,CKEDITOR.CTRL+89,CKEDITOR.CTRL+CKEDITOR.SHIFT+90],l={8:1,46:1};CKEDITOR.plugins.add("undo",{init:function(a){function b(a){d.enabled&&!1!==a.data.command.canUndo&&d.save()}function c(){d.enabled=a.readOnly?!1:"wysiwyg"==a.mode;d.onChange()}var d=a.undoManager=new e(a),j=d.editingHandler=new i(d),f=a.addCommand("undo",{exec:function(){d.undo()&&(a.selectionChange(),this.fire("afterUndo"))},startDisabled:!0,canUndo:!1}),h=a.addCommand("redo",{exec:function(){d.redo()&&
(a.selectionChange(),this.fire("afterRedo"))},startDisabled:!0,canUndo:!1});a.setKeystroke([[g[0],"undo"],[g[1],"redo"],[g[2],"redo"]]);d.onChange=function(){f.setState(d.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);h.setState(d.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)};a.on("beforeCommandExec",b);a.on("afterCommandExec",b);a.on("saveSnapshot",function(a){d.save(a.data&&a.data.contentOnly)});a.on("contentDom",j.attachListeners,j);a.on("instanceReady",function(){a.fire("saveSnapshot")});
a.on("beforeModeUnload",function(){"wysiwyg"==a.mode&&d.save(!0)});a.on("mode",c);a.on("readOnly",c);a.ui.addButton&&(a.ui.addButton("Undo",{label:a.lang.undo.undo,command:"undo",toolbar:"undo,10"}),a.ui.addButton("Redo",{label:a.lang.undo.redo,command:"redo",toolbar:"undo,20"}));a.resetUndo=function(){d.reset();a.fire("saveSnapshot")};a.on("updateSnapshot",function(){d.currentImage&&d.update()});a.on("lockSnapshot",function(a){a=a.data;d.lock(a&&a.dontUpdate,a&&a.forceUpdate)});a.on("unlockSnapshot",
d.unlock,d)}});CKEDITOR.plugins.undo={};var e=CKEDITOR.plugins.undo.UndoManager=function(a){this.strokesRecorded=[0,0];this.locked=null;this.previousKeyGroup=-1;this.limit=a.config.undoStackSize||20;this.strokesLimit=25;this.editor=a;this.reset()};e.prototype={type:function(a,b){var c=e.getKeyGroup(a),d=this.strokesRecorded[c]+1,b=b||d>=this.strokesLimit;this.typing||(this.hasUndo=this.typing=!0,this.hasRedo=!1,this.onChange());b?(d=0,this.editor.fire("saveSnapshot")):this.editor.fire("change");this.strokesRecorded[c]=
d;this.previousKeyGroup=c},keyGroupChanged:function(a){return e.getKeyGroup(a)!=this.previousKeyGroup},reset:function(){this.snapshots=[];this.index=-1;this.currentImage=null;this.hasRedo=this.hasUndo=!1;this.locked=null;this.resetType()},resetType:function(){this.strokesRecorded=[0,0];this.typing=!1;this.previousKeyGroup=-1},refreshState:function(){this.hasUndo=!!this.getNextImage(!0);this.hasRedo=!!this.getNextImage(!1);this.resetType();this.onChange()},save:function(a,b,c){var d=this.editor;if(this.locked||
"ready"!=d.status||"wysiwyg"!=d.mode)return!1;var e=d.editable();if(!e||"ready"!=e.status)return!1;e=this.snapshots;b||(b=new f(d));if(!1===b.contents)return!1;if(this.currentImage)if(b.equalsContent(this.currentImage)){if(a||b.equalsSelection(this.currentImage))return!1}else!1!==c&&d.fire("change");e.splice(this.index+1,e.length-this.index-1);e.length==this.limit&&e.shift();this.index=e.push(b)-1;this.currentImage=b;!1!==c&&this.refreshState();return!0},restoreImage:function(a){var b=this.editor,
c;a.bookmarks&&(b.focus(),c=b.getSelection());this.locked={level:999};this.editor.loadSnapshot(a.contents);a.bookmarks?c.selectBookmarks(a.bookmarks):CKEDITOR.env.ie&&(c=this.editor.document.getBody().$.createTextRange(),c.collapse(!0),c.select());this.locked=null;this.index=a.index;this.currentImage=this.snapshots[this.index];this.update();this.refreshState();b.fire("change")},getNextImage:function(a){var b=this.snapshots,c=this.currentImage,d;if(c)if(a)for(d=this.index-1;0<=d;d--){if(a=b[d],!c.equalsContent(a))return a.index=
d,a}else for(d=this.index+1;d<b.length;d++)if(a=b[d],!c.equalsContent(a))return a.index=d,a;return null},redoable:function(){return this.enabled&&this.hasRedo},undoable:function(){return this.enabled&&this.hasUndo},undo:function(){if(this.undoable()){this.save(!0);var a=this.getNextImage(!0);if(a)return this.restoreImage(a),!0}return!1},redo:function(){if(this.redoable()&&(this.save(!0),this.redoable())){var a=this.getNextImage(!1);if(a)return this.restoreImage(a),!0}return!1},update:function(a){if(!this.locked){a||
(a=new f(this.editor));for(var b=this.index,c=this.snapshots;0<b&&this.currentImage.equalsContent(c[b-1]);)b-=1;c.splice(b,this.index-b+1,a);this.index=b;this.currentImage=a}},updateSelection:function(a){if(!this.snapshots.length)return!1;var b=this.snapshots,c=b[b.length-1];return c.equalsContent(a)&&!c.equalsSelection(a)?(this.currentImage=b[b.length-1]=a,!0):!1},lock:function(a,b){if(this.locked)this.locked.level++;else if(a)this.locked={level:1};else{var c=null;if(b)c=!0;else{var d=new f(this.editor,
!0);this.currentImage&&this.currentImage.equalsContent(d)&&(c=d)}this.locked={update:c,level:1}}},unlock:function(){if(this.locked&&!--this.locked.level){var a=this.locked.update;this.locked=null;if(!0===a)this.update();else if(a){var b=new f(this.editor,!0);a.equalsContent(b)||this.update()}}}};e.navigationKeyCodes={37:1,38:1,39:1,40:1,36:1,35:1,33:1,34:1};e.keyGroups={PRINTABLE:0,FUNCTIONAL:1};e.isNavigationKey=function(a){return!!e.navigationKeyCodes[a]};e.getKeyGroup=function(a){var b=e.keyGroups;
return l[a]?b.FUNCTIONAL:b.PRINTABLE};e.getOppositeKeyGroup=function(a){var b=e.keyGroups;return a==b.FUNCTIONAL?b.PRINTABLE:b.FUNCTIONAL};e.ieFunctionalKeysBug=function(a){return CKEDITOR.env.ie&&e.getKeyGroup(a)==e.keyGroups.FUNCTIONAL};var f=CKEDITOR.plugins.undo.Image=function(a,b){this.editor=a;a.fire("beforeUndoImage");var c=a.getSnapshot();CKEDITOR.env.ie&&c&&(c=c.replace(/\s+data-cke-expando=".*?"/g,""));this.contents=c;b||(this.bookmarks=(c=c&&a.getSelection())&&c.createBookmarks2(!0));a.fire("afterUndoImage")},
h=/\b(?:href|src|name)="[^"]*?"/gi;f.prototype={equalsContent:function(a){var b=this.contents,a=a.contents;if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks))b=b.replace(h,""),a=a.replace(h,"");return b!=a?!1:!0},equalsSelection:function(a){var b=this.bookmarks,a=a.bookmarks;if(b||a){if(!b||!a||b.length!=a.length)return!1;for(var c=0;c<b.length;c++){var d=b[c],e=a[c];if(d.startOffset!=e.startOffset||d.endOffset!=e.endOffset||!CKEDITOR.tools.arrayCompare(d.start,e.start)||!CKEDITOR.tools.arrayCompare(d.end,
e.end))return!1}}return!0}};var i=CKEDITOR.plugins.undo.NativeEditingHandler=function(a){this.undoManager=a;this.ignoreInputEvent=!1;this.keyEventsStack=new k;this.lastKeydownImage=null};i.prototype={onKeydown:function(a){if(-1<CKEDITOR.tools.indexOf(g,a.data.getKeystroke()))a.data.preventDefault();else{this.keyEventsStack.cleanUp(a);var a=a.data.getKey(),b=this.undoManager;this.keyEventsStack.getLast(a)||this.keyEventsStack.push(a);this.lastKeydownImage=new f(b.editor);if(e.isNavigationKey(a)||this.undoManager.keyGroupChanged(a))if(b.strokesRecorded[0]||
b.strokesRecorded[1])b.save(!1,this.lastKeydownImage,!1),b.resetType()}},onInput:function(){if(this.ignoreInputEvent)this.ignoreInputEvent=!1;else{var a=this.keyEventsStack.getLast();a||(a=this.keyEventsStack.push(0));this.keyEventsStack.increment(a.keyCode);this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit&&(this.undoManager.type(a.keyCode,!0),this.keyEventsStack.resetInputs())}},onKeyup:function(a){var b=this.undoManager,a=a.data.getKey(),c=this.keyEventsStack.getTotalInputs();
this.keyEventsStack.remove(a);if(!e.ieFunctionalKeysBug(a)||!this.lastKeydownImage||!this.lastKeydownImage.equalsContent(new f(b.editor,!0)))if(0<c)b.type(a);else if(e.isNavigationKey(a))this.onNavigationKey(!0)},onNavigationKey:function(a){var b=this.undoManager;(a||!b.save(!0,null,!1))&&b.updateSelection(new f(b.editor));b.resetType()},ignoreInputEventListener:function(){this.ignoreInputEvent=!0},attachListeners:function(){var a=this.undoManager.editor,b=a.editable(),c=this;b.attachListener(b,"keydown",
function(a){c.onKeydown(a);if(e.ieFunctionalKeysBug(a.data.getKey()))c.onInput()},null,null,999);b.attachListener(b,CKEDITOR.env.ie?"keypress":"input",c.onInput,c,null,999);b.attachListener(b,"keyup",c.onKeyup,c,null,999);b.attachListener(b,"paste",c.ignoreInputEventListener,c,null,999);b.attachListener(b,"drop",c.ignoreInputEventListener,c,null,999);b.attachListener(b.isInline()?b:a.document.getDocumentElement(),"click",function(){c.onNavigationKey()},null,null,999);b.attachListener(this.undoManager.editor,
"blur",function(){c.keyEventsStack.remove(9)},null,null,999)}};var k=CKEDITOR.plugins.undo.KeyEventsStack=function(){this.stack=[]};k.prototype={push:function(a){return this.stack[this.stack.push({keyCode:a,inputs:0})-1]},getLastIndex:function(a){if("number"!=typeof a)return this.stack.length-1;for(var b=this.stack.length;b--;)if(this.stack[b].keyCode==a)return b;return-1},getLast:function(a){a=this.getLastIndex(a);return-1!=a?this.stack[a]:null},increment:function(a){this.getLast(a).inputs++},remove:function(a){a=
this.getLastIndex(a);-1!=a&&this.stack.splice(a,1)},resetInputs:function(a){if("number"==typeof a)this.getLast(a).inputs=0;else for(a=this.stack.length;a--;)this.stack[a].inputs=0},getTotalInputs:function(){for(var a=this.stack.length,b=0;a--;)b+=this.stack[a].inputs;return b},cleanUp:function(a){a=a.data.$;!a.ctrlKey&&!a.metaKey&&this.remove(17);a.shiftKey||this.remove(16);a.altKey||this.remove(18)}}})();CKEDITOR.plugins.add("wsc",{requires:"dialog",parseApi:function(a){a.config.wsc_onFinish="function"===typeof a.config.wsc_onFinish?a.config.wsc_onFinish:function(){};a.config.wsc_onClose="function"===typeof a.config.wsc_onClose?a.config.wsc_onClose:function(){}},parseConfig:function(a){a.config.wsc_customerId=a.config.wsc_customerId||CKEDITOR.config.wsc_customerId||"1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";a.config.wsc_customDictionaryIds=a.config.wsc_customDictionaryIds||
CKEDITOR.config.wsc_customDictionaryIds||"";a.config.wsc_userDictionaryName=a.config.wsc_userDictionaryName||CKEDITOR.config.wsc_userDictionaryName||"";a.config.wsc_customLoaderScript=a.config.wsc_customLoaderScript||CKEDITOR.config.wsc_customLoaderScript;CKEDITOR.config.wsc_cmd=a.config.wsc_cmd||CKEDITOR.config.wsc_cmd||"spell";CKEDITOR.config.wsc_version="v4.3.0-26-g5bcf855";CKEDITOR.config.wsc_removeGlobalVariable=!0},init:function(a){var b=CKEDITOR.env;this.parseConfig(a);this.parseApi(a);a.addCommand("checkspell",
new CKEDITOR.dialogCommand("checkspell")).modes={wysiwyg:!CKEDITOR.env.opera&&!CKEDITOR.env.air&&document.domain==window.location.hostname&&!(b.ie&&(8>b.version||b.quirks))};"undefined"==typeof a.plugins.scayt&&a.ui.addButton&&a.ui.addButton("SpellChecker",{label:a.lang.wsc.toolbar,click:function(a){var b=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.container.getText():a.document.getBody().getText();(b=b.replace(/\s/g,""))?a.execCommand("checkspell"):alert("Nothing to check!")},toolbar:"spellchecker,10"});
CKEDITOR.dialog.add("checkspell",this.path+(CKEDITOR.env.ie&&7>=CKEDITOR.env.version?"dialogs/wsc_ie.js":window.postMessage?"dialogs/wsc.js":"dialogs/wsc_ie.js"))}});CKEDITOR.config.plugins='dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc';CKEDITOR.config.skin='moono';(function() {var setIcons = function(icons, strip) {var path = CKEDITOR.getUrl( 'plugins/' + strip );icons = icons.split( ',' );for ( var i = 0; i < icons.length; i++ )CKEDITOR.skin.icons[ icons[ i ] ] = { path: path, offset: -icons[ ++i ], bgsize : icons[ ++i ] };};if (CKEDITOR.env.hidpi) setIcons('about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,templates-rtl,432,,templates,456,,creatediv,480,,find-rtl,504,,find,528,,replace,552,,flash,576,,button,600,,checkbox,624,,form,648,,hiddenfield,672,,imagebutton,696,,radio,720,,select-rtl,744,,select,768,,textarea-rtl,792,,textarea,816,,textfield-rtl,840,,textfield,864,,horizontalrule,888,,iframe,912,,image,936,,indent-rtl,960,,indent,984,,outdent-rtl,1008,,outdent,1032,,smiley,1056,,justifyblock,1080,,justifycenter,1104,,justifyleft,1128,,justifyright,1152,,language,1176,,anchor-rtl,1200,,anchor,1224,,link,1248,,unlink,1272,,bulletedlist-rtl,1296,,bulletedlist,1320,,numberedlist-rtl,1344,,numberedlist,1368,,maximize,1392,,newpage-rtl,1416,,newpage,1440,,pagebreak-rtl,1464,,pagebreak,1488,,pastetext-rtl,1512,,pastetext,1536,,pastefromword-rtl,1560,,pastefromword,1584,,preview-rtl,1608,,preview,1632,,print,1656,,removeformat,1680,,save,1704,,selectall,1728,,showblocks-rtl,1752,,showblocks,1776,,source-rtl,1800,,source,1824,,specialchar,1848,,scayt,1872,,table,1896,,redo-rtl,1920,,redo,1944,,undo-rtl,1968,,undo,1992,,spellchecker,2016,','icons_hidpi.png');else setIcons('about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,templates-rtl,432,auto,templates,456,auto,creatediv,480,auto,find-rtl,504,auto,find,528,auto,replace,552,auto,flash,576,auto,button,600,auto,checkbox,624,auto,form,648,auto,hiddenfield,672,auto,imagebutton,696,auto,radio,720,auto,select-rtl,744,auto,select,768,auto,textarea-rtl,792,auto,textarea,816,auto,textfield-rtl,840,auto,textfield,864,auto,horizontalrule,888,auto,iframe,912,auto,image,936,auto,indent-rtl,960,auto,indent,984,auto,outdent-rtl,1008,auto,outdent,1032,auto,smiley,1056,auto,justifyblock,1080,auto,justifycenter,1104,auto,justifyleft,1128,auto,justifyright,1152,auto,language,1176,auto,anchor-rtl,1200,auto,anchor,1224,auto,link,1248,auto,unlink,1272,auto,bulletedlist-rtl,1296,auto,bulletedlist,1320,auto,numberedlist-rtl,1344,auto,numberedlist,1368,auto,maximize,1392,auto,newpage-rtl,1416,auto,newpage,1440,auto,pagebreak-rtl,1464,auto,pagebreak,1488,auto,pastetext-rtl,1512,auto,pastetext,1536,auto,pastefromword-rtl,1560,auto,pastefromword,1584,auto,preview-rtl,1608,auto,preview,1632,auto,print,1656,auto,removeformat,1680,auto,save,1704,auto,selectall,1728,auto,showblocks-rtl,1752,auto,showblocks,1776,auto,source-rtl,1800,auto,source,1824,auto,specialchar,1848,auto,scayt,1872,auto,table,1896,auto,redo-rtl,1920,auto,redo,1944,auto,undo-rtl,1968,auto,undo,1992,auto,spellchecker,2016,auto','icons.png');})();CKEDITOR.lang.languages={"af":1,"sq":1,"ar":1,"eu":1,"bn":1,"bs":1,"bg":1,"ca":1,"zh-cn":1,"zh":1,"hr":1,"cs":1,"da":1,"nl":1,"en":1,"en-au":1,"en-ca":1,"en-gb":1,"eo":1,"et":1,"fo":1,"fi":1,"fr":1,"fr-ca":1,"gl":1,"ka":1,"de":1,"el":1,"gu":1,"he":1,"hi":1,"hu":1,"is":1,"id":1,"it":1,"ja":1,"km":1,"ko":1,"ku":1,"lv":1,"lt":1,"mk":1,"ms":1,"mn":1,"no":1,"nb":1,"fa":1,"pl":1,"pt-br":1,"pt":1,"ro":1,"ru":1,"sr":1,"sr-latn":1,"si":1,"sk":1,"sl":1,"es":1,"sv":1,"tt":1,"th":1,"tr":1,"ug":1,"uk":1,"vi":1,"cy":1};}());
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//









;
