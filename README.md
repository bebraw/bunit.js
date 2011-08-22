bunit.js
========

bunit.js provides a simple way to define unit tests and run them on a web page. See "tests" directory for a concrete example on how to use this.

Essentially you'll want to:

1. Define your tests (tests/assert.js) using bunit.suite and bunit.assert.
2. Import your tests and bunit (tests/main.js).
3. Execute your tests using bunit.run. "run" discovers all imported suites automatically.

Suite API
---------

The suite API can be thought to consist of two separate parts. One ("suite") is used to define actual test suites while the other part ("run" + misc. funcs) is used to execute these suites.

### suite

A simple test suite may look like this:

```javascript
define(['bunit'], function(bu) {
    var assert = bu.assert;

    bu.suite('suite name', {
        _: { // set up (run before each test)
            a: 5
        },
        someTest: function() {
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
require({paths: {bunit: '../src/bunit'}}, ['tests', 'bunit'], function(tests, bu) {
    require.ready(function() {
        var outputArea = document.createElement('div');

        document.body.appendChild(bu.playbackUI());
        document.body.appendChild(outputArea)

        bu.run({
            tests: tests,
            output: bu.HTMLOutput(outputArea),
            refresh: 2000
        });
    });
});
```

The code above sets up some UI, refresh (tests are run once per 2 secs) and loads actual tests to be run. "tests" is a module used to import actual test modules that are then passed onto "run". It may look like this:

```javascript
define(['assert'], function(assert) {
    return {
        assert: assert
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
