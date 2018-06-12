// Second script for Turn5 - Adobe Photoshop Script
// Description: copies layers and paths from smartobject to original(parent)
// Requirements: Adobe Photoshop CS6, or higher
// Version: 1.4 -  05/June/2018
// Author: Anil Tejwani (anil@tejwani.com)
// email: anil@tejwani.com
// Update: Christopher String
// ============================================================================
// Installation:
// 1. Place file "TS_turn5_02d.jsx"  in:
//    PC(32):  C:\Program Files (x86)\Adobe\Adobe Photoshop CS#\Presets\Scripts\
//    PC(64):  C:\Program Files\Adobe\Adobe Photoshop CS# (64 Bit)\Presets\Scripts\
// 2. Restart Photoshop
// 3. Choose File > Scripts > TS_turn5_02d
// ============================================================================
#target photoshop;
cTID = function(s) {return app.charIDToTypeID(s);};
sTID = function(s) {return app.stringIDToTypeID(s);};
var TSclass = function() {};
var indexNum=0;
var SOref;
var origRef;
TSclass.setPreferences = function() {
	TSclass.p = new Object();
	/* CAN EDIT line below */
	TSclass.p.writeLog = false; /* true  | false */
	/* CAN EDIT line above */
	/*************NOTHING TO EDIT BELOW THIS LINE ***************/

	TSclass.p.smartObjectName = 'XXXXXXXXXXXXXXXXXXXXXXXX'; /* CaSe SensiTivE */
	TSclass.p.logFile = 'tsScript_log.txt';
	TSclass.p.logFolder = origRef.path;

};
/*************NOTHING TO EDIT BELOW THIS LINE ***************/
TSclass.prototype.main = function() {
	app.displayDialogs = DialogModes.NO;
	if(app.documents.length > 1){alert('Multiple Docs Open, kindly keep only 1 document open and try again.','ABORTING - Tejwani.com',true);return;}

	if(app.documents.length < 1){alert('No documents to process, open a document and try again.','NOTHING TO DO - Tejwani.com',true);return;}

	origRef = app.activeDocument;
	TSclass.setPreferences();
	TSclass.writeTextFile('/////////////////////////////////////START');
	TSclass.writeTextFile(origRef.path + ' >>> '+ origRef.name);
	if(TSclass.processSO()){
		/* bridge handles the saving bit and so disabled */
		//		TSclass.writeTextFile('\t~~~~SAVING AND CLOSING~~~~~' );
		//		TSclass.closeFileWithSave(origRef);
		//		TSclass.writeTextFile('\t~~~~SAVING AND CLOSING DONE~~~~~' );
	}
	TSclass.writeTextFile('END/////////////////////////////// TEJWANI.COM');
}

TSclass.copySoLayers = function(){
	//
	SOref = app.activeDocument;
	//
	TSclass.sal();
	//
	TSclass.mnl();
	//
	SOref.activeLayer = SOref.layers[0];
	//
	SOref.activeLayer.name = TSclass.p.smartObjectName;
	//
	SOref.activeLayer.duplicate(origRef, ElementPlacement.PLACEATBEGINNING);
	//
	return;
}
TSclass.sal = function(){
	TSclass.writeTextFile('\t~~~~sal STARTED~~~~~' );
	var idselectAllLayers = stringIDToTypeID( "selectAllLayers" );
	var desc92 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	var ref56 = new ActionReference();
	var idLyr = charIDToTypeID( "Lyr " );
	var idOrdn = charIDToTypeID( "Ordn" );
	var idTrgt = charIDToTypeID( "Trgt" );
	ref56.putEnumerated( idLyr, idOrdn, idTrgt );
	desc92.putReference( idnull, ref56 );
	executeAction( idselectAllLayers, desc92, DialogModes.NO );
	TSclass.writeTextFile('\t~~~~sal ENDED~~~~~' );
}
TSclass.mnl = function(){
	TSclass.writeTextFile('\t~~~~mnl STARTED~~~~~' );
	var idMk = charIDToTypeID( "Mk  " );
	var desc93 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	var ref57 = new ActionReference();
	var idlayerSection = stringIDToTypeID( "layerSection" );
	ref57.putClass( idlayerSection );
	desc93.putReference( idnull, ref57 );
	var idFrom = charIDToTypeID( "From" );
	var ref58 = new ActionReference();
	var idLyr = charIDToTypeID( "Lyr " );
	var idOrdn = charIDToTypeID( "Ordn" );
	var idTrgt = charIDToTypeID( "Trgt" );
	ref58.putEnumerated( idLyr, idOrdn, idTrgt );
	desc93.putReference( idFrom, ref58 );
	executeAction( idMk, desc93, DialogModes.NO );
	TSclass.writeTextFile('\t~~~~mnl ENDED~~~~~' );
}
TSclass.processSO = function(){
	//
	origRef = app.activeDocument;
	//
	origRef.artLayers[0].activeLayer;
	//
	lay = origRef.activeLayer;
	//
	TSclass.p.smartObjectName = lay.name;
	if(TSclass.oneLayerSelected() && TSclass.enterSO()){
		//
		TSclass.writeTextFile('\t~~~~copySoLayers STARTED~~~~~' );
		//
		TSclass.copySoLayers();
		//
		TSclass.writeTextFile('\t~~~~copySoLayers ENDED~~~~~' );
		//
		TSclass.writeTextFile('\t~~~~copyPathitems STARTED~~~~~' );
		//
		TSclass.copyPathitems();
		//
		TSclass.writeTextFile('\t~~~~copyPathitems ENDED~~~~~' );
		//
		TSclass.writeTextFile('~~~~CLOSING FILE~~~~~' );
		//
		TSclass.closeFileWithoutSave(SOref);
		//
		TSclass.writeTextFile('~~~~MOVING BEFORE SO~~~~~' );
		//
		origRef.layers[0].move(lay,ElementPlacement.PLACEBEFORE);
		//
		origRef.activeLayer = lay;
		//
		lay.visible = false;
		//
		return true;
	}else{
		alert('Make sure Smartobject is selected, and only 1 layer is selected.\n\nTry again.','ABORTING - Tejwani.com', true);
		return false;
	}
}
TSclass.copyPathitem = function(pathName) {

	function step2(pathName) {	var desc1 = new ActionDescriptor(); var ref1 = new ActionReference();	ref1.putName(cTID('Path'), pathName);desc1.putReference(cTID('null'), ref1);executeAction(cTID('slct'), desc1, DialogModes.NO);	};

	function step3() {	executeAction(cTID('copy'), undefined, DialogModes.NO);	};

	function step4() { var desc1 = new ActionDescriptor(); var ref1 = new ActionReference();	ref1.putOffset(cTID('Dcmn'), -1); desc1.putReference(cTID('null'), ref1); executeAction(cTID('slct'), desc1, DialogModes.NO); };

	function step5() { var desc1 = new ActionDescriptor(); var ref1 = new ActionReference(); ref1.putClass(cTID('Path')); desc1.putReference(cTID('null'), ref1);		 executeAction(cTID('Mk  '), desc1, DialogModes.NO); };

	function step6() { executeAction(cTID('past'), undefined, DialogModes.NO); };

	function step7() { var desc1 = new ActionDescriptor(); var ref1 = new ActionReference();  ref1.putEnumerated(cTID('Path'), cTID('Ordn'), cTID('Trgt'));  desc1.putReference(cTID('null'), ref1); executeAction(cTID('Dslc'), desc1, DialogModes.NO); };

	step2(pathName);  step3(); step4(); step5();  step6(); step7();
};

