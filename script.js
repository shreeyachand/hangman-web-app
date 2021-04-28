var used = [];
var numUsed = 0;
var blankLetters = "";
var chosenWord = "";
var tries = 6;
var word; 

function start() {
    document.getElementById("startBtn").style.visibility = "hidden";
    function getWord(w) {
        chosenWord = w.slice();
    }
    for (var i = 0; i < 26; i++) {
        letterButtons[i].style.display = "inline-block";
    }
    async function getData() {
        let response = await fetch('https://raw.githubusercontent.com/shreeyachand/hangman/main/word%20lists/sowpods.txt');
        let data = response.text().then(data => data);
        return data;
    }
    async function showWord() {
        var dataset = await getData();
        var words = dataset.split('\n');
        word = words[Math.floor(Math.random()*words.length)];
        console.log(word.length);
        for (var i = 0; i < word.length; i++) {
            blankLetters += "_";
        }
        getWord(word);
        document.getElementById("guessed").innerHTML = blankLetters.split("").join(" ");
    }
    showWord();
}
var wordsGot = chosenWord.slice();

function checking() {
    wordsGot = chosenWord.slice();
    console.log(wordsGot);
    if (tries > 0) {   
        var message = document.getElementById("message");
        var letter = this.innerHTML;
        this.style.color = "blue";
        this.style.background = "red";
        message.innerHTML = "";
        if (used.includes(letter)) {
            message.innerHTML = "You already tried this letter!";
        } else {
            used.push(letter);
            numUsed += 1;
            if (chosenWord.includes(letter)) {
                message.innerHTML = "Correct!";
                var ind = chosenWord.indexOf(letter);
                console.log(ind);
                wordsGot = wordsGot.replaceAll(letter, "_");
            } else {
                var tryWord = " tries ";
                tries -= 1;
                if (tries == 1) {tryWord = " try ";}
                message.innerHTML = "Incorrect!\n"+tries+tryWord+"left!";
            }
        }
        if (tries == 0) {
            message.innerHTML += "\nYou used all of your tries! Game over!";
            gameOver();
        }
        for (var i = 0; i < chosenWord.length; i++) {
            if (wordsGot[i] == "_") {
                blankLetters = blankLetters.substring(0, i)+chosenWord[i]+blankLetters.substring(i+1, blankLetters.length);
            }
        }
        document.getElementById("guessed").innerHTML = blankLetters.split('').join(" ");
        if (blankLetters == chosenWord) {
            message.innerHTML = "Congratulations! You won!";
            gameOver(true);
            tries = 0;
        }
    }
}


function gameOver(win) {
    if (!win) {document.getElementById("realword").innerHTML = "The word was '"+chosenWord+"'";}
    document.getElementById("restart").style.display = "inline-block";
}