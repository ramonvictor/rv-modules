;(function() {
  'use strict';

	// Define
	// ---------
	function define(name, callback) {
		if (typeof name === 'undefined' || typeof name !== 'string') {
			throw new Error('define: module name is missing or is not a string');
		}

		if (typeof callback === 'undefined' || typeof callback !== 'function') {
			throw new Error('define: callback is undefined or is not a function');
		}

		// module initial value
		this._modules[name] = {
			callback: callback,
			exports: {}
		};
	}


	// Require
	// ---------
	function require(name) {
		// Check required argument
		if (typeof name === 'undefined') {
			throw new Error('require: missing module name');
		}

		// Store module in reusable variable
		var m = this._modules[name];

		// Check if module exists
		if (typeof m === 'undefined') {
			throw new Error('require: module `' + name + '` is not defined');
		}

		// Return exported value
		return m.callback(this.require.bind(this), m.exports, m) || m.exports;
	}


	// API
	// ---------
	var API = {
		define: define,
		require: require,
		_modules: {}
	};

	// Export
	// ---------
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = API;
	} else if (typeof window !== 'undefined') {
		window.RV = API;
	}
}());
