/*
Create a 2-dimensional array, , of  empty arrays. All arrays are zero indexed.
Create an integer, , and initialize it to .
There are  types of queries:
Query: 1 x y
Find the list within  at index .
Append the integer  to the .
Query: 2 x y
Find the list within  at index .
Find the value of element  where  is the number of elements in lastAnswer$.
Print the new value of  on a new line
Note:  is the bitwise XOR operation, which corresponds to the ^ operator in most languages. Learn more about it on Wikipedia.  is the modulo operator.

Function Description

Complete the dynamicArray function below.

dynamicArray has the following parameters:
- int n: the number of empty arrays to initialize in 
- string queries[q]: an array of query strings

Returns

int[]: the results of each type 2 query in the order they are presented
Input Format

The first line contains two space-separated integers, , the size of  to create, and , the number of queries, respectively.
Each of the  subsequent lines contains a query in the format defined above, .

Constraints

It is guaranteed that query type  will never query an empty array or index.
Sample Input

2 5
1 0 5
1 1 7
1 0 3
2 1 0
2 1 1
Sample Output

7
3
Explanation

Initial Values:


 = [ ]
 = [ ]

Query 0: Append  to .

 = [5]
 = [ ]

Query 1: Append  to .
 = [5]
 = [7]

Query 2: Append  to .

 = [5, 3]
 = [7]

Query 3: Assign the value at index  of  to , print .

 = [5, 3]
 = [7]

7
Query 4: Assign the value at index  of  to , print .

 = [5, 3]
 = [7]

3
*/

/*
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n, queries) {
    // Write your code here
    const arrs = new Array(n).fill(undefined).map(() => []);
    let lastAnswer = 0;
    const out = [];
    
    for(let i = 0; i < queries.length; i++){
        const idx = (queries[i][1] ^ lastAnswer) % n;
        if(queries[i][0] === 1){
            arrs[idx].push(queries[i][2]);
        } else {
            console.log(arrs);
            lastAnswer = arrs[idx][queries[i][2] % arrs[idx].length];
            out.push(lastAnswer);
        }
    }
    return out;
}