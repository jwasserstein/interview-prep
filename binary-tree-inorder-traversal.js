/*
Given the root of a binary tree, return the inorder traversal of its nodes' values.

 

Example 1:


Input: root = [1,null,2,3]
Output: [1,3,2]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]
Example 4:


Input: root = [1,2]
Output: [2,1]
Example 5:


Input: root = [1,null,2]
Output: [1,2]
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 

Follow up:

Recursive solution is trivial, could you do it iteratively?
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
 * @return {number[]}
 */
 var inorderTraversal = function(root) {
    if(!root) return [];
    
    const out = [];
    function inOrder(node){
        if(node.left) inOrder(node.left);
        out.push(node.val);
        if(node.right) inOrder(node.right);
    }
    inOrder(root);
    
    return out;
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
 * @return {number[]}
 */
 var inorderTraversalIterative = function(root) {
    if(!root) return [];
    
    const out = [];
    const stack = [root];
    const set = new Set();
    while(stack.length > 0){
        const currNode = stack.pop();
        if(currNode.left && !set.has(currNode.left)) {
            stack.push(currNode);
            stack.push(currNode.left);
            continue;
        }
        out.push(currNode.val);
        set.add(currNode);
        if(currNode.right && !set.has(currNode.right)) {
            stack.push(currNode.right);
        }
    }
    
    return out;
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
 * @return {number[]}
 */
 var inorderTraversalIterative2 = function(root) {
    if(!root) return [];
    
    const out = [];
    const stack = [];
    let currNode = root;
    while(stack.length > 0 || currNode){
        while(currNode){
            stack.push(currNode);
            currNode = currNode.left;
        }
        
        currNode = stack.pop();
        out.push(currNode.val);
        currNode = currNode.right;
    }
    
    return out;
};