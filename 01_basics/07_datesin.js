//**Months start with 0-jan */


let myDate=new Date()
// console.log(myDate) //2026-05-30T11:28:59.104Z
// console.log(myDate.toString())//Sat May 30 2026 16:59:47 GMT+0530 
// console.log(myDate.toDateString()) //Sat May 30 2026 
// console.log(myDate.toLocaleDateString())// 30/5/2026
// console.log( typeof myDate)//object

// let myCreatedDate=new Date(2023,4,4) //Thu May 04 2023
// let myCreatedDate=new Date(2023,4,4,5,3)
// let myCreatedDate=new Date("2023-05-04")//5/4/2023
let myCreatedDate=new Date("05-04-2023") //4/5/2023
// console.log(myCreatedDate.toLocaleDateString())

let myTimeStamp =Date.now()
// console.log(myTimeStamp )
// console.log(myCreatedDate.getTime())
// console.log(Math.floor(Date.now()/1000))

let newDate=new Date()
console.log(newDate)
console.log(newDate.getMonth()+1)
console.log(newDate.getDay())
console.log(newDate.toLocaleDateString('default'),{
    weekday:"long"
})



