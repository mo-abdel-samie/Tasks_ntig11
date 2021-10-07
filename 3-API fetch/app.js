

/**
 * ============{ Clouser Like Class }=============
 */

console.log("\n######## Clouser #########\n");

const student = (name, age) => {
    return {
        printData(){ console.log(`My Name is ${name}, I am ${age} years old.`); },
        setData(){ name=name, age=age }
    }
}

const s1 = student("Mohamed", 20)
s1.printData();

/**
 * ============{ Callback function }=============
 */
console.log("\n######## CallBack #########");

const myCallBack = (val, cb) => {
    setTimeout(()=>{
        if(val>5) cb(true)
        else cb(false)
    },1500)
}

myCallBack(10, (x)=>{
    console.log("Coming from CallBack:",x);
})


/**
 * ============{ Promise }=============
 */
 console.log("\n######## Promise #########");


 const myPromis = (val) => new Promise((resolve, reject)=>{
     setTimeout(()=>{
        typeof val == "number"? resolve('number'):reject('fe moshkela')
     },2000)
 })
 
console.log(myPromis(5)); // Hena mesh hizher el-data bs higep pinding

 myPromis(10)
    .then(data => console.log(data))
    .catch(e => console.log(e))


/**
 * ============{ Sync await }=============
*/
console.log("\n######## async await #########");

// A7san tareqa fe ast5dam el asyn await bensta5dem try & catch 

const newX = async ()=> {
    try{
        z = await myPromis(5)
        x = await myPromis("number")
        console.log("From await:",x);
    }catch(e){
        console.log(e);
    }
}

newX()