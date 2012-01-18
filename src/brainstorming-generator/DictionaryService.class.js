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
		for (var i = 1; i <= json.rows; i++) {
			_this.words[i-1] = new Word(json['data'][i]['synset_offset'], json['data'][i]['words']);
		}
		console.log(_this.words);
	}
	
});