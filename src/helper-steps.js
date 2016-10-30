let helpers = [
    {
        content: function() {
            return 'Приветствие. Сообщение о том, что будет обучение.';
        },
        start: function() {
        },
        // Какие то настройки
        settings: {
            // Например позиция окна с подсказкой
            modalPosition: ['top', 'right']
        }
    },
    {
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
    },
    {
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
    },
    {
        content: function() {
            return 'Конец обучения';
        },
        start: function() {
        },
    },
];

export default helpers;
