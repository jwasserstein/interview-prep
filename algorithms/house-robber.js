var rob = function(nums) {
    const cache = [];
    return Math.max(robHouses(nums, 0, cache), 
                    robHouses(nums, 1, cache));
};
    
function robHouses(nums, start, cache){
    // debugger;
    if(nums.length - start <= 0) {
        cache[start] = 0;
        return 0;
    }
    if(nums.length - start <= 2) {
        cache[start] = Math.max(...nums.slice(start));
        return cache[start];
    }        
    if(cache[start+2] === undefined){
        cache[start+2] = robHouses(nums, start+2, cache);
    }
    if(cache[start+3] === undefined){
        cache[start+3] = robHouses(nums, start+3, cache);
    }
    
    
    return nums[start] + Math.max(cache[start+2], cache[start+3]);
}

console.log(rob([114,117,207,117,235,82,90,67,143,146,53,108,200,91,80,223,58,170,110,236,81,90,222,160,165,195,187,199,114,235,197,187,69,129,64,214,228,78,188,67,205,94,205,169,241,202,144,240]));