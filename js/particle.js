class Particle extends p5.Vector {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.1, 0.5));
    this.acc = createVector(0, 0);
    this.r = 3;
    this.view = 600;
    this.arc = 360;
    this.color = color(45,51,60);
    this.turningSpeed = 0.8;
    this.near = [];
    this.confined = true;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (this.x < 0) {this.add(width, 0);}
    if (this.y < 0) {this.add(0, height);}
    this.set(this.x % width, this.y % height)
    this.near.splice(0, this.near.length);
    for (let particle of particles) {
      if (this.dist(particle) > 0 && this.dist(particle) < this.view / 2 && abs(this.vel.angleBetween(p5.Vector.sub(particle,this))) < radians(this.arc / 2)) {
        this.near.push(particle);
        if (abs(this.vel.angleBetween(p5.Vector.sub(particle,this))) < min(radians(90), this.arc/3)) {
          this.vel.rotate(this.vel.angleBetween(p5.Vector.sub(particle,this)) / (((this.dist(particle) * this.turningSpeed) * sqrt(abs(this.vel.angleBetween(p5.Vector.sub(particle,this))))) * (-this.turningSpeed / this.vel.mag())));
        }
      }
    }
    
    if (this.confined) {
      let walls = [createVector(0, this.y), createVector(width, this.y), createVector(this.x, 0), createVector(this.x, height)];
      for (let wall of walls) {
        if (abs(this.vel.angleBetween(p5.Vector.sub(wall,this))) < radians(96) && this.dist(wall) < this.view / 2) {
          this.vel.rotate(this.vel.angleBetween(p5.Vector.sub(wall,this)) / (((this.dist(wall) * this.turningSpeed) * sqrt(abs(this.vel.angleBetween(p5.Vector.sub(wall,this))))) * (-this.turningSpeed / this.vel.mag())));
        }
      }
    }
    this.vel.add(this.acc);
    this.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    
    let dis = this.view/2;
    
    for (let i = 0; i < this.near.length; i++) {
      dis = min(this.dist(this.near[i]), dis);
      
    }

    this.color = color(45,51,60, max(0, 160 / max(this.dist(createVector(mouseX, mouseY))/50, 1)-10));

    noStroke();
    fill(this.color);

    dis = dis / min(1.5,max(this.dist(createVector(mouseX, mouseY))/160, 1));
    circle(this.x, this.y, dis);
  }
}
