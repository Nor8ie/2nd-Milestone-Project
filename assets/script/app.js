const addModal = document.querySelector('.modal-name');
const backdrop = document.getElementById('backdrop');
let userInput = document.getElementById('player-name');
const userName = document.getElementById('player-score').firstElementChild;
const callModalBtn = document.querySelector('.game-start');

let playerMsg = document.getElementById('player-board').firstElementChild;
let computerMsg = document.getElementById('computer-board').firstElementChild;
let pScore;
let cScore;
let rCounter;

const clearInput = () => {
    userInput.value = '';
};


const closeEnterNameModal = () => {
    addModal.classList.remove('visible');
    clearInput();
};





const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const startGame = () => {
    playerMsg.textContent = '';
    computerMsg.textContent = '';
    pScore = 0;
    cScore = 0;
    rCounter = 0;
};

const getWinner = (pChoice, cChoice) => {

    console.log(rCounter);
    if (rCounter > 10) {
        updateScore();
        alert('Game Over!');
        return;
    } else {
        if (pChoice === cChoice) {
            playerMsg.textContent = 'IT\'S A TIE!';
            computerMsg.textContent = 'IT\'S A TIE!';
            updateScore();
            const hands = document.querySelectorAll('#main-container img');
            hands.forEach(hand => {
                hand.addEventListener('animationend', function() {
                    this.style.animation = '';
                });
            });
            return;
        } else if (
            (pChoice === 'Paper' && cChoice === 'Rock') ||
            (pChoice === 'Scissors' && cChoice === 'Paper') ||
            (pChoice === 'Rock' && cChoice === 'Scissors')
        ) {
            playerMsg.textContent = 'WON!';
            playerMsg.parentElement.style.animation = "winner 2s ease";
            playerMsg.parentElement.addEventListener('animationend', function() {
                this.style.animation = '';
            });
            pScore++;
            updateScore();
            return;
        } else {
            computerMsg.textContent = 'WON!';
            computerMsg.parentElement.style.animation = "winner 2s ease";
            computerMsg.parentElement.addEventListener('animationend', function() {
                this.style.animation = '';
            });
            cScore++;
            updateScore();
            return;
        }
    }

};

const updateScore = () => {
    const pScoreLabel = document.querySelector('#player-score').lastElementChild.firstElementChild.firstElementChild;
    const cScoreLabel = document.querySelector('#computer-score').lastElementChild.firstElementChild.firstElementChild;
    const roundCounter = document.querySelector('#round-counter').lastElementChild.firstElementChild.firstElementChild;

    pScoreLabel.textContent = pScore;
    cScoreLabel.textContent = cScore;
    roundCounter.textContent = rCounter;

};


const match = () => {
    const pChoices = document.querySelectorAll('#player-choices button');
    const hands = document.querySelectorAll('#main-container img');
    const pHand = document.querySelector('#player-board img');
    const cHand = document.querySelector('#computer-board img');

    hands.forEach(hand => {
        hand.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });


    pChoices.forEach(pChoice => {
        pChoice.addEventListener('click', function() {
            playerMsg.textContent = '';
            computerMsg.textContent = '';
            rCounter++;
            // Computer Choice
            const randomValue = Math.random();
            let cChoice;
            if (randomValue < 0.34) {
                cChoice = 'Rock';
            } else if (randomValue < 0.67) {
                cChoice = 'Paper';
            } else {
                cChoice = 'Scissors';
            }

            setTimeout(() => {
                //Update images
                pHand.src = `./assets/img/${this.textContent}.png`;
                cHand.src = `./assets/img/${cChoice}.png`;
                //Here is where we call compare hands
                getWinner(this.textContent, cChoice);
            }, 2000);
            //Animation
            pHand.style.animation = "shakePlayer 2s ease";
            cHand.style.animation = "shakeComputer 2s ease";


        });
    });
};



const startGameHandler = () => {
    addModal.classList.add('visible');
    toggleBackdrop();
    clearInput();

    const letsPlayBtn = document.querySelector('.modal-action-buttons').firstElementChild;
    letsPlayBtn.addEventListener('click', function() {
        let input = userInput.value;
        if (input.trim() === '' || input.trim().length > 12) {
            alert('Please choose a valid username of max 12 characters');
            userInput.value = '';
            return;
        } else {
            userName.textContent = input;
            closeEnterNameModal();
            toggleBackdrop();
            startGame();
        }
    });

};

const backdropHandler = () => {
    closeEnterNameModal();
    toggleBackdrop();
};


callModalBtn.addEventListener('click', startGameHandler);
backdrop.addEventListener('click', backdropHandler);
match();