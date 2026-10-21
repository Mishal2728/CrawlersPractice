// // oru array list la irundhu total venum nah ++ use pannum 

// let marks = [45, 12, 89, 35, 98, 70, 34];
// let passcount = [];

// for (let i = 0; i < marks.length; i++) {
//     if (marks[i] >=35) {
//         passcount++;
//     }
// }
// console.log(passcount);

// // oru array list la irundhu pass list or fail list venum nahh .push method use panni edukanum

// let marks = [45, 12, 89, 35, 98, 70, 34];
// let passList = [];

// for (let i = 0; i < marks.length; i++) {
//     if (marks[i]>=35) {
//         passList.push(marks[i]);
//     }
// }
// console.log(passList);

// // === use panna strict ahh value compare pannum even datatypes and value 

// let numbers = [12, 7, 19, 24, 30, 15, 8];
// let evenlist = [];

// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0 ) {
//         evenlist.push(numbers[i]);
//     }
// }
// console.log(evenlist);

// // epomey large or small value kandupudikanum nahh Mishal ah vida ahamed perusu nahhh ahamed ahh 
// // mishal ahh mathidu.....

// let scores = [45, 12, 89, 65, 102, 34];
// let largest = scores[0];

// for (let i = 0; i < scores.length; i++) {
//     if (scores[i] > largest) {
//         largest = scores[i];
//     }
// }
// console.log(largest);


// let students = ["Mishal", "Ahamed", "Irfan", "Santhosh", "Kavya"];
// let searchName = "Irfan";

// let isFound = false; // Starting-la student kedaikala nu vechikrom


// for (let i = 0; i < students.length; i++) {
//     if (students[i] === searchName) {
//         isFound = true
//         break;
//     }
// }
// console.log(isFound);


// let students = ["Mishal", "Ahamed", "Irfan", "Ahamed", "Santhosh", "Ahamed"];
// let searchName = "Ahamed";
// let count = 0;

// for (let i = 0; i < students.length; i++) {
//     if (students[i] === searchName) {
//         count++;
//     }
// }
// console.log(count);

// // PUSH PUSH USE PANNANUM ARRAY LA IRUNDHU LIST EDUKANUM NAHH

// let numbers = [12, 7, 5, 20, 33, 44, 18, 9];
// let evenNumbers = [];

// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0) {
//         evenNumbers.push(numbers[i]);
//     }
// }
// console.log(evenNumbers);


// // odd and even find pandradhu

// let numbers = [14, 21, 8, 35, 42, 9, 11, 60];
// let evens = [];
// let odds = [];

// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0) {
//         evens.push(numbers[i]);
//     } else {
//      odds.push(numbers[i]);   
//     }
// }

// console.log(evens);
// console.log(odds);

// new topest number find pandradhuku use pannnum

// let scores = [45, 89, 12, 98, 63, 77, 24];
// let max = scores[0]; 

// for (let i = 1; i < scores.length; i++) {
//     if (scores[i] > max) {
//         max = scores[i];
//     }
// }
// console.log(max);

// function countvowls(str) {

//     let count = 0;
//     let vowels = "aeiou";
//     let word = "Mishal";
//     for (let char of str) {
//         if (vowels.char === word.char) {
//             count++;
//         }
//     }
//     console.log(count);
// }


/* Question 2: Simple Calculation Function
Oru function ezhudhanum: calculateTotal(discount, ...prices)
Modhalla vara number discount.
Meethi varra numbers ellam prices.
Neenga prices-oda sum-ah calculate panni, adhu kooda discount-ah minus panni return pannanum.
Example call: calculateTotal(50, 100, 200, 300) $\rightarrow$ Output: 550 varanum.  */


// function calTotal(discount , ...prices) {
//     let total = prices.reduce((a, b) => a + b, 0)
//     let finalPrice = total - discount;
//     return finalPrice;
// }

// let finalAmount = calTotal(100, 65, 250, 99, 84, 95, 65, 10)

// console.log(finalAmount);