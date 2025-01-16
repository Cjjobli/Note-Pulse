document.addEventListener("DOMContentLoaded", load)
let previousIndex = 0;
let chosenImageIndex = 0;
let addOrRemove = true;
let gameStarted = false;
let score = 0;
let countdownValue = 30;
let currentImage = null; // Global variable to keep track of the current image
let highscore = 0;

function load(){
    document.getElementById("start").addEventListener("click", start);

    let allNotes = document.getElementById("notes");
    allNotes.style.display = "none";

    let allBass = document.getElementById("notesBass");
    allBass.style.display = "none";

    let levelButtons = document.getElementById("levelsTreble");
    levelButtons.style.display = "none";

    let treble = document.getElementById("treble")
    treble.style.display = "none";

    let bass = document.getElementById("bass")
    bass.style.display = "none";

    let back = document.getElementById("back")
    back.style.display = "none";

    let levelsBass = document.getElementById("levelsBass");
    levelsBass.style.display = "none";

    let scoring = document.getElementById("scoringID");
    scoring.style.display = "none";

    // Level 1, Notes: Middle C, D, E, F
    let noteList1 = ["images/1c.jpg", "images/1d.jpg", "images/1e.jpg", "images/1f.jpg"];
    let buttonIds1 = ["C4", "D4", "E4", "F4"];
    let level1 = document.getElementById("lvl1");

    // Level 2, Notes: G, A, B, C
    let noteList2 = ["images/1g.jpg", "images/1a.jpg", "images/1b.jpg", "images/2c.jpg"];
    let buttonIds2 = ["G4", "A4", "B4", "C5"];
    let level2 = document.getElementById("lvl2");

    // Level 3, Notes: D, E, F, G, A
    let noteList3 = ["images/2d.jpg", "images/2e.jpg", "images/2f.jpg", "images/2g.jpg", "images/2a.jpg"];
    let buttonIds3 = ["D5", "E5", "F5", "G5", "A5"];
    let level3 = document.getElementById("lvl3");

    // Level 4, All notes
    let noteList4 = ["images/1c.jpg", "images/1d.jpg", "images/1e.jpg", "images/1f.jpg",
                    "images/1g.jpg", "images/1a.jpg", "images/1b.jpg", "images/2c.jpg", 
                     "images/2d.jpg", "images/2e.jpg", "images/2f.jpg", "images/2g.jpg", "images/2a.jpg"];
    let buttonIds4 = ["C6", "D6", "E6", "F6", "G6", "A6", "B6"];
    let level4 = document.getElementById("lvl4");

    levelSelector(noteList1, buttonIds1, level1);
    levelSelector(noteList2, buttonIds2, level2);
    levelSelector(noteList3, buttonIds3, level3);
    levelSelector(noteList4, buttonIds4, level4);

    // Level 1, Bass Notes: E, F, G, A
    let bassList1 = ["images/bass/e1.jpg", "images/bass/f1.jpg", "images/bass/g1.jpg", "images/bass/a1.jpg"]
    let bassButtons1 = ["E1", "F1", "G1", "A1"]
    let basslvl1 = document.getElementById("bass1")

    // Level 2, Bass Notes: B, C, D, E
    let bassList2 = ["images/bass/b1.jpg", "images/bass/c2.jpg", "images/bass/d2.jpg", "images/bass/e2.jpg"];
    let bassButtons2 = ["B1", "C2", "D2", "E2"];
    let basslvl2 = document.getElementById("bass2")

    // Level 3, Bass Notes: F, G, A, B, C
    let bassList3 = ["images/bass/f2.jpg", "images/bass/g2.jpg", "images/bass/a2.jpg", "images/bass/b2.jpg", "images/bass/c3.jpg"];
    let bassButtons3 = ["F2", "G2", "A2", "B2", "C3"];
    let basslvl3 = document.getElementById("bass3")

    // Level 4, Bass Notes: All notes
    let bassList4 = [
        "images/bass/e1.jpg", "images/bass/f1.jpg", "images/bass/g1.jpg", "images/bass/a1.jpg",
        "images/bass/b1.jpg", "images/bass/c2.jpg", "images/bass/d2.jpg", "images/bass/e2.jpg",
        "images/bass/f2.jpg", "images/bass/g2.jpg", "images/bass/a2.jpg", "images/bass/b2.jpg", "images/bass/c3.jpg"
    ];
    let bassButtons4 = ["E3E3", "F3F3", "G3G3", "A3A3", "B3B3", "C4C4", "D4D4"];
    let basslvl4 = document.getElementById("bass4")

    levelSelector(bassList1, bassButtons1, basslvl1);
    levelSelector(bassList2, bassButtons2, basslvl2);
    levelSelector(bassList3, bassButtons3, basslvl3);
    levelSelector(bassList4, bassButtons4, basslvl4);

    let beginButton = document.getElementById("begin");
    beginButton.style.display = "none";

    let timer = document.getElementById("timer");
    timer.style.display = "none";

    // Begin event listener
    beginButton.addEventListener("click", begin);

    // Pulse
    const pulsingText = document.getElementById('pulsing-text');
    
    // Example: Start pulsing after 2 seconds
    setTimeout(() => {
        pulsingText.style.animationPlayState = 'running';
    }, 2000);

    // Example: Stop pulsing after 10 seconds
    setTimeout(() => {
        pulsingText.style.animationPlayState = 'paused';
    }, 10000);

}

