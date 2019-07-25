const classifier = ml5.imageClassifier("MobileNet", modelLoaded);

function modelLoaded() {
  document.getElementById("notif").innerHTML = "Model Loaded";
  document.getElementById("notif").classList.add('is-success');
}

function previewFile() {
  var preview = document.querySelector(".previewimg"); //selects the query named img
  var file = document.querySelector("input[type=file]").files[0]; //sames as here
  var reader = new FileReader();

  reader.onloadend = function() {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  } else {
    preview.src = "";
  }
}

previewFile(); //calls the function named previewFile()



document.getElementById("classify").addEventListener("click", function(){
  classifier.predict(document.querySelector(".previewimg"), function(err, results) {
    var newNotification = document.createElement("div");
    newNotification.className = "notification";
    newNotification.innerHTML = "Couldn't classify the image"
    newNotification.classList.add('is-danger');
    document.getElementById("classificationarea").appendChild(newNotification);
    console.log(results);
    for(var i = 0; i < results.length; i++) {
      if(results[i].confidence > 0.80) {
        newNotification.innerHTML= results[i].label + " " + Math.floor(results[i].confidence*100) + "%";
        newNotification.classList.remove('is-danger');
        newNotification.classList.add('is-success');
        console.log(results[i]);
      }
    }
  });
}); 
