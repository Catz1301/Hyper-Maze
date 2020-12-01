/** Class creating a label with a background, possible rounded colors, and possible transparency */
class Label {
  constructor(x, y, width, height, text, fillColor = 81, cornerRadius = (new CornerRadius(0, 0, 0, 0)), textColor = 255, isOpaque = false) {
    this.pos = createVector(x, y);
    this.size = createVector(width, height);
    this.text = text;
    this.fillColor = fillColor;
    this.cornerRadius = cornerRadius;
    this.textColor = textColor;
    this.isOpaque = isOpaque;
  }
  
  handleEvent(event) {
    return;
  }
  
  setText(newText) {
    this.text = newText;
  }
  
  setPosition(x, y) {
    this.pos = createVector(x, y);
  }
  
  getPosition() {
    return this.pos;
  }
  
  draw() {
    if (!this.isOpaque)
      fill(this.fillColor);
    else
      fill(this.fillColor, 0);
    stroke(0);
    textAlign(CENTER, CENTER);
    rect(this.pos.x, this.pos.y,
         this.size.x, this.size.y, 
         this.cornerRadius.tl, this.cornerRadius.tr, 
         this.cornerRadius.br, this.cornerRadius.bl);
    fill(this.textColor);
    //stroke(255);
        textSize((this.size.x/this.text.length));

    text(this.text, this.pos.x + (this.size.x/2), 
                    this.pos.y + (this.size.y/2));
  }
}