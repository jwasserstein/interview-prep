/*
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
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
var levelOrder = function(root) {
  if (!root) return [];
  
	const out = [[]];
	const queue = [root, null];
	let currNode;
	while (queue.length > 1) {
		currNode = queue.shift();
		if (currNode === null) {
			out.push([]);
			queue.push(null);
			currNode = queue.shift();
		}
		out[out.length-1].push(currNode.val);
		if (currNode.left) queue.push(currNode.left);
		if (currNode.right) queue.push(currNode.right);
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const out = [];
  function dfs(node, level) {
    if (!node) return;
    
    if (level >= out.length) out.push([]);
    out[level].push(node.val);
    dfs(node.left, level+1);
    dfs(node.right, level+1);
  }
  dfs(root, 0);
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const out = [];
  function dfs(node, level) {
    if (!node) return;
    if (!out[level]) out[level] = [];
    
    dfs(node.left, level+1);
    out[level].push(node.val);
    dfs(node.right, level+1);
  }
  dfs(root, 0);
  return out;
};
