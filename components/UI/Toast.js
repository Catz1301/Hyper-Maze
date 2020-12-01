class Toast {
  constructor(x = 0, y = 0, width = 0, height = 0, text, lengthLong) {
    if (typeof(text) != "string" &&
      typeof(lengthLong) != "boolean")
      this.x = x;
    if (typeof(text) != "string" &&
      typeof(lengthLong) != "boolean")
      this.y = y;
    if (typeof(text) != "string" &&
      typeof(lengthLong) != "boolean")
      this.width = width;
    if (typeof(text) != "string" &&
      typeof(lengthLong) != "boolean")
      this.height = height;
    if (typeof(text) != "boolean")
      this.text = text;

    this.lengthLong = lengthLong;
    this.startTime = Date.now();
    if (lengthLong === GlobalConstants.Enums.Toast.LENGTH_LONG || lengthLong == true) {
      this.duration = 3000;
    } else if (lengthLong === GlobalConstants.Enums.Toast.LENGTH_SHORT || lengthLong == false) {
      this.duration = 1500;
    } else {
      console.error("Invalid Length parameter value!");
      console.debug(lengthLong);
    }
    //this.roundedCorners = CornerRa

  }

  show() {
    let now = Date.now();
    if (!((now - this.startTime) >= this.duration)) {
      this.draw();
      //console.log(now - this.startTime)
      return false;
    } else {
      return true;
    }
  }

  static makeText(msg, length) {
    let lengthLong = -1;
    if (length === GlobalConstants.Enums.Toast.LENGTH_LONG || length == true) {
      lengthLong = true;
    } else if (length === GlobalConstants.Enums.Toast.LENGTH_SHORT || length == false) {
      lengthLong = false;
    } else {
      console.error("Invalid Length parameter value!");
      console.debug(length);
      return null;
    }
    return new Toast(0, 0, 0, 0, msg, lengthLong);
  }

  draw() {
    //console.dir(this);
    fill(231, 144);

    //textSize((this.height/this.text.length)*1.5);

    //text(this.text, this.x + (this.height/2), 
    //this.y + (this.width/2));
    let text_size = 12;
    textSize(12);
    let paddingW = 25;
    let paddingH = 15;
    let maxWidth = 400;
    //let rawToastWidth = this.text.length*12;
    //console.warn(this.text);
    let msgArr = GlobalConstants.Extras.chunkString(this.text, 33);
    let lineHeight = 10 + textDescent() + textAscent();

    let toastWidth = paddingW * 2 + (this.text.length * 12);
    let toastHeight = (paddingH * 2) +
      (lineHeight * msgArr.length);
    let toastX = (width / 2) - (toastWidth / 2);
    let toastY = ((height - 50) - toastHeight) -
      (toastHeight / 2);
    rect(toastX, toastY, toastWidth, toastHeight - 10, 50, 50, 50, 50);
    let txtX = width / 2;
    fill(255);
    //noStroke();
    for (let i = 0; i < msgArr.length; i++) {
      textAlign(CENTER, CENTER);
      text(msgArr[i],
        txtX, // + paddingW,
        paddingH + paddingH / 2 + toastY + (i * lineHeight));
    }

    // (new Label(this.x, this.y, this.width, this.height, this.text, 0, new CornerRadius(50, 50, 50, 50), 255, true)).draw();
  }
}