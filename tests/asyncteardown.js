define(['bunit', 'assert'], function(bunit, assert) {
    var items = [];

    bunit('Async teardown', {
        tearDown: function() {
            items.push('teardown');
        },
        async: function(o, done) {
            items.push('async');

            setTimeout(function() {
                done();
            }, 100);
        },
        tearDownCalled: function() {
            assert(items[0]).equals('async');
            assert(items[1]).equals('teardown');
        }
   });
});
