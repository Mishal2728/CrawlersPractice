/*-------------SPREAD OPERATOR */


let foods = ['dosa', 'idly', 'vada', 'puri']
let drinks = ['apple juice', 'mango juice' ]

let newarr = [...foods, ...drinks];

console.log(newarr);

newarr[0] = 'chapathi'

console.log(newarr);  // use of : spread operator cannot change the original value it creates the new array without changing the original value

/*---------rest operator or rest parameter */


function test(a, b, ...rest) {
    console.log(a);
    console.log(b);
    console.log(rest);
}
test(100, 200, 300, 400, 500);  // we can use the rest operator to capture all remaining elements of an array that assigned to variables.
    


/*-----------------------------------------------------Practing code rest and spread operator----------------------------------------------------------------*/



/*1. Write a function using rest operator that accepts any number of numbers and prints the rest array.*/

function numbers(a,b ,...number) {
    console.log(number);
    
}

numbers(10, 20, 30, 40, 50);

/*2. Create a function that accepts a person’s name, age, and remaining hobbies using rest operator.*/

function person(name , age , ...hobbies) {
    
    console.log(`Name: ${name} Age: ${age} Hobbies: ${hobbies}`);
    
}

person("Mishal", 22, "playing circket", "watching movies")

/*3. Create a function using rest operator to calculate the sum of all numbers.*/

function sum(...numbers) {
    return numbers.reduce((total, current) => total + current);
}

console.log(`The total value is ${sum(10, 20, 30, 40)}`);

/*4. Combine these two arrays using the spread operator.*/

let frontend = ["HTML", "CSS", "JavaScript"];
let backend = ["Node.js", "Python", "MySQL"];

let fullstackarray = [ ...frontend, ...backend ];

console.log(fullstackarray);

/*5. Create a copy of an array using spread operator.*/

let fruits = ["Apple", "Banana", "Orange"];

let fruticopy = [...fruits , "Mango" , "pineapple"]

console.log(fruticopy);


/*6. Add a new value at the beginning and end of this array using spread.*/

let skills = ["JavaScript", "React", "Node.js"];

let addedskills = ['html', ...skills, 'python']

console.log(addedskills);

/*7. Create a function that receives multiple numbers using rest, then creates a new array using spread.*/

function numbers(...values) {
   return [...values]
}

console.log(numbers(10, 20, 30, 40));

/*Create new and old users then Create a new allUsers array using the spread operator.*/

let olduser = ["ram", "arun" , "bheem"]
let newuser = ["dolubolu", "kaliya", "jakku"]

let alluser = [...olduser, ...newuser]

console.log(alluser);


function calculate(first, second, ...numbers) {
    return [first, second, ...numbers].reduce((total, current) => current + total);
   
}
console.log(calculate(10, 20, 30, 40, 50));

/*10. Challenge: Find the largest number using rest operator.*/

function largestnumber(...numbers) {

    let largstnum = numbers[0];
    
    for (const num of numbers) {
        if (num > largstnum) {
            largstnum = num;
        }
        
    }

    return largstnum;
}

console.log(largestnumber(1,4,6,8,9));
