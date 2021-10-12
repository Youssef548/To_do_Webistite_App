let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty arr
EmptyArr = [];

if (window.localStorage.getItem("tasks")) {
  EmptyArr = JSON.parse(window.localStorage.getItem("tasks"));
}

// trigger function
GetLocalStorage();

submit.onclick = function () {
  if (input.value != "") {
    AddElementToArr(input.value);
  }
};

// click on task ele
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // remove ele from page
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove from local storage
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    // toggle completed of the task
    toggleStatusTask(e.target.getAttribute("data-id"));
    // toggle done clas
    e.target.classList.toggle("done");
  }
});

function AddElementToArr(taskText) {
  const task = {
    title: taskText,
    id: Date.now(),
    completed: false,
  };
  EmptyArr.push(task);
  // add element to page
  addEleToPage(EmptyArr);
  // add local storage
  addlocal(EmptyArr);
}
function addEleToPage(EmptyArr) {
  tasksDiv.innerHTML = "";
  EmptyArr.forEach((task) => {
    // main div
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed == true) {
      console.log("wow");
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}
function addlocal(task) {
  window.localStorage.setItem("tasks", JSON.stringify(EmptyArr));
}
function GetLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addEleToPage(EmptyArr);
  }
}

function deleteTaskWith(taskId) {
  EmptyArr = EmptyArr.filter((task) => task.id != taskId);
  addlocal(EmptyArr);
}
function toggleStatusTask(taskId) {
  for (let i = 0; i < EmptyArr.length; i++) {
    if (EmptyArr[i].id == taskId) {
      if (EmptyArr[i].completed == false) {
        EmptyArr[i].completed = true;
      } else if (EmptyArr[i].completed == true) {
        EmptyArr[i].completed = false;
      } else {
        console.log("reror");
      }
    }
  }
  addlocal(EmptyArr);
}
