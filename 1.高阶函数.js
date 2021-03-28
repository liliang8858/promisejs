
function core(...args) {
    console.log('core',...args)
}

Function.prototype.before = function (cb) {
    // this = core
    return (...args) =>{ // newCore 
        cb();
        this(...args);//拓展运算符
    }
}

let newCore = core.before(()=>{
    console.log('before')
})

newCore('a','b');