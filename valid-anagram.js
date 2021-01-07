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