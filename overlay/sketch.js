let socket;
let title = '';
let tasks = [];
let w = [];
let textspeech;
let speaking = false;
// let winnerCount;

let outByte = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect();
  socket.on('taskList', receiveTask);
  socket.on('greetingFromUser', displayMessageFromUser);

  textspeech = new p5.Speech();
}

function mousePressed() {
  textspeech.speak('hello viola'); // initialize
}

function draw() {
  textFont("Comic Sans MS");
  background(0, 255, 0);
  textSize(30);
  textStyle(BOLD);
  noStroke();
  // fill(0, 0, 0, 100);
  // rectMode(CORNER);
  // rect(0, 0, 260, 40 * tasks.length);
  for (let i = 0; i < tasks.length; i++) {
    fill(255,255,0);
    textAlign(LEFT);
    text(tasks[tasks.length - 1 - i], windowWidth - windowWidth/4, 200 + i * 40);
  }
  // textSize(30);
  // textAlign(CENTER);

  // if (title !== '') {
  //   rectMode(CENTER);
  //   fill(0);
  //   rect(width / 2, 70, 680, 50);
  //   fill(255);
  //   text(title, width / 2, 80);
  // }

  // text flying thingy
  push();
  for (let j = 0; j < w.length; j++) {
    w[j].moveAndDisplay();
    if (w[j].x <= -width) {
      w[j].x = null;
      w[j].y = null;
    }
  }
  pop();

}

// text flying thingy

function displayMessageFromUser(greeting) {
  console.log(greeting);
  if (greeting.length > 0) {
    let typedword = new Word(greeting, width, random(10, height - 10));
    w.push(typedword);
    textspeech.speak(typedword.word);
  }
}

class Word {
  constructor(word, x, y) {
    this.word = word;
    this.opacity = 255;
    this.x = x;
    this.y = y;
  }

  moveAndDisplay() {
    let tWidth = textWidth(this.word);
    fill(255,255,0);
    textAlign(CENTER);
    rectMode(CENTER);
    rect(this.x+20, this.y-30, tWidth+20, 40);
    fill(0, this.opacity);
    text(this.word, this.x+20, this.y-20);
    this.x-=3;
  }
}

// socket stuffs

function receiveTask(data, count) {
  if (Array.isArray(data)) {
    tasks = data;
    textspeech.speak(data[data.length - 1]);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}