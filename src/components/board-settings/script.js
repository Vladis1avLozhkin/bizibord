export default class BoardSettings {
    constructor(changeBoardTypeHandler, changeBoardBackgroundHandler) {
        this.listenEvents();
        this.changeBoardTypeHandler = changeBoardTypeHandler || null;
        this.changeBoardBackgroundHandler = changeBoardBackgroundHandler || null;

        this.setDefaultSetting();
    }

    listenEvents() {
        this.listenEventsBoardType();
        this.listenEventsBoardBackgound();
    }

    listenEventsBoardType() {
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

                this.showBackgroundSettings();
            });

        });
    }

    listenEventsBoardBackgound() {
        let inputs = document.querySelectorAll('.board-settings__background-input');
        let labels = document.querySelectorAll('.board-settings__background');

        Array.prototype.forEach.call(inputs, (input) => {
            input.addEventListener('change', (e) => {
                if (this.changeBoardBackgroundHandler) {
                    this.changeBoardBackgroundHandler(e.target.value);
                }

                Array.prototype.forEach.call(labels, (label) => {
                    label.classList.remove('board-settings__background--active');
                });

                let label = e.target.parentNode;
                label.classList.add('board-settings__background--active');
            });
        });

    }

    showBackgroundSettings() {
        let backgroundSettings = document.querySelector('.board-settings__backgrounds');
        backgroundSettings.classList.add('board-settings__backgrounds--show');
    }

    setDefaultSetting() {
        let typeInputs = document.querySelectorAll('.board-settings__type-input');

        Array.prototype.forEach.call(typeInputs, (input) => {
            if (input.checked) {
                input.parentNode.classList.add('board-settings__types--active');
                this.showBackgroundSettings();

                if (this.changeBoardTypeHandler) {
                    this.changeBoardTypeHandler(input.value);
                }
            }
        });
    }

}
