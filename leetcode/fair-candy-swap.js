/*
Alice and Bob have a different total number of candies. You are given two integer arrays aliceSizes and bobSizes where aliceSizes[i] is the number of candies of the ith box of candy that Alice has and bobSizes[j] is the number of candies of the jth box of candy that Bob has.

Since they are friends, they would like to exchange one candy box each so that after the exchange, they both have the same total amount of candy. The total amount of candy a person has is the sum of the number of candies in each box they have.

Return an integer array answer where answer[0] is the number of candies in the box that Alice must exchange, and answer[1] is the number of candies in the box that Bob must exchange. If there are multiple answers, you may return any one of them. It is guaranteed that at least one answer exists.

 

Example 1:

Input: aliceSizes = [1,1], bobSizes = [2,2]
Output: [1,2]
Example 2:

Input: aliceSizes = [1,2], bobSizes = [2,3]
Output: [1,2]
Example 3:

Input: aliceSizes = [2], bobSizes = [1,3]
Output: [2,3]
 

Constraints:

1 <= aliceSizes.length, bobSizes.length <= 104
1 <= aliceSizes[i], bobSizes[j] <= 105
Alice and Bob have a different total number of candies.
There will be at least one valid answer for the given input.
*/

/**
 * @param {number[]} aliceSizes
 * @param {number[]} bobSizes
 * @return {number[]}
 */
 var fairCandySwap = function(aliceSizes, bobSizes) {
  const aliceSum = aliceSizes.reduce((val, acc) => val + acc);
  const bobSum = bobSizes.reduce((val, acc) => val + acc);
  
  const target = Math.abs(bobSum - aliceSum) / 2;
  
  aliceSizes.sort((a, b) => a - b);
  bobSizes.sort((a, b) => a - b);
  
  if (aliceSum > bobSum) {
    let aPtr = 0;
    let bPtr = 0;
    let difference = aliceSizes[aPtr] - bobSizes[bPtr];
    while (difference !== target) {
      if (difference < target && bPtr < bobSizes.length) {
        aPtr++;
      } else {
        bPtr++;
      }
      difference = aliceSizes[aPtr] - bobSizes[bPtr];
    }

    return [aliceSizes[aPtr], bobSizes[bPtr]];
  } else {
    let aPtr = 0;
    let bPtr = 0;
    let difference = bobSizes[bPtr] - aliceSizes[aPtr];
    while (difference !== target) {
      if (difference < target && bPtr < bobSizes.length) {
        bPtr++;
      } else {
        aPtr++;
      }
      difference = bobSizes[bPtr] - aliceSizes[aPtr];
    }

    return [aliceSizes[aPtr], bobSizes[bPtr]];
  }
};

/**
 * @param {number[]} aliceSizes
 * @param {number[]} bobSizes
 * @return {number[]}
 */
var fairCandySwap = function(aliceSizes, bobSizes) {
  const aliceSum = aliceSizes.reduce((val, acc) => val + acc);
  const bobSum = bobSizes.reduce((val, acc) => val + acc);
  
  const diff = (bobSum - aliceSum) / 2;
  
  const bobSet = new Set(bobSizes);
  for (let i = 0; i < aliceSizes.length; i++) {
    const target = aliceSizes[i] + diff;
    if (bobSet.has(target)) return [aliceSizes[i], target];
  }
};
