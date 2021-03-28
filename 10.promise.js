
let Promise = require('./source/3.promise')

// 递归promise
// let promise2 = new Promise((resolve)=>{
//     resolve(1)
// }).then(data=>{
//     // console.log(data);
//     // return 'x'
//     // throw new Error('dd')
//     return new Promise((resolve,reject)=>{
//         //x 可能就是promise
//         setTimeout(() => {
//             resolve(new Promise((resolve,reject)=>{
//                 setTimeout(() => {
//                     resolve('200')
//                 }, 1000);
//             }))
//             resolve('ok')// 這裏走成功，promise2 走成功，  如果 reject 就走promise2 失敗
//         }, 1000);
//     })
// })
// promise2.then(data=>{
//     console.log(data);
// },err=>{
//     console.log('error',err);
// })


// 参数穿透实现
new Promise((resolve,reject)=>{
    resolve(200)
}).then().then((data)=>{
    console.log(data,'s');
},err=>{
    console.log(err,'e');
})