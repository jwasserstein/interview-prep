/*
Given a word, you need to judge whether the usage of capitals in it is right or not.

We define the usage of capitals in a word to be right when one of the following cases holds:

All letters in this word are capitals, like "USA".
All letters in this word are not capitals, like "leetcode".
Only the first letter in this word is capital, like "Google".
Otherwise, we define that this word doesn't use capitals in a right way.
 

Example 1:

Input: "USA"
Output: True
 

Example 2:

Input: "FlaG"
Output: False
 

Note: The input will be a non-empty word consisting of uppercase and lowercase latin letters.
*/

/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
    const caps = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
                         'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
                         'W', 'X', 'Y', 'Z']);
    
    let rule1 = true;
    let rule2 = true;
    let rule3 = true;
    for(let i = 0; i < word.length; i++){
        if(!caps.has(word[i])) {
            rule1 = false;
        }
        if(caps.has(word[i])) {
            rule2 = false;
        }
        if((i === 0 && !caps.has(word[i])) || (i > 0 && caps.has(word[i]))) {
            rule3 = false;
        }
    }
    
    return rule1 || rule2 || rule3;
};