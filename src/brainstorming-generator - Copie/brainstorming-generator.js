var BSgenerator = {

	// Définition des noms de services
	services : {
		DICTIONNARY : 0,
		AUTO_COMPLETE : 1,
		BROWSE : 2,
	},
	
	// Définition des paramètres de configuration
	config : {
		BASE_URL : "http://id.asianwordnet.org/services/",
		OUTPUT : "json",
		DEFAULT_LANGUAGE : "en",
	},
	
	//"Gestion" des erreurs
	errorHandler : {
		SERVICE_NAME_ERROR : "Le service indiqué n'existe pas",
	},
	
};

function getWordData(configData) {
	var serviceURL;
	try {
		switch (configData.serviceName) {
			case BSgenerator.services.AUTO_COMPLETE:
				serviceURL = 'autocomplete/'+configData.output+'/'+configData.language+'/'+configData.searchWord;
				break;
			case BSgenerator.services.BROWSE:
				serviceURL = 'browse/'+configData.output+'/'+configData.language+'/'+configData.searchWord;
				break;
			case BSgenerator.services.DICTIONARY:
				serviceURL = 'dictionary/'+configData.output+'/'+configData.typeOfDict+'/'+configData.searchWord;
				break;
			default:
				throw BSgenerator.errorHandler.SERVICE_NAME_ERROR;
				break;
		}
	}
	catch(err) {
		console.log(err);
	}
	serviceURL = BSgenerator.config.BASE_URL+serviceURL;
	var str;
	$.ajax({
		url: serviceURL,
		type: 'GET',
		dataType: 'jsonp',
		dataCharset: 'jsonp',
		success:function(json_obj) {
			if(json_obj["rows"] > 0){
				str += "Found : "+json_obj["rows"]+" item(s)\n";
				for(var key in json_obj["data"]){
					str += key+" : "+json_obj["data"][key]["synset_offset"]+" "+json_obj["data"][key]["words"]+"\n";
				}
				alert(str);
			}
		}
	});
}

function findSenses(wordData) {
	
}