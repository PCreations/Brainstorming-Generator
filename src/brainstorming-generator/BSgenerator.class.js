var BSgenerator = Class.extend({

	//constructor
	init: function(word) {
		this.word = word;
	},
	
	generate: function() {
		var dictionaryService = new DictionaryService(this.word, "json", "en");
		
	},

});