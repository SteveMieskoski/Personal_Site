var assert = require("assert");

describe('Why Programming page should', function () {
    var rerun = 2;
    browser.url('/');

    it('be accessed by clicking MainPage Why Programming panel', function(){
        browser.click('.element:nth-Child(8)');
        browser.waitUntil(function () {
            return browser.isVisibleWithinViewport('.template-return-button') === true
        }, 10000, 'expected nav to be visible after 5s');
    }, rerun);

    it('trigger the removal of MainPage Panel Elements', function () {
        var value = browser.isVisible('.element');
        assert.equal(value, false);
    }, rerun);

    it('trigger the creation of a Return Button', function () {
        var value = browser.getText('button.template-return-button');
        assert.equal(value, 'RETURN');
    }, rerun);

    it.skip('should have the right title', function () {
        var title = browser.getTitle();
        assert.equal(title, 'Steve Mieskoski: Why Programming');
    }, rerun );

    it('display background template html content', function () {
        var value = browser.getText('h2*=WHY PROGRAMMING');
        assert.equal(value, 'WHY PROGRAMMING TEMPLATE');
    }, rerun);
});