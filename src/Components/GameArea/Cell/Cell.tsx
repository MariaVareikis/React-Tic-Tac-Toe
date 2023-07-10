import reactX from "../../../Assets/Images/react.png";
import angularO from "../../../Assets/Images/angular.png";
import "./Cell.css";
import CellModel from "../../../Models/CellModel";
import Winner from "../Winner/Winner";
import gameService from "../../../Services/GameService";
import { useSelector } from "react-redux";
import { BoardState } from "../../../Redux/BoardState";

interface CellProps {
    cell: CellModel;
}

function Cell(props: CellProps): JSX.Element {

    // Retrieve the isPlayerTurn value from the Redux store using the useSelector hook:
    const isPlayerTurn: boolean = useSelector((state: BoardState) => state.isPlayerTurn);

    function handleClick(): void {

        // Ignore click if the cell is already filled or it's not the player's turn:
        if (props.cell.value === "O" || props.cell.value === "X" || !isPlayerTurn) return;

        // Handle click by updating the cell value with the player's symbol:
        gameService.handleClick(props.cell.id);

        // Check if the game is over:
        const isGameOver: boolean = Winner();

        if (isGameOver) return;

        // Delay the computer's turn and checking for a winner:
        setTimeout(() => {

            gameService.computerTurn();
            Winner();

        }, 1000);

    }

    return (
        <div className="Cell">
            <div className="CellBox" onClick={handleClick}>
                {props.cell.value === "X" && <div className="React"><img id="react" src={reactX} /></div>}
                {props.cell.value === "O" && <div className="Angular"><img id="angular" src={angularO} /></div>}
            </div>
        </div>
    );
}

export default Cell;


