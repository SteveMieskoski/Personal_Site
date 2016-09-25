
var expect = require('chai').expect;
//var ConDatos = require('../pageObjects/conDatos');
var client;

var panels;

describe('MainPage panel element', function() {
    var rerun = 1;


    browser.timeouts('page load', 60000);  //see if there is an implementation of this directly in selenium

    before(function(){
        browser.url('/');
       // browser.url('http://localhost:9000');
        //browser.url('/');
      //  panels = browser.element('.element');
    });

    it('generally should be present', function () {
        browser.waitForVisible('.element');
        var value = browser.getTagName('.element');
        expect(value.length).to.be.equal(9);
    });

    it('Background panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h0');
        expect(text).to.be.equal('Background');

    });

    it('Experience panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h1');
        expect(text).to.be.equal('Experience');
    });

    it('About Me panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h2');
        expect(text).to.be.equal('About Me');
    });

    it('Programming panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h3');
        expect(text).to.be.equal('Programming');
    });

    it('Introduction panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h4');
        expect(text).to.be.equal('Introduction');
    });

    it('Education panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h5');
        expect(text).to.be.equal('Education');
    });

    it('Prior Career panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h6');
        expect(text).to.be.equal('Prior Career');
    });

    it('Why Programming panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h7');
        expect(text).to.be.equal('Why Programming');
    });

    it('Preparation panel should be present', function(){
        var elem = browser.elements('.element');
        var text = browser.getText('#h8');
        expect(text).to.be.equal('Preparation');
    });



});



/* //ConDatos.open();
 //ConDatos.background
 //expect(ConDatos.background.isExisting()).to.be.equal(true);
 browser.elements('.element');
 var elId = ConDatos.background;
 console.log('elId', elId); // todo remove debug item
 console.log('elId.value', elId.value); // todo remove debug item
 var text = elId.getText('#h0');
 expect(text).to.be.equal('Experiance');
 //browser.logger.info(ConDatos);
 var el =browser.element('.element');
 var Iditem = '#h'+'0';
 var text = el.getText('#h0');
 console.log(text);
 expect(text).to.be.equal('Experiance');*/











 /*   it('should include a background panel', function () {
        var value = browser.element('.element').getText('div.heading');
        // var value = browser.getTagName('.element');
        assert.equal(value, 'Background');
    }, rerun);

    it('should include a Education panel', function () {
        var value = browser.element('.element').getText('div*=Education');
        // var value = browser.getTagName('.element');
        assert.equal(value, 'Education');
    }, rerun);

    it('should click background panel', function () {
        browser.click('#0');
        browser.waitUntil(function () {
            return browser.isVisibleWithinViewport('button.template-return-button') === true
        }, 5000, 'expected nav to be visible after 5s');
        assert.notEqual(value, 'undefined');
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



    /*
     it('should be present', function () {
     var value = browser.getAttribute('#1', 'class');
     assert.equal(value, 'element');
     }, rerun);

     it('should be present', function () {
     var value = browser.getAttribute('#2', 'class');
     assert.equal(value, 'element');
     }, rerun);

     it('should be present', function () {
     var value = browser.getAttribute('#3', 'class');
     assert.equal(value, 'element');
     }, rerun);

     it('should be present', function () {
     var value = browser.getAttribute('#4', 'class');
     assert.equal(value, 'element');
     }, rerun);

     it('should be present', function () {
     var value = browser.getAttribute('#5', 'class');
     assert.equal(value, 'element');
     }, rerun);

     it('should be present', function () {
     var value = browser.getAttribute('#6', 'class');
     assert.equal(value, 'element');
     }, rerun);

     it('should be present', function () {
     var value = browser.getAttribute('#7', 'class');
     assert.equal(value, 'element');
     }, rerun);

     it('should be present', function () {
     var value = browser.getAttribute('#8', 'class');
     assert.equal(value, 'element');
     browser.log('browser');
     }, rerun);
     */

