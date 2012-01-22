var RequestHandler = Class.extend({

	requestConfig: {},
	requestData: {},
	
	init: function() {
		this.requestConfig = {};
	},
	
	prepare: function(requestConfig) {
		this.requestConfig = requestConfig;
	},
	
	send: function() {
		$.ajax({
			async: this.requestConfig.async,
			url: this.requestConfig.url,
			type: this.requestConfig.type,
			dataType: this.requestConfig.dataType,
			dataCharset: this.requestConfig.dataCharset,
			success: this.setRequestData,
		});
		alert(this.requestData);
	},
	
	setRequestData: function(data) {
		this.requestData = eval(data);
	},
	
	
});