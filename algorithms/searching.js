function binarySearch(arr, val){
    let left = 0, right = arr.length - 1;
    let guess = Math.round((left + right)/2);

    if(arr[left] === val) return left;
    if(arr[right] === val) return right;

    while(right - left > 1){
        if(arr[guess] === val) return guess;

        if(arr[guess] > val){
            right = guess;
            guess = Math.round((left + right)/2);
        } else {
            left = guess;
            guess = Math.round((left + right)/2);
        }
    }

    return -1;
}

const a = [1, 2, 3, 4, 5, 6, 7];
console.log(binarySearch(a, 4));