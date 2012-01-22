var brainstorm = function(word) {
	if (word == '') {
		alert('Please insert a word');
		return false;
	}
	$('#bsInfos').empty();
	$('<span>Please wait, I\'m brainstorming for you...</span><br />'
			+'<img style="display:block; width: 400px; height: 400px; margin: auto; position: relative; top:-150px;" src="../plugins/js-mindmap/loading.gif" alt="loading" title="Chargement du Brainstorming en cours" />').appendTo($('#bsInfos'));
	var brainstorming = new BSgenerator(word, 30, level1);
	brainstorming.generate();
};

var treeLevel = new Array();
var recursiveStack = new Array(); //bidouille

var level2 = function(BSref) {
	//console.log("selectedWords dans level2 pour "+recursiveStack[0][1]+" = ");
	var selectedWords = BSref.dictionaryService.wm.selectedWords;
	//console.log(selectedWords);
	for (var i=0; i<selectedWords.length; i++) {
		//treeLevel[i] = new Array();
		//console.log("selectedWords["+i+"] dans level2 = "+selectedWords[i]);
		//treeLevel[recursiveStack[0][0]][1].push(selectedWords[i], new Array());// cas pour prevision 3 niveaux de recursivite
		treeLevel[recursiveStack[0][0]][1].push(selectedWords[i]);// cas pour prevision 2 niveaux de recursivite
		
	}
	recursiveStack.shift();
	if (recursiveStack.length > 0) {
		BSref.reload(recursiveStack[0][1], 15, level2);
		BSref.generate();
	}
	else {
		console.log("TREE LEVEL");
		console.log(treeLevel);
		$('#mindMap').empty();
		BSref.draw(treeLevel, "#mindMap");
		drawMindMap();
	}
};

var level1 = function(BSref) {
	//console.log("CALLBACK PROCESS");
	//console.log("selectedWords = ");
	var selectedWords = BSref.dictionaryService.wm.selectedWords;
	//console.log(selectedWords);
	for (var i=0; i<selectedWords.length; i++) {
		treeLevel[i] = new Array();
		treeLevel[i].push(selectedWords[i], new Array());
		recursiveStack[i] = new Array();
		recursiveStack[i].push(i, treeLevel[i][0]);
	}
	//console.log("recursiveStack");
	//console.log(recursiveStack);
	BSref.reload(treeLevel[0][0], 15, level2);
	BSref.generate();
};

var drawMindMap = function() {
	$('#mindMap').mindmap();

  // add the data to the mindmap
  var root = $('#mindMap>ul>li').get(0).mynode = $('#mindMap').addRootNode($('#mindMap>ul>li>a').text(), {
	href:'/',
	url:'/',
	onclick:function(node) {
	  $(node.obj.activeNode.content).each(function() {
		this.hide();
	  });
	}
  });
  $('#mindMap>ul>li').hide();
  var addLI = function() {
	var parentnode = $(this).parents('li').get(0);
	if (typeof(parentnode)=='undefined') parentnode=root;
	  else parentnode=parentnode.mynode;
	
	this.mynode = $('#mindMap').addNode(parentnode, $('a:eq(0)',this).text(), {
//          href:$('a:eq(0)',this).text().toLowerCase(),
	  href:$('a:eq(0)',this).attr('href'),
	  onclick:function(node) {
		$(node.obj.activeNode.content).each(function() {
		  this.hide();
		});
		$(node.content).each(function() {
		  this.show();
		});
	  }
	});
	$(this).hide();
	$('>ul>li', this).each(addLI);
  };
  $('#mindMap>ul>li>ul').each(function() { 
	$('>li', this).each(addLI);
  });
};