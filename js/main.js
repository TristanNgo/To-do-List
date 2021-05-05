let taskService = new TaskService();
function getEle(id) {
  return document.getElementById(id);
}
function renderListTask() {
  taskService
    .getListTask()
    .then(function (result) {
      renderTask(result.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

getEle("addItem").addEventListener("click", function () {
  var taskTodo = getEle("newTask").value;

  if (taskTodo !== "") {
    var task = new Task("", "toDo", taskTodo); //B1
    taskService
      .addTask(task)
      .then(function (result) {
        location.reload();
        alert("Add successful");
        renderListTask();
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    alert("Task Empty");
  }
});
function deleteTask(id) {
  taskService
    .deleteTask(id)
    .then(function (result) {
      alert("Delete successful");
      location.reload();
      renderListTask(result.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
function renderTask(arr) {
  var contentToDo = "";
  var contentCompleted = "";
  arr.forEach(function (item) {
    if (item.status === "toDo") {
      //B2
      contentToDo += `
            <li>
                <span>${item.textTask}</span>
                    <div class="buttons">   
                        <button class="remove" onclick = "deleteTask(${item.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick ="updateTaskStatus('${item.id}')">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>   
            </li>
        `;
    } else {
      contentCompleted += `
            <li>
                <span>${item.textTask}</span>
                    <div class="buttons">   
                        <button class="remove" onclick = "deleteTask(${item.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick = "updateTaskStatus(${item.id})">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>   
            </li>
        `;
    }

    getEle("todo").innerHTML = contentToDo;
    getEle("completed").innerHTML = contentCompleted;
  });
}
renderListTask();
function updateTaskStatus(id) {
  return taskService.getlistTaskByID(id).then(function (rs) {
    var taskUpdate = rs.data;
    if (taskUpdate.status === "toDo") {
      taskUpdate.status = "Complete";
      return taskService.updateTask(taskUpdate).then(function (rs) {
        alert("change status complete");
        location.reload();
        renderListTask();
      });
    } else {
      taskUpdate.status = "toDo";
      taskService.updateTask(taskUpdate).then(function (rsfalse) {
        alert("Change status toDo");
        location.reload();
        renderListTask();
      });
    }
  });
  //    taskService.getlistTaskByID(id)
  //    .then(function(rs){

  //        var taskUpdate = rs.data;
  //        if(taskUpdate.status === "toDo"){
  //         taskUpdate.status = "Complete";
  //         taskService.updateTask(taskUpdate)
  //         .then(function(rs){

  //             alert("change status complete");
  //             location.reload();
  //             renderListTask();
  //         })
  //        }
  //        else
  //        {
  //             taskUpdate.status = "toDo";
  //             taskService.updateTask(taskUpdate)
  //            .then(function(rsfalse){

  //                alert("Change status toDo");
  //                location.reload();
  //                renderListTask();
  //            })
  //        }

  //    })
}
