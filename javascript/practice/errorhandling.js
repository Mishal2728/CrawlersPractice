/*

let name = "Mishal ahamed";

try {
    console.log(names);
    
} catch (error) {
    console.log("smothing went wrong");
    
}

*/
/*

let age = 8

try {
    if (age >= 18) {
    console.log("You're eligible to vote");
} else {
      throw new Error("Candiate shoud be 18 years old");
}
} catch (error) {
    console.log(error.message);
    
}

*/

function checknumber(value) {
  try {
    if (typeof value === "number") {
      console.log("its a number");
    } else {
      throw new Error("its not a number");
    }
  } catch (error) {
    console.log(error.message);
  }
}

checknumber(646);
