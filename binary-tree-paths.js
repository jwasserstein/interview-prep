/*
Given a binary tree, return all root-to-leaf paths.

Note: A leaf is a node with no children.

Example:

Input:

   1
 /   \
2     3
 \
  5

Output: ["1->2->5", "1->3"]

Explanation: All root-to-leaf paths are: 1->2->5, 1->3
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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    if(!root) return [];
    
    const output = [];
    const stack = [];
    function recurse(node){
        stack.push(node.val);
        if(!node.left && !node.right){
            output.push(stack.join('->'));
        }
        
        if(node.left) recurse(node.left);
        if(node.right) recurse(node.right);
        stack.pop();
    }
    recurse(root);
    return output;
};