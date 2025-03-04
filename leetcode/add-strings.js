/*
Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.

Note:

The length of both num1 and num2 is < 5100.
Both num1 and num2 contains only digits 0-9.
Both num1 and num2 does not contain any leading zero.
You must not use any built-in BigInteger library or convert the inputs to integer directly.
*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let carry = 0;
    let out = '';
    let num1Pointer = num1.length - 1;
    let num2Pointer = num2.length - 1;
    
    while(num1Pointer >= 0 || num2Pointer >= 0 || carry > 0){
        let sum = 0;
        if(num1Pointer >= 0) sum += +num1[num1Pointer];
        if(num2Pointer >= 0) sum += +num2[num2Pointer];
        if(carry > 0) sum += carry;
        
        out = `${(sum) % 10}` + out;
        carry = Math.floor((sum) / 10);
        
        num1Pointer--;
        num2Pointer--;
    }
    
    return out;
};