var BSgenerator = Class.extend({

	OUTPUT: "json",
	DICO: {
		DEFAULT: "en2id",
	},
	
	//constructor
	init: function(word) {
		this.word = word;
		this.dictionaryService = new DictionaryService(word, this.OUTPUT, this.DICO.DEFAULT);
	},
	
	ucwords: function(str) {
		// Uppercase the first character of every word in a string  
		// 
		// version: 1109.2015
		// discuss at: http://phpjs.org/functions/ucwords
		// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		// +   improved by: Waldo Malqui Silva
		// +   bugfixed by: Onno Marsman
		// +   improved by: Robin
		// +      input by: James (http://www.james-bell.co.uk/)
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// *     example 1: ucwords('kevin van  zonneveld');
		// *     returns 1: 'Kevin Van  Zonneveld'
		// *     example 2: ucwords('HELLO WORLD');
		// *     returns 2: 'HELLO WORLD'
		return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
			return $1.toUpperCase();
		});
	},
	
	generate: function() {
		this.dictionaryService.sendRequest(this.draw, this);
	},

	draw: function(_this) {
		console.log("ICI JE DESSINE LE BRAINSTORMING !");
		//creation des elements
		$('<ul>'
			+'<li><a href="#">'+_this.word+'</a>'
				+'<ul id="first">'
				+'</ul>'
			+'</li>'
		+'</ul>').appendTo('body');
		
		var selectedWords = _this.dictionaryService.wm.selectedWords;
		console.log(selectedWords);
		
		for (var w in selectedWords) {
			$('<li><a href="#">'+_this.cleaner(selectedWords[w], _this)+'</a></li>').appendTo('#first');
		}
				
	},
	
	cleaner: function(word, _this) {
		word = word.replace("_", " ");
		word = _this.ucwords(word);
		return word;
	},

});