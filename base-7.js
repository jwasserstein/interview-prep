/*
Given an integer, return its base 7 string representation.

Example 1:
Input: 100
Output: "202"
Example 2:
Input: -7
Output: "-10"
Note: The input will be in range of [-1e7, 1e7].
*/

/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {
    if(num === 0) return "0";
    
    let out = '';
    let count = 0;
    let negative = num < 0;
    num = Math.abs(num);
    for(let i = Math.ceil(Math.log(num)/Math.log(7)); i >= 0; i--){
        const val = Math.floor(num/(7**i));
        num -= val*(7**i);
        out += String(val);
    }
    if(out[0] === '0') out = out.slice(1);
    if(negative) out = '-' + out;
    return out;
};

/**
 * @param {number} num
 * @return {string}
 */
var convertToBase72 = function(num) {
    return Number(num).toString(7);
};

/**
 * @param {number} num
 * @return {string}
 */
var convertToBase73 = function(num) {
    if(num === 0) return '0';
    
    let negative = num < 0;
    num = Math.abs(num);
    
    let out = '';
    let i = 1;
    let sum = 0;
    while(num > sum){
        const val = Math.floor((num%(7**i))/(7**(i-1)));
        out = String(val) + out;
        sum += val * (7**(i-1));
        i++;
    }
    if(negative) out = '-' + out;
    return out;
};