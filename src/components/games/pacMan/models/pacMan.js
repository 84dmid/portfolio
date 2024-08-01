import GameController from '../gameController.js';

import MovingCharacter from './movingCharacter.js';

class PacMan extends MovingCharacter {
    constructor(game) {
        super();
        this.game = game;
        this.stepSize = 2;

        this.setInitParams();
    }

    setInitParams() {
        var grid = this.game.grid;
        this.x = grid.width / 2;
        this.y = 26 * grid.cellSize + grid.cellSize / 2;
        this.direction = { x: 1, y: 0 };
    }

    setNewDirection(direction) {
        this.newDirection = { x: 0, y: 0 };
        switch (direction) {
            case GameController.DIRECTION.RIGHT:
                this.newDirection.x = 1;
                break;
            case GameController.DIRECTION.LEFT:
                this.newDirection.x = -1;
                break;
            case GameController.DIRECTION.DOWN:
                this.newDirection.y = 1;
                break;
            case GameController.DIRECTION.UP:
                this.newDirection.y = -1;
                break;
            default:
                break;
        }
        if (this.isDirectionsOpposite(this.newDirection)) {
            this.updateDirection();
        }
    }

    update() {
        if (this.isInCenterCell()) {
            this.checkAndHandlePortalCollision();
            this.updateDirection();
            if (!this.game.grid.checkDirection(this.x, this.y, this.direction)) {
                return;
            }
        }
        this.move();
    }

    updateDirection() {
        if (
            this.newDirection &&
            this.game.grid.checkDirection(this.x, this.y, this.newDirection)
        ) {
            this.direction = this.newDirection;
            this.newDirection = undefined;
        }
    }
}

export default PacMan;
