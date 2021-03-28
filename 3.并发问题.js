
const  fs = require('fs')

// let arr = []
// function out() {
//     if(arr.length == 2){
//         console.log(arr);
//     }
// }

function after(times,callback) {
    let arr = [] // 可以使用下标可以固定顺序
    return (data,index)=>{
        arr[index] = data
        if(--times === 0){// 多个请求并发需要计算器实现
            callback(arr)
        }
    }
}

let out = after(2,(arr)=>{
    console.log(arr);
})

fs.readFile('./a.txt','UTF8',function (err,data) {
    console.log(data);
    // arr.push(data)
    //out()
    out(data,0)
})

fs.readFile('./b.txt','UTF8',function (err,data) {
    console.log(data);
    // arr.push(data)
    // out()
    out(data,1)
})


