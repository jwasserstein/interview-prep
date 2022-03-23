/*
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
 

Constraints:

-231 <= x <= 231 - 1
*/

/**
 * @param {number} x
 * @return {number}
 */
 var reverse = function(x) {
  let sign = 1;
  if (x < 0) {
    x = Math.abs(x);
    sign = -1;
  }
  const len = getLen(x);
  let out = 0;
  for(let i = 0; i <= len; i++) {
    const digit = Math.floor(x / 10**(len-i));
    x -= digit * 10**(len-i);
    if ((2**31-1) - out < digit * 10**(i-1)) {
      return 0;
    }
    out += digit * 10**(i-1);
  }
  return out * sign;
};

function getLen(n) {
  for(let i = 1; i < 10; i++) {
    if (n < 10**i) {
      return i;
    }
  }
  return 10;
}
