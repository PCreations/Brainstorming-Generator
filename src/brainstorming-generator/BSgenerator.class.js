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
	
	generate: function() {
		this.dictionaryService.sendRequest(this.draw);
	},

	draw: function() {
		console.log("ICI JE DESSINE LE BRAINSTORMING !");
		
	},

});