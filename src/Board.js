//file containing the tic-tac-toe and game logic

//importing the css for the board
import "./css/board.css";

//importing the useState,useEffect and useRef hooks
import { useState, useEffect, useRef } from "react";

//props that will be passed in app.js
const Board = ({ reset, setReset, winner, setWinner }) => {
  //creating a turn state, which indicates the current turn
  const [turn, setTurn] = useState(0);

  //creating a data state which contains the current picture of the board

  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

  //creating a reference for the board\
  const boardRef = useRef(null);

  //Function to draw on the board
  const draw = (event, index) => {
    // draws only if the position is not taken and
    // winner is not decided yet
    if (data[index - 1] === "" && winner === "") {
      //Draws X if it's player 1's turn else draws O
      const current = turn === 0 ? "X" : "O";

      //updating the data state
      data[index - 1] = current;

      //drawing on the board
      event.target.innerText = current;

      //Switching the turn
      setTurn(turn === 0 ? 1 : 0);
    }
  };

  //UseEffect hook used to reset the board
  //whenever a winner is decided

  useEffect(() => {
    //Clearing the data state
    setData(["", "", "", "", "", "", "", "", ""]);

    //Getting all the children(cells of the board)\
    const cells = boardRef.current.children;

    //clearing out the board
    for (let i = 0; i < 9; i++) {
      cells[i].innerText = "";
    }

    //resetting the turn to player 0
    setTurn(0);

    //resetting the winner
    setWinner("");
    setReset(false);

    //dependency array to control the items that run
    // when there's a change in the DOM
  }, [reset, setReset, setWinner]);

  //useEffect hook used to check for a winner
  useEffect(() => {
    //check for the win condition in rows
    const checkRow = () => {
      let ans = false;

      for (let i = 0; i < 9; i += 3) {
        //check if the binary representation of the operands
        // of the indexes is the same using the Bitwise OR assignment (|=)
        //and its not empty

        ans |=
          data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] !== "";
      }
      return ans;
    };

    //check for the win in cols
    const checkCol = () => {
      let ans = false;

      for (let i = 0; i < 3; i++) {
        ans |=
          data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] !== "";
      }
      return ans;
    };

    //checks for the win in diagonals
    const checkDiagonal = () => {
      return (
        (data[0] === data[4] && data[0] === data[8] && data[0] !== "") ||
        (data[2] === data[4] && data[2] === data[6] && data[2] !== "")
      );
    };
    //check if at all a win condition is present
    const checkWin = () => {
      return checkRow() || checkCol() || checkDiagonal();
    };

    // checks for a tie
    const checkTie = () => {
      let count = 0;
      data.forEach((cell) => {
        if (cell !== "") {
          count++;
        }
      });
      return count === 9;
    };

    // setting the winner in case of a win
    if (checkWin()) {
      setWinner(turn === 0 ? "Player 2 wins!" : "Player 1 wins");
    } else if (checkTie()) {
      //setting the winner to a tie in case of a tie
      setWinner("It's a Tie");
    }
  });

  return (
    <div ref={boardRef} className="board">
      <div className="input input-1" onClick={(e) => draw(e, 1)}></div>
      <div className="input input-2" onClick={(e) => draw(e, 2)}></div>
      <div className="input input-3" onClick={(e) => draw(e, 3)}></div>
      <div className="input input-4" onClick={(e) => draw(e, 4)}></div>
      <div className="input input-5" onClick={(e) => draw(e, 5)}></div>
      <div className="input input-6" onClick={(e) => draw(e, 6)}></div>
      <div className="input input-7" onClick={(e) => draw(e, 7)}></div>
      <div className="input input-8" onClick={(e) => draw(e, 8)}></div>
      <div className="input input-9" onClick={(e) => draw(e, 9)}></div>
    </div>
  );
};

export default Board;
