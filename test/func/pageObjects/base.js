


function Base (browser) {
    this.title = "Steve Mieskoski Portfolio";
    this.browser = browser;
}
Base.prototype.open = function () {
    this.browser.url('http://localhost:9000')
};

Base.prototype.BrowserObject = function(){
    return this.browser;
};

Base.prototype.PanelElements = function(){
    return this.browser.element('.element');
};

Base.prototype.getElementId = function(webElement, index) {
    return webElement.value[index];
};

module.exports = new Base();