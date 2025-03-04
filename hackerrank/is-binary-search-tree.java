/*
For the purposes of this challenge, we define a binary tree to be a binary search tree with the following ordering requirements:

The  value of every node in a node's left subtree is less than the data value of that node.
The  value of every node in a node's right subtree is greater than the data value of that node.
Given the root node of a binary tree, can you determine if it's also a binary search tree?

Complete the function in your editor below, which has  parameter: a pointer to the root of a binary tree. It must return a boolean denoting whether or not the binary tree is a binary search tree. You may have to write one or more helper functions to complete this challenge.

Input Format

You are not responsible for reading any input from stdin. Hidden code stubs will assemble a binary tree and pass its root node to your function as an argument.

Constraints

Output Format

You are not responsible for printing any output to stdout. Your function must return true if the tree is a binary search tree; otherwise, it must return false. Hidden code stubs will print this result as a Yes or No answer on a new line.

Sample Input

tree

Sample Output

No
*/

boolean checkBST(Node root) {
    int[] out = inOrder(root);
    return out.length != 0;
}

int[] inOrder(Node node){
    if(node.left == null && node.right == null)
        return new int [] {node.data, node.data};
    
    int[] left = {};
    int[] right = {};
    
    if(node.left != null) {
        left = inOrder(node.left);
        if(left.length == 0 || left[1] >= node.data)
            return new int [] {};
    }
    if(node.right != null){
        right = inOrder(node.right);
        if(right.length == 0 || right[0] <= node.data)
            return new int []{};
    }
    
    int min,max;
    if(left.length > 0) min = left[0];
    else min = right[0];
    if(right.length > 0) max = right[1];
    else max = right[1];
    
    return new int[] {min, max};
}