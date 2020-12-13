var Typer = {
	text: null,
	countTimer: null,
	index: 0, // current cursor position
	speed: 7, // speed of the Typer
	init: function () {// inizialize Typer
		countTimer = setInterval(function () { Typer.updLstChr(); }, 500); // inizialize timer for blinking cursor
		Typer.text = Typer.text.slice(0, Typer.text.length - 1);
	},

	content: function () {
		return $("#console").html();// get console content
	},

	write: function (str) {// append to console content
		$("#console").append(str);
		return false;
	},

	addText: function () {//Main function to add the code
		if (Typer.text) { // if text is loaded
			var cont = Typer.content(); // get the console content
			if (cont.substring(cont.length - 1, cont.length) == "|") // if the last char is the blinking cursor
				$("#console").html($("#console").html().substring(0, cont.length - 1)); // remove it before adding the text

			Typer.index += Typer.speed;	// add to the index the speed
			var text = Typer.text.substring(0, Typer.index)// parse the text for stripping html enities
			var rtn = new RegExp("\n", "g"); // newline regex
			$("#console").html(text.replace(rtn, "<br/>"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			window.scrollBy(0, 50); // scroll to make sure bottom is always visible
		}

	},

	updLstChr: function () { // blinking cursor
		var cont = this.content(); // get console 
		if (cont.substring(cont.length - 1, cont.length) == "|") // if last char is the cursor
			$("#console").html($("#console").html().substring(0, cont.length - 1)); // remove it
		else
			this.write("<b>|</b>"); // else write it
	}
}

var timer;
function t() {
	Typer.addText();
	if (Typer.index > Typer.text.length) {
		clearInterval(timer);
	}
}

$(function () {
	Typer.text = $("#yesThisIsAnActualText").html();
	Typer.init();
	timer = setInterval("t();", 30);
});