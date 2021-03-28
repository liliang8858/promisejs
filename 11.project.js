
// Proemise.resolve() 这个方法，会创造一个成功的promise

new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(200)
    }, 1000);
}).then((data)=>{
    console.log(data);
})

Promise.resolve(100).then((data)=>{
    console.log(data);
})



