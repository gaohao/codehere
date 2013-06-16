var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/c_cpp");

$(document).ready(function() {
    var Code = Parse.Object.extend('Code');

    var code_id = null;

    function submitCode(code_id) {
        var query = new Parse.Query(Code);
        query.get(code_id, {
            success: function(code) {
                code_id = code.id;
                code.set('content', editor.getValue());
                code.save(null, {
                    success: function(code) {},
                    error: function(code, error) {}
                });
            },
            error: function(code, error) {
                alert(error.message);
            }
        });
    }

    function fetchCode(code_id) {
        var query = new Parse.Query(Code);
        query.get(code_id, {
            success: function(code) {
                code_id = code.id;
                editor.setValue(code.get("content"));
            },
            error: function(code, error) {
                $('#code_id').val((error.message));
            }
        });
    }

    $("#get").click(function() {
        fetchCode($('#code_id').val());
    });

    $("#submit").click(function() {
        if (code_id === null) {
            var code_obj = new Code();

            code_obj.set('content', editor.getValue());

            code_obj.save(null, {
                success: function(code) {
                    code_id = code.id;

                    window.location.replace('/' + code_id);

                    $('#code_id').val(code.id);
                },
                error: function(code, error) {}
            });
        } else {
            submitCode($('#code_id').val());
        }

        new Ajax.Request('/codepad/', {
            method: 'post',
            parameters: {
                code: editor.getValue(),
                lang: selectedlang
            },
            onSuccess: function(transport) {
                var response = transport.responseText;
                $('#output').html(response);
            },
            onFailure: function() {
                alert('Something went wrong...');
            }
        });

    });

    url_split = window.location.href.split('/');

    if (url_split.length >= 4 && url_split[3] !== "") {
        fetchCode(url_split[3]);
        code_id = url_split[3];
        $('#code_id').val(url_split[3]);
    }
});


var selectedlang = "C";

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