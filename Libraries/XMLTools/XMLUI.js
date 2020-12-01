class XMLUI {
  static parseUILayoutFile() {
    let UIComponents = [];
    let fileSelected = false;
    let modal;
    let fileInput = createFileInput(function(file) {
      let modalX;// = modal.x;
      let modalY;// = modal.y;
      if (file.type == "text") {
        if (file.subtype == "xml") {
          if (file.size > 0) {
            if (file.data.getAttributeCount() == 2) {
              modalX = file.data.getNum('xoff');
              modalY = file.data.getNum('yoff');
            }
            //loadXML(file, function(xml) {
              let components = file.data.getChildren();
              for (let i = 0; i < components.length; i++) {
                let UIComponent;
                if (components[i].getName() == "checkbox") {
                  let chkBox_x, chkBox_y, chkBox_value, chkBox_label, chkBox_id;
                  if (components[i].hasAttribute('x'))
                    chkBox_x = components[i].getNum('x');
                  else {
                    console.error("ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('y'))
                    chkBox_y = components[i].getNum('y');
                  else {
                    console.error("ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('value'))
                    chkBox_value = eval(components[i].getString('value'));
                  else {
                    console.error("ERROR: 'value' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('label'))
                    chkBox_label = components[i].getString('label');
                  else {
                    console.error("ERROR: 'label' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('id'))
                    chkBox_id = components[i].getString('id');
                  else {
                    console.error("ERROR: 'id' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (chkBox_x && chkBox_y && chkBox_value && chkBox_label && chkBox_id)
                    UIComponent =
                      new Checkbox(modalX + chkBox_x, modalY + chkBox_y, chkBox_value, chkBox_label, chkBox_id);
                  
                }
                else if (components[i].getName() == "Button"){
                  let btn_x, btn_y,
                      btn_width, btn_height,
                      btn_text, btn_id;
                  if (components[i].hasAttribute('x'))
                    btn_x = components[i].getNum('x');
                  else {
                    console.error("ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('y'))
                    btn_y = components[i].getNum('y');
                  else {
                    console.error("ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('width'))
                    btn_width = components[i].getNum('width');
                  else {
                    console.error("ERROR: 'width' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('height'))
                    btn_height = components[i].getNum('height');
                  else {
                    console.error("ERROR: 'height' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('text'))
                    btn_text = components[i].getNum('text');
                  else {
                    console.error("ERROR: 'text' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('id'))
                    btn_id = components[i].getString('id');
                  else {
                    console.error("ERROR: 'id' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  let btn_clickAction = null, 
                      btn_clickActionParams = null, 
                      btn_fillColor = 83, 
                      btn_cornerRadius = (
                        new CornerRadius(0, 0, 0, 0)), 
                      btn_textColor = 255;
                  
                  if (components[i].hasAttribute('clickAction'))
                    btn_clickAction = eval(components[i].getString('clickAction'));
                  
                  if (
              components[i].hasAttribute('clickActionParams')
                  )
                    btn_clickActionParams = 
            eval(components[i].getString('clickActionParams'))
                  
                  if (components[i].hasAttribute('fillColor'))
                    btn_fillColor = eval(
                      components[i].getString('fillColor')
                    );
                  
                  if (
                    components[i].hasAttribute('cornerRadius')
                  )
                    btn_cornerRadius = eval(
                      components[i].getString('cornerRadius')
                    );
                  
                  if (components[i].hasAttribute('textColor'))
                    btn_textColor = eval(
                      components[i].getString('textColor')
                    );
                  if (btn_x && btn_y &&
                      btn_width && btn_height &&
                      btn_text && btn_id && btn_clickAction)
                    UIComponent =
new Button(modalX + btn_x, modalY + btn_y, btn_width, btn_height, btn_text, btn_id, btn_clickAction, btn_clickActionParams, btn_fillColor, btn_cornerRadius, btn_textColor);
                }
                else if (components[i].getName() == "label") {
                let lbl_x, lbl_y, lbl_width, lbl_height, lbl_text;
                  if (components[i].hasAttribute('x'))
                    lbl_x = components[i].getNum('x');
                  else {
                    console.error("ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('y'))
                    lbl_y = components[i].getNum('y');
                  else {
                    console.error("ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('width'))
                    lbl_width = components[i].getNum('width');
                  else {
                    console.error("ERROR: 'width' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('height'))
                    lbl_height = components[i].getNum('height');
                  else {
                    console.error("ERROR: 'height' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('text'))
                    lbl_text = components[i].getNum('text');
                  else {
                    console.error("ERROR: 'text' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  let lbl_fillColor = 83, lbl_cornerRadius = (new CornerRadius(0, 0, 0, 0)), lbl_textColor = 255;
                  if (components[i].hasAttribute('fillColor'))
                    lbl_fillColor = components[i].getString('fillColor')
                  
                  if (
                    components[i].hasAttribute('cornerRadius')
                  )
                    lbl_cornerRadius = eval(
                      components[i].getString('cornerRadius')
                    );
                  
                  if (components[i].hasAttribute('textColor'))
                    lbl_textColor = eval(
                      components[i].getString('textColor')
                    );
                  
                  UIComponent = new Label(modalX + lbl_x, modalY + lbl_y, lbl_width, lbl_height, lbl_text, lbl_fillColor, lbl_cornerRadius, lbl_textColor);
                }
                else if (components[i].getName() == 
                         "input") {
                  if (
                   components[i].hasAttribute("type")
                  )
                    if (
                  components[i].getString('type') ==
                      "number"
                    ) {
                      let nib_x, nib_y, nib_width, nib_height, nib_id, nib_value = "0", nib_maxVal = 100;
                      if (components[i]
                           .hasAttribute('x'))
                        nib_x = components[i]
                                 .getNum('x');
                      else {
                        console.error(
                          "ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                      }
                      if (components[i]
                           .hasAttribute('y'))
                        nib_y = components[i]
                                 .getNum('y');
                      else {
                        console.error(
                          "ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('width'))
                        nib_width = components[i]
                                 .getNum('width');
                      else {
                        console.error(
                          "ERROR: 'width' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('height'))
                        nib_height = components[i]
                                 .getNum('height');
                      else {
                        console.error(
                          "ERROR: 'height' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('id'))
                        nib_id = components[i]
                                 .getString('id');
                      else {
                        console.error(
                          "ERROR: 'id' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('value'))
                        nib_value = components[i]
                                 .getString('value');
                      if (components[i]
                           .hasAttribute('maxValue'))
                        nib_maxVal = components[i]
                                 .getNum('maxValue');
                      //console.log(modalX);
                      //console.log(modalY);
                      if (nib_x && nib_y &&
                          nib_width && nib_height &&
                          nib_id && 
                          nib_value && nib_maxVal)
                        UIComponent = 
                          new NumberInputBox(modalX + nib_x, modalY + nib_y, nib_width, nib_height, nib_id, nib_value, nib_maxVal);
                    }
                }
                UIComponents.push(UIComponent);
              }
            //})
          }
        }
      }
      fileSelected = true;
    });
    fileInput.hide();
    fileInput.elt.click()
    //console.log(fileInput.elt);
    return UIComponents;
  }
  
  static parseUILayoutObj(file) {
    //console.dir(file);
    //return;
    //console.log(file)
    let UIComponents = [];
    let fileSelected = false;
    let modal;
    //let fileInput = createFileInput(function(file) {
      let modalX;// = modal.x;
      let modalY;// = modal.y;
      //if (file.type == "text") {
        //if (file.subtype == "xml") {
          //if (file.size > 0) {
            if (file.getAttributeCount() == 2) {
              modalX = file.getNum('xoff');
              modalY = file.getNum('yoff');
            }
            //loadXML(file, function(xml) {
              let components = file.getChildren();
              for (let i = 0; i < components.length; i++) {
                let UIComponent;
                if (components[i].getName() == "checkbox") {
                  let chkBox_x, chkBox_y, chkBox_value, chkBox_label, chkBox_id;
                  if (components[i].hasAttribute('x'))
                    chkBox_x = components[i].getNum('x');
                  else {
                    console.error("ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('y'))
                    chkBox_y = components[i].getNum('y');
                  else {
                    console.error("ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('value'))
                    chkBox_value = eval(components[i].getString('value'));
                  else {
                    console.error("ERROR: 'value' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('label'))
                    chkBox_label = components[i].getString('label');
                  else {
                    console.error("ERROR: 'label' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('id'))
                    chkBox_id = components[i].getString('id');
                  else {
                    console.error("ERROR: 'id' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (chkBox_x && chkBox_y && chkBox_value && chkBox_label && chkBox_id)
                    UIComponent =
                      new Checkbox(modalX + chkBox_x, modalY + chkBox_y, chkBox_value, chkBox_label, chkBox_id);
                  
                }
                else if (components[i].getName() == "button"){
                  //console.warn("button")
                  let btn_x, btn_y,
                      btn_width, btn_height,
                      btn_text, btn_id;
                  if (components[i].hasAttribute('x'))
                    btn_x = components[i].getNum('x');
                  else {
                    console.error("ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('y'))
                    btn_y = components[i].getNum('y');
                  else {
                    console.error("ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('width'))
                    btn_width = components[i].getNum('width');
                  else {
                    console.error("ERROR: 'width' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('height'))
                    btn_height = components[i].getNum('height');
                  else {
                    console.error("ERROR: 'height' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('text'))
                    btn_text = components[i].getString('text');
                  else {
                    console.error("ERROR: 'text' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('id'))
                    btn_id = components[i].getString('id');
                  else {
                    console.error("ERROR: 'id' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  let btn_clickAction = null, 
                      btn_clickActionParams = null, 
                      btn_fillColor = 83, 
                      btn_cornerRadius = (
                        new CornerRadius(0, 0, 0, 0)), 
                      btn_textColor = 255,
                      btn_textScale = 1.5;
                  
                  if (components[i].hasAttribute('textScale'))
                    btn_textScale = components[i].getNum('textScale');
                  
                  if (components[i].hasAttribute('clickAction'))
                    btn_clickAction = eval(components[i].getString('clickAction'));
                  
                  if (
              components[i].hasAttribute('clickActionParams')
                  )
                    btn_clickActionParams = 
            eval(components[i].getString('clickActionParams'))
                  
                  if (components[i].hasAttribute('fillColor'))
                    btn_fillColor = eval(
                      components[i].getString('fillColor')
                    );
                  
                  if (
                    components[i].hasAttribute('cornerRadius')
                  )
                    btn_cornerRadius = eval(
                      components[i].getString('cornerRadius')
                    );
                  
                  if (components[i].hasAttribute('textColor'))
                    btn_textColor = eval(
                      components[i].getString('textColor')
                    );
                  // console.groupCollapsed("btnValues");
                  // console.warn('btn_x: ' + btn_x);
                  // console.warn('btn_y: ' + btn_y);
                  // console.warn('btn_width: ' + btn_width);
                  // console.warn('btn_height: ' + btn_height);
                  // console.warn('btn_text: ' + btn_text);
                  // console.warn('btn_id: ' + btn_id);
                  // console.warn('btn_clickAction: ' + btn_clickAction);
                  // console.warn('btn_clickActionParams: ' + btn_clickActionParams);
                  // console.warn('btn_fillColor: ' + btn_fillColor);
                  // console.warn('btn_cornerRadius: ' + btn_cornerRadius);
                  // console.warn(btn_cornerRadius);
                  // console.warn('btn_textColor: ' + btn_textColor);
                  // console.groupEnd();
                  if (btn_x != undefined &&
                      btn_y != undefined &&
                      btn_width && btn_height &&
                      btn_text && btn_id &&
                      btn_fillColor &&
                      btn_cornerRadius!=undefined &&
                      btn_textColor &&
                      btn_textScale != undefined)
                    UIComponent = new Button(modalX + btn_x, modalY + btn_y, btn_width, btn_height, btn_text, btn_id, btn_textScale, btn_clickAction, btn_clickActionParams, btn_fillColor, btn_cornerRadius, btn_textColor);
                  //console.log(UIComponent)
                }
                else if (components[i].getName() == "label") {
                let lbl_x, lbl_y, lbl_width, lbl_height, lbl_text;
                  if (components[i].hasAttribute('x'))
                    lbl_x = components[i].getNum('x');
                  else {
                    console.error("ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('y'))
                    lbl_y = components[i].getNum('y');
                  else {
                    console.error("ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('width'))
                    lbl_width = components[i].getNum('width');
                  else {
                    console.error("ERROR: 'width' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('height'))
                    lbl_height = components[i].getNum('height');
                  else {
                    console.error("ERROR: 'height' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  if (components[i].hasAttribute('text'))
                    lbl_text = components[i].getString('text');
                  else {
                    console.error("ERROR: 'text' is not specified in xml file provided! Element " + (2+i));
                  }
                  
                  let lbl_fillColor = 83, lbl_cornerRadius = (new CornerRadius(0, 0, 0, 0)), lbl_textColor = 255;
                  if (components[i].hasAttribute('fillColor'))
                    lbl_fillColor = components[i].getString('fillColor')
                  
                  if (components[i].hasAttribute('cornerRadius'))
                    lbl_cornerRadius = components[i].getString('cornerRadius')
                  
                  if (components[i].hasAttribute('textColor'))
                    lbl_textColor = components[i].getString('textColor');
                  
                  UIComponent = new Label(modalX + lbl_x, modalY + lbl_y, lbl_width, lbl_height, lbl_text, lbl_fillColor, lbl_cornerRadius, lbl_textColor);
                }
                else if (components[i].getName() == 
                         "input") {
                  if (
                   components[i].hasAttribute("type")
                  )
                    if (
                  components[i].getString('type') ==
                      "number"
                    ) {
                      let nib_x, nib_y, nib_width, nib_height, nib_id, nib_value = "0", nib_maxVal = 100;
                      if (components[i]
                           .hasAttribute('x'))
                        nib_x = components[i]
                                 .getNum('x');
                      else {
                        console.error(
                          "ERROR: 'x' is not specified in xml file provided! Element " + (2+i));
                      }
                      if (components[i]
                           .hasAttribute('y'))
                        nib_y = components[i]
                                 .getNum('y');
                      else {
                        console.error(
                          "ERROR: 'y' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('width'))
                        nib_width = components[i]
                                 .getNum('width');
                      else {
                        console.error(
                          "ERROR: 'width' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('height'))
                        nib_height = components[i]
                                 .getNum('height');
                      else {
                        console.error(
                          "ERROR: 'height' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('id'))
                        nib_id = components[i]
                                 .getString('id');
                      else {
                        console.error(
                          "ERROR: 'id' is not specified in xml file provided! Element " + (2+i));
                      }
                      
                      if (components[i]
                           .hasAttribute('value'))
                        nib_value = components[i]
                                 .getString('value');
                      if (components[i]
                           .hasAttribute('maxValue'))
                        nib_maxVal = components[i]
                                 .getNum('maxValue');
                      //console.log(modalX);
                      //console.log(modalY);
                      if (nib_x && nib_y &&
                          nib_width && nib_height &&
                          nib_id &&
                          nib_value && nib_maxVal)
                        UIComponent = 
                          new NumberInputBox(modalX + nib_x, modalY + nib_y, nib_width, nib_height, nib_id, nib_value, nib_maxVal);
                    }
                }
                UIComponents.push(UIComponent);
              }
            //})
          //}
        //}
      //}
      //fileSelected = true;
    //});
    //fileInput.hide();
    //fileInput.elt.click()
    //console.log(fileInput.elt);
    return UIComponents;
  }
}