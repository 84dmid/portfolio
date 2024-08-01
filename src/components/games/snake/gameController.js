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

        this.startButton.addEventListener('click', () => this.startAndRestart());
        this.pauseButton.addEventListener('click', () => this.setPause());
        this.continueButton.addEventListener('click', () => this.continue());

        document.addEventListener('keydown', (e) => this.keyDownHandler(e));
        this.rightButton.addEventListener('mousedown', () =>
            this.game.setNewDirection(GameController.DIRECTION.RIGHT)
        );
        this.leftButton.addEventListener('mousedown', () =>
            this.game.setNewDirection(GameController.DIRECTION.LEFT)
        );
        this.upButton.addEventListener('mousedown', () =>
            this.game.setNewDirection(GameController.DIRECTION.UP)
        );
        this.downButton.addEventListener('mousedown', () =>
            this.game.setNewDirection(GameController.DIRECTION.DOWN)
        );
    }

    setPause() {
        this.game.setPause();
        this.view.stopGameLoop();
    }

    continue() {
        this.game.continue();
        this.view.startGameLoop();
    }

    startAndRestart() {
        this.view.stopGameLoop();
        this.game.startAndRestart();
        this.view.startGameLoop();
    }

    keyDownHandler(e) {
        const key = e.key;
        switch (key) {
            case 'Right':
            case 'ArrowRight':
                this.game.setNewDirection(GameController.DIRECTION.RIGHT);
                break;
            case 'Left':
            case 'ArrowLeft':
                this.game.setNewDirection(GameController.DIRECTION.LEFT);
                break;
            case 'Up':
            case 'ArrowUp':
                this.game.setNewDirection(GameController.DIRECTION.UP);
                break;
            case 'Down':
            case 'ArrowDown':
                this.game.setNewDirection(GameController.DIRECTION.DOWN);
                break;
            default:
                break;
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
