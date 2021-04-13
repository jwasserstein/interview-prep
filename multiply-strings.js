/*
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

 

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
 

Constraints:

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
 var multiply = function(num1, num2) {
    if(num1 === '0' || num2 === '0') return '0';
    
    let multiplier, multiplicand;
    if(num2.length < num1.length){
        multiplier = num2;
        multiplicand = num1;
    } else {
        multiplier = num1;
        multiplicand = num2;
    }
    
    const partialProducts = new Array(multiplier.length).fill('');
    for(let i = multiplier.length-1; i >= 0; i--){
        let carry = 0;
        for(let j = multiplicand.length-1; j >= 0; j--){
            const product = +multiplier[i] * +multiplicand[j] + carry;
            const digit = product % 10;
            partialProducts[i] = String(digit) + partialProducts[i];
            carry = Math.floor(product/10);
        }
        if(carry > 0) {
            partialProducts[i] = String(carry) + partialProducts[i];
        }
        for(let j = multiplier.length-1; j > i; j--){
            partialProducts[i] += '0';
        }
    }
    
    let out = '';
    let moreDigits = true;
    let j = 0;
    let carry = 0;
    while(moreDigits){
        moreDigits = false;
        let digitSum = 0;
        digitSum += carry;
        for(let i = 0; i < partialProducts.length; i++){
            if(partialProducts[i].length > j) {
                moreDigits = true;
                const partialProduct = partialProducts[i];
                digitSum += +partialProduct[partialProduct.length - 1 - j];
            }
        }
        if(moreDigits) {
            const digit = digitSum % 10;
            out = digit + out;
            carry = Math.floor(digitSum / 10);
        }
        j++;
    }
    
    if(carry > 0) out = String(carry) + out;
    
    return out;
};