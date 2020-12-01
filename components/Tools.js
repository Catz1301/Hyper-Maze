class Tools {
  static tools() {
    
    tools.undo;
    tools.undoStack;
    tools.redo;
    tools.redoStack;
    tools.addAction;
  }
  
  static init() {
    Tools.tools.undoStack = [];
    Tools.tools.redoStack = [];
    
    /**
     * Represents a book.
     * @constructor
     * @param {Object} undoActionFunc - The function containing the undo action code (This can be anything, even `console.log('Hello world!');`.
     * @param {*[]} [params] - Parameters to pass to undoActionFunc.
     */
    Tools.tools.undo = function(undoActionFunc, params = []) {
      if (Tools.tools.undoStack.length > 0) {
let action = Tools.tools.undoStack[Tools.tools.undoStack.length];
        if (params.length != 0)
          undoActionFunc(action, params);
        Tools.tools.redo.push(StackTools.tools.undoStack[Tools.tools.undoStack.length]);
        Tools.tools.undoStack.pop();
      }
    }
    
    Tools.tools.redo = function() {
      if (Tools.tools.redoStack.length > 0) {
        Tools.tools.undo.push(StackTools.tools.redoStack[Tools.tools.redoStack.length]);
        Tools.tools.redoStack.pop();
      }
    }
    
    Tools.tools.addAction = function(action) {
      if (Tools.tools.undoStack.length > 0) {
        Tools.tools.undo.push(action);
      }
      // if (action.actionName == "addWall")
    }
  }
}