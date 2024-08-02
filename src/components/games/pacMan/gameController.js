import Game from './models/game.js';

class GameController {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.startButton = document.getElementById('startButton');
        this.stopButton = document.getElementById('pauseButton');
        this.continueButton = document.getElementById('continueButton');
        this.rightButton = document.getElementById('rightButton');
        this.leftButton = document.getElementById('leftButton');
        this.upButton = document.getElementById('upButton');
        this.downButton = document.getElementById('downButton');

        this.keyDownHandler = this.keyDownHandler.bind(this);

        this.startButton.addEventListener('click', () => {
            this.game.start();
        });
        this.continueButton.addEventListener('click', () => {
            this.game.continue();
        });
        this.stopButton.addEventListener('click', () => {
            this.game.setPause();
        });
        this.rightButton.addEventListener('pointerdown', () =>
            this.game.pacMan.setNewDirection(GameController.DIRECTION.RIGHT)
        );
        this.leftButton.addEventListener('pointerdown', () =>
            this.game.pacMan.setNewDirection(GameController.DIRECTION.LEFT)
        );
        this.upButton.addEventListener('pointerdown', () =>
            this.game.pacMan.setNewDirection(GameController.DIRECTION.UP)
        );
        this.downButton.addEventListener('pointerdown', () =>
            this.game.pacMan.setNewDirection(GameController.DIRECTION.DOWN)
        );

        document.addEventListener('keydown', this.keyDownHandler);
    }

    keyDownHandler(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.game.pacMan.setNewDirection(Game.DIRECTION.RIGHT);
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.game.pacMan.setNewDirection(Game.DIRECTION.LEFT);
        } else if (e.key === 'Up' || e.key === 'ArrowUp') {
            this.game.pacMan.setNewDirection(Game.DIRECTION.UP);
        } else if (e.key === 'Down' || e.key === 'ArrowDown') {
            this.game.pacMan.setNewDirection(Game.DIRECTION.DOWN);
        }
    }
}

GameController.DIRECTION = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
};

export default GameController;
