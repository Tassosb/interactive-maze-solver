import React from 'react';
import Maze from '../js/maze';
import MazeComponent from './maze';
import MazeSolver from '../js/maze_solver';

export default class Solver extends React.Component {
  constructor(props) {
    super(props);

    this.maze = new Maze(Solver.SIZE);
    // maze: maze,
    this.state = {
      path: [],
      numBlockingTiles: 0,
      stepIdx: 0,
      solvable: true,
      solved: false
    };

    this.updateSolver = this.updateSolver.bind(this);
    this.runSolver = this.runSolver.bind(this);
    this.resetSolver = this.resetSolver.bind(this);
    this.step = this.step.bind(this);
  }

  updateSolver (tile) {
    if (tile.blocking || tile.startTile || tile.endTile) { return; }

    tile.blocking = true;

    this.setState({
      numBlockingTiles: this.state.numBlockingTiles + 1
    });
  }

  runSolver() {
    const mazeSolver = new MazeSolver(this.maze);
    const path = mazeSolver.findPath(this.maze.endPos);

    const solvable = (path.length > 0);

    this.setState({
      path,
      solvable,
      solved: true
    });

    if (solvable) {
      this.interval = setInterval(this.step, 100);
    }
  }

  step () {
    if (this.state.stepIdx === this.state.path.length) {
      clearInterval(this.interval);
      return;
    }

    this.setState({ stepIdx: this.state.stepIdx + 1 })
  }

  resetSolver () {
    this.maze = new Maze(Solver.SIZE);
    this.setState({
      path: [],
      numBlockingTiles: 0 ,
      stepIdx: 0,
      solved: false,
      solvable: true
    });
  }

  render () {
    let numSteps = '';
    let score = '';

    if (this.state.solved) {
      numSteps = this.state.solvable ? this.state.stepIdx : 'Oops, cannot solve this one.';
      score = numSteps > 15 ? Math.round((numSteps - 15) * 100 / this.state.numBlockingTiles) : 0;
    }

    return (
      <div className="solver">
        <MazeComponent
          maze={ this.maze }
          updateSolver={ this.updateSolver }
          path={ this.state.path.slice(0, this.state.stepIdx) }/>

        <div className="stats-bar">
          <span>Steps: <strong>{ numSteps }</strong></span>
          <span>Blocking Tiles: <strong>{ this.state.numBlockingTiles }</strong> </span>
          <span>Score: <strong>{ score }</strong> </span>
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
