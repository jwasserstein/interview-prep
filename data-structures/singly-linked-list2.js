class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addEnd(val) {
    if (this.head === null) {
      this.head = new Node(val, null);
      this.tail = this.head;
      return;
    }

    this.tail.next = new Node(val, null);
    this.tail = this.tail.next;
  }

  addBeginning(val) {
    const newNode = new Node(val, this.head);
    this.head = newNode;
  }

  removeEnd() {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null;
      return;
    }

    let currNode = this.head;
    while (currNode.next.next) {
      currNode = currNode.next;
    }
    
    const returnVal = currNode.next.val;
    currNode.next = null;
    this.tail = currNode;
    return returnVal;
  }

  removeBeginning() {
    if (!this.head) return;

    const returnVal = this.head.val;
    this.head = this.head.next;
    return returnVal;
  }
}

// const ll = new LinkedList();
// ll.addEnd(3);
// ll.addEnd(4);
// ll.addEnd(5);
// ll.addEnd(6);
// console.log(ll.head);
// console.log(ll.removeBeginning());
// console.log(ll.removeBeginning());
// console.log(ll.head);
// console.log(ll.removeBeginning());
// console.log(ll.removeBeginning());
// console.log(ll.head);

module.exports = LinkedList;
