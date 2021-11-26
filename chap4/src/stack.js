class Stack {
  constructor() {
    this.arr = [];
  }

  size() {
    return this.arr.length;
  }
  push(elem) {
    this.arr.push(elem);
  }
  pop() {
    if (this.size() === 0) {
      throw new Error('Stack is empty');
    }
    const elem = this.arr.pop();
    return elem;
  }
}

module.exports = Stack;
