
var $ = require("../lib/jquery.min.js");

module.exports = function exampleButtonClicked(url) {
    console.log('print button clicked'); // todo remove debug item
    var dialog = document.createElement('dialog');
    dialog.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible;  overflow-y: scroll; ';
    dialog.id = 'exampleDialog';


    var dialogIframe = document.createElement('iframe');
    dialogIframe.src = url;
    dialogIframe.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible;  overflow-y: scroll; ';
    dialogIframe.id = 'exampleIframe';

    var closeButton = document.createElement('button');


    document.getElementById('attachOutputs').appendChild(dialog);
    document.getElementById('exampleDialog').appendChild(dialogIframe);

    var closeButtonScript = [
        '<button id="closeDialog"  style="position:absolute; right: 2%; top: 2%;">Close</button>',
        '<script>',
        'var closeDialog = document.getElementById("closeDialog");',
        'closeDialog.addEventListener("click", function() {',
        'exampleDialog.close();',
        ' });',
        '</script>'
    ].join('\n');

    $(dialog).append(closeButtonScript);

    dialog.showModal();

};

