/*
Given a list of sorted characters letters containing only lowercase letters, and given a target letter target, find the smallest element in the list that is larger than the given target.

Letters also wrap around. For example, if the target is target = 'z' and letters = ['a', 'b'], the answer is 'a'.

Examples:
Input:
letters = ["c", "f", "j"]
target = "a"
Output: "c"

Input:
letters = ["c", "f", "j"]
target = "c"
Output: "f"

Input:
letters = ["c", "f", "j"]
target = "d"
Output: "f"

Input:
letters = ["c", "f", "j"]
target = "g"
Output: "j"

Input:
letters = ["c", "f", "j"]
target = "j"
Output: "c"

Input:
letters = ["c", "f", "j"]
target = "k"
Output: "c"
Note:
letters has a length in range [2, 10000].
letters consists of lowercase letters, and contains at least 2 unique letters.
target is a lowercase letter.
*/

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
 var nextGreatestLetter = function(letters, target) {
    if(target.codePointAt(0) < letters[0].codePointAt(0) || 
       target.codePointAt(0) >= letters[letters.length-1].codePointAt(0))
        return letters[0];
    
    let left = 0;
    let right = letters[letters.length-1];
    
    while(right - left > 1){
        let guess = Math.round((left + right)/2);
        if(target.codePointAt(0) > letters[guess].codePointAt(0))
            left = guess;
        else if (target.codePointAt(0) < letters[guess].codePointAt(0))
            right = guess;
        else
            left = guess;
            break;
    }
    
    let i = left;
    while(letters[i].codePointAt(0) <= target.codePointAt(0)) i++;
    
    return letters[i];
};