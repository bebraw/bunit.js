define(['bunit', 'assert'], function(bunit, assert) {
    bunit('No setup', {
        async: function(o, done) {
            // async should still work
            // the same syntax (o, done) is used for consistency
            done();
        }
    });
});
