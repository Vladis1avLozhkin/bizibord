export default class BoardGrid {

    constructor() {
        this.collSelector = '.board-grid__coll';
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
        event.dataTransfer.dropEffect = 'move';

        let coll = event.target;
        coll.classList.remove('board-grid__coll_state_over');

        let cardId = event.dataTransfer.getData('text');
        let originalCard = document.getElementById(cardId);
        let card = originalCard.cloneNode(true);
        card.id = ""
        card.classList.add('card_in-grid');
        card.classList.remove('card_draggable');

        coll.appendChild(card);
    }

    drugHanding() {
        let colls = document.querySelectorAll(this.collSelector);

        Array.prototype.forEach.call(colls, (coll, i) => {
            coll.addEventListener('dragover', this.handleDragOver, false);
            coll.addEventListener('dragleave', this.handleDragLeave, false);
            coll.addEventListener('drop', this.handleDrop);
        });
    }
}
