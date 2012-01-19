//"Abstract" class
var Service = Class.extend({
	
	name: '',
	parameters: '',
	serviceURL: '',
	BASE_URL : "http://id.asianwordnet.org/services/",
	
	//constructor
	init: function(searchWord, output) {
		this.searchWord = searchWord;
		this.output = output;
		this.selectedWords = new Array();
		this.numberWordBySenses = new Array(); //contiendra la liste de mot a recuperer pour chaque sens dans une limite de WORD_MAX_PER_SENSE mots par sens et WORD_LIMIT mots en tout
		this.wm = new WordManager();
	},
	
	getServiceURL: function() {
		return this.BASE_URL+this.name+'/'+this.output+'/'+this.parameters;
	},
	
	sendRequest: function() {
		var _this = this; //permet de retenir la reference a l'objet courant pour la fonction process
		$.ajax({
			url: this.getServiceURL(),
			type: 'GET',
			dataType: 'jsonp',
			dataCharset: 'jsonp',
			success: function(data) {
				var json = eval(data);
				_this.process(json, _this);
			},
		});
	},
	
	getInfos: function() {
		console.log(this);
	},
	
	process: function(json, _this) {
		var words = _this.wm.parseWords(json, _this.searchWord);
		console.log(words);
		_this.numberWordBySenses = _this.wm.setNumberWordBySenses(words.length);
		/*_this.wm.selectWords(words, _this.selectedWords);
		console.log(_this.selectedWords);*/
	},
	
	//Permet d'ajouter un mot dans la liste des mots selectionnes
	addSelectedWord: function(word) {
		console.log("Mot a ajouter : \""+word+"\"\n");
		var ws = new WordSelector();
		if (!ws.inArray(word, this.selectedWords)) {
			if (!(word == "" || word == " ")) //securite au cas ou
				this.selectedWords.push(word);
		}
	},
	
	
	
});