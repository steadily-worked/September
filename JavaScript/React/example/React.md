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
```<div />```는 HTML div 태그를 나타내지만, ```<Welcome />```는 컴포넌트를 나타내며 범위 안에 ```Welcome```이 있어야 한다.


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


## State and Lifecycle

이전 Component & Props 섹션에서 다뤄본 째깍거리는 시계 에시를 다시 볼 것이다. 엘리멘트 렌더링에서는 UI를 업데이트하는 한 가지 방법만 배웠으며, 렌더링 된 출력값을 변경하기 위해 ```ReactDOM.render()```를 호출했다.

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
```

<a href='https://codepen.io/gaearon/pen/gwoJZk?editors=0010' target='_blank'>Codepen에서 실행</a>

이 섹션에서는 ```Clock``` 컴포넌트를 완전히 재사용하고 캡슐화하는 방법을 배울 것이다. 이 컴포넌트는 스스로 타이머를 설정할 것이고 매 초 스스로 업데이트할 것이다.

시계가 생긴 것에 따라 캡슐화하는 것으로 시작할 수 있다.

```js
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
  function tick() {
    ReactDOM.render(
      <Clock date={new Date()} />,
      document.getElementById('root')
    );
  }

setInterval(tick, 1000);
```
<a href='https://codepen.io/gaearon/pen/dpdoYR?editors=0010' target='_blank'>Codepen에서 실행</a>

그러나 여기에는 중요한 요건이 누락되어 있다. ```Clock```이 타이머를 설정하고 매초 UI를 업데이트하는 것이 ```Clock```의 구현 세부사항이 되어야 한다. 즉, ```Clock```에서 직접 설정과 업데이트가 이뤄져야 된다는 것이다.

이상적으로 한 번만 코드를 작성하고 ```Clock```이 스스로 업데이트 하도록 만들고자 한다.

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

이것을 구현하기 위해서 ```Clock``` 컴포넌트에 "state"를 추가해야 한다.
State는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.

### 함수에서 클래스로 변환하기

다섯 단계로 ```Clock```과 같은 함수 컴포넌트를 클래스로 변환할 수 있다.
1. ```React.Component```를 확장하는 동일한 이름의 ES6 class를 생성한다.
2. ```render()``` 라고 불리는 빈 메소드를 추가한다.
3. 함수의 내용을 ```render()``` 메소드 안으로 옮긴다.
4. ```render()``` 내용 안에 있는 ```props```를 ```this.props```로 변경한다.
5. 남아있는 빈 함수 선언을 삭제한다.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

<a href='https://codepen.io/gaearon/pen/zKRGpo?editors=0010' target='_blank'>Codepen에서 실행</a>

```Clock```은 이제 함수가 아닌 클래스로 정의된다.

 ```render``` 메소드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM 노드로 ```<Clock />```을 렌더링하는 경우 ```Clock``` 클래스의 단일 인스턴스만 사용된다. 이것은 로컬 state와 생명 주기 메소드와 같은 부가적인 기능을 사용할 수 있게 해준다.

 ### 클래스에 로컬 State 추가하기

 세 단계에 걸쳐서 ```date```를 props에서 state로 이동해 볼 것이다.

 1. ```render()``` 메소드 안에 있는 ```this.props.date```를 ```this.state.date```로 변경한다.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
 
 2. 초기 ```this.state```를 지정하는 class constructor를 추가한다.

```js
class Clock extends React.component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

여기서 어떻게 ```props```를 기본 constructor에 전달하는지 유의

```js
constructor(props) {
  super(props);
  this.state = {date: new Date()};
}
```

클래스 컴포넌트는 항상 ```props```로 기본 constructor를 호출해야 한다.

3. ```<Clock />``` 요소에서 ```date``` prop을 삭제한다.

