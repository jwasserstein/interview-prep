/*
Given a string s, find the length of the longest substring without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
Example 4:

Input: s = ""
Output: 0
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    let count = 0;
    let seenChars = {};
    for(let i = 0; i < s.length; i++){
        if(s[i] in seenChars){
            maxLength = Math.max(maxLength, count);
            i = seenChars[s[i]] + 1;
            seenChars = {};
            count = 0;
        }
        seenChars[s[i]] = i;
        count++;
    }
    maxLength = Math.max(maxLength, count);
    return maxLength;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const seen = new Set();
    let start = 0;
    let maxLen = 0;
    for(let i = 0; i < s.length; i++) {
      while (seen.has(s[i])) {
        seen.delete(s[start]);
        start++;
      }
      maxLen = Math.max(maxLen, (i - start) + 1);
      seen.add(s[i]);
    }
    return maxLen;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (s.length === 0) return 0;

  const charSet = new Set([]);
  let left = 0;
  let right = 0;
  let maxLen = 0;
  
  while (right < s.length) {
    if (!charSet.has(s[right])) {
      charSet.add(s[right]);
      right++;
    } else {
      while (left < right && charSet.has(s[right])) {
        charSet.delete(s[left]);
        left++;
      }
      charSet.add(s[right]);
      right++;
    }
    maxLen = Math.max(maxLen, (right-left));
  }
  
  return maxLen;
};
  