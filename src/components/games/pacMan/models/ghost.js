import Game from './game.js';
import MovingCharacter from './movingCharacter.js';

class Ghost extends MovingCharacter {
    constructor(game, type) {
        super();
        this.game = game;
        this.type = type;

        this.targetForScattering = this.getTargetForScattering();
        this.targetForGoingOut = {
            x: this.game.grid.width / 2,
            y: 14 * this.game.grid.cellSize + this.game.grid.cellSize / 2,
        };
        this.targetForGoingToRespawn = {
            x: this.game.grid.width / 2,
            y: 17 * this.game.grid.cellSize + this.game.grid.cellSize / 2,
        };

        this.setInitParams();
    }

    setInitParams() {
        this.direction = { x: -1, y: 0 };
        this.stepSize = 2;
        this.frightenedTimeout = null;

        const cellSize = this.game.grid.cellSize;
        const gridWidth = this.game.grid.width;
        if (this.type === Game.GHOST_TYPE.RED) {
            const rowInd = 14;
            this.x = gridWidth / 2;
            this.y = rowInd * cellSize + cellSize / 2;
            this.state = Game.GHOST_STATE.IS_SCATTERING;
        } else if (this.type === Game.GHOST_TYPE.PINK) {
            const rowInd = 17;
            this.x = gridWidth / 2 - cellSize;
            this.y = rowInd * cellSize + cellSize / 2;
            this.state = Game.GHOST_STATE.IS_GOING_OUT;
        } else if (this.type === Game.GHOST_TYPE.BLUE) {
            const rowInd = 17;
            this.x = gridWidth / 2;
            this.y = rowInd * cellSize + cellSize / 2;
            this.state = Game.GHOST_STATE.IS_SCATTERING;
        } else if (this.type === Game.GHOST_TYPE.ORANGE) {
            const rowInd = 17;
            this.x = gridWidth / 2 + cellSize;
            this.y = rowInd * cellSize + cellSize / 2;
            this.state = Game.GHOST_STATE.IS_SCATTERING;
        }
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
        if (this.isBlinking) {
            this.isBlinking = false;
        }
        if (this.blinkingTimeout) {
            clearTimeout(this.blinkingTimeout);
        }
    }

    getTargetForScattering() {
        switch (this.type) {
            case Game.GHOST_TYPE.RED:
                return {
                    x: 26 * this.game.grid.map.length - this.game.grid.cellSize / 2,
                    y: this.game.grid.cellSize / 2,
                };
            case Game.GHOST_TYPE.PINK:
                return {
                    x: 3 * this.game.grid.cellSize - this.game.grid.cellSize / 2,
                    y: this.game.grid.cellSize / 2,
                };
            case Game.GHOST_TYPE.BLUE:
                return {
                    x: 26 * this.game.grid.cellSize - this.game.grid.cellSize / 2,
                    y:
                        this.game.grid.map.length * this.game.grid.cellSize -
                        this.game.grid.cellSize / 2,
                };
            case Game.GHOST_TYPE.ORANGE:
                return {
                    x: 3 * this.game.grid.cellSize - this.game.grid.cellSize / 2,
                    y:
                        this.game.grid.map.length * this.game.grid.cellSize -
                        this.game.grid.cellSize / 2,
                };
            default:
                break;
        }
    }

    getTargetForChasing() {
        const pacMan = this.game.pacMan;
        const targetFinder = {
            [Game.GHOST_TYPE.RED]: function () {
                return { x: pacMan.x, y: pacMan.y };
            },

            [Game.GHOST_TYPE.PINK]: function () {
                const cellSize = this.game.grid.cellSize;
                const offset = 4;
                return {
                    x: pacMan.x + pacMan.direction.x * offset * cellSize,
                    y: pacMan.y + pacMan.direction.y * offset * cellSize,
                };
            }.bind(this),

            [Game.GHOST_TYPE.BLUE]: function () {
                const redGhost = this.game.ghostsStore[Game.GHOST_TYPE.RED];
                const vectorX = 2 * (redGhost.x - pacMan.x);
                const vectorY = 2 * (redGhost.y - pacMan.y);
                return { x: redGhost.x + vectorX, y: redGhost.y + vectorY };
            }.bind(this),

            [Game.GHOST_TYPE.ORANGE]: function () {
                const cellSize = this.game.grid.cellSize;
                const toPacManDistance = Math.sqrt(
                    Math.pow(this.x - pacMan.x, 2) + Math.pow(this.y - pacMan.y, 2)
                );
                const detectionDistance = 8 * cellSize;
                if (toPacManDistance > detectionDistance) {
                    return {
                        x: this.targetForScattering.x,
                        y: this.targetForScattering.y,
                    };
                } else {
                    return { x: pacMan.x, y: pacMan.y };
                }
            }.bind(this),
        };
        return targetFinder[this.type]();
    }