```js
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

타이머 코드는 나중에 다시 컴포넌트로 추가함.

최종 결과는 다음과 같다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

<a href='https://codepen.io/gaearon/pen/KgQpJd?editors=0010' target='_blank'>Codepen에서 실행</a>

다음으로 ```Clock```이 스스로 타이머를 설정하고 매 초 스스로 업데이트 하도록 만들 것이다.

### 생명주기 메소드를 클래스에 추가하기

많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용중이던 리소스를 확보하는 것이 중요하다.

```Clock```이 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 한다. 이것은 React에서 "마운팅"이라고 한다.

또한, ```Clock```에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하려고 한다.

컴포넌트 클래스에서 특별한 메소드를 선언하여 컴포넌트가 마운트되거나 언마운트될 때 일부 코드를 작동할 수 있다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

이러한 메소드들은 "생명주기 메소드"라고 불린다.

```ComponentDidMount()``` 메소드는, 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행된다. 이 장소가 타이머를 설정하기에 좋은 장소이다.

```js
ComponentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
```

```this```(```this.timerID```)에서 어떻게 타이머 ID를 제대로 저장하는지 주의하자.

```this.props```가 React에 의해 스스로 설정되고 ```this.state```가 특수한 의미가 있지만, 타이머 ID와 같이 데이터 흐름 안에 포함되지 않는 어떤 항목을 보관할 필요가 있다면 자유롭게 클래스에 수동으로 부가적인 필드를 추가해도 된다.

```ComponentWillUnmount()``` 생명주기 메소드 안에 있는 타이머를 분해해 볼 것이다.

```js
ComponentWillUnmount() {
  clearInterval(this.timerID);
}
```

마지막으로 ```Clock``` 컴포넌트가 매 초 작동하도록 하는 ```tick()```이라는 메소드를 구현해 볼 것이다.

이것은 컴포넌트 로컬 state를 업데이트 하기 위해 ```this.setState()```를 사용한다.

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

<a href='https://codepen.io/gaearon/pen/amqdNA?editors=0010' target='_blank'>Codepen에서 실행</a>

이제 시계는 매 초 째깍거린다.

현재 어떤 상황이고, 메소드가 어떻게 호출되는지 순서대로 빠르게 요약해 볼 것이다.

1. ```<Clock />```가 ```ReactDOM.render()```로 전달되었을 때 React는 ```Clock``` 컴포넌트의 constructor를 호출한다. ```Clock```이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 ```this.state```를 초기화한다. 나중에 이 state를 업데이트할 것이다.

2. React는 ```Clock``` 컴포넌트의 ```render()``` 메소드를 호출한다. 이를 통해 React는 화면에 표시되어야 할 내용을 알게 된다. 그 다음 React는 ```Clock```의 렌더링 출력 값을 일치시키기 위해 DOM을 업데이트한다.

3. ```Clock``` 출력값이 DOM에 삽입되면, React는 ```componentDidMount()``` 생명주기 메소드를 호출한다. 그 안에서 ```Clock``` 컴포넌트는 매 초 컴포넌트의 ```tick()``` 메소드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청한다.

4. 매 초 브라우저가 ```tick()``` 메소드를 호출한다. 그 안에서 ```Clock``` 컴포넌트는 ```setState()```에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행한다. ```setState()``` 호출 덕분에 React는 state가 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 ```render()``` 메소드를 다시 호출한다. 이 때, ```render()``` 메소드 안의 ```this.state.date```가 달라지고 렌더링 출력값은 업데이트된 시각을 포함한다. React는 이에 따라 DOM을 업데이트한다.

5. ```Clock``` 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 타이머를 멈추기 위해 ```componentWillUnmount()``` 생명주기 메소드를 호출한다.


### State를 올바르게 사용하기

```setState()```에 대해 알아야 할 세 가지가 있다.

### 직접 State를 수정하면 안된다.

예를 들어, 이 코드는 컴포넌트를 다시 렌더링하지 않는다.

```js
// Wrong
this.state.comment = 'Hello';
```

대신에 ```setState()```를 사용한다.

```js
// Correct
this.setState({comment: 'Hello'});
```

```this.state```를 지정할 수 있는 유일한 공간은 바로 constructor이다.

### State 업데이트는 비동기적일 수도 있다.

React는 성능을 위해 여러 ```setState()``` 호출을 단일 업데이트로 한꺼번에 처리할 수 있다.

```this.props```와 ```this.state```가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 된다.

예를 들어, 다음 코드는 카운터 업데이트에 실패할 수 있다.

```js
// Wrong
this.setState({
  counter: this.state.counter +
  this.props.increment,
});
```

이를 수정하기 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 ```setState()```를 사용한다. 그 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들일 것이다.

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

위에서는 화살표 함수를 사용했지만, 일반적인 함수에서도 정상적으로 작동한다.

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State 업데이트는 병합된다.

```setState()```를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있다.

```js
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

별도의 ```setState()``` 호출로 이러한 변수를 독립적으로 업데이트할 수 있다.

```js
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

병합은 얕게 이루어지기 때문에 ```this.setState({comments})```는 ```this.state.posts```에 영향을 주진 않지만 ```this.state.comments```는 완전히 대체된다.

### 데이터는 아래로 흐른다.

부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없다.

이 때문에 state는 종종 로컬 또는 캡슐화라고 불린다. state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.

```js
<FormattedDate date = {this.state.date} />
```

```FormattedDate``` 컴포넌트는 ```date```를 자신의 props로 받을 것이고 이것이 ```Clock```의 state로부터 왔는지, ```Clock```의 props에서 왔는지, 수동으로 입력한 것인지 알지 못한다.

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

<a href='https://codepen.io/gaearon/pen/zKRqNB?editors=0010' target='_blank'>Codepen에서 실행</a>

일반적으로 이를 "하향식(top-down)" 또는 "단방향식" 데이터 흐름이라고 한다. 모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 "아래"에 있는 컴포넌트에만 영향을 미친다.

트리구조가 props들의 폭포라고 상상하면 각 컴포넌트의 state는 임의의 점에서 만나지만 동시에 아래로 흐르는 부가적인 수원(water source)이라고 할 수 있다.

모든 컴포넌트가 완전히 독립적이라는 것을 보여주기 위해 ```App``` 렌더링하는 세 개의 ```<Clock>```을 만들었다.

```js
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

<a href='https://codepen.io/gaearon/pen/vXdGmd?editors=0010' target='_blank'>Codepen에서 실행</a>

각 ```Clock```은 자신만의 타이머를 설정하고 독립적으로 업데이트를 한다.

React 앱에서 컴포넌트가 유상태 또는 무상대에 대한 것은 시간이 지남에 따라 변경될 수 있는 구현 세부 사항으로 간주한다. 유상태 컴포넌트 안에서 무상태 컴포넌트를 사용할 수 있으며, 그 반대 경우도 마찬가지로 사용할 수 있다.