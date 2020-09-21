const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
        // 모든 toDos가 li의 id와 같지 않을 때
        // filter는 array의 모든 아이템을 통해 함수를 실행하고
        // true인 아이템들만 갖고 새로운 array를 만든다.
        // li의 id가 string 형식이기때문에 parseInt를 통해 정수형으로 바꿔줌
    });
    toDos = cleanToDos;
    saveToDos();
}




function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // JSON.stringfy는 JS object를 string으로 바꿔준다.
}

function paintToDo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement("button");
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos(toDoObj);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (toDos !== null) {
        // JSON의 기능 : 데이터를 전달할 때 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능
        // 그래서, string 을 object로도, object를 string으로도 바꿀 수 있다.
        const parsedToDos = JSON.parse(loadedToDos);
        // toDos를 가져온 뒤, 이 라인에서는 parse, 즉 가져온 것을 JS object로 변환해줄 것이고,
        parsedToDos.forEach(function(toDo) {
        // 가져온 각각에 대해서 paintToDo라는 function 실행(위에서 정의해준함수임)
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}
init();