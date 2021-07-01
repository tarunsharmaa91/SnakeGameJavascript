function SnakeFood() {
  this.img = document.createElement('img');
  this.img.src = 'images/food1.png';
}
SnakeFood.prototype = new SnakeWorldObject();

function getRandomLocation(coordinate) {
  return Math.floor(Math.random() * coordinate);
}

SnakeFood.prototype.randomizePosition = function(maxX, maxY) {
  this.setX(getRandomLocation(maxX));
  this.setY(getRandomLocation(maxY));
};

SnakeFood.prototype.draw = function(context, spacing) {
  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};
