define(['bunit', 'assert'], function(bunit, assert) {
    bunit('Multipart setup', {
        setUp: function() {
            return [4, {a: 40}];
        },
        equals: function(a, b) {
            assert(a).equals(4);
            assert(b.a).equals(40);
        }
    });
});
