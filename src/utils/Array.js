exports.RemoveIndex = (arr,index) =>  {
    //console.log("array length : ", arr.length-1)
    if (index <= arr.length-1 || arr.length < 0) {
        arr.splice(index, 1);
        console.log("array is removed")
    }
    else{
        console.log("array is empty")
    }
    return arr;
}
exports.CreatePlattern = (string,size) =>  {
    var arr = []
    for (i = 1; i <= size; i++) {
        arr.push(string.concat(i.toString()))
      }
    return arr;
}