/*
Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 is not.
 

Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 

Constraints:

-231 <= x <= 231 - 1
 

Follow up: Could you solve it without converting the integer to a string?
*/

/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
  if (x < 0) { // negatives are never palindromes because of the - sign
    return false;
  } else if (x < 10) { // single digit positive numbers are always palindromes
    return true;
  }

  let right = 0;
  let left = getLength(x);

  while(left > right) {
    if(getDigit(x, left) !== getDigit(x, right)) {
      return false;
    }
    right++;
    left--;
  }
  
  return true;
};

// Get nth digit from x number
function getDigit(x, n) {
  const modOperand = 10 * 10 ** n;
  const divisor = modOperand / 10;
  return Math.floor((x % modOperand) / divisor);
}

// Get index of left most number (0 based index)
function getLength(x) {
  let length = 0;
  for(let i = 0; i < 10; i++) {
    const digit = getDigit(x, i);
    if(digit !== 0) {
      length = i;
    }
  }
  return length;
}

