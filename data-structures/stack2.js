const LinkedList = require('./singly-linked-list2');

class Stack {
  constructor() {
    this.data = new LinkedList();
  }

  push(val) {
    this.data.addBeginning(val);
  }

  pop() {
    return this.data.removeBeginning();
  }
}

const s = new Stack();
s.push(5);
s.push(6);
s.push(7);
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());
