const IMAGE_URL = "https://api.openai.com/v1/images/generations";
const VARIATIONS_URL = "https://api.openai.com/v1/images/variations";
const EDITS_URL = "https://api.openai.com/v1/images/edits";
const TTS_URL = "https://api.openai.com/v1/audio/speech";
const TRANSCRIPTION_URL = "https://api.openai.com/v1/audio/transcriptions";
const TRANSLATION_URL = "https://api.openai.com/v1/audio/translations";
const MODERATION_URL = "https://api.openai.com/v1/moderations";
const TOAST_TYPE_PRIMARY = 1;
const TOAST_TYPE_DANGER = 2;
const TOAST_TYPE_Success = 3;

const DALLE3 = "dall-e-3";
const DALLE2 = "dall-e-2";

const IMAGE = 1;
const MODERATION = 2;
const AUDIO = 3;
const TEXT = 4;

$(document).ready(init);

const uploadFile = file => {
  console.log("Uploading file to OpenAI...");          
  const request = new XMLHttpRequest();         
  request.open("POST", VARIATIONS_URL, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
      jsonResponse = JSON.parse(request.responseText);
      for (i = 0; i < jsonResponse.data.length; i++) {
        addResponse(IMAGE, jsonResponse.data[i].url);
      }
      logtotoast(TOAST_TYPE_Success, "Request Completed Successfully");
      $("body").css("cursor", "default");
    } else {
      $("body").css("cursor", "default");
      if (request.status != 200) {
        logtotoast(TOAST_TYPE_DANGER, "Invalid Image");
      }
    }
  };
  var formData = new FormData(); 
  formData.append('image', file);
  formData.append('model', DALLE2);
  formData.append('n', parseInt(document.getElementById("variationsnumber").value, 10));
  request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("apiKey")}`)
  request.setRequestHeader("Accept", "application/json");
  $("body").css("cursor", "progress");
  logtotoast(TOAST_TYPE_PRIMARY, "Sending request...");
  request.send(formData);
  document.getElementById('file-selector').value = null;
};

const editFile = file => {
  console.log("Uploading file to OpenAI...");          
  const request = new XMLHttpRequest();         
  request.open("POST", EDITS_URL, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
      jsonResponse = JSON.parse(request.responseText);
      for (i = 0; i < jsonResponse.data.length; i++) {
        addResponse(IMAGE, jsonResponse.data[i].url);
      }
      logtotoast(TOAST_TYPE_Success, "Request Completed Successfully");
      $("body").css("cursor", "default");
    } else {
      $("body").css("cursor", "default");
      if (request.status != 200) {
        logtotoast(TOAST_TYPE_DANGER, "Invalid Image");
      }
    }
  };
  var formData = new FormData(); 
  formData.append('image', file);
  formData.append('model', DALLE2);
  formData.append('prompt', document.getElementById("editDescription").value);
  formData.append('n', parseInt(document.getElementById("editvariationsnumber").value, 10));
  request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("apiKey")}`)
  request.setRequestHeader("Accept", "application/json");
  $("body").css("cursor", "progress");
  logtotoast(TOAST_TYPE_PRIMARY, "Sending request...");
  request.send(formData);
  document.getElementById('edit-file-selector').value = null;
  document.getElementById("editDescription").value = "";
};

