import * as ROT from "rot-js";
import Game from "./Game";

export interface IActor {
  act(): void;
  draw(): void;
}

export default class Actor {
  protected game: Game;
  protected x: number;
  protected y: number;

  constructor(game: Game) {
    this.game = game;
    const freeCells = this.game.freeCells;

    const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    const key = freeCells.splice(index, 1)[0];
    const parts = key.split(",");
    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);
    this.x = x;
    this.y = y;
  }
}
