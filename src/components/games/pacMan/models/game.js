import Grid from './grid.js';
import MovingCharacter from './movingCharacter.js';
import PacMan from './pacMan.js';
import Ghost from './ghost.js';

class Game {
    constructor() {
        this.setInitParams();
    }

    setInitParams() {
        this.movingCharacter = new MovingCharacter(this);
        this.grid = new Grid(this);
        this.field = this.grid.map;
        this.pacMan = new PacMan(this);
        this.ghostsStore = {
            [Game.GHOST_TYPE.RED]: new Ghost(this, Game.GHOST_TYPE.RED),
            [Game.GHOST_TYPE.PINK]: new Ghost(this, Game.GHOST_TYPE.PINK),
            [Game.GHOST_TYPE.BLUE]: new Ghost(this, Game.GHOST_TYPE.BLUE),
            [Game.GHOST_TYPE.ORANGE]: new Ghost(this, Game.GHOST_TYPE.ORANGE),
        };
        this.ghosts = Object.values(this.ghostsStore);
        this.state = Game.STATE.IS_STOPPED;
        this.startTime = Date.now();
        this.score = 0;
        this.isWin = false;
        this.lives = Game.LIVES_AMOUNT;
        this.isPacManStep = true;
    }

    start() {
        this.setInitParams();
        setTimeout(() => {
            this.startTime = Date.now();
            this.state = Game.STATE.IS_RUNNING;
        }, 500);
    }

    setPause() {
        if (this.state === Game.STATE.IS_OVER) return;
        this.state = Game.STATE.IS_STOPPED;
    }

    continue() {
        if (this.state === Game.STATE.IS_OVER) return;
        this.state = Game.STATE.IS_RUNNING;
    }

    update() {
        if (this.state === Game.STATE.IS_STOPPED || this.state === Game.STATE.IS_OVER) {
            return;
        }

        if (this.isPacManStep) {
            this.isPacManStep = !this.isPacManStep;
            this.pacMan.update();
            this.checkAndHandleDotCollision();
        } else {
            this.isPacManStep = !this.isPacManStep;
            this.ghosts.forEach((ghost) => ghost.update());
        }

        for (let i = 0; i < this.ghosts.length; i++) {
            const ghost = this.ghosts[i];

            const pacManCell = this.grid.getCellByCoords(this.pacMan.x, this.pacMan.y);
            const ghostCell = this.grid.getCellByCoords(ghost.x, ghost.y);

            if (
                pacManCell === ghostCell &&
                ghost.state !== Game.GHOST_STATE.IS_GOING_TO_RESPAWN
            ) {
                if (ghost.state === Game.GHOST_STATE.IS_FRIGHTENED) {
                    ghost.goToRespawn();
                } else {
                    this.handleLivesDecrement();
                    return;
                }
            }
        }
    }

    handleLivesDecrement() {
        if (this.lives > 1) {
            this.state = Game.STATE.IS_STOPPED;
            setTimeout(() => {
                this.lives--;
                this.ghosts.forEach((ghost) => ghost.setInitParams());
                this.pacMan.setInitParams();
                setTimeout(() => {
                    this.state = Game.STATE.IS_RUNNING;
                }, 1000);
            }, 1000);
        } else {
            this.lives--;
            this.state = Game.STATE.IS_OVER;
        }
    }

    checkAndHandleDotCollision() {
        const pacManCell = this.grid.getCellByCoords(this.pacMan.x, this.pacMan.y);
        if (
            pacManCell.type === Game.CELL_TYPE.LITTLE_DOT ||
            pacManCell.type === Game.CELL_TYPE.BIG_DOT
        ) {
            this.score++;
            if (this.score === this.grid.dotsNumber) {
                this.isWin = true;
                this.state = Game.STATE.IS_OVER;
            }
            if (pacManCell.type === Game.CELL_TYPE.BIG_DOT) {
                this.ghosts.forEach((ghost) => {
                    ghost.setFright();
                });
            }
            pacManCell.type = Game.CELL_TYPE.EMPTY;
        }
    }
}

Game.DIRECTION = {
    RIGHT: 'right',
    LEFT: 'left',
    UP: 'up',
    DOWN: 'down',
};

Game.CELL_TYPE = {
    EMPTY: 0,
    WALL: 1,
    LITTLE_DOT: 2,
    BIG_DOT: 3,
    PORTAL: 4,
    GHOST_HOME: 6,
    GHOST_HOME_DOOR: 7,
};

Game.GHOST_TYPE = {
    RED: 'red',
    PINK: 'pink',
    BLUE: 'aqua',
    ORANGE: 'orange',
};

Game.GHOST_STATE = {
    IS_GOING_OUT: 'isGoingOut',
    IS_GOING_TO_RESPAWN: 'isGoingToRespawn',
    IS_FRIGHTENED: 'isFrightened',
    IS_SCATTERING: 'isScattering',
    IS_CHASING: 'isChasing',
};

Game.STATE = {
    IS_STOPPED: 'isStopped',
    IS_RUNNING: 'isRunning',
    IS_OVER: 'isOver',
};

Game.STEP_SIZE = {
    LITTLE: 1,
    NORMAL: 2,
    BIG: 5,
};

Game.SPEED = {
    SLOW: 1,
    NORMAL: 2,
    FAST: 3,
    SUPER_FAST: 4,
};

Game.LIVES_AMOUNT = 3;

export default Game;
