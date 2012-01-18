var Word = Class.extend({
	
	init: function(id, word) {
		this.id = id;
		this.word = word;
	},
	
	log: function() {
		console.log(this);
	}
	
});