var DictionaryService = Service.extend({
	
	//constructor
	init: function(searchWord, output, type) {
		this._super(searchWord, output);
		this.name = "dictionary";
		this.type = type;
		this.parameters = this.type+'/'+this.searchWord;
	}
	
	//
	process: function(data) {
		json = eval(data);
	}
	
});