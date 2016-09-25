// login.page.js
var Base = require('./base');
var LoginPage = Object.create(Base, {
    /**
     * define elements
     */
    username: { get: function () { return browser.element('#username'); } },
    password: { get: function () { return browser.element('#password'); } },
    form:     { get: function () { return browser.element('#login'); } },
    flash:    { get: function () { return browser.element('#flash'); } },
    /**
     * define or overwrite page methods
     */
    open: { value: function() {
        Page.open.call(this, 'login');
    } },
    submit: { value: function() {
        this.form.submitForm();
    } }
});
module.exports = LoginPage