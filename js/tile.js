import { Util } from './util';

export default class Tile {
  constructor (pos) {
    this.pos = pos;
    this.blocking = false;
    this.startTile = false;
    this.endTile = false;
  }

  onPath (path) {
    if (!path) { return false; }
    
    return Util.includesArray(path, this.pos);
  }
}
