let helpers = [
    {
        action: 'action_1',
        title: 'Dolor doloremque corporis blanditiis ratione',
        content: function() {
            return 'Adipisicing fugiat qui illo explicabo sunt nesciunt. Autem amet eum qui culpa ipsam? Magnam sapiente facilis optio atque laborum Amet repellendus perspiciatis recusandae obcaecati voluptate Quod perferendis fugiat lorem cumque';
        },
        start: function() {
            console.log('start actions_1');
        },
        end: function() {
            console.log('end actions_1');
        },
        // Какие то настройки
        settings: {
            // Например позиция окна с подсказкой
            modalPosition: ['top', 'right']
        }
    },
    {
        action: 'action_2',
        title: 'Dolor doloremque',
        content: function() {
            return 'Adipisicing fugiat qui illo explicabo sunt nesciunt. Autem amet eum qui culpa ipsam?';
        },
        start: function() {
            console.log('start actions_2');
        },
        end: function() {
            console.log('end actions_2');
        }
    },
];

export default helpers;
