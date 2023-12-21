import { showMessage } from "./app.mjs";

class Game {
  constructor() {
    this.board = this.createBoard();
    this.players = {
      one: { name: "X", symbol: 'url("./x.png")' },
      two: { name: "O", symbol: 'url("./o.png")' },
    };
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
  gameState() {
    if (this.checkWin(this.board)) { // check win
        showMessage(0, this);
        console.log('WIN main detected');
      }
    //if statement checking if some but not all of the squares are filled
    if (this.board.flat().some(square => square.value === undefined)) { //if conditions for next player turn
      if (this.currentPlayer.name) {
        showMessage(2, this);
        console.log('NEXT PLAYER turn detected');
      }
    }
    if ((this.board.flat().every(square => square.value !== undefined)) && // check tie
    (this.board.flat().every(square => square.value))) {
    showMessage(3, this);
    console.log('TIE detected');
    }
  }
  changePlayer() {
    this.currentPlayer = this.currentPlayer === this.players.one ? this.players.two : this.players.one;
  }
  markSquare(row, col) {
    if (!this.board[row][col].value) {
      this.board[row][col].value = this.currentPlayer.name;
      if (this.checkWin(this.board)) {
        showMessage(0, this);
        console.log('WIN detected');
      }
      this.changePlayer();
      this.gameState();
     
    } else {
      console.log('Invalid move. Square already marked.');
    };
  };
  checkWin(board) {
    for (let i = 0; i < 3; i++) {
      if (board[i].filter(row => row.value === this.currentPlayer.name).length === 3) {
        console.log("WIN 1 detected");
        return this.currentPlayer.name, board[i].filter(row => row.value === this.currentPlayer.name);
      }
      if (board[0][i].value === this.currentPlayer.name && board[1][i].value === this.currentPlayer.name && board[2][i].value === this.currentPlayer.name) {
        console.log("WIN 2 detected");
        return this.currentPlayer.name, board[i].filter(row => row.value === this.currentPlayer.name);
      }
      if (board[0][0].value === this.currentPlayer.name && board[1][1].value === this.currentPlayer.name && board[2][2].value === this.currentPlayer.name) {
        console.log("WIN 3 detected");
        return this.currentPlayer.name, board[i].filter(row => row.value === this.currentPlayer.name);
      }
      if (board[0][2].value === this.currentPlayer.name && board[1][1].value === this.currentPlayer.name && board[2][0].value === this.currentPlayer.name) {
        console.log("WIN 4 detected");
        return this.currentPlayer.name, board[i].filter(row => row.value === this.currentPlayer.name);
      }
    }
  }
};
export { Game };
