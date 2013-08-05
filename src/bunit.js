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

                scope.asyncTests = 0;
                scope.passedTests = 0;
                scope.testTotal = 0;
                scope.out = [];

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

                    scope.out.push({state: 'started', text: 'Running "' + model.name + '" tests'});

                    for(var testName in testSet) {
                        var test = testSet[testName];
                        var doneCb;

                        if(testName[0] == '_') {
                            continue;
                        }

                        if(testName.indexOf('async') === 0) {
                            console.log(testName);
                            doneCb = asyncTest(testName);
                            scope.asyncTests++;
                        }
                        else {
                            // needed due to hoisting
                            doneCb = undefined;
                        }

                        try {
                            var params = setUp(opts);

                            if(!(params instanceof Array)) params = [params];

                            if(doneCb) params.push(doneCb);

                            test.apply(testSet, params);

                            if(!doneCb) {
                                scope.out.push({state: 'passed', text: 'PASSED: ' + testName});

                                scope.passedTests++;
                            }
                        }
                        catch(e) {
                            scope.out.push({state: 'failed', text: 'FAILED: ' + testName});
                            scope.out.push({state: 'error', text: e});
                        }

                        tearDown();

                        scope.testTotal++;
                    }
                }
                function asyncTest(testName) {
                    return function() {
                        scope.out.push({state: 'passed', text: 'PASSED: ' + testName});
                        scope.passedTests++;
                        scope.asyncTests--;
                    };
                }

                this.poll(this);
            },
            poll: function(runner) {
                if(scope.asyncTests > 0) {
                    setTimeout(function() {runner.poll(runner);}, 200);

                    return;
                }
                var finished = {state: 'finished', text: scope.passedTests + '/' + scope.testTotal + ' tests passed'};
                scope.out.unshift(finished);
                scope.out.push(finished);

                for(var i = 0; i < scope.out.length; i++) {
                    var line = scope.out[i];
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
