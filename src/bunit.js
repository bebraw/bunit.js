define(['lib/reload'], function(reload) {
    // output
    function consoleOutput(report) {
        console.log(report.text);
    }

    function HTMLOutput(target) {
        return function(report) {
            target.innerHTML += '<div class="' + report.state + '">' + report.text + '</div>';
        };
    }

    // helpers
    function noop() {}

    // core logic
    function bunit(setName, newTests) {
        if(!('_tests' in bunit)) {
            bunit._tests = [];
        }

        if(setName && newTests) {
            bunit._tests.push({name: setName, tests: newTests});
        }
    }

    bunit.runner = function(interval) {
        var scope = this;
        scope.reloader = reload();

        return {
            defaultUI: function(parent) {
                parent = parent || document.body;

                var outputArea = document.createElement('div');

                scope.output = HTMLOutput(outputArea);
                scope.reloader.interval(2000);

                parent.appendChild(scope.reloader.ui());
                parent.appendChild(outputArea);
            },
            run: function(opts) {
                opts = opts || {};

                var passedTests = 0;
                var testTotal = 0;
                var out = [];

                scope.output = 'output' in opts? opts.output: scope.output;

                if(!scope.output) {
                    console.log('bunit.run is missing output sink!');

                    return;
                }

                var interval = 'interval' in opts? opts.interval: 0;

                if(interval) {
                    scope.reloader.interval(interval);
                }

                for(var i = 0; i < bunit._tests.length; i++) {
                    var model = bunit._tests[i];
                    var testSet = model.tests;

                    var setUp = 'setUp' in testSet? testSet.setUp: noop;
                    delete testSet.setUp;

                    var tearDown = 'tearDown' in testSet? testSet.tearDown: noop;
                    delete testSet.tearDown;

                    out.push({state: 'started', text: 'Running "' + model.name + '" tests'});

                    for(var testName in testSet) {
                        var test = testSet[testName];

                        if(testName[0] == '_') {
                            continue;
                        }

                        try {
                            var params = setUp();
                            test.apply(testSet, params? [params]: []);

                            out.push({state: 'passed', text: 'PASSED: ' + testName});

                            passedTests++;
                        }
                        catch(e) {
                            out.push({state: 'failed', text: 'FAILED: ' + testName});
                            out.push({state: 'error', text: e});
                        }

                        tearDown();

                        testTotal++;
                    }
                }

                var finished = {state: 'finished', text: passedTests + '/' + testTotal + ' tests passed'};
                out.unshift(finished);
                out.push(finished);

                for(i = 0; i < out.length; i++) {
                    var line = out[i];

                    scope.output(line);
                }

                if(scope.reloader.interval()) {
                    scope.reloader.play();
                }
            }
        };
    };

    bunit.HTMLOutput = HTMLOutput;
    bunit.consoleOutput = consoleOutput;

    return bunit;
});
