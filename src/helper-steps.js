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
            return 'Выбирите фон доски.';
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
        elements: ['.cards'],
        content: function() {
            return 'Отлично. Теперь вы можете разместить на доске игрушки. Их список вы можете увидеть слева.';
        },
        start: function() {
        },
    },
    {
        elements: ['.cards', '.board__grid'],
        content: function() {
            return 'Для размещения игрушки, перетащите ее на доску.';
        },
        start: function() {
            return new Promise((resolve, rejects) => {
                let colls = document.querySelectorAll('.board__grid-coll');
                Array.prototype.forEach.call(colls, (coll) => {
                    coll.addEventListener('drop', (e) => {
                        resolve(true);
                    });
                });
            });
        },
    },
    {
        elements: ['.board__grid'],
        content() {
            return 'Отлично. Игрушку таким же образом можно перемещать по доске.';
        },
    },
    {
        elements: ['.board__grid .card__remove-btn'],
        content: function() {
            return 'Если вы хотите убрать игрушку с доски, нажмите на крестик в ее левом верхнем углу.';
        },
    },
    {
        content: function() {
            return `На этом обучение подходит к концу. Вы можете разместить сколько угодно игрушек на доске.
                    Будьте внимательны, игрушки нельзя размещать друг на друге.`;
        },
    },
    {
        elements: ['.btn--save-board'],
        content: function() {
            return `когда закончите, нажмите кнопку "Заказать". Мастер получит вашу доску и сделает ее точную копию. Желаем успехов.`;
        },
    },
];

export default helpers;
