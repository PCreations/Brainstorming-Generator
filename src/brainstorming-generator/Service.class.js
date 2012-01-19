//"Abstract" class
var Service = Class.extend({
	
	name: '',
	parameters: '',
	serviceURL: '',
	BASE_URL : "http://id.asianwordnet.org/services/",
	WORD_LIMIT: 5,
	
	//constructor
	init: function(searchWord, output) {
		this.searchWord = searchWord;
		this.output = output;
		this.selectedWords = new Array();
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
		var words = _this.parseWords(json, _this);
		console.log(words);
		_this.selectWords(words, _this);
	},
	
	parseWords: function(json, _this) {
		var words = new Array();
		for (var word in json['data']) {
			words.push(new Word(
												json['data'][word]['synset_offset'], 
												json['data'][word]['words'],
												json['data'][word]['ss_type'],
												json['data'][word]['sense_id'],
												json['data'][word]['gloss']
											));
		}
		words = _this.cleanWords(words, _this);
		return words;
	},
	
	
	//Fonction permettant de garder uniquement les mots differents de celui d'origine dans la liste des mots recuperes
	cleanWords: function(words, _this) {
		for (var word in words) {
			var wordList = words[word].word;
			words[word].word = wordList.replace(_this.searchWord, "");
		}
		return words;
	},
	
	//Permet de choisir aleatoirement un mot dans un chaine en specifiant le delimiteur des mots
	pickOneWord: function(delimiter, string) {
		var splittedString = string.split(delimiter);
		var numberOfWords = splittedString.length;
		var randomKey = Math.floor(Math.random() * numberOfWords);
		return splittedString[randomKey];
	},
	
	//Permet de choisir un mot au hasard dans une chaine en supprimant les mots les plus courants et en ne selectionnant que les noms dans un premier temps
	pickRelevantWord: function(string) {
	
	},
	
	
	
});