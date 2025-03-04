class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.height = Math.max(left?.height || 0, right?.height || 0) + 1;
    this.balanceFactor = TreeNode.getHeight(this.right) - TreeNode.getHeight(this.left);
  }

  static getHeight(node) {
    if (!node) return 0;
    return Math.max(node.left?.height || 0, node.right?.height || 0) + 1;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(val) {
    if (!root) {
      this.root = new TreeNode(val, null, null);
      return;
    }

    function recursiveAdd(node, val) {
      if (val > node.val && node.right) recursiveAdd(node.right);
      if (val > node.val && !node.right) {
        node.right = new TreeNode(val, null, null);
        node.height = Math.max(node.height, 2);
      }
      if (val < node.val && node.left) recursiveAdd(node.left);
    }
    recursiveAdd(this.root, val);

    let currNode = this.root;
    
    if (val === currNode.val) throw new Error(`Value ${val} already exists in tree`);
    if (val > currNode.val) {
      if (currNode.right) {
        currNode = currNode.right;
      } else {
        currNode.right = new TreeNode(val, null, null);
      }

  }
}

const one = new TreeNode(0, null, null);
const two = new TreeNode(0, one, null);
const three = new TreeNode(0, null, two);
console.log(three);