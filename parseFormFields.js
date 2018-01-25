var fieldsObj = {};

function addToFieldsObj(elementType, element) {

  if (element.id.length > 1) {
    var key = `${elementType}~id~${element.id}`;
    var value = `${element.value}`;
    console.log(`${key}~${value}`);
    fieldsObj[key] = value;
  } 

}

hashCode = function (str) {
  var hash = 5381;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
  }
  return hash;
}

var fields = document.body.querySelectorAll("input");
fields.forEach(field => {
  if (field.value.length > 0 && field.type !== 'hidden' && field.type !== 'submit') {
    if ( field.type !== 'checkbox'){
      addToFieldsObj("input", field);
    }
    else {
      var key = `checkbox~id~${field.id}`;
      var value = 0;
      if (field.checked) {
        value = 1;
      }
        console.log(`${key}~${value}`);
        fieldsObj[key] = value;
    }
  }

})


// Finish up CKE files
var ckes = document.body.querySelectorAll('.cke');
if (ckes != null) {
  ckes.forEach(cke => {
    var key = `cke~cke~${cke.id}`;
    var iframe = cke.querySelector('.cke_wysiwyg_frame');
    if (iframe != null) {
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    var value = iframeDocument.body.innerHTML;

    console.log(`${key}~${value}`);
    fieldsObj[key] = value;
    }
  })
}


var selects = document.body.querySelectorAll("select");
selects.forEach(select => {
  var key = `select~id~${select.id}`;
  var value = select.selectedIndex;

  console.log(`${key}~${value}`);
  fieldsObj[key] = value;
})


var chosens = document.body.querySelectorAll(".chosen-container-single");
if (chosens != null) {
  chosens.forEach(chosen => {
    var key = `chosen~chosen~${chosen.id}`;
    var value = chosen.querySelector('.chosen-single').innerHTML;
    console.log(`${key}~${value}`);
    fieldsObj[key] = value;
  })
}


var textareas = document.body.querySelectorAll("textarea");
textareas.forEach(textarea => {
  if (textarea.value.length > 1 && textarea.type !== 'hidden') addToFieldsObj("textarea", textarea);
})

var today = new Date();
var documentTitle = '<b>' + document.title + '</b> (' + today.toLocaleString("en-US") + ')';
var hashedDocumentTitle = hashCode(document.title);


chrome.storage.local.get('formStash', function (result) {
  var formStash = result.formStash || {};

  formStash[hashedDocumentTitle] = {
    "title": documentTitle,
    "fields": fieldsObj
  }

  chrome.storage.local.set({
    "formStash": formStash
  });
});