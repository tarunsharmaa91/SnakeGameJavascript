/* Base class for objects in Snake World */

function SnakeWorldObject() {}

SnakeWorldObject.prototype.getX = function() {
  return this.x;
};
SnakeWorldObject.prototype.getY = function() {
  return this.y;
};
SnakeWorldObject.prototype.setX = function(newX) {
  this.x = newX;
};
SnakeWorldObject.prototype.setY = function(newY) {
  this.y = newY;
};

SnakeWorldObject.prototype.isSameLocation = function(snakeWorld) {
  return snakeWorld.getX() === this.getX() && snakeWorld.getY() === this.getY();
};
