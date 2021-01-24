/*
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

Example:

Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    const map = {};
    for(let i = 1; i <= nums.length; i++){
        map[i] = 1;
    }
    for(let i = 0; i < nums.length; i++){
        if(nums[i] in map) delete map[nums[i]];
    }
    return Object.keys(map);
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers2 = function(nums) {
    let out = [];
    for(let i = 1; i <= nums.length; i++){
        out.push(i);
    }
    for(let i = 0; i < nums.length; i++){
        out[nums[i]-1] = 0;
    }
    let swapPos = 0;
    for(let i = 0; i < out.length; i++){
        if(out[i] !== 0) {
            [out[swapPos], out[i]] = [out[i], out[swapPos]];
            swapPos++;
        }
    }
    out = out.slice(0, swapPos);
    return out;
};