/*

function Bookticket(amount) {
    return new Promise((resolve, reject) => {
        if (amount >= 150) {
            resolve("Ticket booked successfully!");
        } else {
            reject("Kaasu pathala, ticket kedaikaadhu!");
        }
    })
}

async function theatrePolaam() {
    try {
        let ticket = await Bookticket(200)
        console.log(ticket);
        
    } catch (error) {
        console.log(error);
        
    }
}
theatrePolaam();   

*/


/*


function withdrawMoney(balance, amount) {
    return new Promise((resolve, reject) => {
        if (amount <= balance) {
            resolve("Panam vandhuduchu! Balance: " + (balance - amount));
        } else {
            reject("Account-la avlo kaasu illa!");
        } 
    })
}

async function atmProcess() {
    
    try {
        let reciveamount = await withdrawMoney(5000, 4000);
        console.log(reciveamount);
    } catch (error) {
        console.log(error);        
    }
}

atmProcess();        

*/

/*


function checkSignal(color) {
    return new Promise((resolve, reject) => {
        if (color == "green") {
           resolve("Vandiyaaaaa edunga daa..........!")
        } else if (color == "red") {
            reject("Konja neram summma irunga da....");
        } else {
            reject("Deiii enna ache neyy therila da nee vera");
        }

    })
}

async function carDriver() {
    try {
        let trafficlight = await checkSignal("green");
        console.log(trafficlight);
        
    } catch (error) {
        console.log(error);
        
    }
}

carDriver();

*/

