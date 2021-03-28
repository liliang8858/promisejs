
const Promise  = require('./source/3.promise')

// promise2 === x 的情况
let promise2 = new Promise((resolve, reject) => {
  resolve(1);
}).then(() => {
  return promise2; //x 和promise2 是同一个
});

promise2.then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);

let p ={}
Object.defineProperty(p,'then',{
    get(){
        throw new Error()
    }
})

p.then