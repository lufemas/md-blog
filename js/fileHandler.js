

function loadFile(filePath, callback){

    let xhr = new XMLHttpRequest();
    xhr.open("GET", filePath, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(`Response file: \n ${xhr.responseText} \n `);
          if(callback) callback(xhr.responseText)
        } else {
          console.error(xhr.statusText);
        }
      }
    }
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null); 
  }
  