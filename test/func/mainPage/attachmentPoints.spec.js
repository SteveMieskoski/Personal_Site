var assert = require('assert');

describe('Main Page Structure should contain', function() {
    var rerun = 2;

    browser.url('/');
    browser.timeouts('page load', 10000);

    it('an i with id=menu', function () {
        var value = browser.getText('#nav-drawer');
        assert.equal(value, 'menu');
    }, rerun);

    it('a div with id=container', function () {
        var value = browser.getTagName('#container');
        assert.equal(value, 'div');
    }, rerun);

    it('a div with id=attachOutputs', function () {
        var value = browser.getTagName('#attachOutputs');
        assert.equal(value, 'div');
    }, rerun);

    it('a div with id=printButton', function () {
        var value = browser.getTagName('#printButton');
        assert.equal(value, 'div');
    }, rerun);

    it('an anchor  with id=downloadLink', function () {
        var value = browser.getTagName('#downloadLink');
        assert.equal(value, 'a');
    }, rerun);



});