    setFright() {
        if (
            this.isInHome() ||
            this.isInDoor() ||
            this.state === Game.GHOST_STATE.IS_GOING_TO_RESPAWN
        ) {
            return;
        }
        const frightPeriod = 15000;
        const blinkPeriod = 3000;

        this.state = Game.GHOST_STATE.IS_FRIGHTENED;
        this.direction.x = -this.direction.x;
        this.direction.y = -this.direction.y;

        if (this.frightenedTimeout) {
            clearTimeout(this.frightenedTimeout);
        }
        this.frightenedTimeout = setTimeout(() => {
            this.state = Game.GHOST_STATE.IS_CHASING;
        }, frightPeriod);
        this.blinkingTimeout = setTimeout(() => {
            this.isBlinking = true;
        }, frightPeriod - blinkPeriod);
    }

    goToRespawn() {
        this.state = Game.GHOST_STATE.IS_GOING_TO_RESPAWN;
    }

    isInHome() {
        const curCell = this.game.grid.getCellByCoords(this.x, this.y);
        return curCell.type === Game.CELL_TYPE.GHOST_HOME;
    }

    isInDoor() {
        const curCell = this.game.grid.getCellByCoords(this.x, this.y);
        return curCell.type === Game.CELL_TYPE.GHOST_HOME_DOOR;
    }

    isScatterTime() {
        const lifeTimeInSec = Math.round((Date.now() - this.game.startTime) / 1000);
        return (
            lifeTimeInSec < 7 ||
            (lifeTimeInSec > 27 && lifeTimeInSec < 34) ||
            (lifeTimeInSec > 54 && lifeTimeInSec < 61) ||
            (lifeTimeInSec > 81 && lifeTimeInSec < 85)
        );
    }

    getTarget() {
        switch (this.state) {
            case Game.GHOST_STATE.IS_SCATTERING:
                return this.targetForScattering;
            case Game.GHOST_STATE.IS_CHASING:
                return this.getTargetForChasing();
            case Game.GHOST_STATE.IS_FRIGHTENED:
                return null;
            case Game.GHOST_STATE.IS_GOING_TO_RESPAWN:
                return this.targetForGoingToRespawn;
            case Game.GHOST_STATE.IS_GOING_OUT:
                return this.targetForGoingOut;
            default:
                break;
        }
    }

    getDistanceToTarget(x, y) {
        let target = this.getTarget();
        return Math.sqrt(Math.pow(target.x - x, 2) + Math.pow(target.y - y, 2));
    }

    getNextCellCenterCoords(direction) {
        return {
            x: this.x + direction.x * this.game.grid.cellSize,
            y: this.y + direction.y * this.game.grid.cellSize,
        };
    }

    getNewDirection() {
        const directions = [];
        [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ].forEach((direction) => {
            if (!this.isDirectionsOpposite(direction)) {
                const isHomeOpened =
                    this.state === Game.GHOST_STATE.IS_GOING_OUT ||
                    this.state === Game.GHOST_STATE.IS_GOING_TO_RESPAWN;
                if (
                    this.game.grid.checkDirection(this.x, this.y, direction, isHomeOpened)
                ) {
                    directions.push({ ...direction });
                }
            }
        });

        if (directions.length === 1) {
            return directions[0];
        }

        if (this.state === Game.GHOST_STATE.IS_FRIGHTENED) {
            return directions[Math.floor(Math.random() * directions.length)];
        }

        let optimalDirectionInd, curDistance;
        directions.forEach((direction, ind) => {
            const { x, y } = this.getNextCellCenterCoords(direction);
            const distance = this.getDistanceToTarget(x, y);
            if (!curDistance || distance < curDistance) {
                curDistance = distance;
                optimalDirectionInd = ind;
            }
        });

        return directions[optimalDirectionInd];
    }

    update() {
        if (this.isInCenterCell()) {
            this.checkAndHandlePortalCollision();
            this.direction = this.getNewDirection();

            if (this.state === Game.GHOST_STATE.IS_FRIGHTENED) {
                this.stepSize = Game.STEP_SIZE.LITTLE;
            } else if (this.state === Game.GHOST_STATE.IS_GOING_TO_RESPAWN) {
                this.stepSize = Game.STEP_SIZE.BIG;
            } else {
                this.stepSize = Game.STEP_SIZE.NORMAL;
            }

            if (this.isInHome()) {
                if (this.state === Game.GHOST_STATE.IS_GOING_TO_RESPAWN) {
                    this.state = Game.GHOST_STATE.IS_GOING_OUT;
                }
                if (this.game.score > 30 && this.type === Game.GHOST_TYPE.BLUE) {
                    this.state = Game.GHOST_STATE.IS_GOING_OUT;
                } else if (this.game.score > 90 && this.type === Game.GHOST_TYPE.ORANGE) {
                    this.state = Game.GHOST_STATE.IS_GOING_OUT;
                }
            } else {
                if (this.isScatterTime()) {
                    if (
                        this.state === Game.GHOST_STATE.IS_GOING_OUT ||
                        this.state === Game.GHOST_STATE.IS_CHASING
                    ) {
                        this.state = Game.GHOST_STATE.IS_SCATTERING;
                    }
                } else {
                    if (
                        this.state === Game.GHOST_STATE.IS_SCATTERING ||
                        this.state === Game.GHOST_STATE.IS_GOING_OUT
                    ) {
                        this.state = Game.GHOST_STATE.IS_CHASING;
                    }
                }
            }
        }
        this.move();
    }
}

export default Ghost;
