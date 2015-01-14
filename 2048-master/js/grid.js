/**
 * Class: Grid
 *   Model of the game board state.
 *   The Grid is a 2D array of NxN cells.  
 *   Each "cell" is empty (null or it contains a Tile object
 *   The Grid size defines N.
 */

/**
 * Construct a new empty Grid of size x size empty cells
 *   unless previousState Grid is passed in to initialize this Grid
 */
function Grid(size, previousState) {
  this.size = size;
  this.cells = previousState ? this.fromState(previousState) : this.empty();
}

/**
 * Initialize this Grid to be empty
 */
Grid.prototype.empty = function () {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }

  return cells;
};

/**
 * Initialize this Grid as a copy of the "state" Grid
 */
Grid.prototype.fromState = function (state) {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      var tile = state[x][y];
      row.push(tile ? new Tile(tile.position, tile.value) : null);
    }
  }

  return cells;
};

/**
 * Find and return a random empty cell position (x,y) in this Grid
 */ 
Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

/**
 * Find and return an array of ALL empty cell positions (x,y) in this Grid
 */ 
Grid.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};

/**
 * Perform an operation (i.e., call the "callback" Function) on EVERY cell in this Grid
 * @param callback(x, y, Tile || null) - the function to call for each grid cell
 */
Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};

/**
 * Are there any empty cells in this Grid?
 */
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};

/*
 * Is the given cell position (x,y) empty?
 */
Grid.prototype.cellAvailable = function (cell) {
  return !this.cellOccupied(cell);
};

/*
 * Does the given cell position (x,y) contain a Tile?
 */
Grid.prototype.cellOccupied = function (cell) {
  return !!this.cellContent(cell);
};

/**
 * Return the Tile in the given cell position (x,y), or null if it is empty.
 */
Grid.prototype.cellContent = function (cell) {
  if (this.withinBounds(cell)) {
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

/**
 * Insert a Tile on the Grid at the Tile's (x,y) position
 */
Grid.prototype.insertTile = function (tile) {
  this.cells[tile.x][tile.y] = tile;
};

/**
 * Remove a Tile from its (x,y) position on this Grid
 */
Grid.prototype.removeTile = function (tile) {
  this.cells[tile.x][tile.y] = null;
};

/**
 * Is the given position (x,y) a valid cell position on this Grid?
 */
Grid.prototype.withinBounds = function (position) {
  return position.x >= 0 && position.x < this.size &&
         position.y >= 0 && position.y < this.size;
};

/**
 * Serialize this Grid for storage (return grid state as a JSON data object)
 */
Grid.prototype.serialize = function () {
  var cellState = [];

  for (var x = 0; x < this.size; x++) {
    var row = cellState[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
    }
  }

  return {
    size: this.size,
    cells: cellState
  };
};
