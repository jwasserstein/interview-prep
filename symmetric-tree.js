/*
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

 

Example 1:


Input: root = [1,2,2,3,4,4,3]
Output: true
Example 2:


Input: root = [1,2,2,null,3,null,3]
Output: false
 

Constraints:

The number of nodes in the tree is in the range [1, 1000].
-100 <= Node.val <= 100
 

Follow up: Could you solve it both recursively and iteratively?
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isSymmetricRecursive = function(root) {
    function dfs(node1, node2){
        if(!node2) return false;
        if(node1.left && !dfs(node1.left, node2.right)) return false;
        if(node1.val !== node2.val) return false;
        if(node1.right && !dfs(node1.right, node2.left)) return false;
        return true;
    }
    
    return dfs(root, root);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
 var isSymmetricIterative = function(root) {
    let row = [];
    const queue = [root, null];
    while(queue.length > 1){
        let currNode = queue.shift();
        if(currNode !== null){
            if(currNode.left) {
                queue.push(currNode.left);
                row.push(currNode.left.val);
            } else {
                row.push(null);
            }
            if(currNode.right) {
                queue.push(currNode.right);
                row.push(currNode.right.val);
            } else {
                row.push(null);
            }
        } else {
            queue.push(null);
            let left = 0, right = row.length-1;
            while(left < right){
                if(row[left] !== row[right]) return false;
                left++;
                right--;
            }
            row = [];
        }
    }
    return true;
};