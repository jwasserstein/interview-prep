/*
Given the head of a linked list, rotate the list to the right by k places.

 

Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
Example 2:


Input: head = [0,1,2], k = 4
Output: [2,0,1]
 

Constraints:

The number of nodes in the list is in the range [0, 500].
-100 <= Node.val <= 100
0 <= k <= 2 * 109
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var rotateRight = function(head, k) {
    if(!head || !head.next) return head;
    
    let numNodes = 0;
    let currNode = head;
    let tail;
    while(currNode){
        numNodes++;
        if(!currNode.next) tail = currNode;
        currNode = currNode.next;
    }
    
    const rotations = k % numNodes;
    if(rotations === 0) return head;
    
    tail.next = head;
    currNode = head;
    let trailer = tail;
    for(let i = 0; i < numNodes - rotations; i++) {
        currNode = currNode.next;
        trailer = trailer.next;
    }
    trailer.next = null;
    
    return currNode;
};