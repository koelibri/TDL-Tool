/** Funktion zum Mischen der Elemente in einem Array
 *  @param items ein Array mit zu mischenden Elementen
 *  @return eine Referenz auf das Array mit den gemischten Elementen
 *  @see http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript 
 **/
function shuffle(items) {
	for (i = 0; i < items.length; i++) {
		var j = Math.floor(Math.random() * (items.length));
		var temp = items[j];
		items[j] = items[i];
		items[i] = temp;
	}
	return items;
}

/** Klasse zur Erstellung von Memory-Board-Instanzen
 *  @class
 *  @param ids ID-Selektor des DOM-Elements für das ein Memory-Board erzeugt werden soll
 *  @param mss Selektor-String für das Model-Set mit den Referenzen auf die SVG-Modelle
 *  @param fs Selektor für die Front-Ansicht des SVG-Modells
 *  @param ss Selektor für die Seit-Ansicht (links) des SVG-Modells
 *  @param ts Selektor für die Top-Ansicht des SVG-Modells
 */
function Board (ids, mss, fs, ss, ts) {

	// Model-Speicher anlegen und mit den im ModelSet referenzierten Elementen füllen
	var models = [];
	$(ids).find(mss).each(function() {models.push($(this).text());});
	
	// Sammlung der angeklickten Ansichten als Map anlegen und mit null initialisieren
	var clickedViews = {};
	clickedViews[fs] = null;
	clickedViews[ss] = null;
	clickedViews[ts] = null;

	//ersetze die Boards fuer die 3 Ansichten mit den jeweiligen Ansichten.
	initBoard($(ids).find(".VBoard"), models,fs);
	initBoard($(ids).find(".SBoard"), models,ss);
	initBoard($(ids).find(".DBoard"), models,ts);
	
	function initBoard(board, items, type) {
		//durchmischen der Arrays 
		var views = shuffle(items);
	
		//erzeuge fuer jedes Item eine Ansicht und 
		// versehe diese mit einer Interaktionsmoeglichkeit
		for (i = 0; i < views.length; i++) {
			$(board).append($("<img/>",{
				id:       views[i].split('\\').pop().split('/').pop()+type,
				modelid:  views[i].split('\\').pop().split('/').pop(),
				viewtype: type, 
				src:      items[i]+type,
				on:       {click: function(e) {clickTile(this);}}
			}));
		}
	}
	
	function getModelId (element) {
		return element.getAttribute("modelid");
	}
	
	function getViewType (element) {
		return element.getAttribute("viewtype");
	}
	
	//was passiert wenn ich ein Bild ancklicke  
	//http://stackoverflow.com/questions/20906471/best-way-to-convert-result-of-indexof-to-a-boolean-using-javascript-or-jquery/20906514
	function clickTile (element) {
		// Modellbezeichner und View-Target aus ID extrahieren
		var viewType = getViewType(element);
	
		//Wurde das Bild schon mal angeclickt, ... 
		if (clickedViews[viewType] === element) {
			//... dann wird es zurückgesetzt und kann somit erneut angeklickt werden, ...
			element.classList.remove("isClicked");
			clickedViews[viewType] = null;
		} else {
			// ... ansonsten wird ...
			// ...ein ggf. vorher gemerktes Bild zurückgesetzt und ...
			if (clickedViews[viewType] != null) {
				clickedViews[viewType].classList.remove("isClicked");
			}
			// ...das angeklickte Bild gemerkt. 
			clickedViews[viewType] = element;
			element.classList.add("isClicked");
		}
		checkMatches();
	}
	
	function checkMatches() {
		var modelId = null;
		var doViewsMatch = false;
		var areViewsComplete = true;
		
		for(viewType in clickedViews) {
			// Wenn noch kein Vergleichswert da ist, merke die aktuelle Modellreferenz als Vergleichswert
			// ansonsten vergleiche die aktuelle Modellreferenz mit der bereits gemerkten und vermerke, 
			// ob sie zueinander passen 
			if (clickedViews[viewType] != null) {
				if (modelId == null) {
					modelId = $(clickedViews[viewType]).attr("modelId");
					doViewsMatch = true;
				} else {
					doViewsMatch = doViewsMatch && modelId == $(clickedViews[viewType]).attr("modelId");
				}
			} else {
				areViewsComplete = false;
				doViewsMatch = false;
				break;
			}
		}
		// Wenn alle Views ausgewählt wurden und zueinander passen, 
		// dann hebe sie hervor und verhindere versehentliches Neuauswählen durch Löschen des EventListeners
		// Ansonsten, wenn für alle Views eine Auswahl getroffen wurde, kennzeichne diese kurz als fehlerhaft
		if (doViewsMatch) {
			for (viewType in clickedViews) {
				// Element als korrekt zugeordnet kennzeichnen
				$(clickedViews[viewType]).removeClass("isClicked");
				$(clickedViews[viewType]).addClass("isCorrect");
				//entferne den EventListener, um versehentliches Neuauswählen zu verhindern
				$(clickedViews[viewType]).off("click");
				clickedViews[viewType] = null;
			}
		} else if (areViewsComplete){
			for (viewType in clickedViews) {
				// Rand wird kurz rot um zu signalisieren, dass Bilder nicht zusammenpassen
				$(clickedViews[viewType]).removeClass("isClicked");
				$(clickedViews[viewType]).addClass("isIncorrect");
			}
			setTimeout(function(){
				for (viewType in clickedViews) {
					$(clickedViews[viewType]).removeClass("isIncorrect"); 
					clickedViews[viewType] = null;
				}
			}, 1000);
		}
	}
}

/** Initialisiere die Memory-Boards
 * 
 */
 $(function($){
	$("#stufe1").data("board", new Board("#stufe1", ".modelset a", "#V", "#L", "#D"));
	$("#stufe2").data("board", new Board("#stufe2", ".modelset a", "#V", "#L", "#D"));
 })
