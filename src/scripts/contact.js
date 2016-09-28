define(function () {

    return function () {
        var xmlRequest,
            dialog = document.createElement('dialog');
        dialog.style.cssText = 'width: 95%; height: 95%; z-index: 1; overflow: visible; overflow-y: auto; ';
        dialog.id = 'ContactDialog';

        document.getElementById('attachOutputs').appendChild(dialog);

        xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = function () {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {

               $(dialog).html(xmlRequest.responseText);

                /*   var closeButtonScript = [
                    '<button id="closeDialog" style="position:absolute; left: 2%; top: 2%;">Close</button>',
                    '<button id="submitForm" style="position:absolute; left: 8%; top: 2%;">Submit</button>',
                    '<script>',
                    'var closeDialog = document.getElementById("closeDialog");',
                    'closeDialog.addEventListener("click", function() {',
                    'infoPrintDialog.close();',
                    ' });',

                    '</script>'
                ].join('\n');
                var ContactFormPresent = new Event('ContactFormActive');
                $(dialog).append(closeButtonScript); */
            }
        };

        xmlRequest.open('GET', './src/page/templates/contactForm.html', true);
        xmlRequest.send();
        dialog.showModal();
    };

});

/*
 '$( "#ContactForm" ).submit(function( event ) {',
 'event.preventDefault();',
 'console.log( $( "#ContactForm" ).serialize());',
 'var posting = $.post( "http://localhost:3000/test/test",  $( "#ContactForm" ).serialize());',
 ' posting.done(function( data ) {console.log(data)})',
 ' });',

 */