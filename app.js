const choices = document.querySelectorAll('.choices');
const user = document.querySelector('#userScore');
const comp = document.querySelector('#compScore');
const compShow = document.querySelector('#compSelected');
const userShow = document.querySelector('#userSelected');
const winner = document.querySelector('.winner');
const playAgain = document.querySelector('.again');
let userScore = 0;
let compScore = 0;
let gameOver = false;

const playGame = (userChoice) => {
    if (!gameOver) {
        const compChoice = genComp();
        compShow.innerHTML = `<img src="images/${compChoice}.png" alt="${compChoice}">`;
        userShow.innerHTML = `<img src="images/${userChoice}.png" alt="${userChoice}">`;
        if (userChoice !== compChoice) {
            if (userChoice === 'rock' && compChoice === 'paper' || userChoice === 'paper' && compChoice === 'Scissors' || userChoice === 'Scissors' && compChoice === 'rock') {
                compScore++;
                comp.innerText = compScore;
                checkWinner(userScore, compScore);
            } else {
                userScore++;
                user.innerText = userScore;
                checkWinner(userScore, compScore);
            }
        } else {
            console.log('draw');
        }
    }
}

const checkWinner = (userScore, compScore) => {
    if (userScore > compScore && userScore >= 5) {
        isWinner('You');
    } else if (compScore > userScore && compScore >= 5) {
        isWinner('Computer');
    }
}

const isWinner = (iswinner) => {
    gameOver = true;
    if (iswinner === 'You') {
        winner.innerText = `Congratulations! ${iswinner} won`;
    } else if (iswinner === 'Computer') {
        winner.innerText = `Sorry! ${iswinner} won`;
    }
    winner.classList.remove('hide');
    playAgain.classList.remove('hide');
    disable();
}

const disable = () => {
    choices.forEach((choice) => {
        choice.removeEventListener('click', () => {
            gameOver = true;
        })
    })
}

const genComp = () => {
    const compOptions = ['rock', 'paper', 'Scissors'];
    const randomIdx = Math.floor(Math.random() * 3);
    return compOptions[randomIdx];
}
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    })
})

playAgain.addEventListener('click', () => {
    userScore = 0;
    compScore = 0;
    gameOver = false;
    user.innerText = '0';
    comp.innerText = '0';
    compShow.innerHTML = '';
    userShow.innerHTML = '';
    winner.classList.add('hide');
    playAgain.classList.add('hide');
})
