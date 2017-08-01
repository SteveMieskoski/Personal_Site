
import {PersonalSite} from "./main.js";
var $ = require("../lib/jquery.min.js");
var data = require('../top/data');

$(document).ready(function(){

	let site = new PersonalSite(THREE, TWEEN, "container", data.dataArray);
	site.init();
	//site.urlInit();

});