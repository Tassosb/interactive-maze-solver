# Interactive Maze Solver
Build mazes and watch the app solve them.

[Live Link](http://tassosbareiss.com/interactive-maze-solver/, "Live Link")

## Libraries Used
- React
- Webpack
- Babel

## Maze Solving
The `MazeSolver` class constructs a path tree out of `Node` objects, which refer to positions in the maze. The tree is built using a breadth-first-search algorithm to ensure it finds the shortest path. Once the tree is built, the solver traces the path from the end position back to the start and returns the nodes on that path in an array.

## Separation of Concerns
The React components are designed to know nothing about the maze solving logic. A plain old Javascript `Maze` class holds all the information about the maze, and a plain `Tile` class holds all the information about its respective tile. The `Solver` React component holds an instance of the `Maze` class, which is passed to the `MazeComponent` as props. This `Maze` instance acts as a centralized source of truth for the app. It offers a simple, declarative API for changing the maze state, which causes the subscribed React components to re-render.
