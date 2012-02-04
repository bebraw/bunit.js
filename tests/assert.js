define(['bunit', 'assert'], function(bunit, assert) {
    bunit('Assert', {
        setUp: function() {
            return [5];
        },
        equals: function(a) {
            assert(a).equals(5);
        },
        not: function(a) {
            assert(a).not().equals(6);
        },
        doubleNot: function(a) {
            assert(a).not().not().equals(5);
        },
        between: function(a) {
            assert(a).between(0, 10); // [0, 10]
            assert(a).between(0); // [0, [
            assert(a).between(null, 10); // ], 10]
            assert(-5).between(null, 10); // ], 10]
        },
        isDefined: function(a) {
            assert(a).isDefined();
        },
        is: function(a) {
            assert(a).is('number');
            assert(a).is('array', 'number');
        },
        within: function(a) {
            assert(a).within(1, 3, 5, 10);
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
