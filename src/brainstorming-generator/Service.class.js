//"Abstract" class
var Service = Class.extend({
	
	name: '',
	parameters: '',
	serviceURL: '',
	BASE_URL : "http://id.asianwordnet.org/services/",
	WORD_LIMIT: 10,
	WORD_MAX_PER_SENSE: 3,
	
	//constructor
	init: function(searchWord, output) {
		this.searchWord = searchWord;
		this.output = output;
		this.selectedWords = new Array();
		this.numberWordBySenses = new Array(); //contiendra la liste de mot a recuperer pour chaque sens dans une limite de WORD_MAX_PER_SENSE mots par sens et WORD_LIMIT mots en tout
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
	
	
	setNumberWordBySenses: function(numberOfSenses) {
		console.log("Nombre de sens : "+numberOfSenses);
		var numberOfWordBySenses = Math.floor(this.WORD_LIMIT / numberOfSenses); //on obtient ainsi le nombre moyen de mots par sens. 
		console.log("Nombre de mots par sens : "+numberOfWordBySenses);
		var unity = numberOfWordBySenses - 1 //permet de savoir le nombre d'"unites" a disposition pour choisir un nombre aleatoire (correspond au nombre max du rand d'ou le -1)
		for (var i=1; i<=numberOfSenses; i++) {
			console.log("Nombre d'unités : "+unity);
			var numberOfWord;
			if (i != numberOfSenses) { // on peut definir aleatoirement le nombre de mot a piocher en fonction des unites
				numberOfWord = Math.floor(Math.random() * unity)+1; //nombre de mot a piocher pour ce sens
				console.log("Nombre de mots à piocher : "+numberOfWord+"\n");
				unity = unity - numberOfWord + numberOfWordBySenses;
			}
			else {
				numberOfWord = unity + 1;
			}
			this.numberWordBySenses.push(numberOfWord);
		}
		console.log(this.numberWordBySenses);
		/*ex : 5 sens, nombre de mots par sens = 2
		Premier tour : 2 unités
			Ont défini aléatoirement le nombre d'unité alouée au premier sens : 
			1
		Deuxième tour : 2-1 + 2 = 3 unités
			3
		3ème tour : 3-3 + 2 = 2 unités
			2
		4ème tour : 2-2 + 2 = 2 unités
			2
		5ème tour : 2-2 + 2 = 2 unités
			Obligé de prendre 2*/
	},
	
	getInfos: function() {
		console.log(this);
	},
	
	process: function(json, _this) {
		var words = _this.parseWords(json, _this);
		console.log(words);
		this.setNumberWordBySenses(words.length);
		_this.selectWords(words, _this);
		console.log(_this.selectedWords);
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
			words[word].gloss = words[word].gloss.replace(";", "");
		}
		return words;
	},
	
	//Permet de choisir aleatoirement un mot dans un chaine en specifiant le delimiteur des mots
	pickOneWord: function(delimiter, string) {
		var splittedString = string.split(delimiter);
		var numberOfWords = splittedString.length;
		do {
			var randomKey = Math.floor(Math.random() * numberOfWords);
		}while (splittedString[randomKey] == "" || splittedString[randomKey] == " ");
		return splittedString[randomKey];
	},
	
	//Permet de choisir un mot au hasard dans une chaine en supprimant les mots les plus courants et en ne selectionnant que les noms dans un premier temps
	pickRelevantWord: function(string, _this) {
		//Premiere etape : supression des mots les plus courants
		var ws = new WordSelector(); //objet gerant la selection des mots
		
		//on separe la chaine en tableau pour isoler les mots
		var splittedString = string.split(" ");
		
		//on parcours les mots un a un et on supprimme ceux qui sont trop communs
		for (var i in splittedString) {
			if (ws.inArray(splittedString[i], ws.commonsWords)) { //si le mot est trouve alors on le supprime
				splittedString[i] = "";
			}
		}
		
		//on reconstitue la chaine avec possiblement beaucoup d'espace mais pas derangeant
		var string = splittedString.join(" ");
		
		//on choisit ensuite un mot au hasard parmi la liste
		return _this.pickOneWord(" ", string);
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