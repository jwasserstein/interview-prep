/*

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.

*/

class TrieNode {
  constructor (prefix) {
    this.prefix = prefix;
    this.exists = false;
  }
}

/**
 * Initialize your data structure here.
 */
var Trie = function() {
  this.root = new TrieNode('');
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let currNode = this.root;
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    
    if (!(char in currNode)) {
      currNode[char] = new TrieNode(currNode.prefix + char);
    }
    currNode = currNode[char];
  }
  currNode.exists = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let currNode = this.root;
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    
    if (!(char in currNode)) {
      return false;
    }
    currNode = currNode[char];
  }
  return currNode.exists;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let currNode = this.root;
  for (let i = 0; i < prefix.length; i++) {
    const char = prefix[i];
    
    if (!(char in currNode)) {
      return false;
    }
    currNode = currNode[char];
  }
  return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */


var Trie = function() {
  this.trie = new TrieNode('', false);
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let curr = this.trie;
  for (let i = 0; i < word.length; i++) {
    if (!(word[i] in curr)) {
      curr[word[i]] = new TrieNode(`${curr.prefix}${word[i]}`, false);
    }
    curr = curr[word[i]];
  }
  curr.hasWord = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let curr = this.trie;
  for (let i = 0; i < word.length; i++) {
    if (!(word[i] in curr)) {
      return false;
    }
    curr = curr[word[i]];
  }
  return curr.hasWord;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let curr = this.trie;
  for (let i = 0; i < prefix.length; i++) {
    if (!(prefix[i] in curr)) {
      return false;
    }
    curr = curr[prefix[i]];
  }
  return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

class TrieNode {
  constructor(prefix, hasWord) {
    this.prefix = prefix;
    this.hasWord = hasWord;
  }
}
