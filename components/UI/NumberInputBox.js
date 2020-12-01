class NumberInputBox {
  constructor(x, y, width, height, id, value = "0", maxVal = 100) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.value = value;
    this.isFocused = false;
    this.original = true;
    this.maxValue = maxVal;
    this.id = id;
  }
  
  handleEvent(event) {
    if (event.type == "click") {
      this.mouseClickedEvent();
    } else if (event.type == "keydown") {
      this.keyPressedEvent(event);
    }
  }
  
  keyPressedEvent(event) {
    console.dir(this);
    if (this.isFocused) {
      //console.log("MEOW")
      if (keyCode == BACKSPACE) {
        this.value = this.value.substring(0, this.value.length -1);
      } else if (Number.isInteger(Number.parseInt(key))) {
        if (this.original) {
          this.value = key;
          this.original = false;
        } else {
          let addingVal = Number.parseInt(key);
          let currentVal = int((this.value)*10);
          // console.log({
          //   addingValue: addingVal,
          //   currentValue: currentVal,
          //   totalValue: this.getValue()
          // });
          if (currentVal + addingVal <= this.maxValue)
            this.value += key;
        }
      }
    }
  }
  
  mouseClickedEvent() {
    this.isFocused = (((mouseX >= this.x) && (mouseX <= this.x + this.width)) && ((mouseY >= this.y) && (mouseY <= this.y + this.height)));
  }
  
  getValue() {
    return Number.parseInt(this.value);
  }
  
  getID() {
    return this.id;
  }
  
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  
  getPosition() {
    return createVector(this.x, this.y);
  }
  
  draw() {
    if (this.isFocused == true) {
      strokeWeight(2);
    } else {
      strokeWeight(1);
    }
    
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    textSize(/*(this.width/this.value.length)*/ 15);
    textAlign(LEFT, CENTER);
    strokeWeight(0);
    fill(0);
    text(this.value, this.x+5, this.y, this.width, this.height);
  }
}






















// whitespace