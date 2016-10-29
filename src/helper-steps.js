let helpers = [
    {
        action: 'greeting',
        content: function() {
            return 'Приветствие. Сообщение о том, что будет обучение.';
        },
        start: function() {
            return true;
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
        },
        end: function() {
            let lightingNode = document.querySelector('.board-settings__types');
            if (lightingNode) {
                lightingNode.classList.remove('lighting-node');
            }
        },
        // Какие то настройки
        settings: {
            // Например позиция окна с подсказкой
            modalPosition: ['top', 'right']
        }
    },
];

export default helpers;
