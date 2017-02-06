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
      maze: this.state.maze,
      numBlockingTiles: this.state.numBlockingTiles + 1
    });
  }

  runSolver() {
    const mazeSolver = new MazeSolver(this.state.maze);
    const path = mazeSolver.findPath(this.state.maze.endPos);

    const solvable = (path.length > 0);

    this.setState({
      path,
      solvable,
      solved: true
    });

    if (solvable) { setInterval(this.step, 100); }
  }

  step () {
    if (this.state.stepIdx === this.state.path.length) { return; }
    this.setState({ stepIdx: this.state.stepIdx + 1 })
  }

  resetSolver () {
    this.setState({
      maze: new Maze(Solver.SIZE),
      path: [],
      numBlockingTiles: 0 ,
      stepIdx: 0,
      solved: false,
      solvable: true
    });
  }

  render () {
    let numSteps = '';

    if (this.state.solved) {
      numSteps = this.state.solvable ? this.state.stepIdx : 'Oops, cannot solve this one.';
    }

    return (
      <div className="solver">
        <MazeComponent
          maze={ this.state.maze }
          updateSolver={ this.updateSolver }
          path={ this.state.path.slice(0, this.state.stepIdx) }/>

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
