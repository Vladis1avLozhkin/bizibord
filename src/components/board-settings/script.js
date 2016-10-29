export default class BoardSettings {
    constructor(changeBoardTypeHandler) {
        this.listenEvents();
        this.changeBoardTypeHandler = changeBoardTypeHandler || null;

        this.setDefaultType();
    }

    listenEvents() {
        let inputs = document.querySelectorAll('.board-settings__type-input');
        let labels = document.querySelectorAll('.board-settings__type');

        Array.prototype.forEach.call(inputs, (input) => {
            input.addEventListener('change', (e) => {
                if (this.changeBoardTypeHandler) {
                    this.changeBoardTypeHandler(e.target.value);
                }

                Array.prototype.forEach.call(labels, (label) => {
                    label.classList.remove('board-settings__type--active');
                });

                let label = e.target.parentNode;
                label.classList.add('board-settings__type--active');
            });

        });
    }

    setDefaultType() {
        let inputs = document.querySelectorAll('.board-settings__type-input');

        Array.prototype.forEach.call(inputs, (input) => {
            if (input.checked) {
                input.parentNode.classList.add('board-settings__types--active');

                if (this.changeBoardTypeHandler) {
                    this.changeBoardTypeHandler(input.value);
                }
            }
        });
    }

}
