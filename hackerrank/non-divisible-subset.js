/*
Given a set of distinct integers, print the size of a maximal subset of  where the sum of any  numbers in  is not evenly divisible by .

For example, the array  and . One of the arrays that can be created is . Another is . After testing all permutations, the maximum length solution array has  elements.

Function Description

Complete the nonDivisibleSubset function in the editor below. It should return an integer representing the length of the longest subset of  meeting the criteria.

nonDivisibleSubset has the following parameter(s):

S: an array of integers
k: an integer
Input Format

The first line contains  space-separated integers,  and , the number of values in  and the non factor.
The second line contains  space-separated integers describing , the unique values of the set.

Constraints

All of the given numbers are distinct.
Output Format

Print the size of the largest possible subset ().

Sample Input

4 3
1 7 2 4
Sample Output

3
Explanation

The sums of all permutations of two elements from  are:

1 + 7 = 8
1 + 2 = 3
1 + 4 = 5
7 + 2 = 9
7 + 4 = 11
2 + 4 = 6
We see that only  will not ever sum to a multiple of .
*/

function nonDivisibleSubset(k, s) {
    const remainderMap = {};
    for(let i = 0; i < s.length; i++){
        if((s[i] % k) in remainderMap) remainderMap[s[i] % k]++;
        else remainderMap[s[i] % k] = 1;
    }

    const remainders = Object.keys(remainderMap);
    let count = 0;
    for(let i = 0; i < remainders.length; i++){
        if(remainders[i] === '0') { 
            if('0' in remainderMap) {
                count++;
                delete remainderMap[0];
            }
        } else if (remainders[i] === String(k/2) && String(k/2) in remainderMap) {
            count++;
            delete remainderMap[k/2];
        } else {
            if(String(k - remainders[i]) in remainderMap){
                count += Math.max(remainderMap[k-remainders[i]] || 0, remainderMap[remainders[i]] || 0);
                delete remainderMap[k-remainders[i]];
                delete remainderMap[remainders[i]];
            } else {
                count += remainderMap[remainders[i]] || 0;
                delete remainderMap[remainders[i]];
            }
        }
    }
    return count;
}