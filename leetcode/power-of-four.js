/*
Given an integer n, return true if it is a power of four. Otherwise, return false.

An integer n is a power of four, if there exists an integer x such that n == 4x.

 

Example 1:

Input: n = 16
Output: true
Example 2:

Input: n = 5
Output: false
Example 3:

Input: n = 1
Output: true
 

Constraints:

-231 <= n <= 231 - 1
 

Follow up: Could you solve it without loops/recursion?
*/

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
    return Math.log(n)/Math.log(4) % 1 < 10**(-10);
};

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
    for (let i = 0; i <= 15; i++) {
      if (4**i === n) return true;
    }
    return false;
};

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
    return (n & (n-1)) === 0 && ((n & 0b1010101010101010101010101010101) !== 0)
};
  