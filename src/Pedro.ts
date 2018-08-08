import * as ROT from "rot-js";
import Actor, { IActor } from "./Actor";
import Game from "./Game";

class Pedro extends Actor implements IActor {
  constructor(game: Game) {
    super(game);
  }

  public act() {
    const toX = this.game.player.getX();
    const toY = this.game.player.getY();

    const passableCallback = (x: number, y: number): boolean => {
      return `${x},${y}` in this.game.map.cells;
    };
    const astar = new ROT.Path.AStar(toX, toY, passableCallback, {
      topology: 4,
    });

    const path: Array<[number, number]> = [];
    const pathCallback = (x: number, y: number) => {
      path.push([x, y]);
    };
    astar.compute(this.x, this.y, pathCallback);

    path.shift();
    if (path.length === 0 || path.length === 1) {
      this.game.engine.lock();
      this.game.writeToLog("👹 Game over—you were captured by Pedro!");
    } else {
      const x = path[0][0];
      const y = path[0][1];
      this.game.display.draw(
        this.x,
        this.y,
        this.game.map.cells[`${this.x},${this.y}`]
      );
      this.x = x;
      this.y = y;
      this.game.map.player = `${this.x},${this.y}`;
      this.draw();
    }
  }

  public draw() {
    this.game.display.draw(this.x, this.y, "P", "red");
  }
}

export default Pedro;
