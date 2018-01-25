chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action == "getSource") {
    const source = request.source;
  }
});

function onWindowLoad() {

  const stash = document.querySelector('#stash');
  const message = document.querySelector('#message');

  chrome.storage.local.get('formStash', result => {
    console.log(result);
    if (typeof result.formStash === 'object') {
      stash.innerHTML = "";
      for (hash in result.formStash) {
        stash.innerHTML += `<div id='${hash}' class='stash-file'>${result.formStash[hash].title}</div><div id='${hash}' class='delete-stash-file'></div>`;
      }
    }


    const stashFileButtons = document.querySelectorAll('.stash-file');

    stashFileButtons.forEach(stashFileButton => {
      stashFileButton.addEventListener('click', () => {
        chrome.tabs.executeScript(null, {
          code: `var stashfileId = ${stashFileButton.id};`
        }, () => {
          chrome.tabs.executeScript(null, {
            file: "pop-field-data.js"
          }, () => {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.runtime.lastError) {
              message.innerText = `There was an error injecting script : \n${chrome.runtime.lastError.message}`;
            }
          });
        });
      });
    });

    const deleteFileButtons = document.querySelectorAll('.delete-stash-file');

    deleteFileButtons.forEach(deleteFileButton => {
      deleteFileButton.addEventListener('click', () => {
        chrome.storage.local.get('formStash', res => {
          const formStash = res.formStash || {};

          delete formStash[deleteFileButton.id];

          chrome.storage.local.set({
            "formStash": formStash
          });
          location.reload();
        });

      });
    });
  });


  const checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', () => {
    chrome.tabs.executeScript(null, {
      file: "stash-field-data.js"
    }, () => {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = `There was an error injecting script : \n${chrome.runtime.lastError.message}`;
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


  const clearAllButton = document.getElementById('clearAll');
  clearAllButton.addEventListener('click', () => {
    chrome.storage.local.set({
      'formStash': ''
    });
    location.reload();
  }, false);

}

window.onload = onWindowLoad;