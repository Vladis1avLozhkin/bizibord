import Cards from './components/cards/script.js';
import BoardSettings from './components/board-settings/script.js';
import BoardGrid from './components/board/board__grid/script.js';
import Helper from './components/helper/script.js';
import helperSteps from './helper-steps.js';

console.log(helperSteps);

document.addEventListener("DOMContentLoaded", () => {
    const cards = new Cards;
    const boardGrid = new BoardGrid;

    const boardSettings = new BoardSettings(
        boardGrid.changeBoardTypeHandler.bind(boardGrid),
        boardGrid.changeBoardBackgroundHandler.bind(boardGrid)
    );

    const helper = new Helper(helperSteps);

    cards.clearBtnHanding(boardGrid.clearBoard.bind(boardGrid));
    cards.saveBtnHanding(boardGrid.save.bind(boardGrid));
});

