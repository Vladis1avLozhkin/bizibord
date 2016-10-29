import Cards from './components/cards/script.js';
import BoardTypes from './components/board-types/script.js';
import BoardGrid from './components/board/board__grid/script.js';

document.addEventListener("DOMContentLoaded", () => {
    const cards = new Cards;
    const boardGrid = new BoardGrid;
    const boardTypes = new BoardTypes(boardGrid.changeBoardTypeHandler.bind(boardGrid));

    cards.clearBtnHanding(boardGrid.clearBoard.bind(boardGrid));
    cards.saveBtnHanding(boardGrid.save.bind(boardGrid));
});

