/*
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

 

Example 1:


Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:


Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:


Input: p = [1,2,1], q = [1,1,2]
Output: false
 

Constraints:

The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
 var isSameTree = function(p, q) {
  if (!p || !q) {
    return Boolean(p === q);
  }
  
  const pQ = [p];
  const qQ = [q];
  
  for (let i = 0; i < pQ.length; i++) {
    if (pQ[i].val !== qQ[i].val) {
      return false;
    }
    if (Boolean(pQ[i].left) !== Boolean(qQ[i].left)
        || Boolean(pQ[i].right) !== Boolean(qQ[i].right)) {
      return false;
    }

    if (pQ[i].left) {
      pQ.push(pQ[i].left);
      qQ.push(qQ[i].left);
    }
    if (pQ[i].right) {
      pQ.push(pQ[i].right);
      qQ.push(qQ[i].right);
    }
  }
  
  return true;
};