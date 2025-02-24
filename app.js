const all = JSON.parse(localStorage.getItem("all"));

localStorage.setItem("all", JSON.stringify(all));

const items = document.querySelector(".items");
const addBtn = document.querySelector(".addBtn");
const input = document.querySelector("#input");

// tab keeping

const allTasksTab = document.querySelector(".all");
const activeItemsTab = document.querySelector(".active");
const completedItemsTab = document.querySelector(".completed-items");
const navItems = document.querySelectorAll("nav div");

function setActiveTab(tabName) {
  localStorage.setItem("activeTab", tabName);

  navItems.forEach((item) => {
    if (item.classList.contains(tabName)) {
      item.classList.add("now");
    } else {
      item.classList.remove("now");
    }
  });
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
  setActiveTab("completed-items");
  displayCompletedTasks();
});

// Restore last active tab on page load
window.addEventListener("load", () => {
  const lastTab = localStorage.getItem("activeTab") || "all";

  if (lastTab === "active") {
    displayActiveTasks();
  } else if (lastTab === "completed-items") {
    displayCompletedTasks();
  } else {
    displayAllTasks();
  }

  if (lastTab === "all") {
    allTasksTab.classList.add("now");
  } else if (lastTab === "active") {
    activeItemsTab.classList.add("now");
  } else if (lastTab === "completed-items") {
    completedItemsTab.classList.add("now");
  }
});

// displaying all tasks
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
  const savedAll = JSON.parse(localStorage.getItem("all"));
  const completedTasks = savedAll.filter((task) => task.completed);
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

//  opening menu
const menuIcon = document.querySelector(".menu-icon");

menuIcon.addEventListener("click", function () {
  console.log("clicked");
});

// light dark mode
const lightIcon = document.querySelector(".light-icon");

const bodyElement = document.body;
const iconElement = lightIcon.querySelector("i");
lightIcon.addEventListener("click", () => {
  if (bodyElement.getAttribute("data-theme") === "dark") {
    bodyElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    iconElement.classList.remove("fa-moon");
    iconElement.classList.add("fa-sun");
  } else {
    bodyElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    iconElement.classList.remove("fa-sun");
    iconElement.classList.add("fa-moon");
  }
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  bodyElement.setAttribute("data-theme", "dark");
  iconElement.classList.remove("fa-sun");
  iconElement.classList.add("fa-moon");
}
