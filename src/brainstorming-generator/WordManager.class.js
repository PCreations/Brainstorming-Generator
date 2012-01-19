var WordManager = Class.extend({
	
	WORD_LIMIT: 50,
	WORD_MAX_PER_SENSE: 10,
	
	init: function(){
		this.commonsWords = new Array("a", "able", "about", "above", "act", "add", "afraid", "after", "again", "against", "age", "ago", "agree", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "amount", "an", "and", "anger", "angry", "animal", "another", "answer", "any", "appear", "apple", "are", "arrive", "arm", "arms", "around", "arrive", "as", "ask", "at", "attempt", "aunt", "away", "back", "bad", "bag", "bay", "be", "became", "because", "become", "been", "before", "began", "begin", "behind", "being", "bell", "belong", "below", "beside", "best", "better", "between", "beyond", "big", "body", "bone", "born", "borrow", "both", "bottom", "box", "boy", "break", "bring", "brought", "bug", "built", "busy", "but", "buy", "by", "call", "came", "can", "cause", "choose", "close", "close", "consider", "come", "consider", "considerable", "contain", "continue", "could", "cry", "cut", "dare", "dark", "deal", "dear", "decide", "deep", "did", "die", "do", "does", "dog", "done", "doubt", "down", "during", "each", "ear", "early", "eat", "effort", "either", "else", "end", "enjoy", "enough", "enter", "even", "ever", "every", "except", "expect", "explain", "fail", "fall", "far", "fat", "favor", "fear", "feel", "feet", "fell", "felt", "few", "fill", "find", "fit", "fly", "follow", "for", "forever", "forget", "from", "front", "gave", "get", "gives", "goes", "gone", "good", "got", "gray", "great", "green", "grew", "grow", "guess", "had", "half", "hang", "happen", "has", "hat", "have", "having", "he", "hear", "heard", "held", "hello", "help", "her", "here", "hers", "high", "hill", "him", "his", "hit", "hold", "hot", "how", "however", "I", "if", "ill", "in", "indeed", "instead", "into", "iron", "is", "it", "its", "just", "keep", "kept", "knew", "know", "known", "late", "least", "led", "left", "lend", "less", "let", "like", "likely", "likr", "lone", "long", "look", "lot", "make", "many", "may", "me", "mean", "met", "might", "mile", "mine", "moon", "more", "most", "move", "much", "must", "my", "near", "nearly", "necessary", "neither", "never", "next", "no", "none", "nor", "not", "note", "nothing", "now", "number", "of", "off", "often", "oh", "on", "once", "only", "or", "other", "ought", "our", "out", "please", "prepare", "probable", "pull", "pure", "push", "put", "raise", "ran", "rather", "reach", "realize", "reply", "require", "rest", "run", "said", "same", "sat", "saw", "say", "see", "seem", "seen", "self", "sell", "sent", "separate", "set", "shall", "she", "should", "side", "sign", "since", "so", "sold", "some", "soon", "sorry", "stay", "step", "stick", "still", "stood", "such", "sudden", "suppose", "take", "taken", "talk", "tall", "tell", "ten", "than", "thank", "that", "the", "their", "them", "then", "there", "therefore", "these", "they", "this", "those", "though", "through", "till", "to", "today", "told", "tomorrow", "too", "took", "tore", "tought", "toward", "tried", "tries", "trust", "try", "turn", "two", "under", "until", "up", "upon", "us", "use", "usual", "various", "verb", "very", "visit", "want", "was", "we", "well", "went", "were", "what", "when", "where", "whether", "which", "while", "white", "who", "whom", "whose", "why", "will", "with", "within", "without", "would", "yes", "yet", "you", "young", "your", "br", "img", "p","lt", "gt", "quot", "copy");
		this.selectedWords = new Array();
	},
	
	inArray: function in_array(needle, collection, strict) {
		if (strict == null) {
			strict = false;
		}
		var i = collection.length-1;
		if (i >= 0) {
			do {
				if (collection[i] == needle) {
					if (strict && typeof(collection[i]) != typeof(needle)) {
						continue;
					}
					return true;
				}
			} while (i--);
		}
		return false;
	},
	
	parseWords: function(json, searchWord) {
		var words = new Array();
		console.log(searchWord);
		this.searchWord = searchWord;
		for (var word in json['data']) {
			words.push(new Word(
												json['data'][word]['synset_offset'], 
												json['data'][word]['words'],
												json['data'][word]['ss_type'],
												json['data'][word]['sense_id'],
												json['data'][word]['gloss']
											));
		}
		words = this.cleanWords(words);
		return words;
	},	
	
	strCleaner: function(delimiter, needle, string) {
		//on separe la chaine en tableau pour isoler les mots
		var splittedString = string.split(delimiter);
		var finalString = new Array();
		
		for (var i in splittedString) {
			if (splittedString[i].search(needle) == -1) //si le mot n'est pas trouve alors on le garde
				finalString.push(splittedString[i]);
		}
		
		return finalString.join(",");
	},
	
	//Fonction permettant de garder uniquement les mots differents de celui d'origine dans la liste des mots recuperes
	cleanWords: function(words) {
		console.log("Mot recherché : "+this.searchWord);
		for (var word in words) {
			var wordList = words[word].word;
			var regexp = "/"+this.searchWord+"/g";
			words[word].word = this.strCleaner(',', this.searchWord, wordList);
			words[word].gloss = words[word].gloss.replace(";", "");
		}
		return words;
	},
	
	//Nettoie la description d'un mot en supprimant les exemples et les mots les plus courants
	cleanGloss: function(gloss) {
		gloss = gloss.replace(/".*"/, ""); //supression des exemples dans les définitions
		
		//suppression des mots les plus courants
		var splittedGloss = gloss.split(" ");
		var finalGloss = new Array();
		
		for (var w in splittedGloss) { //parcours des mots
			if (!this.inArray(splittedGloss[w], this.commonsWords))
				finalGloss.push(splittedGloss[w]);
		}
		
		return finalGloss.join(" ");
	},
	
	selectWords: function(words, numberWordBySenses) {
		console.log(words);
		console.log(numberWordBySenses);
		for (var w in words) { //Parcours des mots
			console.log("W = "+w);
			console.log("numberWordBySenses[w] = "+numberWordBySenses[w]);
			for (var i=0; i<numberWordBySenses[w]; i++) { //Recuperation du nombre de mots par sens
				var choice = Math.floor(Math.random())+1; //Determine la maniere dont on recupere le mot
				console.log("I = "+i+" choice = "+choice);
				if (choice == 1) {
						console.log("I = "+i+" Liste des mots pour le cas 1 :");
						console.log(words[w]['word']);
						if (words[w]['word'] != '') { //s'il reste encore des mots a choisir
							var selectedWord = this.pickOneWord(',', words[w]['word']); //on choisit un mot
							words[w]['word'] = words[w]['word'].replace(selectedWord, ''); //on efface le mot
							if (!this.addSelectedWord(selectedWord)) {//si le mot n'a pas pu etre ajoute parce qu'il y est deja on choisit autrement
								choice = 2;
							}
						}
						else
							choice = 2;
				}
				if (choice == 2) {
						console.log("I = "+i+" Description : "+words[w]['gloss']);
						if (words[w]['gloss'] != '') {
							var selectedWord = this.pickRelevantWord(words[w]['gloss']);
							words[w]['gloss'] = words[w]['gloss'].replace(selectedWord, ''); //on efface le mot
							this.addSelectedWord(selectedWord);
							//TODO : faire une fonction qui fait le process choisir puis supprimer pour pouvoir choisir de la facon 1 si besoin ici
						}
				}
				
			}
		}
	},
	
	//Permet de choisir aleatoirement un mot dans un chaine en specifiant le delimiteur des mots
	pickOneWord: function(delimiter, string) {
		var splittedString = string.split(delimiter);
		var numberOfWords = splittedString.length;
		/*do {
			var randomKey = Math.floor(Math.random() * numberOfWords);
		}while (splittedString[randomKey] == "" || splittedString[randomKey] == " ");*/
		var randomKey = Math.floor(Math.random() * numberOfWords);
		return splittedString[randomKey];
	},
	
	//Permet de choisir un mot au hasard dans la description du mot en ne prenant que les noms
	pickRelevantWord: function(string) {
		//TODO : ne garder que les noms
		
		//on choisit ensuite un mot au hasard parmi la liste
		return this.pickOneWord(" ", string);
	},
	
	setNumberWordBySenses: function(numberOfSenses) {
		var numberWordBySenses = new Array();
		console.log("Nombre de sens : "+numberOfSenses);
		var numberOfWordBySenses = Math.floor(this.WORD_LIMIT / numberOfSenses); //on obtient ainsi le nombre moyen de mots par sens. 
		console.log("Nombre de mots par sens : "+numberOfWordBySenses);
		var unity = numberOfWordBySenses - 1 //permet de savoir le nombre d'"unites" a disposition pour choisir un nombre aleatoire (correspond au nombre max du rand d'ou le -1)
		for (var i=1; i<=numberOfSenses; i++) {
			console.log("Nombre d'unités : "+unity);
			var numberOfWord;
			if (i != numberOfSenses) { // on peut definir aleatoirement le nombre de mot a piocher en fonction des unites
				do {
					numberOfWord = Math.floor(Math.random() * unity)+1; //nombre de mot a piocher pour ce sens
				}while (numberOfWord > this.WORD_MAX_PER_SENSE);
				console.log("Nombre de mots à piocher : "+numberOfWord+"\n");
				unity = unity - numberOfWord + numberOfWordBySenses;
			}
			else {
				numberOfWord = (++unity > this.WORD_MAX_PER_SENSE) ? this.WORD_MAX_PER_SENSE : unity;
			}
			numberWordBySenses.push(numberOfWord);
		}
		console.log(numberWordBySenses);
		return numberWordBySenses;
	},
	
	//Permet d'ajouter un mot dans la liste des mots selectionnes
	addSelectedWord: function(word) {
		console.log("Mot a ajouter : \""+word+"\"\n");
		if (!this.inArray(word, this.selectedWords)) {
			if (!(word == "" || word == " ")) //securite au cas ou
				this.selectedWords.push(word);
			return true;
		}
		return false;
	},
	
});