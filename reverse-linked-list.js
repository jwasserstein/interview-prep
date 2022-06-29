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

var reverseListRecursive = function(head) {
    if(head === null) return null;
    
    const root = new ListNode();
    function recursiveReverse(node){       
        if(!node.next){
            root.val = node.val;
            return root;
        }
        
        const prevNode = recursiveReverse(node.next);
        prevNode.next = new ListNode(node.val);
        return prevNode.next;
    }
    recursiveReverse(head);
    return root;
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
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head || !head.next) {
      return head;
    }
    
    let prevNode = head;
    let currNode = head.next;
    let nextNode = head.next.next;
  
    prevNode.next = null;
  
    while (currNode) {
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
      nextNode = nextNode?.next;
    }
    
    return prevNode;
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
 * @return {ListNode}
 */
 var reverseList = function(head) {
    if (!head || !head.next) return head;
      
    let prev = null;
    let curr = head;
    let next = head.next;
    
    while (curr) {
      curr.next = prev;
      prev = curr;
      curr = next;
      next = next?.next;
    }
  
    return prev;
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
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head || !head.next) return head;
    
    let dummy = new ListNode(0, head);
  
    let prev = dummy;
    let curr = head;
    let next = head.next;
    
    while (next) {
      curr.next = prev;
      prev = curr;
      curr = next;
      next = next?.next;
    }
    
    dummy.next.next = null
    curr.next = prev;
    
    return curr;
};