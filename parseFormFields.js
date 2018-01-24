

var fieldsObj = {};

function id_or_name(elementType, element){

var key='';
var value='';
var type='';

    if (element.id.length>1) { 
        type = 'id';
    }
    else if (element.name.length>1){
        type = 'name';
    }

    key = `${elementType}:${type}:${element.id}`;
    value = `${element.value}`;
    

    console.log(`${key}:${value}`);

    fieldsObj[key] = value;
}

hashCode = function(str){
    var hash = 5381;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
    }
    return hash;
}

var fields = document.body.querySelectorAll("input");
fields.forEach(field=>{
if (field.value.length>1 && field.type!=='hidden' && field.type!=='submit') id_or_name("input",field);

}
)


// Finish up CKE files
var ckes = document.body.querySelector('.cke_wysiwyg_frame');
ckes.forEach(cke=>{
    var iframeDocument = cke.contentDocument || cke.contentWindow.document;
    var key = `cke:cke:${element.id}`;
}
)


var selects = document.body.querySelectorAll("select");
selects.forEach(select=>{

    id_or_name("select",select);

}
)


var textareas = document.body.querySelectorAll("textarea");
textareas.forEach(textarea=>{
if (textarea.value.length>1 && textarea.type!=='hidden') id_or_name("textarea",textarea);
}
)

var documentTitle = document.title;
var hashedDocumentTitle = hashCode(documentTitle);
chrome.storage.local.get('formStash', function (result) {
    var formStash = result.formStash || {};
    
    formStash[hashedDocumentTitle] = {"title":documentTitle,"fields":fieldsObj} 
    console.log(formStash);
    chrome.storage.local.set({"formStash":formStash});
});




