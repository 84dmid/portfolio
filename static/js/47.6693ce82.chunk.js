"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[47],{47:(t,i,e)=>{e.r(i),e.d(i,{initGame:()=>r});class s{constructor(t,i){this.game=t,this.view=i,this.startButton=document.getElementById("startButton"),this.pauseButton=document.getElementById("pauseButton"),this.continueButton=document.getElementById("continueButton"),this.rightButton=document.getElementById("rightButton"),this.leftButton=document.getElementById("leftButton"),this.upButton=document.getElementById("upButton"),this.downButton=document.getElementById("downButton"),this.startButton.addEventListener("click",(()=>this.startAndRestart())),this.pauseButton.addEventListener("click",(()=>this.setPause())),this.continueButton.addEventListener("click",(()=>this.continue())),document.addEventListener("keydown",(t=>this.keyDownHandler(t))),this.rightButton.addEventListener("pointerdown",(()=>this.game.setNewDirection(s.DIRECTION.RIGHT))),this.leftButton.addEventListener("pointerdown",(()=>this.game.setNewDirection(s.DIRECTION.LEFT))),this.upButton.addEventListener("pointerdown",(()=>this.game.setNewDirection(s.DIRECTION.UP))),this.downButton.addEventListener("pointerdown",(()=>this.game.setNewDirection(s.DIRECTION.DOWN)))}setPause(){this.game.setPause(),this.view.stopGameLoop()}continue(){this.game.continue(),this.view.startGameLoop()}startAndRestart(){this.view.stopGameLoop(),this.game.startAndRestart(),this.view.startGameLoop()}keyDownHandler(t){switch(t.key){case"Right":case"ArrowRight":this.game.setNewDirection(s.DIRECTION.RIGHT);break;case"Left":case"ArrowLeft":this.game.setNewDirection(s.DIRECTION.LEFT);break;case"Up":case"ArrowUp":this.game.setNewDirection(s.DIRECTION.UP);break;case"Down":case"ArrowDown":this.game.setNewDirection(s.DIRECTION.DOWN)}}}s.DIRECTION={RIGHT:"right",LEFT:"left",UP:"up",DOWN:"down"};const n=s;class a{constructor(){this.grid={width:20,height:15},this.box={},this.snake={initHead:{x:Math.floor(this.grid.width/2),y:Math.floor(this.grid.height/2)}},this.setInitParams()}setInitParams(){this.state=a.STATE.STOPPED,this.score=0,this.isWin=!1,this.initSnake()}initSnake(){this.snake.body=[{x:this.snake.initHead.x,y:this.snake.initHead.y},{x:this.snake.initHead.x-1,y:this.snake.initHead.y},{x:this.snake.initHead.x-2,y:this.snake.initHead.y}],this.snake.direction={x:1,y:0},this.snake.newDirection=void 0,this.snake.isGrowing=!1,this.snake.stepSize=1,this.snake.stepTime=300}updateBoxPosition(){if(this.snake.body.length===this.grid.height*this.grid.width)return;const t=[];for(let i=0;i<this.grid.width;i++)for(let e=0;e<this.grid.height;e++)this.snake.body.some((t=>t.x===i&&t.y===e))||t.push({x:i,y:e});this.box=t[Math.floor(t.length*Math.random())]}startAndRestart(){this.setInitParams(),this.updateBoxPosition(),this.state=a.STATE.RUNNING}setPause(){this.state!==a.STATE.OVER&&(this.state=a.STATE.STOPPED)}continue(){this.state!==a.STATE.OVER&&(this.state=a.STATE.RUNNING)}getNextSnakeHedPosition(){const t=this.snake.body[0];return{x:t.x+this.snake.direction.x*this.snake.stepSize,y:t.y+this.snake.direction.y*this.snake.stepSize}}updateSnakePosition(t){const{x:i,y:e}=t;this.snake.body.unshift({x:i,y:e}),this.snake.isGrowing?this.snake.isGrowing=!1:this.snake.body.pop()}setNewDirection(t){const i={x:0,y:0};switch(t){case n.DIRECTION.RIGHT:i.x=1;break;case n.DIRECTION.LEFT:i.x=-1;break;case n.DIRECTION.UP:i.y=-1;break;case n.DIRECTION.DOWN:i.y=1;break;default:return}this.snake.newDirection=i}updateSnakeDirection(){this.snake.newDirection&&!this.isDirectionOpposite(this.snake.newDirection)&&(this.snake.direction=this.snake.newDirection,this.snake.newDirection=void 0)}isDirectionOpposite(t){return this.snake.direction.x===-t.x||this.snake.direction.y===-t.y}update(){if(this.state===a.STATE.STOPPED||this.state===a.STATE.OVER)return;this.updateSnakeDirection();const t=this.getNextSnakeHedPosition();this.isWallCollision(t)||this.isHimselfCollision(t)?this.state=a.STATE.OVER:(this.updateSnakePosition(t),this.isBoxCollision(t)&&(this.snake.isGrowing=!0,this.score++,this.updateBoxPosition()))}isWallCollision(t){const{x:i,y:e}=t;return i<0||i>=this.grid.width||e<0||e>=this.grid.height}isHimselfCollision(t){const{x:i,y:e}=t;return this.snake.body.some((t=>t.x===i&&t.y===e))}isBoxCollision(t){const{x:i,y:e}=t;return i===this.box.x&&e===this.box.y}}const o=a;a.STATE={RUNNING:"isRunning",STOPPED:"isStopped",OVER:"isOver"};const h=class{constructor(t){this.game=t,this.canvas=document.getElementById("canvas"),this.boxSize=20,this.canvas.width=t.grid.width*this.boxSize,this.canvas.height=t.grid.height*this.boxSize,this.canvas.style.backgroundColor="rgb(255, 237, 185)",this.ctx=this.canvas.getContext("2d"),this.previousTime=0,this.gameLoop=this.gameLoop.bind(this),this.frameRequestId=null,this.startGameLoop()}_drawBox(t,i,e){const s=t*this.boxSize,n=i*this.boxSize;this.ctx.beginPath(),this.ctx.fillStyle=e,this.ctx.fillRect(s,n,this.boxSize,this.boxSize),this.ctx.closePath()}startGameLoop(){this.frameRequestId=requestAnimationFrame(this.gameLoop)}stopGameLoop(){this.frameRequestId&&(cancelAnimationFrame(this.frameRequestId),this.frameRequestId=null)}gameLoop(t){0===this.previousTime&&(this.previousTime=t);t-this.previousTime>this.game.snake.stepTime&&(this.previousTime=t,this.game.update(),this.draw()),this.game.state===o.STATE.OVER?(this.drawGameOver(this.game),this.stopGameLoop()):this.game.state===o.STATE.STOPPED?this.draw():this.frameRequestId=requestAnimationFrame(this.gameLoop)}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawSnake(this.game.snake),this.drawBox(this.game.box),this.drawScore(this.game.score)}drawBox(t){this._drawBox(t.x,t.y,"blue")}drawSnake(t){t.body.forEach(((t,i)=>{const e=0===i?"red":"pink";this._drawBox(t.x,t.y,e)}))}drawScore(t){this.ctx.beginPath(),this.ctx.fillStyle="blue",this.ctx.font="18px Arial",this.ctx.fillText("Score: ".concat(t),10,22),this.ctx.closePath()}drawGameOver(t){const i=t.isWin?"YOU WIN":"GAME OVER";this.ctx.font="".concat(50,"px Arial");const e=this.ctx.measureText(i).width,s=(this.canvas.width-e)/2,n=this.canvas.height/2;this.ctx.fillStyle="rgba(0, 0, 0, 0.5)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="lightgrey",this.ctx.fillText(i,s,n)}},r=()=>{const t=new o,i=new h(t);new n(t,i)}}}]);
//# sourceMappingURL=47.6693ce82.chunk.js.map