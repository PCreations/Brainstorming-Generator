var BSgenerator = Class.extend({

	OUTPUT: "json",
	DICO: {
		DEFAULT: "en2id",
	},
	
	//constructor
	init: function(word) {
		this.word = word;
		this.dictionaryService = new DictionaryService(word, this.OUTPUT, this.DICO.DEFAULT);
		this.treeLevel = new Array();
		this.stack = new Array(); //pile d'execution pour controler la recursivite
	},
	
	arrayCopy: function(src) {
		var dest = new Array();
		for (var i = 0; i < src.length; i++){
			dest[i] = src[i];
		}
		return dest;
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
		this.dictionaryService.sendRequest(this.saveTreeLevel1, this);
	},

	saveTreeLevel1: function(_this) {
		var selectedWords = _this.dictionaryService.wm.selectedWords;
		console.log("MOT RECU TREE LEVEL 1 : ");
		console.log(selectedWords);
		var stack = _this.stack;
		if (selectedWords.length > 0) {
			for (var i=0; i<selectedWords.length; i++) {
				stack[i] = selectedWords[i];
				console.log("this.stack["+i+"] = "+stack[i]);
			}
			console.log("stack après mots reçus 1");
			console.log(stack);
			_this.getTreeLevel2(_this);
		}
		else console.log("AUCUN MOT : ARRET DU PROCESS");
		_this.stack = stack;
		console.log(_this.stack);
	},
	
	getTreeLevel2: function(_this) {
		console.log("DEBUT PROCESS TREE LEVEL 2");
		console.log("STACK :");
		console.log(_this.stack);
		var stack = _this.stack;
		for (var w in stack) {
			console.log("on prend le mot "+stack[w]);
			//On prend le premier mot de la pile
			_this.dictionaryService.setSearchWord(stack[w]);
			
			//On recherche les mots associes
			_this.dictionaryService.sendRequest(_this.saveTreeLevel2, _this);
			
			//On depile la pile
			_this.stack.shift();
		}
	},
	
	saveTreeLevel2: function(_this) {
		//sauvegarde de la liste des mots recu
		var selectedWords = _this.dictionaryService.wm.selectedWords;
		console.log("MOT RECU TREE LEVEL 2 : ");
		console.log(selectedWords);
		_this.treeLevel[_this.dictionaryService.searchWord] = _this.arrayCopy(selectedWords);
		if (_this.stack.length > 0) _this.getTreeLevel2(_this);
		console.log("FIN PROCESSUS");
		console.log(_this.treeLevel);
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
	
	setWord: function(word) {
		this.word = word;
	},

});