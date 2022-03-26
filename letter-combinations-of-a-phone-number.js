/*
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.



 

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
 

Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].
*/

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if(digits.length === 0) return [];
    
    const letters = [
        null,
        null,
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r', 's'],
        ['t', 'u', 'v'],
        ['w', 'x', 'y', 'z']
    ];
    
    let out = [];
    function recurse(str){
        if(str.length === digits.length){
            out.push(str);
            return;
        }
        
        const digitLetters = letters[digits[str.length]];
        for(let i = 0; i < digitLetters.length; i++){
            recurse(str + digitLetters[i]);
        }
    }
    recurse('');
    return out;
};

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits) return [];
  
    const digitMapping = {
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z']
    };
    
    const out = [];
    function recursiveDigit(prefix, digits) {
      if (digits.length === 0) {
        out.push(prefix);
        return;
      }
      
      const currDigit = digits[0];
      digitMapping[currDigit].forEach(letter => {
        recursiveDigit(prefix + letter, digits.slice(1));
      });
    }
    
    recursiveDigit('', digits);
    return out;
};
  