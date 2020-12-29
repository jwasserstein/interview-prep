/*
Reverse a singly linked list.

Example:

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?
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
var reverseList = function(head) {
    if(head === null) return null;
    
    let stack = [];
    while(head !== null){
        stack.push(head.val);
        head = head.next;
    }
    const root = new ListNode(stack.pop());
    let currNode = root;
    while(stack.length > 0){
        currNode.next = new ListNode(stack.pop());
        currNode = currNode.next;
    }
    return root;
};