const transcribeFile = file => {
  console.log("Uploading file to OpenAI...");          
  const request = new XMLHttpRequest();         
  request.open("POST", TRANSCRIPTION_URL, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
      let jsonRequest = JSON.parse(request.responseText);
      addResponse(TEXT, `Transcription: ${jsonRequest.text}`);
      logtotoast(TOAST_TYPE_Success, "Request Completed Successfully");
      $("body").css("cursor", "default");
    } else {
      $("body").css("cursor", "default");
      if (request.status != 200) {
        logtotoast(TOAST_TYPE_DANGER, "Invalid File");
      }
    }
  };
  var formData = new FormData(); 
  formData.append('file', file);
  formData.append('model', document.getElementById('transcriptionModel').value);
  if (document.getElementById('transcriptionLanguage').value != "") {
    formData.append('language', document.getElementById('transcriptionLanguage').value)
  }
  if (document.getElementById('transcriptionPrompt').value != "") {
    formData.append('prompt', document.getElementById('transcriptionPrompt').value)
  }
  request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("apiKey")}`)
  request.setRequestHeader("Accept", "application/json");
  $("body").css("cursor", "progress");
  logtotoast(TOAST_TYPE_PRIMARY, "Sending request...");
  request.send(formData);
  document.getElementById('transcription-file-selector').value = null;
  document.getElementById('transcriptionLanguage').value = "";
  document.getElementById('transcriptionPrompt').value = "";
};

const translateFile = file => {
  console.log("Uploading file to OpenAI...");          
  const request = new XMLHttpRequest();         
  request.open("POST", TRANSLATION_URL, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
      let jsonRequest = JSON.parse(request.responseText);
      addResponse(TEXT, `English Translation: ${jsonRequest.text}`);
      logtotoast(TOAST_TYPE_Success, "Request Completed Successfully");
      $("body").css("cursor", "default");
    } else {
      $("body").css("cursor", "default");
      if (request.status != 200) {
        logtotoast(TOAST_TYPE_DANGER, "Invalid File");
      }
    }
  };
  var formData = new FormData(); 
  formData.append('file', file);
  formData.append('model', document.getElementById('translationModel').value);
  if (document.getElementById('translationPrompt').value != "") {
    formData.append('prompt', document.getElementById('translationPrompt').value)
  }
  request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("apiKey")}`)
  request.setRequestHeader("Accept", "application/json");
  $("body").css("cursor", "progress");
  logtotoast(TOAST_TYPE_PRIMARY, "Sending request...");
  request.send(formData);
  document.getElementById('translation-file-selector').value = null;
  document.getElementById('translationPrompt').value = "";
};
     
const fileInput = document.querySelector("#file-selector");
  fileInput.addEventListener("change", event => {
    var files = event.target.files;
    uploadFile(files[0]);
});

const fileInputEdit = document.querySelector("#edit-file-selector");
  fileInputEdit.addEventListener("change", event => {
    var files = event.target.files;
    editFile(files[0]);
});

const fileInputTranslation = document.querySelector("#translation-file-selector");
  fileInputTranslation.addEventListener("change", event => {
    var files = event.target.files;
    translateFile(files[0]);
});

const fileInputTranscription = document.querySelector("#transcription-file-selector");
  fileInputTranscription.addEventListener("change", event => {
    var files = event.target.files;
    transcribeFile(files[0]);
});

$('#dalle-tab').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  document.getElementById("variations-card").style.display = "none";
  document.getElementById("edits-card").style.display = "none";
  document.getElementById("tts-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "none";
  document.getElementById("translation-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "none";
  document.getElementById("dalle-card").style.display = "block";
})

$('#moderation-tab').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  document.getElementById("variations-card").style.display = "none";
  document.getElementById("edits-card").style.display = "none";
  document.getElementById("tts-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "none";
  document.getElementById("translation-card").style.display = "none";
  document.getElementById("dalle-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "block";
})

$('#translation-tab').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  document.getElementById("variations-card").style.display = "none";
  document.getElementById("edits-card").style.display = "none";
  document.getElementById("tts-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "none";
  document.getElementById("dalle-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "none";
  document.getElementById("translation-card").style.display = "block";
})

$('#tts-tab').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  document.getElementById("dalle-card").style.display = "none";
  document.getElementById("variations-card").style.display = "none";
  document.getElementById("edits-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "none";
  document.getElementById("translation-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "none";
  document.getElementById("tts-card").style.display = "block";
})

$('#transcription-tab').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  document.getElementById("dalle-card").style.display = "none";
  document.getElementById("variations-card").style.display = "none";
  document.getElementById("edits-card").style.display = "none";
  document.getElementById("tts-card").style.display = "none";
  document.getElementById("translation-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "block";
})

