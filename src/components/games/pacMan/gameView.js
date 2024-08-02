import Game from './models/game.js';

class GameView {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById('canvas');
        this.canvas.width = game.grid.width;
        this.canvas.height = game.grid.height;
        this.canvas.style.backgroundColor = 'rgb(92, 92, 92)';
        this.cellSize = game.grid.cellSize;

        this.ctx = this.canvas.getContext('2d');

        this.draw(game);

        this.lastFrameTime = 0;
        this.frameInterval = 10;
        this.gameSpeed = Game.SPEED.NORMAL;
    }

    startGameLoop() {
        this.frameRequestId = requestAnimationFrame(this.gameLoop);
    }

    stopGameLoop() {
        if (this.frameRequestId) {
            cancelAnimationFrame(this.frameRequestId);
            this.frameRequestId = null;
        }
    }

    gameLoop(timestamp) {
        if (this.previousTime === 0) {
            this.previousTime = timestamp;
        }
        const elapsedTime = timestamp - this.previousTime;

        if (elapsedTime > this.game.snake.stepTime) {
            this.previousTime = timestamp;
            this.game.update();
            this.draw();
        }

        if (this.game.state === Game.STATE.IS_OVER) {
            this.drawGameOver(this.game);
            this.stopGameLoop();
        } else if (this.game.state === Game.STATE.IS_STOPPED) {
            this.draw();
        } else {
            this.frameRequestId = requestAnimationFrame(this.gameLoop);
        }
    }

    _drawPoint(x, y, size, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    _drawRect(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
        this.ctx.closePath();
    }

    draw(game) {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastFrameTime;

        if (deltaTime > this.frameInterval) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = this.gameSpeed; i > 0; i--) {
                this.game.update();
            }
            this.drawField(this.game.field);
            this.drawScore(this.game.score);
            this.drawPacMan(this.game.pacMan);
            this.drawLives(this.game.lives);

            this.game.ghosts.forEach((ghost) => {
                this.drawGhost(ghost);
            });

            if (this.game.state === Game.STATE.IS_OVER) {
                this.drawGameOver(this.game);
            }

            this.lastFrameTime = currentTime;
        }
        window.requestAnimationFrame(this.draw.bind(this, game));
    }

    drawField(field) {
        field.forEach((row) => {
            row.forEach((cell) => {
                if (cell.type === Game.CELL_TYPE.WALL) {
                    this._drawRect(cell.x, cell.y, this.cellSize, this.cellSize, 'black');
                }
                if (cell.type === Game.CELL_TYPE.LITTLE_DOT) {
                    this._drawPoint(cell.x, cell.y, 3, 'orange');
                } else if (cell.type === Game.CELL_TYPE.BIG_DOT) {
                    this._drawPoint(cell.x, cell.y, 6, 'orange');
                } else if (cell.type === Game.CELL_TYPE.GHOST_HOME_DOOR) {
                    this._drawRect(cell.x, cell.y, this.cellSize, 3, 'grey');
                }
            });
        });
    }

    drawScore(score) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'orange';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${score}`, 20, 40);
        this.ctx.closePath();
    }

    drawPacMan(pacMan) {
        this._drawPoint(pacMan.x, pacMan.y, 10, 'yellow');
    }

    drawGhost(ghost) {
        let color;
        if (ghost.state === Game.GHOST_STATE.IS_FRIGHTENED) {
            if (ghost.isBlinking) {
                if (Math.floor(Date.now() / 100) % 2 === 0) {
                    color = ghost.type;
                } else {
                    color = 'blue';
                }
            } else {
                color = 'blue';
            }
        } else if (ghost.state === Game.GHOST_STATE.IS_GOING_TO_RESPAWN) {
            color = 'white';
        } else {
            color = ghost.type;
        }
        this._drawPoint(ghost.x, ghost.y, 10, color);
    }

    drawLives(lives) {
        const y = 30;
        const x = this.canvas.width - 10;
        const pudding = 2;

        for (let i = lives; i > 0; i--) {
            this._drawPoint(x - (10 + pudding) * 2 * i, y, 10, 'yellow');
        }
    }

    drawGameOver(game) {
        const text = game.isWin ? 'YOU WIN' : 'GAME OVER';
        const fontSize = 70; // Размер шрифта
        this.ctx.font = `${fontSize}px Arial`; // Установка шрифта

        // Измеряем ширину текста, учитывая текущий шрифт
        const textMetrics = this.ctx.measureText(text);
        const textWidth = textMetrics.width;

        // Вычисляем координаты x и y для центрирования текста
        const x = (this.canvas.width - textWidth) / 2;
        const y = this.canvas.height / 2;

        // Рисуем полупрозрачный фон
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Черный цвет с прозрачностью 50%
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Очищаем холст и рисуем текст
        this.ctx.fillStyle = 'lightgrey';
        this.ctx.fillText(text, x, y);
    }
}

export default GameView;
