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
        elements: ['.board-settings__types'],
        content: function() {
            return 'Для начала, выберите размер доски.';
        },
        start: function() {
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
        },
    },
    {
        action: 'change-board-background',
        elements: ['.board-settings__backgrounds'],
        content: function() {
            return 'Выбирите фон доски';
        },
        start: function() {
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
