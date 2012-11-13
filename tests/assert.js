define(['bunit', 'assert'], function(bunit, assert) {
    bunit('Assert', {
        setUp: function() {
            return {
                a: 5
            };
        },
        equals: function(o) {
            assert(o.a).equals(5);
        },
        not: function(o) {
            assert(o.a).not().equals(6);
        },
        doubleNot: function(o) {
            assert(o.a).not().not().equals(5);
        },
        between: function(o) {
            var a = o.a;

            assert(a).between(0, 10); // [0, 10]
            assert(a).between(0); // [0, [
            assert(a).between(null, 10); // ], 10]
            assert(-5).between(null, 10); // ], 10]
        },
        isDefined: function(o) {
            assert(o.a).isDefined();
        },
        is: function(o) {
            assert(o.a).is('number');
            assert(o.a).is('array', 'number');
        },
        within: function(o) {
            assert(o.a).within(1, 3, 5, 10);
        },
        arrays: function() {
            assert([1, 2, 3]).equals([1, 2, 3]);
            assert([1, 2, 3]).not().equals([1]);
            assert([1, 2, 3]).not().equals([]);
            assert([1]).not().equals([1, 2, 3]);
            assert([]).not().equals([1, 2, 3]);
        }
    });
});
