let x = 0;
let canvas = undefined;
const step = 25;
const areas = [];
function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("sketch");
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      areas.push(new Area(x, y, step, step));
    }
  }
  noStroke();
}

function draw() {
  for (const item of areas) {
    item.update(mouseX, mouseY);
    item.display();
  }
}

function Area(x, y, w, h) {
  if (!(this instanceof Area)) {
    throw new TypeError(
      "Area can not be called as a function. Create an instance by calling new Area(x,y,w,h)",
    );
  }
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isOver = false;

  this.update = function(mX, mY) {
    if (
      mX > this.x - this.w / 2 &&
      mX < this.x + this.w / 2 &&
      mY > this.y - this.h / 2 &&
      mY < this.y + this.h / 2
    ) {
      this.isOver = true;
      this.rotation +=2;
    } else {
      this.isOver = false;
      this.rotation = this.rotation < 0 ? 0: this.rotation - 1;
    }
  };

  this.display = function() {
      let w = this.w;
      push();
      translate(this.x, this.y);
      DeviceRotationRate(radians(this.rotation % 360));
      if (this.isOver === true) {
        fill("#ff6347");
        w = w + 5;
    } else {
      fill("#00ff00");
      w = this.w
    }
    rect(0, 0, w, w);
    pop()
  };
}
  


function keyPressed() {
  if (key === "s" || key === "S") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch", "png");
  }
}