/*
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

 

Example 1:

Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
Example 2:

Input: n = 1, bad = 1
Output: 1
 

Constraints:

1 <= bad <= n <= 231 - 1
*/

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let version = Math.floor(n/2);
        let leftBound = 0;
        let rightBound = n;
        while (!(isBadVersion(version) && !isBadVersion(version-1))){
            if(isBadVersion(version)){
                rightBound = version;
            } else {
                leftBound = version;
            }
            version = Math.round((rightBound + leftBound) / 2);
        }
        return version;
    };
};

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
      let left = 1;
      let right = n;
      
      while (right - left > 1) {
        const curr = Math.round((left+right)/2);
        if (isBadVersion(curr)) {
          right = curr;
        } else {
          left = curr;
        }
      }
      
      return isBadVersion(left) ? left : right;
    };
};

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    let left = 1;
    let right = n;
    
    if (isBadVersion(left)) return left;
    if (isBadVersion(right) && !isBadVersion(right-1)) return right;
    
    while (right - left > 1) {
      const guess = Math.round((left + right) / 2);
      const badVersion = isBadVersion(guess);
      if (badVersion) {
        right = guess;
      } else {
        left = guess;
      }
    }
    
    return right;
  };
};

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
      if (isBadVersion(1)) return 1;
      
      let left = 2;
      let right = n;
      while (left <= right) {
        const guess = Math.floor((left + right) / 2);
        
        if (isBadVersion(guess) && isBadVersion(guess-1)) {
          right = guess - 1;
        } else if (!isBadVersion(guess) && !isBadVersion(guess-1)) {
          left = guess + 1;
        } else {
          return guess;
        }
      }
    };
};
