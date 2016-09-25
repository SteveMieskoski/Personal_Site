var assert = require("assert");

describe('About Me page should', function () {
    var rerun = 2;
    browser.url('/');

    it('be on the MainPage with all panels present', function(){
        browser.waitUntil(function () {
            return browser.getTagName('.element').length === 9
        }, 10000, 'expect MainPage to be reset after 10s');
    }, rerun);

    it('be accessed by clicking MainPage About Me panel', function(){
        browser.click('div');
        browser.waitUntil(function () {
            return browser.isVisibleWithinViewport('.template-return-button') === true
        }, 10000, 'expected nav to be visible after 10s');
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
        assert.equal(title, 'Steve Mieskoski: About Me');
    }, rerun );

    it('display background template html content', function () {
        var value = browser.getText('h2*=ABOUT');
        assert.equal(value, 'ABOUT ME');
    }, rerun);

    it('clear the background scene after clicking the return button', function(){
        browser.click('button.template-return-button');
        browser.waitUntil(function () {
            return browser.getTagName('.element').length === 9
        }, 10000, 'expect MainPage to be reset after 10s');
    }, rerun);
});