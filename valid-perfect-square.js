/*
Given a positive integer num, write a function which returns True if num is a perfect square else False.

Follow up: Do not use any built-in library function such as sqrt.

 

Example 1:

Input: num = 16
Output: true
Example 2:

Input: num = 14
Output: false
 

Constraints:

1 <= num <= 2^31 - 1
*/

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    return (num ** (1/2)) % 1 < 10**(-10)
};

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare2 = function(num) {
    if(num === 1 || num === 2147395600) return true;
    
    let lower = 1;
    let upper = num > 46340 ? 46340 : num;
    let guess = ((upper + lower) / 2) - (((upper + lower) / 2) % 1);
    
    while(guess !== lower && guess !== upper) {
        const square = guess ** 2;
        if(square === num) return true;
        if(num > square){
            lower = guess;
            guess = ((upper + lower) / 2) - (((upper + lower) / 2) % 1);
        } else {
            upper = guess;
            guess = ((upper + lower) / 2) - (((upper + lower) / 2) % 1);
        }
    }
    return false;
};