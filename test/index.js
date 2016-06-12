const t = require('assert');
var RV = require('../src/main.js');

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