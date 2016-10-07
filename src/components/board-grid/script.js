export default class BoardGrid {

    constructor() {
        this.collClassName = 'board-grid__coll';
        this.collSelector = '.' + this.collClassName;
        // Для элементов перетакскиваемых по доске
        this.dragableCard = null;
        this.cols = document.querySelectorAll(this.collSelector);
        this.grid = this.cleanGrid;

        Array.prototype.forEach.call(this.cols, (col, i) => {
            col.addEventListener('dragover', this.handleDragOver, false);
            col.addEventListener('dragleave', this.handleDragLeave, false);
            col.addEventListener('drop', this.handleDrop.bind(this));
        });

    }

    get cleanGrid() {
        let grid = [];

        Array.prototype.forEach.call(this.cols, (col, i) => {
            grid.push({x: col.dataset.x, y: col.dataset.y, busy: false});
        });

        return grid;
    }

    getCoordsArray(colX, colY, cardWidth, cardHeigh) {
        let coords = [];
        for (let y = 0; y < cardHeigh; ++y) {
            let yPos = parseInt(colY) + y;

            for (let x = 0; x < cardWidth; ++x) {
                let xPos = parseInt(colX) + x;
                coords.push({x: xPos, y: yPos});
            }
        }

        return coords;
    }

    clearBoard() {
        let cards = document.querySelectorAll(this.collSelector + ' .card');
        Array.prototype.forEach.call(cards, (card, i) => {
            card.remove();
        });

        this.grid = this.cleanGrid;
    }

    validateCardPos(colX, colY, cardWidth, cardHeigh) {
        // Получить координаты занимаемых ячеек
        let heldCols = this.getCoordsArray(colX, colY, cardWidth, cardHeigh);
        let validationStatus = true;

        // Собрать ячейки выходящие за пределы координа сетки
        let nonexistentCol = heldCols.filter((col) => {
            let colsMath = this.grid.filter((item) => {
                return item.x == col.x && item.y == col.y;
            });

            return colsMath.length === 0;
        });

        if (nonexistentCol.length > 0) {
            return false;
        }

        // Получить занятые ячейки
        let busyCols = this.grid.filter((item) => {
            return item.busy;
        });

        for (let i = 0; i < heldCols.length; ++i) {
            let col = heldCols[i];

            let colsMatch = busyCols.filter((item) => {
                return item.x == col.x && item.y == col.y;
            });

            if (colsMatch.length > 0) {
                validationStatus = false;

                break;
            }
        }

        return validationStatus;
    }

    gridUpdate(colX, colY, cardWidth, cardHeigh)  {
        // Собрать массив с координатоми занимаемых ячеек
        let busyCols = this.getCoordsArray(colX, colY, cardWidth, cardHeigh);

        // Освободить/занять ячейку
        busyCols.forEach(currentCol => {
            this.grid.map((item) => {
                if (currentCol) {
                    if (item.x == currentCol.x && item.y == currentCol.y) {
                        item.busy = ! item.busy;
                    }
                }
            });
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

        if (! coll.classList.contains(this.collClassName)) { return false; }

        let cardId = event.dataTransfer.getData('text');
        let originalCard = document.getElementById(cardId);

        let colX = coll.dataset.x;
        let colY = coll.dataset.y;
        let cardWidth = originalCard.dataset.width;
        let cardHeigh = originalCard.dataset.height;

        if ( ! this.validateCardPos(colX, colY, cardWidth, cardHeigh)) {
            return false;
        }

        // Добавлене карточки на сетку
        let card = originalCard.cloneNode(true);
        card.dataset.id = card.id;
        card.id = "";
        card.classList.add('card_in-grid');
        card.classList.remove('card_draggable');
        coll.appendChild(card);
        this.handingCardEvent(card);

        this.gridUpdate(colX, colY, cardWidth, cardHeigh);
        this.removeDragableCard();

        return true;
    }

    removeDragableCard() {
        if (this.dragableCard) {
            this.dragableCard.remove();
            this.dragableCard = null;
        }
    }

    handingCardEvent(card) {
        this.dndCardsEventsHandler(card);
        this.removeCardEventHandler(card);
    }

    removeCardEventHandler(card) {
        let removeBtn = card.querySelector('.card__remove-btn');
        removeBtn.addEventListener('click', () => {
            let col = card.parentNode;
            this.gridUpdate(col.dataset.x, col.dataset.y, card.dataset.width, card.dataset.height);
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
        let col = card.parentNode;
        this.dragableCard = card;

        // Фикс для хрома, при манипуляции с DOM перетаскиваемого элемента
        // мнгновенно всплывает сообытие dragend
        setTimeout(() => { card.classList.add('card_draggable'); }, 10);

        // Особождать предыдущюу позизию карточки
        this.gridUpdate(col.dataset.x, col.dataset.y, card.dataset.width, card.dataset.height);
        event.dataTransfer.setData("text", card.dataset.id);
    }

    dragCardEnter() {}

    dragCardEnd(event) {
        let card = event.target;
        let col = card.parentNode;

        if (col) {
            this.gridUpdate(col.dataset.x, col.dataset.y, card.dataset.width, card.dataset.height);
        }

        card.classList.remove('card_draggable');
    }
}
