/*
need a blank boarad to print
something saying "player 1 what is your move?"
update with that move
*/
const prompt = require('prompt');

prompt.start();

const newBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const checkForWin = board => {
  return checkDiag(board) || checkHoriz(board) || checkVert(board);
};

const checkHoriz = board => {
  let win = false;
  for (row of board) {
    if (row[0]) {
      if (row[0] === row[1] && row[1] === row[2]) {
        win = true;
      }
    }
  }
  return win;
};

const checkVert = board => {
  let win = false;
  for (let i = 0; i < board.length; i++) {
    if (board[0][i]) {
      if (board[0][i] === board[1][i] && board[2][i] === board[1][i]) {
        win = true;
      }
    }
  }

  return win;
};

const checkDiag = board => {
  if (board[1][1]) {
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2])
    || (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
      return true;
    }
  }

  return false;
};



// move('player 1');
const createBoard = board => {
  const newBoard = [];
  for (let i = 0; i < board.length; i++) {
    let row = board[i].map(val => {
      if (val === null) {
        return ' ';
      }
      return val;
    });
    newBoard.push(row.join('|'));
    if (i < 2) {
      newBoard.push(['-----']);
    }
  }
  return newBoard.join('\n');
};

const takeMove = num => {
  const newNum = num - 1;
  const row = Math.floor(newNum / 3);
  const coordinates = [row, newNum % 3];
  return coordinates;
};

const move = (player) => {
  console.log('It\s your turn player ' + player);
  prompt.get(['position'], function (err, result) {
    const move = result.position;
    return move;
  });
};

const game = (num = 0) => {
  let gameBoard = newBoard;
  let displayBoard = createBoard(gameBoard);
  let counter = num;
  let player, marker;
  let gameOver = false;
  if (counter === 0) {
    player = 'player 1';
    marker = 'X';
  } else {
    player = 'player 2';
    marker = 'O';
  }

  if (counter === 0) {
    console.log('It\s your turn player ' + player);
    prompt.get(['position'], (err, result) => {
      const move = result.position;
      // return move;
      const coordinates = takeMove(move);
      gameBoard[coordinates[0]][coordinates[1]] = marker;
      counter = Math.abs(counter - 1);
      console.log(counter);
      console.log(createBoard(gameBoard));
      gameOver = checkForWin(gameBoard);
      if (!gameOver) {
        game(counter);
      }
      if (gameOver) {
        console.log('over');
      }
    });
  }
  if (counter === 1) {
    console.log('It\s your turn player ' + player);
    prompt.get(['position'], (err, result) => {
      const move = result.position;
      // return move;
      const coordinates = takeMove(move);
      gameBoard[coordinates[0]][coordinates[1]] = marker;
      counter = Math.abs(counter - 1);
      console.log(createBoard(gameBoard));
      if (!gameOver) {
        game(counter);
      }
      if (gameOver) {
        console.log('over');
      }
    });

  }

};

game();