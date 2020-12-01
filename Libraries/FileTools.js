class FileTools {
  /*
    openFile or getFile
    
    saveFile
    
    saveFileChrome <-- only if experimental setting is on.
    
  */

  static openFile(newObj) {
    let fileHandler;
    const fileInput = createFileInput(function(file) {
      // Destructure the one-element array.
      fileHandler = file;
      // Do something with the file handle.
    });
  }

  static getFile() {
    
  }
//   static getFile() {
//     const handleFileSelect = async function(event) {
//       for (const file of event.target.files) {
//         if (/^text\//.test(file.type) || file.type === 'application/json') {
//           let reader = new FileReader();
//           reader.onload = function(e) {
//             var p5file = new p5.File(file);
//             if (p5file.file.type === 'application/json') {
//               // Parse JSON and store the result in data
//               p5file.data = JSON.parse(e.target.result);
//             } else if (p5file.file.type === 'text/xml') {
//               // Parse XML, wrap it in p5.XML and store the result in data
//               const parser = new DOMParser();
//               const xml = parser.parseFromString(e.target.result, 'text/xml');
//               p5file.data = new p5.XML(xml.documentElement);
//             } else {
//               p5file.data = e.target.result;
//             }
//           };
//           return await Promise.resolve(reader.readAsText(file));
//         } else if (!/^(video|audio)\//.test(file.type)) {
//           let reader = new FileReader();
//           reader.onload = function(e) {
//             var p5file = new p5.File(file);
//             if (p5file.file.type === 'application/json') {
//               // Parse JSON and store the result in data
//               p5file.data = JSON.parse(e.target.result);
//             } else if (p5file.file.type === 'text/xml') {
//               // Parse XML, wrap it in p5.XML and store the result in data
//               const parser = new DOMParser();
//               const xml = parser.parseFromString(e.target.result, 'text/xml');
//               p5file.data = new p5.XML(xml.documentElement);
//             } else {
//               p5file.data = e.target.result;
//             }
//           };
//           return await reader.readAsDataURL(file);
//         } else {
//           var fl = new p5.File(file);
//         }
//       }
//     }

//     // If File API's are not supported, throw Error
//     if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
//       console.log(
//         'The File APIs are not fully supported in this browser. Cannot create element.'
//       );
//       return;
//     }

//     const fileInput = document.createElement('input');
//     fileInput.setAttribute('type', 'file');
//     // if (multiple) fileInput.setAttribute('multiple', true);
//     fileInput.addEventListener('change', handleFileSelect, false);
//     let el = FileTools.addElement(fileInput, p5);
//     el.hide();
//     el.elt.click();
//   }

//   static _load(f, callback) {
//     // Text or data?
//     // This should likely be improved
//     if (/^text\//.test(f.type) || f.type === 'application/json') {
//       FileTools._createLoader(f, callback).readAsText(f);
//     } else if (!/^(video|audio)\//.test(f.type)) {
//       FileTools._createLoader(f, callback).readAsDataURL(f);
//     } else {
//       var file = new p5.File(f);
//       file.data = URL.createObjectURL(f);
//       callback(file);
//     }
//   }

//   static addElement(elt, pInst, media) {
//     var node = pInst._userNode ? pInst._userNode : document.body;
//     node.appendChild(elt);
//     var c = media ? new p5.MediaElement(elt, pInst) : new p5.Element(elt, pInst);
//     //pInst._elements.push(c);
//     return c;
//   }
}