/*
On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed).

Once you pay the cost, you can either climb one or two steps. You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.

Example 1:
Input: cost = [10, 15, 20]
Output: 15
Explanation: Cheapest is start on cost[1], pay that cost and go to the top.
Example 2:
Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].
Note:
cost will have a length in the range [2, 1000].
Every cost[i] will be an integer in the range [0, 999].
*/

/**
 * @param {number[]} cost
 * @return {number}
 */
 var minCostClimbingStairs = function(cost) {
    const totalCost = new Array(cost.length);
    totalCost[0] = cost[0];
    totalCost[1] = cost[1];
    
    for(let i = 2; i < cost.length; i++){
        totalCost[i] = Math.min(totalCost[i-1], totalCost[i-2]) + cost[i];
    }
    
    return Math.min(totalCost[totalCost.length-1], totalCost[totalCost.length-2]);
};