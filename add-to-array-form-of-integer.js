/*
The array-form of an integer num is an array representing its digits in left to right order.

For example, for num = 1321, the array form is [1,3,2,1].
Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.

 

Example 1:

Input: num = [1,2,0,0], k = 34
Output: [1,2,3,4]
Explanation: 1200 + 34 = 1234
Example 2:

Input: num = [2,7,4], k = 181
Output: [4,5,5]
Explanation: 274 + 181 = 455
Example 3:

Input: num = [2,1,5], k = 806
Output: [1,0,2,1]
Explanation: 215 + 806 = 1021
 

Constraints:

1 <= num.length <= 104
0 <= num[i] <= 9
num does not contain any leading zeros except for the zero itself.
1 <= k <= 104
*/

/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function(num, k) {
  const kArr = String(k).split('').map(str => Number(str));
  
  let carry = 0;
  let numPtr = num.length-1;
  let kPtr = kArr.length-1;
  const out = [];
  while (numPtr >= 0 || kPtr >= 0 || carry > 0) {
    const digitSum = (num[numPtr] || 0) + (kArr[kPtr] || 0) + carry;
    const digit = digitSum % 10;
    carry = (digitSum - digit) / 10;
    out.push(digit);
    numPtr--;
    kPtr--;
  }
  
  let left = 0;
  let right = out.length-1;
  while (left < right) {
    [out[left], out[right]] = [out[right], out[left]];
    left++;
    right--;
  }
  return out;
};
