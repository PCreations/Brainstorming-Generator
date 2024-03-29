//"Abstract" class
var Service = Class.extend({
	
	name: '',
	parameters: '',
	serviceURL: '',
	
	//constructor
	init: function(maxWord, searchWord, output) {
		this.maxWord = maxWord;
		this.searchWord = searchWord;
		this.output = output;
		this.selectedWords = new Array();
		this.numberWordBySenses = new Array(); //contiendra la liste de mot a recuperer pour chaque sens dans une limite de WORD_MAX_PER_SENSE mots par sens et WORD_LIMIT mots en tout
		this.wm = new WordManager();
		this.wm.WORD_LIMIT = this.maxWord;
	},
	
	getServiceURL: function() {
		return this.wm.BASE_URL+this.name+'/'+this.output+'/'+this.parameters;
	},
	
	sendRequest: function(callback, BSref) {
		var _this = this; //permet de retenir la reference a l'objet courant pour la fonction process
		$.ajax({
			url: this.getServiceURL(),
			type: 'GET',
			dataType: 'jsonp',
			dataCharset: 'jsonp',
			success: function(data) {
				var json = eval(data);
				//_this.process(json, _this, BSref);
				if (_this.wm.wordExists(json))
					_this.process(json, _this, BSref);
				else if (BSref.allWordsList.length < 1) {
					throw(alert("Erreur : je ne connais pas le mot : \""+_this.searchWord+"\"\nPeut-etre l'avez vous mal hortaugraffier ?\nJe vous rappel que vous ne devez entrez qu'un seul mot, et uniquement en anglais.\nUn systeme d'autocomplete sera mis en place bientot (peut-etre)\n\nVous pouvez recharger la page")); //TODO faire un vrai bloc catch/try
				}
			},
			complete: function(xhr, msg) {
				callback(BSref);
				//_this.wm.wordsCheck(callback, BSref);
			},
			error: function(xhr, status, error) {
				console.log(status+" "+error);
			}
		});
	},
	
	getInfos: function() {
		console.log(this);
	},
	
	process: function(json, _this, BSref) {
		var words = _this.wm.parseWords(json, _this.searchWord, BSref);
		//console.log(words);
		_this.numberWordBySenses = _this.wm.setNumberWordBySenses(words.length);
		_this.wm.selectWords(words, _this.numberWordBySenses);
		console.log("Selected Words : ");
		console.log(_this.wm.selectedWords);
	},
	
});