import Game from './models/game.js';

class GameController {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        this.startButton = document.getElementById('startButton');
        this.pauseButton = document.getElementById('pauseButton');
        this.continueButton = document.getElementById('continueButton');
        this.rightButton = document.getElementById('rightButton');
        this.leftButton = document.getElementById('leftButton');
        this.upButton = document.getElementById('upButton');
        this.downButton = document.getElementById('downButton');

        this.startAndRestartHandler = this.startAndRestartHandler.bind(this);
        this.pauseHandler = this.pauseHandler.bind(this);
        this.continueHandler = this.continueHandler.bind(this);
        this.rightButtonHandler = this.rightButtonHandler.bind(this);
        this.leftButtonHandler = this.leftButtonHandler.bind(this);
        this.upButtonHandler = this.upButtonHandler.bind(this);
        this.downButtonHandler = this.downButtonHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.exitGameHandler = this.exitGameHandler.bind(this);

        this.startButton.addEventListener('click', this.startAndRestartHandler);
        this.continueButton.addEventListener('click', this.continueHandler);
        this.pauseButton.addEventListener('click', this.pauseHandler);
        this.rightButton.addEventListener('pointerdown', this.rightButtonHandler);
        this.leftButton.addEventListener('pointerdown', this.leftButtonHandler);
        this.upButton.addEventListener('pointerdown', this.upButtonHandler);
        this.downButton.addEventListener('pointerdown', this.downButtonHandler);
        document.addEventListener('keydown', this.keyDownHandler);
    }

    pauseHandler() {
        this.game.setPause();
    }

    continueHandler() {
        this.game.continue();
    }

    startAndRestartHandler() {
        this.game.start();
    }

    rightButtonHandler() {
        this.game.pacMan.setNewDirection(GameController.DIRECTION.RIGHT);
    }
    leftButtonHandler() {
        this.game.pacMan.setNewDirection(GameController.DIRECTION.LEFT);
    }
    upButtonHandler() {
        this.game.pacMan.setNewDirection(GameController.DIRECTION.UP);
    }
    downButtonHandler() {
        this.game.pacMan.setNewDirection(GameController.DIRECTION.DOWN);
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

    exitGameHandler() {
        this.game.setPause();
        this.view.stopGameLoop();

        document.removeEventListener('keydown', this.keyDownHandler);
        this.startButton.removeEventListener('click', this.startAndRestartHandler);
        this.pauseButton.removeEventListener('click', this.pauseHandler);
        this.continueButton.removeEventListener('click', this.continueHandler);
        this.rightButton.removeEventListener('pointerdown', this.rightButtonHandler);
        this.leftButton.removeEventListener('pointerdown', this.leftButtonHandler);
        this.upButton.removeEventListener('pointerdown', this.upButtonHandler);
        this.downButton.removeEventListener('pointerdown', this.downButtonHandler);
    }
}

GameController.DIRECTION = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
};

export default GameController;
