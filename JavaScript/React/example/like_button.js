'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
// JSX ver.
// return (
//   <button onClick={() => this.setState({
//     liked: true })}>
//       Like
//     </button>
// );
// JSX는 필수사항이 아닌 선택사항이지만, 사람들은 UI 코드를 짤 때 JSX를 쓰는 것이 더 편리하다고
// 생각한다. React와 다른 라이브러리들에서도 마찬가지로.
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);