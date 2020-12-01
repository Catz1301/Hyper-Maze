class SceneManagement {
  constructor() {
    this.activeScene;
    this.sceneStack = [];
  }
  
  switchScene(sceneCurrent, sceneNext, keepCurrentScene = false) {
    scenesInitialized = false;

    //console.log(keepCurrentScene)
    //console.log(sceneCurrent);
    if (!keepCurrentScene) {
      sceneCurrent.cleanUp();
    } else {
      sceneStack.push(activeScene);
    }
    sceneNext.setup();
    activeScene = sceneNext;
  }
  
  exitScene() {
    console.dir(sceneStack[sceneStack.length-1]);
    activeScene.cleanUp();
    let nextScene = null;
    if (sceneStack.length != 0) {
      nextScene = sceneStack[sceneStack.length-1];
    } else {
      nextScene = new MazeScene();
      nextScene.setup();
    }
    //console.dir(nextScene);
    sceneStack.pop();
    if (nextScene != null)
      activeScene = nextScene;
  }
  
	static requestVarFromActiveScene(varName) {
		return activeScene[varName];
	}
	
  static Flags() {
    Flags.flags;
  }
  
  static init() {
    SceneManagement.Flags.flags = [];
  }
}