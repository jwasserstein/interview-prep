/*
Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

Example:

Input: 38
Output: 2 
Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2. 
             Since 2 has only one digit, return it.
Follow up:
Could you do it without any loop/recursion in O(1) runtime?
*/

/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
    let sum;
    do {
        sum = 0;
        while(num > 0){
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        num = sum;
    } while (sum > 9)
    return sum;
};

/**
 * @param {number} num
 * @return {number}
 */
var addDigits2 = function(num) {
    if(num === 0) return 0;
    
    const remainder = num % 9;
    return remainder === 0 ? 9 : remainder;
};