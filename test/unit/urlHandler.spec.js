define(function (require) {

    var injector,
        chai = require('vendor/chai'),
        assert = chai.assert,
        expect = chai.expect,
        sinonChai = require('vendor/sinon-chai'),
        Squire = require('vendor/Squire');

    chai.should();
    chai.use(sinonChai);
    sinon.assert.expose(chai.assert, {prefix: ""});

    // thanks to http://stackoverflow.com/questions/19914810/mocha-chai-async-tests-done-fn-not-working
    // SM Note: mocha was not registering the test failure because the tests completed before calling callback.
    function check(done, f) {
        try {
            f();
            done();
        } catch (e) {
            done(e);
        }
    }

    describe('urlHandler Tests:', function () {


// skipping this describe block for the moment while I build the checkInitUrl block
        describe('checkNavState', function () {
            describe('add page location names to sessionStorage', function () {

                before('add init Mock to sessionStorage', function () {
                    sessionStorage.setItem('locationList', JSON.stringify(['MockItem']));
                });

                // beforeEach('add init Mock to sessionStorage',function() {
                beforeEach('add init Mock to sessionStorage', function () {
                    injector = new Squire();
                });

                afterEach('remove Mock and Item from sessionStorage', function () {
                    //  sessionStorage.removeItem('locationList');  //todo look into why this was breaking the tests and the reconcile before and beforeEach into one
                    injector.remove();
                });

                // todo add sinon spies and/or stubs
                it('should add page location name to sessionStorage', function () {
                    injector
                        .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                        .mock('store', 'mocks/returnNoFunction')
                        .mock('top/data', 'mocks/dataObject')
                        .mock('jquery', 'mocks/noFunction')
                        .require(['../src/urlHandler', 'mocks/dataObject'], function (urlHandler, mockData) {

                            urlHandler.checkNavState(mockData, 0);  // Function method under test

                            var sessionRecord = JSON.parse(sessionStorage.getItem('locationList'));
                            expect(sessionRecord).to.contain('background');
                            expect(sessionRecord).to.contain('MockItem');
                        },
                            function (err) {
                                console.log('ERROR Loading Function');
                            });
                });


                it('should add MainPage location name to sessionStorage', function () {
                    injector
                        .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                        .mock('store', 'mocks/returnNoFunction')
                        .mock('top/data', 'mocks/dataObject')
                        .mock('jquery', 'mocks/noFunction')
                        .require(['../src/urlHandler', 'mocks/dataObject'], function (urlHandler, mockData) {

                            urlHandler.checkNavState(mockData, 9999);  // Function method under test

                            var sessionRecord = JSON.parse(sessionStorage.getItem('locationList'));
                            expect(sessionRecord).to.contain('MainPage');
                            expect(sessionRecord).to.contain('MockItem');
                        },
                            function (err) {
                                console.log('ERROR Loading Function');
                            });
                });
            });

            describe.skip('the sessionStorage', function () {  // will need to implement promises throughout this spec file to ensure these will be passable

                it('should have record of prior pages  (prior tests here) in sessionStorage', function () {
                    injector
                        .mock('scripts/runCreateOrDestroy', 'mocks/runCreateOrDestroy')
                        .mock('store', 'mocks/returnNoFunction')
                        .mock('top/data', 'mocks/dataObject')
                        .mock('jquery', 'mocks/noFunction')
                        .require(['../src/urlHandler', 'mocks/dataObject'], function (urlHandler, mockData) {
                            var sessionRecord,
                                mockData = require('mocks/dataObject');

                            urlHandler.checkNavState(mockData, 1);  // Function method under test

                            sessionRecord = JSON.parse(sessionStorage.getItem('locationList'));
                            assert.equal(4, sessionRecord.length)
                        },
                            function (err) {
                                console.log('ERROR Loading Function');
                            });
                });

                it('record in sessionStorage should exist in access order', function () {
                    var sessionRecord = JSON.parse(sessionStorage.getItem('locationList'));
                    expect(sessionRecord).to.contain('MockItem');
                    expect(sessionRecord).to.contain('background');
                    expect(sessionRecord).to.contain('MainPage');
                    expect(sessionRecord).to.contain('aboutMe');
                });
            });

        });


        describe('checkInitUrl', function () {

            beforeEach('add init Mock to sessionStorage', function () {
                injector = new Squire();
            });

            afterEach('remove Mock and Item from sessionStorage', function () {
                injector.remove();
            });

            it('should determine the page location when a visitor first arrives', function (done) {
                var value;
                setTimeout(function () {
                    injector
                        .mock('top/data', 'mocks/dataReverseLookup')
                        .require(['../src/urlHandler', 'mocks/dataReverseLookup'], function (urlHandler, data) {

                            urlHandler.checkInitUrl({'background': 0}, 'background', function (vars) {
                                value = vars;
                            });

                            check(done, function () {
                                assert.equal(0, value);
                            });
                        });

                }, 100);
            });

        });

        it('handleBackForward');
    });
});


/*
 var mockfunction = {
 method1: function(vars){
 console.log(vars); // todo remove debug item
 return vars;
 }
 };

 */