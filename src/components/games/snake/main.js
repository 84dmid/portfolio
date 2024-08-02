import GameModel from './gameModel.js';
import GameView from './gameView.js';
import GameController from './gameController.js';

export const initGame = () => {
    let game = new GameModel();
    let view = new GameView(game);
    let controller = new GameController(game, view);

    return controller.exitGameHandler;
};
