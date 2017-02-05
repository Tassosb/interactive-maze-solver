import React from 'react';
import TileComponent from './tile';

export default class MazeComponent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const mazeRows = this.props.maze.grid.map((row, rowIdx) => {
      const tiles = row.map((tile, tileIdx) => (
        <TileComponent key={ tileIdx } tile={ tile } updateSolver={ this.props.updateSolver } path={ this.props.path }/>
      ));

      return (
        <ul className="maze-row" key={rowIdx}>
          { tiles }
        </ul>
      );
    });

    return (
      <div className="maze">
        { mazeRows }
      </div>
    );
  }
}
