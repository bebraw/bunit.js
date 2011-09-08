define(['../lib/bunit', '../lib/assert'], function(bunit, assert) {
    bunit('Demo test', {
        someTest: function() {
            assert(5).equals(5);
        }
    });
});

