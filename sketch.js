/* eslint-disable no-undef, no-unused-vars, esversion: 8
var player1;
var wall1;
var walls = [];
var devMode = true;
var firstPointSet = false;
var secondPointSet = false;
var freeMode = false;
var maze;
var w = 30;
var cols;
var rows;
//var butt;
var cells = [];
*/

var scenesInitialized = false;
var activeSceneNeedsChecking = false;
var activeScene;
var sceneStack = [];
var settings = null;
var shift = false;
var sceneManager;
var startTimeUnixEpochTimeMillis;
var DEBUG = false;
var DEBUG_LITE = false;

var worldMaze = null;
var cells = [];
var stack = [];


let mazeSettingsLayout;
let contextMenuLayout;

function preload() {
  mazeSettingsLayout = loadXML('components/layout/mazeSettingsLayout.txt');
  contextMenuLayout = loadXML('components/layout/contextMenu.txt');
}

function init() {
  GlobalConstants.init();
  GlobalConstants.Settings.initialized = true;
  GlobalConstants.Settings.devMode = true;
  GlobalConstants.Settings.darkMode = true;
  GlobalConstants.Settings.soundMode = false;
  loadSettings()
}

function loadSettings() {
  settings = getItem('settings');
  if (settings === null) {
    if (GlobalConstants.Settings.initialized) {
      settings = {
        "devMode": GlobalConstants.Settings.devMode,
        "darkMode": GlobalConstants.Settings.darkMode,
        "soundMode": GlobalConstants.Settings.soundMode
      };
      //console.log(settings);
    } else {
      init();
    }
  } else {
    GlobalConstants.Settings.soundMode = settings.soundMode;
    GlobalConstants.Settings.devMode = settings.devMode;
    GlobalConstants.Settings.darkMode = settings.darkMode;
  }
}

function saveSettings() {
  //if (settings != undefined) {
  var settings = {
    "soundMode": GlobalConstants.Settings.soundMode,
    "devMode": GlobalConstants.Settings.devMode,
    "darkMode": GlobalConstants.Settings.darkMode
  }
  if (getItem('settings') === null) {
    storeItem('settings', settings);
  } else {
    removeItem('settings');
    storeItem('settings', settings);
  }
  //}
}

function exportSettings() {
  let settingsExport = getItem('settings');
  if (settingsExport == null) {
    loadSettings();
  }
  saveJSON(settingsExport, 'Hyper chronometer SETTINGS.json');
}

function importSettings() {

}

/*function switchScene(sceneCurrent, sceneNext, keepCurrentScene = false) {
  scenesInitialized = false;

  console.log(keepCurrentScene)
  console.log(sceneCurrent);
  if (!keepCurrentScene) {
    sceneCurrent.cleanUp();
  } else {
    sceneStack.push(activeScene);
  }
  sceneNext.setup();
  activeScene = sceneNext;
}

function exitScene() {
  console.dir(sceneStack[sceneStack.length-1]);
  activeScene.cleanUp();
  let nextScene = null;
  if (sceneStack.length != 0) {
    nextScene = sceneStack[sceneStack.length-1];
  } else {
    nextScene = new MazeScene();
    nextScene.setup();
  }
  console.dir(nextScene);
  sceneStack.pop();
  if (nextScene != null)
    activeScene = nextScene;
}*/

function setup() {
	startTimeUnixEpochTimeMillis = (new Date()).getTime();
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.elt.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
    customContextMenu(e);
  }
  sceneManager = new SceneManagement();
  SceneManagement.init();
  init();
  Tools.init();
  activeScene = new TitleScene();
  activeScene.setup();
  DevelopmentTools.setUp();
  worldMaze = new MazeWorld("default");
  GlobalConstants.Layouts.mazeSettings_layout = mazeSettingsLayout;
  GlobalConstants.Layouts.contextMenu_layout = contextMenuLayout;
  //console.dir(mazeSettingsLayout);
  GlobalConstants.Modals.mazeSceneRightClickModal = new Modal(0, 0, 150, 75, GlobalConstants.Layouts.contextMenu_layout);
  GlobalConstants.Modals.
      mazeSceneRightClickModal.hide();
  userStartAudio();
}

function keyPressed(event) {
  //console.log(event)
  if (keyIsDown(SHIFT)) {
    if (keyCode == 83)
      saveSettings();
    else if (keyCode == 69)
      exportSettings();
  } else {
    //if (keyCode === 27) {
    //switchScene(activeScene, (new SettingsScene()));
    //}
    if (!keyIsDown(SHIFT))
      activeScene.handleEvent(event);
  }
}

function keyReleased() {
  if (keyCode === 16) {
    shift = false;
  }
}

function mouseMoved(event) {
  if (scenesInitialized)
    activeScene.handleEvent(event);
}

function mouseClicked(event) {
  activeScene.handleEvent(event);
}

function mousePressed(event) {
  //console.log(event);
  //event.preventDefault();
  activeScene.handleEvent(event);

  //return false;
}

function draw() {
  // Put drawings here

  activeScene.draw();
  if (activeSceneNeedsChecking) {
    activeSceneNeedsChecking = false;
    let activeSceneFlags = activeScene.getFlags();
    let flags = JSON.parse(JSON.stringify(activeSceneFlags));
    activeScene.resolveFlags();
    if (flags.length != 0) {
      for (let i = 0; i < flags.length; i++) {
        if (flags[i].flag == "switchScene") {
          for (var j = 0; j < flags[i].flagProp.length; j++) {
            if (flags[i].flagProp[j].sceneDestination == "SettingsScene") {
              //activeScene.resolveFlags();
              // let keepCurrentScene;
              // if (flags[i].flagProp[j].keepCurrentScene == true)
              //   keepCurrentScene = true;
              // else 
              //   keepCurrentScene = false;
              // //
              //console.log("Active Scene: ");
              //console.log(activeScene);
              sceneManager.switchScene(activeScene, (new SettingsScene()), flags[i].flagProp[j].keepCurrentScene);
            }
            if (flags[i].flagProp[j].sceneDestination == "MazeScene") {
              //activeScene.resolveFlags();
              // let keepCurrentScene;
              // if (flags[i].flagProp[j].keepCurrentScene == true)
              //   keepCurrentScene = true;
              // else 
              //   keepCurrentScene = false;
              // //
              //console.log("Active Scene: ");
              //console.log(activeScene);
              sceneManager.switchScene(activeScene, (new MazeScene()), flags[i].flagProp[j].keepCurrentScene);
            }
          }
        } else if (flags[i].flag == "exitScene") {
          sceneManager.exitScene();
        }
      }
    }

  }
}

function customContextMenu(event) {
  console.log("Right-clicked!")
  if (activeScene) {
    //console.log(event);
    activeScene.handleEvent(event);
  }
  //return false;
}

// This Redraws the Canvas when resized
windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
  var event = {
    type: 'windowresize',
    newWindowSize: {
      width: windowWidth,
      height: windowHeight
    }
  }
  activeScene.handleEvent(event);
};