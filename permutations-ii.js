/*
Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

 

Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const out = [];
    
    nums.sort((a, b) => a-b);
    
    function recursivePermute(sol, remainingNums){
        if(remainingNums.length === 0){
            out.push(sol);
            return;
        }
        let i = 0;
        while(i < remainingNums.length){
            const newRemainingNums = remainingNums.slice();
            newRemainingNums.splice(i, 1);
            recursivePermute(sol.concat(remainingNums[i]), newRemainingNums);
            const lastVal = remainingNums[i];
            while(lastVal === remainingNums[i]) i++;
        }
    }
    
    recursivePermute([], nums);
    return out;
};