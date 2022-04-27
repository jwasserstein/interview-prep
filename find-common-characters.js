/*
Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.

 

Example 1:

Input: words = ["bella","label","roller"]
Output: ["e","l","l"]
Example 2:

Input: words = ["cool","lock","cook"]
Output: ["c","o"]
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of lowercase English letters.
*/

/**
 * @param {string[]} words
 * @return {string[]}
 */
var commonChars = function(words) {
  const out = [];
  
  const charCounts = words.map(word => {
    const count = {};
    const letters = word.split('');
    for (let i = 0; i < letters.length; i++) {
      count[letters[i]] = (count[letters[i]] || 0) + 1;
    }
    return count;
  });
  
  const chars = Object.keys(charCounts[0]);
  for (let i = 0; i < chars.length; i++) {
    let commonCount = charCounts[0][chars[i]];
    for (let j = 1; j < charCounts.length; j++) {
      commonCount = Math.min(commonCount, charCounts[j][chars[i]] || 0);
    }
    if (commonCount > 0) {
      out.push(...(new Array(commonCount)).fill(chars[i]));
    }
  }
  
  return out;
};