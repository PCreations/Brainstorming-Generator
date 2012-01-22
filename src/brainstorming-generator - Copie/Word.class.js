var Word = Class.extend({
	
	init: function(id, word, type, senseID, gloss) {
		this.id = id;
		this.word = word;
		this.type = type;
		this.senseID = senseID;
		this.wm = new WordManager();
		this.gloss = this.wm.cleanGloss(gloss);
		
	},
	
	log: function() {
		console.log(this);
	}
	
});