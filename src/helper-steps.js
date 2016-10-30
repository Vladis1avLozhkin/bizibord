let helpers = [
    {
        action: 'greeting',
        content: function() {
            return 'Приветствие. Сообщение о том, что будет обучение.';
        },
        start: function() {
        },
        end: function() {
        },
        // Какие то настройки
        settings: {
            // Например позиция окна с подсказкой
            modalPosition: ['top', 'right']
        }
    },
    {
        action: 'change-board-size',
        content: function() {
            return 'Для начала, выберите размер доски.';
        },
        start: function() {
            let lightingNode = document.querySelector('.board-settings__types');
            if (lightingNode) {
                lightingNode.classList.add('lighting-node');
            }

            let inputs = document.querySelectorAll('.board-settings__type-input');

            return new Promise((resolve, reject) => {
                Array.prototype.forEach.call(inputs, (input) => {
                    input.addEventListener('change', (e) => {
                        resolve(true);
                    });
                });
            });
        },
        end: function() {
            let lightingNode = document.querySelector('.board-settings__types');
            if (lightingNode) {
                lightingNode.classList.remove('lighting-node');
            }
        },
    },
    {
        action: 'change-board-background',
        content: function() {
            return 'Выбирите фон доски';
        },
        toggleLightingNode: function function_name() {
            let lightingNode = document.querySelector('.board-settings__backgrounds');

            if (lightingNode) {
                lightingNode.classList.toggle('lighting-node');
            }
        },
        start: function() {
            this.toggleLightingNode();
            console.log(this.toggleLightingNode);

            let inputs = document.querySelectorAll('.board-settings__background-input');

            return new Promise((resolve, reject) => {
                Array.prototype.forEach.call(inputs, (input) => {
                    input.addEventListener('change', (e) => {
                        resolve(true);
                    });
                });
            });
        },
        end: function() {
            this.toggleLightingNode();
        },
    },
    {
        action: 'end',
        content: function() {
            return 'Конец обучения';
        },
        start: function() {
        },
        end: function() {
        },
    },
];

export default helpers;
