/**
 * Class: Tile
 *   Model for a single Tile in the game.
 *   A Tile has a (x,y) position and a string value
 */

/*
 * Construct a new Tile at given position with the given value
 */
function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

/**
 * Set this Tile's "previousPostion" to be the current position
 */
Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

/**
 * Move this Tile's "position" to the give position (x,y)
 */
Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

/**
 * Serialize this Tile for storage (return grid state as a JSON data object)
 */
Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};
