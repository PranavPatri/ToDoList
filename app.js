//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-pranav:Test123@cluster0.yxvrl6g.mongodb.net/todolistDB");

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "welcome to your todolist"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  const day = date.getDate();
  Item.find().then(function(foundItems) {
    if(foundItems.length === 0) {
      Item.insertMany(defaultItems).then(function() {
        mongoose.connection.close();
        console.log("Succesfully saved default items to DB.");
      }).catch(function(err) {
        console.log(err);
      });
      res.redirect("/");
    }else {
          res.render("list", {listTitle: day, newListItems: foundItems});
    }
  }).catch(function(err) {
    console.log(err);
  });

});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}).then(function(foundList) {
    if(!foundList) {
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/" + customListName);
    }else {
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    }
  });
  
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === date.getDate()) {
    item.save();
    res.redirect("/");    
  }else {
    List.findOne({name: listName}).then(function(foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === date.getDate()) {
    Item.findByIdAndRemove(checkedItemId).then(function() {
      console.log("Deleted selected item succesfully.");
      res.redirect("/");
      }).catch(function(err) {
        console.log(err);
      });
  }else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then(function(foundList) {
      res.redirect("/" + listName);
    }).catch(function(err) {
      console.log(err);
    });
  }
  
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
