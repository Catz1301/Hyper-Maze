class Button {
  constructor(x, y, width, height, text, id, textScale = 1.5, clickAction = null, clickActionParams = null, fillColor = 83, cornerRadius = (new CornerRadius(0, 0, 0, 0)), textColor = 255) {
    this.pos = createVector(x, y);
    this.size = createVector(width, height);
    this.text = text;
    this.fillColor = fillColor;
    this.cornerRadius = cornerRadius;
    this.textColor = textColor;
    this.hovering = false;
    this.clickAction = clickAction;
    this.clickActionParams = clickActionParams;
    this.id = id;
    this.textScale = textScale;
  }
  
  onClick(onClickFunction, onClickFunctionParams = null) {
    this.clickAction = onClickFunction;
    this.clickActionParams = onClickFunctionParams;
  }
  
  setPosition(x, y) {
    this.pos = createVector(x, y);
  }
  
  getPosition() {
    return this.pos;
  }
  
  getID() {
    return this.id;
  }
  
  intersects(mx, my) {
    return (((mx >= this.pos.x) && (mx <= this.pos.x + this.size.x)) && ((my >= this.pos.y) && (my <= this.pos.y + this.size.y)))
  }
  
  draw() {
    if (this.hovering) 
      this.fillColor = 51;
    else
      this.fillColor = 81;
    fill(this.fillColor);
    stroke(0);
    textAlign(CENTER, CENTER);
    rect(this.pos.x, this.pos.y,
         this.size.x, this.size.y, 
         this.cornerRadius.tl, this.cornerRadius.tr, 
         this.cornerRadius.br, this.cornerRadius.bl);
    fill(this.textColor);
    //stroke(255);
    textSize((this.size.x/this.text.length)*
                    this.textScale);
    text(this.text, this.pos.x + (this.size.x/2), 
                    this.pos.y + (this.size.y/2));
  }
  
  handleEvent(event) {
    if (event.type == "mousemove") {
      if (this.intersects(event.x, event.y))
        this.hovering = true;
      else
        this.hovering = false;
    }
    if (event.type == "click") {
      if (this.intersects(event.x, event.y))
        this.click();
    }
  }
  
  
  
  click() {
    let params = this.clickActionParams;
    if (this.clickActionParams != null)
      this.clickAction(...this.clickActionParams);
    else
      this.clickAction();
  }
}