var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/c_cpp");


    var selectedlang = "C";
    window.onload = function () {
        w = window;
        j = document;

        submit = j.getElementById("Submit");
        output = j.getElementById("output");

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