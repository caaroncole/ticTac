import { ui } from "./app.mjs";
class Game {
  constructor() {
    this.players = { one: "X", two: "O" };  
    this.currentPlayer = this.players.one;
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
  markSquare(ui, event, board) {
    const row = event.target.id[0];
    const col = event.target.id[1];
    console.log("Before");
    console.log(board[row][col]);
    console.log(board[row][col].value);
    if (board[row][col].value === undefined) {
      board[row][col].value = this.currentPlayer;
      ui.updateTable(event, board);
    }
    console.log("After");
    console.log(board[row][col]);
  }
  gameState(row, col) {
    if (this.checkWin(row, col)) {
      for (const [key, value] of Object.entries(this.players)) {
        if (value.name === this.board[row][col].value) {
          showMessage(`Player ${key} wins!`);
        }
      }
   
    } else if (this.board.every((row) => row.every((cell) => cell.value))) {
      showMessage(`It's a tie!`);
    } else {
      showMessage(`It's ${this.currentPlayer.name}'s turn!`);
    }
  }
  changePlayer() {
    this.currentPlayer = this.currentPlayer === this.players.one ? this.players.two : this.players.one;
  }
 
  checkWin(row, col) {
    let diagonal1 = [];
    let diagonal2 = [];
    let currentMark = this.board[row][col].value;
    console.log(`Placed ${this.board[row][col].value} at ${row}${col}`);
    this.board.map((row, index) => {
      diagonal1.push(row[index].value);
      diagonal2.push(row[2 - index].value);
    });
    if ((this.board[row].every((mark) => mark.value === currentMark)) || 
    (this.board.every((row) => row[col].value === currentMark)) ||
    (diagonal1.every((mark) => mark === currentMark)) ||
    (diagonal2.every((mark) => mark === currentMark))) {
      return this.board[row][col].value;
    } 
  }
}

export const game = new Game()
