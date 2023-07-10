import swal from "sweetalert";
import CellModel from "../../../Models/CellModel";
import { boardStore } from "../../../Redux/BoardState";

function Winner(): boolean {

    // Retrieve the current state of cells from the boardStore
    // and assign it to the `cells` variable
    const cells: CellModel[] = boardStore.getState().cells;

    // Check if there is a winner:
    const isWinner = checkWinner();

    // Check if the board is full:
    const boardFull = cells.every(c => c.value);

    // If the board is full and there is no winner, it's a tie:
    if (boardFull && !isWinner) {
        swal({
            title: "It's a tie",
            icon: "warning"
        });
    }

    // Return whether there is a winner or the board is full:
    return isWinner || boardFull;

    function userWon(): void {
        // Display a success message for the user:
        swal({
            title: "You win!",
            icon: "success"
        });
    }

    function computerWon(): void {
        // Display an error message for the user:
        swal({
            title: "You lose!",
            icon: "error"
        });
    }

    function checkWinner(): boolean {

        // Combination of winning:
        const winningCombination = [

            [cells[0].value, cells[1].value, cells[2].value],
            [cells[3].value, cells[4].value, cells[5].value],
            [cells[6].value, cells[7].value, cells[8].value],
            [cells[0].value, cells[3].value, cells[6].value],
            [cells[1].value, cells[4].value, cells[7].value],
            [cells[2].value, cells[5].value, cells[8].value],
            [cells[0].value, cells[4].value, cells[8].value],
            [cells[2].value, cells[4].value, cells[6].value]
        ];

        // Check if any winning combination matches the current cell values:
        for (let i = 0; i < winningCombination.length; i++) {
            if (winningCombination[i][0] === "X" && winningCombination[i][1] === "X" && winningCombination[i][2] === "X") {
                // Player wins:
                userWon();
                return true;
            }
            if (winningCombination[i][0] === "O" && winningCombination[i][1] === "O" && winningCombination[i][2] === "O") {
                // Computer wins:
                computerWon();
                return true;
            }
        }
        return false;
    }
}

export default Winner;
