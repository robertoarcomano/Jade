#!/usr/bin/node
var express = require("express");
var app = express();
var fs = require("fs");
var stylus = require("stylus");

const pug = require('pug');
const SERVERPORT = 80;

//app.use(express.static('css'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/css/:css',function(req,res) {
	var cssFilename = req.params.css;
	var stylFilename = cssFilename.replace(".css",".styl");
	var str = fs.readFileSync("css/"+stylFilename).toString();
	stylus(str)
	  .set('filename', cssFilename)
	  .render(function(err, css){
			if (err)
				throw err;
			res.send(css);
	  });
});

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

var lists = {
	"lists": [
		{	"title": "Are we sure?", "items": ["yes","no"] },
		{	"title": "What do you prefer?", "items": ["hot","cold"] },
		{	"title": "What time is it?", "items": ["minutes","seconds"] }
]}
var right = pug.renderFile("views/right.pug",lists);

var center_title = "Central Page";
var center_body_initial = "Please click the links on the left";

app.get('/',function(req,res) {
	var url = req.query.url;
	center_body = url == undefined ? center_body_initial : "URL you clicked is " + url;
	res.render('index',{
		"title": "Jade Page",
		"header": header,
		"left": left,
		"right": right,
		"center_title": center_title,
		"center_body": center_body,
		"footer": "Footer"
	});
});

app.listen(SERVERPORT);
