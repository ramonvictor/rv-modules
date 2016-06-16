const t = require('assert');
const rv = require('../src/main.js');

test('define: name is invalid', () => {
	t.throws(() => {
		rv.define();
	}, 'define: module name is missing or is not a string');
});

test('define: callback is invalid', () => {
	t.throws(() => {
		rv.define('my-module');
	}, 'define: callback is undefined or is not a function');
});

test('define: avoid module override', () => {
	rv.define('my-module-6', (require, exports, module) => {
		return { foo: 1 };
	});

	rv.define('my-module-6', (require, exports, module) => {
		return { foo: 2 };
	});

	t.equal(JSON.stringify(rv.require('my-module-6')), '{"foo":1}');
});

test('require: undefined module', () => {
	t.throws(() => {
		rv.require('my-module-5');
	}, 'require: module `my-module-5` is not defined');
});

test('require: log return', () => {
	rv.define('my-module-2', () => {
		return {
			foo: 'bar'
		};
	});

	t.equal(JSON.stringify(rv.require('my-module-2')), '{"foo":"bar"}');
});


test('require: log exports', () => {
	rv.define('my-module-3', (require, exports, module) => {
		exports.foo = {
			foo: 'barz'
		};
	});

	t.equal(JSON.stringify(rv.require('my-module-3')), '{"foo":{"foo":"barz"}}');
});

test('require: log module.exports', () => {
	rv.define('my-module-4', (require, exports, module) => {
		module.exports = {
			foo: 'barz'
		};
	});

	t.equal(JSON.stringify(rv.require('my-module-4')), '{"foo":"barz"}');
});

test('require: module.exports overrides exports', () => {
	rv.define('my-module-7', (require, exports, module) => {
		exports.foo = {
			foo: 'barz'
		};

		module.exports = {
			barz: 'foo'
		};
	});

	t.equal(JSON.stringify(rv.require('my-module-7')), '{"barz":"foo"}');
});

test('require: require inside callback', () => {
	rv.define('my-module-5', (require, exports, module) => {
		var result = require('my-module-4');
		result.modified = 1;

		module.exports = result;
	});

	t.equal(JSON.stringify(rv.require('my-module-5')), '{"foo":"barz","modified":1}');
});