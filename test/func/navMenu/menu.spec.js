var assert = require('assert');

describe('navigation menu should', function() {
    var rerun = 2;
    var holdingArray = [];

    browser.url('/');
  //  browser.timeouts('page load', 10000);

    it('be visible after clicking the icon with id=nav-drawer', function(){
        browser.click('#nav-drawer');
        browser.waitUntil(function () {
            return browser.isVisibleWithinViewport('#nav-drawer-items') === true
        }, 5000, 'expected nav to be visible after 5s');
    }, rerun);

    it('have a button with text saying BACKGROUND', function () {
        var value = browser.getText('.mdl-navigation__link');
        for(var i =0; i< value.length; i++){ holdingArray.push(value[i]); }
        expect(holdingArray).to.include('BACKGROUND');
        //assert.equal(value, 'Background');
    }, rerun);

    it('contain a button with text saying EXPERIENCE', function () {
        expect(holdingArray).to.include('EXPERIENCE');
        //assert.equal(value, 'Background');
    }, rerun);

    it('contain a button with text saying PROGRAMMING', function () {
        expect(holdingArray).to.include('PROGRAMMING');
        //assert.equal(value, 'Background');
    }, rerun);


    it('contain a button with text saying INTRODUCTION', function () {
        expect(holdingArray).to.include('INTRODUCTION');
        //assert.equal(value, 'Background');
    }, rerun);


    it('contain a button with text saying EDUCATION', function () {
        expect(holdingArray).to.include('EDUCATION');
        //assert.equal(value, 'Background');
    }, rerun);


    it('contain a button with text saying PRIOR CAREER', function () {
        expect(holdingArray).to.include('PRIOR CAREER');
        //assert.equal(value, 'Background');
    }, rerun);


    it('contain a button with text saying WHY PROGRAMMING', function () {
        expect(holdingArray).to.include('WHY PROGRAMMING');
        //assert.equal(value, 'Background');
    }, rerun);

    it('contain a button with text saying PREPARATION', function () {
        expect(holdingArray).to.include('PREPARATION');
        //assert.equal(value, 'Background');
    }, rerun);

    it('contain a button with text saying DATA ENTRY', function () {
        expect(holdingArray).to.include('DATA ENTRY');
        //assert.equal(value, 'Background');
    }, rerun);

    it('contain a button with text saying CLOSE MENU', function () {
        expect(holdingArray).to.include('CLOSE MENU');
        //assert.equal(value, 'Background');
    }, rerun);

    it('not show a button with text saying MAIN PAGE RETURN', function () {
        var value = browser.getAttribute('#nav10', 'class');
        expect(value).to.include('hide-element');
    }, rerun);
});