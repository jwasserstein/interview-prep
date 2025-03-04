class MinHeap {
    constructor(){
        this.data = [];
    }

    static getParentIdx(childIdx){
        if(childIdx === 0) return -1;
        return childIdx % 2 === 0 ? (childIdx-2)/2 : (childIdx-1)/2;
    }

    static getLeftChildIdx(parentIdx){
        return parentIdx*2+1;
    }

    static getRightChildIdx(parentIdx){
        return parentIdx*2+2;
    }

    add(val){
        this.data.push(val);
        let idx = this.data.length-1;
        let pIdx = MinHeap.getParentIdx(idx);
        while(pIdx !== -1 && this.data[idx] < this.data[pIdx]){
            [this.data[idx], this.data[pIdx]] = [this.data[pIdx], this.data[idx]];
            idx = pIdx;
            pIdx = MinHeap.getParentIdx(idx);
        }
    }

    peek(){
        return this.data[0];
    }

    remove(){
        if(this.data.length === 1) return this.data.pop();

        const val = this.data[0];
        [this.data[0], this.data[this.data.length-1]] = [this.data[this.data.length-1], this.data[0]];
        this.data.pop();

        let idx = 0;
        let leftChildIdx = MinHeap.getLeftChildIdx(idx);
        let rightChildIdx = MinHeap.getRightChildIdx(idx);
        while((leftChildIdx !== -1 && this.data[idx] > this.data[leftChildIdx]) || (rightChildIdx !== -1 && this.data[idx] > this.data[rightChildIdx])){
            let childIdx = this.data[leftChildIdx] < this.data[rightChildIdx] ? leftChildIdx : rightChildIdx;
            [this.data[idx], this.data[childIdx]] = [this.data[childIdx], this.data[idx]];
            idx = childIdx;
            leftChildIdx = MinHeap.getLeftChildIdx(idx);
            rightChildIdx = MinHeap.getRightChildIdx(idx);
        }

        return val;
    }
}

const heap = new MinHeap();

heap.add(5);
heap.add(3);
heap.add(7);
heap.add(1);
heap.add(2);
heap.add(9);


class MaxHeap {
    constructor(arr){
        this.data = arr.slice();
        const lastNonLeafIdx = MaxHeap.getParentIdx(this.data.length-1);
        for(let i = lastNonLeafIdx; i >= 0; i--){
            this._heapifyDown(i);
        }
    }

    static getParentIdx(childIdx){
        return Math.floor((childIdx - 1)/2);
    }

    static getLeftChildIdx(parentIdx){
        return parentIdx*2+1;
    }

    static getRightChildIdx(parentIdx){
        return parentIdx*2+2;
    }

    _heapifyDown(idx){
        let leftChildIdx = MaxHeap.getLeftChildIdx(idx);
        let rightChildIdx = MaxHeap.getRightChildIdx(idx);
        if(leftChildIdx >= this.data.length) leftChildIdx = -1;
        if(rightChildIdx >= this.data.length) rightChildIdx = -1;

        while((leftChildIdx !== -1 && this.data[leftChildIdx] > this.data[idx]) || (rightChildIdx !== -1 && this.data[rightChildIdx] > this.data[idx])){
            let childIdx = rightChildIdx === -1 || this.data[leftChildIdx] > this.data[rightChildIdx] ? leftChildIdx : rightChildIdx;
            [this.data[idx], this.data[childIdx]] = [this.data[childIdx], this.data[idx]];

            idx = childIdx;
            leftChildIdx = MaxHeap.getLeftChildIdx(idx);
            rightChildIdx = MaxHeap.getRightChildIdx(idx);
            if(leftChildIdx >= this.data.length) leftChildIdx = -1;
            if(rightChildIdx >= this.data.length) rightChildIdx = -1;
        }
    }

    add(val){
        this.data.push(val);
        let idx = this.data.length-1;
        let pIdx = MaxHeap.getParentIdx(idx);
        while(pIdx !== -1 && this.data[idx] > this.data[pIdx]){
            [this.data[idx], this.data[pIdx]] = [this.data[pIdx], this.data[idx]];
            idx = pIdx;
            pIdx = MaxHeap.getParentIdx(idx);
        }
    }

    peek(){
        return this.data.length > 0 ? this.data[0] : null;
    }

    remove(){
        if(this.data.length === 0) return null;

        [this.data[0], this.data[this.data.length-1]] = [this.data[this.data.length-1], this.data[0]];
        const val = this.data.pop();
        this._heapifyDown(0);
        
        return val;
    }
}

class NewMinHeap {
    constructor(arr){
        this.data = arr.slice();
        const lastNonLeafIdx = MaxHeap.getParentIdx(this.data.length-1);
        for(let i = lastNonLeafIdx; i >= 0; i--){
            this._heapifyDown(i);
        }
    }

    static getParentIdx(childIdx){
        return Math.floor((childIdx - 1)/2);
    }

    static getLeftChildIdx(parentIdx){
        return parentIdx*2+1;
    }

    static getRightChildIdx(parentIdx){
        return parentIdx*2+2;
    }

    _heapifyDown(idx){
        let leftChildIdx = MaxHeap.getLeftChildIdx(idx);
        let rightChildIdx = MaxHeap.getRightChildIdx(idx);
        if(leftChildIdx >= this.data.length) leftChildIdx = -1;
        if(rightChildIdx >= this.data.length) rightChildIdx = -1;

        while((leftChildIdx !== -1 && this.data[leftChildIdx].val < this.data[idx].val) || (rightChildIdx !== -1 && this.data[rightChildIdx].val < this.data[idx].val)){
            let childIdx = rightChildIdx === -1 || this.data[leftChildIdx].val < this.data[rightChildIdx].val ? leftChildIdx : rightChildIdx;
            [this.data[idx], this.data[childIdx]] = [this.data[childIdx], this.data[idx]];

            idx = childIdx;
            leftChildIdx = MaxHeap.getLeftChildIdx(idx);
            rightChildIdx = MaxHeap.getRightChildIdx(idx);
            if(leftChildIdx >= this.data.length) leftChildIdx = -1;
            if(rightChildIdx >= this.data.length) rightChildIdx = -1;
        }
    }

    add(val){
        this.data.push(val);
        let idx = this.data.length-1;
        let pIdx = MaxHeap.getParentIdx(idx);
        while(pIdx !== -1 && this.data[idx].val < this.data[pIdx].val){
            [this.data[idx], this.data[pIdx]] = [this.data[pIdx], this.data[idx]];
            idx = pIdx;
            pIdx = MaxHeap.getParentIdx(idx);
        }
    }

    peek(){
        return this.data.length > 0 ? this.data[0] : null;
    }

    remove(){
        if(this.data.length === 0) return null;

        [this.data[0], this.data[this.data.length-1]] = [this.data[this.data.length-1], this.data[0]];
        const val = this.data.pop();
        this._heapifyDown(0);
        
        return val;
    }
}

const minHeap = new NewMinHeap([{val: 1}, {val: 3}, {val: 0}, {val: 8}, {val: 5}, {val: 4}, {val: 4}, {val: 4}]);
debugger;