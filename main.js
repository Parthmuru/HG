prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:300,
    height:300,
    image_format: 'jpeg',
    jpeg_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4fqEiNaUi/model.json",modelLoaded);

function modelLoaded(){
    console.log("model has Loaded")
}

function speak (){
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prediction is" + prediction_1;
    speak_data_2 = "the second prediction is" + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}

function Identify(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if (error){
        console.error();
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        
        if (prediction_1 == "Amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        else if (prediction_1 == "Best"){
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        else if (prediction_1 == "Yo/Swag"){
            document.getElementById("update_emoji").innerHTML = "&#129304;"
        }
        else if (prediction_1 == "Victory"){
        document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
        
        if (prediction_2 == "Amazing"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }
        else if (prediction_2 == "Best"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;"
        }
        else if (prediction_2 == "Yo/Swag"){
            document.getElementById("update_emoji2").innerHTML = "&#129304;"
        }
        else if (prediction_1 == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
    }
}
