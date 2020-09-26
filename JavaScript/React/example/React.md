## 엘리멘트 렌더링

엘리먼트는 React 앱의 가장 작은 단위이다.

엘리먼트는 화면에 표시할 내용을 기술한다.

```js
const element = <h1>Hello, world</h1>;
```

브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plain object) 쉽게 생성할 수 있다. React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트한다.

### DOM에 엘리먼트 렌더링하기

HTML 파일 어딘가에 ```<div>```가 있다고 가정해보자.
```html
<div id='root'></div>
```
이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이것들 "루트(root)" DOM 노드라고 부른다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있다. React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드가 있을 수 있다.

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 ```ReactDOM.render()``` 로 전달하면 된다.

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element,
document.getElementById('root'));
```
위 코드를 실행하면 화면에 "Hello, world"가 보일 것이다.