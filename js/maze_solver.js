import Maze from './maze';
import MazeNode from './maze_node';
import { Util } from './util';

export default class MazeSolver {
  constructor () {
    this.maze = new Maze(MazeSolver.SIZE);
    this.startPos = [0, 0];
    this.visitedPos = [this.startPos];

    this.buildPathTree();
  }

  findPath (endPos) {
    let endNode = this.rootNode.dfs(endPos);

    return this.tracePathBack(endNode).reverse().map((node) => (node.value));
  }

  tracePathBack (endNode) {
    let nodes = [];

    let currentNode = endNode;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.parent;
    }

    return nodes;
  }

  buildPathTree () {
    this.rootNode = new MazeNode(this.startPos);

    let nodes = [this.rootNode];
    while (nodes.length > 0) {
      let currentNode = nodes.shift();
      let currentPos = currentNode.value;

      let nextPositions = this.newMovePositions(currentPos);
      for (let i = 0; i < nextPositions.length; i++) {
        let nextPos = nextPositions[i];
        let nextNode = new MazeNode(nextPos);

        currentNode.addChild(nextNode);
        nodes.push(nextNode);
      }
    }
  }

  newMovePositions (pos) {
    let newMoves = this.maze.openMoves(pos).filter((movePos) => (
      !this.hasVisited(movePos)
    ));

    newMoves.forEach((move) => { this.visitedPos.push(move); });

    return newMoves;
  }

  hasVisited(pos) {
    for (var i = 0; i < this.visitedPos.length; i++) {
      if (Util.equalArrays(this.visitedPos[i], pos)) {
        return true;
      }
    }

    return false;
  }
}

MazeSolver.SIZE = 4;
