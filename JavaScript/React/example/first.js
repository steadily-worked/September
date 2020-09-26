function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Sangmin',
    lastName: 'Park'
};


// const element = <div tabIndex='0'></div>; // 속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있다.
// const element = <img src={user.avatarUrl}></img>; // 중괄호를 사용해서 어트리뷰트에 JavaScript 표현식을 삽입할 수도 있다.
// 위에서처럼 어트리뷰트에 JavaScript 표현식을 삽입할 때 중괄호{} 주변에 따옴표를 입력하면 안 됨.
// 따옴표(문자열 값에 사용) 또는 중괄호(표현식에 사용) 중 하나만 사용하고, 동일한 어트리뷰트에 두 가지를 동시에 사용하면 안 된다.

// JSX 태그는 자식을 포함할 수 있다.
// const element = (
//     <div>
//         <h1>Hello!</h1>
//         <h2>Good to see you here.</h2>
//     </div>
// )

// 하기하는 두 가지 예시는 동일하다.
// const element = (
//     <h1 className='greeting'>
//         Hello, world!
//     </h1>
// );
// const element = React.createElement(
//     'h1',
//     {className: 'greeting'},
//     'Hello, world!'
// );
// React.createElement()는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행하며,
// 기본적으로 다음과 같은 객체를 생성한다.

// warning: 다음 구조는 단순화되어있음.
// const element = (
//     type: 'h1',
//     props: {
//         className: 'greeting',
//         children: 'Hello, world!'
//     }
// );
// 이러한 객체를 React 엘리먼트 라고 하며, 이를 화면에 표시하려는 항목에 대한 설명이라고 생각할 수 있다.
// React는 이러한 객체를 읽은 후 DOM을 구성하고 최신으로 유지하는 데 이러한 객체를 사용한다.



// const element = (
    // <h1>
    //     Hello, {foramatName(user)}!
    // </h1>
// );
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, stranger.</h1>;
}

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);