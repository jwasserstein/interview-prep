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
var isPalindrome2 = function(head) {
    if(!head || !head.next) return true;
    
    let fast = head;
    let slow = head;
    // Advance fast to end and slow to mid-way point
    while(fast !== null && fast.next !== null){
        fast = fast.next.next;
        slow = slow.next;
    }
    
    // Reverse second half and revert fast back to beginning
    fast = head;
    let prev = null;
    let next = slow.next;
    while(next){
        slow.next = prev;
        prev = slow;
        slow = next;
        next = next.next;
    }
    slow.next = prev;
    
    // Check for palindrome
    while(slow && fast){
        if(slow.val !== fast.val) return false;
        slow = slow.next;
        fast = fast.next;
    }
    return true;
};

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
    const vals = [];
    let node = head;
    while (node) {
      vals.push(node.val);
      node = node.next;
    }
    
    let left = 0;
    let right = vals.length-1;
    while (left < right) {
      if (vals[left] !== vals[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
}

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
    if (!head.next) { // 1 nodes
      return true;
    }
    if (!head.next.next) { // 2 nodes
      return head.val === head.next.val;
    }
    if (!head.next.next.next) { // 3 nodes
      return head.val === head.next.next.val;
    }
    if (!head.next.next.next.next) { // 4 nodes
      return head.val === head.next.next.next.val
        && head.next.val === head.next.next.val;
    }
    
    let len = 2;
    let slow = head;
    let fast = head.next;
    while (fast) {
      if (fast.next) len++;
      if (fast.next?.next) len++;
      slow = slow.next;
      fast = fast.next?.next;
    }
    
    let prev = null;
    let curr = head;
    let next = curr.next;
    while (curr !== slow) {
      curr.next = prev;
      prev = curr;
      curr = next;
      next = next.next;
    }
    
    let left = prev;
    let right = len % 2 === 0 ? slow : slow.next;
    while (left && right) {
      if (left.val !== right.val) {
        return false;
      }
      left = left.next;
      right = right.next;
    }
    return true;
};
  