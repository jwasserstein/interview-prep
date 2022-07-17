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

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    const validChars = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    
    let left = 0;
    let right = s.length-1;
    while (left < right) {
      let leftChar = s[left].toLowerCase();
      const rightChar = s[right].toLowerCase();
  
      if (!validChars.has(leftChar)) {
        left++;
        continue;
      }
      if (!validChars.has(rightChar)) {
        right--;
        continue;
      }
      
      if (leftChar !== rightChar) {
        return false;
      }
      
      left++;
      right--;
    }
    
    return true;
};
  
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let left = 0;
  let right = s.length-1;
  
  while (left < right) {
    const leftCP = s[left].toLowerCase().codePointAt(0);
    if (!isAlphanumeric(leftCP)) {
      left++;
      continue;
    }
    const rightCP = s[right].toLowerCase().codePointAt(0);
    if (!isAlphanumeric(rightCP)) {
      right--;
      continue;
    }
    
    if (leftCP !== rightCP) return false;
    left++;
    right--;
  }
  
  return true;
};

function isAlphanumeric(cp) {
  return (cp >= 97 && cp <= 122) // letter
      || (cp >= 48 && cp <= 57); // number
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let left = 0;
  let right = s.length-1;
  
  while (left < right) {
    while (!isAlphanumeric(s[left])) {
      if (left >= right) return true;
      left++;
    }
    while (!isAlphanumeric(s[right])) {
      if (left >= right) return true;
      right--;
    }
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  
  return true;
};

function isAlphanumeric(val) {
  const codePoint = val.toLowerCase().codePointAt(0);

  const isLetter = codePoint >= 97 && codePoint <= 122;
  const isNumber = codePoint >= 48 && codePoint <= 57;
  
  return isLetter || isNumber;
}
