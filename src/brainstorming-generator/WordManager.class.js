var WordManager = Class.extend({
	
	WORD_LIMIT: 1,
	BASE_URL : "http://id.asianwordnet.org/services/",
	
	init: function(){
		this.commonsWords = new Array("a", "able", "about", "above", "act", "add", "afraid", "after", "again", "against", "age", "ago", "agree", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "amount", "an", "and", "anger", "angry", "animal", "another", "answer", "any", "appear", "are", "arrive", "around", "arrive", "as", "ask", "at", "attempt", "aunt", "away", "back", "bad", "bag", "bay", "be", "became", "because", "become", "been", "before", "began", "begin", "behind", "being", "bell", "belong", "below", "beside", "best", "better", "between", "beyond", "big", "born", "borrow", "both", "bottom", "break", "bring", "brought", "bug", "built", "busy", "but", "buy", "by", "call", "came", "can", "cause", "choose", "close", "close", "consider", "come", "consider", "considerable", "contain", "continue", "could", "cry", "cut", "dare", "deal", "dear", "decide", "did", "die", "do", "does", "done", "down", "during", "each", "ear", "early", "eat", "effort", "either", "else", "end", "enjoy", "enough", "enter", "etc.", "even", "ever", "every", "except", "expect", "explain", "fail", "fall", "far", "favor", "fear", "feel", "feet", "fell", "felt", "few", "fill", "find", "fit", "follow", "for", "forever", "forget", "from", "front", "gave", "get", "gives", "goes", "gone", "good", "got", "gray", "great", "grew", "grow", "guess", "had", "half", "hang", "happen", "has", "hat", "have", "having", "he", "hear", "heard", "held", "hello", "help", "her", "here", "hers", "high", "hill", "him", "his", "hit", "hold", "hot", "how", "however", "I", "if", "ill", "in", "indeed", "instead", "into", "iron", "is", "it", "its", "just", "keep", "kept", "knew", "know", "known", "late", "least", "led", "left", "lend", "less", "let", "like", "likely", "likr", "lone", "long", "look", "lot", "make", "many", "may", "me", "mean", "met", "might", "mile", "mine", "more", "most", "move", "much", "must", "my", "near", "nearly", "necessary", "neither", "never", "next", "no", "none", "nor", "not", "note", "nothing", "now", "number", "of", "off", "often", "oh", "on", "one", "once", "only", "or", "other", "ought", "our", "out", "please", "prepare", "probable", "pull", "pure", "push", "put", "raise", "ran", "rather", "reach", "realize", "reply", "require", "rest", "run", "said", "same", "sat", "saw", "say", "see", "seem", "seen", "self", "sell", "sent", "separate", "set", "shall", "she", "should", "side", "sign", "since", "so", "sold", "some", "soon", "sorry", "stay", "step", "stick", "still", "stood", "such", "sudden", "suppose", "take", "taken", "talk", "tall", "tell", "ten", "than", "thank", "that", "the", "their", "them", "then", "there", "therefore", "these", "they", "this", "those", "though", "through", "till", "to", "today", "told", "tomorrow", "too", "took", "tore", "tought", "toward", "tried", "tries", "trust", "try", "turn", "two", "under", "until", "up", "upon", "us", "use", "usual", "various", "verb", "very", "visit", "want", "was", "we", "well", "went", "were", "what", "when", "where", "whether", "which", "while", "who", "whom", "whose", "why", "will", "with", "within", "without", "would", "yes", "yet", "you", "young", "your", "br", "img", "p","lt", "gt", "quot", "copy");
		this.selectedWords = new Array();
		this.wordsChecker = new Array(); //tableau permettant de verifier si les mots selectionnes existent
		this.allowedWordTypes = new Array("n");
	},
	
	
	levenshtein: function(s1, s2) {
		// Calculate Levenshtein distance between two strings  
		// 
		// version: 1109.2015
		// discuss at: http://phpjs.org/functions/levenshtein
		// +            original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
		// +            bugfixed by: Onno Marsman
		// +             revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
		// + reimplemented by: Brett Zamir (http://brett-zamir.me)
		// + reimplemented by: Alexander M Beedie
		// *                example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
		// *                returns 1: 3
		if (s1 == s2) {
			return 0;
		}
	 
		var s1_len = s1.length;
		var s2_len = s2.length;
		if (s1_len === 0) {
			return s2_len;
		}
		if (s2_len === 0) {
			return s1_len;
		}
	 
		// BEGIN STATIC
		var split = false;
		try {
			split = !('0')[0];
		} catch (e) {
			split = true; // Earlier IE may not support access by string index
		}
		// END STATIC
		if (split) {
			s1 = s1.split('');
			s2 = s2.split('');
		}
	 
		var v0 = new Array(s1_len + 1);
		var v1 = new Array(s1_len + 1);
	 
		var s1_idx = 0,
			s2_idx = 0,
			cost = 0;
		for (s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
			v0[s1_idx] = s1_idx;
		}
		var char_s1 = '',
			char_s2 = '';
		for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
			v1[0] = s2_idx;
			char_s2 = s2[s2_idx - 1];
	 
			for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
				char_s1 = s1[s1_idx];
				cost = (char_s1 == char_s2) ? 0 : 1;
				var m_min = v0[s1_idx + 1] + 1;
				var b = v1[s1_idx] + 1;
				var c = v0[s1_idx] + cost;
				if (b < m_min) {
					m_min = b;
				}
				if (c < m_min) {
					m_min = c;
				}
				v1[s1_idx + 1] = m_min;
			}
			var v_tmp = v0;
			v0 = v1;
			v1 = v_tmp;
		}
		return v0[s1_len];
	},
	
	//Fonction qui recherche si le mot est similaire a un mot deja existant dans la liste des mots trouves
	isSimilar: function(word) {
		for (var w in this.BSref.allWordsList) {
			console.log(word+" est-t-il similaire a "+this.BSref.allWordsList[w]+"?");
			if (this.levenshtein(word, this.BSref.allWordsList[w]) <= (word.length/3)) {
				console.log("Oui");
				return true;
			}
				
		}
		return false;
	},
	
	arrayCopy: function(src) {
		var dest = new Array();
		for (var i = 0; i < src.length; i++){
			dest[i] = src[i];
		}
		return dest;
	},
	
	inArray: function (needle, collection, strict) {
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
	
	//Verifie si un mot existe
	wordExists: function(json) {
		return (json['rows'] == 0) ? false : true;
	},
	
	//Supprime les mots qui n'existe pas de la liste des mots selectionnes
	wordsCheck: function(callback, BSref) {
		var _this = this; //permet de retenir la reference a l'objet courant pour la fonction process
		//console.log("wordsChecker = "+this.wordsChecker);
		$.ajax({
			url: _this.BASE_URL+"dictionary/json/en2id/"+_this.wordsChecker[0],
			type: 'GET',
			dataType: 'jsonp',
			dataCharset: 'jsonp',
			success: function(data) {
				var json = eval(data);
				if (!_this.wordExists(json)) {
					//Si le mot n'existe pas on l'enleve des resultats
					var string = _this.selectedWords.join(",");
					string = _this.strCleaner(",", _this.wordsChecker[0], string);
					_this.selectedWords = string.split(",");
				}
				else {
					//console.log(_this.allowedWordTypes);
					//console.log(json['data']['1']['ss_type']);
					/*!_this.inArray(json['data']['1']['ss_type'], _this.allowedWordTypes)*/
					if (json['data']['1']['ss_type'] != 'n') {
						//Si le mot n'est pas du bon type on l'enleve
						var string = _this.selectedWords.join(",");
						string = _this.strCleaner(",", _this.wordsChecker[0], string);
						_this.selectedWords = string.split(",");
					}
				}
				_this.wordsChecker.shift(); //on depile le mot pour ne pas le traiter deux fois
			},
			complete: function(xhr, msg) {
				if (_this.wordsChecker.length > 0)
					_this.wordsCheck(callback, BSref);
				else {
					//console.log("MOT TRIES : "+_this.selectedWords);
					//console.log("TENTATIVE CALLBACK : "+callback);
					callback(BSref);
				}
			}
		});
	},
	
	parseWords: function(json, searchWord, BSref) {
		var words = new Array();
		this.BSref = BSref;
		//console.log(searchWord);
		//console.log("senses = ");
		//console.log(BSref.senses);
		this.searchWord = searchWord;
		for (var word in json['data']) {
			if (!this.inArray(json['data'][word]['sense_id'], BSref.senses)) {
				words.push(new Word(
												json['data'][word]['synset_offset'], 
												json['data'][word]['words'],
												json['data'][word]['ss_type'],
												json['data'][word]['sense_id'],
												json['data'][word]['gloss']
											));
				BSref.senses.push(json['data'][word]['sense_id']);
			}
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
		//console.log("Mot recherch� : "+this.searchWord);
		for (var word in words) {
			console.log("wordlist avant : "+words[word].word);
			words[word].word =  words[word].word.replace(/\s/g, ""); //supression des espaces
			var wordList = words[word].word;
			words[word].word = this.strCleaner(',', this.searchWord, wordList);
			console.log("wordlist apr�s : "+words[word].word);
			words[word].gloss = words[word].gloss.replace(";", "");
			words[word].gloss = words[word].gloss.replace(",", "");
		}
		return words;
	},
	
	//Nettoie la description d'un mot en supprimant les exemples et les mots les plus courants
	cleanGloss: function(gloss) {
		gloss = gloss.replace(/".*"/, ""); //supression des exemples dans les d�finitions
		
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
		//console.log(words);
		//console.log(numberWordBySenses);
		for (var w in words) { //Parcours des mots
			for (var i=0; i<numberWordBySenses[w]; i++) { //Recuperation du nombre de mots par sens
				var choice = Math.floor(Math.random())+1; //Determine la maniere dont on recupere le mot
				//console.log("I = "+i+" choice = "+choice);
				var attemptsLeft = 3; //nombre d'essai quand un mot trop proche est trouve pour en trouve un autre
				var selectedWord;
				if (choice == 1) {
						if (words[w]['word'] != '') { //s'il reste encore des mots a choisir
							do {
								selectedWord = this.pickOneWord(',', words[w]['word']); //on choisit un mot
								attemptsLeft--;
							} while(this.isSimilar(selectedWord) && attemptsLeft > 0);
							words[w]['word'] = words[w]['word'].replace(selectedWord, ''); //on efface le mot
							if (!this.addSelectedWord(selectedWord)) {//si le mot n'a pas pu etre ajoute parce qu'il y est deja on choisit autrement
								choice = 2;
							}
						}
						else
							choice = 2;
				}
				if (choice == 2) {
						//console.log("I = "+i+" Description : "+words[w]['gloss']);
						if (words[w]['gloss'] != '') {
							selectedWord = this.pickRelevantWord(words[w]['gloss']);
							words[w]['gloss'] = words[w]['gloss'].replace(selectedWord, ''); //on efface le mot
							this.addSelectedWord(selectedWord);
							//TODO : faire une fonction qui fait le process choisir puis supprimer pour pouvoir choisir de la facon 1 si besoin ici
						}
				}	
			}
		}
		this.wordsChecker = this.arrayCopy(this.selectedWords);
		//console.log("WORDS CHECKER APRES SELECT WORDS : "+this.wordsChecker);
		
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
		console.log("Nombre de sens pour "+this.searchWord+" : "+numberOfSenses);
		console.log("Nombre limite de mot : "+this.WORD_LIMIT);
		var numberOfWordBySenses = Math.floor(this.WORD_LIMIT / numberOfSenses); //on obtient ainsi le nombre moyen de mots par sens. 
		var totalWord = 0; //nombre de mots total pioches
		
		if (numberOfWordBySenses == 0) numberOfWordBySenses = 1;
		//console.log("Nombre de mots par sens : "+numberOfWordBySenses);
		for (var i=1; i<=numberOfSenses; i++) {
			//console.log("Nombre d'unit�s : "+unity);
			var numberOfWord;
			//console.log("totalWord = "+totalWord);
			if (totalWord < this.WORD_LIMIT) {
				numberOfWord = numberOfWordBySenses;
			}
			else {
				numberOfWord = 0;
			}
			totalWord += numberOfWord;
			numberWordBySenses.push(numberOfWord);
			console.log("numberOfWord = "+numberOfWord);
		}
		console.log(numberWordBySenses);
		return numberWordBySenses;
	},
	
	//Permet d'ajouter un mot dans la liste des mots selectionnes
	addSelectedWord: function(word) {
		console.log("Mot a ajouter : \""+word);
		console.log("Liste des mots d�j� pr�sents : ");
		console.log(this.BSref.allWordsList);
		console.log("Mot recherch�");
		console.log(this.searchedWord);
		if (this.searchedWord != word) {
			if (!this.inArray(word, this.selectedWords)) {
				if (!(word == "" || word == " " || word == ",")) {//securite au cas ou
					word = word.replace(" ", "");
					word = word.replace(";", "");
					word = word.replace("(", "");
					word = word.replace(")", "");
					word = word.replace(",", "");
					word = word.replace("'", "");
					this.selectedWords.push(word);
					this.BSref.allWordsList.push(word);
					console.log("Ajout du mot "+word);
				}
				return true;
			}
		}
		return false;
	},
	
});