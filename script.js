/*

Global variables (variables that are declared outside of a function):
word - string (according to Gabe when it is selecting every time?)
words - array
guesses - number
guessedLetters - array
*/
var words = ["apple", "pear", "orange", "lemon"];
var guessedWord = words[Math.floor(Math.random() * words.length)]
var guesses = 0;
var guessedLetters = [];

// Reset the board, clear out any traces of the last round from guessedLetters
// Choose a word - this code will grab  a random element from your words array for you:
// var rand = myArray[Math.floor(Math.random() * myArray.length)];
function startGame(){
    var chosenWordLength = guessedWord.length;
    document.getElementById("guessNumber").innerHTML = chosenWordLength - 1;
    for (var a = 0; a < chosenWordLength; a++){
        document.getElementById("word").innerHTML += "_ ";
    }
}

// Take the most recently guessed letter and validate it, re-print the word, deduct from guesses,
// check to see if the user has won or lost yet.
function guessLetter(){
    var letter = document.getElementById("letter").value;
    var letterCheck = 0;
    if (letter == ""){
        alert("Oops! You have not entered a letter yet. Please do so now.");
        letterCheck++;
    }
    for (var a = 0; a < guessedLetters.length; a++){
        if (guessedLetters[a] == letter){
            alert("Oops! You have already guessed this letter. Please guess a different one.");
            letterCheck++;
        }
    }
    if (letterCheck == 0){
        // this changes the

        // this changes the word display
        var oldWordDisplay = document.getElementById("word").innerHTML;
        var builtWordDisplay = "";
        for (var b = 0; b < guessedWord.length; b++){
            if (guessedWord.split(b, b+1) == letter){ // this line checks to see if the letter matches any in the words
                for (var c = 0; c < document.getElementById("word").length; c+2){ // this loop replaces all the needed "_ "s with the guessed letter
                    if (c != b){
                        builtWordDisplay += "_ ";
                    } else {
                        builtWordDisplay += letter + " ";
                    }
                }
            }
        }
        if (builtWordDisplay == ""){

        }
    }
}

// Compare word to guessedLetters using guessedLetters.indexOf(letter in word) to
// build the “_” word with the correctly guessed letters filled in.
function printWord(){

}