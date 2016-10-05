export default class Cards {
    constructor() {
        this.cardSelector = '.card';
    }

    handleDragStart(event) {
        let card = event.target;

        card.classList.add('card_draggable');

        event.dataTransfer.setData("text", card.id);
    }

    handleDragEnd(event) {
        event.target.classList.remove('card_draggable');
    }

    drugTracking() {
        let cards = document.querySelectorAll(this.cardSelector);

        Array.prototype.forEach.call(cards, (card, i) => {
            console.log(card)
            card.addEventListener('dragstart', this.handleDragStart, false);
            card.addEventListener('dragend', this.handleDragEnd, false);
            card.addEventListener('dragenter', this.handleDragEnd, false);
        });
    }
}

