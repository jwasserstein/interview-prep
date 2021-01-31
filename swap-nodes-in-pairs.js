/*
Given a linked list, swap every two adjacent nodes and return its head.

 

Example 1:


Input: head = [1,2,3,4]
Output: [2,1,4,3]
Example 2:

Input: head = []
Output: []
Example 3:

Input: head = [1]
Output: [1]
 

Constraints:

The number of nodes in the list is in the range [0, 100].
0 <= Node.val <= 100
 

Follow up: Can you solve the problem without modifying the values in the list's nodes? (i.e., Only nodes themselves may be changed.)
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
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if(!head || !head.next) return head;
    
    const newHead = head.next;
    head.next = head.next.next;
    newHead.next = head;
    let currNode = head.next;
    let prevNode = head;
    
    while(currNode && currNode.next){
        if(prevNode){
            prevNode.next = prevNode.next.next;
        }
        currNode.next = currNode.next.next;
        prevNode.next.next = currNode;
        prevNode = currNode;
        currNode = currNode.next;
    }
    
    return newHead;
};