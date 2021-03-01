/*
Given a non-empty string s, you may delete at most one character. Judge whether you can make it a palindrome.

Example 1:
Input: "aba"
Output: True
Example 2:
Input: "abca"
Output: True
Explanation: You could delete the character 'c'.
Note:
The string will only contain lowercase characters a-z. The maximum length of the string is 50000.
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    function recursivePalindrome(left, right, skipRemaining){
        while(left < right){
            if(s[left] !== s[right]) {
                if(!skipRemaining) return false;

                if(s[left] === s[right-1] && s[left+1] === s[right]) {
                    return recursivePalindrome(left, right-1, false) || 
                            recursivePalindrome(left+1, right, false);
                } else if(s[left] === s[right-1]) {
                    return recursivePalindrome(left, right-1, false);
                } else if (s[left+1] === s[right]) {
                    return recursivePalindrome(left+1, right, false);
                } else {
                    return false;
                }
            }
            left++;
            right--;
        }
        return true;
    }
    
    return recursivePalindrome(0, s.length-1, true);
};