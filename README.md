# 🍍 Ananas aus Caracas

A simple roguelike based on the [RogueBasin Rot.js tutorial](http://www.roguebasin.com/index.php?title=Rot.js_tutorial).

## Table of contents

- [TODO](#todo)
- [Development](#development)
- [Production](#production)
- [Licenses](#licenses)

## TODO

- [x] Player can crash the game by moving onto Pedro's cell. Not only this is currently allowed, but it also disrupts Pedro's pathfinding (which expects the path to be at least two cells long).
- [x] The Game.map structure should probably store positions of beings (player, Pedro) as well.
- [ ] It would be comfortable for users to increase the set of allowed navigation keys (number keys, vi keys).
- [ ] When a box is inspected, its appearance may change (to make it easier for player to distinguish between visited and unvisited boxes).

## Development

To spin up the dev server, just:

    $ yarn start

You should now have a web server listening—and serving your game—at http://localhost:8080. Cool.

## Production

Ready to distribute your game to the ravenous masses?

    $ yarn build

This will make a production-ready version of your project in a directory called `dist`; toss it up on the Internet somewhere. [Netlify](https://www.netlify.com/) might be a good choice.

## Licenses

This project is [MIT © Nicholas Scheurich](https://github.com/ngscheurich/web-starter/blob/master/LICENSE).
