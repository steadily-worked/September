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

### 렌더링 된 엘리먼트 업데이트하기

React 엘리먼트는 불변객체이다. 엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없다. 엘리먼트는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여준다.

지금까지의 내용을 바탕으로 하면, UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 ReactDOM.render()로 전달하는 것이다.

예시로 똑딱거리는 시계를 보자.

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
위 함수는, ```setInterval()``` 콜백을 이용해 초마다 (1000ms -> 1초) ```ReactDOM.render()``` 를 호출한다.

### 변경된 부분만 업데이트하기

ReactDOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트한다.

개발자 도구의 Element를 보면 1초씩 흐를 때마다 h2가 업데이트 되는 것을 확인할 수 있다.

매초 전체 UI를 다시 그리도록 엘리먼트를 만들었지만, React DOM은 내용이 변경된 텍스트 노드만 업데이트한다.

특정 시점에 UI가 어떻게 보일 지 고민하는 이런 접근법은 시간의 변화에 따라 UI가 어떻게 변화할 지 고민하는 것보다 더 많은 수의 버그를 없앨 수 있다.

## Component와 Props

컴포넌트를 통해 UI를 재사용 가능한 여러 개별적인 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있다. 여기선 컴포넌트의 개념을 소개한다.

개념적으로 컴포넌트는 JavaScript 함수와 유사하다. <b>"props" 라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는 지를 기술하는 React 엘리먼트를 반환한다.</b>

### 함수 컴포넌트와 클래스 컴포넌트

컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수를 작성하는 것이다.

```js
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

이 함수는, 데이터를 가진 하나의 "props"(props는 속성을 나타내는 데이터이다) 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트이다. 이러한 컴포넌트는 JavaScript 함수이기 때문에 말 그대로 "함수 컴포넌트"라고 호칭한다.

또한 ES6 class를 사용하여 컴포넌트를 정의할 수 있다.

```js
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

React의 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일하다.
class의 추가 기능에 대해선 다음 장에서 설명한다. 함수 컴포넌트와 클래스 컴포넌트 둘 다 몇가지 추가 기능이 있고, 이에 대해선 다음 장에서 설명한다.

### 컴포넌트 렌더링

이전까지는 React 엘리먼트를 DOM 태그로 나타냈다.

```js
const element = <div />;
```

React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.

```js
const element = <Welcome name="Sara" />;
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면, JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 객체를 "props" 라고 한다.

다음은 페이지에 "Hello, Sara"를 렌더링하는 예시이다.

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

이 예시에서는 다음과 같은 일들이 일어난다.

1. ```<Welcome name="Sara" />``` 엘리먼트로 ```ReactDOM.render()```를 호출한다.
2. React는 ```{name: "Sara"}```를 컴포넌트로 하여 ```Welcome``` 컴포넌트를 호출한다.
3. ```Welcome``` 컴포넌트는 결과적으로 ```<h1>Hello, Sara</h1>``` 엘리먼트를 반환한다.
4. React DOM은 ```<h1>Hello, Sara</h1>``` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트한다.

<b>주의 : 컴포넌트의 이름은 항상 대문자로 시작한다.</b>

React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리한다.
예를 들어
```html
<div />
```는 HTML div 태그를 나타내지만,
```html
<Welcome />
```은 컴포넌트를 나타내며 범위 안에 ```Welcome```이 있어야 한다.


### 컴포넌트 합성

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있다. 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미한다. React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현된다.

예를 들어 ```Welcome```을 여러 번 렌더링하는 ```App``` 컴포넌트를 만들 수 있다.

```js
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App() {
    return (
        <div>
            <Welcome name='Sara' />
            <Welcome name='Cahal' />
            <Welcome name='Edite' />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

결과 -> ```Hello, Sara```, ```Hello, Cahal```, ```Hello, Edite```

일반적으로 새 React 앱은 최상위에 단일 ```App``` 컴포넌트를 갖고 있다. 하지만, 기존 앱에 React를 통합하는 경우에는 ```Button```과 같은 작은 컴포넌트부터 시작해서 뷰 계층의 상단으로 올라가면서 점진적으로 작업해야 할 수 있다.

### 컴포넌트 추출

컴포넌트를 여러 개의 작은 컴포넌트로 나누는 것을 두려워하지 말자.

다음 ```Comment``` 컴포넌트를 살펴보자.

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
이 컴포넌트는 ```author```(객체), ```text```(문자열) 및 ```date```(날짜)를 props로 받은 후 소셜 미디어 웹 사이트의 코멘트를 나타낸다.

이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기도 힘들다. 이 컴포넌트에서 몇 가지 컴포넌트를 추출할 것이다.

* ```Avatar``` 추출
```js
function Avatar(props) {
  return (
    <img className="Avatar"
    src={props.user.avatarUrl}
    alt={props.user.name}
    />
  );
}
```

```Avatar```는 자신이 ```Comment``` 내에서 렌더링 된다는 것을 알 필요가 없다. 따라서 props의 이름을 ```author```에서 더욱 일반화된 ```user```로 변경했다.

props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장한다.

이제 ```Comment```가 살짝 단순해졌다.

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

다음으로, ```Avatar``` 옆에 사용자의 이름을 렌더링하는 ```UserInfo``` 컴포넌트를 추출할 것이다.

```js
function UserInfo(props) {
  return (
    <div className="UserInfo">
    <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

```Comment```가 더욱 단순해졌다.

```js
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

처음에는 컴포넌트를 추출하는 작업이 지루해 보일 수 있다. 하지만 재사용 가능한 컴포넌트를 만들어 놓는 것은 더 큰 앱에서 작업할 때 두각을 나타낸다. UI 일부가 여러 번 사용되거나 (```Button```, ```Panel```, ```Avatar```), UI 일부가 자체적으로 복잡한(```App```, ```FeedStory```, ```Comment```) 경우에는 별도의 컴포넌트로 만드는 게 좋다.


### props는 읽기 전용이다.

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 된다. 다음 ```sum``` 함수를 보자.

```js
function sum(a, b) {
  return a + b;
}
```

이런 함수들은 ```순수 함수```라고 호칭한다. 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문.

반면에 다음 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아니다.

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React는 매우 유연하지만 한 가지 엄격한 규칙이 있다.

<b>모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.</b>

물론 애플리케이션의 UI는 동적이며 시간에 따라 변한다. 다음 장에서는 "state"라는 새로운 개념을 소개한다. React 컴포넌트는 state를 통해 위 규칙을 위반하지 않고 사용자 액션, 네트워크 응답 및 다른 요소에 대한 응답으로 시간에 따라 자신의 출력값을 변경할 수 있다.