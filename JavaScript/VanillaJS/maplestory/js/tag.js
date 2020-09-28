// /* JavaScript markdown editor SimpleMDE */
// var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });


/* add Tag by click or press enter, comma, space */
var elements = document.getElementById('element');
var taskSubmit = document.getElementById('btn_add_task');
var taskBox = document.getElementById('text_task');
var taskList = document.getElementById('list_tasks');

var enterKey = 13;
var tabKey = 9;
var commaKey = 188;
var spaceKey = 32;

var addPrevents = ['', ',', ' '];
var addTriggers = [enterKey, tabKey, commaKey, spaceKey];
var tags = [];

document.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode;
    var task = taskBox.value.trim();
    var newLI = document.createElement('li');
    var removeBtn = document.createElement('button');
    var element = newLI.appendChild(document.createTextNode(task));
    if (!addTriggers.includes(keyCode)) {
        return;
    }
    if ((taskBox.value != "") && (taskBox.value.charAt(taskBox.length-1) != ",") && (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32))  {
        e.preventDefault();
        taskList.appendChild(newLI);
        taskList.appendChild(removeBtn);
        taskBox.value = '';
        removeBtn.addEventListener('click', function() {
            removeBtn.parentNode.removeChild(removeBtn);
            newLI.parentNode.removeChild(newLI);
        });
    } 
}, false);
// endswith를 적용한 결과, ,은 무한으로 생기고 마지막에 ,이 아닌 다른 게 있을 경우에 추가된다.
// 내가 하고싶었던 건 아예 콤마를 값에 추가시키지 못하게 하는 것.
document.addEventListener('click', function(e) {
    var task = taskBox.value.trim();
    var newLI = document.createElement('li');
    var removeBtn = document.createElement('button');
    var element = newLI.appendChild(document.createTextNode(task));
    if ((taskBox.value != "") && (taskBox.value.charAt(taskBox.length-1) != ",") && (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32))  {
        e.preventDefault();
        taskList.appendChild(newLI);
        taskList.appendChild(removeBtn);
        taskBox.value = '';
        removeBtn.addEventListener('click', function() {
            removeBtn.parentNode.removeChild(removeBtn);
            newLI.parentNode.removeChild(newLI);
        });
    }
}, false);

// text_value.endswith(",") : e.preventDefault(); 뭐 이런식으로 ..