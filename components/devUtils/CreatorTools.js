class CreatorTools {
  static saveMaze(maze) {
    let mazeExists = true; // So we get the prompt at least once
    let mazeDoesExist = true
    let overwrite = false;
    let fileName;
    while (mazeExists == true || overwrite == false) {
      fileName = prompt("Enter maze name: ");
      if (fileName === null) {
        return;
      } else {
        mazeExists = CreatorTools.checkForExistingMaze(fileName);
        if (mazeExists == true) {
          overwrite = confirm(fileName + " already exists. Do you want to overwrite it?");
          if (overwrite == true) {
            mazeExists = false;
          }
          mazeDoesExist = true
          console.log(mazeExists);
        }
      }
    }
    //console.log(maze);
    let name = fileName;
    let walls = maze.walls;
    let spots = maze.spots;
    let originalWidth = maze.originalWidth;
    let originalHeight = maze.originalHeight;
    let bgColor = maze.getBackgroundColor();
    let wallColor = maze.getWallColor();
    let playerColor = maze.getPlayerColor();
    let json = {
      name,
      walls,
      spots,
      originalWidth,
      originalHeight,
      bgColor,
      wallColor,
      playerColor
    };
    //saveJSON(json, fileName);
    let storedMazes = getItem('Mazes');
    if (storedMazes === null) {
      storedMazes = [];
    }

    // TODO: Make storedMazes contain Objects, not strings.
    if (overwrite) {
      let mazeToOverwrite = -1;
      for (let i = 0; i < storedMazes.length; i++) {
        let tmpMazeObj = JSON.parse(storedMazes[i]);
        if (tmpMazeObj.name == fileName) {
          mazeToOverwrite = i;
        }
      }
      if (mazeToOverwrite != -1)
        storedMazes[mazeToOverwrite] =
        JSON.stringify(json);
      else {
        let errMsg = "There was an error while saving.";
        let toast = new Toast(
          width / 2 - ((errMsg.length) * 15) / 2, 
          height - 75,
          ((errMsg.length) * 15),
          50,
          errMsg,
          true
        );
        toast.show();
      }

    } else {
      storedMazes[storedMazes.length] = JSON.stringify(json);
    }

    storeItem('Mazes', storedMazes);
  }

  static checkForExistingMaze(strName) {
    let mazes = getItem('Mazes');
    if (mazes === null) {
      return false;
    }
    let mazeExists = false;
    for (let i = 0; i < mazes.length; i++) {
      let maze = JSON.parse(mazes[i]);
      if (maze.name == strName)
        mazeExists = true;
    }
    return mazeExists;
  }

  static getMazes() {
    let storedMazesStr = getItem('Mazes');
    if (storedMazesStr !== null) {
      let storedMazes = [];
      for (let i = 0; i < storedMazesStr.length; i++) {
        let storedMaze;
        try {
          storedMaze = JSON.parse(storedMazesStr[i]);
        } catch (e) {
          console.error(`${e.name}: ${e.message} on ${e.fileName}; line ${e.lineNumber}, column ${e.columnNumber}.`);
          console.debug('Stack trace:');
          console.debug(`${e.stack}`);
          break;
        }
        storedMazes.push(storedMaze);
        // console.log(storedMaze);
      }
      return storedMazes;
    } else {
      return null;
    }
  }

  static getMaze(mazeName) {
    var mazeToLoad = null;
    for (var i = 0; i < storedMazes.length; i++) {
      // console.dir(storedMazes[i]);
      if (storedMazes[i].name == mazeName)
        mazeToLoad = storedMazes[i];
    }
    return mazeToLoad;
  }

  static importMaze() {
    let fileInput = createFileInput(function(file) {
      let JSONData = file.data;
      console.debug(JSONData);
      //console.warn(JSON.parse(JSONData));
      GlobalConstants.Flags.imported = true;
      GlobalConstants.Extras.maze = CreatorTools.loadMaze(JSONData);
    });
    fileInput.hide();
    fileInput.elt.click();
  }

  static loadMaze(obj = null) {
    let storedMazesStr = getItem('Mazes');
    console.log(storedMazesStr);
    if (storedMazesStr == null) {

      let toast = new Toast(width / 2 - (("Sorry, but you haven't saved any mazes yet.".length) * 15) / 2, height - 75, (("Sorry, but you haven't saved any mazes yet.".length) * 15), 50, "Sorry, but you haven't saved any mazes yet.", true);
      toast.show();
      //console.log(`(storedMazesStr == null: ${(storedMazesStr == null)}`);
      return GlobalConstants.Extras.maze;

    }
    var mazeToLoad;
    if (obj == null) {
      let storedMazes = [];
      let alertMazes = "Saved mazes: \n";
      for (let i = 0; i < storedMazesStr.length; i++) {
        let storedMaze = JSON.parse(storedMazesStr[i]);
        storedMazes.push(storedMaze);
        // console.log(storedMaze);
        alertMazes += storedMaze.name + "\n";
      }

      var fileName = prompt(alertMazes + "\nEnter name of maze to load: ");
      if (fileName == null)
        return GlobalConstants.Extras.maze;



      mazeToLoad = null;
      for (var i = 0; i < storedMazes.length; i++) {
        // console.dir(storedMazes[i]);
        if (storedMazes[i].name == fileName)
          mazeToLoad = storedMazes[i];
      }
      if (mazeToLoad == null) {
        alert("Could not find maze named '" + fileName + "'");
        return GlobalConstants.Extras.maze;
      } else {
        //mazeToLoad = obj;
      }
    } else {
      if (Array.isArray(obj))
        mazeToLoad = obj[0];
      else
        mazeToLoad = obj;
      //console.log(mazeToLoad)
    }
    background(51);

    console.log(mazeToLoad);
    let name = mazeToLoad.name;
    let walls = mazeToLoad.walls;
    let spots = mazeToLoad.spots;
    let originalW = mazeToLoad.originalWidth;
    let originalH = mazeToLoad.originalHeight;
    let bgColorProp = mazeToLoad.bgColor;
    let wallColorProp = mazeToLoad.wallColor;
    let playerColorProp = mazeToLoad.playerColor;
    // console.log(walls);
    let wallsObj = [];
    let spotsObj = [];
    for (let i = 0; i < walls.length; i++) {
      wallsObj.push((new Wall(walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2, walls[i].horizontal)));
    }
    for (let i = 0; i < spots.length; i++) {
      spotsObj.push(new Spot(spots[i].x, spots[i].y, spots[i].width, spots[i].height, color(spots[i].color.levels), spots[i].type));
    }
    let tmpMaze = new Maze(name, wallsObj, spotsObj, originalW, originalH);
    let bgColor = color(bgColorProp.levels);
    let wallColor = color(wallColorProp.levels);
    //console.log("levels: " + playerColorProp.levels);
    let playerColor = color(playerColorProp.levels);
    // console.group("playerColorProp");
    // console.log("playerColorProp");
    // console.debug(playerColorProp);
    // console.groupEnd();
    //console.log(playerColor);
    tmpMaze.setBackgroundColor(bgColor);
    tmpMaze.setWallColor(wallColor);
    tmpMaze.setPlayerColor(playerColor);
    if (tmpMaze instanceof Maze)
      if (obj == null)
        GlobalConstants.Extras.maze = tmpMaze;
    //var mazeWalls = maze.getWalls();
    return tmpMaze;
  }


  static preloadMaze(mazeObj) {
    let mazeToLoad = mazeObj;

    background(51);
    // console.log(mazeToLoad)
    console.log(mazeToLoad);
    let name = mazeToLoad.name;
    let walls = mazeToLoad.walls;
    let spots = mazeToLoad.spots;
    let originalW = mazeToLoad.originalWidth;
    let originalH = mazeToLoad.originalHeight;
    let bgColorProp = mazeToLoad.bgColor;
    let wallColorProp = mazeToLoad.wallColor;
    let playerColorProp = mazeToLoad.playerColor;
    // console.log(walls);
    let wallsObj = [];
    let spotsObj = [];
    for (let i = 0; i < walls.length; i++) {
      wallsObj.push((new Wall(walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2, walls[i].horizontal)));
    }
    for (let i = 0; i < spots.length; i++) {
      spotsObj.push(new Spot(spots[i].x, spots[i].y, spots[i].width, spots[i].height, color(spots[i].color.levels), spots[i].type));
    }
    let tmpMaze = new Maze(name, wallsObj, spotsObj, originalW, originalH);
    let bgColor = color(bgColorProp.levels);
    let wallColor = color(wallColorProp.levels);
    //console.log("levels: " + playerColorProp.levels);
    let playerColor = color(playerColorProp.levels);
    // console.group("playerColorProp");
    // console.log("playerColorProp");
    // console.debug(playerColorProp);
    // console.groupEnd();
    //console.log(playerColor);
    tmpMaze.setBackgroundColor(bgColor);
    tmpMaze.setWallColor(wallColor);
    tmpMaze.setPlayerColor(playerColor);
    //var mazeWalls = maze.getWalls();
    return tmpMaze;

  }


  static
  export (mazeWorld = null) {
    let flName = prompt("Enter file name (this WILL be saved to your computer.): ");
    if (flName != null) {

      console.debug(getItem('Mazes'));
      let mazeArr = [];
      let mazes = getItem('Mazes');
      for (let i = 0; i < mazes.length; i++) {
        mazeArr.push(JSON.parse(mazes[i]));
      }

      saveJSON(mazeArr, flName);
    }
  }

  static shareExport() {
    console.dir(worldMaze);
    let mazeArr = [];
    let mazes = getItem('Mazes');
    for (let i = 0; i < mazes.length; i++) {
      mazeArr.push(JSON.parse(mazes[i]));
    }
    let mazeWorldName = worldMaze.name;
    let shareObj = {
      "name": mazeWorldName,
      "mazes": mazeArr
    }
    let mazeArrStr = JSON.stringify(shareObj);
    let shareStr = CreatorTools.convert(mazeArrStr);
    shareStr = shareStr.replaceAll(' ', '2');
    console.log(shareStr);
    let w = ceil(sqrt(shareStr.length));
    let goal = w * w;
    let current = shareStr.length;
    let gap = goal - current;
    let gapFiller = "";
    for (let i = 0; i < gap; i++) {
      gapFiller += "3";
    }
    shareStr += gapFiller;
    console.log(w * w);
    console.log(shareStr.length);
    console.log(`Img size: ${w}x${w}`);
    let shareImg = createImage(w, w);
    shareImg.loadPixels();
    for (let y = 0; y < w; y++) {
      for (let x = 0; x < w; x++) {
        shareImg.set(x, y, color(0, 0, 0));
        //console.log(shareImg.get(x, y));
      }
    }
    shareImg.updatePixels();
    for (let y = 0; y < w; y++) {
      for (let x = 0; x < w; x++) {
        let index = x + y * w;
        if (index < shareStr.length) {
          if (shareStr[index] == "1") {
            shareImg.set(x, y, color(255, 255, 255));
          } else if (shareStr[index] == "2") {
            shareImg.set(x, y, color(0, 0, 255));
          } else if (shareStr[index] == "3") {
            shareImg.set(x, y, color(255, 0, 0));
          }
        }
      }
    }
    shareImg.updatePixels();
    //image(shareImg, shareImg.width, shareImg.height);
    //noLoop();
    //createImg(shareImg, 'Image used for sharing mazeworlds. If you see this, something went wrong.\n' + JSON.stringify(shareStr));
    let imgName = prompt("Name of image: ")
    shareImg.save(imgName, 'png');
  }

  static shareImport() {
    // TODO: Confirm w/ user to add the mazes to local storage.

    background(color(47, 79, 79));
    let loadingStr = "Loading WorldMaze";
    textSize(14);
    text(loadingStr,
      (width / 2) - loadingStr.length * 14,
      (height / 2) - loadingStr.length * 14);
    let fileInput = createFileInput(function(file) {
      //console.log(file.data)
      loadImage(file.data, img => {
        let importStrArr = [];
        let importStr = "";
        //console.log("meow");
        img.loadPixels();
        for (let y = 0; y < img.width; y++) {
          for (let x = 0; x < img.width; x++) {
            let pixel = img.get(x, y);
            let pixelColor = color(pixel);
            if (red(pixelColor) == 255 &&
              green(pixelColor) == 255 &&
              blue(pixelColor) == 255) {
              importStr += "1";
              //console.log("1");
            } else if (red(pixelColor) == 0 &&
              green(pixelColor) == 0 &&
              blue(pixelColor) == 0) {
              importStr += "0";
              //console.log("0");
            } else if (red(pixelColor) == 0 &&
              green(pixelColor) == 0 &&
              blue(pixelColor) == 255) {
              importStrArr.push(importStr);
              importStr = "";
              //console.log("3")
            }
          }
        }

        let importJSONStr = "";
        for (let i = 0; i < importStrArr.length; i++) {
          importJSONStr += String.fromCharCode(
            parseInt(importStrArr[i], 2));
          //console.log(i);
          //console.log(String.fromCharCode(parseInt(importStrArr[i], 2)));
        }
        console.log(importJSONStr);
        console.warn(JSON.parse(importJSONStr));
        worldMaze.import(JSON.parse(importJSONStr));
        GlobalConstants.Flags.loaded = true;
      });
    });
    fileInput.hide();
    fileInput.elt.click();
  }

  static convert(input) {
    //var output = document.getElementById("ti2");
    //var input = document.getElementById("ti1").value;
    let output = "";
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output;
  }
}