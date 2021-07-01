var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement('img');
  this.img.src = 'images/snake2.png';
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  let startX = Math.floor(maxX/2);
  let startY = Math.floor(maxY/2);
  this.setX(startX);
  this.setY(startY);
  this.sections =[];

  for(let i=0; i<NUM_INITIAL_SECTIONS;i++){
    this.sections.unshift(new SnakeSection(startX, startY +i +1));
  }
 
};
Snake.prototype.hasCollided = function(maxX, maxY) {
  let currentX = this.getX();
  let currentY = this.getY();
  if(currentX >= maxX || currentX < 0 || currentY >= maxY || currentY < 0){
    return true;
  }

  for(let i =0; i < this.sections.length; i++){
    if(this.isSameLocation(this.sections[i])){
      return true;
    }
  }

  return false;
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  let x = this.getX();
  let y = this.getY();
  if (this.direction === UP) {
    this.setY(y - 1);
  } else if (this.direction === DOWN) {
    this.setY(y + 1);
  } else if (this.direction === LEFT) {
    this.setX(x - 1);
  } else if (this.direction === RIGHT) {
    this.setX(x + 1);
  }
  this.sections.push(new SnakeSection(x, y));
};

Snake.prototype.draw = function(context, spacing) {
  for (let i = 0; i < this.sections.length; i++) {
    this.sections[i].draw(context, spacing);
  }
  DrawUtil.drawImage(
      context,
      this.img,
      spacing * this.getX(),
      spacing * this.getY(),
      spacing,
      spacing
  );
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  let snake = this;
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === UP_KEY_CODE && snake.direction !== DOWN) {
      snake.nextDirection = UP;
    } else if (e.keyCode === DOWN_KEY_CODE && snake.direction !== UP) {
      snake.nextDirection = DOWN;
    } else if (e.keyCode === RIGHT_KEY_CODE && snake.direction !== LEFT) {
      snake.nextDirection = RIGHT;
    } else if (e.keyCode === LEFT_KEY_CODE && snake.direction !== RIGHT) {
      snake.nextDirection = LEFT;
    } else {
      return;
    }
    e.preventDefault();
  });
};
