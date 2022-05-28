/*
A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

 

Example 1:

Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
Example 2:

Input: s = "0000"
Output: ["0.0.0.0"]
Example 3:

Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 

Constraints:

1 <= s.length <= 20
s consists of digits only.
*/

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  const out = [];
  function recursiveIp(str, dots, prefix) {
    if (dots === 0) {
      if (str.length !== 0
        && Number(str) <= 255
        && (str.length === 1 || str[0] !== '0')) {
        out.push(prefix + str);
      }
      return;
    }

    recursiveIp(str.slice(1), dots-1, `${prefix}${str.slice(0,1)}.`);
    if (str[0] !== '0') {
      recursiveIp(str.slice(2), dots-1, `${prefix}${str.slice(0,2)}.`);
      if (Number(str.slice(0,3)) <= 255) {
        recursiveIp(str.slice(3), dots-1, `${prefix}${str.slice(0,3)}.`);
      }
    }
  }
  
  recursiveIp(s, 3, '');
  return out;
};
