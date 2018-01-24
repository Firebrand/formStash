var fields = document.body.querySelectorAll("input");

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


fields.forEach(field=>{

if (field.value.length>1 && field.type!=='hidden' && field.type!=='submit') id_or_name("input",field);

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


chrome.storage.local.set({"nano":fieldsObj});