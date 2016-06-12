// Define
// ---------
function define(name, callback) {
	if (typeof name == 'undefined' || typeof name != 'string') {
		throw new Error('define: module name is missing or is not a string');
	}

	if (typeof callback == 'undefined' || typeof callback != 'function') {
		throw new Error('define: callback is undefined or is not a function');
	}

	var value;

	// module initial value
	this.__modules[name] = {};
	this.__modules[name].exports = this.__modules[name];

	// Run callback
	value = callback(this.require, this.__modules[name].exports, this.__modules[name]);

	// value returned
	if (typeof value !== 'undefined') {
		this.__modules[name].exports = value;
	}
}


// Require
// ---------
function require(name) {
	if (typeof name == 'undefined') {
		throw new Error('require: missing module name');
	}

	if (typeof this.__modules[name] == 'undefined') {
		throw new Error('require: module `' + name + '` is not defined');
	}

	return this.__modules[name].exports;
}


// API
// --------
module.exports = {
	define: define,
	require: require,
	__modules: {}
};