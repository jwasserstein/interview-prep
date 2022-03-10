/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lower-case English letters.
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
  let prefix = strs[0];
  
  for(let i = 1; i < strs.length; i++) {
    const currStr = strs[i];
    const shorterLength = Math.min(prefix.length, currStr.length);
    for(let j = 0; j < shorterLength; j++) {
      if(prefix[j] !== currStr[j]) {
        prefix = currStr.slice(0, j);
        break;
      }
    }
    if(prefix.length > currStr.length) {
      prefix = currStr;
    }
  }
  
  return prefix;
};