i = "";
var obj = [];
img = "";
stats = "";
function setup() {
    canvas = createCanvas(380,380);
    video = createCapture(VIDEO);
    video.hide();
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects.";
}
function modelLoaded() {
    console.log("model is loaded");
    stats = true;
}
function gotResults(error,results) {
    if (error) {
        console.error(error);
    } 
    console.log(results);
    obj = results;
}
function draw() {
    image(video,0,0,380,380);
    if (stats != "") {
        r = random(255);
        g = random(255);
        b = random(255)
        objectDetector.detect(video,gotResults);
        for (i = 0; i < obj.length; i++) {
            document.getElementById("status").innerHTML="Status: Object detected!";
            document.getElementById("number_of_objects").innerHTML="Objects detected : "+obj.length;
            fill(r,b,g);
            percent = floor(obj[i].confidence*100);
            text(obj[i].label + "" + percent + "%",obj[i].x,obj[i].y);
            noFill();
            stroke(r,g,b);
            rect(obj[i].x,obj[i].y,obj[i].width,obj[i].height);
        }
    }
}