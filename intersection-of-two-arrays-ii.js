/*
Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Note:

Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
Follow up:

What if the given array is already sorted? How would you optimize your algorithm?
What if nums1's size is small compared to nums2's size? Which algorithm is better?
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    const map = {};
    for(let i = 0; i < nums1.length; i++){
        if(map[nums1[i]]){
            map[nums1[i]]++;
        } else {
            map[nums1[i]] = 1;
        }
    }
    
    const out = [];
    for(let i = 0; i < nums2.length; i++){
        if(nums2[i] in map) {
            out.push(nums2[i]);
            map[nums2[i]]--;
            if(map[nums2[i]] === 0) delete map[nums2[i]];
        }
    }
    return out;
};