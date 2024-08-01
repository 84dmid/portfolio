import Game from './game.js';

class MovingCharacter {
    constructor(game) {
        this.game = game;
        this.x = null;
        this.y = null;
        this.direction = null;
        this.stepSize = null;
    }

    isInCenterCell() {
        const cellSize = this.game.grid.cellSize;

        const isXInCenterCell = (this.x - cellSize / 2) % cellSize === 0;
        const isYInCenterCell = (this.y - cellSize / 2) % cellSize === 0;

        return isXInCenterCell && isYInCenterCell;
    }

    move() {
        this.x = this.x + this.direction.x * this.stepSize;
        this.y = this.y + this.direction.y * this.stepSize;
    }

    checkAndHandlePortalCollision() {
        const cell = this.game.grid.getCellByCoords(this.x, this.y);
        if (cell.type === Game.CELL_TYPE.PORTAL) {
            this.x = cell.exitPortal.x;
            this.y = cell.exitPortal.y;
        }
    }

    isDirectionsOpposite(checkedDirection) {
        return (
            this.direction.x === -checkedDirection.x &&
            this.direction.y === -checkedDirection.y
        );
    }
}

export default MovingCharacter;
