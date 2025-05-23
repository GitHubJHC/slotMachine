// 1. deposit some money
// 2. determine numbeR of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. check if user won.
// 6. give the user winnings
// 7. play again

const prompt = require("prompt-sync")();

//global variables

const ROWS = 3;
const COLS = 3;

//symbols

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOLS_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}


// COLLECT USER INPUT

const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");

        //convert to number type
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again.");
        } else{
          return numberDepositAmount;
        }
    }
};

// Determine number of lines

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on(1-3): ");

        //convert to number type
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid number of lines, try again.");
        } else{
          return numberOfLines;
        }
    }
};

// Bet function

const getBet = (balance, lines) => {
    while(true){
        const betAmount = prompt("Enter a bet amount per line: ");

        //convert to number type
        const numberBet = parseFloat(betAmount);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines) {
        console.log("Invalid bet amount, try again.");
        } else{
          return numberBet;
        }
    }
};

//spin the WHEEL
const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){

        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    
    const reels = [];
        for(let i = 0; i < COLS; i++){
            reels.push([]);
            const reelSymbols = [...symbols];
                for(let j = 0; j < ROWS; j++){
                    const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                    const selectedSymbol = reelSymbols[randomIndex];
                    reels[i].push(selectedSymbol);
                    reelSymbols.splice(randomIndex, 1);
                }
        };
    return reels;
};

// "transpose" make rows vertical 
const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])

        }
    }
    return rows;
};

//print slot machine

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.lenght - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

//get winnings

const getWinnings = (rows, betAmount, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols =  rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += betAmount * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    let balance = deposit();

    while(true){
        console.log("You have a balance of $" + balance);

        const numberOfLines = getNumberOfLines();
            const betAmount = getBet(balance, numberOfLines);
            balance -= betAmount * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, betAmount, numberOfLines);
        balance += winnings;
            console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You ran out of money");
            break;
        }

        const playAgain = prompt("Do you wan to play again (y/n)? ");
        if (playAgain != "y") break;
    }
    
};

game();

