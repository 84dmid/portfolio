import GameController from './gameController.js';

class GameModel {
    constructor() {
        this.grid = {
            width: 20,
            height: 15,
        };
        this.box = {};
        this.snake = {
            initHead: {
                x: Math.floor(this.grid.width / 2),
                y: Math.floor(this.grid.height / 2),
            },
        };

        this.setInitParams();
    }

    setInitParams() {
        this.state = GameModel.STATE.STOPPED;
        this.score = 0;
        this.isWin = false;
        this.initSnake();
    }

    initSnake() {
        this.snake.body = [
            {
                x: this.snake.initHead.x,
                y: this.snake.initHead.y,
            },
            {
                x: this.snake.initHead.x - 1,
                y: this.snake.initHead.y,
            },
            {
                x: this.snake.initHead.x - 2,
                y: this.snake.initHead.y,
            },
        ];
        this.snake.direction = { x: 1, y: 0 };
        this.snake.newDirection = undefined;
        this.snake.isGrowing = false;
        this.snake.stepSize = 1;
        this.snake.stepTime = 300;
    }

    updateBoxPosition() {
        if (this.snake.body.length === this.grid.height * this.grid.width) return;
        const positionVariants = [];
        for (let x = 0; x < this.grid.width; x++) {
            for (let y = 0; y < this.grid.height; y++) {
                if (this.snake.body.some((box) => box.x === x && box.y === y)) continue;
                positionVariants.push({ x, y });
            }
        }
        this.box = positionVariants[Math.floor(positionVariants.length * Math.random())];
    }

    startAndRestart() {
        this.setInitParams();
        this.updateBoxPosition();
        this.state = GameModel.STATE.RUNNING;
    }

    setPause() {
        if (this.state === GameModel.STATE.OVER) return;
        this.state = GameModel.STATE.STOPPED;
    }

    continue() {
        if (this.state === GameModel.STATE.OVER) return;
        this.state = GameModel.STATE.RUNNING;
    }

    getNextSnakeHedPosition() {
        const snakeHead = this.snake.body[0];
        const x = snakeHead.x + this.snake.direction.x * this.snake.stepSize;
        const y = snakeHead.y + this.snake.direction.y * this.snake.stepSize;
        return { x, y };
    }

    updateSnakePosition(newHeadPosition) {
        const { x, y } = newHeadPosition;
        this.snake.body.unshift({ x, y });

        if (this.snake.isGrowing) {
            this.snake.isGrowing = false;
            return;
        }
        this.snake.body.pop();
    }

    setNewDirection(direction) {
        const newDirection = { x: 0, y: 0 };
        switch (direction) {
            case GameController.DIRECTION.RIGHT:
                newDirection.x = 1;
                break;
            case GameController.DIRECTION.LEFT:
                newDirection.x = -1;
                break;
            case GameController.DIRECTION.UP:
                newDirection.y = -1;
                break;
            case GameController.DIRECTION.DOWN:
                newDirection.y = 1;
                break;
            default:
                return;
        }
        this.snake.newDirection = newDirection;
    }

    updateSnakeDirection() {
        if (
            !this.snake.newDirection ||
            this.isDirectionOpposite(this.snake.newDirection)
        ) {
            return;
        }
        this.snake.direction = this.snake.newDirection;
        this.snake.newDirection = undefined;
    }

    isDirectionOpposite(direction) {
        return (
            this.snake.direction.x === -direction.x ||
            this.snake.direction.y === -direction.y
        );
    }

    update() {
        if (
            this.state === GameModel.STATE.STOPPED ||
            this.state === GameModel.STATE.OVER
        ) {
            return;
        }

        this.updateSnakeDirection();

        const newHeadPosition = this.getNextSnakeHedPosition();
        if (
            this.isWallCollision(newHeadPosition) ||
            this.isHimselfCollision(newHeadPosition)
        ) {
            this.state = GameModel.STATE.OVER;
            return;
        }
        this.updateSnakePosition(newHeadPosition);
        if (this.isBoxCollision(newHeadPosition)) {
            this.snake.isGrowing = true;
            this.score++;
            this.updateBoxPosition();
        }
    }

    isWallCollision(position) {
        const { x, y } = position;
        return x < 0 || x >= this.grid.width || y < 0 || y >= this.grid.height;
    }

    isHimselfCollision(position) {
        const { x, y } = position;
        return this.snake.body.some((box) => box.x === x && box.y === y);
    }

    isBoxCollision(position) {
        const { x, y } = position;
        return x === this.box.x && y === this.box.y;
    }
}

export default GameModel;

GameModel.STATE = {
    RUNNING: 'isRunning',
    STOPPED: 'isStopped',
    OVER: 'isOver',
};
