const LinkedList = require('./singly-linked-list2');

class Queue {
  constructor() {
    this.data = new LinkedList();
  }

  enqueue(val) {
    this.data.addEnd(val);
  }

  dequeue() {
    return this.data.removeBeginning();
  }
}

const q = new Queue();
q.enqueue(5);
q.enqueue(6);
q.enqueue(7);
console.log(q.dequeue());
q.enqueue(8);
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());