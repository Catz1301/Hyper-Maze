class Cell {
  constructor(x, y, size = 30) {
    this.visited = false;
    this.x = x;
    this.y = y;
		this.size = size;
		this.scaledX = this.x*this.size;
		this.scaledY = this.y*this.size;
    
		let wallTop = new Wall (this.scaledX, this.scaledY, this.scaledX + this.size, this.scaledY, true);
		let wallRight = new Wall (this.scaledX + this.size, this.scaledY, this.scaledX + this.size, this.scaledY + this.size, false);
		let wallBottom = new Wall (this.scaledX, this.scaledY + this.size, this.scaledX + this.size, this.scaledY + this.size, true);
		let wallLeft = new Wall (this.scaledX, this.scaledY, this.scaledX, this.scaledY + this.size, false);
    this.cellWalls = [
      wallTop, // top wall
      wallRight, // right wall
      wallBottom, // bottom wall
      wallLeft // left wall
		];
		for (let i = 0; i < this.cellWalls.length; i++) {
			if (activeScene instanceof MazeScene) {
				if (DEBUG)
					console.log("CELLADDINGWALLS", ": ", "testing...");
				activeScene.maze.addWall(this.cellWalls[i]);
			}
		}
  }
  
  contains(x, y) {
    return (((x >= this.scaledX) &&
         (x < this.scaledX + this.size)) && 
        ((y >= this.scaledY) && 
         (y < this.scaledY + this.size)));
  }
  
  
  getPos() {
    return createVector(this.x, this.y);
  }
  
  getSize() {
    return this.size;
  }
  
	checkNeighbors() {
		/*console.log(GlobalConstants.Extras.index(this.x, this.y - 1));
		console.log(GlobalConstants.Extras.index(this.x + 1, this.y));
		console.log(GlobalConstants.Extras.index(this.x, this.y + 1));
		console.log(GlobalConstants.Extras.index(this.x - 1, this.y));*/
		var neighbors = [];
		let top = cells[GlobalConstants.Extras.index(this.x, this.y - 1)];
    let right = cells[GlobalConstants.Extras.index(this.x + 1, this.y)];
    let bottom = cells[GlobalConstants.Extras.index(this.x, this.y + 1)];
    let left = cells[GlobalConstants.Extras.index(this.x - 1, this.y)];
		if (DEBUG) {
			console.warn(top);
			console.warn(right);
			console.warn(bottom);
			console.warn(left);
		}
		if (top !== undefined && !top.visited) {
      neighbors.push(top);
			if (DEBUG)
				console.error("I'm here!");
    }
    if (right !== undefined && !right.visited) {
      neighbors.push(right);
			if (DEBUG)
				console.error("I'm here!");
    }
    if (bottom !== undefined && !bottom.visited) {
      neighbors.push(bottom);
			if (DEBUG)
				console.error("I'm here!");
    }
    if (left !== undefined && !left.visited) {
      neighbors.push(left);
			if (DEBUG)
				console.error("I'm here!");
    }
		if (DEBUG)
			console.log({"neighbors: ": neighbors});
    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
	}
	
  draw() {
    if (this.visited) {
      /*noStroke();
      fill(100, 5, 100);
      rect(this.scaledX, this.scaledY, this.size, this.size);*/
    }
  }
  
  getWalls() {
    return this.cellWalls;
  }
	
	removeWall(wallNumber) {
		if (activeScene instanceof MazeScene) {
			activeScene.maze.removeWall(this.cellWalls[wallNumber].getID());
		}
	}
}