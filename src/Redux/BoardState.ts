import { createStore } from "redux";
import CellModel from "../Models/CellModel";

// 1. Global state - global data:

export class BoardState {
    public cells: CellModel[] = [];
    public isPlayerTurn: boolean = true;
    public board: CellModel[] = [];
}

// 2. Action type - a list of operations we can perform on the data:

export enum BoardActionType {
    CellSetValueFromUser = "CellSetValueFromUser",
    InitBoard = "InitBoard",
    CellSetValueFromComputer = "CellSetValueFromComputer",
    NewGame = "NewGame"
}

// 3. Action - a single object which dispatch sends to Redux for some change:
export interface BoardAction {
    type: BoardActionType;
    payload?: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation:
export function boardReducer(currentState = new BoardState(), action: BoardAction): BoardState {

    const newState = { ...currentState };

    switch (action.type) {
        case BoardActionType.CellSetValueFromUser:
            let chosenCell = action.payload;
            newState.cells[chosenCell].value = "X";
            newState.cells = [...newState.cells];
            newState.isPlayerTurn = false;
            break;
        case BoardActionType.InitBoard:
            newState.cells = action.payload;
            break;
        case BoardActionType.CellSetValueFromComputer:
            let chosenCellOfComputer = action.payload;
            newState.cells[chosenCellOfComputer].value = "O";
            newState.isPlayerTurn = true;
            newState.cells = [...newState.cells];
            break;
        case BoardActionType.NewGame:
            // Initialize the board and reset the player turn:
            const cells: CellModel[] = [];
            for (let i = 0; i < 9; i++) {
                let cell = new CellModel();
                cell.id = i;
                cells.push(cell);
            }
            newState.cells = cells;
            newState.isPlayerTurn = true;
            break;
    }

    return newState;

}

// 5. Store - manager object from Redux library which handles the entire operations

export const boardStore = createStore(boardReducer);