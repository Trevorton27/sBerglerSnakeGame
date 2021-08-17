class Snake {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.direction = 'RIGHT';
  }

  addHead(position) {
    let newHead = new SnakeSegment(position);
    this.head.prev = newHead;
    newHead.next = this.head;
    this.head = newHead;
    this.length++;
  }

  removeTail() {
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.length--;
  }

  grow(position) {
    let newSegment = new SnakeSegment(position);

    if (!this.head) {
      this.head = newSegment;
      this.tail = newSegment;
    } else {
      this.tail.next = newSegment;
      newSegment.prev = this.tail;
      this.tail = newSegment;
    }

    this.length++;
    return this;
  }

  moveUp() {
    this.direction = 'UP';
    let newPos = Object.assign({}, this.head.position);
    newPos.y -= 10;
    this.addHead(newPos);
    this.removeTail();
  }

  moveDown() {
    this.direction = 'DOWN';
    let newPos = Object.assign({}, this.head.position);
    newPos.y += 10;
    this.addHead(newPos);
    this.removeTail();
  }

  moveRight() {
    this.direction = 'RIGHT';
    let newPos = Object.assign({}, this.head.position);
    newPos.x += 10;
    this.addHead(newPos);
    this.removeTail();
  }

  moveLeft() {
    this.direction = 'LEFT';
    let newPos = Object.assign({}, this.head.position);
    newPos.x -= 10;
    this.addHead(newPos);
    this.removeTail();
  }

  growSnake() {
    const headPos = Object.assign({}, this.head.position);
    switch (this.direction) {
      case 'RIGHT':
        headPos.x += 10;
        this.addHead(headPos);
        break;
      case 'LEFT':
        headPos.x -= 10;
        this.addHead(headPos);
        break;
      case 'UP':
        headPos.y -= 10;
        this.addHead(headPos);
        break;
      case 'DOWN':
        headPos.y += 10;
        this.addHead(headPos);
        break;
    }
  }

  isEatingItself(position) {
    if (
      this.head.position.x === position.x &&
      this.head.position.y === position.y
    ) {
      return true;
    }
    return false;
  }
}

class SnakeSegment {
  constructor(position) {
    this.position = position;
    this.prev = null;
    this.next = null;
  }
}
