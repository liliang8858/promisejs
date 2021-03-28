
const  fs = require('fs')


// 事件中心
let events = {
    _events:[],
    on(fn){
        this._events.push(fn)
    },
    emit(data){
        this._events.forEach(fn =>fn(data))
    }
}

// 订阅有顺序，可以采用数组完成
events.on(()=>{
    console.log('读读一次，就触发一次');
})

let arr = []
events.on((data) =>{
    arr.push(data)
})

events.on(()=>{
    if(arr.length === 2){ // 最终结果还是计数器
        console.log('读取完毕');
        console.log(arr);
    }
})



fs.readFile('./a.txt','UTF8',function (err,data) {

    events.emit(data)
})

fs.readFile('./b.txt','UTF8',function (err,data) {

    events.emit(data)
})


