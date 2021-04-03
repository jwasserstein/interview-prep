/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8
*/

/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    const out = [];

    function recursiveParen(sol, remainingOpen, remainingClose){
        if(remainingOpen === 0 && remainingClose === 0) {
            out.push(sol);
            return;
        }
        
        if(remainingOpen > 0) 
            recursiveParen(sol + '(', remainingOpen-1, remainingClose);
        if(remainingClose > remainingOpen) 
            recursiveParen(sol + ')', remainingOpen, remainingClose-1);
    }
    recursiveParen('', n, n);
    
    return out;
};