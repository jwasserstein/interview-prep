/*
Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

Example:

Given the sorted array: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \
   -3   9
   /   /
 -10  5
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if(nums.length === 0) return null;
    if(nums.length === 1) return new TreeNode(nums[0]);

    const startingIndex = Math.floor(nums.length/2);
    let root = new TreeNode(nums[startingIndex]);
    root.left = sortedArrayToBST(nums.slice(0, startingIndex));
    root.right = sortedArrayToBST(nums.slice(startingIndex+1));
    return root;
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  function getNode(l, r) {
    if (r === l) {
      return new TreeNode(nums[l], null, null);
    } else if (r - l === 1) {
      const rNode = new TreeNode(nums[r], null, null);
      const lNode = new TreeNode(nums[l], null, null);
      rNode.left = lNode;
      return rNode;
    }
    
    const midPoint = Math.round((l + r) / 2);
    return new TreeNode(nums[midPoint], getNode(l, midPoint-1), getNode(midPoint+1, r));
  }
  return getNode(0, nums.length-1);
}
