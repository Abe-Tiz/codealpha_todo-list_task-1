function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    var li = document.createElement("li");
    var randomColor = getRandomColor();
    li.style.backgroundColor = randomColor;
    var textColor = getRandomTextColor(randomColor);
    li.style.color = textColor;

    li.innerHTML =
      '<input type="checkbox" onchange="toggleTaskCompletion(this)">' +
      '<span style="color:' +
      textColor +
      ';">' +
      taskInput.value +
      "</span>" +
      '<input type="text" value="' +
      taskInput.value +
      '" onblur="saveTask(this)" onkeyup="checkEnterKey(event, this)">' +
      '<button class="edit-btn" onclick="editTaskIcon(this)"><i class="fas fa-edit"></i></button>' +
      '<button class="delete-btn" onclick="removeTask(this)"><i class="fas fa-trash-alt"></i></button>';
    taskList.appendChild(li);
    taskInput.value = "";
  } else {
    alert("Please enter a valid task.");
  }
}

function removeTask(btn) {
  var li = btn.parentNode;
  li.parentNode.removeChild(li);
}

function editTaskIcon(btn) {
  var li = btn.parentNode;
  var span = li.querySelector("span");
  var input = li.querySelector('input[type="text"]');
  span.style.display = "none";
  input.style.display = "inline-block";
  input.focus();
}

function saveTask(input) {
  var span = input.previousElementSibling;
  span.innerText = input.value;
  span.style.display = "inline-block";
  input.style.display = "none";
}

function checkEnterKey(event, input) {
  if (event.key === "Enter") {
    saveTask(input);
  }
}

function toggleTaskCompletion(checkbox) {
  var li = checkbox.parentNode;
  li.classList.toggle("completed");
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomTextColor(bgColor) {
  var rgb = parseInt(bgColor.slice(1), 16);
  var r = (rgb >> 16) & 0xff;
  var g = (rgb >> 8) & 0xff;
  var b = (rgb >> 0) & 0xff;
  var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 128 ? "#1a1a1a" : "#ffffff";
}
