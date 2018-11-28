/*

Global variables (variables that are declared outside of a function):
word - string (according to Gabe when it is selecting every time?)
words - array
guesses - number
guessedLetters - array
*/
var words = ["apple", "pear", "orange", "lemon"];
var word = words[Math.floor(Math.random() * words.length)]
var guesses = 0;
var guessedLetters = [];

// Reset the board, clear out any traces of the last round from guessedLetters
// Choose a word - this code will grab  a random element from your words array for you:
// var rand = myArray[Math.floor(Math.random() * myArray.length)];
function startGame(){
    var chosenWordLength = word.length;
    document.getElementById("guessNumber").innerHTML = chosenWordLength - 1;
    document.getElementById("word").innerHTML = printWord();
}

// Take the most recently guessed letter and validate it, re-print the word, deduct from guesses,
// check to see if the user has won or lost yet.
function guessLetter(){
    var letter = document.getElementById("letter").value;
    document.getElementById("letter").disabled = true;
    guessedLetters.push(letter);
    document.getElementById("word").innerHTML = printWord();

    // this just resets the letter input
    document.getElementById("letter").value = "";
}

// Compare word to guessedLetters using guessedLetters.indexOf(letter in word) to
// build the “_” word with the correctly guessed letters filled in.
function printWord(){
    var wordProgress = "";
    if (guessedLetters.length != 0){
        for (var a = 0; a < word.length; a++){
            if (word.indexOf(guessedLetters[a]) != -1){
                wordProgress += guessedLetters[a] + " ";
            } else {
                wordProgress += "_ ";
            }
        }
    } else {
        for (var b = 0; b < word.length; b++){
            wordProgress += "_ ";
        }
    }
    return wordProgress;
}