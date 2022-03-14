/*
Given two binary strings a and b, return their sum as a binary string.

 

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
 

Constraints:

1 <= a.length, b.length <= 104
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.
*/

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
 var addBinary = function(a, b) {
  let aPtr = a.length-1;
  let bPtr = b.length-1;
  let out = '';
  let carry = 0;
  
  while (aPtr >= 0 || bPtr >= 0 || carry > 0) {
    const aVal = aPtr >= 0 ? Number(a[aPtr]) : 0;
    const bVal = bPtr >= 0 ? Number(b[bPtr]) : 0;
    
    const currVal = (aVal + bVal + carry) % 2;
    carry = ((aVal + bVal + carry) - currVal) / 2;
    
    out = String(currVal) + out;
    
    aPtr--;
    bPtr--;
  }
  
  return out;
};
