let rectX = 0;
let rectY = 0;
let rectSize = 90;
let resetOver;
let roundUp;
let roundDown;
let breakUp;
let breakDown;
let startTime = 0;
let deltaTime = 0;
let pauseTime = 0;
let roundTime = 25;
let breakTime = 5;
let sec = 0;
let min = 0;
let state = 0;
let prevState = 0;
let rectColor;
let circleColor;
let baseColor;
let counter = 1;
let longBreak = 0;
function setup(){
    resetOver = false;
    roundUp = false;
    roundDown = false;
    breakUp = false;
    breakDown = false;
    startTime = System.nanoTime();
    longBreak = breakTime * 3;
    rectColor=color(255);
    rectX=0;
    rectY=0;
    surface.setTitle("Pomodoro by Ian Chasse, 2021");
    surface.setResizable(true);
    createCanvas(600, 400);
    state=1;
}

function draw(){
    longBreak=breakTime * 3;
    background(30);
    update(mouseX, mouseY);
    fill(130);
    stroke(0);
    rect(rectX, rectY, rectSize, rectSize);
    fill(0);
    textSize(30);
    textAlign(TOP, LEFT_ARROW);
    fill(130);
    stroke(0);
    rect(rectX + rectSize + 10, rectY, rectSize, rectSize);
    fill(0);
    textSize(30);
    textAlign(TOP, LEFT_ARROW);
    text("Reset  Pause", 5, 55);
    let timeIndication = (String.format("%02d", roundTime) + "  " + String.format("%02d", breakTime));
    fill(130);
    textSize(60);
    text(timeIndication, 200, 350);
    rect(206, 275, 60, 25);
    rect(206, 355, 60, 25);
    rect(319, 275, 60, 25);
    rect(319, 355, 60, 25);
    textSize(25);
    fill(0);
    text("???         ??? ", 215, 297);
    text("???         ??? ", 215, 377);
    if(state != 3) {
        sec=int(((((System.nanoTime() - deltaTime) - startTime) / 1000000000)));
        min=sec / 60;
    }
    else {
        sec=int((((pauseTime - startTime) / 1000000000)));
        min=sec / 60;
    }
    let display = (String.format("%02d", min) + ":" + String.format("%02d", sec % 60));
    if(min >= roundTime && state == 1) {
        if(counter >= 3) {
            state=4;
            startTime=System.nanoTime();
            sec=0;
            min=0;
        }
    else {
            state=2;
            counter++;
            startTime=System.nanoTime();
            sec=0;
            min=0;
        }
    }
    else if(min >= breakTime && state == 2) {
        state=1;
        startTime=System.nanoTime();
        sec=0;
        min=0;
    }
    if(state == 4 && min >= longBreak) {
        state=1;
        counter=0;
        startTime=System.nanoTime();
        sec=0;
        min=0;
    }
    textSize(200);
    textAlign(CENTER);
    fill(130);
    text(display, 300, 260);
    textSize(30);
    textAlign(TOP, LEFT_ARROW);
    switch(state){
        case 1:text("Study time!", 425, 35);
        break;
        case 2:text("Break time!", 425, 35);
        break;
        case 3:text("Paused.", 475, 35);
        break;
        case 4:text("Long break!", 420, 35);
        break;
    }
}

function update(x, y){
    if(overRect(rectX, rectY, rectSize, rectSize)) {
        resetOver=true;
        console.log("over rectangle");
    }
    else if(overRect(206, 275, 60, 25)) {
        roundUp=true;
        console.log("round up");
    }
    else if(overRect(206, 355, 60, 25)) {
        roundDown=true;
        console.log("round down");
    }
    else if(overRect(319, 275, 60, 25)) {
        breakUp=true;
        console.log("breakup");
    }
    else if(overRect(319, 355, 60, 25)) {
        breakDown=true;
        console.log("breakdown");
    }
    else if(overRect(rectX + rectSize + 10, rectY, rectSize, rectSize)) {
        console.log("pause");
    }
    else {
        resetOver=false;
        roundUp=false;
        roundDown=false;
        breakUp=false;
        breakDown=false;
        console.log(longBreak);
    }
}

function mouseClicked(){
    if(resetOver) {
        startTime=System.nanoTime();
        sec=0;
        min=0;
        deltaTime=0;
    }
    else if(roundUp) {
        if(roundTime + 1 <= 60) {
            roundTime++;
        }
    }
    else if(roundDown) {
        if(roundTime - 1 >= 1) {
            roundTime--;
        }
    }
    else if(breakUp) {
        if(breakTime + 1 <= 30) {
            breakTime++;
        }
    }
    else if(breakDown) {
        if(breakTime - 1 >= 1) {
            breakTime--;
        }
    }
    else {
        if(state == 3) {
            state=prevState;
            prevState=3;
            deltaTime=System.nanoTime() - pauseTime;
        }
    else {
            prevState=state;
            state=3;
            pauseTime=System.nanoTime();
            console.log("paused");
        }
    }
}

function overRect(x, y, width, height){
    if(mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        return true;
    }
    else {
        return false;
    }
}

