(function () {
  chrome.storage.local.get('formStash', result => {

    const fields = result.formStash[stashfileId].fields;
    var processedNum = 0;

    for (field in fields) {
      const piecesArr = field.split('~');
      const fieldId = piecesArr[2];
      const fieldIdArr = fieldId.split('--');
      const fieldIdSimple = fieldIdArr[0];

      if (piecesArr[0] === 'input') {

        var domField = document.querySelector(`[id^=${fieldIdSimple}]`);

        if (domField != null) {
          if (domField.tagName.toLowerCase() !== 'input') {
            domField = document.querySelector(`#${fieldId}`);
          }
          if (domField != null) {
            domField.value = fields[field];
            console.log(`Applied ${fields[field]} to ${piecesArr[2]}`);
            processedNum++;
          }
        }
      }

      if (piecesArr[0] === 'textarea') {

        var domField = document.querySelector(`[id^=${fieldIdSimple}]`);

        if (domField != null) {
          if (domField.tagName.toLowerCase() !== 'textarea') {
            domField = document.querySelector(`#${fieldId}`);
          }
          if (domField != null) {
            domField.value = fields[field];
            console.log(`Applied ${fields[field]} to ${piecesArr[2]}`);
            processedNum++;
          }
        }
      }


      if (piecesArr[0] === 'select') {

        var domField = document.body.querySelector(`[id^=${fieldIdSimple}]`);

        if (domField != null) {
          if (domField.tagName.toLowerCase() !== 'select') {
            domField = document.querySelector(`#${fieldId}`);
          }
          if (domField != null) {
            domField.selectedIndex = fields[field];

            console.log(`Applied ${fields[field]} to ${piecesArr[2]}`);
            processedNum++;
          }
        }
      }


      if (piecesArr[0] === 'checkbox') {

        var domField = document.body.querySelector(`[id^=${fieldIdSimple}]`);

        if (domField != null) {
          if (domField.tagName.toLowerCase() !== 'input') {
            domField = document.querySelector(`#${fieldId}`);
          }

          if (domField != null) {
            if (fields[field] === 1) {
              domField.checked = true;
            } else {
              domField.checked = false;
            }

            console.log(`Applied ${fields[field]} to ${piecesArr[2]}`);
            processedNum++;
          }
        }
      }



      if (piecesArr[0] === 'cke') {

        var domField = document.body.querySelector(`[id^=${fieldIdSimple}]`);

        if (domField != null) {

          if (domField.tagName.toLowerCase() !== 'div') {
            domField = document.querySelector(`#${fieldId}`);
          }

          if (domField != null) {
            const iframe = domField.querySelector('.cke_wysiwyg_frame');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.body.innerHTML = fields[field];
            console.log(`Applied ${fields[field]} to ${piecesArr[2]}`);
            processedNum++;
          }

        }
      }



      if (piecesArr[0] === 'chosen') {

        var domField = document.body.querySelector(`[id^=${piecesArr[2]}]`);

        if (domField != null) {
          domField.querySelector('.chosen-single').innerHTML = fields[field];
          console.log(`Applied ${fields[field]} to ${piecesArr[2]}`);
          processedNum++;
        }
      }


    }

    alert(processedNum+' fields have been popped.');

  });




}());