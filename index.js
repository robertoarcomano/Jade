#!/usr/bin/node
var express = require("express");
var app = express();
const pug = require('pug');
const SERVERPORT = 80;

app.use(express.static('css'));
app.set('views', './views');
app.set('view engine', 'pug');

var headerText = {
	"text": "Demonstration Jade"
}
var header = pug.renderFile("views/header.pug",headerText);

var leftMenus = {
	"menuItems": {
		"Operating Systems" : "menu",
		"FreeBSD" : "?url=https://www.freebsd.org/",
		"Kernel Linux" : "?url=http://www.kernel.org",
		"Virtual Environment" : "menu",
		"VMWare" : "?url=http://www.vmware.com",
		"Xen" : "?url=http://www.xen.com"
	}
};
var left = pug.renderFile("views/menu.pug",leftMenus);

var center_title = "Central Page";
var center_body_initial = "Please click the links on the left";

app.get('/',function(req,res) {
	var url = req.query.url;
	center_body = url == undefined ? center_body_initial : "URL you clicked is " + url;
	res.render('index',{
		"title": "Jade Page",
		"header": header,
		"left": left,
		"right": "Right",
		"center_title": center_title,
		"center_body": center_body,
		"footer": "Footer"
	});
});

app.listen(SERVERPORT);
