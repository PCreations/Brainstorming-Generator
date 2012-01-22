var AutoCompleteService = Service.extend({

	//constructor
	init: function(searchWord, output, language) {
		this._super(searchWord, output);
		this.name = "autocomplete";
		this.language = language;
		this.parameters = this.language+'/'+this.searchWord;
	}

});