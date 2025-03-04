/*
Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree.

 

Example 1:


Input: root = [3,1,4,null,2], k = 1
Output: 1
Example 2:


Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
 

Constraints:

The number of nodes in the tree is n.
1 <= k <= n <= 104
0 <= Node.val <= 104
 

Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?
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
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
 var kthSmallest = function(root, k) {
    let count = 0;
    function inOrder(node){
        if(node.left) {
            const left = inOrder(node.left);
            if(left !== -1) return left;
        }
        count++;
        if(count >= k) return node.val;
        if(node.right) {
            const right = inOrder(node.right);
            if(right !== -1) return right;
        }
        return -1;
    }
    
    return inOrder(root);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let counter = 1;
    function recursiveFind(node) {
      if (node) {
        if (node.left) {
          const val = recursiveFind(node.left);
          if (val !== undefined) return val;
        }
        if (counter === k) return node.val;
        counter++;
        if (node.right) {
          const val = recursiveFind(node.right);
          if (val !== undefined) return val;
        }
      }
    }
    return recursiveFind(root);
};
  
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  let count = 0;
  let kthSmallestValue = null;
  function dfs(node) {
    if (!node || kthSmallestValue !== null) return;
    
    dfs(node.left);
    count++;
    if (count === k) {
      kthSmallestValue = node.val;
    }
    dfs(node.right);
  }
  dfs(root);
  return kthSmallestValue;
};
