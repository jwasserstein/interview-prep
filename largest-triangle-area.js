/*
You have a list of points in the plane. Return the area of the largest triangle that can be formed by any 3 of the points.

Example:
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2
Explanation: 
The five points are show in the figure below. The red triangle is the largest.


Notes:

3 <= points.length <= 50.
No points will be duplicated.
 -50 <= points[i][j] <= 50.
Answers within 10^-6 of the true value will be accepted as correct.
*/

/**
 * @param {number[][]} points
 * @return {number}
 */
 var largestTriangleArea = function(points) {
    let maxArea = -Infinity;
    
    for(let i = 0; i < points.length-2; i++){
        for(let j = i+1; j < points.length-1; j++){
            for(let k = j+1; k < points.length; k++){
                let point1 = points[i];
                let point2 = points[j];
                let point3 = points[k];
                
                let a = Math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2);
                let b = Math.sqrt((point2[0] - point3[0])**2 + (point2[1] - point3[1])**2);
                let c = Math.sqrt((point1[0] - point3[0])**2 + (point1[1] - point3[1])**2);
                
                let s = (a + b + c)/2;
                let area = Math.sqrt(s * (s-a) * (s-b) * (s-c));
                
                if(isNaN(area)) continue;
                
                maxArea = Math.max(maxArea, area);
            }
        }
    }
    
    return maxArea;
};