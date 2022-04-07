/*
Given a string s, reverse the string according to the following rules:

All the characters that are not English letters remain in the same position.
All the English letters (lowercase or uppercase) should be reversed.
Return s after reversing it.

 

Example 1:

Input: s = "ab-cd"
Output: "dc-ba"
Example 2:

Input: s = "a-bC-dEf-ghIj"
Output: "j-Ih-gfE-dCba"
Example 3:

Input: s = "Test1ng-Leet=code-Q!"
Output: "Qedo1ct-eeLg=ntse-T!"
 

Constraints:

1 <= s.length <= 100
s consists of characters with ASCII values in the range [33, 122].
s does not contain '\"' or '\\'.
*/

/**
 * @param {string} s
 * @return {string}
 */
 var reverseOnlyLetters = function(s) {
  const sArr = s.split('');
  
  let left = 0;
  let right = s.length-1;
  
  let out = '';
  while (left < right) {
    while (!isEnglish(sArr[left])) {
      left++;
      if (left >= right) return sArr.join('');
    }
    while (!isEnglish(sArr[right])) {
      right--;
      if (right <= left) return sArr.join('');
    }
    [sArr[left], sArr[right]] = [sArr[right], sArr[left]];
    left++;
    right--;
  }
  return sArr.join('');
};

function isEnglish(c) {
  const codePoint = c.codePointAt(0);
  return (codePoint >= 65 && codePoint <= 90) || (codePoint >= 97 && codePoint <= 122);
}