define(['bunit'], function(bunit) {
    var assert = bunit.assert;
    var toreDown = false;

    bunit('Bunit', {
        _: {
            a: 5
        },
        setUp: function() {
            return ['foobar', 21]
        },
        underscore: function() {
            assert(this.a).equals(5);
        },
        setUpParameters: function(a, b) {
            assert(a).equals('foobar');
            assert(b).equals(21);
        },
        tearDownCalled: function() {
            assert(toreDown).equals(true);
        },
        tearDown: function() {
            toreDown = true;
        }
    });
});
