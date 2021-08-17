class StartGame {
  intervalId;

  constructor(canvas, gameOverDisplay, scoreBoard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasCenter = {
      x: Math.floor(canvas.width / 2),
      y: Math.floor(canvas.height / 2)
    };
    this.gameOverDisplay = gameOverDisplay;
    this.scoreBoard = scoreBoard;
    this.score = 0;
    this.gameOver = false;
    this.params = {
      snakeStart: {
        x: this.canvasCenter.x - 100,
        y: this.canvasCenter.y
      },
      snakeLength: 20,
      snakeSpeed: 1000 / 20,
      gamePieceWidth: 10
    };
    this.snake = new Snake();
    this.apple = new Apple(
      canvas.width - 100,
      canvas.height - 100,
      this.params.gamePieceWidth
    );
  }

  initiateGame() {
    this.drawBoard();
    this.drawApple();
    this.initiateSnake(this.params.snakeLength, this.params.snakeStart);
    this.scoreBoard.innerText = '0';
  }

  drawBoard() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawApple() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.apple.position.x,
      this.apple.position.y,
      this.params.gamePieceWidth,
      this.params.gamePieceWidth
    );
  }

  initiateSnake(initialLength, position) {
    for (let i = 0; i < initialLength; i++) {
      this.snake.grow({
        x: position.x - 10 * i,
        y: position.y
      });
    }
    this.drawSnake();
  }

  drawSnake() {
    let current = this.snake.head;
    while (current !== null) {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(
        current.position.x,
        current.position.y,
        this.params.gamePieceWidth,
        this.params.gamePieceWidth
      );
      current = current.next;
    }
  }

  moveSnakeUp() {
    if (this.snake.direction === 'DOWN' || this.gameOver) return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveUp(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  moveSnakeDown() {
    if (this.snake.direction === 'UP' || this.gameOver) return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveDown(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  moveSnakeRight() {
    if (this.snake.direction === 'LEFT' || this.gameOver) return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveRight(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  moveSnakeLeft() {
    if (this.snake.direction === 'RIGHT' || this.gameOver) return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveLeft(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  redraw() {
    this.handleOutOfBounds();
    this.handleEatingItself();
    this.handleEatingApple();
    this.drawBoard();
    this.drawApple();
    this.drawSnake();
  }

  isOutOfBounds() {
    if (
      this.snake.head.position.x <= 0 ||
      this.snake.head.position.x >= this.canvas.width ||
      this.snake.head.position.y <= 0 ||
      this.snake.head.position.y >= this.canvas.height
    ) {
      return true;
    }
    return false;
  }

  handleOutOfBounds() {
    if (this.isOutOfBounds()) {
      this.stopGame();
    }
  }

  stopGame() {
    this.gameOver = true;
    clearInterval(this.intervalId);
    this.gameOverDisplay.classList.toggle('hidden');
  }

  handleEatingApple() {
    if (this.apple.isEaten(this.snake.head, this.params.gamePieceWidth)) {
      this.score++;
      this.scoreBoard.innerText = `${this.score}`;
      this.snake.growSnake();
      this.apple = new Apple(
        this.canvas.width - 100,
        this.canvas.height - 100,
        this.params.gamePieceWidth
      );
    }
  }

  handleEatingItself() {
    let current = this.snake.head.next;
    while (current !== null) {
      if (this.snake.isEatingItself(current.position)) {
        this.stopGame();
      }
      current = current.next;
    }
  }
}

document
  .getElementsByTagName('body')[0]
  .addEventListener('keydown', (e) => handleArrowKey(e.key));

function handleArrowKey(direction) {
  switch (direction) {
    case 'ArrowUp':
      game.moveSnakeUp();
      break;
    case 'ArrowDown':
      game.moveSnakeDown();
      break;
    case 'ArrowLeft':
      game.moveSnakeLeft();
      break;
    case 'ArrowRight':
      game.moveSnakeRight();
      break;
  }
}

const gameOverDisplay = document.getElementById('game-over-display');
gameOverDisplay.addEventListener('click', (e) => {
  if (e.target.id === 'reset') {
    gameOverDisplay.classList.toggle('hidden');
    game = newGame();
  }
});
function resizeCanvasToDisplaySize(canvas) {
  // look up the size the canvas is being displayed
  const clientWidth = canvas.clientWidth;
  const clientHeight = canvas.clientHeight;

  // If it's resolution does not match change it
  if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  }
}

function newGame() {
  const snakeGame = new StartGame(
    document.getElementById('board'),
    gameOverDisplay,
    document.getElementById('score')
  );
  snakeGame.initiateGame();
  return snakeGame;
}
resizeCanvasToDisplaySize(document.getElementById('board'));
let game = newGame();
