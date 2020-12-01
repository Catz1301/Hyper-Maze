class Wall {

  constructor(startX, startY, endX, endY, horizontal = true) {
    this.x1 = startX;
    this.y1 = startY;
    this.x2 = endX;
    this.y2 = endY;
    this.horizontal = horizontal;
    this.id = NaN;
    this.generateId();
    if (GlobalConstants.Settings.darkMode)
        this.color = GlobalConstants.Colors.wall_Dark
    else
        this.color = GlobalConstants.Colors.wall_Light
  }

  setColor(newColor) {
    this.color = color(newColor);
    //console.debug(this.color);
  }
  isHorizontal() {
    return this.horizontal;
  }

  getStartingPoint() {
    return createVector(this.x1, this.y1);
  }
  getEndingPoint() {
    return createVector(this.x2, this.y2);
  }

  generateId() {
		let idPre = (new Date()).getTime()
		if (DEBUG || DEBUG_LITE)
			console.debug(idPre == GlobalConstants.TempVars.lastWallId);
    if (idPre == GlobalConstants.TempVars.lastWallId) {
			GlobalConstants.TempVars.wallIdOffset++;
			if (DEBUG || DEBUG_LITE)
				console.debug(GlobalConstants.TempVars.wallIdOffset);
			idPre = GlobalConstants.Constants.startTimeUEM - GlobalConstants.TempVars.wallIdOffset;
		}
		GlobalConstants.TempVars.lastWallId = idPre;
    this.id = idPre;
		
    //console.log(id)
  }
  getID() {
    return this.id;
  }
  getX() {
    return this.x1;
  }

  getY() {
    return this.y1;
  }
  
  getEX() {
    return this.x2;
  }
  
  getEY() {
    return this.y2;
  }
  
  getLength() {
    if (this.isHorizontal()) {
      return abs(this.x2 - this.x1);
    } else {
      return abs(this.y2 - this.y1);
    }
  }
	
	getRawLength() {
		if (this.horizontal)
			return this.x2 - this.x1;
		else
			return this.y2 - this.y1;
	}

  draw() {
    stroke(this.color);
    
    line(this.x1, this.y1, this.x2, this.y2);
  }

}