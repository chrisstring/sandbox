// MUSTANGYOUAQUESTION!
// Version 3.00
// Date 20170919
// Author Christopher String
// This is for the MUSTANG jobs
// Added in vector mask support and changed method for layer copying to duplicating the layer into a new document
// Added in bad INPUT CSV files that are blank, #idiotproofsometimes
// 20170425: Commented out the Background.selection layer, was unecessary and caused an error!


function makeWheelJobsGreat()
{
  var skuListPath = File.openDialog("SELECT CSV FILE","Documents:*csv",true); // Object type
	
	//	skuListPath contains a reference to the path object, LETS READ THIS SHIT
		var skuList = new File(skuListPath); // skuList = reference to the file		
		var strSkuPath = skuListPath.toString().replace(skuList.name,''); // just the path gurl

	//	open that shit
		skuList.open('r');
		var allGood=true;
		var strBadSku="";
	// time to iterate through!
	while (!skuList.eof)
	{
		// use the function skuList.readln();
			var curFileName=skuList.readln().toString()
			if (curFileName!='\n');
				
			//mergeOnCar(curFileName, strSkuPath);
			
			{
			try {mergeOnCar(curFileName, strSkuPath);
			}
			catch(tmpBadSku){
				strBadSku+=tmpBadSku+"\n";
				allGood=false;
				//alert("We just excepted into our pants!!!");
			}
			}
			
	}
	
	
	skuList.close();	
	if (allGood){alert("Operation completed successfully with 0 casualties","Soylent Status")}else{alert("Operation unsuccessful, the following SKUS could not be combined:\n"+strBadSku+"\n\nMissing Skus written to errorlog.csv","Pick up that Can, Citizen");

	var tmpTextFile = new File(strSkuPath+"Consolidated/errorlog.csv");
		tmpTextFile.open("w");
		tmpTextFile.writeln(strBadSku);
		tmpTextFile.close();
		tmpTextFile=null;
	
	
	}
}

function pathtoVectorMask() {  
							 function cTID(s) { return app.charIDToTypeID(s); };  
							 function sTID(s) { return app.stringIDToTypeID(s); };  
  
							  var desc27 = new ActionDescriptor();  
							  var ref11 = new ActionReference();  
							  ref11.putClass( cTID('Path') );  
							  desc27.putReference( cTID('null'), ref11 );  
							  var ref12 = new ActionReference();  
							  ref12.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') );  
							  desc27.putReference( cTID('At  '), ref12 );  
							  var ref13 = new ActionReference();  
							  ref13.putEnumerated( cTID('Path'), cTID('Ordn'), cTID('Trgt') );  
							  desc27.putReference( cTID('Usng'), ref13 );  
						 executeAction( cTID('Mk  '), desc27, DialogModes.NO );  
						};

function makeMask()
{
	var id4556 = charIDToTypeID( "setd" );
  var desc983 = new ActionDescriptor();
  var id4557 = charIDToTypeID( "null" );
  var ref657 = new ActionReference();
  var id4558 = charIDToTypeID( "Chnl" );
  var id4559 = charIDToTypeID( "fsel" );
  ref657.putProperty( id4558, id4559 );
  desc983.putReference( id4557, ref657 );
  var id4560 = charIDToTypeID( "T   " );
  var ref658 = new ActionReference();
  var id4561 = charIDToTypeID( "Chnl" );
  var id4562 = charIDToTypeID( "Chnl" );
  var id4563 = charIDToTypeID( "Trsp" );
  ref658.putEnumerated( id4561, id4562, id4563 );
  desc983.putReference( id4560, ref658 );
  executeAction( id4556, desc983, DialogModes.NO );

  var id4564 = charIDToTypeID( "Mk  " );
  var desc984 = new ActionDescriptor();
  var id4565 = charIDToTypeID( "Nw  " );
  var id4566 = charIDToTypeID( "Chnl" );
  desc984.putClass( id4565, id4566 );
  var id4567 = charIDToTypeID( "At  " );
  var ref659 = new ActionReference();
  var id4568 = charIDToTypeID( "Chnl" );
  var id4569 = charIDToTypeID( "Chnl" );
  var id4570 = charIDToTypeID( "Msk " );
  ref659.putEnumerated( id4568, id4569, id4570 );
  desc984.putReference( id4567, ref659 );
  var id4571 = charIDToTypeID( "Usng" );
  var id4572 = charIDToTypeID( "UsrM" );
  var id4573 = charIDToTypeID( "RvlS" );
  desc984.putEnumerated( id4571, id4572, id4573 );
  executeAction( id4564, desc984, DialogModes.NO );

}

