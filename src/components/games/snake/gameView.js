import GameModel from './gameModel.js';

class GameView {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById('canvas');
        this.boxSize = 20;
        this.canvas.width = game.grid.width * this.boxSize;
        this.canvas.height = game.grid.height * this.boxSize;
        this.canvas.style.backgroundColor = 'rgb(255, 237, 185)';

        this.ctx = this.canvas.getContext('2d');
        this.previousTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
        this.frameRequestId = null;
        this.startGameLoop();
    }

    _drawBox(x, y, color) {
        const canvasX = x * this.boxSize;
        const canvasY = y * this.boxSize;

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(canvasX, canvasY, this.boxSize, this.boxSize);
        this.ctx.closePath();
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

        if (this.game.state === GameModel.STATE.OVER) {
            this.drawGameOver(this.game);
            this.stopGameLoop();
        } else if (this.game.state === GameModel.STATE.STOPPED) {
            this.draw();
        } else {
            this.frameRequestId = requestAnimationFrame(this.gameLoop);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSnake(this.game.snake);
        this.drawBox(this.game.box);
        this.drawScore(this.game.score);
    }

    drawBox(box) {
        this._drawBox(box.x, box.y, 'blue');
    }

    drawSnake(snake) {
        snake.body.forEach((box, ind) => {
            const color = ind === 0 ? 'red' : 'pink';
            this._drawBox(box.x, box.y, color);
        });
    }

    drawScore(score) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'blue';
        this.ctx.font = '18px Arial';
        this.ctx.fillText(`Score: ${score}`, 10, 22);
        this.ctx.closePath();
    }

    drawGameOver(game) {
        const text = game.isWin ? 'YOU WIN' : 'GAME OVER';
        const fontSize = 50; // Размер шрифта
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
