let helpers = [
    {
        action: 'greeting',
        content: function() {
            return 'Приветствие. Сообщение о том, что будет обучение.';
        },
        start: function() {
            console.log('greeting start');
        },
        end: function() {
            console.log('greeting end');
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
            console.log('change-board-size start');
        },
        end: function() {
            console.log('change-board-size end');
        },
        // Какие то настройки
        settings: {
            // Например позиция окна с подсказкой
            modalPosition: ['top', 'right']
        }
    },
];

export default helpers;