function mergeOnCar(fn,fp)
{
	
	var mrgFileName=fn;
	var mrgSkuPath=fp;
	//alert("file name: "+mrgFileName);
	// change these values and letters as they change from Andy 
		var frontThreeQuarter =[];
		frontThreeQuarter.push(mrgFileName+"_05","pf");
		frontThreeQuarter.push(mrgFileName+"_06","pr");
		//frontThreeQuarter.push(mrgFileName+"_08","df");
	
		var rearThreeQuarter = [];
		rearThreeQuarter.push(mrgFileName+"_07","pr");
		rearThreeQuarter.push(mrgFileName+"_08","pf");
		//rearThreeQuarter.push(mrgFileName+"_10","pr");
		app.preferences.rulerUnits = Units.PIXELS;
		// Create a new 6390x4792 px document
		
		//alert("this is about to make the donor document front 3/4");
			var docFrontThreeQtr = app.documents.add(6390, 4792,300);
			
		
		
		// NOW OPEN ALL THE FILES that pertain to the FRONT THREE QUARTER Array
		
			// open 2 docs and make their Filereferences
			// DOC references are the actual open files
			var tmpFileFrontPFref = File(mrgSkuPath+addPSD(frontThreeQuarter[0].toString())); //quicktest
		if (!tmpFileFrontPFref.exists)
		{
			docFrontThreeQtr.close(SaveOptions.DONOTSAVECHANGES); // clean it all up!!
			//alert("throw the exception");
			throw mrgFileName;
		}
			
			var tmpDocPF = app.open(tmpFileFrontPFref);
			var tmpFileFrontPRref = File(mrgSkuPath+addPSD(frontThreeQuarter[2].toString()));var tmpDocPR = app.open(tmpFileFrontPRref); // mrgFileName_the suffix from the array
			
			// only 2 wheels need to be iterated here, pf and pr
		
		// ITERATE THROUGH THE ARRAY OF DOCUMENTS AND PERFORM THE COPY AND PASTE OPTION TO THE FIRST DOCUMENTS
		// recipient document = app.documents[0];

		//make the FOLDER FOR THE NEW BIG MADE FILE WUT WUT, but first lemme check if it exists

		var tempFolderName = Folder(mrgSkuPath+"Consolidated");
		if (!tempFolderName.exists) tempFolderName.create();
		
		var docKeywords = app.documents[1].info.keywords;
		
		for (i=1;i<3;i++)
		{
			//copy from each i document
			app.activeDocument = app.documents[i];
			var donorPSD = app.activeDocument;
			var tmpLayerIndex=(2*i)-1;

			donorPSD.activeLayer = donorPSD.artLayers.getByName("Layer 1"); // assuming all products will be named layer 1
			
			//donorPSD.pathItems.getByName("Path 1").select();pathtoVectorMask(); // this is path 1 to a vector // DEPRECATED, vector and layer mask made in the PREP action
			
			app.activeDocument.activeLayer.name=frontThreeQuarter[tmpLayerIndex].toString();
			donorPSD.activeLayer.duplicate(app.documents[0], ElementPlacement.PLACEATBEGINNING);
			//app.activeDocument.activeLayer= app.activeDocument.artLayers.getByName("Background"); // DEPRECATED, caused errors and not needed
				
		}

		while (app.documents.length>1){app.documents[1].close(SaveOptions.DONOTSAVECHANGES);}
		app.activeDocument.info.keywords = docKeywords;
		app.activeDocument.saveAs(File(mrgSkuPath+"Consolidated/"+addPSD(mrgFileName+"_front"))); //SAVE THE final and then close it
		app.activeDocument.activeLayer= app.activeDocument.artLayers.getByName("Background");	
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
	
// REPEAT AGAIN FOR rearthreequarter bc im lazy and just copy pasted the code
	app.preferences.rulerUnits = Units.PIXELS;
		var docRearThreeQtr = app.documents.add( 6390, 4792,300 );
		// NOW OPEN ALL THE FILES that pertain to the FRONT THREE QUARTER Array
		
			// open 3 docs and make their Filereferences, DOC references are the actual open files

		var tmpFileRearPRref = File(mrgSkuPath+addPSD(rearThreeQuarter[0].toString()));var tmpDocPR = app.open(tmpFileRearPRref); // Only two wheels here too
		var tmpFileRearPFref = File(mrgSkuPath+addPSD(rearThreeQuarter[2].toString()));var tmpDocPF = app.open(tmpFileRearPFref);
		
		// ITERATE THROUGH THE ARRAY OF DOCUMENTS AND PERFORM THE COPY AND PASTE OPTION TO THE FIRST DOCUMENTS
		// recipient document = app.documents[0];

		var docKeywords = app.documents[1].info.keywords;
		
		for (i=1;i<3;i++)
		{
			//copy from each i document
			app.activeDocument = app.documents[i];
			var donorPSD = app.activeDocument;
			var tmpLayerIndex=(2*i)-1;

			donorPSD.activeLayer = donorPSD.artLayers.getByName("Layer 1"); // assuming all products will be named layer 1
		
			//donorPSD.pathItems.getByName("Path 1").select();pathtoVectorMask(); // this is path 1 to a vector
			//donorPSD.pathItems.getByName("Path 2").makeSelection().invert();makeMask(); // this is path 2 to a pixel
			
			app.activeDocument.activeLayer.name=rearThreeQuarter[tmpLayerIndex].toString();
			donorPSD.activeLayer.duplicate(app.documents[0], ElementPlacement.PLACEATBEGINNING);
			//app.activeDocument.activeLayer= app.activeDocument.artLayers.getByName("Background"); // this was creating HORRIBLE problems. DEPRECATED
		}

		while (app.documents.length>1){app.documents[1].close(SaveOptions.DONOTSAVECHANGES);}

		app.activeDocument.info.keywords = docKeywords;
		app.activeDocument.saveAs(File(mrgSkuPath+"Consolidated/"+addPSD(mrgFileName+"_rear"))); //SAVE THE final and then close it
		app.activeDocument.activeLayer= app.activeDocument.artLayers.getByName("Background");	
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		
		// Release references
		docRef = null
		artLayerRef = null
		textItemRef = null

}


function addPSD(fileName){ return fileName+".psd".toString();}
makeWheelJobsGreat();