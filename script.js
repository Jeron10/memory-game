const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart");

const cardsArray = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffleCards() {
  return cardsArray.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const shuffledCards = shuffleCards();
  gameBoard.innerHTML = "";
  shuffledCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${card}</div>
        <div class="card-back"></div>
      </div>
    `;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard) return;
  const innerCard = this.querySelector(".card-inner");

  if (innerCard.classList.contains("flip")) return;

  innerCard.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  const firstValue = firstCard.querySelector(".card-front").textContent;
  const secondValue = secondCard.querySelector(".card-front").textContent;

  if (firstValue === secondValue) {
    firstCard = null;
    secondCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.querySelector(".card-inner").classList.remove("flip");
      secondCard.querySelector(".card-inner").classList.remove("flip");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

restartButton.addEventListener("click", createBoard);

// Initialize the game on page load
createBoard();
