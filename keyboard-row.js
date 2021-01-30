/*
Given an array of strings words, return the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below.

In the American keyboard:

the first row consists of the characters "qwertyuiop",
the second row consists of the characters "asdfghjkl", and
the third row consists of the characters "zxcvbnm".

 

Example 1:

Input: words = ["Hello","Alaska","Dad","Peace"]
Output: ["Alaska","Dad"]
Example 2:

Input: words = ["omk"]
Output: []
Example 3:

Input: words = ["adsdf","sfd"]
Output: ["adsdf","sfd"]
 

Constraints:

1 <= words.length <= 20
1 <= words[i].length <= 100
words[i] consists of English letters (both lowercase and uppercase). 
*/

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
    const rows = [
        new Set(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']),
        new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']),
        new Set(['z', 'x', 'c', 'v', 'b', 'n', 'm'])
    ];
    
    let out = [];
    for(let i = 0; i < words.length; i++){
        let row;
        for(let j = 0; j < rows.length; j++){
            if(rows[j].has(words[i][0].toLowerCase())) {
                row = j;
                break;
            }
        }
        let include = true;
        for(let j = 1; j < words[i].length; j++){
            if(!rows[row].has(words[i][j].toLowerCase())){
                include = false;
                break;
            }
        }
        if(include) {
            out.push(words[i]);
        }
    }
    return out;
};