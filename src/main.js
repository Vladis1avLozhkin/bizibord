import Cards from './components/cards/script.js';
import BoardSettings from './components/board-settings/script.js';
import BoardGrid from './components/board/board__grid/script.js';

document.addEventListener("DOMContentLoaded", () => {
    const cards = new Cards;
    const boardGrid = new BoardGrid;

    const boardSettings = new BoardSettings(
        boardGrid.changeBoardTypeHandler.bind(boardGrid),
        boardGrid.changeBoardBackgroundHandler.bind(boardGrid)
    );

    cards.clearBtnHanding(boardGrid.clearBoard.bind(boardGrid));
    cards.saveBtnHanding(boardGrid.save.bind(boardGrid));
});

