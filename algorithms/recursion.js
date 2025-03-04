function findFactorialRecursive(number){
    if(number === 0) return 1;
    if(number < 0) return false;

    //base case
    if(number === 1){
        return 1;
    }

    //recursive case
    return number * findFactorialRecursive(number - 1);
}

function findFactorialIterative(number){
    if(number === 0) return 1;
    if(number < 0) return false;

    let sum = 1;
    for(let i = number; i > 0; i--){
        sum *= i;
    }
    return sum;
}

function fibonacciIterative(n){
    let prevTwo = 0;
    let prev = 1;
    let count;
    for(let i = 1; i < n; i++){
        count = prev + prevTwo;
        [prev, prevTwo] = [count, prev];
    }
    return count;
}

function fibonacciRecursive(n){
    if(n < 2) return n;
    return fibonacciRecursive(n-1) + fibonacciRecursive(n-2);
}


function reverseStringRecursive(str){
    // base case
    if(str.length < 2) return str;

    // recursive case
    return str[str.length-1] + reverseStringRecursive(str.slice(1, str.length - 1)) + str[0];
}

function reverseStringIterative(str){
    let ans = '';
    for(let i = str.length - 1; i >= 0; i--){
        ans += str[i];
    }
    return ans;
}

console.log(reverseStringIterative('hello world'));