
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Attachment Point', function() {
    var rerun = 1;

    browser.url('/');
    browser.timeouts('page load', 10000);


    it('displayOptionIcon should be present', function () {
        var value = browser.getAttribute('#attachmentPoint .displayOptionIcon', 'class');
        assert.notEqual(value, 'undefined');
    }, rerun);


    it('should animate on hover' , function () {
            browser.moveToObject('.displayOptionIcon');
            browser.buttonDown(0);
            browser.waitForValue('.displayOptionIconArrow', 2000);
        var animated = browser.isExisting('.displayOptionIconArrow');
        expect(animated).to.equal(true, 'arrangement icon did not animating');
    }, rerun);

});

