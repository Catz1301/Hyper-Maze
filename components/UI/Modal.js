class Modal {
  constructor(x, y, width, height, layoutFileName = null, cornerRadii = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cornerRadiuses = cornerRadii;
    this.UIComponents = this.parseLayoutFile(layoutFileName);
    this.active = true;
  }

  getPosition() {
    return createVector(this.x, this.y);
  }
  isActive() {
    return this.active;
  }
  parseLayoutFile(internalFileName = null) {
    // TODO: Write the function! :p
    if (internalFileName == null)
      return XMLUI.parseUILayoutFile();
    else
      return XMLUI.parseUILayoutObj(internalFileName);
    //console.log(this.UIComponents)
  }

  getComponents() {
    return this.UIComponents;
  }
  
  handleEvent(event) {
    if (event.type == "keydown") {
      if (event.which == 27) {
        this.active = false;
        //console.log("meowmeow")
        return "closed";
      }
    }
    if (event.type == "click") {
      if (!((mouseX > this.x && mouseX < this.x + this.width) && (mouseY > this.y && mouseY < this.y + this.height))) {
        this.active = false;
        return;
      }
    }
    //if (this.UIComponents != null) {
    for (let i = 0; i < this.UIComponents.length; i++) {
      this.UIComponents[i].handleEvent(event);
    }
    //}
    //console.log(this.UIComponents);
    return "";
  }

  setPosition(x, y) {
    let oldX = this.x, oldY = this.y;
    for (let i = 0; i < this.UIComponents.length; i++) {
      this.UIComponents[i].setPosition(
        (this.UIComponents[i].getPosition().x - oldX) + x,
        (this.UIComponents[i].getPosition().y - oldY) + y
      );
    }
    this.x = x;
    this.y = y;
  }
  
  getPosition() {
    return createVector(this.x, this.y);
  }
  
  hide() {
    this.active = false;
  }

  show() {
    this.active = true;
  }

  draw() {
    if (this.cornerRadiuses == null) {
      if (GlobalConstants.Settings.darkMode)
        fill(
          GlobalConstants.Colors.background_Dark + 20, 200);
      else
        fill(
          GlobalConstants.Colors.background_Light - 20, 200);
      strokeWeight(3);
      rect(this.x, this.y, this.width, this.height)
      strokeWeight(0.1)
      if (this.UIComponents) {
        for (let i = 0; i < this.UIComponents.length; i++) {
          this.UIComponents[i].draw();
        }
      }
    }
  }

}