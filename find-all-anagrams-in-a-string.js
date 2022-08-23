/*

Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
Example 2:

Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
 

Constraints:

1 <= s.length, p.length <= 3 * 104
s and p consist of lowercase English letters.

*/

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
 var findAnagrams = function(s, p) {
  const pCount = generateCount(p);
  let charsToMatch = new Set(p);
  let sCount = { [s[0]]: 1 };
  const out = [];
  
  let left = 0;
  let right = 0;
  while (right <= s.length) {
    const rChar = s[right];
    const lChar = s[left];
    
    if (!pCount[rChar]) {
      right++;
      left = right;
      sCount = { [s[left]]: 1 };
      charsToMatch = new Set(p);
      continue;
    } 
    
    if (sCount[rChar] === pCount[rChar]) {
      charsToMatch.delete(rChar);
      if (charsToMatch.size === 0) {
        out.push(left);
        sCount[lChar] = (sCount[lChar] || 0) - 1;
        charsToMatch.add(lChar);
        left++;
        if (left > right) {
          right = left;
          sCount[s[right]] = (sCount[s[right]] || 0) + 1;
        }
        continue;
      }
    } else {
      sCount[lChar] = (sCount[lChar] || 0) - 1;
      charsToMatch.add(lChar);
      left++;
      if (left > right) {
        right = left;
      }
      continue;
    }
    right++;
    sCount[s[right]] = (sCount[s[right]] || 0) + 1;
  }
  
  return out;
};

function generateCount(s) {
  const countMap = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] in countMap) {
      countMap[s[i]]++;
    } else {
      countMap[s[i]] = 1;
    }
  }
  return countMap;
}

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  const pCount = {};
  for (let i = 0; i < p.length; i++) {
    pCount[p[i]] = (pCount[p[i]] || 0) + 1;
  }
  
  const out = [];
  const currCount = { ...pCount };
  let left = 0;
  let right = 0;
  while (right < s.length) {
    if (s[right] in currCount) {
      currCount[s[right]]--;
      if (currCount[s[right]] === 0) {
        delete currCount[s[right]];
      }
      right++;
    } else if (left >= right) {
      left++;
      right++;
    } else {
      if (Object.keys(currCount).length === 0) {
        out.push(left);
      }
      currCount[s[left]] = (currCount[s[left]] || 0) + 1;
      left++;
    }
  }
  if (Object.keys(currCount).length === 0) {
    out.push(left);
  }
  
  return out;
};
