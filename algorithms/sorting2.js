/*
Time: O(n^2)
Space: O(1) (in-place)

Benefits: Can be fast for nearly sorted arrays with a few elements out of order.  Stable.
*/
function bubbleSort(arr){
    if(arr.lnegth === 1) return arr;

    for(let i = arr.length-1; i >= 1; i--){
        let swapped = false;
        for(let j = 1; j <= i; j++){
            if(arr[j] < arr[j-1]){
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
                swapped = true;
            }
        }
        if(!swapped) break;
    }
    return arr;
}


/*
Time: O(n^2)
Space: O(1) (in-place)

Benefits: Fast for small arrays.  Stable.
*/
function insertionSort(arr){
    for(let i = 1; i < arr.length; i++){
        for(let j = 0; j < i; j++){
            if(arr[j] >= arr[i]){
                const val = arr.splice(i, 1)[0];
                arr.splice(j, 0, val);
            }
        }
    }
    return arr;
}



function selectionSort(arr){
    for(let i = 0; i < arr.length - 1; i++){
        let minIdx = i;
        for(let j = i + 1; j < arr.length; j++){
            if(arr[j] < arr[minIdx]){
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

function merge(arr1, arr2){
    let i = 0, j = 0;
    const out = new Array(arr1.length + arr2.length);

    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            out[i+j] = arr1[i];
            i++;
        } else {
            out[i+j] = arr2[j];
            j++;
        }
    }
    while(i < arr1.length) {
        out[i+j] = arr1[i];
        i++;
    }
    while(j < arr2.length) {
        out[i+j] = arr2[j];
        j++;
    }

    return out;
}

/*
Time: O(nlog n)
Space: O(n)

Benefits: Fast for small arrays.  Stable.
*/
function mergeSort(arr){
    if(arr.length < 2) return arr;

    let split = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0, split));
    let right = mergeSort(arr.slice(split, arr.length));

    return merge(left, right);
}


/*
Time: O(nlog n)
Space: O(log n)

Benefits: Fast for small arrays.  Stable.
*/
function quickSort(arr, start, end){
    if(end - start < 2) return arr;

    const pivot = end - 1;
    let left = start, right = pivot - 1;

    while(right > left){
        if(arr[left] >= arr[pivot] && arr[right] <= arr[pivot]){
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        } else {
            if(arr[left] <= arr[pivot]) left++;
            if(arr[right] >= arr[pivot]) right--;
        }
    }
    [arr[left], arr[pivot]] = [arr[pivot], arr[left]];
    quickSort(arr, start, left);
    quickSort(arr, left+1, end);
    return arr;
}


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

/*
Time: O(nlog n)
Space: O(n) (could be O(1) if you used the heap's internal array)
*/
function heapSort(arr){
    const heap = new MaxHeap(arr);
    const out = new Array(arr.length);

    for(let i = out.length-1; i >= 0; i--){
        out[i] = heap.remove();
    }   

    return out;
}

/*
Time: O(n+k)
Space: O(k)
*/
function countingSort(arr){
    const count = [];
    for(let i = 0; i < arr.length; i++){
        if(count[arr[i]]) count[arr[i]]++;
        else count[arr[i]] = 1;
    }

    let k = 0;
    for(let i = 0; i < count.length; i++){
        for(let j = 0; j < (count[i] || 0); j++){
            arr[k++] = i;
        }
    }

    return arr;
}

const a = [5, 3, 1, 2, 3, 4, 2, 6, 3, 7, 7, 7, 9, 3];
console.log(countingSort(a));