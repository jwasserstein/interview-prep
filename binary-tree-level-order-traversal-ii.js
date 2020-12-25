/*
Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its bottom-up level order traversal as:
[
  [15,7],
  [9,20],
  [3]
]
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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    if(root === null) return [];
    
    const queue = [{node: root, level: 0}];
    const returnArr = [[]];
    let currLevel = 0;
    while(queue.length){
        const currNode = queue.shift();
        if(currNode.node.left) queue.push({node: currNode.node.left, 
                                            level: currNode.level + 1});
        if(currNode.node.right) queue.push({node: currNode.node.right,
                                            level: currNode.level + 1});
        if(currNode.level === currLevel) {
            returnArr[0].push(currNode.node.val);
        } else {
            returnArr.unshift([currNode.node.val]);
            currLevel++;
        }
    }
    return returnArr;
};