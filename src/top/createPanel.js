'use strict';



function Elements() {
}

Elements.prototype = {
    constructor: Elements,

    create: function (data) {
        var element, number, icon, symbol, details;

        element = document.createElement('div');
        element.className = 'element';
        element.id = data.id;
        element.style.backgroundColor = 'rgba(37, 81, 118,' + (Math.random() * 0.25 + 0.50) + ')';

        number = document.createElement('div');
        icon = document.createElement('i');
        icon.className = 'material-icons';
        icon.style.cssText = 'font-size: 40px; ';
        icon.textContent = data.icon;
        icon.id = 'i' + data.id;
        number.appendChild(icon);
        number.className = 'image';
        element.appendChild(number);

        symbol = document.createElement('div');
        symbol.className = 'heading';
        symbol.textContent = data.title;
        symbol.id = 'h' + data.id;
        element.appendChild(symbol);

        details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = data.caption;
        details.id = 'c' + data.id;
        element.appendChild(details);

        return element;
    }
};


module.exports = new Elements;