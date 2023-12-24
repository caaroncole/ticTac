import { game } from './gameLogic.mjs';
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
       // td.style.color = "transparent";
        tr.appendChild(td);
      }
      table.appendChild(tr);
      }
      container.appendChild(table);
      container.appendChild(msgContainer);
      container.appendChild(button);
      this.table = table;
      button.addEventListener('click', () => {
      button.style.display = 'none';
      table.addEventListener('click', (event) => {
        game.markSquare(this, event, game.createBoard());
      })
      });
      
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
    let msgContainer = document.querySelector('.msgContainer');
    msgContainer.textContent = msg;  
  }
}
 export { userInterface as ui };