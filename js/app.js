const card = document.getElementsByClassName("item-background");
const cards = [...card];

const checkMetchedItems = () => {
    const card = document.getElementsByClassName("item-background-open");
    const cardsOpen = [... card];
    if (cardsOpen.length === 2) {
        if (cardsOpen[0].attributes.value === cardsOpen[1].attributes.value) {
            cardsOpen.forEach(item => {
                console.log(item);
                item.classList.remove("item-background-open");
                item.classList.add("item-matched");
            })
        }
        return;
    }
    return;
}

const addListennerOnItens = () => {
    cards.forEach(item => {
        item.addEventListener('click', (e) => {
            e.target.classList.toggle("item-background-open");
            e.preventDefault();
            checkMetchedItems();
        })
    })
}


const startGame = () => {
    addListennerOnItens();
}

document.body.onload = startGame();