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

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    
    let output = '0';
    for (let i = num2.length-1; i >= 0; i--) {
      let partialProduct = (new Array(num2.length-1-i)).fill(0).join('');
      let carry = 0;
      for (let j = num1.length-1; j >= 0; j--) {
        const mult = (Number(num1[j]) * Number(num2[i])) + carry;
        const val = mult % 10;
        carry = (mult - val) / 10;
        partialProduct = String(val) + partialProduct;
      }
      if (carry > 0) {
        partialProduct = String(carry) + partialProduct;
      }
      output = add(output, partialProduct);
    }
    return output;
  };
  
  function add(num1, num2) {
    let out = '';
    let carry = 0;
    let ptr1 = num1.length - 1;
    let ptr2 = num2.length - 1;
    while (ptr1 >= 0 || ptr2 >= 0 || carry) {
      const sum = Number(num1[ptr1] || '0') + Number(num2[ptr2] || '0') + carry;
      const val = sum % 10;
      carry = sum >= 10 ? 1 : 0;
      out = val + out;
      ptr1--;
      ptr2--;
    }
    return out;
}
  