class Player {
  constructor(pos, size, color_R, color_G, color_B) {
    this.pos = pos;
    this.size = size;
    this.color_R = color_R;
    this.color_G = color_G;
    this.color_B = color_B;
    this.quick = false;
    this.freeRoam = false;
  }

  move(dir, walls, spots) {
    var speed = 0;
    if (this.quick == true)
      speed = 2;
    else
      speed = 1;

    if (this.crashCheck(dir, walls, spots))
      this.pos.add(dir);
  }

  set free(newFree) {
    this.freeRoam = newFree;
  }

  get free() {
    return this.freeRoam;
  }

  //handleEvent(event)

  update(walls, spots) {
    for (let i = 0; i < spots.length; i++) {
      if (spots[i].getType() == "end" && collidePointRect(this.pos.x, this.pos.y, spots[i].getPosition().x, spots[i].getPosition().y, /*spots[i].getPosition().x + */spots[i].getSize().x, /*spots[i].getPosition().y + */spots[i].getSize().y)) {
        //console.log("woof");
        return "done";
      }
    }
    var speed = int(this.quick) + 1;
    var dir = createVector(0, 0);
    if (keyIsDown(39)) {
      dir.set(speed, dir.y);
      this.move(dir, walls, spots);
    } else if (keyIsDown(38)) {
      dir.set(dir.x, -speed);
      this.move(dir, walls, spots);
    } else if (keyIsDown(37)) {
      dir.set(-speed, dir.y);
      this.move(dir, walls, spots);
    } else if (keyIsDown(40)) {
      dir.set(dir.x, speed);
      this.move(dir, walls, spots);
    }
    if (keyIsDown(17)) {
      this.quick = true;
    } else {
      this.quick = false;
    }
  }

  setColor(newPlayerColor) {
    if (newPlayerColor instanceof p5.Color) {
      this.color_R = red(newPlayerColor);
      this.color_G = green(newPlayerColor);
      this.color_B = blue(newPlayerColor);
    }
  }
  
  draw() {
    stroke(0);
    fill(color(this.color_R, this.color_G, this.color_B));
    circle(this.pos.x, this.pos.y, this.size);
    noFill();
  }

  crashCheck(dir, walls, spots) {

    if (this.freeRoam == true) {
      let boundriesCheck = this.checkBoundries(dir);
      return boundriesCheck;
    } else {
      let boundriesCheck = this.checkBoundries(dir);
      let wallsCheck = this.checkWalls(dir, walls);
      let spotsCheck = this.checkSpots(dir, spots);
      return (boundriesCheck && wallsCheck && spotsCheck);
    }
    //console.log(wallsCheck);
  }

  checkBoundries(dir) {
    var center = this.pos;
    var top = center.y - this.size / 2;
    var left = center.x - this.size / 2;
    var right = left + this.size;
    var bott = top + this.size;

    if (
      left + dir.x < 0 ||
      right + dir.x > width ||
      top + dir.y < 0 ||
      bott + dir.y > height
    )
      return false;
    else
      return true;
  }

  checkSpots(dir, spots) {
    let noCrash = true;
    let x = this.pos.x;
    let y = this.pos.y;
    let size = this.size;
    for (let i = 0; i < spots.length; i++) {
      if (spots[i].getType() == 'obstacle') {
        let spot = spots[i];
        let spotX = spot.getPosition().x;
        let spotY = spot.getPosition().y;
        let spotWidth = spot.getSize().x;
        let spotHeight = spot.getSize().y;

        let cat = !collideRectCircle(spotX, spotY, spotWidth, spotHeight, x + dir.x, y + dir.y, size);
        if (cat == false)
          noCrash = false;
      }
    }
    return noCrash;
  }

  checkWalls(dir, walls) {
    let center = this.pos;
    let top = center.y - this.size / 2;
    let left = center.x - this.size / 2;
    let right = left + this.size;
    let bottom = top + this.size;
    let noCrash = true;
    for (var i = 0; i < walls.length; i++) {
      //console.log(walls[i]);
      /*var wallX = walls[i].getX();
      var wallY = walls[i].getY();
      if (i === 1) {
        //console.log(dist(center.x, center.y, center.x, wallY))
        //console.log("this.size/2 = " + this.size/2);
        //console.log("wallX: " + wallX + "center.x - this.size/2: " + (center.x - this.size/2));
      }
      var wallLength = walls[i].getLength();
      if (walls[i].isHorizontal()) {
        if ((left > wallX &&
            left < wallX + wallLength) ||
          (right > wallX &&
            right < wallX + wallLength)) {
          if (dir.y > 0) {
            if ((
                dist(center.x, center.y, center.x, wallY) <= dir.y + this.size / 2) ||
              (dist(center.x, center.y, center.x, wallY - 1) <= dir.y + this.size / 2))
              noCrash = false;
          } else if (dir.y < 0) {
          //console.log("" + -dir.y + this.size/2);
          //console.log("" + dist(center.x, center.y, center.x, WallY))
          if ((
              dist(center.x, center.y, center.x, wallY) <= -dir.y + this.size / 2) ||
            (dist(center.x, center.y, center.x, wallY + 1) <= -dir.y + this.size / 2))
            noCrash = false;
        	}
				}
				if (walls[i].y1 <= bottom && walls[i].y1 >= top) {
					if ((dist(center.x, center.y, walls[i].x1, walls[i].y1) <= (this.size / 2) + 1) || 
							(dist(center.x, center.y, walls[i].x2, walls[i].y2) <= (this.size / 2) + 1))
						noCrash = true
				}
      } else {
        //console.log(((top > wallY &&
        //top < wallY + wallLength) ||
        //(bott > wallY &&
        //bott < wallY + wallLength)))
        //console.log(wallLength)
        if ((top > wallY &&
            top < wallY + wallLength) ||
          (bottom > wallY &&
            bottom < wallY + wallLength)) {
          if (dir.x > 0) {
            //if (i==1)
            //console.log(dist(center.x, center.y, center.x, wallX))
            if ((dist(center.x, center.y, wallX, center.y) <= dir.x + this.size / 2) ||
              (dist(center.x, center.y, wallX - 1, center.y) <= dir.x + this.size / 2)) {
              noCrash = false;
            }
          } else if (dir.x < 0) {
            //console.log("" + -dir.y + this.size/2);
            //console.log("MEOW" + dist(center.x, center.y, center.x, wallY))
            if ((dist(center.x, center.y, wallX, center.y) <= (-dir.x + this.size / 2)) ||
              (dist(center.x, center.y, wallX + 1, center.y) <= -dir.x + this.size / 2))
              noCrash = false;
          }
        }
      }*/
			let wallX, wallY, wallWidth, wallHeight;
			if (walls[i].x1 < walls[i].x2)
				wallX = walls[i].x1;
			else
				wallX = walls[i].x2;
			if (walls[i].y1 < walls[i].y2)
				wallY = walls[i].y1;
			else
				wallY = walls[i].y2;
			if (walls[i].horizontal) {
				wallWidth = walls[i].getRawLength();
				wallHeight = 4;
			} else {
				wallHeight = walls[i].getRawLength();
				wallWidth = 4;
			}
			wallX -= 2;
			wallY -= 2;
			
			let cat = !collideRectCircle(wallX, wallY, wallWidth, wallHeight, center.x + dir.x, center.y + dir.y, this.size);
			if (cat == false)
				noCrash = false;
    }
    return noCrash;
  }
}