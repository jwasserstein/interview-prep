/*
Given a string, find the first non-repeating character in it and return its index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode"
return 2.
 

Note: You may assume the string contains only lowercase English letters.
*/

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    const map = {};
    
    for(let i = 0; i < s.length; i++){
        if(s[i] in map) map[s[i]]++;
        else map[s[i]] = 1;
    }
    
    for(let i = 0; i < s.length; i++){
        if(map[s[i]] === 1) return i;
    }
    
    return -1;
};