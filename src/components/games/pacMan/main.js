import GameModel from './models/game.js';
import GameView from './gameView.js';
import GameController from './gameController.js';

export const initGame = () => {
    const game = new GameModel();
    const view = new GameView(game);
    const controller = new GameController(game, view);

    return controller.exitGameHandler;
};
