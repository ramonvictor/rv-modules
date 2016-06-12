const t = require('assert');
const RV = require('../src/main.js');

test('define: name is invalid', () => {
	try {
		RV.define();
	} catch(e) {
		t.equal(e.message, 'define: module name is missing or is not a string');
	}
});


test('define: callback is invalid', () => {
	try {
		RV.define('my-module');
	} catch(e) {
		t.equal(e.message, 'define: callback is undefined or is not a function');
	}
});

test('require: undefined module', () => {
	try {
		RV.require('my-module-5');
	} catch(e) {
		t.equal(e.message, 'require: module `my-module-5` is not defined');
	}
});

test('require: log return', () => {
	RV.define('my-module-2', () => {
		return {
			foo: 'bar'
		};
	});

	t.equal(JSON.stringify(RV.require('my-module-2')), '{"foo":"bar"}');
});

/*
test('require: log exports', () => {
	RV.define('my-module-3', (require, exports, module) => {
		exports = {
			foo: 'barz'
		};
	});

	t.equal(JSON.stringify(RV.require('my-module-3')), '{"foo":"barz"}');
});
*/

test('require: log module.exports', () => {
	RV.define('my-module-4', (require, exports, module) => {
		module.exports = {
			foo: 'barz'
		};
	});

	t.equal(JSON.stringify(RV.require('my-module-4')), '{"foo":"barz"}');
});