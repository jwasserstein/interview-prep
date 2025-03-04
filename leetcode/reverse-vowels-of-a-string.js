/*
Write a function that takes a string as input and reverse only the vowels of a string.

Example 1:

Input: "hello"
Output: "holle"
Example 2:

Input: "leetcode"
Output: "leotcede"
Note:
The vowels does not include the letter "y".
*/

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    
    let arr = s.split('');
    let left = 0;
    let right = arr.length-1;
    
    while(left < right){
        if(vowels.has(arr[left]) && vowels.has(arr[right])){
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
            continue;
        }
        if(!vowels.has(arr[left])){
            left++;
        }
        if(!vowels.has(arr[right])){
            right--;
        }
    }
    return arr.join('');
};