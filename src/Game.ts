import * as ROT from "rot-js";
import Log from "./Log";
import Pedro from "./Pedro";
import Player from "./Player";

interface IMap {
  cells: { [index: string]: string };
  player: string;
  pedro: string;
}

class Game {
  public display: ROT.Display;
  public log: Log;
  public engine: ROT.Engine;
  public map: IMap;
  public ananas: string;
  public freeCells: string[];
  public player: Player;
  public pedro: Pedro;

  constructor() {
    this.display = new ROT.Display();
    this.log = new Log();
    this.map = {
      cells: {},
      player: "",
      pedro: "",
    };
    this.freeCells = [];

    this.generateMap();

    this.player = new Player(this);
    this.player.draw();

    this.pedro = new Pedro(this);
    this.pedro.draw();

    const scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this.player, true);
    scheduler.add(this.pedro, true);
    this.engine = new ROT.Engine(scheduler);
    this.engine.start();

    document.body.appendChild(this.display.getContainer());
  }

  public writeToLog(msg: string) {
    this.log.write(msg);
  }

  private generateMap() {
    const digger = new ROT.Map.Digger();
    const digCallback: ROT.DigCallback = this.digCallback();

    digger.create(digCallback.bind(this));
    this.generateBoxes();
    this.drawMap();
  }

  private digCallback(): ROT.DigCallback {
    return function(x: number, y: number, cellValue: number) {
      if (cellValue === 1) {
        return;
      }

      const key = `${x},${y}`;
      this.map.cells[key] = ".";
      this.freeCells = [...this.freeCells, key];
    };
  }

  private generateBoxes() {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(ROT.RNG.getUniform() * this.freeCells.length);
      const key = this.freeCells.splice(index, 1)[0];
      this.map.cells[key] = "*";
      if (i === 0) {
        this.ananas = key;
      }
    }
  }

  private drawMap() {
    for (const key in this.map.cells) {
      if (this.map.cells.hasOwnProperty(key)) {
        const parts = key.split(",");
        const x = parseInt(parts[0], 10);
        const y = parseInt(parts[1], 10);
        this.display.draw(x, y, this.map.cells[key]);
      }
    }
  }
}

export default Game;
