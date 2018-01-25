chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    var source = request.source;

  }
});

function onWindowLoad() {

  var stash = document.querySelector('#stash');
  var message = document.querySelector('#message');

  chrome.storage.local.get('formStash', function (result) {
    console.log(result);
    if (typeof result.formStash === 'object') {
    stash.innerHTML = "";
    for (hash in result.formStash) {
      stash.innerHTML += `<div id='${hash}' class='stash-file'>${result.formStash[hash].title}</div><div id='${hash}' class='delete-stash-file'></div>`;
    }
  }


    var stashFileButtons = document.querySelectorAll('.stash-file');

    stashFileButtons.forEach(stashFileButton => {
      stashFileButton.addEventListener('click', function () {
        chrome.tabs.executeScript(null, {
          code: 'var stashfileId = '+stashFileButton.id+';'
        }, function () {
          chrome.tabs.executeScript(null, {
            file: "popFields.js"
          }, function () {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.runtime.lastError) {
              message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
            }
          });
        });
      });
    });

    var deleteFileButtons = document.querySelectorAll('.delete-stash-file');

    deleteFileButtons.forEach(deleteFileButton => {
      deleteFileButton.addEventListener('click', function () {
        chrome.storage.local.get('formStash', function (res) {
          var formStash = res.formStash || {};
        
          delete formStash[deleteFileButton.id];
        
          chrome.storage.local.set({
            "formStash": formStash
          });
          location.reload();
        });
        
      });
    });



  });


  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function () {
    chrome.tabs.executeScript(null, {
      file: "parseFormFields.js"
    }, function () {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
      location.reload();
    });
   
  }, false);


  // var popPageButton = document.getElementById('popPage');
  // popPageButton.addEventListener('click', function () {
  //   chrome.tabs.executeScript(null, {
  //     file: "popFields.js"
  //   }, function () {
  //     // If you try and inject into an extensions page or the webstore/NTP you'll get an error
  //     if (chrome.runtime.lastError) {
  //       message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
  //     }
  //   });
  // }, false);


  var clearAllButton = document.getElementById('clearAll');
  clearAllButton.addEventListener('click', function () {
    chrome.storage.local.set({
      'formStash': ''
    });
    location.reload();
  }, false);

}

window.onload = onWindowLoad;