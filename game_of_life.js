// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by over-population.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

// 1 => Populated
// 2 => Unpopulated

function displayInConsole(mat, width, height) {
  for (var i = 0; i < width; i++) {
    let line = "";
    for (var j = 0; j < width; j++) {
      line += mat[i][j];
    }
    console.log(line);
  }
}

function neighbours(centerX, centerY, xRange, yRange) {
  var startX = centerX - 1;
  var startY = centerY - 1;
  var endX = centerX + 1;
  var endY = centerY + 1;
  var neighbours = [];
  if (centerX == 0) {
    startX = centerX;
  }
  if (centerY == 0) {
    startY = centerY;
  }
  if (centerX == xRange - 1) {
    endX = centerX;
  }
  if (centerY == yRange - 1) {
    endY = centerY;
  }
  for (var i = startX; i <= endX; i++) {
    for (var j = startY; j <= endY; j++) {
      if (!(i == centerX && j == centerY)) {
        neighbours.push([i, j]);
      }
    }
  }
  return neighbours;
}

function toNextGeneration(currentGeneration, xRange, yRange) {
  let nextGeneration = [];

  for (var i = 0; i < xRange; i++) {
    nextGeneration.push([]);
    for (var j = 0; j < yRange; j++) {
      let neighbourIdx = neighbours(i, j, xRange, yRange);
      let liveCount = 0;

      for (var k = 0; k < neighbourIdx.length; k++) {
        let [nX, nY] = neighbourIdx[k];
        if (currentGeneration[nX][nY]) {
          liveCount += 1;
        }
      }
      nextGeneration[i][j] = currentGeneration[i][j];

      if (currentGeneration[i][j]) {
        // Alive
        if (liveCount > 3 || liveCount < 2) {
          nextGeneration[i][j] = 0;
        } else {
          nextGeneration[i][j] = 1;
        }
      } else {
        // Dead
        if (liveCount == 3) {
          nextGeneration[i][j] = 1;
        }
      }
    }
  }

  return nextGeneration;
}

const ALIVE_CLASS = 'alive';

function convertToTable(table, game) {
  for (var i = 0, row; row = table.rows[i]; i++) {
    for (var j = 0, col; col = row.cells[j]; j++) {
      if (game[i][j]) {
        col.classList.add(ALIVE_CLASS);
      } else {
        col.classList.remove(ALIVE_CLASS);
      }
    }
  }
}

let game = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let height = game.length;
let width = game[0].length;
let table = document.getElementById('game');
let tickTime = 300; //ms
function tick() {
  convertToTable(table, game);
  game = toNextGeneration(game, height, width);
  setTimeout(tick, tickTime); // Enqueue another call after some time.
}
tick();
