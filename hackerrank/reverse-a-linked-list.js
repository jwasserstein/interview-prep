/*
Given the pointer to the head node of a linked list, change the next pointers of the nodes so that their order is reversed. The head pointer given may be null meaning that the initial list is empty.

Example
 references the list 

Manipulate the  pointers of each node in place and return , now referencing the head of the list .

Function Description

Complete the reverse function in the editor below.

reverse has the following parameter:

SinglyLinkedListNode pointer head: a reference to the head of a list
Returns

SinglyLinkedListNode pointer: a reference to the head of the reversed list
Input Format

The first line contains an integer , the number of test cases.

Each test case has the following format:

The first line contains an integer , the number of elements in the linked list.
Each of the next  lines contains an integer, the  values of the elements in the linked list.

Constraints

, where  is the  element in the list.
Sample Input

1
5
1
2
3
4
5
Sample Output

5 4 3 2 1 
Explanation

The initial linked list is: .

The reversed linked list is: .
*/

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function reverse(head) {
    if(!head || !head.next) return head;
    if(!head.next.next) {
        const newHead = head.next;
        newHead.next = head;
        head.next = null;
        return newHead;
    }
    
    let prevNode = head;
    let currNode = prevNode.next;
    let nextNode = currNode.next;
    
    prevNode.next = null;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
    nextNode = nextNode.next;
    
    while(nextNode){
        currNode.next = prevNode;
        prevNode = currNode;
        currNode = nextNode;
        nextNode = nextNode.next;
    }
    currNode.next = prevNode;
    return currNode;
}