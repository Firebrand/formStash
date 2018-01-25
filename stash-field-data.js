(function(){
const fieldsObj = {};

var fieldNum = 0;


function addToFieldsObj(elementType, element) {

  if (element.id.length > 1) {
    const key = `${elementType}~id~${element.id}`;
    const value = `${element.value}`;
    console.log(`${key}~${value}`);
    fieldsObj[key] = value;
  }
}

hashCode = str => {
  let hash = 5381;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
  }
  return hash;
}

const fields = document.body.querySelectorAll("input");
fields.forEach(field => {
  if (field.value.length > 0 && field.type !== 'hidden' && field.type !== 'submit') {
    if (field.type !== 'checkbox') {
      addToFieldsObj("input", field);
      fieldNum++;
    } else {
      const key = `checkbox~id~${field.id}`;
      let value = 0;
      if (field.checked) {
        value = 1;
      }
      console.log(`${key}~${value}`);
      fieldNum++;
      fieldsObj[key] = value;
    }
  }

})


// Finish up CKE files
const ckes = document.body.querySelectorAll('.cke');
if (ckes != null) {
  ckes.forEach(cke => {
    const key = `cke~cke~${cke.id}`;
    const iframe = cke.querySelector('.cke_wysiwyg_frame');
    if (iframe != null) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const value = iframeDocument.body.innerHTML;

      console.log(`${key}~${value}`);
      fieldNum++;
      fieldsObj[key] = value;
    }
  })
}


const selects = document.body.querySelectorAll("select");
selects.forEach(select => {
  
  const key = `select~id~${select.id}`;
  const value = select.selectedIndex;

  console.log(`${key}~${value}`);
  fieldNum++;
  fieldsObj[key] = value;
})


const chosens = document.body.querySelectorAll(".chosen-container-single");
if (chosens != null) {
  chosens.forEach(chosen => {
    const key = `chosen~chosen~${chosen.id}`;
    const value = chosen.querySelector('.chosen-single').innerHTML;
    console.log(`${key}~${value}`);
    fieldNum++;
    fieldsObj[key] = value;
  })
}


const textareas = document.body.querySelectorAll("textarea");
textareas.forEach(textarea => {
  if (textarea.value.length > 1 && textarea.type !== 'hidden') addToFieldsObj("textarea", textarea);
  fieldNum++;
})

const today = new Date();
const documentTitle = `<b>${document.title}</b> | ${today.toLocaleString("en-US")} | ${fieldNum}`;
const hashedDocumentTitle = hashCode(document.title);


chrome.storage.local.get('formStash', result => {
  const formStash = result.formStash || {};

  formStash[hashedDocumentTitle] = {
    "title": documentTitle,
    "fields": fieldsObj
  }

  chrome.storage.local.set({
    "formStash": formStash
  });
});
}());