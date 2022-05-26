/*
Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.

 

Example 1:


Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 8
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  function recursiveTree(vals) {
    if (vals.length === 1) {
      return [new TreeNode(vals[0], null, null)];
    }
    
    const trees = [];
    for (let i = 0; i < vals.length; i++) {
      let leftSubTrees = [];
      if (i > 0) {
        const leftVals = vals.slice(0, i);
        leftSubTrees = recursiveTree(leftVals);
      }
      let rightSubTrees = [];
      if (i < vals.length) {
        const rightVals = vals.slice(i + 1);
        rightSubTrees = recursiveTree(rightVals);
      }
      
      if (leftSubTrees.length > 0 && rightSubTrees.length > 0) {
        leftSubTrees.forEach(leftTree => {
          rightSubTrees.forEach(rightTree => {
            trees.push(new TreeNode(vals[i], leftTree, rightTree));
          });
        });
      } else if (leftSubTrees.length > 0) {
        leftSubTrees.forEach(leftTree => {
          trees.push(new TreeNode(vals[i], leftTree, null));
        });
      } else {
        rightSubTrees.forEach(rightTree => {
          trees.push(new TreeNode(vals[i], null, rightTree));
        });
      }
      
    }
    
    return trees;
  }
  
  const values = [];
  for (let i = 1; i <= n; i++) {
    values[i-1] = i;
  }
  
  return recursiveTree(values);
};