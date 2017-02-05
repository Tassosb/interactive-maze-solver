import Solver from './components/solver';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById('main');
  ReactDOM.render(<Solver />, rootEl);
});

//reactDom render mazeSolver component here
