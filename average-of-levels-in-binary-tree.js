/*
Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.
Example 1:
Input:
    3
   / \
  9  20
    /  \
   15   7
Output: [3, 14.5, 11]
Explanation:
The average value of nodes on level 0 is 3,  on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11].
Note:
The range of node's value is in the range of 32-bit signed integer.
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
var averageOfLevels = function(root) {
    if(!root) return [];
    
    const out = [];
    const queue = [root, null];
    let sum = 0;
    let count = 0;
    while(queue.length > 1){
        const currNode = queue.shift();
        if(currNode !== null){
            if(currNode.left) queue.push(currNode.left);
            if(currNode.right) queue.push(currNode.right);
            sum += currNode.val;
            count++;
        } else {
            out.push(sum/count);
            sum = 0;
            count = 0;
            queue.push(null);
        }
    }
    if(count > 0) out.push(sum/count);
    return out;
};