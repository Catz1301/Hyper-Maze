class SettingsScene {
  constructor() {
    this.backgroundColor = 0;
    // checkboxes
    this.soundMode = new Checkbox(15, 15, GlobalConstants.Settings.soundMode, "Sound");
    this.devMode = new Checkbox(15, 40, GlobalConstants.Settings.devMode, "Creator Mode");
    this.darkMode = new Checkbox(15, 65, GlobalConstants.Settings.darkMode, "Dark Mode");
    this.toast = Toast.makeText("All mazes cleared!",
                                true);
    // buttons
    this.clearMazesBtn = new Button(15, 90, 100, 25, "Clear Mazes", "clrMazes", 1.5);

    this.UIComponents = [];
    this.initialized = false;
  }
  // this.setup = function() {
  //   this.init();
  // }

  setup() {
    scenesInitialized = true;
    this.initialized = true;
    this.flags = [];
    this.paused = false;
    this.displayToast = false;
    if (GlobalConstants.Settings.initialized == false)
      console.error("Settings must be initialized first!");
    else {
      if (GlobalConstants.Settings.darkMode == true) {
        this.backgroundColor = 51;
      } else {
        this.backgroundColor = 231;
      }

      this.soundMode.changed(this.soundModeChanged);
      this.devMode.changed(this.devModeChanged);
      this.darkMode.changed(this.darkModeChanged);
      this.clearMazesBtn.onClick(function(p1) {
        removeItem('Mazes');
        p1.displayToast = true;
        worldMaze.clearMazes();
      }, [this]);
      this.UIComponents[this.UIComponents.length] = this.soundMode;
      this.UIComponents[this.UIComponents.length] = this.devMode;
      this.UIComponents[this.UIComponents.length] = this.darkMode;
      this.UIComponents[this.UIComponents.length] = this.clearMazesBtn;
    }
  }

  soundModeChanged() {
    GlobalConstants.Settings.soundMode = this.checked();
    GlobalConstants.Extras.BGM.update();
  }
  devModeChanged() {
    GlobalConstants.Settings.devMode = this.checked();
    console.log("Dev mode: " + GlobalConstants.Settings.devMode)
  }
  darkModeChanged() {
    GlobalConstants.Settings.darkMode = this.checked();
  }

  handleEvent(event) {
    if (event.type == "click") {
      this.mouseClickedEvent(event);
    } else if (event.type == "keydown") {
      this.keyPressedEvent(event);
    }
  }

  mouseClickedEvent(event) {
    for (let i = 0; i < this.UIComponents.length; i++) {
      this.UIComponents[i].handleEvent(event);
    }
    // this.soundMode.handleEvent(event);
    // this.devMode.handleEvent(event);
    // this.darkMode.handleEvent(event);
  }

  keyPressedEvent(event) {
    if (event.which === 27) {
      activeSceneNeedsChecking = true;
      let flag1 = {
        "flag": "exitScene"
      };
      SceneManagement.Flags.flags.push(flag1);
    }
  }

  draw() {
    if (GlobalConstants.Settings.darkMode)
      background(
        GlobalConstants.Colors.background_Dark
      );
    else
      background(
        GlobalConstants.Colors.background_Light
      );
    for (let i = 0; i < this.UIComponents.length; i++) {
      this.UIComponents[i].draw();
    }
    // this.soundMode.draw();
    // this.devMode.draw();
    // this.darkMode.draw();
    
    if (this.displayToast) {
      this.toast.show();
    }
  }

  cleanUp() {

  }

  getFlags() {
    return SceneManagement.Flags.flags;
  }

  resolveFlags() {
    SceneManagement.Flags.flags.length = 0;
  }
}