const card = document.querySelectorAll(".item-background");
const icon = document.querySelectorAll(".noClick");
const cardGame = document.querySelectorAll(".item-game");
const game = document.getElementById("matching-game");
let timer = document.getElementById("timer");
let bestScore = document.getElementById("best-score");
const modal = document.getElementById("myModal");
const audioSuccess = new Audio("files/success.mp3");
const audioError = new Audio("files/error.mp3");
const endGame = new Audio("files/finish.mp3");
audioSuccess.volume = 0.1;
audioError.volume = 0.1;
endGame.volume = 0.1;
const cards = [...card];
const icons = [...icon];
let cardsGame = [...cardGame];
let countMatchs = 0;

// Remove class on item by paramether.
const removeClassOnItems = (items, classname) => {
  items.forEach(item => {
    item.classList.remove(classname);
  });
};

// Add class on item by paramether.
const addClassOnItems = (items, className) => {
  items.forEach(item => {
    item.classList.add(className);
  });
};

// this function check the cards match.
const checkMetchedItems = () => {
  const card = document.getElementsByClassName("item-background-open");
  const cardsOpen = [...card];
  if (cardsOpen.length === 2) {
    if (
      cardsOpen[0].attributes.type.value === cardsOpen[1].attributes.type.value
    ) {
      audioSuccess.play();
      addClassOnItems(cardsOpen, "item-matched");
      removeClassOnItems(cardsOpen, "item-background-open");
      removeClickItems(cardsOpen);
      countMatchs++;
      checkFinishGame();
      cardsOpen[0].firstElementChild.classList.remove("z-index-1");
      cardsOpen[1].firstElementChild.classList.remove("z-index-1");
    } else {
      cardsOpen[0].firstElementChild.classList.add("z-index-1");
      cardsOpen[1].firstElementChild.classList.add("z-index-1");
      audioError.play();
      addClassOnItems(cardsOpen, "item-no-matched");
      removeClassOnItems(cardsOpen, "item-background-open");
      setTimeout(() => {
        removeClassOnItems(cardsOpen, "item-no-matched");
      }, 1100);
    }
    return;
  }
  return;
};

// Generic funtion to put in divs
const funcClick = e => {
  if (e.target.nodeName === "DIV") {
    e.target.children[0].classList.remove("z-index-1");
    e.target.classList.toggle("item-background-open");
    checkMetchedItems();
  }
};

// add listenners on items
const addListennerOnItens = () => {
  cards.forEach(item => {
    item.addEventListener("click", funcClick);
  });
};

// remove click items
const removeClickItems = items => {
  items.forEach(item => {
    item.removeEventListener("click", funcClick);
  });
};

// Check if the game is finished.
const checkFinishGame = () => {
  if (countMatchs === 8) {
    clearInterval(interval);
    bestScore.innerHTML = timer.innerHTML;
    modal.style.display = "block";
    endGame.play();
  }
};

// shuffle the cards to change all order in new game.
const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

let interval;
const startTimer = () => {
  let second = 0,  minute = 0, hour = 0;;
  interval = setInterval(() => {
    timer.innerHTML = ` ${minute} minuts : ${second} seconds`;
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

const closeModal = () => {
  modal.style.display = "none";
};

const reStartGame = () => {
  removeClassOnItems(cards, "item-matched");
  cards.forEach(card => {
    card.firstElementChild.classList.add("z-index-1");
  })
  clearInterval(interval);
  closeModal();
  startGame();
};

const startGame = () => {
  addListennerOnItens();
  removeClickItems(icons);

  game.innerHTML = "";
  cardsGame = shuffle(cardsGame);
  cardsGame.forEach(card => {
    game.appendChild(card);
  });
  startTimer();
};

document.body.onload = startGame();
