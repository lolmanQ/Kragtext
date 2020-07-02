class EditorState{
	bold: boolean;
	italic: boolean;
	fontFamily: string;
	fontSize: number;
	constructor(bold:boolean, italic:boolean, fontFamily: string, fontSize: number){
		this.bold = bold;
		this.italic = italic;
		this.fontFamily = fontFamily;
		this.fontSize = fontSize;
	}
}

class Editor{
	document : TextDocument;
	state: EditorState;
	constructor(){
		this.state = new EditorState(false, false, "Ariel", 3);
		this.document = new TextDocument();
	}
}

class TextDocument{
	title: string;
	text: Character[];
	constructor(){
		this.text = [];
		this.title = "";
	}
}

class Character{
	entity: string;
	state: CharacterState;
	constructor(entity:string, state: CharacterState){
		this.entity = entity;
		this.state = state;
	}
}

class CharacterState{
	bold: boolean;
	italic: boolean;
	fontFamily: string;
	fontSize: number;
	constructor(bold:boolean, italic:boolean, fontFamily: string, fontSize: number){
		this.bold = bold;
		this.italic = italic;
		this.fontFamily = fontFamily;
		this.fontSize = fontSize;
	}
}

function DisplayDocument(textDocument: TextDocument){
	let displayElement = document.getElementById("documentParent");
	
	if(displayElement != null){
		while (displayElement.children.length > 0) {
			displayElement.children[0].remove();
		}

		for (let index = 0; index < textDocument.text.length; index++) {
			const element = textDocument.text[index];
			let pElement = document.createElement("p");
			let textNode = document.createTextNode(element.entity);
			pElement.appendChild(textNode);
			pElement.classList.add(element.state.fontFamily.toLowerCase());
			displayElement.appendChild(pElement);
		}
	}
}

var lastDownTarget:any, documentElement:any;
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

function KeydownEvent(e:KeyboardEvent) {
	if(lastDownTarget == documentElement) {
		DocumentPress(e);
	}
}

function DocumentPress(e: KeyboardEvent){
	if (e.isComposing || e.keyCode === 229) {
		return;
	}
	DocumentInput();
}

function DocumentInput(){
	let saftyStop = 0;
	let currentlySelected = document.getSelection();
	if(currentlySelected != null){
		let currentElement = currentlySelected.focusNode?.parentElement;
		editor.state.bold = false;
		editor.state.italic = false;
		editor.state.fontFamily = "Ariel";
		editor.state.fontSize = 3;
		while(currentElement?.id != "documentParent"){
			if(saftyStop > 1000){
				console.log("DocumentInput Safty stop triggerd");
				return;
			}
			if(currentElement?.nodeName == "B"){
				editor.state.bold = true;
			}
			if(currentElement?.nodeName == "I"){
				editor.state.italic = true;
			}
			if(currentElement?.nodeName == "FONT"){
				currentElement.id = "fontFind";
				let fontElements = document.getElementsByTagName("font");
				let fontElement:HTMLFontElement;
				for (let index = 0; index < fontElements.length; index++) {
					const element = fontElements[index];
					if(element.id == "fontFind"){
						fontElement = element;
						fontElement.id = "";
						if(fontElement.size != ""){
							editor.state.fontSize = parseInt(fontElement.size);
						}
						if(fontElement.face != ""){
							editor.state.fontFamily = fontElement.face;
						}
					}
				}
				
			}
			currentElement = currentElement?.parentElement;
			saftyStop++;
		}
	}

	
	
}

function format(command: any, value: any) {
	document.execCommand(command, false, value);
}

function FormatButtonPress(command:any, element:HTMLButtonElement, value: any){
	element.classList.toggle("active");
	format(command, value);
}

window.onload = function() {
    documentElement = document.getElementById('documentParent');

	document.addEventListener('mousedown', function(event) {
        lastDownTarget = event.target;
        if(event.target == documentElement){
			DocumentInput();
		}
	}, false);
	
	document.addEventListener('keydown', KeydownEvent, false);
}

function FontSizeChange(element:HTMLInputElement){
	console.log("Weeee");
	document.execCommand("fontSize", false, element.value);
}

function FontFamilyChange(element:HTMLSelectElement) {
	document.execCommand("fontName", false, element.value);
}

var editor = new Editor();

function TitleUpdate(inputElement: any){
	editor.document.title = inputElement.value;
}