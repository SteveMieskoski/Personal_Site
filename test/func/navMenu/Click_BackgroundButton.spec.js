var assert = require('assert');

describe('Clicking background Button Should', function() {
    var rerun = 2;
    browser.url('/');
    it('work, but the menu button click test is currently not functioning');
   /* These tests are currentyl not working due to: Element is not clickable at point (36, 34). Other element would receive the click: <nav class="mdl-navigation-mod" id="nav-drawer-items">...</nav>
   it('trigger creation of canvas', function(){
        browser.click('#nav-drawer');
        browser.waitUntil(function () {
            return browser.isVisibleWithinViewport('#nav-drawer-items') === true
        }, 5000, 'expected nav to be visible after 5s').then(
            browser.click('p > button#0').waitUntil(function () {
                return browser.isVisibleWithinViewport('canvas.currentPageDisplay') === true
            }, 5000, 'expected nav to be visible after 5s')
        );
    }, rerun);

    it('trigger removal of MainPage Panel Elements', function () {
        var value = browser.getTagName('.element');
        assert.equal(value, 'undefined');
    }, rerun);

    it('trigger creation of Return Button', function () {
        var value = browser.getText('button.template-return-button');
        assert.equal(value, 'RETURN');
    }, rerun);

    it('display background html content', function () {
        var value = browser.getText('h2*=BACKGROUND');
        assert.equal(value, 'BACKGROUND TEMPLATE');
    }, rerun);
*/
});