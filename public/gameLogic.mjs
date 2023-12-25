import { userInterface } from "./app.mjs";
class Game {
  constructor() {
    this.players = { one: "X", two: "O" };  
    this.currentPlayer = this.players.one;
    console.log(this.currentPlayer);
  }
  createBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i][j] = { value: undefined };
      }
    }
    return board;
  }
  markSquare(event, ui, board) {
    console.log(event.target)
    const row = event.target.id[0];
    const col = event.target.id[1];

    if (board[row][col].value === undefined) {
      console.log("marked square", row, col);
      board[row][col].value = this.currentPlayer;
      ui.updateTable(event, board);
      this.checkWinOrDraw(ui, event, board);  
    } else {
      console.log("square already marked");
      ui.showMessage("Invalid move, please try again");
    }
    
  }
  checkWinOrDraw(ui, event, board) {
    let win = false;
    let draw = false;
    let diagonal1 = [];
    let diagonal2 = [];
    const row = event.target.id[0];
    const col = event.target.id[1];
    let currentMark = board[row][col].value;
    board.map((row, index) => {
      diagonal1.push(row[index].value);
      diagonal2.push(row[2 - index].value);
    });
    if ((board[row].every((mark) => mark.value === currentMark)) || 
    (board.every((row) => row[col].value === currentMark)) ||
    (diagonal1.every((mark) => mark === currentMark)) ||
    (diagonal2.every((mark) => mark === currentMark))) {
      win = true;
    }
    if (board.every((row) => row.every((mark) => mark.value !== undefined))) {
      draw = true;
    }
    this.gameState(ui, win, draw, board);
  } 
  gameState(ui, win, draw, board) {
    if (win) {
      ui.showMessage(`Player ${this.currentPlayer} wins!`);
      ui.endGame(ui, board);
    } else if (draw) {
      ui.showMessage("Draw!");
      ui.endGame(ui, board);
    } else {
      this.changePlayer();
      ui.showMessage(`Player ${this.currentPlayer}'s turn`);
    }  
  }
  changePlayer() {
    this.currentPlayer = this.currentPlayer === this.players.one ? this.players.two : this.players.one;
  }
}
export { Game };
