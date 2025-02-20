const all = [
  {
    id: 1,
    completed: true,
    text: "Get up earlier",
  },
  {
    id: 2,
    completed: false,
    text: "Do mornign exercise",
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

const items = document.querySelector(".items");
const addBtn = document.querySelector(".addBtn");
const input = document.querySelector("#input");

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
    });
  });
}
displayAllTasks();

const allTasks = document.querySelector(".all");
allTasks.addEventListener("click", displayAllTasks);
// displaying active tasks done ✅
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
    });
  });
}

const completedItems = document.querySelector(".completed-items");
completedItems.addEventListener("click", displayCompletedTasks);

// adding an item to all array done ✅
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

  displayAllTasks();
  displayActiveTasks();
}

// toggling the now class in nav bar
const navItems = document.querySelectorAll("nav div");
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((i) => i.classList.remove("now"));

    this.classList.add("now");
  });
});

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

items.addEventListener("click", function (e) {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
    placeholder();
  }
});
