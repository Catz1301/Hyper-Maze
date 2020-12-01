class Unzipper {
  static unzip(file) {
    var jsZip = new JSZip();
    jsZip.loadAsync(file).then(function(zip) {
      Object.keys(zip.files).forEach(function(filename) {
        zip.files[filename].async('string').then(function(fileData) {
          console.log(fileData) // These are your file contents      
        })
      })
    })
  }
}