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
exports.Shuffle = (arr) => {
    var currentIndex = arr.length, temporaryValue, randomIndex;
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    
    return arr;
      
}