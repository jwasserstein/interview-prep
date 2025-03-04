/*
Given a string and an integer k, you need to reverse the first k characters for every 2k characters counting from the start of the string. If there are less than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and left the other as original.
Example:
Input: s = "abcdefg", k = 2
Output: "bacdfeg"
Restrictions:
The string consists of lower English letters only.
Length of the given string and k will in the range [1, 10000]
*/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    let out = '';
    let start = 0;
    while(start < s.length){
        for(let i = start+k-1; i >= start; i--){
            if(i >= s.length) i = s.length - 1;
            out += s[i];
        }
        start += k;
        for(let i = start; i < start+k; i++){
            if(i >= s.length) return out;
            out += s[i];
        }
        start += k;
    }
    return out;
};
