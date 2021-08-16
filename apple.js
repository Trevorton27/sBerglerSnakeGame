class Apple {
  constructor(xMax, yMax, size) {
    this.position = {
      x: Math.floor(Math.random() * xMax),
      y: Math.floor(Math.random() * yMax)
    };
    this.size = size;
  }

  isEaten(snakeHead, snakeHeadSize) {
    return !(
      snakeHead.position.x >= this.position.x + this.size ||
      snakeHead.position.x + snakeHeadSize <= this.position.x ||
      snakeHead.position.y >= this.position.y + this.size ||
      snakeHead.position.y + snakeHeadSize <= this.position.y
    );
  }
}
