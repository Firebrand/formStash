chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    var source = request.source;

  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function () {
    chrome.tabs.executeScript(null, {
      file: "parseFormFields.js"
    }, function () {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  }, false);


  var popPageButton = document.getElementById('popPage');
  popPageButton.addEventListener('click', function () {
    chrome.tabs.executeScript(null, {
      file: "popFields.js"
    }, function () {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  },false);


  var clearAllButton = document.getElementById('clearAll');
  clearAllButton.addEventListener('click', function () {
    chrome.storage.local.set({'formStash':''});
  },false);

}

window.onload = onWindowLoad;