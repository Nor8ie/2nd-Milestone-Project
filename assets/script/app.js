const playBtn = document.getElementById('game-control-container').firstElementChild;
const instrBtn = playBtn.nextElementSibling;
const callNameModal = document.getElementById('modal-name');
const okNameModalBtn = callNameModal.firstElementChild;
const closeNameModalBtn = okNameModalBtn.nextElementSibling;
const callInstrModal = document.getElementById('modal-instructions');
const closeInstrModalBtn = callInstrModal.lastElementChild;
let userInput = document.getElementById('player-name');


const backdrop = document.getElementById('backdrop');
const userName = document.getElementById('player-score').firstElementChild;
const callModalBtn = document.querySelector('.game-start');
const gameWinnerMsg = document.querySelector('.modal-logs');

let playerMsg = document.getElementById('player-board').firstElementChild;
let computerMsg = document.getElementById('computer-board').firstElementChild;
const pScoreLabel = document.querySelector('#player-score').lastElementChild.firstElementChild.firstElementChild;
const cScoreLabel = document.querySelector('#computer-score').lastElementChild.firstElementChild.firstElementChild;
const roundCounter = document.querySelector('#round-counter').lastElementChild.firstElementChild.firstElementChild;
let pScore;
let cScore;
let rCounter;



// const initialise = () => {
//     gameWinnerMsg.classList.remove('visible');
//     pScoreLabel.textContent = '0';
//     cScoreLabel.textContent = '0';
//     roundCounter.textContent = '0';
//     playerMsg.textContent = '';
//     computerMsg.textContent = '';
//     pScore = 0;
//     cScore = 0;
//     rCounter = 0;
// };

// const nameValidation = () => {
//     callNameModal.classList.add('visible');
//     toggleBackdrop();
//     let userInput = document.getElementById('player-name');
//     document.querySelector('.modal-action-buttons').addEventListener('click', (e) => {
//         if (e.target.tagName === 'BUTTON') {
//             if (e.target.textContent === 'Play!') {
//                 userName.textContent = userInput.value;
//                 closeNameModal(userInput);
//             } else {
//                 closeNameModal();
//             }
//         }
//     });

//     // document.querySelector('.modal-action-buttons').removeEventListener('click', btnValidation);
// }


// const getPlayerChoice = () => {
//     const pChoices = document.querySelectorAll('#player-choices button');
//     pChoices.forEach(pChoice => {
//         pChoice.addEventListener('click', function() {
//             console.log(pChoice);
//             return pChoice;
//         });
//     });
// };

// const closeNameModal = (userInput) => {
//     callNameModal.classList.remove('visible');
//     // userInput.value = '';
//     toggleBackdrop();
// };

const closeInstrModal = () => {
    document.getElementById('main-container').classList.remove('opaque');
    callInstrModal.classList.remove('visible');
    toggleBackdrop();
};



// const toggleBackdrop = () => {
//     backdrop.classList.toggle('visible');
// };

// const backdropHandler = () => {
//     closeNameModal();
//     closeInstrModal();
// };

const getInstrHandler = () => {
    document.getElementById('main-container').classList.add('opaque');
    toggleBackdrop();
    callInstrModal.classList.add('visible');
    closeInstrModalBtn.addEventListener('click', closeInstrModal);

};

// function playGame(round) {
//     nameValidation();
//     if (roundCounter.textContent === 0) {
//         initialise();
//     } else if (rCounter <= 10) {
//         let pChoice = getPlayerChoice();
//     }

// }

// playBtn.addEventListener('click', playGame);
// instrBtn.addEventListener('click', getInstrHandler);
// backdrop.addEventListener('click', backdropHandler);








const clearInput = () => {
    userInput.value = '';
};


const closeNameModal = () => {
    callNameModal.classList.remove('visible');
    clearInput();
};





const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const startGame = () => {
    // gameWinnerMsg.style.display = 'none';
    document.getElementById('main-container').style.opacity = 1;
    pScoreLabel.textContent = '0';
    cScoreLabel.textContent = '0';
    roundCounter.textContent = '0';
    playerMsg.textContent = '';
    computerMsg.textContent = '';
    pScore = 0;
    cScore = 0;
    rCounter = 0;
};

