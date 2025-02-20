const all = [
    {
        id: 1,
        completed: true,
        text: 'This is a task'
    },
    {
        id: 2,
        completed: false,
        text: 'This is another task'
    },
    {
        id: 3,
        completed: false,
        text: 'This is yet another task'
    },
    {
        id: 4,
        completed: true,
        text: 'This is yet another task 2'
    }
];

const items = document.querySelector(".items");

function displayAllTasks() {
    items.innerHTML = "";
    all.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('item');

        const span = document.createElement('span');
        span.classList.add('close');
        span.innerHTML = '&times;';
        li.appendChild(span);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.classList.add('checkbox');


        const text = document.createElement('span');
        text.classList.add('task-text');
        text.innerText = item.text;

        li.appendChild(checkbox);
        li.appendChild(text);
        items.appendChild(li);
        if (item.completed) {
            li.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            item.completed = checkbox.checked;
            li.classList.toggle('completed', item.completed);
        });
    });
}

const addBtn = document.querySelector(".addBtn");
const input = document.querySelector("#input");


displayAllTasks();

function displayActiveTasks() {
    const activeTasks = all.filter(task => !task.completed);
    items.innerHTML = "";
    activeTasks.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('item');

        const span = document.createElement('span');
        span.classList.add('close');
        span.innerHTML = '&times;';
        li.appendChild(span);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.classList.add('checkbox');


        const text = document.createElement('span');
        text.classList.add('task-text');
        text.innerText = item.text;

        li.appendChild(checkbox);
        li.appendChild(text);
        items.appendChild(li);
        if (item.completed) {
            li.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            item.completed = checkbox.checked;
            li.classList.toggle('completed', item.completed);
        });
    });
}

const activeItems = document.querySelector('.active');
activeItems.addEventListener('click', displayActiveTasks);
// const placeholderText = document.getElementById('placeholder-text');

// const checkBox = document.querySelector('.checkbox');
// const taskText = document.querySelector('.task-text');


// adding an item to all array
function addItem() {
    let inputValue = input.value.trim();
    if (inputValue === '') return alert('Please enter a task');

    const item = {
        id: Date.now(),
        completed: false,
        text: inputValue
    };

    input.value = '';

    all.push(item);

    displayAllTasks();
}

// toggling the now class in nav bar
const navItems = document.querySelectorAll('nav div');
navItems.forEach(item => {
    item.addEventListener('click', function () {
        navItems.forEach(i => i.classList.remove('now'));

        this.classList.add('now');
    });
});
// const li = document.createElement('li');
// li.classList.add('item');
// li.innerText = all[0].text;

// const span = document.createElement('span');
// span.classList.add('close');
// span.innerHTML = '&times;';
// li.appendChild(span);

// // <span class="checkbox">&#10004;</span>
// const checkbox = document.createElement('span');
// checkbox.classList.add('checkbox');
// checkbox.innerHTML = '&#10004;';
// li.appendChild(checkbox);

// items.appendChild(li);
// input.value = '';

// placeholderText.style.display = 'none';
// // placeholder()


addBtn.addEventListener('click', addItem);

input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addItem();
    };
});

items.addEventListener('click', function (e) {
    if (e.target.classList.contains('close')) {
        e.target.parentElement.remove();
        placeholder();
    }
})

// function placeholder() {
//     placeholderText.style.display = items.children.length === 0 ? 'block' : 'none';
// }

// placeholder();

// items.addEventListener('click', function (e) {
//     if (e.target.classList.contains('checkbox')) {
//         e.target.parentElement.classList.toggle('completed');
//     }
// });