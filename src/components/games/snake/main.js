import GameModel from './gameModel.js';
import GameView from './gameView.js';
import GameController from './gameController.js';

export const initGame = () => {
    const game = new GameModel();
    const view = new GameView(game);
    new GameController(game, view);
};
