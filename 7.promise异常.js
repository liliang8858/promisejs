// 1. promise 是一个类  无需考虑兼容性
// 2. 当使用promeise的时候，会传入一个执行器,此执行器立即执行
// 3. 当前excutor 给两个函数可以来描述当前promise的状态
//     由三个状态  成功态   失败态  等待态
//    默认为等待，如果调用resolve会走成功，如果调用reject或发生异常，走失败
// 4. 每个promise 实例都有一个then 方法
// 5. promise 一旦状态变化后补能不能更改

// promise 还是基于回调的
// es6-promise
let Promise = require('./source/2.promise')
let promise  = new Promise((resolve,reject) =>{
    setTimeout(() => {
        // 发布 触发
        resolve('ok')
    }, 1000);
})

//当用户调用then方法的时候，此时promise可能为等待态，先暂存起来
//后续可能会调用resolve 和 reject ，等会再触发对于的 onFulled,onRejected
//
promise.then((value)=>{
    console.log('success',value);
},(reason)=>{
    console.log('err',reason);
})
console.log('ok');



