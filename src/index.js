import { Mower } from './mower';
import { readFile } from 'fs';

export class MowerGame {

  inputFileName = 'src/test.txt';
  inputFileEncoding = 'utf-8';
  lawnOutboundX = 0;
  lawnOutboundY = 0;
  mowers = [];

  constructor() {
    readFile(this.inputFileName, this.inputFileEncoding, this.mapFileContent);
  }

  /**
   * Read file callback handler used to map the the file content and start the game
   * @param  err     Error if any or null
   * @param  content The file content
   */
  mapFileContent = (err, content) => {
    if (err) {
      throw Error(err);
    }
    const fileLines = content.split('\n');
    const lawnOutbounds = fileLines.shift().split(' '); // Shift removes the first entry
    [this.lawnOutboundX, this.lawnOutboundY] = lawnOutbounds.map(l => parseInt(l, 10));
    this.initMowers(fileLines);
    this.startGame(fileLines);
  }

  /**
   * Initialize Mower objects with their coordinates and direction.
   * It also passes the lawn limits to the Mower objects for handling outbounds
   * @param  {string[]} lines The mowers related lines from the input file.
   */
  initMowers = (lines) => {
    const mowersInit = lines.filter((_, i) => i % 2 === 0);

    mowersInit.map(m => {
      this.mowers.push(new Mower(m, this.lawnOutboundX, this.lawnOutboundY));
    })
  }

  /**
   * Runs synchronously the mowers movements and outputs the result to the console.
   * @param  {string[]} lines The mowers related lines from the input file.
   */
  startGame = (lines) => {
    const mowersMovement = lines.filter((_, i) => i % 2 !== 0);
    mowersMovement.map((mv, i) => {
      const finalPosition = this.mowers[i].go(mv);
      console.log(finalPosition.join(' '));
    });
  }

}


const mg = new MowerGame();