var $ = require("../lib/jquery.min.js");

module.exports = function () {
    "use strict";

    var dialog = document.createElement('dialog');
    dialog.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible;  overflow-y: scroll; ';
    dialog.id = 'infoPrintDialog';

    var closeButton = document.createElement('button'),
        xmlRequest = new XMLHttpRequest();

    document.getElementById('attachOutputs').appendChild(dialog);

    xmlRequest.onreadystatechange = function () {
        if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {

            $(dialog).html(xmlRequest.responseText);
            var closeButtonScript = [
                '<button id="closeDialog" class="noprint" style="position: absolute; left: 2%; top: 2%;">Close</button>',
                '<button id="PrintDocument" class="noprint"  style="position: absolute; left: 8%; top: 2%;">Print Document</button>',
                '<script>',
                'var closeDialog = document.getElementById("closeDialog");',
                'closeDialog.addEventListener("click", function() {',
                'var DialogElement = document.getElementById("infoPrintDialog");',
                'infoPrintDialog.close();',
                'DialogElement.remove();',
                ' });',
                'PrintDocument.addEventListener("click", function() {',
                '$("button#CloseDialog").detach();',
                'window.print();',
                ' });',
                '</script>'
            ].join('\n');

            $(dialog).append(closeButtonScript);
        }
    };

    xmlRequest.open('GET', './src/page/templates/print.html', true);
    xmlRequest.send();

    dialog.showModal();

};
