export default class Cards {
    constructor() {
        this.cardSelector = '.card';

        let cards = document.querySelectorAll(this.cardSelector);
        Array.prototype.forEach.call(cards, (card, i) => {
            console.log(card)
            card.addEventListener('dragstart', this.handleDragStart, false);
            card.addEventListener('dragend', this.handleDragEnd, false);
        });
    }

    handleDragStart(event) {
        let card = event.target;
        card.classList.add('card_draggable');
        console.log(card.classList);
        event.dataTransfer.setData("text", card.id);
    }

    handleDragEnd(event) {
        console.log('tut');
        event.target.classList.remove('card_draggable');
    }
}

