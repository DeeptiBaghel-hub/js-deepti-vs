const accountId=144553
let accountEmail="deepti@gamil.com"
var accountPassword="12345"
accountCity="Jaipur"
let accountState;
//accountId=2   //const variable cannot be reassign

accountEmail="lala@gamil.com"
accountPassword="123456"
accountCity="delhi"
console.log(accountId);
/*
prefer not use var, let and const are better to use. var is function scoped and let 
and const are block scoped. 
var can be reassign and redeclare but let can be reassign but 
cannot be redeclare and const cannot be reassign and redeclare.
*/

console.table([accountId, accountEmail, accountPassword, accountCity,accountState]);