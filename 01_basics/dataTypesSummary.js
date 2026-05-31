//#Primitive(7 Types)--call by value(changes in copy)
//string ,Number,Boolean,null,undefined,Symbol( make value unique)
//BigInt
const id=Symbol('123')//Symbol
const anotherid=Symbol('123')
console.log(id==anotherid) //false

const bigNumber=234564564643n


//***

// #Reference Type(non primitive)---allocate refernce
//Array,Objects,Functions

const fruits=["apple","banana","fig"]

let myObj={
    name:"deepti",
    age:22
}

const myFun =function(){
    console.log("Hello");
}
console.log(typeof myFun) ///function Object--types



//*******************Memory
//stack(primitive),Heap(non-primitive)



//change in copyyyyyyy--Stack
let myYoutube="deepti"
let anothermyYoutube="deepti"
anothermyYoutube="chaiorcode"
console.log(myYoutube) //deepti
console.log(anothermyYoutube)//chaiorcode


//change in original ---Heap
let userOne={
    email:"user@gmail.com",
    upi:"user@ybl"
}
let userTwo=userOne
userTwo.email="hiideepti@google.com"
console.log(userOne.email)//hiideepti@google.com
console.log(userTwo.email)//hiideepti@google.com                          

