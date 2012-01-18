var Word = Class.extend({
	
	init: function(id, word, type, senseID, gloss) {
		this.id = id;
		this.word = word;
		this.type = type;
		this.senseID = senseID;
		this.gloss = gloss.replace(/".*"/, ""); //supression des exemples dans les définitions
	},
	
	log: function() {
		console.log(this);
	}
	
});