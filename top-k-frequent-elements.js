/*
Given a non-empty array of integers, return the k most frequent elements.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
Note:

You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
It's guaranteed that the answer is unique, in other words the set of the top k frequent elements is unique.
You can return the answer in any order.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var topKFrequent = function(nums, k) {
    let countMap = {};
    for(let i = 0; i < nums.length; i++){
        if(nums[i] in countMap) countMap[nums[i]]++;
        else countMap[nums[i]] = 1;
    }
    
    const countArr = Object.keys(countMap);
    for(let i = 0; i < countArr.length; i++){
        countArr[i] = {
            number: +countArr[i],
            count: countMap[countArr[i]]
        };
    }
    
    const maxHeap = new MaxHeap(countArr);
    
    const out = new Array(k);
    for(let i = 0; i < k; i++){
        out[i] = maxHeap.remove().number;
    }
    
    return out;
};

class MaxHeap {
    constructor(arr){
        this.data = arr;
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

        while((leftChildIdx !== -1 && this.data[leftChildIdx].count > this.data[idx].count) || (rightChildIdx !== -1 && this.data[rightChildIdx].count > this.data[idx].count)){
            let childIdx = rightChildIdx === -1 || this.data[leftChildIdx].count > this.data[rightChildIdx].count ? leftChildIdx : rightChildIdx;
            [this.data[idx], this.data[childIdx]] = [this.data[childIdx], this.data[idx]];

            idx = childIdx;
            leftChildIdx = MaxHeap.getLeftChildIdx(idx);
            rightChildIdx = MaxHeap.getRightChildIdx(idx);
            if(leftChildIdx >= this.data.length) leftChildIdx = -1;
            if(rightChildIdx >= this.data.length) rightChildIdx = -1;
        }
    }

    remove(){
        if(this.data.length === 0) return null;

        [this.data[0], this.data[this.data.length-1]] = [this.data[this.data.length-1], this.data[0]];
        const val = this.data.pop();
        this._heapifyDown(0);
        
        return val;
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const count = {};
    for (let i = 0; i < nums.length; i++) {
      count[nums[i]] = (count[nums[i]] || 0) + 1;
    }
    const entries = Object.entries(count);
    entries.sort((a, b) => b[1] - a[1]);
    return entries.slice(0, k).map(entry => entry[0]);
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const count = {};
    for (let i = 0; i < nums.length; i++) {
      count[nums[i]] = (count[nums[i]] || 0) + 1;
    }
  
    const entries = Object.entries(count);
    const pq = new MinPriorityQueue();
    for (let i = 0; i < entries.length; i++) {
      if (pq.size() < k) {
        pq.enqueue(entries[i][0], entries[i][1]);
      } else {
        if (entries[i][1] > pq.front().priority) {
          pq.dequeue();
          pq.enqueue(entries[i][0], entries[i][1]);
        }
      }
    }
    
    const out = [];
    while (pq.size() > 0) {
      out.push(pq.dequeue().element);
    }
    return out;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const count = new Map();
    for (let i = 0; i < nums.length; i++) {
      const currentCount = count.get(nums[i]);
      count.set(nums[i], (currentCount || 0) + 1);
    }
  
    const arr = Array.from(count);
    bucketSort(arr, 10);
    
    return arr.slice(arr.length-k).map(a => a[0]);
};
  
function bucketSort(arr, n) {
    const buckets = new Array(n).fill(0).map(() => []);
    const max = Math.max(...arr.map(a => a[1]));
  
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i][1];
      const bucket = Math.floor((val/max)*(n-1));
      buckets[bucket].push(arr[i]);
    }
  
    for (let i = 0; i < buckets.length; i++) {
      buckets[i].sort((a, b) => a[1] - b[1]);
    }
    
    let k = 0;
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        arr[k] = buckets[i][j];
        k++;
      }
    }
}  
  