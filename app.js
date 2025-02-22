const all = JSON.parse(localStorage.getItem("all")) || [
  {
    id: 1,
    completed: true,
    text: "Get up earlier",
  },
  {
    id: 2,
    completed: false,
    text: "Do morning exercise",
  },
  {
    id: 3,
    completed: false,
    text: "Eat fruits or vegetables",
  },
  {
    id: 4,
    completed: true,
    text: "Reading book for 20 minutes",
  },
  {
    id: 5,
    completed: false,
    text: "Get to the deep work!",
  },
  {
    id: 6,
    completed: false,
    text: "Have lunch, eat less",
  },
  {
    id: 7,
    completed: false,
    text: "Go for a walk or gym",
  },
  {
    id: 8,
    completed: false,
    text: "Start deep work again",
  },
  {
    id: 9,
    completed: false,
    text: "Have dinner",
  },
  {
    id: 10,
    completed: false,
    text: "Go to bed earlier",
  },
];

localStorage.setItem("all", JSON.stringify(all));
const savedAll = JSON.parse(localStorage.getItem("all"));

const items = document.querySelector(".items");
const addBtn = document.querySelector(".addBtn");
const input = document.querySelector("#input");

// tab keeping

const allTasksTab = document.querySelector(".all");
const activeItemsTab = document.querySelector(".active");
const completedItemsTab = document.querySelector(".completed-items");

// Save the last clicked tab
function setActiveTab(tabName) {
  localStorage.setItem("activeTab", tabName);
}

// Event listeners for tabs
allTasksTab.addEventListener("click", () => {
  setActiveTab("all");
  displayAllTasks();
});

activeItemsTab.addEventListener("click", () => {
  setActiveTab("active");
  displayActiveTasks();
});

completedItemsTab.addEventListener("click", () => {
  setActiveTab("completed");
  displayCompletedTasks();
});

// ✅ Restore last active tab on page load
window.addEventListener("load", () => {
  const lastTab = localStorage.getItem("activeTab") || "all";

  if (lastTab === "active") {
    displayActiveTasks();
  } else if (lastTab === "completed") {
    displayCompletedTasks();
  } else {
    displayAllTasks(); // Default to "All"
  }
});

// displaying all tasks done ✅
function displayAllTasks() {
  items.innerHTML = "";
  all.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("item");

    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";
    li.appendChild(span);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.classList.add("checkbox");
    checkbox.name = "taskCheckbox";

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.innerText = item.text;

    li.appendChild(checkbox);
    li.appendChild(text);
    items.appendChild(li);
    if (item.completed) {
      li.classList.add("completed");
      localStorage.setItem("all", JSON.stringify(all));
    }

    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      li.classList.toggle("completed", item.completed);

      localStorage.setItem("all", JSON.stringify(all));

      if (document.querySelector(".active.now")) {
        displayActiveTasks();
      } else if (document.querySelector(".completed-items.now")) {
        displayCompletedTasks();
      } else {
        displayAllTasks();
      }
    });
  });
}
displayAllTasks();

const allTasks = document.querySelector(".all");
allTasks.addEventListener("click", displayAllTasks);
// displaying active tasks
function displayActiveTasks() {
  const activeTasks = all.filter((task) => !task.completed);
  items.innerHTML = "";
  activeTasks.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("item");

    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";
    li.appendChild(span);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.classList.add("checkbox");
    checkbox.name = "taskCheckbox";

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.innerText = item.text;

    li.appendChild(checkbox);
    li.appendChild(text);
    items.appendChild(li);
    if (item.completed) {
      li.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      li.classList.toggle("completed", item.completed);

      localStorage.setItem("all", JSON.stringify(all));

      if (document.querySelector(".active.now")) {
        setTimeout(displayActiveTasks, 700);
      } else if (document.querySelector(".completed-items.now")) {
        displayCompletedTasks();
      } else {
        displayAllTasks();
      }
    });
  });
}

const activeItems = document.querySelector(".active");
activeItems.addEventListener("click", displayActiveTasks);

function displayCompletedTasks() {
  items.innerHTML = "";
  const completedTasks = all.filter((task) => task.completed);
  completedTasks.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("item");

    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";
    li.appendChild(span);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.classList.add("checkbox");
    checkbox.name = "taskCheckbox";

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.innerText = item.text;

    li.appendChild(checkbox);
    li.appendChild(text);
    items.appendChild(li);
    if (item.completed) {
      li.classList.add("completed");
      localStorage.setItem("all", JSON.stringify(savedAll));
    }

    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      li.classList.toggle("completed", item.completed);

      localStorage.setItem("all", JSON.stringify(all));

      if (document.querySelector(".active.now")) {
        displayActiveTasks();
      } else if (document.querySelector(".completed-items.now")) {
        displayCompletedTasks();
      } else {
        displayAllTasks();
      }
    });
  });
}

const completedItems = document.querySelector(".completed-items");
completedItems.addEventListener("click", displayCompletedTasks);

// adding an item to all array
function addItem() {
  let inputValue = input.value.trim();
  if (inputValue === "") return alert("Please enter a task");

  const item = {
    id: Date.now(),
    completed: false,
    text: inputValue,
  };

  input.value = "";

  all.push(item);
  localStorage.setItem("all", JSON.stringify(all));
  displayAllTasks();
}

const navItems = document.querySelectorAll("nav div");

// Function to set active tab in localStorage
function setActiveTab(tabName) {
  localStorage.setItem("activeTab", tabName);
}

// Event listener for clicking on nav items
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((i) => i.classList.remove("now"));
    this.classList.add("now");
    setActiveTab(this.dataset.tab);
  });
});

// ✅ Restore last active tab on page load
window.addEventListener("load", () => {
  const lastTab = localStorage.getItem("activeTab") || "all"; // Default to "all"
  const activeNavItem = document.querySelector(`[data-tab="${lastTab}"]`);

  if (activeNavItem) {
    navItems.forEach((i) => i.classList.remove("now"));
    activeNavItem.classList.add("now");
  }
});

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

items.addEventListener("click", function (e) {
  if (e.target.classList.contains("close")) {
    const li = e.target.parentElement;
    const taskText = li.querySelector(".task-text").innerText;

    const taskIndex = all.findIndex((task) => task.text === taskText);

    if (taskIndex !== -1) {
      all.splice(taskIndex, 1);
      localStorage.setItem("all", JSON.stringify(all));

      if (document.querySelector(".active.now")) {
        displayActiveTasks();
      } else if (document.querySelector(".completed-items.now")) {
        displayCompletedTasks();
      } else {
        displayAllTasks();
      }
    }
  }
});

// max char
// const input = document.getElementById("input");

input.addEventListener("input", function () {
  const maxLength = 30;
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
    alert("Maximum 30 characters allowed!");
  }
});
