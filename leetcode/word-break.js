/*

Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.

*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const wordSet = new Set(wordDict);
  
  const memo = {};
  function recursiveWord(idx) {
    if (idx >= s.length) {
      memo[idx] = true;
      return memo[idx];
    }
    if (idx in memo) return memo[idx];
    
    for (let i = idx; i < s.length; i++) {
      const subStr = s.slice(idx, i+1);
      if (wordSet.has(subStr) && recursiveWord(i+1)) {
        memo[idx] = true;
        return memo[idx];
      }
    }
    
    memo[idx] = false;
    return memo[idx];
  }
  
  return recursiveWord(0);
};
