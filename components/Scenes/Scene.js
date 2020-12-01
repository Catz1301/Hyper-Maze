class Scene {
  constructor() {
    
  }
  
  setup() {
    this.flags = [];
    this.paused = false;
  }
  
  handleEvents(event) {
    if (event.type != "mousemove")
      console.log(event);
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
  
  keyPressedEvent(event) {
    
  }
  
  mouseMovedEvent() {
    
  }
  
  windowResizedEvent(event) {
    
  }
  
  draw() {
    
  }
  
  getFlags() {
    return this.flags;
  }
  
  resolveFlags() {
    this.flags.length = 0;
  }
}