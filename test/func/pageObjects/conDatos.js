
 var Base = require('./base');
 var conDatos = Object.create(Base, {

/**
 * define elements
 */
 panelElements: { get: function(){ Base.browser.getAttribute('.TopRendererDomEl .element', 'innerHtml', function(err, res){ return res;})}},
 background: { get: function(){ Base.PanelElements; return elementIdElement(0,'#0'); } },
 experience: { get: function(){ return Base.PanelElements.getText('#1'); } },
 aboutMe: { get: function(){ return Base.PanelElements.getText('#2'); } },
 programming: { get: function(){ return Base.PanelElements.getText('#3'); } },
 introduction: { get: function(){ return Base.PanelElements.getText('#4'); } },
 education: { get: function(){ return Base.PanelElements.getText('#5'); } },
 priorCareer: { get: function(){ return Base.PanelElements.getText('#6'); } },
 whyProgramming: { get: function(){ return Base.PanelElements.getText('#7'); } },
 preparation: { get: function(){ return Base.PanelElements.getText('#8'); } },


/**
 * define or overwrite page methods
 */

 open: { value: function() {
 Base.open.call(this);
 } },
 getElementId: { value: function(el){
 Base.getElementId(el);
 } }
 });




// background: { get: function(index){ var el = Base.PanelElements; return Base.getElementId(el, index);   } },
//Base.browser.elementIdElement(eID, '#0');
//=============================================================================



/*
conDatos = function PageFile(browser) {
    this.browser = browser;
    this.url = "http://localhost:9000";
};

conDatos.prototype.open = function () {
    this.browser.url('http://localhost:9000')
};


conDatos.prototype.panelElements = function() {
    return this.browser.element('.element');
};

conDatos.prototype.panelPresent = function() {
    var element = this.browser.findElements(By.id('h0'));
    return  element.getAttribute('value');

};


module.exports = conDatos;
    */