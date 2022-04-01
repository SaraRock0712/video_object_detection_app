var img = "";
status = "";
objects=[];
function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.position(450, 200);
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting objects";
}

function modelLoaded(){
    console.log("model Loaded");
    status = true;

}

function gotResult(error, results){
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects= results;
}

function draw(){
    image(video ,0 ,0 ,380, 380);

if(status != "")
{
    r= random(255);
    g= random(255);
    b= random(255);
    objectDetector.detect(video, gotResult);

    for(i=0; i<objects.length; i++)
    {
        document.getElementById("number_of_objects").innerHTML = "number of objects detected are :" + objects.length;
        document.getElementById("status").innerHTML = "status: OBJECT DETECTED!!";
        fill(r,g,b);
        percent= floor(objects[i].confidence*100);
    noFill();
    text(objects[i].label+ " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

}

