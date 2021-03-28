

function curring(fn) {
    // 存储每次调用的时候传入的变量
    const inner = (args=[])=>{ // 存储每次调用时传入的参数
        if (args.length >= fn.length){
            return fn(...args)
        }else{
            return (...userArgs) => inner([...args,...userArgs])
        }
    }
    return inner();
}

function sum(a,b,c,d) { 
    // 记录每次调用时，传入的参数，并且和函数的参数个数进行比较
    // 如果不满足，就返回新函数，如果传入个数和参数一致，执行原函数
    return a+b+c+d
}

let sum1 = curring(sum)
let sum2 = sum1(1)
let sum3 = sum2(2,3)
let result = sum3(4)

console.log(result);


function isType(typing,val) {
    return Object.prototype.toString.call(val) == `[object ${typing}]`
}

// let isString = curring(isType)('String')
// console.log(isString('abc'));

// let isNumber = curring(isType)('Number')
// console.log(isNumber(12));


let util = {};
['String','Number','Boolean','Null','Undefined'].forEach(type => {
    util['is'+type] = curring(isType)(type)
});

console.log(util.isString('abc'));




// eg 请求数据多个接口等待返回后，再去渲染页面


