/*
Given scores of N athletes, find their relative ranks and the people with the top three highest scores, who will be awarded medals: "Gold Medal", "Silver Medal" and "Bronze Medal".

Example 1:
Input: [5, 4, 3, 2, 1]
Output: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
Explanation: The first three athletes got the top three highest scores, so they got "Gold Medal", "Silver Medal" and "Bronze Medal". 
For the left two athletes, you just need to output their relative ranks according to their scores.
Note:
N is a positive integer and won't exceed 10,000.
All the scores of athletes are guaranteed to be unique.
*/

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {
    let numsCopy = nums.slice();
    numsCopy.sort((a, b) => b - a);
    
    let places = {};
    for(let i = 0; i < numsCopy.length; i++){
        places[numsCopy[i]] = i+1; // key = score, value = place
    }
    
    let out = [];
    for(let i = 0; i < nums.length; i++){
        out[i] = String(places[nums[i]]);
        if(out[i] === '1') out[i] = 'Gold Medal';
        if(out[i] === '2') out[i] = 'Silver Medal';
        if(out[i] === '3') out[i] = 'Bronze Medal';
    }
    return out;
};

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks2 = function(nums) {
    let arr = nums.map((val, idx) => ({val, idx}));
    arr.sort((a, b) => b.val - a.val);
    
    let out = [];
    arr.forEach((a, i) => {
        if(i === 0)         out[a.idx] = 'Gold Medal';
        else if (i === 1)   out[a.idx] = 'Silver Medal';
        else if (i === 2)   out[a.idx] = 'Bronze Medal';
        else                out[a.idx] = String(i+1);
    });
    return out;
};