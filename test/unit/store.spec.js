// Mocha-Config1 Test Item
define(function (require) {
    var assert = require('vendor/chai').assert,
        store = require('../../src/store');


    describe('Store Tests:', function () {

        describe('Calling store', function () {

            it('should add an item to the store', function () {
                var storeTest = store({testItem: 0});

                assert.equal(storeTest.testItem, 0,
                    'No Item was added to the store');
            });

            it('store add additional item', function () {
                store({testItem2: 2});
                var storeTest = store({testItem1: 1});


                assert.equal(storeTest.testItem2, 2,
                    'both item2 and');
                assert.equal(storeTest.testItem1, 1,
                    'item1 should be present in store');
            });
        });
    });


});