chrome.storage.local.get('formStash', function (result) {

    var fields = result.formStash[stashfileId].fields;
    console.log(fields)

    for (field in fields) {
        var piecesArr = field.split(':');

        if (piecesArr[0] === 'input' || piecesArr[0] === 'textarea') {
            var domField = document.querySelector('#' + piecesArr[2]);
            if (domField != null) {
            domField.value = fields[field];
            console.log(`Applied ${fields[field]} to ${domField}`)
            }
        }


    }

});