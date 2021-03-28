// promise 特点，解决了什么问题  
// 解决了： 1.链式调用嵌套  和 2.同步并发问题

// 1.链式调用嵌套 
// 需求： 先读取a.txt ,根据内容再读文件内容指定的文件

const fs = require('fs')

let Promise = require('./source/3.promise')

function readFile(filePath,encoding) {
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,encoding,(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

// 2.
let promise2 = new Promise((resolve)=>{
    resolve(1)
}).then(data=>{
    // console.log(data);
    // return 'x'
    // throw new Error('dd')
    return new Promise((resolve,reject)=>{
        //x 可能就是promise
        setTimeout(() => {
            resolve('ok')// 這裏走成功，promise2 走成功，  如果 reject 就走promise2 失敗
        }, 1000);
    })
})
promise2.then(data=>{
    console.log(data);
},err=>{
    console.log('error',err);
})

// 1.project 的链式调用,当调用then、方法返回下一个新的promise
// 情况1  then 方法返回的一个值(普通值），会作为外出下一次then的成功结果
// 情况2  then中的方法执行处错，会走到外层下一次then的失败结果
// 情况3  then返回的一个promise对象，此时会根据promise的结果来处理，是走成功还是失败

// 无论上一次then走成功还是失败，只要返回的是普通值，都会走下一次then的成功
// 总结： 如果返回一个普通值（除了promise）就会传递下一个then的成功，
//       如果返回一个失败的promise或抛出异常，会走下一个then的失败
// readFile('./a.txt','utf8').then((value)=>{
//     // console.log('success',value);
//     // throw new Error('ddd') // 及时走到成功，如果抛出一次，还是走下一次的then的失败
//     return readFile(value+"1",'utf8')
// },()=>{
//     console.log('fail',err);
//     return new Error();// 只是返回普通值，走下一个成功
    
// }).then((data)=>{
//     console.log('s',data);
// },()=>{
//     console.log('fail')
// })





// fs.readFile('./a.txt','utf8',function(err,data){
//     if(err){
//         return console.log(err);
//     }

//     fs.readFile('./b.txt','utf8',function(err,data){
//         if(err){
//             return console.log(err);
//         }
//         console.log(data);
//     })
// })