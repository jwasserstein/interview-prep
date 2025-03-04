class MinHeap {
  constructor() {
    this.data = [];
  }

  add(val) {
    this.data.push(val);

    let currIdx = this.data.length-1;
    let parentIdx = MinHeap.getParentIdx(currIdx);
    while (parentIdx >= 0 && this.data[currIdx] < this.data[parentIdx]) {
      [this.data[currIdx], this.data[parentIdx]] = [this.data[parentIdx], this.data[currIdx]];
      [currIdx, parentIdx] = [parentIdx, currIdx];
      parentIdx = MinHeap.getParentIdx(currIdx);
    }
  }

  remove() {
    const val = this.data[0];
    [this.data[0], this.data[this.data.length-1]] = [this.data[this.data.length-1], this.data[0]];
    this.data.pop();

    let currIdx = 0;
    let leftIdx = MinHeap.getLeftIdx(currIdx);
    let rightIdx = MinHeap.getRightIdx(currIdx);
    while (leftIdx < this.data.length) {
      if (this.data[currIdx] > this.data[leftIdx] || (rightIdx < this.data.length && this.data[currIdx] > this.data[rightIdx])) {
        if (rightIdx >= this.data.length || this.data[leftIdx] < this.data[rightIdx]) {
          [this.data[currIdx], this.data[leftIdx]] = [this.data[leftIdx], this.data[currIdx]];
          [currIdx, leftIdx] = [leftIdx, currIdx];
        } else {
          [this.data[currIdx], this.data[rightIdx]] = [this.data[rightIdx], this.data[currIdx]];
          [currIdx, rightIdx] = [rightIdx, currIdx];
        }
      } else {
        break;
      }
      leftIdx = MinHeap.getLeftIdx(currIdx);
      rightIdx = MinHeap.getRightIdx(currIdx);
    }

    return val;
  }

  static getParentIdx(i) {
    return Math.floor((i-1)/2);
  }

  static getLeftIdx(i) {
    return i*2+1;
  }

  static getRightIdx(i) {
    return i*2+2;
  }
}

const heap = new MinHeap();
heap.add(3);
heap.add(5);
heap.add(1);
heap.add(2);
heap.add(10);
heap.add(-3);
heap.add(0);
heap.add(0);
heap.add(1);
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());
console.log(heap.remove());