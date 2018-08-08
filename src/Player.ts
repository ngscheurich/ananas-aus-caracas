import * as ROT from "rot-js";
import Actor, { IActor } from "./Actor";
import Game from "./Game";

interface IKeyMap {
  [index: number]: number;
}

class Player extends Actor implements IActor {
  private keyMap: IKeyMap;

  constructor(game: Game) {
    super(game);
    this.keyMap = {};
    this.keyMap[38] = 0;
    this.keyMap[33] = 1;
    this.keyMap[39] = 2;
    this.keyMap[34] = 3;
    this.keyMap[40] = 4;
    this.keyMap[35] = 5;
    this.keyMap[37] = 6;
    this.keyMap[36] = 7;
    this.keyMap[13] = 8;
    this.keyMap[32] = 9;
  }

  public act() {
    this.game.engine.lock();
    window.addEventListener("keydown", this);
  }

  public draw() {
    this.game.display.draw(this.x, this.y, "@", "#ff0");
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public handleEvent(e: KeyboardEvent) {
    const code = e.keyCode;

    if (!(code in this.keyMap)) {
      return;
    }

    if (code === 13 || code === 32) {
      this.checkBox();
      return;
    }

    const diff = ROT.DIRS[8][this.keyMap[code]];
    const newX = this.x + diff[0];
    const newY = this.y + diff[1];

    const newKey = `${newX},${newY}`;
    if (!(newKey in this.game.map.cells)) {
      return;
    }

    this.game.display.draw(
      this.x,
      this.y,
      this.game.map.cells[`${this.x},${this.y}`]
    );
    this.x = newX;
    this.y = newY;
    this.game.map.pedro = `${this.x},${this.y}`;
    window.removeEventListener("keydown", this);
    this.draw();
    this.game.engine.unlock();
  }

  private checkBox() {
    const key = `${this.x},${this.y}`;
    if (this.game.map.cells[key] !== "*") {
      this.game.writeToLog("There is no box here…");
    } else if (key === this.game.ananas) {
      this.game.writeToLog("🍍 Hooray! You found an ananas and won the game.");
      this.game.engine.lock();
    } else {
      this.game.writeToLog("This box is empty. Bummer.");
      this.game.map.cells[key] = "o";
    }
  }
}

export default Player;
