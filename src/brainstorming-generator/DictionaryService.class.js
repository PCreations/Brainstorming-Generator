var DictionaryService = Service.extend({
	
	//constructor
	init: function(searchWord, output, type) {
		this._super(searchWord, output);
		this.name = "dictionary";
		this.type = type;
		this.parameters = this.type+'/'+this.searchWord;
		this.words = new Array();
	},
	
	//Permet de selectionner les mots qui decouleront du mot selectionne
	selectWords: function(words, _this) {
		//On verifie dans un premier temps si un mot different est present dans la liste des mots synonymes
		for (var w in words) {
			if (words[w].word != "") { //c'est qu'un ou plusieurs mots est selectionnable
				_this.addSelectedWord(_this.pickOneWord(",", words[w].word)); //on enregistre alors un mot au hasard parmis ceux possible dans la liste des mots selectionnes
			}
			else {
				_this.addSelectedWord(_this.pickRelevantWord(words[w].gloss, _this));//sinon on recupere un mot interessant dans la description du mot
			}
			
		}
		
	},
	
	
	
});