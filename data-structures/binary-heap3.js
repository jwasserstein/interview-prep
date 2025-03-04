class MinHeap {
  constructor() {
    this.data = [];
  }

  add(val) {
    this.data.push(val);
    
    let currIdx = this.data.length-1;
    let parentIdx = this._getParentIdx(currIdx);
    while (parentIdx !== null && this.data[currIdx] < this.data[parentIdx]) {
      [this.data[currIdx], this.data[parentIdx]] = [this.data[parentIdx], this.data[currIdx]];
      currIdx = parentIdx;
      parentIdx = this._getParentIdx(currIdx);
    }
  }

  remove() {
    if (this.data.length === 0) return null;

    const returnValue = this.data[0];
    let lastIdx = this.data.length-1;
    [this.data[0], this.data[lastIdx]] = [this.data[lastIdx], this.data[0]];
    this.data.pop();

    let currIdx = 0;
    lastIdx = this.data.length-1;

    let smallestChildIdx;
    let leftChildIdx = this._getLeftChild(currIdx);
    let rightCildIdx = this._getRightChild(currIdx);
    if (leftChildIdx > lastIdx) return returnValue;
    if (rightCildIdx > lastIdx) {
      smallestChildIdx = leftChildIdx;
    } else {
      smallestChildIdx = this.data[leftChildIdx] < this.data[rightCildIdx] ? leftChildIdx : rightCildIdx;
    }

    while (this.data[smallestChildIdx] < this.data[currIdx]) {
      [this.data[currIdx], this.data[smallestChildIdx]] = [this.data[smallestChildIdx], this.data[currIdx]];
  
      currIdx = smallestChildIdx;
      leftChildIdx = this._getLeftChild(currIdx);
      rightCildIdx = this._getRightChild(currIdx);
      if (leftChildIdx > lastIdx) return returnValue;
      if (rightCildIdx > lastIdx) {
        smallestChildIdx = leftChildIdx;
      } else {
        smallestChildIdx = this.data[leftChildIdx] < this.data[rightCildIdx] ? leftChildIdx : rightCildIdx;
      }
    }

    return returnValue;
  }

  peek() {
    if (this.data.length > 0) {
      return this.data[0];
    } else {
      return null;
    }
  }

  isEmpty() {
    return this.data.length === 0;
  }

  _getParentIdx(idx) {
    if (idx === 0) return null;
    return Math.floor((idx-1)/2);
  }

  _getLeftChild(idx) {
    return idx*2+1;
  }

  _getRightChild(idx) {
    return idx*2+2;
  }
}

/*

       3
      / \
    5     7
   / \   / \
  8   6 9   1

*/

const heap = new MinHeap();
const len = Math.floor(Math.random()*100)+1;
const vals = new Array(len);
for (let i = 0; i < len; i++) {
  vals[i] = Math.floor(Math.random()*10);
}

for (let i = 0; i < vals.length; i++) {
  heap.add(vals[i]);
}

vals.sort((a, b) => a - b);
const out = [];
while (!heap.isEmpty()) {
  out.push(heap.remove());
}
for (let i = 0; i < vals.length; i++) {
  if (vals[i] !== out[i]) {
    throw new Error('wrong');
  }
}
console.log(vals, out);
