/*
Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
*/

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let palindromeIdxs = [0, 0];
  for (let i = 0.5; i < s.length - 0.5; i+= 0.5) {
    let left = Math.floor(i);    
    let right = Math.ceil(i);
    
    while (s[left] === s[right] && left >= 0 && right < s.length) {
      left--;
      right++;
    }
    left++;
    right--;
    if (right - left > palindromeIdxs[1] - palindromeIdxs[0]) {
      palindromeIdxs[0] = left;
      palindromeIdxs[1] = right;
    }
  }
  return s.slice(palindromeIdxs[0], palindromeIdxs[1] + 1);
};
