export default class Helper {
    constructor(helpers) {
        this.helpers = helpers;
        this.stepIndex = 0;
        this.currentStep = this.helpers[this.stepIndex];
        this.currentStep.start();
        this.setContent();

        this.listenEvents();
    }

    setAction(action) {
        if (action === this.currentStep.action) {
            this.next();
        }
    }

    next() {
        if (this.helpers.length - 1 <= this.stepIndex) {
            return false;
        }

        this.currentStep.end();

        this.stepIndex++;
        this.currentStep = this.helpers[this.stepIndex];

        let startPromise = this.currentStep.start();

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

        this.currentStep.end();

        this.stepIndex--;
        this.currentStep = this.helpers[this.stepIndex];

        this.currentStep.start();
        this.setContent();

        return true;
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
