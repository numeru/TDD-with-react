const Stack = require('../stack.js');
describe('Stack', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });

  it('is created empth', () => {
    expect(stack.size()).toBe(0);
  });

  it('push element to stack', () => {
    stack.push(5);

    expect(stack.arr).toHaveLength(1);

    stack.push(7);

    expect(stack.arr).toHaveLength(2);
  });

  describe('pop', () => {
    it('pop element from stack', () => {
      stack.push(5);
      stack.push(7);

      const item = stack.pop();
      expect(item).toBe(7);

      expect(stack.arr).toHaveLength(1);
    });

    it('throw an error if stack is empty', () => {
      expect(stack.size()).toBe(0);
      expect(() => {
        stack.pop();
      }).toThrow('Stack is empty');
    });
  });
});
