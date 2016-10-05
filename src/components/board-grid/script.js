export default class BoardGrid {

    constructor() {
        this.collSelector = '.board-grid__coll';
        // Для элементов перетакскиваемых по доске
        this.dragableCard = null;

        let colls = document.querySelectorAll(this.collSelector);

        Array.prototype.forEach.call(colls, (coll, i) => {
            coll.addEventListener('dragover', this.handleDragOver, false);
            coll.addEventListener('dragleave', this.handleDragLeave, false);
            coll.addEventListener('drop', this.handleDrop.bind(this));
        });
    }

    handleDragOver(event) {
        event.preventDefault();

        let coll = event.target;
        coll.classList.add('board-grid__coll_state_over');
    }

    handleDragLeave(event) {
        let coll = event.target;
        coll.classList.remove('board-grid__coll_state_over');
    }

    handleDrop(event) {
        event.preventDefault();

        let coll = event.target;
        coll.classList.remove('board-grid__coll_state_over');

        // Если в ячейке уже присутсвует элемент то добавить не добавлять новый
        if (coll.innerHTML) {
            return false;
        }

        let cardId = event.dataTransfer.getData('text');
        let originalCard = document.getElementById(cardId);
        let card = originalCard.cloneNode(true);
        card.dataset.id = card.id;
        card.id = ""
        card.classList.add('card_in-grid');
        card.classList.remove('card_draggable');

        coll.appendChild(card);
        this.handingCardEvent(card);
    }

    handingCardEvent(card) {
        this.dndCardsEventsHandler(card);
        this.removeCardEventHandler(card);
    }

    removeCardEventHandler(card) {
        let removeBtn = card.querySelector('.card__remove-btn');
            removeBtn.addEventListener('click', () => {
            card.remove();
        });
    }

    dndCardsEventsHandler(card) {
        card.addEventListener('dragstart', this.dragCardStart.bind(this), false);
        card.addEventListener('dragend', this.dragCardEnd.bind(this), false);
        card.addEventListener('dragenter', this.dragCardEnter.bind(this), false);
    }

    dragCardStart(event) {
        let card = event.target;
        card.classList.add('card_draggable');
        this.dragableCard = card;

        event.dataTransfer.setData("text", card.dataset.id);
    }

    dragCardEnter() {
        if (this.dragableCard) {
            this.dragableCard.remove();
            this.dragableCard = null;
        }
    }

    dragCardEnd(event) {
        event.target.classList.remove('card_draggable');
    }
}
