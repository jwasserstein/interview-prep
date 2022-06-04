/*

Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

 

Example 1:

Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.
Example 2:

Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.
 

Constraints:

1 <= words.length <= 500
1 <= words[i] <= 10
words[i] consists of lowercase English letters.
k is in the range [1, The number of unique words[i]]
 

Follow-up: Could you solve it in O(n log(k)) time and O(n) extra space?

*/

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
  const countMap = new Map();
  for (let i = 0; i < words.length; i++) {
    const count = countMap.get(words[i]);
    countMap.set(words[i], (count || 0) + 1);
  }
  
  const arr = Array.from(countMap);
  const n = Math.max(...arr.map(a => a[1]));;
  const buckets = new Array(n+1).fill(0).map(() => []);
  
  for (let i = 0; i < arr.length; i++) {
    const bucket = arr[i][1];
    buckets[bucket].push(arr[i]);
  }
  
  const out = [];
  for (let i = buckets.length-1; i >= 0; i--) {
    buckets[i].sort((a, b) => a[0] > b[0] ? 1 : -1);
    for (let j = 0; j < buckets[i].length; j++) {
      out.push(buckets[i][j][0]);
    }
  }
  
  return out.slice(0, k);
};
  