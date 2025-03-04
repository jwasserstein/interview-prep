/*

Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

 

Example 1:


Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.
Example 2:

Input: head = []
Output: []
 

Constraints:

The number of nodes in head is in the range [0, 2 * 104].
-105 <= Node.val <= 105

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  if (!head) return null;
  if (!head.next) return new TreeNode(head.val, null, null);
  
  const leftTail = getMidNode(head);
  const currRoot = leftTail.next;
  const rightRoot = currRoot.next;
  leftTail.next = null;
  currRoot.next = null;

  const root = new TreeNode(currRoot.val, null, null);
  root.left = sortedListToBST(head);
  root.right = sortedListToBST(rightRoot);
  return root;
};

function getMidNode(head) {
  let count = 0;
  
  let curr = head;
  while (curr) {
    curr = curr.next;
    count++;
  }
  
  curr = head;
  const halfCount = Math.floor(count/2);
  count = 1;
  while (count < halfCount) {
    curr = curr.next;
    count++;
  }
  
  return curr;
}