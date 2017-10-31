var express = require("express")
var app = express()
var path = require("path")
var UAParser = require('ua-parser-js');
var parser = new UAParser();

app.use(express.static("public"))
app.use(express.static("views"))

app.get("/api/whoami/", function(req, res){
  //decided to get req.get(headerobject) to pull data for language and ip address. split the string and use the first array string.
  //probably got get a bunch of errors.
  var language = req.get("accept-language").split(",")[0]
  var ipAdd = req.get("x-forwarded-for").split(",")[0]
  //decide to use a the user agent parser module
  
  var ua = req.headers['user-agent']
  var os = parser.setUA(ua).getOS()
  
  res.json({"IP Address": ipAdd, "Lanuage": language, "Operating System": os["name"] + " " + os["version"]})
})

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname + "/index.html"))
})

app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + this.address().port);
});