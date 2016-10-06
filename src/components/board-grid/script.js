export default class BoardGrid {

    constructor() {
        this.collClassName = 'board-grid__coll';
        this.collSelector = '.' + this.collClassName;
        // Для элементов перетакскиваемых по доске
        this.dragableCard = null;
        this.grid = [];

        let colls = document.querySelectorAll(this.collSelector);

        Array.prototype.forEach.call(colls, (coll, i) => {
            coll.addEventListener('dragover', this.handleDragOver, false);
            coll.addEventListener('dragleave', this.handleDragLeave, false);
            coll.addEventListener('drop', this.handleDrop.bind(this));
        });

        Array.prototype.forEach.call(colls, (coll, i) => {
            this.grid.push({x: coll.dataset.x, y: coll.dataset.y, busy: false});
        });
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

    validateCardPos(colX, colY, cardWidth, cardHeigh) {
        // Получить координаты занимаемых ячеек
        let heldCols = this.getCoordsArray(colX, colY, cardWidth, cardHeigh);
        let isColsMatch = false;

        // Получить занятые ячейки
        let busyCols = this.grid.filter((item) => {
            return item.busy;
        });

        for (let i = 0; i < heldCols.length; ++i) {
            let col = heldCols[i];

            let colsMatch = busyCols.filter((item) => {
                return item.x == col.x && item.y == col.y
            });

            if (colsMatch.length > 0) {
                isColsMatch = true;
                break
            }
        }

        // Если есть занятые ячейки
        return ! isColsMatch;
    }

    gridAddItem(colX, colY, cardWidth, cardHeigh) {
        // Собрать массив с координатоми занимаемых ячеек
        let busyCols = this.getCoordsArray(colX, colY, cardWidth, cardHeigh);

        // Отметить занятые ячейки
        busyCols.forEach(currentCol => {
            this.grid.map((item) => {
                if (currentCol) {
                    if (item.x == currentCol.x && item.y == currentCol.y) {
                        item.busy = true;
                    }
                }
            });
        });
    }

    gridRemoveItem(colX, colY, cardWidth, cardHeigh) {
        console.log(colX, colY, cardWidth, cardHeigh);
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
        // Если в ячейке уже присутсвует элемент то добавить не добавлять новый
        if (coll.innerHTML) { return false; }

        let cardId = event.dataTransfer.getData('text');
        let originalCard = document.getElementById(cardId);

        let colX = coll.dataset.x;
        let colY = coll.dataset.y;
        let cardWidth = originalCard.dataset.width;
        let cardHeigh = originalCard.dataset.height;

        if ( ! this.validateCardPos(colX, colY, cardWidth, cardHeigh)) { return false }

        // Добавлене карточки на сетку
        let card = originalCard.cloneNode(true);
        card.dataset.id = card.id;
        card.id = ""
        card.classList.add('card_in-grid');
        card.classList.remove('card_draggable');
        coll.appendChild(card);
        this.handingCardEvent(card);

        this.gridAddItem(colX, colY, cardWidth, cardHeigh);
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
