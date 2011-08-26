require(
    {
        paths: {
            bunit: 'src/bunit'
        }
    },
    ['bunit', 'tests/tests'],
    function(bunit, tests) {
        require.ready(function() {
            bunit.defaultUI(tests);
        });
    }
);
