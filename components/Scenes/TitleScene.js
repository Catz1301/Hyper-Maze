class TitleScene {
  constructor() {
    this.titleLabel;
    //this.loadMazeWorldBtn;
    this.createMazeWorldBtn;
    this.inputField;
    this.flags = [];
    this.file;
    this.loading = false;
  }

  setup() {
    this.flags = [];
    this.paused = false;

    this.createMazeWorldBtn = new Button((width / 2) - 200, 300, 400, 100, "  Start  ", "startBtn", 1.5, this.createMazeWorldBtnActionClick);
    this.loadMazeWorldBtn = new Button((width / 2) - 200, 425, 400, 100, "  Load  ", "loadBtn", 1.5, this.loadMazeWorldBtnActionClick.bind(this));
    this.titleLabel = new Label(0, 0, 300, 100, "MAZES(plchlder)");
    //FileTools.getFile().then(console.log);
    //console.log(cls)
    this.file = new FileInput(50, 50, 200, 100, "Enter a file", "tstFileInput");
    
  }

  createMazeWorldBtnActionClick() {
    activeSceneNeedsChecking = true;
    let flag1 = {
      "flag": "switchScene",
      "flagProp": [{
          "sceneDestination": "MazeScene",
          "keepCurrentScene": false
        },
        {
          "useless": "yess."
        }
      ]
    };
    SceneManagement.Flags.flags.push(flag1);
  }


  loadMazeWorldBtnActionClick() {
    console.log("TitleScene: ");
    console.log(this);
    //confirm("Do you want to load a maze, or a mazeWorld?\n\n(Confirm will load a mazeWorld,\nWhile cancel will load a maze)");
    this.loading = true;
    CreatorTools.shareImport();
    // let importMW = createFileInput(this.handleFile);
    // importMW.hide();
    // importMW.elt.click();

  }

  handleFile(file) {
    alert("This feature will be implemented soon!" +
      "\nTODO: Implement this feature! :p");

    //     console.log(file);
    //     console.log(file.data);
    //     console.log(typeof(file.data));
    //     if (typeof(file.data) == 'object') {
    //       let data;
    //       try {
    //         data = JSON.parse((file.data));
    //       } catch (e) {
    //         console.error(`${e.name}: ${e.message} on ${e.fileName}; line ${e.lineNumber}, column ${e.columnNumber}.`);
    //         console.debug('Stack trace:');
    //         console.debug(`${e.stack}`);

    //       }
    //       console.debug(data);
    //     }
  }

  handleEvent(event) {
    if (this.modal != null) {
      if (this.modal.handleEvent(event) == "close") {
        this.modal = null;
      }
    }
    this.createMazeWorldBtn.handleEvent(event);
    this.loadMazeWorldBtn.handleEvent(event);
    this.file.handleEvent(event);
    //if (event.type != "mousemove")
    //console.log(event);
    if (event.type === "click")
      this.mousePressedEvent();
    else if (event.type === "keydown")
      this.keyPressedEvent(event);
    else if (event.type === "mousemove")
      this.mouseMovedEvent();
    else if (event.type === "windowresize")
      this.windowResizedEvent(event);
  }

  mousePressedEvent() {

  }

  //   keyPressedEvent(event) {

  //   }

  mouseMovedEvent() {

  }

  keyPressedEvent(event) {

  }

  windowResizedEvent(event) {

  }

  draw() {
    if (this.loading == true) {
      if (GlobalConstants.Flags.loaded == true) {
        activeSceneNeedsChecking = true;
        let flag1 = {
          "flag": "switchScene",
          "flagProp": [{
              "sceneDestination": "MazeScene",
              "keepCurrentScene": false
            },
            {
              "useless": "yess."
            }
          ]
        };
        SceneManagement.Flags.flags.push(flag1);
      }
    }
    if (GlobalConstants.Settings.darkMode)
      background(
        GlobalConstants.Colors.background_Dark
      );
    else
      background(
        GlobalConstants.Colors.background_Light
      );
    this.titleLabel.draw();
    this.createMazeWorldBtn.draw();
    this.loadMazeWorldBtn.draw();
    //this.file.draw();
  }

  cleanUp() {
    this.modal = null;
    this.label = null;
    this.createMazeWorldBtn = null;
    
  }

  getFlags() {
    return SceneManagement.Flags.flags;
  }

  resolveFlags() {
    SceneManagement.Flags.flags.length = 0;
  }
}