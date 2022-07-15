function flattenArray(object,arr){     
    for(let [key,val] of Object.entries(object)){
        
        if(typeof val ==='object' ){
            flattenArray(val,arr)
        }else{
            if(!arr.includes(val)){
              arr.push(val)
            }
        }  
    }
    return arr
}
module.exports = {
	flattenArray,
};
