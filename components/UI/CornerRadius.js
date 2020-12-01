class CornerRadius {
  constructor(topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0) {
    this.tl = topLeft;
    this.tr = topRight;
    this.bl = bottomLeft;
    this.br = bottomRight;
  }
  
  get topLeft() {
    return this.tl;
  }
  
  get topRight() {
    return this.tr;
  }
  
  get bottomLeft() {
    return this.bl;
  }
  
  get bottomRight() {
    return this.br;
  }
  
  set topLeft(newTopLeft) {
    this.tl = newTopLeft;
  }
  
  set topRight(newTopRight) {
    this.tr = newTopRight;
  }
  
  set bottomLeft(newBottomLeft) {
    this.bl = newBottomLeft;
  }
  
  set bottomRight(newBottomRight) {
    this.br = newBottomRight;
  }
}