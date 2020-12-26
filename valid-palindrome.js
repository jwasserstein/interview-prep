/*
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false
 

Constraints:

s consists only of printable ASCII characters.
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    const alphabet = ['a','b','c','d','e','f','g','h',
                      'i','j','k','l','m','n','o','p',
                      'q','r','s','t','u','v','w','x',
                      'y','z', '0', '1', '2', '3', '4',
                     '5', '6', '7', '8', '9'];
    let left = 0;
    let right = s.length - 1;
    while(left < right){
        if(!alphabet.includes(s[left].toLowerCase())){
            left++;
            continue;
        }
        if(!alphabet.includes(s[right].toLowerCase())){
            right--;
            continue;
        }
        if(s[left].toLowerCase() !== s[right].toLowerCase()){
            return false;
        }
        left++;
        right--;
    }
    return true;
};