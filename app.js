const addBtn = document.querySelector(".addBtn");
const input = document.querySelector("#input");
const items = document.querySelector(".items");
const placeholderText = document.getElementById('placeholder-text');


addBtn.addEventListener('click', function () {
    let inputValue = input.value.trim();
    if (inputValue === '') return alert('Iltimos, topshiriqni kiriting!');

    const li = document.createElement('li');
    li.classList.add('item');
    li.innerText = inputValue;

    const span = document.createElement('span');
    span.classList.add('close');
    span.innerHTML = '&times;';
    li.appendChild(span);

    items.appendChild(li);
    input.value = '';

    // placeholderText.style.display = 'none';
    placeholder()

})

items.addEventListener('click', function (e) {
    if (e.target.classList.contains('close')) {
        e.target.parentElement.remove();
        placeholder();
    }
})

function placeholder() {
    placeholderText.style.display = items.children.length === 0 ? 'block' : 'none';
}

placeholder();