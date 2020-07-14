const addModal = document.querySelector('.modal-name');
const backdrop = document.getElementById('backdrop');
let userInput = document.getElementById('player-name');
const userName = document.getElementById('player-score').firstElementChild;
const callModalBtn = document.querySelector('.game-start');
let playerScore = document.querySelector('.label-player');
let computerScore = document.querySelector('.label-computer');
let roundCounter = document.querySelector('#round-counter').lastElementChild.firstElementChild.firstElementChild;


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
    playerScore.textContent = '00';
    computerScore.textContent = '00';
    roundCounter.textContent = '00';
    console.log(playerScore);
    console.log(computerScore);
    console.log(roundCounter);
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