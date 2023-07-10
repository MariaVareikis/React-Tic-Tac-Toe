import CellModel from "../Models/CellModel";
import { BoardActionType, boardStore } from "../Redux/BoardState";

class GameService {

    public newGame(): void {
        // Dispatch action to start a new game:
        boardStore.dispatch({ type: BoardActionType.NewGame });
    }

    public boardInit(): void {
        const cells: CellModel[] = [];
        for (let i = 0; i < 9; i++) {
            let cell = new CellModel();
            cell.id = i;
            cells.push(cell);
        }

        // Dispatch action to initialize the board with cells:
        boardStore.dispatch({ type: BoardActionType.InitBoard, payload: cells });
    }

    public handleClick(id: number): void {

        // Set the value from user in cell based on the clicked id:
        boardStore.dispatch({ type: BoardActionType.CellSetValueFromUser, payload: id });
    }

    public computerTurn(): void {

        // Get array of cells from BoardState:
        const cells: CellModel[] = boardStore.getState().cells;

        let chosenCellOfComputer = Math.floor(Math.random() * cells.length);

        // Find a random unoccupied cell for the computer's turn:
        while (cells[chosenCellOfComputer].value) {

            let cellsIndexes = cells.map((cell, index) => {
                if (!cell.value) return index;
            });

            let freeCellsIndexes = cellsIndexes.filter((cell) => cell);

            if (freeCellsIndexes.length === 0) return;
            chosenCellOfComputer = freeCellsIndexes[Math.floor(Math.random() * freeCellsIndexes.length)];

        }

        // Dispatch action to set the value of the chosen cell by the computer:
        boardStore.dispatch({ type: BoardActionType.CellSetValueFromComputer, payload: chosenCellOfComputer });
    }

}

const gameService = new GameService();
export default gameService;