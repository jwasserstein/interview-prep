/*

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

 

Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [1,2], p = 1, q = 2
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the tree.

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  const pPath = dfs(root, p, []);
  const qPath = dfs(root, q, []);
  
  let pPtr = 0;
  let qPtr = 0;
  while (pPath[pPtr] === qPath[qPtr]) {
    pPtr++;
    qPtr++;
  }
  
  return pPath[pPtr-1];
};

function dfs(node, target, path) {
  if (!node) return null;
  if (node === target) return [...path, node];
  
  if (node.left) {
    path.push(node);
    const left = dfs(node.left, target, path);
    path.pop();
    if (left) return left;
  }
  if (node.right) {
    path.push(node);
    const right = dfs(node.right, target, path);
    path.pop();
    if (right) return right;
  }
  
  return null;
}
