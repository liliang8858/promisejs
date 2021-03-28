
const PENDING ='PENDING';
const FULFILLED = 'FULEILLED';
const REJECTED  ='REJECTED';
class Promise{
    constructor(executor){
        this.status = PENDING; // 默认状态
        this.value = undefined; // 成功的原因
        this.reason = undefined;// 失败的原因
        this.onResolveCallbacks = []// 存放成功的回调方法
        this.onRejectCallbacks = []//存放失败的方法
        const resolve =(value) =>{ // 成功
            if(this.status === PENDING){
                this.status = FULFILLED;// 修改状态
                this.value = value;

                //发布
                this.onResolveCallbacks.forEach(fn=>fn())
            }
            
        }

        const reject =(reason) =>{ // 失败
            if(this.status === PENDING){
                this.reason = reason
                this.status = REJECTED;// 修改状态

                 //发布
                this.onRejectCallbacks.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve,reject)
        }catch(e){
            reject(e)//有异常，就走失败
        }
    }

    then(onFulfilled,onReject){

        // 订阅模式
        if(this.status == PENDING){
            //代表 then 是异步执行
            this.onResolveCallbacks.push(()=>{// 切片编程 AOP
                onFulfilled(this.value)
            })
            
            this.onRejectCallbacks.push(()=>{
                onReject(this.reason)
            })
        }
        if(this.status == FULFILLED){//成功就调用成功
            onFulfilled(this.value)
        }
        if(this.status == REJECTED){//失败就调用失败
            onReject(this.reason)
        }
    }
}


module.exports = Promise