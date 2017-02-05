import React from 'react';
import Maze from '../js/maze';
import MazeComponent from './maze';
import MazeSolver from '../js/maze_solver';

export default class Solver extends React.Component {
  constructor(props) {
    super(props);

    const maze = new Maze(Solver.SIZE);
    this.state = {
      maze: maze,
      path: null,
      numBlockingTiles: 0
    };

    this.updateSolver = this.updateSolver.bind(this);
    this.runSolver = this.runSolver.bind(this);
    this.resetSolver = this.resetSolver.bind(this);
  }

  updateSolver (tile) {
    if (tile.blocking || tile.startTile || tile.endTile) { return; }

    tile.blocking = true;
    this.setState({
      maze: this.state.maze,
      numBlockingTiles: this.state.numBlockingTiles + 1
    });
  }

  runSolver() {
    const mazeSolver = new MazeSolver(this.state.maze);
    this.setState({ path: mazeSolver.findPath(this.state.maze.endPos) });
  }

  resetSolver () {
    this.setState({ maze: new Maze(Solver.SIZE), path: null, numBlockingTiles: 0 });
  }

  render () {
    let numSteps = '';

    if (this.state.path) {
      numSteps = this.state.path.length > 0 ? this.state.path.length : 'Oops, cannot solve this one.';
    }

    return (
      <div className="solver">
        <MazeComponent maze={ this.state.maze } updateSolver={ this.updateSolver } path={ this.state.path } />
        <div className="stats-bar">
          <span>Steps: <strong>{ numSteps }</strong></span>
          <span>Blocking Tiles: <strong>{ this.state.numBlockingTiles }</strong> </span>
        </div>
        <div className="button-bar">
          <span onClick={ this.runSolver } className="button run-button">Run Solver</span>
          <span onClick={ this.resetSolver } className="button reset-button">Reset</span>
        </div>
      </div>
    );
  }
}

Solver.SIZE = 8;