const endGame = (pScore, cScore) => {
    if (pScore === cScore) {
        gameWinnerMsg.innerHTML = `
        <h2>Congratulations <span>${userName.textContent}</span>, <br> you almost beat the Computer!!!</h2>
        <p>You both scored <span>${pScore}</span> times</p>
        <button>Play Again!</button>`
    } else if (pScore > cScore) {
        gameWinnerMsg.innerHTML = `
        <h2>Congratulations <span>${userName.textContent}</span>,<br>  you WIN!!!</h2>
        <p>The final score is <span>${pScore}</span> vs ${cScore} </p>
        <button>Play Again!</button>`
    } else {
        gameWinnerMsg.innerHTML = `
        <h2>Don't be sad <span>${userName.textContent}</span><br>  you could win in the next round!!!</h2>
        <p>This time Computer wins with <span>${cScore}</span> to <strong>${pScore}<strong></p>
        <button>Play Again!</button>`
    }
    document.getElementById('main-container').style.opacity = 0;
    gameWinnerMsg.classList.add('visible');
    const resetBtn = document.querySelector('.modal-logs').lastElementChild;
    resetBtn.addEventListener('click', startGame);
}

const getWinner = (pChoice, cChoice) => {
    if (rCounter === 2) {
        updateScore();
        endGame(pScore, cScore);
        return;
    } else {
        if (pChoice === cChoice) {
            playerMsg.textContent = 'IT\'S A TIE!';
            computerMsg.textContent = 'IT\'S A TIE!';
            updateScore();
            const hands = document.querySelectorAll('#main-container img');
            hands.forEach(hand => {
                hand.animate([
                    { backgroundColor: 'white' },
                    { backgroundColor: 'red' }
                ], {
                    duration: 1000,
                    iterations: 3
                });
            });
            return;
        } else if (
            (pChoice === 'Paper' && cChoice === 'Rock') ||
            (pChoice === 'Scissors' && cChoice === 'Paper') ||
            (pChoice === 'Rock' && cChoice === 'Scissors')
        ) {
            playerMsg.textContent = 'WON!';
            playerMsg.parentElement.animate([
                { backgroundColor: 'white' },
                { backgroundColor: 'red' }
            ], {
                duration: 1000,
                iterations: 3
            });;
            // playerMsg.parentElement.addEventListener('animationend', function() {
            //     this.style.animation = '';
            // });
            pScore++;
            updateScore();
            return;
        } else {
            computerMsg.textContent = 'WON!';
            computerMsg.parentElement.animate([
                { backgroundColor: 'white' },
                { backgroundColor: 'red' }
            ], {
                duration: 1000,
                iterations: 3
            });
            // computerMsg.parentElement.addEventListener('animationend', function() {
            //     this.style.animation = '';
            // });
            cScore++;
            updateScore();
            return;
        }
    }

};

const updateScore = () => {

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
            pHand.src = './assets/img/rock.png';
            cHand.src = './assets/img/rock.png';
            pHand.style.animation = "shakePlayer 2s ease";
            cHand.style.animation = "shakeComputer 2s ease";


        });
    });
};



const startGameHandler = () => {
    callNameModal.classList.add('visible');
    toggleBackdrop();
    clearInput();

    const letsPlayBtn = document.querySelector('.modal-action-buttons').firstElementChild;
    letsPlayBtn.addEventListener('click', function() {
        let input = userInput.value;
        if (input.trim() === '' && input.trim().length > 12) {
            alert('Please choose a valid username, max 12 characters');
            userInput.value = '';
            return;
        } else {
            userName.textContent = input;
            closeNameModal();
            toggleBackdrop();
            startGame();
        }
    });

};

const backdropHandler = () => {
    closeNameModal();
    toggleBackdrop();
};


playBtn.addEventListener('click', startGameHandler);
backdrop.addEventListener('click', backdropHandler);
match();