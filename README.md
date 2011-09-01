bunit.js
========

bunit.js provides a simple way to define unit tests and run them on a web page. See "tests" directory for a concrete example on how to use this.

Essentially you'll want to:

1. Define your tests (tests/assert.js) using bunit and bunit.assert.
2. Import your tests and bunit (tests/main.js).
3. Execute your tests using bunit.run. "run" discovers all imported suites automatically.

Suite API
---------

### suite

A simple test suite may look like this:

```javascript
define(['bunit'], function(bunit) {
    var assert = bu.assert;

    bunit('suite name', {
        _: { // set up (run before each test)
            a: 5
        },
        setUp: function() { // another, more robust way to set up
            return [5, 'foo'];
        },
        someTest: function(a, b) {
            // a = 5, b = 'foo'
            assert(this.a).equals(5); // access set up attributes via this
        },
        ... // more tests
    });
});

```

Generally it is a good idea to create your suites based on some feature. It's also possible to construct their content dynamically (ie. based on configuration and templates). This can be a powerful way to construct maintainable tests.


### run

In order to actually run your tests, you might want to do something like this (main.js):

```javascript
require({paths: {bunit: '../src/bunit'}}, ['bunit', 'tests'],
    function(bunit, tests) {
        require.ready(function() {
            var outputArea = document.createElement('div');

            document.body.appendChild(bunit.playbackUI());
            document.body.appendChild(outputArea)

            var r = bunit.runner();
            r.run({
                output: bunit.HTMLOutput(outputArea),
                interval: 2000
            });
        });
    }
);
```

There's a handy shortcut, defaultUI, that may be used to reach the same result. Here's an example of that:

```javascript
require({paths: {bunit: '../src/bunit'}}, ['bunit', 'tests'],
    function(bunit, tests) {
        require.ready(function() {
            var r = bunit.runner();

            r.defaultUI();
            r.run();
        });
    }
);
```

The examples above sets up some UI, interval (tests are run once per 2 secs) and loads actual tests to be run. "tests" is a module used to import actual test modules. It may look like this:

```javascript
define(['color'], function(color) {
    return {
        color: color
    };
});
```

Assertion API
-------------

The assertion API is built upon the idea of chaining. Each API call is defined roughly as follows: assert(<given value>).<action>(<expected value>). In addition there is a "not" modifier that may be used to invert the assertion. See the examples below for a more concrete explanation:

```javascript
var a = 10;
var b = [1, 2, 3, 4];

assert(a).equals(10); // ok
assert(a).not().equals(11); // ok
assert(a).not().not().equals(10); // ok, double negation
assert(b).equals([1, 2, 3, 4]); // ok, note that we compare content!

assert(a).between(0, 10); // ok since 10 e [0, 10]
assert(a).between(0); // ok since 10 e [0, [
assert(a).between(null, 20); // ok since 10 e ], 10]

assert(a).isDefined(); // ok since a is not undefined

assert(a).is('number'); // ok
assert(a).is('array', 'number'); // ok, matches number

assert(a).within(2, 4, 10); // ok, matches 10
assert(a).within(3); // not ok, raises AssertionError
```

Other libraries
---------------

See https://github.com/bebraw/jswiki/wiki/Testing-frameworks .

License
-------

bunit.js is available under MIT license. See LICENSE for more details.
