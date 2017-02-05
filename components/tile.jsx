import React from 'react';

export default class MazeComponent extends React.Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.updateSolver(this.props.tile);
  }

  render () {
    let klass = 'tile';

    if (this.props.tile.startTile) {
      klass += ' start';
    } else if (this.props.tile.endTile) {
      klass += ' end';
    } else if (this.props.tile.blocking) {
      klass += ' blocking';
    } else if (this.props.tile.onPath(this.props.path)) {
      klass += ' on-path';
    }

    return (
      <li onClick={ this.handleClick } className={ klass }></li>
    );
  }

}
