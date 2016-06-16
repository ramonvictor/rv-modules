# rv-modules

Less than 1kb lib that applies require/define concept.

### How to use
```js
// On node
var rv = require('rv-modules');
// On the browser it's exposed as `window.rv`.
// So, you can just use:
rv.require('my-module');
```

**Module that returns value**

```js
rv.define('module-w-return', (require, exports, module) => {
  return { foo: 1 };
});

var m1 = rv.require('module-w-return');
console.log(m1);
// outputs: { foo: 1 }
```

**Module that exports function**

```js
rv.define('module-log-fn', (require, exports, module) => {
  module.exports = function log(str) {
    console.log(str);
  };
});

var m2 = rv.require('module-log-fn');
console.log(m2);
// outputs: function
```

**Module with multiple exports**

```js
rv.define('multiple-exports', (require, exports, module) => {
  exports.add = function add(){ /**/ };
  exports.remove = function remove(){ /**/ };
});

var m3 = rv.require('multiple-exports');
console.log(m3);
// outputs: { add: fn, remove: fn }
```

