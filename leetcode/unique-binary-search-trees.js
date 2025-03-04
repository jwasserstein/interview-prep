/*
Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.

 

Example 1:


Input: n = 3
Output: 5
Example 2:

Input: n = 1
Output: 1
 

Constraints:

1 <= n <= 19
*/

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  const trees = (new Array(n+1)).fill(0);
  trees[0] = 1;
  trees[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      trees[i] += trees[j] * trees[i - j - 1];
    }
  }
  
  return trees[n];
};