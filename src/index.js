const text = document.getElementById('text');
const addNumberButton = document.getElementById('add-number-btn');
const saveNumberButton = document.getElementById('save-todo-btn');
const listBox = document.getElementById('listBox');
const saveInd = document.getElementById('saveIndex');

let todoArray = [];

window.onload = function () {
    displayTodo();
};

text.addEventListener('keydown', function (event) {
    const admiteDecimal = /^[0-9]\d*(\.\d+)?$/;
    const isValidNumber = !event.key.match(admiteDecimal);
    const currentValue = event.target.value;

    if (event.key === 'Enter') addNumber();
    else if (isValidNumber && event.key != 'Backspace' && event.key != '.') event.preventDefault();
    else if ((currentValue.match(new RegExp(/\./, 'g')) || []).length == 1) {
        if (event.key == '.') event.preventDefault();
    }
});

addNumberButton.addEventListener('click', (e) => {
    e.preventDefault();
    addNumber();
});

saveNumberButton.addEventListener('click', () => saveNumber());

const getCurrentValues = () => {
    let todo = localStorage.getItem('todo');
    if (todo === null) todoArray = [];
    else todoArray = JSON.parse(todo);

    return todoArray;
};

const saveNumber = () => {
    let id = saveInd.value;
    todoArray = getCurrentValues();
    todoArray[id] = text.value;

    addNumberButton.style.display = 'block';
    saveNumberButton.style.display = 'none';
    text.value = '';
    localStorage.setItem('todo', JSON.stringify(todoArray));
    displayTodo();
};

const addNumber = () => {
    if (text.value != '') {
        todoArray = getCurrentValues();
        todoArray.push(text.value);
        text.value = '';
        localStorage.setItem('todo', JSON.stringify(todoArray));
        displayTodo();
    }
};

const refreshResults = () => {
    if (todoArray.length == 0) {
        error_absoluto.innerHTML = '0';
        error_relativo.innerHTML = '0';
    } else {
        let suma = todoArray.reduce((a, b) => Number(a) + Number(b));
        let promedio = (suma / todoArray.length).toFixed(2);
        let cantidad = todoArray.length;
        let error = 0;
        todoArray.forEach((x) => {
            error += promedio > Number(x) ? promedio - Number(x) : Number(x) - promedio;
        });

        let absoluto = error / cantidad;
        let relativo = (absoluto / promedio) * 100;

        error_absoluto.innerHTML = absoluto;
        error_relativo.innerHTML = relativo;
    }
};

const displayTodo = () => {
    let htmlCode = '';
    todoArray = getCurrentValues();
    todoArray.forEach((list, ind) => {
        htmlCode += `<div class='flex mb-1 items-center'><p class='w-full text-grey-darkest'>${list}</p>
                        <button
                            onclick="edit(${ind})"
                            type="button"
                            class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                            Editar
                        </button>&nbsp;
                        <button
                            onclick="deleteTodo(${ind})"
                            type="button"
                            class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                            Quitar
                        </button>
                    </div>`;
    });
    listBox.innerHTML = htmlCode;
    refreshResults();
};

const deleteTodo = (ind) => {
    todoArray = getCurrentValues();
    todoArray.splice(ind, 1);
    localStorage.setItem('todo', JSON.stringify(todoArray));
    displayTodo();
};

const edit = (ind) => {
    saveInd.value = ind;
    todoArray = getCurrentValues();
    text.value = todoArray[ind];
    addNumberButton.style.display = 'none';
    saveNumberButton.style.display = 'block';
};
