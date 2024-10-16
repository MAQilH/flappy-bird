import GameView from "../view/gameView"
import stage from "../stage"
import Game from "../models/game"
import Bird from "../models/bird"
import config from "../config"
import BirdEntity from "../entity/birdEntity"
import GameEntity from "../entity/gameEntity"
import RectangelObstacleEntity from "../entity/rectangleObstacleEntity"
import RectangelObstacle from "../models/rectangelObstacle"
import util from "../util"
import { startCapturing } from "../handDetection"
import AlertAskNameController from "./alertAskNameController"
import gameView from "../view/gameView"
import startMenuControler from "./startMenuControler"

class GameController {
    _gameEntity
    _birdEntity
    _allEntities = []
    _isPause = false
    _animationId = null

    init(game = null) {
        GameView.render()
        GameView.addPauseGameHandler(this.pauseGame.bind(this))
        console.log(game)

        // AlertAskNameController.init()
        // AlertAskNameController.addFinishHandler(this.finishHandler.bind(this))

        startCapturing()
        if(!game) {
            AlertAskNameController.init()
            AlertAskNameController.addFinishHandler(this.finishHandler.bind(this))
        } else {
            this.startGame(game)
        }
    }
    
    finishHandler(playerName) {
        this.startGame()
        stage.game.playerName = playerName
    }

    startGame(game = null) {
        if (game) stage.game = game
        else stage.game = new Game(
            new Bird(config.BIRD_SPEED, config.BIRD_RADIUS * 3 / 2, GameView.height / 2, config.BIRD_RADIUS)
        )
        this._isPause = false

        this._birdEntity = new BirdEntity(stage.game.birdModel, GameView.context, stage.game)
        this._gameEntity = new GameEntity(GameView.gameBoard, GameView.context, stage.game)

        this._allEntities.push(this._gameEntity)
        this._allEntities.push(this._birdEntity)

        stage.game.rectObstacleModels.forEach(function(rect){
            const rectEntity = new RectangelObstacleEntity(rect, GameView.context, stage.game)
            rectEntity.addRemoveHandler(this.removeRectObstacle.bind(this))
            this._allEntities.push(rectEntity)
        }.bind(this))

        this.gameLoop()
    }

    gameLoop() {
        this.handleCollision()
        if (this._isPause) return

        GameView.clearCanvas()

        this.createRectObstacle()

        this.update()

        this._animationId = requestAnimationFrame(this.gameLoop.bind(this))
    }

    stopAnimation() {
        if (this._animationId) {
            cancelAnimationFrame(this._animationId)
            this._animationId = null
        }
    }

    update() {
        this._allEntities.forEach(entity => entity.update())
        this._allEntities.forEach(entity => entity.render())
    }

    _createRectOnbstacleTimeout = null

    createRectObstacle() {
        if (!this._createRectOnbstacleTimeout) {
            this._createRectOnbstacleTimeout = setTimeout(function() {
                if(!this._animationId) return
                this.addNewRectObstacle()
                this._createRectOnbstacleTimeout = null
            }.bind(this), util.getRandomInt(500, 1500))
        }
    }

    addNewRectObstacle() {
        const rectWidth = util.getRandom(50, 200)
        const rectHeight = util.getRandom(50, 200)
        const rectYPos = util.getRandom(0, GameView.height - rectHeight)
        const rectSpeed = util.getRandom(-2, 2)
        const newRectModel = new RectangelObstacle(rectSpeed, GameView.width, rectYPos, rectWidth, rectHeight)
        const newRectEntity = new RectangelObstacleEntity(newRectModel, GameView.context, stage.game)
        newRectEntity.addRemoveHandler(this.removeRectObstacle.bind(this))

        stage.game.addRectObstacle(newRectModel)
        this._allEntities.push(newRectEntity)
    }

    removeRectObstacle(rectObstacle) {
        this._allEntities.splice(
            this._allEntities.findIndex(rect => rect === rectObstacle),
            1
        )
        stage.game.removeRectObstacle(rectObstacle)
    }

    handleCollision() {
        if (this.checkFalpyCollisionWithRectObstacle()) {
            this.finishGame()
        }
    }

    finishGame() {
        this._isPause = true;
        stage.addScoreRecord(stage.game.playerName, stage.game.score)
        this.close()
    }

    checkFalpyCollisionWithRectObstacle() {
        return this._allEntities.some(entity => {
            if (entity instanceof RectangelObstacleEntity) {
                return util.circleRectCollision(
                    stage.game.birdModel.xCenter,
                    stage.game.birdModel.yCenter,
                    stage.game.birdModel.radius,
                    entity._rectModel.xPos,
                    entity._rectModel.yPos,
                    entity._rectModel.width,
                    entity._rectModel.height
                )
            }
            return false;
        })
    }

    pauseGame(e) {
        console.log(e.key)
        if(e.key !== 'Escape') return
        console.log(e.key)
        localStorage.setItem('prevGame', JSON.stringify(stage.game))
        this.close()
    }

    close() {
        console.log('er')
        gameView.close()
        this.stopAnimation()
        this._allEntities = []
        this._isPause = true
        this._birdEntity = null
        this._gameEntity = null
        this._createRectOnbstacleTimeout = null
        startMenuControler.init()
    }
}

export default new GameController()