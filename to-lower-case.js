/*
Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.

 

Example 1:

Input: "Hello"
Output: "hello"
Example 2:

Input: "here"
Output: "here"
Example 3:

Input: "LOVELY"
Output: "lovely"
*/

/**
 * @param {string} str
 * @return {string}
 */
 var toLowerCase = function(str) {
    let out = '';
    for(let i = 0; i < str.length; i++){
        let codePoint = str.codePointAt(i);
        if(codePoint >= 65 && codePoint <= 90) codePoint += 32;
        out += String.fromCharCode(codePoint);
    }
    return out;
};