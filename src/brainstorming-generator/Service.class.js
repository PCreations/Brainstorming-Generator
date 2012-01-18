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
		this.requestHandler = new RequestHandler();
	},
	
	getServiceURL: function() {
		return this.BASE_URL+this.name+'/'+this.output+'/'+this.parameters;
	},
	
	manageData: function(data, msg) {
		console.log(data);
	},
	
	sendRequest: function() {
		$.ajax({
			async: 'false',
			url: this.getServiceURL(),
			type: 'GET',
			dataType: 'jsonp',
			dataCharset: 'jsonp',
			success: this.process;
		});
	},
	
	getInfos: function() {
		console.log(this);
	}
	
});