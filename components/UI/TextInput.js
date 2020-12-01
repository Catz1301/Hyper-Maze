class TextInput {
  constructor(x, y, width, height, placeholder = "") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.inputEl = createInput(placeholder, 'text');
    this.inputEl.position(this.x, this.y);
    this.inputEl.size(this.width, this.height)
    let padding = 10;
    let fontSize = this.height-padding;
    this.inputEl.style(`font-size: ${fontSize}px;`);
  }
  
  setStyle(strStyle) {
    this.inputEl.style(strStyle);
  }
  
  show() {
    this.inputEl.show();
  }
  
  hide() {
    this.inputEl.hide();
  }
  
  getElement() {
    return this.inputEl;
  }
  
  getText() {
    return this.inputEl.value();
  }
  
  setText(str) {
    this.inputEl.value(str);
  }
  
  remove() {
    this.inputEl.remove();
    console.log(this.inputEl);
  }
  
}