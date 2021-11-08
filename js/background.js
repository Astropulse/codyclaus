
let particles = [];

var canvas;

var h = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.offsetHeight);

var w = Math.min(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);

function windowResized() {
  h = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.offsetHeight);
  w = Math.min(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
  resizeCanvas(w, h + min(160,w/6.5));
  particles = [];
  for (let i = 0; i < (width*height)/35000; i++) {
    particles.push(new Particle(random(0, width),random(0, height)));
  }
}

function setup() {
  canvas = createCanvas(w, h + min(160,w/6.5));
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  for (let i = 0; i < (width*height)/35000; i++) {
    particles.push(new Particle(random(0, width),random(0, height)));
  }
}

function draw() {
  clear();
  for (let particle of particles) {
    particle.show();
    particle.update();
  }
}