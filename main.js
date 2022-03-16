status = "";
object = [];


function setup() {
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();


}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        detect.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "status : detected";
            document.getElementById("object_number").innerHTML = "Number of objects detected : " + object.length;
            fill(r,g,b);
            accuracy = floor(object[i].confidence * 100);
            text(object[i].label + " " + accuracy + "%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == detecting){
                 video.stop();
                 detect.detect(gotResult);
                 document.getElementById("status").innerHTML = detecting +"found";

            }

            else{
                document.getElementById("status").innerHTML = detecting +"not found";
            }
        }
        
       
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    }
    console.log(results);
    object = results;
}

function start() {
    detect = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status = detecting object";
    detecting = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("modeloaded")
    status = true;
}