/*
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1), which is then converted into a different digit string.
To determine how you "say" a digit string, split it into the minimal number of groups so that each group is a contiguous section all of the same character. Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and concatenate every saying.

For example, the saying and conversion for digit string "3322251":


Given a positive integer n, return the nth term of the count-and-say sequence.

 

Example 1:

Input: n = 1
Output: "1"
Explanation: This is the base case.
Example 2:

Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = say "1" = one 1 = "11"
countAndSay(3) = say "11" = two 1's = "21"
countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"
 

Constraints:

1 <= n <= 30
*/

/**
 * @param {number} n
 * @return {string}
 */
 var countAndSay = function(n) {
    if(n === 1) return '1';
    
    const prevSay = countAndSay(n-1);
    
    const groups = [[1, prevSay[0]]];
    for(let i = 1; i < prevSay.length; i++){
        const lastGroup = groups[groups.length-1];
        if(prevSay[i] === lastGroup[1]) {
            lastGroup[0]++;
        } else {
            groups.push([1, prevSay[i]]);
        }
    }
    
    let out = '';
    for(let i = 0; i < groups.length; i++){
        out += String(groups[i][0]) + groups[i][1];
    }
    return out;
};

var countAndSayIterative = function(n) {
    let say = '1';
    
    for(let i = 1; i < n; i++){
        const groups = [[1, say[0]]];
        for(let i = 1; i < say.length; i++){
            const lastGroup = groups[groups.length-1];
            if(say[i] === lastGroup[1]) {
                lastGroup[0]++;
            } else {
                groups.push([1, say[i]]);
            }
        }
        
        say = '';
        for(let i = 0; i < groups.length; i++){
            say += String(groups[i][0]) + groups[i][1];
        }
    }
    
    return say;
};

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    const tab = ['', '1'];
    for (let i = 2; i <= n; i++) {
      let str = '';
      
      const prev = tab[i-1];
      let j = 0;
      while (j < prev.length) {
        let count = 1;
        while (prev[j+1] !== undefined && prev[j] === prev[j+1]) {
          count++;
          j++;
        }
        str += `${count}${prev[j]}`;
        j++;
      }
      
      tab.push(str);
    }
    
    return tab[n];
};