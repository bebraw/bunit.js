require(
    {
        paths: {
            assert: 'src/assert',
            bunit: 'src/bunit'
        },
        urlArgs: "bust=" + (new Date()).getTime()
    },
    ['bunit', 'tests/tests'],
    function(bunit, tests) {
        require.ready(function() {
            var r = bunit.runner();

            r.defaultUI();
            r.run();
        });
    }
);