$('#variations-tab').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  document.getElementById("dalle-card").style.display = "none";
  document.getElementById("edits-card").style.display = "none";
  document.getElementById("tts-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "none";
  document.getElementById("translation-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "none";
  document.getElementById("variations-card").style.display = "block";
})

$('#edits-tab').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  document.getElementById("dalle-card").style.display = "none";
  document.getElementById("variations-card").style.display = "none";
  document.getElementById("tts-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "none";
  document.getElementById("translation-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "none";
  document.getElementById("edits-card").style.display = "block";
})

// Initialization function
function init() {
  document.getElementById("variations-card").style.display = "none";
  document.getElementById("moderation-card").style.display = "none";
  document.getElementById("tts-card").style.display = "none";
  document.getElementById("edits-card").style.display = "none";
  document.getElementById("transcription-card").style.display = "none";
  document.getElementById("translation-card").style.display = "none";
  var input = document.getElementById("imageDescription");
  var apiKeyInput = document.getElementById("apiKeyInput");

  apiKeyInput.value = localStorage.getItem("apiKey");

  input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("createImage").click();
    }
  });
}

function logtotoast(type, message) {
  switch (type) {
    case TOAST_TYPE_PRIMARY:
      var toastEle = document.getElementById("toastprimary");
      toastEle.querySelector('.toast-body').innerHTML = message;
      const toastPri = bootstrap.Toast.getOrCreateInstance(toastEle);
      toastPri.show();
      break;
    case TOAST_TYPE_DANGER:
      var toastdgEle = document.getElementById("toastdanger");
      toastdgEle.querySelector('.toast-body').innerHTML = message;
      //spinner-border spinner-border-sm visually-hidden
      const toastdg = bootstrap.Toast.getOrCreateInstance(toastdgEle);
      toastdg.show();
      break;
    case TOAST_TYPE_Success:
      var toastscEle = document.getElementById("toastsuccess");
      toastscEle.querySelector('.toast-body').innerHTML = message;
      //spinner-border spinner-border-sm visually-hidden
      const toastsc = bootstrap.Toast.getOrCreateInstance(toastscEle);
      toastsc.show();
      break;
    default:
      console.log('');
  }
}

/**
 *  This will be trigerred from the save button in the modal dialog
 *  Saves the API key in local storage.
 * 
 * Note : Saving API key in local storage can be cause security vulnerability. Use alternate approach for production.
 */
function saveAPIKey() {
  var apiKey = document.getElementById("apiKeyInput");
  localStorage.setItem("apiKey", apiKey.value);
  console.log("Api key saved");
}

function clearAllChats() {
  $("#console-log").val("");
  $("#image-list span").remove();
}

async function callModeration(prompt, model) {
  $("#createModeration").prop("disabled", true);
  $(document.getElementById("createModeration").querySelector('.spinner-border')).removeClass("visually-hidden");

  $("body").css("cursor", "progress");

  const openAI = {
    model: model,
    input: prompt
  };

  logtotoast(TOAST_TYPE_PRIMARY, "Sending request...");

  // Calling OpenAPI webservice
  await $.ajax({
    type: "POST",
    url: MODERATION_URL,
    data: JSON.stringify(openAI),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("apiKey")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    success: function (msg) {
      logtotoast(TOAST_TYPE_Success, "Request Completed Successfully");

      $("body").css("cursor", "default");
      addResponse(MODERATION, msg.results)

      $("#createModeration").prop("disabled", false);
      $(document.getElementById("createModeration").querySelector('.spinner-border')).addClass("visually-hidden");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $("body").css("cursor", "default");
      logtotoast(TOAST_TYPE_DANGER, "Invalid Moderation Promppt");
      $("#createModeration").prop("disabled", false);
      $(document.getElementById("createModeration").querySelector('.spinner-border')).addClass("visually-hidden");
    },
  });
}

