img="";
objects=[];
status="";

function preload(){
img=loadImage("https://miro.medium.com/max/1200/1*9QIrjaw57WOd0OvMVCMAmQ.jpeg");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Object";
}

function draw(){
image(video,0,0,380,380);

if(status!=""){
    objectDetector.detect(video,gotResult);
    r=random(255)
    g=random(255)
    b=random(255)
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="Status: Object detected";
        document.getElementById("number_of_objects").innerHTML="Numbers of objects detected are : "+objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}