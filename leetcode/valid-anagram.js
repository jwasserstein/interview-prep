/*
Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    let hashMap = {};
    for(let i = 0; i < s.length; i++){
        if(s[i] in hashMap) {
            hashMap[s[i]]++;
        } else {
            hashMap[s[i]] = 1;
        }
    }
    for(let i = 0; i < t.length; i++){
        if(!hashMap[t[i]]){
            return false;
        } else {
            hashMap[t[i]]--;
            if(hashMap[t[i]] === 0){
                delete hashMap[t[i]];
            }
        }
    }
    return Object.keys(hashMap).length === 0;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    const counts = {};
    
    for (let i = 0; i < s.length; i++) {
      if (s[i] in counts) {
        counts[s[i]]++;
      } else {
        counts[s[i]] = 1;
      }
    }
    
    for (let i = 0; i < t.length; i++) {
      if (!(t[i] in counts)) {
        return false;
      }
      counts[t[i]]--;
      if (counts[t[i]] === 0) {
        delete counts[t[i]];
      }
    }
    
    return Object.keys(counts).length === 0;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  const sCount = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    sCount[char] = (sCount[char] || 0) + 1;
  }
  for (let i = 0; i < t.length; i++) {
    const char = t[i];
    if (!(char in sCount)) return false;
    sCount[char]--;
    if (sCount[char] < 1) delete sCount[char];
  }
  return Object.keys(sCount).length === 0;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  const sMap = {};
  for (let i = 0; i < s.length; i++) {
    sMap[s[i]] = (sMap[s[i]] || 0) + 1;
  }
  
  for (let i = 0; i < t.length; i++) {
    if (!t[i] in sMap) {
      return false;
    }
    sMap[t[i]]--;
    if (sMap[t[i]] === 0) delete sMap[t[i]];
  }
  
  return Object.keys(sMap).length === 0;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  const sCounts = new Map();
  for (let i = 0; i < s.length; i++) {
    sCounts.set(s[i], (sCounts.get(s[i]) || 0)+1);
  }
  
  for (let i = 0; i < t.length; i++) {
    let sCount = sCounts.get(t[i]);
    if (!sCount) {
      return false;
    }
    sCount--;
    if (sCount === 0) {
      sCounts.delete(t[i]);
    } else {
      sCounts.set(t[i], sCount);
    }
  }
  
  return sCounts.size === 0;
};
