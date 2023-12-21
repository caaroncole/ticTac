import { Game } from "./gameLogic.mjs";
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  const container = document.getElementById('container');
  createBoardUI(container);
  
});

function createBoardUI(container) {
  const game = new Game();
  const msgContainer = document.createElement('div');
  msgContainer.className = 'msgContainer';
  const button = document.createElement('button');
  button.className = 'button';
  const table = document.createElement('table');
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
  table.addEventListener('click', (event) => handleClick(event, game));  
  container.appendChild(table);
  container.appendChild(msgContainer);
  container.appendChild(button);
  showMessage(1, game);
};
function handleClick(event, game) {
  console.log(event.target.id);
  const id = event.target.id;
  const cell = document.getElementById(id);
  const index1 = id[0];
  const index2 = id[1];
  if (!cell.style.backgroundImage) {
    cell.style.backgroundImage = game.currentPlayer.symbol;
    game.markSquare(index1, index2);
  } else {
    console.log('Invalid move. Square already marked.');
  };
};

function showMessage(msg, game) {
  const msgContainer = document.querySelector('.msgContainer');
  const message = {
    0: `${game.currentPlayer.name} won!`,
    1: "Round hasn't started yet.",
    2: `It is ${game.currentPlayer.name}'s turn`,
    3: "It's a tie!"
  };
  
    msgContainer.textContent = message[msg];
}


export { showMessage };

 
