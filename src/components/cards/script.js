export default class Cards {
    constructor() {
        this.cardSelector = '.card';

        let cards = document.querySelectorAll(this.cardSelector);
        Array.prototype.forEach.call(cards, (card, i) => {
            card.addEventListener('dragstart', this.handleDragStart, false);
            card.addEventListener('dragend', this.handleDragEnd, false);
        });

        this.fethcCards();
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

    fethcCards() {
        fetch('/board_cards.json')
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.addCards(json);
            });
    }

    addCards(cardsData) {
        cardsData.forEach((cardData) => {
            this.addCard(cardData);
        });
    }

    addCard(data) {
        console.log(data);
        let cards = document.querySelector('.cards');

        // Добавлене карточки в сайдбар
        let card = document.createElement('div');

        card.id = data.id;
        card.setAttribute('draggable', 'true');
        card.dataset.width = data.width;
        card.dataset.height = data.height;
        card.style.height = data.height * this.cardSize + 'px';
        card.style.width = data.width * this.cardSize + 'px';
        card.classList.add('card');
        card.classList.remove('card_draggable');

        card.addEventListener('dragstart', this.handleDragStart, false);
        card.addEventListener('dragend', this.handleDragEnd, false);

        let image = document.createElement('img');
        image.src = data.src;
        image.setAttribute('draggable', 'false');
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('card__remove-btn');

        card.appendChild(image);
        card.appendChild(removeBtn);
        cards.appendChild(card);
    }
}

