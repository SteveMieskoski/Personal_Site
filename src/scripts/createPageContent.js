var $ = require("../lib/jquery.min.js");


function createPageContent() {
}

createPageContent.prototype = {
	constructor: createPageContent,

	loadHtmlFile: function (filename, classes, scene, camera, renderer, orientation) {

		if (orientation === undefined) {
			orientation = window.innerHeight > window.innerWidth;
		}
		var xmlRequest,
			pageElement = document.createElement('div');
		pageElement.className = classes;
		xmlRequest = new XMLHttpRequest();

		xmlRequest.onreadystatechange = function () {

			if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {

				$(pageElement).html(xmlRequest.responseText);

				var toggleButton = document.createElement('button');
				toggleButton.textContent = 'Return';
				toggleButton.className = 'template-return-button mdl-button-return  mdl-js-button mdl-js-ripple-effect';

				pageElement.querySelector('div.button-attach').appendChild(toggleButton);
			}

			xmlRequest.onload = function () {
				var object = new THREE.CSS3DObject(pageElement);
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = 10;
				object.rotation.y = -0.2;
				object.name = 'html';
				scene.add(object);
				renderer.render(scene, camera);
			};
		};

		xmlRequest.open('GET', filename, true);
		xmlRequest.send();

		xmlRequest.addEventListener('loadend', afterLoadendSetups, false);

		function afterLoadendSetups() {
			if (orientation) {
				var landscapeMessage = document.createElement('span');
				landscapeMessage.textContent = 'To better view site rotate to landscape ';
				landscapeMessage.className = 'better-view-message';
				if (pageElement.querySelector('div.messageAttach') !== null) {
					pageElement.querySelector('div.messageAttach').appendChild(landscapeMessage);
				}
			}
			if (pageElement.querySelector('div#languagesPage')) {
				console.log("langualge page");
				buildProgrammingTable(pageElement);
			}
			var pageNavEvent = new Event("pageNav");
			pageElement.dispatchEvent(pageNavEvent);

			// dispatch event to button control to attach listeners to template buttons
			var pageCreatedEvent = new Event('ContentPageCreated');
			document.dispatchEvent(pageCreatedEvent);
		}

		var languagesTable = [
			[
				{label: "HTML", fill: 9, bold: true},
				{label: 'space'},
				{label: 'JAVASCRIPT', fill: 9, bold: true},
				{label: 'NodeJS', fill: 8},
				{label: 'AngularJS', fill: 8},
				{label: 'jQuery', fill: 7},
				{label: 'Aframe', fill: 5},
				{label: 'Express', fill: 7},
				{label: 'RequireJS', fill: 4},
				{label: 'Webpack', fill: 6},
				{label: "Mongoose", fill: 7},
				{label: 'Squelize', fill: 5},
				{label: "MochaJS", fill: 6},
				{label: 'ThreeJS', fill: 5},
				{label: 'Angular', fill: 5},
				{label: 'React', fill: 4},
				{label: 'Vue', fill: 5},
				{label: 'space'},
			],
			[
				{label: "CSS", fill: 8, bold: true},
				{label: 'space'},
				{label: "JAVA", fill: 7, bold: true},
				{label: "Android", fill: 6},
				{label: "Hibernate", fill: 5},
				{label: "JavaFX", fill: 6},
				{label: "space"},
				{label: "PYTHON", fill: 5, bold: true},
				{label: "Django", fill: 3},
				{label: "space"},
			],
			[
				{label: "SQL", fill: 6, bold: true},
				{label: "space"},
				{label: "Databases", heading: true},
				{label: "MongoDb", fill: 7},
				{label: "MySQL", fill: 6},
				{label: "space"},
				{label: 'Version Control', heading: true},
				{label: "GIT", fill: 7},
				{label: "space"},
				{label: 'Operating Sys.', heading: true},
				{label: "Linux", fill: 8},
				{label: "Windows", fill: 6},
				{label: "space"},

			]

		];

		function buildProgrammingTable(pageElement) {
			//var table = pageElement.querySelector('table#circleJavascript');
			var table = $('table#circleJavascript');
			console.log(table);
			var maxRows = 0;
			for(var j=0; j<languagesTable.length; j++){
				if (languagesTable[j].length > maxRows) {
					maxRows = languagesTable[j].length;
				}
			}

			for (var i = 0; i < maxRows; i++) {
				var circleItem, spaceItem, firstCol;
				var row = $("<tr>");
				for(var p=0; p<languagesTable.length; p++){
					if (i < (languagesTable[p].length - 1)) {
						if (languagesTable[p][i].label === 'space') {
							for (var ss = 0; ss < 12; ss++) {
								circleItem = $("<td>");
								circleItem.html("<div>&nbsp</div>");
								row.append(circleItem);
							}
						} else if(languagesTable[p][i].heading){
							firstCol = $('<td style="font-weight: 600; text-align: center; ">' + languagesTable[p][i].label + '</td>');
							row.append(firstCol);
							for (var s = 0; s < 11; s++) {
								circleItem = $("<td>");
								circleItem.html("<div>&nbsp</div>");
								row.append(circleItem);
							}
						} else {
							if (languagesTable[p][i].bold) {
								firstCol = $('<td style="font-weight: 600; text-align: center;">' + languagesTable[p][i].label + '</td>');
							} else {
								firstCol = $('<td style="text-align: center;">' + languagesTable[p][i].label + '</td>');
							}
							row.append(firstCol);

							for (var n = 0; n < 10; n++) {
								circleItem = $("<td>");
								if (n < (languagesTable[p][i].fill)) {
									circleItem.html("<div class=\"circular greencircle\"></div>");
									row.append(circleItem);
								} else {
									circleItem.html("<div class=\"circular empty\"></div>");
									row.append(circleItem);
								}
							}
							row.append('<td><div>&nbsp</div></td>');
						}

					} else {
						for (var mnn = 0; mnn < 12; mnn++) {
							circleItem = $("<td>");
							circleItem.html("<div>&nbsp</div>");
							row.append(circleItem);
						}
					}

				}
				table.append(row);
			}
		}
	}

};

module.exports = new createPageContent;