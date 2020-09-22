
  const ENTER_KEYCODE = 13;
  const TAB_KEYCODE = 9;
  const COMMA_KEYCODE = 188;
  const SPACE_KEYCODE = 32;

  const addPrevents = ['', ',', ' '];
  const addTriggers = [TAB_KEYCODE, ENTER_KEYCODE, SPACE_KEYCODE, COMMA_KEYCODE];
  const tags = [];

  const inputDom = document.getElementById('tag-input');

  inputDom.onkeydown = onkeydown;

  const listNode = document.getElementById('tags-wrap');

  function onkeydown(e) {

    const keyCode = e.keyCode;

    if (!addTriggers.includes(keyCode)) {
      return;
    }

    const value = inputDom.value;
    inputDom.value = '';
    e.preventDefault();

    if (!canAdd(value, tags)) {
      return;
    }

    addTag(value);
  }

  function addTag(value) {
    tags.push(value);

    const onDelete = function () {
      onRemove(tags.indexOf(value));
      inputDom.focus();
    };

    const newTagNode = createTag(value, onDelete);
    listNode.insertBefore(newTagNode, inputDom);
  }

  function onRemove(index) {
    const childNode = document.getElementsByClassName('tag-wrap')[index];
    childNode && listNode.removeChild(childNode);
    tags.splice(index, 1);
  }

  function createTag(tagName, onDelete) {
    const tag = document.createElement('div');
    tag.className = 'tag-wrap';
    tag.appendChild(createTagText(tagName));
    tag.appendChild(createButton(onDelete));
    return tag;

    function createTagText(tagName) {
      const tagText = document.createElement('span');
      tagText.className = 'tag-text';
      tagText.innerText = tagName;
      return tagText;
    }

    function createButton(onDelete) {
      const button = document.createElement('button');
      button.className = 'x-button';
      button.type = 'button';
      button.onclick = onDelete;

      const buttonText = createButtonText();
      button.appendChild(buttonText);
      return button;
    }

    function createButtonText() {
      const buttonText = document.createElement('span');
      buttonText.className = 'x-text';
      buttonText.innerText = 'X';
      return buttonText;
    }
  }

  function canAdd(value, tags) {
    return !tags.includes(value) && !addPrevents.includes(value);
  }
