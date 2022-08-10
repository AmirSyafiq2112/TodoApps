var express = require("express");
var requestIp = require("request-ip");
var todoController = require("./controllers/todoController");

var app = express();

//set up template engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//client ip
app.use("", function (req, res, next) {
  console.log(req.url);
  var clientIp = requestIp.getClientIp(req);
  console.log(clientIp);

  next();
});

//fire controllers
todoController(app);

//listen to port
// var port = 3000;
// var hostname = "192.168.0.112";
// app.listen(port, hostname, function () {
//   console.log(`Server is running on ${hostname}:${port}`);
// });
