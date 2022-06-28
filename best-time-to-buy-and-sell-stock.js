/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
 

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104
*/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const rightMax = new Array(prices.length);
  rightMax[rightMax.length-1] = prices[prices.length-1];
  for(let i = prices.length-2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i+1], prices[i]);
  }

  let max = 0;
  for(let i = 0; i < prices.length; i++) {
    max = Math.max(rightMax[i] - prices[i], max);
  }
  
  return max;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const suffixMax = new Array(prices.length);
  suffixMax[suffixMax.length-1] = prices[prices.length-1];
  for (let i = prices.length-2; i >= 0; i--) {
    suffixMax[i] = Math.max(suffixMax[i+1], prices[i]);
  }
  
  let maxProfit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    const potentialProfit = suffixMax[i+1] - prices[i];
    maxProfit = Math.max(maxProfit, potentialProfit);
  }
  
  return maxProfit;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length < 2) return 0;

  let min = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    const potentialProfit = prices[i] - min;
    maxProfit = Math.max(maxProfit, potentialProfit);
    min = Math.min(min, prices[i]);
  }
  
  return maxProfit;
};
