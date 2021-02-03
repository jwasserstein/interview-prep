/*
Given a binary search tree with non-negative values, find the minimum absolute difference between values of any two nodes.

Example:

Input:

   1
    \
     3
    /
   2

Output:
1

Explanation:
The minimum absolute difference is 1, which is the difference between 2 and 1 (or between 2 and 3).
 

Note:

There are at least two nodes in this BST.
This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/
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
 * @return {number}
 */
var getMinimumDifference = function(root) {
    if(!root) return 0;
    if(!root.left && !root.right) return 0;
    
    const queue = [root];
    const nodes = [];
    while(queue.length > 0){
        const currNode = queue.shift();
        if(currNode.left) queue.push(currNode.left);
        if(currNode.right) queue.push(currNode.right);
        nodes.push(currNode.val);
    }
    
    nodes.sort((a, b) => a - b);
    
    let min;
    for(let i = 0; i < nodes.length-1; i++){
        if(!min || (nodes[i+1] - nodes[i]) < min) {
            min = nodes[i+1] - nodes[i];
        }
    }
    
    return min;
};