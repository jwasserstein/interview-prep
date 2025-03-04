/*
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Example 2:

Input: strs = [""]
Output: [[""]]
Example 3:

Input: strs = ["a"]
Output: [["a"]]
 

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lower-case English letters.
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const out = [];
    const map = {};
    
    for(let i = 0; i < strs.length; i++){
        const word = strs[i].split('').sort().join('');
        if(word in map){
            map[word].push(strs[i]);
        } else {
            map[word] = [strs[i]];
        }
    }
    
    const keys = Object.keys(map);
    for(let i = 0; i < keys.length; i++){
        out.push(map[keys[i]]);
    }
    
    return out;
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = {};
    for (let i = 0; i < strs.length; i++) {
      const sortedString = strs[i].split('').sort().join('');
      if (sortedString in map) {
        map[sortedString].push(strs[i]);
      } else {
        map[sortedString] = [strs[i]];
      }
    }
    
    return Object.values(map);
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const anagramMap = {};
  for (let i = 0; i < strs.length; i++) {
    const sortedStr = strs[i].split('').sort().join('');
    anagramMap[sortedStr] = anagramMap[sortedStr] || [];
    anagramMap[sortedStr].push(strs[i]);
  }  
  const out = [];
  const entries = Object.entries(anagramMap);
  for (let i = 0; i < entries.length; i++) {
    const [key, val] = entries[i];
    out.push(val);
  }
  return out;
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const anagramMap = new Map();
  for (let i = 0; i < strs.length; i++) {
    const sortedStr = strs[i].split('').sort().join('');
    const currentAnagrams = anagramMap.get(sortedStr) || [];
    currentAnagrams.push(strs[i]);
    anagramMap.set(sortedStr, currentAnagrams);
  }
  
  const out = [];
  for (const [sortedStr, strsArr] of anagramMap) {
    out.push(strsArr);
  }
  return out;
};