TSclass.copyPathitems = function(){
	for(z=0; z < SOref.pathItems.length; z++){
		//
		app.activeDocument = SOref;
		//
		var thisName = SOref.pathItems[z].name;
		//
		TSclass.writeTextFile('\t\t'+z + ' |PathName:' + thisName);
		//
		TSclass.copyPathitem(thisName);
		//		app.activeDocument.pathItems[app.activeDocument.pathItems.length - 1].name = thisName;
		//		alert('_'+thisName);
		//
		TSclass.renamePath(thisName); // removed _ before thisName
	}
}

TSclass.renamePath = function(newName){
	var cnt = app.activeDocument.pathItems.length;
	var nameFound = false;
	for(var z = 0; z <  cnt; z++){if(app.activeDocument.pathItems[z].name == newName){nameFound = true;break;}}
	if(nameFound){
		TSclass.renamePath('_'+newName);
	}else{
		app.activeDocument.pathItems[app.activeDocument.pathItems.length - 1].name = newName;
	}
}

TSclass.oneLayerSelected =   function(){
	var selLayers = TSclass.getSelectedLayersIdx();
	if(selLayers.length != 1){
		alert('Kindly select only the SMARTOBJECT layer and try again. [' + selLayers.length+ ' layers selected]','Input Error - Tejwani.com',true);		return false;
	}else{
		return true;
	}
}

TSclass.getSelectedLayersIdx = function(){
	//
	var selectedLayers = new Array; var ref = new ActionReference();	ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); var desc = executeActionGet(ref);
	//
	if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){
		//
		desc = desc.getList( stringIDToTypeID( 'targetLayers' ));
		//
		var c = desc.count; var selectedLayers = new Array();
		//
		for(var i=0;i<c;i++){
			try{
				//
				activeDocument.backgroundLayer; selectedLayers.push(  desc.getReference( i ).getIndex() );
			}catch(e){
				//
				selectedLayers.push(  desc.getReference( i ).getIndex()+1 );
			}
		}
	}else{
		var ref = new ActionReference();
		ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
		try{
			activeDocument.backgroundLayer;
			selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);
		}catch(e){
			selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));
		}
	}
	return selectedLayers;
};

TSclass.closeFileWithoutSave = function(fileRef) {	fileRef.close(SaveOptions.DONOTSAVECHANGES)};

TSclass.closeFileWithSave = function(fileRef) {	fileRef.close(SaveOptions.SAVECHANGES)};

TSclass.enterSO = function() {	try{		var idplacedLayerEditContents = stringIDToTypeID("placedLayerEditContents");		var desc7 = new ActionDescriptor();		executeAction(idplacedLayerEditContents, desc7, DialogModes.NO);		return true;	}	catch(e){		return false;	}}

TSclass.writeTextFile = function(msg) {
	if(TSclass.p.writeLog){ var cd = new Date(); var dt = cd.getDate() + "/" + (cd.getMonth()+1) + "/" + cd.getFullYear() + "@" + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds(); var txtFile = new File(TSclass.p.logFolder +'/'+ TSclass.p.logFile);txtFile.open("a");txtFile.writeln(dt + '> ' + msg);	txtFile.close();}
}

var myClass = new TSclass();
myClass.main();
indexNum=0;SOref  = null;origRef = null;
