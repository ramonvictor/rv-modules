// Define
// ---------
function define(name, callback) {
	if (typeof name == 'undefined' || typeof name != 'string') {
		throw new Error('define: module name is missing or is not a string');
	}

	if (typeof callback == 'undefined' || typeof callback != 'function') {
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
	if (typeof name == 'undefined') {
		throw new Error('require: missing module name');
	}

	// Store module in reusable variable
	var m = this._modules[name];

	// Check if module exists
	if (typeof m == 'undefined') {
		throw new Error('require: module `' + name + '` is not defined');
	}

	// Return exported value
	return m.callback(this.require, m.exports, m) || m.exports;
}


// API
// --------
module.exports = {
	define: define,
	require: require,
	_modules: {}
};