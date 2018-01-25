chrome.storage.local.get('formStash', function (result) {

    var fields = result.formStash[stashfileId].fields;
  
    for (field in fields) {
      var piecesArr = field.split('~');
  
      if (piecesArr[0] === 'input' || piecesArr[0] === 'textarea') {
        var domField = document.querySelector('#' + piecesArr[2]);
        if (domField != null) {
          domField.value = fields[field];
          console.log(`Applied ${fields[field]} to ${piecesArr[2]}`)
        }
      }
  
  
      if (piecesArr[0] === 'checkbox') {
  
        var domField = document.body.querySelector('#' + piecesArr[2]);
  
        if (domField != null) {
          if (fields[field]===1){
            domField.checked = true;
          }
          else {
            domField.checked = false;
          }
          
          console.log(`Applied ${fields[field]} to ${piecesArr[2]}`)
        }
      }
  
      if (piecesArr[0] === 'cke') {
  
        var domField = document.body.querySelector('#' + piecesArr[2]);
  
        if (domField != null) {
          var iframe = domField.querySelector('.cke_wysiwyg_frame');
          var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
          iframeDocument.body.innerHTML = fields[field];
          console.log(`Applied ${fields[field]} to ${piecesArr[2]}`)
  
  
        }
      }
  
  
  
      if (piecesArr[0] === 'chosen') {
  
        var domField = document.body.querySelector('#' + piecesArr[2]);
  
        if (domField != null) {
          domField.querySelector('.chosen-single').innerHTML = fields[field];
          console.log(`Applied ${fields[field]} to ${piecesArr[2]}`)
        }
      }
  
  
    }
  
  });