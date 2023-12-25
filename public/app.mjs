import { Game } from './gameLogic.mjs';
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  new userInterface();
});

class userInterface {
  constructor() {
    const container = document.getElementById('container');
    const msgContainer = document.createElement('div');
    const table = document.createElement('table');
    const button = document.createElement('button');
    msgContainer.className = 'msgContainer';
    button.className = 'button';
    button.textContent = 'Start Game';
    table.className = 'table';
    for (let i = 0; i < 3; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.id = `${i}${j}`;
        td.className = 'cell';
        tr.appendChild(td);
      }
      table.appendChild(tr);
      }
      container.appendChild(table);
      container.appendChild(msgContainer);
      container.appendChild(button);
      this.table = table;
      console.log(this.table);  
      button.addEventListener('click', this.newGame.bind(this));
  }
  newGame() { // goes to handleUserInput
    console.log("new game button clicked");
    const button = document.querySelector('.button');
    const game = new Game();
    const board = game.createBoard();
    button.style.display = 'none';
    this.instances = this.handleUserInput.bind(this, game, board);
    this.table.addEventListener("click", this.instances);
    
  }
   handleUserInput(game, board, event) { // goes to gameLogic module (markSquare) 
    game.markSquare(event, this, board); 
    
  }
  updateTable(event, board) {
    const backgroundImage = {
      X: 'url("./x.png")',
      O: 'url("./o.png")',
    }
    const row = event.target.id[0];
    const col = event.target.id[1];
    const cell = this.table.rows[row].cells[col];
    cell.style.backgroundImage = backgroundImage[board[row][col].value];
  }
  showMessage(msg) {
    const msgContainer = document.querySelector('.msgContainer');
    msgContainer.textContent = msg;
  }
  endGame(game, board) {
    //remove event listener
    this.table.removeEventListener("click", this.instances);
    const button = document.querySelector('.button');
    button.style.display = 'block';
    console.log("game ended");
  }
  clearTable() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = this.table.rows[i].cells[j];
        cell.style.backgroundImage = '';
      }
    }
  }
}
 export { userInterface };