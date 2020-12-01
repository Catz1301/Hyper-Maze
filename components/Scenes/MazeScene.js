class MazeScene {
  constructor() {
    this.player1;
    this.walls = [];
    this.spots = [];

    // if (GlobalConstants.Settings.initialized == true)
    //   this.devMode = GlobalConstants.Settings.devMode;
    // else
    //this.devMode = true;
    //this.actions =
    this.firstPointSet = false;
    this.secondPointSet = false;
    this.firstSpotPointSet = false;
    this.secondSpotPointSet = false;
    this.snapMode = false;
    this.maze;
    this.addingWalls = false;
    //this.spot;
    this.initialized = false;
    this.currentMaze;
    this.importing = false;
    this.mazeWorld = worldMaze;
    this.mode = GlobalConstants.Enums.spotType.START;
    //this.toast = new Toast((width / 2) - 100, (height / 2) - 100, 200, 100, "MEOW", true);
    this.addNewMazeBtn = new Button(15, height - 65, 100, 50, "Add New Maze", "addMazeBtn", 1.5);
    this.modal = new Modal(15, 15, width - 30, height - 30, GlobalConstants.Layouts.mazeSettings_layout);
    this.modeStatus = new Label(width - 100, height - 50, 100, 50, "None", 95);
    this.contextMenuModal = new Modal(0, 0, 204, 79, GlobalConstants.Layouts.contextMenu_layout);
    this.contextMenuModal.hide();
    this.modal.hide();
  }



  setup(mazeWorld = null) {
    this.contextMenuModal.UIComponents[0].onClick(function(name, whatToAlert) {
      alert(name + "says: " + whatToAlert);
      this.contextMenuModal.hide();
    }.bind(this), ["whiskers", "meow"]);
    this.contextMenuModal.UIComponents[1].onClick(function() {
      CreatorTools.shareExport();
      this.contextMenuModal.hide();
    }.bind(this));
		this.contextMenuModal.UIComponents[2].onClick(function() {
			GenerateMaze.init();
			GenerateMaze.GenerateNewMaze();
			this.contextMenuModal.hide();
		}.bind(this));
    let mazes = CreatorTools.getMazes();
    //console.log(mazes)
    if (mazes !== null) {
      for (let i = 0; i < mazes.length; i++) {
        this.mazeWorld.addMaze(CreatorTools.preloadMaze(mazes[i]));
      }
    }
    if (this.mazeWorld.getMazes().length == 0) {
      this.initialized = true;
      scenesInitialized = true;
      this.flags = [];
      this.paused = false;
      this.currentMaze = -1;
      //this.spotA = new Spot(0, 0, 50, 50);
      //this.spots.push(this.spotA);
      //this.spots[0].setObstacle();
      let scene = this;
      let onClickFunc = this.saveMaze.bind(this);
      this.addNewMazeBtn.onClick(this.saveMaze.bind(this));

      //this.wall1 = new Wall(10, 23, 10, 48, false);
      //this.walls[this.walls.length] = this.wall1;
      //this.walls[this.walls.length] = new Wall(79, 120, 79, 320, false);
      this.maze = new Maze("default", this.walls, this.spots, width, height);
      worldMaze.addMaze(this.maze);
      //init();
      GlobalConstants.Extras.maze = this.maze;
      if (GlobalConstants.Settings.devMode)
        DevelopmentTools.setUp();
      this.player1 = new Player(createVector(width / 2, height / 2), 25, 34, 139, 34, this.walls);
      for (let z = 0; z < cells.length; z++) {
        if (cells[z].contains(this.player1.pos.x, this.player1.pos.y)) {
          this.player1.pos.x = (cells[z].getPos().x * cells[z].getWidth()) + (cells[z].getWidth() / 2);
          this.player1.pos.y = (cells[z].getPos().y * cells[z].getHeight()) + (cells[z].getHeight() / 2);
        }
      }
    } else {
      //if (mazeWorld instanceof MazeWorld) {
      this.addNewMazeBtn.onClick(this.saveMaze.bind(this));
      this.initialized = true;
      scenesInitialized = true;
      this.flags = [];
      this.paused = false;
      this.maze = this.mazeWorld.start();
      GlobalConstants.Extras.maze = this.maze;
      this.walls = this.maze.getWalls();
      this.spots = this.maze.getSpots();
      this.player1 = new Player(createVector(width / 2, height / 2), 25, 34, 139, 34, this.walls);
      this.player1.setColor(this.maze.getPlayerColor());
      this.mazeLoaded();
    }
		let cols = floor(width / 30);
    let rows = floor(height / 30);
		GlobalConstants.Extras.mazeExtrasInit(rows, cols);
  }

  saveMaze() {
    let doSave = confirm("Do you want to save this maze?");
    if (doSave) {
      let event = {
        "type": "keydown",
        "which": 83,
        "key": 's'
      };
      CreatorTools.saveMaze(this.maze);
      worldMaze.addMaze(this.maze);
      this.walls = [];
      this.spots = [];
      this.player1.pos = createVector(
        width / 2,
        height / 2
      );
      this.maze = new Maze("default", this.walls, this.spots, width, height);
      GlobalConstants.Extras.maze = this.maze;
      //console.log(this);
      //console.log(GlobalConstants.Extras.maze);
    }
  }

  mazeLoaded() {
    let components = this.modal.getComponents();
    let br, bg, bb, wr, wg, wb, pr, pg, pb;
    for (let i = 0; i < components.length; i++) {
      if (components[i] instanceof NumberInputBox) {
        //console.log(components[i].getID())
        if (components[i].getID() == "backgroundColorR") {
          components[i].value = str(red(this.maze.getBackgroundColor()));
          br = components[i].getValue();
        } else if (components[i].getID() == "backgroundColorG") {
          components[i].value = str(green(this.maze.getBackgroundColor()));
          bg = components[i].getValue();
        } else if (components[i].getID() == "backgroundColorB") {
          components[i].value = str(blue(this.maze.getBackgroundColor()));
          bb = components[i].getValue();
        } else if (components[i].getID() == "wallColorR") {
          components[i].value = str(red(this.maze.getWallColor()));
          wr = components[i].getValue();
        } else if (components[i].getID() == "wallColorG") {
          components[i].value = str(green(this.maze.getWallColor()));
          wg = components[i].getValue();
        } else if (components[i].getID() == "wallColorB") {
          components[i].value = str(blue(this.maze.getWallColor()));
          wb = components[i].getValue();
        } else if (components[i].getID() == "playerColorR") {
          components[i].value = str(red(this.maze.getPlayerColor()));
          wr = components[i].getValue();
        } else if (components[i].getID() == "playerColorG") {
          components[i].value = str(green(this.maze.getPlayerColor()));
          wg = components[i].getValue();
        } else if (components[i].getID() == "playerColorB") {
          components[i].value = str(blue(this.maze.getPlayerColor()));
          wb = components[i].getValue();
        }
      }
    }

    for (let i = 0; i < this.maze.spots.length; i++) {
      if (this.maze.spots[i].getType() == "start") {
        this.player1.pos = createVector(
          this.maze.spots[i].x +
          (this.maze.spots[i].width / 2),
          this.maze.spots[i].y +
          (this.maze.spots[i].height / 2));
      }
    }
  }

  handleEvent(event) {
    if (this.modal != null && this.modal.isActive()) {
      if (this.modal.handleEvent(event) == "closed")
        return;
      let components = this.modal.getComponents();
      let br = -1,
        bg = -1,
        bb = -1;
      let wr = -1,
        wg = -1,
        wb = -1;
      let pr = -1,
        pg = -1,
        pb = -1;
      for (let i = 0; i < components.length; i++) {
        if (components[i] instanceof NumberInputBox) {
          //console.log(components[i].getID())
          if (components[i].getID() == "backgroundColorR")
            br = components[i].getValue();
          else if (components[i].getID() == "backgroundColorG")
            bg = components[i].getValue();
          else if (components[i].getID() == "backgroundColorB")
            bb = components[i].getValue();
          else if (components[i].getID() == "wallColorR")
            wr = components[i].getValue();
          else if (components[i].getID() == "wallColorG")
            wg = components[i].getValue();
          else if (components[i].getID() == "wallColorB")
            wb = components[i].getValue();
          else if (components[i].getID() == "playerColorR")
            pr = components[i].getValue();
          else if (components[i].getID() == "playerColorG")
            pg = components[i].getValue();
          else if (components[i].getID() == "playerColorB")
            pb = components[i].getValue();
        }
      }
      //console.log(br)
      //console.log(bg)
      //console.log(bb)
      if (br != -1 && bg != -1 && bb != -1) {
        if (this.maze.getBackgroundColor() != color(br, bg, bb))
          this.maze.setBackgroundColor(color(br, bg, bb));
      }
      if (wr != -1 && wg != -1 && wb != -1) {
        if (this.maze.getWallColor() != color(wr, wg, wb))
          this.maze.setWallColor(color(wr, wg, wb));
      }
      if (pr != -1 && pg != -1 && pb != -1) {
        if (this.maze.getPlayerColor() != color(pr, pg, pb)) {
          this.maze.setPlayerColor(color(pr, pg, pb));
          this.player1.setColor(color(pr, pg, pb));
        }
      }
    }
    if (this.contextMenuModal.isActive()) {
      this.contextMenuModal.handleEvent(event);
			return;
		}
    else
      this.contextMenuModal.hide()
    if (!this.modal.isActive()) {
      //console.log("meow")
      this.addNewMazeBtn.handleEvent(event);
      //if (event.type != "mousemove")
      //console.log(event);
      //console.log("meow")
      
      if (event.type === "click") {
        this.mousePressedEvent(event);
      }
      else if (event.type === "keydown")
        this.keyPressedEvent(event);
      else if (event.type === "mousemove")
        this.mouseMovedEvent();
      else if (event.type === "windowresize")
        this.windowResizedEvent(event);
      else if (event.type === "contextmenu")
        this.contextMenuEvent(event);
    }
  }

  keyPressedEvent(event) {
    if (this.contextMenuModal.isActive())
      this.contextMenuModal.hide(); {
      if (event.key == '1') {
        this.mode = GlobalConstants.Enums.spotType.START;
        this.modeStatus.setText("START");
        this.addingWalls = false;
      } else if (event.key == '2') {
        this.mode = GlobalConstants.Enums.spotType.OBSTACLE;
        this.modeStatus.setText("OBSTACLE");
        this.addingWalls = false;
      } else if (event.key == '3') {
        this.mode = GlobalConstants.Enums.spotType.END;
        this.modeStatus.setText("END");
        this.addingWalls = false;
      } else if (event.key == '4') {
        this.addingWalls = !this.addingWalls;
        if (this.addingWalls)
          this.modeStatus.setText("WALL");
      }
      //console.dir(event);
      if (event.which === 83) {
        CreatorTools.saveMaze(this.maze);
        worldMaze.addMaze(this.maze);
      } else if (event.which === 76 ||
        event.key == 'i') {
        //var wallsBackUp = this.walls;
        //this.walls.length = 0;
        if (event.which === 76)
          this.maze = CreatorTools.loadMaze();
        else if (event.which === 73) {
          this.importing = true;
          CreatorTools.importMaze();
        }
        let components = this.modal.getComponents();
        let br, bg, bb, wr, wg, wb;
        for (let i = 0; i < components.length; i++) {
          if (components[i] instanceof NumberInputBox) {
            //console.log(components[i].getID())
            if (components[i].getID() == "backgroundColorR") {
              components[i].value = str(red(this.maze.getBackgroundColor()));
              br = components[i].getValue();
            } else if (components[i].getID() == "backgroundColorG") {
              components[i].value = str(green(this.maze.getBackgroundColor()));
              bg = components[i].getValue();
            } else if (components[i].getID() == "backgroundColorB") {
              components[i].value = str(blue(this.maze.getBackgroundColor()));
              bb = components[i].getValue();
            } else if (components[i].getID() == "wallColorR") {
              components[i].value = str(red(this.maze.getWallColor()));
              wr = components[i].getValue();
            } else if (components[i].getID() == "wallColorG") {
              components[i].value = str(green(this.maze.getWallColor()));
              wg = components[i].getValue();
            } else if (components[i].getID() == "wallColorB") {
              components[i].value = str(blue(this.maze.getWallColor()));
              wb = components[i].getValue();
            }
          }
        }
        this.maze.setBackgroundColor(color(br, bg, bb));
        this.maze.setWallColor(color(wr, wg, wb));
        console.log(this.maze.getWallColor());

        for (let i = 0; i < this.maze.spots.length; i++) {
          if (this.maze.spots[i].getType() == "start") {
            this.player1.pos = createVector(
              this.maze.spots[i].x +
              (this.maze.spots[i].width / 2),
              this.maze.spots[i].y +
              (this.maze.spots[i].height / 2));
          }
        }
        //walls = maze.getWalls();
        //console.log(this.walls);
        //if (this.walls === null) {
        //this.walls = wallsBackUp;
        //console.log(this.walls)
        //}
      } else if (event.which === 67) {
        this.walls.length = 0;
        this.spots.length = 0;
        this.maze.startPlaced = false;
        this.maze.endPlaced = false;
      } else if (event.which === 68) {
        this.devMode = !this.devMode;
      } else if (
        event.which === 70 ||
        event.key === 'f') {
        this.snapMode = !this.snapMode
      } else if (event.which === 71) {
        GenerateMaze.GenerateNewMaze();
      } else if (event.which == 27 || event.key == "Escape") {
        //console.log(this.modal.isActive());
        if (this.modal.isActive()) {
          this.modal.hide();
          //console.log("kitten");
          //console.log(this.modal.isActive());
        } else {
          //console.log("cat")
          activeSceneNeedsChecking = true;
          let flag1 = {
            "flag": "switchScene",
            "flagProp": [{
                "sceneDestination": "SettingsScene",
                "keepCurrentScene": true
              },
              {
                "useless": "yess."
              }
            ]
          };
          SceneManagement.Flags.flags.push(flag1);
        }
      } else if (event.key === 'q') {
        this.modal.show();
      } else if (event.key === 'e') {
        CreatorTools.export();
      }
    }

  }

  mouseMovedEvent() {
    if (keyIsDown(CONTROL)) {
      for (let i = 0; i < this.walls.length; i++) {
        if (collidePointLine(mouseX, mouseY,
            this.walls[i].getX(),
            this.walls[i].getY(),
            this.walls[i].getEX(),
            this.walls[i].getEY()))
          this.maze.removeWall(this.walls[i].getID())
      }
      for (let j = 0; j < this.spots.length; j++) {
        let shouldRemoveSpot =
          collidePointRect(mouseX, mouseY, this.spots[j].getPosition().x,
            this.spots[j].getPosition().y,
            this.spots[j].getSize().x,
            this.spots[j].getSize().y);
        console.log(shouldRemoveSpot)
        if (shouldRemoveSpot)
          this.maze.removeSpot(this.spots[j].getID())
        }
      }
    }

    contextMenuEvent(event) {
      //console.log(this.contextMenuModal.getComponents())

      let x, y;

      if (event.x + this.contextMenuModal.width < width) {
        x = event.x;
      } else {
        x = width - this.contextMenuModal.width;
      }

      if (event.y + this.contextMenuModal.height < height) {
        y = event.y;
      } else {
        y = height - this.contextMenuModal.height;
      }

      this.contextMenuModal.setPosition(x, y);
      if (this.contextMenuModal.isActive() == false)
        this.contextMenuModal.show();
    }

    mousePressedEvent(event) {
      //console.log(1)
      if (this.addingWalls) {
        if (GlobalConstants.Settings.devMode) {
          if (!this.firstPointSet) {
            if (this.snapMode) {
              let x, y;
              if (mouseX % 10 > 4)
                x = (pmouseX - pmouseX % 10) + 10;
              else
                x = (pmouseX - pmouseX % 10);

              if (mouseY % 10 > 4)
                y = (pmouseY - pmouseY % 10) + 10;
              else
                y = (pmouseY - pmouseY % 10);
              DevelopmentTools.clickPosition.pos1 = createVector(x, y);
            } else
              DevelopmentTools.clickPosition.pos1 = createVector(pmouseX, pmouseY);
            this.firstPointSet = true;
          } else if (this.firstPointSet && !this.secondPointSet) {
            if (this.snapMode) {
              let x, y;
              if (mouseX % 10 > 4)
                x = (pmouseX - pmouseX % 10) + 10;
              else
                x = (pmouseX - pmouseX % 10);

              if (mouseY % 10 > 4)
                y = (pmouseY - pmouseY % 10) + 10;
              else
                y = (pmouseY - pmouseY % 10);
              DevelopmentTools.clickPosition.pos2 = createVector(x, y);
            } else
              DevelopmentTools.clickPosition.pos2 = createVector(pmouseX, pmouseY);
            this.firstPointSet = true;
            this.secondPointSet = true;
            let click1 = DevelopmentTools.clickPosition.pos1;
            let click2 = DevelopmentTools.clickPosition.pos2;
            if (abs(click1.x - click2.x) > abs(click1.y - click2.y)) {
              let x1, x2, y1, y2;
              if (click1.x > click2.x) {
                x1 = click2.x;
                x2 = click1.x;
              } else {
                x1 = click1.x;
                x2 = click2.x;
              }
              y1 = click1.y;
              y2 = y1;
              this.maze.addWall(new Wall(x1, y1, x2, y2, true));
            } else {
              let x1, x2, y1, y2;
              if (click1.y > click2.y) {
                y1 = click2.y;
                y2 = click1.y;
              } else {
                y1 = click1.y;
                y2 = click2.y;
              }
              x1 = click1.x;
              x2 = x1;
              this.maze.addWall(new Wall(x1, y1, x2, y2, false));
            }
            //} else {
            DevelopmentTools.clickPosition.pos1 = createVector(0, 0);
            DevelopmentTools.clickPosition.pos2 = createVector(0, 0);
            this.firstPointSet = false;
            this.secondPointSet = false;
          }
        }
      } else if (!this.addingWalls) {
        //console.log(2)
        if (GlobalConstants.Settings.devMode) {
          if (!this.firstSpotPointSet) {
            if (this.snapMode) {
              let x, y;
              if (event.x % 10 > 4)
                x = (event.x - event.x % 10) + 10;
              else
                x = (event.x - event.x % 10);

              if (event.y % 10 > 4)
                y = (event.y - event.y % 10) + 10;
              else
                y = (event.y - event.y % 10);
              DevelopmentTools.clickPosition.pos3 = createVector(x, y);
            } else {
              DevelopmentTools.clickPosition.pos3 = createVector(event.x, event.y);
            }
            this.firstSpotPointSet = true;
          } else if (!this.secondSpotPointSet) {
            if (this.snapMode) {
              let x, y;
              if (event.x % 10 > 4)
                x = (event.x - event.x % 10) + 10;
              else
                x = (event.x - event.x % 10);

              if (event.y % 10 > 4)
                y = (event.y - event.y % 10) + 10;
              else
                y = (event.y - event.y % 10);
              DevelopmentTools.clickPosition.pos4 = createVector(x, y);
            } else {
              DevelopmentTools.clickPosition.pos4 = createVector(event.x, event.y);
            }
            this.secondSpotPointSet = true;
          }
          //console.log(this.firstSpotPointSet && this.secondSpotPointSet)
          if (this.firstSpotPointSet &&
            this.secondSpotPointSet) {
            let spotWidth =
              abs(DevelopmentTools.clickPosition.pos4.x -
                DevelopmentTools.clickPosition.pos3.x);
            let spotHeight =
              abs(DevelopmentTools.clickPosition.pos4.y -
                DevelopmentTools.clickPosition.pos3.y);
            if (this.mode == GlobalConstants.Enums.spotType.OBSTACLE) {
              let spotWidth =
                abs(DevelopmentTools.clickPosition.pos4.x -
                  DevelopmentTools.clickPosition.pos3.x);
              let spotHeight =
                abs(DevelopmentTools.clickPosition.pos4.y -
                  DevelopmentTools.clickPosition.pos3.y);
              let tmpSpot = new Spot(
                DevelopmentTools.clickPosition.pos3.x,
                DevelopmentTools.clickPosition.pos3.y,
                spotWidth, spotHeight, color(255, 0, 0, 100));
              tmpSpot.setObstacle();
              this.maze.addSpot(tmpSpot);
            } else if (this.mode == GlobalConstants.Enums.spotType.START && !this.maze.startPlaced) {
              let spotWidth =
                abs(DevelopmentTools.clickPosition.pos4.x -
                  DevelopmentTools.clickPosition.pos3.x);
              let spotHeight =
                abs(DevelopmentTools.clickPosition.pos4.y -
                  DevelopmentTools.clickPosition.pos3.y);
              let tmpSpot = new Spot(
                DevelopmentTools.clickPosition.pos3.x,
                DevelopmentTools.clickPosition.pos3.y,
                spotWidth, spotHeight, color(0, 0, 255, 100));
              tmpSpot.setStart();
              this.maze.addSpot(tmpSpot);
              this.maze.startPlaced = true;
            } else if (this.mode == GlobalConstants.Enums.spotType.END && !this.maze.endPlaced) {

              let tmpSpot = new Spot(
                DevelopmentTools.clickPosition.pos3.x,
                DevelopmentTools.clickPosition.pos3.y,
                spotWidth, spotHeight, color(0, 255, 0, 100));
              tmpSpot.setEnd();
              this.maze.addSpot(tmpSpot);
              this.maze.endPlaced = true;
            }
            this.firstSpotPointSet = false;
            this.secondSpotPointSet = false;
            //console.log("meow");
          }
        }
      }
    }

    windowResizedEvent(event) {
      // alert("type: " + event.type);
      // alert("newWindowSize.width: " + event.newWindowSize.width);
      // alert("newWindowSize.height: " + event.newWindowSize.height);
      //console.log(event);
    }

    draw() {
      //console.log(this.maze.getBackgroundColor())
      //console.log(this.)
      //console.dir(this.maze);
      scale(width / this.maze.originalWidth,
        height / this.maze.originalHeight);
      if (this.importing == true) {
        if (GlobalConstants.Flags.imported == true) {
          this.maze = GlobalConstants.Extras.maze;
          this.importing = false;
          GlobalConstants.Flags.imported = false;
          this.mazeLoaded();
        }
      }
      background(this.maze.getBackgroundColor());
      this.walls = this.maze.getWalls();
      this.spots = this.maze.getSpots();
      //background(240);

      for (let i = 0; i < cells.length; i++) {
        cells[i].draw();
      }
      if (GlobalConstants.Settings.devMode) {
        DevelopmentTools.grid(10);
        DevelopmentTools.debugExtra("Snap Mode: " + this.snapMode)
        DevelopmentTools.debugInfo(this.player1);

        DevelopmentTools.debugExtra("Walls.length: " + this.walls.length);
        //DevelopmentTools.debugExtra("cells.length: " + cells.length)
        DevelopmentTools.reset();
      }
      if (!this.modal.isActive()) {
        if (this.player1.update(this.walls, this.spots) == "done") {
          let nextMaze = worldMaze.mazeCompleted();
          console.log(nextMaze)
          this.maze = nextMaze;
          for (let i = 0; i < this.maze.spots.length; i++) {
            if (this.maze.spots[i].getType() == "start") {
              this.player1.pos = createVector(
                this.maze.spots[i].x +
                (this.maze.spots[i].width / 2),
                this.maze.spots[i].y +
                (this.maze.spots[i].height / 2));
            }
          }
        }
      }
      this.player1.draw();
      for (let i = 0; i < this.walls.length; i++) {
        this.walls[i].draw();
      }
      for (let j = 0; j < this.spots.length; j++) {
        this.spots[j].draw();
      }
      this.modeStatus.draw();
      this.addNewMazeBtn.draw();
      if (this.modal != null)
        if (this.modal.isActive())
          this.modal.draw();
      if (this.contextMenuModal.isActive())
        this.contextMenuModal.draw();
      //this.toast.show();
    }

    cleanUp() {
      console.log("Cleaning up MazeScene");
      this.modal = null;
      this.walls.length = 0;
      this.player1 = null;
      this.maze = null;
      cells.length = 0;
    }

    getFlags() {
      return SceneManagement.Flags.flags;
    }

    resolveFlags() {
      SceneManagement.Flags.flags.length = 0;
    }
  }