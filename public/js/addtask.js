$(document).ready(function() {
  //TODO: call to the js file that will have GET/PUT/POST/DELETE api calls
  var API = {
    saveTask: function(task, frequency, owner) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/tasks", //NOTE: not sure what the route is yet
        data: JSON.stringify(task, frequency, owner)
      });
    }
  };

  //Caputure the values of the inputs
  $("#addTaskBtn").on("click", function() {
    event.preventDefault();
    task = $("#taskInput").val();
    // season = $("#taskSeason").val();
    frequency = $("#taskFrequency").val();
    owner = $("#taskOwner").val();
    // loc = $("#taskLocation").val();

    //Show a modal if there is no info, but the Add Task button was clicked
    if (task === "") {
      $(".modal").modal("toggle");

      //add the task to the database
    } else {
      task = task.trim();
      console.log(task, frequency, owner);
      API.saveTask(task, frequency, owner).then(function() {
        //QUESTION: What do I do now?  sync with the database?
      });
    }
  });
});
