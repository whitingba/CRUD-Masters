// Import the model to use its database functions.
var db = require("../models");

module.exports = function (app) {
  //****************ALL TASK ROUTES (BARBARA)***************/
  // GET route for getting all of the tasks "List All Tasks page"
  app.get("/", function (req, res) {
    db.Tasks.findAll({
      order: [
        ['task_name', 'ASC'],
      ],
      include: [
        {
          model: db.Users
        }
      ],
    }).then(function (tasks) {
      // We have access to the tasks as an argument inside of the callback function
      console.log(tasks);
      db.Users.findAll().then(function (users) {
        res.render("index", { tasks, users });
      });

    });
  });

  //Route to add task
  app.post("/api/tasks", function (req, res) {
    db.Tasks.create({
      task_name: req.body.task_name,
      UserId: req.body.UserId
    }).then(function (results) {
      res.json(results);
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  });


  //Route to Edit tasks
  app.put("/api/tasks/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    db.Tasks.update({
      frequency: req.body.frequency,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  //delete tasks
  app.delete("/api/tasks/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    db.Tasks.destroy({
      frequency: req.body.frequency,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });



  //**********************ALL USER ROUTES (OBI)*********************/
  // Route to add user
  app.post("/api/user", function (req, res) {
    db.Users.create({
      user_name: req.body.user_name,
    }).then(function (results) {
      res.json(results);
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  });
}