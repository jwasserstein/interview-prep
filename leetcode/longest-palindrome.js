/*
Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

 

Example 1:

Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
Example 2:

Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.
 

Constraints:

1 <= s.length <= 2000
s consists of lowercase and/or uppercase English letters only.
*/

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
  const count = new Map();
  for (let i = 0; i < s.length; i++) {
    if (count.has(s[i])) {
      count.set(s[i], count.get(s[i]) + 1);
    } else {
      count.set(s[i], 1);
    }
  }
  
  let len = 0;
  let usedCenterChar = false;
  for (const [letter, freq] of count.entries()) {
    if (freq >= 2) {
      len += freq - (freq % 2);
    }
    if (freq % 2 === 1 && !usedCenterChar) {
      len++;
      usedCenterChar = true;
    }
  }
  
  return len;
};
