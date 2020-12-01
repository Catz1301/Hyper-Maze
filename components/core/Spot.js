class Spot {
  constructor(x, y, width, height, color, type = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.color = color;
    this.id = this.generateId();
  }

  generateId() {
    var x1 = this.x;
    var y1 = this.y;
    var x2 = this.width;
    var y2 = this.height;
    var tmpStr = "";
    tmpStr += "" + x1 + y1 + x2 + y2;
    //tmpStr += y1;
    //tmpStr += x2;
    //tmpStr += y2;
    var IDp1 = int(tmpStr);
    var tmpStr1 = "";
    tmpStr1 += "" + x1 + x2
    var IDp2 = int(tmpStr1);
    var tmpStr2 = "";
    tmpStr2 += "" + y1 + y2;
    var IDp3 = int(tmpStr2);
    var id = floor(IDp1 / IDp2 % (IDp3 / this.color)); //console.log(this.id);
    return id
  }

  getPosition() {
    return createVector(this.x, this.y);
  }

  getSize() {
    return createVector(this.width, this.height);
  }

  getID() {
    return this.id;
  }

  setObstacle() {
    this.type = 'obstacle';
  }

  setStart() {
    this.type = 'start'
  }

  setEnd() {
    this.type = 'end';
  }

  getType() {
    return this.type;
  }

  draw() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}