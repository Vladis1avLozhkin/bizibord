export default class Helper {
    constructor(helpers) {
        this.helpers = helpers;
        this.stepIndex = 0;
        this.currentStep = this.helpers[this.stepIndex];
        this.setContent();

        let helper = document.querySelector('.helper');
        helper.classList.add('helper--active');

        // Запуситить первый шаг
        if (this.currentStep.start) {
            this.currentStep.start();
        }

        this.listenEvents();
    }

    setAction(action) {
        if (action === this.currentStep.action) {
            this.next();
        }
    }

    next() {
        if (this.helpers.length - 1 <= this.stepIndex) {
            let helper = document.querySelector('.helper');
            helper.classList.remove('helper--active');
            this.unlight(this.currentStep.elements);

            return false;
        }

        if (this.currentStep.end) {
            this.currentStep.end();
        }

        // Отменить продсветку у элементов предыдущего шага
        this.unlight(this.currentStep.elements);

        this.stepIndex++;
        this.currentStep = this.helpers[this.stepIndex];

        // Подсветить элементы текущего шага
        this.light(this.currentStep.elements);


        let startPromise = null;
        if (this.currentStep.start) {
            startPromise = this.currentStep.start();
        }

        let helperFooter = document.querySelector('.helper__footer');
        if (startPromise) {
            helperFooter.classList.add('helper__footer--hidden');
            startPromise.then((res) => {
                this.next();
            });
        } else {
            helperFooter.classList.remove('helper__footer--hidden');
        }

        this.setContent();

        return true;
    }

    prev() {
        if (this.stepIndex === 0) {
            return false;
        }

        if (this.currentStep.end) {
            this.currentStep.end();
        }

        this.stepIndex--;
        this.currentStep = this.helpers[this.stepIndex];

        let startPromise = null;
        if (this.currentStep.start) {
            startPromise = this.currentStep.start();
        }

        this.setContent();

        return true;
    }

    /**
     * Подсветить элементы
     */
    light(elements) {
        if (! elements) return false;

        elements.forEach((selector) => {
            let nodes = document.querySelectorAll(selector);
            if (nodes) {
                Array.prototype.forEach.call(nodes, (node) => {
                    node.classList.add('lighting-node');
                });
            }
        });

    }

    /**
     * Убарить подсветку у элементов
     */
    unlight(elements) {
        if (! elements) return false;

        elements.forEach((selector) => {
            let nodes = document.querySelectorAll(selector);
            if (nodes) {
                Array.prototype.forEach.call(nodes, (node) => {
                    node.classList.remove('lighting-node');
                });
            }
        });

    }

    setContent() {
        let step = this.currentStep;

        let helperContent = document.querySelector('.helper__content');
        helperContent.innerHTML = step.content();
    }

    listenEvents() {
        let nextBtn = document.querySelector('.helper__btn--next');
        let prevBtn = document.querySelector('.helper__btn--prev');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.next();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prev();
            });
        }
    }
}
