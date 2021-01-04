/*
Given a singly linked list, determine if it is a palindrome.

Example 1:

Input: 1->2
Output: false
Example 2:

Input: 1->2->2->1
Output: true
Follow up:
Could you do it in O(n) time and O(1) space?
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
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if(!head || !head.next) return true;
    
    const arr = [];
    let currNode = head;
    while(currNode){
        arr.push(currNode.val);
        currNode = currNode.next;
    }
    let left = 0;
    let right = arr.length-1;
    while(left < right){
        if(arr[left] !== arr[right]) return false;
        left++;
        right--;
    }
    return true;
};