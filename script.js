var hangmanImages = ["https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-0.png", "https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png", "https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png", "https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png", "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png", "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png", "http://images6.fanpop.com/image/photos/35500000/-The-Drunk-Giraffe-Dance-amy-pond-35527721-245-170.gif"];
var defaultWord = ["pear", "apple", "strawberry", "durian", "orange", "starfruit"];
var bhs = ["albinson", "henri", "schweng", "zapata", "aperribay", "quiroz", "heffner", "wray", "maaze", "tobias", "becker", "bissell", "barcelos", "halpern", "austera",];
var langEasy= ["english", "spanish", "hindi", "mandarin", "arabic", "swahili", "cherokee"];
var langHard = ["aymara", "guguyimidjir", "wolof", "azerbaijani", "basque", "occitan", "inupiaq", "ainu", "liki", "nahuatl", "kyrgyz"];
var word = defaultWord[Math.floor(Math.random() * defaultWord.length)];
var guesses = guessNumber();
var guessedLetters = [];

// This is the starting function.
function startGame(){
    document.getElementById("guessNumber").innerHTML = guesses;
    document.getElementById("word").innerHTML = printWord();
    document.getElementById("endGame").style.display = "none";
    document.getElementById("image").innerHTML = "";
}

// This will take the user's guessed letter and use it accordingly.
function guessLetter(){
    var letter = document.getElementById("letter").value;
    // This deactivates the selected letter's button.
    document.getElementById("letter").options[matchValueToPosition(letter)].disabled = true;
    // This updates the list of already guessed letters.
    guessedLetters.push(letter);
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    // This updates the word and, if applicable, informs the user of their victory/tragic loss.
    var result = printWord();
    document.getElementById("word").innerHTML = result;
    if (result == word){
        alert("Congratulations, you have won! You may now choose to either bask in your victory by looking at this page, or restart the game and try again.");
        document.getElementById("endGame").style.display = "inline";
    }
    document.getElementById("guessNumber").innerHTML = guesses;
    if (guesses == 0){
        alert("You have lost. The word was " + word + ". You can play another round if you want. Better luck next time!");
        document.getElementById("endGame").style.display = "inline";
    }
    // This inputs the appropriate picture.
    document.getElementById("image").innerHTML = "";
    var picture = document.createElement("img");
    picture.setAttribute("src", giveImage());
    picture.setAttribute("width", "200px");
    document.getElementById("image").appendChild(picture);
}

// This function creates the updated word in progress.
function printWord(){
    var wordProgress = "";
    if (guessedLetters.length != 0){ // this line checks to see if the user has inputted something or if the game has just begun
        for (var a = 0; a < word.length; a++){ // this part checks each letter of the word
            for (var c = 0; c < guessedLetters.length; c++){ // this checks each guessed letter
                if (guessedLetters[c] == word[a]){
                    wordProgress += guessedLetters[c];
                }
                // This is for when the word has been completely filled and needs to be inputted out.
                if (wordProgress == word){
                    return wordProgress;
                }
            }
            // This is for if none of the guessed letters matched this particular spot in the word.
            if (wordProgress.length - 1 != a){
                wordProgress += "_";
            }
        }
        // If the guessed letter was not in the word, this updates the number of guesses the user has left.
        if (document.getElementById("word").innerHTML == wordProgress){
            guesses--;
        }
    } else { // this is the default
        for (var b = 0; b < word.length; b++){
            wordProgress += "_";
        }
    }
    return wordProgress;
}

// This function matches a letter to its position in the alphabet so that the letter selection box can be disabled when a letter has been guessed.
function matchValueToPosition(letter){
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (var b = 0; b < 26; b++){
        if (letter == alphabet[b]){
            return b;
        }
    }
}

// This function applies the student's choice to change what the word is.
function applySelection(){
    var category = document.getElementById("categories").value;
    if (category == "bhs"){
        word = bhs[Math.floor(Math.random() * bhs.length)];
        guesses = guessNumber();
    } else if (category == "langEasy"){
        word = langEasy[Math.floor(Math.random() * langEasy.length)];
        guesses = guessNumber();
    } else if (category == "langHard"){
        word = langHard[Math.floor(Math.random() * langHard.length)];
        guesses = guessNumber();
    } else {
        word = defaultWord[Math.floor(Math.random() * defaultWord.length)];
        guesses = guessNumber();
    }
    for (var a = 0; a < 26; a++){
        document.getElementById("letter").options[a].disabled = false;
        document.getElementById("letter").options[a].selected = false;
    }
    guessedLetters = [];
    startGame();
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
}

// This function is gives the user the correct answer.
function revealWord(){
    alert("The word was " + word + ". The game will now restart.");
    applySelection();
}

// This function determines the number of possible guesses.
function guessNumber(){
    if (word.length >= 6){
        return 5;
    } else if (2 < word.length - 1 && word.length - 1 <= 4){
        return 4;
    } else {
        return 2;
    }
}

// This function puts images into the guess box to indicate the number of guesses left.
function giveImage(){
    if (guesses == guessNumber()){
        return hangmanImages[0];
    } else if (guesses == 4){
        return hangmanImages[1];
    } else if (guesses == 3){
        return hangmanImages[2];
    } else if (guesses == 2){
        return hangmanImages[3];
    } else if (guesses == 1){
        return hangmanImages[4];
    } else {
        return hangmanImages[5];
    }
}