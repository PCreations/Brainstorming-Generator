//"Abstract" class
var Service = Class.extend({
	
	name: '',
	parameters: '',
	serviceURL: '',
	BASE_URL : "http://id.asianwordnet.org/services/",
	
	//constructor
	init: function(searchWord, output) {
		this.searchWord = searchWord;
		this.output = output;
	},
	
	getServiceURL: function() {
		return this.BASE_URL+this.name+'/'+this.output+'/'+this.parameters;
	},
	
	manageData: function(data, msg) {
		console.log(data);
	},
	
	sendRequest: function() {
		var _this = this; //permet de retenir la référene à l'objet courant pour la fonction process
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
	
	getInfos: function() {
		console.log(this);
	},
	
	parseWords: function(json) {
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
		return words;
	},
	
});