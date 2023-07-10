import { useEffect } from "react";
import { BoardState } from "../../../Redux/BoardState";
import "./Board.css";
import { useSelector } from "react-redux";
import gameService from "../../../Services/GameService";
import Cell from "../Cell/Cell";
import CellModel from "../../../Models/CellModel";

function Board(): JSX.Element {

    // Retrieve the cells from the Redux store using the useSelector hook:
    let cells: CellModel[] = useSelector((state: BoardState) => state.cells);

    useEffect(() => {

        // Initialize the game board when the component mounts:
        gameService.boardInit();

    }, []);

    return (
        <div className="Board">
            <table>
                <tbody>
                    <tr>
                        {cells.map(c => {
                            if (c.id < 3) {
                                return (
                                    <td key={c.id}><Cell cell={c} /> </td>
                                );
                            }
                            return null;
                        })}
                    </tr>
                    <tr>
                        {cells.map(c => {
                            if (c.id > 2 && c.id < 6) {
                                return (
                                    <td key={c.id}><Cell cell={c} /> </td>
                                );
                            }
                            return null;
                        })}
                    </tr>
                    <tr>
                        {cells.map(c => {
                            if (c.id > 5) {
                                return (
                                    <td key={c.id}><Cell cell={c} /> </td>
                                );
                            }
                            return null;
                        })}
                    </tr>
                </tbody>
            </table>

            <button onClick={() => gameService.newGame()}>New Game</button>
        </div >
    );
}

export default Board;
