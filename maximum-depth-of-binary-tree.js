/* Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. */


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
 * @return {number}
 */
var maxDepth = function(root) {
    if(root === null) return 0;
    
    function findDepth(node, maxDepth){
        // Base case
        if(!node.left && !node.right) return maxDepth;

        // Recursive case
        const left = node.left ? findDepth(node.left, maxDepth+1) : 0;
        const right = node.right ? findDepth(node.right, maxDepth+1) : 0;

        return Math.max(left, right);
    }
    return findDepth(root, 1);
};