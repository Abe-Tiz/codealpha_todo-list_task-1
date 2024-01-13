const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    const li = document.createElement("li");
    const randomColor = getRandomColor();
    li.style.backgroundColor = randomColor;
    const textColor = getRandomTextColor(randomColor);
    li.style.color = textColor;

    li.innerHTML = `
      <input type="checkbox" onchange="toggleTaskCompletion(this)">
      <span style="color: ${textColor};">${taskInput.value}</span>
      <input type="text" value="${taskInput.value}" onblur="saveTask(this)" onkeyup="checkEnterKey(event, this)">
      <button class="edit-btn" onclick="editTaskIcon(this)"><i class="fas fa-edit"></i></button>
      <button class="delete-btn" onclick="removeTask(this)"><i class="fas fa-trash-alt"></i></button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
  } else {
    alert("Please enter a valid task.");
  }
};

const removeTask = (btn) => {
  const li = btn.parentNode;
  const confirmationModal = document.getElementById("confirmationModal");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  confirmationModal.style.display = "flex";
  
  confirmDeleteBtn.onclick = () => {
    li.parentNode.removeChild(li);
    confirmationModal.style.display = "none";
  };

  cancelDeleteBtn.onclick = () => {
    confirmationModal.style.display = "none";
  };
};


const editTaskIcon = (btn) => {
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const input = li.querySelector('input[type="text"]');

  if (input.style.display === "none") {
    span.style.display = "none";
    input.style.display = "inline-block";
    input.focus();
  } else {
    saveTask(input);
  }
};

const saveTask = (input) => {
  const span = input.previousElementSibling;
  span.innerText = input.value;
  span.style.display = "inline-block";
  input.style.display = "none";
};

const checkEnterKey = (event, input) => {
  if (event.key === "Enter") {
    saveTask(input);
  }
};

const toggleTaskCompletion = (checkbox) => {
  const li = checkbox.parentNode;
  li.classList.toggle("completed");
};

const getRandomColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
};

const getRandomTextColor = (bgColor) => {
  const rgb = parseInt(bgColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 128 ? "#1a1a1a" : "#ffffff";
};


