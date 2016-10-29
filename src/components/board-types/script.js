export default class BoardTypes {
    constructor(changeBoardTypeHandler) {
        this.listenEvents();
        this.changeBoardTypeHandler = changeBoardTypeHandler || null;

        this.setDefaultType();
    }

    listenEvents() {
        let inputs = document.querySelectorAll('.board-types__input');
        let labels = document.querySelectorAll('.board-types__item');

        Array.prototype.forEach.call(inputs, (input) => {
            input.addEventListener('change', (e) => {
                if (this.changeBoardTypeHandler) {
                    this.changeBoardTypeHandler(e.target.value);
                }

                Array.prototype.forEach.call(labels, (label) => {
                    label.classList.remove('board-types__item--active');
                });

                let label = e.target.parentNode;
                label.classList.add('board-types__item--active');
            });

        });
    }

    setDefaultType() {
        let inputs = document.querySelectorAll('.board-types__input');

        Array.prototype.forEach.call(inputs, (input) => {
            if (input.checked) {
                input.parentNode.classList.add('board-types__item--active');

                if (this.changeBoardTypeHandler) {
                    this.changeBoardTypeHandler(input.value);
                }
            }
        });
    }

}
