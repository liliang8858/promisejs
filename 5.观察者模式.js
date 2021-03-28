
class Subject{// 被观察者类 被观察者需要将观察者收集起来
    constructor(name){
        this.name = name;
        this.state = '非常开心';
        this.observers = [];
    }

    attach(o){
        this.observers.push(o)
    }

    setState(newState){
        this.state = newState
        this.observers.forEach(o => o.update(this.name,newState))
    }

}

class Observer{// 观察者
    constructor(name){
        this.name = name
    }
    update(s,state){
        console.log(this.name+":"+s+"当前的"+state);
    }
}


// vue 数据变（状态），试图更新（通知依赖的人)

let s = new Subject('小宝宝')

let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');

s.attach(o1)
s.attach(o2)

s.setState('我不开心了')

s.setState('开心了')

