import Cards from './components/cards/script.js';
import BoardGrid from './components/board-grid/script.js';

document.addEventListener("DOMContentLoaded", () => {
    const cards = new Cards;
    const boardGrid = new BoardGrid;

    cards.clearBtnHanding(boardGrid.clearBoard.bind(boardGrid));
});

