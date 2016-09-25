var assert = require('assert');

describe('Sanity Check two:', function() {
    var rerun = 2;

    it('should have something', function () {
        browser.url('/');
        var title = browser.getText('.page-title-name');
        assert.equal(title, 'Steve Mieskoski Portfolio');
    }, rerun );

});
