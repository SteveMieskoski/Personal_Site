var assert = require("assert");

describe('Programming page should', function () {
    var rerun = 2;
    browser.url('/');

    it('be accessed by clicking MainPage Programming panel', function(){
        browser.click('.element:nth-Child(4)');
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
        assert.equal(title, 'Steve Mieskoski: Programming');
    }, rerun );

    it('display background template html content', function () {
        var value = browser.getText('h2*=PROGRAMMING');
        assert.equal(value, 'PROGRAMMING');
    }, rerun);

});