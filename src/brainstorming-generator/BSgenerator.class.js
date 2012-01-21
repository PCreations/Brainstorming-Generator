var BSgenerator = Class.extend({

	OUTPUT: "json",
	DICO: {
		DEFAULT: "en2id",
	},
	
	//constructor
	init: function(word, maxWord, callback) {
		this.word = word;
		this.maxWord = maxWord;
		this.callback = callback;
		this.dictionaryService = new DictionaryService(this.maxWord, word, this.OUTPUT, this.DICO.DEFAULT);
		this.senses = new Array(); //contiendra l'id des sens des mots pour limiter les synonymes dans les recherches
		this.allWordsList = new Array(); //contient la liste de tous les mots independamment de leur relation
	},
	
	reload: function(word, maxWord, callback) {
		//this.word = word;
		this.maxWord = maxWord;
		this.callback = callback;
		this.dictionaryService = new DictionaryService(this.maxWord, word, this.OUTPUT, this.DICO.DEFAULT);
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
		this.dictionaryService.sendRequest(this.callback, this);
	},

	draw: function(treeLevel) {
		console.log("ICI JE DESSINE LE BRAINSTORMING !");
		//creation des elements
		$('<ul>'
			+'<li><a href="#">'+this.word+'</a>'
				+'<ul id="first">'
				+'</ul>'
			+'</li>'
		+'</ul>').appendTo('body');
		
		for(var i = 0; i<treeLevel.length; i++) {
			console.log("sous mot "+i+" de "+this.word+" treeLevel["+i+"][0]: "+treeLevel[i][0]);
			$('<li><a href="#">'+this.cleaner(treeLevel[i][0], this)+'</a>'
					+'<ul id="'+i+'">'
					+'</ul>'
				+'</li>').appendTo('#first');
			for(var j = 0; j<treeLevel[i][1].length; j++) {
				$('<li><a href="#">'+this.cleaner(treeLevel[i][1][j], this)+'</a></li>').appendTo('#'+i);
			}
			
		}
			
	},
	
	cleaner: function(word, _this) {
		word = word.replace("_", " ");
		word = _this.ucwords(word);
		return word;
	},

});