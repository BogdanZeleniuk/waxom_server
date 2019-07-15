var http = require('http');
var url = require('url');
var fs = require("fs");
var winston = require("winston");
var express = require("express");
var path = require("path");
var config = require("./config/config.json");
var fileNameJSON = "./db.json";
var cheerio = require("cheerio");
var request = require('request');
var urlToPars = "https://news.ycombinator.com/newest";

var app = express();
app.set("port", config["port"]);
app.set("views", __dirname + "/template");
app.set("view engine", "ejs");
app.engine('ejs', require("ejs-locals"));

var log = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [ new winston.transports.Console(
  	{colorize: true,
  		label: __dirname})]
});

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res, next) {
	res.render("index");
});

app.get("/file", function (req, res, next) {
	var file = new fs.ReadStream(fileNameJSON);
	sendFile(file, res);	

	function sendFile(file, res) {
	file.pipe(res);

		file.on("error", function (err) {
			res.statusCode = 500;
			res.end("Server Error");
			log.error("Error. File Not Found");
		});

		file.on("open", function () {
			log.info("File is opening");
		})
		file.on("close", function () {
			log.info("File is closed");
		});
		file.on("close", function () {
			file.destroy();
		});
	}
});
app.post('/scrape', function(req, res){

  request(urlToPars, function (err, res, html) {
  	if (!err) {

  		var $ = cheerio.load(html);
  		var arr = [];

  		$('.storylink').each(function () {
  			var data = $(this);
  			var link, name;

  			var json = {link: "",
  						name: ""};
  			link = data.attr('href');
  			name = data.text();
		
			json.link = link;			
  			json.name = name;
  			
  			arr.push(json);
  		})

  		var createdFile = fs.createWriteStream('db.json');

  		createdFile.on('error', function(err) { 
  			log.info('Error while creating file ===db.json===');
  		});

  		arr.forEach(function (v) {
			createdFile.write(JSON.stringify(v) + '\n');  				
  		});
  		createdFile.end();
  	}
  	else{
  		log.info("Error is /scape link");
  	}
  });
  res.end();
});
http.createServer(app).listen(app.get("port"), function () {
	log.info("Express is listening on port " + config["port"]);
})
log.info('Server running on port 8080');