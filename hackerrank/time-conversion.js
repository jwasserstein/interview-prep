/*
Given a time in -hour AM/PM format, convert it to military (24-hour) time.

Note: - 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
- 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.

Example


Return '12:01:00'.


Return '00:01:00'.

Function Description

Complete the timeConversion function in the editor below. It should return a new string representing the input time in 24 hour format.

timeConversion has the following parameter(s):

string s: a time in  hour format
Returns

string: the time in  hour format
Input Format

A single string  that represents a time in -hour clock format (i.e.:  or ).

Constraints

All input times are valid
Sample Input 0

07:05:45PM
Sample Output 0

19:05:45
*/

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    /*
     * Write your code here.
     */
    const regexMatch = s.match(/(\d{2}):(\d{2}):(\d{2})(AM|PM)/);
    let hours = regexMatch[1];
    const minutes = regexMatch[2];
    const seconds = regexMatch[3];
    const ampm = regexMatch[4];
    
    if(hours === '12'){
        if(ampm === 'AM'){
            hours = '00';
        }
    } else {
        if(ampm === 'PM') {    
            hours = String(Number(hours) + 12);
        }
    }
    return `${hours}:${minutes}:${seconds}`;
}
