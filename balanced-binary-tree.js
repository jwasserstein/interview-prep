/*
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the left and right subtrees of every node differ in height by no more than 1.
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
 * @return {boolean}
 */
var isBalanced = function(root) {
    if(!root) return true;
    
    function heightOf(node){
        if(!node) return -1;
        return Math.max(heightOf(node.left), heightOf(node.right)) + 1;
    }
    return (Math.abs(heightOf(root.left) - heightOf(root.right)) <= 1) && 
            isBalanced(root.left) && isBalanced(root.right);
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
 * @return {boolean}
 */
var isBalanced = function(root) {
  function recursiveBalanceCheck(node) {
    if (!node) {
      return { balanced: true, depth: 0 };
    } else if (!node.left && !node.right) {
      return { balanced: true, depth: 1 };
    }

    const left = recursiveBalanceCheck(node.left);
    const right = recursiveBalanceCheck(node.right);
    
    const depthDifference = Math.abs(left.depth - right.depth);
    
    return {
      balanced: left.balanced && right.balanced && depthDifference <= 1,
      depth: Math.max(left.depth, right.depth) + 1
    }
  }
  
  return recursiveBalanceCheck(root).balanced;
};