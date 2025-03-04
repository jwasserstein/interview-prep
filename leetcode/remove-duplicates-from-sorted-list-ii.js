/*
Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

 

Example 1:


Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
Example 2:


Input: head = [1,1,1,2,3]
Output: [2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.
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
 var deleteDuplicates = function(head) {
    if(!head || !head.next) return head;
    
    while(head.val === head.next.val){
        let runner = head.next;
        while(runner && runner.val === head.val) {
            runner = runner.next;
        }
        head = runner;
        if(!head || !head.next) return head;
    }
    
    let prevNode = head;
    let currNode = prevNode.next;
    while(currNode !== null && currNode.next !== null){
        if(currNode.val === currNode.next.val){
            let runner = currNode.next;
            while(runner && runner.val === currNode.val) {
                runner = runner.next;
            }
            prevNode.next = runner;
            currNode = runner;
        } else {
            prevNode = prevNode.next;
            currNode = currNode.next;
        }
    }
    
    return head;
};