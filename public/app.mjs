import { Game } from "./gameLogic.mjs";
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  const board = createBoardUI(document.querySelector('.container'));
  newGame(board);
});

class userInterface {
  constructor() {
  }


  newGame(board) {
    console.log(board);
    const button = document.getElementById('button');
    button.style.display = 'inline';
    const table = document.getElementById('table');
    table.removeEventListener
    button.addEventListener("click", () => {
      const game = new Game();
      button.style.display = 'none';
      showMessage(`It's ${game.currentPlayer.name}'s turn!`);
    table.addEventListener("click", event => handleClick(event, game));
    });
}
  createBoardUI(container) {
    const msgContainer = document.createElement('div');
    msgContainer.className = 'msgContainer';
    const button = document.createElement('button');
    button.className = 'button';
    button.id = 'button';
    button.textContent = 'Start Game';
    const table = document.createElement('table');
    table.className = 'table';
    table.id = 'table';
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
    return table;
}
  handleClick(event, game) {
    console.log(event.target.id);
    const id = event.target.id;
    const cell = document.getElementById(id);
    const index1 = id[0];
    const index2 = id[1];
    if (!cell.style.backgroundImage) {
      cell.style.backgroundImage = game.currentPlayer.background;
      game.markSquare(index1, index2);
    } else {
      console.log('Invalid move. Square already marked.');
    };
};

  showMessage(msg) {
    let msgContainer = document.querySelector('.msgContainer');
    msgContainer.textContent = msg;  
}


 
}
export { showMessage, newGame };