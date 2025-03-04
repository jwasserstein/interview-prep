/*
Given a positive integer, return its corresponding column title as appear in an Excel sheet.

For example:

    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB 
    ...
Example 1:

Input: 1
Output: "A"
Example 2:

Input: 28
Output: "AB"
Example 3:

Input: 701
Output: "ZY"
Accepted
238,474
Submissions
756,021
*/

/**
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function(n) {
    let digit = 0;
    let output = ''
    while(n > 0){
        let val = ((n % (26**(digit+1))) / (26**(digit)));
        val = val || 26;
        n -= val * 26**digit;
        output = String.fromCodePoint(64 + val) + output;
        digit++;
    }
    return output;
};

/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
    let str = '';
    let i = 0;
    while (columnNumber > 0) {
      const value = ((columnNumber-1) % 26**(i+1) + 1)/(26**i);
      str = getDigit(value) + str;
      columnNumber -= value * 26**i;
      i++;
    }
    
    return str;
};
  
function getDigit(val) {
    return String.fromCodePoint(64 + val);
}