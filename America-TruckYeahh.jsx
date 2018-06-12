// AMERICA NEEDS MORE WJs!
// Version 3.00
// Date 20170919
// Author Christopher String
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
			
			var curFileName=skuList.readln().toString();
			
			if (curFileName!='\n')
			
			{
			try {
			mergeOnCar(curFileName, strSkuPath);
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

function mergeOnCar(fn,fp)
{
	
	var mrgFileName=fn;
	var mrgSkuPath=fp;
	//alert("file name: "+mrgFileName);
	// change these values and letters as they change from Andy 
		var frontThreeQuarter =[];
		frontThreeQuarter.push(mrgFileName+"_05","pf");
		frontThreeQuarter.push(mrgFileName+"_06","pr");
		frontThreeQuarter.push(mrgFileName+"_07","df");
	
		var rearThreeQuarter = [];
		rearThreeQuarter.push(mrgFileName+"_07","dr");
		rearThreeQuarter.push(mrgFileName+"_08","pf");
		rearThreeQuarter.push(mrgFileName+"_09","pr");

		app.preferences.rulerUnits = Units.PIXELS;
		// Create a new 6390x4792 px document
			var docFrontThreeQtr = app.documents.add( 6390, 4792,300 );
		
		// NOW OPEN ALL THE FILES that pertain to the FRONT THREE QUARTER Array
		
			// open 3 docs and make their Filereferences
			// DOC references are the actual open files
			var tmpFileFrontPFref = File(mrgSkuPath+addPSD(frontThreeQuarter[0].toString())); //quicktest
		if (!tmpFileFrontPFref.exists)
		{
			docFrontThreeQtr.close(SaveOptions.DONOTSAVECHANGES); // clean it all up!!
			//alert("FILE NAME DOES EXIST: "+mrgFileName);
			throw mrgFileName;
		}
			
	
		// ITERATE THROUGH THE ARRAY OF DOCUMENTS AND PERFORM THE COPY AND PASTE OPTION TO THE FIRST DOCUMENTS
		// recipient document = app.documents[0];
			var tmpDocPF = app.open(tmpFileFrontPFref); //From line 140
			var tmpFileFrontPRref = File(mrgSkuPath+addPSD(frontThreeQuarter[2].toString()));var tmpDocPR = app.open(tmpFileFrontPRref);
			var tmpFileFrontDFref = File(mrgSkuPath+addPSD(frontThreeQuarter[4].toString()));var tmpDocDF = app.open(tmpFileFrontDFref);

			//make the FOLDER FOR THE NEW BIG MADE FILE WUT WUT, but first lemme check if it exists

		var tempFolderName = Folder(mrgSkuPath+"Consolidated");
		if (!tempFolderName.exists) tempFolderName.create();
		
		var docKeywords = app.documents[1].info.keywords;
		
		for (var i=1;i<4;i++)
		{
			//copy from each i document
			app.activeDocument = app.documents[i];
			var donorPSD = app.activeDocument;
			var tmpLayerIndex=(2*i)-1;
			
		//	donorPSD.pathItems.getByName("Path 1").select();pathtoVectorMask(); // this is path 1 to a vector
		//	var pathItemPixel = donorPSD.pathItems.getByName("Path 2");
		//	alert(typeof pathItemPixel);
		//	pathItemPixel.makeSelection();
		//	alert("full stop here");
			
			//alert("made a selection does it work!?!??!");
			donorPSD.activeLayer = donorPSD.artLayers.getByName("Layer 1"); // assuming all products will be named layer 1

			//alert("i="+i+"\ntmpLayerIndex="+tmpLayerIndex);
			app.activeDocument.activeLayer.name=frontThreeQuarter[tmpLayerIndex].toString();// alert("successfulrename to the matrix name");
			donorPSD.activeLayer.duplicate(app.documents[0], ElementPlacement.PLACEATBEGINNING); //alert("successful placement into recipient document");
			//app.activeDocument.activeLayer= app.activeDocument.artLayers.getByName("Background");
				
		}

		while (app.documents.length>1){app.documents[1].close(SaveOptions.DONOTSAVECHANGES);}
		
		app.activeDocument.info.keywords = docKeywords;
		app.activeDocument.saveAs(File(mrgSkuPath+"Consolidated/"+addPSD(mrgFileName+"_front"))); //SAVE THE final and then close it
		
		app.activeDocument.activeLayer= app.activeDocument.artLayers.getByName("Background");	
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

		// REPEAT AGAIN FOR rearthreequarter bc im lazy and just copy pasted the code
	
		var docRearThreeQtr = app.documents.add( 6390, 4792,300 );
		// NOW OPEN ALL THE FILES that pertain to the FRONT THREE QUARTER Array
		
			// open 3 docs and make their Filereferences
			// DOC references are the actual open files
		var tmpFileRearSTref = File(mrgSkuPath+addPSD(rearThreeQuarter[0].toString()));var tmpDocST = app.open(tmpFileRearSTref);
		var tmpFileRearPFref = File(mrgSkuPath+addPSD(rearThreeQuarter[2].toString()));var tmpDocPF = app.open(tmpFileRearPFref);
		var tmpFileRearPRref = File(mrgSkuPath+addPSD(rearThreeQuarter[4].toString()));var tmpDocPR = app.open(tmpFileRearPRref);
	
		// ITERATE THROUGH THE ARRAY OF DOCUMENTS AND PERFORM THE COPY AND PASTE OPTION TO THE FIRST DOCUMENTS
		// recipient document = app.documents[0];

		var docKeywords = app.documents[1].info.keywords;
		
		for (i=1;i<4;i++)
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
			//app.activeDocument.activeLayer= app.activeDocument.artLayers.getByName("Background");
		}

		while (app.documents.length>1){app.documents[1].close(SaveOptions.DONOTSAVECHANGES);}

		app.activeDocument.info.keywords = docKeywords;
		app.activeDocument.saveAs(File(mrgSkuPath+"Consolidated/"+addPSD(mrgFileName+"_rear"))); //SAVE THE final and then close it
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		
		// Release references
		docRef = null
		artLayerRef = null
		textItemRef = null

}


function addPSD(fileName){ return fileName+".psd".toString();}
makeWheelJobsGreat();