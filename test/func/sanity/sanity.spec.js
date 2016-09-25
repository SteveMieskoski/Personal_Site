var assert = require('assert');

describe('Sanity Check One:', function() {
    var rerun = 2;

    it('should be a pending test');

    it('should have the right title', function () {
        browser.url('/');
        var title = browser.getTitle();
        assert.equal(title, 'Steve Mieskoski Portfolio');
    }, rerun );

});