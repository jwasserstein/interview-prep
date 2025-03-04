/*
Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]
 

Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
 

Follow up: Could you do it in one pass?
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
 var reverseBetween = function(head, left, right) {
    if(!head.next) return head;
    if(left === right) return head;
    
    let prev = head;
    let curr = head.next;
    let next = head.next.next;
    let i = 2;
    let lastBefore;
    let firstWithin;
    
    if(left > 3) {
        while(i < left){
            prev = prev.next;
            curr = curr.next;
            next = next.next;
            i++;
        }

        lastBefore = prev;
        firstWithin = curr;

        prev = prev.next;
        curr = curr.next;
        next = next.next;
        i++;
    } else {
        if(left === 1){
            firstWithin = head;
        } else if (left === 2){
            lastBefore = head;
            firstWithin = head.next;
        } else {
            lastBefore = head.next;
            firstWithin = head.next.next;
        }
    }
    
    
    while(i < right){
        curr.next = prev;
        prev = curr;
        curr = next;
        next = next.next;
        i++;
    }
    
    firstWithin.next = next;
    curr.next = prev;
    if(left > 1){
        lastBefore.next = curr;
        return head;
    } else {
        return curr;
    }
};