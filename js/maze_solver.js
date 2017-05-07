import MazeNode from './maze_node';
import { Util } from './util';

export default class MazeSolver {
  constructor (maze) {
    this.maze = maze;
    this.startPos = this.maze.startPos;
    this.visitedPos = [this.startPos];

    this.buildPathTree();
  }

  findPath (endPos) {
    let endNode = this.rootNode.dfs(endPos);

    return this.tracePathBack(endNode).map((node) => (node.value));
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
    return Util.includesArray(this.visitedPos, pos);
  }
}
