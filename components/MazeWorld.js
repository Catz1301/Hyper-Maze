class MazeWorld {
  constructor(name) {
    this.name = name;
    this.mazes = [];
    this.mazeNumber;
  }

  addMaze(maze) {
    if (maze instanceof Maze) {
      this.mazes.push(maze);
    }
  }

  clearMaze() {
    // TODO: Map to a key.
    let alertMazes = "Saved mazes: \n";
    let mazes = this.mazes;
    for (let i = 0; i < mazes.length; i++) {
      alertMazes += mazes[i].name + "\n";
    }
    let mazeName = prompt("What's the name of the maze that you want to get rid of?\n\n" + alertMazes);
    if (mazeName !== null) {
      if (mazes !== null) {
        for (let i = 0; i < mazes.length; i++) {
          let maze = mazes[i];
          if (maze.name == mazeName) {
            this.mazes.splice(i, 1);
          }
        }
      }
    }
  }

  clearMazes() {
    this.mazes = [];
    this.mazeNumber = 0;
  }

  getMazes() {
    return this.mazes;
  }
  mazeCompleted() {
    this.mazeNumber++;
    if (this.mazeNumber >= 0 && this.mazeNumber < this.mazes.length) {
      //if (this.mazeNumber != this.mazes.length - 1)
      GlobalConstants.Extras.maze =
        this.mazes[this.mazeNumber];
      return this.mazes[this.mazeNumber];
    } else {
      console.error(this.mazeNumber + " is not a valid number. Please quit messing with me!");
      return null;
    }
  }

  importResult(importedMazes) {
    this.mazes = importedMazes;
  }

  import(JSONData) {
    while (JSONData.mazes.length > 0) {
      this.mazes.push(Maze.importMaze(JSONData.mazes[0]));
      JSONData.mazes.splice(0, 1);
    }
  }

  start() {
    this.mazeNumber = 0;
    return this.mazes[this.mazeNumber];
  }

  rename(newName) {
    this.name = newName;
  }

  import(importObj) {
    this.name = importObj.name;
    let mazeArr = importObj.mazes;
    for (let i = 0; i < mazeArr.length; i++) {
      this.addMaze(CreatorTools.loadMaze(mazeArr[i]))
    }
  }

  static export () {
    let flName = prompt("Enter file name (this WILL be saved to your computer.): ");
    if (flName != null) {
      this.name = flName;
      name = this.name;
      mazes = this.mazes;
      let JSONSave = {
        name,
        mazes
      }
      saveJSON(JSONSave, flName);
    }
  }
}