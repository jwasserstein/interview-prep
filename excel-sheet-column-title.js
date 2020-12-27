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
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 
                    'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 
                    'V', 'W', 'X', 'Y', 'Z'];
    
    let numDigits = 1;
    let target = n;
    while(target / (26**(numDigits-1)) > 26){
        target -= 26**numDigits;
        numDigits++;
    }
    let remaining = n;
    let output = '';
    for(let i = numDigits-1; i >= 0; i--){
        let tempRemaining = remaining;
        for(let j = i-1; j >= 0; j--){
            tempRemaining -= 26**j;
        }
        let currPower = Math.floor(tempRemaining/26**i);
        output += chars[currPower-1];
        remaining -= currPower * 26**i;
    }
    return output;
};