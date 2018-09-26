export class Mower {

  compass = ['N', 'E', 'S', 'W']; // Every mower needs a compass to keep itself oriented properly.

  constructor(line, lawnOutboundX, lawnOutboundY) {
    const sLine = line.split(' ');
    [this.x, this.y, this.direction] = [parseInt(sLine[0], 10), parseInt(sLine[1], 10), sLine[2]];
    this.lawnOutboundX = lawnOutboundX;
    this.lawnOutboundY = lawnOutboundY;
  }

  /**
   * The Mower entry point, detects if the mower have to move or rotate.
   * @param  {sring} actions The mower actions (movement and rotation) string.
   * @return {array}         The mower coordinates and its direction.
   */
  go = (actions) => {
    actions.split('').map(a => {
      a === 'F' ? this.moveForward() : this.rotate(a)
    });
    return [this.x, this.y, this.direction];
  }

  /**
   * Handles the mower rotation, it uses the compass array to set the new mower direction.
   * @param  {char} dir A direction character can be 'L' or 'R'.
   */
  rotate = (dir) => {
    const dirIndex = this.compass.indexOf(this.direction);
    if (dir === 'R') {
      // Right direction is straightforward just increment the array index
      const newDir = (dirIndex + 1) % this.compass.length;
      this.direction = this.compass[newDir];
    } else {
      let leftDir = (dirIndex - 1) % this.compass.length;
      // Left direction is a bit more complicated if the value is negative
      // add the array length to fix the rotation.
      if (leftDir < 0) {
        leftDir += this.compass.length;
      }
      this.direction = this.compass[leftDir];
    }
  }

  /**
   * Handles the mower movement
   */
  moveForward = () => {
    // Handle map limits
    if (
      (this.x === this.lawnOutboundX && this.direction === 'E') ||
      (this.y === this.lawnOutboundY && this.direction === 'N') ||
      (this.x === 0 && this.direction === 'W') ||
      (this.y === 0 && this.direction === 'S')
    ) {
      return;
    }
    switch (this.direction) {
      case 'N':
        this.y++;
        break;
      case 'S':
        this.y--;
        break;
      case 'E':
        this.x++;
        break;
      case 'W':
        this.x--;
        break;
    }
  }
}