export default class Cards {
    constructor() {
        this.cardSelector = '.card';

        let cards = document.querySelectorAll(this.cardSelector);
        Array.prototype.forEach.call(cards, (card, i) => {
            card.addEventListener('dragstart', this.handleDragStart, false);
            card.addEventListener('dragend', this.handleDragEnd, false);
        });
    }

    clearBtnHanding(handler) {
        let clearBtn = document.querySelector('.clear-board-btn');
        clearBtn.addEventListener('click', handler);
    }

    saveBtnHanding(handler) {
        let saveBtn = document.querySelector('.btn--save-board');
        saveBtn.addEventListener('click', handler);
    }

    handleDragStart(event) {
        let card = event.target;
        setTimeout(() => { card.classList.add('card_draggable'); }, 10);
        event.dataTransfer.setData("text", card.id);
    }

    handleDragEnd(event) {
        event.target.classList.remove('card_draggable');
    }
}