async function callGPT(description, size, style, model, number) {
  $("#createImage").prop("disabled", true);
  $(document.getElementById("createImage").querySelector('.spinner-border')).removeClass("visually-hidden");

  $("body").css("cursor", "progress");

  const openAI = {
    model: model,
    prompt: description,
    n: 1,
    size: size,
    style: style, // vivid or natural
  };

  openAI.n = parseInt(number, 10);

  logtotoast(TOAST_TYPE_PRIMARY, "Sending request...");

  // Calling OpenAPI webservice
  await $.ajax({
    type: "POST",
    url: IMAGE_URL,
    data: JSON.stringify(openAI),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("apiKey")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    success: function (msg) {
      logtotoast(TOAST_TYPE_Success, "Request Completed Successfully");
      if (model != DALLE2) {
        addToConsole(`Image Description: ${msg.data[0].revised_prompt}`,"Agent");
      }
      logtotoast(TOAST_TYPE_PRIMARY, "Loading Image...");
      for (i = 0; i < msg.data.length; i++) {
        addResponse(IMAGE, `${msg.data[i].url}`);
      }

      $("body").css("cursor", "default");

      $("#createImage").prop("disabled", false);
      $(document.getElementById("createImage").querySelector('.spinner-border')).addClass("visually-hidden");
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      $("body").css("cursor", "default");
      //   alert("Invalid image request");
      logtotoast(TOAST_TYPE_DANGER, JSON.parse(XMLHttpRequest.responseText).error.message);
      $("#createImage").prop("disabled", false);
      $(document.getElementById("createImage").querySelector('.spinner-border')).addClass("visually-hidden");
    },
  });
}

async function createModeration() {
  var input = document.getElementById("moderationPrompt").value;

  if (input.trim() == "") {
    logtotoast(TOAST_TYPE_DANGER, "Moderation prompt required");
  } else {
    response = await callModeration(
      document.getElementById("moderationPrompt").value,
      document.getElementById("moderationModel").value
    );
    document.getElementById("moderationPrompt").value = "";
  } 
}

