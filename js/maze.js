import Tile from './tile';
import { Util } from './util';

export default class Maze {
  constructor (size) {
    this.endPos = [size - 1, 0];
    this.startPos = [0, size - 1];
    this.grid = Maze.makeGrid(size);
    this.size = size;

    this.getTile(this.startPos).startTile = true;
    this.getTile(this.endPos).endTile = true;
  }

  static makeGrid (size) {
    let grid = [];

    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(new Tile([i, j]));
      }
      grid.push(row);
    }
    return grid;
  }

  openMoves (pos) {
    let openMoves = [];

    Maze.DELTAS.forEach((delta) => {
      const dx = delta[0];
      const dy = delta[1];

      let newPos = [pos[0] + dx, pos[1] + dy];
      if(this.inBounds(newPos) && !this.getTile(newPos).blocking) {
        openMoves.push(newPos);
      }
    });

    return openMoves;
  }

  inBounds(pos) {
    return (
      pos[0] >= 0 &&
      pos[0] < this.size &&
      pos[1] < this.size &&
      pos[1] >= 0
    );
  }

  getTile (pos) {
    const x = pos[0];
    const y = pos[1];
    return this.grid[x][y];
  }
}

Maze.DELTAS = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1]
];
