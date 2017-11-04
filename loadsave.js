/**
 * Blockly Demo: Turtle Graphics
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/**
 * @fileoverview Demonstration of Blockly: Turtle Graphics.
 * @author fraser@google.com (Neil Fraser)
 *
 * Modified in 2017 by mbrinkmeier@uni-osnabrueck.de (Michael Brinkmeier)
 *
 * - Added load and save Buttons
 */

'use strict';


var Tool = {};

Tool.wait = function(time) {
    time += new Date().getTime();
    while (new Date() < time){}
}

Tool.saveWorkspace2 = function() {
    var fileName = document.getElementById("fileName").value;
    if ( fileName.endsWith(".trt") ) {
        fileName = fileName.substring(0,fileName.length-4);
    }
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    // var xml = Blockly.Xml.blockToDom(Blockly.getMainWorkspace().getBlockById("__main__"));
    var data = Blockly.Xml.domToText(xml);
    var a = document.createElement('a');
    Tool.linkDownload(a, fileName + ".trt", data);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};


Tool.linkDownload = function (a, filename, content) {
    var contentType =  'data:application/octet-stream,';
    var uriContent = contentType + encodeURIComponent(content);
    a.setAttribute('href', uriContent);
    a.setAttribute('download', filename);
};


Tool.saveClicked = function() {
    var chooser = document.getElementById("saveChooser");
    var file = chooser.files[0];
    var fileName = file.name;
    console.log(file);
    if ( fileName.endsWith(".trt") ) {
        fileName = fileName.substring(0,fileName.length-4);
    }
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    // var xml = Blockly.Xml.blockToDom(Blockly.getMainWorkspace().getBlockById("__main__"));
    var data = Blockly.Xml.domToText(xml);
    var a = document.createElement('a');
    Tool.linkDownload(a, fileName + ".trt", data);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


Tool.loadClicked = function() {
    var chooser = document.getElementById("fileChooser");
    var file = chooser.files[0];
    var reader = new FileReader();
    reader.onloadend = function(event) {
        var text = event.target.result;
        var dom = Blockly.Xml.textToDom(text);
        console.log(text);
        console.log(dom);
        Blockly.getMainWorkspace().clear();
        // console.log(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
        Blockly.Xml.domToWorkspace(dom,Blockly.getMainWorkspace());
        console.log(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
        // Blockly.getMainWorkspace().addTopBlock(Blockly.Xml.domToBlock(dom,Blockly.getMainWorkspace()));
    }

    reader.readAsText(file);
}


Tool.loadWorkspace = function() {
    var chooser = document.getElementById("fileChooser");
    chooser.click();
};

Tool.saveWorkspace = function() {
    var fileName = document.getElementById("saveName").value;
    if ( fileName.endsWith(".trt") ) {
        fileName = fileName.substring(0,fileName.length-4);
    }
    // var xml = Blockly.Xml.blockToDom(Blockly.mainWorkspace.getBlockById("__main__"));
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    var data = Blockly.Xml.domToText(xml);
    var a = document.createElement('a');
    Tool.linkDownload(a, fileName + ".trt", data);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};


Tool.init = function() {
    var chooser = document.getElementById("fileChooser");
    chooser.addEventListener('change',Tool.loadClicked,false);
    Tool.restoreWorkspace();
};


 Tool.checkboxClicked = function() {
 	Tool.storeWorkspace();
  	var query = "";
  	var varcheck = document.getElementById("variables");
  	if ( varcheck.checked ) query = "variables=true";
  	var listcheck = document.getElementById("lists");
  	if ( listcheck.checked ) {
  		if ( query != "" ) query = query + "&";
  		query = query + "lists=true";
  	}
  	var opscheck = document.getElementById("operations");
  	if ( opscheck.checked ) {
  		if ( query != "" ) query = query + "&";
  		query = query + "operations=true";
  	}

  	window.location="/blockly/AlgoTurtle/?" + query;
 }


Tool.storeWorkspace = function() {
	var dom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
	var text = Blockly.Xml.domToText(dom);
  	localStorage.setItem("AlgoTurtle",text);
}


Tool.restoreWorkspace = function() {
	var text = localStorage.getItem("AlgoTurtle");
	if ( text ) {
		Blockly.getMainWorkspace().clear();
		var dom = Blockly.Xml.textToDom(text);
		Blockly.Xml.domToWorkspace(dom,Blockly.getMainWorkspace());
		localStorage.removeItem("AlgoTurtle");
	}
}
