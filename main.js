Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
    flip_horiz: true
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (image){
        document.getElementById("result").innerHTML = "<img id= 'picture' src = "+image+">";
    })
}

console.log("ml5 version: "+ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0oFOU5AvI/model.json",model_loaded);

function model_loaded() {
    console.log("Model Loaded")
}

function check() {
    image = document.getElementById("picture");
    classifier.classify(image, got_result)
}

function got_result(error , result) {
    if(error){
        console.error(error);
    }else{
        console.log(result)
        document.getElementById("person_name").innerHTML = result[0].label;
        document.getElementById("person_accuracy").innerHTML = result[0].confidence.toFixed(2);
    }
}