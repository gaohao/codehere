var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/c_cpp");


var selectedlang = "C";
window.onload = function () {
    w = window;
    j = document;

    submit = j.getElementById("Submit");
    output = j.getElementById("output");

    var Code = Parse.Object.extend('Code');
    var code = new Code();
    code.set($.password(16), editor.getValue());
    code.save(null, {
      success: function(gameScore) {
        // The object was saved successfully.
      },
      error: function(gameScore, error) {
        // The save failed.
        // error is a Parse.Error with an error code and description.
      }
    });

    submit.onclick = function () {
        new Ajax.Request('/codepad/', {
            method:'post',
            parameters: {code: editor.getValue(), lang: selectedlang},
            onSuccess: function(transport) {
                var response = transport.responseText;
                output.innerHTML = response;

            },
            onFailure: function() { alert('Something went wrong...'); }
        });
    }
}


function setlang(value) {
    selectedlang = value;
    switch (selectedlang) {
        case "C":
        case "C++":
        editor.getSession().setMode("ace/mode/c_cpp");
        break;
        case "D":
        case "Plain Text":
        case "Scheme":
         case "Haskell":
        editor.getSession().setMode("ace/mode/text");
        break;
        case "Lua":
        editor.getSession().setMode("ace/mode/lua");
        break;
        case "OCaml":
        editor.getSession().setMode("ace/mode/ocaml");
        break;
        case "PHP":
        editor.getSession().setMode("ace/mode/php");
        break;
        case "Perl":
        editor.getSession().setMode("ace/mode/perl");
        break;
        case "Python":
        editor.getSession().setMode("ace/mode/python");
        break;
        case "Ruby":
        editor.getSession().setMode("ace/mode/ruby");
        break;
        case "Tcl":
        editor.getSession().setMode("ace/mode/tcl");
        break;
        default:
        editor.getSession().setMode("ace/mode/text");
        break;

    }
}
function hellotemplate() {
    //todo
}

$.extend({ 
  password: function (length, special) {
    var iteration = 0;
    var password = "";
    var randomNumber;
    if(special == undefined){
        var special = false;
    }
    while(iteration < length){
        randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
        if(!special){
            if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
            if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
            if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
            if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
        }
        iteration++;
        password += String.fromCharCode(randomNumber);
    }
    return password;
  }
});

function password(length, special) {
  var iteration = 0;
  var password = "";
  var randomNumber;
  if(special == undefined){
      var special = false;
  }
  while(iteration < length){
    randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
    if(!special){
      if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
      if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
      if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
      if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
    }
    iteration++;
    password += String.fromCharCode(randomNumber);
  }
  return password;
}