function start(){
    let treble = document.getElementById("treble")
    treble.style.display = "block"

    let bass = document.getElementById("bass")
    bass.style.display = "block"

    let start = document.getElementById("start")
    start.style.display = "none"

    let p1 = document.getElementById("p1")
    p1.style.display = "none"

    // Treble Button Clicked
    treble.addEventListener("click", function(){
        let levelButtons = document.getElementById("levelsTreble");
        levelButtons.style.display = "block";
        bass.style.display = "none";

        let back = document.getElementById("back")
        back.style.display = "block"
    })

    // Bass Button Clicked
    bass.addEventListener("click", function(){
        let levelButtons = document.getElementById("levelsBass");
        levelButtons.style.display = "block";
        treble.style.display = "none";

        let back = document.getElementById("back")
        back.style.display = "block"
    })
}

function begin(){
    gameStarted = true;

    let scoring = document.getElementById("scoringID");
    scoring.style.display = "flex";

    let back = document.getElementById("back")
    let begin = document.getElementById("begin")

    countdownValue = 30;

    // Function to update the timer
    function updateTimer() {
        document.getElementById('timer').innerText = countdownValue;

        if (gameStarted){
            // Decrement the countdown value
            countdownValue--;
            // If the countdown reaches zero, stop the timer
            if (countdownValue < 0) {
                clearInterval(timerInterval);
                back.disabled = false;
                back.style.opacity = 1;
                begin.disabled = false;
                begin.style.opacity = 1;

                gameOver();
            }
        }
    }
    let timerInterval = setInterval(updateTimer, 1000); // Updates every 1000 milliseconds (1 second)

    back.style.display = "none";
    begin.style.display = "none";

    let actualScore = document.getElementById("actualScore");
    actualScore.innerHTML = 0;
    score = 0;

    mistakes = 0;
    let mistakesScore = document.getElementById("mistakes");
    mistakesScore.style.display = "none";
    let wrongScore = document.getElementById("mistakesScore");
    wrongScore.innerHTML = mistakes;

    let flexNotesElements = document.querySelectorAll('.flex-notes');

    flexNotesElements.forEach(element => {
        element.disabled = false;
        });

    let yourScore = document.getElementById("yourScore")
    yourScore.style.display = "none";

    let trebleGuide = document.getElementById("trebleGuide");
    trebleGuide.style.display = "none";
    
    let bassGuide = document.getElementById("bassGuide");
    bassGuide.style.display = "none";
    
}

function gameOver(){
    let main = document.querySelector("main");
    // Removes any existing image element
    let existingImage = main.querySelector("img");

    // Select all elements with the class "flex-notes"
    let flexNotesElements = document.querySelectorAll('.flex-notes');

    // Iterate over each element and set its opacity to 0.1
    flexNotesElements.forEach(element => {
    element.style.opacity = '0';
    element.disabled = true;
    });

    let yourScore = document.getElementById("yourScore")
    yourScore.style.display = "block";

    let mistakes = document.getElementById("mistakes")
    mistakes.style.display = "block";

    let scoreID = document.getElementById("scoringID")
    scoreID.style.display = "none";
    
    currentImage.style.display = "none";

    let back = document.getElementById("back")
    let begin = document.getElementById("begin")
    back.style.display = "block";
    begin.style.display = "block";
}


