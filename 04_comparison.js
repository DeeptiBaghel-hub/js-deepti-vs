// console.log(2>1);
// console.log(2!=1)



//Avoid using diff datatypess compare
console.log("2">1) //true
console.log("02">1) //true

console.log(null>1)//false
console.log(null==0)//false
console.log(null>=0) //true  (comparison converts null to num treating it as 0)

console.log(undefined==0) //always false >1 or >=0

//===    Check strictly
console.log("2"===2);
