const Game = require('./game');
const HanoiView = require('./hanoi-view');

$( () => {
  const rootEl = $('.hanoi');
  const game = new Game();
  new HanoiView(game, rootEl);
});