async function createTTS() {
  var input = document.getElementById("ttsDescription").value;
  if (input.trim() == "") {
    logtotoast(TOAST_TYPE_DANGER, "TTS prompt required");
    return;
  }
  $("#createTTS").prop("disabled", true);
  $(document.getElementById("createTTS").querySelector('.spinner-border')).removeClass("visually-hidden");
  var data = JSON.stringify({
    "model": document.getElementById('ttsModel').value,
    "input": document.getElementById('ttsDescription').value,
    "voice": document.getElementById("ttsVoice").value
  });

  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      logtotoast(TOAST_TYPE_Success, "Request Completed Successfully");
      addResponse(AUDIO, window.URL.createObjectURL(this.response));
      $("#createTTS").prop("disabled", false);
      $(document.getElementById("createTTS").querySelector('.spinner-border')).addClass("visually-hidden");
    }
  });

  xhr.open("POST", TTS_URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("apiKey")}`);
  xhr.setRequestHeader("Accept", "*/*");
  logtotoast(TOAST_TYPE_PRIMARY, "Sending request...");
  xhr.send(data);
  document.getElementById('ttsDescription').value = "";
}

// Handle CreateImange function. Main function to call
async function createImage() {
  var input = document.getElementById("imageDescription").value;

  if (input.trim() == "") {
    logtotoast(TOAST_TYPE_DANGER, "Image description required");
    //alert("Image description required.");
  } else {
    response = await callGPT(
      document.getElementById("imageDescription").value,
      document.getElementById("gptsize").value,
      document.getElementById("gptstyle").value,
      document.getElementById("gptmodel").value,
      document.getElementById("gptnumber").value
    );
    document.getElementById("imageDescription").value = "";
  }
}

function addResponse(type, msg) {
  var span = createElement(type, msg);
  $("#image-list").append(span);
  document.getElementById("image-list").scrollTop = document.getElementById("image-list").scrollHeight;
}

function createElement(type, msg) {
  if (type == AUDIO) {
    var span = document.createElement("span");
    $(span).addClass("log-element-agent");
    $(span).addClass("p-2");
    var sendSpan = document.createElement("span");
    $(sendSpan).addClass("log-element-sender");
    //sendSpan.innerHTML = `<audio controls src="${url}" type="audio/mpeg"></audio>`;
    sendSpan.innerHTML = `<audio style="border:10px solid lightsalmon;border-radius: 50px;" controls><source src="${msg}" type="audio/mpeg"></audio>`;
    console.log(sendSpan.innerHTML)
    var msgSpan = document.createElement("span");
    $(msgSpan).addClass("log-element-msg");
    $(span).append(sendSpan);
    $(span).append(msgSpan);
    return span;
  } else if (type == IMAGE) {
    var span = document.createElement("span");
    $(span).addClass("log-element-agent");
    $(span).addClass("p-2");
    var sendSpan = document.createElement("span");
    $(sendSpan).addClass("log-element-sender");
    sendSpan.innerHTML = `<img src="${msg}" alt="" width="100%" height="100%">`;
    var msgSpan = document.createElement("span");
    $(msgSpan).addClass("log-element-msg");
    $(span).append(sendSpan);
    $(span).append(msgSpan);
    return span;
  } else if (type == MODERATION) {
    var span = document.createElement("span");
    $(span).addClass("log-element-agent");
    $(span).addClass("p-2");
    var sendSpan = document.createElement("span");
    $(sendSpan).addClass("log-element-sender");
    sendSpan.innerHTML = `<pre id="json-data">${JSON.stringify(msg, null, 2)}</pre>`;
    var msgSpan = document.createElement("span");
    $(msgSpan).addClass("log-element-msg");
    $(span).append(sendSpan);
    $(span).append(msgSpan);
    return span;
  } else if (type == TEXT) {
    var span = document.createElement("span");
    $(span).addClass("log-element-agent");
    $(span).addClass("p-2"); 
    var msgArray = msg.split(":");
    var sender = msgArray[0];
    var restMsg = ""; 
    for (var i = 1; i < msgArray.length; i++) {
      if (i == 1) {
        restMsg += " " + msgArray[i];
      } else {
        restMsg += ":" + msgArray[i];
      }
    }
    var sendSpan = document.createElement("span");
    $(sendSpan).addClass("log-element-sender");
    sendSpan.innerHTML = sender + ":";
    var msgSpan = document.createElement("span");
    $(msgSpan).addClass("log-element-msg");
    restMsg = restMsg.replaceAll(`\n`, `<BR>`);
    $(msgSpan).append(restMsg);
    $(span).append(sendSpan);
    $(span).append(msgSpan);
    return span;   
  }
}

function addToConsole(msg, requestor) {
  var span = createLogElement(msg, requestor);
  $("#console-log").append(span);
  document.getElementById("console-log").scrollTop = document.getElementById("console-log").scrollHeight;
}

function createLogElement(msg, type) {
  var span = document.createElement("span");
  if (type == "User") {
    $(span).addClass("log-element");
  } else {
    $(span).addClass("log-element-agent");
  }
  $(span).addClass("p-2");

  var msgArray = msg.split(":");
  var sender = msgArray[0];
  var restMsg = "";

  for (var i = 1; i < msgArray.length; i++) {
    if (i == 1) {
      restMsg += " " + msgArray[i];
    } else {
      restMsg += ":" + msgArray[i];
    }
  }

  var sendSpan = document.createElement("span");

  $(sendSpan).addClass("log-element-sender");
  sendSpan.innerHTML = sender + ":";
  var msgSpan = document.createElement("span");
  $(msgSpan).addClass("log-element-msg");
  restMsg = restMsg.replaceAll(`\n`, `<BR>`);
  $(msgSpan).append(messageWithLink(restMsg));
  $(span).append(sendSpan);
  $(span).append(msgSpan);
  return span;
}

function messageWithLink(msg) {
  var matches = msg.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].toLowerCase().indexOf("http") != -1) {
        // handle hyperlinks
        msg = msg.replace(matches[i],' <a href = "' + matches[i] + '"target = "_blank" > ' + matches[i] + " </a>");
      }
    }
  }
  return msg;
}