
var webdriver = require('selenium-webdriver');
//var By = webdriver.By;
//var until = webdriver.until;

PageFile = function PageFile(browser) {
    this.browser = browser;
    //this.url = "http://localhost:9000";
};

PageFile.prototype.view = function() {
    this.driver.get(this.url);
    return webdriver.promise.fulfilled(true);
};

PageFile.prototype.panelElementsPresent = function() {
    var d = webdriver.promise.defer();
    browser.element('.element').then(function(el){
        var Iditem = '#h'+'0';
        d.fulfill(el.getText(Iditem));
        //assert.equal(text ,'Background');
    });
    return d.promise;
};

PageFile.prototype.panelPresent = function() {
    var element = this.driver.findElements(By.id('h0'));
    return  element.getAttribute('value');

};

module.exports = PageFile;


// return this.driver.wait(until.elementLocated(By.id('h0')));
/*
this.driver.wait(function() {
    return this.driver.findElement(By.id('h0')).getText().then(function(value) {
        return value === 'Background';
    });
}, 1000);

*/