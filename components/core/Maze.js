class Maze {
  constructor(name, walls, spots, width, height) {
    this.name = name;
    this.walls = walls;
    this.spots = spots;
    this.originalWidth = width;
    this.originalHeight = height;
    if (GlobalConstants.Settings.darkMode) {
      this.backgroundColor = color(GlobalConstants.Colors.background_Dark);
      this.wallColor = color(GlobalConstants.Colors.wall_Dark);
    } else {
      this.backgroundColor = color(GlobalConstants.Colors.background_Light);
      this.wallColor = color(GlobalConstants.Colors.wall_Light);
    }

    this.playerColor = color(34, 139, 34);
    this.startPlaced = false;
    this.endPlaced = false;
    this.completed = false;
  }

  getBackgroundColor() {
    return this.backgroundColor;
  }

  setBackgroundColor(newColor) {
    this.backgroundColor = color(newColor);
		GlobalConstants.Extras.maze = this;
  }

  getWallColor() {
    return this.wallColor;
  }

  setWallColor(newColor) {
    for (let i = 0; i < this.walls.length; i++)
      this.walls[i].setColor(newColor);
    this.wallColor = color(newColor);
		GlobalConstants.Extras.maze = this;
  }

  getPlayerColor() {
    return this.playerColor;
  }

  setPlayerColor(newColor) {
    this.playerColor = color(newColor);
		GlobalConstants.Extras.maze = this;
  }

  getName() {
    return this.name;
  }

  getWalls() {
    return this.walls;
  }

  addWall(newWall) {
    if (newWall instanceof Wall) {
      newWall.setColor(this.wallColor);
      this.walls.push(newWall);
    }
		GlobalConstants.Extras.maze = this;
  }

  removeWall(id) {
    for (let i = 0; i < this.walls.length; i++) {
      if (this.walls[i].getID() == id) {
        this.walls.splice(i, 1);
      }
    }
		GlobalConstants.Extras.maze = this;
  }

  getSpots() {
    return this.spots;
  }

  addSpot(newSpot) {
    if (newSpot instanceof Spot) {
      this.spots.push(newSpot);
    }
		GlobalConstants.Extras.maze = this;
  }

  removeSpot(id) {
    for (let i = 0; i < this.spots.length; i++) {
      if (this.spots[i].getID() == id) {
        this.spots.splice(i, 1);
      }
    }
		GlobalConstants.Extras.maze = this;
  }

  getWidth() {
    return this.originalWidth;
  }

  getHeight() {
    return this.originalHeight;
  }

  color(r, g, b, a = 255) {
    let hr = hex(r),
      hg = hex(g),
      hb = hex(b),
      ha = hex(a);
    let hsa = ha << 24;
    let hsr = hr << 16;
    let hsg = hg << 8;
    let hcolor = ha | hr | hg | hb;
    return hcolor;
  }

  static import(obj) {
    let name = obj.name;
    let walls = obj.walls;
    let spots = obj.spots;
    let bgColorProp = obj.bgColor;
    let wallColorProp = obj.wallColor;
    let playerColorProp = obj.playerColor;
    // console.log(walls);
    let wallsObj = [];
    let spotsObj = [];
    for (let i = 0; i < walls.length; i++) {
      wallsObj.push((new Wall(walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2, walls[i].horizontal)));
    }
    for (let i = 0; i < spots.length; i++) {
      spotsObj.push(new Spot(spots[i].x, spots[i].y, spots[i].width, spots[i].height, color(spots[i].color.levels), spots[i].type));
    }
    let tmpMaze = new Maze(name, wallsObj, spotsObj, width, height);
    let bgColor = color(bgColorProp.levels);
    let wallColor = color(wallColorProp.levels);
    let playerColor = color(playerColorProp.levels);

    tmpMaze.setBackgroundColor(bgColor);
    tmpMaze.setWallColor(wallColor);
    tmpMaze.setPlayerColor(playerColor);
    return tmpMaze;
  }
}