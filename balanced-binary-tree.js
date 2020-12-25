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