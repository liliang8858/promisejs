const PENDING = "PENDING";
const FULFILLED = "FULEILLED";
const REJECTED = "REJECTED";

//利用 x的值来判断是调用promise2的resolve 还是reject
function resolvePromise(promise2, x, resolve, reject) {
  //console.log(promise2, x, resolve, reject);
  // 核心流程
  if (promise2 === x) {
    return reject(new TypeError("错误"));
  }
  // 别人的promise 可能调用成功后，还能调用失败

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 我可能写的promise 和别人的promise兼容，考虑不是自己写的promise
    // 確保promise 符合規範
    let called = false;
    //有可能是promise
    try {
      let then = x.then; // 由可能then方法是通过defineProperty来实现，取值时可能发生异常

      if (typeof then === "function") {
        //这里我就认为是promise
        // 等价 x.then 还是触发getter可能会发生异常
        then.call(
          x,
          (y) => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject); // 直到解析不是promise
          },
          (r) => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) {
        return;
      }
      reject(e);
    }
  } else {
    resolve(x); // 说明返回的是一个普通值,直接将他放到promise2的resolve
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING; // 默认状态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    this.onResolveCallbacks = []; // 存放成功的回调方法
    this.onRejectCallbacks = []; //存放失败的方法
    const resolve = (value) => {
        if(value instanceof Promise){
            return value.then(resolve,reject)
        }
      // 成功
      if (this.status === PENDING) {
        this.status = FULFILLED; // 修改状态
        this.value = value;

        //发布
        this.onResolveCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      // 失败
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED; // 修改状态

        //发布
        this.onRejectCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e); //有异常，就走失败
    }
  }

  // then 中的参数是可选
  then(onFulfilled, onReject) {
    //   if(typeof onFulfilled !== 'function'){
    //     onFulfilled = v => v
    //   }
    //   if(typeof onReject !== 'function'){
    //     onReject = err => {throw err}
    //   }
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    onReject = typeof onReject === "function" ? onReject : err => {  throw err; };
    //用于链式调用
    let promise2 = new Promise((resolve, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            //成功就调用成功
            let x = onFulfilled(this.value);
            // x 可能是一个promise
            // promise 需要看一下是成功还是失败
            // 如果走成功，吧成功的结果调用promise2的resolve传递
            // 如果走失败，则同理

            // 总结 x的值，决定调用promise2的resolve  还是reject
            //     如果是promise  则取他的状态
            resolvePromise(promise2, x, resolve, reject);
            //   resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            //失败就调用失败
            let x = onReject(this.reason);
            //   resolve(x);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 订阅模式
      if (this.status == PENDING) {
        setTimeout(() => {
          //代表 then 是异步执行
          this.onResolveCallbacks.push(() => {
            try {
              // 切片编程 AOP
              let x = onFulfilled(this.value);
              // resolve(x);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });

          this.onRejectCallbacks.push(() => {
            try {
              let x = onReject(this.reason);
              // resolve(x);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        }, 0);
      }
    });
    return promise2;
  }
}

// npm install promises-aplus-tests -g   --force
// promises-aplus-tests 3.promise.js 检查是否符合规范

// 延迟对象 帮我们减少一次套用
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