function levelSelector(noteList, buttonIds, level){

    level.addEventListener("click", function() {
        buttonLoader(buttonIds, addOrRemove)

        let levelButtons = document.getElementById("levelsTreble");
        levelButtons.style.display = "none";

        let levelsBass = document.getElementById("levelsBass");
        levelsBass.style.display = "none";
    
        let back = document.getElementById("back")
        back.style.display = "block";

        let treble = document.getElementById("treble")
        treble.style.display = "none"

        let bass = document.getElementById("bass")
        bass.style.display = "none"

        // Handles begin button
        let beginButton = document.getElementById("begin");
        beginButton.style.display = "block";

        let timer = document.getElementById("timer");
        timer.style.display = "block";

        let actualScore = document.getElementById("actualScore");
        actualScore.innerHTML = 0;

        beginButton.addEventListener("click", function(){
            imageLoader(noteList, buttonIds);
            
        })

        if(level.value == "treble"){
            let trebleGuide = document.getElementById("trebleGuide");
            trebleGuide.style.display = "block";
        }

        if(level.value == "bass"){
            let bassGuide = document.getElementById("bassGuide");
            bassGuide.style.display = "block";
        }

        let levelIndicator = document.getElementById("levelIndicator");
        levelIndicator.innerText = level.innerText
    }); 

    // Handles the back button
    document.getElementById("back").addEventListener("click", function(){
        addOrRemove = false
        buttonLoader(buttonIds, addOrRemove)
        addOrRemove = true
        
        let back = document.getElementById("back")
        back.style.display = "none"

        let scoring = document.getElementById("scoringID");
        scoring.style.display = "none";

        let yourScore = document.getElementById("yourScore")
        yourScore.style.display = "none";

        let trebleGuide = document.getElementById("trebleGuide");
        trebleGuide.style.display = "none";

        let bassGuide = document.getElementById("bassGuide");
        bassGuide.style.display = "none";
    
        levelIndicator.innerText = "A MUSICAL NOTE MEMORIZATION TOOL"

        let mistakes = document.getElementById("mistakes")
        mistakes.style.display = "none";
        mistakes = 0;
        reset();
        });

    validateNote(noteList, buttonIds);

}


// Loads the image
function imageLoader(noteList, buttonIds){

    // Resets buttons when new image loads
    buttonIds.forEach(function(button){
        let buttons = document.getElementById(button)
        buttons.style.backgroundColor = "rgb(125, 64, 204)";
        buttons.style.opacity = 1;
    });

    let main = document.querySelector("main");
    let image = document.createElement("img");
    let randomIndex;
    let imageLists = noteList;

    // Generate a new image every time
    do{
        randomIndex = Math.floor(Math.random() * imageLists.length);
    }while(randomIndex == previousIndex);

    chosenImageIndex = randomIndex;
    previousIndex = randomIndex;

    // Remove the previous image if it exists
    if (currentImage) {
        main.removeChild(currentImage);
    }

    image.src = imageLists[randomIndex];
    image.classList.add("note-image")

    main.appendChild(image);

    // Update the global variable to reference the new image
    currentImage = image;

}

// Loads or remove the buttons
// Args: buttonIds: The ID of the buttons
//       addOrRemove: If true = load the buttons, if false = remove the buttons 
function buttonLoader(buttonIds, addOrRemove){
    let main = document.querySelector("main")
    if(addOrRemove){
        buttonIds.forEach(function(buttonId){
            let note = document.getElementById(buttonId)
            main.appendChild(note)
            note.style.display = "inline";
            note.classList.add("flex-notes")

            note.style.opacity = 0;
        });
    }else{
        buttonIds.forEach(function(buttonId) {
            let noteRemove = document.getElementById(buttonId);
                noteRemove.style.display = "none";
        });
    }
    
}

// Validates the notes
function validateNote(noteList, buttonIds){
        buttonIds.forEach(function(buttonId) {
            
            let button = document.getElementById(buttonId);
    
            button.addEventListener("click", function() {
    
                // Handles level 4 conditions so that the same button can be used. Ex: Middle C and C will both work 
                if(chosenImageIndex >= 7){
                    chosenImageIndex -= 7;
                }
                
                if (button.value == chosenImageIndex) {
                    imageLoader(noteList, buttonIds);
                    incrementScore();
                } 
                else {
                    button.style.backgroundColor = "black";
                    button.style.opacity = 0.1;
                    decrementScore();
                }
            });
        });
}

function incrementScore(){
    if(countdownValue >= 0){
        score++;
        document.getElementById("actualScore").textContent = score;

        let displayScore = document.getElementById("displayScore")
        displayScore.innerHTML = score;
    }

    let audio = document.getElementById("audio");
    audio.volume = 0.3;
    audio.play();
}


function decrementScore(){
    if(countdownValue >= 0){
        mistakes++;

        let score = document.getElementById("mistakesScore")
        score.innerHTML = mistakes;
    }
    let error = document.getElementById("errorSound");
    error.volume = 0.5;

    error.play();
}

function reset(){
    let main = document.querySelector("main");

    // Hides notes
    let allNotes = document.getElementById("notes");
    allNotes.style.display = "none";

    let treble = document.getElementById("treble")
    treble.style.display = "block"

    let bass = document.getElementById("bass")
    bass.style.display = "block"

    let levelButtons = document.getElementById("levelsTreble");
    levelButtons.style.display = "none";

    let levelButtonsBass = document.getElementById("levelsBass");
    levelButtonsBass.style.display = "none";

    let beginButton = document.getElementById("begin");
    beginButton.style.display = "none";

    let timer = document.getElementById("timer");
    timer.style.display = "none";



    score = 0;

    mistakes = 0;
}