/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a roman numeral.

 

Example 1:

Input: num = 3
Output: "III"
Example 2:

Input: num = 4
Output: "IV"
Example 3:

Input: num = 9
Output: "IX"
Example 4:

Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
Example 5:

Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
 

Constraints:

1 <= num <= 3999
*/

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const vals = [
        {val: 1, let: 'I'},
        {val: 4, let: 'IV'},
        {val: 5, let: 'V'},
        {val: 9, let: 'IX'},
        {val: 10, let: 'X'},
        {val: 40, let: 'XL'},
        {val: 50, let: 'L'},
        {val: 90, let: 'XC'},
        {val: 100, let: 'C'},
        {val: 400, let: 'CD'},
        {val: 500, let: 'D'},
        {val: 900, let: 'CM'},
        {val: 1000, let: 'M'}
    ];
    
    let out = '';
    for(let i = vals.length-1; i >= 0; i--){
        const mult = Math.floor(num/vals[i].val);
        num -= vals[i].val * mult;
        for(let j = 0; j < mult; j++) out = out + vals[i].let;
    }
    return out;
};

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const vals = [
      { sym: 'I', val: 1 },
      { sym: 'IV', val: 4 },
      { sym: 'V', val: 5 },
      { sym: 'IX', val: 9 },
      { sym: 'X', val: 10 },
      { sym: 'XL', val: 40 },
      { sym: 'L', val: 50 },
      { sym: 'XC', val: 90 },
      { sym: 'C', val: 100 },
      { sym: 'CD', val: 400 },
      { sym: 'D', val: 500 },
      { sym: 'CM', val: 900 },
      { sym: 'M', val: 1000 },
    ];
    
    let out = '';
    for(let i = vals.length-1; i >= 0; i--) {
      if (vals[i].val > num) continue;
      
      const chars = Math.floor(num / vals[i].val);
      for(let j = 0; j < chars; j++) out += vals[i].sym;
      
      num -= vals[i].val*chars;
    }
    
    return out;
};
  