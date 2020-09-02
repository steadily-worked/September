// console.log(document); 하면, document를 대표하는 HTML을 제공함.

// const title = document.getElementById('title'); 이건 id고..
const title = document.querySelector('#title'); // 이 선택자는 CSS와 비슷. # -> id, . -> class

const CLICKED_CLASS = 'clicked';

// CLICKED_CLASS가 classList에 포함되어 있다면 없애고, 없으면 포함시키고의 반복 함수
// CLICKED_CLASS는, clicked class를 추가시키는 변수이고 clicked 되면 색깔이 바뀌게 된다.
// function handleClick() {
//   const hasClass = title.classList.contains(CLICKED_CLASS);
//   if (hasClass) {
//     title.classList.remove(CLICKED_CLASS);
//   } else {
//     title.classList.add(CLICKED_CLASS);
//   }
// }
// 위의 내용은
// function handleClick() {
//   title.classList.toggle(CLICKED_CLASS);
// } 로 정리할 수 있다. toggle을 설명한 것.

// const BASE_COLOR = "rgb(52, 73, 94)";
// const OTHER_COLOR = "#7f8c8d";
// title.innerHTML = 'Hi! From JS';
// title.style.color = 'red';
// document.title = "I own you now"
// console.dir(title);

// 모든 함수는 DOM 형태로 변경가능하다.
// 자바스크립트로 HTML을 변경할 수 있다. document.title이나 title.style.color 등으로..!
// console.dir(document)를 통해 모든 객체를 확인할 수 있다.

// function handleClick() {
//   const currentColor = title.style.color;
//   if (currentColor === BASE_COLOR) {
//     title.style.color = OTHER_COLOR;
//   } else {
//     title.style.color = BASE_COLOR;
//   }
// }

function init() {
  title.addEventListener("click", handleClick);
}
init();

// 와이파이가 꺼졌을 때 haha, 와이파이가 다시 연결됐을 때 welcom back 출력하는함수
// function handleOffLine() {
//   console.log('haha');
// }
// function handleOnline() {
//   console.log('welcome back!');
// }

// window.addEventListener('offline', handleOffLine);
// window.addEventListener('online', handleOnline);

// const age = prompt('how old are you?');
// if (age >= 18 && age <= 21) {
//   console.log('you can drink but you should not');
// } else if (age > 21) {
//   console.log("go ahead");
// } else {
//   console.log('too young');
// }



// true && true = true;
// false && true = false;
// true && false = false;
// false && false = false;

// true || true = true;
// false || true = true;
// true || false = true;
// false || false = false;