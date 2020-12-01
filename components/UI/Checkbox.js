class Checkbox {
  constructor(x, y, value, label, id) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.isChecked = value;
    this.changedEvent = null;
    this.label = label;
    this.textFill;
    this.id = id;
  }
  
  changed(changedEventMethod) {
    this.changedEvent = changedEventMethod;
  }
  
  handleEvent(event) {
    if (event.type == "click") {
      this.mouseClickEvent();
    }
  }
  
  mouseClickEvent() {
    if ((mouseX >= this.x && mouseX <= this.x + this.size + 10 + ((this.label.length*this.size)*(5/this.label.length))+(this.label.length*3)) && mouseY >= this.y && mouseY <= this.y + this.size - 1) {
      this.isChecked = !this.isChecked;
      if (this.changedEvent != null)
        this.changedEvent();
    }
  }
  
  checked() {
    return this.isChecked;
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
    if (this.isChecked) {
      fill(255, 100, 100);
    } else {
      noFill();
    }
    if (GlobalConstants.Settings.darkMode)
      stroke(GlobalConstants.Colors.wall_Light);
    else
      stroke(GlobalConstants.Colors.wall_Dark);
    rect(this.x, this.y, this.size, this.size);
    if (GlobalConstants.Settings.darkMode) {
      this.textFill = GlobalConstants.Colors.text_Dark;
    } else {
      this.textFill = GlobalConstants.Colors.text_Light;
    }
    //rect(this.x + this.size + 10, this.y + 1, ((this.label.length*this.size)*(5/this.label.length))+(this.label.length*3), this.size-1)
    //rect(this.x + this.size + 10, this.y + 1, (this.label.length*this.size), this.size-1)
    fill(this.textFill);
    textSize(this.size - 1)
    textAlign(LEFT, BASELINE)
    text(this.label, this.x+this.size+10, this.y + 1, ((this.label.length*this.size)*(5/this.label.length))+(this.label.length*3), this.y + this.size - 1);
  }
}