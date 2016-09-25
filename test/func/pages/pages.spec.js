var assert = require('chai').assert;
var expect = require('chai').expect;

describe('page should', function () {
    var rerun = 2;

    browser.timeouts('page load', 60000);  //see if there is an implementation of this directly in selenium
    
    browser.url('/');

    before(function(){
        browser.url('/');
        // browser.url('http://localhost:9000');
        //browser.url('/');
        //  panels = browser.element('.element');
    });


    it('be on the MainPage with all panels present', function () {
        browser.waitForVisible('.element');
        var value = browser.getTagName('.element');
        expect(value.length).to.be.equal(9);
    });
    

    it('be accessed by clicking MainPage About Me panel');

    it('trigger the removal of MainPage Panel Elements');

    it('trigger the creation of a Return Button');

    it('display background template html content');

    it('clear the background scene after clicking the return button');
});