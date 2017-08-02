
import {PersonalSite} from "./main.js";
var $ = require("../lib/jquery.min.js");
var data = require('../top/data');

$(document).ready(function(){

	let appliedInteractionClasses = {
		templateHomeButton: 'template-return-button',
		demoLinks: [{linkClass: 'demo-app-0', linkUrl: 'http://steve-mieskoski-demo-app-2.herokuapp.com'},
			{linkClass: 'demo-app-1', linkUrl: 'http://steve-mieskoski.herokuapp.com/home'}]
	}
	let site = new PersonalSite(THREE, TWEEN, "container", data.dataArray);
	site.init();
	//site.urlInit();

});