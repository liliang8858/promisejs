
const PENDING ='PENDING';
const FULFILLED = 'FULEILLED';
const REJECTED  ='REJECTED';
class Promise{
    constructor(executor){
        this.status = PENDING; // 默认状态
        this.value = undefined; // 成功的原因
        this.reason = undefined;// 失败的原因

        const resolve =(value) =>{ // 成功
            if(this.status === PENDING){
                this.status = FULFILLED;// 修改状态
                this.value = value;
            }
            
        }

        const reject =(reason) =>{ // 失败
            if(this.status === PENDING){
                this.reason = reason
                this.status = REJECTED;// 修改状态
            }
        }
        try{
            executor(resolve,reject)
        }catch(e){
            reject(e)//有异常，就走失败
        }
    }

    then(onFulfilled,onReject){

        if(this.status == FULFILLED){//成功就调用成功
            onFulfilled(this.value)
        }
        if(this.status == REJECTED){//失败就调用失败
            onReject(this.reason)
        }
    }
}


module.exports = Promise