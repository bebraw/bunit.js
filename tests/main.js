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
