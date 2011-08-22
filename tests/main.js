require({paths: {bunit: '../src/bunit'}}, ['tests', 'bunit'], function(tests, bu) {
    require.ready(function() {
        var outputArea = document.createElement('div');

        document.body.appendChild(bu.playbackUI());
        document.body.appendChild(outputArea)

        bu.tests().run({
            output: bu.HTMLOutput(outputArea),
            refresh: 2000
        });
    });
});
