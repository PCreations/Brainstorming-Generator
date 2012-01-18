var DictionaryService = Service.extend({
	
	//constructor
	init: function(searchWord, output, type) {
		this._super(searchWord, output);
		this.name = "dictionary";
		this.type = type;
		this.parameters = this.type+'/'+this.searchWord;
		this.words = new Array();
	},
	
	process: function(json, _this) {
		var words = _this.parseWords(json);
		console.log(words);
	}
	
	
	
});