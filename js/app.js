const card = document.querySelectorAll(".item-background");
const icon = document.querySelectorAll(".noClick");
const cardGame = document.querySelectorAll('.item-game');
const game = document.getElementById('matching-game');

const cards = [...card];
const icons = [...icon];
let cardsGame = [...cardGame];

const removeClassOnItems = (items, classname) => {
  items.forEach(item => {
    item.classList.remove(classname);
  });
};

const addClassOnItems = (items, className) => {
  items.forEach(item => {
    item.classList.add(className);
  });
};

const checkMetchedItems = () => {
  const card = document.getElementsByClassName("item-background-open");
  const cardsOpen = [...card];
  if (cardsOpen.length === 2) {
    if (
      cardsOpen[0].attributes.type.value === cardsOpen[1].attributes.type.value
    ) {
      addClassOnItems(cardsOpen, "item-matched");
      removeClassOnItems(cardsOpen, "item-background-open");
      removeClickItems(cardsOpen);
    } else {
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

const funcClick = e => {
  if (e.target.nodeName === "DIV") {
    e.target.classList.toggle("item-background-open");
    checkMetchedItems();
  }
};


const addListennerOnItens = () => {
  cards.forEach(item => {
    item.addEventListener("click", funcClick);
  });
};

const removeClickItems = items => {
  items.forEach(item => {
    item.removeEventListener("click", funcClick);
  });
};

const shuffle = array => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
};

const startGame = () => {
  addListennerOnItens();
  removeClickItems(icons);

  game.innerHTML = "";
  cardsGame = shuffle(cardsGame);
  cardsGame.forEach(card => {
    game.appendChild(card);
  })
};

document.body.onload = startGame();
