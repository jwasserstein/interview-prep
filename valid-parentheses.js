/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/

/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
  const stack = [];
  const closing = {
    ')': '(',
    '}': '{',
    ']': '[',
  };
  
  for(let i = 0; i < s.length; i++) {
    if (!(s[i] in closing)) {
      stack.push(s[i]);
    } else {
      if (closing[s[i]] !== stack[stack.length-1]) {
        return false;
      }
      stack.pop();
    }
  }
  
  return stack.length === 0;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
	const bracketMap = {
		'(': ')',
		'[': ']',
		'{': '}'
  };
	const stack = [];

	for (let i = 0; i < s.length; i++) {
		const char = s[i];
		if (char in bracketMap) {
			stack.push(char);
		} else {
			const peekValue = stack[stack.length-1]; // will be open bracket
			const expectedBracket = bracketMap[peekValue];
			if (char !== expectedBracket) {
				return false;
			} else {
				stack.pop();
			}
		}
	}
	
	return stack.length === 0;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  const stack = [];
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char in map) {
      stack.push(char);
    } else {
      const expected = map[stack[stack.length-1]];
      if (char === expected) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  
  return stack.length === 0;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const parens = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  const stack = [];
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in parens) {
      stack.push(s[i]);
    } else {
      if (parens[stack[stack.length-1]] !== s[i]) {
        return false;
      }
      stack.pop();
    }
  }
  
  return stack.length === 0;
};
