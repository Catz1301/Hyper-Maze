class DevelopmentTools {
  static counter() {
    counter.extraDbgCount;
  }
  static setUp() {
    this.clickPosition.pos1 = createVector(0, 0);
    this.clickPosition.pos2 = createVector(0, 0);
    this.clickPosition.pos3 = createVector(0, 0);
    this.clickPosition.pos4 = createVector(0, 0);
    this.counter.extraDbgCount = 0;
    DevelopmentTools.setUp.init = true;
  }
  static reset() {
    this.counter.extraDbgCount = 0;
  }
  static grid(gridSize) {
    strokeWeight(2)
    stroke(40)
    
    if (gridSize < width && gridSize < height) {
      for (var i = gridSize; i < width; i+= gridSize) {
        line(i, 0, i, height);
      }

      for (var j = gridSize; j < height; j+= gridSize) {
        line(0, j, width, j);
      }
    }
    strokeWeight(1);
  }
  
  static debugInfo(playerObj) {
    textSize(32);
    fill(0, 0, 255);
    text("x: " + playerObj.pos.x, 10, 30);
    text("y: " + playerObj.pos.y, 10, 60);
    text("cx: " + pmouseX, 10, 90);
    text("cy: " + pmouseY, 10, 120);
    if (DevelopmentTools.clickPosition.pos1.x == DevelopmentTools.clickPosition.pos2.x && DevelopmentTools.clickPosition.pos1.y == DevelopmentTools.clickPosition.pos2.y) {
      if (DevelopmentTools.clickPosition.pos1.x != 0)
        fill(255, 0, 0);
    }
    if (DevelopmentTools.clickPosition.pos1.x != DevelopmentTools.clickPosition.pos2.x && DevelopmentTools.clickPosition.pos1.y != DevelopmentTools.clickPosition.pos2.y) {
      fill(25, 200, 50);
    }
    text("pos1: x:" + DevelopmentTools.clickPosition.pos1.x + " y:" + DevelopmentTools.clickPosition.pos1.y, 10, 150);
  text("pos2: x:" + DevelopmentTools.clickPosition.pos2.x + " y:" + DevelopmentTools.clickPosition.pos2.y, 10, 180);
    
    text("pos3: x:" + DevelopmentTools.clickPosition.pos3.x + " y:" + DevelopmentTools.clickPosition.pos3.y, 10, 210);
  text("pos4: x:" + DevelopmentTools.clickPosition.pos4.x + " y:" + DevelopmentTools.clickPosition.pos4.y, 10, 240);
  }
  
  static debugExtra(str) {
    if (DevelopmentTools.setUp.init == true) {
      this.counter.extraDbgCount++;
      //console.log(this.counter.extraDbgCount);
      textSize(32);
      textAlign(RIGHT);
      fill(127, 63, 255);
      text(str, width-10, 30*DevelopmentTools.counter.extraDbgCount);
      textAlign(LEFT);
    }
  }
  static clickPosition() {
    clickPosition.pos1;
    clickPosition.pos2;
    clickPosition.pos3;
    clickPosition.pos4;
  }
}