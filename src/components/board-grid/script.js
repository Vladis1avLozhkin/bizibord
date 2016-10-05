export default class BoardGrid {

    constructor() {
        this.collSelector = '.board-grid__coll';
    }

    handleDragOver(event) {
        event.preventDefault();

        let coll = event.target;
        coll.classList.add('board-grid__coll_state_over');
    }

    handleDragLeave(event) {
        let coll = event.target;
        coll.classList.remove('board-grid__coll_state_over');
    }

    handleDrop(event) {
        event.preventDefault();
        console.log('drop');
    }

    drugHanding() {
        let colls = document.querySelectorAll(this.collSelector);

        Array.prototype.forEach.call(colls, (coll, i) => {
            coll.addEventListener('dragover', this.handleDragOver, false);
            coll.addEventListener('dragleave', this.handleDragLeave, false);
            coll.addEventListener('drop', this.handleDrop);
        });
    }
}
