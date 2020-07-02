var EditorState = /** @class */ (function () {
    function EditorState(bold, italic, fontFamily, fontSize) {
        this.bold = bold;
        this.italic = italic;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
    }
    return EditorState;
}());
var Editor = /** @class */ (function () {
    function Editor() {
        this.state = new EditorState(false, false, "Ariel", 3);
        this.document = new TextDocument();
    }
    return Editor;
}());
var TextDocument = /** @class */ (function () {
    function TextDocument() {
        this.text = [];
        this.title = "";
    }
    return TextDocument;
}());
var Character = /** @class */ (function () {
    function Character(entity, state) {
        this.entity = entity;
        this.state = state;
    }
    return Character;
}());
var CharacterState = /** @class */ (function () {
    function CharacterState(bold, italic, fontFamily, fontSize) {
        this.bold = bold;
        this.italic = italic;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
    }
    return CharacterState;
}());
function DisplayDocument(textDocument) {
    var displayElement = document.getElementById("documentParent");
    if (displayElement != null) {
        while (displayElement.children.length > 0) {
            displayElement.children[0].remove();
        }
        for (var index = 0; index < textDocument.text.length; index++) {
            var element = textDocument.text[index];
            var pElement = document.createElement("p");
            var textNode = document.createTextNode(element.entity);
            pElement.appendChild(textNode);
            pElement.classList.add(element.state.fontFamily.toLowerCase());
            displayElement.appendChild(pElement);
        }
    }
}
var lastDownTarget, documentElement;
function StartDocument() {
    /*
    let displayElement = document.getElementById("documentParent");
    console.log(displayElement);
    
    $("#documentParent").keydown(function(e:any){
        console.log(e);
    });
    
    
    if(displayElement != null){
        displayElement.addEventListener('keydown', DocumentPress);
    }
    */
}
function KeydownEvent(e) {
    if (lastDownTarget == documentElement) {
        DocumentPress(e);
    }
}
function DocumentPress(e) {
    if (e.isComposing || e.keyCode === 229) {
        return;
    }
    DocumentInput();
}
function DocumentInput() {
    var _a;
    var saftyStop = 0;
    var currentlySelected = document.getSelection();
    if (currentlySelected != null) {
        var currentElement = (_a = currentlySelected.focusNode) === null || _a === void 0 ? void 0 : _a.parentElement;
        editor.state.bold = false;
        editor.state.italic = false;
        editor.state.fontFamily = "Ariel";
        editor.state.fontSize = 3;
        while ((currentElement === null || currentElement === void 0 ? void 0 : currentElement.id) != "documentParent") {
            if (saftyStop > 1000) {
                console.log("DocumentInput Safty stop triggerd");
                return;
            }
            if ((currentElement === null || currentElement === void 0 ? void 0 : currentElement.nodeName) == "B") {
                editor.state.bold = true;
            }
            if ((currentElement === null || currentElement === void 0 ? void 0 : currentElement.nodeName) == "I") {
                editor.state.italic = true;
            }
            if ((currentElement === null || currentElement === void 0 ? void 0 : currentElement.nodeName) == "FONT") {
                currentElement.id = "fontFind";
                var fontElements = document.getElementsByTagName("font");
                var fontElement = void 0;
                for (var index = 0; index < fontElements.length; index++) {
                    var element = fontElements[index];
                    if (element.id == "fontFind") {
                        fontElement = element;
                        fontElement.id = "";
                        if (fontElement.size != "") {
                            editor.state.fontSize = parseInt(fontElement.size);
                        }
                        if (fontElement.face != "") {
                            editor.state.fontFamily = fontElement.face;
                        }
                    }
                }
            }
            currentElement = currentElement === null || currentElement === void 0 ? void 0 : currentElement.parentElement;
            saftyStop++;
        }
    }
}
function format(command, value) {
    document.execCommand(command, false, value);
}
function FormatButtonPress(command, element, value) {
    element.classList.toggle("active");
    format(command, value);
}
window.onload = function () {
    documentElement = document.getElementById('documentParent');
    document.addEventListener('mousedown', function (event) {
        lastDownTarget = event.target;
        if (event.target == documentElement) {
            DocumentInput();
        }
    }, false);
    document.addEventListener('keydown', KeydownEvent, false);
};
function FontSizeChange(element) {
    console.log("Weeee");
    document.execCommand("fontSize", false, element.value);
}
function FontFamilyChange(element) {
    document.execCommand("fontName", false, element.value);
}
var editor = new Editor();
function TitleUpdate(inputElement) {
    editor.document.title = inputElement.value;
}
