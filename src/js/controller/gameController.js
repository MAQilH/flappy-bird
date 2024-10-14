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

class GameController {
    _gameEntity
    _birdEntity
    _allEntities = []

    startGame(game = null) {
        if (game) stage.game = game
        else stage.game = new Game(
            new Bird(config.BIRD_SPEED, config.BIRD_RADIUS * 3 / 2, GameView.height / 2, config.BIRD_RADIUS)
        )

        this._birdEntity = new BirdEntity(stage.game.birdModel, GameView.context, stage.game)
        this._gameEntity = new GameEntity(GameView.gameBoard, GameView.context)

        this._allEntities.push(this._birdEntity)
        this._allEntities.push(this._gameEntity)

        this.gameLoop()
    }

    gameLoop() {
        GameView.clearCanvas()

        this.createRectObstacle()

        this._allEntities.forEach(entity => entity.update())
        this._allEntities.forEach(entity => entity.render())

        requestAnimationFrame(this.gameLoop.bind(this))
    }

    _flag = true

    createRectObstacle() {
        if (this._flag) {
            this._flag = false
            setTimeout(function() {
                this._flag = true

                this.addNewRectObstacle()

                console.log(this._allEntities)
            }.bind(this), 2000)
        }
    }

    addNewRectObstacle() {
        const rectWidth = util.getRandom(50, 200)
        const rectHeight = util.getRandom(50, 200)
        const rectYPos = util.getRandom(0, GameView.height - rectHeight)
        const newRectModel = new RectangelObstacle(0, GameView.width, rectYPos, rectWidth, rectHeight)
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
}


const gameController = new GameController()
gameController.startGame()