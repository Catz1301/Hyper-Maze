class GlobalConstants {
  static Settings() {
    Settings.initialized = false;
    Settings.devMode;
    Settings.darkMode;
    Settings.soundMode;
  }

  static Constants() {
    Constants.canvasWidth;
    Constants.canvasHeight;
    Constants.startTimeUnixEpochMillis;
  }
  static Colors() {
    Colors.background_Light;
    Colors.background_Dark;
    Colors.player;
    Colors.wall_Light;
    Colors.wall_Dark;
    Colors.buttonFill;
    Colors.text_Light;
    Colors.text_Dark
  }

  static Enums() {
    Enums.spotType;
    Enums.Toast
  }

  static Flags() {
    Flags.loaded;
  }

  static Modals() {
    Modals.mazeSceneRightClickModal;
  }

  static Layouts() {
    Layouts.mazeSettings_layout;
    Layouts.contextMenu_layout;
  }

  static Extras() {
    Extras.maze;
    Extras.chunkString;
    Extras.index;
    Extras.mazeExtras;
    Extras.mazeExtrasInit;
    Extras.BGM;
  }

  static TempVars() {
    TempVars.lastWallId;
    TempVars.wallIdOffset;
  }

  static init() {
    GlobalConstants.Colors.background_Light = 240;
    GlobalConstants.Colors.background_Dark = 25.5;
    GlobalConstants.Colors.player = 0x00ff00;
    GlobalConstants.Colors.wall_Light = 0;
    GlobalConstants.Colors.wall_Dark = 255;
    GlobalConstants.Colors.buttonFill = 127;
    GlobalConstants.Colors.text_Light = 0;
    GlobalConstants.Colors.text_Dark = 255;
    GlobalConstants.Layouts.mazeSettings_layout = null;
    GlobalConstants.Layouts.contextMenu_layout = null;


    GlobalConstants.Constants.canvasWidth = windowWidth;
    GlobalConstants.Constants.canvasHeight = windowHeight;
    GlobalConstants.Constants.startTimeUEM = startTimeUnixEpochTimeMillis;
    GlobalConstants.Enums.spotType = new Enum(['OBSTACLE', 'START', 'END']);
    GlobalConstants.Enums.Toast = new Enum(['LENGTH_SHORT', 'LENGTH_LONG']);

    GlobalConstants.Extras.chunkString = function(str, length) {
      return str.match(new RegExp('.{1,' + length + '}', 'g'));
    };
    GlobalConstants.Extras.index = function(x, y) {
      if (GlobalConstants.Extras.mazeExtras.cols && GlobalConstants.Extras.mazeExtras.rows) {
        if (x < 0 || y < 0 || x > GlobalConstants.Extras.mazeExtras.cols - 1 || y > GlobalConstants.Extras.mazeExtras.rows - 1) {
          return -1;
        }
        return x + y * GlobalConstants.Extras.mazeExtras.cols;
      }
      return undefined;
    };
    GlobalConstants.Extras.mazeExtrasInit = function(rows, cols) {
      GlobalConstants.Extras.mazeExtras = {
        rows,
        cols
      };
    };
    GlobalConstants.Extras.mazeExtras = undefined;
    GlobalConstants.Extras.BGM = new BGM();
    GlobalConstants.Flags.loaded = false;

    GlobalConstants.TempVars.lastWallId = 0;
    GlobalConstants.TempVars.wallIdOffset = 0;
  }
}