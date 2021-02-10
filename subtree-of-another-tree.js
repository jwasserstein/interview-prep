/*
Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.

Example 1:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
Given tree t:
   4 
  / \
 1   2
Return true, because t has the same structure and node values with a subtree of s.
 

Example 2:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
    /
   0
Given tree t:
   4
  / \
 1   2
Return false.
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
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function(s, t) {
    function rSearch(sNode){
        if(sNode.val === t.val && rCompare(sNode, t)) return true;
        if(sNode.left && rSearch(sNode.left)) return true;
        if(sNode.right && rSearch(sNode.right)) return true;
        return false;
    }
    
    function rCompare(sNode, tNode){
        if(sNode?.val !== tNode?.val) return false;
        if((sNode.left || tNode.left) && !rCompare(sNode.left, tNode.left)) 
            return false;
        if((sNode.right || tNode.right) && !rCompare(sNode.right, tNode.right))
            return false;
        return true;
    }
    return rSearch(s);
};