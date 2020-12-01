class FileInput extends Button {
  constructor(x, y, width, height, text, id, show = true) {
    super(x, y, width, height, text, id);
    this.show = false;
    //this.callback = callback;
    this.f = null;
  }
  
  click() {
    if (this.show) {
      let fileHandler = function(file) {
        this.f = file;
      }
      let fileInputElt = createFileInput(fileHandler.bind(this));
      fileInputElt.hide();
      fileInputElt.elt.click();
    }
  }
  
  clearFile() {
    this.f = null;
  }
  
  getFile() {
    return this.f;
  }
  
  draw() {
    if (this.show) {
      super.draw();
    }
  }
}