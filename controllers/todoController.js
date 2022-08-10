var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require("mongoose");

//Connect tot the database
mongoose.connect(
  "mongodb+srv://Amir_user:test@cluster0.qmbcz.mongodb.net/?retryWrites=true&w=majority"
);

//Create a schema, schema is like a blueprint for how data is saved
var todoSchema = new mongoose.Schema({
  item: String,
});

//Create model, capital first letter of variable for model
var Todo = mongoose.model("Todo", todoSchema);

// Hard-coded creating data
// var itemOne = Todo({ item: "buy flowers" }).save(function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log("item saved");
// });

// var data = [{ item: "example1" }, { item: "example2" }, { item: "example3" }];

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    //get data from mongodb and pass it to view
    //'data' variable get data from 'find' method
    Todo.find({}, function (err, data) {
      if (err) throw err;

      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
      console.log(data);
    });
  });

  app.delete("/todo/:item", function (req, res) {
    //delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
